  import React, { Suspense, lazy } from "react";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import LoadingSpinner from "./component/LoadingScreen";

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

  const AuthLayout = lazy(() => import("./layout/AuthLayout"));
  const Login = lazy(() => import("./pages/Auth/Login"));
  const Register = lazy(() => import("./pages/Auth/Register"));

  const MahasiswaLayout = lazy(() => import("./layout/MahasiswaLayout"));
  const Home = lazy(() => import("./pages/Mahasiswa/Home"));
  const Formulir = lazy(() => import("./pages/Mahasiswa/Formulir"));


function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
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
          <Route path="/auth" element={<AuthLayout />}> {/* Menggunakan AuthLayout */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Route>
          <Route path="/" element={<MahasiswaLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/formulir" element={<Formulir />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

  export default App;
