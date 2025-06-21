import axios from "axios";

const API_URL = "https://fnbigafgcnssfwcdcupa.supabase.co/rest/v1/Faq";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuYmlnYWZnY25zc2Z3Y2RjdXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0ODE2MTYsImV4cCI6MjA2NTA1NzYxNn0.nBzJTAB9RVEpqtQIt6Ib7dABH0VUwWK21eAgAcRuMhs";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

export const faqAPI = {
  async fetchAllFaq() {
    try {
      const response = await axios.get(API_URL, {
        headers,
        params: {
          select: "*",
          order: "id_faq.asc"
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      throw new Error("Gagal mengambil data FAQ");
    }
  },

  async createFaq(faqData) {
    try {
      const response = await axios.post(API_URL, faqData, { headers });
      return response.data[0];
    } catch (error) {
      console.error("Error creating FAQ:", error);
      throw new Error("Gagal membuat FAQ baru");
    }
  },

  async deleteFaq(id) {
    try {
      await axios.delete(`${API_URL}?id_faq=eq.${id}`, { headers });
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      throw new Error("Gagal menghapus FAQ");
    }
  },

  async updateFaq(id, data) {
    try {
      const response = await axios.patch(
        `${API_URL}?id_faq=eq.${id}`,
        data,
        { 
          headers,
          params: {
            select: "*"
          }
        }
      );
      return response.data[0];
    } catch (error) {
      console.error("Error updating FAQ:", error);
      throw new Error("Gagal memperbarui FAQ");
    }
  }
};