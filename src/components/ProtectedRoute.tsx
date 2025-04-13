
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading, hasValidSubscription } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show loading spinner while checking authentication
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kuski-dark"></div>
      </div>
    );
  }

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If subscription is expired, redirect to subscription page
  if (!hasValidSubscription()) {
    return <Navigate to="/subscription" state={{ from: location }} replace />;
  }

  // If authenticated and has valid subscription, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
