import axios from "axios";

const API_URL =
  "https://fnbigafgcnssfwcdcupa.supabase.co/rest/v1/User";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuYmlnYWZnY25zc2Z3Y2RjdXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0ODE2MTYsImV4cCI6MjA2NTA1NzYxNn0.nBzJTAB9RVEpqtQIt6Ib7dABH0VUwWK21eAgAcRuMhs";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const userAPI = {
  async fetchUser() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async createUser(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async fetchUser() {
    try {
      const response = await axios.get(API_URL, { headers });
      console.log("HTTP Status:", response.status); // Log status HTTP
      console.log("Response Data:", response.data); // Log data respons

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

};
