# Deepali Minerals — B2B Digital Sourcing Portal

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![ISO 9001:2015](https://img.shields.io/badge/ISO%209001%3A2015-QMS%20Certified-174A70.svg)](#certifications)
[![ISO 14001:2015](https://img.shields.io/badge/ISO%2014001%3A2015-EMS%20Certified-248C91.svg)](#certifications)
[![Vite](https://img.shields.io/badge/Bundler-Vite%205-646CFF.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6.svg)](https://www.typescriptlang.org/)

Production-grade B2B e-commerce and technical discovery web platform for **Deepali Minerals** — an established supplier of industrial non-metallic minerals, pulverized functional extenders, and specialty chemical compounds headquartered in New Delhi, India.

- **Production Domain:** [https://deepaliminerals.in](https://deepaliminerals.in)
- **Preview / Staging:** [https://preview.deepaliminerals.in](https://preview.deepaliminerals.in)
- **Establishment:** 2004 (20+ Years in Industrial Material Supply)
- **Executive Leadership:** Mr. Neeraj Monga (CEO & Proprietor)

---

## Table of Contents

- [Corporate Overview](#corporate-overview)
- [Key Features](#key-features)
- [Master Product Portfolio (22 Materials)](#master-product-portfolio-22-materials)
- [Architecture & Tech Stack](#architecture--tech-stack)
- [Project Directory Structure](#project-directory-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Local Development](#installation--local-development)
  - [Production Build](#production-build)
- [Deployment & Hosting Guidelines](#deployment--hosting-guidelines)
  - [SEO, Sitemap & Robots Policies](#seo-sitemap--robots-policies)
- [Git Branching & Rollback Protection](#git-branching--rollback-protection)
- [Commercial Helpdesk & Inquiries](#commercial-helpdesk--inquiries)

---

## Corporate Overview

Established in **2004**, Deepali Minerals serves large-scale manufacturing corridors across North India and pan-India with dependable raw material supply, strict chemical and physical purity benchmarks, and multi-regional sourcing networks.

- **Primary Address:** C-2/29 C Lawrence Road, Rampura / Keshav Puram, New Delhi – 110035, India
- **Accreditations:**
  - **ISO 9001:2015 (Quality Management Systems):** Certificate No. *IAA/QMS/0126/4104*
  - **ISO 14001:2015 (Environmental Management Systems):** Certificate No. *IAA/EMS/0126/3081*
- **Operating Sectors:** Paints & Coatings, Plastics, Masterbatch, Rubber, PVC Compounding, Paper, Ceramics, Foundry, Cosmetics & Pharma, Agrochemicals, Construction Chemicals.

---

## Key Features

1. **Dual Technical Discovery Engine:**
   - **Interactive Faceted Discovery:** Filter by industry application, mineral mesh grade (100–1250 Mesh), functional requirement (opacity, brightness, chemical inertness, reinforcing filler).
   - **Natural Language Search:** Matches free-text procurement queries (e.g. *"fine white filler for PVC wire compounding"*) to qualified mineral candidates.
2. **Master Product Catalog & Dynamic Detail Routing:**
   - Individual technical profiles for all 22 catalogued industrial minerals and chemicals.
   - Verified high-resolution imagery, particle size distribution charts, chemical assay data, and mesh specifications.
   - Real-time pre-filled WhatsApp Sales Desk links contextualized to the viewed material.
3. **Visually Rich Corporate Presentation (`/about.html`):**
   - Infographic-style institutional highlights, executive CEO profile of Mr. Neeraj Monga, and embedded audited ISO 9001:2015 & ISO 14001:2015 certificate previews.
   - 5-step industrial quality assurance workflow and interactive logistics parameter cards.
4. **B2B RFQ (Request for Quotation) & Sample Dispatch Hub:**
   - Client-side validated commercial inquiry desk with automated payload formatting.
   - Supports sample parcel requests (COA documentation included) and technical suitability confirmations.
5. **Full Mobile & Tablet Ergonomics:**
   - Fluid typography and responsive card grids supporting 320px mobile screens up to 4K ultra-wide monitors.
   - Native swipeable sticky sub-navigation carousel on mobile touch devices.
   - iOS Safari auto-zoom prevention (`font-size: 16px` form inputs) and safe-area inset accommodation.

---

## Master Product Portfolio (22 Materials)

Every product includes verified photographic assets, WebP optimizations, fallback formats, and technical parameter mappings:

| Product Name | Category | Primary Mesh / Grade Range | Core Industrial Applications |
|---|---|---|---|
| **Talc Powder** | Minerals & Powders | 300 – 1250 Mesh | Paints, Plastics, Rubber, Cosmetics |
| **Soap Stone Powder** | Minerals & Powders | 200 – 500 Mesh | Ceramics, Refractories, Foundry, Paper |
| **Chalk Powder** | Minerals & Powders | 200 – 400 Mesh | Putty, Distempers, Construction, Rubber |
| **Hydrated Lime** | Minerals & Powders | 90% – 95% Purity | Water Treatment, Metallurgy, Sugar, Mortar |
| **China Clay** | Minerals & Powders | Pulverized & Levigated | Paper Coating, Ceramics, Insecticides, Rubber |
| **Kaoline (Kaolin Clay)** | Minerals & Powders | Calcined & Hydrous | Wire Cables, Inks, Extenders, Paper |
| **Marble Powder** | Minerals & Powders | 100 – 500 Mesh | Aggregates, Artificial Stone, Terrazzo, Putty |
| **Quartz Powder** | Minerals & Powders | 100 – 500 Mesh | Glass, Ceramics, Foundry Core, Electronic Epoxies |
| **Calcium Carbonate** | Minerals & Powders | 300 – 1250 Mesh (98% CaCO₃) | PVC Pipes, Masterbatch, Paints, Polymers |
| **Red Oxide** | Minerals & Powders | Micronized (Fe₂O₃) | Metal Primers, Concrete Pigmentation, Tiles |
| **Zinc Oxide** | Functional Chemicals | 99.0% – 99.8% Purity | Rubber Vulcanization, Ceramics, Paints, Animal Feed |
| **Zinc Stearate** | Functional Chemicals | Compounding Grade | Internal Lubricant, Plastics Release, Masterbatch |
| **Magnesium Carbonate** | Functional Chemicals | Light & Heavy Basic Grade | Rubber Reinforcement, Thermal Insulation, Inks |
| **Dolomite Powder** | Minerals & Powders | Micronized (CaMg(CO₃)₂) | Wall Putty, Steel Flux, Float Glass, Paints |
| **Silica Powder** | Minerals & Powders | High Purity SiO₂ | Foundry Castings, Construction Chemicals, Epoxy |
| **Titanium Dioxide** | Functional Chemicals | Anatase / Rutile | High Opacity Pigment, Masterbatch, Architectural Paints |
| **Quartz Sand (Silica Sand)** | Grains & Aggregates | 16/30, 24/60, 30/80 Mesh | Water Filtration, Sandblasting, Glass Manufacturing |
| **Marble Chips** | Grains & Aggregates | Sorted White Grits | Terrazzo Flooring, Architectural Landscapes, Plasters |
| **Barytes Powder (Barite)** | Minerals & Powders | High Specific Gravity (4.1–4.4) | Oil Drilling Mud, High Density Fillers, Acoustic Panels |
| **French Chalk Powder** | Minerals & Powders | Ultra-fine Slip Grade | Cable Dusting, Foundry Mold Release, Rubber Molding |
| **Starch (Industrial Grade)** | Industrial Materials | Maize / Tapioca | Corrugated Box Adhesives, Textile Sizing, Paper Mills |
| **Polyester Resin** | Functional Chemicals | Orthophthalic / Isophthalic | FRP Fabrications, Composite Panels, Artificial Marble |

---

## Architecture & Tech Stack

- **Bundler:** [Vite 5](https://vitejs.dev/) with multi-page entry points (`rollupOptions.input`).
- **Styling:** Modular CSS3 with custom CSS Variables, Tailwind CSS utilities, flex/grid modern math, and responsive breakpoints (`styles.css`).
- **Data Architecture:** Fully normalized data registry in `assets/js/data.js` powering dynamic catalog generation, fuzzy matching, and TDS downloads.
- **Client Controller:** `assets/js/app.js` handling page routing, interactive RFQ modals, dynamic WhatsApp message formatting, and smooth navigation.
- **SEO & Structured Data:** Pre-configured JSON-LD Schema (`Organization`, `Product`, `PostalAddress`), Canonical URLs, and OpenGraph social meta.

---

## Project Directory Structure

```text
.
├── index.html                  # Home discovery engine & featured catalog entry point
├── about.html                  # High-impact corporate profile & visual presentation
├── product.html                # Universal dynamic product detail shell (?product=<slug>)
├── products/
│   └── index.html              # Full master product catalog with interactive filters
├── industries/
│   └── index.html              # 38-sector manufacturing directory & applications
├── about/
│   └── index.html              # Clean permalink mirror for /about/
├── assets/
│   ├── css/
│   │   └── styles.css          # Core design system, color tokens, and responsive media queries
│   ├── js/
│   │   ├── app.js              # Presentation logic, client router, and discovery engine
│   │   ├── config.js           # Domain endpoints, WhatsApp numbers, and environment variables
│   │   └── data.js             # Centralized master product specifications and company records
│   ├── images/
│   │   ├── brand/              # Vector SVG & PNG corporate branding assets
│   │   └── products/           # Optimized WebP and JPG product photography (all 22 products)
│   └── certificates/           # Original ISO 9001 & ISO 14001 certification PDFs & vector seals
├── public/                     # Static production assets served at root
│   ├── assets/                 # Mirrored static production assets
│   ├── robots.txt              # Environment-aware robots policy
│   ├── robots.prod.txt         # Production search index allow directives
│   └── sitemap.xml             # XML sitemap indexing all canonical routes
├── scripts/
│   └── rollback_to_production.sh # Single-command recovery script to approved baseline
├── package.json                # Project dependencies and compilation scripts
├── tsconfig.json               # TypeScript compiler configuration
├── vite.config.ts              # Multi-page build pipeline and deployment router plugin
└── .gitignore                  # Production exclusion rules (node_modules, dev cache, dist)
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.x or 20.x LTS recommended)
- `npm` (version 9.x or higher)

### Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/deepali-minerals.git
   cd deepali-minerals
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

### Production Build

To build the static distribution bundle:

```bash
npm run build
```

This compiles the TypeScript files, runs Vite asset bundling, copies all images, certificates, and metadata to the `dist/` directory, and prepares the site for static CDN deployment.

To preview the built production bundle locally:
```bash
npm run preview
```

---

## Deployment & Hosting Guidelines

The built output in `dist/` is 100% static and can be deployed directly to:
- **Cloudflare Pages / Vercel / Netlify**
- **Apache / Nginx / cPanel web hosts** (an `.htaccess` file is included in the project root for rewrite handling)
- **Google Cloud Run / AWS S3 + CloudFront**

### SEO, Sitemap & Robots Policies

The built-in `deploymentRobotsPlugin` in `vite.config.ts` automatically detects the host domain:
- **`deepaliminerals.in` (Production):** Serves `robots.prod.txt` allowing full indexing by Googlebot, Bing, etc., and serves `sitemap.xml`.
- **`preview.deepaliminerals.in` (Staging / Dev):** Automatically serves `Disallow: /` and injects `noindex, nofollow` to prevent search engine indexing of staging builds.

---

## Git Branching & Rollback Protection

To ensure stability across design iterations:

- **`main` Branch:** Protected production baseline (`v1.0-approved-production`). Holds only officially approved code.
- **`website-redesign-experiment` Branch:** Dedicated workspace for experimental UI/UX enhancements.

### One-Step Emergency Rollback

If any unapproved change breaks the layout or functionality, run the one-step rollback script:

```bash
bash scripts/rollback_to_production.sh
```

This command automatically:
1. Reverts Git to the tagged production release (`v1.0-approved-production`).
2. Cleans all untracked test files.
3. Resyncs verified media assets and executes a clean build verification.

---

## Commercial Helpdesk & Inquiries

For commercial procurement, bulk logistics, and sample dispatches:

- **Proprietor / CEO:** Mr. Neeraj Monga
- **Telephone / WhatsApp:** +91-9810516065 / +91-9810715129
- **Email:** [info@deepaliminerals.in](mailto:info@deepaliminerals.in)
- **Business Hours:** Monday to Saturday: 9:00 AM – 7:30 PM IST (Closed Sundays)
- **Office & Dispatch Depot:** C-2/29 C Lawrence Road, Rampura / Keshav Puram, New Delhi – 110035, India

---

## License

This project is licensed under the [MIT License](LICENSE).
