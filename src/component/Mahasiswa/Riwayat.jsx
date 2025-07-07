import { useEffect, useState } from "react";
import { FaCheckCircle, FaClock, FaTimesCircle, FaExclamationTriangle } from "react-icons/fa";
import { pengaduanAPI } from "../../service/apiPengaduan";
import { useUser } from "../../context/UserContext";

export default function RiwayatPengaduan() {
  const [riwayat, setRiwayat] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPage, setShowPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchPengaduan = async () => {
      try {
        setLoading(true);
        const allPengaduan = await pengaduanAPI.fetchPengaduan();
        
        // Filter pengaduan by logged-in user's ID
        const userPengaduan = allPengaduan.filter(
          (p) => p.id_user === user.id_user
        );
        
        setRiwayat(userPengaduan);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch pengaduan:", err);
        setError("Gagal memuat data riwayat pengaduan");
      } finally {
        setLoading(false);
        setTimeout(() => setShowPage(true), 100);
      }
    };

    fetchPengaduan();
  }, [user]);

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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="relative bg-white py-16 px-6 md:px-12 overflow-visible">
      {/* Elemen dekoratif kiri atas */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#8fd8f8] opacity-20 rounded-full z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white bg-gradient-to-r from-[#37CAD2] to-[#2596be] py-4 rounded-xl shadow-lg mb-10">
          Riwayat Pengaduan
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2596be]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
            <FaExclamationTriangle className="inline-block mr-2" />
            {error}
          </div>
        ) : riwayat.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 text-[#2596be] px-4 py-3 rounded-lg text-center">
            Anda belum memiliki riwayat pengaduan
          </div>
        ) : (
          <div className="grid gap-6">
            {riwayat.map((item) => (
              <div
                key={item.id_pengaduan}
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all p-6"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-[#1e7da0]">{item.judul_laporan}</h3>
                  <span className="text-sm text-gray-400">{formatDate(item.tanggal_pengaduan)}</span>
                </div>

                <p className="text-gray-600 text-sm mb-3">
                  {item.deskripsi.length > 100
                    ? item.deskripsi.substring(0, 100) + "..."
                    : item.deskripsi}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-700 mt-4">
                  <div>
                    <strong className="text-gray-800">Tujuan:</strong> {item.tujuan_laporan}
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
        )}
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
                <strong className="text-[#5DC7D1]">Judul:</strong> {selected.judul_laporan}
              </div>
              <div>
                <strong className="text-[#5DC7D1]">Deskripsi:</strong><br />
                <p className="mt-1">{selected.deskripsi}</p>
              </div>
              <div>
                <strong className="text-[#5DC7D1]">Tanggal:</strong> {formatDate(selected.tanggal_pengaduan)}
              </div>
              <div>
                <strong className="text-[#5DC7D1]">Tujuan:</strong> {selected.tujuan_laporan}
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