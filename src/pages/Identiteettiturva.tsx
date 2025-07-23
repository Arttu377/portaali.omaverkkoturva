import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Identiteettiturva = () => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Start showing steps very early
      const step1Trigger = windowHeight * 0.2; // Almost immediately
      const step2Trigger = windowHeight * 0.3;
      const step3Trigger = windowHeight * 0.4;
      const step4Trigger = windowHeight * 0.5;
      
      if (scrollY >= step4Trigger) {
        setCurrentStep(4);
      } else if (scrollY >= step3Trigger) {
        setCurrentStep(3);
      } else if (scrollY >= step2Trigger) {
        setCurrentStep(2);
      } else if (scrollY >= step1Trigger) {
        setCurrentStep(1);
      } else {
        setCurrentStep(0);
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
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Helppo käyttöönotto
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Left side - empty for future image */}
            <div className="hidden lg:block">
              {/* Image will be added here later */}
            </div>
            
            {/* Right side content */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div 
                  key={step.number}
                  className={`transition-all duration-700 ease-out transform ${
                    currentStep >= step.number
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: currentStep >= step.number ? `${index * 200}ms` : '0ms'
                  }}
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
          </div>
        </div>
        
        {/* New identity protection section */}
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Identiteetti on nykyajan valuutta
            </h2>
            <h3 className="text-2xl lg:text-3xl font-semibold text-muted-foreground mt-6 mb-8">
              Yksi tietovuoto voi maksaa tuhansia euroja
            </h3>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-foreground leading-relaxed">
                Verkkorikollisuus, tietovuodot ja identiteettivarkaudet ovat yleistyneet merkittävästi viime vuosina. Jo pelkän sähköpostiosoitteen ja salasanan avulla rikolliset voivat saada pääsyn henkilökohtaisiin tileihisi, tehdä ostoksia nimissäsi tai hakea lainaa luvattomasti. Digitaalinen identiteetti on nyky-yhteiskunnassa arvokas resurssi ja sen väärinkäyttö voi aiheuttaa vakavia taloudellisia sekä juridisia seurauksia. Siksi yksilön tunnistetietojen suojaaminen tulisi nähdä yhtä tärkeänä kuin pankkitunnusten turvaaminen.
              </p>
            </div>
          </div>
        </div>
        
        {/* Cases section with background image */}
        <div 
          className="relative py-24 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/lovable-uploads/f96aa839-76e5-4b74-92a6-ef3e2166b1f1.png)' }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
          
          <div className="relative container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Identiteetti on nykyajan valuutta
              </h2>
              <h3 className="text-2xl lg:text-3xl font-semibold text-white/90 mt-6 mb-8">
                Yksi tietovuoto voi maksaa tuhansia euroja
              </h3>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-white leading-relaxed">
                  Verkkorikollisuus, tietovuodot ja identiteettivarkaudet ovat yleistyneet merkittävästi viime vuosina. Jo pelkän sähköpostiosoitteen ja salasanan avulla rikolliset voivat saada pääsyn henkilökohtaisiin tileihisi, tehdä ostoksia nimissäsi tai hakea lainaa luvattomasti. Digitaalinen identiteetti on nyky-yhteiskunnassa arvokas resurssi ja sen väärinkäyttö voi aiheuttaa vakavia taloudellisia sekä juridisia seurauksia. Siksi yksilön tunnistetietojen suojaaminen tulisi nähdä yhtä tärkeänä kuin pankkitunnusten turvaaminen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Identiteettiturva;