import subprocess

svg_content = """<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" width="1200" height="600">
  <defs>
    <!-- Vibrant Blue Gradients for Monogram -->
    <linearGradient id="dSpineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0094ff" />
      <stop offset="45%" stop-color="#006ce4" />
      <stop offset="100%" stop-color="#0043b2" />
    </linearGradient>

    <linearGradient id="dBowlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#008cff" />
      <stop offset="40%" stop-color="#0064d8" />
      <stop offset="100%" stop-color="#003b9c" />
    </linearGradient>

    <linearGradient id="mLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0090ff" />
      <stop offset="50%" stop-color="#0068d6" />
      <stop offset="100%" stop-color="#0044b6" />
    </linearGradient>

    <linearGradient id="mFoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0082ff" />
      <stop offset="100%" stop-color="#0058c6" />
    </linearGradient>

    <linearGradient id="mFoldDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#004aa6" />
      <stop offset="100%" stop-color="#002b78" />
    </linearGradient>

    <linearGradient id="mRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0080ee" />
      <stop offset="50%" stop-color="#005cc2" />
      <stop offset="100%" stop-color="#003a9c" />
    </linearGradient>

    <!-- Orbital Swoosh Gradient -->
    <linearGradient id="swooshGrad" x1="0%" y1="50%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#00c8ff" />
      <stop offset="25%" stop-color="#0099ff" />
      <stop offset="60%" stop-color="#0066dc" />
      <stop offset="100%" stop-color="#003ea6" />
    </linearGradient>

    <linearGradient id="swooshGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#b3f0ff" stop-opacity="0.95" />
      <stop offset="50%" stop-color="#00b4ff" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#0066dc" stop-opacity="0" />
    </linearGradient>

    <!-- 3D Glossy Sphere Radial Gradient -->
    <radialGradient id="sphereGrad" cx="36%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="14%" stop-color="#70d0ff" />
      <stop offset="44%" stop-color="#0080f6" />
      <stop offset="78%" stop-color="#004eb8" />
      <stop offset="100%" stop-color="#002d72" />
    </radialGradient>

    <!-- Specular Highlight for Molecule Spheres -->
    <radialGradient id="specularGrad" cx="35%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.98" />
      <stop offset="60%" stop-color="#ffffff" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- ==================== 1. ORBITAL SWOOSH ARC ==================== -->
  <g id="swoosh-layer">
    <!-- Main swoosh ribbon curving from left under the DM monogram -->
    <path d="M 45,465 
             C 30,420 50,370 145,340 
             C 170,332 195,335 180,350 
             C 95,385 75,430 95,465 
             C 125,515 280,528 540,500 
             C 680,485 780,465 835,445 
             C 770,478 650,512 510,524 
             C 270,544 110,535 55,485 
             C 48,478 45,472 45,465 
             Z"
          fill="url(#swooshGrad)" />

    <!-- Luminous highlight rim along inner curve -->
    <path d="M 145,342 
             C 75,385 68,435 90,470 
             C 130,522 300,534 560,504 
             C 690,488 780,468 835,445"
          fill="none" 
          stroke="url(#swooshGlow)" 
          stroke-width="3.5" 
          stroke-linecap="round" />
  </g>

  <!-- ==================== 2. DM MONOGRAM ==================== -->
  <g id="dm-monogram">
    <!-- LETTER D -->
    <!-- D Left Pillar / Spine with slanted ends -->
    <path d="M 278,168 
             L 334,168 
             L 242,468 
             L 186,468 
             Z" 
          fill="url(#dSpineGrad)" />

    <!-- D Curved Loop / Bowl separated by 20px slit -->
    <path d="M 354,168 
             L 424,168 
             C 505,168 565,225 565,316 
             C 565,408 505,468 424,468 
             L 262,468 
             L 278,416 
             L 404,416 
             C 455,416 496,375 496,316 
             C 496,258 455,220 404,220 
             L 338,220 
             Z" 
          fill="url(#dBowlGrad)" />

    <!-- LETTER M (Dynamic 3D Folded Monogram) -->
    <!-- M Left Slanted Pillar -->
    <path d="M 526,468 
             L 618,168 
             L 678,168 
             L 586,468 
             Z" 
          fill="url(#mLeftGrad)" />

    <!-- M Center Fold: Left Illuminated Slope of the V -->
    <path d="M 678,168 
             L 736,368 
             L 692,368 
             L 648,225 
             Z" 
          fill="url(#mFoldLight)" />

    <!-- M Center Fold: Right Shaded Slope of the V -->
    <path d="M 736,368 
             L 824,168 
             L 870,168 
             L 758,410 
             L 712,410 
             Z" 
          fill="url(#mFoldDark)" />

    <!-- M Right Slanted Pillar -->
    <path d="M 826,168 
             L 946,168 
             L 854,468 
             L 794,468 
             L 886,168 
             Z" 
          fill="url(#mRightGrad)" />
  </g>

  <!-- ==================== 3. MOLECULAR / ATOM CLUSTER ==================== -->
  <g id="molecule-cluster">
    <!-- Connecting Link Cylinders / Chemical Bonds -->
    <!-- Bond 1: Top Sphere to Upper-Left Sphere -->
    <line x1="1090" y1="85" x2="1025" y2="168" stroke="#053e8e" stroke-width="26" stroke-linecap="round" />
    <line x1="1090" y1="85" x2="1025" y2="168" stroke="#0072d8" stroke-width="14" stroke-linecap="round" />

    <!-- Bond 2: Upper-Left Sphere to Big Middle-Right Sphere -->
    <line x1="1025" y1="168" x2="1120" y2="248" stroke="#053e8e" stroke-width="28" stroke-linecap="round" />
    <line x1="1025" y1="168" x2="1120" y2="248" stroke="#0072d8" stroke-width="16" stroke-linecap="round" />

    <!-- Bond 3: Big Middle-Right Sphere to Bottom-Left Sphere -->
    <line x1="1120" y1="248" x2="1065" y2="405" stroke="#053e8e" stroke-width="24" stroke-linecap="round" />
    <line x1="1120" y1="248" x2="1065" y2="405" stroke="#0072d8" stroke-width="12" stroke-linecap="round" />

    <!-- Sphere 1: Top (highest point) -->
    <g transform="translate(1090, 85)">
      <circle cx="0" cy="0" r="37" fill="url(#sphereGrad)" />
      <ellipse cx="-10" cy="-10" rx="15" ry="8" fill="url(#specularGrad)" transform="rotate(-30, -10, -10)" />
      <path d="M 10,-28 A 30 30 0 0 1 29,2" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" fill="none" opacity="0.85" />
    </g>

    <!-- Sphere 2: Upper-Left -->
    <g transform="translate(1025, 168)">
      <circle cx="0" cy="0" r="35" fill="url(#sphereGrad)" />
      <ellipse cx="-9" cy="-9" rx="14" ry="7" fill="url(#specularGrad)" transform="rotate(-30, -9, -9)" />
      <path d="M 9,-26 A 28 28 0 0 1 27,2" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.85" />
    </g>

    <!-- Sphere 3: Middle-Right (Biggest Atom) -->
    <g transform="translate(1124, 252)">
      <circle cx="0" cy="0" r="54" fill="url(#sphereGrad)" />
      <ellipse cx="-15" cy="-15" rx="22" ry="11" fill="url(#specularGrad)" transform="rotate(-30, -15, -15)" />
      <path d="M 14,-41 A 44 44 0 0 1 43,4" stroke="#ffffff" stroke-width="6.5" stroke-linecap="round" fill="none" opacity="0.9" />
    </g>

    <!-- Sphere 4: Bottom-Left -->
    <g transform="translate(1065, 405)">
      <circle cx="0" cy="0" r="34" fill="url(#sphereGrad)" />
      <ellipse cx="-9" cy="-9" rx="13" ry="7" fill="url(#specularGrad)" transform="rotate(-30, -9, -9)" />
      <path d="M 9,-25 A 27 27 0 0 1 26,2" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.85" />
    </g>
  </g>

  <!-- ==================== 4. TYPOGRAPHY: DEEPALI MINERALS ==================== -->
  <text x="475" y="580" 
        font-family="'Liberation Sans', 'Montserrat', 'Arial Black', Arial, sans-serif" 
        font-size="52" 
        font-weight="900" 
        letter-spacing="0.12em" 
        text-anchor="middle" 
        fill="#002d72">
    DEEPALI MINERALS
  </text>
</svg>
"""

with open("assets/images/logo.svg", "w") as f:
    f.write(svg_content)

# Render to high-res transparent PNG (1200x600)
subprocess.run(["rsvg-convert", "-w", "1200", "-h", "600", "-b", "none", "-o", "assets/images/logo.png", "assets/images/logo.svg"], check=True)

# Also copy to root assets and public and dist
subprocess.run("cp assets/images/logo.* assets/ && cp assets/images/logo.* public/assets/images/ && cp assets/images/logo.* dist/assets/images/", shell=True, check=True)

print("Generated clean logo successfully!")
