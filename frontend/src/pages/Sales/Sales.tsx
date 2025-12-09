import React, { useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import Pagination from "../../components/Pagination/Pagination";
import { useSales, type SortKey, type SortRule } from "../../context/salesContext";
import { BarLoader } from "react-spinners";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";
import CopyIcon from "../../components/CopyIcon/CopyIcon";
import { formatCurrency } from "../../utils/formatCurrency";
import { ArrowRotateLeft } from "iconsax-react";
import Dropdown from "../../components/Dropdown/Dropdown";
import "../../styles/Sales.css";
import StatsCard from "../../components/StatsCard/StatsCard";

const Sales: React.FC = () => {
  const { loading, data, stats, updateFilters, resetFiltersAndTableData, setSort, pagination, setPage, setPageSize } = useSales();
  const [closeDropDown] = useState<boolean>(false);
  const parseSortValues = (values: string[]): SortRule[] => {
    return values
      .map((v) => {
        const [field, dir] = v.split("_");
        if (!field || !dir) return null;
        return { key: field as SortKey, dir: dir as "asc" | "desc" };
      })
      .filter(Boolean) as SortRule[];
  };

  return (
    <div className="flex flex-col min-w-0 gap-2">
      {loading && <BarLoader color="#000" width={"100%"} height={2} className="absolute top-0 left-0" />}
      {/* Page content */}
      <div className="flex flex-col gap-4">
        <div>
          <div className="topbar">
            <Topbar title="Sales Management System" searchPlaceholder="Name, Phone no." />
          </div>
          {/* Filters */}
          <div className="mr-4 ml-4">
            <div className="flex flex-row items-center bg-white h-[62px] filter-container">
              <div className="flex items-center gap-2">
                {/* Reload */}
                <button type="button" onClick={resetFiltersAndTableData} className="flex items-center filters-bar-reload border border-gray-300 rounded-md bg-[#F3F3F3] hover:bg-gray-50  cursor-pointer m-0 p-0">
                  <ArrowRotateLeft size={16} color="#515162" variant="Linear" />
                </button>
                {/* Customer Region (multi) */}
                <Dropdown
                  onClose={closeDropDown}
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
                <Dropdown
                  onClose={closeDropDown}
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
                <Dropdown
                  onClose={closeDropDown}
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
                <Dropdown
                  onClose={closeDropDown}
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
                <Dropdown
                  onClose={closeDropDown}
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
                <Dropdown
                  onClose={closeDropDown}
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
                <Dropdown
                  onClose={closeDropDown}
                  label="Date"
                  mode="dateRange"
                  width="min-w-[70px]"
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
                <Dropdown
                  onClose={closeDropDown}
                  label="Sort by: "
                  mode="single"
                  width="min-w-[200px]"
                  options={[
                    { label: "Date (Newest First)", value: "date_desc" },
                    { label: "Quantity (ASC)", value: "quantity_asc" },
                    { label: "Quantity (DESC)", value: "quantity_desc" },
                    { label: "Customer Name (A-Z)", value: "customerName_asc" },
                  ]}
                  showSelectedValue={true}
                  defaultSelectedValue="date_desc"
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
            {/* Stats */}
            <div className="flex flex-wrap stats-bar">
              <StatsCard title="Total units sold" value={stats.totalUnitsSold} tooltip="Total Quantity Sold" />
              <StatsCard title="Total Amount" value={formatCurrency(stats.totalAmount)} tooltip="Total Sales Amount" />
              <StatsCard title="Total Discount" value={formatCurrency(stats.totalDiscount)} tooltip="Total Discount Amount" />
            </div>
          </div>
        </div>
        {/* Sales Table */}
        <div className="mr-4 ml-4">
          <div className="w-full bg-white table-wrapper">
            <div className="overflow-auto scrollbar-hide">
              <table className="min-w-full border-collapse whitespace-nowrap">
                <thead className="sticky top-0">
                  <tr className="bg-[#F3F3F3] text-xs text-[#515162] h-[40px]">
                    <th className="text-left font-medium px-4 py-3 w-[156px] table-header-cell">Transaction ID</th>
                    <th className="text-left font-medium px-4 py-3 w-[120px] table-header-cell">Date</th>
                    <th className="text-left font-medium px-4 py-3 w-[156px] table-header-cell">Customer ID</th>
                    <th className="text-left font-medium px-4 py-3 w-[168px] table-header-cell">Customer name</th>
                    <th className="text-left font-medium px-4 py-3 w-[156px] table-header-cell">Phone Number</th>
                    <th className="text-left font-medium px-4 py-3 min-w-[120px] max-w-[156px] table-header-cell">Gender</th>
                    <th className="text-left font-medium px-4 py-3 w-[120px] table-header-cell">Age</th>
                    <th className="text-left font-medium px-4 py-3 w-[125px] table-header-cell">Product Category</th>
                    <th className="text-left font-medium px-4 py-3 w-[156px] table-header-cell">Quantity</th>
                    <th className="text-left font-medium px-4 py-3 w-[156px] table-header-cell">Total Amount</th>
                    <th className="text-left font-medium px-4 py-3 w-[156px] table-header-cell">Customer Region</th>
                    <th className="text-left font-medium px-4 py-3 w-[156px] table-header-cell">Product ID</th>
                    <th className="text-left font-medium px-4 py-3 w-[156px] table-header-cell">Employee Name</th>
                  </tr>
                </thead>

                <tbody className="text-sm text-[#22222A] whitespace-nowrap">
                  {!loading && data.length === 0 && (
                    <tr>
                      <td colSpan={13} className="px-4 py-6 text-center text-sm text-gray-500">
                        No records found
                      </td>
                    </tr>
                  )}

                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {data.map((row: any) => (
                    <tr key={`${row.transactionId}-${row.customerId}-${row.date}-${row.phoneNumber}`} className="border-t border-[#F0F1F6] hover:bg-[#F3F3F3] h-[50px]">
                      <td className="table-body-cell">{row.transactionId}</td>
                      <td className="table-body-cell">{row.date}</td>
                      <td className="table-body-cell">{row.customerId}</td>
                      <td className="table-body-cell">{row.customerName}</td>
                      <td className="table-body-cell">
                        <div className="flex items-center justify-between gap-2">
                          <span className="whitespace-nowrap">{formatPhoneNumber(row.phoneNumber)}</span>
                          <CopyIcon value={formatPhoneNumber(row.phoneNumber)} />
                        </div>
                      </td>

                      <td className="table-body-cell">{row.gender}</td>
                      <td className="table-body-cell">{row.age}</td>
                      <td className="table-body-cell" style={{ color: "black" }}>
                        {row.productCategory}
                      </td>
                      <td className="table-body-cell" style={{ color: "black" }}>
                        {row.quantity.toString().padStart(2, "0")}
                      </td>
                      <td className="table-body-cell" style={{ color: "black" }}>
                        {formatCurrency(row.totalAmount)}
                      </td>
                      <td className="table-body-cell" style={{ color: "black" }}>
                        {row.customerRegion}
                      </td>
                      <td className="table-body-cell" style={{ color: "black" }}>
                        {row.productId}
                      </td>
                      <td className="table-body-cell" style={{ color: "black" }}>
                        {row.employeeName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <hr className="table-pagination-divider" />
      {/* Pagination */}
      <div className="flex items-center justify-center table-pagination text-xs text-[#55566A] whitespace-nowrap">
        <Pagination
          disabled={false}
          page={pagination.page}
          pageSize={pagination.pageSize}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          onPageChange={(p: number) => setPage(p)}
          onPageSizeChange={(s: number) => setPageSize(s)} />
      </div>
    </div>
  );
};

export default Sales;
