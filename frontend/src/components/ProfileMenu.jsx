import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserEmail, logout } from "../utils/auth";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const email = getUserEmail();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
      >
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
          {email?.[0]?.toUpperCase()}
        </div>
        <span className="text-sm text-gray-700">{email}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow border p-2 z-50">
          <p className="px-3 py-2 text-xs text-gray-500 truncate">
            {email}
          </p>

          <button
            onClick={() => navigate("/profile")}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
          >
            Profile
          </button>

          <button
            onClick={() => navigate("/progress")}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
          >
            My Progress
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded text-red-500 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
