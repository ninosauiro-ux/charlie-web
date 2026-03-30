import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// The fully-opened box frame (frame 039)
const OPEN_BOX_FRAME =
  '/images/Firefly A smooth cinematic transition where a luxury chocolate box slowly opens in an elegant and re_039.jpg';

const ProductHighlight = () => (
  <section
    style={{
      background: '#0a0604',
      padding: '120px 0 130px',
      position: 'relative',
      overflow: 'hidden',
    }}
    aria-label="Destacado de producto"
  >
    {/* Radial gold glow behind product */}
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '900px',
        height: '900px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,169,110,0.12) 0%, rgba(160,120,64,0.04) 50%, transparent 70%)',
        pointerEvents: 'none',
      }}
    />

    <div
      style={{
        maxWidth: '1160px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
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
          marginBottom: '24px',
        }}
      >
        La colección signature
      </motion.p>

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 'clamp(30px, 4.5vw, 56px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: '#f5ede0',
          lineHeight: 1.1,
          maxWidth: '700px',
          marginBottom: '72px',
        }}
      >
        Una caja que es,{' '}
        <span style={{ color: '#c9a96e' }}>en sí misma, un regalo.</span>
      </motion.h2>

      {/* Product image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 32 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '820px',
          borderRadius: '32px',
          overflow: 'hidden',
          boxShadow: '0 40px 120px rgba(201,169,110,0.18), 0 0 0 1px rgba(201,169,110,0.10)',
        }}
      >
        <img
          src={OPEN_BOX_FRAME}
          alt="Caja de chocolates Charlie abierta — la colección signature"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            aspectRatio: '16/10',
            objectFit: 'cover',
          }}
          loading="lazy"
        />

        {/* Gradient overlay at bottom */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to top, rgba(10,6,4,0.75), transparent)',
          }}
        />

        {/* Bottom text overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '40px',
            right: '40px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '22px',
                fontWeight: 700,
                color: '#f5ede0',
                marginBottom: '4px',
              }}
            >
              Caja Signature
            </p>
            <p style={{ color: '#a08060', fontSize: '14px' }}>16 piezas · Edición limitada</p>
          </div>
          <Link
            to="/shop"
            style={{
              padding: '12px 28px',
              borderRadius: '100px',
              border: '1px solid rgba(201,169,110,0.5)',
              color: '#c9a96e',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              backdropFilter: 'blur(8px)',
              background: 'rgba(201,169,110,0.08)',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(201,169,110,0.18)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,169,110,0.8)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(201,169,110,0.08)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,169,110,0.5)';
            }}
          >
            Ver colección
          </Link>
        </div>
      </motion.div>

      {/* Detail chips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginTop: '48px',
          justifyContent: 'center',
        }}
      >
        {[
          'Cacao 72% Madagascar',
          'Caramelo de flor de sal',
          'Praliné de avellana',
          'Ganache de Yuzu',
        ].map(label => (
          <span
            key={label}
            style={{
              padding: '10px 22px',
              borderRadius: '100px',
              border: '1px solid rgba(255,255,255,0.07)',
              color: '#7a6555',
              fontSize: '13px',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            {label}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ProductHighlight;
