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
  const [activeFilter, setActiveFilter] = useState("BSTI"); // New state for active filter
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
  const [tanggapanList, setTanggapanList] = useState([]); // List tanggapan
  const [userList, setUserList] = useState([]);

  // Mengambil data pengaduan dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await pengaduanAPI.fetchPengaduan();
        if (Array.isArray(data)) {
          setPengaduanList(data.filter(item => item.status === "Selesai")); // Tampilkan hanya pengaduan Selesai
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

    // Fetch user list
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

  // Get unique tujuan_laporan values for tabs
  const uniqueTujuanLaporan = ["BSTI"];

  // Filter pengaduan based on active filter
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
      tanggapan: "", // Reset tanggapan untuk modal
    });

    // Mengambil tanggapan terkait pengaduan ini
    try {
      const tanggapanData = await tanggapanAPI.fetchTanggapan(pengaduan.id_pengaduan);
      setTanggapanList(tanggapanData); // Menyimpan tanggapan yang terkait dengan pengaduan
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
      // Step 1: Fetch the last `id_tanggapan`
      const lastTanggapan = await tanggapanAPI.fetchLastTanggapan();

      // Step 2: Increment the `id_tanggapan` by 1
      const newIdTanggapan = lastTanggapan.length > 0 ? lastTanggapan[0].id_tanggapan + 1 : 1;

      const tanggapanData = {
        id_tanggapan: newIdTanggapan, // New incremented ID
        isi_tanggapan: formData.tanggapan,
        id_pengaduan: selectedPengaduan.id_pengaduan,
        id_user: selectedPengaduan.id_user,
        tanggal_tanggapan: new Date().toISOString(),
      };

      console.log("Tanggapan Data:", tanggapanData);

      // Step 3: Call the createTanggapan function
      await tanggapanAPI.createTanggapan(tanggapanData);

      // Step 4: Update the list and reset the form
      setTanggapanList((prevList) => [...prevList, tanggapanData]);
      setFormData({ ...formData, tanggapan: "" }); // Reset tanggapan field

      // Step 5: Update status to 'Selesai'
      await pengaduanAPI.updateStatusToSelesai(selectedPengaduan.id_pengaduan);

      // Step 6: Re-fetch the Pengaduan list to update the table
      const updatedData = await pengaduanAPI.fetchPengaduan();
      setPengaduanList(updatedData.filter(item => item.status === "Selesai")); // Filter out "Selesai" pengaduan

      // Step 7: Close the modal after successful submission
      handleModalClose(); // Close the modal after submitting the tanggapan

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
      setPengaduanList(updatedData.filter(item => item.status === "Selesai"));
      handleEditModalClose();
    } catch (error) {
      console.error("Error updating pengaduan:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengaduan ini?")) {
      try {
        await pengaduanAPI.deletePengaduan(id);
        const updatedData = await pengaduanAPI.fetchPengaduan();
        setPengaduanList(updatedData.filter(item => item.status === "Selesai"));
      } catch (error) {
        console.error("Error deleting pengaduan:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-900">Tabel Pengaduan</h2>
      <Breadcrumb />

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-4 overflow-x-auto">
        {uniqueTujuanLaporan.map((tujuan) => (
          <button
            key={tujuan}
            onClick={() => setActiveFilter(tujuan)}
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${activeFilter === tujuan
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {tujuan}
          </button>
        ))}
      </div>


      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                No
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Judul Laporan
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Deskripsi
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Tujuan Laporan
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Tanggal Pengaduan
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Bukti
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                ID User
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPengaduan.length > 0 ? (
              filteredPengaduan.map((pengaduan, index) => (
                <tr key={pengaduan.id_pengaduan} className="border-t border-gray-200">
                  <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{pengaduan.judul_laporan}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{pengaduan.deskripsi}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{pengaduan.tujuan_laporan}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{pengaduan.tanggal_pengaduan}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <a href={`/path/to/files/${pengaduan.bukti}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      Lihat Bukti
                    </a>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">{pengaduan.status}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{
                    (userList.find(user => user.id_user === pengaduan.id_user)?.nama) || pengaduan.id_user
                  }</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleModalOpen(pengaduan)}
                        className="px-3 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded"
                      >
                        Tanggapan
                      </button>
                      {/* <button
                        onClick={() => handleEditModalOpen(pengaduan)}
                        className="px-3 py-1 text-white bg-yellow-500 hover:bg-yellow-600 rounded"
                      >
                        Edit
                      </button> */}
                      {/* <button
                        onClick={() => handleDelete(pengaduan.id_pengaduan)}
                        className="px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded"
                      >
                        Hapus
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-4 py-2 text-sm text-gray-700 text-center">
                  Tidak ada pengaduan untuk ditampilkan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedPengaduan && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">Detail Pengaduan</h3>
                <button
                  onClick={handleModalClose}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4">
              <form className="space-y-6">
                {/* Judul Laporan */}
                <div className="space-y-2">
                  <label htmlFor="judul_laporan" className="block text-sm font-medium text-gray-700">
                    Judul Laporan
                  </label>
                  <input
                    type="text"
                    id="judul_laporan"
                    name="judul_laporan"
                    value={formData.judul_laporan}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                    disabled
                  />
                </div>

                {/* Deskripsi */}
                <div className="space-y-2">
                  <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">
                    Deskripsi
                  </label>
                  <textarea
                    id="deskripsi"
                    name="deskripsi"
                    value={formData.deskripsi}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                    disabled
                  />
                </div>

                {/* Tujuan Laporan */}
                <div className="space-y-2">
                  <label htmlFor="tujuan_laporan" className="block text-sm font-medium text-gray-700">
                    Tujuan Laporan
                  </label>
                  <input
                    type="text"
                    id="tujuan_laporan"
                    name="tujuan_laporan"
                    value={formData.tujuan_laporan}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                    disabled
                  />
                </div>

                {/* Tanggapan */}
                <div className="space-y-2">
                  <label htmlFor="tanggapan" className="block text-sm font-medium text-gray-700">
                    Tanggapan
                  </label>
                  <textarea
                    id="tanggapan"
                    name="tanggapan"
                    value={formData.tanggapan}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Masukkan tanggapan Anda di sini..."
                  />
                </div>

                {/* Previous Tanggapan List */}
                {tanggapanList.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Tanggapan Sebelumnya</h4>
                    <div className="space-y-3">
                      {tanggapanList.map((tanggapan, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-md">
                          <p className="text-sm text-gray-700">{tanggapan.isi_tanggapan}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(tanggapan.tanggal_tanggapan).toLocaleString('id-ID')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  onClick={handleSubmitTanggapan}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Simpan Tanggapan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedPengaduan && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">Edit Pengaduan</h3>
                <button
                  onClick={handleEditModalClose}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4">
              <form className="space-y-6" onSubmit={handleEditSubmit}>
                {/* Judul Laporan */}
                <div className="space-y-2">
                  <label htmlFor="edit_judul_laporan" className="block text-sm font-medium text-gray-700">
                    Judul Laporan
                  </label>
                  <input
                    type="text"
                    id="edit_judul_laporan"
                    name="judul_laporan"
                    value={editFormData.judul_laporan}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Deskripsi */}
                <div className="space-y-2">
                  <label htmlFor="edit_deskripsi" className="block text-sm font-medium text-gray-700">
                    Deskripsi
                  </label>
                  <textarea
                    id="edit_deskripsi"
                    name="deskripsi"
                    value={editFormData.deskripsi}
                    onChange={handleEditInputChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Tujuan Laporan */}
                <div className="space-y-2">
                  <label htmlFor="edit_tujuan_laporan" className="block text-sm font-medium text-gray-700">
                    Tujuan Laporan
                  </label>
                  <input
                    type="text"
                    id="edit_tujuan_laporan"
                    name="tujuan_laporan"
                    value={editFormData.tujuan_laporan}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Tanggal Pengaduan */}
                <div className="space-y-2">
                  <label htmlFor="edit_tanggal_pengaduan" className="block text-sm font-medium text-gray-700">
                    Tanggal Pengaduan
                  </label>
                  <input
                    type="date"
                    id="edit_tanggal_pengaduan"
                    name="tanggal_pengaduan"
                    value={editFormData.tanggal_pengaduan ? editFormData.tanggal_pengaduan.slice(0, 10) : ''}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Bukti */}
                <div className="space-y-2">
                  <label htmlFor="edit_bukti" className="block text-sm font-medium text-gray-700">
                    Bukti
                  </label>
                  <input
                    type="text"
                    id="edit_bukti"
                    name="bukti"
                    value={editFormData.bukti}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label htmlFor="edit_status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    id="edit_status"
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Menunggu">Menunggu</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>

                {/* ID User */}
                <div className="space-y-2">
                  <label htmlFor="edit_id_user" className="block text-sm font-medium text-gray-700">
                    User
                  </label>
                  <select
                    id="edit_id_user"
                    name="id_user"
                    value={editFormData.id_user}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Pilih User</option>
                    {userList.map((user) => (
                      <option key={user.id_user} value={user.id_user}>
                        {user.nama}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleEditModalClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}