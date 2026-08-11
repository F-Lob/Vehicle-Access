import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.roles[0])) {
    if (user.roles?.includes('operator')) {
      return <Navigate to="/access-control" />;
    }
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;
