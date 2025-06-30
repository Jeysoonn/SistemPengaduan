import { FaPenFancy, FaShare, FaCommentDots, FaComments, FaCheckCircle } from "react-icons/fa";
import FormulirPengaduan from "../../component/Mahasiswa/FormulirPengaduan";
import RiwayatPengaduan from "../../component/Mahasiswa/Riwayat";
import PageHeader from "../../component/Mahasiswa/PageHeader";
import AdminViewIndicator from "../../component/AdminViewIndicator";

export default function Pengaduan() {
    const steps = [
        {
            icon: <FaPenFancy className="text-white text-2xl" />,
            title: "Tulis Laporan",
            desc: "Mahasiswa mengisi formulir pengaduan dengan lengkap dan jelas",
            bg: "bg-[#5DC7D1]"
        },
        {
            icon: <FaShare className="text-white text-2xl" />,
            title: "Verifikasi Admin",
            desc: "Admin mengecek dan memverifikasi laporan dalam 1-3 hari",
            bg: "bg-[#5DC7D1]"
        },
        {
            icon: <FaCommentDots className="text-white text-2xl" />,
            title: "Diteruskan ke Tujuan",
            desc: "Laporan diteruskan ke bagian yang dituju (BSTI, BAAK, dll)",
            bg: "bg-[#5DC7D1]"
        },
        {
            icon: <FaComments className="text-white text-2xl" />,
            title: "Tanggapan Tujuan",
            desc: "Bagian tujuan menanggapi laporan dan memberikan solusi",
            bg: "bg-[#5DC7D1]"
        },
        {
            icon: <FaCheckCircle className="text-white text-2xl" />,
            title: "Selesai",
            desc: "Pengaduan selesai setelah mahasiswa menerima solusi",
            bg: "bg-[#5DC7D1]"
        }
    ];


    return (
        <div>
            <AdminViewIndicator />
            
            <PageHeader title="Pengaduan" icon={<FaPenFancy className="text-2xl text-white" />} />

            <FormulirPengaduan />

            {/* Langkah Proses Pengaduan */}
            <div className="bg-[#f9fafb] py-16 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[#2FB6CD] mb-10">Alur Proses Pengaduan</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 text-center">
                        {steps.map((step, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md mb-4 ${step.bg}`}>
                                    {step.icon}
                                </div>
                                <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                                <p className="text-gray-600 text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <RiwayatPengaduan />
        </div>
    );
}
