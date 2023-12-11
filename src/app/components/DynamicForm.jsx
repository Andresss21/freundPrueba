import React from 'react';
import DynamicButton from './common/Button';

export default function DynamicForm({ inputs, onSubmit, values, onChange, formText }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  const renderFormControl = (input) => {
    switch (input.type) {
      case 'select':
        return (
          <select
            className='mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200'
            id={input.name}
            value={values[input.name]}
            placeholder={input.placeholder}
            onChange={(e) => handleInputChange(input.name, e.target.value)}
          >
            {input.options.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        );
      case 'text':
      case 'number':
      default:
        return (
          <input
            className='mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200'
            type={input.type}
            id={input.name}
            placeholder={input.placeholder}
            value={values[input.name]}
            onChange={(e) => handleInputChange(input.name, e.target.value)}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className='!z-5 text-left relative flex flex-col rounded-[20px] max-w-[300px] md:max-w-[400px] bg-white bg-clip-border shadow-md shadow-shadow-500 flex flex-col w-full !p-6 3xl:p-![18px] bg-white undefined overflow-auto'>
      {formText.title && (
        <h2 className='text-xl font-bold text-navy-700 text-center mb-4'>{formText.title}</h2>
      )}
      {formText.subtitle && (
        <p className='text-sm text-neutral-900 text-center mb-6'>{formText.subtitle}</p>
      )}
      {inputs.map((input, index) => (
        <div key={index} className='mt-5'>
          <label className='text-sm text-navy-700 text-neutral-900 font-bold' htmlFor={input.name}>{input.label}</label>
          {renderFormControl(input)}
        </div>
      ))}
      <div className='mt-8'>
        <DynamicButton
            buttonText={formText.submit}
            onClick={handleSubmit}
            backgroundColor="bg-amber-200"
            transColor="bg-amber-400"
          />
      </div>
    </form>
  );
}
