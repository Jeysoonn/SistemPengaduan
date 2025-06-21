import axios from "axios";

const API_URL = "https://fnbigafgcnssfwcdcupa.supabase.co/rest/v1/Tanggapan";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuYmlnYWZnY25zc2Z3Y2RjdXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0ODE2MTYsImV4cCI6MjA2NTA1NzYxNn0.nBzJTAB9RVEpqtQIt6Ib7dABH0VUwWK21eAgAcRuMhs";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=minimal" // Untuk operasi DELETE
};

export const tanggapanAPI = {
  // Fetch all tanggapan data
  async fetchTanggapan() {
    try {
      const response = await axios.get(API_URL, { 
        headers,
        params: {
          select: '*' // Explicitly request all columns
        }
      });
      
      if (Array.isArray(response.data)) {
        return response.data;
      }
      console.error("Invalid data format:", response.data);
      return [];
    } catch (error) {
      console.error("Error fetching data:", {
        message: error.message,
        response: error.response?.data
      });
      return [];
    }
  },

  // Fetch tanggapan by pengaduan ID
  async fetchTanggapanByPengaduan(id_pengaduan) {
    try {
      const response = await axios.get(`${API_URL}?id_pengaduan=eq.${id_pengaduan}`, { 
        headers,
        params: {
          id_pengaduan: `eq.${id_pengaduan}`
        }
      });
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching tanggapan for pengaduan ${id_pengaduan}:`, error);
      return [];
    }
  },

  // Get last tanggapan
  async fetchLastTanggapan() {
    try {
      const response = await axios.get(`${API_URL}?order=id_tanggapan.desc&limit=1`, { 
        headers 
      });
      return response.data || [];
    } catch (error) {
      console.error("Error fetching last tanggapan:", error);
      return [];
    }
  },

  // Create new tanggapan
  async createTanggapan(data) {
    try {
      const response = await axios.post(API_URL, data, { 
        headers: {
          ...headers,
          "Prefer": "return=representation" // Untuk mendapatkan data yang baru dibuat
        }
      });
      return response.data?.[0] || null;
    } catch (error) {
      console.error("Error creating tanggapan:", {
        requestData: data,
        error: error.response?.data
      });
      throw error;
    }
  },

  // Delete tanggapan by pengaduan ID (Fungsi baru yang penting)
  async deleteTanggapanByPengaduan(id_pengaduan) {
    try {
      const response = await axios.delete(`${API_URL}?id_pengaduan=eq.${id_pengaduan}`, {
        headers,
        params: {
          id_pengaduan: `eq.${id_pengaduan}`
        }
      });
      
      // Supabase biasanya mengembalikan 204 No Content untuk DELETE sukses
      if (response.status === 204) {
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error(`Error deleting tanggapan for pengaduan ${id_pengaduan}:`, {
        status: error.response?.status,
        data: error.response?.data
      });
      throw error;
    }
  },

  async deleteTanggapanByPengaduan(id_pengaduan) {
    try {
      console.log("Menghapus tanggapan untuk pengaduan:", id_pengaduan);
      const response = await axios.delete(
        `${API_URL}?id_pengaduan=eq.${id_pengaduan}`,
        { headers }
      );
      
      console.log("Penghapusan tanggapan berhasil:", response.status);
      return { success: true };
    } catch (error) {
      console.error("Gagal menghapus tanggapan:", error);
      throw error;
    }
  }
};