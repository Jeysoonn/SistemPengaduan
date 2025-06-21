import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingSpinner from "./component/LoadingScreen";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./component/ProtectedRoute";

// Lazy load untuk Halaman-Halaman yang Diperlukan
const DashboardAdmin = lazy(() => import("./pages/Admin/DashboardAdmin"));
const DaftarLaporan = lazy(() => import("./pages/Admin/DaftarLaporan"));
const DetailLaporan = lazy(() => import("./pages/Admin/DetailLaporan"));
const User = lazy(() => import("./pages/Admin/User"));

const AdminLayout = lazy(() => import("./layout/AdminLayout"));
const BstiLayout = lazy(() => import("./layout/BSTILayout"));
const SecurityLayout = lazy(() => import("./layout/SecurityLayout"));
const BAAKLayout = lazy(() => import("./layout/BAAKLayout"));

const DashboardBsti = lazy(() => import("./pages/Bsti/Dashboard"));
const DashboardSecurity = lazy(() => import("./pages/Security/Dashboard"));
const DashboardBAAK = lazy(() => import("./pages/BAAK/Dashboard"));

const LaporanPengaduan = lazy(() => import("./pages/Bsti/LaporanPengaduan"));
const RiwayatDaftarLaporan = lazy(() => import("./pages/Admin/RiwayatDaftarLaporan"));

const AuthLayout = lazy(() => import("./layout/AuthLayout"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));

const MahasiswaLayout = lazy(() => import("./layout/MahasiswaLayout"));
const Home = lazy(() => import("./pages/Mahasiswa/Home"));
const Formulir = lazy(() => import("./pages/Mahasiswa/Formulir"));

const Faq = lazy(() => import("./pages/Admin/Faq"));

const RiwayatDaftarLaporanBSTI = lazy(() => import("./pages/Bsti/RiwayatDaftarLaporan"));
const DaftarLaporanBSTI = lazy(() => import("./pages/Bsti/DaftarLaporan"));

const RiwayatDaftarLaporanSecurity = lazy(() => import("./pages/Security/RiwayatDaftarLaporan"));
const DaftarLaporanSecurity = lazy(() => import("./pages/Security/DaftarLaporan"));

const RiwayatDaftarLaporanBAAK = lazy(() => import("./pages/BAAK/RiwayatDaftarLaporan"));
const DaftarLaporanBAAK = lazy(() => import("./pages/BAAK/DaftarLaporan"));

function App() {
  return (
    <UserProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Admin Routes - Only accessible by Admin users */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardAdmin />} />
              <Route path="/admin/daftar-laporan" element={<DaftarLaporan />} />
              <Route path="/admin/user" element={<User />} />
              <Route path="/admin/riwayat-daftar-laporan" element={<RiwayatDaftarLaporan />} />
              <Route path="/admin/faq" element={<Faq />} />
            </Route>

            {/* BSTI Routes - Only accessible by BSTI users */}
            <Route path="/bsti" element={
              <ProtectedRoute allowedRoles={['BSTI']}>
                <BstiLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardBsti />} />
              <Route path="/bsti/daftar-laporan" element={<DaftarLaporanBSTI />} />
              <Route path="/bsti/riwayat-daftar-laporan" element={<RiwayatDaftarLaporanBSTI />} />
            </Route>

            {/* Security Routes - Only accessible by Security users */}
            <Route path="/security" element={
              <ProtectedRoute allowedRoles={['Security']}>
                <SecurityLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardSecurity />} />
              <Route path="/security/daftar-laporan" element={<DaftarLaporanSecurity />} />
              <Route path="/security/riwayat-daftar-laporan" element={<RiwayatDaftarLaporanSecurity />} />
            </Route>

            {/* BAAK Routes - Only accessible by BAAK users */}
            <Route path="/baak" element={
              <ProtectedRoute allowedRoles={['BAAK']}>
                <BAAKLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardBAAK />} />
              <Route path="/baak/daftar-laporan" element={<DaftarLaporanBAAK />} />
              <Route path="/baak/riwayat-daftar-laporan" element={<RiwayatDaftarLaporanBAAK />} />
            </Route>

            {/* Auth Routes - No authentication required */}
            <Route path="/auth" element={
              <ProtectedRoute requireAuth={false}>
                <AuthLayout />
              </ProtectedRoute>
            }>
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
            </Route>

            {/* Mahasiswa Routes - Accessible by Mahasiswa and Admin users */}
            <Route path="/" element={
              <ProtectedRoute allowedRoles={['Mahasiswa', 'Admin']}>
                <MahasiswaLayout />
              </ProtectedRoute>
            }>
              <Route path="/home" element={<Home />} />
              <Route path="/formulir" element={<Formulir />} />
            </Route>

            {/* Default redirect to login if no route matches */}
            <Route path="*" element={<Login />} />
          </Routes>
        </Suspense>
      </Router>
    </UserProvider>
  );
}

export default App;
