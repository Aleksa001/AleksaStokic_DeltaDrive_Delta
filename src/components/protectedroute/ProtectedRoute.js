import React from 'react';
import {  Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
    const isAuthenticated = () => {
        return sessionStorage.getItem('token') !== null;
      };
  return isAuthenticated() ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;