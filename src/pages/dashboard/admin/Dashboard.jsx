import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import { FaUsers } from "react-icons/fa6";
import { GiProfit } from "react-icons/gi";
import { BsCartDashFill } from "react-icons/bs";
import { MdPendingActions } from "react-icons/md";

const API_BASE_URL = "https://edteksmartboard-appserver.onrender.com";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access-token");

      const res = await axios.get(`${API_BASE_URL}/dashboard-data`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setData(res.data);
    };

    fetchData();
  }, []);

  if (!data) return <div className="p-10">Loading dashboard...</div>;

  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">

      {/* ===== STATISTICS ===== */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
          <FaUsers className="text-4xl text-purple-600" />
          <div>
            <p className="text-gray-500">Users</p>
            <h2 className="text-2xl font-bold">{data.totalUsers}</h2>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
          <GiProfit className="text-4xl text-green-600" />
          <div>
            <p className="text-gray-500">Revenue</p>
            <h2 className="text-2xl font-bold">₦{data.totalRevenue}</h2>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
          <BsCartDashFill className="text-4xl text-blue-600" />
          <div>
            <p className="text-gray-500">Orders</p>
            <h2 className="text-2xl font-bold">{data.totalOrders}</h2>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
          <MdPendingActions className="text-4xl text-yellow-500" />
          <div>
            <p className="text-gray-500">Pending</p>
            <h2 className="text-2xl font-bold">{data.pendingOrders}</h2>
          </div>
        </div>

      </div>

      {/* ===== REVENUE + ORDERS CHART ===== */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Revenue Per Month</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.revenuePerMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Orders Per Month</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.ordersPerMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#10b981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ===== PIE CHART ===== */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-lg font-semibold mb-4">
          Orders Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.ordersPerMonth}
              dataKey="orders"
              nameKey="month"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#3b82f6"
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

      </div>

      {/* ===== RECENT ORDERS TABLE ===== */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-lg font-semibold mb-4">
          Recent Orders
        </h2>

        <div className="overflow-x-auto">

          <table className="table w-full">

            <thead className="bg-gray-100">
              <tr>
                <th>Email</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {data.recentOrders?.map((order, index) => (
                <tr key={index} className="hover">

                  <td>{order.email}</td>

                  <td>₦{order.price}</td>

                  <td>
                    <span className="badge badge-success">
                      {order.status}
                    </span>
                  </td>

                  <td>
                    {new Date(order.date).toLocaleDateString()}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* ===== TOP PRODUCTS ===== */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-lg font-semibold mb-4">
          Top Products
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          {data.topProducts?.map((product, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex flex-col items-center text-center"
            >

              <img
                src={product.image}
                alt={product.name}
                className="h-20 object-cover mb-2"
              />

              <h3 className="font-semibold">{product.name}</h3>

              <p className="text-gray-500">
                Sold: {product.totalSold}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Tooltip,
//   Legend,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
// } from "recharts";
// import { FaUsers } from "../../../../node_modules/react-icons/fa6";
// import { GiProfit } from "../../../../node_modules/react-icons/gi";
// import { BsCartDashFill } from "../../../../node_modules/react-icons/bs";

// const API_BASE_URL = "https://edteksmartboard-appserver.onrender.com";

// export const fetchDashboardData = async () => {
//   const token = localStorage.getItem("access-token");
//   const response = await axios.get(`${API_BASE_URL}/dashboard-data`, {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };

// const Dashboard = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const getData = async () => {
//       const dashboardData = await fetchDashboardData();
//       setData(dashboardData);
//     };
//     getData();
//   }, []);

//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className=" ">
//       <div className="grid grid-cols-4 gap-4 py-8 sm:flex-wrap">
//         <div className="bg-fuchsia-600 rounded-lg flex">
//         <p className="p-2 text-white font-semibold"> <FaUsers />Total Users: {data.totalUsers}</p>
//         </div>
//         <div className="bg-success rounded-lg flex">
//         <p className="p-2 text-white font-semibold"> <GiProfit /> Total Revenue: &#x20A6;{data.totalRevenue}</p>
//         </div>
//         <div className="bg-blue-700 rounded-lg flex">
//         <p className="p-2 text-white font-semibold"> <BsCartDashFill /> Total Orders: {data.totalOrders}</p>
//         </div>
//         <div className="bg-yellow-700 rounded-lg flex">
//         <p className="p-2 text-white font-semibold"> <BsCartDashFill /> Pending Orders: {data.pendingOrders}</p>
//         </div>
//       </div>
//       <div className="py-4">
//         <h2 className="font-bold py-2">Revenue per Month</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={data.revenuePerMonth}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//       <div className="py-4">
//         <h2 className="font-bold py-2">Revenue per Year</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={data.revenuePerYear}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="year" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//       <div className="py-4">
//         <h2 className="font-bold py-2">Orders per Week</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={data.ordersPerWeek}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="week" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="orders" stroke="#8884d8" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//       <div className="py-4">
//         <h2 className="font-bold py-2">Orders per Month</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={data.ordersPerMonth}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
//           </LineChart>
//         </ResponsiveContainer>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={data.ordersPerMonth}
//               dataKey="orders"
//               nameKey="month"
//               cx="50%"
//               cy="50%"
//               outerRadius={60}
//               fill="#8884d8"
//             />
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
