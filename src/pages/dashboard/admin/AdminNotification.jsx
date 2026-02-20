import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'

export default function AdminNotification() {
  const BACKEND = import.meta.env.VITE_API_URL || "https://edteksmartboard-appserver.onrender.com";

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);

  // Fetch all notifications
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${BACKEND}/notifications/latest`);
      const data = await res.json();
      if (data) setNotifications([data]);
    };
    fetchData();
  }, []);

  // Create new announcement
  const createAnnouncement = async () => {
    const res = await fetch(`${BACKEND}/notifications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, message }),
    });
    const data = await res.json();
    setNotifications([data]);
    if(data){
            reset()
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Announcement Created!",
              showConfirmButton: false,
              timer: 1500
            });
          }
    // alert("Announcement Created!");
  };

  // Update
  const updateAnnouncement = async (id) => {
    const res = await fetch(`${BACKEND}/notifications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, message }),
    });
    const data = await res.json();
    setNotifications([data]);
    alert("Announcement Updated!");
  };

  // Delete
  const deleteAnnouncement = async (id) => {
    await fetch(`${BACKEND}/notifications/${id}`, {
      method: "DELETE",
    });

    setNotifications([]);
    alert("Announcement Deleted!");
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Admin Announcements</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) => setTitle(e.target.value)}
          
        />

        <textarea
          placeholder="Message"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <button
          onClick={createAnnouncement}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Create Announcement
        </button>
      </div>

      {notifications.map((item) => (
        <div key={item._id} className="border p-4 rounded shadow mb-4">
          <h2 className="font-semibold text-lg">{item.title}</h2>
          <p>{item.message}</p>

          <div className="mt-4 flex gap-3">
            <button
              className="bg-blue-600 px-4 py-2 text-white rounded-lg"
              onClick={() => updateAnnouncement(item._id)}
            >
              Update
            </button>
            <button
              className="bg-red-600 px-4 py-2 text-white rounded-lg"
              onClick={() => deleteAnnouncement(item._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
