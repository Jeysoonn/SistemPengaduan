import React, { useState, useEffect } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import { notesAPI } from "../../service/api"; // Import notesAPI

export default function Laporan() {
  const [pengaduanList, setPengaduanList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data pengaduan dari API (menggunakan axios dari api.js)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil data menggunakan axios dari api.js
        const data = await notesAPI.fetchNotes();
        setPengaduanList(data);
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
            {pengaduanList.map((pengaduan) => (
              <tr
                key={pengaduan.ID_Pengaduan}
                className="border-t border-gray-200"
              >
                <td className="px-4 py-2 text-sm text-gray-700">
                  {pengaduan.ID_Pengaduan}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {pengaduan.Judul_Laporan}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {pengaduan.Deskripsi}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {pengaduan.Tujuan_Laporan}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {pengaduan.Tanggal_Pengaduan}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  <a
                    href={`/path/to/files/${pengaduan.Bukti}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Lihat Bukti
                  </a>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {pengaduan.Status}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {pengaduan.ID_User}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
