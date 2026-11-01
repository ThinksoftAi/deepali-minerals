import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Paintbrush, 
  Activity, 
  Zap, 
  Boxes, 
  FileText, 
  Droplets,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { INDUSTRIES_SERVED, IndustryApplication } from '../data/minerals';

interface IndustriesSectionProps {
  onOpenQuote: () => void;
  onOpenSample: () => void;
  onFilterByIndustry: (industryName: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  onOpenQuote,
  onOpenSample,
  onFilterByIndustry
}) => {
  const [activeTab, setActiveTab] = useState<string>(INDUSTRIES_SERVED[0].id);

  const activeIndustry = INDUSTRIES_SERVED.find(ind => ind.id === activeTab) || INDUSTRIES_SERVED[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-amber-400" />;
      case 'Paintbrush': return <Paintbrush className="w-5 h-5 text-amber-400" />;
      case 'Activity': return <Activity className="w-5 h-5 text-amber-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Boxes': return <Boxes className="w-5 h-5 text-amber-400" />;
      case 'FileText': return <FileText className="w-5 h-5 text-amber-400" />;
      case 'Droplets': return <Droplets className="w-5 h-5 text-amber-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      default: return <Layers className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="industries" className="py-16 sm:py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-block">
            Target Manufacturing Sectors
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading">
            Supplying India’s Premier Manufacturing Industries
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From sterile cosmetic powders to heavy-duty rubber compounds, our precision-graded minerals optimize mechanical performance and reduce formulation costs.
          </p>
        </div>

        {/* Industry Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-4 scrollbar-none border-b border-slate-800">
          {INDUSTRIES_SERVED.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActiveTab(ind.id)}
              className={`shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                activeTab === ind.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{ind.name}</span>
            </button>
          ))}
        </div>

        {/* Active Industry Deep-Dive Card */}
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left information column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    {getIcon(activeIndustry.iconName)}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    {activeIndustry.badge}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  {activeIndustry.name}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {activeIndustry.shortDesc}
                </p>
              </div>

              {/* Recommended Mineral Formulations */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                  Engineered Mineral Grades for This Sector:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeIndustry.recommendedMinerals.map((mineralName, idx) => (
                    <div 
                      key={idx}
                      className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between"
                    >
                      <span className="text-xs font-medium text-slate-200">{mineralName}</span>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                        Available
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                  Performance & Formulation Advantages:
                </h4>
                <div className="space-y-2">
                  {activeIndustry.keyBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onFilterByIndustry(activeIndustry.name.split(' ')[0])}
                  className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
                >
                  <span>Filter Products for {activeIndustry.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onOpenQuote}
                  className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-amber-500/15"
                >
                  <span>Request Industry Quotation</span>
                </button>
              </div>

            </div>

            {/* Right side technical highlight card */}
            <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Quality Assurance Metric
                </span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Certified Laboratory Tested
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Batch Consistency</div>
                  <div className="text-base font-bold font-mono text-amber-400 mt-0.5">±0.2% Purity Tolerance</div>
                  <div className="text-[10px] text-slate-500 mt-1">Monitored through digital automated air classifier feedback</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Microbial & Heavy Metal Screen</div>
                  <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">&lt; 2 ppm (USP Compliant)</div>
                  <div className="text-[10px] text-slate-500 mt-1">Verified safe for personal care cosmetic formulations</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Supply Lead Time</div>
                  <div className="text-base font-bold font-mono text-slate-200 mt-0.5">24 - 48 Hours Dispatch</div>
                  <div className="text-[10px] text-slate-500 mt-1">Ex-factory Delhi or delivered to all North & West India clusters</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Free 500g testing sample provided</span>
                <button
                  onClick={onOpenSample}
                  className="text-amber-400 hover:text-amber-300 font-semibold"
                >
                  Order Sample →
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
