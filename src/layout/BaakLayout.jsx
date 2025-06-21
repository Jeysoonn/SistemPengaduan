import React from "react";
import { Outlet } from "react-router-dom";
import BAAKSidebar from "../component/BAAKSidebar";

export default function BAAKLayout() {
  return (
    <div className="flex bg-gray-50">
      <BAAKSidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
