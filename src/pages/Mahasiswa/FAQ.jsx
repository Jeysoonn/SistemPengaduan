import { useEffect, useState } from "react";
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import PageHeader from "../../component/Mahasiswa/PageHeader";
import { faqAPI } from "../../service/apiFaq";

export default function FAQ() {
    const [faqs, setFaqs] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const data = await faqAPI.fetchAllFaq();
                setFaqs(data);
            } catch (error) {
                console.error("Failed to fetch FAQs:", error);
            }
        };
        fetchFaqs();
    }, []);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

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

            <PageHeader title="FAQ" icon={<FaQuestionCircle className="text-2xl text-white" />} />

            {/* FAQ Content */}
            <section className={`py-20 px-6 md:px-12 relative z-10 transition-all duration-700 ease-in-out ${
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
                <div className="max-w-screen-xl mx-auto">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-extrabold text-[#2596be]">
                            Pertanyaan yang Sering Diajukan
                        </h3>
                        <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto tracking-wide">
                            Temukan jawaban atas pertanyaan umum seputar sistem pengaduan kampus.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div 
                                key={faq.id_faq} 
                                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300"
                            >
                                <button
                                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <h4 className="text-lg font-semibold text-[#1E9CC5]">
                                        {faq.Pertanyaan}
                                    </h4>
                                    {activeIndex === index ? (
                                        <FaChevronUp className="text-[#1E9CC5]" />
                                    ) : (
                                        <FaChevronDown className="text-[#1E9CC5]" />
                                    )}
                                </button>
                                <div
                                    className={`px-6 pb-6 pt-0 transition-all duration-300 ${
                                        activeIndex === index ? "block" : "hidden"
                                    }`}
                                >
                                    <p className="text-gray-700 leading-relaxed">
                                        {faq.Jawaban}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional Info */}
                    <div className="mt-16 bg-[#f3fdff] rounded-2xl p-8 md:p-10 text-center">
                        <h4 className="text-2xl font-bold text-[#2596be] mb-4">
                            Masih ada pertanyaan?
                        </h4>
                        <p className="text-gray-700 max-w-2xl mx-auto mb-6">
                            Jika Anda tidak menemukan jawaban yang Anda cari, jangan ragu untuk menghubungi kami melalui halaman kontak atau langsung ke bagian layanan mahasiswa.
                        </p>
                        <div className="bg-white rounded-xl p-6 inline-block shadow-md">
                            <p className="text-gray-700">
                                <span className="font-semibold">Layanan Mahasiswa PCR</span><br />
                                Jl. Umban Sari No.1 Rumbai, Pekanbaru<br />
                                Email: layanan@pcr.ac.id<br />
                                Telp: (0761) 53939 ext. 123
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}