import { useEffect, useState } from "react";

export default function PageHeader({ title = "Judul Halaman", icon }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100); // jeda animasi kecil
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-[#e6f6fb] to-[#ffffff] min-h-[220px] flex items-center justify-center text-center overflow-hidden">
      {/* Ornamen bulat */}
      <div className="absolute top-[-120px] left-[-120px] w-[280px] h-[280px] bg-[#e0f4fb] rounded-full opacity-70 z-0"></div>
      <div className="absolute top-24 left-[-90px] w-[200px] h-[200px] bg-[#c0e6f5] rounded-full opacity-50 z-0"></div>
      <div className="absolute bottom-[-140px] right-[-140px] w-[320px] h-[320px] bg-[#d1ecf9] rounded-full opacity-70 z-0"></div>
      <div className="absolute bottom-28 right-[-100px] w-[180px] h-[180px] bg-[#b0dff5] rounded-full opacity-50 z-0"></div>

      {/* Konten Header */}
      <div className="relative z-10">
        <div className="flex flex-col items-center justify-center">
          <div
            className={`bg-[#2FB6CD] text-white p-4 rounded-full mb-4 shadow-md transform transition-all duration-1000 ease-in-out 
              ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {icon}
          </div>
          <h1
            className={`text-2xl sm:text-3xl font-bold text-gray-800 transform transition-all duration-1000 ease-in-out
              ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {title}
          </h1>
          <div
            className={`w-16 h-1 mt-2 bg-[#2FB6CD] rounded-full mx-auto transform transition-all duration-1000 ease-in-out
              ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          ></div>
        </div>
      </div>
    </div>
  );
}
