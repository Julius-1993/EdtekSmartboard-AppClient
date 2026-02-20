import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "../../components/Cards";
import { FaAngleLeft, FaAngleRight } from "../../../node_modules/react-icons/fa"

const simpleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      Next
    </div>
  );
};

const simplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      Previous
    </div>
  );
};
const SpecialBoards = () => {
  const [product, setProduct] = useState([]);
  const slider = React.useRef(null);

  useEffect(() => {
    fetch("https://edteksmartboard-appserver.onrender.com/menu")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "65inches Smart Interactive Board");
        // console.log(specials)
        setProduct(specials);
      });
  }, []);

  //Carrousel setting
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],

    nextArrow: <simpleNextArrow/>,
    prevArrow: <simplePrevArrow/>
  };

  return (
    <div className="section-container max-w-screen-2xl container mx-auto xl:px-24 px-4  my-20 relative">
      <div className="text-left">
        <p className="subtitle">Special Interactive-Smartboard</p>
        <h2 className="title md:text-wrap md:w-[545px]">
          {" "}
          Standout Interactive Smartboard From Our Menu
        </h2>
      </div>
      {/* Arrow button for move the list */}
      <div className="md:absolute right-3 top-8 mb-10 md:mr-24">
        <button onClick={() => slider?.current?.slickPrev()} className="btn rounded-full p-2 ml-5">
          <FaAngleLeft className="w-8 h-8 p-1"/>
        </button>
        <button onClick={() => slider?.current?.slickNext()} className="btn rounded-full p-2 ml-5 bg-green-400">
        <FaAngleRight className="w-8 h-8 p-1"/>
        </button>
      </div>
      <Slider ref={slider} {...settings} className="overflow-hidden mt-10 space-x-5">
        {product.map((item, i) => (
          <Cards key={i} item={item} />
        ))}
      </Slider>
    </div>
  );
};

export default SpecialBoards;
