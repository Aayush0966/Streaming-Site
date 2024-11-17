import React, { useEffect } from 'react';

function AlertMessage({ type, message, onClose }) {
  // Determine styles based on alert type
  const style =
    type === "success"
      ? "bg-green-100 dark:bg-green-900 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100"
      : type === "info" // Add this condition for info
      ? "bg-blue-100 dark:bg-blue-900 border-blue-500 dark:border-blue-700 text-blue-900 dark:text-blue-100"
      : "bg-red-100 dark:bg-red-900 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100";

  // Determine icon and message text based on alert type
  const icon =
    type === "success"
      ? (
        <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 flex-shrink-0 mr-2 text-green-600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
      )
      : type === "info" // Add this condition for info
      ? (
        <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 flex-shrink-0 mr-2 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
      )
      : (
        <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 flex-shrink-0 mr-2 text-red-600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
      );

  return (
    <div
      role="alert"
      className={`fixed top-4 z-10 right-4 w-80 border-l-4 rounded-lg flex items-center p-4 transition-transform duration-300 ease-in-out shadow-lg ${style}`}
      style={{ animation: 'slideIn 0.5s, slideOut 0.5s 2.5s forwards' }} // Adjusted animation styles
    >
      {icon}
      <p className="text-sm font-semibold">
        {type.charAt(0).toUpperCase() + type.slice(1)} - {message} {/* Display the type dynamically */}
      </p>
      <button onClick={onClose} className="ml-auto text-gray-600 hover:text-gray-900">
        &times;
      </button>
    </div>
  );
}

export default AlertMessage;
