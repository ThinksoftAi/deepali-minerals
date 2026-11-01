import React from 'react';
import { 
  Building2, 
  UserCheck, 
  History, 
  MapPin, 
  Globe2, 
  Truck, 
  CheckCircle2, 
  Award,
  ArrowRight
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/minerals';

interface AboutSectionProps {
  onOpenQuote: () => void;
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenQuote,
  onOpenContact
}) => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-block">
                Company Profile &amp; Sourcing Network
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading">
                Two Decades of Dependable Industrial Mineral Supply
              </h2>
              <p className="text-base text-slate-300 leading-relaxed font-normal">
                Established in <strong>2004</strong> under the leadership of <strong>Mr. Neeraj Monga (CEO)</strong>, <strong>DEEPALI MINERALS</strong> operates as an established supplier of non-metallic industrial minerals, pulverized powders, and functional chemical additives serving manufacturing sectors across India.
              </p>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Operating from our commercial logistics base at <strong>C2/29C Lawrence Road, Keshav Puram / Rampura, Delhi-110035</strong>, we coordinate bulk sourcing, particle classification, quality verification, and rapid dispatch across 22 master mineral products and 38 manufacturing industries.
            </p>

            {/* Quick stats checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Proprietor &amp; CEO: <strong>{COMPANY_DETAILS.ceo}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Established: <strong>{COMPANY_DETAILS.establishedYear} (20+ Years)</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Constitution: <strong>Proprietorship</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>GSTIN: <strong>{COMPANY_DETAILS.gstNumber}</strong></span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="/about.html"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
              >
                <span>Read Full Company Profile</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenQuote}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-colors"
              >
                <span>Request Quotation</span>
              </button>
            </div>
          </div>

          {/* Right Column Structured Profile Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Factsheet Summary Card */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Corporate Factsheet</span>
                </span>
                <span className="text-[10px] text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Verified Data
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex justify-between items-center">
                  <span className="text-slate-400">Nature of Business:</span>
                  <span className="font-semibold text-slate-200">Trader–Retailer &amp; Supplier</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex justify-between items-center">
                  <span className="text-slate-400">Business Category:</span>
                  <span className="font-semibold text-slate-200">Industrial Minerals &amp; Chemicals</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex justify-between items-center">
                  <span className="text-slate-400">GST Registration:</span>
                  <span className="font-semibold text-slate-200">01 July 2017</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex justify-between items-center">
                  <span className="text-slate-400">Master Portfolio:</span>
                  <span className="font-semibold text-slate-200">22 Mineral Products</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex justify-between items-center">
                  <span className="text-slate-400">Industries Covered:</span>
                  <span className="font-semibold text-slate-200">38 Manufacturing Sectors</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
                For detailed quality assurance parameters, sourcing methodology, infrastructure, and commercial documentation, visit our comprehensive company profile.
              </p>

              <div className="pt-2">
                <a
                  href="/about.html"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-amber-500/30 text-amber-400 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Explore Quality, Sourcing &amp; Infrastructure</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Logistics & Office Card */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 text-xs text-slate-300 space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Commercial Office &amp; Logistics Hub:</strong>
                  C-2/29 C Lawrence Road, Rampura / Keshav Puram, New Delhi – 110035
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-800">
                <Truck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Sourcing &amp; Transit Facilities:</strong>
                  Vendor network across Rajasthan, Gujarat, and key North Indian mineral corridors.
                </div>
              </div>
            </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
