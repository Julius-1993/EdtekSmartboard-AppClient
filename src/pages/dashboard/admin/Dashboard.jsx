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

const API_BASE_URL = "http://localhost:3000";

export const fetchDashboardData = async () => {
  const token = localStorage.getItem("access-token");
  const response = await axios.get(`${API_BASE_URL}/dashboard-data`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const dashboardData = await fetchDashboardData();
      setData(dashboardData);
    };
    getData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" ">
      <div className="grid grid-cols-4 gap-4 py-8 sm:flex-wrap">
        <div className="bg-fuchsia-600 rounded-lg flex">
        <p className="p-2 text-white font-semibold"> <FaUsers />Total Users: {data.totalUsers}</p>
        </div>
        <div className="bg-success rounded-lg flex">
        <p className="p-2 text-white font-semibold"> <GiProfit /> Total Revenue: &#x20A6;{data.totalRevenue}</p>
        </div>
        <div className="bg-blue-700 rounded-lg flex">
        <p className="p-2 text-white font-semibold"> <BsCartDashFill /> Total Orders: {data.totalOrders}</p>
        </div>
        <div className="bg-yellow-700 rounded-lg flex">
        <p className="p-2 text-white font-semibold"> <BsCartDashFill /> Pending Orders: {data.pendingOrders}</p>
        </div>
      </div>
      <div className="py-4">
        <h2 className="font-bold py-2">Revenue per Month</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.revenuePerMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="py-4">
        <h2 className="font-bold py-2">Revenue per Year</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.revenuePerYear}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="py-4">
        <h2 className="font-bold py-2">Orders per Week</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.ordersPerWeek}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="py-4">
        <h2 className="font-bold py-2">Orders per Month</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.ordersPerMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.ordersPerMonth}
              dataKey="orders"
              nameKey="month"
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
