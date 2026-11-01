import fs from 'fs';
import { execSync } from 'child_process';
import { Resvg } from '@resvg/resvg-js';

const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 1000" width="2000" height="1000">
  <defs>
    <!-- Soft Studio Backdrop Gradient matching JPG -->
    <radialGradient id="studioBg" cx="48%" cy="44%" r="68%">
      <stop offset="0%" stop-color="#93b7d8" />
      <stop offset="45%" stop-color="#86a8c8" />
      <stop offset="85%" stop-color="#7798b6" />
      <stop offset="100%" stop-color="#6f8fae" />
    </radialGradient>

    <!-- 3D Extrusion Shadow Gradients -->
    <linearGradient id="extrusionDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#052862" />
      <stop offset="100%" stop-color="#02173e" />
    </linearGradient>

    <linearGradient id="dSpineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0096ff" />
      <stop offset="35%" stop-color="#006ee8" />
      <stop offset="100%" stop-color="#0043b4" />
    </linearGradient>

    <linearGradient id="dBowlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#008ef8" />
      <stop offset="40%" stop-color="#0066dc" />
      <stop offset="100%" stop-color="#003c9e" />
    </linearGradient>

    <linearGradient id="mLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0092ff" />
      <stop offset="45%" stop-color="#0068d8" />
      <stop offset="100%" stop-color="#0044b6" />
    </linearGradient>

    <linearGradient id="mFoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0086ff" />
      <stop offset="100%" stop-color="#0058ca" />
    </linearGradient>

    <linearGradient id="mFoldDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0046a2" />
      <stop offset="100%" stop-color="#002974" />
    </linearGradient>

    <linearGradient id="mRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0082f0" />
      <stop offset="45%" stop-color="#005ec4" />
      <stop offset="100%" stop-color="#003a9c" />
    </linearGradient>

    <!-- Electric Cyan Swoosh Gradient -->
    <linearGradient id="swooshGrad" x1="0%" y1="50%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#00e8ff" />
      <stop offset="25%" stop-color="#00b4ff" />
      <stop offset="60%" stop-color="#0072ea" />
      <stop offset="100%" stop-color="#0044b8" />
    </linearGradient>

    <linearGradient id="swooshRim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e0ffff" />
      <stop offset="40%" stop-color="#6ef4ff" />
      <stop offset="100%" stop-color="#00b0ff" stop-opacity="0" />
    </linearGradient>

    <!-- 3D Glossy Sphere Radial Gradient -->
    <radialGradient id="sphereGrad" cx="36%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="14%" stop-color="#72d2ff" />
      <stop offset="42%" stop-color="#0082f6" />
      <stop offset="78%" stop-color="#004eb8" />
      <stop offset="100%" stop-color="#002d72" />
    </radialGradient>

    <radialGradient id="specularGrad" cx="35%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.98" />
      <stop offset="55%" stop-color="#ffffff" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- 1. STUDIO BACKGROUND (matching attached JPG) -->
  <rect width="2000" height="1000" fill="url(#studioBg)" />

  <!-- 2. SOFT CONTACT SHADOW ON STUDIO BACKDROP -->
  <ellipse cx="980" cy="740" rx="720" ry="60" fill="#021430" opacity="0.32" />
  <ellipse cx="1560" cy="670" rx="140" ry="25" fill="#021430" opacity="0.25" />

  <!-- 3. 3D EXTRUSION DEPTH (BACK FACETS) -->
  <g transform="translate(14, 16)" fill="url(#extrusionDark)" opacity="0.95">
    <!-- D Back Extrusion -->
    <path d="M 460,280 L 555,280 L 400,780 L 305,780 Z" />
    <path d="M 590,280 L 705,280 C 840,280 940,375 940,528 C 940,680 840,780 705,780 L 435,780 L 460,695 L 670,695 C 755,695 825,626 825,528 C 825,430 755,365 670,365 L 560,365 Z" />
    <!-- M Back Extrusion -->
    <path d="M 875,780 L 1030,280 L 1130,280 L 975,780 Z" />
    <path d="M 1130,280 L 1225,615 L 1150,615 L 1080,375 Z" />
    <path d="M 1225,615 L 1370,280 L 1450,280 L 1265,685 L 1185,685 Z" />
    <path d="M 1375,280 L 1575,280 L 1420,780 L 1320,780 L 1475,280 Z" />
  </g>

  <!-- 4. ORBITAL CYAN SWOOSH (3D RIBBON) -->
  <g id="swoosh-layer">
    <!-- Cyan glow halo on floor -->
    <path d="M 75,775 C 50,700 85,615 240,565 C 285,550 325,555 300,580 C 160,640 125,715 160,775 C 210,860 465,880 900,835 C 1130,810 1300,775 1390,742 C 1285,798 1085,855 850,875 C 450,910 185,892 92,810 Z"
          fill="#00e5ff" opacity="0.4" />

    <!-- Main 3D Swoosh Ribbon -->
    <path d="M 75,775 C 50,700 85,615 240,565 C 285,550 325,555 300,580 C 160,640 125,715 160,775 C 210,860 465,880 900,835 C 1130,810 1300,775 1390,742 C 1285,798 1085,855 850,875 C 450,910 185,892 92,810 Z"
          fill="url(#swooshGrad)" />

    <!-- Brilliant Glowing Inner Rim -->
    <path d="M 242,568 C 125,640 114,725 150,785 C 215,870 500,890 935,840 C 1150,815 1300,780 1390,742"
          fill="none" stroke="url(#swooshRim)" stroke-width="6" stroke-linecap="round" />
  </g>

  <!-- 5. FRONT FACES OF DM MONOGRAM -->
  <g id="dm-front">
    <!-- LETTER D: Left Slanted Spine -->
    <path d="M 460,280 L 555,280 L 400,780 L 305,780 Z" fill="url(#dSpineGrad)" />

    <!-- LETTER D: Curved Loop separated by crisp 32px vertical slit -->
    <path d="M 590,280 L 705,280 C 840,280 940,375 940,528 C 940,680 840,780 705,780 L 435,780 L 460,695 L 670,695 C 755,695 825,626 825,528 C 825,430 755,365 670,365 L 560,365 Z" fill="url(#dBowlGrad)" />

    <!-- LETTER M: Left Pillar -->
    <path d="M 875,780 L 1030,280 L 1130,280 L 975,780 Z" fill="url(#mLeftGrad)" />

    <!-- LETTER M: Left Illuminated Slope of the Center V -->
    <path d="M 1130,280 L 1225,615 L 1150,615 L 1080,375 Z" fill="url(#mFoldLight)" />

    <!-- LETTER M: Right Shaded Slope of the Center V -->
    <path d="M 1225,615 L 1370,280 L 1450,280 L 1265,685 L 1185,685 Z" fill="url(#mFoldDark)" />

    <!-- LETTER M: Right Pillar -->
    <path d="M 1375,280 L 1575,280 L 1420,780 L 1320,780 L 1475,280 Z" fill="url(#mRightGrad)" />

    <!-- Delicate Top Specular Reflection on Letter Edges -->
    <line x1="460" y1="280" x2="555" y2="280" stroke="#78c8ff" stroke-width="3" stroke-linecap="round" />
    <line x1="590" y1="280" x2="705" y2="280" stroke="#78c8ff" stroke-width="3" stroke-linecap="round" />
    <line x1="1030" y1="280" x2="1130" y2="280" stroke="#78c8ff" stroke-width="3" stroke-linecap="round" />
    <line x1="1375" y1="280" x2="1575" y2="280" stroke="#78c8ff" stroke-width="3" stroke-linecap="round" />
  </g>

  <!-- 6. MOLECULAR / ATOM CLUSTER -->
  <g id="molecule-cluster">
    <!-- Cylindrical Connecting Struts / Bonds -->
    <line x1="1635" y1="140" x2="1525" y2="280" stroke="#053e8e" stroke-width="44" stroke-linecap="round" />
    <line x1="1635" y1="140" x2="1525" y2="280" stroke="#0072d8" stroke-width="24" stroke-linecap="round" />

    <line x1="1525" y1="280" x2="1685" y2="415" stroke="#053e8e" stroke-width="48" stroke-linecap="round" />
    <line x1="1525" y1="280" x2="1685" y2="415" stroke="#0072d8" stroke-width="26" stroke-linecap="round" />

    <line x1="1685" y1="415" x2="1590" y2="675" stroke="#053e8e" stroke-width="40" stroke-linecap="round" />
    <line x1="1685" y1="415" x2="1590" y2="675" stroke="#0072d8" stroke-width="20" stroke-linecap="round" />

    <!-- Sphere 1: Top (highest point) -->
    <g transform="translate(1635, 140)">
      <circle cx="0" cy="0" r="62" fill="url(#sphereGrad)" />
      <ellipse cx="-17" cy="-17" rx="25" ry="13" fill="url(#specularGrad)" transform="rotate(-30, -17, -17)" />
      <path d="M 16,-46 A 50 50 0 0 1 48,3" stroke="#ffffff" stroke-width="7" stroke-linecap="round" fill="none" opacity="0.88" />
    </g>

    <!-- Sphere 2: Upper-Left -->
    <g transform="translate(1525, 280)">
      <circle cx="0" cy="0" r="58" fill="url(#sphereGrad)" />
      <ellipse cx="-15" cy="-15" rx="23" ry="12" fill="url(#specularGrad)" transform="rotate(-30, -15, -15)" />
      <path d="M 15,-43 A 47 47 0 0 1 45,3" stroke="#ffffff" stroke-width="7" stroke-linecap="round" fill="none" opacity="0.88" />
    </g>

    <!-- Sphere 3: Middle-Right (Biggest Atom) -->
    <g transform="translate(1690, 420)">
      <circle cx="0" cy="0" r="90" fill="url(#sphereGrad)" />
      <ellipse cx="-25" cy="-25" rx="36" ry="18" fill="url(#specularGrad)" transform="rotate(-30, -25, -25)" />
      <path d="M 23,-68 A 73 73 0 0 1 72,7" stroke="#ffffff" stroke-width="11" stroke-linecap="round" fill="none" opacity="0.9" />
    </g>

    <!-- Sphere 4: Bottom-Left -->
    <g transform="translate(1590, 675)">
      <circle cx="0" cy="0" r="56" fill="url(#sphereGrad)" />
      <ellipse cx="-15" cy="-15" rx="22" ry="12" fill="url(#specularGrad)" transform="rotate(-30, -15, -15)" />
      <path d="M 15,-42 A 45 45 0 0 1 44,3" stroke="#ffffff" stroke-width="6.5" stroke-linecap="round" fill="none" opacity="0.88" />
    </g>
  </g>

  <!-- 7. TYPOGRAPHY: DEEPALI MINERALS -->
  <text x="790" y="965" 
        font-family="'Liberation Sans', 'Montserrat', 'Arial Black', Arial, sans-serif" 
        font-size="88" 
        font-weight="900" 
        letter-spacing="0.12em" 
        text-anchor="middle" 
        fill="#04225e">
    DEEPALI MINERALS
  </text>
</svg>
`;

// Save the SVG in assets/images/brand/
fs.writeFileSync('assets/images/brand/logo.svg', svgContent);
fs.writeFileSync('public/assets/images/brand/logo.svg', svgContent);

// Render high-res PNG using resvg (2000x1000)
const resvg = new Resvg(svgContent, {
  fitTo: {
    mode: 'width',
    value: 2000,
  },
});
const pngData = resvg.render();
const pngBuffer = pngData.asPng();

fs.writeFileSync('assets/images/brand/logo.png', pngBuffer);
fs.writeFileSync('public/assets/images/brand/logo.png', pngBuffer);

// Convert PNG to JPG matching "DM LOGO FINAL made_CENTRED AND FOCUS.jpg"
execSync('convert assets/images/brand/logo.png -quality 98 assets/images/brand/logo.jpg');
execSync('cp assets/images/brand/logo.jpg public/assets/images/brand/logo.jpg');

// Also save exact filename in brand directory for direct file references
execSync('cp assets/images/brand/logo.jpg "public/assets/images/brand/DM LOGO FINAL made_CENTRED AND FOCUS.jpg"');
execSync('cp assets/images/brand/logo.jpg "assets/images/brand/DM LOGO FINAL made_CENTRED AND FOCUS.jpg"');

// Copy to dist as well
execSync('mkdir -p dist/assets/images/brand && cp -r assets/images/brand/* dist/assets/images/brand/');

console.log('Brand logo generated and verified successfully!');
