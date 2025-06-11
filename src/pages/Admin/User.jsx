import React, { useState, useEffect } from "react";
import { notesAPI } from "../../service/apiUser"; // Import notesAPI
import Breadcrumb from "../../component/Breadcrumb";

export default function Laporan() {
  const [pengaduanList, setPengaduanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    role: ""
  });

  // Mengambil data pengaduan dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await notesAPI.fetchNotes();

        if (Array.isArray(data)) {
          setPengaduanList(data);
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your submit logic here
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Breadcrumb />
      <h2 className="text-2xl font-semibold mt-6 mb-4">Tabel Pengaduan</h2>
      
      {/* Form Input for User
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tambah Pengguna</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Nama"
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
            required
          />
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
            required
          />
          <button type="submit" className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-2xl">
            Submit
          </button>
        </form>
      </div> */}

      {/* Tabel Data Pengaduan */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">ID Pengaduan</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Nama</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Role</th>
            </tr>
          </thead>
          <tbody>
            {pengaduanList.length > 0 ? (
              pengaduanList.map((pengaduan) => (
                <tr key={pengaduan.id_user} className="border-t border-gray-200">
                  <td className="px-4 py-2 text-sm text-gray-700">{pengaduan.id_user}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{pengaduan.nama}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{pengaduan.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{pengaduan.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-sm text-gray-700 text-center">
                  Tidak ada data untuk ditampilkan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
