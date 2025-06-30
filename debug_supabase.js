// Debug script untuk mengecek konfigurasi Supabase
// Jalankan script ini di browser console untuk debugging

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fnbigafgcnssfwcdcupa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuYmlnYWZnY25zc2Z3Y2RjdXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0ODE2MTYsImV4cCI6MjA2NTA1NzYxNn0.nBzJTAB9RVEpqtQIt6Ib7dABH0VUwWK21eAgAcRuMhs';

const supabase = createClient(supabaseUrl, supabaseKey);

// Debug functions
export const debugSupabase = {
  // Test connection
  async testConnection() {
    try {
      console.log('🔍 Testing Supabase connection...');
      const { data, error } = await supabase.from('User').select('count').limit(1);
      
      if (error) {
        console.error('❌ Connection failed:', error);
        return false;
      }
      
      console.log('✅ Connection successful');
      return true;
    } catch (error) {
      console.error('❌ Connection error:', error);
      return false;
    }
  },

  // Check bucket existence
  async checkBucket() {
    try {
      console.log('🔍 Checking bucket "bukti"...');
      const { data, error } = await supabase.storage.from('bukti').list('', { limit: 1 });
      
      if (error) {
        console.error('❌ Bucket check failed:', error);
        return false;
      }
      
      console.log('✅ Bucket "bukti" exists and accessible');
      console.log('📁 Bucket contents:', data);
      return true;
    } catch (error) {
      console.error('❌ Bucket check error:', error);
      return false;
    }
  },

  // Test upload with small file
  async testUpload() {
    try {
      console.log('🔍 Testing file upload...');
      
      // Create a small test file
      const testContent = 'This is a test file for debugging';
      const testFile = new File([testContent], 'test.txt', { type: 'text/plain' });
      
      const { data, error } = await supabase.storage
        .from('bukti')
        .upload(`debug/test_${Date.now()}.txt`, testFile);
      
      if (error) {
        console.error('❌ Upload test failed:', error);
        return false;
      }
      
      console.log('✅ Upload test successful:', data);
      
      // Clean up test file
      await supabase.storage.from('bukti').remove([`debug/test_${Date.now()}.txt`]);
      console.log('🧹 Test file cleaned up');
      
      return true;
    } catch (error) {
      console.error('❌ Upload test error:', error);
      return false;
    }
  },

  // Check RLS policies
  async checkRLSPolicies() {
    try {
      console.log('🔍 Checking RLS policies...');
      
      // Try to query storage.objects directly
      const { data, error } = await supabase
        .from('storage.objects')
        .select('*')
        .eq('bucket_id', 'bukti')
        .limit(1);
      
      if (error) {
        console.error('❌ RLS policy check failed:', error);
        return false;
      }
      
      console.log('✅ RLS policies seem to be working');
      return true;
    } catch (error) {
      console.error('❌ RLS policy check error:', error);
      return false;
    }
  },

  // Get bucket info
  async getBucketInfo() {
    try {
      console.log('🔍 Getting bucket information...');
      
      const { data, error } = await supabase.storage.getBucket('bukti');
      
      if (error) {
        console.error('❌ Get bucket info failed:', error);
        return null;
      }
      
      console.log('✅ Bucket info:', data);
      return data;
    } catch (error) {
      console.error('❌ Get bucket info error:', error);
      return null;
    }
  },

  // Run all checks
  async runAllChecks() {
    console.log('🚀 Starting comprehensive Supabase debug...\n');
    
    const results = {
      connection: await this.testConnection(),
      bucket: await this.checkBucket(),
      upload: await this.testUpload(),
      rls: await this.checkRLSPolicies(),
      bucketInfo: await this.getBucketInfo()
    };
    
    console.log('\n📊 Debug Results:');
    console.log('Connection:', results.connection ? '✅' : '❌');
    console.log('Bucket Access:', results.bucket ? '✅' : '❌');
    console.log('Upload Test:', results.upload ? '✅' : '❌');
    console.log('RLS Policies:', results.rls ? '✅' : '❌');
    
    if (results.bucketInfo) {
      console.log('Bucket Public:', results.bucketInfo.public ? '✅' : '❌');
    }
    
    return results;
  }
};

// Export for use in browser console
window.debugSupabase = debugSupabase; 