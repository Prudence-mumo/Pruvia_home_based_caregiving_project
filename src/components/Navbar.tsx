import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  onAdminClick: () => void;
}

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Our Team', href: '#team' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onAdminClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Logo variant={scrolled ? 'dark' : 'light'} size="md" />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className={`text-sm font-medium transition-colors duration-200 hover:text-gold ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+254722967792"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
              scrolled ? 'text-blue-deep' : 'text-white'
            }`}
          >
            <Phone size={15} />
            +254 722 967 792
          </a>
          <button
            onClick={() => {
              setMenuOpen(false);
              handleNav('#booking');
            }}
            className="btn-primary text-sm py-2.5 px-5"
          >
            Book Now
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-blue-deep' : 'text-white'}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="w-full text-left px-3 py-2.5 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-gray-100 mt-2 space-y-2">
            <a
              href="tel:+254722967792"
              className="flex items-center gap-2 px-3 py-2.5 text-blue-deep font-medium"
            >
              <Phone size={16} />
              +254 722 967 792
            </a>
            <button
              onClick={() => handleNav('#booking')}
              className="btn-primary w-full text-center"
            >
              Book Now
            </button>
            <button
              onClick={() => { setMenuOpen(false); onAdminClick(); }}
              className="w-full text-center text-xs text-gray-400 hover:text-gray-600 py-1"
            >
              Admin
            </button>
          </div>
        </div>
      )}

      {/* Desktop admin link (hidden, accessible via double-click on logo) */}
      <button
        onClick={onAdminClick}
        className="hidden"
        id="admin-link"
        aria-hidden="true"
      />
    </header>
  );
}
