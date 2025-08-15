
import React, { useState } from "react";
import { Mail, Phone, MapPin, LogOut, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { signIn, signOut, user, loading, isAdmin } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await signIn(email, password);
    
    if (!error) {
      setIsDialogOpen(false);
      setEmail('');
      setPassword('');
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <footer className="bg-gradient-to-b from-white via-blue-200 to-blue-900 text-black pt-16 pb-8 w-full" style={{ position: 'relative', zIndex: 10 }}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-8">
          {/* Left side - Company info - Wider area */}
          <div className="lg:w-1/2 lg:pr-8">
            <h2 className="text-xl font-bold mb-3 text-black">
              OmaVerkkoturva
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-black">
              <p>
                OmaVerkkoturva on suomalainen yritys, joka on erikoistunut identiteettisuojaan ja verkkoturvallisuuteen. 
                Missiomme on suojata ihmisten henkilötietoja ja estää identiteettivarkauksia ennen kuin ne ehtivät tapahtua.
              </p>
              
              <p>
                Yrityksemme perustuu vahvaan suomalaiseen osaamiseen tietoturvassa ja asiakaspalvelussa. 
                Kaikki asiakkaiden tiedot käsitellään Suomessa, ja noudatamme tiukkoja EU:n 
                tietosuoja-asetuksen (GDPR) vaatimuksia.
              </p>
            </div>
          </div>
          
          {/* Right side - Contact info - Bottom right */}
          <div className="lg:self-end">
            <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
              <div>
                <div className="flex items-center mb-2">
                  <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    <Mail className="w-4 h-4 text-blue-900" />
                  </div>
                  <h3 className="text-sm font-semibold text-black">Yhteystiedot</h3>
                </div>
                <p className="text-black text-xs ml-10">
                  tuki@omaverkkoturva.fi<br />
                  0451211663
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    <MapPin className="w-4 h-4 text-blue-900" />
                  </div>
                  <h3 className="text-sm font-semibold text-black">Toimisto</h3>
                </div>
                <p className="text-black text-xs ml-10">
                  Yliopistonkatu 4<br />
                  0100 Jyväskylä<br />
                  Suomi
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    <Phone className="w-4 h-4 text-blue-900" />
                  </div>
                  <h3 className="text-sm font-semibold text-black">Asiakaspalvelu</h3>
                </div>
                <p className="text-black text-xs ml-10">
                  Ma-Pe 10:00-16:00<br />
                  Suomenkielinen palvelu<br />
                  Nopea vastaus
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-300 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-black text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} OmaVerkkoturva. Kaikki oikeudet pidätetään.
            </p>
            <div className="flex space-x-6">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-black">
                    Kirjautunut: {user.email}
                  </span>
                  {isAdmin && (
                    <Link to="/admin">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-black hover:text-blue-900"
                      >
                        <Shield className="w-4 h-4 mr-1" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="text-black hover:text-blue-900"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Kirjaudu ulos
                  </Button>
                </div>
              ) : (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <button className="text-sm text-black hover:text-blue-900 transition-colors">
                      Portaali
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Kirjaudu sisään</DialogTitle>
                      <DialogDescription>
                        Syötä sähköpostiosoitteesi ja salasanasi portaaliin kirjautuaksesi
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Sähköposti</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Syötä sähköpostiosoitteesi"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password">Salasana</Label>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Syötä salasanasi"
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={loading}
                      >
                        {loading ? 'Kirjaudutaan...' : 'Kirjaudu sisään'}
                      </Button>
                      
                      <div className="text-center">
                        <a 
                          href="#" 
                          className="text-sm text-primary hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            toast({
                              title: "Salasanan palautus",
                              description: "Ota yhteyttä asiakaspalveluun salasanan palautusta varten.",
                            });
                          }}
                        >
                          Unohditko salasanasi?
                        </a>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
              <Link to="/privacy-policy" className="text-sm text-black hover:text-blue-900 transition-colors">
                Tietosuojaseloste
              </Link>
              <Link to="/terms" className="text-sm text-black hover:text-blue-900 transition-colors">
                Käyttöehdot
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
