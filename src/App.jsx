import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingSpinner from "./component/LoadingScreen";  // Impor LoadingSpinner

// Lazy load untuk Halaman-Halaman yang Diperlukan
const DashboardAdmin = lazy(() => import("./pages/Admin/DashboardAdmin"));
const DaftarLaporan = lazy(() => import("./pages/Admin/DaftarLaporan"));
const DetailLaporan = lazy(() => import("./pages/Admin/DetailLaporan"));
const User = lazy(() => import("./pages/Admin/User"));
const AdminLayout = lazy(() => import("./layout/AdminLayout"));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}> {/* Menggunakan LoadingSpinner */}
        <Routes>
          {/* Menggunakan AdminLayout sebagai Parent dengan Lazy Load */}
          <Route path="/" element={<AdminLayout />}>
            {/* Rute untuk Halaman Admin */}
            <Route index element={<DashboardAdmin />} />
            <Route path="/daftar-laporan" element={<DaftarLaporan />} />
            <Route path="/detail-laporan/:id" element={<DetailLaporan />} />
            <Route path="/user" element={<User />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
