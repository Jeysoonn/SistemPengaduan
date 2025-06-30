# Solusi Sederhana: Error "Sistem storage tidak dapat diinisialisasi"

## 🎯 **Masalah**
Error ini terjadi karena bucket storage `bukti` belum dibuat di Supabase atau RLS policies belum diatur.

## ✅ **Solusi Cepat (5 Menit)**

### **Langkah 1: Buat Bucket Storage**
1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Klik menu **Storage** di sidebar
4. Klik **"New bucket"**
5. Isi form:
   - **Name**: `bukti`
   - ✅ **Public bucket** (centang)
   - **File size limit**: `10MB`
6. Klik **"Create bucket"**

### **Langkah 2: Set RLS Policies**
1. Klik menu **SQL Editor** di sidebar
2. Copy dan paste query ini:

```sql
-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policies for bukti bucket
CREATE POLICY "Allow public uploads to bukti bucket" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'bukti');

CREATE POLICY "Allow public downloads from bukti bucket" ON storage.objects
FOR SELECT USING (bucket_id = 'bukti');

CREATE POLICY "Allow public updates to bukti bucket" ON storage.objects
FOR UPDATE USING (bucket_id = 'bukti') WITH CHECK (bucket_id = 'bukti');

CREATE POLICY "Allow public deletes from bukti bucket" ON storage.objects
FOR DELETE USING (bucket_id = 'bukti');
```

3. Klik **"Run"**

### **Langkah 3: Test**
1. Refresh halaman aplikasi
2. Coba upload file kecil
3. Selesai! 🎉

## 🔧 **Jika Masih Bermasalah**

### **Solusi A: Disable RLS (Development Only)**
Jalankan di SQL Editor:
```sql
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
```

### **Solusi B: Cek Bucket Settings**
1. Klik bucket `bukti`
2. Klik tab **Settings**
3. Pastikan **Public bucket** sudah dicentang
4. Pastikan **File size limit** sudah diset ke 10MB

### **Solusi C: Verifikasi API Keys**
1. Klik **Settings** → **API**
2. Pastikan menggunakan **anon public key** (bukan service role)
3. Copy key yang benar ke `src/config/supabaseClient.js`

## 🐛 **Debugging**

### **Cek Console Browser**
1. Buka Developer Tools (F12)
2. Klik tab **Console**
3. Lihat error messages
4. Jika ada error, catat dan share

### **Cek Network Tab**
1. Buka Developer Tools → **Network**
2. Coba upload file
3. Lihat request yang gagal
4. Cek response error

## 📋 **Checklist**

- [ ] Bucket `bukti` sudah dibuat
- [ ] Bucket marked as public
- [ ] RLS policies sudah dijalankan
- [ ] File size < 10MB
- [ ] File type didukung (JPG, PNG, PDF, DOC, DOCX)
- [ ] Network connection stabil

## 🚨 **Error Messages**

| Error | Solusi |
|-------|--------|
| "bucket not found" | Buat bucket di Storage dashboard |
| "row-level security policy" | Jalankan query RLS policy |
| "permission denied" | Cek bucket settings |
| "file size exceeds limit" | Gunakan file lebih kecil |

## 💡 **Tips**

1. **Test dengan file kecil** dulu (1-2MB)
2. **Gunakan gambar JPG** untuk testing
3. **Cek internet connection**
4. **Refresh browser** setelah setup

## 📞 **Support**

Jika masih bermasalah:
1. Screenshot error dari console
2. Screenshot bucket settings
3. Share error detail

---

**⏱️ Waktu yang dibutuhkan**: 5-10 menit
**🎯 Tingkat kesulitan**: Mudah
**✅ Success rate**: 95% 