import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

const Identiteettiturva = () => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionStart = windowHeight * 0.6; // Start earlier
      
      // Calculate which step should be visible based on scroll position
      if (scrollY < sectionStart) {
        setCurrentStep(1);
      } else if (scrollY < sectionStart + windowHeight * 0.4) {
        setCurrentStep(2);
      } else if (scrollY < sectionStart + windowHeight * 0.8) {
        setCurrentStep(3);
      } else if (scrollY < sectionStart + windowHeight * 1.2) {
        setCurrentStep(4);
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
          {/* Sticky header area */}
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/20">
            <div className="container mx-auto px-4 py-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight text-center">
                Helppo käyttöönotto
              </h2>
            </div>
          </div>
          
          {/* Content area with scroll snapping */}
          <div className="relative min-h-[400vh]">
            <div className="sticky top-20 container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                {/* Left side - sticky numbers */}
                <div className="hidden lg:flex justify-center items-center">
                  <div className="text-8xl font-bold text-primary/20 transition-all duration-700">
                    {currentStep}
                  </div>
                </div>
                
                {/* Right side content */}
                <div className="space-y-8">
                  <div className="relative h-32 overflow-hidden">
                    {steps.map((step) => (
                      <div 
                        key={step.number}
                        className={`absolute w-full transition-all duration-700 ease-in-out ${
                          currentStep === step.number 
                            ? 'opacity-100 transform translate-y-0' 
                            : currentStep > step.number
                              ? 'opacity-0 transform -translate-y-8'
                              : 'opacity-0 transform translate-y-8'
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
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