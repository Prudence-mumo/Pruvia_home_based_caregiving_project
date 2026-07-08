import { Phone, Mail, Clock, MapPin, MessageCircle } from 'lucide-react';

const phones = [
  { number: '+254 722 967 792', href: 'tel:+254722967792', label: 'Primary Line' },
  { number: '+254 740 540 516', href: 'tel:+254740540516', label: 'Secondary Line' },
  { number: '+254 719 184 092', href: 'tel:+254719184092', label: 'Tertiary Line' },
];

const areas = [
  'Nairobi & Surroundings',
  'Kitengela Town & Environs',
  'Machakos County',
  'Makueni County',
  'All of Kenya (on request)',
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge mb-3">Get in Touch</span>
          <h2 className="section-heading mb-4">We're Here to Help</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Our care coordinators are available Monday through Saturday, 8:00 AM to 5:00 PM to
            answer your questions and help you begin the care journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: contact cards */}
          <div className="space-y-5">
            {/* Office hours */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gold/20 rounded-xl flex items-center justify-center">
                  <Clock size={20} className="text-yellow-700" />
                </div>
                <h3 className="font-bold text-blue-deep">Office Hours</h3>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Monday – Friday</span>
                <span className="font-semibold text-blue-deep text-sm">8:00 AM – 5:00 PM</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Saturday</span>
                <span className="font-semibold text-blue-deep text-sm">8:00 AM – 5:00 PM</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-600 text-sm">Sunday & Holidays</span>
                <span className="font-semibold text-gray-400 text-sm">Emergency only</span>
              </div>
            </div>

            {/* Phone numbers */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center">
                  <Phone size={20} className="text-teal" />
                </div>
                <h3 className="font-bold text-blue-deep">Phone Numbers</h3>
              </div>
              <div className="space-y-3">
                {phones.map(({ number, href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 group transition-colors"
                  >
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{label}</p>
                      <p className="font-bold text-blue-deep group-hover:text-teal transition-colors">
                        {number}
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-teal/10 rounded-full flex items-center justify-center group-hover:bg-teal transition-colors">
                      <Phone size={14} className="text-teal group-hover:text-white transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-deep/10 rounded-xl flex items-center justify-center">
                  <Mail size={20} className="text-blue-deep" />
                </div>
                <h3 className="font-bold text-blue-deep">Email Us</h3>
              </div>
              <a
                href="mailto:pruviahomecare@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 group transition-colors"
              >
                <div className="flex-1">
                  <p className="text-xs text-gray-400 font-medium">General Enquiries</p>
                  <p className="font-semibold text-blue-deep group-hover:text-teal transition-colors break-all">
                    pruviahomecare@gmail.com
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right: service areas + quick actions */}
          <div className="space-y-5">
            {/* Service areas */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <MapPin size={20} className="text-red-600" />
                </div>
                <h3 className="font-bold text-blue-deep">Service Areas</h3>
              </div>
              <ul className="space-y-2">
                {areas.map((area) => (
                  <li key={area} className="flex items-center gap-2.5 text-sm text-gray-600 py-1.5 border-b border-gray-50 last:border-0">
                    <div className="w-2 h-2 rounded-full bg-teal flex-shrink-0" />
                    {area}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                We are committed to serving clients throughout Kenya and beyond. Contact us to
                discuss your specific location.
              </p>
            </div>

            {/* Quick actions */}
            <div className="bg-blue-deep rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-2">Ready to Get Started?</h3>
              <p className="text-gray-300 text-sm mb-5 leading-relaxed">
                Book a care assessment or call us directly to speak with a care coordinator.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() =>
                    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="w-full bg-gold text-blue-deep font-bold py-3 rounded-xl hover:bg-yellow-400 transition-colors"
                >
                  Book a Care Assessment
                </button>
                <a
                  href="tel:+254722967792"
                  className="w-full flex items-center justify-center gap-2 border-2 border-white/30 text-white font-semibold py-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <Phone size={16} />
                  Call +254 722 967 792
                </a>
                <a
                  href="mailto:pruviahomecare@gmail.com"
                  className="w-full flex items-center justify-center gap-2 border-2 border-white/20 text-white/80 font-semibold py-3 rounded-xl hover:bg-white/10 transition-colors text-sm"
                >
                  <MessageCircle size={16} />
                  pruviahomecare@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
