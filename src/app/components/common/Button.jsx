import React from 'react';

function DynamicButton({ buttonText, onClick, backgroundColor, transColor }) {
  const buttonStyle = {
    background: backgroundColor || 'bg-amber-200', // Default background color
    transition: transColor || 'bg-amber-400', // Default text color
  };

  return (
    <button 
        type='submit' 
        className={`group relative h-11 w-48 overflow-hidden rounded-lg text-md shadow ${buttonStyle.background}`}
        onClick={onClick}
        >
          <div className={`absolute inset-0 w-3 ${buttonStyle.transition} transition-all duration-[250ms] ease-out group-hover:w-full`}></div>
          <span className="relative text-black group-hover:text-white">{buttonText}</span>

      </button>

  );
}

export default DynamicButton;
