import subprocess
import os

svg = """<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 460" width="700" height="460">
  <defs>
    <!-- Vibrant Blue Gradient for DM Letters -->
    <linearGradient id="dmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2185d0" />
      <stop offset="40%" stop-color="#1672cf" />
      <stop offset="100%" stop-color="#0f5bb5" />
    </linearGradient>

    <!-- Arc Gradient -->
    <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0288d1" />
      <stop offset="50%" stop-color="#1976d2" />
      <stop offset="100%" stop-color="#0d47a1" />
    </linearGradient>

    <!-- 3D Glossy Sphere Radial Gradient -->
    <radialGradient id="sphereGrad" cx="35%" cy="32%" r="65%">
      <stop offset="0%" stop-color="#e1f5fe" />
      <stop offset="25%" stop-color="#29b6f6" />
      <stop offset="65%" stop-color="#0288d1" />
      <stop offset="100%" stop-color="#01437a" />
    </radialGradient>

    <!-- Specular Highlight for Molecule Spheres -->
    <radialGradient id="specularGrad" cx="35%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
      <stop offset="60%" stop-color="#ffffff" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>

    <filter id="dropShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#002b54" flood-opacity="0.25" />
    </filter>
  </defs>

  <g id="logo-content" transform="translate(40, 20)">
    <!-- MOLECULE AT UPPER RIGHT -->
    <g id="molecule" filter="url(#dropShadow)">
      <!-- Chemical Bond Link Cylinders -->
      <line x1="505" y1="80" x2="480" y2="135" stroke="#0d47a1" stroke-width="16" stroke-linecap="round" />
      <line x1="480" y1="135" x2="520" y2="175" stroke="#0d47a1" stroke-width="17" stroke-linecap="round" />
      <line x1="520" y1="175" x2="485" y2="235" stroke="#0d47a1" stroke-width="18" stroke-linecap="round" />

      <!-- Top Sphere (1) -->
      <g transform="translate(505, 80)">
        <circle cx="0" cy="0" r="23" fill="url(#sphereGrad)" />
        <ellipse cx="-6" cy="-6" rx="9" ry="5" fill="url(#specularGrad)" transform="rotate(-30, -6, -6)" />
        <path d="M 6,-14 A 18 18 0 0 1 17,2" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.8" />
      </g>

      <!-- Upper-Left Sphere (2) -->
      <g transform="translate(480, 135)">
        <circle cx="0" cy="0" r="27" fill="url(#sphereGrad)" />
        <ellipse cx="-7" cy="-7" rx="11" ry="6" fill="url(#specularGrad)" transform="rotate(-30, -7, -7)" />
        <path d="M 8,-17 A 21 21 0 0 1 20,2" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.85" />
      </g>

      <!-- Right Sphere (3) -->
      <g transform="translate(525, 178)">
        <circle cx="0" cy="0" r="32" fill="url(#sphereGrad)" />
        <ellipse cx="-8" cy="-8" rx="13" ry="7" fill="url(#specularGrad)" transform="rotate(-30, -8, -8)" />
        <path d="M 10,-20 A 25 25 0 0 1 24,3" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.85" />
      </g>

      <!-- Bottom-Left Sphere (4) -->
      <g transform="translate(485, 238)">
        <circle cx="0" cy="0" r="34" fill="url(#sphereGrad)" />
        <ellipse cx="-9" cy="-9" rx="14" ry="8" fill="url(#specularGrad)" transform="rotate(-30, -9, -9)" />
        <path d="M 11,-22 A 27 27 0 0 1 26,4" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" fill="none" opacity="0.9" />
      </g>
    </g>

    <!-- "DM" LETTERS IN BOLD ITALIC -->
    <g transform="translate(145, 252)">
      <!-- Letter D in precise vector geometry -->
      <path d="M -30,0 
               L 40,0 
               C 95,0 135,-38 135,-95 
               C 135,-152 95,-190 40,-190 
               L -30,-190 
               Z 
               M 12,-38 
               L 10,-38 
               L 10,-152 
               L 12,-152 
               C 42,-152 68,-128 68,-95 
               C 68,-62 42,-38 12,-38 
               Z"
            transform="skewX(-16)"
            fill="url(#dmGrad)" 
            fill-rule="evenodd" />

      <!-- Letter M in precise vector geometry -->
      <path d="M 155,0 
               L 196,0 
               L 230,-120 
               L 266,-38 
               L 288,-38 
               L 324,-120 
               L 358,0 
               L 398,0 
               L 398,-190 
               L 356,-190 
               L 306,-62 
               L 256,-190 
               L 155,-190 
               Z" 
            transform="skewX(-16)"
            fill="url(#dmGrad)" />
    </g>

    <!-- DYNAMIC SWOOSH / ORBITAL ARC UNDERNEATH -->
    <path d="M 105,248 
             C 140,300 290,336 500,266 
             C 425,310 260,314 148,276 
             C 120,266 110,256 105,248 
             Z" 
          fill="url(#arcGrad)" />

    <!-- "DEEPALI MINERALS" TYPOGRAPHY -->
    <text x="242" y="312" 
          font-family="'Liberation Sans', 'Arial Black', Arial, Helvetica, sans-serif" 
          font-size="34" 
          font-weight="900" 
          letter-spacing="0.04em" 
          text-anchor="middle" 
          fill="#134e8d">
      DEEPALI MINERALS
    </text>
  </g>
</svg>
"""

with open("assets/images/logo.svg", "w") as f:
    f.write(svg)

# Render high-resolution PNG using rsvg-convert
subprocess.run(["rsvg-convert", "-w", "1050", "-h", "690", "-b", "none", "-o", "assets/images/logo.png", "assets/images/logo.svg"], check=True)

# Also create a version with clean white background if needed
subprocess.run(["rsvg-convert", "-w", "1050", "-h", "690", "-b", "white", "-o", "assets/images/logo-white-bg.png", "assets/images/logo.svg"], check=True)

print("Generated assets/images/logo.svg, logo.png, and logo-white-bg.png successfully!")
