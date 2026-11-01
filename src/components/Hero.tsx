import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Download, 
  PackageCheck, 
  Award, 
  Truck, 
  Layers, 
  CheckCircle2,
  FileSpreadsheet,
  Volume2,
  VolumeX
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/minerals';

interface HeroProps {
  onOpenQuote: () => void;
  onOpenSample: () => void;
  onExploreProducts: () => void;
  onOpenFinder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenQuote,
  onOpenSample,
  onExploreProducts,
  onOpenFinder
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);

  const toggleSound = () => {
    if (videoRef.current) {
      if (videoRef.current.muted) {
        videoRef.current.muted = false;
        videoRef.current.volume = volume || 1.0;
        videoRef.current.play().catch(() => {});
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val > 0) {
        if (videoRef.current.muted) {
          videoRef.current.muted = false;
          videoRef.current.play().catch(() => {});
        }
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-slate-950 border-b border-slate-800">
      {/* Background Facility Video */}
      <div 
        onClick={toggleSound}
        className="absolute inset-0 w-full h-full overflow-hidden z-0 cursor-pointer" 
        title="Click anywhere on video to toggle facility sound"
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover object-right-bottom"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Deepali Minerals industrial manufacturing facility video"
        >
          <source src="/hero%20video%20DM%20watermark%20(1).mp4" type="video/mp4" />
        </video>
        {/* Subtle dark charcoal translucent overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/50 to-transparent" />
      </div>

      {/* Floating Sound Toggle Dock on Video */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <div className="flex items-center gap-2 p-1 rounded-full bg-slate-950/90 border border-slate-700/80 backdrop-blur-md shadow-2xl">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSound();
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all shadow-md ${
              isMuted 
                ? 'bg-slate-900/90 text-slate-200 border border-amber-400/60 hover:bg-slate-800 hover:text-white hover:border-amber-300' 
                : 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/70 shadow-emerald-900/40 hover:bg-emerald-900/90'
            }`}
            aria-label={isMuted ? 'Play facility video sound' : 'Mute facility video sound'}
            title={isMuted ? 'Click to play facility video sound' : 'Click to mute sound'}
          >
            <span 
              className={`w-2 h-2 rounded-full ${isMuted ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} 
              aria-hidden="true" 
            />
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-amber-300" />
                <span>Play Video Sound</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Sound On (Mute)</span>
              </>
            )}
          </button>

          {!isMuted && (
            <div 
              className="flex items-center gap-1.5 pr-3 pl-1 text-[11px] font-mono text-slate-300" 
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-14 h-1.5 accent-emerald-400 cursor-pointer rounded-lg bg-slate-700"
                aria-label="Video volume"
              />
              <span className="w-7 text-right">{Math.round(volume * 100)}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Background ambient grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-amber-500/30 text-xs font-semibold text-amber-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Deepali Minerals • Leading Manufacturer & Trader Since 2004</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Engineered Industrial Minerals & Chemical Extenders
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Supplying high-purity <span className="text-amber-400 font-semibold">Talc Powder</span>, <span className="text-amber-400 font-semibold">Calcium Carbonate (PCC/GCC)</span>, <span className="text-amber-400 font-semibold">China Clay</span>, <span className="text-amber-400 font-semibold">Calcite</span>, and <span className="text-amber-400 font-semibold">Hydrated Lime</span>. Micronized from 300 Mesh down to 2-micron sub-sieve particles for cosmetics, plastics, paints, rubber, and cables.
            </p>

            {/* Value bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 max-w-xl mx-auto lg:mx-0 text-left text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Asbestos-Free & Heavy Metal Tested</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hunter Whiteness &gt; 98.5% Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>50,000+ MT Annual Processing Capacity</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pan-India Logistics & Containerized Exports</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenQuote}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/35 transition-all transform active:scale-95"
              >
                <span>Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSample}
                className="px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-700 flex items-center gap-2 transition-all"
              >
                <PackageCheck className="w-4 h-4 text-amber-400" />
                <span>Order Lab Sample</span>
              </button>

              <button
                onClick={onOpenFinder}
                className="px-4 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/60 text-slate-300 hover:text-amber-300 font-medium text-sm flex items-center gap-2 border border-slate-800 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Grade Finder</span>
              </button>

              <button
                type="button"
                onClick={toggleSound}
                className={`px-4 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 border shadow-md transition-all ${
                  isMuted
                    ? 'bg-slate-900/90 hover:bg-slate-800 text-white border-amber-400/70 hover:border-amber-300'
                    : 'bg-emerald-950/90 hover:bg-emerald-900/90 text-emerald-300 border-emerald-500/70'
                }`}
                aria-label={isMuted ? 'Play facility video sound' : 'Mute facility video sound'}
                title={isMuted ? 'Click to play facility video sound' : 'Click to mute sound'}
              >
                <span 
                  className={`w-2 h-2 rounded-full ${isMuted ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} 
                  aria-hidden="true" 
                />
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-amber-300" />
                ) : (
                  <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                )}
                <span>{isMuted ? 'Play Video Sound' : 'Sound On (Mute)'}</span>
              </button>
            </div>

            {/* Trust badge icons */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Batch COA & TDS Provided</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>Direct Plant Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Hero Feature Card & Quick Mineral Selector */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-2xl backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <span className="font-heading font-bold text-white text-base">Key Mineral Specifications</span>
                </div>
                <span className="text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded">
                  Ready Stock
                </span>
              </div>

              {/* Interactive preview pills */}
              <div className="space-y-3 pt-4">
                {[
                  {
                    name: 'Cosmetic Talc USP',
                    purity: '98.5% Min',
                    whiteness: '98.2%',
                    mesh: '1250 - 2 Micron',
                    highlight: 'Asbestos-free sterilized'
                  },
                  {
                    name: 'Calcium Carbonate (GCC/PCC)',
                    purity: '99.2% CaCO3',
                    whiteness: '98.8%',
                    mesh: '300 to 2500 Mesh',
                    highlight: 'Stearic acid coated available'
                  },
                  {
                    name: 'China Clay / Kaolin',
                    purity: 'Low Iron <0.5%',
                    whiteness: '92.5%',
                    mesh: 'Levigated & Calcined',
                    highlight: 'High green strength'
                  },
                  {
                    name: 'Micronized Calcite',
                    purity: '98.8% Min',
                    whiteness: '98.5%',
                    mesh: '500 - 1250 Mesh',
                    highlight: 'PVC pipe & masterbatch'
                  },
                  {
                    name: 'Hydrated Lime Ca(OH)2',
                    purity: '>90% Active',
                    whiteness: '91.0%',
                    mesh: '300 Mesh Fine',
                    highlight: 'Water & ETP treatment'
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-amber-500/40 transition-colors group flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-semibold text-slate-100 text-xs sm:text-sm group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>Purity: {item.purity}</span>
                        <span>•</span>
                        <span>Mesh: {item.mesh}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono font-bold text-amber-400">
                        {item.whiteness}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Whiteness
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                <button
                  onClick={onExploreProducts}
                  className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>View All 12 Mineral TDS</span>
                </button>
                <button
                  onClick={onOpenQuote}
                  className="text-slate-300 hover:text-white font-medium flex items-center gap-1 transition-colors"
                >
                  <span>Quick Estimate</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>

            {/* Client banner ticker */}
            <div className="bg-slate-950/80 border border-slate-800/70 rounded-xl p-3 text-center">
              <span className="text-[11px] text-slate-400 font-medium">
                Trusted by industry leaders including <strong className="text-slate-200">Vi-John Cosmetics</strong>, <strong className="text-slate-200">Aryan Veda</strong>, and <strong className="text-slate-200">Prestige Cable</strong>
              </span>
            </div>
          </div>

        </div>

        {/* Bottom stats ribbon */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-400">
              {COMPANY_DETAILS.experienceYears}
            </div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
              Industry Experience (Est. 2004)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-400">
              50,000+
            </div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
              Metric Tons Capacity / Year
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-400">
              300M - 2µm
            </div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
              Precision Micronization Range
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-400">
              500+
            </div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
              Manufacturing Clients Served
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
