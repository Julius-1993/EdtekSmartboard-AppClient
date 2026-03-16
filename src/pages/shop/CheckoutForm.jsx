import React from "react";
import { PaystackButton } from "react-paystack";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = ({ price, cart }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  // calculate total quantity correctly
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!user || !user.email) {
    return <p>Loading payment...</p>;
  }

  const handleSuccess = async (reference) => {
    try {

      // verify payment from backend
      const verify = await axiosSecure.get(`/verify-paystack/${reference.reference}`);

      if (verify?.data?.data?.status === "success") {

        const paymentInfo = {
          email: user.email,
          transactionId: reference.reference,
          price,
          quantity: totalItems,
          status: "success",
          items: cart.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            cartId: item._id,
            menuItemId: item.menuItemId
          }))
        };

        const res = await axiosSecure.post("/payments", paymentInfo);

        if (res?.data) {

          // clear cart
          await axiosSecure.delete(`/carts/clear/${user.email}`);

          Swal.fire({
            icon: "success",
            title: "Payment Successful",
            text: "Transaction completed successfully!",
            timer: 2500,
            showConfirmButton: false
          });

          navigate("/order");
        }

      } else {

        Swal.fire({
          icon: "error",
          title: "Payment Verification Failed",
          text: "We couldn't verify your payment. Please contact support."
        });

      }

    } catch (error) {

      console.error("Payment verification error:", error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Payment could not be verified."
      });

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
    onClose: () =>
      Swal.fire({
        title: "Cancel Payment?",
        text: "You are about to cancel this payment.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel it"
      })
  };

  return (
    <div className="flex flex-col sm:flex-row gap-8">

      {/* Order Summary */}
      <div className="md:w-1/2">
        <h4 className="text-lg font-semibold">Order Summary</h4>

        <p>Total Price: ₦{price}</p>

        <p>User Email: {user.email}</p>

        <p>Total Items: {totalItems}</p>

        <p>Products: {cart.length}</p>
      </div>

      {/* Paystack Payment */}
      <div className="md:w-1/3 card shadow-xl p-6">

        <h4 className="text-lg font-semibold mb-5">
          Pay Securely with Paystack
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