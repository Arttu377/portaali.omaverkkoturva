import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Home, ShoppingCart, Package, LogOut, Shield } from 'lucide-react';

const Dashboard = () => {
  const { user, loading, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (loading) {
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
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Hallintapaneeli</span>
            </button>

            {/* Verkkokauppa */}
            <button 
              onClick={() => navigate('/portaalin-verkkokauppa')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Verkkokauppa</span>
            </button>

            {/* Tilaukseni */}
            <button 
              onClick={() => navigate('/tilaukset')}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Hallintapaneeli</h1>
          
          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Etusivu Card */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/dashboard')}>
              <div className="flex items-center space-x-3">
                <Home className="w-8 h-8 text-blue-600" />
                <span className="font-medium text-gray-800">Hallintapaneeli</span>
              </div>
            </div>

            {/* Verkkokauppa Card */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/portaalin-verkkokauppa')}>
              <div className="flex items-center space-x-3">
                <ShoppingCart className="w-8 h-8 text-green-600" />
                <span className="font-medium text-gray-800">Verkkokauppa</span>
              </div>
            </div>

            {/* Tilaukseni Card */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/tilaukset')}>
              <div className="flex items-center space-x-3">
                <Package className="w-8 h-8 text-purple-600" />
                <span className="font-medium text-gray-800">Tilaukseni</span>
              </div>
            </div>

            {/* Kirjaudu ulos Card */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={handleSignOut}>
              <div className="flex items-center space-x-3">
                <LogOut className="w-8 h-8 text-red-600" />
                <span className="font-medium text-gray-800">Kirjaudu ulos</span>
              </div>
            </div>

            {/* Ylläpito Card (vain admin) */}
            {isAdmin && (
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin')}>
                <div className="flex items-center space-x-3">
                  <Shield className="w-8 h-8 text-indigo-600" />
                  <span className="font-medium text-gray-800">Ylläpito</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;