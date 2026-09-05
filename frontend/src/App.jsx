import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthCard from './components/auth/AuthCard';
import AdminDashboard from './components/admin/AdminDashboard';
import UserDashboard from './components/user/UserDashboard';

function MainLayout() {
  const { token, userRole } = useAuth();

  if (!token) {
    return <AuthCard />;
  }

  return userRole === 'admin' ? <AdminDashboard /> : <UserDashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}