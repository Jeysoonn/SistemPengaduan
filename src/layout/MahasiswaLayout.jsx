import Header from "../component/Mahasiswa/Header";
import { Outlet } from "react-router-dom";

export default function MahasiswaLayout() {
  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Header />
      <main className="py-10 ">
        <Outlet />
      </main>
    </div>
  );
}
