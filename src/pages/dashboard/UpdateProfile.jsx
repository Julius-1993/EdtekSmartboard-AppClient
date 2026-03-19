import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateProfile = () => {
  const { updateUserProfile, user } = useContext(AuthContext);
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [previewImage, setPreviewImage] = useState("");

  // Pre-fill form with existing user data
  useEffect(() => {
    if (user) {
      setValue("name", user.displayName || "");
      setValue("organizationName", user.organizationName || "");
      setValue("address", user.address || "");
      setPreviewImage(user.photoURL || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    Swal.fire({ title: "Updating...", didOpen: () => Swal.showLoading() });

    try {
      const userId = user?.uid || user?.mongoId; // backend mapping
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

  // Preview image before upload
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-24">
      <div className="card w-full max-w-md shadow-xl bg-white rounded-xl overflow-hidden">
        <div className="bg-blue-950 text-white text-center py-4">
          <h2 className="text-2xl font-semibold">Update Profile</h2>
        </div>

        <form className="p-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-950"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-2 border-gray-300">
                No Image
              </div>
            )}
          </div>

          <input
            type="file"
            {...register("image")}
            onChange={handleImagePreview}
            className="file-input file-input-bordered w-full mt-2"
          />

          <input
            type="text"
            placeholder="Your Name"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />

          <input
            type="text"
            placeholder="Organization Name"
            {...register("organizationName")}
            className="input input-bordered w-full"
          />

          <input
            type="text"
            placeholder="Address"
            {...register("address")}
            className="input input-bordered w-full"
          />

          <button
            type="submit"
            className="btn w-full bg-blue-900 hover:bg-blue-950 text-white font-semibold mt-2"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;