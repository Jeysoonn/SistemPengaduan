import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingSpinner from "./component/LoadingScreen";  // Impor LoadingSpinner

// Lazy load untuk Halaman-Halaman yang Diperlukan
const DashboardAdmin = lazy(() => import("./pages/Admin/DashboardAdmin"));
const DaftarLaporan = lazy(() => import("./pages/Admin/DaftarLaporan"));
const DetailLaporan = lazy(() => import("./pages/Admin/DetailLaporan"));
const User = lazy(() => import("./pages/Admin/User"));
const AdminLayout = lazy(() => import("./layout/AdminLayout"));
const BstiLayout = lazy(() => import("./layout/BSTILayout"));
const DashboardBsti = lazy(() => import("./pages/Bsti/Dashboard"));
const LaporanPengaduan = lazy(() => import("./pages/Bsti/LaporanPengaduan"));
const RiwayatDaftarLaporan = lazy(() => import("./pages/Admin/RiwayatDaftarLaporan"));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}> {/* Menggunakan LoadingSpinner */}
        <Routes>
          {/* Menggunakan AdminLayout sebagai Parent dengan Lazy Load */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Rute untuk Halaman Admin */}
            <Route index element={<DashboardAdmin />} />
            <Route path="/admin/daftar-laporan" element={<DaftarLaporan />} />
            <Route path="/admin/user" element={<User />} />
            <Route path="/admin/riwayat-daftar-laporan" element={<RiwayatDaftarLaporan />} />
          </Route>
          <Route path="/bsti" element={<BstiLayout />}>
            {/* Rute untuk Halaman Admin */}
            <Route index element={<DashboardBsti />} />
            <Route path="/bsti/laporanpengaduan" element={<LaporanPengaduan />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
