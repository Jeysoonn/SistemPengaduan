import { useState, useEffect } from "react";

export default function FormulirPengaduan() {
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    tujuan: "",
    file: null,
  });

  const [showForm, setShowForm] = useState(false);

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Tambahkan logic kirim ke backend
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
              value={formData.judul}
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
              value={formData.tujuan}
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

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#34BBD1] to-[#2596be] hover:from-[#2596be] hover:to-[#1e7da0] text-white font-bold py-2 px-8 rounded-full shadow-lg transition duration-300"
            >
              LAPORKAN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
