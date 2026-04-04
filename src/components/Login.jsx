import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Login = () => {
  const [errorMessage, seterrorMessage] = useState("");
  const { signUpWithGmail, login, resetPassword } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    reset,
    getValues,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((result) => {
        const userInfo = {
          email: data.email,
        };

        axiosPublic.post("/users", userInfo).then(() => {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            timer: 2000,
            showConfirmButton: false,
          });

          document.getElementById("my_modal_5")?.close();
          navigate(from, { replace: true });
        });
      })
      .catch(() => {
        seterrorMessage("Please provide valid email & password!");
      });

    reset();
  };

  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };

        axiosPublic.post("/users", userInfor).then(() => {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            timer: 2000,
            showConfirmButton: false,
          });

          document.getElementById("my_modal_5")?.close();
          navigate("/");
        });
      })
      .catch(console.log);
  };

  const handleForgotPassword = () => {
    const email = getValues("email");

    if (!email) {
      return Swal.fire({
        icon: "warning",
        title: "Enter your email first!",
      });
      
    }

    resetPassword(email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Reset Email Sent",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
        });
      });
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto my-20">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-lg">Please Login!</h3>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered"
          {...register("email", { required: true })}
        />

        {/* Password with Eye */}

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>

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
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-blue-600 mt-1 text-left"
        >
          Forgot password?
        </button>

        {/* Error */}
        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}

        <input type="submit" value="Login" className="btn bg-blue-950 text-white mt-3" />

        <Link to="/" className="btn btn-sm btn-circle absolute right-2 top-2">
          ✕
        </Link>

        <p className="text-center">
          Don’t have an account?
          <Link to="/signup" className="text-red-700 ml-1 underline">
            Signup
          </Link>
        </p>

        {/* Social */}
        <div className="text-center space-x-3 mt-3">
          <button onClick={handleRegister} type="button" className="btn btn-circle">
            <FaGoogle />
          </button>
          <button className="btn btn-circle"><FaFacebookF /></button>
          <button className="btn btn-circle"><FaGithub /></button>
        </div>
      </form>
    </div>
  );
};

export default Login;