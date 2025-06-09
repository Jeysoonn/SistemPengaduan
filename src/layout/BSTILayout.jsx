import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../component/SidebarBSTI";

export default function BstiLayout (){
    return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
