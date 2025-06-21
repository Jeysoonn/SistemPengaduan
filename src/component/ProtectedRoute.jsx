import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import LoadingSpinner from './LoadingScreen';

const ProtectedRoute = ({ children, allowedRoles = [], requireAuth = true }) => {
  const { user, isAuthenticated, hasRole, loading } = useUser();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  // If authentication is not required, render children
  if (!requireAuth) {
    return children;
  }

  // If user is not authenticated, redirect to login
  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If no specific roles are required, just check authentication
  if (allowedRoles.length === 0) {
    return children;
  }

  // Check if user has any of the allowed roles
  const hasAllowedRole = allowedRoles.some(role => hasRole(role));
  
  if (!hasAllowedRole) {
    // Redirect based on user role to their appropriate dashboard
    if (user.role === 'Admin') {
      return <Navigate to="/admin" replace />;
    } else if (user.role === 'BSTI') {
      return <Navigate to="/bsti" replace />;
    } else if (user.role === 'Security') {
      return <Navigate to="/security" replace />;
    } else if (user.role === 'BAAK') {
      return <Navigate to="/baak" replace />;
    } else if (user.role === 'Mahasiswa') {
      return <Navigate to="/home" replace />;
    } else {
      // Unknown role, redirect to login
      return <Navigate to="/auth/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute; 