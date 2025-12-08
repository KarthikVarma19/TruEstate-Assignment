import React from "react";
import FilterSelect from "./FilterSelect";
import { useSales } from "../../../context/salesContext";
import type { SortRule, SortKey } from "../../../context/salesContext";
import { ArrowRotateLeft } from "iconsax-react";
import "./FiltersBar.css";

const FiltersBar: React.FC = () => {
  const { updateFilters, resetFilters, setSort } = useSales();

  const handleReload = () => {
    resetFilters();
  };

  const parseSortValues = (values: string[]): SortRule[] => {
    // values: "date_desc", "totalAmount_asc", etc.
    return values
      .map((v) => {
        const [field, dir] = v.split("_");
        if (!field || !dir) return null;
        return { key: field as SortKey, dir: dir as "asc" | "desc" };
      })
      .filter(Boolean) as SortRule[];
  };

  return (
    <div className="flex flex-row items-center bg-white h-[62px]">
      <div className="flex items-center gap-2">
        {/* Reload */}
        <div>
          <button type="button" onClick={handleReload} className="flex items-center filters-bar-reload border border-gray-300 rounded-md bg-[#F3F3F3] hover:bg-gray-50  cursor-pointer">
            <ArrowRotateLeft size={16} color="#515162" variant="Linear" />
          </button>
        </div>
        {/* Customer Region (multi) */}
        <FilterSelect
          label="Customer Region"
          mode="multi"
          width="min-w-[100px]"
          options={[
            { label: "North", value: "North" },
            { label: "South", value: "South" },
            { label: "East", value: "East" },
            { label: "West", value: "West" },
            { label: "Central", value: "Central" },
          ]}
          onChange={(value) => {
            if (Array.isArray(value)) {
              updateFilters({ customerRegion: value });
            } else if (typeof value === "string") {
              updateFilters({ customerRegion: [value] });
            }
          }}
        />

        {/* Gender (multi for backend simplicity) */}
        <FilterSelect
          label="Gender"
          mode="multi"
          width="min-w-[50px]"
          options={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
            { label: "Other", value: "Other" },
          ]}
          onChange={(value) => {
            if (Array.isArray(value)) {
              updateFilters({ gender: value });
            } else if (typeof value === "string") {
              updateFilters({ gender: [value] });
            }
          }}
        />

        {/* Age Range */}
        <FilterSelect
          label="Age Range"
          mode="range"
          width="min-w-[100px]"
          onChange={(value) => {
            // value should be { min, max }
            if (typeof value === "object" && value !== null && "min" in value && "max" in value) {
              const v = value as { min: number | null; max: number | null };
              updateFilters({
                ageMin: v.min,
                ageMax: v.max,
              });
            }
          }}
        />

        {/* Product Category */}
        <FilterSelect
          label="Product Category"
          mode="multi"
          width="min-w-[150px]"
          options={[
            { label: "Electronics", value: "Electronics" },
            { label: "Beauty", value: "Beauty" },
            { label: "Clothing", value: "Clothing" },
          ]}
          onChange={(value) => {
            if (Array.isArray(value)) {
              updateFilters({ productCategory: value });
            } else if (typeof value === "string") {
              updateFilters({ productCategory: [value] });
            }
          }}
        />

        {/* Tags */}
        <FilterSelect
          label="Tags"
          mode="multi"
          width="min-w-[100px]"
          options={[
            { label: "beauty", value: "beauty" },
            { label: "accessories", value: "accessories" },
            { label: "organic", value: "organic" },
            { label: "makeup", value: "makeup" },
            { label: "formal", value: "formal" },
            { label: "cotton", value: "cotton" },
            { label: "gadgets", value: "gadgets" },
            { label: "casual", value: "casual" },
            { label: "fragrance-free", value: "fragrance-free" },
            { label: "fashion", value: "fashion" },
            { label: "unisex", value: "unisex" },
            { label: "wireless", value: "wireless" },
            { label: "portable", value: "portable" },
            { label: "smart", value: "smart" },
            { label: "skincare", value: "skincare" },
          ]}
          onChange={(value) => {
            if (Array.isArray(value)) {
              updateFilters({ tags: value });
            } else if (typeof value === "string") {
              updateFilters({ tags: [value] });
            }
          }}
        />

        {/* Payment Method */}
        <FilterSelect
          label="Payment Method"
          mode="multi"
          width="min-w-[130px]"
          options={[
            { label: "UPI", value: "UPI" },
            { label: "Credit Card", value: "Credit Card" },
            { label: "Debit Card", value: "Debit Card" },
            { label: "Cash", value: "Cash" },
            { label: "Wallet", value: "Wallet" },
            { label: "Net Banking", value: "Net Banking" },
          ]}
          onChange={(value) => {
            if (Array.isArray(value)) {
              updateFilters({ paymentMethod: value });
            } else if (typeof value === "string") {
              updateFilters({ paymentMethod: [value] });
            }
          }}
        />

        {/* Date range */}
        <FilterSelect
          label="Date"
          mode="dateRange"
          width="min-w-[150px]"
          onChange={(value) => {
            if (typeof value === "object" && value !== null && "start" in value && "end" in value) {
              const v = value as { start: string | null; end: string | null };
              updateFilters({
                dateFrom: v.start,
                dateTo: v.end,
              });
            }
          }}
        />
      </div>
      {/* Sort */}
      <div className="flex ml-auto items-center gap-2">
        <FilterSelect
          label="Sort by: "
          mode="multi"
          width="min-w-[200px]"
          options={[
            { label: "Transaction ID (ASC)", value: "transactionId_asc" },
            { label: "Transaction ID (DESC)", value: "transactionId_desc" },
            { label: "Date (Newest)", value: "date_desc" },
            { label: "Date (Oldest)", value: "date_asc" },
            { label: "Customer ID (ASC)", value: "customerId_asc" },
            { label: "Customer ID (DESC)", value: "customerId_desc" },
            { label: "Customer Name (A-Z)", value: "customerName_asc" },
            { label: "Customer Name (Z-A)", value: "customerName_desc" },
            { label: "Gender (A-Z)", value: "gender_asc" },
            { label: "Gender (Z-A)", value: "gender_desc" },
            { label: "Age (Lowest)", value: "age_asc" },
            { label: "Age (Highest)", value: "age_desc" },
            { label: "Product Category (A-Z)", value: "productCategory_asc" },
            { label: "Product Category (Z-A)", value: "productCategory_desc" },
            { label: "Quantity (ASC)", value: "quantity_asc" },
            { label: "Quantity (DESC)", value: "quantity_desc" },
            { label: "Total Amount (ASC)", value: "totalAmount_asc" },
            { label: "Total Amount (DESC)", value: "totalAmount_desc" },
            { label: "Customer Region (A-Z)", value: "customerRegion_asc" },
            { label: "Customer Region (Z-A)", value: "customerRegion_desc" },
            { label: "Product ID (ASC)", value: "productId_asc" },
            { label: "Product ID (DESC)", value: "productId_desc" },
            { label: "Employee Name (A-Z)", value: "employeeName_asc" },
            { label: "Employee Name (Z-A)", value: "employeeName_desc" },
          ]}
          onChange={(value) => {
            let values: string[];
            if (Array.isArray(value)) {
              values = value;
            } else if (typeof value === "string") {
              values = [value];
            } else {
              return;
            }
            const rules = parseSortValues(values);
            setSort(rules);
          }}
        />
      </div>
    </div>
  );
};

export default FiltersBar;
