import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaUsers } from "../../../../node_modules/react-icons/fa";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  // console.log(users);
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Admin Role Assigned',
        text: `${user.name} is now admin`,
        timer: 2500,
        showConfirmButton: false
      });
      refetch();
    });
  };

  const handleDeleteUser = user => {
    axiosSecure.delete(`/users/${user._id}`).then(res => {
      Swal.fire({
        icon: 'success',
        title: 'User Deleted',
        text: `${user.name} is removed from database`,
        timer: 2500,
        showConfirmButton: false
      });
      refetch();
    })
  }
  return (
    <div>
      <div className="flex items-center justify-between my-4 mx-4">
        <h5>All Users</h5>
        <h5>Total Users: {users.length}</h5>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra md:w-[870px]">
          {/* head */}
          <thead className="bg-green-700 text-white font-semibold">
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-xs bg-blue-950 btn-circle text-white"
                    >
                      <FaUsers />
                    </button>
                  )}
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(user)} className="btn btn-xs bg-red-600 text-white">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
