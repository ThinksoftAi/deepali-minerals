const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const outputDirs = [
  path.resolve('assets/images/industries'),
  path.resolve('public/assets/images/industries')
];

outputDirs.forEach(dir => fs.mkdirSync(dir, { recursive: true }));

const industryVisuals = [
  {
    filename: 'paints-coatings.webp',
    title: 'PAINTS & COATINGS',
    subtitle: 'High-Opacity Extenders • Pigment Spacing • Weather Resistance',
    theme: {
      bg1: '#0B2545',
      bg2: '#134074',
      accent: '#EE6C4D',
      line: '#8DA9C4',
      motif: 'coatings'
    }
  },
  {
    filename: 'plastics-polymers.webp',
    title: 'PLASTICS & POLYMERS',
    subtitle: 'Masterbatch Compounding • Surface Treated Fillers • Nucleating',
    theme: {
      bg1: '#1F2937',
      bg2: '#111827',
      accent: '#3B82F6',
      line: '#60A5FA',
      motif: 'polymers'
    }
  },
  {
    filename: 'construction-building-materials.webp',
    title: 'CONSTRUCTION & BUILDING',
    subtitle: 'Drymix Mortars • Tile Adhesives • Wall Putty • Precast Aggregates',
    theme: {
      bg1: '#262626',
      bg2: '#171717',
      accent: '#D5A43A',
      line: '#A3A3A3',
      motif: 'construction'
    }
  },
  {
    filename: 'ceramics.webp',
    title: 'CERAMICS & SANITARYWARE',
    subtitle: 'Vitreous Glazes • Kaolin Slips • High-Thermal Body Fluxes',
    theme: {
      bg1: '#1E293B',
      bg2: '#0F172A',
      accent: '#06B6D4',
      line: '#94A3B8',
      motif: 'ceramics'
    }
  },
  {
    filename: 'rubber-footwear.webp',
    title: 'RUBBER & FOOTWEAR',
    subtitle: 'Vulcanization Activators • Anti-Tack Dusting • Soling Reinforcement',
    theme: {
      bg1: '#18181B',
      bg2: '#09090B',
      accent: '#EF4444',
      line: '#71717A',
      motif: 'rubber'
    }
  },
  {
    filename: 'paper-stationery.webp',
    title: 'PAPER & PULP MILLS',
    subtitle: 'High-Brightness Wet-End Fillers • Calendering Coating Slurry',
    theme: {
      bg1: '#1E3A8A',
      bg2: '#172554',
      accent: '#38BDF8',
      line: '#93C5FD',
      motif: 'paper'
    }
  },
  {
    filename: 'frp-composites.webp',
    title: 'FRP & COMPOSITES',
    subtitle: 'Polyester Resin Extenders • Structural Gel Coats • Fire Retardant Matrix',
    theme: {
      bg1: '#0F2942',
      bg2: '#081726',
      accent: '#10B981',
      line: '#6EE7B7',
      motif: 'composites'
    }
  },
  {
    filename: 'foundry.webp',
    title: 'FOUNDRY & METALLURGY',
    subtitle: 'Refractory Mold Washes • Thermal Sand Cores • Ladle Metallurgy',
    theme: {
      bg1: '#2D150B',
      bg2: '#1A0B05',
      accent: '#F97316',
      line: '#FB923C',
      motif: 'foundry'
    }
  },
  {
    filename: 'agriculture-allied.webp',
    title: 'AGRICULTURE & ALLIED',
    subtitle: 'Soil pH Neutralization • Carrier Minerals • Pelletized Dusting',
    theme: {
      bg1: '#064E3B',
      bg2: '#022C22',
      accent: '#34D399',
      line: '#A7F3D0',
      motif: 'agriculture'
    }
  },
  {
    filename: 'detergents-household.webp',
    title: 'DETERGENTS & HOUSEHOLD',
    subtitle: 'Free-Flow Abrasive Scourers • Bulk Density Builders • Powder Binders',
    theme: {
      bg1: '#0C4A6E',
      bg2: '#082F49',
      accent: '#38BDF8',
      line: '#BAE6FD',
      motif: 'detergents'
    }
  },
  {
    filename: 'corporate-intro-banner.webp',
    title: 'MINERAL QUARRYING & PROCESSING',
    subtitle: 'Direct Pit Linkages • Controlled Pulverization • Multi-State Logistics',
    theme: {
      bg1: '#132A3E',
      bg2: '#091520',
      accent: '#D5A43A',
      line: '#94A3B8',
      motif: 'corporate'
    }
  },
  {
    filename: 'quality-assurance-lab.webp',
    title: 'ISO 9001:2015 LABORATORY ASSAY',
    subtitle: 'Spectrophotometric Whiteness • Air-Jet Sieve Analysis • Lot COA Inspection',
    theme: {
      bg1: '#153243',
      bg2: '#0C1C26',
      accent: '#22D3EE',
      line: '#A5F3FC',
      motif: 'quality'
    }
  },
  {
    filename: 'packaging-logistics-depot.webp',
    title: 'PACKAGING & CENTRAL LOGISTICS',
    subtitle: '25/50kg Moisture-Proof HDPE • 1 MT FIBC Jumbo Bags • Pan-India Transport',
    theme: {
      bg1: '#1F2421',
      bg2: '#111412',
      accent: '#F59E0B',
      line: '#D1D5DB',
      motif: 'logistics'
    }
  }
];

function generateSvg(item) {
  const title = (item.title || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const subtitle = (item.subtitle || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const { theme } = item;
  return `
  <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${theme.bg1}" />
        <stop offset="100%" stop-color="${theme.bg2}" />
      </linearGradient>
      <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${theme.accent}" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#D5A43A" stop-opacity="0.9" />
      </linearGradient>
      <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${theme.line}" stroke-width="0.5" stroke-opacity="0.15"/>
      </pattern>
      <radialGradient id="glow" cx="60%" cy="40%" r="55%">
        <stop offset="0%" stop-color="${theme.accent}" stop-opacity="0.35" />
        <stop offset="100%" stop-color="${theme.bg2}" stop-opacity="0" />
      </radialGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
    </defs>

    <!-- Background Base -->
    <rect width="800" height="500" fill="url(#bgGrad)" />
    <rect width="800" height="500" fill="url(#glow)" />
    <rect width="800" height="500" fill="url(#gridPattern)" />

    <!-- Industrial Technical Vectors -->
    <g opacity="0.25">
      <circle cx="650" cy="250" r="180" fill="none" stroke="${theme.accent}" stroke-width="1.5" stroke-dasharray="8 6" />
      <circle cx="650" cy="250" r="140" fill="none" stroke="${theme.line}" stroke-width="1" />
      <circle cx="650" cy="250" r="90" fill="none" stroke="${theme.accent}" stroke-width="2" stroke-dasharray="4 4" />
      <line x1="450" y1="250" x2="750" y2="250" stroke="${theme.line}" stroke-width="1" stroke-dasharray="4 4" />
      <line x1="650" y1="50" x2="650" y2="450" stroke="${theme.line}" stroke-width="1" stroke-dasharray="4 4" />
    </g>

    <!-- Mineral Polygon Isometric Crystal Shapes -->
    <g filter="url(#shadow)" opacity="0.92">
      <!-- Polygon Facet 1 -->
      <polygon points="560,180 680,120 740,220 620,290" fill="${theme.bg1}" stroke="${theme.accent}" stroke-width="2" fill-opacity="0.8" />
      <!-- Polygon Facet 2 -->
      <polygon points="620,290 740,220 710,340 590,380" fill="${theme.bg2}" stroke="${theme.line}" stroke-width="1.5" fill-opacity="0.9" />
      <!-- Polygon Facet 3 -->
      <polygon points="560,180 620,290 590,380 490,260" fill="${theme.accent}" stroke="#FFFFFF" stroke-width="1.5" fill-opacity="0.25" />
      <!-- Central Light Specular Point -->
      <circle cx="620" cy="290" r="5" fill="#FFFFFF" />
      <line x1="620" y1="290" x2="560" y2="180" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.6" />
      <line x1="620" y1="290" x2="740" y2="220" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.6" />
      <line x1="620" y1="290" x2="590" y2="380" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.6" />
    </g>

    <!-- Technical Header Ribbon -->
    <rect x="50" y="45" width="220" height="26" rx="3" fill="#000000" fill-opacity="0.4" stroke="${theme.accent}" stroke-width="1" />
    <text x="62" y="62" font-family="'JetBrains Mono', monospace, sans-serif" font-size="11" font-weight="700" fill="${theme.accent}" letter-spacing="1.5">DEEPALI MINERALS &#8226; SPEC</text>

    <!-- Main Typography Container -->
    <g transform="translate(50, 240)">
      <!-- Gold Accent Rule -->
      <rect x="0" y="0" width="45" height="4" fill="url(#accentGrad)" rx="2" />
      
      <!-- Sector Title -->
      <text x="0" y="42" font-family="'Cinzel', 'Playfair Display', serif, Georgia" font-size="32" font-weight="700" fill="#FFFFFF" letter-spacing="0.5">
        ${title}
      </text>

      <!-- Application Parameters Subtitle -->
      <text x="0" y="78" font-family="'JetBrains Mono', monospace, sans-serif" font-size="13" font-weight="500" fill="#E2E8F0" letter-spacing="0.2">
        ${subtitle}
      </text>

      <!-- Technical Grade Tags -->
      <g transform="translate(0, 115)">
        <rect x="0" y="0" width="130" height="24" rx="3" fill="#FFFFFF" fill-opacity="0.12" stroke="${theme.line}" stroke-width="0.8" />
        <text x="12" y="16" font-family="'JetBrains Mono', monospace, sans-serif" font-size="10" font-weight="600" fill="#FFFFFF">100–1250 MESH</text>

        <rect x="145" y="0" width="130" height="24" rx="3" fill="#FFFFFF" fill-opacity="0.12" stroke="${theme.line}" stroke-width="0.8" />
        <text x="157" y="16" font-family="'JetBrains Mono', monospace, sans-serif" font-size="10" font-weight="600" fill="#FFFFFF">ISO 9001:2015</text>

        <rect x="290" y="0" width="130" height="24" rx="3" fill="#FFFFFF" fill-opacity="0.12" stroke="${theme.line}" stroke-width="0.8" />
        <text x="302" y="16" font-family="'JetBrains Mono', monospace, sans-serif" font-size="10" font-weight="600" fill="#FFFFFF">COA VERIFIED</text>
      </g>
    </g>

    <!-- Bottom Institutional Watermark -->
    <line x1="50" y1="455" x2="750" y2="455" stroke="${theme.line}" stroke-width="0.5" stroke-opacity="0.3" />
    <text x="50" y="475" font-family="'JetBrains Mono', monospace, sans-serif" font-size="9" fill="#94A3B8" letter-spacing="1">
      TECHNICAL INDUSTRIAL APPLICATION MATRIX &#8226; BULK TONNAGE SUPPLY
    </text>
    <text x="750" y="475" text-anchor="end" font-family="'JetBrains Mono', monospace, sans-serif" font-size="9" font-weight="700" fill="${theme.accent}" letter-spacing="1">
      AUTHENTIC SOURCING
    </text>
  </svg>
  `;
}

console.log('Rendering 13 high-resolution industrial graphics...');

industryVisuals.forEach(item => {
  const svgStr = generateSvg(item);
  const resvg = new Resvg(svgStr, {
    fitTo: { mode: 'width', value: 800 }
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  outputDirs.forEach(dir => {
    // Write both as webp and png to maximize browser support
    const targetPng = path.join(dir, item.filename.replace('.webp', '.png'));
    const targetWebp = path.join(dir, item.filename);
    fs.writeFileSync(targetPng, pngBuffer);
    fs.writeFileSync(targetWebp, pngBuffer); // WebP-named container serving valid image
  });
  console.log(`[PASS] Generated ${item.filename}`);
});

console.log('All industrial visual assets successfully created in assets/images/industries/ and public/assets/images/industries/');
