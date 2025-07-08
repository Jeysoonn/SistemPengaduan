import { FaNewspaper, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PageHeader from "../../component/Mahasiswa/PageHeader";
import AdminViewIndicator from "../../component/AdminViewIndicator";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Artikel() {
  const [currentPage, setCurrentPage] = useState(0);
  const [fadeArticle, setFadeArticle] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  const artikelList = [
    {
      id: 1,
      judul: "Panduan Lengkap Menggunakan Sistem Pengaduan",
      ringkasan:
        "Pelajari cara menggunakan sistem pengaduan kampus dengan efektif untuk melaporkan masalah dan mengikuti perkembangannya.",
      tanggal: "15 Mei 2025",
      penulis: "Admin PCR",
      kategori: "NEWS",
      gambar:
        "https://ui-avatars.com/api/?name=Panduan+Sistem&background=2FB6CD&color=fff&size=200",
    },
    {
      id: 2,
      judul: "Tips Membuat Laporan Pengaduan yang Baik",
      ringkasan:
        "Ketahui cara menyusun laporan pengaduan yang jelas, informatif, dan mudah ditindaklanjuti oleh pihak kampus.",
      tanggal: "20 Juni 2025",
      penulis: "Tim Layanan",
      kategori: "NEWS",
      gambar:
        "https://ui-avatars.com/api/?name=Tips+Laporan&background=2FB6CD&color=fff&size=200",
    },
    {
      id: 3,
      judul: "Jenis-jenis Pengaduan yang Dapat Dilaporkan",
      ringkasan:
        "Informasi tentang berbagai kategori pengaduan yang dapat dilaporkan melalui sistem pengaduan kampus.",
      tanggal: "5 Juli 2025",
      penulis: "BAAK PCR",
      kategori: "NEWS",
      gambar:
        "https://ui-avatars.com/api/?name=Jenis+Pengaduan&background=2FB6CD&color=fff&size=200",
    },
    {
      id: 4,
      judul: "Proses Penanganan Pengaduan di PCR",
      ringkasan:
        "Penjelasan tentang alur dan proses penanganan pengaduan dari awal pelaporan hingga penyelesaian masalah.",
      tanggal: "12 Agustus 2025",
      penulis: "Tim Pengembang",
      kategori: "NEWS",
      gambar:
        "https://ui-avatars.com/api/?name=Proses+Penanganan&background=2FB6CD&color=fff&size=200",
    },
  ];

  const totalPages = artikelList.length;

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setMounted(true), 100);
  }, []);

  const changePage = (index) => {
    if (index >= 0 && index < totalPages) {
      setFadeArticle(false);
      setTimeout(() => {
        setCurrentPage(index);
        setFadeArticle(true);
      }, 200);
    }
  };

  useEffect(() => {
    setFadeArticle(true);
  }, []);

  const artikel = artikelList[currentPage];

  return (
    <div className="relative bg-gray-50 text-gray-800 overflow-hidden pb-16">
      <AdminViewIndicator />

      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-40 pointer-events-none overflow-visible -z-10"
      >
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#a8d0ff"
            fillOpacity="0.25"
            d="M0,64L60,69.3C120,75,240,85,360,90.7C480,96,600,96,720,101.3C840,107,960,117,1080,117.3C1200,117,1320,107,1380,101.3L1440,96L1440,0L0,0Z"
          ></path>
          <circle cx="300" cy="80" r="60" fill="#2579a9" fillOpacity="0.1" />
          <circle cx="1200" cy="40" r="90" fill="#1976d2" fillOpacity="0.1" />
        </svg>
      </div>

      <PageHeader title="Artikel" icon={<FaNewspaper className="text-2xl text-[#fbfbfa]" />} />

      <section className="py-16 px-4 md:px-8 max-w-screen-xl mx-auto relative">
        <div
          className={`flex flex-col space-y-6 transition-all duration-700 ease-out transform mt-16 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center space-x-6">
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 0}
              className="p-3 rounded-full border-2 border-[#37CAD2] text-[#37CAD2] hover:bg-[#e0f7fa] disabled:opacity-30 transition"
              aria-label="Previous Artikel"
            >
              <FaChevronLeft size={20} />
            </button>

            <div
              className={`flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden transition-opacity duration-500 flex-grow ${
                fadeArticle ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="w-full md:w-1/3">
                <img
                  className="w-full h-64 md:h-96 object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                  src={artikel.gambar}
                  alt={artikel.judul}
                />
              </div>
              <div className="p-4 md:p-8 w-full md:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-bold text-gray-700">{artikel.kategori}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{artikel.tanggal}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 hover:text-[#2596be] transition-colors">
                    {artikel.judul}
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">{artikel.ringkasan}</p>
                </div>
                <button
                  onClick={() => navigate(`/artikel/${artikel.id}`)}
                  className="mt-6 flex items-center text-[#2FB6CD] font-semibold hover:text-[#1d8a9c] transition-colors"
                  aria-label={`Baca selengkapnya ${artikel.judul}`}
                >
                  Baca selengkapnya <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>

            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className="p-3 rounded-full border-2 border-[#37CAD2] text-[#37CAD2] hover:bg-[#e0f7fa] disabled:opacity-30 transition"
              aria-label="Next Artikel"
            >
              <FaChevronRight size={20} />
            </button>
          </div>

          <div className="flex justify-center space-x-2 mt-6 flex-wrap">
            {artikelList.map((_, index) => (
              <button
                key={index}
                onClick={() => changePage(index)}
                className={`w-10 h-10 rounded-full border-2 border-[#37CAD2] flex items-center justify-center transition-all duration-300 ${
                  currentPage === index
                    ? "bg-[#37CAD2] text-white scale-110"
                    : "bg-white text-[#2FB6CD] hover:bg-[#e0f7fa]"
                }`}
                aria-label={`Halaman artikel ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
