import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaNewspaper } from "react-icons/fa";
import PageHeader from "../../component/Mahasiswa/PageHeader";
import AdminViewIndicator from "../../component/AdminViewIndicator";

export default function DetailArtikel() {
  const { id } = useParams();
  const navigate = useNavigate();

  const artikel = {
    1: {
      judul: "Panduan Lengkap Menggunakan Sistem Pengaduan",
      tanggal: "15 Mei 2025",
      penulis: "Admin PCR",
      isi: `Sistem pengaduan kampus dirancang untuk mempermudah mahasiswa dalam menyampaikan keluhan, saran, atau permintaan bantuan.

Fitur-fitur utama:
1. Formulir pengaduan yang mudah diisi.
2. Riwayat pengaduan dan status penanganan.
3. Notifikasi perkembangan pengaduan.

Langkah penggunaan:
- Masuk ke sistem menggunakan akun mahasiswa.
- Klik "Ajukan Pengaduan".
- Isi formulir secara lengkap dan jelas.
- Kirim dan tunggu notifikasi dari pihak kampus.

Dengan sistem ini, proses penanganan menjadi lebih cepat dan transparan.`,
      gambar:
        "https://ui-avatars.com/api/?name=Panduan+Sistem&background=2FB6CD&color=fff&size=400",
    },
    2: {
      judul: "Tips Membuat Laporan Pengaduan yang Baik",
      tanggal: "20 Juni 2025",
      penulis: "Tim Layanan",
      isi: `Agar pengaduan Anda dapat segera ditanggapi, perhatikan beberapa hal berikut:

1. Jelaskan deskripsi laporan spesifik.
2. Sertakan bukti atau dokumentasi pendukung.
3. Hindari bahasa yang tidak sopan atau kasar.
4. Gunakan kategori pengaduan yang sesuai.

Contoh yang baik:
"AC di ruang kelas 120 tidak berfungsi dengan baik sejak Senin, 1 Juli 2025. Udara di dalam ruangan terasa panas dan pengap, terutama saat jam kuliah siang hari. Saya dan teman-teman sudah mencoba menurunkan suhunya, namun tidak terasa dingin sama sekali. Mohon perbaikan secepatnya agar proses belajar mengajar tetap nyaman."

Pengaduan yang jelas akan memudahkan tim kampus untuk menindaklanjuti.`,
      gambar:
        "https://ui-avatars.com/api/?name=Tips+Laporan&background=2FB6CD&color=fff&size=400",
    },
    3: {
      judul: "Jenis-jenis Pengaduan yang Dapat Dilaporkan",
      tanggal: "5 Juli 2025",
      penulis: "BAAK PCR",
      isi: `Mahasiswa dapat menyampaikan berbagai jenis pengaduan, seperti:

- Fasilitas rusak (kelas, AC, toilet, dll.)
- Sistem akademik (jadwal, presensi, nilai)
- Keamanan & kenyamanan lingkungan
- Kendala Jaringan

Pastikan memilih jenis pengaduan yang sesuai agar ditindaklanjuti oleh unit yang tepat. Setiap laporan akan dicatat dan diproses sesuai standar operasional kampus.`,
      gambar:
        "https://ui-avatars.com/api/?name=Jenis+Pengaduan&background=2FB6CD&color=fff&size=400",
    },
    4: {
      judul: "Proses Penanganan Pengaduan di PCR",
      tanggal: "12 Agustus 2025",
      penulis: "Tim Pengembang",
      isi: `Berikut alur penanganan pengaduan:

1. Mahasiswa mengisi dan mengirim pengaduan.
2. Sistem meneruskan laporan ke unit terkait.
3. Admin akan mengonfirmasi dan menyelidiki pengaduan.
4. Update status diberikan secara berkala.
5. Pengaduan ditutup jika sudah selesai ditangani.

Transparansi proses sangat penting agar mahasiswa merasa didengar dan dilayani dengan baik. Gunakan sistem dengan bijak dan sesuai kebutuhan.`,
      gambar:
        "https://ui-avatars.com/api/?name=Proses+Penanganan&background=2FB6CD&color=fff&size=400",
    },
  }[id];

  const [show, setShow] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!artikel) {
    return (
      <div className="text-center text-red-600 p-10">Artikel tidak ditemukan.</div>
    );
  }

  return (
    <div className="bg-gray-50 pb-16">
      <AdminViewIndicator />

      <PageHeader
        title="Detail Artikel"
        icon={<FaNewspaper className="text-2xl text-[#fbfbfa]" />}
      />

      <div
        className={`max-w-4xl mx-auto px-4 md:px-6 pt-10 transition-opacity duration-[1500ms] ease-in-out ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Card container */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Tombol kembali */}
          <button
            onClick={() => navigate(-1)}
            className="text-[#2FB6CD] mb-6 flex items-center font-medium hover:underline"
          >
            <FaArrowLeft className="mr-2" /> Kembali ke Daftar Artikel
          </button>

          {/* Gambar artikel */}
          <img
            src={artikel.gambar}
            alt={artikel.judul}
            className="rounded-xl w-full max-h-[400px] object-cover mb-6 shadow"
          />

          {/* Judul & info */}
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{artikel.judul}</h1>
          <div className="text-sm text-gray-500 mb-6">
            Ditulis oleh <strong>{artikel.penulis}</strong> pada {artikel.tanggal}
          </div>

          {/* Isi */}
          <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {artikel.isi}
          </div>
        </div>
      </div>
    </div>
  );
}
