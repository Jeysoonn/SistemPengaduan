import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart2,
  Send,
  LogOut,
  Rocket,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menus = [
    { icon: Home, name: "Beranda", path: "/" },
    { icon: BarChart2, name: "Statistik", path: "/statistik" },
    { icon: Send, name: "Laporan", path: "/laporan" },
  ];

  return (
    <div className="w-64 bg-gray-50 text-black-100 h-screen flex flex-col justify-between shadow-2xl">
      {/* TOP SECTION */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 font-bold">
          <Rocket size={24} className="text-blue-400" />
          <span className="text-lg">MyApp</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mx-4 "></div>

        {/* Menu Items */}
        <div className="mt-4 space-y-2 px-4">
          {menus.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all font-medium
                ${isActive ? "bg-gray-300" : "hover:bg-gray-200"}`}
              >
                <Icon size={20} className="mr-3" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="px-4 py-4">
        <div className="border-t border-gray-700 mb-4"></div>

        {/* Akun Pengguna */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Akun"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-gray-400 font-normal">johndoe@email.com</span>
          </div>
        </div>

        {/* Logout */}
        <button className="flex items-center text-sm hover:bg-gray-800 px-3 py-2 rounded-lg w-full transition font-medium">
          <LogOut size={18} className="mr-3" />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
