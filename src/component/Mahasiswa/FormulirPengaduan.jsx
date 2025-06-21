import { useState, useEffect } from "react";
import { pengaduanAPI } from "../../service/apiPengaduan";
import { useUser } from "../../context/UserContext";

export default function FormulirPengaduan() {
    const [formData, setFormData] = useState({
        judul_laporan: "",
        deskripsi: "",
        tujuan_laporan: "",
        file: null,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [showForm, setShowForm] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        const timer = setTimeout(() => setShowForm(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
        
        // Clear any previous messages when user starts typing
        if (message.text) {
            setMessage({ type: "", text: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: "", text: "" });

        try {
            // Step 1: Get the last pengaduan to generate next ID
            const lastPengaduan = await pengaduanAPI.fetchLastPengaduan();
            const newIdPengaduan = lastPengaduan.length > 0 ? lastPengaduan[0].id_pengaduan + 1 : 1;

            // Step 2: Prepare data for API with correct field names
            const submitData = {
                id_pengaduan: newIdPengaduan,
                judul_laporan: formData.judul_laporan,
                deskripsi: formData.deskripsi,
                tujuan_laporan: formData.tujuan_laporan,
                status: "Pending", // Default status for new pengaduan
                tanggal_pengaduan: new Date().toISOString(),
                bukti: formData.file ? formData.file.name : null,
                // Use the logged-in user's ID
                id_user: user ? user.id_user : null
            };

            console.log("Submitting data:", submitData);

            // Step 3: Submit to API
            const result = await pengaduanAPI.createPengaduan(submitData);
            
            console.log("API Response:", result);
            
            // Show success message
            setMessage({
                type: "success",
                text: "Pengaduan berhasil dikirim! Tim akan segera menindaklanjuti laporan Anda."
            });

            // Reset form
            setFormData({
                judul_laporan: "",
                deskripsi: "",
                tujuan_laporan: "",
                file: null,
            });

            // Clear file input
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) {
                fileInput.value = "";
            }

        } catch (error) {
            console.error("Error submitting pengaduan:", error);
            console.error("Error details:", error.response?.data);
            setMessage({
                type: "error",
                text: "Gagal mengirim pengaduan. Silakan coba lagi atau hubungi administrator."
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (file) => {
        // This is a placeholder for file upload functionality
        // In a real implementation, you would upload to Supabase Storage
        // and get back a URL to store in the database
        console.log("File selected:", file.name);
        // For now, we'll just store the filename
        return file.name;
    };

    return (
        <div className={`w-full max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-2xl transform transition-all duration-700 ease-in-out
        ${showForm ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center bg-[#2596be] py-2 shadow-md">
                Formulir Pengaduan
            </h2>

            {/* Message Display */}
            {message.text && (
                <div className={`mb-4 p-3 rounded-md ${
                    message.type === "success" 
                        ? "bg-green-100 text-green-700 border border-green-300" 
                        : "bg-red-100 text-red-700 border border-red-300"
                }`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Judul */}
                <div>
                    <label className="block text-sm font-semibold text-[#1e7da0] mb-1">
                        Judul Laporan *
                    </label>
                    <input
                        type="text"
                        name="judul_laporan"
                        value={formData.judul_laporan}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        placeholder="Masukkan judul laporan Anda"
                        className="w-full text-black rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                </div>

                {/* Deskripsi */}
                <div>
                    <label className="block text-sm font-semibold text-[#1e7da0] mb-1">
                        Deskripsi Laporan *
                    </label>
                    <textarea
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        placeholder="Jelaskan isi laporan Anda secara detail"
                        rows={4}
                        className="w-full text-black rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    ></textarea>
                </div>

                {/* Tujuan */}
                <div>
                    <label className="block text-sm font-semibold text-[#1e7da0] mb-1">
                        Tujuan Laporan *
                    </label>
                    <select
                        name="tujuan_laporan"
                        value={formData.tujuan_laporan}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="w-full text-black rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                        disabled={isLoading}
                        className="w-full text-black rounded-md px-4 py-2 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-[#2596be] hover:file:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {formData.file && (
                        <p className="text-sm text-gray-600 mt-1">
                            File terpilih: {formData.file.name}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ${
                            isLoading 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-[#1e7da0] hover:bg-[#2596be]"
                        } text-white`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Mengirim...
                            </span>
                        ) : (
                            "LAPORKAN"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
