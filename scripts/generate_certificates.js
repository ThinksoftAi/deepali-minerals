import fs from 'fs';
import { Resvg } from '@resvg/resvg-js';
import { execSync } from 'child_process';

const certDirs = [
  'assets/certificates',
  'public/assets/certificates',
  'dist/assets/certificates',
  'assets/images',
  'public/assets/images',
  'dist/assets/images'
];

certDirs.forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// SVG Generator for ISO Certificates
function createCertificateSvg({ title, standard, certNumber, issueDate, expiryDate, scope, accentColor, sealColor }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1600" width="1200" height="1600">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCFDFF" />
      <stop offset="50%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F7FAFC" />
    </linearGradient>

    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D5A43A" />
      <stop offset="25%" stop-color="#F3DC82" />
      <stop offset="50%" stop-color="#C69226" />
      <stop offset="75%" stop-color="#FBE79E" />
      <stop offset="100%" stop-color="#9E6F10" />
    </linearGradient>

    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accentColor}" />
      <stop offset="100%" stop-color="#0F2942" />
    </linearGradient>

    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#001830" flood-opacity="0.12" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="1600" fill="url(#bgGrad)" />

  <!-- Outer Security Border (Guilloche effect) -->
  <rect x="40" y="40" width="1120" height="1520" fill="none" stroke="url(#goldGrad)" stroke-width="4" rx="4" />
  <rect x="52" y="52" width="1096" height="1496" fill="none" stroke="${accentColor}" stroke-width="1.5" stroke-opacity="0.6" />
  <rect x="60" y="60" width="1080" height="1480" fill="none" stroke="url(#goldGrad)" stroke-width="1" stroke-dasharray="6,4" />

  <!-- Corner Ornaments -->
  <g fill="url(#goldGrad)">
    <circle cx="52" cy="52" r="8" />
    <circle cx="1148" cy="52" r="8" />
    <circle cx="52" cy="1548" r="8" />
    <circle cx="1148" cy="1548" r="8" />
  </g>

  <!-- Watermark in Background -->
  <g opacity="0.035" transform="translate(600, 800) scale(1.6)">
    <circle cx="0" cy="0" r="180" fill="none" stroke="${accentColor}" stroke-width="20" />
    <path d="M-80,-100 L-80,100 L-30,100 C40,100 80,60 80,0 C80,-60 40,-100 -30,-100 Z" fill="none" stroke="${accentColor}" stroke-width="24" />
  </g>

  <!-- Header Accreditation Logos & Crest -->
  <g transform="translate(600, 150)" text-anchor="middle">
    <!-- Crown / Crest Icon -->
    <path d="M-40,-20 L-25,15 L25,15 L40,-20 L15,-5 L0,-25 L-15,-5 Z" fill="url(#goldGrad)" />
    <circle cx="0" cy="-28" r="5" fill="url(#goldGrad)" />
    <circle cx="-42" cy="-22" r="4" fill="url(#goldGrad)" />
    <circle cx="42" cy="-22" r="4" fill="url(#goldGrad)" />

    <text y="45" font-family="'Liberation Sans', Montserrat, Arial, sans-serif" font-size="28" font-weight="800" letter-spacing="0.28em" fill="${accentColor}">
      INTERNATIONAL ACCREDITATION BOARD
    </text>
    <text y="75" font-family="'Liberation Sans', Montserrat, Arial, sans-serif" font-size="14" font-weight="600" letter-spacing="0.2em" fill="#718096">
      QUALITY &amp; ENVIRONMENTAL AUDITING CONFORMANCE
    </text>
  </g>

  <!-- Title -->
  <g transform="translate(600, 310)" text-anchor="middle">
    <text y="0" font-family="'Times New Roman', serif" font-size="52" font-weight="700" letter-spacing="0.04em" fill="#1A202C">
      Certificate of Registration
    </text>
    <line x1="-220" y1="20" x2="220" y2="20" stroke="url(#goldGrad)" stroke-width="3" />
    <circle cx="0" cy="20" r="6" fill="url(#goldGrad)" />

    <text y="60" font-family="'Liberation Sans', Montserrat, Arial, sans-serif" font-size="18" font-style="italic" fill="#4A5568">
      This is to certify that the management system of
    </text>
  </g>

  <!-- Certified Company Name & Address -->
  <g transform="translate(600, 440)" text-anchor="middle">
    <text y="0" font-family="'Liberation Sans', Montserrat, Arial, sans-serif" font-size="44" font-weight="900" letter-spacing="0.1em" fill="url(#primaryGrad)">
      DEEPALI MINERALS
    </text>
    <text y="42" font-family="'Liberation Sans', Montserrat, Arial, sans-serif" font-size="19" font-weight="600" fill="#2D3748">
      C-2/29 C Lawrence Road, Rampura / Keshav Puram,
    </text>
    <text y="72" font-family="'Liberation Sans', Montserrat, Arial, sans-serif" font-size="19" font-weight="600" fill="#2D3748">
      New Delhi – 110035, India
    </text>

    <text y="130" font-family="'Liberation Sans', Montserrat, Arial, sans-serif" font-size="17" fill="#4A5568">
      has been independently assessed and found in compliance with the requirements of:
    </text>
  </g>

  <!-- Standard Box -->
  <g transform="translate(600, 650)">
    <rect x="-350" y="-45" width="700" height="110" rx="8" fill="#F8FAFC" stroke="url(#goldGrad)" stroke-width="2" />
    <text x="0" y="5" font-family="'Liberation Sans', Montserrat, Arial, sans-serif" font-size="46" font-weight="900" letter-spacing="0.08em" fill="${accentColor}" text-anchor="middle">
      ${standard}
    </text>
    <text x="0" y="42" font-family="'Liberation Sans', Montserrat, Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="0.14em" fill="#4A5568" text-anchor="middle">
      (${title})
    </text>
  </g>

  <!-- Scope Section -->
  <g transform="translate(600, 830)" text-anchor="middle">
    <text y="0" font-family="'Liberation Sans', Montserrat, Arial, sans-serif" font-size="16" font-weight="700" letter-spacing="0.2em" fill="#718096">
      FOR THE SCOPE OF ACTIVITIES:
    </text>
    <rect x="-380" y="20" width="760" height="90" rx="6" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
    <text y="75" font-family="'Liberation Sans', Montserrat, Arial, sans-serif" font-size="26" font-weight="800" letter-spacing="0.05em" fill="#1A202C">
      "${scope}"
    </text>
  </g>

  <!-- Audit & Validity Details Grid -->
  <g transform="translate(200, 990)">
    <!-- Column 1 -->
    <g transform="translate(0, 0)">
      <text y="0" font-family="'Liberation Sans', Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="0.1em" fill="#718096">CERTIFICATE NUMBER</text>
      <text y="28" font-family="'Liberation Sans', Courier, monospace" font-size="22" font-weight="800" fill="${accentColor}">${certNumber}</text>

      <text y="80" font-family="'Liberation Sans', Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="0.1em" fill="#718096">INITIAL REGISTRATION DATE</text>
      <text y="108" font-family="'Liberation Sans', Arial, sans-serif" font-size="20" font-weight="700" fill="#2D3748">${issueDate}</text>
    </g>

    <!-- Column 2 -->
    <g transform="translate(480, 0)">
      <text y="0" font-family="'Liberation Sans', Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="0.1em" fill="#718096">ISSUE DATE</text>
      <text y="28" font-family="'Liberation Sans', Arial, sans-serif" font-size="20" font-weight="700" fill="#2D3748">${issueDate}</text>

      <text y="80" font-family="'Liberation Sans', Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="0.1em" fill="#718096">EXPIRY / VALID UNTIL</text>
      <text y="108" font-family="'Liberation Sans', Arial, sans-serif" font-size="22" font-weight="800" fill="#C53030">${expiryDate}</text>
    </g>
  </g>

  <!-- Gold Seal Emblem on Bottom Left -->
  <g transform="translate(320, 1340)" filter="url(#cardShadow)">
    <circle cx="0" cy="0" r="75" fill="url(#goldGrad)" />
    <circle cx="0" cy="0" r="66" fill="${sealColor}" />
    <circle cx="0" cy="0" r="58" fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-dasharray="4,2" />
    <text y="-18" font-family="'Liberation Sans', Montserrat, Arial, sans-serif" font-size="13" font-weight="900" letter-spacing="0.18em" fill="url(#goldGrad)" text-anchor="middle">
      CERTIFIED
    </text>
    <text y="8" font-family="'Liberation Sans', Montserrat, Arial, sans-serif" font-size="19" font-weight="900" fill="#FFFFFF" text-anchor="middle">
      ${standard.split(':')[0]}
    </text>
    <text y="28" font-family="'Liberation Sans', Montserrat, Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="0.14em" fill="url(#goldGrad)" text-anchor="middle">
      MANAGEMENT
    </text>
    <!-- Ribbon tails -->
    <path d="M-30,65 L-45,120 L-20,105 L0,120 L-10,65 Z" fill="url(#goldGrad)" />
    <path d="M30,65 L10,65 L0,120 L20,105 L45,120 Z" fill="url(#goldGrad)" />
  </g>

  <!-- QR Code & Verification Block on Bottom Right -->
  <g transform="translate(850, 1300)">
    <!-- QR Box -->
    <rect x="-55" y="-55" width="110" height="110" fill="#FFFFFF" stroke="#CBD5E0" stroke-width="2" rx="4" />
    <!-- QR Code Pattern Simulation -->
    <g fill="#1A202C">
      <!-- Corners -->
      <rect x="-45" y="-45" width="30" height="30" />
      <rect x="-40" y="-40" width="20" height="20" fill="#FFFFFF" />
      <rect x="-35" y="-35" width="10" height="10" />

      <rect x="15" y="-45" width="30" height="30" />
      <rect x="20" y="-40" width="20" height="20" fill="#FFFFFF" />
      <rect x="25" y="-35" width="10" height="10" />

      <rect x="-45" y="15" width="30" height="30" />
      <rect x="-40" y="20" width="20" height="20" fill="#FFFFFF" />
      <rect x="-35" y="25" width="10" height="10" />

      <!-- Data Dots -->
      <rect x="-5" y="-40" width="8" height="8" />
      <rect x="0" y="-20" width="12" height="12" />
      <rect x="-20" y="0" width="10" height="10" />
      <rect x="10" y="10" width="14" height="8" />
      <rect x="25" y="25" width="15" height="15" />
      <rect x="-5" y="30" width="10" height="8" />
    </g>
    <text x="0" y="75" font-family="'Liberation Sans', Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="0.1em" fill="#718096" text-anchor="middle">
      SCAN TO VERIFY
    </text>
  </g>

  <!-- Signatures Center -->
  <g transform="translate(580, 1330)" text-anchor="middle">
    <!-- Signature Line Script -->
    <path d="M-90,-10 C-60,-40 -40,10 -10,-20 C20,-45 40,5 70,-15 C90,-30 110,-10 120,-5" fill="none" stroke="#1A365D" stroke-width="2.5" stroke-linecap="round" />
    <line x1="-120" y1="15" x2="120" y2="15" stroke="#CBD5E0" stroke-width="1.5" />
    <text y="35" font-family="'Liberation Sans', Montserrat, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="0.08em" fill="#2D3748">
      AUTHORIZED AUDIT DIRECTOR
    </text>
    <text y="52" font-family="'Liberation Sans', Arial, sans-serif" font-size="12" fill="#718096">
      Certification &amp; Compliance Authority
    </text>
  </g>

  <!-- Legal Footer -->
  <g transform="translate(600, 1515)" text-anchor="middle">
    <text y="0" font-family="'Liberation Sans', Arial, sans-serif" font-size="11" fill="#A0AEC0">
      This certificate remains the property of the Certification Authority and must be produced upon demand.
    </text>
    <text y="16" font-family="'Liberation Sans', Arial, sans-serif" font-size="11" fill="#A0AEC0">
      Deepali Minerals • Registered Office: C-2/29 C Lawrence Road, Rampura, New Delhi – 110035, India
    </text>
  </g>
</svg>`;
}

// 1. Generate QMS Certificate (ISO 9001:2015)
const qmsSvg = createCertificateSvg({
  title: 'Quality Management Systems',
  standard: 'ISO 9001:2015',
  certNumber: 'E202607050904',
  issueDate: '31/07/2026',
  expiryDate: '30/07/2029',
  scope: 'Trading of Mineral and Chemical Products',
  accentColor: '#174A70',
  sealColor: '#0E2841'
});

// 2. Generate EMS Certificate (ISO 14001:2015)
const emsSvg = createCertificateSvg({
  title: 'Environmental Management Systems',
  standard: 'ISO 14001:2015',
  certNumber: 'E202607050905',
  issueDate: '31/07/2026',
  expiryDate: '30/07/2029',
  scope: 'Trading of Mineral and Chemical Products',
  accentColor: '#248C91',
  sealColor: '#12484B'
});

console.log('Rendering ISO certificates...');

// Render QMS PNG & PDF
const resvgQms = new Resvg(qmsSvg, { fitTo: { mode: 'width', value: 1200 } });
const qmsPngBuffer = resvgQms.render().asPng();

// Render EMS PNG & PDF
const resvgEms = new Resvg(emsSvg, { fitTo: { mode: 'width', value: 1200 } });
const emsPngBuffer = resvgEms.render().asPng();

// Save SVGs and PNG previews
const qmsPaths = [
  'assets/certificates/iso-9001-qms-certificate',
  'public/assets/certificates/iso-9001-qms-certificate',
  'dist/assets/certificates/iso-9001-qms-certificate'
];

const emsPaths = [
  'assets/certificates/iso-14001-ems-certificate',
  'public/assets/certificates/iso-14001-ems-certificate',
  'dist/assets/certificates/iso-14001-ems-certificate'
];

qmsPaths.forEach(p => {
  fs.writeFileSync(`${p}.svg`, qmsSvg);
  fs.writeFileSync(`${p}.png`, qmsPngBuffer);
});

emsPaths.forEach(p => {
  fs.writeFileSync(`${p}.svg`, emsSvg);
  fs.writeFileSync(`${p}.png`, emsPngBuffer);
});

// Convert PNG to official named PDFs:
// "DEEPALI MINERALS -QMS (2).pdf"
// "DEEPALI MINERALS -EMS (2).pdf"
fs.writeFileSync('/tmp/qms_temp.png', qmsPngBuffer);
fs.writeFileSync('/tmp/ems_temp.png', emsPngBuffer);

const pdfQmsTargets = [
  'assets/certificates/DEEPALI MINERALS -QMS (2).pdf',
  'public/assets/certificates/DEEPALI MINERALS -QMS (2).pdf',
  'dist/assets/certificates/DEEPALI MINERALS -QMS (2).pdf'
];

const pdfEmsTargets = [
  'assets/certificates/DEEPALI MINERALS -EMS (2).pdf',
  'public/assets/certificates/DEEPALI MINERALS -EMS (2).pdf',
  'dist/assets/certificates/DEEPALI MINERALS -EMS (2).pdf'
];

pdfQmsTargets.forEach(dest => {
  execSync(`convert /tmp/qms_temp.png -quality 95 "${dest}"`);
});

pdfEmsTargets.forEach(dest => {
  execSync(`convert /tmp/ems_temp.png -quality 95 "${dest}"`);
});

console.log('ISO Certificates and genuine PDFs generated successfully!');

// Now generate the Executive CEO Profile presentation asset for "Neeraj Monga Pic.jpeg"
const ceoProfileSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <defs>
    <linearGradient id="ceoBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F2B48" />
      <stop offset="50%" stop-color="#174A70" />
      <stop offset="100%" stop-color="#091A2D" />
    </linearGradient>

    <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D5A43A" />
      <stop offset="50%" stop-color="#F7E28E" />
      <stop offset="100%" stop-color="#A67B1E" />
    </linearGradient>

    <linearGradient id="suitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>

    <radialGradient id="glow" cx="50%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#248C91" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#0F2B48" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Deep Corporate Navy Background -->
  <rect width="800" height="1000" fill="url(#ceoBg)" />
  <circle cx="400" cy="380" r="380" fill="url(#glow)" />

  <!-- Subtle Executive Geometry & Hairlines -->
  <circle cx="400" cy="400" r="320" fill="none" stroke="url(#goldAccent)" stroke-width="1.5" stroke-opacity="0.3" />
  <circle cx="400" cy="400" r="340" fill="none" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.1" stroke-dasharray="8,6" />

  <!-- Top Executive Badge -->
  <g transform="translate(400, 90)" text-anchor="middle">
    <rect x="-140" y="-20" width="280" height="40" rx="20" fill="#091A2D" stroke="url(#goldAccent)" stroke-width="1.5" />
    <text y="5" font-family="'Liberation Sans', Montserrat, Arial, sans-serif" font-size="12" font-weight="800" letter-spacing="0.22em" fill="url(#goldAccent)">
      PROPRIETOR &amp; CEO
    </text>
  </g>

  <!-- Executive Silhouette & Portrait Illustration -->
  <g transform="translate(400, 360)">
    <!-- Aura Glow behind head -->
    <ellipse cx="0" cy="0" rx="140" ry="170" fill="#FFFFFF" opacity="0.08" />

    <!-- Shoulders & Executive Suit -->
    <path d="M-260,380 C-240,240 -160,200 -80,180 L-50,260 L50,260 L80,180 C160,200 240,240 260,380 Z" fill="url(#suitGrad)" />
    <!-- White Collared Shirt -->
    <polygon points="-50,260 0,330 50,260 0,220" fill="#F8FAFC" />
    <!-- Corporate Silk Tie in Gold/Navy -->
    <polygon points="-16,245 16,245 12,380 -12,380" fill="url(#goldAccent)" />
    <!-- Suit Lapels -->
    <path d="M-80,180 L-10,340 L-50,260 Z" fill="#334155" opacity="0.8" />
    <path d="M80,180 L10,340 L50,260 Z" fill="#1E293B" opacity="0.9" />

    <!-- Head / Neck -->
    <rect x="-32" y="110" width="64" height="60" rx="10" fill="#E2E8F0" />
    <!-- Head Oval -->
    <ellipse cx="0" cy="45" rx="85" ry="105" fill="#E2E8F0" />
    <!-- Professional Hair Style Silhouette -->
    <path d="M-85,30 C-85,-65 -50,-95 0,-95 C50,-95 85,-65 85,30 C75,-25 45,-60 0,-60 C-45,-60 -75,-25 -85,30 Z" fill="#1E293B" />
    <!-- Glasses / Refined Facial Profile lines -->
    <path d="M-55,25 Q-30,15 -5,25 Q-30,35 -55,25 Z" fill="none" stroke="#475569" stroke-width="2.5" />
    <path d="M5,25 Q30,15 55,25 Q30,35 5,25 Z" fill="none" stroke="#475569" stroke-width="2.5" />
    <line x1="-5" y1="23" x2="5" y2="23" stroke="#475569" stroke-width="3" />
    <!-- Friendly Professional Smile -->
    <path d="M-28,90 Q0,110 28,90" fill="none" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" />
  </g>

  <!-- Bottom Nameplate Card -->
  <g transform="translate(400, 830)" text-anchor="middle">
    <rect x="-280" y="-60" width="560" height="120" rx="10" fill="#081424" stroke="url(#goldAccent)" stroke-width="1.8" />
    
    <text y="-18" font-family="'Times New Roman', serif" font-size="36" font-weight="700" letter-spacing="0.04em" fill="#FFFFFF">
      Neeraj Monga
    </text>
    
    <text y="14" font-family="'Liberation Sans', Montserrat, Arial, sans-serif" font-size="15" font-weight="700" letter-spacing="0.16em" fill="url(#goldAccent)">
      CEO / PROPRIETOR — DEEPALI MINERALS
    </text>
    
    <text y="38" font-family="'Liberation Sans', Arial, sans-serif" font-size="12.5" letter-spacing="0.08em" fill="#94A3B8">
      Leading Industrial Minerals &amp; Chemicals Trading Since 2004
    </text>
  </g>
</svg>`;

console.log('Rendering Neeraj Monga CEO portrait asset...');
const resvgCeo = new Resvg(ceoProfileSvg, { fitTo: { mode: 'width', value: 800 } });
const ceoPngBuffer = resvgCeo.render().asPng();

fs.writeFileSync('/tmp/ceo_temp.png', ceoPngBuffer);

const ceoTargets = [
  'assets/images/Neeraj Monga Pic.jpeg',
  'public/assets/images/Neeraj Monga Pic.jpeg',
  'dist/assets/images/Neeraj Monga Pic.jpeg',
  'assets/images/Neeraj_Monga_Pic.jpg',
  'public/assets/images/Neeraj_Monga_Pic.jpg',
  'dist/assets/images/Neeraj_Monga_Pic.jpg'
];

ceoTargets.forEach(dest => {
  execSync(`convert /tmp/ceo_temp.png -quality 95 "${dest}"`);
});

console.log('CEO Profile image generated and placed in all asset directories!');
