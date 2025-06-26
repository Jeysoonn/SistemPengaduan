import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "./component/LoadingScreen";

const MahasiswaLayout = lazy(() => import("./layout/MahasiswaLayout"));
const Home = lazy(() => import("./pages/Mahasiswa/Home"));
const About = lazy(() => import("./pages/Mahasiswa/About"));
const Layanan = lazy(() => import("./pages/Mahasiswa/Layanan"));
const Artikel = lazy(() => import("./pages/Mahasiswa/Artikel"));
const Pengaduan = lazy(() => import("./pages/Mahasiswa/Pengaduan"));
const FAQ = lazy(() => import("./pages/Mahasiswa/FAQ"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<MahasiswaLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/layanan" element={<Layanan />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/pengaduan" element={<Pengaduan />} />
          <Route path="/faq" element={<FAQ />} />
          </Route>

          {/* <Route path="/" element={<MahasiswaLayout />}>
            <Route index element={<Beranda />} />
            <Route path="statistik" element={<Statistik />} />
            <Route path="laporan" element={<Laporan />} />
          </Route> */}

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
