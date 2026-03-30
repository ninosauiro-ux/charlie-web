import { useSEO } from '@/lib/seo';
import HeroAnimation from '@/components/HeroAnimation';
import FeaturesSection from '@/components/FeaturesSection';
import StorySection from '@/components/StorySection';
import ProductHighlight from '@/components/ProductHighlight';
import FinalCTA from '@/components/FinalCTA';

const HomePage = () => {
  useSEO({
    title: 'Charlie — Chocolate Artesanal de Lujo · Madrid',
    description:
      'Descubre Charlie: chocolate artesanal de cacao de origen único, elaborado a mano en pequeños lotes en Madrid. Bombones, tabletas y cajas regalo de alta gama.',
    path: '/',
  });

  return (
    <main style={{ background: '#0a0604' }}>
      <HeroAnimation />
      <FeaturesSection />
      <StorySection />
      <ProductHighlight />
      <FinalCTA />
    </main>
  );
};

export default HomePage;
