import React, { useState, useEffect } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import { pengaduanAPI } from "../../service/apiPengaduan";
import { tanggapanAPI } from "../../service/apiTanggapan";
import { userAPI } from "../../service/apiUser";

export default function RiwayatDaftarLaporan() {
  const [pengaduanList, setPengaduanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPengaduan, setSelectedPengaduan] = useState(null);
  const [formData, setFormData] = useState({
    judul_laporan: "",
    deskripsi: "",
    tujuan_laporan: "",
    status: "",
    tanggapan: "",
  });
  const [tanggapanList, setTanggapanList] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await pengaduanAPI.fetchPengaduan();
        if (Array.isArray(data)) {
          setPengaduanList(data.filter(item => 
            item.tujuan_laporan === "Security" && item.status === "Selesai"
          ));
        } else {
          console.error("Data yang diterima bukan array:", data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();

    const fetchUsers = async () => {
      try {
        const users = await userAPI.fetchUser();
        setUserList(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleModalOpen = async (pengaduan) => {
    setSelectedPengaduan(pengaduan);
    setFormData({
      judul_laporan: pengaduan.judul_laporan,
      deskripsi: pengaduan.deskripsi,
      tujuan_laporan: pengaduan.tujuan_laporan,
      status: pengaduan.status,
      tanggapan: "",
    });

    try {
      const tanggapanData = await tanggapanAPI.fetchTanggapan(pengaduan.id_pengaduan);
      setTanggapanList(tanggapanData);
    } catch (error) {
      console.error("Error fetching tanggapan:", error);
    }

    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPengaduan(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = async (id_pengaduan) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus pengaduan ini?")) return;

    try {
      setPengaduanList(prev => prev.filter(item => item.id_pengaduan !== id_pengaduan));
      await pengaduanAPI.deletePengaduan(id_pengaduan);
      alert("Pengaduan berhasil dihapus!");
    } catch (error) {
      console.error("Full deletion error:", error);
      const freshData = await pengaduanAPI.fetchPengaduan();
      setPengaduanList(freshData.filter(item => 
        item.tujuan_laporan === "Security" && item.status === "Selesai"
      ));
      alert(`Gagal menghapus: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-black text-2xl font-bold mb-4">Riwayat Pengaduan</h1>
      <Breadcrumb items={["Home", "Dashboard", "Riwayat Pengaduan"]} />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Judul
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deskripsi
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tujuan
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pelapor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pengaduanList.length > 0 ? (
                pengaduanList.map((pengaduan, index) => (
                  <tr key={pengaduan.id_pengaduan} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-700 max-w-xs">
                      <div className="line-clamp-2 font-medium">
                        {pengaduan.judul_laporan}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-700 max-w-xs">
                      <div className="line-clamp-2">
                        {pengaduan.deskripsi}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                      {pengaduan.tujuan_laporan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(pengaduan.tanggal_pengaduan).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {userList.find(user => user.id_user === pengaduan.id_user)?.nama || pengaduan.id_user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleModalOpen(pengaduan)}
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                        title="Detail"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(pengaduan.id_pengaduan)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                        title="Hapus"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    <div className="flex flex-col items-center justify-center py-8">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="mt-2 text-gray-600">Tidak ada riwayat pengaduan</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail */}
      {isModalOpen && selectedPengaduan && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-medium text-black">
                Detail Pengaduan
              </h3>
              <button
                onClick={handleModalClose}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Judul Laporan
                </label>
                <div className="w-full px-3 py-2 border rounded shadow appearance-none text-black bg-gray-100">
                  {formData.judul_laporan}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Deskripsi
                </label>
                <div className="w-full px-3 py-2 border rounded shadow appearance-none text-black bg-gray-100 min-h-[100px]">
                  {formData.deskripsi}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tujuan Laporan
                </label>
                <div className="w-full px-3 py-2 border rounded shadow appearance-none text-black bg-gray-100">
                  {formData.tujuan_laporan}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Bukti
                </label>
                <div className="w-full px-3 py-2 border rounded shadow appearance-none text-black bg-gray-100">
                  {formData.bukti ? (
                    <a
                      href={formData.bukti}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Lihat Bukti
                    </a>
                  ) : (
                    <span className="text-gray-500 italic">Tidak ada bukti</span>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Status
                </label>
                <div className="w-full px-3 py-2 border rounded shadow appearance-none text-black bg-gray-100">
                  {formData.status}
                </div>
              </div>

              {tanggapanList.length > 0 && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Tanggapan
                  </label>
                  <div className="space-y-2">
                    {tanggapanList.map((tanggapan, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded">
                        <p className="text-sm text-gray-700">{tanggapan.isi_tanggapan}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(tanggapan.tanggal_tanggapan).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={handleModalClose}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}