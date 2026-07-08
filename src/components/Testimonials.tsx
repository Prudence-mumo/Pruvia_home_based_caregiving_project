import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Esther Nyamai',
    location: 'Kitengela',
    rating: 5,
    text: 'Pruvia Home Based Care provided exceptional care for my daughter. The nurses/Aide were skilled, patient, and incredibly compassionate in the 6 months that they took care of her. The peace of mind knowing she was safe allowed our family to focus on supporting her recovery up until now.',
    service: 'Home-Based Nursing Care',
    avatar: 'https://images.pexels.com/photos/3768114/pexels-photo-3768114.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'James Mwangi',
    location: 'Nairobi',
    rating: 5,
    text: 'After my father\'s surgery, we were worried about his recovery at home. Pruvia assigned us a wonderful nurse who made the transition seamless. The daily vitals monitoring and wound care were professional and thorough. I highly recommend them.',
    service: 'Post-Surgical Care',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Grace Mutua',
    location: 'Machakos',
    rating: 5,
    text: 'The physiotherapy sessions arranged through Pruvia were outstanding. My mother regained her mobility much faster than the doctors expected. The team\'s coordination between the nurse and the physiotherapist was impressive — truly holistic care.',
    service: 'Allied Health Services',
    avatar: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Peter Kariuki',
    location: 'Nairobi',
    rating: 5,
    text: 'The equipment rental service saved us enormous cost. The hospital bed and oxygen concentrator were delivered promptly and in perfect condition. The staff explained everything clearly, and the equipment was picked up on time when no longer needed.',
    service: 'Hospital Equipment Rental',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-gold fill-current' : 'text-gray-200 fill-current'}`}
          viewBox="0 0 20 20"
        >
          <path d="M10 1l2.39 6.26L18 8.27l-4.5 4.19 1.06 6.54L10 15.27 5.44 19l1.06-6.54L2 8.27l5.61-1.01L10 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goto = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 400);
  };

  const prev = () => goto((current - 1 + testimonials.length) % testimonials.length);
  const next = () => goto((current + 1) % testimonials.length);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 6000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const t = testimonials[current];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge mb-3">What Families Say</span>
          <h2 className="section-heading mb-4">Client Stories</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Real experiences from families who trusted Pruvia Home-Based Care with their loved ones.
          </p>
        </div>

        {/* Main testimonial card */}
        <div className="relative">
          <div
            key={current}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-10 testimonial-enter"
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
              {/* Avatar + info */}
              <div className="flex md:flex-col items-center gap-4 md:gap-3 flex-shrink-0">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-teal/20"
                />
                <div className="md:text-center">
                  <p className="font-bold text-blue-deep">{t.name}</p>
                  <p className="text-gray-400 text-sm">{t.location}</p>
                  <StarRating count={t.rating} />
                  <span className="inline-block mt-1 text-xs text-teal bg-teal/10 px-2 py-0.5 rounded-full">
                    {t.service}
                  </span>
                </div>
              </div>

              {/* Quote */}
              <div className="flex-1">
                <Quote size={32} className="text-gold/40 mb-3" />
                <p className="text-gray-700 text-lg leading-relaxed italic">"{t.text}"</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-teal transition-colors"
            >
              <ChevronLeft size={18} className="text-gray-600" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goto(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === current ? 'bg-teal w-6' : 'bg-gray-200 w-2 hover:bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-teal transition-colors"
            >
              <ChevronRight size={18} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Mini cards row */}
        <div className="hidden lg:grid grid-cols-4 gap-3 mt-8">
          {testimonials.map((t, idx) => (
            <button
              key={idx}
              onClick={() => goto(idx)}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                idx === current ? 'border-teal bg-teal/5' : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <img src={t.avatar} alt={t.name} className="w-7 h-7 rounded-full object-cover" />
                <div>
                  <p className="text-xs font-semibold text-gray-800 leading-tight">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">"{t.text}"</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
