import React from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { useShoppingCart } from '@/contexts/ShoppingCartContext';

const Verkkokauppa = () => {
  const { addToCart } = useShoppingCart();

  const packages = [
    {
      title: "Henkilösuoja Yhdelle",
      price: "19,99 €/kk",
      features: [
        "Tietojen monitorointi ja ilmoitus tietovuodoista", 
        "Vakuutus, joka turvaa sinut vahinkojen varalta",
        "Apu ja tuki"
      ]
    },
    {
      title: "Henkilösuoja Tupla", 
      price: "26,99 €/kk",
      features: [
        "Tietojen monitorointi ja ilmoitus tietovuodoista sinulle sekä läheisellesi",
        "Vakuutus, joka turvaa sinut ja läheisesi vahinkojen varalta", 
        "Apu ja tuki"
      ]
    },
    {
      title: "Henkilösuoja Perhe", 
      price: "30,99 €/kk", 
      features: [
        "Tietojen monitorointi ja ilmoitus tietovuodoista sinulle sekä koko perheellesi",
        "Vakuutus, joka turvaa sinut ja koko perheesi vahinkojen varalta", 
        "Apu ja tuki"
      ]
    }
  ];


  return (
    <PageLayout>
      <SEO 
        title="Verkkokauppa - Identiteettiturva paketit" 
        description="Valitse sinulle sopiva identiteettiturva paketti. Suojaa itsesi ja läheisesi verkkorikollisuudelta."
      />
      
      <div className="min-h-screen bg-background pt-44 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-8">
              Valitse sopiva paketti
            </h1>
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
    </PageLayout>
  );
};

export default Verkkokauppa;