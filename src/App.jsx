import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import LoadingScreen from "./component/LoadingScreen";

// Lazy load pages
const Beranda = lazy(() => import("./pages/Admin/Dashboard"));
const Statistik = lazy(() => import("./pages/Admin/Statistik"));
const Laporan = lazy(() => import("./pages/Admin/Laporan"));


function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Beranda />} />
              <Route path="/statistik" element={<Statistik />} />
              <Route path="/laporan" element={<Laporan />} />
              
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
