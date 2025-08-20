import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Clock, CheckCircle, Home, ShoppingCart, LogOut, Shield } from 'lucide-react';

const OrderOverview = () => {
  const { user, loading: authLoading, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-8">OmaVerkkoturva</h2>
          
          {/* Navigation Items */}
          <nav className="space-y-2">
            {/* Etusivu */}
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Hallintapaneeli</span>
            </button>

            {/* Verkkokauppa */}
            <button 
              onClick={() => navigate('/verkkokauppa')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Verkkokauppa</span>
            </button>

            {/* Tilaukseni - aktiivinen */}
            <button 
              onClick={() => navigate('/tilaukset')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Package className="w-5 h-5" />
              <span className="font-medium">Tilaukseni</span>
            </button>

            {/* Ylläpito (vain admin) */}
            {isAdmin && (
              <button 
                onClick={() => navigate('/admin')}
                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Shield className="w-5 h-5" />
                <span className="font-medium">Ylläpito</span>
              </button>
            )}

            {/* Kirjaudu ulos */}
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors mt-8"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Kirjaudu ulos</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white">
        <div className="p-8">
          {/* Main Heading */}
          <div className="flex items-center gap-3 mb-8">
            <Package className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-800">Tilaukseni</h1>
          </div>
          
          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {/* Vahvistamattomat tilaukset */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/tilaukset/vahvistamattomat')}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Vahvistamattomat tilaukset</h3>
                    <p className="text-gray-600">Näytä kaikki tilaukset, joita ei ole vielä vahvistettu</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vahvistetut tilaukset */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/tilaukset/vahvistetut')}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Vahvistetut tilaukset</h3>
                    <p className="text-gray-600">Näytä kaikki asiakkaan vahvistamat tilaukset</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderOverview;