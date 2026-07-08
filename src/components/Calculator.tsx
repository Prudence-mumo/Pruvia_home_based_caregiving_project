import { useState } from 'react';
import { Calculator as CalcIcon, Minus, Plus, ArrowRight } from 'lucide-react';

type PackageKey = 'basic' | 'standard' | 'comprehensive' | 'custom';

const packages = [
  {
    key: 'basic' as PackageKey,
    label: 'Basic Care',
    desc: 'Personal Care Assistance',
    price: 1000,
    unit: 'day',
    color: 'border-gray-200 hover:border-teal',
    selectedColor: 'border-teal bg-teal/5',
  },
  {
    key: 'standard' as PackageKey,
    label: 'Standard Care',
    desc: 'Personal Care + Medication Management',
    price: 1500,
    unit: 'day',
    color: 'border-gray-200 hover:border-blue-deep',
    selectedColor: 'border-blue-deep bg-blue-deep/5',
  },
  {
    key: 'comprehensive' as PackageKey,
    label: 'Comprehensive Nursing',
    desc: 'All Services including Full Nursing Care',
    priceMin: 40000,
    priceMax: 80000,
    unit: 'month',
    color: 'border-gray-200 hover:border-gold',
    selectedColor: 'border-gold bg-gold/5',
  },
  {
    key: 'custom' as PackageKey,
    label: 'Custom Plan',
    desc: 'Choose your hours & add equipment',
    color: 'border-gray-200 hover:border-gray-400',
    selectedColor: 'border-gray-400 bg-gray-50',
  },
];

const equipmentItems = [
  { id: 'bed', label: 'Hospital Bed', price: 1500, unit: '/day' },
  { id: 'oxygen', label: 'Oxygen Concentrator', price: 2000, unit: '/day' },
  { id: 'wheelchair', label: 'Wheelchair', price: 500, unit: '/day' },
  { id: 'walker', label: 'Walker / Crutches', price: 300, unit: '/day' },
];

function Counter({ value, onChange, min = 1, max = 31 }: { value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
      >
        <Minus size={14} />
      </button>
      <span className="w-8 text-center font-semibold text-blue-deep">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

export default function Calculator() {
  const [selectedPkg, setSelectedPkg] = useState<PackageKey>('standard');
  const [days, setDays] = useState(7);
  const [attendantDays, setAttendantDays] = useState(7);
  const [equipment, setEquipment] = useState<Record<string, boolean>>({});
  const [equipDays, setEquipDays] = useState<Record<string, number>>({ bed: 7, oxygen: 7, wheelchair: 7, walker: 7 });

  const toggleEquip = (id: string) => setEquipment((prev) => ({ ...prev, [id]: !prev[id] }));

  const formatKES = (n: number) =>
    new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(n);

  const computeTotal = (): { low: number; high: number } => {
    if (selectedPkg === 'basic') {
      const base = 1000 * days;
      const equip = equipmentItems.reduce((acc, e) => acc + (equipment[e.id] ? e.price * equipDays[e.id] : 0), 0);
      return { low: base + equip, high: base + equip };
    }
    if (selectedPkg === 'standard') {
      const base = 1500 * days;
      const equip = equipmentItems.reduce((acc, e) => acc + (equipment[e.id] ? e.price * equipDays[e.id] : 0), 0);
      return { low: base + equip, high: base + equip };
    }
    if (selectedPkg === 'comprehensive') {
      const equip = equipmentItems.reduce((acc, e) => acc + (equipment[e.id] ? e.price * equipDays[e.id] : 0), 0);
      return { low: 40000 + equip, high: 80000 + equip };
    }
    // custom
    const attendantCost = 1000 * attendantDays;
    const equip = equipmentItems.reduce((acc, e) => acc + (equipment[e.id] ? e.price * equipDays[e.id] : 0), 0);
    return { low: attendantCost + equip, high: attendantCost + equip };
  };

  const total = computeTotal();
  const isRange = total.high !== total.low;

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge mb-3">Estimate Your Costs</span>
          <h2 className="section-heading mb-4">Service Cost Calculator</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Get an approximate cost estimate for your care needs. Actual pricing is subject to a
            personalized assessment.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left: package selection */}
            <div className="lg:col-span-2 p-6 sm:p-8">
              <h3 className="font-bold text-blue-deep mb-5 text-base flex items-center gap-2">
                <CalcIcon size={18} className="text-teal" />
                Select a Care Package
              </h3>

              {/* Package cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                {packages.map((pkg) => (
                  <button
                    key={pkg.key}
                    onClick={() => setSelectedPkg(pkg.key)}
                    className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedPkg === pkg.key ? pkg.selectedColor : pkg.color + ' bg-white'
                    }`}
                  >
                    <p className="font-semibold text-blue-deep text-sm">{pkg.label}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{pkg.desc}</p>
                    {pkg.key !== 'custom' && (
                      <p className="text-teal font-bold text-sm mt-2">
                        {pkg.key === 'comprehensive'
                          ? `KES 40,000–80,000/month`
                          : `KES ${(pkg as { price: number }).price?.toLocaleString()}/${(pkg as { unit: string }).unit}`}
                      </p>
                    )}
                  </button>
                ))}
              </div>

              {/* Duration selector */}
              {(selectedPkg === 'basic' || selectedPkg === 'standard') && (
                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 mb-5">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Number of days</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      KES {selectedPkg === 'basic' ? '1,000' : '1,500'}/day
                    </p>
                  </div>
                  <Counter value={days} onChange={setDays} max={90} />
                </div>
              )}

              {selectedPkg === 'custom' && (
                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 mb-5">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Patient attendant days</p>
                    <p className="text-xs text-gray-400 mt-0.5">KES 1,000/day</p>
                  </div>
                  <Counter value={attendantDays} onChange={setAttendantDays} max={90} />
                </div>
              )}

              {/* Equipment */}
              <div>
                <p className="text-sm font-bold text-gray-700 mb-3">
                  Add Equipment Rental <span className="font-normal text-gray-400">(optional)</span>
                </p>
                <div className="space-y-2">
                  {equipmentItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                        equipment[item.id]
                          ? 'border-teal bg-teal/5'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <label className="flex items-center gap-3 cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={!!equipment[item.id]}
                          onChange={() => toggleEquip(item.id)}
                          className="w-4 h-4 rounded accent-teal"
                        />
                        <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                        <span className="text-xs text-gray-400">KES {item.price.toLocaleString()}{item.unit}</span>
                      </label>
                      {equipment[item.id] && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 mr-1">Days:</span>
                          <Counter
                            value={equipDays[item.id]}
                            onChange={(v) => setEquipDays((prev) => ({ ...prev, [item.id]: v }))}
                            max={90}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: estimate result */}
            <div className="bg-blue-deep flex flex-col p-6 sm:p-8 justify-between">
              <div>
                <p className="text-white/70 text-sm font-medium uppercase tracking-wide mb-3">
                  Estimated Cost
                </p>
                {isRange ? (
                  <div>
                    <p className="text-white text-3xl font-bold">{formatKES(total.low)}</p>
                    <p className="text-white/60 text-sm mt-1">to</p>
                    <p className="text-gold text-3xl font-bold">{formatKES(total.high)}</p>
                    <p className="text-white/50 text-xs mt-1">per month</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gold text-3xl font-bold">{formatKES(total.low)}</p>
                    <p className="text-white/50 text-xs mt-1">
                      {selectedPkg === 'comprehensive' ? 'per month' : `for ${selectedPkg === 'custom' ? attendantDays : days} days`}
                    </p>
                  </div>
                )}

                <div className="mt-6 p-4 bg-white/10 rounded-xl">
                  <p className="text-white/80 text-xs leading-relaxed">
                    This is an approximate estimate. Actual costs depend on care complexity,
                    location, and duration. We conduct a free needs assessment to provide a
                    detailed quote.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  onClick={() =>
                    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="w-full bg-gold text-blue-deep font-bold py-3 rounded-xl hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
                >
                  Request Detailed Quote <ArrowRight size={16} />
                </button>
                <a
                  href="tel:+254722967792"
                  className="w-full block text-center border-2 border-white/30 text-white font-semibold py-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Call to Discuss
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-4">
          * All prices in Kenyan Shillings (KES) and subject to change. VAT may apply.
        </p>
      </div>
    </section>
  );
}
