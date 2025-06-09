import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import Beranda from "./pages/admin/Dashboard";
// dan lainnya

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/search" element={<div>Cari</div>} />
            <Route path="/statistik" element={<div>Statistik</div>} />
            <Route path="/pesan" element={<div>Pesan</div>} />
            <Route path="/eksplor" element={<div>Eksplor</div>} />
            <Route path="/favorit" element={<div>Favorit</div>} />
            <Route path="/transaksi" element={<div>Transaksi</div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
