import Footer from "../component/Mahasiswa/Footer";
import Header from "../component/Mahasiswa/Header";
import { Outlet } from "react-router-dom";

export default function MahasiswaLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-4">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}
