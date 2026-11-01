import React, { useState, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  FileText, 
  Package, 
  Sparkles, 
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/minerals';

interface NavbarProps {
  onOpenQuote: (mineralId?: string) => void;
  onOpenSample: (mineralId?: string) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuote,
  onOpenSample,
  activeSection,
  setActiveSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [logoVideoActive, setLogoVideoActive] = useState(false);
  const logoVideoRef = useRef<HTMLVideoElement>(null);
  const logoLeaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (logoLeaveTimerRef.current) clearTimeout(logoLeaveTimerRef.current);
    setLogoVideoActive(true);
    if (logoVideoRef.current) {
      logoVideoRef.current.currentTime = 0;
      logoVideoRef.current.play().catch(() => {});
    }
  };

  const handleLogoMouseLeave = () => {
    if (logoLeaveTimerRef.current) clearTimeout(logoLeaveTimerRef.current);
    logoLeaveTimerRef.current = setTimeout(() => {
      setLogoVideoActive(false);
      setTimeout(() => {
        if (logoVideoRef.current) {
          logoVideoRef.current.pause();
          logoVideoRef.current.currentTime = 0;
        }
      }, 300);
    }, 250);
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-lg">
      {/* Top utility contact ribbon */}
      <div className="bg-slate-950 border-b border-slate-800 text-xs text-slate-400 py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              C2/29C Lawrence Road, Keshav Puram, Delhi-110035
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Mon - Sat: 9:00 AM - 7:30 PM IST
            </span>
            <span className="hidden lg:inline-block bg-slate-800 text-amber-400 font-mono text-[11px] px-2 py-0.5 rounded border border-amber-500/20">
              GST: {COMPANY_DETAILS.gstNumber}
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a 
              href={`tel:${COMPANY_DETAILS.phonePrimary.replace(/[^0-9+]/g, '')}`} 
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{COMPANY_DETAILS.phonePrimary}</span>
            </a>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a 
              href={`mailto:${COMPANY_DETAILS.emailSales}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-slate-200 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              <span>{COMPANY_DETAILS.emailSales}</span>
            </a>
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Deepali%20Minerals,%20I%20would%20like%20to%20discuss%20my%20industrial%20mineral%20requirement.`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-[11px] px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors"
            >
              <span>WhatsApp Sales Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          {/* Logo with interactive animated reveal */}
          <div 
            className="brand-wrapper"
            onMouseEnter={handleLogoMouseEnter}
            onMouseLeave={handleLogoMouseLeave}
          >
            <button 
              onClick={() => scrollTo('hero')} 
              className="dm-interactive-logo flex items-center gap-3 text-left group focus:outline-none"
              data-dm-logo="true"
            >
              <div className="rounded-lg shadow-md group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden">
                <img 
                  src="/assets/images/brand/logo.png" 
                  alt="Deepali Minerals" 
                  className="w-full h-auto max-h-12 max-w-[175px] object-contain block rounded-lg" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="hidden sm:block">
                <span className="block text-[10px] tracking-wider uppercase text-slate-400 font-semibold">
                  Industrial Materials Leader
                </span>
                <span className="block text-[9px] text-amber-400/90 font-mono">
                  Mfg. & Supplier Since 2004
                </span>
              </div>
            </button>

            <div 
              className={`brand-video-popover ${logoVideoActive ? 'is-active' : ''}`}
              aria-hidden={!logoVideoActive}
            >
              <video
                ref={logoVideoRef}
                className="brand-animated-video"
                muted
                playsInline
                preload="none"
                onEnded={() => {
                  setLogoVideoActive(false);
                  if (logoVideoRef.current) {
                    logoVideoRef.current.pause();
                    logoVideoRef.current.currentTime = 0;
                  }
                }}
              >
                <source src="/Cinematic_logo_animation_script_1080p_20260928120021.mp4" type="video/mp4" />
              </video>
              <button 
                type="button" 
                className="brand-video-close" 
                aria-label="Close animation"
                tabIndex={-1}
                onClick={(e) => {
                  e.stopPropagation();
                  setLogoVideoActive(false);
                  if (logoVideoRef.current) {
                    logoVideoRef.current.pause();
                    logoVideoRef.current.currentTime = 0;
                  }
                }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => scrollTo('hero')}
              className={`hover:text-amber-400 transition-colors py-1 ${activeSection === 'hero' ? 'text-amber-400' : ''}`}
            >
              Home
            </button>

            {/* Products Dropdown */}
            <div className="relative" onMouseLeave={() => setProductsDropdownOpen(false)}>
              <button
                onClick={() => scrollTo('products')}
                onMouseEnter={() => setProductsDropdownOpen(true)}
                className={`flex items-center gap-1 hover:text-amber-400 transition-colors py-1 ${activeSection === 'products' ? 'text-amber-400' : ''}`}
              >
                <span>Mineral Catalog</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {productsDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1.5">
                    Core Minerals
                  </div>
                  <div className="space-y-1">
                    {[
                      { name: 'Talc Powder (Cosmetic & Industrial)', id: 'products' },
                      { name: 'Calcium Carbonate (PCC / GCC)', id: 'products' },
                      { name: 'China Clay / Kaolin (Calcined & Levigated)', id: 'products' },
                      { name: 'Calcite & Dolomite Powder', id: 'products' },
                      { name: 'Quicklime & Hydrated Lime', id: 'products' },
                      { name: 'Silica, Barytes & Zinc Oxide', id: 'products' }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollTo(item.id)}
                        className="w-full text-left text-xs px-3 py-2 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-900 transition-colors flex items-center justify-between group"
                      >
                        <span>{item.name}</span>
                        <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-800/80 px-3">
                    <button
                      onClick={() => scrollTo('finder')}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Use Grade & Mesh Finder</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollTo('finder')}
              className={`hover:text-amber-400 transition-colors py-1 ${activeSection === 'finder' ? 'text-amber-400' : ''}`}
            >
              Grade Finder
            </button>

            <button
              onClick={() => scrollTo('industries')}
              className={`hover:text-amber-400 transition-colors py-1 ${activeSection === 'industries' ? 'text-amber-400' : ''}`}
            >
              Industries Served
            </button>

            <button
              onClick={() => scrollTo('quality')}
              className={`hover:text-amber-400 transition-colors py-1 ${activeSection === 'quality' ? 'text-amber-400' : ''}`}
            >
              Testing Lab & QA
            </button>

            <button
              onClick={() => scrollTo('about')}
              className={`hover:text-amber-400 transition-colors py-1 ${activeSection === 'about' ? 'text-amber-400' : ''}`}
            >
              About Us
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className={`hover:text-amber-400 transition-colors py-1 ${activeSection === 'contact' ? 'text-amber-400' : ''}`}
            >
              Contact
            </button>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenSample()}
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Package className="w-3.5 h-3.5 text-amber-400" />
              <span>Request Sample</span>
            </button>

            <button
              onClick={() => onOpenQuote()}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 active:scale-95"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Get Instant Quote</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenQuote()}
              className="px-2.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 rounded-md"
            >
              Quotation
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-t border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenQuote(); }}
                className="py-2.5 px-3 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>Instant Quotation</span>
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenSample(); }}
                className="py-2.5 px-3 rounded-lg bg-slate-800 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700"
              >
                <Package className="w-4 h-4 text-amber-400" />
                <span>Order Sample</span>
              </button>
            </div>

            <div className="space-y-1 text-sm font-medium">
              {[
                { label: 'Home', id: 'hero' },
                { label: 'Mineral Products Catalog', id: 'products' },
                { label: 'Interactive Grade & Mesh Finder', id: 'finder' },
                { label: 'Industries Served', id: 'industries' },
                { label: 'Testing Lab & Quality Assurance', id: 'quality' },
                { label: 'About Deepali Minerals & Leadership', id: 'about' },
                { label: 'Factory & Head Office Contact', id: 'contact' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollTo(item.id)}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-amber-400 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                {COMPANY_DETAILS.phonePrimary}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                {COMPANY_DETAILS.emailSales}
              </p>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
