import React from 'react'
import Topbar from "../../components/layout/Topbar/Topbar";
import FiltersBar from "../../components/sales/FiltersBar/FiltersBar";
import Stats from "../../components/sales/Stats/Stats.tsx";
import SalesTable from "../../components/sales/SalesTable/SalesTable.tsx";
import Pagination from "../../components/ui/Pagination.tsx";
import { useSales } from "../../context/salesContext.tsx";
import { BarLoader } from "react-spinners";

const Sales: React.FC = () => {
  const { loading } = useSales();

  return (
    <div className="flex flex-col min-w-0 gap-2">
      {loading && <BarLoader color="#000" width={"100%"} height={2} className="absolute top-0 left-0" />}
      {/* Page content */}
      <div className="flex flex-col gap-4">
        <div>
          <div className="topbar">
            <Topbar title="Sales Management System" searchPlaceholder="Name, Phone no." />
          </div>
          <div className="mr-4 ml-4">
            <FiltersBar />
            <Stats />
          </div>
        </div>
        <div className="mr-4 ml-4">
          <SalesTable />
        </div>
      </div>
      <hr className="table-pagination-divider" />
      {/* Pagination */}
      <div className="flex items-center justify-center table-pagination text-xs text-[#55566A] whitespace-nowrap">
        <Pagination disabled={false} />
      </div>
    </div>
  );
}

export default Sales;