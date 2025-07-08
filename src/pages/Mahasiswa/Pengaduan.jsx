import { useEffect, useState } from "react";
import {
  FaPenFancy,
  FaShare,
  FaCommentDots,
  FaComments,
  FaCheckCircle,
} from "react-icons/fa";
import FormulirPengaduan from "../../component/Mahasiswa/FormulirPengaduan";
import RiwayatPengaduan from "../../component/Mahasiswa/Riwayat";
import PageHeader from "../../component/Mahasiswa/PageHeader";
import AdminViewIndicator from "../../component/AdminViewIndicator";

export default function Pengaduan() {
  const steps = [
    {
      icon: <FaPenFancy className="text-white text-2xl" />,
      title: "Tulis Laporan",
      desc: "Mahasiswa mengisi formulir pengaduan dengan lengkap dan jelas",
      bg: "bg-[#5DC7D1]",
    },
    {
      icon: <FaShare className="text-white text-2xl" />,
      title: "Verifikasi Admin",
      desc: "Admin mengecek dan memverifikasi laporan dalam 1-3 hari",
      bg: "bg-[#5DC7D1]",
    },
    {
      icon: <FaCommentDots className="text-white text-2xl" />,
      title: "Diteruskan ke Tujuan",
      desc: "Laporan diteruskan ke bagian yang dituju (BSTI, BAAK, dll)",
      bg: "bg-[#5DC7D1]",
    },
    {
      icon: <FaComments className="text-white text-2xl" />,
      title: "Tanggapan Tujuan",
      desc: "Bagian tujuan menanggapi laporan dan memberikan solusi",
      bg: "bg-[#5DC7D1]",
    },
    {
      icon: <FaCheckCircle className="text-white text-2xl" />,
      title: "Selesai",
      desc: "Pengaduan selesai setelah mahasiswa menerima solusi",
      bg: "bg-[#5DC7D1]",
    },
  ];

  const [show, setShow] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-opacity duration-[1200ms] ease-out ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <AdminViewIndicator />
      <PageHeader
        title="Pengaduan"
        icon={<FaPenFancy className="text-2xl text-white" />}
      />

      <FormulirPengaduan />

      {/* Alur Proses Section */}
      <div className="bg-[#f9fafb] py-12 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-[#2FB6CD] mb-10">
            Alur Proses Pengaduan
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-2xl shadow-md w-full h-full min-h-[260px]"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${step.bg} shadow-lg`}
                >
                  {step.icon}
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <RiwayatPengaduan />
    </div>
  );
}
