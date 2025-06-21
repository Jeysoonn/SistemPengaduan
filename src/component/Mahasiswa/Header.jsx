import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import logo from "../../assets/logo.png";  // Correct logo import

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useUser();

  // Active section tracking
  const [activeSection, setActiveSection] = useState("");
  const [bgOpacity, setBgOpacity] = useState(0); // Initialize bgOpacity

  useEffect(() => {
    // Dynamically set active section based on location
    const path = location.pathname;
    if (path === "/home") setActiveSection("home");
    else if (path === "/formulir") setActiveSection("formulir");
    else if (path === "/riwayat") setActiveSection("riwayat");
    else setActiveSection(""); // Reset if no match
  }, [location.pathname]);

  useEffect(() => {
    // Adjust background opacity on scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const opacity = Math.min(scrollPosition / 300, 1);
      setBgOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  // Menu item component
  const ListHeader = ({ title, href, isActive }) => {
    const menuClass = () =>
      `flex cursor-pointer items-center rounded-xl p-4 space-x-2
      ${isActive ? "font-extrabold" : "hover:text-[#5ab3d1] hover:font-bold transition-all duration-200"}
      text-base relative`;

    return (
      <Link to={href} className={`${menuClass()} ${isActive ? "text-[#2596be]" : ""}`}>
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
      className="sticky top-0 z-50 transition-all duration-300 shadow-xl"
      style={{ backgroundColor: `rgba(255, 255, 255, ${bgOpacity})` }} // Dynamic background opacity
    >
      <div className="flex justify-center items-center">
        <div className="container px-5">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center" style={{ height: "70px" }}>
              <img
                src={logo}  // Set the logo src correctly
                alt="Logo"
                className="h-full object-contain"
                style={{ maxWidth: "250px", width: "auto" }}
              />
            </div>

            {/* Menu */}
            <ul className="flex items-center">
              <li className="mx-5 font-bold">
                <ListHeader
                  href="/home"
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

            {/* Auth Section */}
            <div className="flex items-center gap-3">
              {isAuthenticated() ? (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">
                      {user ? user.nama || user.email : "User"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user ? user.role : "Role"}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-6 py-2 font-bold rounded-lg text-sm shadow-md hover:bg-red-600 transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/auth/login")}
                  className="bg-[#1e7da0] text-white px-8 py-2 font-bold rounded-lg text-x2 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
