import React from "react";
import { Outlet } from "react-router-dom";
import SidebarSecurity from "../component/SidebarSecurity";

export default function SecurityLayout() {
  return (
    <div className="flex bg-gray-50">
      <SidebarSecurity />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
