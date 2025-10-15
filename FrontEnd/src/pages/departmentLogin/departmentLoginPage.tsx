// frontend/src/pages/DepartmentLoginPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you'll use React Router for navigation

const DepartmentLoginPage: React.FC = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook for navigation

  // This is a placeholder for the actual login logic.
  // When the backend is ready, this will make an API call.
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // --- Placeholder Login Logic (Will be replaced by API call later) ---
    console.log("Attempting to log in department:", departmentName);
    console.log("With password:", password);

    // Simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Basic client-side validation for demonstration
    if (departmentName && password) {
        // In a real scenario, this would be `const response = await fetch('/api/auth/department/login', ...)`
        // and then we'd store the JWT in localStorage.
        const mockValidPasswords: { [key: string]: string } = {
            "MATS School of Management & Business Studies": "MSMBS123",
            "MATS Law School": "MLS123",
            "MATS School of Engineering & Information Technology": "MSEIT123",
            "MATS School of Education": "MSEd123",
            "MATS School of Information Technology": "MSIT123",
            "MATS School of Library Science": "MSLS123",
            "MATS School of Sciences & Forensic Science": "MSSFS123",
            "MATS School of Arts & Humanities": "MSAH123",
            "MATS School of Pharmacy": "MSPharm123",
            "MATS School of Physical Education & Yoga": "MSPEY123",
            "MATS School of Fashion Designing and Technology": "MSFDT123"
        };

        if (mockValidPasswords[departmentName] === password) {
            // Simulate storing a token and department name in local storage
            localStorage.setItem('departmentUserToken', 'mock-jwt-token-for-' + departmentName);
            localStorage.setItem('departmentName', departmentName);
            console.log('Login successful! Redirecting...');
            navigate('/department-admin'); // Navigate to the department admin dashboard
        } else {
            setError('Invalid department name or password.');
        }

    } else {
      setError('Please select a department and enter a password.');
    }
    // --- End Placeholder Login Logic ---

    setLoading(false);
  };

  // List of department names for the dropdown (You might fetch this from an API in a real app)
  const departmentNames = [
    "MATS School of Management & Business Studies",
    "MATS Law School",
    "MATS School of Engineering & Information Technology",
    "MATS School of Education",
    "MATS School of Information Technology",
    "MATS School of Library Science",
    "MATS School of Sciences & Forensic Science",
    "MATS School of Arts & Humanities",
    "MATS School of Pharmacy",
    "MATS School of Physical Education & Yoga",
    "MATS School of Fashion Designing and Technology"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#142143]">Department Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="departmentName" className="block text-gray-700 text-sm font-bold mb-2">
              Department Name:
            </label>
            <select
              id="departmentName"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-yellow-500"
            >
              <option value="" disabled>Select your department</option>
              {departmentNames.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-yellow-500"
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 rounded-md font-semibold text-white transition duration-300 ease-in-out ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#142143] hover:bg-[#2e406e]'
              } focus:outline-none focus:shadow-outline`}
            >
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentLoginPage;