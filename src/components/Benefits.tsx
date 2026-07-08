import { TrendingUp, User, ShieldCheck, DollarSign, Heart } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    color: 'bg-teal/10 text-teal',
    title: 'Faster Recovery',
    desc:
      'Patients recover more quickly and comfortably in their own homes — familiar surroundings reduce stress and promote healing.',
  },
  {
    icon: User,
    color: 'bg-blue-deep/10 text-blue-deep',
    title: 'Personalized Attention',
    desc:
      'Every care plan is individually tailored. Your nurse dedicates their full attention to you, not a ward full of patients.',
  },
  {
    icon: ShieldCheck,
    color: 'bg-green-100 text-green-700',
    title: 'Reduced Infection Risk',
    desc:
      'Home care minimizes exposure to hospital-acquired infections — a significant benefit for immunocompromised patients.',
  },
  {
    icon: DollarSign,
    color: 'bg-gold/20 text-yellow-700',
    title: 'Cost-Effective Care',
    desc:
      'Quality home care is often more affordable than long-term hospitalization or institutional care, with no hidden costs.',
  },
  {
    icon: Heart,
    color: 'bg-red-100 text-red-600',
    title: 'Family Involvement',
    desc:
      'Family members play an active role in the care process, keeping them informed, involved, and at peace of mind.',
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge mb-3">Why Choose Home Care</span>
          <h2 className="section-heading mb-4">Benefits of Home-Based Care</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            Choosing Pruvia Home Based Care means choosing a better quality of life — for your
            loved one and for your whole family.
          </p>
        </div>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map(({ icon: Icon, color, title, desc }, idx) => (
            <div
              key={title}
              className={`card p-7 group hover:-translate-y-1 transition-transform duration-300 ${
                idx === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-bold text-blue-deep mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-14 bg-blue-deep rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-xl font-bold mb-1">
              Ready to start your care journey?
            </h3>
            <p className="text-gray-300 text-sm">
              Our team is available Mon–Sat, 8 AM–5 PM to answer all your questions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a href="tel:+254722967792" className="btn-primary whitespace-nowrap">
              Call Us Now
            </a>
            <button
              onClick={() =>
                document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-deep transition-all duration-200 whitespace-nowrap"
            >
              Book Assessment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
