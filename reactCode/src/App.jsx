import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DashboardApp from './dashboard/dashboard';
import CreateExpress from './excuteProgram/create';
import CardMahasiswa from './excuteProgram/card';
import Login from './dashboard/login';
import Auth from './dashboard/register';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Auth onRegister={handleLogin} />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardApp onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreateExpress />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/card" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CardMahasiswa />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
