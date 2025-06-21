import React, { useState, useEffect } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import { pengaduanAPI } from "../../service/apiPengaduan";
import { tanggapanAPI } from "../../service/apiTanggapan";
import { userAPI } from "../../service/apiUser";

export default function Laporan() {
  const [pengaduanList, setPengaduanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPengaduan, setSelectedPengaduan] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [formData, setFormData] = useState({
    judul_laporan: "",
    deskripsi: "",
    tujuan_laporan: "",
    status: "",
    tanggapan: "",
  });
  const [editFormData, setEditFormData] = useState({
    judul_laporan: "",
    deskripsi: "",
    tujuan_laporan: "",
    tanggal_pengaduan: "",
    bukti: "",
    status: "",
    id_user: "",
  });
  const [tanggapanList, setTanggapanList] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await pengaduanAPI.fetchPengaduan();
        if (Array.isArray(data)) {
          setPengaduanList(data.filter(item => item.status !== "Selesai"));
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

  const uniqueTujuanLaporan = ["Semua", ...new Set(pengaduanList.map(item => item.tujuan_laporan))];

  const filteredPengaduan = activeFilter === "Semua"
    ? pengaduanList
    : pengaduanList.filter(item => item.tujuan_laporan === activeFilter);

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

  const handleSubmitTanggapan = async (e) => {
    e.preventDefault();

    try {
      const lastTanggapan = await tanggapanAPI.fetchLastTanggapan();
      const newIdTanggapan = lastTanggapan.length > 0 ? lastTanggapan[0].id_tanggapan + 1 : 1;

      const tanggapanData = {
        id_tanggapan: newIdTanggapan,
        isi_tanggapan: formData.tanggapan,
        id_pengaduan: selectedPengaduan.id_pengaduan,
        id_user: selectedPengaduan.id_user,
        tanggal_tanggapan: new Date().toISOString(),
      };

      await tanggapanAPI.createTanggapan(tanggapanData);
      setTanggapanList((prevList) => [...prevList, tanggapanData]);
      setFormData({ ...formData, tanggapan: "" });
      await pengaduanAPI.updateStatusToSelesai(selectedPengaduan.id_pengaduan);

      const updatedData = await pengaduanAPI.fetchPengaduan();
      setPengaduanList(updatedData.filter(item => item.status !== "Selesai"));
      handleModalClose();
    } catch (error) {
      console.error("Error submitting tanggapan:", error);
    }
  };

  const handleEditModalOpen = (pengaduan) => {
    setSelectedPengaduan(pengaduan);
    setEditFormData({
      judul_laporan: pengaduan.judul_laporan,
      deskripsi: pengaduan.deskripsi,
      tujuan_laporan: pengaduan.tujuan_laporan,
      tanggal_pengaduan: pengaduan.tanggal_pengaduan,
      bukti: pengaduan.bukti,
      status: pengaduan.status,
      id_user: pengaduan.id_user,
    });
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedPengaduan(null);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await pengaduanAPI.updatePengaduan(selectedPengaduan.id_pengaduan, editFormData);
      const updatedData = await pengaduanAPI.fetchPengaduan();
      setPengaduanList(updatedData.filter(item => item.status !== "Selesai"));
      handleEditModalClose();
      // Show success message
      alert("Pengaduan berhasil diperbarui!");
    } catch (error) {
      console.error("Error updating pengaduan:", error);
      alert("Gagal memperbarui pengaduan. Silakan coba lagi.");
    }
  };

  const handleDelete = async (id_pengaduan) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus pengaduan ini?")) return;

    try {
      // Optimistic update
      setPengaduanList(prev => prev.filter(item => item.id_pengaduan !== id_pengaduan));

      await pengaduanAPI.deletePengaduan(id_pengaduan);

      alert("Pengaduan berhasil dihapus!");
    } catch (error) {
      console.error("Full deletion error:", error);

      // Rollback optimistic update
      const freshData = await pengaduanAPI.fetchPengaduan();
      setPengaduanList(freshData.filter(item => item.status !== "Selesai"));

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
      <h1 className="text-black text-2xl font-bold mb-4">Tabel Pengaduan</h1>
      <Breadcrumb items={["Home", "Dashboard", "Pengaduan"]} />

      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        {uniqueTujuanLaporan.map((tujuan) => (
          <button
            key={tujuan}
            onClick={() => setActiveFilter(tujuan)}
            className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap ${activeFilter === tujuan
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {tujuan}
          </button>
        ))}
      </div>

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
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPengaduan.length > 0 ? (
                filteredPengaduan.map((pengaduan, index) => (
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${pengaduan.status === 'Selesai'
                          ? 'bg-green-100 text-green-800'
                          : pengaduan.status === 'Diproses'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {pengaduan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleModalOpen(pengaduan)}
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                        title="Tanggapan"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleEditModalOpen(pengaduan)}
                        className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    <div className="flex flex-col items-center justify-center py-8">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="mt-2 text-gray-600">Tidak ada pengaduan</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tanggapan */}
      {isModalOpen && selectedPengaduan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-medium text-black">
                Beri Tanggapan
              </h3>
              <button
                onClick={handleModalClose}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmitTanggapan} className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="judul_laporan">
                  Judul Laporan
                </label>
                <input
                  type="text"
                  id="judul_laporan"
                  name="judul_laporan"
                  value={formData.judul_laporan}
                  className="w-full px-3 py-2 border rounded shadow appearance-none text-black bg-gray-100"
                  disabled
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tanggapan">
                  Tanggapan
                </label>
                <textarea
                  id="tanggapan"
                  name="tanggapan"
                  value={formData.tanggapan}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border rounded shadow appearance-none text-black"
                  required
                  placeholder="Masukkan tanggapan Anda..."
                ></textarea>
              </div>

              {tanggapanList.length > 0 && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Tanggapan Sebelumnya
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
                  type="button"
                  onClick={handleModalClose}
                  className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Simpan Tanggapan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {isEditModalOpen && selectedPengaduan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-medium text-black">
                Edit Pengaduan
              </h3>
              <button
                onClick={handleEditModalClose}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit_judul_laporan">
                  Judul Laporan
                </label>
                <input
                  type="text"
                  id="edit_judul_laporan"
                  name="judul_laporan"
                  value={editFormData.judul_laporan}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border rounded shadow appearance-none text-black"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit_deskripsi">
                  Deskripsi
                </label>
                <textarea
                  id="edit_deskripsi"
                  name="deskripsi"
                  value={editFormData.deskripsi}
                  onChange={handleEditInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border rounded shadow appearance-none text-black"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit_status">
                  Status
                </label>
                <select
                  id="edit_status"
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border rounded shadow appearance-none text-black"
                  required
                >
                  <option value="Menunggu">Menunggu</option>
                  <option value="Diproses">Diproses</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleEditModalClose}
                  className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}