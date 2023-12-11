import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import DynamicForm from '../components/DynamicForm';
import DynamicTable from '../components/DynamicTable';

function AddOrder({ onOrderSubmitted, onShowAlert }) {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedClient, setSelectedClient] = useState();
  const [selectedProducts, setSelectedProducts] = useState({});
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    fetchClients();
    fetchProducts();
  }, []);

  async function fetchClients() {
    const { data, error } = await supabase.from('clients').select('*');
    if (error) {
      onShowAlert('error', 'Error', 'Error al obtener los clientes.');
    } else {
      setClients(data);
    }
  }

  async function fetchProducts() {
    const { data, error } = await supabase.from('products').select('id, name, price');
    if (error) {
      onShowAlert('error', 'Error', 'Error al obtener los productos.');
    } else {
      setProducts(data);
    }
  }

  const handleProductToggle = (index, isSelected) => {
    const productId = products[index].id;
    if (isSelected) {
      setSelectedProducts({ ...selectedProducts, [productId]: 1 });
    } else {
      const updatedSelectedProducts = { ...selectedProducts };
      delete updatedSelectedProducts[productId];
      setSelectedProducts(updatedSelectedProducts);
    }
  };

  const updateOrderTotal = () => {
    let total = 0;
    Object.keys(selectedProducts).forEach(productId => {
      const product = products.find(product => product.id === productId);
      total += (product ? product.price * selectedProducts[productId] : 0);
    });
    setOrderTotal(total);
  };

  const handleSubmitOrder = async () => {
    try {
      const orderInsertResponse = await supabase
        .from('orden_compra')
        .insert([
          { cliente_id: selectedClient, total: orderTotal }
        ])
        .select('*');
  
      if (orderInsertResponse.error) {
        throw orderInsertResponse.error;
      }

      const orderId = orderInsertResponse.data[0].id;
  
      const orderDetails = Object.keys(selectedProducts).map(productId => {
        const product = products.find(p => p.id === productId);
        return {
          orden_compra_id: orderId,
          producto_id: productId,
          cantidad: selectedProducts[productId],
          precio: product.price
        };
      });

      const detailsInsertResponse = await supabase
        .from('detalle_orden_compra')
        .insert(orderDetails);
  
      if (detailsInsertResponse.error) {
        throw detailsInsertResponse.error;
      }
  
      onShowAlert('success', 'Orden Procesada', 'La orden se ha procesado correctamente.');
      onOrderSubmitted();
   
    } catch (error) {
      console.error('Error al procesar la orden:', error);
      onShowAlert('error', 'Error', 'Hubo un problema al procesar la orden.');
    }
  };

  const formInputs = [
    {
      label: 'Cliente',
      type: 'select',
      name: 'selectedClient',
      options: [
        { label: 'Seleccionar un cliente', value: '' },
        ...clients.map(client => ({
          label: `${client.first_name} ${client.last_name}`,
          value: client.id
        }))
      ]
    },
    ...Object.keys(selectedProducts).map(productId => {
      const product = products.find(p => p.id === productId);
      return {
        label: product.name,
        type: 'number',
        name: `product_${product.id}`,
        placeholder: '1'
      };
    })
  ];

  const handleFormInputChange = (field, value) => {
    if (field === 'selectedClient') {
      setSelectedClient(value);
    } else if (field.startsWith('product_')) {
      const productId = field.split('_')[1];
      setSelectedProducts({ ...selectedProducts, [productId]: parseInt(value) || 0 });
    }
  };

  useEffect(() => {
    updateOrderTotal();
  }, [selectedProducts]);

  const columns = ['Nombre', 'Precio'];
  const rows = products.map(product => [
    product.name,
    `$${product.price.toFixed(2)}`
  ]);

  const title = 'Productos'

  return (
    <div className="flex items-center justify-center overflow-auto">
      <div className="grid grid-cols-2  w-full max-w-screen-xl">
      <div className="flex flex-col items-center justify-center ">
          <DynamicTable 
            columns={columns} 
            rows={rows} 
            title={title}
            selectable={true}
            onProductSelect={handleProductToggle}
          />
        </div>
        <div className="flex flex-col items-center justify-center ">
          <DynamicForm
            inputs={formInputs}
            onSubmit={handleSubmitOrder}
            values={{ selectedClient, ...selectedProducts }}
            onChange={handleFormInputChange}
            formText={{ submit: 'Agregar' }}
          />
          <div className="mt-4 p-2 text-lg font-semibold text-white">
            Total: ${orderTotal.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddOrder;
