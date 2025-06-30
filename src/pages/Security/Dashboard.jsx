import React, { useEffect, useState } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import { pengaduanAPI } from "../../service/apiPengaduan";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function SecurityDashboard() {
  const [laporan, setLaporan] = useState([]);
  const [pending, setPending] = useState([]);
  const [selesai, setSelesai] = useState([]);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await pengaduanAPI.fetchPengaduan();
      const khususBAAK = data.filter(
        item => item.tujuan_laporan?.trim().toLowerCase() === "security"
      );

      setLaporan(khususBAAK);
      setPending(khususBAAK.filter(item => item.status === "Pending"));
      setSelesai(khususBAAK.filter(item => item.status === "Selesai"));

      // Generate bar chart data by month
      const countByMonth = {};
      khususBAAK.forEach(item => {
        const date = new Date(item.tanggal_pengaduan);
        const month = date.toLocaleString("default", { month: "long" });
        countByMonth[month] = (countByMonth[month] || 0) + 1;
      });
      const result = Object.entries(countByMonth).map(([month, jumlah]) => ({ month, jumlah }));
      setBarData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-cyan-800 text-3xl font-bold mb-4">Dashboard Security</h1>
      <Breadcrumb />

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-tr from-blue-500 via-cyan-500 to-teal-400 text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Total Laporan</h3>
              <p className="text-2xl font-bold text-cyan-600">{laporan.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-tr from-blue-500 via-cyan-500 to-teal-400 text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Pending</h3>
              <p className="text-2xl font-bold text-cyan-600">{pending.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-tr from-blue-500 via-cyan-500 to-teal-400 text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Selesai</h3>
              <p className="text-2xl font-bold text-teal-600">{selesai.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Bar Chart */}
        <div className="bg-white col-span-2 p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Laporan per Bulan</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="month" stroke="#8884d8" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="jumlah" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Status Laporan</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                dataKey="value"
                data={[
                  { name: "Pending", value: pending.length },
                  { name: "Selesai", value: selesai.length },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                <Cell fill="#06b6d4" />
                <Cell fill="#14b8a6" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabel Diproses */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Laporan Diproses</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gradient-to-r from-blue-100 via-cyan-100 to-teal-100 text-cyan-800">
              <tr>
                <th className="px-4 py-2 text-left">No</th>
                <th className="px-4 py-2 text-left">Nama User</th>
                <th className="px-4 py-2 text-left">Judul</th>
                <th className="px-4 py-2 text-left">Tanggal</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {pending.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">Tidak ada laporan diproses untuk BAAK.</td>
                </tr>
              ) : (
                pending.map((lap, index) => (
                  <tr key={lap.id_pengaduan} className="hover:bg-cyan-50 transition-all">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{lap.User?.nama || "Tidak diketahui"}</td>
                    <td className="px-4 py-2">{lap.judul_laporan}</td>
                    <td className="px-4 py-2">{lap.tanggal_pengaduan}</td>
                    <td className="px-4 py-2 text-cyan-600 font-semibold">{lap.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabel Selesai */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Laporan Selesai</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gradient-to-r from-blue-100 via-cyan-100 to-teal-100 text-cyan-800">
              <tr>
                <th className="px-4 py-2 text-left">No</th>
                <th className="px-4 py-2 text-left">Nama User</th>
                <th className="px-4 py-2 text-left">Judul</th>
                <th className="px-4 py-2 text-left">Tanggal</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {selesai.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">Tidak ada laporan selesai untuk BAAK.</td>
                </tr>
              ) : (
                selesai.map((lap, index) => (
                  <tr key={lap.id_pengaduan} className="hover:bg-cyan-50 transition-all">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{lap.User?.nama || "Tidak diketahui"}</td>
                    <td className="px-4 py-2">{lap.judul_laporan}</td>
                    <td className="px-4 py-2">{lap.tanggal_pengaduan}</td>
                    <td className="px-4 py-2 text-teal-600 font-semibold">{lap.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
