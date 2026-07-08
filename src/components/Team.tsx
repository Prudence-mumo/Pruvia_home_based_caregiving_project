import { Briefcase, Award, Users } from 'lucide-react';

const leaders = [
  {
    name: 'Agnes Kiptoo',
    role: 'Chief Executive Officer',
    initials: 'AK',
    color: 'bg-blue-deep',
    bio: 'Visionary leader driving Pruvia\'s mission to deliver compassionate, high-quality home healthcare across Kenya and beyond.',
    image: 'https://images.pexels.com/photos/3807571/pexels-photo-3807571.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Ms. Prudence Mumo',
    role: 'Executive Director',
    initials: 'PM',
    color: 'bg-teal',
    bio: 'Oversees daily operations and strategic growth, ensuring every client receives personalized, consistent, and compassionate care.',
    image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Mr. Brian Oyaro Mireri, RN',
    role: 'Lead Nurse',
    initials: 'BM',
    color: 'bg-emerald-700',
    bio: 'Registered nurse with 5+ years of home healthcare experience. Brian\'s leadership and clinical expertise ensure the highest standards of patient-centered care.',
    image: 'https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&w=400',
    highlight: true,
  },
];

const teamRoles = [
  {
    icon: Award,
    title: 'Registered Nurses & Doctors',
    desc: 'Higher-education trained clinicians providing skilled nursing care, care management, and the highest standards of clinical expertise.',
    image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    icon: Users,
    title: 'Nurse Aides & Patient Attendants',
    desc: 'Compassionate caregivers assisting with personal care, daily living activities, companionship, and emotional support.',
    image: 'https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    icon: Briefcase,
    title: 'Consultant Specialists',
    desc: 'A network of physiotherapists, nutritionists, occupational therapists, and counselors ensuring holistic, whole-person care.',
    image: 'https://images.pexels.com/photos/5863389/pexels-photo-5863389.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export default function Team() {
  return (
    <section id="team" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge mb-3">Our People</span>
          <h2 className="section-heading mb-4">Meet Our Leadership</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            Our strength lies in our team of highly skilled and compassionate professionals —
            10 permanent staff and a pool of certified locum professionals.
          </p>
        </div>

        {/* Leaders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className={`card overflow-hidden group ${
                leader.highlight ? 'ring-2 ring-teal' : ''
              }`}
            >
              {/* Photo */}
              <div className="h-52 overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                {leader.highlight && (
                  <span className="inline-block bg-teal/10 text-teal text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                    Lead Nurse
                  </span>
                )}
                <h3 className="font-bold text-blue-deep text-lg leading-tight">{leader.name}</h3>
                <p className="text-teal text-sm font-medium mt-0.5 mb-3">{leader.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{leader.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Staff roles */}
        <div className="bg-gray-50 rounded-3xl p-6 sm:p-10">
          <h3 className="text-xl font-bold text-blue-deep mb-2 text-center" style={{ fontFamily: 'Merriweather, serif' }}>
            Our Care Team
          </h3>
          <p className="text-gray-400 text-sm text-center mb-8">
            All staff undergo rigorous background checks and continuous professional development.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamRoles.map(({ icon: Icon, title, desc, image }) => (
              <div key={title} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="h-36 overflow-hidden">
                  <img src={image} alt={title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 bg-blue-deep/10 rounded-lg flex items-center justify-center">
                      <Icon size={16} className="text-blue-deep" />
                    </div>
                    <h4 className="font-bold text-blue-deep text-sm">{title}</h4>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
