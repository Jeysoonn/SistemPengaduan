import React, { useState, useEffect } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import { pengaduanAPI } from "../../service/apiPengaduan"; // Import notesAPI

export default function Laporan() {
  const [pengaduanList, setPengaduanList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data pengaduan dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil data menggunakan axios dari api.js
        const data = await pengaduanAPI.fetchNotes();

        // Pastikan data adalah array sebelum diset
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Breadcrumb />

      <h2 className="text-2xl font-semibold mt-6 mb-4">Tabel Pengaduan</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                ID Pengaduan
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
            </tr>
          </thead>
          <tbody>
            {pengaduanList.length > 0 ? (
              pengaduanList.map((pengaduan) => (
                <tr
                  key={pengaduan.id_pengaduan}
                  className="border-t border-gray-200"
                >
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {pengaduan.id_pengaduan}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {pengaduan.judul_laporan}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {pengaduan.deskripsi}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {pengaduan.tujuan_laporan}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {pengaduan.tanggal_pengaduan}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <a
                      href={`/path/to/files/${pengaduan.bukti}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Lihat Bukti
                    </a>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {pengaduan.status}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {pengaduan.id_user}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="px-4 py-2 text-sm text-gray-700 text-center"
                >
                  Tidak ada pengaduan untuk ditampilkan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
