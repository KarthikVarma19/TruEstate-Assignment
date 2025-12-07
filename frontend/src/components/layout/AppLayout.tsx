import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Topbar from './Topbar/Topbar'
import { Outlet } from 'react-router-dom'

const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="h-full w-[15%] shrink-0">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Topbar should fill this entire width */}
        <div className="flex-none w-full">
          <Topbar title="Sales Management System" />
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;