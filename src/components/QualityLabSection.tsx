import React from 'react';
import { 
  ShieldCheck, 
  FlaskConical, 
  CheckCircle2, 
  Award, 
  FileSpreadsheet, 
  Sparkles, 
  Microscope, 
  Scale, 
  Layers
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/minerals';

interface QualityLabSectionProps {
  onOpenSample: () => void;
  onOpenQuote: () => void;
}

export const QualityLabSection: React.FC<QualityLabSectionProps> = ({
  onOpenSample,
  onOpenQuote
}) => {
  const labEquipments = [
    {
      name: 'HunterLab Whiteness Spectrophotometer',
      purpose: 'Measures L*, a*, b* chromatic coordinates, Yellowness Index (YI), and ISO brightness with 0.05% repeatability.',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />
    },
    {
      name: 'Laser Particle Size Distribution Analyzer (Sedigraph)',
      purpose: 'Quantifies D10, D50, and D97 micron distribution curves, verifying zero over-sized agglomerates.',
      icon: <Layers className="w-5 h-5 text-amber-400" />
    },
    {
      name: 'X-Ray Fluorescence (XRF) & Wet Chemical Titration',
      purpose: 'Verifies elemental composition (% SiO2, % MgO, % CaCO3, % Fe2O3) to maintain chemical inertness.',
      icon: <FlaskConical className="w-5 h-5 text-amber-400" />
    },
    {
      name: 'Gardner-Coleman Oil Absorption Apparatus',
      purpose: 'Calculates plasticizer & oil demand (g/100g) for flawless paint rheology and polymer masterbatch compounding.',
      icon: <Scale className="w-5 h-5 text-amber-400" />
    },
    {
      name: 'High-Temperature Muffle Furnaces (1200°C)',
      purpose: 'Evaluates Loss on Ignition (LOI) and thermal decomposition behavior for refractory and ceramic glazing.',
      icon: <Microscope className="w-5 h-5 text-amber-400" />
    },
    {
      name: 'Asbestos Screening by Polarized Light Microscopy',
      purpose: 'Guarantees 100% asbestos-free talcum powder batches for cosmetic USP standards and personal care safety.',
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />
    }
  ];

  return (
    <section id="quality" className="py-16 sm:py-20 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-block">
            In-House QC & Testing Laboratory
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading">
            Zero-Tolerance Quality Control & Certification
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Every mineral batch leaving our Lawrence Road, New Delhi unit undergoes mandatory laboratory verification. We supply individual Lot Certificates of Analysis (COA) with each consignment.
          </p>
        </div>

        {/* 4 Pillars of Deepali Quality */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {COMPANY_DETAILS.certifications.map((cert, idx) => (
            <div 
              key={idx}
              className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 hover:border-amber-500/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white">
                {cert.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {cert.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Laboratory Equipment Matrix */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
                Analytical Testing Equipment & Capabilities
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Conforming to Indian Standards (IS), ASTM, and USP pharmacopeia protocols
              </p>
            </div>

            <button
              onClick={onOpenSample}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors shrink-0"
            >
              <span>Order Sample with Batch COA</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {labEquipments.map((eq, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-2.5 hover:border-slate-700 transition-colors"
              >
                <div className="p-2 rounded-lg bg-slate-950 w-fit border border-slate-800">
                  {eq.icon}
                </div>
                <h4 className="font-semibold text-sm text-slate-100">
                  {eq.name}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {eq.purpose}
                </p>
              </div>
            ))}
          </div>

          {/* Test Protocol Steps Banner */}
          <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Raw Lumps Pre-Screening:</strong>
                Quarry inspection for purity, color uniformity, and moisture before milling.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Online Air-Classifier Monitoring:</strong>
                Continuous particle size laser calibration during pulverization.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Finished Lot Certificate (COA):</strong>
                Every dispatched truckload carries signed laboratory release documentation.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
