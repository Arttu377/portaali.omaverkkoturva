import React from 'react';
import { Button } from '@/components/ui/button';

interface CartItem {
  id: string;
  title: string;
  price: string;
  quantity: number;
}

interface ShoppingCartProps {
  items: CartItem[];
  onContinueOrder: () => void;
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ items, onContinueOrder, onClose }) => {
  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.,]/g, '').replace(',', '.'));
    return sum + (price * item.quantity);
  }, 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Ostoskori</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border border-border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground whitespace-pre-line">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    Määrä: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-border pt-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Yhteensä:</span>
            <span className="text-primary">{total.toFixed(2).replace('.', ',')} €/kk</span>
          </div>
        </div>
        
        <Button 
          onClick={onContinueOrder}
          className="w-full"
          style={{ background: 'var(--gradient-navy)' }}
        >
          Jatka tilausta
        </Button>
      </div>
    </div>
  );
};

export default ShoppingCart;