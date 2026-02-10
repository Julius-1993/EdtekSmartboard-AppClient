import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

// Single socket instance
const socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:3000", {
  transports: ["websocket"],
});

export default function NotificationPopup() {
  const [notification, setNotification] = useState(null);
  const [visible, setVisible] = useState(false);
  const popupRef = useRef(null);
  const location = useLocation();

  // Only show on home page
  const onHomePage = location.pathname === "/";

  //  Fetch latest notification
  useEffect(() => {
    if (!onHomePage) return;

    const fetchNotification = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"}/notifications/latest`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data?.title) {
          setNotification(data);
          setVisible(true);
        }
      } catch (err) {
        console.error("Error fetching notification:", err.message);
      }
    };
    fetchNotification();
  }, [onHomePage]);

  // Socket listeners
  useEffect(() => {
    if (!onHomePage) return;

    const handleNew = (data) => {
      setNotification(data);
      setVisible(true);
      try {
        new Audio("/sounds/notification.mp3").play().catch(() => {});
      } catch (err){
        console.log( "no sound found", err)
      }
    };

    const handleUpdate = (data) => {
      setNotification(data);
      setVisible(true);
    };

    const handleDelete = () => {
      setNotification(null);
      setVisible(false);
    };

    socket.on("new-notification", handleNew);
    socket.on("update-notification", handleUpdate);
    socket.on("delete-notification", handleDelete);

    return () => {
      socket.off("new-notification", handleNew);
      socket.off("update-notification", handleUpdate);
      socket.off("delete-notification", handleDelete);
    };
  }, [onHomePage]);

  
  //  Auto close after 10s
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setVisible(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!visible || !notification || !onHomePage) return null;

  //  Non-blocking positioned popup
  return (
    <div className="fixed top-6 left-96 z-50 mt-20 ">
      <div
        ref={popupRef}
        className="bg-stone-100 p-6 rounded-xl w-80 max-w-md text-center border border-gray-200 animate-fade-in-up shadow-xl"
      >
        <h2 className="text-lg font-semibold text-orange-600 mb-2">
          {notification.title}
        </h2>
        <p className="text-gray-900 mb-4">{notification.message}</p>
        <button
          onClick={() => setVisible(false)}
          className="bg--600 text-slate-950 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          X
        </button>
      </div>
    </div>
  );
}
