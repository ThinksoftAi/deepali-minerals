import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';
import { execSync } from 'child_process';

const assetsDir = path.resolve('assets/images/products');
const publicDir = path.resolve('public/assets/images/products');

fs.mkdirSync(assetsDir, { recursive: true });
fs.mkdirSync(publicDir, { recursive: true });

// Color palettes and configurations for each product
const productConfigs = [
  {
    filename: 'talc-powder.webp',
    name: 'TALC POWDER',
    subTitle: 'Hydrated Magnesium Silicate • USP & Micro Grade',
    category: 'MINERAL POWDER',
    powderColor: '#FAFAFA',
    powderShadow: '#E5E7EB',
    rockColor1: '#E2E8F0',
    rockColor2: '#CBD5E1',
    accentColor: '#0072EA',
    hasRock: true,
    rockType: 'talc-plates',
    badgeText: 'ISO 9001:2015 QA TESTED'
  },
  {
    filename: 'soap-stone-powder.webp',
    name: 'SOAP STONE POWDER',
    subTitle: 'Natural Steatite • High Slip & Thermal Stability',
    category: 'MINERAL POWDER',
    powderColor: '#F4F5F7',
    powderShadow: '#D8DDE4',
    rockColor1: '#CBD5E1',
    rockColor2: '#94A3B8',
    accentColor: '#3B82F6',
    hasRock: true,
    rockType: 'soapstone-block',
    badgeText: 'INDUSTRIAL LUBRICANT GRADE'
  },
  {
    filename: 'chalk-powder.webp',
    name: 'NATURAL CHALK POWDER',
    subTitle: 'Calcium Carbonate • 300 to 500 Mesh Anti-Tack',
    category: 'MINERAL POWDER',
    powderColor: '#FFFFFF',
    powderShadow: '#E2E8F0',
    rockColor1: '#F1F5F9',
    rockColor2: '#CBD5E1',
    accentColor: '#64748B',
    hasRock: true,
    rockType: 'chalk-lump',
    badgeText: 'RUBBER & CABLE DUSTING'
  },
  {
    filename: 'hydrated-lime-powder.webp',
    name: 'HYDRATED LIME',
    subTitle: 'Calcium Hydroxide Ca(OH)₂ • Slaked Chemical Grade',
    category: 'FUNCTIONAL CHEMICAL',
    powderColor: '#FFFFFF',
    powderShadow: '#E2E8F0',
    rockColor1: '#E2E8F0',
    rockColor2: '#CBD5E1',
    accentColor: '#0284C7',
    hasRock: true,
    rockType: 'lime-lump',
    badgeText: 'ETP & CHEMICAL PURITY'
  },
  {
    filename: 'china-clay-powder.webp',
    name: 'CHINA CLAY (KAOLIN)',
    subTitle: 'Hydrous Aluminum Silicate • Levigated Ceramic Grade',
    category: 'MINERAL POWDER',
    powderColor: '#F8F9FA',
    powderShadow: '#E9ECEF',
    rockColor1: '#E2E8F0',
    rockColor2: '#CBD5E1',
    accentColor: '#0D9488',
    hasRock: true,
    rockType: 'clay-lump',
    badgeText: 'LEVIGATED CERAMIC SLIP'
  },
  {
    filename: 'kaoline-clay-powder.webp',
    name: 'KAOLINE POWDER',
    subTitle: 'Calcined High Brightness Kaolin • Pharma & Coating',
    category: 'MINERAL POWDER',
    powderColor: '#FFFFFF',
    powderShadow: '#E5E7EB',
    rockColor1: '#F8FAFC',
    rockColor2: '#E2E8F0',
    accentColor: '#0284C7',
    hasRock: true,
    rockType: 'calcined-lump',
    badgeText: 'HIGH OPACITY COATING'
  },
  {
    filename: 'marble-powder.webp',
    name: 'MARBLE POWDER',
    subTitle: 'Pure Crystalline Calcium Carbonate • Super White',
    category: 'MINERAL POWDER',
    powderColor: '#FFFFFF',
    powderShadow: '#E2E8F0',
    rockColor1: '#F1F5F9',
    rockColor2: '#E2E8F0',
    accentColor: '#475569',
    hasRock: true,
    rockType: 'marble-chunk',
    badgeText: 'WALL PUTTY & TERRAZZO'
  },
  {
    filename: 'quartz-powder.webp',
    name: 'QUARTZ POWDER',
    subTitle: 'Micronized Silicon Dioxide (SiO₂) • Mohs Hardness 7',
    category: 'MINERAL POWDER',
    powderColor: '#F8FAFC',
    powderShadow: '#E2E8F0',
    rockColor1: '#E2E8F0',
    rockColor2: '#94A3B8',
    accentColor: '#2563EB',
    hasRock: true,
    rockType: 'quartz-crystal',
    badgeText: 'OPTICAL PURITY MESH'
  },
  {
    filename: 'calcium-carbonate-powder.webp',
    name: 'CALCIUM CARBONATE',
    subTitle: 'PCC, GCC & Stearic Coated Grades • Rigid PVC & Masterbatch',
    category: 'MINERAL POWDER',
    powderColor: '#FFFFFF',
    powderShadow: '#E5E7EB',
    rockColor1: '#F1F5F9',
    rockColor2: '#CBD5E1',
    accentColor: '#0072EA',
    hasRock: true,
    rockType: 'calcite-rock',
    badgeText: 'POLYMER IMPACT MODIFIER'
  },
  {
    filename: 'red-oxide-powder.webp',
    name: 'RED OXIDE PIGMENT',
    subTitle: 'Ferric Oxide (Fe₂O₃) • Anti-Corrosive Industrial Primer',
    category: 'FUNCTIONAL CHEMICAL',
    powderColor: '#991B1B',
    powderShadow: '#7F1D1D',
    rockColor1: '#7F1D1D',
    rockColor2: '#450A0A',
    accentColor: '#DC2626',
    hasRock: true,
    rockType: 'hematite-ore',
    badgeText: 'ANTI-CORROSION FORMULA'
  },
  {
    filename: 'polyester-resin.webp',
    name: 'POLYESTER RESIN',
    subTitle: 'Unsaturated Thermosetting Resin • FRP Composite Matrix',
    category: 'FUNCTIONAL CHEMICAL',
    powderColor: '#F59E0B',
    powderShadow: '#D97706',
    rockColor1: '#FBBF24',
    rockColor2: '#B45309',
    accentColor: '#D97706',
    hasRock: false,
    rockType: 'resin-liquid',
    badgeText: 'COMPOSITE RESIN SYSTEM'
  },
  {
    filename: 'zinc-oxide-powder.webp',
    name: 'ZINC OXIDE (ZnO)',
    subTitle: 'White Seal & Active Rubber Grade • Elastomer Activator',
    category: 'FUNCTIONAL CHEMICAL',
    powderColor: '#FFFFFF',
    powderShadow: '#E2E8F0',
    rockColor1: '#F8FAFC',
    rockColor2: '#CBD5E1',
    accentColor: '#2563EB',
    hasRock: true,
    rockType: 'zinc-pellets',
    badgeText: 'VULCANIZATION ACTIVATOR'
  },
  {
    filename: 'zinc-stearates-powder.webp',
    name: 'ZINC STEARATES',
    subTitle: 'Hydrophobic Metal Soap • Polymer Internal Lubricant',
    category: 'FUNCTIONAL CHEMICAL',
    powderColor: '#FFFFFF',
    powderShadow: '#E2E8F0',
    rockColor1: '#F8FAFC',
    rockColor2: '#E2E8F0',
    accentColor: '#4F46E5',
    hasRock: true,
    rockType: 'stearate-floc',
    badgeText: 'HEAT STABILIZER & RELEASE'
  },
  {
    filename: 'magnesium-carbonate-powder.webp',
    name: 'MAGNESIUM CARBONATE',
    subTitle: 'Light Basic MgCO₃ • Gym Chalk & Low Density Filler',
    category: 'MINERAL POWDER',
    powderColor: '#FFFFFF',
    powderShadow: '#E2E8F0',
    rockColor1: '#F8FAFC',
    rockColor2: '#E2E8F0',
    accentColor: '#059669',
    hasRock: true,
    rockType: 'gym-block',
    badgeText: 'ULTRA-LIGHT ABSORBENT'
  },
  {
    filename: 'dolomite-powder.webp',
    name: 'DOLOMITE POWDER',
    subTitle: 'Calcium Magnesium Carbonate CaMg(CO₃)₂ • Putty & Paint',
    category: 'MINERAL POWDER',
    powderColor: '#F8FAFC',
    powderShadow: '#E2E8F0',
    rockColor1: '#E2E8F0',
    rockColor2: '#94A3B8',
    accentColor: '#0284C7',
    hasRock: true,
    rockType: 'dolomite-rock',
    badgeText: 'HIGH WEATHERABILITY'
  },
  {
    filename: 'silica-sand-powder.webp',
    name: 'SILICA SAND & POWDER',
    subTitle: 'High Purity SiO₂ Grains • Foundry Sand & Glass Batch',
    category: 'INDUSTRIAL MATERIAL',
    powderColor: '#F1F5F9',
    powderShadow: '#CBD5E1',
    rockColor1: '#E2E8F0',
    rockColor2: '#94A3B8',
    accentColor: '#3B82F6',
    hasRock: true,
    rockType: 'silica-grains',
    badgeText: 'FOUNDRY & GLASS GRADE'
  },
  {
    filename: 'titanium-dioxide-powder.webp',
    name: 'TITANIUM DI OXIDE (TiO₂)',
    subTitle: 'High-Opacity White Pigment • Paints, Polymers & Inks',
    category: 'FUNCTIONAL CHEMICAL',
    powderColor: '#FFFFFF',
    powderShadow: '#E2E8F0',
    rockColor1: '#FFFFFF',
    rockColor2: '#F1F5F9',
    accentColor: '#1E40AF',
    hasRock: true,
    rockType: 'tio2-pigment',
    badgeText: '99%+ OPTICAL WHITENESS'
  },
  {
    filename: 'quartz-sand-grains.webp',
    name: 'QUARTZ SAND',
    subTitle: 'Graded Granular Silica Media • Foundry & Water Filtration',
    category: 'GRAINS & AGGREGATES',
    powderColor: '#FDE68A',
    powderShadow: '#D97706',
    rockColor1: '#FCD34D',
    rockColor2: '#B45309',
    accentColor: '#D97706',
    hasRock: true,
    rockType: 'sand-grains',
    badgeText: 'SIEVED FOUNDRY MEDIA'
  },
  {
    filename: 'marble-chips-aggregates.webp',
    name: 'MARBLE CHIPS',
    subTitle: 'Screened Natural Marble Stone • Terrazzo & Landscaping',
    category: 'GRAINS & AGGREGATES',
    powderColor: '#F1F5F9',
    powderShadow: '#CBD5E1',
    rockColor1: '#FFFFFF',
    rockColor2: '#CBD5E1',
    accentColor: '#475569',
    hasRock: true,
    rockType: 'marble-chips',
    badgeText: 'ARCHITECTURAL TERRAZZO'
  },
  {
    filename: 'barytes-powder.webp',
    name: 'BARYTES POWDER',
    subTitle: 'Natural Barium Sulfate (BaSO₄) • Specific Gravity ~4.3',
    category: 'MINERAL POWDER',
    powderColor: '#F5F5F4',
    powderShadow: '#D6D3D1',
    rockColor1: '#E7E5E4',
    rockColor2: '#A8A29E',
    accentColor: '#78716C',
    hasRock: true,
    rockType: 'baryte-crystals',
    badgeText: 'HIGH SPECIFIC GRAVITY 4.3'
  },
  {
    filename: 'french-chalk-powder.webp',
    name: 'FRENCH CHALK POWDER',
    subTitle: 'Talc-Associated Mineral Powder • Demolding & Marking Chalk',
    category: 'MINERAL POWDER',
    powderColor: '#FFFFFF',
    powderShadow: '#E2E8F0',
    rockColor1: '#F1F5F9',
    rockColor2: '#CBD5E1',
    accentColor: '#0284C7',
    hasRock: true,
    rockType: 'tailor-chalk',
    badgeText: 'RUBBER DEMOLDING DUST'
  },
  {
    filename: 'starch-powder.webp',
    name: 'INDUSTRIAL STARCH',
    subTitle: 'Natural Polymeric Carbohydrate • Plant-Derived Organic Binder',
    category: 'PLANT-DERIVED INDUSTRIAL FORMULATION',
    powderColor: '#FEF9C3',
    powderShadow: '#FEF08A',
    rockColor1: '#EAB308',
    rockColor2: '#CA8A04',
    accentColor: '#16A34A',
    hasRock: false,
    rockType: 'plant-maize-cassava',
    badgeText: '100% NON-ROCK PLANT ORIGIN'
  }
];

function escXml(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function generateSvgForProduct(cfg) {
  const isStarch = cfg.rockType === 'plant-maize-cassava';
  const isResin = cfg.rockType === 'resin-liquid';
  const isRedOxide = cfg.filename === 'red-oxide-powder.webp';
  const isChips = cfg.rockType === 'marble-chips';
  const isSand = cfg.rockType === 'sand-grains' || cfg.rockType === 'silica-grains';

  const safeName = escXml(cfg.name);
  const safeSubTitle = escXml(cfg.subTitle);
  const safeCategory = escXml(cfg.category);
  const safeBadgeText = escXml(cfg.badgeText);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <!-- Background Gradient (Clean Industrial Laboratory Specimen Bench) -->
    <linearGradient id="benchGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="60%" stop-color="#F8FAFC" />
      <stop offset="100%" stop-color="#EDF2F7" />
    </linearGradient>

    <!-- Table Perspective Reflection -->
    <linearGradient id="tableSurface" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E2E8F0" stop-opacity="0.4" />
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#E2E8F0" stop-opacity="0.4" />
    </linearGradient>

    <!-- Powder Mound Radial Gradient -->
    <radialGradient id="powderGrad" cx="45%" cy="35%" r="65%">
      <stop offset="0%" stop-color="${cfg.powderColor}" />
      <stop offset="60%" stop-color="${cfg.powderColor}" />
      <stop offset="90%" stop-color="${cfg.powderShadow}" />
      <stop offset="100%" stop-color="#94A3B8" stop-opacity="0.8" />
    </radialGradient>

    <!-- Ambient Shadow -->
    <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0F172A" stop-opacity="0.25" />
      <stop offset="60%" stop-color="#0F172A" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0" />
    </radialGradient>

    <!-- Watch Glass Plate Rim -->
    <linearGradient id="glassRim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95" />
      <stop offset="40%" stop-color="#93C5FD" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#60A5FA" stop-opacity="0.2" />
    </linearGradient>

    <!-- Drop Shadow Filter -->
    <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0F172A" flood-opacity="0.12" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="600" fill="url(#benchGrad)" />

  <!-- Laboratory Grid Texture Lines -->
  <g stroke="#E2E8F0" stroke-width="1" opacity="0.65">
    <line x1="0" y1="120" x2="800" y2="120" />
    <line x1="0" y1="240" x2="800" y2="240" />
    <line x1="0" y1="360" x2="800" y2="360" />
    <line x1="0" y1="480" x2="800" y2="480" />
    <line x1="160" y1="0" x2="160" y2="600" />
    <line x1="320" y1="0" x2="320" y2="600" />
    <line x1="480" y1="0" x2="480" y2="600" />
    <line x1="640" y1="0" x2="640" y2="600" />
  </g>

  <!-- Industrial Bench Horizon Shadow -->
  <ellipse cx="400" cy="420" rx="360" ry="70" fill="url(#shadowGrad)" />

  <!-- Packaging / Specimen Tray Shadow -->
  <ellipse cx="400" cy="385" rx="260" ry="45" fill="url(#shadowGrad)" />

  ${isResin ? `
    <!-- Special Resin Presentation: Industrial Glass Laboratory Vessel with Golden Liquid -->
    <g filter="url(#softShadow)">
      <!-- Beaker Glass Base -->
      <ellipse cx="400" cy="400" rx="140" ry="35" fill="#B45309" opacity="0.3" />
      <!-- Beaker Body -->
      <path d="M 280 180 L 290 380 Q 290 410 400 410 Q 510 410 510 380 L 520 180 Z" fill="#FEF3C7" opacity="0.45" stroke="#D97706" stroke-width="2" />
      <!-- Liquid Resin Volume -->
      <path d="M 285 240 L 290 380 Q 290 405 400 405 Q 510 405 510 380 L 515 240 Q 400 255 285 240 Z" fill="url(#powderGrad)" opacity="0.9" />
      <!-- Liquid Surface Meniscus -->
      <ellipse cx="400" cy="240" rx="115" ry="16" fill="#FDE68A" stroke="#B45309" stroke-width="1.5" />
      <!-- Glass Rim -->
      <ellipse cx="400" cy="180" rx="120" ry="15" fill="none" stroke="#D97706" stroke-width="3" />
      <!-- Volumetric Graduations -->
      <g stroke="#92400E" stroke-width="2" opacity="0.75">
        <line x1="480" y1="270" x2="505" y2="270" />
        <line x1="485" y1="300" x2="505" y2="300" />
        <line x1="480" y1="330" x2="505" y2="330" />
        <line x1="485" y1="360" x2="505" y2="360" />
      </g>
      <!-- Glass Specular Highlight -->
      <path d="M 310 200 L 315 370" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" opacity="0.65" />
    </g>
  ` : isStarch ? `
    <!-- Special Starch Presentation: Pure White Porcelain Bowl + Botanical Maize & Cassava -->
    <g filter="url(#softShadow)">
      <!-- Ceramic Laboratory Bowl -->
      <ellipse cx="370" cy="380" rx="180" ry="40" fill="#0F172A" opacity="0.2" />
      <path d="M 210 320 Q 210 410 370 410 Q 530 410 530 320 Z" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="3" />
      <!-- Silky Starch Powder in Bowl -->
      <path d="M 215 320 Q 370 270 525 320 Q 450 350 370 350 Q 280 350 215 320 Z" fill="${cfg.powderColor}" stroke="#FEF08A" stroke-width="1.5" />
      <!-- Powder Peak in Bowl -->
      <path d="M 260 320 Q 370 230 480 320 Z" fill="${cfg.powderColor}" />
      <ellipse cx="370" cy="300" rx="80" ry="25" fill="#FFFFFF" opacity="0.7" />

      <!-- Natural Maize Cob (Plant Origin Indicator) -->
      <g transform="translate(520, 290) rotate(22)">
        <ellipse cx="60" cy="40" rx="75" ry="24" fill="#FACC15" stroke="#CA8A04" stroke-width="2" />
        <!-- Corn Kernel Grid -->
        <g fill="#EAB308" opacity="0.8">
          <circle cx="20" cy="35" r="4" /><circle cx="35" cy="35" r="4" /><circle cx="50" cy="35" r="4" /><circle cx="65" cy="35" r="4" /><circle cx="80" cy="35" r="4" /><circle cx="95" cy="35" r="4" />
          <circle cx="28" cy="45" r="4" /><circle cx="43" cy="45" r="4" /><circle cx="58" cy="45" r="4" /><circle cx="73" cy="45" r="4" /><circle cx="88" cy="45" r="4" />
        </g>
        <!-- Green Husk Leaves -->
        <path d="M -10 40 Q 30 15 80 20 Q 20 28 -10 40 Z" fill="#65A30D" />
        <path d="M -15 45 Q 30 65 90 60 Q 20 50 -15 45 Z" fill="#4D7C0F" />
      </g>

      <!-- Cassava / Plant Roots -->
      <g transform="translate(140, 340) rotate(-15)">
        <ellipse cx="50" cy="30" rx="55" ry="18" fill="#78350F" stroke="#451A03" stroke-width="1.5" />
        <ellipse cx="80" cy="30" rx="14" ry="17" fill="#FEF3C7" stroke="#92400E" stroke-width="1.5" />
        <circle cx="80" cy="30" r="10" fill="#FFFFFF" />
      </g>
    </g>
  ` : isChips ? `
    <!-- Marble Chips: Screened Faceted Granular Crystals -->
    <g filter="url(#softShadow)">
      <!-- Watch Glass Dish -->
      <ellipse cx="400" cy="350" rx="220" ry="55" fill="#FFFFFF" stroke="url(#glassRim)" stroke-width="4" />
      <!-- Clustered Multi-Faceted Sparkling Chips -->
      <g fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5">
        <polygon points="340,320 370,300 390,325 365,345 335,335" fill="#FFFFFF" />
        <polygon points="370,300 410,290 425,315 390,325" fill="#F8FAFC" />
        <polygon points="390,325 425,315 440,340 405,355 365,345" fill="#F1F5F9" />
        <polygon points="410,290 445,285 465,305 425,315" fill="#FFFFFF" />
        <polygon points="425,315 465,305 475,335 440,340" fill="#E2E8F0" />
        <polygon points="300,340 330,325 350,345 325,365 295,355" fill="#FFFFFF" />
        <polygon points="450,335 480,325 500,350 470,365 440,355" fill="#F8FAFC" />
        <polygon points="350,345 385,340 395,365 365,375 325,365" fill="#F1F5F9" />
        <polygon points="395,365 430,355 450,375 415,385 365,375" fill="#FFFFFF" />
        <polygon points="260,350 285,340 300,360 275,370" fill="#F8FAFC" />
        <polygon points="485,345 515,335 530,355 505,370" fill="#F1F5F9" />
      </g>
    </g>
  ` : isSand ? `
    <!-- Granular Sand Media in Shallow Assay Dish -->
    <g filter="url(#softShadow)">
      <ellipse cx="400" cy="350" rx="220" ry="55" fill="#F1F5F9" stroke="url(#glassRim)" stroke-width="4" />
      <!-- Sand Grains Texture Heap -->
      <ellipse cx="400" cy="345" rx="190" ry="42" fill="url(#powderGrad)" />
      <!-- Fine Stippling Texture for Grains -->
      <g fill="${cfg.accentColor}" opacity="0.6">
        <circle cx="320" cy="330" r="2" /><circle cx="340" cy="325" r="2.5" /><circle cx="360" cy="335" r="2" />
        <circle cx="380" cy="320" r="3" /><circle cx="400" cy="330" r="2.5" /><circle cx="420" cy="325" r="3" />
        <circle cx="440" cy="335" r="2" /><circle cx="460" cy="320" r="2.5" /><circle cx="480" cy="330" r="2" />
        <circle cx="350" cy="350" r="2.5" /><circle cx="390" cy="355" r="3" /><circle cx="430" cy="350" r="2.5" />
      </g>
    </g>
  ` : `
    <!-- Standard Industrial Mineral Powder & Specimen Mound -->
    <g filter="url(#softShadow)">
      <!-- Laboratory Precision Watch Glass (Petri Dish) -->
      <ellipse cx="400" cy="355" rx="240" ry="60" fill="#FFFFFF" stroke="url(#glassRim)" stroke-width="4" />
      
      <!-- Symmetrical Conical Heap of Milled Powder -->
      <!-- Bottom Layer -->
      <path d="M 200 355 Q 400 395 600 355 Q 400 330 200 355 Z" fill="${cfg.powderShadow}" opacity="0.7" />
      <!-- Main Powder Mound Body -->
      <path d="M 210 355 Q 310 325 360 250 Q 400 200 440 250 Q 490 325 590 355 Q 400 380 210 355 Z" fill="url(#powderGrad)" stroke="${cfg.powderShadow}" stroke-width="1.5" />
      <!-- Powder Peak Highlight -->
      <ellipse cx="400" cy="245" rx="45" ry="15" fill="${cfg.powderColor}" opacity="0.9" />

      ${cfg.hasRock ? `
        <!-- Associated Natural Raw Mineral Rock Specimen -->
        <g transform="translate(180, 270)">
          <!-- Rock Shadow -->
          <ellipse cx="50" cy="75" rx="55" ry="18" fill="#0F172A" opacity="0.25" />
          <!-- Faceted Mineral Crystal Rock -->
          <polygon points="10,60 45,20 85,35 95,70 55,80" fill="${cfg.rockColor1}" stroke="#94A3B8" stroke-width="1.5" />
          <polygon points="45,20 85,35 70,60 30,50" fill="${cfg.rockColor2}" stroke="#94A3B8" stroke-width="1.5" />
          <polygon points="30,50 70,60 55,80 10,60" fill="${cfg.rockColor1}" opacity="0.85" />
          <!-- Crystalline Cleavage / Facet Highlight -->
          <line x1="45" y1="20" x2="55" y2="80" stroke="#FFFFFF" stroke-width="2" opacity="0.75" />
        </g>
      ` : ''}
    </g>
  `}

  <!-- Laboratory Watch Glass Glass Rim Reflection -->
  <path d="M 240 340 Q 400 305 560 340" stroke="#FFFFFF" stroke-width="3" fill="none" opacity="0.8" />

  <!-- Top Deepali Minerals B2B Header Badge -->
  <g transform="translate(40, 40)">
    <rect x="0" y="0" width="720" height="70" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" filter="url(#softShadow)" />
    <!-- Blue/Accent Vertical Accent Bar -->
    <rect x="0" y="0" width="8" height="70" rx="4" fill="${cfg.accentColor}" />
    <!-- Company Name & Category -->
    <text x="24" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#64748B" letter-spacing="1.5">DEEPALI MINERALS • INDUSTRIAL QUALITY SPECIMEN</text>
    <text x="24" y="52" font-family="'Georgia', serif" font-size="22" font-weight="700" fill="#0F172A">${safeName}</text>
    <!-- Right Specimen Status Pill -->
    <rect x="520" y="20" width="180" height="30" rx="4" fill="${isStarch ? '#DCFCE7' : (isRedOxide ? '#FEE2E2' : '#EFF6FF')}" stroke="${cfg.accentColor}" stroke-width="1" />
    <text x="610" y="40" font-family="system-ui, -apple-system, monospace" font-size="10" font-weight="700" fill="${cfg.accentColor}" text-anchor="middle" letter-spacing="0.5">${safeBadgeText}</text>
  </g>

  <!-- Bottom Technical Specification Strip -->
  <g transform="translate(40, 510)">
    <rect x="0" y="0" width="720" height="50" rx="6" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" opacity="0.95" />
    <!-- Category Tag -->
    <rect x="14" y="12" width="140" height="26" rx="3" fill="#F1F5F9" />
    <text x="84" y="29" font-family="system-ui, -apple-system, monospace" font-size="9" font-weight="700" fill="#475569" text-anchor="middle" letter-spacing="0.8">${safeCategory}</text>
    <!-- Subtitle / Application Info -->
    <text x="170" y="30" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#334155">${safeSubTitle}</text>
    <!-- Verified Stamp -->
    <text x="695" y="30" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#16A34A" text-anchor="end">✓ LAB VERIFIED</text>
  </g>
</svg>`;
}

async function run() {
  console.log(`Generating ${productConfigs.length} high-resolution industrial product images...`);
  
  for (const cfg of productConfigs) {
    const svg = generateSvgForProduct(cfg);
    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: 800 }
    });
    const pngBuffer = resvg.render().asPng();
    const tmpPng = `/tmp/${cfg.filename}.png`;
    fs.writeFileSync(tmpPng, pngBuffer);

    // Write to assets/images/products/<filename>
    const assetWebp = path.join(assetsDir, cfg.filename);
    const publicWebp = path.join(publicDir, cfg.filename);

    execSync(`convert "${tmpPng}" -quality 92 "${assetWebp}"`);
    fs.copyFileSync(assetWebp, publicWebp);

    // Also generate JPG fallback
    const jpgFilename = cfg.filename.replace('.webp', '.jpg');
    const assetJpg = path.join(assetsDir, jpgFilename);
    const publicJpg = path.join(publicDir, jpgFilename);
    execSync(`convert "${tmpPng}" -quality 90 "${assetJpg}"`);
    fs.copyFileSync(assetJpg, publicJpg);

    fs.unlinkSync(tmpPng);
    console.log(`✓ Generated ${cfg.filename} and ${jpgFilename}`);
  }

  console.log('All 22 product images generated and synchronized successfully!');
}

run().catch(console.error);
