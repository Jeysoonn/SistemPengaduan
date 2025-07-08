import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useUser } from "../../context/UserContext";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useUser();

  const [activeSection, setActiveSection] = useState("home");
  const [bgOpacity, setBgOpacity] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    switch (location.pathname) {
      case "/home":
        setActiveSection("home");
        break;
      case "/about":
        setActiveSection("about");
        break;
      case "/pengaduan":
        setActiveSection("pengaduan");
        break;
      case "/faq":
        setActiveSection("faq");
        break;
      case "/artikel":
        setActiveSection("artikel");
        break;
      case "/layanan":
        setActiveSection("layanan");
        break;
      default:
        setActiveSection("");
    }
  }, [location.pathname]);

  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const opacity = Math.min(scrollPosition / 300, 1);
      setBgOpacity(opacity);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (opacity > 0) setBgOpacity(1);
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/auth/login");
  };

  const ListHeader = ({ title, href, isActive }) => {
  const menuClass = () =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2
     ${isActive ? "font-extrabold" : "hover:text-[#5ab3d1] hover:font-bold transition-all duration-200"}
     text-base relative`;

  return (
    <Link
      to={href}
      className={`${menuClass()} ${isActive ? "text-[#2596be]" : "text-gray-600"}`}
      onClick={() => setMenuOpen(false)}
    >
      <span className="relative z-10">{title}</span>
      {isActive && (
        <span
          className="absolute bottom-1 left-0 right-0 h-1 rounded-t-md bg-[#2596be] md:w-full md:mx-0 w-fit mx-auto"
          style={{ marginTop: "4px" }}
        />
      )}
    </Link>
  );
};


  return (
    <div
      className="sticky top-0 z-50 transition-all duration-300 w-full"
      style={{ backgroundColor: `rgba(255, 255, 255, ${bgOpacity})`, marginBottom: 0 }}
    >
      <div className="flex justify-center items-center">
        <div className="container px-5">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center md:hidden gap-3">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-[#2596be] text-2xl focus:outline-none"
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
              <Link to="/home">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-10 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Desktop: Logo + Teks */}
            <Link
              to="/home"
              className="items-center space-x-3 cursor-pointer hidden md:flex"
              style={{ height: "70px" }}
            >
              <img
                src="/logo.png"
                alt="Logo"
                className="h-full object-contain"
                style={{ width: "auto", maxWidth: "60px" }}
              />
              <div className="leading-tight">
                <div className="text-sm text-gray-700">Lapor - PCR</div>
                <div className="text-lg font-bold text-[#001d3d]">
                  Politeknik Caltex Riau
                </div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center">
              <li className="mx-3 font-bold">
                <ListHeader href="/home" title="Home" isActive={activeSection === "home"} />
              </li>
              <li className="mx-3 font-bold">
                <ListHeader href="/about" title="About" isActive={activeSection === "about"} />
              </li>
              <li className="mx-3 font-bold">
                <ListHeader href="/artikel" title="Artikel" isActive={activeSection === "artikel"} />
              </li>
              <li className="mx-3 font-bold">
                <ListHeader href="/layanan" title="Layanan" isActive={activeSection === "layanan"} />
              </li>
              <li className="mx-3 font-bold">
                <ListHeader href="/pengaduan" title="Pengaduan" isActive={activeSection === "pengaduan"} />
              </li>
              <li className="mx-3 font-bold">
                <ListHeader href="/faq" title="FAQ" isActive={activeSection === "faq"} />
              </li>
            </ul>

            {/* Auth Section (Tetap tampil di mobile & desktop) */}
            <div className="flex items-center gap-3">
              {isAuthenticated() ? (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">
                      {user?.nama || user?.email || "User"}
                    </p>
                    <p className="text-xs text-gray-500">{user?.role || "Role"}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 font-bold rounded-lg text-sm shadow-md hover:bg-red-600 transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/auth/login")}
                  className="bg-[#1e7da0] text-white px-6 py-2 font-bold rounded-lg text-sm shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Items */}
          {menuOpen && (
            <div className="md:hidden flex flex-col space-y-2 mb-4">
              <ListHeader href="/home" title="Home" isActive={activeSection === "home"} />
              <ListHeader href="/about" title="About" isActive={activeSection === "about"} />
              <ListHeader href="/artikel" title="Artikel" isActive={activeSection === "artikel"} />
              <ListHeader href="/layanan" title="Layanan" isActive={activeSection === "layanan"} />
              <ListHeader href="/pengaduan" title="Pengaduan" isActive={activeSection === "pengaduan"} />
              <ListHeader href="/faq" title="FAQ" isActive={activeSection === "faq"} />
              {/* Login mobile fallback only if not logged in */}
              {!isAuthenticated() && (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/auth/login");
                  }}
                  className="bg-[#789cdb] text-white px-6 py-2 font-bold rounded-lg text-sm mt-2"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
