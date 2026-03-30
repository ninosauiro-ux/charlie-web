import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const pillars = ['Origen', 'Maestría', 'Pureza', 'Emoción'];

const StorySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'linear-gradient(180deg, #0d0906 0%, #120c08 40%, #1a1008 100%)',
        padding: '130px 0 140px',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Nuestra filosofía"
    >
      {/* Background decorative circle */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1160px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '80px',
          alignItems: 'center',
        }}
      >
        {/* ── Left: pull quote ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            style={{
              color: '#c9a96e',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              marginBottom: '32px',
            }}
          >
            Nuestra filosofía
          </p>

          <blockquote
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              color: '#f5ede0',
              marginBottom: '48px',
            }}
          >
            "No hacemos
            <br />
            <span style={{ color: '#c9a96e' }}>chocolates.</span>
            <br />
            Creamos recuerdos."
          </blockquote>

          {/* Animated separator line */}
          <motion.div
            style={{
              height: '1px',
              background: 'linear-gradient(to right, #c9a96e, transparent)',
              scaleX: lineScale,
              transformOrigin: 'left',
              marginBottom: '40px',
            }}
          />

          {/* Pillars row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {pillars.map((p, i) => (
              <motion.span
                key={p}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                style={{
                  padding: '8px 20px',
                  borderRadius: '100px',
                  border: '1px solid rgba(201,169,110,0.3)',
                  color: '#c9a96e',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                {p}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ── Right: narrative ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Large ornamental number */}
          <p
            aria-hidden="true"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '120px',
              fontWeight: 900,
              color: 'rgba(201,169,110,0.07)',
              lineHeight: 1,
              margin: '0 0 -30px -8px',
              userSelect: 'none',
            }}
          >
            01
          </p>

          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.85,
              color: '#7a6555',
              marginBottom: '32px',
            }}
          >
            En Charlie, el chocolate no es un producto. Es una declaración de
            intenciones. Cada tableta, cada bombón, cada caja nace de un proceso
            lento e intencional que empieza en las plantas de cacao más
            selectas del mundo.
          </p>

          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.85,
              color: '#7a6555',
              marginBottom: '40px',
            }}
          >
            Nuestros maestros chocolateros trabajan con las manos, con el
            tiempo y con la obsesión silenciosa de quien sabe que la perfección
            no se fabrica: se cultiva.
          </p>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {[
              { num: '12+', label: 'Orígenes de cacao' },
              { num: '40h', label: 'Por cada lote artesanal' },
              { num: '0', label: 'Aditivos artificiales' },
              { num: '∞', label: 'Placer en cada bocado' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
              >
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '36px',
                    fontWeight: 800,
                    color: '#c9a96e',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    marginBottom: '6px',
                  }}
                >
                  {stat.num}
                </p>
                <p style={{ fontSize: '13px', color: '#5a4a38', letterSpacing: '0.02em' }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StorySection;
