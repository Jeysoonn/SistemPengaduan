import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import {
  Home,
  Send,
  LogOut,
} from "lucide-react";
import logoLapor from "../assets/logoLapor.png";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [laporanOpen, setLaporanOpen] = useState(
    location.pathname.startsWith("/bsti/daftar-laporan") || location.pathname.startsWith("/bsti/riwayat-daftar-laporan")
  );

  const menus = [
    { icon: Home, name: "Beranda", path: "/bsti/" },
    {
      icon: Send,
      name: "Laporan",
      path: "/bsti/daftar-laporan",
      dropdown: [
        { name: "Daftar Laporan", path: "/bsti/daftar-laporan" },
        { name: "Riwayat Laporan", path: "/bsti/riwayat-daftar-laporan" },
      ],
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="w-64 min-h-screen bg-white shadow-md flex flex-col justify-between">
      {/* Logo dan Menu */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <img
            src={logoLapor}
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-2xl font-bold text-cyan-700">Lapor - PCR</span>
        </div>

        <ul className="space-y-2">
          {menus.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            if (item.dropdown) {
              const isDropdownActive = item.dropdown.some(sub => location.pathname === sub.path);
              return (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => setLaporanOpen((open) => !open)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg text-base font-medium transition-all w-full text-left ${
                      isDropdownActive
                        ? "bg-cyan-100 text-cyan-800 font-semibold"
                        : "text-gray-700 hover:bg-cyan-50"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                    <svg
                      className={`ml-auto transition-transform duration-200 ${laporanOpen ? "rotate-180" : "rotate-90"}`}
                      width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {laporanOpen && (
                    <ul className="pl-6 mt-2 space-y-1">
                      {item.dropdown.map((sub, subIdx) => (
                        <li key={subIdx}>
                          <Link
                            to={sub.path}
                            className={`block px-4 py-2 rounded-md text-sm font-medium transition-all ${
                              location.pathname === sub.path
                                ? "bg-cyan-100 text-cyan-800 font-semibold"
                                : "text-gray-700 hover:bg-cyan-50"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? "bg-cyan-100 text-cyan-800 font-semibold"
                      : "text-gray-700 hover:bg-cyan-50"
                  }`}
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
      <div className="p-6 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {user ? user.nama || user.email : "User"}
            </p>
            <p className="text-xs text-gray-500">
              {user ? user.email : "user@email.com"}
            </p>
            <p className="text-xs text-cyan-600 font-medium">
              {user ? user.role : "Role"}
            </p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2 rounded-md text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Keluar</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
