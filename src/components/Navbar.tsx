import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCartContext } from '@/contexts/CartContext';

const navLinks = [
  { to: '/shop', label: 'Tienda' },
  { to: '/gifts', label: 'Regalos' },
  { to: '/subscriptions', label: 'Suscripciones' },
  { to: '/about', label: 'Nosotros' },
  { to: '/contact', label: 'Contacto' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen } = useCartContext();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    setScrolled(window.scrollY > 60);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  // Colour tokens based on route + scroll
  const navBg = isHome
    ? scrolled
      ? 'rgba(10,6,4,0.88)'
      : 'rgba(10,6,4,0.0)'
    : scrolled
    ? 'rgba(255,251,246,0.92)'
    : 'rgba(255,251,246,0.55)';

  const textColor = isHome ? '#f5ede0' : '#1a120a';
  const linkColor = isHome ? 'rgba(245,237,224,0.7)' : 'rgba(26,18,10,0.7)';
  const borderColor = isHome && !scrolled
    ? 'transparent'
    : isHome
    ? 'rgba(201,169,110,0.12)'
    : 'rgba(0,0,0,0.06)';

  return (
    <>
      <motion.nav
        className="sticky top-0 z-50"
        animate={{
          backgroundColor: navBg,
          height: scrolled ? 64 : 80,
          boxShadow: scrolled
            ? isHome
              ? '0 1px 0 rgba(201,169,110,0.10), 0 8px 32px rgba(0,0,0,0.4)'
              : '0 1px 0 rgba(0,0,0,0.06), 0 8px 24px rgba(18,10,8,0.08)'
            : 'none',
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
          borderBottom: `1px solid ${borderColor}`,
        }}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div
          style={{
            maxWidth: '1160px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            padding: '0 24px',
          }}
        >
          {/* ── Logo ── */}
          <Link to="/" aria-label="Charlie — inicio" style={{ textDecoration: 'none' }}>
            <div style={{ color: textColor }}>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 800,
                  fontSize: '20px',
                  letterSpacing: '-0.02em',
                  display: 'block',
                  lineHeight: 1.1,
                }}
              >
                Charlie
              </span>
              <span
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  display: 'block',
                  color: '#c9a96e',
                  fontWeight: 600,
                  marginTop: '2px',
                }}
              >
                Chocolate Artesanal
              </span>
            </div>
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '32px' }}>
            {navLinks.map(link => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.03em',
                    color: isActive ? '#c9a96e' : linkColor,
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = '#c9a96e')
                  }
                  onMouseLeave={e =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = isActive
                      ? '#c9a96e'
                      : linkColor)
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ── Right cluster ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {/* Cart */}
            <button
              onClick={() => setIsOpen(true)}
              aria-label={`Carrito con ${totalItems} artículos`}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '50%',
                position: 'relative',
                color: textColor,
                transition: 'color 0.2s',
              }}
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    background: '#c9a96e',
                    color: '#0a0604',
                    fontSize: '10px',
                    fontWeight: 800,
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Hamburger (mobile only) */}
            <button
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Abrir menú"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                color: textColor,
              }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 40,
              background: 'rgba(10,6,4,0.97)',
              backdropFilter: 'blur(24px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Cerrar menú"
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#f5ede0',
              }}
            >
              <X size={26} />
            </button>

            {/* Brand */}
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.20em',
                color: '#c9a96e',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: '40px',
              }}
            >
              Charlie
            </p>

            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    textDecoration: 'none',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '34px',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: location.pathname === link.to ? '#c9a96e' : '#f5ede0',
                    display: 'block',
                    padding: '10px 0',
                    textAlign: 'center',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.48 }}
              style={{ marginTop: '44px' }}
            >
              <Link
                to="/shop"
                onClick={() => setMobileOpen(false)}
                style={{
                  textDecoration: 'none',
                  display: 'inline-block',
                  padding: '14px 36px',
                  borderRadius: '100px',
                  background: 'linear-gradient(135deg, #c9a96e 0%, #a07840 100%)',
                  color: '#0a0604',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: '15px',
                  letterSpacing: '0.02em',
                }}
              >
                Explorar tienda
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
