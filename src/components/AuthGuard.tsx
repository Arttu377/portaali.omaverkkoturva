import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Sivut jotka eivät vaadi autentikaatiota
  const publicRoutes = [
    '/confirm-order',
    '/login',
    '/auth/callback'
  ];

  // Tarkista onko nykyinen sivu julkinen
  const isPublicRoute = publicRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  useEffect(() => {
    if (!loading) {
      if (!user && !isPublicRoute) {
        // Jos ei ole kirjautunut ja sivu ei ole julkinen, ohjaa kirjautumiseen
        navigate('/login', { 
          state: { from: location.pathname },
          replace: true 
        });
      }
    }
  }, [user, loading, navigate, location, isPublicRoute]);

  // Jos ladataan, näytä loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ladataan...</p>
        </div>
      </div>
    );
  }

  // Jos julkinen sivu tai kirjautunut käyttäjä, näytä sisältö
  if (isPublicRoute || user) {
    return <>{children}</>;
  }

  // Ei näytä mitään kun ohjataan kirjautumiseen
  return null;
};

export default AuthGuard;
