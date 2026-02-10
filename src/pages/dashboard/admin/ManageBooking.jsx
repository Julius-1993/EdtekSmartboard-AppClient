import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { BiBullseye } from "react-icons/bi";
import axios from "axios";
import { FcApprove } from "react-icons/fc";

const ManageBooking = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/payments/orders`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return res.json();
    },
  });

  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };

  const approveOrder = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/payments//approve/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`Order is approved successfully`);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-4">
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
        {/* banner */}
        <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
          <div className=" py-4 flex flex-col items-center justify-center">
            {/* content */}
            <div className=" text-center px-4 space-y-7">
              <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                Manage All Customer's
                <span className="text-success"> Orders</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Table */}
        <div>
          {orders.length > 0 ? (
            <div>
              <div className="">
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead className="bg-success text-white rounded-sm">
                      <tr>
                        <th>S/N</th>
                        <th>Order Date</th>
                        <th>TransactionId</th>
                        <th>User OrganizationName</th>
                        <th>User Email</th>
                        <th>User Address</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{formatDate(item.createdAt)}</td>
                          <td className="font-medium">{item.transactionId}</td>
                          <td>{item.email}</td>
                          <td>{item.itemName}</td>
                          <td>{item.quantity}</td>
                          <td>&#x20A6;{item.price}</td>
                          <td>{item.status}</td>
                          <td>
                            {item.status === "approved" ? (
                              "Approved"
                            ) : (
                              <button
                                onClick={() => approveOrder(item._id)}
                                className="btn btn-xs bg-yellow-600 btn-circle text-white"
                              >
                                <FcApprove />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <hr />
            </div>
          ) : (
            <div className="text-center mt-20">
              <p>No order yet</p>
              <Link to="/menu">
                <button className="btn bg-success text-white mt-3">
                  Back to Menu
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBooking;
