import React from 'react';

interface SecondaryNavbarProps {
  cartItems: any[];
  onCartClick: () => void;
}

const SecondaryNavbar = ({ cartItems, onCartClick }: SecondaryNavbarProps) => {
  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-end items-center h-12">
          <button 
            onClick={onCartClick}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
            </svg>
            <span className="text-sm text-gray-700">Ostoskori</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondaryNavbar;