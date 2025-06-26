import { useEffect, useState } from "react";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

export default function RiwayatPengaduan() {
  const [riwayat, setRiwayat] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowPage(true), 100);
    setRiwayat([
      {
        id: 1,
        judul: "Wifi lemot",
        deskripsi: "Wifi di gsg lemot parah.",
        tanggal: "2025-06-01",
        tujuan: "BSTI",
        status: "Diproses",
      },
      {
        id: 2,
        judul: "Kehilangan kunci motor",
        deskripsi: "Kehilangan kunci motor Fazzio Hybrid.",
        tanggal: "2025-06-05",
        tujuan: "Security",
        status: "Selesai",
      },
      {
        id: 3,
        judul: "Kursi rusak di ruang 124.",
        deskripsi:
          "Kursi di ruang kelas 124 patah bagian kaki dan membahayakan mahasiswa.",
        tanggal: "2025-06-10",
        tujuan: "BAAK",
        status: "Belum Diproses",
      },
    ]);
  }, []);

  const statusBadge = (status) => {
    if (status === "Selesai") {
      return (
        <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full">
          <FaCheckCircle className="text-green-500" /> {status}
        </span>
      );
    }
    if (status === "Diproses") {
      return (
        <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 text-xs rounded-full">
          <FaClock className="text-yellow-500" /> {status}
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 text-xs rounded-full">
        <FaTimesCircle className="text-red-500" /> {status}
      </span>
    );
  };

  const openModal = (laporan) => {
    setSelected(laporan);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative bg-white py-16 px-6 md:px-12 overflow-visible">
      {/* Elemen dekoratif kiri atas */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#8fd8f8] opacity-20 rounded-full z-0"></div>

      <div
        className= "relative z-10 max-w-5xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center text-white bg-gradient-to-r from-[#37CAD2] to-[#2596be] py-4 rounded-xl shadow-lg mb-10">
          Riwayat Pengaduan
        </h2>

        <div className="grid gap-6">
          {riwayat.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all p-6"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-[#1e7da0]">{item.judul}</h3>
                <span className="text-sm text-gray-400">{item.tanggal}</span>
              </div>

              <p className="text-gray-600 text-sm mb-3">
                {item.deskripsi.length > 100
                  ? item.deskripsi.substring(0, 100) + "..."
                  : item.deskripsi}
              </p>

              <div className="flex justify-between items-center text-sm text-gray-700 mt-4">
                <div>
                  <strong className="text-gray-800">Tujuan:</strong> {item.tujuan}
                </div>
                <div className="flex items-center gap-4">
                  {statusBadge(item.status)}
                  <button
                    onClick={() => openModal(item)}
                    className="text-[#2596be] text-xs hover:underline relative z-20"
                    type="button"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-xs"></div>
          <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 transform ">
            <h3 className="text-2xl font-bold text-[#2FB6CD] mb-4 text-center border-b pb-2">
              Detail Pengaduan
            </h3>
            <div className="space-y-3 text-gray-700 text-sm">
              <div>
                <strong className="text-[#5DC7D1]">Judul:</strong> {selected.judul}
              </div>
              <div>
                <strong className="text-[#5DC7D1]">Deskripsi:</strong><br />
                <p className="mt-1">{selected.deskripsi}</p>
              </div>
              <div>
                <strong className="text-[#5DC7D1]">Tanggal:</strong> {selected.tanggal}
              </div>
              <div>
                <strong className="text-[#5DC7D1]">Tujuan:</strong> {selected.tujuan}
              </div>
              <div>
                <strong className="text-[#5DC7D1]">Status:</strong> <div className="mt-3">{statusBadge(selected.status)}</div>
              </div>
            </div>
            <div className="text-right mt-6">
              <button
                onClick={closeModal}
                className="bg-[#2FB6CD] hover:bg-[#5DC7D1] text-white px-6 py-2 rounded-full shadow-md"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
