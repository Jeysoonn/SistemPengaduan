import React, { useState } from "react";
import { userAPI } from "../../service/apiUser";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();

  // Get the intended destination from location state
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    try {
      // Cek data login ke API menggunakan userAPI
      const users = await userAPI.fetchUser();

      // Mencari pengguna berdasarkan email
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        // Store user data in context and localStorage
        login(user);
        
        // Setelah login berhasil, periksa role pengguna dan arahkan ke halaman yang sesuai
        if (user.role === "Admin") {
          navigate("/admin");
        } else if (user.role === "BSTI") {
          navigate("/bsti");
        } else if (user.role === "Mahasiswa") {
          navigate("/home");
        } else if (user.role === "Security") {
          navigate("/security");
        } else if (user.role === "BAAK") {
          navigate("/baak");
        } else {
          setError("Unknown role");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800 mb-4 font-poppins">Login</h2>
      <p className="text-gray-500 text-sm mb-4 font-poppins">or use your account</p>

      {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

      <form onSubmit={handleSubmit} className="w-full space-y-4 font-poppins">
        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Masukkan email yang valid, misalnya: <em>name@example.com</em>
          </p>
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Minimal 8 karakter, disarankan kombinasi huruf & angka
          </p>
        </div>

        {/* Forgot Password */}
        <div className="text-right text-sm text-blue-600 hover:underline cursor-pointer">
          Forgot your password?
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition font-poppins"
          disabled={loading}
        >
          {loading ? "Logging in..." : "LOG IN"}
        </button>

        {/* Register */}
        <button
          type="button"
          onClick={() => navigate('/auth/register')}
          className="w-full py-2 border border-blue-500 text-blue-500 font-semibold rounded-full hover:bg-blue-50 transition font-poppins"
        >
          Register
        </button>
      </form>
    </>
  );
}
