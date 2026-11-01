import React, { useState } from 'react';
import { 
  FileText, 
  Package, 
  ArrowRight, 
  CheckCircle, 
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { MINERALS_DATA, MineralProduct } from '../data/minerals';

interface ProductCatalogProps {
  onSelectMineralForTds: (mineral: MineralProduct) => void;
  onOpenQuote: (mineralId?: string) => void;
  onOpenSample: (mineralId?: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectMineralForTds,
  onOpenQuote,
  onOpenSample
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Industrial Minerals',
    'Mineral Powders',
    'Fillers & Extenders',
    'Lime & Carbonates',
    'Clays & Binders',
    'Functional Minerals',
    'Chemicals & Additives'
  ];

  const displayedMinerals = (selectedCategory === 'All' || selectedCategory === 'Industrial Minerals' || selectedCategory === 'Industrial Materials')
    ? MINERALS_DATA
    : selectedCategory === 'Mineral Powders'
      ? MINERALS_DATA.filter(m => m.category !== 'Chemicals & Additives')
      : MINERALS_DATA.filter(m => m.category === selectedCategory);

  return (
    <section id="products" className="py-16 sm:py-20 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-block">
              Manufacturing & Wholesale Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Industrial Minerals & Functional Fillers Catalog
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Explore our comprehensive product portfolio manufactured in state-of-the-art pulverizing and air-classifying mills. Each batch is supplied with certified Technical Data Sheets (TDS) and Certificate of Analysis (COA).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenQuote()}
              className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-amber-500/15"
            >
              <span>Download Full Catalog Price List</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs sm:text-sm px-4 py-2 rounded-xl font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {displayedMinerals.map((mineral) => (
            <div
              key={mineral.id}
              className="bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-2xl hover:shadow-amber-500/5 group relative"
            >
              {mineral.featured && (
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">
                    High Demand
                  </span>
                </div>
              )}

              <div className="space-y-4">
                {/* Category & Formula */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                    {mineral.category}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-white group-hover:text-amber-400 transition-colors">
                    {mineral.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mt-1">
                    <span>{mineral.chemicalFormula}</span>
                    <span>•</span>
                    <span className="text-slate-400">Purity: {mineral.purity}</span>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {mineral.tagline}
                </p>

                {/* Key Properties bullet points */}
                <div className="space-y-1.5 pt-1">
                  {mineral.keyProperties.slice(0, 3).map((prop, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{prop}</span>
                    </div>
                  ))}
                </div>

                {/* Mesh & Physical specs grid */}
                <div className="grid grid-cols-2 gap-2 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Whiteness / L*</span>
                    <span className="font-mono font-bold text-slate-200">{mineral.brightnessWhiteness.split('(')[0]}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Oil Absorption</span>
                    <span className="font-mono font-bold text-slate-200">{mineral.oilAbsorption}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Bulk Density</span>
                    <span className="font-mono text-slate-300">{mineral.bulkDensity}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Min. Order (MOQ)</span>
                    <span className="font-mono text-amber-400 font-semibold">{mineral.minimumOrderQty}</span>
                  </div>
                </div>

                {/* Key Applications Pills */}
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider block mb-1.5">
                    Primary Industries:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {mineral.applications.slice(0, 4).map((app, aIdx) => (
                      <span
                        key={aIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {app}
                      </span>
                    ))}
                    {mineral.applications.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-500">
                        +{mineral.applications.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-5 border-t border-slate-800/90 space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectMineralForTds(mineral)}
                    className="flex-1 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>View TDS / Specs</span>
                  </button>

                  <button
                    onClick={() => onOpenQuote(mineral.id)}
                    className="flex-1 py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Instant Quotation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => onOpenSample(mineral.id)}
                  className="w-full py-1.5 text-center text-[11px] font-medium text-slate-400 hover:text-amber-400 flex items-center justify-center gap-1 transition-colors"
                >
                  <Package className="w-3 h-3" />
                  <span>Request Free 500g Lab Testing Sample</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
