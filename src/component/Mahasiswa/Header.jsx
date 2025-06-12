import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("home");
  const [bgOpacity, setBgOpacity] = useState(0);

  useEffect(() => {
    if (location.pathname === "/") setActiveSection("home");
    else if (location.pathname === "/formulir") setActiveSection("formulir");
    else if (location.pathname === "/riwayat") setActiveSection("riwayat");
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const opacity = Math.min(scrollPosition / 300, 1);
      setBgOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ListHeader = ({ title, href, isActive }) => {
    const menuClass = () =>
      `flex cursor-pointer items-center rounded-xl p-4 space-x-2
      ${isActive ? "font-extrabold" : "hover:text-[#5ab3d1] hover:font-bold transition-all duration-200"}
      text-base relative`;

    return (
      <Link
        to={href}
        className={`${menuClass()} ${isActive ? "text-[#2596be]" : ""}`}
      >
        <span>{title}</span>
        {isActive && (
          <span
            className="absolute bottom-0 left-0 w-full h-1 rounded-t-md bg-[#2596be]"
            style={{ marginTop: "4px" }}
          />
        )}
      </Link>
    );
  };

  return (
    <div
      className="sticky top-0 z-50 transition-all duration-300"
      style={{ backgroundColor: `rgba(255, 255, 255, ${bgOpacity})` }}
    >
      <div className="flex justify-center items-center">
        <div className="container px-5">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center" style={{ height: "70px" }}>
              <img
                src="/logo.png"
                alt="Logo"
                className="h-full object-contain"
                style={{ width: "auto", maxWidth: "250px" }}
              />
            </div>

            {/* Menu */}
            <ul className="flex items-center">
              <li className="mx-5 font-bold">
                <ListHeader
                  href="/"
                  title="Home"
                  isActive={activeSection === "home"}
                />
              </li>
              <li className="mx-5 font-bold">
                <ListHeader
                  href="/formulir"
                  title="Formulir"
                  isActive={activeSection === "formulir"}
                />
              </li>
              <li className="mx-5 font-bold">
                <ListHeader
                  href="/riwayat"
                  title="Riwayat"
                  isActive={activeSection === "riwayat"}
                />
              </li>
            </ul>

            {/* Auth Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/auth")}
                className="bg-[#1e7da0] text-white px-8 py-2 font-bold rounded-lg text-x2 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
