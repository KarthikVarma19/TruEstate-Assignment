import { Sale } from "../models/sale.model";
import { checkRedisMemoryUsageUnderLimit, getRedisBuffer, setRedisBuffer } from "../config/redis.config";

export type SaleQueryParams = {
  page?: number;
  pageSize?: number;
  sort?: string | null;
  search?: string | null;
  customerRegion?: string | string[] | null;
  gender?: string | string[] | null;
  productCategory?: string | string[] | null;
  tags?: string | string[] | null;
  paymentMethod?: string | string[] | null;
  ageMin?: number | undefined;
  ageMax?: number | undefined;
  dateFrom?: string | null;
  dateTo?: string | null;
};

const toStringArray = (value: any): string[] | undefined => {
  if (value === undefined || value === null) return undefined;
  if (Array.isArray(value)) return value.map(String);
  return [String(value)];
};

const buildRedisKey = (params: Partial<SaleQueryParams>) => {
  const keys = [
    "page",
    "pageSize",
    "sort",
    "search",
    "customerRegion",
    "gender",
    "productCategory",
    "tags",
    "paymentMethod",
    "ageMin",
    "ageMax",
    "dateFrom",
    "dateTo",
  ];
  const parts = keys.map((k) => `${k}=${(params as any)[k] ?? ""}`);
  return `sales?${parts.join("&")}`;
};

export const buildMongoQuery = (params: Partial<SaleQueryParams>) => {
  const {
    search,
    customerRegion,
    gender,
    productCategory,
    tags,
    paymentMethod,
    ageMin,
    ageMax,
    dateFrom,
    dateTo,
  } = params;

  const query: any = {};

  if (search) {
    const s = String(search);
    query.$or = [
      { "Customer Name": { $regex: s, $options: "i" } },
      { "Phone Number": { $regex: s, $options: "i" } },
    ];
  }

  const regionArr = toStringArray(customerRegion);
  if (regionArr?.length) query["Customer Region"] = { $in: regionArr };

  const genderArr = toStringArray(gender);
  if (genderArr?.length) query["Gender"] = { $in: genderArr };

  const categoryArr = toStringArray(productCategory);
  if (categoryArr?.length) query["Product Category"] = { $in: categoryArr };

  const tagsArr = toStringArray(tags);
  if (tagsArr?.length) query["Tags"] = { $in: tagsArr };

  const paymentArr = toStringArray(paymentMethod);
  if (paymentArr?.length) query["Payment Method"] = { $in: paymentArr };

  if (ageMin !== undefined || ageMax !== undefined) {
    query["Age"] = {};
    if (ageMin !== undefined) query["Age"].$gte = ageMin;
    if (ageMax !== undefined) query["Age"].$lte = ageMax;
  }

  if (dateFrom || dateTo) {
    query["Date"] = {};
    if (dateFrom) query["Date"].$gte = String(dateFrom);
    if (dateTo) query["Date"].$lte = String(dateTo);
  }

  return query;
};

export const buildSortObject = (sort?: string | null) => {
  const sortObj: any = {};
  if (sort) {
    const [field, dir] = (sort).split("_");
    const dirNum = dir === "desc" ? -1 : 1;
    const sortMap: Record<string, string> = {
      date: "Date",
      totalAmount: "Total Amount",
      quantity: "Quantity",
      customerName: "Customer Name",
      age: "Age",
    };
    const mongoField = sortMap[field ?? ""];
    if (mongoField) sortObj[mongoField] = dirNum;
  }

  if (Object.keys(sortObj).length === 0) sortObj["Date"] = -1;
  return sortObj;
};

export const mapSaleDocument = (d: any) => ({
  transactionId: d["Transaction ID"],
  date: d["Date"],
  customerId: d["Customer ID"],
  customerName: d["Customer Name"],
  phoneNumber: d["Phone Number"],
  gender: d["Gender"],
  age: d["Age"],
  productCategory: d["Product Category"],
  quantity: d["Quantity"],
  totalAmount: d["Total Amount"],
  customerRegion: d["Customer Region"],
  productId: d["Product ID"],
  employeeName: d["Employee Name"],
});

export const getSales = async (params: Partial<SaleQueryParams>) => {
  const pageNum = Number(params.page) || 1;
  const limit = Number(params.pageSize) || 10;
  const skip = (pageNum - 1) * limit;

  const redisKey = buildRedisKey(params);
  const cached = await getRedisBuffer(redisKey);
  if (cached !== null) {
    try {
      const parsed = JSON.parse(cached.toString());
      return parsed;
    } catch (e) {
      console.warn("Failed to parse cached sales data, fetching fresh:", e);
    }
  }

  const query = buildMongoQuery(params);
  const sortObj = buildSortObject(params.sort ?? null);

  const [items, total] = await Promise.all([
    Sale.find(query).sort(sortObj).skip(skip).limit(limit).lean(),
    Sale.countDocuments(query),
  ]);



  const data = items.map(mapSaleDocument);

  let totalUnitsSold = 0;
  let totalAmount = 0;
  let finalAmount = 0;

  try {
    const agg = await Sale.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalUnitsSold: { $sum: { $toDouble: { $ifNull: ["$Quantity", 0] } } },
          totalAmount: { $sum: { $toDouble: { $ifNull: ["$Total Amount", 0] } } },
          finalAmount: { $sum: { $toDouble: { $ifNull: ["$Final Amount", 0] } } },
        },
      },
    ]);

    if (agg && agg.length > 0) {
      totalUnitsSold = agg[0].totalUnitsSold ?? 0;
      totalAmount = agg[0].totalAmount ?? 0;
      finalAmount = agg[0].finalAmount ?? 0;
    }
  } catch (aggErr) {
    console.warn("Aggregation for sales stats failed, falling back to page-level sums:", aggErr);
    for (const it of items) {
      const qty = Number(it["Quantity"] ?? 0);
      const tAmt = Number(it["Total Amount"] ?? 0);
      const fAmt = Number(it["Final Amount"] ?? tAmt); // if Final Amount missing, fallback to Total
      totalUnitsSold += Number.isFinite(qty) ? qty : 0;
      totalAmount += Number.isFinite(tAmt) ? tAmt : 0;
      finalAmount += Number.isFinite(fAmt) ? fAmt : 0;
    }
  }


  const response = {
    data,
    pagination: {
      page: pageNum,
      pageSize: limit,
      totalItems: total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
    stats: {
      totalUnitsSold: totalUnitsSold,
      totalAmount: totalAmount,
      totalDiscount: totalAmount - finalAmount,
    }
  };

  if (await checkRedisMemoryUsageUnderLimit()) {
    try {
      await setRedisBuffer(redisKey, Buffer.from(JSON.stringify(response)));
    } catch (e) {
      console.warn("Failed to set redis cache:", e);
    }
  }

  return response;
};