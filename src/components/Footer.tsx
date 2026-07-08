import { Phone, Mail, Clock, MapPin, Heart } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onAdminClick: () => void;
}

export default function Footer({ onAdminClick }: FooterProps) {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-blue-deep text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo variant="light" size="md" />
            <p className="mt-4 text-gray-300 text-sm leading-relaxed">
              Compassionate, high-quality home-based healthcare services empowering individuals
              to live fulfilling lives in the comfort of their homes.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-gray-300">
              <Clock size={15} className="text-gold flex-shrink-0" />
              <span>Mon–Sat: 8:00 AM – 5:00 PM</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-base">Our Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {[
                'Home-Based Nursing Care',
                'Specialized Care',
                'Hospital Equipment Rental',
                'Allied Health Services',
                'Personal Care Assistance',
                'Post-natal Care',
              ].map((s) => (
                <li key={s}>
                  <button
                    onClick={() => handleNav('#services')}
                    className="hover:text-gold transition-colors"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-base">Service Areas</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {[
                'Nairobi & Surroundings',
                'Kitengela Town',
                'Machakos County',
                'Makueni County',
                'All Kenya (on request)',
              ].map((area) => (
                <li key={area} className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-teal flex-shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-base">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+254722967792" className="flex items-start gap-2 text-gray-300 hover:text-gold transition-colors">
                  <Phone size={15} className="mt-0.5 flex-shrink-0" />
                  +254 722 967 792
                </a>
              </li>
              <li>
                <a href="tel:+254740540516" className="flex items-start gap-2 text-gray-300 hover:text-gold transition-colors">
                  <Phone size={15} className="mt-0.5 flex-shrink-0" />
                  +254 740 540 516
                </a>
              </li>
              <li>
                <a href="tel:+254719184092" className="flex items-start gap-2 text-gray-300 hover:text-gold transition-colors">
                  <Phone size={15} className="mt-0.5 flex-shrink-0" />
                  +254 719 184 092
                </a>
              </li>
              <li>
                <a href="mailto:pruviahomecare@gmail.com" className="flex items-start gap-2 text-gray-300 hover:text-gold transition-colors">
                  <Mail size={15} className="mt-0.5 flex-shrink-0" />
                  pruviahomecare@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white border-opacity-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <p className="flex items-center gap-1">
            &copy; {new Date().getFullYear()} Pruvia Home-Based Care. Made with{' '}
            <Heart size={13} className="text-red-400 fill-red-400" /> in Nairobi, Kenya.
          </p>
          <button
            onClick={onAdminClick}
            className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
          >
            Staff Portal
          </button>
        </div>
      </div>
    </footer>
  );
}
