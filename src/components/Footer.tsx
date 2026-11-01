import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ArrowUp,
  ExternalLink
} from 'lucide-react';
import { COMPANY_DETAILS, MINERALS_DATA } from '../data/minerals';

interface FooterProps {
  onSelectMineral: (mineralId: string) => void;
  onOpenQuote: () => void;
  onOpenSample: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectMineral,
  onOpenQuote,
  onOpenSample
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* Top Banner Ribbon */}
      <div className="border-b border-slate-800/80 py-8 px-4 sm:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold font-heading text-white">
              Ready to Optimize Your Industrial Mineral Sourcing?
            </h3>
            <p className="text-slate-400 text-xs">
              Order laboratory testing samples or request proforma factory quotations directly from Delhi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenSample()}
              className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
            >
              Request Free Sample (500g)
            </button>
            <button
              onClick={() => onOpenQuote()}
              className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-amber-500/15"
            >
              Instant Quotation Calculator
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Column 1: Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="dm-interactive-logo rounded-lg shadow-md flex items-center justify-center overflow-hidden cursor-pointer" data-dm-logo="true">
              <img 
                src="/assets/images/brand/logo.png" 
                alt="Deepali Minerals" 
                className="w-full h-auto max-h-14 max-w-[190px] object-contain block rounded-lg" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Reliable processor, manufacturer, and bulk supplier of non-metallic industrial minerals and functional chemical extenders since 2004. B2B material supply for industrial manufacturing across India and worldwide.
          </p>

          <div className="p-3 rounded bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p><strong className="text-slate-200">CEO:</strong> {COMPANY_DETAILS.ceo}</p>
            <p><strong className="text-slate-200">GST:</strong> {COMPANY_DETAILS.gstNumber}</p>
            <p><strong className="text-slate-200">Business:</strong> Industrial Minerals • B2B Supply</p>
          </div>
        </div>

        {/* Column 2: Materials */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-teal-400 uppercase tracking-wider text-xs">
            Materials
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            {MINERALS_DATA.slice(0, 10).map((m) => (
              <li key={m.id}>
                <button
                  onClick={() => {
                    scrollTo('products');
                    onSelectMineral(m.id);
                  }}
                  className="hover:text-teal-300 transition-colors text-left truncate block max-w-full"
                >
                  {m.name}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => scrollTo('products')}
                className="text-teal-400 font-semibold hover:text-teal-300 transition-colors text-left"
              >
                View All Materials →
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Industries & Applications */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-teal-400 uppercase tracking-wider text-xs">
            Industries &amp; Applications
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            {['Paints', 'Plastic', 'Rubber', 'Master Batch', 'PVC', 'Paper', 'Ceramics', 'Cosmetics', 'Pharmaceutical', 'Construction'].map((ind) => (
              <li key={ind}>
                <button
                  onClick={() => scrollTo('industries')}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  {ind === 'Master Batch' ? 'Masterbatch' : ind}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => scrollTo('industries')}
                className="text-teal-400 font-semibold hover:text-teal-300 transition-colors text-left"
              >
                Explore Industries →
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Buy / Technical */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-teal-400 uppercase tracking-wider text-xs">
            Buy / Technical
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <button onClick={() => scrollTo('finder')} className="hover:text-teal-300 transition-colors text-left">
                Find Your Material
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('contact')} className="hover:text-teal-300 transition-colors text-left">
                Quotation
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('quality')} className="hover:text-teal-300 transition-colors text-left">
                Technical Resources
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('products')} className="hover:text-teal-300 transition-colors text-left">
                Product Catalogue
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('about')} className="hover:text-teal-300 transition-colors text-left">
                About Deepali Minerals
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('contact')} className="hover:text-teal-300 transition-colors text-left">
                Commercial Desk
              </button>
            </li>
            <li>
              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Deepali%20Minerals,%20I%20would%20like%20to%20discuss%20my%20industrial%20mineral%20requirement.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-semibold hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
              >
                <span>WhatsApp Sales Desk</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 5: Contact */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-teal-400 uppercase tracking-wider text-xs">
            Contact
          </h4>
          <div className="space-y-2 text-xs text-slate-400">
            <div>
              <span className="text-slate-500 uppercase tracking-wider text-[10px] font-mono block">Email:</span>
              <a href={`mailto:${COMPANY_DETAILS.emailSales}`} className="text-slate-300 hover:text-amber-400 transition-colors">
                {COMPANY_DETAILS.emailSales}
              </a>
            </div>
            <div>
              <span className="text-slate-500 uppercase tracking-wider text-[10px] font-mono block">Phone:</span>
              <a href={`tel:${COMPANY_DETAILS.phonePrimary.replace(/[^0-9+]/g, '')}`} className="text-slate-300 hover:text-amber-400 transition-colors">
                {COMPANY_DETAILS.phonePrimary}
              </a>,{' '}
              <a href={`tel:${COMPANY_DETAILS.phoneOffice.replace(/[^0-9+]/g, '')}`} className="text-slate-300 hover:text-amber-400 transition-colors">
                {COMPANY_DETAILS.phoneOffice}
              </a>
            </div>
            <div>
              <span className="text-slate-500 uppercase tracking-wider text-[10px] font-mono block">Office:</span>
              <span className="text-slate-300 block">{COMPANY_DETAILS.registeredAddress}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase tracking-wider text-[10px] font-mono block">Hours:</span>
              <span className="text-slate-300 block">{COMPANY_DETAILS.businessHours}</span>
            </div>
            <div className="pt-2">
              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Deepali%20Minerals,%20I%20would%20like%20to%20discuss%20my%20industrial%20mineral%20requirement.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-wider"
              >
                <span>WhatsApp Sales Desk</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal Copyright */}
      <div className="border-t border-slate-900 py-6 px-4 sm:px-8 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} <strong>Deepali Minerals</strong>. All Rights Reserved. Manufactured and processed in New Delhi, India.
          </p>

          <div className="flex items-center gap-4">
            <span>Mr. Neeraj Monga (CEO)</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
