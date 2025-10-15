// frontend/src/services/authDepartmentService.ts

// Placeholder for the API URL - will be used when backend is ready
// const API_URL = 'http://localhost:5555/api/auth/department';

interface LoginResponse {
    _id: string; // User ID from backend
    departmentName: string;
    token: string;
  }
  
  // Placeholder for actual login API call
  export const loginDepartmentUser = async (departmentName: string, password: string): Promise<LoginResponse> => {
    // In a real scenario, this would be an API call
    // const response = await fetch(`${API_URL}/login`, { method: 'POST', body: JSON.stringify({ departmentName, password }), ... });
    // if (!response.ok) throw new Error('Login failed');
    // const data = await response.json();
  
    // Mocking the response for now
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
  
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  
    if (mockValidPasswords[departmentName] === password) {
      const data: LoginResponse = {
        _id: 'mock-user-id-' + departmentName,
        departmentName: departmentName,
        token: 'mock-jwt-token-for-' + departmentName,
      };
      localStorage.setItem('departmentUserToken', data.token);
      localStorage.setItem('departmentName', data.departmentName);
      return data;
    } else {
      throw new Error('Invalid department name or password.');
    }
  };
  
  export const logoutDepartmentUser = () => {
    localStorage.removeItem('departmentUserToken');
    localStorage.removeItem('departmentName');
  };
  
  export const getDepartmentAuthToken = (): string | null => {
    return localStorage.getItem('departmentUserToken');
  };
  
  export const getAuthenticatedDepartmentName = (): string | null => {
    return localStorage.getItem('departmentName');
  };