import React, { useState, useEffect } from 'react';

const Alert = ({ type, message }) => {
  const [isVisible, setIsVisible] = useState(true);

  const alertClasses = {
    success: 'bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900',
    warning: 'bg-yellow-100 border-t-4 border-yellow-500 rounded-b text-yellow-900',
    error: 'bg-red-100 border-t-4 border-red-500 rounded-b text-red-900',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`alert ${alertClasses[type]} px-4 py-3 shadow-md mt-5`} role="alert">
      <div className="flex">
        <div className="py-1">
          {/* Icon can be added here */}
        </div>
        <div>
          <p className="font-bold">{message.title}</p>
          <p className="text-sm">{message.body}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
