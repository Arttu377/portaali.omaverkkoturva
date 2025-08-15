
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactInfo from '@/components/ContactInfo';
import FloatingContactButton from '@/components/FloatingContactButton';
import SecondaryNavbar from '@/components/SecondaryNavbar';
import ShoppingCart from '@/components/ShoppingCart';
import OrderForm from '@/components/OrderForm';
import { useAuth } from '@/contexts/AuthContext';
import { useShoppingCart } from '@/contexts/ShoppingCartContext';
import { useToast } from '@/hooks/use-toast';

type PageLayoutProps = {
  children: React.ReactNode;
  showContact?: boolean;
};

const PageLayout = ({ children, showContact = true }: PageLayoutProps) => {
  const location = useLocation();
  const { user } = useAuth();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useShoppingCart();
  const [showCart, setShowCart] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const { toast } = useToast();

  // Effect to scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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

  return (
    <div className="min-h-screen bg-transparent w-full max-w-[100vw] overflow-x-hidden">
      <Navbar />
      {user && location.pathname !== '/dashboard' && (
        <SecondaryNavbar 
          cartItems={cartItems}
          onCartClick={() => setShowCart(true)}
        />
      )}
      {children}
      {!user && <Footer />}
      
      {/* Shopping Cart Modal */}
      {showCart && (
        <ShoppingCart 
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
    </div>
  );
};

export default PageLayout;
