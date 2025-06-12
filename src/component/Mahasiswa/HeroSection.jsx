import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
    const [showImage, setShowImage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setShowImage(true), 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            id="home"
            className="flex justify-center items-center mt-10 relative min-h-[500px]"
        >
            <div className="container px-5">
                <div className="flex items-center flex-col md:flex-row">
                    {/* Kiri: Teks */}
                    <div className="relative z-10 md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                        <h1 className="text-5xl font-poppins-extrabold md:text-6xl font-extrabold text-[#2596be] py-5">
                            Sistem Pengaduan Online PCR
                        </h1>
                        <h3 className="text-lg font-poppins-bold md:text-2xl text-gray-700 mb-6">
                            Silakan ajukan pengaduan Anda untuk meningkatkan kualitas layanan kampus.
                        </h3>

                        {/* Tombol Ajukan Pengaduan */}
                        <button
                            onClick={() => navigate("/formulir")}
                            className="bg-white text-gray-500 text-sm font-semibold px-10 py-3 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.25)] hover:bg-gray-100 transition duration-300 flex items-center gap-4"
                        >
                            Ajukan Pengaduan
                            <span className="text-lg">➔</span>
                        </button>
                    </div>

                    {/* Kanan: Gambar dengan animasi */}
                    <div className="relative z-10 md:w-1/2 flex justify-center">
                        <div
                            className={`bg-white rounded-lg shadow-lg overflow-hidden max-w-md md:max-w-xl transform transition-all duration-700 ease-in-out
                ${showImage ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}
                        >
                            <img
                                src="/tia.jpg"
                                alt="Illustration"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
