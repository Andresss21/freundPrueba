import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';

import Products from './app/main/Products';
import Customers from './app/main/Customers';
import Orders from './app/main/Orders';
import Navbar from './app/components/Navbar';

export default function MainPage() {
  return (
    <Router>
      <div>
        <header>
          <Navbar />
        </header>

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}
