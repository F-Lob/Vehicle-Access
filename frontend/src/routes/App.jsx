import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
//imports Felipe
import CreateRequest from '../components/CreateRequest';
import UserRequests from '../components/UserRequests';
import RequestList from '../components/RequestList';
//imports Cristopher
import VehiclesPage from '../Pages/VehiclesPage';
import CreateVehicle from '../Pages/CreateVehicle'; 
import DeleteVehiclePage from '../Pages/DeleteVehiclePage';
import UserVehicles from '../Pages/UserVehicles';
import UpdateVehicle from '../Pages/UpdateVehicle'
import AccessControlPage from '../Pages/AccessControlPage';
import ActiveAccessRecordsPage from '../Pages/ActiveAccessRecordsPage';
import AccessHistoryPage from '../Pages/AccessHistoryPage';

import ProtectedRoute from '../components/ProtectedRoute';
import { AuthProvider } from '../context/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/create-request" element={<ProtectedRoute allowedRoles={['user']}><CreateRequest /></ProtectedRoute>} />
          <Route path="/requests" element={<ProtectedRoute allowedRoles={['user']}><UserRequests /></ProtectedRoute>} />
          <Route path="/admin/requests" element={<ProtectedRoute allowedRoles={['admin']}><RequestList /></ProtectedRoute>} />
          <Route path="/access-control" element={<ProtectedRoute allowedRoles={['operator']}><AccessControlPage /></ProtectedRoute>} />
          <Route path="/access-records/active" element={<ProtectedRoute allowedRoles={['operator']}><ActiveAccessRecordsPage /></ProtectedRoute>} />
          <Route path="/access-history" element={<ProtectedRoute allowedRoles={['admin', 'operator', 'viewer']}><AccessHistoryPage /></ProtectedRoute>} />
          {/* rutas Cristopher */}
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/vehicles/create-vehicle" element={<ProtectedRoute allowedRoles={['user']}><CreateVehicle /></ProtectedRoute>} />
          <Route path="/create-vehicle" element={<ProtectedRoute allowedRoles={['user']}><CreateVehicle /></ProtectedRoute>} />
          <Route path="/vehicles/delete-vehicle" element={<ProtectedRoute allowedRoles={['user']}><DeleteVehiclePage /></ProtectedRoute>} />
          <Route path="/vehicles/my-vehicles" element={<ProtectedRoute allowedRoles={['user']}><UserVehicles /></ProtectedRoute>} />
          <Route path="/vehicles/update-vehicle" element={<ProtectedRoute allowedRoles={['user']}><UpdateVehicle /></ProtectedRoute>} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
