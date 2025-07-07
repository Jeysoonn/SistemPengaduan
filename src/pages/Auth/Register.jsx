import React, { useState } from "react";
import { userAPI } from "../../service/apiUser";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
      const userData = {
        nama,
        email,
        role: "Mahasiswa",
        password,
      };

      const response = await userAPI.createUser(userData);
      console.log("User registered:", response);
      navigate("/auth/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-[#2596be] mb-4 font-poppins">Register</h2>
      <p className="text-gray-500 text-sm mb-4 font-poppins">create your student account</p>

      {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

      <form onSubmit={handleSubmit} className="w-full space-y-4 font-poppins">
        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#37CAD2]"
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
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#37CAD2]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter a valid email, e.g., <em>name@example.com</em>
          </p>
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#37CAD2]"
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
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#37CAD2]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">Please confirm your password.</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-[#37CAD2] to-[#91CBE3] text-white font-semibold rounded-full hover:opacity-90 transition font-poppins"
          disabled={loading}
        >
          {loading ? "Registering..." : "REGISTER"}
        </button>

        {/* Login Redirect */}
        <button
          type="button"
          onClick={() => navigate("/auth/login")}
          className="w-full py-2 border border-[#37CAD2] text-[#37CAD2] font-semibold rounded-full hover:bg-[#ecfdfd] transition font-poppins"
        >
          Back to Login
        </button>
      </form>
    </>
  );
}
