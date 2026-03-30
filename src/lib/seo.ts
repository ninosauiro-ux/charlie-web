import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  path: string;
}

const BASE_URL = 'https://charliechocolate.es';

export const useSEO = ({ title, description, path }: SEOProps) => {
  useEffect(() => {
    document.title = title;
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(name.startsWith('og:') || name.startsWith('twitter:') ? 'property' : 'name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    setMeta('description', description);
    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:type', 'website');
    setMeta('og:url', `${BASE_URL}${path}`);
    setMeta('og:locale', 'en_US');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = `${BASE_URL}${path}`;
  }, [title, description, path]);
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: 'Charlie Chocolate',
  legalName: 'Charlie Chocolate Atelier S.L.',
  url: BASE_URL,
  telephone: '+34 910 24 77 19',
  email: 'hola@charliechocolate.es',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle del Chocolate, 17',
    addressLocality: 'Madrid',
    postalCode: '28013',
    addressCountry: 'ES',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '10:00', closes: '20:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '11:00', closes: '21:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '11:00', closes: '18:00' },
  ],
};
