import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  title: string;
  price: string;
  quantity: number;
}

interface ShoppingCartContextType {
  cartItems: CartItem[];
  addToCart: (pkg: any) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
  }
  return context;
};

interface ShoppingCartProviderProps {
  children: ReactNode;
}

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (pkg: any) => {
    const existingItemIndex = cartItems.findIndex(item => item.title === pkg.title);
    
    if (existingItemIndex > -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
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

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};