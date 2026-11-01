import React, { useState } from 'react';
import { 
  X, 
  Package, 
  Send, 
  CheckCircle, 
  FlaskConical, 
  Truck, 
  Building, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { MINERALS_DATA, COMPANY_DETAILS } from '../data/minerals';

interface SampleRequestModalProps {
  initialMineralId?: string;
  onClose: () => void;
}

export const SampleRequestModal: React.FC<SampleRequestModalProps> = ({
  initialMineralId,
  onClose
}) => {
  const [selectedMineralId, setSelectedMineralId] = useState<string>(
    initialMineralId || MINERALS_DATA[0].id
  );
  const selectedMineral = MINERALS_DATA.find(m => m.id === selectedMineralId) || MINERALS_DATA[0];

  const [sampleSize, setSampleSize] = useState<string>('500g');
  const [selectedGrade, setSelectedGrade] = useState<string>(selectedMineral.grades[0]);
  const [targetIndustry, setTargetIndustry] = useState<string>('Cosmetics & Personal Care');
  const [chemistName, setChemistName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const [cityPincode, setCityPincode] = useState<string>('');

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [sampleTrackId, setSampleTrackId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `DM-SMP-${Math.floor(100000 + Math.random() * 900000)}`;
    setSampleTrackId(id);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div 
        className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-950 border-b border-slate-800 p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                Request Laboratory Testing Sample
              </h2>
              <p className="text-xs text-slate-400">
                Dispatched with Batch COA & Technical Data Sheet directly to your R&D lab
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-300 text-slate-400 transition-colors"
            aria-label="Close Sample Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white font-heading">
                  Sample Request Booked!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Sample Tracking ID: <strong className="text-amber-400 font-mono text-base">{sampleTrackId}</strong>
                </p>
                <p className="text-xs text-slate-400 max-w-md mx-auto pt-2">
                  Our QA laboratory in Delhi is packaging your {sampleSize} sample of <strong className="text-slate-200">{selectedMineral.name}</strong> ({selectedGrade}). Dispatched via Express Courier (BlueDart / DTDC) within 24 business hours.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left text-xs max-w-sm mx-auto space-y-2">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Consignee:</span>
                  <span className="text-slate-200 font-medium">{chemistName} ({companyName})</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Sample Quantity:</span>
                  <span className="text-amber-400 font-bold">{sampleSize} (Sealed Pouch)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Dispatch Hub:</span>
                  <span className="text-slate-200">Lawrence Road, Delhi Plant</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  Done & Back to Minerals
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5" />
                  <span>Mineral & Sample Size</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Select Mineral</label>
                    <select
                      value={selectedMineralId}
                      onChange={(e) => {
                        setSelectedMineralId(e.target.value);
                        const m = MINERALS_DATA.find(x => x.id === e.target.value);
                        if (m) setSelectedGrade(m.grades[0]);
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500"
                    >
                      {MINERALS_DATA.map((m) => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Grade / Fineness</label>
                    <select
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500"
                    >
                      {selectedMineral.grades.map((g, idx) => (
                        <option key={idx} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Sample Size Options */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Required Quantity (Complimentary for Verified Manufacturers)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { size: '500g', label: 'Lab R&D Testing', badge: 'Standard' },
                      { size: '1 Kg', label: 'Formulation Trial', badge: 'Popular' },
                      { size: '5 Kg', label: 'Extruder / Pilot Run', badge: 'Pilot' }
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt.size}
                        onClick={() => setSampleSize(opt.size)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          sampleSize === opt.size
                            ? 'bg-amber-500/15 border-amber-500 text-white shadow-sm'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-amber-400">{opt.size}</span>
                          <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                            {opt.badge}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-300 mt-0.5">{opt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lab & Delivery Details */}
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5" />
                  <span>Lab Delivery & Contact Person</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">R&D Chemist / Contact Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. A. K. Verma"
                      value={chemistName}
                      onChange={(e) => setChemistName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Company / Plant Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sunchem Coatings Ltd"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Email (for COA dispatch) *</label>
                    <input
                      type="email"
                      required
                      placeholder="rd@sunchem.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91-98765-43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 mb-1 font-medium">R&D Lab Street Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="Plot No. 45, Phase II, Industrial Estate"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">City & Pincode *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pune - 411019"
                      value={cityPincode}
                      onChange={(e) => setCityPincode(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
                <Truck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Samples are securely sealed in tamper-evident laminated pouches along with full Technical Data Sheet (TDS) and Lot Certificate of Analysis (COA).
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Confirm Sample Order</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
