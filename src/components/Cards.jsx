import React, { useContext, useState } from "react";
import { FaHeart } from "../../node_modules/react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from 'sweetalert2'
import useCart from "../hooks/useCart";
import axios from 'axios';

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item;

  const {user} = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(item)
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  // add to cart handler
  const handleAddToCart = (item) => {
    console.log(item);
    if(user && user.email){
        const cartItem = {menuItemId: _id, name, quantity : 1, image, price, email: user.email}

        axios.post('https://edteksmartboard-appserver.onrender.com/carts', cartItem)
        .then((response) => {
          console.log(response);
          if(response){
            refetch(); // refetch cart
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Smart-Board added on the cart.',
                  showConfirmButton: false,
                  timer: 1500
                })
          }
        })
        .catch( (error) => {
          console.log(error.response.data.message);
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500
          })
        });
    }
    else{
        Swal.fire({
            title: 'Please login to complete your order',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Login now!'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/login', {state: {from: location}})
            }
          })
    }
}

  return (
    <div className="card shadow-xl relative mr-5 md:my-5">
      <div
        className={`rating gap-1 absolute right-0 top-0 p-4 heartStar bg-blue-950 z-10 ${
          isHeartFilled ? "text-orange-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <Link >
        <figure>
          <img src={item.image} alt="Shoes" className="hover:scale-105 transition-all duration-200 md:h-72" />
        </figure>
      </Link>
      <div className="card-body">
       <Link ><h2 className="card-title">{item.name}</h2></Link>
        <p>Description of the item</p>
        <h3>{item.product}</h3>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red-500">&#8358; </span> {item.price}
          </h5>
          <button onClick={() => handleAddToCart(item)} className="btn bg-blue-950 text-white">Add to Cart </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
