import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import DynamicTable from '../components/DynamicTable';
import DynamicButton from '../components/common/Button';
import DynamicForm from '../components/DynamicForm';
import Alert from '../components/Alert';

function Customers() {
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState({ show: false, type: '', message: { title: '', body: '' } });

  async function fetchClients() {
    const { data, error } = await supabase.from('clients').select('*');
    if (error) {
      setAlert({ show: true, type: 'error', message: { title: 'Error', body: 'Error al obtener los productos' } });
    } else {
      setClients(data);
    }
  }

  useEffect(() => {
    fetchClients();
  }, []);

  const columns = ['Nombres', 'Apellidos', 'Dirección'];

  const rows = clients.map((client) => [
    client.first_name,
    client.last_name,
    client.address,
  ]);

  const title = 'Clientes';

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formInputs = [
    {
      label: 'Nombres',
      type: 'text',
      name: 'firstName',
      placeholder: 'Ingrese el nombre del cliente',
    },
    {
      label: 'Apellidos',
      type: 'text',
      name: 'lastName',
      placeholder: 'Ingrese los apellidos del cliente',
    },
    {
      label: 'Dirección',
      type: 'text',
      name: 'address',
      placeholder: 'Ingrese la dirección del cliente',
    },
  ];

  const formText = {
    submit: 'Agregar Cliente',
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.from('clients').insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address: formData.address,
        },
      ]);

      if (error) {
        setAlert({ show: true, type: 'error', message: { title: 'Error', body: 'No se pudo agregar al cliente' } });
      } else {
        closeModal();
        setFormData({});
        fetchClients();
        setAlert({ show: true, type: 'success', message: { title: 'Tenemos un nuevo miembro en la familia!', body: 'Cliente guardado con exito.' } });
      }
    } catch (error) {
      console.error('Error inserting client:', error);
      setAlert({ show: true, type: 'error', message: { title: 'Error', body: 'Uh Oh, algo inesperado paso' } });
    }
  };

  const handleFormInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="flex h-90">
      <div className="mt-10 w-full ">
        <div className="px-5 mb-10">
          {alert.show && <Alert type={alert.type} message={alert.message} />}
        </div>
        <div className="flex justify-end pr-5">
          <DynamicButton
            buttonText= 'Agregar Cliente'
            onClick={openModal}
            backgroundColor="bg-blue-200"
            transColor="bg-blue-400"
          />
        </div>
        <DynamicTable columns={columns} rows={rows} title={title} />
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="modal-container bg-white w-96 mx-auto rounded shadow-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <DynamicForm
              inputs={formInputs}
              onSubmit={handleFormSubmit}
              values={formData}
              onChange={handleFormInputChange}
              formText={formText}
            />
          </div>
        </div>
      )}
    </div>
  );
}
  export default Customers;