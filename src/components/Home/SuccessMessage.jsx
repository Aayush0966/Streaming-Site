import React from 'react';

export default function StatusMessage({ type, message }) {
  const isSuccess = type === 'success';

  return (
    <div
      className={`flex items-center p-4 mb-4 rounded-lg shadow-md ${
        isSuccess ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
      }`}
      role="alert"
      aria-live="assertive" // This helps screen readers
    >
      <svg
        className="w-5 h-5 mr-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={
            isSuccess
              ? 'M5 13l4 4L19 7' // Checkmark icon for success
              : 'M6 18L18 6M6 6l12 12' // Cross icon for failure
          }
        />
      </svg>
      <span className="font-medium">
       
      </span>
      <span>{message}</span>
    </div>
  );
}
