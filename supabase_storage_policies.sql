-- Supabase Storage RLS Policies untuk bucket 'bukti'
-- Jalankan query ini di Supabase SQL Editor

-- 1. Enable RLS pada storage.objects table (jika belum)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 2. Policy untuk mengizinkan INSERT (upload) file ke bucket 'bukti'
CREATE POLICY "Allow public uploads to bukti bucket" ON storage.objects
FOR INSERT 
WITH CHECK (bucket_id = 'bukti');

-- 3. Policy untuk mengizinkan SELECT (download/view) file dari bucket 'bukti'
CREATE POLICY "Allow public downloads from bukti bucket" ON storage.objects
FOR SELECT 
USING (bucket_id = 'bukti');

-- 4. Policy untuk mengizinkan UPDATE file di bucket 'bukti'
CREATE POLICY "Allow public updates to bukti bucket" ON storage.objects
FOR UPDATE 
USING (bucket_id = 'bukti')
WITH CHECK (bucket_id = 'bukti');

-- 5. Policy untuk mengizinkan DELETE file dari bucket 'bukti'
CREATE POLICY "Allow public deletes from bukti bucket" ON storage.objects
FOR DELETE 
USING (bucket_id = 'bukti');

-- 6. Jika ingin lebih spesifik dengan folder 'pengaduan', gunakan policy ini:
-- CREATE POLICY "Allow public uploads to pengaduan folder" ON storage.objects
-- FOR INSERT 
-- WITH CHECK (bucket_id = 'bukti' AND name LIKE 'pengaduan/%');

-- CREATE POLICY "Allow public downloads from pengaduan folder" ON storage.objects
-- FOR SELECT 
-- USING (bucket_id = 'bukti' AND name LIKE 'pengaduan/%');

-- 7. Alternatif: Jika ingin mengizinkan semua operasi untuk bucket 'bukti'
-- CREATE POLICY "Allow all operations on bukti bucket" ON storage.objects
-- FOR ALL 
-- USING (bucket_id = 'bukti')
-- WITH CHECK (bucket_id = 'bukti');

-- Catatan: 
-- - Policy ini mengizinkan akses publik ke bucket 'bukti'
-- - Untuk keamanan lebih tinggi, bisa ditambahkan kondisi autentikasi
-- - Contoh dengan autentikasi: AND auth.role() = 'authenticated' 