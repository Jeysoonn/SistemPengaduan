import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [showText, setShowText] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 300);
    const imageTimer = setTimeout(() => setShowImage(true), 500); // sedikit delay lebih lama gambar

    return () => {
      clearTimeout(textTimer);
      clearTimeout(imageTimer);
    };
  }, []);

  return (
    <div
      id="home"
      className="relative flex items-center justify-center min-h-[600px] px-4 sm:px-6 md:px-12 overflow-hidden bg-gradient-to-r from-[#e6f6fb] to-[#ffffff]"
    >
      {/* Ornamen background */}
      <div className="absolute top-[-120px] left-[-120px] w-[280px] h-[280px] bg-[#e0f4fb] rounded-full opacity-70 z-0"></div>
      <div className="absolute top-24 left-[-90px] w-[200px] h-[200px] bg-[#c0e6f5] rounded-full opacity-50 z-0"></div>
      <div className="absolute bottom-[-140px] right-[-140px] w-[320px] h-[320px] bg-[#d1ecf9] rounded-full opacity-70 z-0"></div>
      <div className="absolute bottom-28 right-[-100px] w-[180px] h-[180px] bg-[#b0dff5] rounded-full opacity-50 z-0"></div>

      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          {/* Teks */}
          <div className="md:w-1/2 text-center md:text-left space-y-6">
            <h1
              className={`text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-[#2596be] leading-tight drop-shadow-sm transition-all duration-1000 ease-in-out
              ${showText ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              Sistem Pengaduan Online PCR
            </h1>

            <h3
              className={`text-base sm:text-lg md:text-xl text-gray-700 font-medium transition-all duration-1000 ease-in-out
              ${showText ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              Silakan ajukan pengaduan Anda untuk meningkatkan kualitas layanan kampus.
            </h3>

            <div
              className={`transition-opacity duration-1000 ease-in-out delay-400 ${
                showText ? "opacity-100" : "opacity-0"
              }`}
            >
              <button
                onClick={() => navigate("/pengaduan")}
                className="mt-3 bg-[#34BBD1] hover:bg-[#2FB6CD] text-white text-sm md:text-base font-semibold px-8 py-3 rounded-full shadow-md transition-transform duration-300 hover:scale-105 flex items-center gap-3 mx-auto md:mx-0"
              >
                Ajukan Pengaduan
                <span className="text-xl">➔</span>
              </button>
            </div>
          </div>

          {/* Gambar */}
          <div className="md:w-1/2 flex justify-center">
            <div
              className={`bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md transition-all duration-1000 ease-in-out
              ${showImage ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}
            >
              <img
                src="/tia.jpg"
                alt="Illustration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
