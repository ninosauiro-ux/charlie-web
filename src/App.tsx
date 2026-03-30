import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import FloatingActions from '@/components/FloatingActions';
import HomePage from '@/pages/HomePage';
import NotFound from "./pages/NotFound.tsx";

const ShopPage = lazy(() => import('@/pages/ShopPage'));
const ProductPage = lazy(() => import('@/pages/ProductPage'));
const GiftsPage = lazy(() => import('@/pages/GiftsPage'));
const SubscriptionsPage = lazy(() => import('@/pages/SubscriptionsPage'));
const CorporatePage = lazy(() => import('@/pages/CorporatePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const FAQPage = lazy(() => import('@/pages/FAQPage'));
const LegalPage = lazy(() => import('@/pages/LegalPage'));

const queryClient = new QueryClient();

const Loading = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0604' }}>
    <div style={{
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      border: '2px solid #c9a96e',
      borderTopColor: 'transparent',
      animation: 'spin 0.8s linear infinite',
    }} />
  </div>
);

const AppShell = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      {/* PromoBar: hidden on home (dark luxury page), shown on other pages */}
      {!isHome && (
        <div className="bg-primary text-primary-foreground h-[38px] flex items-center justify-center z-[60] relative">
          <p className="ui-label text-primary-foreground/90 text-center px-4">
            Envío gratuito desde €49 · Entrega en Madrid el mismo día · Packaging regalo incluido
          </p>
        </div>
      )}
      <Navbar />
      <CartDrawer />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/gifts" element={<GiftsPage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/corporate" element={<CorporatePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/legal/notice" element={<LegalPage page="notice" />} />
          <Route path="/legal/privacy" element={<LegalPage page="privacy" />} />
          <Route path="/legal/cookies" element={<LegalPage page="cookies" />} />
          <Route path="/legal/terms" element={<LegalPage page="terms" />} />
          <Route path="/legal/shipping" element={<LegalPage page="shipping" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <FloatingActions />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
