import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type PublicPageLayoutProps = {
  children: React.ReactNode;
};

const PublicPageLayout = ({ children }: PublicPageLayoutProps) => {
  const location = useLocation();

  // Effect to scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-transparent w-full max-w-[100vw] overflow-x-hidden">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default PublicPageLayout;
