import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Email regex (simple + effective)
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function submit() {
    setError("");

    // 🔹 Email validation
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // 🔹 Password validation (optional but recommended)
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // 🔹 Gender validation
    if (!gender) {
      setError("Please select your gender");
      return;
    }

    // 🔹 Age validation (minimum 12)
    const numericAge = Number(age);
    if (!numericAge) {
      setError("Age is required");
      return;
    }
    if (numericAge < 12) {
      setError("You must be at least 12 years old to use this app");
      return;
    }

    try {
      await api.post("/auth/register", {
        email,
        password,
        gender,
        age: numericAge,
      });

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-6">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">

        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Create Account
        </h2>
        <p className="text-gray-500 mb-6">
          Join AI Fitness Advisor and start training smarter
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-1 block">Email</label>
          <input
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-1 block">Password</label>
          <input
            type="password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-1 block">Gender</label>
          <select
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Age */}
        <div className="mb-6">
          <label className="text-sm text-gray-600 mb-1 block">Age</label>
          <input
            type="number"
            min="12"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="18"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        {/* Register Button */}
        <button
          onClick={submit}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition"
        >
          Create Account
        </button>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
