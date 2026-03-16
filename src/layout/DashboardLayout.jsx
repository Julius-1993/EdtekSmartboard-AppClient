import React, { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdDashboardCustomize, MdSpaceDashboard } from "../../node_modules/react-icons/md";
import { FaLocationArrow, FaUsers } from "../../node_modules/react-icons/fa6";
import { FaCartShopping } from "../../node_modules/react-icons/fa6";
import { IoMdLogOut } from "../../node_modules/react-icons/io";
import {
  FaEdit,
  FaHome,
  FaPlusCircle,
  FaQuestionCircle,
  FaBullhorn,
  FaUserAlt,
} from "../../node_modules/react-icons/fa";
import logo from "/logo.png";
import Login from "../components/Login";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <FaHome />
        Home
      </Link>
    </li>
    <li className="mt-3">
      <Link to="/menu">
        <FaCartShopping />
        Menu
      </Link>
    </li>
    <li className="mt-3">
      <Link to="/order">
        <FaLocationArrow />
        Orders Tracking
      </Link>
    </li>
    <li className="mt-3">
      <Link to="/chat">
        <FaQuestionCircle />
        Customer Supports
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const { loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  const { logOut } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Logout Successful',
          text: 'You have been logged out successfully!',
          timer: 2500,
          showConfirmButton: false
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div>
      {isAdmin ? (
        <div className="drawer sm:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
            {/* Page content here */}
            <div className="flex items-center justify-between mx-4">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden"
              >
                <MdSpaceDashboard />
              </label>
              <button
                onClick={handleLogout}
                className="btn rounded-full px-6 bg-red-700 flext items-center gap-2 text-white sm:hidden"
              >
                <FaUserAlt />
                LogOut
              </button>
            </div>
            <div className="mt-5 sm:mt-2 mx-4">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <Link to="/dashboard" className="flext justify-start mb-3">
                  <img src={logo} alt="" className="h-10 w-30" />
                  <span class="badge badge-primary">Admin</span>
                </Link>
              </li>
              <hr />
              <li className="mt-3">
                <Link to="/dashboard">
                  <MdDashboardCustomize />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-booking">
                  <FaCartShopping />
                  Manage Booking
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-menu">
                  <FaPlusCircle />
                  Add Menu
                </Link>
              </li>
              <li>
                <Link to="/dashboard/notification">
                  <FaBullhorn />
                  Add Notification
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-items">
                  <FaEdit />
                  Manage Items
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/dashboard/users">
                  <FaUsers />
                  All Users
                </Link>
              </li>

              <hr />

              {/* Shared nav Link */}
              {sharedLinks}
              <li className="mt-3">
                <Link onClick={handleLogout} className="text-red-900 font-semibold">
                  <IoMdLogOut />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default DashboardLayout;
