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
      
      <div className="min-h-screen bg-background relative">
        {/* Gradient overlay that starts from third feature and fades to white before the background image */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              to bottom,
              transparent 0%,
              transparent 25%,
              rgba(30, 42, 94, 0.1) 30%,
              rgba(30, 58, 138, 0.3) 40%,
              rgba(30, 42, 94, 0.6) 50%,
              rgba(30, 58, 138, 0.4) 60%,
              rgba(30, 42, 94, 0.2) 70%,
              rgba(30, 42, 94, 0.05) 80%,
              transparent 85%,
              transparent 100%
            )`
          }}
        ></div>
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
        
        {/* Cases section */}
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Tapauksia, joissa rahaa menetettiin huijauksessa
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <div className="p-8 rounded-lg border" style={{ background: 'var(--gradient-navy)' }}>
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">Tietojenkalastelu</h3>
                    <p className="text-white leading-relaxed">
                      Nina sai aidolta näyttävän sähköpostin pankiltaan. Hän klikkasi viestissä ollutta linkkiä ja kirjautui sisään sivulle, joka olikin huijaussivusto. Tietojen avulla rikollinen otti hänen nimissään kolme pikavippiä (yhteensä 11 200€), vaihdatutti hänen postiosoitteensa sekä puhelinnumeronsa ja yritti avata verkkopankkitilejä ja maksukortteja. Palveluun sisältyvä vakuutus korvaa jopa 13 500 € taloudelliset menetykset ja asiantuntijat auttavat asian läpiviennissä.
                    </p>
                  </div>
                </CarouselItem>
                
                <CarouselItem>
                  <div className="p-8 rounded-lg border" style={{ background: 'var(--gradient-navy)' }}>
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">Verkkokauppahuijaus</h3>
                    <p className="text-white leading-relaxed">
                      Timo löysi verkosta edullisen tarjouksen uusista kuulokkeista tunnetulta brändiltä. Hinta oli lähes puolet halvempi kuin muualla, ja verkkosivusto näytti aidolta. Logo, arvostelut ja maksutavat kaikki kunnossa. Hän maksoi 129 € pankkikortilla. Tilauksen jälkeen tuotetta ei koskaan saapunut ja verkkokauppa katosi muutamassa päivässä. Koska ostoksen hinta oli 50-700 € välillä, Timo saa rahansa takaisin verkkokauppahuijaukset kattavan vakuutuksen ansiosta.
                    </p>
                  </div>
                </CarouselItem>
                
                <CarouselItem>
                  <div className="p-8 rounded-lg border" style={{ background: 'var(--gradient-navy)' }}>
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">Sovellushankinnat</h3>
                    <p className="text-white leading-relaxed">
                      Sannan 9-vuotias poika sai pelata hetken äidin puhelimella. Hän latasi vahingossa pelisovelluksen, joka näytti ilmaiselta mutta sisälsi kalliin 112 euron tilauksen. Maksu veloittui heti, koska maksukortti oli tallennettuna puhelimeen. Vakuutus korvaa kulut, jotka liittyvät alle 10-vuotiaan vahingossa tekemiin sovellusostoihin (alle 135 €) suurimmilla alustoilla, kuten mm. App Storessa, Google Playssa tai Steamissa.
                    </p>
                  </div>
                </CarouselItem>
                
                <CarouselItem>
                  <div className="p-8 rounded-lg border" style={{ background: 'var(--gradient-navy)' }}>
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">Nettikiusaaminen</h3>
                    <p className="text-white leading-relaxed">
                       Emilia joutui nettikiusaamisen kohteeksi sen jälkeen, kun hänen TikTok-videonsa levisi yllättäen laajalle. Tuntemattomat ihmiset alkoivat kommentoida videoita loukkaavasti ja joku perusti tekaistun tilin hänen nimellään ja profiilikuvallaan. Väärennetyllä tilillä julkaistiin sisältöä, joka sai Emilian näyttämään nololta. Hän saa asiantuntijoilta neuvoja ja apuja (25 h) sisällön poistoon ja tilien palautukseen. Tarvittaessa hänen käytössä on myös oikeudellinen tuki ja psykologinen kriisiapu.
                     </p>
                   </div>
                 </CarouselItem>
               </CarouselContent>
               
               {/* Navigation buttons positioned below content */}
               <div className="flex justify-between items-center mt-6 px-4">
                 <CarouselPrevious className="relative left-0 top-0 translate-y-0" />
                 <CarouselNext className="relative right-0 top-0 translate-y-0" />
               </div>
             </Carousel>
           </div>
         </div>
         
         {/* Identity protection section with background image */}
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
                  <p className="text-lg text-white leading-relaxed mb-12">
                    Verkkorikollisuus, tietovuodot ja identiteettivarkaudet ovat yleistyneet merkittävästi viime vuosina. Jo pelkän sähköpostiosoitteen ja salasanan avulla rikolliset voivat saada pääsyn henkilökohtaisiin tileihisi, tehdä ostoksia nimissäsi tai hakea lainaa luvattomasti. Digitaalinen identiteetti on nyky-yhteiskunnassa arvokas resurssi ja sen väärinkäyttö voi aiheuttaa vakavia taloudellisia sekä juridisia seurauksia. Siksi yksilön tunnistetietojen suojaaminen tulisi nähdä yhtä tärkeänä kuin pankkitunnusten turvaaminen.
                  </p>
                  
                  <div className="flex justify-center">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-12 px-6 text-center max-w-md">
                      <div className="text-5xl lg:text-6xl font-bold text-white mb-2">
                        62,9M €
                      </div>
                      <p className="text-white/80 text-sm">
                        Tämä verran vuonna 2024 suomalaisten rahoja menetettiin nettihuijareille. Vielä vuonna 2023 summa oli 44,2M € eli nousua oli 40%.
                      </p>
                    </div>
                  </div>
                </div>
             </div>
            </div>
          </div>
          
          {/* Pricing section */}
          <div className="container mx-auto px-4 py-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                Valitse sinulle sopivin turva
              </h2>
              <p className="text-xl text-muted-foreground mb-2">
                Valitse parhaiten sopiva suojaus.
              </p>
              <p className="text-lg text-muted-foreground">
                Jokaisessa tilauksessa on 14vrk maksuton peruutusoikeus.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Package 1 - Yhdelle */}
              <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-6">
                <h3 className="text-2xl font-bold text-foreground">
                  Identiteettiturva<br />yhdelle
                </h3>
                
                <div className="text-3xl font-bold text-foreground">
                  19,99 €/kk
                </div>
                
                <button className="w-full bg-blue-400 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-500 transition-colors">
                  Hanki Turva
                </button>
                
                <ul className="space-y-3 text-left">
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-foreground rounded-full"></span>
                    <span className="text-foreground">Monitoroi tietoja</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-foreground rounded-full"></span>
                    <span className="text-foreground">Ilmoittaa vuodoista</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-foreground rounded-full"></span>
                    <span className="text-foreground">Korvaa vahingot</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-foreground rounded-full"></span>
                    <span className="text-foreground">Apu ja tuki</span>
                  </li>
                </ul>
              </div>
              
              {/* Package 2 - Kahdelle */}
              <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-6">
                <h3 className="text-2xl font-bold text-foreground">
                  Identiteettiturva<br />kahdelle
                </h3>
                
                <div className="text-3xl font-bold text-foreground">
                  29,99 €/kk
                </div>
                
                <button className="w-full bg-blue-400 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-500 transition-colors">
                  Hanki Turva
                </button>
                
                <ul className="space-y-3 text-left">
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-foreground rounded-full"></span>
                    <span className="text-foreground">Monitoroi tietoja</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-foreground rounded-full"></span>
                    <span className="text-foreground">Ilmoittaa vuodoista</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-foreground rounded-full"></span>
                    <span className="text-foreground">Korvaa vahingot</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-foreground rounded-full"></span>
                    <span className="text-foreground">Apu ja tuki</span>
                  </li>
                </ul>
              </div>
              
              {/* Package 3 - Viidelle */}
              <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-6">
                <h3 className="text-2xl font-bold text-foreground">
                  Identiteettiturva<br />viidelle
                </h3>
                
                <div className="text-3xl font-bold text-foreground">
                  32,99 €/kk
                </div>
                
                <button className="w-full bg-blue-400 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-500 transition-colors">
                  Hanki Turva
                </button>
                
                <ul className="space-y-3 text-left">
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-foreground rounded-full"></span>
                    <span className="text-foreground">Monitoroi tietoja</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-foreground rounded-full"></span>
                    <span className="text-foreground">Ilmoittaa vuodoista</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-foreground rounded-full"></span>
                    <span className="text-foreground">Korvaa vahingot</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-foreground rounded-full"></span>
                    <span className="text-foreground">Apu ja tuki</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </div>
    </PageLayout>
  );
};

export default Identiteettiturva;