import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import DynamicTable from '../components/DynamicTable';
import DynamicButton from '../components/common/Button';
import DynamicForm from '../components/DynamicForm';
import Alert from '../components/Alert';

function Products() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({}); 
  const [alert, setAlert] = useState({ show: false, type: '', message: { title: '', body: '' } });

  async function fetchProducts() {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Error al obtener productos:', error);
    } else {
      setProducts(data);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = ['Nombre', 'Precio', 'Descripción'];

  const rows = products.map((product) => [
    product.name,
    `$${product.price.toFixed(2)}`,
    product.description,
  ]);

  const title = 'Productos';

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formInputs = [
    {
      label: 'Nombre del producto',
      type: 'text',
      name: 'productName',
      placeholder: 'Ingrese el nombre del producto',
    },
    {
      label: 'Precio',
      type: 'number',
      name: 'price',
      placeholder: 'Ingrese el precio del producto',
    },
    {
      label: 'Descripción',
      type: 'text',
      name: 'description',
      placeholder: 'Escriba una descripción del producto',
    },
  ];

  const formText = {
    submit: 'Agregar Producto',
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Insert the form data into the 'products' table
      const { data, error } = await supabase.from('products').insert([
        {
          name: formData.productName,
          price: parseFloat(formData.price),
          description: formData.description,
        },
      ]);
  
      if (error) {
        setAlert({ show: true, type: 'error', message: { title: 'Error', body: 'Uh oh, hubo un error inesperado.' } });
      } else {
        closeModal();
        setFormData({});
        fetchProducts();
        setAlert({ show: true, type: 'success', message: { title: 'Nuevo Registro!', body: 'El producto ha sido añadido correctamente.' } });
      }
    } catch (error) {
      setAlert({ show: true, type: 'error', message: { title: 'Error', body: 'Uh oh, hubo un error inesperado.' } });
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
            buttonText='Agregar Producto'
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
            <h2 className="text-xl font-semibold">{formText.title}</h2>
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

export default Products;
