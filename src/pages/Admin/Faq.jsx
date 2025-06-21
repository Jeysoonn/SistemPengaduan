import React, { useState, useEffect } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import { faqAPI } from "../../service/apiFaq";

export default function Faq() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentFaqId, setCurrentFaqId] = useState(null);
  const [formData, setFormData] = useState({
    pertanyaan: "",
    jawaban: ""
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await faqAPI.fetchAllFaq();
      setFaqs(data);
    } catch (err) {
      setError("Gagal memuat data FAQ");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pertanyaan || !formData.jawaban) {
      setError("Pertanyaan dan jawaban harus diisi");
      return;
    }

    try {
      // Konversi ke format yang diharapkan API
      const apiData = {
        Pertanyaan: formData.pertanyaan,
        Jawaban: formData.jawaban
      };

      if (isEditMode) {
        await faqAPI.updateFaq(currentFaqId, apiData);
      } else {
        await faqAPI.createFaq(apiData);
      }
      await fetchFaqs();
      resetForm();
    } catch (err) {
      setError(isEditMode ? "Gagal memperbarui FAQ" : "Gagal menambahkan FAQ");
      console.error(err);
    }
  };

  const handleEdit = (faq) => {
    // Konversi dari format API ke format form
    setFormData({
      pertanyaan: faq.Pertanyaan,
      jawaban: faq.Jawaban
    });
    setCurrentFaqId(faq.id_faq);
    setIsEditMode(true);
    setIsModalOpen(true);
    setError(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus FAQ ini?")) {
      try {
        await faqAPI.deleteFaq(id);
        await fetchFaqs();
      } catch (err) {
        setError("Gagal menghapus FAQ");
        console.error(err);
      }
    }
  };

  const resetForm = () => {
    setFormData({ pertanyaan: "", jawaban: "" });
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentFaqId(null);
    setError(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-black text-2xl font-bold mb-4">Tabel FAQ</h1>
      <Breadcrumb items={["Home", "Dashboard", "FAQ"]} />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex justify-end items-center mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tambah FAQ
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pertanyaan
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jawaban
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {faqs.length > 0 ? (
                  faqs.map((faq, index) => (
                    <tr key={faq.id_faq} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700 max-w-xs">
                        <div className="line-clamp-2">
                          {faq.Pertanyaan}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700 max-w-xs">
                        <div className="line-clamp-2">
                          {faq.Jawaban}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleEdit(faq)}
                          className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id_faq)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-200"
                          title="Hapus"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                      <div className="flex flex-col items-center justify-center py-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="mt-2 text-gray-600">Tidak ada data FAQ</p>
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                        >
                          Tambah FAQ
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit FAQ Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-medium text-black">
                {isEditMode ? "Edit FAQ" : "Tambah FAQ"}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pertanyaan">
                  Pertanyaan
                </label>
                <input
                  type="text"
                  id="pertanyaan"
                  name="pertanyaan"
                  value={formData.pertanyaan}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded shadow appearance-none text-black"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jawaban">
                  Jawaban
                </label>
                <textarea
                  id="jawaban"
                  name="jawaban"
                  value={formData.jawaban}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border rounded shadow appearance-none text-black"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  {isEditMode ? "Update FAQ" : "Simpan FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}