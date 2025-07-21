import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

const Identiteettiturva = () => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionStart = windowHeight * 0.9; // Section starts here
      const stepHeight = windowHeight * 0.8; // Each step takes this much scroll
      
      if (scrollY < sectionStart) {
        setCurrentStep(1);
      } else if (scrollY < sectionStart + stepHeight) {
        setCurrentStep(1);
      } else if (scrollY < sectionStart + stepHeight * 2) {
        setCurrentStep(2);
      } else if (scrollY < sectionStart + stepHeight * 3) {
        setCurrentStep(3);
      } else if (scrollY < sectionStart + stepHeight * 4) {
        setCurrentStep(4);
      } else {
        setCurrentStep(4); // Keep step 4 visible
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      number: 1,
      title: "Tilaa tuote verkkokaupastamme"
    },
    {
      number: 2,
      title: "Lähetämme sinulle linkin tuotteeseen"
    },
    {
      number: 3,
      title: "Järjestelmä tarkastaa ovatko tietosi joutunut vääriin käsiin viimeisen 10 vuoden aikana"
    },
    {
      number: 4,
      title: "Rentoudu - sovellus toimii taustalla koko ajan ja hälyttää, jos henkilötietosi vuotavat jonnekin"
    }
  ];

  return (
    <PageLayout>
      <SEO
        title="Identiteettiturva - Turvaa rahasi ja henkilötietosi"
        description="Kattava identiteettiturva joka havaitsee tietovuodot, tarjoaa vakuutusturvan 13 500 € asti ja suojaa huijauksilta."
      />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side content */}
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Turvaa rahasi ja henkilötietosi helposti yhdellä ratkaisulla
              </h1>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Havaitsee jos tietosi joutuvat vääriin käsiin
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Palvelu monitoroi ja ilmoittaa, mikäli tietojasi päätyy verkossa vääriin käsiin.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Vakuutusturva 13 500 € asti
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Korvaa taloudelliset vahingot ilman omavastuuta.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Kattaa myös huijaukset
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Suojaa tietojenkalastelun, petosten ja väärinkäytösten seurauksilta, 0 € omavastuu.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - empty for future image */}
            <div className="hidden lg:block">
              {/* Image will be added here later */}
            </div>
          </div>
        </div>
        
        {/* Second section - Helppo käyttöönotto */}
        <div className="relative">
          {/* Content area with proper scroll sections */}
          <div className="relative" style={{ height: 'calc(100vh + 320vh)' }}>
            {/* Sticky container */}
            <div className="sticky top-0 h-screen bg-background overflow-hidden">
              <div className="container mx-auto px-4 h-full flex flex-col">
                {/* Sticky header */}
                <div className="py-8 border-b border-border/20">
                  <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight text-center">
                    Helppo käyttöönotto
                  </h2>
                </div>
                
                {/* Main content area */}
                <div className="flex-1 flex items-center">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                    {/* Left side - sticky large numbers */}
                    <div className="hidden lg:flex justify-center items-center">
                      <div className="text-9xl font-bold text-primary/30 transition-all duration-700">
                        {currentStep}
                      </div>
                    </div>
                    
                    {/* Right side content */}
                    <div className="space-y-8">
                      <div className="relative h-40 overflow-hidden">
                        {steps.map((step) => (
                          <div 
                            key={step.number}
                            className={`absolute w-full transition-all duration-700 ease-in-out ${
                              currentStep === step.number 
                                ? 'opacity-100 transform translate-y-0' 
                                : currentStep > step.number
                                  ? 'opacity-0 transform -translate-y-12'
                                  : 'opacity-0 transform translate-y-12'
                            }`}
                          >
                            <div className="flex items-start space-x-4">
                              <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                                {step.number}
                              </div>
                              <div>
                                <h3 className="text-2xl font-semibold text-foreground leading-tight">
                                  {step.title}
                                </h3>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Mobile number display */}
                      <div className="lg:hidden text-center">
                        <div className="text-6xl font-bold text-primary/30">
                          {currentStep}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Next section placeholder */}
        <div className="container mx-auto px-4 py-24">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Seuraava osio</h3>
            <p className="text-muted-foreground">Sisältöä tulee tähän myöhemmin...</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Identiteettiturva;