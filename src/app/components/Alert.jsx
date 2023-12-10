import React from 'react';

const Alert = ({ type, message }) => {
  // Mapea el tipo de alerta a las clases CSS correspondientes
  const alertClasses = {
    success: 'bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900',
    warning: 'bg-yellow-100 border-t-4 border-yellow-500 rounded-b text-yellow-900',
    error: 'bg-red-100 border-t-4 border-red-500 rounded-b text-red-900',
  };

  return (
    <div className={`alert ${alertClasses[type]} px-4 py-3 shadow-md mt-5`} role="alert">
      <div className="flex">
        <div className="py-1">
          {/* Puedes agregar un ícono aquí */}
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
