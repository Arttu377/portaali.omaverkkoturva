import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import ShoppingCart from '@/components/ShoppingCart';
import OrderForm from '@/components/OrderForm';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Verkkokauppa = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const { toast } = useToast();

  const packages = [
    {
      title: "Identiteettiturva\nyhdelle",
      price: "19,99 €/kk",
      features: [
        "Suojaa laite",
        "Tietojen monitorointi ja ilmoitus tietovuodoista", 
        "Vakuutus, joka turvaa sinut vahinkojen varalta",
        "Apu ja tuki"
      ]
    },
    {
      title: "Identiteettiturva\nkahdelle", 
      price: "26,99 €/kk",
      features: [
        "Suojaa laite",
        "Tietojen monitorointi ja ilmoitus tietovuodoista",
        "Vakuutus, joka turvaa sinut vahinkojen varalta", 
        "Apu ja tuki"
      ]
    },
    {
      title: "Identiteettiturva\nviidelle",
      price: "30,99 €/kk", 
      features: [
        "Suojaa laite",
        "Tietojen monitorointi ja ilmoitus tietovuodoista",
        "Vakuutus, joka turvaa sinut vahinkojen varalta",
        "Apu ja tuki"
      ]
    }
  ];

  const addToCart = (pkg: any) => {
    const existingItemIndex = cartItems.findIndex(item => item.title === pkg.title);
    
    if (existingItemIndex > -1) {
      // Product already exists, increase quantity
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      // New product, add to cart
      const newItem = {
        id: Date.now().toString(),
        title: pkg.title,
        price: pkg.price,
        quantity: 1
      };
      setCartItems([...cartItems, newItem]);
    }
    
    toast({
      title: "Tuote lisätty ostoskoriin",
      description: `${pkg.title} on lisätty ostoskoriisi.`,
    });
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  };

  const removeFromCart = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    toast({
      title: "Tuote poistettu",
      description: "Tuote on poistettu ostoskorista.",
    });
  };

  const handleContinueOrder = () => {
    setShowCart(false);
    setShowOrderForm(true);
  };

  const handleOrderSubmit = (data: any) => {
    console.log('Order submitted:', data);
    setShowOrderForm(false);
    setCartItems([]);
    toast({
      title: "Tilaus lähetetty!",
      description: "Kiitos tilauksestasi. Saat pian vahvistuksen sähköpostiin.",
    });
  };

  return (
    <PageLayout>
      <SEO 
        title="Verkkokauppa - Identiteettiturva paketit" 
        description="Valitse sinulle sopiva identiteettiturva paketti. Suojaa itsesi ja läheisesi verkkorikollisuudelta."
      />
      
      <div className="min-h-screen bg-background py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Valitse sinulle sopiva paketti
              </h1>
              
              {/* Cart icon only */}
              <button 
                onClick={() => setShowCart(true)}
                className="relative p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
                </svg>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Turvaa itsesi ja läheisesi identiteettivarkauksilta ja verkkorikollisuudelta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-2xl p-8 space-y-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4 whitespace-pre-line">
                    {pkg.title}
                  </h3>
                  <div className="text-3xl font-bold text-primary mb-6">
                    {pkg.price}
                  </div>
                </div>
                
                <div className="space-y-4">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-muted-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={() => addToCart(pkg)}
                  className="w-full text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                  style={{ background: 'var(--gradient-navy)' }}
                >
                  Valitse paketti
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
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
    </PageLayout>
  );
};

export default Verkkokauppa;