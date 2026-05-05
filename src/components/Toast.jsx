import { useEffect } from 'react';

function Toast({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="toast-notification">
      <span className="toast-icon">✅</span>
      <p>Added <strong>{message}</strong> to your cart</p>
    </div>
  );
}

export default Toast;
