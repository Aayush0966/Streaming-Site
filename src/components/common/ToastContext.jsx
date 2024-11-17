import React, { createContext, useContext, useState } from 'react';
import AlertMessage from './AlertMessage'; // Adjust import if needed
import Dialog from './Dialog'; // Import your Dialog component

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [dialog, setDialog] = useState({ isOpen: false, title: '', message: '', onConfirm: null, onCancel: null });

  const showToast = (message, type) => {
    setToast({ type, message });
    
    // Automatically close the toast after a specified duration
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const showDialog = (title, message, onConfirm, onCancel) => {
    setDialog({ isOpen: true, title, message, onConfirm, onCancel });
  };

  const closeDialog = () => {
    if (dialog.onCancel) {
      dialog.onCancel(); // Call the onCancel function if provided
    }
    setDialog({ ...dialog, isOpen: false }); // Close the dialog
  };

  return (
    <ToastContext.Provider value={{ showToast, showDialog }}>
      {children}
      {toast && (
        <AlertMessage
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      {dialog.isOpen && (
        <Dialog
          title={dialog.title}
          message={dialog.message}
          onConfirm={() => {
            if (dialog.onConfirm) dialog.onConfirm(); // Call the onConfirm function if provided
            closeDialog(); // Close the dialog
          }}
          onCancel={closeDialog} // Close the dialog through the context
        />
      )}
    </ToastContext.Provider>
  );
};
