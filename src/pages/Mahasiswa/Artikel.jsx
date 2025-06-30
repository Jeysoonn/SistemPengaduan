import { FaNewspaper, FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa"; 
import PageHeader from "../../component/Mahasiswa/PageHeader";
import AdminViewIndicator from "../../component/AdminViewIndicator";
import { useEffect, useState } from "react";

export default function Artikel() {
    const [show, setShow] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 100);
        return () => clearTimeout(timer);
    }, []);
    
    const handleReadMore = (artikel) => {
        setSelectedArticle(artikel);
        // Untuk saat ini hanya menampilkan di console, nantinya bisa diimplementasikan untuk menampilkan detail artikel
        console.log("Artikel dipilih:", artikel);
        alert(`Artikel dipilih: ${artikel.judul}`);
    };

    // Data artikel
    const artikelList = [
        {
            id: 1,
            judul: "Panduan Lengkap Menggunakan Sistem Pengaduan",
            ringkasan: "Pelajari cara menggunakan sistem pengaduan kampus dengan efektif untuk melaporkan masalah dan mengikuti perkembangannya.",
            tanggal: "15 Mei 2023",
            penulis: "Admin PCR",
            kategori: "NEWS",
            gambar: "https://ui-avatars.com/api/?name=Panduan+Sistem&background=2FB6CD&color=fff&size=200"
        },
        {
            id: 2,
            judul: "Tips Membuat Laporan Pengaduan yang Baik",
            ringkasan: "Ketahui cara menyusun laporan pengaduan yang jelas, informatif, dan mudah ditindaklanjuti oleh pihak kampus.",
            tanggal: "20 Juni 2023",
            penulis: "Tim Layanan",
            kategori: "NEWS",
            gambar: "https://ui-avatars.com/api/?name=Tips+Laporan&background=2FB6CD&color=fff&size=200"
        },
        {
            id: 3,
            judul: "Jenis-jenis Pengaduan yang Dapat Dilaporkan",
            ringkasan: "Informasi tentang berbagai kategori pengaduan yang dapat dilaporkan melalui sistem pengaduan kampus.",
            tanggal: "5 Juli 2023",
            penulis: "BAAK PCR",
            kategori: "NEWS",
            gambar: "https://ui-avatars.com/api/?name=Jenis+Pengaduan&background=2FB6CD&color=fff&size=200"
        },
        {
            id: 4,
            judul: "Proses Penanganan Pengaduan di PCR",
            ringkasan: "Penjelasan tentang alur dan proses penanganan pengaduan dari awal pelaporan hingga penyelesaian masalah.",
            tanggal: "12 Agustus 2023",
            penulis: "Tim Pengembang",
            kategori: "NEWS",
            gambar: "https://ui-avatars.com/api/?name=Proses+Penanganan&background=2FB6CD&color=fff&size=200"
        },
    ];

    return (
        <div className="relative bg-gray-50 text-gray-800 overflow-hidden pb-16">
            <AdminViewIndicator />
            
            {/* Ornamen atas */}
            <div
                aria-hidden="true"
                className="absolute top-0 left-0 w-full h-40 pointer-events-none overflow-visible"
                style={{ zIndex: -1 }}
            >
                <svg
                    className="w-full h-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 1440 320"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="#a8d0ff"
                        fillOpacity="0.25"
                        d="M0,64L60,69.3C120,75,240,85,360,90.7C480,96,600,96,720,101.3C840,107,960,117,1080,117.3C1200,117,1320,107,1380,101.3L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
                    ></path>
                    <circle cx="300" cy="80" r="60" fill="#2579a9" fillOpacity="0.1" />
                    <circle cx="1200" cy="40" r="90" fill="#1976d2" fillOpacity="0.1" />
                </svg>
            </div>
            
            <PageHeader title="Artikel" icon={<FaNewspaper className="text-2xl text-[#fbfbfa]"/>}/>
            
            {/* Daftar Artikel */}
            <section className="py-8 px-4 md:px-8 max-w-screen-xl mx-auto">
                <div className="flex flex-col space-y-4">
                    {artikelList.map((artikel) => (
                        <div 
                            key={artikel.id} 
                            className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                        >
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/3 lg:w-1/4">
                                    <img 
                                        className="h-48 w-full object-cover" 
                                        src={artikel.gambar} 
                                        alt={artikel.judul} 
                                    />
                                </div>
                                <div className="p-4 md:w-2/3 lg:w-3/4">
                                    <div className="flex flex-col h-full justify-between">
                                        <div>
                                            <div className="flex items-center mb-1">
                                                <span className="text-xs font-bold text-gray-700">{artikel.kategori}</span>
                                                <span className="mx-2 text-gray-400">•</span>
                                                <span className="text-xs text-gray-500">{artikel.tanggal} lalu</span>
                                            </div>
                                            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 hover:text-[#2596be] transition-colors leading-tight">{artikel.judul}</h3>
                                            <p className="text-gray-600 mb-4 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{artikel.ringkasan}</p>
                                        </div>
                                        <button 
                                            onClick={() => handleReadMore(artikel)}
                                            className="flex items-center text-[#2FB6CD] font-medium hover:text-[#1d8a9c] transition-colors"
                                        >
                                            Baca selengkapnya <FaArrowRight className="ml-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
