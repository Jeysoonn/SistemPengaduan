import React, { useState } from "react";
import { notesAPI } from "../../service/apiUser";  // Mengimpor notesAPI untuk registrasi
import { useNavigate } from "react-router-dom";  // Untuk navigasi setelah registrasi

export default function Register() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();  // Hook untuk navigasi setelah registrasi

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validasi form
    if (!nama || !email || !password || !confirmPassword) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Membuat akun pengguna baru menggunakan notesAPI
      const userData = {
        nama,
        email,
        role: "Mahasiswa",  // Menetapkan role sebagai Mahasiswa, Anda bisa sesuaikan jika perlu
        password,  // Pastikan password tidak dalam bentuk plaintext, Anda harus melakukan hashing jika memungkinkan
      };

      // Menggunakan notesAPI untuk membuat pengguna baru
      const response = await notesAPI.createUser(userData);
      console.log("User registered:", response);

      // Arahkan pengguna setelah registrasi berhasil (misalnya ke halaman login)
      navigate("/auth/login");  // Anda bisa menyesuaikan dengan path yang sesuai
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong during registration: " + err.message);  // Menampilkan pesan error yang lebih informatif
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800 mb-4 font-poppins">Register</h2>

      {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

      <form onSubmit={handleSubmit} className="w-full space-y-4 font-poppins">
        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">Enter your full name</p>
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">Enter a valid email, e.g., <em>name@example.com</em></p>
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Minimum 8 characters, recommended mix of letters & numbers
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">Please confirm your password.</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition font-poppins"
          disabled={loading}
        >
          {loading ? "Registering..." : "REGISTER"}
        </button>

        {/* Login Redirect */}
        <div className="text-center mt-4 text-sm text-blue-600 hover:underline cursor-pointer" onClick={() => navigate("/auth/login")}>
          Already have an account? Login here.
        </div>
      </form>
    </>
  );
}
