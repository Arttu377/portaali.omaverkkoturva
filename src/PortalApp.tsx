import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { ShoppingCartProvider } from "@/contexts/ShoppingCartContext";
import PortalAuthGuard from "@/components/PortalAuthGuard";
import PortalLogin from "./pages/PortalLogin";
import Dashboard from "./pages/Dashboard";
import AdminPortal from "./pages/AdminPortal";
import OrderOverview from "./pages/OrderOverview";
import UnconfirmedOrders from "./pages/UnconfirmedOrders";
import ConfirmedOrders from "./pages/ConfirmedOrders";
import OrderConfirmation from "./pages/OrderConfirmation";
import Portaalinverkkokauppa from "./pages/Portaalinverkkokauppa";
import NotFound from "./pages/NotFound";

const PortalApp = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ShoppingCartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <HashRouter>
              <PortalAuthGuard>
                <Routes>
                  <Route path="/" element={<PortalLogin />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/admin" element={<AdminPortal />} />
                  <Route path="/verkkokauppa" element={<Portaalinverkkokauppa />} />
                  <Route path="/tilaukset" element={<OrderOverview />} />
                  <Route path="/tilaukset/vahvistamattomat" element={<UnconfirmedOrders />} />
                  <Route path="/tilaukset/vahvistetut" element={<ConfirmedOrders />} />
                  <Route path="/vahvista-tilaus/:token" element={<OrderConfirmation />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PortalAuthGuard>
            </HashRouter>
          </TooltipProvider>
        </ShoppingCartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default PortalApp;
