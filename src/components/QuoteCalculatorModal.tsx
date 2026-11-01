import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calculator, 
  Send, 
  CheckCircle, 
  Package, 
  Truck, 
  Building2, 
  Phone, 
  Mail, 
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { MINERALS_DATA, MineralProduct, COMPANY_DETAILS } from '../data/minerals';

interface QuoteCalculatorModalProps {
  initialMineralId?: string;
  onClose: () => void;
}

export const QuoteCalculatorModal: React.FC<QuoteCalculatorModalProps> = ({
  initialMineralId,
  onClose
}) => {
  const [selectedMineralId, setSelectedMineralId] = useState<string>(
    initialMineralId || MINERALS_DATA[0].id
  );
  
  const selectedMineral = MINERALS_DATA.find(m => m.id === selectedMineralId) || MINERALS_DATA[0];

  const [selectedGrade, setSelectedGrade] = useState<string>(selectedMineral.grades[0]);
  const [selectedMesh, setSelectedMesh] = useState<string>(selectedMineral.meshSizes[0]);
  const [quantityMt, setQuantityMt] = useState<number>(5);
  const [packagingType, setPackagingType] = useState<string>('50kg');
  const [destinationType, setDestinationType] = useState<string>('delhi_ncr');

  // Contact form state
  const [contactName, setContactName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [locationCity, setLocationCity] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [rfqNumber, setRfqNumber] = useState<string>('');

  // Update grade and mesh when mineral changes
  useEffect(() => {
    setSelectedGrade(selectedMineral.grades[0]);
    setSelectedMesh(selectedMineral.meshSizes[0]);
  }, [selectedMineralId]);

  // Calculations
  const totalKg = quantityMt * 1000;
  let bagCount = 0;
  if (packagingType === '25kg') bagCount = totalKg / 25;
  else if (packagingType === '50kg') bagCount = totalKg / 50;
  else if (packagingType === '1000kg') bagCount = totalKg / 1000;
  else bagCount = totalKg / 50; // palletized typically 50kg

  // Estimate base rate per MT
  const priceNumbers = selectedMineral.typicalPriceRange.match(/\d+[\d,]*/g);
  const minPrice = priceNumbers && priceNumbers[0] ? parseInt(priceNumbers[0].replace(/,/g, '')) : 6000;
  const maxPrice = priceNumbers && priceNumbers[1] ? parseInt(priceNumbers[1].replace(/,/g, '')) : 18000;

  // Multiplier for micronized/finest grades
  const isFineMesh = selectedMesh.includes('Micron') || selectedMesh.includes('2500') || selectedMesh.includes('1250');
  const ratePerMtLow = Math.round(isFineMesh ? minPrice * 1.25 : minPrice);
  const ratePerMtHigh = Math.round(isFineMesh ? maxPrice * 1.15 : maxPrice);

  const totalEstimateLow = ratePerMtLow * quantityMt;
  const totalEstimateHigh = ratePerMtHigh * quantityMt;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `DM-RFQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setRfqNumber(generatedId);
    setSubmitted(true);
  };

  const getWhatsAppUrl = () => {
    const text = `*New RFQ from Deepali Minerals Portal*
*RFQ Ref:* ${rfqNumber}
*Product:* ${selectedMineral.name}
*Grade:* ${selectedGrade}
*Fineness / Mesh:* ${selectedMesh}
*Quantity:* ${quantityMt} MT (${bagCount} bags)
*Packaging:* ${packagingType}
*Delivery Location:* ${locationCity || destinationType}
*Buyer Name:* ${contactName}
*Company:* ${companyName}
*Phone:* ${phone}
*Email:* ${email}`;
    return `https://wa.me/${COMPANY_DETAILS.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div 
        className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-950 border-b border-slate-800 p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                Quotation & Cost Calculator
              </h2>
              <p className="text-xs text-slate-400">
                Direct factory pricing from Deepali Minerals manufacturing units
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-300 text-slate-400 transition-colors"
            aria-label="Close Quotation Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white font-heading">
                  Quotation Dispatched Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Reference ID: <strong className="text-amber-400 font-mono text-base">{rfqNumber}</strong>
                </p>
                <p className="text-xs text-slate-400 max-w-md mx-auto pt-2">
                  Our commercial sales desk at Lawrence Road, New Delhi has received your quotation request. A formal proforma quote with current freight & delivery timeline will be shared with <strong className="text-slate-200">{email || phone}</strong> within 2 hours.
                </p>
              </div>

              {/* Order summary box */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left text-xs max-w-md mx-auto space-y-2">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Mineral:</span>
                  <span className="text-slate-200 font-medium">{selectedMineral.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Grade / Mesh:</span>
                  <span className="text-slate-200 font-medium">{selectedGrade} ({selectedMesh})</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Quantity:</span>
                  <span className="text-amber-400 font-bold">{quantityMt} MT ({bagCount} Bags)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Total:</span>
                  <span className="text-amber-400 font-mono font-bold">
                    ₹{totalEstimateLow.toLocaleString()} - ₹{totalEstimateHigh.toLocaleString()} + GST
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Directly on WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
                >
                  Close & Back to Catalog
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Product & Grade Selectors */}
              <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5" />
                  <span>Step 1: Select Mineral & Technical Grade</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Mineral Selection */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Mineral Product
                    </label>
                    <select
                      value={selectedMineralId}
                      onChange={(e) => setSelectedMineralId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    >
                      {MINERALS_DATA.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Grade Selection */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Commercial Grade
                    </label>
                    <select
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    >
                      {selectedMineral.grades.map((g, idx) => (
                        <option key={idx} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mesh Size */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Particle Size / Mesh Fineness
                    </label>
                    <select
                      value={selectedMesh}
                      onChange={(e) => setSelectedMesh(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    >
                      {selectedMineral.meshSizes.map((mesh, idx) => (
                        <option key={idx} value={mesh}>
                          {mesh}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Packaging Type */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Packaging Specification
                    </label>
                    <select
                      value={packagingType}
                      onChange={(e) => setPackagingType(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                    >
                      <option value="50kg">50 Kg PP Woven Bags (Standard)</option>
                      <option value="25kg">25 Kg Multiwall Paper / HDPE Bags (Moisture Liner)</option>
                      <option value="1000kg">1000 Kg (1 MT) Heavy Duty Jumbo Bag</option>
                      <option value="palletized">Palletized & Shrink Wrapped (Export standard)</option>
                    </select>
                  </div>
                </div>

                {/* Quantity Slider & Input */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-300">Quantity (Metric Tons):</span>
                    <span className="font-mono font-bold text-amber-400 text-sm">
                      {quantityMt} MT ({bagCount} Bags)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={quantityMt}
                    onChange={(e) => setQuantityMt(parseInt(e.target.value) || 1)}
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>1 MT (Trial)</span>
                    <span>15 MT (Single Truckload)</span>
                    <span>30 MT (Trailer)</span>
                    <span>100 MT (Rake / Contract)</span>
                  </div>
                </div>
              </div>

              {/* Real-time price calculation box */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block">
                    Estimated Factory Price Range:
                  </span>
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-white mt-0.5">
                    ₹{totalEstimateLow.toLocaleString()} - ₹{totalEstimateHigh.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-400">
                    (~₹{ratePerMtLow.toLocaleString()} to ₹{ratePerMtHigh.toLocaleString()} per MT • Ex-Factory / GST Extra)
                  </span>
                </div>

                <div className="text-right text-[11px] text-slate-400 space-y-1">
                  <div>Volume: <strong className="text-slate-200">{totalKg.toLocaleString()} Kg</strong></div>
                  <div>Total Bags: <strong className="text-slate-200">{bagCount} Units</strong></div>
                  <div>Dispatched From: <strong className="text-slate-200">Delhi / Rajasthan Unit</strong></div>
                </div>
              </div>

              {/* Delivery and Contact Information */}
              <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Step 2: Buyer & Delivery Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Company / Industry *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Plastics Pvt Ltd"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91-98765-43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Official Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="procurement@apexplastics.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Destination City / Pincode / Port *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Baddi, HP / Mundra Port FOB"
                      value={locationCity}
                      onChange={(e) => setLocationCity(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Logistics Preference</label>
                    <select
                      value={destinationType}
                      onChange={(e) => setDestinationType(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500"
                    >
                      <option value="delhi_ncr">Ex-Factory Delhi (Buyer Arrangement)</option>
                      <option value="delivered_north">Door Delivery (North India - UP/HR/PB/RJ)</option>
                      <option value="delivered_all_india">Door Delivery (Pan-India Logistics)</option>
                      <option value="fob_mundra">FOB Mundra Port (Export Shipment)</option>
                      <option value="fob_nhava_sheva">FOB Nhava Sheva (JNPT Mumbai Export)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium text-xs">
                    Special Chemical or Whiteness Requirements (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Must have Hunter Whiteness > 98% and zero residue on 500 mesh sieve."
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Submit CTA */}
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
                  <span>Submit Quotation to Sales Desk</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
