import React from "react";
import { Outlet } from "react-router-dom";
import SecuritySidebar from "../component/SecuritySidebar";

export default function SecurityLayout() {
  return (
    <div className="flex bg-gray-50">
      <SecuritySidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
