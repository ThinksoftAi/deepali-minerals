import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  SlidersHorizontal, 
  FileText, 
  Package, 
  Check, 
  Info,
  ArrowRight,
  Filter
} from 'lucide-react';
import { MINERALS_DATA, MineralProduct, INDUSTRIES_SERVED } from '../data/minerals';

interface InteractiveFinderProps {
  onSelectMineralForTds: (mineral: MineralProduct) => void;
  onOpenQuote: (mineralId?: string) => void;
  onOpenSample: (mineralId?: string) => void;
}

export const InteractiveFinder: React.FC<InteractiveFinderProps> = ({
  onSelectMineralForTds,
  onOpenQuote,
  onOpenSample
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [selectedMesh, setSelectedMesh] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [minWhiteness, setMinWhiteness] = useState<number>(80);

  const industriesList = useMemo(() => {
    return ['All', ...INDUSTRIES_SERVED.map(i => i.name)];
  }, []);

  const meshOptions = [
    'All',
    '300 Mesh',
    '400 Mesh',
    '500 Mesh',
    '700 Mesh',
    '1250 Mesh',
    '2500 Mesh',
    '2 Micron (D97)'
  ];

  const filteredMinerals = useMemo(() => {
    return MINERALS_DATA.filter(mineral => {
      // Industry filter
      if (selectedIndustry !== 'All') {
        const indObj = INDUSTRIES_SERVED.find(
          i => i.name.toLowerCase() === selectedIndustry.toLowerCase() || i.id.toLowerCase() === selectedIndustry.toLowerCase()
        );
        const matchesRec = indObj ? indObj.recommendedMinerals.some(m => 
          mineral.name.toLowerCase().includes(m.toLowerCase()) || m.toLowerCase().includes(mineral.name.toLowerCase())
        ) : false;
        const matchesApp = mineral.applications.some(app => 
          app.toLowerCase().includes(selectedIndustry.toLowerCase())
        );
        if (!matchesRec && !matchesApp) {
          return false;
        }
      }

      // Mesh filter
      if (selectedMesh !== 'All' && !mineral.meshSizes.some(mesh => mesh.toLowerCase().includes(selectedMesh.toLowerCase()))) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = mineral.name.toLowerCase().includes(query);
        const matchesDesc = mineral.description.toLowerCase().includes(query);
        const matchesFormula = mineral.chemicalFormula.toLowerCase().includes(query);
        const matchesGrades = mineral.grades.some(g => g.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesFormula && !matchesGrades) {
          return false;
        }
      }

      // Whiteness rough match
      const whitenessMatch = mineral.brightnessWhiteness.match(/(\d+(\.\d+)?)/);
      if (whitenessMatch) {
        const val = parseFloat(whitenessMatch[1]);
        if (val < minWhiteness) {
          return false;
        }
      }

      return true;
    });
  }, [selectedIndustry, selectedMesh, searchQuery, minWhiteness]);

  return (
    <section id="finder" className="py-16 bg-slate-950 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Grade & Mesh Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            Find the Optimal Mineral Grade for Your Application
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Filter our mineral formulations by target manufacturing sector, mesh fineness, or chemical assay to match your exact production specs.
          </p>
        </div>

        {/* Filter Bar Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
          
          {/* Search bar & quick reset */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search mineral name, formula (e.g. CaCO3, SiO2), or grade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            {(selectedIndustry !== 'All' || selectedMesh !== 'All' || searchQuery !== '' || minWhiteness > 80) && (
              <button
                onClick={() => {
                  setSelectedIndustry('All');
                  setSelectedMesh('All');
                  setSearchQuery('');
                  setMinWhiteness(80);
                }}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 whitespace-nowrap transition-colors"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* Industry Selection Tabs */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>Target Manufacturing Industry</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {industriesList.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                    selectedIndustry === ind
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {/* Mesh Size & Whiteness Range */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2 border-t border-slate-800">
            {/* Mesh size buttons */}
            <div className="md:col-span-8">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Particle Size / Mesh Fineness
              </label>
              <div className="flex flex-wrap gap-2">
                {meshOptions.map((mesh) => (
                  <button
                    key={mesh}
                    onClick={() => setSelectedMesh(mesh)}
                    className={`text-xs px-2.5 py-1 rounded-md font-mono transition-all ${
                      selectedMesh === mesh
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-600 hover:text-slate-200'
                    }`}
                  >
                    {mesh}
                  </button>
                ))}
              </div>
            </div>

            {/* Whiteness Slider */}
            <div className="md:col-span-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-300">Min. Whiteness:</span>
                <span className="font-mono font-bold text-amber-400">{minWhiteness}%+</span>
              </div>
              <input
                type="range"
                min="80"
                max="98"
                step="1"
                value={minWhiteness}
                onChange={(e) => setMinWhiteness(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>80%</span>
                <span>90%</span>
                <span>98%</span>
              </div>
            </div>
          </div>

        </div>

        {/* Results Counter and Cards */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              Found <strong className="text-amber-400 font-bold">{filteredMinerals.length}</strong> matching mineral grades
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Click "View Technical Data Sheet" for full chemical breakdown & test standards
            </span>
          </div>

          {filteredMinerals.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
              <Info className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-300">No matching minerals found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Try widening your whiteness threshold or resetting the mesh size to explore our complete mineral inventory.
              </p>
              <button
                onClick={() => {
                  setSelectedIndustry('All');
                  setSelectedMesh('All');
                  setSearchQuery('');
                  setMinWhiteness(80);
                }}
                className="mt-4 px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-400 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMinerals.map((mineral) => (
                <div 
                  key={mineral.id}
                  className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-amber-500/5 group"
                >
                  <div className="space-y-3">
                    {/* Category & Whiteness badge */}
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium border border-slate-700">
                        {mineral.category}
                      </span>
                      <span className="font-mono text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Whiteness: {mineral.brightnessWhiteness.split('(')[0]}
                      </span>
                    </div>

                    {/* Title & Formula */}
                    <div>
                      <h3 className="font-heading font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                        {mineral.name}
                      </h3>
                      <div className="text-xs font-mono text-slate-400 mt-0.5">
                        Formula: {mineral.chemicalFormula}
                      </div>
                    </div>

                    {/* Tagline */}
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {mineral.tagline}
                    </p>

                    {/* Mesh Sizes badges */}
                    <div>
                      <div className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider mb-1.5">
                        Available Fineness:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {mineral.meshSizes.map((mesh, mIdx) => (
                          <span
                            key={mIdx}
                            className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                              selectedMesh !== 'All' && mesh.toLowerCase().includes(selectedMesh.toLowerCase())
                                ? 'bg-amber-400 text-slate-950 font-bold'
                                : 'bg-slate-950 text-slate-400 border border-slate-800'
                            }`}
                          >
                            {mesh}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key stats row */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                      <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                        <span className="text-slate-500 block text-[10px]">Purity Assay:</span>
                        <span className="text-slate-200 font-medium">{mineral.purity}</span>
                      </div>
                      <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                        <span className="text-slate-500 block text-[10px]">Indicative Price:</span>
                        <span className="text-amber-400 font-semibold">{mineral.typicalPriceRange}</span>
                      </div>
                    </div>

                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center gap-2">
                    <button
                      onClick={() => onSelectMineralForTds(mineral)}
                      className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span>View TDS</span>
                    </button>

                    <button
                      onClick={() => onOpenQuote(mineral.id)}
                      className="flex-1 py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenSample(mineral.id)}
                      title="Request Lab Testing Sample"
                      className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 transition-colors"
                    >
                      <Package className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
