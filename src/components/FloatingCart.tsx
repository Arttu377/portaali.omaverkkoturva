import React, { useState } from 'react';
import { useShoppingCart } from '@/contexts/ShoppingCartContext';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import TilausModal from './TilausModal';

const FloatingCart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useShoppingCart();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTilausModalOpen, setIsTilausModalOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.,]/g, '').replace(',', '.'));
    return sum + (price * item.quantity);
  }, 0);

  // Ostoskori näkyy aina, mutta tyhjänä kun siinä ei ole tuotteita

  return (
    <div className="fixed top-20 right-4 z-50">
      {/* Ostoskorin ikoni ja tuoteiden määrä */}
      <div className="relative">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-blue-900 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition-colors relative"
        >
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Laajennettu ostoskori */}
      {isExpanded && (
        <div className="absolute top-16 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-80 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Ostoskori</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {totalItems === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Ostoskori on tyhjä</p>
              <p className="text-sm text-gray-400 mt-2">Lisää tuotteita ostoskoriin</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                        <p className="font-bold text-blue-900 text-sm">{item.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Poista tuote"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Määrä:</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-gray-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-gray-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center text-lg font-bold mb-3">
                  <span className="text-gray-900">Yhteensä:</span>
                  <span className="text-blue-900">{totalPrice.toFixed(2).replace('.', ',')} €/kk</span>
                </div>
                
                <button 
                  className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-800 transition-colors text-sm"
                  onClick={() => {
                    setIsTilausModalOpen(true);
                    setIsExpanded(false);
                  }}
                >
                  Jatka tilausta
                </button>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Tilausmodaali */}
      <TilausModal 
        isOpen={isTilausModalOpen} 
        onClose={() => setIsTilausModalOpen(false)} 
      />
    </div>
  );
};

export default FloatingCart;
