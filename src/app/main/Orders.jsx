import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import Alert from '../components/Alert';
import DynamicTable from '../components/DynamicTable';
import DynamicButton from '../components/common/Button';
import AddOrder from './addOrder';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: { title: '', body: '' } });

  const fetchOrders = async () => {
    try {
      let { data, error } = await supabase
        .from('orden_compra')
        .select(`
          clients:cliente_id (first_name, last_name),
          total,
          fecha,
          detalle_orden_compra (
            producto:producto_id (name),
            cantidad
          )
        `);

      if (error) {
        throw error;
      }

      setOrders(data);
    } catch (error) {
      console.error('Error al obtener las órdenes:', error.message);
      setAlert({ show: true, type: 'error', message: { title: 'Error', body: 'Error al obtener las órdenes.' } });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchOrders();
  };

  const showAlert = (type, title, body) => {
    setAlert({ show: true, type, message: { title, body } });
  };

  const columns = ['Cliente', 'Total', 'Fecha', 'Detalle'];
  const rows = orders.map(order => [
    `${order.clients.first_name} ${order.clients.last_name}`,
    `$${order.total.toFixed(2)}`,
    new Date(order.fecha).toLocaleDateString(),
    order.detalle_orden_compra.map(d => `${d.producto.name} (${d.cantidad})`).join(', ')
  ]);

  const title = 'Órdenes';

  return (
    <div className="flex h-90">
      <div className="mt-10 w-full ">
        <div className="px-5 mb-10">
          {alert.show && <Alert type={alert.type} message={alert.message} />}
        </div>
        <div className="flex justify-end pr-5">
          <DynamicButton
            buttonText='Agregar Orden'
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
            className="modal-container w-90 mx-auto h-min rounded shadow-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <AddOrder onOrderSubmitted={closeModal} onShowAlert={showAlert} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
