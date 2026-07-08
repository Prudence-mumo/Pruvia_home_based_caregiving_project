import { Shield, Users, CheckCircle, Award, ChevronDown } from 'lucide-react';

const trustBadges = [
  {
    icon: Award,
    title: 'Established 2026',
    desc: 'Founded on a mission of compassionate, quality care',
  },
  {
    icon: Users,
    title: '10+ Permanent Staff',
    desc: 'Plus a certified pool of qualified locum professionals',
  },
  {
    icon: Shield,
    title: 'Rigorous Screening',
    desc: 'All staff undergo thorough background checks',
  },
  {
    icon: CheckCircle,
    title: 'Care Management Software',
    desc: 'Active security & patient tracking technology',
  },
];

export default function Hero() {
  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBooking = () => {
    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/7551668/pexels-photo-7551668.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-deep via-blue-deep/90 to-teal/70" />

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-3xl">
          <span className="badge mb-5 border border-gold/30 bg-gold/10 text-gold text-sm">
            Nairobi, Kenya's Trusted Home Care Provider
          </span>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: 'Merriweather, serif' }}
          >
            Nursing care in the{' '}
            <span className="text-gold">comfort of your home.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-8 max-w-2xl">
            We bring compassionate, skilled healthcare to you — personalized care plans,
            qualified nurses, and allied health professionals, all at home.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={scrollToBooking} className="btn-primary text-base py-3.5 px-8">
              Request a Care Assessment
            </button>
            <button
              onClick={scrollToServices}
              className="border-2 border-white text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white hover:text-blue-deep transition-all duration-200"
            >
              Explore Services
            </button>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="relative z-10 bg-white/10 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {trustBadges.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <Icon size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">{title}</p>
                  <p className="text-gray-300 text-xs mt-0.5 leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
