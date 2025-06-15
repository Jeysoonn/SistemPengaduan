import { useState, useEffect } from "react";

export default function FormulirPengaduan() {
    const [formData, setFormData] = useState({
        judul: "",
        deskripsi: "",
        tujuan: "",
        file: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        // Kirim data ke server di sini
    };

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowForm(true), 100); // delay masuk
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`w-full max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-2xl transform transition-all duration-700 ease-in-out
        ${showForm ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center bg-[#2596be] py-2 shadow-md">
                Formulir Pengaduan
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Judul */}
                <div>
                    <label className="block text-sm font-semibold text-[#1e7da0] mb-1">
                        Judul Laporan
                    </label>
                    <input
                        type="text"
                        name="judul"
                        value={formData.judul}
                        onChange={handleChange}
                        required
                        placeholder="Masukkan judul laporan Anda"
                        className="w-full rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Deskripsi */}
                <div>
                    <label className="block text-sm font-semibold text-[#1e7da0] mb-1">
                        Deskripsi Laporan
                    </label>
                    <textarea
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        required
                        placeholder="Jelaskan isi laporan Anda"
                        rows={4}
                        className="w-full rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                {/* Tujuan */}
                <div>
                    <label className="block text-sm font-semibold text-[#1e7da0] mb-1">
                        Tujuan Laporan
                    </label>
                    <select
                        name="tujuan"
                        value={formData.tujuan}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Pilih Tujuan</option>
                        <option value="BSTI">BSTI</option>
                        <option value="Security">Security</option>
                        <option value="BAAK">BAAK</option>
                    </select>
                </div>

                {/* Upload */}
                <div>
                    <label className="block text-sm font-semibold text-[#1e7da0] mb-1">
                        Upload Bukti (Foto/Dokumen)
                    </label>
                    <input
                        type="file"
                        name="file"
                        accept="image/*,.pdf,.doc,.docx"
                        onChange={handleChange}
                        className="w-full rounded-md px-4 py-2 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-[#2596be] hover:file:bg-blue-200"
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-[#1e7da0] hover:bg-[#2596be] text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300"
                    >
                        LAPORKAN
                    </button>
                </div>
            </form>
        </div>
    );
}
