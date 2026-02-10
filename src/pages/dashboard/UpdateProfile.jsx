import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateProfile = () => {
const { updateUserProfile, user } = useContext(AuthContext);
const { register, handleSubmit } = useForm();
const navigate = useNavigate();
const location = useLocation();
const from = location.state?.from?.pathname || "/";

const onSubmit = async (data) => {
Swal.fire({ title: "Updating...", didOpen: () => Swal.showLoading() });
try {
// Use MongoDB user _id for update
const userId = user?.uid || user?.mongoId; // ensure backend ID mapping exists
await updateUserProfile(
userId,
data.name,
data.address,
data.organizationName,
data.image
);

  Swal.fire("Success", "Your profile has been updated!", "success");
  navigate(from, { replace: true });
} catch (error) {
  console.error(error);
  Swal.fire("Error", error.response?.data?.message || error.message, "error");
}

};

return ( <div className="flex items-center justify-center h-screen"> <div className="card w-full max-w-sm shadow-2xl bg-base-100"> <form className="card-body" onSubmit={handleSubmit(onSubmit)}> <h3 className="text-center font-bold">Update Profile</h3>

      <input
        type="text"
        placeholder="Your name"
        {...register("name", { required: true })}
        className="input input-bordered"
      />

      <input
        type="text"
        placeholder="Organization Name"
        {...register("organizationName")}
        className="input input-bordered"
      />

      <input
        type="text"
        placeholder="Address"
        {...register("address")}
        className="input input-bordered"
      />

      <input
        type="file"
        {...register("image")}
        className="file-input w-full mt-2"
      />

      <button type="submit" className="btn bg-blue-500 text-white mt-4">
        Update
      </button>
    </form>
  </div>
</div>

);
}

export default UpdateProfile;
