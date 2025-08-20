import React from 'react';
import PublicPageLayout from '@/components/PublicPageLayout';
import SEO from '@/components/SEO';
import { useShoppingCart } from '@/contexts/ShoppingCartContext';
import FloatingCart from '@/components/FloatingCart';

const Verkkokauppa = () => {
  const { addToCart } = useShoppingCart();

  const packages = [
    {
      title: "Henkilösuoja Yhdelle",
      price: "21,99 €/kk",
      features: [
        "Tietojen monitorointi ja ilmoitus tietovuodoista", 
        "Vakuutus, joka turvaa sinut vahinkojen varalta",
        "Apu ja tuki"
      ]
    },
    {
      title: "Henkilösuoja Tupla", 
      price: "28,99 €/kk",
      features: [
        "Tietojen monitorointi ja ilmoitus tietovuodoista sinulle sekä läheisellesi",
        "Vakuutus, joka turvaa sinut ja läheisesi vahinkojen varalta", 
        "Apu ja tuki",
        "Sisältää 2 lisenssiä"
      ]
    },
    {
      title: "Henkilösuoja Perhe", 
      price: "32,99 €/kk", 
      features: [
        "Tietojen monitorointi ja ilmoitus tietovuodoista sinulle sekä koko perheellesi",
        "Vakuutus, joka turvaa sinut ja koko perheesi vahinkojen varalta", 
        "Apu ja tuki",
        "Sisältää 5 lisenssiä"
      ]
    }
  ];

  const freeTrial = {
    title: "Henkilösuoja - Ilmainen kokeilujakso 30pv",
    price: "0€"
  };


  return (
    <PublicPageLayout>
      <SEO 
        title="Verkkokauppa - Identiteettiturva paketit" 
        description="Valitse sinulle sopiva identiteettiturva paketti. Suojaa itsesi ja läheisesi verkkorikollisuudelta."
      />
      
      <div className="min-h-screen bg-background pt-44 pb-12">
        {/* Floating ostoskori */}
        <FloatingCart />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              Valitse sinulle sopivin turva
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Valitse parhaiten sopiva suojaus.
            </p>
            <p className="text-sm text-muted-foreground">
              Jokaisessa tilauksessa on 14vrk maksuton peruutusoikeus.
            </p>
          </div>

          {/* Ilmainen kokeilujakso */}
          <div className="mb-16 flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {freeTrial.title}
                </h3>
                <div className="text-4xl font-bold text-gray-900 mb-6">
                  {freeTrial.price}
                </div>
                
                <button 
                  onClick={() => addToCart(freeTrial)}
                  className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-800 transition-colors"
                >
                  Aloita ilmainen kokeilu
                </button>
              </div>
            </div>
          </div>

          {/* Maksulliset paketit */}
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
                
                <ul className="space-y-3 mb-8 text-left">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-gray-700">• {feature}</span>
                    </li>
                  ))}
                </ul>
                
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
    </PublicPageLayout>
  );
};

export default Verkkokauppa;