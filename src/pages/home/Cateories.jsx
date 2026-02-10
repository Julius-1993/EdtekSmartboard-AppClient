import React from "react";

const Cateories = () => {
  const categoriesItems = [
    {
      id: 1,
      title: "Software",
      des: "(14)",
      image: "/category/download.jpg",
    },
    {
      id: 2,
      title: "camera",
      des: "(2K/4K)",
      image: "/category/images.jpg",
    },
    { 
      id: 3, 
      title: "wall bracket", 
      des: "(complete set)", 
      image: "/category/download1.jpg"
     },
    {
      id: 4,
      title: "Browse All",
      des: "(18 Items)",
      image: "/category/images1.jpg",
    },
  ];
  return (
    <div className="section-container py-16">
      <div className="text-center">
        <p className="subtitle"> Customer favourites</p>
        <h2 className="title"> Popular Categories</h2>
      </div>
      {/* Categories */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12">
        {categoriesItems.map((item, i) => (
          <div
            key={i}
            className="shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 translate-full"
          >
            <div className="flex w-full mx-auto items-center justify-center">
              <img
                src={item.image}
                alt=""
                className="bg-[#C1F1C6] rounded-full w-28 h-28"
              />
            </div>
            <div className="mt-5 space-y-1">
              <h5>{item.title}</h5>
              <p className="font-bold text-orange-500">{item.des}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cateories;
