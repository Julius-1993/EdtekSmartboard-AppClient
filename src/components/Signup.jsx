import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Signup = () => {
  const { createUser, signUPWithGmail, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password");

  const getStrength = (pwd) => {
    if (!pwd) return "";
    if (pwd.length < 6) return "Weak";
    if (/(?=.*[A-Z])(?=.*\d)/.test(pwd)) return "Strong";
    return "Medium";
  };

  const strength = getStrength(password);

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        // Signed up
        const user = result.user;
        updateUserProfile(result.user.uid, data).then(() => {
          const userInfo = {
            name: result.user.displayName,
            email: result.user.email,
            firebaseUID: result.user.uid,
          };
          axiosPublic
            .post("/users", userInfo)
            .then((response) => {
              Swal.fire({
                icon: 'success',
                title: 'Account Created',
                text: 'Your account has been created successfully!',
                timer: 2500,
                showConfirmButton: false
              });
              document.getElementById("my_modal_5").close();
              navigate(from, { replace: true });
            });
        });
      })
      .catch((error) => {
        console.log(error.code, error.message);

        if (error.code === "auth/email-already-in-use") {
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Your email is already registered!',
            timer: 2500,
            showConfirmButton: false
          });
        } else if (error.code === "auth/weak-password") {
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Password should be at least 6 characters.',
            timer: 2500,
            showConfirmButton: false
          });
        } else {
          alert(error.message);
        }
        // ..
      });
  };

  const handleSignup = () => {
    signUPWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          firebaseUID: result?.user?.uid,
        };
        axiosPublic.post("/users", userInfor).then((response) => {
          Swal.fire({
            icon: 'success',
            title: 'Account Created',
            text: 'Welcome' + user.displayName,
            timer: 2500,
            showConfirmButton: false
          });
          document.getElementById("my_modal_5").close();
          navigate("/");
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action flex flex-col justify-center mt-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg text-center">Register Here!</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered"
              {...register("name", {required: true})}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email", {required: true})}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            {/* Password with Eye */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered w-full pr-10"
            {...register("password", { required: true })}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-4 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Strength Indicator */}
        {password && (
          <p
            className={`text-sm ${
              strength === "Weak"
                ? "text-red-500"
                : strength === "Medium"
                ? "text-yellow-500"
                : "text-green-600"
            }`}
          >
            Strength: {strength}
          </p>
        )}
          </div>
          {/* Error test */}

          {/* login button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Signup"
              className="btn bg-blue-950 text-white"
            />
          </div>
          <p className="text-center my-2">
            Already have an account?{" "}
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="underline text-red-700 ml-1"
            >
              Login
            </button>{" "}
          </p>
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 my-10"
          >
            ✕
          </Link>
        </form>
        {/* Social Login */}
        <div className="text-center space-x-3 my-3">
          <button
            className="btn btn-circle hover:bg-success hover:text-white"
            onClick={handleSignup}
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
      <Modal />
    </div>
  );
};

export default Signup;