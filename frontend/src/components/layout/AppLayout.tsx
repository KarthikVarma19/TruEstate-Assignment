import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Sales from "../../pages/Sales/Sales.tsx";
import { SalesProvider } from "../../context/salesContext.tsx";

const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="h-full w-[15%] shrink-0">
        <Sidebar />
      </div>
      {/* Main content area */}
      <SalesProvider>
        <Sales />
      </SalesProvider>
    </div>
  );
};

export default AppLayout;
