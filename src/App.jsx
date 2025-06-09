import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "./component/LoadingScreen";
import AdminLayout from "./layout/AdminLayout";
import BstiLayout from "./layout/BSTILayout";

// Lazy load pages
const Beranda = lazy(() => import("./pages/Admin/Dashboard"));
const Statistik = lazy(() => import("./pages/Admin/Statistik"));
const Laporan = lazy(() => import("./pages/Admin/Laporan"));

// Lazy load pages
const Dashboard = lazy(() => import("./pages/Bsti/Dashboard"));
const LaporanPengaduan = lazy(() => import("./pages/Bsti/LaporanPengaduan"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Beranda />} />
            <Route path="statistik" element={<Statistik />} />
            <Route path="laporan" element={<Laporan />} />
          </Route>
          <Route path="/bsti" element={<BstiLayout />}>
            <Route path="/bsti" element={<Dashboard />} />
            <Route path="/bsti/laporanpengaduan" element={<LaporanPengaduan />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
