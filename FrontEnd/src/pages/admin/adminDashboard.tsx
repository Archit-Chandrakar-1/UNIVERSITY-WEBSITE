// src/pages/admin/AdminDashboard.tsx

import React, { useState } from 'react';
import AdminCarousel from '../../components/adminComponents/adminCarousel';
import AdminRegulation from '../../components/adminComponents/adminRegulation';
import AdminQuickAccess from '../../components/adminComponents/adminQuickAccess';
import AdminTestimonials from '../../components/adminComponents/adminTestimonial';

const sidebarItems = [
  { id: 'admin-carousel',      label: 'Main Carousel' },
  { id: 'admin-regulations',   label: 'Regulations & Approvals' },
  { id: 'admin-quick-access',  label: 'Quick Access' },
  { id: 'admin-testimonials',  label: 'Testimonials' },
  
];

const AdminDashboard: React.FC = () => {
  const [selected, setSelected] = useState(sidebarItems[0].id);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for authentication
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check credentials against hardcoded values
    if (username === 'superadmin' && password === 'MATS@mats@2006') {
      setIsAuthenticated(true);
    } else {
      setError('Invalid username or password.');
    }
  };

  if (!isAuthenticated) {
    // Render Login Form if not authenticated
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#142143] mb-8 text-center">Admin Login</h2>
          <form onSubmit={handleLogin}>
            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username:
              </label>
              <input
                type="text"
                id="username"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-[#ffaf00] hover:bg-yellow-600 text-[#142143] font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-200 w-full"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Render Admin Dashboard if authenticated
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-[#142143] text-white flex flex-col pt-8 shadow-lg">
        <div className="px-6 text-2xl font-bold mb-8 text-yellow-500">
          Admin Panel
        </div>
        <nav className="flex-1">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              className={`w-full px-6 py-3 text-left font-semibold hover:bg-[#ffaf00] hover:text-[#142143] transition duration-200 ${
                selected === item.id ? 'bg-[#ffaf00] text-[#142143]' : ''
              }`}
              onClick={() => setSelected(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-6 py-4 mt-auto border-t border-gray-700">
            <button
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                onClick={() => setIsAuthenticated(false)}
            >
                Logout
            </button>
        </div>
      </aside>

      <main className="flex-1 p-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#142143]">Dashboard Overview</h1>
          <input
            type="text"
            placeholder="Search Dashboard"
            className="px-4 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-[#ffaf00]"
          />
        </div>

        <div className="bg-white p-8 rounded shadow-md border border-gray-200">
          {selected === 'admin-carousel' && <AdminCarousel />}
          {selected === 'admin-regulations' && <AdminRegulation />}
          {selected === 'admin-quick-access' && <AdminQuickAccess />}
          {selected === 'admin-testimonials' && <AdminTestimonials />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;