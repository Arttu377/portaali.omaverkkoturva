
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { ShoppingCartProvider } from "@/contexts/ShoppingCartContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FireCatProject from "./pages/FireCatProject";
import SportRetailProject from "./pages/SportRetailProject";
import WorkwearProject from "./pages/WorkwearProject";
import HockeyProject from "./pages/HockeyProject";
import PetProject from "./pages/PetProject";
import TechDetails from "./pages/TechDetails";
import DevelopmentProcess from "./pages/DevelopmentProcess";
import About from "./pages/About";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Blog from "./pages/Blog";
import BlogPostDetail from "./pages/BlogPostDetail";
import Identiteettiturva from "./pages/Identiteettiturva";
import Irtisanomislomake from "./pages/Irtisanomislomake";
import Contact from "./pages/Contact";
import { LogoTool } from "./pages/LogoTool";
import Verkkokauppa from "./pages/Verkkokauppa";
import AdminPortal from "./pages/AdminPortal";
import Dashboard from "./pages/Dashboard";
import ConfirmOrder from "./pages/ConfirmOrder";
import OrderOverview from "./pages/OrderOverview";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ShoppingCartProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects/firecat" element={<FireCatProject />} />
            <Route path="/projects/sport-retail" element={<SportRetailProject />} />
            <Route path="/projects/workwear" element={<WorkwearProject />} />
            <Route path="/projects/hockey" element={<HockeyProject />} />
            <Route path="/projects/pet-tracker" element={<PetProject />} />
            <Route path="/tech-details" element={<TechDetails />} />
            <Route path="/development-process" element={<DevelopmentProcess />} />
            <Route path="/about" element={<About />} />
            <Route path="/meista" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
            <Route path="/identiteettiturva" element={<Identiteettiturva />} />
            <Route path="/verkkokauppa" element={<Verkkokauppa />} />
            <Route path="/irtisanomislomake" element={<Irtisanomislomake />} />
            <Route path="/ota-yhteytta" element={<Contact />} />
            <Route path="/logo-tool" element={<LogoTool />} />
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tilaukset" element={<OrderOverview />} />
            <Route path="/confirm-order/:token" element={<ConfirmOrder />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
          </TooltipProvider>
        </ShoppingCartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
