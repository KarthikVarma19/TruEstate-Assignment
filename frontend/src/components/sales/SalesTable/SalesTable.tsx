import React from "react";
import { useSales } from "../../../context/salesContext.tsx";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber.ts";
import CopyIcon from "../../ui/CopyIcon.tsx";
import "../../../styles/table.css";
import { formatCurrency } from "../../../utils/formatCurrency.ts";


const SalesTable: React.FC = () => {
  const { data, loading } = useSales();

  return (
    <div className="w-full bg-white rounded-xl p-2 table-wrapper">
      <div className="overflow-auto">
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
  );
};

export default SalesTable;
