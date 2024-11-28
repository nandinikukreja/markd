// frontend/src/components/Modal.jsx

import React from "react";

const Modal = ({ message, onClose, onConfirm, confirmText }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <p className="mb-4">{message}</p>
        {onConfirm ? (
          <button
            onClick={onConfirm}
            className="w-full rounded-full bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            {confirmText}
          </button>
        ) : (
          <button
            onClick={onClose}
            className="w-full rounded-full bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;