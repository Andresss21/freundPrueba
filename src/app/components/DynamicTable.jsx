import React from 'react';

export default function DynamicTable({ columns, rows, title, selectable, onProductSelect }) {
  const handleSelectChange = (rowIndex, isSelected) => {
    if (onProductSelect) {
      onProductSelect(rowIndex, isSelected);
    }
  };

  return (
    <section className="flex flex-col justify-center antialiased text-gray-600 min-h-90 p-4">
      <div className="h-full">
        <div className="w-full max-w-full mx-auto bg-white shadow-lg rounded-[20px] border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">{title}</h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    {selectable && <th className="p-2 whitespace-nowrap">Select</th>}
                    {columns.map((column, index) => (
                      <th key={index} className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">{column}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {selectable && (
                        <td className="p-2 whitespace-nowrap">
                          <input 
                            type="checkbox" 
                            onChange={(e) => handleSelectChange(rowIndex, e.target.checked)} 
                          />
                        </td>
                      )}
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="p-2 whitespace-nowrap">
                          <div className="font-medium text-gray-800 text-left">{cell}</div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
