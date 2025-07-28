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
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ items, onContinueOrder, onClose, onUpdateQuantity, onRemoveItem }) => {
  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.,]/g, '').replace(',', '.'));
    return sum + (price * item.quantity);
  }, 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full space-y-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Ostoskori</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Ostoskori on tyhjä</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground whitespace-pre-line">
                      {item.title}
                    </h3>
                    <p className="font-bold text-primary">{item.price}</p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Poista tuote"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Määrä:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-accent"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-accent"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {items.length > 0 && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;