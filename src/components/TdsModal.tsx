import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileCheck, 
  Package, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Layers,
  PhoneCall,
  ExternalLink
} from 'lucide-react';
import { MineralProduct, COMPANY_DETAILS } from '../data/minerals';

interface TdsModalProps {
  mineral: MineralProduct | null;
  onClose: () => void;
  onOpenQuote: (mineralId?: string) => void;
  onOpenSample: (mineralId?: string) => void;
}

export const TdsModal: React.FC<TdsModalProps> = ({
  mineral,
  onClose,
  onOpenQuote,
  onOpenSample
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!mineral) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate text/markdown TDS report and trigger download
    const content = `
===================================================================
DEEPALI MINERALS - TECHNICAL DATA SHEET (TDS)
===================================================================
Product Name:        ${mineral.name}
Category:            ${mineral.category}
Chemical Formula:    ${mineral.chemicalFormula}
Purity Assay:        ${mineral.purity}
Whiteness (Hunter L):${mineral.brightnessWhiteness}
Bulk Density:        ${mineral.bulkDensity}
Oil Absorption:      ${mineral.oilAbsorption}
pH (10% Slurry):     ${mineral.phValue}
Moisture Content:    ${mineral.moistureContent}
MOQ:                 ${mineral.minimumOrderQty}

-------------------------------------------------------------------
CHEMICAL COMPOSITION & ANALYSIS
-------------------------------------------------------------------
${mineral.chemicalAnalysis.map(c => `${c.component.padEnd(35)} : ${c.value.padEnd(20)} [Method: ${c.testMethod}]`).join('\n')}

-------------------------------------------------------------------
PHYSICAL & OPTICAL PROPERTIES
-------------------------------------------------------------------
${mineral.physicalProperties.map(p => `${p.property.padEnd(35)} : ${p.value} ${p.unit}`).join('\n')}

-------------------------------------------------------------------
AVAILABLE FINENESS / GRADES
-------------------------------------------------------------------
${mineral.grades.map(g => `- ${g}`).join('\n')}

Mesh Sizes: ${mineral.meshSizes.join(', ')}

-------------------------------------------------------------------
APPLICATIONS & END USES
-------------------------------------------------------------------
${mineral.applications.join(', ')}

-------------------------------------------------------------------
PACKAGING & LOGISTICS
-------------------------------------------------------------------
${mineral.packagingOptions.join('\n')}

===================================================================
Issued by: Quality Assurance & Technical Services Lab
DEEPALI MINERALS - Mr. Neeraj Monga (CEO)
C2/29C Lawrence Road, Keshav Puram, Delhi-110035
Phone: ${COMPANY_DETAILS.phonePrimary}, ${COMPANY_DETAILS.phoneOffice}
Email: ${COMPANY_DETAILS.emailSales} | GSTIN: ${COMPANY_DETAILS.gstNumber}
Website: https://deepaliminerals.in
===================================================================
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Deepali_Minerals_TDS_${mineral.id.toUpperCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div 
        className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-slate-950 border-b border-slate-800 p-4 sm:p-6 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded">
                TECHNICAL DATA SHEET (TDS)
              </span>
              <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">
                Formula: {mineral.chemicalFormula}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              {mineral.name}
            </h2>
            <p className="text-xs text-slate-400">
              {mineral.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDownload}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
              title="Download TDS Text File"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">
                {downloadSuccess ? 'Downloaded!' : 'Download TDS'}
              </span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
              title="Print Document"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-300 text-slate-400 transition-colors"
              aria-label="Close TDS Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-200 text-xs sm:text-sm">
          
          {/* Quick specs overview banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-medium">Assay Purity</span>
              <span className="text-sm font-mono font-bold text-amber-400">{mineral.purity}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-medium">Hunter Whiteness</span>
              <span className="text-sm font-mono font-bold text-slate-100">{mineral.brightnessWhiteness}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-medium">pH (10% Slurry)</span>
              <span className="text-sm font-mono font-bold text-slate-100">{mineral.phValue}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-medium">Bulk Density</span>
              <span className="text-sm font-mono font-bold text-slate-100">{mineral.bulkDensity}</span>
            </div>
          </div>

          {/* Chemical Analysis Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-slate-100 text-sm sm:text-base flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-amber-400" />
                <span>Typical Chemical Composition & Assay</span>
              </h3>
              <span className="text-[10px] text-slate-500">Certified by In-House Laboratory</span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-[11px] text-slate-400 uppercase font-semibold">
                    <th className="py-2.5 px-4">Chemical Constituent</th>
                    <th className="py-2.5 px-4">Standard Value</th>
                    <th className="py-2.5 px-4">Test Methodology</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-mono text-xs">
                  {mineral.chemicalAnalysis.map((chem, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-4 font-sans font-medium text-slate-200">{chem.component}</td>
                      <td className="py-2.5 px-4 text-amber-400 font-bold">{chem.value}</td>
                      <td className="py-2.5 px-4 text-slate-400">{chem.testMethod}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Physical & Optical Properties Table */}
          <div className="space-y-2">
            <h3 className="font-heading font-bold text-slate-100 text-sm sm:text-base flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Physical, Optical & Rheological Parameters</span>
            </h3>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-[11px] text-slate-400 uppercase font-semibold">
                    <th className="py-2.5 px-4">Parameter</th>
                    <th className="py-2.5 px-4">Observed Value</th>
                    <th className="py-2.5 px-4">Unit of Measurement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-mono text-xs">
                  {mineral.physicalProperties.map((phys, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-4 font-sans font-medium text-slate-200">{phys.property}</td>
                      <td className="py-2.5 px-4 text-slate-100 font-bold">{phys.value}</td>
                      <td className="py-2.5 px-4 text-slate-400">{phys.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Grades Available & Applications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider text-amber-400">
                Commercial Grades Formulated
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {mineral.grades.map((grade, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{grade}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider text-amber-400">
                Packaging & Handling Specifications
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {mineral.packagingOptions.map((pack, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Package className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{pack}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 text-[11px] text-slate-500">
                Storage: Store in dry, well-ventilated warehouse on wooden pallets away from moisture and direct sunlight. Shelf life: 24 months.
              </div>
            </div>
          </div>

          {/* Quality Disclaimer */}
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 flex items-start gap-3 text-xs text-amber-200/90">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>Quality Assurance Note:</strong> The above technical values represent typical results from lot-by-lot QC tests conducted in accordance with ASTM and IS specifications. Certificate of Analysis (COA) is provided with each commercial batch dispatched from our Lawrence Road, New Delhi facility.
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950 border-t border-slate-800 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            <span>Minimum Order: </span>
            <strong className="text-slate-200">{mineral.minimumOrderQty}</strong>
            <span className="mx-2">•</span>
            <span>Est. Rate: </span>
            <strong className="text-amber-400">{mineral.typicalPriceRange}</strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenSample(mineral.id);
              }}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
            >
              <Package className="w-3.5 h-3.5 text-amber-400" />
              <span>Order Lab Sample</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenQuote(mineral.id);
              }}
              className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-amber-500/20"
            >
              <span>Request Custom Quotation</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
