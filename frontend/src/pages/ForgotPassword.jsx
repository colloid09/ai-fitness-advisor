import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await api.post("/auth/forgot-password", { email });
      setMessage("If the email exists, a reset link has been sent.");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white p-8 rounded-2xl shadow max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your registered email to receive a reset link
        </p>

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition font-semibold disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
