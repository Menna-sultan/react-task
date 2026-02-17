import React, { useEffect } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-2 right-6 flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl z-[100] animate-bounce-in
        ${type === 'success'
          ? 'bg-[#1C1C1C] text-white border-l-4 '
          : 'bg-red-50 text-red-800 border-l-4 border-red-500'
        }
      `}
    >
      {type === 'success' ? (
        <CheckCircle2 className="w-5 h-5 text-green-500" />
      ) : (
        <XCircle className="w-5 h-5 text-red-500" />
      )}
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default Toast;
