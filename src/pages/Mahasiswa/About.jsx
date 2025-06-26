import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import PageHeader from "../../component/Mahasiswa/PageHeader";

export default function About() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative bg-gray-50 text-gray-800 overflow-hidden">
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

            {/* Ornamen bawah */}
            <div
                aria-hidden="true"
                className="absolute bottom-0 right-0 w-full h-40 pointer-events-none overflow-visible"
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
                        fillOpacity="0.2"
                        d="M0,192L60,197.3C120,203,240,213,360,218.7C480,224,600,224,720,218.7C840,213,960,203,1080,176C1200,149,1320,107,1380,85.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                    ></path>
                    <circle cx="200" cy="250" r="80" fill="#1976d2" fillOpacity="0.1" />
                    <circle cx="1100" cy="280" r="50" fill="#2579a9" fillOpacity="0.15" />
                </svg>
            </div>

            <PageHeader title="About" icon={<FaInfoCircle className="text-2xl text-white" />} />

            {/* Latar Belakang */}
            <section className="bg-white py-20 px-6 md:px-12 relative z-10">
                <div
                    className={`max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-16 transition-all duration-700 ease-in-out ${
                        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    {/* Video */}
                    <div className="md:w-1/2 rounded-3xl overflow-hidden shadow-2xl">
                        <video
                            src="/SistemPengaduan.mp4"
                            className="w-full h-auto"
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls={false}
                        />
                    </div>

                    {/* Teks Penjelasan */}
                    <div className="md:w-1/2 space-y-6">
                        <h2 className="text-4xl font-extrabold text-[#2596be] leading-tight">
                            Latar Belakang
                        </h2>
                        <div className="text-gray-700 text-lg leading-relaxed tracking-wide space-y-4">
                            <p>
                                Kampus Politeknik Caltex Riau merupakan tempat di mana mahasiswa belajar, berinteraksi, dan menjalani aktivitas sehari-hari.
                                Dalam prosesnya, seringkali muncul berbagai permasalahan seperti kerusakan fasilitas, koneksi internet yang lambat, hingga
                                kehilangan barang di lingkungan kampus.
                            </p>
                            <p>
                                Untuk menjawab kebutuhan akan penyampaian keluhan secara cepat, efektif, dan transparan, maka dikembangkanlah sistem
                                pengaduan online. Sistem ini menjadi jembatan antara mahasiswa dengan pihak kampus dalam menyampaikan aspirasi atau
                                keluhan tanpa harus datang langsung ke kantor layanan.
                            </p>
                            <p>
                                Tujuan utama sistem ini adalah memberikan kemudahan dalam pelaporan masalah fasilitas, keamanan, hingga kritik dan saran
                                terhadap layanan kampus. Semua laporan akan terdata dengan baik, dapat dilacak statusnya, dan mempermudah pihak kampus
                                dalam menindaklanjuti.
                            </p>
                            <p>
                                Dengan sistem pengaduan online ini, diharapkan kampus menjadi lebih responsif terhadap kebutuhan dan permasalahan mahasiswa,
                                sehingga tercipta lingkungan belajar yang nyaman, aman, dan mendukung aktivitas akademik secara maksimal.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visi Misi */}
            <section className="bg-[#f3fdff] py-20 px-6 md:px-12 relative z-10">
                <div className="max-w-screen-xl mx-auto">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-extrabold text-[#2596be]">
                            Visi & Misi
                        </h3>
                        <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto tracking-wide">
                            Komitmen kami untuk menciptakan kampus yang lebih terbuka, tanggap, dan nyaman untuk semua.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                        {/* Visi */}
                        <div className="bg-white rounded-3xl shadow-lg p-10 hover:shadow-xl transition-shadow duration-300">
                            <h4 className="text-2xl font-bold text-[#1E9CC5] mb-5">
                                Visi
                            </h4>
                            <p className="text-gray-700 leading-relaxed text-lg tracking-wide">
                                Menjadi sistem digital penghubung terpercaya antara mahasiswa dan kampus
                                dalam menyampaikan pengaduan secara cepat, aman, dan transparan.
                            </p>
                        </div>

                        {/* Misi */}
                        <div className="bg-white rounded-3xl shadow-lg p-10 hover:shadow-xl transition-shadow duration-300">
                            <h4 className="text-2xl font-bold text-[#1E9CC5] mb-5">
                                Misi
                            </h4>
                            <p className="text-gray-700 leading-relaxed text-lg tracking-wide">
                                Menghadirkan platform pengaduan online yang mudah digunakan,
                                meningkatkan transparansi proses tindak lanjut, dan mendorong partisipasi
                                aktif mahasiswa dalam menciptakan lingkungan kampus yang lebih baik.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Informasi Kampus & Sistem Pengaduan */}
            <section className="py-16 px-6 md:px-12 max-w-screen-xl mx-auto relative z-10">
                <h3 className="text-3xl font-extrabold text-[#2596be] text-center mb-14">
                    Informasi Kampus & Sistem Pengaduan
                </h3>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-lg transition duration-300">
                        <h4 className="text-xl font-semibold text-[#34BBD1] mb-4">Politeknik Caltex Riau</h4>
                        <p className="text-gray-700 leading-relaxed tracking-wide">
                            Institusi pendidikan tinggi vokasi di Pekanbaru yang dikenal dengan kurikulum berbasis industri dan fasilitas unggul.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-lg transition duration-300">
                        <h4 className="text-xl font-semibold text-[#34BBD1] mb-4">Tujuan Sistem</h4>
                        <p className="text-gray-700 leading-relaxed tracking-wide">
                            Menyediakan platform digital agar mahasiswa dapat menyampaikan pengaduan dengan cepat, transparan, dan terdokumentasi.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-lg transition duration-300">
                        <h4 className="text-xl font-semibold text-[#34BBD1] mb-4">Kontak & Layanan</h4>
                        <p className="text-gray-700 leading-relaxed tracking-wide">
                            Jl. Umban Sari No.1 Rumbai, Pekanbaru<br />
                            Email: info@pcr.ac.id<br />
                            Telp: (0761) 53939
                        </p>
                    </div>
                </div>
            </section>

            {/* Tim Pengembang Sistem */}
            <section className="bg-white py-16 px-6 md:px-12 relative z-10">
                <div className="max-w-screen-xl mx-auto text-center">
                    <h3 className="text-3xl font-extrabold text-[#2596be] mb-12">Tim Kami</h3>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 justify-items-center">
                        {[{
                            name: "Baldi Agus",
                            role: "Frontend Developer",
                            img: "/tim1.jpg",
                        }, {
                            name: "Indah Ramadhani",
                            role: "UI/UX Designer",
                            img: "/tim2.jpg",
                        }, {
                            name: "Jason Angriawan",
                            role: "Backend Developer",
                            img: "/tim3.jpg",
                        }, {
                            name: "Fadgham Dzikra",
                            role: "Project Manager",
                            img: "/tim4.jpg",
                        }].map((member, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-28 h-28 rounded-full object-cover border-4 border-[#34BBD1] shadow-md"
                                />
                                <h4 className="mt-4 text-lg font-semibold text-[#37CAD2]">{member.name}</h4>
                                <p className="text-sm text-gray-700">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
