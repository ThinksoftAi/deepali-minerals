import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Building, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { COMPANY_DETAILS, MINERALS_DATA } from '../data/minerals';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [mineralInterest, setMineralInterest] = useState('Talc Powder (Industrial & Cosmetic)');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-block">
            Commercial Desk & Factory Location
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading">
            Connect with Deepali Minerals Technical Sales
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Discuss bulk truckload dispatches, export container contracts, or custom micronizing specifications directly with our sales engineers in Delhi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Headquarters Card */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">
                    Head Office & Depot
                  </h3>
                  <span className="text-xs text-amber-400">Deepali Minerals (Proprietorship)</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Registered Address:</strong>
                    {COMPANY_DETAILS.registeredAddress}
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Business Hours:</strong>
                    Monday – Saturday: 9:00 AM – 7:30 PM IST (Sunday Closed)
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">GST Registration:</strong>
                    <span className="font-mono text-slate-300">{COMPANY_DETAILS.gstNumber}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Calling & Messaging Card */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider text-amber-400">
                Direct Telecommunications
              </h4>

              <div className="space-y-3 text-xs">
                <a 
                  href={`tel:${COMPANY_DETAILS.phonePrimary.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-semibold text-slate-200">{COMPANY_DETAILS.phonePrimary}</div>
                      <div className="text-[10px] text-slate-400">Primary Mobile / Mr. Neeraj Monga (CEO)</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-amber-400 font-bold">Call Now</span>
                </a>

                <a 
                  href={`tel:${COMPANY_DETAILS.phoneOffice.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-slate-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-semibold text-slate-200">{COMPANY_DETAILS.phoneOffice}</div>
                      <div className="text-[10px] text-slate-400">Direct Sales & Dispatch Line</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">Call</span>
                </a>

                <a 
                  href={`mailto:${COMPANY_DETAILS.emailSales}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-semibold text-slate-200">{COMPANY_DETAILS.emailSales}</div>
                      <div className="text-[10px] text-slate-400">Sales Inquiries & Tender Desk</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-amber-400 font-bold">Email</span>
                </a>

                <a
                  href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Deepali%20Minerals,%20I%20am%20interested%20in%20procuring%20industrial%20minerals.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-lg shadow-emerald-950"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold font-heading text-white">
                  Message Sent to Commercial Desk!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <strong className="text-white">{name}</strong>. Your inquiry regarding <strong className="text-amber-400">{mineralInterest}</strong> has been assigned to our customer relationship manager. We will contact you at <strong className="text-slate-200">{phone || email}</strong> promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold font-heading text-white">
                    Submit Business / Tender Inquiry
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Our technical sales team responds within 2-4 business hours with comprehensive product TDS, COA, and freight quotes.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. S. P. Aggarwal"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Premier Polymers Ltd"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Contact Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91-98110-XXXXX"
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
                      placeholder="procurement@premierpolymers.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-slate-300 mb-1 font-medium">Mineral Product of Interest</label>
                  <select
                    value={mineralInterest}
                    onChange={(e) => setMineralInterest(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    {MINERALS_DATA.map((m) => (
                      <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                    <option value="Multiple Bulk Minerals">Multiple Bulk Minerals Mix</option>
                  </select>
                </div>

                <div className="text-xs">
                  <label className="block text-slate-300 mb-1 font-medium">Detailed Requirement / Specifications</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Specify target mesh size, whiteness, annual requirement in MT, delivery location or export port..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    We respect your privacy. No spam.
                  </span>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to Deepali Minerals</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
