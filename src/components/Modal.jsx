import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Modal = () => {
  const { register, handleSubmit, getValues, reset } = useForm();
  const { signUPWithGmail, login, resetPassword } = useAuth();
  const axiosPublic = useAxiosPublic();
  const modalRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Helper function to show SweetAlert above modal
  const showAlert = ({ icon, title, text }) => {
    Swal.fire({
      icon,
      title,
      text,
      target: modalRef.current,
      timer: 2500,
      showConfirmButton: true,
    });
  };

  // Login with email/password
  const onSubmit = (data) => {
    login(data.email, data.password)
      .then(result => {
        const userInfo = { email: data.email };
        axiosPublic.post("/users", userInfo)
          .then(() => {
            showAlert({
              icon: "success",
              title: "Login Successful",
              text: `Welcome ${result.user.displayName || ""}`
            });
            modalRef.current?.close();
            navigate(from, { replace: true });
          });
      })
      .catch(() => {
        setErrorMessage("Please provide valid email & password!");
      });

    reset();
  };

  // Google login
  const handleGoogleLogin = () => {
    signUPWithGmail()
      .then(result => {
        const user = result.user;
        const userInfo = { name: user.displayName, email: user.email };
        axiosPublic.post("/users", userInfo)
          .then(() => {
            showAlert({
              icon: "success",
              title: "Login Successful",
              text: `Welcome ${user.displayName || ""}`
            });
            modalRef.current?.close();
            navigate(from, { replace: true });
          });
      })
      .catch(err => console.log(err));
  };

  // Reset password
  const handleForgotPassword = () => {
    const email = getValues("email");
    if (!email) return showAlert({ icon: "warning", title: "Enter your email first!" });

    resetPassword(email)
      .then(() => {
        showAlert({ icon: "success", title: "Reset Email Sent", text: `Check your email: ${email}` });
      })
      .catch(err => {
        showAlert({ icon: "error", title: "Oops!", text: err.message });
      });
  };

  return (
    <dialog ref={modalRef} id="my_modal_5" className="modal modal-middle sm:modal-middle shadow-lg">
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h3 className="font-bold text-lg">Please Login!</h3>

            {/* Email */}
            <div className="form-control">
              <label className="label"><span className="label-text">Email</span></label>
              <input type="email" placeholder="email" className="input input-bordered" {...register("email")} />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label"><span className="label-text">Password</span></label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full pr-12"
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-600"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <button type="button" onClick={handleForgotPassword} className="text-sm text-blue-600 mt-1 text-left">
              Forgot password?
            </button>

            {/* Error */}
            {errorMessage && <p className="text-red-800 text-xs italic">{errorMessage}</p>}

            {/* Login Button */}
            <div className="form-control mt-6">
              <input type="submit" value="Login" className="btn bg-blue-950 text-white" />
            </div>

            {/* Signup Link */}
            <p className="text-center my-2">
              Do not have an account? <Link to="/signup" className="underline text-blue-700 ml-1">Signup Here</Link>
            </p>

            {/* Close Button */}
            <button type="button" onClick={() => modalRef.current?.close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* Social Login */}
          <div className="text-center space-x-3 my-3">
            <button className="btn btn-circle hover:bg-success hover:text-white" onClick={handleGoogleLogin}><FaGoogle /></button>
            <button className="btn btn-circle hover:bg-blue-700 hover:text-white"><FaFacebookF /></button>
            <button className="btn btn-circle hover:bg-black hover:text-white"><FaGithub /></button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;