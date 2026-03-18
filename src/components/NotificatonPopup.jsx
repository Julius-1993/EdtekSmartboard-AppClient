return (
  <div className="fixed top-6 right-6 z-50">
    <div
      ref={popupRef}
      className={`relative w-80 max-w-sm bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
    >
      {/* Accent bar */}
      <div className="h-1 bg-blue-950"></div>

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