import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart2,
  Send,
  LogOut,
  Rocket,
  Users,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menus = [
    { icon: Home, name: "Beranda", path: "/" },
    { icon: BarChart2, name: "Statistik", path: "/statistik" },
    { icon: Send, name: "Laporan", path: "/daftar-laporan" },
    { icon: Users, name: "User", path: "/user" },
  ];

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg flex flex-col justify-between">
      {/* Logo dan Menu */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <Rocket size={28} className="text-black" />
          <span className="text-2xl font-bold text-black">Lapor - PCR</span>
        </div>

        <ul className="space-y-2">
          {menus.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg text-base font-medium transition-all
                    ${isActive
                      ? "bg-gray-500 text-black shadow-md"
                      : "text-black hover:bg-gray-300"}`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* User Info & Logout */}
      <div className="p-6 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-300"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">John Doe</p>
            <p className="text-xs text-gray-500">johndoe@email.com</p>
          </div>
        </div>
        <button className="flex items-center gap-3 w-full px-4 py-2 rounded-md text-red-600 hover:bg-red-100 transition-all">
          <LogOut size={18} />
          <span className="text-sm font-medium">Keluar</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
