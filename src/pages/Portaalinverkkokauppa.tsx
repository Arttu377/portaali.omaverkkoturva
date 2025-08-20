import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useShoppingCart } from '@/contexts/ShoppingCartContext';
import { Home, ShoppingCart, Package, LogOut, Shield } from 'lucide-react';
import ShoppingCartModal from '@/components/ShoppingCart';
import OrderForm from '@/components/OrderForm';
import { useToast } from '@/hooks/use-toast';

const Portaalinverkkokauppa = () => {
  const { user, loading: authLoading, signOut, isAdmin } = useAuth();
  const { cartItems, updateQuantity, removeFromCart, clearCart, addToCart } = useShoppingCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showCart, setShowCart] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

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

  const handleContinueOrder = () => {
    setShowCart(false);
    setShowOrderForm(true);
  };

  const handleOrderSubmit = (data: any) => {
    console.log('Order submitted:', data);
    setShowOrderForm(false);
    clearCart();
    toast({
      title: "Tilaus lähetetty!",
      description: "Kiitos tilauksestasi. Saat pian vahvistuksen sähköpostiin.",
    });
  };

  const packages = [
    {
      title: "Henkilösuoja Yhdelle",
      price: "19,99 €/kk"
    },
    {
      title: "Henkilösuoja Tupla", 
      price: "26,99 €/kk"
    },
    {
      title: "Henkilösuoja Perhe", 
      price: "30,99 €/kk"
    }
  ];

  return (
    <>
      <SEO 
        title="Portaalin Verkkokauppa - Identiteettiturva paketit" 
        description="Valitse sinulle sopiva identiteettiturva paketti. Suojaa itsesi ja läheisesi verkkorikollisuudelta."
      />
      
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

              {/* Verkkokauppa - aktiivinen */}
              <button 
                onClick={() => navigate('/portaalin-verkkokauppa')}
                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
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
            {/* Header with cart button */}
            <div className="flex justify-between items-center mb-16">
              <div className="text-center flex-1">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-4">
                  Valitse tästä sopiva turva
                </h1>
              </div>
              
              {/* Shopping Cart Button */}
              <button 
                onClick={() => setShowCart(true)}
                className="relative p-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Ostoskori</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {packages.map((pkg, index) => (
                <div 
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 shadow-lg text-center hover:shadow-xl transition-shadow"
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {pkg.title}
                    </h3>
                    <div className="text-4xl font-bold text-gray-900 mb-6">
                      {pkg.price}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => addToCart(pkg)}
                    className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-800 transition-colors"
                  >
                    Valitse paketti
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shopping Cart Modal */}
      {showCart && (
        <ShoppingCartModal 
          items={cartItems}
          onContinueOrder={handleContinueOrder}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
        />
      )}
      
      {/* Order Form Modal */}
      {showOrderForm && (
        <OrderForm 
          onClose={() => setShowOrderForm(false)}
          onSubmit={handleOrderSubmit}
        />
      )}
    </>
  );
};

export default Portaalinverkkokauppa;
