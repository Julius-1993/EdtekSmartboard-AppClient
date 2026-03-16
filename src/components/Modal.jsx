import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "../../node_modules/react-icons/fa";
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
  } = useForm();

  const { signUPWithGmail, login } = useAuth();
  const [errorMessage, seterrorMessage] = useState("");
  const axiosPublic = useAxiosPublic();

  //Redirect to home page or specific page function
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

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

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle shadow-lg">
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
            method="dialog"
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
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password")}
              />
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            {/* Error test */}
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
