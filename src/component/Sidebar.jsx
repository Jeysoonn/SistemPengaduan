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
    <div className="fixed top-0 left-0 h-full w-64 bg-white text-blue-400 shadow-xl flex flex-col justify-between p-5 z-50">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-3 mb-8 px-2">
          <Rocket size={24} className="text-blue-400" />
          <span className="font-bold text-xl tracking-wide">MyApp</span>
        </div>

        {/* Menu */}
        <ul className="space-y-2">
          {menus.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-5 py-3 rounded-lg font-medium transition-all text-sm
                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "hover:bg-blue-900 hover:text-white text-blue-400"
                    }`}
                >
                  <Icon size={22} />
                  <span className="text-base">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* User Info & Logout */}
      <div className="border-t border-blue-800 pt-5">
        <div className="flex items-center gap-3 mb-3 px-2">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-10 h-10 rounded-full object-cover border border-blue-400"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">John Doe</span>
            <span className="text-xs text-blue-300">johndoe@email.com</span>
          </div>
        </div>
        <button className="flex items-center gap-3 w-full px-5 py-3 rounded-lg hover:bg-red-600 hover:text-white transition-all text-blue-400">
          <LogOut size={20} />
          <span className="text-base">Keluar</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
