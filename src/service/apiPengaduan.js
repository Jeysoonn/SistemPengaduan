import axios from "axios";
import { tanggapanAPI } from "./apiTanggapan";

const API_URL = "https://fnbigafgcnssfwcdcupa.supabase.co/rest/v1/Pengaduan";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuYmlnYWZnY25zc2Z3Y2RjdXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0ODE2MTYsImV4cCI6MjA2NTA1NzYxNn0.nBzJTAB9RVEpqtQIt6Ib7dABH0VUwWK21eAgAcRuMhs";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation" // This ensures we get the updated data back
};

export const pengaduanAPI = {
  // Fetch all pengaduan data
  async fetchPengaduan() {
    try {
      const response = await axios.get(API_URL, { headers });
      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        console.error("Data yang diterima bukan array:", response.data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  },

  // Get last pengaduan for ID generation
  async fetchLastPengaduan() {
    try {
      const response = await axios.get(`${API_URL}?order=id_pengaduan.desc&limit=1`, { 
        headers 
      });
      return response.data || [];
    } catch (error) {
      console.error("Error fetching last pengaduan:", error);
      return [];
    }
  },

  // Create a new pengaduan
  async createPengaduan(data) {
    try {
      const response = await axios.post(API_URL, data, { headers });
      return response.data;
    } catch (error) {
      console.error("Error creating pengaduan:", error);
      throw error;
    }
  },

  // Update status to "Selesai"
  async updateStatusToSelesai(id_pengaduan) {
    try {
      const response = await axios.patch(
        `${API_URL}?id_pengaduan=eq.${id_pengaduan}`,
        { status: "Selesai" },
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  },

  // Update pengaduan
  async updatePengaduan(id_pengaduan, data) {
    try {
      const response = await axios.patch(
        `${API_URL}?id_pengaduan=eq.${id_pengaduan}`,
        data,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating pengaduan:", error);
      throw error;
    }
  },

  async deletePengaduan(id_pengaduan) {
    try {
      console.log("Memulai proses penghapusan pengaduan:", id_pengaduan);
      
      // 1. Hapus semua tanggapan terkait
      console.log("Menghapus tanggapan terkait...");
      await tanggapanAPI.deleteTanggapanByPengaduan(id_pengaduan);
      
      // 2. Hapus pengaduan
      console.log("Menghapus pengaduan...");
      const response = await axios.delete(
        `${API_URL}?id_pengaduan=eq.${id_pengaduan}`,
        { 
          headers: {
            ...headers,
            "Prefer": "return=representation"
          }
        }
      );
      
      console.log("Penghapusan berhasil:", response.status);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Detail error:", {
        message: error.message,
        response: error.response?.data,
        config: error.config
      });
      throw error;
    }
  }
};