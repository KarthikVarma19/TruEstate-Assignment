import React from "react";
import Sidebar from "./pages/Sidebar/Sidebar.tsx";
import "./App.css";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="h-full w-[15%] shrink-0">
        <Sidebar />
      </div>
      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
