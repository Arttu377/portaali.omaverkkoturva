import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Package, Shield, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // HashRouter käyttää hash-reititystä
  const currentPath = location.pathname === '/' && location.hash ? location.hash.slice(1) : location.pathname;

  // Debug lokit
  console.log('Dashboard: Render - user:', user, 'currentPath:', currentPath);
  console.log('Dashboard: location.pathname:', location.pathname, 'location.hash:', location.hash);

  useEffect(() => {
    console.log('Dashboard: useEffect - user:', user, 'currentPath:', currentPath);
  }, [user, currentPath]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) {
    console.log('Dashboard: Ei käyttäjää, ohjataan etusivulle');
    navigate('/');
    return null;
  }

  console.log('Dashboard: Näytetään dashboard sisältö');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Portaali</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Kirjautunut: {user.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Kirjaudu ulos</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard Cards */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Verkkokauppa</h3>
                <p className="text-sm text-gray-500">Tee uusi tilaus</p>
              </div>
            </div>
            <Button 
              className="w-full mt-4"
              onClick={() => navigate('/verkkokauppa')}
            >
              Siirry verkkokauppaan
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Tilaukset</h3>
                <p className="text-sm text-gray-500">Katso tilauksesi</p>
              </div>
            </div>
            <Button 
              className="w-full mt-4"
              onClick={() => navigate('/tilaukset')}
            >
              Katso tilaukset
            </Button>
          </div>

          {isAdmin && (
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Ylläpito</h3>
                  <p className="text-sm text-gray-500">Hallitse käyttäjiä ja tilauksia</p>
                </div>
              </div>
              <Button 
                className="w-full mt-4"
                onClick={() => navigate('/admin')}
              >
                Siirry ylläpitoon
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;