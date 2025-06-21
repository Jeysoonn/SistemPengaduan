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
  },

  async getLastUserId() {
    try {
      const response = await axios.get(API_URL, {
        headers,
        params: {
          order: 'id_user.desc',  // Urutkan berdasarkan id_user secara menurun
          limit: 1,  // Ambil hanya satu data terakhir
        },
      });

      // Mengambil ID terakhir dari respons
      if (response.data && response.data.length > 0) {
        const lastUser = response.data[0];
        return lastUser.id_user;  // Mengembalikan ID terakhir
      } else {
        return 0;  // Jika tidak ada data, mulai dengan ID 1
      }
    } catch (error) {
      console.error("Error fetching last user ID:", error);
      throw new Error("Error fetching last user ID: " + error.message);
    }
  },

  // Fungsi untuk membuat pengguna baru
  async createUser(data) {
    try {
      // Ambil ID terakhir dan increment
      const lastId = await this.getLastUserId();
      const newId = lastId + 1; // Increment ID terakhir

      // Menambahkan id_user yang baru
      const userData = {
        ...data,
        id_user: newId,  // Menambahkan ID yang sudah di-increment
      };

      const response = await axios.post(API_URL, userData, { headers });

      if (response.status === 201) {
        return response.data; // Pengguna berhasil dibuat
      } else {
        console.error("Error while creating user:", response.status, response.statusText);
        throw new Error("Error while creating user");
      }
    } catch (error) {
      console.error("Error in createUser:", error.response || error.message);
      throw new Error("Error creating user: " + (error.response ? error.response.data : error.message));
    }
  }
};
