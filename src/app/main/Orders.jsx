import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import DynamicForm from '../components/DynamicForm';
import Alert from '../components/Alert';
import DynamicTable from '../components/DynamicTable';
import DynamicButton from '../components/common/Button';
import AddOrder from './addOrder';

function Orders() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
 
  return (
    <div className="flex h-90">
      <div className="mt-10 w-full ">
        <div className="px-5 mb-10">
          {alert.show && <Alert type={alert.type} message={alert.message} />}
        </div>
        <div className="flex justify-end pr-5">
          <DynamicButton
            buttonText= 'Agregar Orden'
            onClick={openModal}
            backgroundColor="bg-blue-200"
            transColor="bg-blue-400"
          />
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="modal-container w-90 mx-auto rounded shadow-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <AddOrder />
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
