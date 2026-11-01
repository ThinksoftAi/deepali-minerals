import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveFinder } from './components/InteractiveFinder';
import { ProductCatalog } from './components/ProductCatalog';
import { IndustriesSection } from './components/IndustriesSection';
import { QualityLabSection } from './components/QualityLabSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TdsModal } from './components/TdsModal';
import { QuoteCalculatorModal } from './components/QuoteCalculatorModal';
import { SampleRequestModal } from './components/SampleRequestModal';
import { MineralProduct, MINERALS_DATA, COMPANY_DETAILS } from './data/minerals';
import { MessageSquare, Calculator, ArrowUp } from 'lucide-react';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  
  // Modals state
  const [selectedMineralForTds, setSelectedMineralForTds] = useState<MineralProduct | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [sampleModalOpen, setSampleModalOpen] = useState<boolean>(false);
  const [targetMineralId, setTargetMineralId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY >= 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenQuote = (mineralId?: string) => {
    setTargetMineralId(mineralId);
    setQuoteModalOpen(true);
  };

  const handleOpenSample = (mineralId?: string) => {
    setTargetMineralId(mineralId);
    setSampleModalOpen(true);
  };

  const handleSelectMineralForTds = (mineral: MineralProduct) => {
    setSelectedMineralForTds(mineral);
  };

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Primary Navigation */}
      <Navbar
        onOpenQuote={handleOpenQuote}
        onOpenSample={handleOpenSample}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenQuote={() => handleOpenQuote()}
          onOpenSample={() => handleOpenSample()}
          onExploreProducts={() => scrollTo('products')}
          onOpenFinder={() => scrollTo('finder')}
        />

        <InteractiveFinder
          onSelectMineralForTds={handleSelectMineralForTds}
          onOpenQuote={handleOpenQuote}
          onOpenSample={handleOpenSample}
        />

        <ProductCatalog
          onSelectMineralForTds={handleSelectMineralForTds}
          onOpenQuote={handleOpenQuote}
          onOpenSample={handleOpenSample}
        />

        <IndustriesSection
          onOpenQuote={() => handleOpenQuote()}
          onOpenSample={() => handleOpenSample()}
          onFilterByIndustry={(_ind) => {
            scrollTo('finder');
          }}
        />

        <QualityLabSection
          onOpenSample={() => handleOpenSample()}
          onOpenQuote={() => handleOpenQuote()}
        />

        <AboutSection
          onOpenQuote={() => handleOpenQuote()}
          onOpenContact={() => scrollTo('contact')}
        />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onSelectMineral={(id) => {
          const m = MINERALS_DATA.find(x => x.id === id);
          if (m) handleSelectMineralForTds(m);
        }}
        onOpenQuote={() => handleOpenQuote()}
        onOpenSample={() => handleOpenSample()}
      />

      {/* Floating WhatsApp, Back-to-Top, and Quick RFQ Buttons */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5 pointer-events-none">
        <button
          onClick={() => handleOpenQuote()}
          className="hidden sm:flex pointer-events-auto items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900 text-amber-400 border border-amber-500/40 hover:bg-slate-800 shadow-xl text-xs font-bold transition-all hover:scale-105"
        >
          <Calculator className="w-4 h-4 text-amber-400" />
          <span>Quick Quotation</span>
        </button>

        {showBackToTop && (
          <button
            type="button"
            onClick={() => {
              const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
              window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
            }}
            className="pointer-events-auto w-10 h-10 rounded-full bg-slate-900 border border-slate-700/80 text-slate-200 hover:text-white hover:bg-slate-800 shadow-xl flex items-center justify-center transition-all hover:-translate-y-0.5"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <a
          href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Deepali%20Minerals,%20I%20would%20like%20to%20discuss%20my%20industrial%20mineral%20requirement.`}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all group font-semibold text-xs"
          title="Direct WhatsApp with Deepali Minerals Sales Desk"
        >
          <MessageSquare className="w-5 h-5 text-white" />
          <span className="hidden md:inline">WhatsApp Sales Desk</span>
        </a>
      </div>

      {/* TDS Technical Data Sheet Modal */}
      {selectedMineralForTds && (
        <TdsModal
          mineral={selectedMineralForTds}
          onClose={() => setSelectedMineralForTds(null)}
          onOpenQuote={handleOpenQuote}
          onOpenSample={handleOpenSample}
        />
      )}

      {/* Request for Quotation (RFQ) Calculator Modal */}
      {quoteModalOpen && (
        <QuoteCalculatorModal
          initialMineralId={targetMineralId}
          onClose={() => setQuoteModalOpen(false)}
        />
      )}

      {/* Laboratory Sample Order Modal */}
      {sampleModalOpen && (
        <SampleRequestModal
          initialMineralId={targetMineralId}
          onClose={() => setSampleModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
