import { CreditCard, Smartphone, FileCheck, Building, Info, DollarSign } from 'lucide-react';

export default function Payments() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge mb-3">Payments & Charges</span>
          <h2 className="section-heading mb-4">Transparent Pricing & Flexible Payment Options</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            We believe quality care should be accessible. We offer multiple payment options and
            conduct a thorough assessment to provide a detailed, personalized quote.
          </p>
        </div>

        {/* Pricing summary */}
        <div className="bg-blue-deep rounded-3xl p-6 sm:p-8 mb-10">
          <div className="flex items-center gap-2 mb-5">
            <DollarSign size={20} className="text-gold" />
            <h3 className="text-white font-bold text-lg">Approximate Service Costs (KES)</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: 'Basic Care Package',
                desc: 'Personal Care Assistance',
                price: 'KES 1,000',
                unit: 'per day',
              },
              {
                label: 'Standard Care Package',
                desc: 'Personal Care + Medication Management',
                price: 'KES 1,500',
                unit: 'per day',
              },
              {
                label: 'Comprehensive Nursing',
                desc: 'All services including full Nursing Care',
                price: 'KES 40,000–80,000',
                unit: 'per month',
              },
            ].map((pkg) => (
              <div key={pkg.label} className="bg-white/10 backdrop-blur rounded-2xl p-5">
                <p className="text-white font-bold text-sm mb-1">{pkg.label}</p>
                <p className="text-gray-300 text-xs mb-3 leading-snug">{pkg.desc}</p>
                <p className="text-gold text-2xl font-bold leading-none">{pkg.price}</p>
                <p className="text-gray-400 text-xs mt-1">{pkg.unit}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-start gap-2 bg-white/5 rounded-xl p-4">
            <Info size={16} className="text-gold flex-shrink-0 mt-0.5" />
            <p className="text-gray-300 text-sm leading-relaxed">
              Charges above are estimates. The actual cost varies by service complexity, location,
              and care duration. A free needs assessment will precede any detailed quote.
            </p>
          </div>
        </div>

        {/* Payment methods */}
        <h3 className="text-xl font-bold text-blue-deep mb-6 text-center" style={{ fontFamily: 'Merriweather, serif' }}>
          Accepted Payment Methods
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Private Pay */}
          <div className="card p-6">
            <div className="w-11 h-11 bg-blue-deep/10 rounded-xl flex items-center justify-center mb-4">
              <CreditCard size={22} className="text-blue-deep" />
            </div>
            <h4 className="font-bold text-blue-deep mb-2">Private Pay</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Direct payment by client or family. We issue a receipt for all services rendered.
            </p>
          </div>

          {/* Insurance */}
          <div className="card p-6">
            <div className="w-11 h-11 bg-teal/10 rounded-xl flex items-center justify-center mb-4">
              <Building size={22} className="text-teal" />
            </div>
            <h4 className="font-bold text-blue-deep mb-2">Selective Insurance</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              We work with select insurance providers. Contact us to verify if your insurer is
              covered.
            </p>
          </div>

          {/* M-PESA */}
          <div className="card p-6">
            <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Smartphone size={22} className="text-green-700" />
            </div>
            <h4 className="font-bold text-blue-deep mb-2">Lipa na M-PESA</h4>
            <div className="space-y-2 mt-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Paybill Number</p>
                <input
                  readOnly
                  value="Coming Soon"
                  placeholder="TBD"
                  className="text-sm font-bold text-blue-deep bg-transparent w-full outline-none mt-0.5"
                />
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Account Number</p>
                <input
                  readOnly
                  value="Coming Soon"
                  placeholder="TBD"
                  className="text-sm font-bold text-blue-deep bg-transparent w-full outline-none mt-0.5"
                />
              </div>
            </div>
          </div>

          {/* Cheque */}
          <div className="card p-6">
            <div className="w-11 h-11 bg-gold/20 rounded-xl flex items-center justify-center mb-4">
              <FileCheck size={22} className="text-yellow-700" />
            </div>
            <h4 className="font-bold text-blue-deep mb-2">Cheque Payment</h4>
            <p className="text-gray-500 text-sm leading-relaxed mb-3">
              Make cheques payable to:
            </p>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-400 mb-1">Payee Name</p>
              <p className="font-bold text-blue-deep text-sm tracking-wide">
                PRUVIA HOMEBASED CARE
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          Need to discuss payment options?{' '}
          <a href="tel:+254722967792" className="text-teal font-medium hover:underline">
            Call us at +254 722 967 792
          </a>
        </p>
      </div>
    </section>
  );
}
