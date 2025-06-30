import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with your project URL and public API key
const supabaseUrl = 'https://fnbigafgcnssfwcdcupa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuYmlnYWZnY25zc2Z3Y2RjdXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0ODE2MTYsImV4cCI6MjA2NTA1NzYxNn0.nBzJTAB9RVEpqtQIt6Ib7dABH0VUwWK21eAgAcRuMhs';

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'sistem-pengaduan-web'
    }
  }
});

// Storage bucket name constant
export const STORAGE_BUCKET = 'bukti';

// Helper function to handle storage uploads with better error handling
export const uploadFile = async (bucketName, filePath, file) => {
  try {
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File terlalu besar. Maksimal ukuran file adalah 10MB.');
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Tipe file tidak didukung. Gunakan gambar (JPG, PNG, GIF, WebP) atau dokumen (PDF, DOC, DOCX).');
    }

    console.log('Attempting to upload file:', {
      bucket: bucketName,
      path: filePath,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });

    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error details:', {
        message: error.message,
        statusCode: error.statusCode,
        error: error.error,
        details: error.details
      });

      // Handle specific RLS errors
      if (error.message.includes('row-level security policy')) {
        throw new Error('Akses ditolak. Silakan hubungi administrator untuk mengatur izin upload file.');
      }

      if (error.message.includes('bucket not found')) {
        throw new Error('Bucket storage tidak ditemukan. Silakan hubungi administrator.');
      }

      if (error.message.includes('file size')) {
        throw new Error('Ukuran file melebihi batas yang diizinkan.');
      }

      throw new Error(`Gagal mengupload file: ${error.message}`);
    }

    console.log('File uploaded successfully:', data);
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Helper function to get public URL for a file
export const getPublicUrl = (bucketName, filePath) => {
  try {
    const { data: { publicUrl } } = supabase
      .storage
      .from(bucketName)
      .getPublicUrl(filePath);

    console.log('Generated public URL:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Error getting public URL:', error);
    throw new Error('Failed to get public URL.');
  }
};

// Helper function to delete a file from storage
export const deleteFile = async (bucketName, filePath) => {
  try {
    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .remove([filePath]);

    if (error) {
      console.error('Error deleting file:', error);
      throw new Error(`Gagal menghapus file: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Failed to delete file.');
  }
};

// Helper function to check if bucket exists and is accessible
export const checkBucketAccess = async (bucketName) => {
  try {
    console.log(`Checking access to bucket: ${bucketName}`);
    
    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .list('', { limit: 1 });

    if (error) {
      console.error('Bucket access check failed:', error);
      return false;
    }

    console.log('Bucket access check successful:', data);
    return true;
  } catch (error) {
    console.error('Error checking bucket access:', error);
    return false;
  }
};

// Authentication functions
export const signInWithEmail = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw new Error('Failed to sign in. Please check your credentials and try again.');
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error signing out:', error);
    throw new Error('Failed to sign out.');
  }
};

export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      throw error;
    }
    return data.session;
  } catch (error) {
    console.error('Error getting session:', error);
    throw new Error('Failed to retrieve session.');
  }
};

export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback);
};
