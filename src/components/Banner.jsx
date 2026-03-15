import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col  md:flex-row-reverse justify-between items-center gap-8">
        {/* image */}
        <div className="md:w-1/2">
          <img src="/images/home/banner.png" alt=""  />
          <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap4">
            <div className="flex bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-lg w-64">
              <img
                src="/images/home/Ops.PNG"
                alt=""
                className=" w-20"
              />
              <div className="space-y-1">
              <h5>Operating System</h5>
              <div className="rating rating-sm">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  readOnly
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  checked
                  readOnly
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  readOnly
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  readOnly
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  readOnly
                />
              </div>
              <p className="font-semibold text-red-500">&#8358;98,000</p>
              </div>
            </div>
            <div className="sm:flex hidden bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-lg w-64 ">
              <img
                src="/images/home/keyboard.png"
                alt=""
                className="rounded-2xl w-20"
              />
              <div className="space-y-1">
              <h5>Logitech Keyboard</h5>
              <div className="rating rating-sm">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  checked
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
              </div>
              <p className="font-semibold text-red-500">&#8358;45,000</p>
              </div>
            </div>
          </div>
        </div>
        {/* text */}
        <div className="md:w-1/2 space-y-7 px-4">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Fostering interactive teaching, stimulating learning today with our {" "}
            <span className="text-blue-950">Interactive Board</span>
          </h2>
          <p className="text-xl text-[#4A4A4A] py-2">
            Where all your students learn in a smart way and know what is evolving
          </p>
          <Link to="/menu" className="btn bg-blue-950 px-8 py-3 font-semibold text-white rounded-full">
            Order Now
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default Banner;
