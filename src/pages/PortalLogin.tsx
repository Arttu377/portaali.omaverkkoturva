import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const PortalLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // HashRouter käyttää hash-reititystä
  const currentPath = location.pathname === '/' && location.hash ? location.hash.slice(1) : location.pathname;

  console.log('PortalLogin: Render - email:', email, 'loading:', loading);
  console.log('PortalLogin: location.pathname:', location.pathname, 'location.hash:', location.hash, 'currentPath:', currentPath);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    console.log('PortalLogin: Yritetään kirjautua sisään...');
    
    const { error } = await signIn(email, password);
    
    if (!error) {
      console.log('PortalLogin: Kirjautuminen onnistui, ohjataan dashboardille...');
      // Kirjautuminen onnistui, ohjaa dashboardille
      navigate('/dashboard');
      console.log('PortalLogin: navigate() kutsuttu');
    } else {
      console.log('PortalLogin: Kirjautuminen epäonnistui:', error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">OmaVerkkoturva</h1>
        </div>

        {/* Login Form */}
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Tervetuloa!</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Sähköpostiosoite
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Syötä sähköpostiosoitteesi"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Salasana
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Kirjoita salasanasi"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Stay Logged In and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="stayLoggedIn"
                  checked={stayLoggedIn}
                  onCheckedChange={(checked) => setStayLoggedIn(checked as boolean)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <Label htmlFor="stayLoggedIn" className="ml-2 block text-sm text-gray-700">
                  Pysy kirjautuneena
                </Label>
              </div>
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-500"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Implement password recovery
                }}
              >
                Unohditko salasanasi?
              </a>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-white border border-purple-300 text-purple-600 py-3 px-4 rounded-md font-medium hover:bg-purple-50 transition-colors"
            >
              {loading ? 'Kirjaudutaan...' : 'Kirjaudu sisään'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PortalLogin;
