import axios from "axios";

const API_URL = "https://fnbigafgcnssfwcdcupa.supabase.co/rest/v1/User";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuYmlnYWZnY25zc2Z3Y2RjdXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0ODE2MTYsImV4cCI6MjA2NTA1NzYxNn0.nBzJTAB9RVEpqtQIt6Ib7dABH0VUwWK21eAgAcRuMhs";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

export const userAPI = {
  async fetchUser() {
    try {
      const response = await axios.get(API_URL, { headers });
      console.log("Data user yang diterima:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  async updateUser(id_user, data) {
    try {
      // Log data sebelum dikirim
      console.log("Mengupdate user dengan ID:", id_user);
      console.log("Data yang dikirim:", data);
      
      const payload = {...data};
      if (!payload.password) {
        delete payload.password;
      }
      
      const response = await axios.patch(
        `${API_URL}?id_user=eq.${id_user}`,
        payload,
        { headers }
      );
      
      console.log("Response update:", response);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.response) {
        console.error("Response error:", error.response.data);
      }
      throw error;
    }
  },

  async deleteUser(id_user) {
    try {
      console.log("Menghapus user dengan ID:", id_user);
      const response = await axios.delete(
        `${API_URL}?id_user=eq.${id_user}`,
        { headers }
      );
      console.log("Response delete:", response);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      if (error.response) {
        console.error("Response error:", error.response.data);
      }
      throw error;
    }
  }
};
