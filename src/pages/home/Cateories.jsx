import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const Categories = () => {
  const categoriesItems = [
    {
      id: 1,
      title: "Ambassador College",
      des: "Over 50 of our boards",
      image: "/category/download.jpg",
    },
    {
      id: 2,
      title: "Nigerian Military School",
      des: "Over 35 of our boards",
      image: "/category/images.jpg",
    },
    {
      id: 3,
      title: "Powerfield",
      des: "Over 12 boards",
      image: "/category/download1.jpg",
    },
    {
      id: 3,
      title: "Powerfield",
      des: "Over 12 boards",
      image: "/category/download1.jpg",
    },
    {
      id: 3,
      title: "Powerfield",
      des: "Over 12 boards",
      image: "/category/download1.jpg",
    },
    {
      id: 4,
      title: "Many More Schools",
      des: "(All over the country)",
      image: "/category/images1.jpg",
    },
  ];

  return (
    <div className="section-container py-16">
      <div className="text-center">
        <p className="subtitle">Customer's relationship</p>
        <h2 className="title">Our Trusted Customers</h2>
      </div>

      <div className="mt-12">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {categoriesItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300">
                <div className="flex w-full mx-auto items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="bg-[#C1F1C6] rounded-full w-28 h-28 object-cover"
                  />
                </div>

                <div className="mt-5 space-y-1">
                  <h5 className="font-semibold">{item.title}</h5>
                  <p className="font-bold text-orange-500">{item.des}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Categories;



// import React from "react";

// const Cateories = () => {
//   const categoriesItems = [
//     {
//       id: 1,
//       title: "Ambassador College",
//       des: "Over 50 of our boards",
//       image: "/category/download.jpg",
//     },
//     {
//       id: 2,
//       title: "Nigerian Military School",
//       des: "Over 35 of our boards",
//       image: "/category/images.jpg",
//     },
//     { 
//       id: 3, 
//       title: "Powerfield", 
//       des: "Over 12 boards", 
//       image: "/category/download1.jpg"
//      },
//     {
//       id: 4,
//       title: "Many More Schools",
//       des: "(All over the country)",
//       image: "/category/images1.jpg",
//     },
//   ];
//   return (
//     <div className="section-container py-16">
//       <div className="text-center">
//         <p className="subtitle">Customer's relationship</p>
//         <h2 className="title"> Our Trusted Customers</h2>
//       </div>
//       {/* Categories */}
//       <div className="flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12">
//         {categoriesItems.map((item, i) => (
//           <div
//             key={i}
//             className="shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 translate-full"
//           >
//             <div className="flex w-full mx-auto items-center justify-center">
//               <img
//                 src={item.image}
//                 alt=""
//                 className="bg-[#C1F1C6] rounded-full w-28 h-28"
//               />
//             </div>
//             <div className="mt-5 space-y-1">
//               <h5>{item.title}</h5>
//               <p className="font-bold text-orange-500">{item.des}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Cateories;
