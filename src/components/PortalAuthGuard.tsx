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

  // Portaalin julkinen sivu (kirjautumissivu)
  const isPublicRoute = location.pathname === '/';

  // Debug lokit
  console.log('PortalAuthGuard - user:', user);
  console.log('PortalAuthGuard - loading:', loading);
  console.log('PortalAuthGuard - location:', location.pathname);
  console.log('PortalAuthGuard - isPublicRoute:', isPublicRoute);

  useEffect(() => {
    console.log('PortalAuthGuard useEffect - user:', user, 'loading:', loading, 'path:', location.pathname);
    
    if (!loading) {
      if (!user && !isPublicRoute) {
        console.log('PortalAuthGuard: Ei kirjautunut, ohjataan etusivulle');
        // Jos ei ole kirjautunut ja sivu ei ole julkinen, ohjaa portaalin etusivulle
        navigate('/', { replace: true });
      } else if (user && location.pathname.startsWith('/admin') && !isAdmin) {
        console.log('PortalAuthGuard: Ei admin-oikeuksia, ohjataan dashboardille');
        // Estä pääsy admin-sivulle ilman admin-oikeuksia
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, loading, navigate, location, isPublicRoute, isAdmin]);

  // Jos ladataan, näytä loading
  if (loading) {
    console.log('PortalAuthGuard: Ladataan...');
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
    console.log('PortalAuthGuard: Näytetään sisältö - isPublicRoute:', isPublicRoute, 'user:', !!user);
    return <>{children}</>;
  }

  // Ei näytä mitään kun ohjataan kirjautumiseen
  console.log('PortalAuthGuard: Ei näytetä mitään');
  return null;
};

export default PortalAuthGuard;
