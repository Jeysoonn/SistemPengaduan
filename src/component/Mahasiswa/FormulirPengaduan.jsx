import React, { useState, useEffect } from 'react';
import { supabase, uploadFile, getPublicUrl, STORAGE_BUCKET, checkBucketAccess } from '../../config/supabaseClient';
import { useUser } from '../../context/UserContext';
import { pengaduanAPI } from '../../service/apiPengaduan';
import Swal from 'sweetalert2';

export default function FormulirPengaduan() {
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    tujuan: '',
    file: null,
    previewUrl: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [bucketAccessible, setBucketAccessible] = useState(true);
  const [isInitializing, setIsInitializing] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 100);

    // Check bucket access on component mount
    checkBucketAccessibility();

    return () => clearTimeout(timer);
  }, []);

  const checkBucketAccessibility = async () => {
    try {
      setIsInitializing(true);
      console.log('Checking bucket accessibility...');

      // Check if bucket is accessible
      const isAccessible = await checkBucketAccess(STORAGE_BUCKET);
      setBucketAccessible(isAccessible);

      if (!isAccessible) {
        console.warn('Bucket not accessible, but continuing with form');
        setMessage({
          type: 'warning',
          text: 'Sistem upload file mungkin tidak tersedia. Anda masih dapat mengirim pengaduan tanpa file.',
        });
      } else {
        console.log('Bucket accessible');
        // Clear any previous error messages
        setMessage({ type: '', text: '' });
      }
    } catch (error) {
      console.error('Error checking bucket access:', error);
      setBucketAccessible(false);
      setMessage({
        type: 'warning',
        text: 'Sistem upload file tidak tersedia. Anda masih dapat mengirim pengaduan tanpa file.',
      });
    } finally {
      setIsInitializing(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const validateAndSetFile = (file) => {
    // Validate file size
    if (file.size > 10 * 1024 * 1024) {
      setMessage({
        type: 'error',
        text: 'File terlalu besar. Maksimal ukuran file adalah 10MB.',
      });
      return false;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setMessage({
        type: 'error',
        text: 'Tipe file tidak didukung. Gunakan gambar (JPG, PNG, GIF, WebP) atau dokumen (PDF, DOC, DOCX).',
      });
      return false;
    }

    setFormData((prev) => ({
      ...prev,
      file,
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    }));

    // Clear any previous error messages
    setMessage({ type: '', text: '' });
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      validateAndSetFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    setUploadProgress(0);

    try {
      // Get the next pengaduan ID
      const lastPengaduan = await pengaduanAPI.fetchLastPengaduan();
      const newIdPengaduan = lastPengaduan.length > 0 ? lastPengaduan[0].id_pengaduan + 1 : 1;

      // Upload file if exists and bucket is accessible
      let fileUrl = null;
      if (formData.file && bucketAccessible) {
        try {
          setUploadProgress(10);

          const fileExt = formData.file.name.split('.').pop();
          const fileName = `${newIdPengaduan}_${Date.now()}.${fileExt}`;
          const filePath = `pengaduan/${fileName}`;

          console.log('Starting file upload process...');

          // Upload file using the helper function
          await uploadFile(STORAGE_BUCKET, filePath, formData.file);
          setUploadProgress(50);

          // Get public URL
          fileUrl = getPublicUrl(STORAGE_BUCKET, filePath);
          setUploadProgress(100);

          console.log('File upload completed successfully');
        } catch (uploadError) {
          console.error('File upload failed:', uploadError);
          // Continue without file upload
          setMessage({
            type: 'warning',
            text: 'File tidak dapat diupload, tetapi pengaduan akan tetap dikirim.',
          });
        }
      }

      // Prepare pengaduan data
      const submitData = {
        id_pengaduan: newIdPengaduan,
        judul_laporan: formData.judul,
        deskripsi: formData.deskripsi,
        tujuan_laporan: formData.tujuan,
        status: 'Pending',
        tanggal_pengaduan: new Date().toISOString(),
        bukti: fileUrl,
        id_user: user?.id_user,
      };

      // Submit to API
      await pengaduanAPI.createPengaduan(submitData);

      // Show success message
      await Swal.fire({
        icon: 'success',
        title: 'Pengaduan Terkirim!',
        text: 'Kami akan segera menindaklanjuti laporan Anda.',
        confirmButtonColor: '#34BBD1',
        confirmButtonText: 'Oke Siap!',
      });


      // Reset form
      setFormData({
        judul: '',
        deskripsi: '',
        tujuan: '',
        file: null,
        previewUrl: null,
      });

      // Clear file input
      const fileInput = document.querySelector('#file-upload');
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Error submitting pengaduan:', error);

      // Handle specific error types
      let errorMessage = error.message || 'Gagal mengirim pengaduan. Silakan coba lagi.';

      if (error.message.includes('row-level security policy')) {
        errorMessage = 'Sistem upload file sedang dalam maintenance. Silakan hubungi administrator atau coba lagi nanti.';
      } else if (error.message.includes('bucket not found')) {
        errorMessage = 'Sistem storage tidak tersedia. Silakan hubungi administrator.';
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Koneksi internet bermasalah. Silakan cek koneksi Anda dan coba lagi.';
      }

      await Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: errorMessage,
        confirmButtonColor: '#e63946',
        confirmButtonText: 'Tutup',
      });

    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  // Show loading state while initializing
  if (isInitializing) {
    return (
      <div className="relative bg-[#ffffff] py-20 px-4 ">
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memeriksa sistem upload...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#ffffff] py-20 px-4 overflow-hidden">
      {/* Elemen dekoratif bulat */}
      <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 bg-[#8fd8f8] opacity-20 rounded-full z-0"></div>

      {/* Form Container */}
      <div
        className={`relative z-10 max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl transition-all duration-700 ease-in-out ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <h2 className="text-3xl font-bold text-center text-white bg-gradient-to-r from-[#37CAD2] to-[#2596be] py-4 rounded-xl shadow-lg mb-8">
          Formulir Pengaduan
        </h2>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${message.type === 'success'
              ? 'bg-green-100 text-green-700'
              : message.type === 'warning'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
              }`}
          >
            {message.text}
          </div>
        )}

        {/* Upload Progress Bar */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Mengupload file...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input judul */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Judul Laporan</label>
            <input
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              required
              placeholder="Masukkan judul laporan Anda"
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formData.judul ? 'text-gray-900' : 'text-gray-500'}`}
            />
          </div>

          {/* Input deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Laporan</label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              required
              placeholder="Jelaskan isi laporan Anda"
              rows={5}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formData.deskripsi ? 'text-gray-900' : 'text-gray-500'
                }`}
            ></textarea>
          </div>

          {/* Dropdown tujuan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tujuan Laporan</label>
            <select
              name="tujuan"
              value={formData.tujuan}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formData.tujuan ? 'text-gray-900' : 'text-gray-500'
                }`}
            >
              <option value="">Pilih Tujuan</option>
              <option value="BSTI">BSTI</option>
              <option value="Security">Security</option>
              <option value="BAAK">BAAK</option>
            </select>
          </div>

          {/* Input file */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Bukti (Foto/Dokumen)
              <span className="text-xs text-gray-500 ml-2">Maksimal 10MB</span>
              {!bucketAccessible && (
                <span className="text-xs text-yellow-600 ml-2">(Opsional - sistem upload tidak tersedia)</span>
              )}
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${isDragOver
                ? 'border-blue-400 bg-blue-50'
                : bucketAccessible
                  ? 'border-gray-300 hover:border-blue-400'
                  : 'border-gray-300 bg-gray-50 opacity-75'
                }`}
              onDragOver={bucketAccessible ? handleDragOver : undefined}
              onDragLeave={bucketAccessible ? handleDragLeave : undefined}
              onDrop={bucketAccessible ? handleDrop : undefined}
            >
              <input
                type="file"
                name="file"
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                disabled={!bucketAccessible}
              />
              <label htmlFor="file-upload" className={`cursor-pointer ${!bucketAccessible ? 'cursor-not-allowed' : ''}`}>
                <div className="space-y-2">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="text-gray-600">
                    <span className="font-medium">
                      {bucketAccessible ? 'Klik untuk memilih file' : 'Upload file tidak tersedia'}
                    </span>
                    {bucketAccessible && ' atau drag and drop'}
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP, PDF, DOC, DOCX hingga 10MB</p>
                </div>
              </label>
            </div>

            {/* File preview */}
            {formData.file && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{formData.file.name}</p>
                      <p className="text-xs text-gray-500">{(formData.file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, file: null, previewUrl: null }));
                      const fileInput = document.querySelector('#file-upload');
                      if (fileInput) fileInput.value = '';
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Image preview */}
                {formData.previewUrl && (
                  <div className="mt-3">
                    <img
                      src={formData.previewUrl}
                      alt="Preview"
                      className="max-w-full h-auto max-h-60 rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-gradient-to-r from-[#34BBD1] to-[#2596be] text-white font-bold py-3 px-8 rounded-full hover:from-[#2596be] hover:to-[#1e7a8c] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? 'Mengirim...' : 'LAPORKAN'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
