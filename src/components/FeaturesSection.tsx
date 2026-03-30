import { motion } from 'framer-motion';

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 4C9.37 4 4 9.37 4 16s5.37 12 12 12 12-5.37 12-12S22.63 4 16 4zm0 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S6 21.52 6 16 10.48 6 16 6zm0 4a6 6 0 100 12A6 6 0 0016 10zm0 2a4 4 0 110 8 4 4 0 010-8z"
          fill="currentColor"
        />
      </svg>
    ),
    title: 'Chocolate Artesanal Premium',
    body:
      'Elaborado en pequeños lotes con cacao de origen único, seleccionado en origen por su complejidad aromática y su pureza excepcional.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 2l2.83 8.7H28l-7.42 5.39 2.83 8.7L16 19.4l-7.42 5.39 2.83-8.7L4 10.7h9.17L16 2z"
          fill="currentColor"
        />
      </svg>
    ),
    title: 'Ingredientes Naturales Exóticos',
    body:
      'Cada sabor nace de la naturaleza: flores salvajes, especias raras, frutas exóticas. Sin artificios. Sin compromisos. Solo materia prima extraordinaria.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 4C9.373 4 4 9.373 4 16c0 3.72 1.61 7.06 4.18 9.38l1.44-1.44A9.95 9.95 0 016 16c0-5.52 4.48-10 10-10s10 4.48 10 10a9.95 9.95 0 01-3.62 7.94l1.44 1.44C26.39 23.06 28 19.72 28 16c0-6.627-5.373-12-12-12zm0 4a8 8 0 00-6.3 12.94L11.06 19.6A5.98 5.98 0 0110 16a6 6 0 1111.3 2.9l1.36 1.36A8 8 0 0016 8z"
          fill="currentColor"
        />
      </svg>
    ),
    title: 'Experiencia Sensorial Gourmet',
    body:
      'Un ritual para los sentidos. Cada bocado está diseñado para descomponerse lentamente, revelando capas de sabor que perduran mucho después.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const FeaturesSection = () => (
  <section
    style={{ background: '#0d0906', padding: '120px 0 130px' }}
    aria-label="Características premium"
  >
    {/* Section label */}
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        textAlign: 'center',
        color: '#c9a96e',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.20em',
        textTransform: 'uppercase',
        marginBottom: '24px',
      }}
    >
      Lo que nos define
    </motion.p>

    {/* Section heading */}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        textAlign: 'center',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 'clamp(32px, 5vw, 58px)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        color: '#f5ede0',
        marginBottom: '80px',
        padding: '0 24px',
        lineHeight: 1.1,
      }}
    >
      La obsesión<br />
      <span style={{ color: '#c9a96e' }}>por el detalle.</span>
    </motion.h2>

    {/* Cards */}
    <div
      style={{
        maxWidth: '1160px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
      }}
    >
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
            border: '1px solid rgba(201,169,110,0.14)',
            borderRadius: '24px',
            padding: '48px 40px',
            cursor: 'default',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'rgba(201,169,110,0.10)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '28px',
              color: '#c9a96e',
            }}
          >
            {f.icon}
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: '22px',
              color: '#f5ede0',
              marginBottom: '16px',
              letterSpacing: '-0.01em',
            }}
          >
            {f.title}
          </h3>

          {/* Body */}
          <p style={{ color: '#7a6555', fontSize: '16px', lineHeight: 1.75 }}>
            {f.body}
          </p>

          {/* Bottom accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.15 + 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              marginTop: '36px',
              height: '1px',
              background: 'linear-gradient(to right, #c9a96e, transparent)',
              transformOrigin: 'left',
            }}
          />
        </motion.div>
      ))}
    </div>
  </section>
);

export default FeaturesSection;
