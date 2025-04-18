// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('notes-token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
