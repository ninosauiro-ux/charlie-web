import { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─── Frame filename builder ───────────────────────────────────────────────────
const TOTAL_FRAMES = 40;
const FRAME_BASE =
  'Firefly A smooth cinematic transition where a luxury chocolate box slowly opens in an elegant and re_';

function frameUrl(index: number): string {
  const padded = String(index).padStart(3, '0');
  return `/images/${FRAME_BASE}${padded}.jpg`;
}

// ─── Component ─────────────────────────────────────────────────────────────────
const HeroAnimation = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const imagesLoadedRef = useRef(0);

  // ─── Preload all frames ─────────────────────────────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameUrl(i);
      img.onload = () => {
        imagesLoadedRef.current += 1;
        // Render first frame as soon as it arrives
        if (i === 0) renderFrame(img);
      };
      images.push(img);
    }
    framesRef.current = images;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ─── Draw a frame onto canvas (cover-fit) ──────────────────────────────────
  const renderFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img.naturalWidth) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Object-fit: cover math
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  // ─── Resize handler ────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const syncSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      // Re-render current frame after resize
      const frame = framesRef.current[currentFrameRef.current];
      if (frame) renderFrame(frame);
    };

    syncSize();
    const ro = new ResizeObserver(syncSize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [renderFrame]);

  // ─── Scroll-driven animation ────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Show the final (open) frame as static
      const lastImg = framesRef.current[TOTAL_FRAMES - 1];
      if (lastImg) renderFrame(lastImg);
      return;
    }

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportH = window.innerHeight;

      // Progress from 0 (section top at viewport bottom) to 1 (section bottom at viewport top)
      const scrolled = -rect.top;
      const totalScrollable = sectionHeight - viewportH;
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

      const frameIndex = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1,
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          const img = framesRef.current[frameIndex];
          if (img && img.complete) renderFrame(img);
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [renderFrame]);

  // ─── Framer Motion: text parallax driven by scroll ─────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.25], ['0%', '-15%']);

  return (
    // 300vh tall section gives ~3 screens of scroll for cinematic pacing
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '300vh' }}
      aria-label="Hero — Descubre Charlie"
    >
      {/* ── Sticky wrapper ── */}
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: '#0a0604' }}>
        {/* Canvas animation */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
          style={{ display: 'block' }}
        />

        {/* Top dark fade — keeps top area readable */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: '38%',
            background: 'linear-gradient(to bottom, rgba(10,6,4,0.82) 0%, rgba(10,6,4,0.3) 70%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Bottom dark band — text sits on this */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '45%',
            background: 'linear-gradient(to top, rgba(10,6,4,0.97) 0%, rgba(10,6,4,0.85) 40%, rgba(10,6,4,0.4) 75%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* ── TOP text block: brand eyebrow + headline ── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center text-center px-6 pt-10"
        >
          {/* Brand eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              color: '#c9a96e',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Artesanal · Madrid · Desde siempre
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'clamp(36px, 6vw, 88px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#f5ede0',
              textShadow: '0 4px 40px rgba(10,6,4,0.9)',
            }}
          >
            El placer{' '}
            <span style={{ color: '#c9a96e' }}>hecho chocolate.</span>
          </motion.h1>
        </motion.div>

        {/* ── BOTTOM text block: CTA + scroll hint ── */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center text-center px-6 pb-8"
        >
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: '24px' }}
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 font-semibold transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #c9a96e 0%, #a07840 100%)',
                color: '#0a0604',
                padding: '15px 40px',
                borderRadius: '100px',
                fontSize: '14px',
                letterSpacing: '0.04em',
                boxShadow: '0 8px 40px rgba(201,169,110,0.35)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 55px rgba(201,169,110,0.55)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 40px rgba(201,169,110,0.35)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              }}
            >
              Descubrir Charlie
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
          >
            <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4a3a2a' }}>
              Desplázate
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            >
              <svg width="18" height="26" viewBox="0 0 20 28" fill="none">
                <rect x="1" y="1" width="18" height="26" rx="9" stroke="#4a3a2a" strokeWidth="1.4" />
                <motion.rect
                  x="9" y="6" width="2" height="5" rx="1" fill="#c9a96e"
                  animate={{ y: [0, 4, 0], opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroAnimation;
