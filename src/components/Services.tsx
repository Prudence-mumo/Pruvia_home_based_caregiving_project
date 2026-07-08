import { useState } from 'react';
import {
  Stethoscope,
  Heart,
  PackageOpen,
  Activity,
  HandHeart,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface ServiceItem {
  icon: React.ElementType;
  color: string;
  accentColor: string;
  title: string;
  subtitle: string;
  points: string[];
  benefit: string;
  image?: string;
}

const services: ServiceItem[] = [
  {
    icon: Stethoscope,
    color: 'bg-blue-deep',
    accentColor: 'text-teal',
    title: 'Home-Based Nursing Care',
    subtitle: 'Skilled nursing care by Registered Nurses',
    points: [
      'Medication administration & management',
      'Advanced wound care & dressing changes',
      'Vital signs monitoring (BP, temperature, heart rate)',
      'Chronic condition support & disease management education',
      'Post-natal care for mother and newborn',
    ],
    benefit:
      'Reduces hospital readmissions, promotes faster recovery and provides peace of mind knowing skilled medical care is available at home.',
    image:
      'https://images.pexels.com/photos/7551668/pexels-photo-7551668.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: Heart,
    color: 'bg-red-700',
    accentColor: 'text-red-600',
    title: 'Specialized Care',
    subtitle: 'Expert care for complex medical needs',
    points: [
      'Post-surgical recovery & monitoring',
      'Palliative & end-of-life comfort care',
      'Diabetic care — blood sugar monitoring & dietary guidance',
      'Advanced wound management & infection prevention',
    ],
    benefit:
      'Addresses specific health challenges with specialized expertise, promoting better outcomes and improving quality of life.',
    image:
      'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: PackageOpen,
    color: 'bg-teal',
    accentColor: 'text-teal',
    title: 'Hospital Equipment Rental',
    subtitle: 'Well-maintained medical equipment delivered to your home',
    points: [
      'Hospital-grade adjustable beds',
      'Oxygen concentrators & related supplies',
      'Wheelchairs (manual & transport)',
      'Walkers, crutches & mobility aids',
      'Delivery, setup & usage instructions included',
    ],
    benefit:
      'Enables patients to receive care at home without expensive purchases, promoting independence and comfort.',
    image:
      'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: Activity,
    color: 'bg-emerald-700',
    accentColor: 'text-emerald-600',
    title: 'Allied Health Services',
    subtitle: 'Holistic care from specialist consultants',
    points: [
      'Physiotherapy — mobility & rehabilitation',
      'Nutrition counseling & meal planning',
      'Occupational therapy for daily function',
      'Mental health counseling & psychology services',
    ],
    benefit:
      'Provides access to a comprehensive range of healthcare professionals, ensuring all needs are met in one coordinated care plan.',
    image:
      'https://images.pexels.com/photos/5863389/pexels-photo-5863389.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: HandHeart,
    color: 'bg-orange-700',
    accentColor: 'text-orange-600',
    title: 'Personal Care Assistance',
    subtitle: 'Compassionate support for daily living',
    points: [
      'Bathing, grooming & personal hygiene',
      'Dressing & mobility assistance',
      'Meal preparation & feeding support',
      'Companionship & emotional support',
      'Light housekeeping related to client care',
    ],
    benefit:
      'Promotes the client\'s dignity, independence, and emotional well-being while reducing stress for family caregivers.',
    image:
      'https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

interface ServiceCardProps {
  service: ServiceItem;
  expanded: boolean;
  onToggle: () => void;
}

function ServiceCard({ service, expanded, onToggle }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <div className={`card overflow-hidden transition-all duration-300 ${expanded ? 'ring-2 ring-teal' : ''}`}>
      {/* Card header */}
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-6 text-left hover:bg-gray-50 transition-colors duration-200"
      >
        <div className={`${service.color} w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center`}>
          <Icon size={22} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-blue-deep text-base leading-tight">{service.title}</h3>
          <p className="text-gray-500 text-sm mt-1">{service.subtitle}</p>
        </div>
        <ChevronDown
          size={20}
          className={`text-gray-400 flex-shrink-0 transition-transform duration-300 mt-1 ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Details */}
            <div className="p-6">
              <ul className="space-y-2.5 mb-5">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-teal flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-teal/5 border border-teal/20 rounded-xl p-4">
                <p className="text-xs font-semibold text-teal uppercase tracking-wide mb-1">
                  Benefit to You & Your Family
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">{service.benefit}</p>
              </div>
            </div>
            {/* Image */}
            <div className="hidden md:block">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover min-h-[220px]"
              />
            </div>
          </div>
          <div className="px-6 pb-5 pt-2">
            <button
              onClick={() =>
                document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-blue-deep transition-colors"
            >
              Request this service <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Services() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge mb-3">What We Offer</span>
          <h2 className="section-heading mb-4">Comprehensive Home Healthcare Services</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            From skilled nursing to personal care assistance, we cover every aspect of your
            healthcare needs — all delivered in the comfort of home.
          </p>
        </div>

        {/* Services accordion */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {services.map((service, idx) => (
            <ServiceCard
              key={service.title}
              service={service}
              expanded={expanded === idx}
              onToggle={() => setExpanded(expanded === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
