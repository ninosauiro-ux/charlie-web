import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone, Mail } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

const footerLinks = [
  { to: '/shop', label: 'Shop' },
  { to: '/gifts', label: 'Gifts' },
  { to: '/subscriptions', label: 'Subscriptions' },
  { to: '/corporate', label: 'Corporate' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/faq', label: 'FAQ' },
];

const legalLinks = [
  { to: '/legal/notice', label: 'Legal Notice' },
  { to: '/legal/privacy', label: 'Privacy Policy' },
  { to: '/legal/cookies', label: 'Cookies' },
  { to: '/legal/terms', label: 'Terms' },
  { to: '/legal/shipping', label: 'Shipping & Returns' },
];

const Footer = () => (
  <footer className="section-dark noise-overlay relative" role="contentinfo">
    {/* Top gradient border */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-caramel via-gold to-berry" />

    <div className="max-w-wide mx-auto px-4 md:px-6 py-14 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="font-heading font-bold text-lg text-text-on-dark mb-2">Charlie Chocolate</h3>
          <p className="body-small text-text-on-dark/70 mb-4">Artisan Chocolate Atelier</p>
          <div className="flex items-start gap-2 body-small text-text-on-dark/70 mb-2">
            <MapPin size={14} className="mt-0.5 flex-shrink-0" />
            <span>Calle del Chocolate, 17, 28013 Madrid</span>
          </div>
          <div className="flex items-center gap-2 body-small text-text-on-dark/70 mb-2">
            <Phone size={14} />
            <a href="tel:+34910247719" className="hover:text-gold transition-colors">+34 910 24 77 19</a>
          </div>
          <div className="flex items-center gap-2 body-small text-text-on-dark/70">
            <Mail size={14} />
            <a href="mailto:hola@charliechocolate.es" className="hover:text-gold transition-colors">hola@charliechocolate.es</a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="ui-label text-text-on-dark/90 mb-4">Explore</h4>
          <ul className="space-y-2">
            {footerLinks.map(link => (
              <li key={link.to}>
                <Link to={link.to} className="body-small text-text-on-dark/70 hover:text-gold transition-colors">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="ui-label text-text-on-dark/90 mb-4">Follow us</h4>
          <div className="flex gap-3">
            <a href="https://instagram.com/charliechocolate.es" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-text-on-dark/10 hover:bg-gold/20 transition-colors" aria-label="Instagram">
              <Instagram size={18} className="text-text-on-dark" />
            </a>
          </div>
          <p className="body-small text-text-on-dark/50 mt-4">@charliechocolate.es</p>
          <p className="body-small text-text-on-dark/50">TikTok: @charliechocolate</p>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="ui-label text-text-on-dark/90 mb-4">Newsletter</h4>
          <p className="body-small text-text-on-dark/70 mb-3">Seasonal drops and subscriber-only offers.</p>
          <NewsletterForm variant="footer" />
        </div>
      </div>

      {/* Legal */}
      <div className="mt-12 pt-6 border-t border-text-on-dark/10">
        <div className="flex flex-wrap gap-4 mb-4">
          {legalLinks.map(link => (
            <Link key={link.to} to={link.to} className="body-small text-text-on-dark/50 hover:text-gold transition-colors">{link.label}</Link>
          ))}
        </div>
        <p className="body-small text-text-on-dark/40">
          Charlie Chocolate Atelier S.L. — Calle del Chocolate, 17, 28013 Madrid — +34 910 24 77 19
        </p>
      </div>
    </div>

    {/* JSON-LD */}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': ['Organization', 'LocalBusiness'],
      name: 'Charlie Chocolate',
      legalName: 'Charlie Chocolate Atelier S.L.',
      url: 'https://charliechocolate.es',
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
    }) }} />
  </footer>
);

export default Footer;
