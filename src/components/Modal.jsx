import React, { useContext, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset
  } = useForm();

  const { signUPWithGmail, login, resetPassword } = useAuth();
  const [errorMessage, seterrorMessage] = useState("");
  const axiosPublic = useAxiosPublic();
  const modalRef = useRef(null);

  //Redirect to home page or specific page function
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(email, password)
    login(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        const userInfo = {
          name: data.name,
          email: data.email,
        };
        axiosPublic
          .post("/users", userInfo)
          .then((response) => {
            // console.log(response);
            Swal.fire({
              icon: 'success',
              title: 'Account Created',
              text: 'Welcome' + user.displayName,
              timer: 2500,
              showConfirmButton: false
            });
            document.getElementById("my_modal_5").close();
            navigate(from, { replace: true });
          });
        // console.log(user);

        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        seterrorMessage("Please provide valid email & password!");
      });
    reset()

  };

  // google signin
  const handleLogin = () => {
    signUPWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic
          .post("/users", userInfor)
          .then((response) => {
            // console.log(response);
            Swal.fire({
              icon: 'success',
              title: 'Account Created',
              text: 'Welcome' + user.displayName,
              timer: 2500,
              showConfirmButton: false
            });
            document.getElementById("my_modal_5").close()
            navigate(from, { replace: true });
          });
      })
      .catch((error) => console.log(error));
  };

  // Handle password reset
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
    <dialog ref={modalRef} id="my_modal_5" className="modal modal-middle sm:modal-middle shadow-lg">
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"

          >
            <h3 className="font-bold text-lg">Please Login!</h3>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email")}
              />
            </div>
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
            {errorMessage ? (
              <p className="text-red-800 text-xs italic">{errorMessage}</p>
            ) : (
              ""
            )}

            {/* login button */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn bg-blue-950 text-white"
              />
            </div>
            <p className="text-center my-2">
              Do not have an account?{" "}
              <Link to="/signup" className="underline text-blue-700 ml-1">
                Signup Here
              </Link>{" "}
            </p>
            <button
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          {/* Social Login */}
          <div className="text-center space-x-3 my-3">
            <button
              className="btn btn-circle hover:bg-success hover:text-white"
              onClick={handleLogin}
            >
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-blue-700 hover:text-white">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle hover:bg-black hover:text-white">
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
