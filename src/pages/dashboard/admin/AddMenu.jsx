import React from "react";
import { FaCloudUploadAlt } from "../../../../node_modules/react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'

const AddMenu = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // image hosting key
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  // console.log(image_hosting_key)
  const image_hosting_api = `https://api.imgbb.com/1/upload?key= ${image_hosting_key}`;
  const onSubmit = async (data) => {
    // console.log(data)
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // console.log(hostingImg.data)
    if (hostingImg.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price), 
        product: data.product,
        image: hostingImg.data.data.display_url
      };

      // console.log(menuItem);
      const postMenuItem = axiosSecure.post('/menu', menuItem);
      if(postMenuItem){
        reset()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Item is added successfully!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Upload A New <span className="text-success">Menu Item</span>
      </h2>

      {/* form here */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Product Name <span className="text-red-500">*</span></span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Product Name"
              className="input input-bordered w-full"
             
            />
          </div>

          {/* 2nd row */}
          <div className="flex items-center gap-4">
            {/* categories */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category <span className="text-red-500">*</span></span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
                defaultValue="default"
                
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="OPS">OPS</option>
                <option value="Camera">Camera</option>
                <option value="Stand">Stand</option>
                <option value="65inches Smart Interactive Board">65inches Smart Interactive Board</option>
                <option value="75inches Smart Interactive Board">75inches Smart Interactive Board</option>
                <option value="86inches Smart Interactive Board">86inches Smart Interactive Board</option>
                <option value="Surge">Surge</option>
                <option value="Keyboard">Keyboard</option>
              </select>
            </div>

            {/* prices */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price <span className="text-red-500">*</span></span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Price: e.g 5000"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Details <span className="text-red-500">*</span></span>
            </label>
            <textarea
              {...register("product", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Tell the worlds about your product"
            ></textarea>
          </div>

          {/* 4th row */}
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn bg-success text-white px-6">
            Add Item <FaCloudUploadAlt />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;