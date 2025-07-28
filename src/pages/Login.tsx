import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      if (username && password) {
        toast({
          title: "Kirjautuminen onnistui",
          description: "Tervetuloa takaisin!",
        });
        navigate('/');
      } else {
        toast({
          title: "Virhe kirjautumisessa",
          description: "Tarkista käyttäjätunnus ja salasana.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <SEO 
        title="Kirjaudu sisään - Netin Turva"
        description="Kirjaudu sisään Netin Turva tilillesi hallitaksesi identiteettiturva palveluitasi."
      />
      
      <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-foreground">
              Kirjaudu sisään
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Syötä käyttäjätunnuksesi ja salasanasi
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Kirjautuminen</CardTitle>
              <CardDescription>
                Kirjaudu sisään tilillesi hallitaksesi palveluitasi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Käyttäjätunnus</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Syötä käyttäjätunnuksesi"
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
                  disabled={isLoading}
                >
                  {isLoading ? 'Kirjaudutaan...' : 'Kirjaudu sisään'}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;