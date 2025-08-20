import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Sivut jotka eivät vaadi autentikaatiota
  const publicRoutes = [
    '/',
    '/confirm-order',
    '/vahvista-tilaus',
    '/login',
    '/auth/callback',
    '/about',
    '/meista',
    '/careers',
    '/privacy-policy',
    '/blog',
    '/identiteettiturva',
    '/verkkokauppa',
    '/ota-yhteytta',
    '/logo-tool',
    '/irtisanomislomake'
  ];

  // Tarkista onko nykyinen sivu julkinen
  const isPublicRoute = publicRoutes.some(route => {
    if (route === '/') {
      return location.pathname === '/';
    }
    if (route === '/confirm-order') {
      return location.pathname.startsWith('/confirm-order/');
    }
    if (route === '/vahvista-tilaus') {
      return location.pathname.startsWith('/vahvista-tilaus/');
    }
    if (route === '/blog') {
      return location.pathname.startsWith('/blog');
    }
    return location.pathname === route || location.pathname.startsWith(route + '/');
  });

  // Debug lokit
  console.log('AuthGuard - location.pathname:', location.pathname);
  console.log('AuthGuard - isPublicRoute:', isPublicRoute);
  console.log('AuthGuard - user:', user);
  console.log('AuthGuard - loading:', loading);

  useEffect(() => {
    if (!loading) {
      if (!user && !isPublicRoute) {
        console.log('AuthGuard: Ei käyttäjää ja ei julkinen reitti, ohjaa kirjautumiseen');
        // Jos ei ole kirjautunut ja sivu ei ole julkinen, ohjaa kirjautumiseen
        navigate('/login', { 
          state: { from: location.pathname },
          replace: true 
        });
      } else if (user && location.pathname.startsWith('/admin') && !isAdmin) {
        console.log('AuthGuard: Ei admin-oikeuksia, ohjaa dashboardille');
        // Estä pääsy admin-sivulle ilman admin-oikeuksia
        navigate('/dashboard', { replace: true });
      } else {
        console.log('AuthGuard: Näytetään sisältö - julkinen reitti tai kirjautunut käyttäjä');
      }
    }
  }, [user, loading, navigate, location, isPublicRoute, isAdmin]);

  // Jos ladataan, näytä loading
  if (loading) {
    console.log('AuthGuard: Ladataan...');
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
    console.log('AuthGuard: Näytetään sisältö - isPublicRoute:', isPublicRoute, 'user:', !!user);
    return <>{children}</>;
  }

  // Ei näytä mitään kun ohjataan kirjautumiseen
  console.log('AuthGuard: Ei näytetä mitään, ohjataan...');
  return null;
};

export default AuthGuard;
