import { useEffect, useState } from "react";
import api from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Loading profile...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-16 bg-white p-8 rounded-2xl shadow">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        User Profile
      </h2>

      <div className="space-y-4 text-gray-700">
        <div>
          <span className="font-semibold">Email:</span> {user.email}
        </div>
        <div>
          <span className="font-semibold">Gender:</span> {user.gender || "—"}
        </div>
        <div>
          <span className="font-semibold">Age:</span> {user.age || "—"}
        </div>
      </div>
    </div>
  );
}
