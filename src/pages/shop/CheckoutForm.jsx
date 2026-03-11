import React from "react";
import { PaystackButton } from "react-paystack";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, cart }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  if (!user || !user.email) {
    return <p>Loading payment...</p>;
  }

  const handleSuccess = async (reference) => {

    const verify = await axiosSecure.get(`/verify-paystack/${reference.reference}`);

    if (verify.data.data.status === "success") {

      const paymentInfo = {
        email: user.email,
        transactionId: reference.reference,
        price,
        quantity: cart.length,
        status: "success",
        itemName: cart.map((item) => item.name),
        cartItems: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuItemId)
      };

      const res = await axiosSecure.post("/payments", paymentInfo);
      if (res.data) {
        await axiosSecure.delete(`/carts/clear/${user.email}`);
        alert("Payment Successful!");
        navigate("/order");
      }
    }
  };

  const componentProps = {
    reference: `REF_${Date.now()}`,
    email: user.email,
    amount: Number(price) * 100,
    currency: "NGN",
    publicKey,
    text: "Pay with Paystack",
    onSuccess: handleSuccess,
    onClose: () => alert("Payment closed"),
  };
  
  return (
    <div className="flex flex-col sm:flex-row gap-8">

      {/* Order Summary */}
      <div className="md:w-1/2">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: ₦{price}</p>
        <p>User Name: {user.email}</p>
        <p>Items: {cart.length}</p>
      </div>

      {/* Paystack Payment */}
      <div className="md:w-1/3 card shadow-xl p-6">

        <h4 className="text-lg font-semibold mb-5">
          Pay Securely using Paystack
        </h4>

        <PaystackButton
          {...componentProps}
          className="btn bg-blue-950 w-full text-white"
          disabled={!user?.email}
        />

      </div>
    </div>
  );
};

export default CheckoutForm;