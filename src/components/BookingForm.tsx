import { useState } from 'react';
import { CheckCircle, ArrowLeft, ArrowRight, Loader2, User, Phone, Mail, MapPin, ClipboardList, FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';

const LOCATIONS = ['Nairobi', 'Kitengela', 'Machakos', 'Makueni', 'Other Kenya'];

const SERVICE_OPTIONS = [
  'Home-Based Nursing Care',
  'Specialized Care',
  'Hospital Equipment Rental',
  'Allied Health Services',
  'Personal Care Assistance',
  'Post-natal Care',
];

const PACKAGES = [
  { key: 'basic', label: 'Basic Care Package', sub: 'KES 1,000/day' },
  { key: 'standard', label: 'Standard Care Package', sub: 'KES 1,500/day' },
  { key: 'comprehensive', label: 'Comprehensive Nursing', sub: 'KES 40,000–80,000/month' },
  { key: 'unsure', label: "I'm not sure yet", sub: 'Assessment needed' },
];

interface FormData {
  clientName: string;
  email: string;
  phone: string;
  location: string;
  services: string[];
  packageSelected: string;
  careComplexity: string;
}

const INITIAL_FORM: FormData = {
  clientName: '',
  email: '',
  phone: '',
  location: '',
  services: [],
  packageSelected: '',
  careComplexity: '',
};

function validate(step: number, form: FormData): string | null {
  if (step === 1) {
    if (!form.clientName.trim()) return 'Please enter the client name.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) return 'Please enter a valid email.';
    if (!form.phone.trim() || form.phone.length < 9) return 'Please enter a valid phone number.';
  }
  if (step === 2) {
    if (!form.location) return 'Please select your location.';
    if (form.services.length === 0) return 'Please select at least one service.';
  }
  return null;
}

const steps = [
  { label: 'Your Details', icon: User },
  { label: 'Services', icon: ClipboardList },
  { label: 'Care Needs', icon: FileText },
];

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setField = (field: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleService = (s: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter((x) => x !== s)
        : [...prev.services, s],
    }));
  };

  const handleNext = () => {
    const err = validate(step, form);
    if (err) { setError(err); return; }
    setError(null);
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setError(null);
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setError(null);
    if (!form.careComplexity.trim()) {
      setError('Please describe the care needs briefly.');
      return;
    }
    setSubmitting(true);
    try {
      const { error: dbError } = await supabase.from('bookings').insert({
        client_name: form.clientName,
        email: form.email,
        phone: form.phone,
        location: form.location,
        services: form.services,
        package_selected: form.packageSelected,
        care_complexity: form.careComplexity,
        status: 'pending',
      });
      if (dbError) throw dbError;
      setSubmitted(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Submission failed. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="booking" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="card p-10">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-blue-deep mb-3" style={{ fontFamily: 'Merriweather, serif' }}>
              Request Received!
            </h2>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Thank you, <strong>{form.clientName}</strong>. Our care coordinator will contact you within
              24 hours to discuss your care needs and schedule an assessment.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 text-left space-y-2">
              <p><span className="font-medium">Email:</span> {form.email}</p>
              <p><span className="font-medium">Phone:</span> {form.phone}</p>
              <p><span className="font-medium">Location:</span> {form.location}</p>
              <p><span className="font-medium">Services:</span> {form.services.join(', ')}</p>
            </div>
            <p className="text-gray-400 text-sm mt-6">
              Urgent? Call us directly:{' '}
              <a href="tel:+254722967792" className="text-teal font-medium hover:underline">
                +254 722 967 792
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="badge mb-3">Get Started</span>
          <h2 className="section-heading mb-4">Request a Care Assessment</h2>
          <p className="text-gray-500 text-base">
            Fill out this short form and our team will reach out to discuss a personalized care plan.
          </p>
        </div>

        {/* Step progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, idx) => {
            const StepIcon = s.icon;
            const num = idx + 1;
            const active = step === num;
            const done = step > num;
            return (
              <div key={s.label} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-blue-deep text-white'
                      : done
                      ? 'bg-teal text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <StepIcon size={14} />
                  <span className="hidden sm:inline">{s.label}</span>
                  <span className="sm:hidden">{num}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`h-0.5 w-6 sm:w-10 transition-colors ${done ? 'bg-teal' : 'bg-gray-200'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Form card */}
        <div className="card p-6 sm:p-8">
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Client Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={form.clientName}
                    onChange={(e) => setField('clientName', e.target.value)}
                    placeholder="e.g. Jane Wambui"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setField('email', e.target.value)}
                    placeholder="jane@example.com"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setField('phone', e.target.value)}
                    placeholder="+254 7XX XXX XXX"
                    className="input-field pl-10"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={form.location}
                    onChange={(e) => setField('location', e.target.value)}
                    className="input-field pl-10 appearance-none bg-white"
                  >
                    <option value="">Select your location...</option>
                    {LOCATIONS.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Services Needed <span className="text-red-500">*</span>
                  <span className="font-normal text-gray-400 ml-1">(select all that apply)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SERVICE_OPTIONS.map((s) => {
                    const checked = form.services.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleService(s)}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left text-sm font-medium transition-all duration-200 ${
                          checked
                            ? 'border-teal bg-teal/5 text-teal'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
                          checked ? 'bg-teal border-teal' : 'border-gray-300'
                        }`}>
                          {checked && <CheckCircle size={10} className="text-white" />}
                        </div>
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Preferred Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PACKAGES.map((pkg) => {
                    const selected = form.packageSelected === pkg.key;
                    return (
                      <button
                        key={pkg.key}
                        type="button"
                        onClick={() => setField('packageSelected', pkg.key)}
                        className={`p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                          selected
                            ? 'border-blue-deep bg-blue-deep/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <p className={`text-sm font-semibold ${selected ? 'text-blue-deep' : 'text-gray-700'}`}>
                          {pkg.label}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{pkg.sub}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Describe the Care Needs <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.careComplexity}
                  onChange={(e) => setField('careComplexity', e.target.value)}
                  rows={5}
                  placeholder="Tell us about the patient's condition, current medications, mobility status, and any specific concerns or requirements..."
                  className="input-field resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  This helps our team prepare the right care plan before contacting you.
                </p>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-1.5 text-gray-600">
                <p className="font-semibold text-gray-800 mb-2">Booking Summary</p>
                <p><span className="font-medium">Name:</span> {form.clientName}</p>
                <p><span className="font-medium">Email:</span> {form.email}</p>
                <p><span className="font-medium">Phone:</span> {form.phone}</p>
                <p><span className="font-medium">Location:</span> {form.location}</p>
                <p><span className="font-medium">Services:</span> {form.services.join(', ') || '—'}</p>
                {form.packageSelected && (
                  <p>
                    <span className="font-medium">Package:</span>{' '}
                    {PACKAGES.find((p) => p.key === form.packageSelected)?.label}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 font-medium hover:text-gray-800 transition-colors"
              >
                <ArrowLeft size={16} /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button onClick={handleNext} className="btn-primary flex items-center gap-2">
                Next <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="btn-primary flex items-center gap-2 disabled:opacity-60"
              >
                {submitting ? (
                  <><Loader2 size={16} className="animate-spin" /> Submitting...</>
                ) : (
                  <>Submit Request <CheckCircle size={16} /></>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
