# File Upload Guide - Sistem Pengaduan

## Overview
Sistem pengaduan telah diimplementasikan dengan fitur upload file bukti yang terintegrasi dengan Supabase Storage. Fitur ini memungkinkan pengguna untuk mengupload file bukti (gambar atau dokumen) saat mengirim pengaduan.

## Fitur yang Diimplementasikan

### 1. File Upload dengan Drag & Drop
- **Drag & Drop**: Pengguna dapat drag file langsung ke area upload
- **Click to Upload**: Pengguna dapat klik area upload untuk memilih file
- **Visual Feedback**: Area upload berubah warna saat file di-drag over

### 2. Validasi File
- **Ukuran File**: Maksimal 10MB
- **Tipe File yang Didukung**:
  - Gambar: JPG, PNG, GIF, WebP
  - Dokumen: PDF, DOC, DOCX
- **Error Handling**: Pesan error yang jelas untuk file yang tidak valid

### 3. Preview File
- **Image Preview**: Gambar ditampilkan sebagai preview
- **File Info**: Menampilkan nama file dan ukuran
- **Remove File**: Tombol untuk menghapus file yang dipilih

### 4. Progress Indicator
- **Upload Progress Bar**: Menampilkan progress upload file
- **Status Messages**: Pesan sukses/error yang informatif

## Konfigurasi Supabase

### Storage Bucket
- **Nama Bucket**: `bukti`
- **Path**: `pengaduan/{id_pengaduan}_{timestamp}.{extension}`

### File Structure
```
bukti/
└── pengaduan/
    ├── 1_1703123456789.jpg
    ├── 2_1703123456790.pdf
    └── ...
```

## Implementasi Teknis

### 1. Supabase Client Configuration
```javascript
// src/config/supabaseClient.js
const supabaseUrl = 'https://fnbigafgcnssfwcdcupa.supabase.co';
const supabaseKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### 2. Helper Functions
```javascript
// Upload file dengan validasi
export const uploadFile = async (bucketName, filePath, file) => {
  // Validasi ukuran dan tipe file
  // Upload ke Supabase Storage
  // Return data atau throw error
};

// Get public URL
export const getPublicUrl = (bucketName, filePath) => {
  // Return public URL untuk file
};
```

### 3. Component Implementation
```javascript
// src/component/Mahasiswa/FormulirPengaduan.jsx
const handleSubmit = async (e) => {
  // 1. Upload file ke Supabase (jika ada)
  // 2. Dapatkan public URL
  // 3. Simpan data pengaduan dengan URL file
};
```

## Cara Penggunaan

### Untuk Pengguna
1. Buka halaman Formulir Pengaduan
2. Isi form pengaduan (judul, deskripsi, tujuan)
3. Upload file bukti dengan cara:
   - Drag & drop file ke area upload, atau
   - Klik area upload untuk memilih file
4. File akan divalidasi dan ditampilkan preview
5. Klik "LAPORKAN" untuk mengirim pengaduan

### Untuk Developer
1. Pastikan Supabase project sudah dikonfigurasi
2. Buat bucket storage dengan nama `bukti`
3. Set bucket permissions untuk public access
4. Pastikan environment variables sudah diset

## Error Handling

### Common Errors
1. **File terlalu besar**: Maksimal 10MB
2. **Tipe file tidak didukung**: Hanya gambar dan dokumen tertentu
3. **Upload gagal**: Network error atau Supabase error
4. **Form validation**: Field required tidak diisi

### Error Messages
- Pesan error ditampilkan dalam bahasa Indonesia
- Error handling yang user-friendly
- Clear instructions untuk user

## Security Considerations

### File Validation
- Validasi tipe file di client-side dan server-side
- Pembatasan ukuran file
- Sanitasi nama file

### Storage Security
- File disimpan dengan nama unik (timestamp)
- Public URL untuk akses file
- Bucket permissions yang sesuai

## Performance Optimization

### File Handling
- Client-side validation untuk mengurangi server load
- Progress indicator untuk user experience
- Efficient file preview untuk gambar

### Storage
- File compression (jika diperlukan)
- CDN untuk delivery file
- Cache control headers

## Troubleshooting

### Common Issues
1. **File tidak terupload**: Cek koneksi internet dan Supabase config
2. **Preview tidak muncul**: Cek tipe file dan browser support
3. **Error 403**: Cek bucket permissions di Supabase
4. **File tidak tersimpan**: Cek database connection dan API endpoint

### Debug Steps
1. Cek browser console untuk error messages
2. Verifikasi Supabase configuration
3. Test upload dengan file kecil terlebih dahulu
4. Cek network tab untuk API calls

## Future Enhancements

### Potential Improvements
1. **Multiple File Upload**: Upload beberapa file sekaligus
2. **File Compression**: Compress gambar sebelum upload
3. **Cloud Processing**: Image processing di cloud
4. **Advanced Validation**: Virus scanning, content analysis
5. **File Management**: Delete, replace, organize files

### Integration Ideas
1. **OCR Processing**: Extract text dari gambar
2. **Image Recognition**: Auto-categorize images
3. **Document Parsing**: Extract data dari PDF/DOC
4. **Thumbnail Generation**: Auto-generate thumbnails 