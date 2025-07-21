import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

const Identiteettiturva = () => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Start the sticky section after first section
      const stickyStartY = windowHeight * 0.9;
      const stepHeight = windowHeight * 0.6; // Shorter steps
      
      if (scrollY >= stickyStartY) {
        const relativeScroll = scrollY - stickyStartY;
        
        if (relativeScroll < stepHeight) {
          setCurrentStep(1);
        } else if (relativeScroll < stepHeight * 2) {
          setCurrentStep(2);
        } else if (relativeScroll < stepHeight * 3) {
          setCurrentStep(3);
        } else if (relativeScroll < stepHeight * 4) {
          setCurrentStep(4);
        } else {
          setCurrentStep(4);
        }
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
        
        {/* Sticky section - Helppo käyttöönotto */}
        <div className="relative bg-background">
          {/* Create scroll area */}
          <div className="h-[240vh]">
            {/* Sticky content */}
            <div className="sticky top-0 h-screen flex flex-col justify-center">
              {/* Header */}
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                  Helppo käyttöönotto
                </h2>
              </div>
              
              {/* Content area */}
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                  {/* Left - Large number */}
                  <div className="hidden lg:flex justify-center">
                    <div className="text-8xl font-bold text-primary/30">
                      {currentStep}
                    </div>
                  </div>
                  
                  {/* Right - Step content */}
                  <div className="space-y-8">
                    {steps.map((step) => (
                      <div 
                        key={step.number}
                        className={`transition-all duration-500 ${
                          currentStep === step.number 
                            ? 'opacity-100 block' 
                            : 'opacity-0 hidden'
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
                    
                    {/* Mobile number */}
                    <div className="lg:hidden text-center pt-8">
                      <div className="text-5xl font-bold text-primary/30">
                        {currentStep}
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