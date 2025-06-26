import HeroSection from "../../component/Mahasiswa/HeroSection";
import AdminViewIndicator from "../../component/AdminViewIndicator";

export default function Home() {
    return (
        <div>
            <AdminViewIndicator />
            <HeroSection/>
        </div>
    );
}
import HeroSection from "../../component/Mahasiswa/HeroSection";
import {
    FaTools,
    FaShieldAlt,
    FaComments,
    FaHome,
    FaInfoCircle,
    FaServicestack,
    FaNewspaper,
    FaPenFancy,
    FaQuestionCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import ReviewData from "../../assets/testimoni.json";

export default function Home() {
    const navMenus = [
        { icon: <FaHome className="text-white text-xl" />, title: "Home", href: "/" },
        { icon: <FaInfoCircle className="text-white text-xl" />, title: "Tentang", href: "/about" },
        { icon: <FaServicestack className="text-white text-xl" />, title: "Layanan", href: "/layanan" },
        { icon: <FaNewspaper className="text-white text-xl" />, title: "Artikel", href: "/artikel" },
        { icon: <FaPenFancy className="text-white text-xl" />, title: "Pengaduan", href: "/pengaduan" },
        { icon: <FaQuestionCircle className="text-white text-xl" />, title: "FAQ", href: "/faq" },
    ];

    return (
        <div>
            {/* Hero Section */}
            <HeroSection />

            {/* Navigasi Sistem */}
            <section className="py-12 px-6 md:px-12 bg-[#f7f7f7]">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-6">
                        {navMenus.map((menu, idx) => (
                            <Link
                                key={idx}
                                to={menu.href}
                                className="flex items-center justify-between bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-[#91CBE3] p-3 rounded-lg text-white">
                                        {menu.icon}
                                    </div>
                                    <div className="text-[#2fa9cd] font-semibold">{menu.title}</div>
                                </div>
                                <div className="text-[#2fa9cd] text-xl">&gt;</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Manfaat Layanan */}
            <section className="bg-white py-12 px-6 md:px-12">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#2596be] mb-6">
                        Manfaat Layanan Pengaduan Online
                    </h2>
                    <p className="text-gray-600 mb-10 md:text-lg">
                        Sistem ini memberikan kemudahan dan kecepatan dalam menyampaikan
                        pengaduan oleh mahasiswa.
                    </p>
                    <div className="grid gap-6 md:grid-cols-3 text-left">
                        <div className="bg-[#f8fafa] p-6 rounded-xl shadow-md hover:shadow-lg transition">
                            <FaTools className="text-3xl text-[#2fb6cd] mb-4" />
                            <h3 className="text-lg font-semibold text-[#2fb6cd] mb-2">
                                Perbaikan Fasilitas Lebih Cepat
                            </h3>
                            <p className="text-gray-600">
                                Kerusakan seperti AC, Wi-Fi, atau kebersihan dapat langsung
                                dilaporkan dan ditindak.
                            </p>
                        </div>
                        <div className="bg-[#f8fafa] p-6 rounded-xl shadow-md hover:shadow-lg transition">
                            <FaShieldAlt className="text-3xl text-[#2fb6cd] mb-4" />
                            <h3 className="text-lg font-semibold text-[#2fb6cd] mb-2">
                                Meningkatkan Keamanan Kampus
                            </h3>
                            <p className="text-gray-600">
                                Laporan kehilangan atau gangguan keamanan dapat dipantau dengan
                                lebih baik.
                            </p>
                        </div>
                        <div className="bg-[#f8fafa] p-6 rounded-xl shadow-md hover:shadow-lg transition">
                            <FaComments className="text-3xl text-[#2fb6cd] mb-4" />
                            <h3 className="text-lg font-semibold text-[#2fb6cd] mb-2">
                                Suara Mahasiswa Didengar
                            </h3>
                            <p className="text-gray-600">
                                Saran dan keluhan mahasiswa terekam dalam sistem dan lebih
                                mudah ditindaklanjuti.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimoni Mahasiswa */}
            <section className="bg-[#f3fdff] py-16 px-6 md:px-12">
                <div className="max-w-6xl mx-auto text-center">
                    <h3 className="text-3xl md:text-4xl font-bold text-[#2596be] mb-12">
                        Apa Kata Mahasiswa?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {ReviewData.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={review.avatar}
                                        alt={review.name}
                                        className="w-14 h-14 rounded-full object-cover border border-gray-200"
                                    />
                                    <div className="text-left">
                                        <h4 className="text-lg font-semibold text-gray-800">
                                            {review.name}
                                        </h4>
                                        <p className="text-sm text-gray-500">Mahasiswa</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    "{review.review}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
