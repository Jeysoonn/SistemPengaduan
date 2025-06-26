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
    <div className="relative bg-[#ffffff] py-20 px-4">
      {/* Elemen dekoratif bulat */}
      <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 bg-[#8fd8f8] opacity-20 rounded-full z-0"></div>

      {/* Form Container */}
      <div
        className={`relative z-10 max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl transition-all duration-700 ease-in-out ${
          showForm ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-bold text-center text-white bg-gradient-to-r from-[#37CAD2] to-[#2596be] py-4 rounded-xl shadow-lg mb-8">
          Formulir Pengaduan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Judul */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Laporan
            </label>
            <input
              type="text"
              name="judul"
              value={formData.judul_laporan}
              onChange={handleChange}
              required
              placeholder="Masukkan judul laporan Anda"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2596be]"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi Laporan
            </label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              required
              placeholder="Jelaskan isi laporan Anda"
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2596be]"
            ></textarea>
          </div>

          {/* Tujuan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tujuan Laporan
            </label>
            <select
              name="tujuan"
              value={formData.tujuan_laporan}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2596be]"
            >
              <option value="">Pilih Tujuan</option>
              <option value="BSTI">BSTI</option>
              <option value="Security">Security</option>
              <option value="BAAK">BAAK</option>
            </select>
          </div>

          {/* Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Bukti (Foto/Dokumen)
            </label>
            <input
              type="file"
              name="file"
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg file:bg-[#e0f4ff] file:text-[#2596be] file:font-semibold file:rounded file:px-4 file:py-2 hover:file:bg-[#d0ebfa]"
            />
          </div>
          <div className="text-center">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`bg-gradient-to-r from-[#34BBD1] to-[#2596be] hover:from-[#2596be] hover:to-[#1e7da0] text-white font-bold py-2 px-8 rounded-full shadow-lg transition duration-300 ${
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
    </div>
  );
}
