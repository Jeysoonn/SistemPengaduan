import React from 'react';

const DaftarLaporan = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Laporan Pengaduan</h2>

        {/* Filter */}
        <div className="mb-4">
          <input type="date" className="px-4 py-2 rounded-lg border border-gray-300" />
          <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Filter</button>
        </div>

        {/* Tabel */}
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Tanggal</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Laporan</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 px-4 text-sm text-gray-800">2025-06-10</td>
              <td className="py-3 px-4 text-sm text-gray-600">Laporan Pengaduan #1</td>
              <td className="py-3 px-4 text-sm text-green-600">Selesai</td>
              <td className="py-3 px-4 text-sm">
                <button className="bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600">Lihat</button>
              </td>
            </tr>
            {/* Tambahkan baris lainnya sesuai kebutuhan */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarLaporan;
