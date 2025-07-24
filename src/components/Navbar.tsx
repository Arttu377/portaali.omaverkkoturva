
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ProcessedLogo } from './ProcessedLogo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    // If we're not on the home page, navigate there first
    if (window.location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 w-full" initial={{
      opacity: 1,
      y: 0
    }} animate={{
      opacity: 1,
      y: 0
    }}>
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              {/* WiFi Logo with background removal */}
              <ProcessedLogo 
                originalImageUrl="/lovable-uploads/296f9efc-c5a2-4029-bb1d-02f258233174.png"
                alt="WiFi Logo"
                width={40}
                height={40}
                className="flex-shrink-0"
              />
              <span className="text-xl font-bold text-white">
                OmaVerkkoturva
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu className="text-white">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-white hover:text-gray-200 bg-transparent hover:bg-white/10")}>
                      Etusivu
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white hover:text-gray-200 bg-transparent hover:bg-white/10">
                    Tuotteet
                  </NavigationMenuTrigger>
                   <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[300px] bg-white shadow-lg border rounded-md">
                      <li>
                        <Link to="/identiteettiturva" className="block p-3 space-y-1 rounded-md hover:bg-gray-100">
                          <div className="font-medium text-gray-900">Identiteettiturva</div>
                          <p className="text-sm text-gray-500">Suojaa henkilöllisyytesi verkossa</p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/meista">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-white hover:text-gray-200 bg-transparent hover:bg-white/10")}>
                      Meistä
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/artikkelit">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-white hover:text-gray-200 bg-transparent hover:bg-white/10")}>
                      Artikkelit
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/ota-yhteytta">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-white hover:text-gray-200 bg-transparent hover:bg-white/10")}>
                      Ota yhteyttä
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/kirjaudu">
                    <button className="px-4 py-2 rounded-md transition-colors font-medium bg-blue-600 text-white hover:bg-blue-700">
                      Kirjaudu
                    </button>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={cn("md:hidden transition-all duration-300 overflow-hidden w-full", isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0")}>
        <div className="px-3 pt-2 pb-3 space-y-1 shadow-sm overflow-y-auto max-h-80 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950">
          <Link to="/" className="block px-3 py-1.5 rounded-md text-sm text-white hover:bg-white/10" onClick={() => {
            setIsMenuOpen(false);
            window.scrollTo(0, 0);
          }}>
            Etusivu
          </Link>
          
          <Link to="/identiteettiturva" className="block px-3 py-1.5 rounded-md text-sm text-white hover:bg-white/10" onClick={() => {
            setIsMenuOpen(false);
            window.scrollTo(0, 0);
          }}>
            Identiteettiturva
          </Link>
          
          
          <Link to="/meista" className="block px-3 py-1.5 rounded-md text-sm text-white hover:bg-white/10" onClick={() => {
            setIsMenuOpen(false);
            window.scrollTo(0, 0);
          }}>
            Meistä
          </Link>
          
          <Link to="/artikkelit" className="block px-3 py-1.5 rounded-md text-sm text-white hover:bg-white/10" onClick={() => {
            setIsMenuOpen(false);
            window.scrollTo(0, 0);
          }}>
            Artikkelit
          </Link>
          
          <Link to="/ota-yhteytta" className="block px-3 py-1.5 rounded-md text-sm text-white hover:bg-white/10" onClick={() => {
            setIsMenuOpen(false);
            window.scrollTo(0, 0);
          }}>
            Ota yhteyttä
          </Link>
          
          <Link to="/kirjaudu" className="block px-3 py-1.5 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700" onClick={() => {
            setIsMenuOpen(false);
            window.scrollTo(0, 0);
          }}>
            Kirjaudu
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
