import React, { useContext, useRef } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Profile = ({ user }) => {
  const { logOut } = useContext(AuthContext);
  const drawerRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // Example role (adjust based on your system)
  const role = user?.role || "user"; // "admin" or "user"

  // Close drawer
  const closeDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.checked = false;
    }
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logout Successful",
          text: "Goodbye 👋",
          timer: 2000,
          showConfirmButton: false,
        });
        closeDrawer();
        navigate(from, { replace: true });
      })
      .catch(() => {});
  };

  // Helper for active link
  const getLinkClass = (path) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-orange-100 text-orange-600 font-medium"
        : "hover:bg-gray-100"
    }`;

  return (
    <div className="drawer drawer-end z-50">
      <input
        id="profile-drawer"
        type="checkbox"
        className="drawer-toggle"
        ref={drawerRef}
      />

      {/* Avatar */}
      <div className="drawer-content">
        <label
          htmlFor="profile-drawer"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full ring ring-orange-400 ring-offset-2">
            <img
              src={
                user?.photoURL ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AJM9wkP__z2M-hovSAWcTb_9XJ6smy3NKw&s"
              }
              alt="profile"
            />
          </div>
        </label>
      </div>

      {/* Drawer */}
      <div className="drawer-side">
        <label htmlFor="profile-drawer" className="drawer-overlay"></label>

        {/* Smooth slide panel */}
        <div className="w-80 min-h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
          
          {/* Header */}
          <div className="p-6 border-b flex items-center gap-4">
            <img
              className="w-12 h-12 rounded-full"
              src={
                user?.photoURL ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AJM9wkP__z2M-hovSAWcTb_9XJ6smy3NKw&s"
              }
              alt=""
            />
            <div>
              <h3 className="font-semibold text-gray-800">
                {user?.displayName || "User"}
              </h3>
              <p className="text-sm text-gray-500">
                {user?.email || "No email"}
              </p>
            </div>
          </div>

          {/* Menu */}
          <ul className="p-4 flex-1 space-y-1 text-sm">
            <li>
              <Link
                onClick={closeDrawer}
                to="/update-profile"
                className={getLinkClass("/update-profile")}
              >
                👤 Profile
              </Link>
            </li>

            <li>
              <Link
                onClick={closeDrawer}
                to="/order"
                className={getLinkClass("/order")}
              >
                📦 Orders
              </Link>
            </li>

            <li>
              <Link
                onClick={closeDrawer}
                to="/setting"
                className={getLinkClass("/setting")}
              >
                ⚙️ Settings
              </Link>
            </li>

            <li>
              <Link
                onClick={closeDrawer}
                to="/chat"
                className={getLinkClass("/chat")}
              >
                💬 Support
              </Link>
            </li>

            {/* Role-based menu */}
            {role === "admin" && (
              <li>
                <Link
                  onClick={closeDrawer}
                  to="/dashboard"
                  className={getLinkClass("/dashboard")}
                >
                  📊 Admin Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;