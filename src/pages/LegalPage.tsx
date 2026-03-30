import { useSEO } from '@/lib/seo';
import SectionHeading from '@/components/SectionHeading';

const pages: Record<string, { title: string; seoTitle: string; content: string }> = {
  notice: { title: 'Legal Notice', seoTitle: 'Legal Notice | Charlie Chocolate', content: 'Charlie Chocolate Atelier S.L. — CIF: B12345678 — Registered in Madrid. Calle del Chocolate, 17, 28013 Madrid, Spain. Contact: hola@charliechocolate.es / +34 910 24 77 19.' },
  privacy: { title: 'Privacy Policy', seoTitle: 'Privacy Policy | Charlie Chocolate', content: 'We collect personal data (name, email, address) solely for order processing and communication. Data is stored securely and never shared with third parties for marketing. You may request data deletion at any time by contacting hola@charliechocolate.es.' },
  cookies: { title: 'Cookies Policy', seoTitle: 'Cookies Policy | Charlie Chocolate', content: 'This website uses essential cookies for functionality and analytics cookies to improve your experience. You can manage cookie preferences in your browser settings.' },
  terms: { title: 'Terms & Conditions', seoTitle: 'Terms & Conditions | Charlie Chocolate', content: 'All prices are in EUR and include applicable taxes. Orders are confirmed via email. Payment is processed securely at checkout. By placing an order, you agree to these terms.' },
  shipping: { title: 'Shipping & Returns', seoTitle: 'Shipping & Returns | Charlie Chocolate', content: 'Madrid same-day delivery for orders before 12:00 (€4.90, free over €49). Spain mainland: 24–48h (€5.90, free over €49). Returns accepted within 14 days for unopened products. Contact hola@charliechocolate.es to initiate a return.' },
};

const LegalPage = ({ page }: { page: string }) => {
  const p = pages[page] || pages.notice;
  useSEO({ title: p.seoTitle, description: `${p.title} for Charlie Chocolate Atelier S.L., Madrid.`, path: `/legal/${page}` });

  return (
    <main className="section-ivory noise-overlay min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 py-14 md:py-20 lg:py-28">
        <SectionHeading title={p.title} />
        <div className="max-w-3xl mx-auto bg-card rounded-3xl p-8 md:p-10 card-shadow">
          <p className="body-large text-muted-foreground leading-relaxed">{p.content}</p>
        </div>
      </div>
    </main>
  );
};

export default LegalPage;
