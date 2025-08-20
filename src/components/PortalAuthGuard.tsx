import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface PortalAuthGuardProps {
  children: React.ReactNode;
}

const PortalAuthGuard: React.FC<PortalAuthGuardProps> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // HashRouter käyttää hash-reititystä, joten pathname on aina "/"
  // Käytetään hash:ia tai location.pathname + location.hash
  const currentPath = location.pathname === '/' && location.hash ? location.hash.slice(1) : location.pathname;
  
  // Julkiset reitit: vain etusivu (kirjautumissivu)
  const isPublicRoute = currentPath === '' || currentPath === '/';

  console.log('PortalAuthGuard - user:', user, 'loading:', loading);
  console.log('PortalAuthGuard - location.pathname:', location.pathname);
  console.log('PortalAuthGuard - location.hash:', location.hash);
  console.log('PortalAuthGuard - currentPath:', currentPath);
  console.log('PortalAuthGuard - isPublicRoute:', isPublicRoute);

  useEffect(() => {
    if (!loading) {
      // Jos ei ole kirjautunut ja yrittää päästä suojattuun reittiin
      if (!user && !isPublicRoute) {
        console.log('PortalAuthGuard: Ei käyttäjää, ohjataan etusivulle');
        navigate('/', { replace: true });
      } 
      // Jos on kirjautunut ja yrittää päästä admin-reittiin ilman oikeuksia
      else if (user && currentPath.startsWith('/admin') && !isAdmin) {
        console.log('PortalAuthGuard: Ei admin-oikeuksia, ohjataan dashboardille');
        navigate('/dashboard', { replace: true });
      }
      // Jos on kirjautunut ja on kirjautumissivulla, ohjaa dashboardille
      else if (user && isPublicRoute) {
        console.log('PortalAuthGuard: Käyttäjä kirjautunut ja etusivulla, ohjaa dashboardille');
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, loading, navigate, currentPath, isPublicRoute, isAdmin]);

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

  // Näytä sisältö jos:
  // 1. Julkinen reitti (kirjautumissivu) JA ei käyttäjää
  // 2. Suojattu reitti JA on käyttäjää
  if ((isPublicRoute && !user) || (!isPublicRoute && user)) {
    console.log('PortalAuthGuard: Näytetään sisältö - isPublicRoute:', isPublicRoute, 'user:', !!user);
    return <>{children}</>;
  }

  // Ei näytä mitään kun ohjataan
  console.log('PortalAuthGuard: Ei näytetä mitään, ohjataan...');
  return null;
};

export default PortalAuthGuard;
