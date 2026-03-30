import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FinalCTA = () => (
  <section
    style={{
      background: '#0d0906',
      padding: '140px 24px 160px',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
    }}
    aria-label="Llamada a la acción final"
  >
    {/* Subtle background glow */}
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,169,110,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}
    />

    {/* Eyebrow */}
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        color: '#c9a96e',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.20em',
        textTransform: 'uppercase',
        marginBottom: '32px',
      }}
    >
      Comienza tu experiencia
    </motion.p>

    {/* Main headline with animated gold underline */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: '40px' }}
    >
      <h2
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 'clamp(36px, 6vw, 80px)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          lineHeight: 1.06,
          color: '#f5ede0',
          display: 'inline',
        }}
      >
        El chocolate
        <br />
        que{' '}
        <span style={{ position: 'relative', display: 'inline-block' }}>
          <span style={{ color: '#c9a96e' }}>mereces.</span>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '-6px',
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(to right, #c9a96e, #a07840)',
              borderRadius: '2px',
              display: 'block',
              transformOrigin: 'left',
            }}
          />
        </span>
      </h2>
    </motion.div>

    {/* Subtext */}
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.25 }}
      style={{
        color: '#7a6555',
        fontSize: 'clamp(15px, 2vw, 19px)',
        lineHeight: 1.75,
        maxWidth: '520px',
        margin: '0 auto 56px',
      }}
    >
      Regálate un momento. Regálaselo a alguien especial.
      <br />
      Charlie está hecho para que recuerdes que el placer importa.
    </motion.p>

    {/* CTA buttons */}
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}
    >
      <Link
        to="/shop"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '18px 52px',
          borderRadius: '100px',
          background: 'linear-gradient(135deg, #c9a96e 0%, #a07840 100%)',
          color: '#0a0604',
          fontWeight: 700,
          fontSize: '16px',
          letterSpacing: '0.02em',
          textDecoration: 'none',
          boxShadow: '0 8px 44px rgba(201,169,110,0.35)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 60px rgba(201,169,110,0.55)';
          (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 44px rgba(201,169,110,0.35)';
          (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
        }}
      >
        Explorar la tienda
      </Link>

      <Link
        to="/gifts"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '18px 44px',
          borderRadius: '100px',
          border: '1px solid rgba(201,169,110,0.3)',
          color: '#c9a96e',
          fontWeight: 600,
          fontSize: '16px',
          letterSpacing: '0.02em',
          textDecoration: 'none',
          background: 'transparent',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,169,110,0.7)';
          (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(201,169,110,0.06)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,169,110,0.3)';
          (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
        }}
      >
        Crear un regalo
      </Link>
    </motion.div>

    {/* Bottom footnote */}
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.8, duration: 0.6 }}
      style={{
        marginTop: '56px',
        color: '#3a2e24',
        fontSize: '13px',
        letterSpacing: '0.04em',
      }}
    >
      Envío gratuito a partir de €49 · Entrega en Madrid el mismo día
    </motion.p>
  </section>
);

export default FinalCTA;
