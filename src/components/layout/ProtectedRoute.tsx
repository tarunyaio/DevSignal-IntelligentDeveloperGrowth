import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Layout } from './Layout';

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Layout />;
}
