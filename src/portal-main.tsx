import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import PortalApp from './PortalApp.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <PortalApp />
  </HelmetProvider>
);
