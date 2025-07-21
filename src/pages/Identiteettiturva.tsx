import React from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

const Identiteettiturva = () => {
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
      </div>
    </PageLayout>
  );
};

export default Identiteettiturva;