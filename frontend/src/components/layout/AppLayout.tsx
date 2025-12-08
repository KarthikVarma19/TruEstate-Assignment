import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";
import FiltersBar from "../sales/FiltersBar/FiltersBar";
import Stats from "../sales/Stats/Stats";
import SalesTable from "../sales/SalesTable/SalesTable";
import { SalesProvider } from "../../context/salesContext.tsx";
import Pagination from "../ui/Pagination.tsx";

const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="h-full w-[15%] shrink-0">
        <Sidebar />
      </div>

      {/* Main content area */}
      <SalesProvider>
        <div className="flex flex-col flex-1 min-w-0 gap-2">
          <div className="topbar">
            <Topbar title="Sales Management System" searchPlaceholder="Name, Phone no." />
          </div>
          <div className="mr-4 ml-4">
            <FiltersBar />
          </div>
          {/* Page content */}
          <div className="flex-1">
            
            <Stats />
            <SalesTable />
            <hr className="table-pagination-divider" />
            {/* Pagination */}
            <div className="flex items-center justify-center table-pagination text-xs text-[#55566A] whitespace-nowrap">
              <Pagination disabled={false} />
            </div>
          </div>
        </div>
      </SalesProvider>
    </div>
  );
};

export default AppLayout;
