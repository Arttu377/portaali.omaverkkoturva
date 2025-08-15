import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // URL josta käyttäjä tuli (tallennettu state:ssa)
  const from = location.state?.from || '/';

  const handlePortalLogin = () => {
    // Ohjaa portaalin sisäänkirjautumiseen
    // Muuta tämä URL vastaamaan sinun portaalia
    const portalUrl = 'https://omaverkkoturva.fi/login';
    
    // Tallennetaan nykyinen sivu sessionStorage:een
    sessionStorage.setItem('redirectAfterLogin', from);
    
    // Ohjaa portaaliin
    window.location.href = portalUrl;
  };

  const handleReturnToPortal = () => {
    // Ohjaa takaisin portaaliin
    const portalUrl = 'https://omaverkkoturva.fi';
    window.location.href = portalUrl;
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-background pt-44 pb-12">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Sisäänkirjautuminen vaaditaan
              </h1>
              <p className="text-muted-foreground">
                Tämä sivu vaatii sisäänkirjautumisen portaalin kautta
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handlePortalLogin}
                className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Kirjaudu sisään portaalin kautta
              </button>

              <button
                onClick={handleReturnToPortal}
                className="w-full bg-secondary text-secondary-foreground py-3 px-4 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              >
                Palaa portaaliin
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>
                Jos sinulla on ongelmia kirjautumisessa,<br />
                ota yhteyttä ylläpitoon
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
