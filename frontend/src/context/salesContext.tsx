import React,{
  createContext, useContext, useState, useEffect,
  useMemo, useCallback, type ReactNode
} from "react";
import { BACKEND_URL } from "../utils/constants";

export interface SalesRecord {
  transactionId: string;
  date: string;
  customerId: string;
  customerName: string;
  phoneNumber: string;
  gender: string;
  age: number;
  productCategory: string;
  quantity: number;
  totalAmount: number;
  customerRegion: string;
  productId: string;
  employeeName: string;
}

export interface SalesFilters {
  search: string;
  customerRegion: string[];
  gender: string[];
  ageMin: number | null;
  ageMax: number | null;
  productCategory: string[];
  tags: string[];
  paymentMethod: string[];
  dateFrom: string | null;
  dateTo: string | null;
}

export type SortKey = "transactionId" | "date" | "customerId" | "customerName" | "gender" | "age" | "productCategory" | "quantity" | "totalAmount" | "customerRegion" | "productId" | "employeeName";

export type SortDir = "asc" | "desc";

export interface SortRule {
  key: SortKey;
  dir: SortDir;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface SalesStats {
  totalUnitsSold: number;
  totalAmount: number;
  totalDiscount: number;
}

interface SalesContextValue {
  data: SalesRecord[];
  loading: boolean;
  error: string | null;

  filters: SalesFilters;
  sort: SortRule[];
  pagination: PaginationState;

  stats: SalesStats;
  updateStats: (stats: SalesStats) => void;

  setPage: (page: number) => void;
  setPageSize: (size: number) => void;

  updateFilters: (partial: Partial<SalesFilters>) => void;
  resetFiltersAndTableData: () => void;

  setSort: (rules: SortRule[]) => void;
}

const SalesContext = createContext<SalesContextValue | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const DEFAULT_FILTERS: SalesFilters = {
  search: "",
  customerRegion: [],
  gender: [],
  ageMin: null,
  ageMax: null,
  productCategory: [],
  tags: [],
  paymentMethod: [],
  dateFrom: null,
  dateTo: null,
};

export const SalesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<SalesFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortRule[]>([{ key: "date", dir: "desc" }]);

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 1,
  });

  const [data, setData] = useState<SalesRecord[]>([]);
  const [stats, setStats] = useState<SalesStats>({
    totalUnitsSold: 0,
    totalAmount: 0,
    totalDiscount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const setPageSize = useCallback((size: number) => {
    setPagination((prev) => ({ ...prev, pageSize: size, page: 1 }));
  }, []);

  const updateStats = useCallback((stats: SalesStats) => {
    setStats((prev) => ({ ...prev, ...stats }));
  }, []);

  const updateFilters = useCallback((partial: Partial<SalesFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...partial,
    }));

    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const resetFiltersAndTableData = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setStats({
      totalUnitsSold: 0,
      totalAmount: 0,
      totalDiscount: 0,
    });
    setPagination({ page: 1, pageSize: 10, totalItems: 0, totalPages: 1 });
    setData([]);
    setSort([{ key: "date", dir: "desc" }]);
  }, []);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (filters.search.trim()) params.set("search", filters.search.trim());

    filters.customerRegion.forEach((r) => params.append("customerRegion", r));
    filters.gender.forEach((g) => params.append("gender", g));
    filters.productCategory.forEach((c) => params.append("productCategory", c));
    filters.tags.forEach((t) => params.append("tags", t));
    filters.paymentMethod.forEach((p) => params.append("paymentMethod", p));

    if (filters.ageMin !== null) params.set("ageMin", String(filters.ageMin));
    if (filters.ageMax !== null) params.set("ageMax", String(filters.ageMax));

    if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
    if (filters.dateTo) params.set("dateTo", filters.dateTo);

    params.set("page", String(pagination.page));
    params.set("pageSize", String(pagination.pageSize));

    sort.forEach((rule) => {
      const backendFieldMap: Record<SortKey, string> = {
        transactionId: "transactionId",
        date: "date",
        customerId: "customerId",
        customerName: "customerName",
        gender: "gender",
        age: "age",
        productCategory: "productCategory",
        quantity: "quantity",
        totalAmount: "totalAmount",
        customerRegion: "customerRegion",
        productId: "productId",
        employeeName: "employeeName",
      };

      const field = backendFieldMap[rule.key];
      if (!field) return;
      params.append("sort", `${field}_${rule.dir}`);
    });

    return params.toString();
  }, [filters, pagination.page, pagination.pageSize, sort]);
  async function fetchData(controller: AbortController) {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${BACKEND_URL}/api/sales?${queryString}`, {
        signal: controller.signal,
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const json = await res.json();
      setData(json.data || []);
      setPagination((prev) => ({
        ...prev,
        totalItems: Number(json.pagination?.totalItems ?? 0),
        totalPages: Number(json.pagination?.totalPages ?? 1),
      }));

      const rawStats = json.stats ?? {};
      const totalUnitsSoldRaw = rawStats.totalUnitsSold ?? rawStats.total_units_sold ?? rawStats.units ?? 0;
      const totalAmountRaw = rawStats.totalAmount ?? rawStats.total_amount ?? rawStats.finalAmount ?? 0;
      const finalAmountRaw = rawStats.finalAmount ?? rawStats.final_amount ?? rawStats.totalAmount ?? totalAmountRaw;
      const totalDiscountRaw = rawStats.totalDiscount ?? rawStats.total_discount ?? Number(finalAmountRaw) - Number(totalAmountRaw);

      const normalizedStats: SalesStats = {
        totalUnitsSold: Number(totalUnitsSoldRaw) || 0,
        totalAmount: Number(totalAmountRaw) || 0,
        totalDiscount: Number(totalDiscountRaw) || 0,
      };

      setStats(normalizedStats);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      console.error("fetch sales error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch sales");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller);
    return () => controller.abort();
  }, [queryString, filters, sort]);

  const ctxValue = useMemo(
    () => ({
      data,
      loading,
      error,
      filters,
      sort,
      pagination,
      setPage,
      setPageSize,
      updateFilters,
      resetFiltersAndTableData,
      setSort,
      updateStats,
      stats,
    }),
    [data, loading, error, filters, sort, pagination, setPage, setPageSize, updateFilters, resetFiltersAndTableData, setSort, updateStats, stats] // dependencies
  );

  return <SalesContext.Provider value={ctxValue}>{children}</SalesContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSales = () => {
  const ctx = useContext(SalesContext);
  if (!ctx) throw new Error("useSales must be used within SalesProvider");
  return ctx;
};
