import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("home");
  const [bgOpacity, setBgOpacity] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActiveSection("home");
        break;
      case "/about":
        setActiveSection("about");
        break;
      case "/layanan":
        setActiveSection("layanan");
        break;
      case "/artikel":
        setActiveSection("artikel");
        break;
      case "/pengaduan":
        setActiveSection("pengaduan");
        break;
      case "/faq":
        setActiveSection("faq");
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
      setScrolling(true);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrolling(false);
        if (opacity > 0) setBgOpacity(1);
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
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
        onClick={() => setMenuOpen(false)} // close menu on mobile click
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
      className="sticky top-0 z-50 transition-all duration-300 w-full"
      style={{ backgroundColor: `rgba(255, 255, 255, ${bgOpacity})`, marginBottom: 0 }}
    >
      <div className="flex justify-center items-center">
        <div className="container px-5">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3" style={{ height: "70px" }}>
              <img
                src="/logo.png"
                alt="Logo"
                className="h-full object-contain"
                style={{ width: "auto", maxWidth: "60px" }}
              />
              <div className="leading-tight">
                <div className="text-sm text-gray-700">Sistem Pengaduan</div>
                <div className="text-lg font-bold text-[#001d3d]">Politeknik Caltex Riau</div>
              </div>
            </div>

            {/* Toggle Button (Mobile) */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#2596be] text-2xl focus:outline-none">
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Navbar Menu (Desktop) */}
            <ul className="hidden md:flex items-center">
              <li className="mx-3 font-bold">
                <ListHeader href="/" title="Home" isActive={activeSection === "home"} />
              </li>
              <li className="mx-3 font-bold">
                <ListHeader href="/about" title="About" isActive={activeSection === "about"} />
              </li>
              <li className="mx-3 font-bold">
                <ListHeader href="/layanan" title="Layanan" isActive={activeSection === "layanan"} />
              </li>
              <li className="mx-3 font-bold">
                <ListHeader href="/artikel" title="Artikel" isActive={activeSection === "artikel"} />
              </li>
              <li className="mx-3 font-bold">
                <ListHeader href="/pengaduan" title="Pengaduan" isActive={activeSection === "pengaduan"} />
              </li>
              <li className="mx-3 font-bold">
                <ListHeader href="/faq" title="FAQ" isActive={activeSection === "faq"} />
              </li>
            </ul>

            {/* Auth Button */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigate("/auth")}
                className="bg-[#789cdb] text-white px-8 py-2 font-bold rounded-lg text-x2 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                Login
              </button>
            </div>
          </div>

          {/* Navbar Menu (Mobile Dropdown) */}
          {menuOpen && (
            <ul className="md:hidden flex flex-col items-start space-y-1 mb-4">
              <ListHeader href="/" title="Home" isActive={activeSection === "home"} />
              <ListHeader href="/about" title="About" isActive={activeSection === "about"} />
              <ListHeader href="/layanan" title="Layanan" isActive={activeSection === "layanan"} />
              <ListHeader href="/artikel" title="Artikel" isActive={activeSection === "artikel"} />
              <ListHeader href="/pengaduan" title="Pengaduan" isActive={activeSection === "pengaduan"} />
              <ListHeader href="/faq" title="FAQ" isActive={activeSection === "faq"} />
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/auth");
                }}
                className="bg-[#789cdb] text-white px-6 py-2 font-bold rounded-lg text-sm mt-2"
              >
                Login
              </button>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
