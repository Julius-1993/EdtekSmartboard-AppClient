import React from "react";

const serviceLists = [
  {
    id: 1,
    title: "Service & Support",
    des: "Delight your students with our digital interactive smartboard and make your class interactive today!",
    image: "/services/icon1.png",
  },
  {
    id: 2,
    title: "Fast Delievery",
    des: "We deliver your order promptly to your door step and we deliver nationwide",
    image: "/services/icon2.png",
  },
  {
    id: 3,
    title: "Online Ordering",
    des: "Explore menu & order with easy using our Online Ordering",
    image: "/services/icon3.png",
  },
  {
    id: 4,
    title: "Gift Card",
    des: "Give the gift of exceptional sales splash with EDTEK Gift Card",
    image: "/services/icon4.png",
  },
];
const Services = () => {
  return (
    <div className="section-container my-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* text */}
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle"> Our Story & Services</p>
            <h2 className="title"> Our Interactive Smartboard Journey and Service</h2>
            <p className="my-5 text-[#807e7e]">
              Rooted in passion, we curate unforgettable learning experiences with our Interactive-smartboard and
              offer expectational services, and make your school products standout.
            </p>

            <button className="btn bg-success text-white rounded-full px-8 py-3">
              Explore
            </button>
          </div>
        </div>

        {/* image */}
        <div className="md: w-1/2">
          <div className="grid sm:grid-cols-2 gap-4">
            {serviceLists.map((service) => (
              <div
                key={service.id}
                className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-success 
                cursor-pointer hover:border-indigo-600 transition-all duration-200 hover:border"
              >
                <img src={service.image} alt="" className="mx-auto" />
                <h5 className="pt-3 font-semibold">{service.title}</h5>
                <p className="text-[#90bd95]">{service.des}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
