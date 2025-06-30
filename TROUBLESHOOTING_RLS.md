# Troubleshooting RLS (Row Level Security) - Supabase Storage

## Error: "new row violates row-level security policy"

Error ini terjadi karena Supabase Storage bucket memiliki RLS (Row Level Security) yang aktif, tetapi tidak ada policy yang mengizinkan upload file.

## Solusi Langkah demi Langkah

### 1. Masuk ke Supabase Dashboard

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Masuk ke menu **SQL Editor**

### 2. Jalankan Query RLS Policy

Copy dan paste query berikut ke SQL Editor, lalu klik **Run**:

```sql
-- Enable RLS pada storage.objects table (jika belum)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy untuk mengizinkan INSERT (upload) file ke bucket 'bukti'
CREATE POLICY "Allow public uploads to bukti bucket" ON storage.objects
FOR INSERT 
WITH CHECK (bucket_id = 'bukti');

-- Policy untuk mengizinkan SELECT (download/view) file dari bucket 'bukti'
CREATE POLICY "Allow public downloads from bukti bucket" ON storage.objects
FOR SELECT 
USING (bucket_id = 'bukti');

-- Policy untuk mengizinkan UPDATE file di bucket 'bukti'
CREATE POLICY "Allow public updates to bukti bucket" ON storage.objects
FOR UPDATE 
USING (bucket_id = 'bukti')
WITH CHECK (bucket_id = 'bukti');

-- Policy untuk mengizinkan DELETE file dari bucket 'bukti'
CREATE POLICY "Allow public deletes from bukti bucket" ON storage.objects
FOR DELETE 
USING (bucket_id = 'bukti');
```

### 3. Verifikasi Bucket Storage

1. Masuk ke menu **Storage** di sidebar
2. Pastikan bucket dengan nama `bukti` sudah ada
3. Jika belum ada, buat bucket baru:
   - Klik **New bucket**
   - Nama: `bukti`
   - Public bucket: ✅ (centang)
   - Klik **Create bucket**

### 4. Set Bucket Permissions

1. Klik bucket `bukti`
2. Masuk ke tab **Settings**
3. Pastikan **Public bucket** sudah dicentang
4. Di bagian **Policies**, pastikan policy sudah terpasang

### 5. Test Upload

Setelah menjalankan query di atas, coba upload file lagi di aplikasi.

## Alternatif Solusi

### Solusi 1: Disable RLS (Tidak Disarankan untuk Production)

```sql
-- Disable RLS pada storage.objects (HANYA untuk development/testing)
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
```

### Solusi 2: Policy yang Lebih Spesifik

```sql
-- Policy untuk folder pengaduan saja
CREATE POLICY "Allow public uploads to pengaduan folder" ON storage.objects
FOR INSERT 
WITH CHECK (bucket_id = 'bukti' AND name LIKE 'pengaduan/%');

CREATE POLICY "Allow public downloads from pengaduan folder" ON storage.objects
FOR SELECT 
USING (bucket_id = 'bukti' AND name LIKE 'pengaduan/%');
```

### Solusi 3: Policy dengan Autentikasi

```sql
-- Policy yang memerlukan user login
CREATE POLICY "Allow authenticated uploads to bukti bucket" ON storage.objects
FOR INSERT 
WITH CHECK (bucket_id = 'bukti' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated downloads from bukti bucket" ON storage.objects
FOR SELECT 
USING (bucket_id = 'bukti' AND auth.role() = 'authenticated');
```

## Debugging

### 1. Cek Policy yang Ada

```sql
-- Lihat semua policy yang ada
SELECT * FROM pg_policies WHERE tablename = 'objects';
```

### 2. Cek Bucket yang Ada

```sql
-- Lihat semua bucket
SELECT * FROM storage.buckets;
```

### 3. Test Upload Manual

```sql
-- Test insert manual (ganti dengan data yang sesuai)
INSERT INTO storage.objects (bucket_id, name, owner, metadata)
VALUES ('bukti', 'test.txt', auth.uid(), '{"size": 100}');
```

## Error Messages yang Umum

### 1. "bucket not found"
- **Penyebab**: Bucket `bukti` tidak ada
- **Solusi**: Buat bucket di Storage dashboard

### 2. "permission denied"
- **Penyebab**: RLS policy tidak mengizinkan operasi
- **Solusi**: Jalankan query RLS policy di atas

### 3. "file size exceeds limit"
- **Penyebab**: File terlalu besar
- **Solusi**: Compress file atau gunakan file yang lebih kecil

### 4. "invalid file type"
- **Penyebab**: Tipe file tidak didukung
- **Solusi**: Gunakan file dengan tipe yang didukung

## Best Practices

### 1. Security
- Gunakan policy yang spesifik, bukan `FOR ALL`
- Pertimbangkan menggunakan autentikasi untuk upload
- Batasi tipe file yang diizinkan

### 2. Performance
- Gunakan folder structure yang terorganisir
- Batasi ukuran file
- Implementasikan cleanup untuk file lama

### 3. Monitoring
- Monitor penggunaan storage
- Set up alerts untuk error
- Log semua operasi upload

## Contoh Policy Lengkap

```sql
-- Policy lengkap untuk sistem pengaduan
-- Jalankan satu per satu

-- 1. Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 2. Policy untuk upload (INSERT)
CREATE POLICY "Allow public uploads to bukti bucket" ON storage.objects
FOR INSERT 
WITH CHECK (bucket_id = 'bukti');

-- 3. Policy untuk download (SELECT)
CREATE POLICY "Allow public downloads from bukti bucket" ON storage.objects
FOR SELECT 
USING (bucket_id = 'bukti');

-- 4. Policy untuk update (UPDATE)
CREATE POLICY "Allow public updates to bukti bucket" ON storage.objects
FOR UPDATE 
USING (bucket_id = 'bukti')
WITH CHECK (bucket_id = 'bukti');

-- 5. Policy untuk delete (DELETE)
CREATE POLICY "Allow public deletes from bukti bucket" ON storage.objects
FOR DELETE 
USING (bucket_id = 'bukti');

-- 6. Verifikasi policy
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'objects';
```

## Support

Jika masih mengalami masalah:

1. **Cek Console Browser**: Lihat error di Developer Tools
2. **Cek Network Tab**: Lihat request yang gagal
3. **Cek Supabase Logs**: Lihat di Dashboard > Logs
4. **Hubungi Support**: Jika masalah masih berlanjut

## Catatan Penting

- **Backup**: Selalu backup data sebelum mengubah policy
- **Testing**: Test di environment development dulu
- **Documentation**: Catat semua perubahan yang dilakukan
- **Monitoring**: Monitor aplikasi setelah perubahan 