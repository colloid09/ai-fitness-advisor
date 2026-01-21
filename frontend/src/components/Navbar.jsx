import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isLoggedIn, logout, getUserEmail } from "../utils/auth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    setUserEmail(getUserEmail());
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
    window.location.reload();
  }

  const navItem = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm transition ${
      isActive
        ? "bg-blue-100 text-blue-700 font-medium"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <header className="sticky top-0 z-50">
      <div className="backdrop-blur-xl bg-white/80 border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-semibold">
              AI
            </div>
            <span className="text-xl font-semibold text-gray-900">
              Fitness Advisor
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-full border">
            <NavLink to="/" className={navItem}>Home</NavLink>
            <NavLink to="/dashboard" className={navItem}>Dashboard</NavLink>
            <NavLink to="/progress" className={navItem}>Progress</NavLink>
            <NavLink to="/fitness" className={navItem}>Plan</NavLink>
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3 relative">
            {!loggedIn ? (
              <>
                <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link to="/register" className="text-sm text-gray-600 hover:text-gray-900">
                  Register
                </Link>
                <Link
                  to="/fitness"
                  className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                    {userEmail ? userEmail[0].toUpperCase() : "U"}
                  </div>
                  <span className="text-sm text-gray-700 truncate max-w-[120px]">
                    {userEmail}
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-14 w-48 bg-white rounded-xl shadow border p-2">
                    <p className="px-3 py-2 text-xs text-gray-500 truncate">
                      {userEmail}
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
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden px-6 pb-4">
            <div className="flex flex-col gap-3 bg-white rounded-2xl border p-4 shadow-sm">
              <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
              <NavLink to="/dashboard" onClick={() => setOpen(false)}>Dashboard</NavLink>
              <NavLink to="/progress" onClick={() => setOpen(false)}>Progress</NavLink>
              <NavLink to="/fitness" onClick={() => setOpen(false)}>Generate Plan</NavLink>

              <hr />

              {!loggedIn ? (
                <>
                  <NavLink to="/login" onClick={() => setOpen(false)}>Login</NavLink>
                  <NavLink to="/register" onClick={() => setOpen(false)}>Register</NavLink>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-500">{userEmail}</p>
                  <button onClick={() => navigate("/profile")}>Profile</button>
                  <button onClick={() => navigate("/progress")}>My Progress</button>
                  <button onClick={handleLogout} className="text-red-500">Logout</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
