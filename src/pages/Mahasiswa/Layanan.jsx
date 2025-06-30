import { FaServicestack, FaTools, FaNetworkWired, FaShieldAlt, FaBuilding, FaGraduationCap, FaBook } from "react-icons/fa"; 
import PageHeader from "../../component/Mahasiswa/PageHeader";
import AdminViewIndicator from "../../component/AdminViewIndicator";
import { useEffect, useState } from "react";

export default function Layanan() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Data layanan
    const layananList = [
        {
            id: 1,
            judul: "Pengaduan Fasilitas",
            deskripsi: "Laporkan kerusakan atau masalah pada fasilitas kampus seperti ruang kelas, laboratorium, atau area umum.",
            icon: <FaTools className="text-white text-3xl" />,
            warna: "bg-[#2FB6CD]"
        },
        {
            id: 2,
            judul: "Pengaduan Jaringan",
            deskripsi: "Laporkan masalah terkait koneksi internet, akses sistem informasi, atau infrastruktur IT kampus.",
            icon: <FaNetworkWired className="text-white text-3xl" />,
            warna: "bg-[#34BBD1]"
        },
        {
            id: 3,
            judul: "Pengaduan Keamanan",
            deskripsi: "Laporkan masalah keamanan seperti kehilangan barang, kerusakan fasilitas keamanan, atau situasi yang mencurigakan.",
            icon: <FaShieldAlt className="text-white text-3xl" />,
            warna: "bg-[#39C0D5]"
        },
        {
            id: 4,
            judul: "Pengaduan Administrasi",
            deskripsi: "Laporkan masalah terkait layanan administrasi kampus seperti pendaftaran, pembayaran, atau dokumen akademik.",
            icon: <FaBuilding className="text-white text-3xl" />,
            warna: "bg-[#3EC5D9]"
        },
        {
            id: 5,
            judul: "Pengaduan Akademik",
            deskripsi: "Laporkan masalah terkait kegiatan akademik seperti perkuliahan, ujian, atau nilai mata kuliah.",
            icon: <FaGraduationCap className="text-white text-3xl" />,
            warna: "bg-[#43CADD]"
        },
        {
            id: 6,
            judul: "Pengaduan Perpustakaan",
            deskripsi: "Laporkan masalah terkait layanan perpustakaan seperti peminjaman buku, akses e-library, atau fasilitas baca.",
            icon: <FaBook className="text-white text-3xl" />,
            warna: "bg-[#48CFE1]"
        }
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
            
            <PageHeader title="Layanan" icon={<FaServicestack className="text-2xl text-[#fbfbfa]"/>}/>
            
            {/* Penjelasan Layanan */}
            <section className="py-12 px-6 md:px-12 max-w-screen-xl mx-auto">
                <div className={`text-center mb-12 transition-all duration-700 ease-in-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-3xl font-bold text-[#2596be] mb-4">Layanan Pengaduan Kampus</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                        Sistem pengaduan kampus menyediakan berbagai layanan untuk membantu mahasiswa melaporkan masalah dan mendapatkan solusi dengan cepat. Berikut adalah layanan-layanan yang tersedia:
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {layananList.map((layanan, index) => (
                        <div 
                            key={layanan.id}
                            className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="p-6">
                                <div className={`${layanan.warna} w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-md`}>
                                    {layanan.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-[#2596be] mb-2">{layanan.judul}</h3>
                                <p className="text-gray-600">{layanan.deskripsi}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            
            {/* Cara Menggunakan Layanan */}
            <section className="py-12 px-6 md:px-12 max-w-screen-xl mx-auto bg-white rounded-xl shadow-md mt-12">
                <div className={`transition-all duration-700 ease-in-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-2xl font-bold text-[#2596be] mb-6 text-center">Cara Menggunakan Layanan Pengaduan</h2>
                    
                    <div className="grid md:grid-cols-4 gap-6 mt-8">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-[#e6f6fb] w-16 h-16 rounded-full flex items-center justify-center mb-4 text-[#2FB6CD] font-bold text-xl">1</div>
                            <h3 className="text-lg font-semibold text-[#2596be] mb-2">Pilih Layanan</h3>
                            <p className="text-gray-600 text-sm">Pilih jenis layanan pengaduan yang sesuai dengan masalah Anda</p>
                        </div>
                        
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-[#e6f6fb] w-16 h-16 rounded-full flex items-center justify-center mb-4 text-[#2FB6CD] font-bold text-xl">2</div>
                            <h3 className="text-lg font-semibold text-[#2596be] mb-2">Isi Formulir</h3>
                            <p className="text-gray-600 text-sm">Lengkapi formulir pengaduan dengan informasi yang jelas dan detail</p>
                        </div>
                        
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-[#e6f6fb] w-16 h-16 rounded-full flex items-center justify-center mb-4 text-[#2FB6CD] font-bold text-xl">3</div>
                            <h3 className="text-lg font-semibold text-[#2596be] mb-2">Kirim Laporan</h3>
                            <p className="text-gray-600 text-sm">Kirim laporan pengaduan Anda untuk ditindaklanjuti oleh pihak kampus</p>
                        </div>
                        
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-[#e6f6fb] w-16 h-16 rounded-full flex items-center justify-center mb-4 text-[#2FB6CD] font-bold text-xl">4</div>
                            <h3 className="text-lg font-semibold text-[#2596be] mb-2">Pantau Status</h3>
                            <p className="text-gray-600 text-sm">Pantau status pengaduan Anda melalui halaman riwayat pengaduan</p>
                        </div>
                    </div>
                    
                    <div className="mt-10 text-center">
                        <a 
                            href="/pengaduan" 
                            className="inline-block bg-[#2FB6CD] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#28a0b5] transition-colors shadow-md"
                        >
                            Buat Pengaduan Sekarang
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
