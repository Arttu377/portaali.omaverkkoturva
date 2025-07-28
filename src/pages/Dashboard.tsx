import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }


  return (
    <PageLayout>
      <div className="min-h-screen bg-background py-12 pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Tervetuloa!</h1>
            <p className="text-xl text-muted-foreground">Hallitse tilauksiasi täältä.</p>
          </div>

          {/* Verkkokauppa Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <ShoppingCart className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold">Verkkokauppa</h2>
              </div>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
                onClick={() => window.location.href = '/verkkokauppa'}
              >
                Tästä verkkokauppaan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;