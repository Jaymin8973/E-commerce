import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/pages/Dashboard';
import Products from './components/pages/Products';
import Orders from './components/pages/Orders';

import Analytics from './components/pages/Analytics';


import Settings from './components/pages/Settings';
import ProductUpload from './components/pages/ProductUpload';
import Marketing from './components/pages/Marketing'; // reused as Promotions
import Returns from './components/pages/Returns';
import Payments from './components/pages/Payments';
import Shipping from './components/pages/Shipping';
import Reviews from './components/pages/Reviews';
import Support from './components/pages/Support';
import ProductDetail from './components/pages/ProductDetail';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/orders" element={<Orders />} />
              
              <Route path="/analytics" element={<Analytics />} />
              
              <Route path="/promotions" element={<Marketing />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/upload" element={<ProductUpload />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/support" element={<Support />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;