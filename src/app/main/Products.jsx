import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import DynamicTable from '../components/DynamicTable';

function Products() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
    }

    fetchProducts();
  }, []);

  // Table data
  const columns = ['Name', 'Price', 'Description'];

  const rows = products.map((product) => [
    product.name,
    `$${product.price.toFixed(2)}`,
    product.description,
  ]);

  const title = 'Products';

  // Modal Add Product
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="flex h-90">
      <div className="mt-10 w-full ">
        <div className="flex justify-end pr-5">
          <button onClick={openModal} className="bg-blue-500 text-white py-2 px-4 rounded">
            Add Product
          </button>
        </div>
        <DynamicTable columns={columns} rows={rows} title={title} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="modal-container bg-white w-96 mx-auto rounded shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
            <p>This is a simple modal.</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
