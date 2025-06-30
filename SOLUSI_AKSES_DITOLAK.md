# Solusi Lengkap: Error "Akses ditolak" pada Upload File

## 🔍 **Diagnosis Masalah**

Error "Akses ditolak" terjadi karena beberapa kemungkinan:

1. **RLS Policy belum diatur** di Supabase
2. **Bucket storage belum dibuat** atau tidak public
3. **Service role key tidak valid** atau tidak ada
4. **Konfigurasi Supabase salah**

## 🛠️ **Solusi Langkah demi Langkah**

### **Langkah 1: Verifikasi Supabase Project**

1. **Buka [Supabase Dashboard](https://supabase.com/dashboard)**
2. **Pilih project Anda** (`fnbigafgcnssfwcdcupa`)
3. **Masuk ke Settings → API**
4. **Catat informasi berikut:**
   - Project URL: `https://fnbigafgcnssfwcdcupa.supabase.co`
   - Anon public key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Service role key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### **Langkah 2: Buat Bucket Storage**

1. **Masuk ke menu Storage** di sidebar
2. **Klik "New bucket"**
3. **Isi form:**
   - Name: `bukti`
   - Public bucket: ✅ **CENTANG**
   - File size limit: `10MB`
   - Allowed MIME types: `image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document`
4. **Klik "Create bucket"**

### **Langkah 3: Set RLS Policies**

1. **Masuk ke SQL Editor**
2. **Copy dan paste query ini:**

```sql
-- 1. Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies if any
DROP POLICY IF EXISTS "Allow public uploads to bukti bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow public downloads from bukti bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates to bukti bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes from bukti bucket" ON storage.objects;

-- 3. Create new policies
CREATE POLICY "Allow public uploads to bukti bucket" ON storage.objects
FOR INSERT 
WITH CHECK (bucket_id = 'bukti');

CREATE POLICY "Allow public downloads from bukti bucket" ON storage.objects
FOR SELECT 
USING (bucket_id = 'bukti');

CREATE POLICY "Allow public updates to bukti bucket" ON storage.objects
FOR UPDATE 
USING (bucket_id = 'bukti')
WITH CHECK (bucket_id = 'bukti');

CREATE POLICY "Allow public deletes from bukti bucket" ON storage.objects
FOR DELETE 
USING (bucket_id = 'bukti');

-- 4. Verify policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'objects';
```

3. **Klik "Run"**

### **Langkah 4: Update Service Role Key**

1. **Buka file `src/config/supabaseClient.js`**
2. **Ganti service role key** dengan yang benar dari dashboard:

```javascript
// Ganti dengan service role key yang benar dari Supabase Dashboard
const serviceRoleKey = 'YOUR_ACTUAL_SERVICE_ROLE_KEY_HERE';
```

### **Langkah 5: Test Upload**

1. **Refresh halaman aplikasi**
2. **Coba upload file kecil** (misal: gambar 1MB)
3. **Cek console browser** untuk error detail

## 🔧 **Alternatif Solusi**

### **Solusi A: Disable RLS (Development Only)**

```sql
-- HANYA untuk development/testing
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
```

### **Solusi B: Policy yang Lebih Permisif**

```sql
-- Policy yang mengizinkan semua operasi
CREATE POLICY "Allow all operations on bukti bucket" ON storage.objects
FOR ALL 
USING (bucket_id = 'bukti')
WITH CHECK (bucket_id = 'bukti');
```

### **Solusi C: Gunakan Service Role untuk Upload**

Jika masih bermasalah, gunakan service role untuk bypass RLS:

```javascript
// Di src/config/supabaseClient.js
export const uploadFile = async (bucketName, filePath, file) => {
  try {
    // Gunakan service role client langsung
    const { data, error } = await supabaseAdmin
      .storage
      .from(bucketName)
      .upload(filePath, file);

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }
};
```

## 🐛 **Debugging**

### **1. Cek Console Browser**

Buka Developer Tools → Console, lalu jalankan:

```javascript
// Debug script
import { debugSupabase } from './debug_supabase.js';
debugSupabase.runAllChecks();
```

### **2. Cek Network Tab**

1. **Buka Developer Tools → Network**
2. **Coba upload file**
3. **Lihat request yang gagal**
4. **Cek response error**

### **3. Cek Supabase Logs**

1. **Masuk ke Supabase Dashboard**
2. **Pilih Logs**
3. **Filter by "storage"**
4. **Lihat error detail**

## 📋 **Checklist Verifikasi**

- [ ] Bucket `bukti` sudah dibuat
- [ ] Bucket marked as public
- [ ] RLS policies sudah dijalankan
- [ ] Service role key sudah benar
- [ ] File size < 10MB
- [ ] File type didukung
- [ ] Network connection stabil

## 🚨 **Error Messages & Solusi**

| Error Message | Penyebab | Solusi |
|---------------|----------|--------|
| "bucket not found" | Bucket belum dibuat | Buat bucket di Storage dashboard |
| "row-level security policy" | RLS policy belum diatur | Jalankan query RLS policy |
| "permission denied" | Service role key salah | Update service role key |
| "file size exceeds limit" | File terlalu besar | Compress file atau gunakan file lebih kecil |
| "invalid file type" | Tipe file tidak didukung | Gunakan file dengan tipe yang didukung |

## 🔒 **Security Considerations**

### **Production Environment**

1. **Jangan disable RLS** di production
2. **Gunakan autentikasi** untuk upload
3. **Batasi file types** dan sizes
4. **Monitor uploads** secara regular

### **Development Environment**

1. **Bisa disable RLS** untuk testing
2. **Gunakan service role** untuk bypass
3. **Test dengan berbagai file types**

## 📞 **Support**

Jika masih mengalami masalah:

1. **Cek semua checklist** di atas
2. **Jalankan debug script**
3. **Cek Supabase logs**
4. **Hubungi administrator** dengan error detail

## 🎯 **Quick Fix**

Jika ingin solusi cepat untuk testing:

```sql
-- Jalankan di SQL Editor
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
```

**⚠️ PERINGATAN:** Solusi ini hanya untuk development/testing. Jangan gunakan di production! 