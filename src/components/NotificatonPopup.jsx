import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

// Single socket instance
const socket = io(import.meta.env.VITE_API_URL || "https://edteksmartboard-appserver.onrender.com", {
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
          `${import.meta.env.VITE_API_URL || "https://edteksmartboard-appserver.onrender.com"}/notifications/latest`
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
  <div className="fixed top-6 right-6 z-50">
    <div
      ref={popupRef}
      className={`relative w-80 max-w-sm bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
    >
      {/* Accent bar */}
      <div className="h-1 bg-orange-500"></div>

      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start">
          <h2 className="text-base font-semibold text-gray-800">
            {notification.title}
          </h2>

          <button
            onClick={() => setVisible(false)}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        </div>

        {/* Message */}
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          {notification.message}
        </p>

        {/* Footer (optional CTA) */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setVisible(false)}
            className="text-sm font-medium text-orange-600 hover:text-orange-700 transition"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  </div>
);
}
