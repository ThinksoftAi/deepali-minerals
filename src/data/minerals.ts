export interface ChemicalComponent {
  component: string;
  value: string;
  testMethod: string;
}

export interface PhysicalProperty {
  property: string;
  value: string;
  unit: string;
}

export interface MineralProduct {
  id: string;
  name: string;
  category: 'Fillers & Extenders' | 'Functional Minerals' | 'Chemicals & Additives' | 'Clays & Binders' | 'Lime & Carbonates' | 'Industrial Materials';
  tagline: string;
  description: string;
  grades: string[];
  meshSizes: string[];
  chemicalFormula: string;
  brightnessWhiteness: string;
  purity: string;
  oilAbsorption: string;
  bulkDensity: string;
  phValue: string;
  moistureContent: string;
  keyProperties: string[];
  applications: string[];
  packagingOptions: string[];
  minimumOrderQty: string;
  typicalPriceRange: string;
  chemicalAnalysis: ChemicalComponent[];
  physicalProperties: PhysicalProperty[];
  featured?: boolean;
}

export const MINERALS_DATA: MineralProduct[] = [
  {
    id: 'talc-powder',
    name: 'Industrial & Cosmetic Talc Powder',
    category: 'Fillers & Extenders',
    tagline: 'Hydrated Magnesium Silicate with superior lamellar structure, high slip & extreme whiteness',
    description: 'Deepali Minerals is a premier supplier of ultra-pure Talc Powder (Steatite / Soapstone). Processed using modern air-classifying mills, our talc provides exceptional brightness, chemical inertness, high thermal stability, and unmatched smoothness for cosmetic, plastic masterbatch, rubber, and paint applications.',
    grades: [
      'Cosmetic Grade Talc (Sterilized / Asbestos-Free)',
      'Plastics & Polymer Compounding Grade (D50 < 3µm)',
      'Paints & Industrial Coatings Grade',
      'Ceramic & Glaze Grade',
      'French Talc / Super Snow White',
      'Marble Talc Powder'
    ],
    meshSizes: ['300 Mesh', '500 Mesh', '700 Mesh', '1250 Mesh', '2500 Mesh', '2 Micron (D97)'],
    chemicalFormula: 'Mg3Si4O10(OH)2',
    brightnessWhiteness: '94% - 98.5% (Hunter L)',
    purity: '98.2% Min',
    oilAbsorption: '32 - 45 g / 100g',
    bulkDensity: '0.35 - 0.55 g/cm³',
    phValue: '8.5 - 9.3',
    moistureContent: '< 0.3% Max',
    keyProperties: [
      'Asbestos-free and sterilized for high safety cosmetics',
      'Platey lamellar crystal morphology enhances tensile strength in plastics',
      'High lubricity and hydrophobic nature',
      'Exceptional chemical resistance and high dielectric strength'
    ],
    applications: ['Cosmetics', 'Plastics & Polymers', 'Paints & Coatings', 'Rubber & EVA', 'Ceramics', 'Paper', 'Pharmaceuticals'],
    packagingOptions: ['25 Kg Paper / HDPE Bags', '50 Kg HDPE Bags', '1000 Kg Jumbo Bags with moisture barrier', 'Custom Palletized with shrink wrap'],
    minimumOrderQty: '1 Metric Ton',
    typicalPriceRange: '₹9,500 - ₹28,000 / MT',
    chemicalAnalysis: [
      { component: 'SiO2 (Silica)', value: '61.5% - 63.2%', testMethod: 'XRF / Wet Chemical' },
      { component: 'MgO (Magnesium Oxide)', value: '31.0% - 32.2%', testMethod: 'Titrimetric' },
      { component: 'Al2O3 (Alumina)', value: '< 0.45%', testMethod: 'ICP-OES' },
      { component: 'Fe2O3 (Iron Oxide)', value: '< 0.35%', testMethod: 'Spectrophotometric' },
      { component: 'CaO (Calcium Oxide)', value: '< 0.60%', testMethod: 'Flame Photometry' },
      { component: 'Loss on Ignition (LOI 1000°C)', value: '4.8% - 5.5%', testMethod: 'Gravimetric' },
      { component: 'Heavy Metals (Pb, As, Cd)', value: '< 2 ppm (Compliant with USP/BP)', testMethod: 'AAS / ICP' }
    ],
    physicalProperties: [
      { property: 'Whiteness / Brightness', value: '96.5', unit: '%' },
      { property: 'Hardness (Mohs Scale)', value: '1.0', unit: 'Mohs' },
      { property: 'Specific Gravity', value: '2.75', unit: 'g/cm³' },
      { property: 'Oil Absorption', value: '38', unit: 'g/100g' },
      { property: 'Residue on 325 Mesh (45µm)', value: '0.01', unit: '% Max' },
      { property: 'Average Particle Size (D50)', value: '3.2', unit: 'microns' }
    ],
    featured: true
  },
  {
    id: 'calcium-carbonate',
    name: 'Calcium Carbonate (PCC / GCC / Micronized)',
    category: 'Lime & Carbonates',
    tagline: 'High whiteness natural ground & precipitated calcium carbonate with controlled crystal structures',
    description: 'We offer an exhaustive spectrum of Natural Ground Calcium Carbonate (GCC), Precipitated Calcium Carbonate (PCC), and Stearic Acid Coated / Surface Treated Calcium Carbonate. Sourced from high-grade crystalline limestone quarries and pulverized with precision classification for zero grit and optimal loading in PVC pipes, cables, and masterbatches.',
    grades: [
      'Precipitated Calcium Carbonate (PCC - Calcitic / Aragonite)',
      'Micronized Natural Ground Calcium Carbonate (GCC)',
      'Stearic Acid Coated / Surface Treated GCC (Activated for polymers)',
      'Food & Pharma USP Calcium Carbonate',
      'Paper & High Opacity Board Grade'
    ],
    meshSizes: ['300 Mesh', '400 Mesh', '700 Mesh', '1250 Mesh', '2500 Mesh', 'Superfine 1.5 Micron (D97)'],
    chemicalFormula: 'CaCO3',
    brightnessWhiteness: '96.0% - 99.2%',
    purity: '98.5% - 99.4% Min',
    oilAbsorption: '14 - 24 g / 100g (GCC) | 28 - 42 g / 100g (PCC)',
    bulkDensity: '0.65 - 0.95 g/cm³',
    phValue: '8.8 - 9.6',
    moistureContent: '< 0.20% Max',
    keyProperties: [
      'Ultra-high brightness (>98%) reduces expensive TiO2 consumption',
      'Surface treated grades offer superb dispersion in PVC, PP, and PE matrices',
      'Controlled particle distribution ensures smooth extrusion and high gloss',
      'Minimal abrasive silica content protects downstream extruders and molds'
    ],
    applications: ['Plastics & Polymers', 'Cables & Wiring', 'Paints & Coatings', 'Paper', 'Rubber & EVA', 'Food & Pharma', 'Construction'],
    packagingOptions: ['25 Kg HDPE / Kraft Paper Bags', '50 Kg PP Woven Bags', '1000 Kg Big Bags / Jumbo Bags'],
    minimumOrderQty: '3 Metric Tons',
    typicalPriceRange: '₹4,800 - ₹18,500 / MT',
    chemicalAnalysis: [
      { component: 'CaCO3 (Calcium Carbonate)', value: '98.8% - 99.3%', testMethod: 'IS 1760 EDTA Titration' },
      { component: 'MgCO3 (Magnesium Carbonate)', value: '< 0.65%', testMethod: 'Titrimetric' },
      { component: 'Acid Insoluble / Free Silica', value: '< 0.25%', testMethod: 'Gravimetric' },
      { component: 'Fe2O3 (Iron Oxide)', value: '< 0.03%', testMethod: 'ICP-OES' },
      { component: 'Al2O3 (Alumina)', value: '< 0.08%', testMethod: 'Wet Chemical' },
      { component: 'Loss on Ignition (LOI)', value: '43.2% - 43.8%', testMethod: 'Thermal Decomposition' }
    ],
    physicalProperties: [
      { property: 'Whiteness (L-Value)', value: '98.5', unit: '%' },
      { property: 'Specific Gravity', value: '2.71', unit: 'g/cm³' },
      { property: 'Hardness (Mohs)', value: '3.0', unit: 'Mohs' },
      { property: 'Oil Absorption (GCC)', value: '18', unit: 'g/100g' },
      { property: 'Residue on 500 Mesh', value: '0.005', unit: '% Max' }
    ],
    featured: true
  },
  {
    id: 'china-clay',
    name: 'China Clay Powder / Kaolin',
    category: 'Clays & Binders',
    tagline: 'Hydrous & Calcined aluminium silicate with high plasticity, thermal resistance & opacity',
    description: 'Deepali Minerals supplies superior quality Hydrous and Calcined China Clay (Kaolin) processed through systematic levigation and magnetic separation. Engineered for paints, paper coating, sanitaryware, ceramics, rubber reinforcement, and pesticide formulations.',
    grades: [
      'Levigated White Kaolin Powder',
      'Calcined High Whiteness Kaolin (Low Abrasion)',
      'Rubber Grade China Clay (Reinforcing)',
      'Ceramic & Porcelain Casting Grade',
      'Pesticide Carrier & Fertilizer Grade'
    ],
    meshSizes: ['300 Mesh', '400 Mesh', '500 Mesh', '700 Mesh', 'Sub-micron 2µm Calcined'],
    chemicalFormula: 'Al2Si2O5(OH)4',
    brightnessWhiteness: '82% - 94% (Calcined up to 95%)',
    purity: 'High Purity Alumino-Silicate',
    oilAbsorption: '35 - 55 g / 100g',
    bulkDensity: '0.40 - 0.65 g/cm³',
    phValue: '6.5 - 7.8',
    moistureContent: '< 1.0% (Hydrous) | < 0.2% (Calcined)',
    keyProperties: [
      'Excellent slip casting properties and vitrification in ceramics',
      'Plate-like structure improves rheology and crack resistance in paints',
      'Improves electrical insulation and modulus in rubber cable compounds',
      'Low abrasiveness prevents equipment wear'
    ],
    applications: ['Ceramics', 'Paints & Coatings', 'Rubber & EVA', 'Paper', 'Cables & Wiring', 'Agriculture'],
    packagingOptions: ['25 Kg HDPE Laminated Bags', '50 Kg PP Bags', '1 MT Big Bags'],
    minimumOrderQty: '2 Metric Tons',
    typicalPriceRange: '₹5,500 - ₹22,000 / MT',
    chemicalAnalysis: [
      { component: 'SiO2 (Silica)', value: '46.5% - 48.5%', testMethod: 'IS 2840' },
      { component: 'Al2O3 (Alumina)', value: '36.5% - 38.8%', testMethod: 'Complexometric Titration' },
      { component: 'Fe2O3 (Iron Oxide)', value: '< 0.65%', testMethod: 'Colorimetric' },
      { component: 'TiO2 (Titanium Dioxide)', value: '< 0.85%', testMethod: 'Spectroscopic' },
      { component: 'Loss on Ignition (Hydrous)', value: '12.5% - 13.8%', testMethod: 'Gravimetric' }
    ],
    physicalProperties: [
      { property: 'Whiteness / Brightness', value: '88.5', unit: '%' },
      { property: 'Specific Gravity', value: '2.60', unit: 'g/cm³' },
      { property: 'Oil Absorption', value: '42', unit: 'g/100g' },
      { property: 'Particle Size (<2 Micron)', value: '75', unit: '%' }
    ],
    featured: true
  },
  {
    id: 'calcite-powder',
    name: 'Micronized Calcite Powder',
    category: 'Functional Minerals',
    tagline: 'Crystalline calcium carbonate of exceptional optical purity & high dispersion rate',
    description: 'Our Micronized Calcite Powder is extracted from pristine crystalline calcite deposits. Distinguished by high calcium content (>98.5%), exceptional whiteness up to 99%, low oil absorption, and superior opacity. It is an indispensable functional filler for rigid PVC pipes, profile extrusion, emulsion paints, and synthetic leather.',
    grades: [
      'Optical Grade Super White Calcite (>98.5% Brightness)',
      'PVC & Masterbatch Micronized Calcite',
      'Emulsion Paint & Primer Grade',
      'Synthetic Leather & Footwear Sole Grade'
    ],
    meshSizes: ['400 Mesh', '500 Mesh', '800 Mesh', '1250 Mesh', '2500 Mesh (D97 = 5µm)'],
    chemicalFormula: 'CaCO3 (Crystalline)',
    brightnessWhiteness: '97.0% - 99.0%',
    purity: '98.5% CaCO3 Min',
    oilAbsorption: '13 - 18 g / 100g',
    bulkDensity: '0.85 - 1.15 g/cm³',
    phValue: '8.8 - 9.4',
    moistureContent: '< 0.15%',
    keyProperties: [
      'Very low oil absorption enables high filler loading without viscosity rise',
      'Diamond crystal form imparts dimensional stability and stiffness',
      'Outstanding chemical purity with low iron content (<0.02%)',
      'High weatherability and resistance to UV degradation'
    ],
    applications: ['Plastics & Polymers', 'Paints & Coatings', 'Cables & Wiring', 'Rubber & EVA', 'Construction'],
    packagingOptions: ['25 Kg HDPE Laminated Bags', '50 Kg Bags', '1000 Kg Jumbo Bags'],
    minimumOrderQty: '3 Metric Tons',
    typicalPriceRange: '₹5,200 - ₹16,000 / MT',
    chemicalAnalysis: [
      { component: 'CaCO3', value: '98.8%', testMethod: 'IS Standard' },
      { component: 'SiO2 (Silica)', value: '< 0.30%', testMethod: 'Gravimetric' },
      { component: 'Fe2O3', value: '< 0.025%', testMethod: 'AAS' },
      { component: 'MgO', value: '< 0.40%', testMethod: 'Titration' }
    ],
    physicalProperties: [
      { property: 'Whiteness Index', value: '98.8', unit: '%' },
      { property: 'Specific Gravity', value: '2.72', unit: 'g/cm³' },
      { property: 'Oil Absorption', value: '15.5', unit: 'g/100g' }
    ],
    featured: true
  },
  {
    id: 'dolomite-powder',
    name: 'Superfine Dolomite Powder',
    category: 'Functional Minerals',
    tagline: 'Double carbonate of calcium and magnesium with high resistance & weatherability',
    description: 'Deepali Minerals manufactures double-washed, magnetically separated, and micronized Dolomite Powder. With a balanced equimolar ratio of calcium and magnesium carbonates, it provides high mechanical strength, chemical stability, and heat insulation for paints, tiles, plastics, wall putty, and glass manufacturing.',
    grades: [
      'High Brightness Micronized Dolomite (1250 Mesh)',
      'Wall Putty & Texture Paint Grade (300-500 Mesh)',
      'Glass & Frits Manufacturing Grade',
      'Steel & Metallurgy Flux Grade'
    ],
    meshSizes: ['300 Mesh', '400 Mesh', '500 Mesh', '700 Mesh', '1250 Mesh'],
    chemicalFormula: 'CaMg(CO3)2',
    brightnessWhiteness: '94.0% - 97.5%',
    purity: '98.0% Total Carbonate Min',
    oilAbsorption: '15 - 22 g / 100g',
    bulkDensity: '0.80 - 1.10 g/cm³',
    phValue: '9.0 - 9.8',
    moistureContent: '< 0.25%',
    keyProperties: [
      'Contains 20-22% MgO providing superior heat resistance and buffering capacity',
      'High refractive index and moderate abrasiveness',
      'Provides bulk density and body in textures, grouts, and adhesives',
      'Cost-effective performance extender for exterior architectural coatings'
    ],
    applications: ['Paints & Coatings', 'Construction', 'Ceramics', 'Plastics & Polymers', 'Rubber & EVA'],
    packagingOptions: ['50 Kg HDPE Bags', '25 Kg Bags', '1 Metric Ton Jumbo Bags'],
    minimumOrderQty: '3 Metric Tons',
    typicalPriceRange: '₹3,800 - ₹9,500 / MT',
    chemicalAnalysis: [
      { component: 'CaCO3 (Calcium Carbonate)', value: '54.0% - 56.5%', testMethod: 'EDTA Complexometric' },
      { component: 'MgCO3 (Magnesium Carbonate)', value: '41.5% - 43.5%', testMethod: 'Titration' },
      { component: 'SiO2 (Silica)', value: '< 1.2%', testMethod: 'IS 1760' },
      { component: 'Fe2O3 (Iron Oxide)', value: '< 0.15%', testMethod: 'AAS' }
    ],
    physicalProperties: [
      { property: 'Whiteness', value: '95.5', unit: '%' },
      { property: 'Specific Gravity', value: '2.85', unit: 'g/cm³' },
      { property: 'Hardness', value: '3.5 - 4.0', unit: 'Mohs' }
    ]
  },
  {
    id: 'hydrated-lime',
    name: 'Hydrated Lime & Quicklime',
    category: 'Lime & Carbonates',
    tagline: 'High available CaO/Ca(OH)2 for water treatment, effluent treatment, and chemical synthesis',
    description: 'We process high-grade Quicklime (Calcium Oxide) and Hydrated Lime (Calcium Hydroxide) using controlled slaking technology. Known for very high available lime content (>90% as Ca(OH)2), ultra-fine particle distribution, and low insolubles for water purification, metallurgy, sugar refining, and road stabilization.',
    grades: [
      'Chemical Grade Hydrated Lime (Available Ca(OH)2 > 90%)',
      'ETP & Effluent Water Treatment Grade',
      'Quicklime Lumps & Powder (Available CaO > 85%)',
      'Sugar Refining Grade (Low Silicates & Fe)'
    ],
    meshSizes: ['200 Mesh', '300 Mesh', '400 Mesh'],
    chemicalFormula: 'Ca(OH)2 / CaO',
    brightnessWhiteness: '85% - 92%',
    purity: '85% - 94% Available Lime',
    oilAbsorption: '35 - 50 g / 100g',
    bulkDensity: '0.45 - 0.65 g/cm³',
    phValue: '12.4 - 12.8 (Saturated solution)',
    moistureContent: '< 1.5% Free Moisture',
    keyProperties: [
      'High chemical reactivity for rapid pH neutralization in wastewater plants',
      'Extremely low unslaked grits preventing clogging in dosing pipes',
      'Superior disinfectant and antimicrobial efficacy in environmental control',
      'High flocking capacity for clarifying suspended solids'
    ],
    applications: ['Water Treatment & ETP', 'Chemicals & Additives', 'Construction', 'Paper', 'Agriculture'],
    packagingOptions: ['25 Kg HDPE Laminated Bags (Moisture resistant)', '50 Kg HDPE Bags'],
    minimumOrderQty: '3 Metric Tons',
    typicalPriceRange: '₹5,800 - ₹12,500 / MT',
    chemicalAnalysis: [
      { component: 'Available Ca(OH)2', value: '90.5% - 92.5%', testMethod: 'Sugar Method / IS 1514' },
      { component: 'Total Calcium as CaO', value: '68.5% - 70.0%', testMethod: 'Titrimetric' },
      { component: 'Acid Insolubles', value: '< 1.0%', testMethod: 'Gravimetric' },
      { component: 'Iron Oxide (Fe2O3)', value: '< 0.12%', testMethod: 'Spectrophotometric' }
    ],
    physicalProperties: [
      { property: 'Fineness passing 300 Mesh', value: '98.5', unit: '%' },
      { property: 'Bulk Density', value: '0.52', unit: 'g/cm³' }
    ]
  },
  {
    id: 'silica-powder',
    name: 'Silica Powder & Quartz Powder',
    category: 'Functional Minerals',
    tagline: 'High-purity crystalline silicon dioxide with exceptional hardness & thermal durability',
    description: 'Deepali Minerals manufactures high-grade Silica / Quartz powder from pure vein quartz rock. Thoroughly washed and pulverized using ceramic lined ball mills to avoid any iron contamination, delivering SiO2 content exceeding 99.2% for paints, foundry casting, electronics, epoxy flooring, and ceramics.',
    grades: [
      'Micronized Optical Silica (SiO2 > 99.5%)',
      'Epoxy Flooring & Construction Chemical Grade',
      'Ceramic Frits & Glass Manufacturing Grade',
      'Rubber & Friction Lining Grade'
    ],
    meshSizes: ['200 Mesh', '300 Mesh', '400 Mesh', '500 Mesh', 'Sub-micron 4µm'],
    chemicalFormula: 'SiO2',
    brightnessWhiteness: '92% - 97%',
    purity: '99.0% - 99.5% SiO2',
    oilAbsorption: '18 - 26 g / 100g',
    bulkDensity: '1.20 - 1.45 g/cm³',
    phValue: '6.8 - 7.5',
    moistureContent: '< 0.10%',
    keyProperties: [
      'Mohs hardness of 7.0 provides scratch and abrasion resistance',
      'Extreme thermal endurance up to 1600°C',
      'Chemically inert to almost all acids and corrosive agents',
      'Imparts high compressive strength in polymer concretes and adhesives'
    ],
    applications: ['Paints & Coatings', 'Ceramics', 'Construction', 'Rubber & EVA', 'Plastics & Polymers'],
    packagingOptions: ['50 Kg HDPE Bags', '1000 Kg Big Bags'],
    minimumOrderQty: '3 Metric Tons',
    typicalPriceRange: '₹3,500 - ₹14,000 / MT',
    chemicalAnalysis: [
      { component: 'SiO2 (Silica)', value: '99.2% - 99.6%', testMethod: 'Gravimetric / Hydrofluorization' },
      { component: 'Fe2O3', value: '< 0.035%', testMethod: 'AAS' },
      { component: 'Al2O3', value: '< 0.35%', testMethod: 'Colorimetric' },
      { component: 'Loss on Ignition', value: '< 0.20%', testMethod: 'Gravimetric' }
    ],
    physicalProperties: [
      { property: 'Hardness (Mohs)', value: '7.0', unit: 'Mohs' },
      { property: 'Specific Gravity', value: '2.65', unit: 'g/cm³' }
    ]
  },
  {
    id: 'zinc-oxide-stearate',
    name: 'Zinc Oxide & Zinc Stearate',
    category: 'Chemicals & Additives',
    tagline: 'High purity active rubber accelerator & premium non-toxic plastic lubricant / stabilizer',
    description: 'We supply high purity White Seal Zinc Oxide (Active & French Process) alongside Zinc Stearate. Zinc oxide serves as a vital vulcanization activator in tires and EVA footwear, while Zinc Stearate functions as an internal lubricant, release agent, and heat stabilizer in PVC and masterbatch compounding.',
    grades: [
      'Zinc Oxide White Seal (ZnO > 99.5%)',
      'Active Rubber Vulcanization Grade Zinc Oxide',
      'Cosmetic & Pharma Grade Zinc Oxide USP',
      'Zinc Stearate Powder (Free Fatty Acid < 1%)'
    ],
    meshSizes: ['325 Mesh', '500 Mesh', 'Micro-fine'],
    chemicalFormula: 'ZnO / Zn(C18H35O2)2',
    brightnessWhiteness: '97% - 99%',
    purity: '99.2% - 99.7%',
    oilAbsorption: '15 - 28 g / 100g',
    bulkDensity: '0.30 - 0.70 g/cm³',
    phValue: '7.0 - 7.8',
    moistureContent: '< 0.5%',
    keyProperties: [
      'Accelerates vulcanization rate and improves rubber thermal conductivity',
      'Acts as UV screen in coatings and personal care lotions',
      'Zinc stearate offers exceptional mold release and clarity in crystal polystyrene',
      'Very low heavy metal residues conforming to REACH & RoHS'
    ],
    applications: ['Rubber & EVA', 'Plastics & Polymers', 'Cosmetics', 'Paints & Coatings', 'Pharmaceuticals'],
    packagingOptions: ['25 Kg Paper Bags with Polyethylene Inner Liner'],
    minimumOrderQty: '500 Kg',
    typicalPriceRange: '₹140,000 - ₹280,000 / MT',
    chemicalAnalysis: [
      { component: 'ZnO Assay', value: '99.5% Min', testMethod: 'Titrimetric EDTA' },
      { component: 'Lead (Pb)', value: '< 0.005%', testMethod: 'AAS' },
      { component: 'Cadmium (Cd)', value: '< 0.001%', testMethod: 'AAS' }
    ],
    physicalProperties: [
      { property: 'Surface Area (BET)', value: '4.5 - 6.5', unit: 'm²/g' },
      { property: 'Specific Gravity', value: '5.6', unit: 'g/cm³' }
    ]
  },
  {
    id: 'barytes-powder',
    name: 'Barytes Powder / Barium Sulfate',
    category: 'Functional Minerals',
    tagline: 'Natural high density barium sulfate (BaSO4) for drilling muds, heavy coatings & sound deadening',
    description: 'Deepali Minerals supplies natural white and off-white Barytes (Barite) powder characterized by its extreme specific gravity (4.20+ g/cm³), chemical inertness, and resistance to acids. Critical for oil & gas drilling muds, automotive acoustic insulation, primers, and radiation shielding.',
    grades: [
      'High Whiteness Barytes (Brightness > 94%)',
      'OCMA / API Drilling Mud Grade (Sp. Gravity > 4.20)',
      'Automotive Sound Damping & Brake Lining Grade',
      'Chemical & Barium Salt Grade'
    ],
    meshSizes: ['200 Mesh', '300 Mesh', '400 Mesh', '500 Mesh', 'Micro-barytes 1000 Mesh'],
    chemicalFormula: 'BaSO4',
    brightnessWhiteness: '88% - 95%',
    purity: '90% - 96% BaSO4',
    oilAbsorption: '10 - 15 g / 100g',
    bulkDensity: '1.80 - 2.30 g/cm³',
    phValue: '7.5 - 8.5',
    moistureContent: '< 0.20%',
    keyProperties: [
      'High specific gravity (>4.2) creates hydrostatic pressure in deep drilling',
      'Extremely low oil absorption allows high pigment volume concentration (PVC)',
      'Total inertness to acids, alkalis, and atmospheric weathering',
      'High X-ray and gamma radiation absorption for diagnostic and building shields'
    ],
    applications: ['Oil & Gas / Drilling', 'Paints & Coatings', 'Rubber & EVA', 'Plastics & Polymers', 'Automotive'],
    packagingOptions: ['50 Kg HDPE Bags', '1000 Kg Jumbo Bags (Export standard)'],
    minimumOrderQty: '5 Metric Tons',
    typicalPriceRange: '₹7,500 - ₹24,000 / MT',
    chemicalAnalysis: [
      { component: 'BaSO4', value: '92.5% - 95.5%', testMethod: 'Gravimetric Precipitation' },
      { component: 'SiO2', value: '< 2.5%', testMethod: 'IS 64' },
      { component: 'Fe2O3', value: '< 0.35%', testMethod: 'AAS' }
    ],
    physicalProperties: [
      { property: 'Specific Gravity', value: '4.25', unit: 'g/cm³' },
      { property: 'Hardness (Mohs)', value: '3.0 - 3.5', unit: 'Mohs' }
    ]
  },
  {
    id: 'chalk-powder',
    name: 'French Chalk & Porbandar Whitening Chalk',
    category: 'Fillers & Extenders',
    tagline: 'Micro-fine soft sedimentary chalk for smooth finish, anti-tack dusting & rubber compounding',
    description: 'We process authentic French Chalk and Porbandar Whitening Chalk. Naturally soft with fine lamellar crystals, it is widely utilized for dusting molded rubber goods, inner tubes, cable insulations, anti-caking in fertilizers, and school writing chalks.',
    grades: [
      'French Chalk Dusting Grade (Anti-Tack)',
      'Porbandar Whitening Chalk (Super White)',
      'Cable & Wire Insulation Dusting Grade',
      'Rubber Extrusion Parting Agent'
    ],
    meshSizes: ['300 Mesh', '400 Mesh', '500 Mesh'],
    chemicalFormula: 'CaCO3 / Talcose Mix',
    brightnessWhiteness: '90% - 96%',
    purity: '95% Min',
    oilAbsorption: '22 - 30 g / 100g',
    bulkDensity: '0.50 - 0.70 g/cm³',
    phValue: '8.5 - 9.2',
    moistureContent: '< 0.5%',
    keyProperties: [
      'Prevents unvulcanized rubber sheets from sticking during storage',
      'Smooth texture with zero abrasive quartz granules',
      'Cost effective whitening and opacity enhancer',
      'Good heat dispersion during compounding'
    ],
    applications: ['Rubber & EVA', 'Cables & Wiring', 'Cosmetics', 'Construction'],
    packagingOptions: ['25 Kg HDPE Bags', '50 Kg HDPE Bags'],
    minimumOrderQty: '2 Metric Tons',
    typicalPriceRange: '₹4,200 - ₹9,800 / MT',
    chemicalAnalysis: [
      { component: 'CaCO3 Content', value: '94.0% - 96.5%', testMethod: 'EDTA Titration' },
      { component: 'Silica & Silicates', value: '< 3.0%', testMethod: 'Gravimetric' }
    ],
    physicalProperties: [
      { property: 'Whiteness', value: '93.5', unit: '%' },
      { property: 'Residue on 300 Mesh', value: '< 0.1', unit: '%' }
    ]
  },
  {
    id: 'red-oxide',
    name: 'Natural & Synthetic Red Oxide Powder',
    category: 'Chemicals & Additives',
    tagline: 'High tinting strength ferric oxide pigment for anti-corrosion metal primers & tiles',
    description: 'Deepali Minerals offers high-purity Natural Red Oxide (hematite) and Micronized Synthetic Iron Oxide Red. Revered for weatherfastness, UV shielding, non-bleeding performance, and exceptional anti-corrosive rust inhibition on steel structures and automotive underbodies.',
    grades: [
      'Natural Hematite Red Oxide (Fe2O3 > 85%)',
      'Micronized Synthetic Red Iron Oxide 130',
      'Flooring Tile & Paver Block Pigment Grade',
      'Anti-Corrosion Metal Primer Grade'
    ],
    meshSizes: ['300 Mesh', '400 Mesh', '500 Mesh', 'Micro-fine 1µm'],
    chemicalFormula: 'Fe2O3',
    brightnessWhiteness: 'Rich Deep Crimson Red',
    purity: '85% - 96% Fe2O3',
    oilAbsorption: '18 - 25 g / 100g',
    bulkDensity: '1.10 - 1.40 g/cm³',
    phValue: '6.5 - 7.5',
    moistureContent: '< 0.5%',
    keyProperties: [
      'Outstanding rust inhibitive barrier mechanism on ferrous alloys',
      'High tinting strength and permanent lightfastness (Blue wool scale 8)',
      'Resistance to mild acids, alkalis, and industrial flue gases',
      'Non-toxic inorganic colorant for colored concrete tiles'
    ],
    applications: ['Paints & Coatings', 'Construction', 'Plastics & Polymers', 'Ceramics'],
    packagingOptions: ['25 Kg Multiwall Paper Bags', '50 Kg HDPE Bags'],
    minimumOrderQty: '1 Metric Ton',
    typicalPriceRange: '₹14,000 - ₹48,000 / MT',
    chemicalAnalysis: [
      { component: 'Fe2O3 (Ferric Oxide)', value: '86.5% - 95.0%', testMethod: 'Dichromate Titration' },
      { component: 'SiO2', value: '2.5% - 4.5%', testMethod: 'IS 44' },
      { component: 'Water Soluble Salts', value: '< 0.5%', testMethod: 'Conductivity' }
    ],
    physicalProperties: [
      { property: 'Specific Gravity', value: '4.85', unit: 'g/cm³' },
      { property: 'Oil Absorption', value: '21', unit: 'g/100g' }
    ]
  },
  {
    id: 'magnesium-carbonate',
    name: 'Magnesium Carbonate Powder',
    category: 'Chemicals & Additives',
    tagline: 'Light and heavy basic magnesium carbonate for high insulation, transparent rubber & sports grip',
    description: 'We supply Light & Heavy basic Magnesium Carbonate (Magnesite derivative). With an extremely low bulk density in light grades and superior transparency in vulcanized translucent rubbers, it also serves as a premium anti-caking agent, athletic grip chalk, and thermal insulator.',
    grades: [
      'Light Basic Magnesium Carbonate (Bulk Density ~ 0.12 g/cm³)',
      'Heavy Magnesium Carbonate',
      'Translucent Rubber Reinforcing Grade',
      'Gymnastic & Athletic Chalk Grade'
    ],
    meshSizes: ['300 Mesh', '400 Mesh', '500 Mesh'],
    chemicalFormula: '4MgCO3·Mg(OH)2·4H2O',
    brightnessWhiteness: '96% - 98.5%',
    purity: '40% - 43% MgO (Min 98% Carbonate basis)',
    oilAbsorption: '65 - 90 g / 100g',
    bulkDensity: '0.12 - 0.35 g/cm³',
    phValue: '9.5 - 10.5',
    moistureContent: '< 1.0%',
    keyProperties: [
      'Unique low density imparts lightweight bulk without sacrificing volume',
      'Matches refractive index of natural rubber allowing crystal clear compounds',
      'Supreme moisture and perspiration absorbency for athlete grip',
      'High thermal decomposition insulation property'
    ],
    applications: ['Rubber & EVA', 'Cosmetics', 'Pharmaceuticals', 'Plastics & Polymers', 'Sports & Fitness'],
    packagingOptions: ['15 Kg Multiwall Paper Bags (due to high volume)', '25 Kg Laminated Bags'],
    minimumOrderQty: '1 Metric Ton',
    typicalPriceRange: '₹32,000 - ₹75,000 / MT',
    chemicalAnalysis: [
      { component: 'MgO (Magnesium Oxide)', value: '41.2% - 42.8%', testMethod: 'Titrimetric' },
      { component: 'CaO', value: '< 0.40%', testMethod: 'AAS' },
      { component: 'Heavy Metals (Pb, As)', value: '< 5 ppm', testMethod: 'ICP-MS' }
    ],
    physicalProperties: [
      { property: 'Whiteness', value: '97.2', unit: '%' },
      { property: 'Bulk Density (Light)', value: '0.14', unit: 'g/cm³' }
    ]
  },
  {
    id: 'titanium-dioxide',
    name: 'Titanium Di Oxide',
    category: 'Chemicals & Additives',
    tagline: 'High-opacity white inorganic pigment for brightness, tinting strength, and UV resistance',
    description: 'Titanium dioxide is an inorganic white pigment widely utilized across industrial manufacturing for whiteness, opacity, and optical performance in coatings, masterbatches, polymers, and inks.',
    grades: ['Industrial Pigment Grade', 'Anatase / Rutile Grades on request'],
    meshSizes: ['Sub-micron pigment particles'],
    chemicalFormula: 'TiO2',
    brightnessWhiteness: 'High Opacity White Pigment',
    purity: 'Technical data available on request',
    oilAbsorption: 'Available on request',
    bulkDensity: 'Available on request',
    phValue: '6.5 - 8.0',
    moistureContent: 'Technical data available on request',
    keyProperties: [
      'Maximum light scattering and refractive index for extreme opacity',
      'Superior tinting strength and clean undertone in color systems',
      'Excellent weatherability and UV degradation protection in polymers',
      'Low binder demand and high dispersion compatibility'
    ],
    applications: ['Paints & Coatings', 'Plastics & Masterbatches', 'Rubber Goods', 'Paper', 'Printing Inks'],
    packagingOptions: ['25 Kg Bags', '50 Kg Bags', '1 MT Jumbo Bags'],
    minimumOrderQty: '1 Metric Ton',
    typicalPriceRange: 'Pricing available on request',
    chemicalAnalysis: [
      { component: 'TiO2 (Titanium Dioxide)', value: 'Primary composition', testMethod: 'XRF' }
    ],
    physicalProperties: [
      { property: 'Form', value: 'Fine white powder', unit: '' }
    ]
  },
  {
    id: 'quartz-sand',
    name: 'Quartz Sand',
    category: 'Industrial Materials',
    tagline: 'Silica-rich natural quartz granular media for foundry molding, glass manufacturing, and screeds',
    description: 'Quartz Sand is a silica-rich granular material processed from high-purity quartz deposits for industrial applications requiring chemical inertness, high melting point, and controlled grain fractions.',
    grades: ['Industrial Quartz Sand', 'Graded Foundry & Filtration Fractions'],
    meshSizes: ['Graded Mesh Fractions (16/30, 30/60, 50/100 Mesh)'],
    chemicalFormula: 'SiO2',
    brightnessWhiteness: 'Natural silica grain',
    purity: 'SiO2 content available on request',
    oilAbsorption: 'Available on request',
    bulkDensity: '1.40 - 1.60 g/cm³',
    phValue: '6.8 - 7.5',
    moistureContent: '< 0.5% Max',
    keyProperties: [
      'High thermal resistance and low thermal expansion in foundry molds',
      'Chemically inert crystalline silica structure',
      'Hard angular-to-subangular grains ensuring structural bond strength',
      'Controlled particle size distribution'
    ],
    applications: ['Glass Manufacturing', 'Foundry Casting', 'Construction Mortars', 'Ceramics', 'Water Filtration'],
    packagingOptions: ['50 Kg HDPE Bags', '1 MT Jumbo Bags', 'Loose Bulk on request'],
    minimumOrderQty: '5 Metric Tons',
    typicalPriceRange: 'Pricing available on request',
    chemicalAnalysis: [
      { component: 'SiO2 (Silicon Dioxide)', value: 'Primary composition', testMethod: 'Wet Assay / XRF' }
    ],
    physicalProperties: [
      { property: 'Hardness (Mohs)', value: '7.0', unit: 'Mohs' }
    ]
  },
  {
    id: 'marble-chips',
    name: 'Marble Chips',
    category: 'Industrial Materials',
    tagline: 'Screened natural crystalline marble stone granules for terrazzo flooring and exposed aggregates',
    description: 'Marble Chips are crushed and screened natural marble stone granules primarily associated with calcium carbonate. Processed in various aggregate fractions for architectural terrazzo floors, decorative exposed cast panels, and garden landscaping.',
    grades: ['Screened Industrial & Decorative Chips', 'Fine to Coarse Aggregates'],
    meshSizes: ['Graded chip fractions: 0-size, 1-size, 2-size, 3-size'],
    chemicalFormula: 'CaCO3',
    brightnessWhiteness: 'Natural white to off-white chips',
    purity: 'CaCO3 content available on request',
    oilAbsorption: 'N/A (Granular Chips)',
    bulkDensity: '1.45 - 1.65 g/cm³',
    phValue: '8.2 - 9.0',
    moistureContent: '< 0.5% Max',
    keyProperties: [
      'High compressive strength and weather resistance',
      'Natural crystalline sparkle and architectural aesthetic appeal',
      'Uniform grading for terrazzo and precast bonding',
      'Non-reactive with cementitious and epoxy resin matrixes'
    ],
    applications: ['Terrazzo Flooring', 'Exposed Aggregate Renders', 'Decorative Landscaping', 'Precast Concrete', 'Cast Stone'],
    packagingOptions: ['50 Kg HDPE Bags', '1 MT Jumbo Bags'],
    minimumOrderQty: '5 Metric Tons',
    typicalPriceRange: 'Pricing available on request',
    chemicalAnalysis: [
      { component: 'CaCO3 (Calcium Carbonate)', value: 'Primary composition', testMethod: 'Titrimetric' }
    ],
    physicalProperties: [
      { property: 'Form', value: 'Granular stone chippings', unit: '' }
    ]
  },
  {
    id: 'french-chalk-powder',
    name: 'French Chalk Powder',
    category: 'Fillers & Extenders',
    tagline: 'Talc-associated natural mineral powder for industrial lubricity, surface dusting, and marking',
    description: 'French Chalk Powder is a talc-associated mineral powder characterized by extreme softness, lubricity, and non-stick release properties. Common industrial applications include rubber tyre demolding, cable drawing lubrication, metal marking, and tailoring chalks.',
    grades: ['Commercial French Chalk Grade', 'Fine Industrial Dusting Grade'],
    meshSizes: ['300 Mesh', '400 Mesh', '500 Mesh'],
    chemicalFormula: 'Mg3Si4O10(OH)2',
    brightnessWhiteness: 'Good whiteness available',
    purity: 'Technical data available on request',
    oilAbsorption: '30 - 40 g / 100g',
    bulkDensity: '0.40 - 0.60 g/cm³',
    phValue: '8.5 - 9.2',
    moistureContent: '< 1.0% Max',
    keyProperties: [
      'Exceptional dry surface lubricity and anti-adhesion performance',
      'Prevents rubber sticking during vulcanization and storage',
      'Smooth non-abrasive marking on fabrics and metals',
      'High thermal stability'
    ],
    applications: ['Rubber Goods & Tyres', 'Cable Sheathing', 'Metal Fabrication Marking', 'Tailoring Chalk', 'Welding Anti-Spatter'],
    packagingOptions: ['25 Kg Bags', '50 Kg HDPE Bags'],
    minimumOrderQty: '1 Metric Ton',
    typicalPriceRange: 'Pricing available on request',
    chemicalAnalysis: [
      { component: 'Primary Mineral', value: 'Talc / Steatite', testMethod: 'XRD' }
    ],
    physicalProperties: [
      { property: 'Hardness (Mohs)', value: '1.0', unit: 'Mohs' }
    ]
  },
  {
    id: 'starch',
    name: 'Starch',
    category: 'Chemicals & Additives',
    tagline: 'Natural polymeric carbohydrate material for industrial sizing, binding, and adhesives',
    description: 'Starch is a natural polymeric carbohydrate material widely employed in non-food industrial processing as a green binder, film former, and adhesive modifier across paper mills, packaging adhesives, textile sizing, and foundry core binders.',
    grades: ['Industrial Technical Grade', 'Modified & Native Starch'],
    meshSizes: ['Fine industrial powder'],
    chemicalFormula: '(C6H10O5)n',
    brightnessWhiteness: 'White to creamy powder',
    purity: 'Technical data available on request',
    oilAbsorption: 'Available on request',
    bulkDensity: '0.50 - 0.70 g/cm³',
    phValue: '5.5 - 7.5',
    moistureContent: 'Technical data available on request',
    keyProperties: [
      'Natural renewable polymeric binder and film former',
      'Excellent tensile adhesion in corrugating and paper pasting',
      'Uniform viscosity and thermal gelatinization control',
      'Green bio-based agglomeration agent for foundry and briquettes'
    ],
    applications: ['Paper & Corrugated Packaging', 'Textile Sizing', 'Industrial Adhesives', 'Foundry Core Binder', 'Agglomeration'],
    packagingOptions: ['25 Kg Bags', '50 Kg HDPE Bags'],
    minimumOrderQty: '1 Metric Ton',
    typicalPriceRange: 'Pricing available on request',
    chemicalAnalysis: [
      { component: 'Composition', value: 'Natural polymeric carbohydrate', testMethod: 'Standard Assay' }
    ],
    physicalProperties: [
      { property: 'Form', value: 'Fine powder', unit: '' }
    ]
  }
];

export interface IndustryApplication {
  id: string;
  name: string;
  badge: string;
  iconName: string;
  shortDesc: string;
  recommendedMinerals: string[];
  keyBenefits: string[];
}

export const INDUSTRIES_SERVED: IndustryApplication[] = [
  {
    id: 'cosmetics',
    name: 'Cosmetics & Personal Care',
    badge: 'USP / Asbestos-Free',
    iconName: 'Sparkles',
    shortDesc: 'Ultra-pure sterilized talc, zinc oxide, and light magnesium carbonate for baby powders, foundation, blush, and sunscreen.',
    recommendedMinerals: ['Talc Powder (Cosmetic USP)', 'Zinc Oxide White Seal', 'Magnesium Carbonate Light', 'China Clay Levigated'],
    keyBenefits: ['Asbestos-free & microbial certified', 'Silky skin-feel & extreme slip', 'High UV barrier and soothing benefits', 'No caking or clumping']
  },
  {
    id: 'plastics-polymers',
    name: 'Plastics, PVC & Masterbatches',
    badge: 'High Modulus & Gloss',
    iconName: 'Layers',
    shortDesc: 'Surface coated calcium carbonate, micro-talc, and calcite for PVC pipes, masterbatch fillers, HDPE blow molding, and engineering polymers.',
    recommendedMinerals: ['Calcium Carbonate (Coated GCC & PCC)', 'Micronized Calcite Powder', 'Industrial Micro-Talc (2µm)', 'Zinc Stearate'],
    keyBenefits: ['Significant cost reduction over prime polymer resin', 'Enhances impact strength & flexural modulus', 'Improves heat distortion temperature (HDT)', 'Rapid dispersion with zero screw wear']
  },
  {
    id: 'paints-coatings',
    name: 'Paints, Inks & Industrial Coatings',
    badge: 'TiO2 Extender & Opacity',
    iconName: 'Paintbrush',
    shortDesc: 'Functional extenders that replace expensive titanium dioxide, reduce cracking, and improve scrub resistance in emulsions, primers, and powder coatings.',
    recommendedMinerals: ['Calcined Kaolin / China Clay', 'Micronized Calcite 98%+', 'Barytes Powder (BaSO4)', 'Red Oxide Pigment', 'Superfine Micro-Dolomite'],
    keyBenefits: ['Reduces formulation cost by extending TiO2 up to 25%', 'Superior exterior weatherability and UV holdout', 'Controls gloss, sheen, and brush drag rheology', 'Anti-settling and anti-corrosive barrier protection']
  },
  {
    id: 'rubber-eva',
    name: 'Rubber, EVA Footwear & Conveyor Belts',
    badge: 'Active Reinforcement',
    iconName: 'Activity',
    shortDesc: 'Rubber grade china clay, active zinc oxide, French chalk anti-tack, and barytes for high abrasion soles, tires, auto hoses, and transmission belts.',
    recommendedMinerals: ['Zinc Oxide White Seal', 'China Clay Rubber Grade', 'French Chalk / Porbandar Chalk', 'Barytes Powder', 'Magnesium Carbonate'],
    keyBenefits: ['Accelerates vulcanization kinetics and cross-linking', 'Improves rebound resilience, tear strength and tensile', 'Effective anti-blocking parting agent during calendering', 'Enhances thermal dissipation in dynamic flex cycles']
  },
  {
    id: 'cables-wiring',
    name: 'Cables, Wires & Electrical Compounds',
    badge: 'High Dielectric Strength',
    iconName: 'Zap',
    shortDesc: 'Calcined kaolin, treated calcium carbonate, and French chalk dusting for PVC & XLPE power cable sheathing and insulation.',
    recommendedMinerals: ['Calcined Kaolin', 'Surface Treated Calcium Carbonate', 'French Chalk Dusting Grade', 'Talc Powder 500 Mesh'],
    keyBenefits: ['Increases volume resistivity and dielectric breakdown voltage', 'Smooth surface finish during high-speed extrusion', 'Prevents core-to-sheath sticking', 'Low water absorption ensures long submerged life']
  },
  {
    id: 'ceramics-sanitaryware',
    name: 'Ceramics, Tiles & Sanitaryware',
    badge: 'Vitrification & Whiteness',
    iconName: 'Boxes',
    shortDesc: 'Levigated kaolin, high-purity quartz silica powder, and dolomite for vitreous china bodies, wall tiles, and ceramic glazes.',
    recommendedMinerals: ['China Clay / Kaolin Levigated', 'Silica Powder / Quartz', 'Dolomite Powder', 'Marble Talc Powder'],
    keyBenefits: ['Optimal plasticity and green strength for slip casting', 'Uniform thermal expansion with zero crazing', 'High fired whiteness and fluxing efficiency', 'Reduces firing shrinkage defects']
  },
  {
    id: 'paper-packaging',
    name: 'Paper, Pulp & Corrugated Board',
    badge: 'High Opacity & Smoothness',
    iconName: 'FileText',
    shortDesc: 'PCC, micronized talc, and hydrous kaolin to enhance paper opacity, brightness, ink holdout, and pitch control in pulp mills.',
    recommendedMinerals: ['Precipitated Calcium Carbonate (PCC)', 'Industrial Talc 700 Mesh', 'Water-Washed Kaolin'],
    keyBenefits: ['Superb ink holdout and print fidelity', 'Higher sheet opacity allowing lighter grammage paper', 'Adsorbs wood pitch and sticky contaminants in pulp', 'Gentle on papermaking felts and doctor blades']
  },
  {
    id: 'water-effluent',
    name: 'Water Treatment, ETP & Chemicals',
    badge: 'Rapid pH Neutralization',
    iconName: 'Droplets',
    shortDesc: 'High available CaO quicklime and hydrated lime for municipal wastewater treatment, textile effluent neutralization, and flue gas desulfurization.',
    recommendedMinerals: ['Hydrated Lime Ca(OH)2 90%+', 'Quicklime Powder / Lumps', 'Precipitated Calcium Carbonate'],
    keyBenefits: ['Rapid flocculation and heavy metal precipitation', 'High alkalinity efficiency per metric ton', 'Low insolubles preventing pipe incrustation', 'Cost-effective compliant effluent discharge']
  },
  {
    id: 'fire-safety',
    name: 'Fire Safety',
    badge: 'Industrial Formulations',
    iconName: 'ShieldCheck',
    shortDesc: 'Explore Calcium Carbonate, Talc and Hydrated Lime for potential fire-safety-related industrial applications. Contact Deepali Minerals to discuss material suitability and technical requirements.',
    recommendedMinerals: ['Calcium Carbonate', 'Talc Powder', 'Hydrated Lime'],
    keyBenefits: [
      'Mineral extenders for industrial fire-safety formulations',
      'High chemical purity and controlled fineness gradations',
      'Formulation-specific testing and batch certificate of analysis',
      'Direct technical consultation for compound compatibility'
    ]
  },
  {
    id: 'gym-powder',
    name: 'Gym Powder',
    badge: 'Moisture Absorption',
    iconName: 'Activity',
    shortDesc: 'Explore Magnesium Carbonate for gym chalk and sports-grip powder applications. Contact Deepali Minerals to discuss grade, technical specifications and supply requirements.',
    recommendedMinerals: ['Magnesium Carbonate Light'],
    keyBenefits: [
      'Basic Magnesium Carbonate with high moisture absorbency',
      'Ultra-low bulk density for superior volume feel',
      'Industrial grade supply with custom packaging options',
      'Suitability and grade confirmed with commercial desk'
    ]
  },
  {
    id: 'fibre-murti',
    name: 'Fibre Murti Industry',
    badge: 'Moulding & Statues',
    iconName: 'Boxes',
    shortDesc: 'Mineral fillers and powders for fibre idols, statues and decorative figures in resin formulations and surface finishing.',
    recommendedMinerals: ['Calcium Carbonate', 'Talc Powder', 'Marble Powder', 'Silica'],
    keyBenefits: [
      'Mineral fillers in compatible resin formulations',
      'Surface finishing and decorative manufacturing',
      'Material sourcing for fibre idol and statue manufacturers',
      'Technical material selection based on formulation requirements'
    ]
  },
  {
    id: 'plywood',
    name: 'Plywood Industry',
    badge: 'Adhesives & Panels',
    iconName: 'Layers',
    shortDesc: 'Mineral fillers and extenders for plywood bonding systems, resin adhesives, and wood-panel surface-treatment formulations.',
    recommendedMinerals: ['Calcium Carbonate', 'Talc Powder', 'China Clay', 'Silica'],
    keyBenefits: [
      'Mineral fillers for compatible adhesive formulations',
      'Materials for relevant coating and surface-treatment formulations',
      'Industrial material sourcing for plywood manufacturers',
      'Technical enquiry for application-specific grades'
    ]
  },
  {
    id: 'gulal-rangoli',
    name: 'Gulal / Rangoli Industry',
    badge: 'Colour & Texture',
    iconName: 'Sparkles',
    shortDesc: 'Mineral powders for dry colours, rangoli powders and decorative colour products as base carriers and bulk fillers.',
    recommendedMinerals: ['Calcium Carbonate', 'Talc Powder', 'Chalk Powder', 'Marble Powder'],
    keyBenefits: [
      'Base powders and carriers for dry colour formulations',
      'Bulk mineral fillers for decorative rangoli products',
      'Fine powders for flow and texture in decorative blends',
      'Suitability for finished consumer products must be independently confirmed'
    ]
  },
  {
    id: 'nc-putty',
    name: 'NC Putty Industry',
    badge: 'Knifing & Body Putty',
    iconName: 'Paintbrush',
    shortDesc: 'Fine mineral extenders and fillers for nitrocellulose and knifing putty formulations supporting body, sandability, and smooth surface.',
    recommendedMinerals: ['Talc Powder', 'Calcium Carbonate', 'China Clay', 'Marble Powder'],
    keyBenefits: [
      'Mineral extenders for compatible body and knifing putty formulations',
      'Fine-particle materials to support surface smoothness and sandability',
      'Fillers for automotive and industrial repair putty systems',
      'Sourcing for paint and putty manufacturers'
    ]
  },
  {
    id: 'stationery',
    name: 'Stationery Industry',
    badge: 'Paper, Chalk & School Supplies',
    iconName: 'FileText',
    shortDesc: 'Mineral materials for writing paper, writing chalk, crayons, modelling clays, pencils and office stationery manufacturing.',
    recommendedMinerals: ['Calcium Carbonate', 'Talc Powder', 'China Clay', 'Chalk Powder', 'Starch'],
    keyBenefits: [
      'Fillers and coating minerals for paper and board manufacturing',
      'Raw materials for chalk, crayon and modelling clay formulations',
      'Inert powders for pencil lead and body formulations',
      'Industrial mineral sourcing for stationery manufacturers'
    ]
  },
  {
    id: 'cattle-feed',
    name: 'Cattle Feed Industry',
    badge: 'Application Enquiry',
    iconName: 'ShieldCheck',
    shortDesc: 'Enquire about Calcium Carbonate for animal feed and cattle feed applications. Grade availability, purity, and suitability must be confirmed with Deepali Minerals.',
    recommendedMinerals: ['Calcium Carbonate'],
    keyBenefits: [
      'Application enquiry pathway for animal feed compounders',
      'Technical discussions on grade availability, purity and specifications',
      'Particle size distribution and calcium content evaluation',
      'Feed-grade suitability and compliance must be confirmed directly prior to supply'
    ]
  },
  {
    id: 'tile-adhesives',
    name: 'Tile Adhesives Industry',
    badge: 'Mortars & Grouts',
    iconName: 'Layers',
    shortDesc: 'Mineral fillers and aggregates for cementitious tile adhesives (CTA), polymer-modified mortars, joint grouts, and sag-resistant fillers.',
    recommendedMinerals: ['Calcium Carbonate', 'Silica', 'Talc Powder', 'Hydrated Lime'],
    keyBenefits: [
      'Controlled-gradation fillers for cementitious tile adhesives (CTA)',
      'Mineral components for polymer-modified mortar and grout formulations',
      'Silica aggregates for mechanical keying and bond strength',
      'Rheology-supporting mineral powders for sag resistance and open time'
    ]
  },
  {
    id: 'home-household',
    name: 'Home / Household',
    badge: 'Sheet A • Cleaners & Polishes',
    iconName: 'Sparkles',
    shortDesc: 'Functional mineral fillers and mild abrasives for scouring powders, household cleaners, and polishes.',
    recommendedMinerals: ['Talc Powder', 'Calcium Carbonate', 'Silica Powder / Quartz', 'Hydrated Lime Ca(OH)2 90%+'],
    keyBenefits: [
      'Mild controlled abrasiveness without surface scratching',
      'Moisture regulation and anti-caking properties in storage',
      'High brightness and chemically inert carrier base',
      'Cost-effective formulation extender for household cleaners'
    ]
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    badge: 'Sheet B • Carriers & Dusting',
    iconName: 'Boxes',
    shortDesc: 'Inert mineral carriers, anti-caking conditioners, and dusting agents for agrochemical formulations, fertilizer coatings, and seed dressing.',
    recommendedMinerals: ['Talc Powder', 'Soap Stone', 'Kaolin / China Clay', 'Calcium Carbonate', 'Zinc Oxide White Seal'],
    keyBenefits: [
      'High chemical inertness preserving active ingredient stability',
      'Superior dry flowability and anti-caking in storage',
      'Controlled particle size distribution for dusting efficiency',
      'Micro-nutrient carrier support (Zinc Oxide)'
    ]
  },
  {
    id: 'plastic',
    name: 'Plastic Compounding',
    badge: 'Sheet C • Polymer Reinforcement',
    iconName: 'Layers',
    shortDesc: 'Reinforcing mineral fillers, nucleating agents, and processing lubricants for masterbatches, compounding, and extruded profiles.',
    recommendedMinerals: ['Talc Powder', 'Soap Stone', 'Calcium Carbonate', 'Zinc Stearate'],
    keyBenefits: [
      'Enhances flexural modulus, rigidity, and tensile strength',
      'Improves heat deflection temperature (HDT) and cycle times',
      'Zinc Stearate acts as internal lubricant and mould release',
      'Consistent fine gradation minimizing extruder barrel wear'
    ]
  },
  {
    id: 'putty',
    name: 'Putty Formulations',
    badge: 'Sheet D • Body & Workability',
    iconName: 'Paintbrush',
    shortDesc: 'Mineral fillers and extenders for architectural wall putties, wood fillers, and glazing compounds.',
    recommendedMinerals: ['French Chalk / Porbandar Chalk', 'Talc Powder', 'Soap Stone', 'Calcium Carbonate', 'Silica Powder / Quartz'],
    keyBenefits: [
      'Smooth knife application and superior trowel workability',
      'Excellent feather-edging and non-sag consistency',
      'Balanced particle size packing reducing shrinkage cracks',
      'French Chalk imparts silky smooth finishing texture'
    ]
  },
  {
    id: 'soap',
    name: 'Soap & Toiletries',
    badge: 'Sheet E • Binding & Texture',
    iconName: 'Sparkles',
    shortDesc: 'Smooth mineral fillers and structuring agents for laundry bars, toilet soaps, and detergent cakes.',
    recommendedMinerals: ['Talc Powder', 'Soap Stone', 'Kaolin / China Clay', 'Titanium Di Oxide'],
    keyBenefits: [
      'Improves bar hardness and reduces mushing in water',
      'Gives creamy lather feel and smooth skin slip',
      'Titanium Dioxide provides brilliant opacity and whiteness',
      'Cost optimization without compromising cake integrity'
    ]
  },
  {
    id: 'footwear',
    name: 'Footwear & Soling',
    badge: 'Sheet F • Elastomer Fillers',
    iconName: 'Activity',
    shortDesc: 'Reinforcing fillers, activating agents, and release powders for microcellular EVA sheets, hawai chappals, and rubber soles.',
    recommendedMinerals: ['Calcium Carbonate', 'Talc Powder', 'Zinc Stearate', 'Chalk Powder', 'Kaolin / China Clay', 'Zinc Oxide White Seal'],
    keyBenefits: [
      'Active vulcanization activation via Zinc Oxide',
      'Internal lubrication and mold release via Zinc Stearate',
      'Improves abrasion resistance and hardness control',
      'French chalk and talc prevent unvulcanized rubber tackiness'
    ]
  },
  {
    id: 'pesticides',
    name: 'Pesticides & Agrochemicals',
    badge: 'Sheet G • Wettable Powders',
    iconName: 'ShieldCheck',
    shortDesc: 'Inert diluents, suspension carriers, and free-flowing mineral bases for wettable powders (WP) and dustable formulations (DP). Note: Calcite is an uncatalogued candidate raw material.',
    recommendedMinerals: ['Kaolin / China Clay', 'Talc Powder', 'Soap Stone', 'Hydrated Lime Ca(OH)2 90%+'],
    keyBenefits: [
      'High liquid carrier capacity and wettability',
      'Chemically neutral avoiding active chemical degradation',
      'Consistent fine suspension in water sprayers',
      'Free flowability prevents hopper bridging during packing'
    ]
  },
  {
    id: 'detergent',
    name: 'Detergent & Washing Powders',
    badge: 'Sheet H • Flow & Abrasive Balance',
    iconName: 'Droplets',
    shortDesc: 'Bulk builders, anti-caking minerals, and controlled abrasives for washing powders, scouring bars, and detergent cakes.',
    recommendedMinerals: ['Marble Powder', 'Talc Powder', 'Soap Stone', 'Kaolin / China Clay'],
    keyBenefits: [
      'Enhances density and physical volume of washing powders',
      'Controlled mechanical scrubbing action in scourers',
      'Improves dry cake hardness and structural integrity',
      'Free-flowing particle morphology prevents clumping'
    ]
  },
  {
    id: 'construction',
    name: 'Construction & Mortars',
    badge: 'Sheet I • Building Materials',
    iconName: 'Boxes',
    shortDesc: 'Mineral aggregates, binders, and lime mortars for plastering, masonry, flooring, and readymix formulations.',
    recommendedMinerals: ['Marble Powder', 'Hydrated Lime Ca(OH)2 90%+', 'Silica Powder / Quartz'],
    keyBenefits: [
      'Hydrated Lime provides superior plasticity and bond strength',
      'Marble powder provides brilliant white plaster finish',
      'Graded silica provides mechanical compression strength',
      'Weather-resistant and carbonation hardening'
    ]
  },
  {
    id: 'eva',
    name: 'EVA Foaming & Sheet',
    badge: 'Sheet J • Cellular Foam',
    iconName: 'Layers',
    shortDesc: 'Mineral fillers, cell activators, and pigments for expanded EVA foam sheets, sports goods, and footwear.',
    recommendedMinerals: ['Calcium Carbonate', 'Talc Powder', 'Titanium Di Oxide', 'Zinc Oxide White Seal'],
    keyBenefits: [
      'Zinc Oxide acts as blowing agent booster & activator',
      'Calcium carbonate controls uniform microcellular cell size',
      'Improves tear resistance and rebound resilience',
      'Titanium dioxide imparts crisp white opacity to foam'
    ]
  },
  {
    id: 'biofertilizers',
    name: 'Biofertilizers',
    badge: 'Sheet K • Microbial Carriers',
    iconName: 'ShieldCheck',
    shortDesc: 'Neutral, sterile mineral carrier matrices for beneficial soil bacteria (Rhizobium, Azotobacter, PSB). Note: Celite is an uncatalogued candidate raw material.',
    recommendedMinerals: ['Talc Powder', 'Soap Stone', 'Kaolin / China Clay', 'Silica Powder / Quartz', 'Calcium Carbonate'],
    keyBenefits: [
      'Non-toxic, chemically inert carrier matrix',
      'High moisture-holding capacity for bacterial survival',
      'Optimal pH buffer (6.5 - 7.5) ensuring microbial shelf life',
      'Smooth dusting and uniform seed adherence during sowing'
    ]
  },
  {
    id: 'rigid-pvc',
    name: 'Rigid PVC Pipes & Profiles',
    badge: 'Sheet M • High Impact & Gloss',
    iconName: 'Zap',
    shortDesc: 'Surface-treated ultrafine calcium carbonate, stabilizers, and functional additives for PVC pressure pipes, conduits, and profiles.',
    recommendedMinerals: ['Calcium Carbonate', 'Talc Powder', 'Soap Stone', 'Kaolin / China Clay', 'Zinc Stearate', 'Zinc Oxide White Seal', 'Titanium Di Oxide'],
    keyBenefits: [
      'Enhances pipe impact strength and elongation at break',
      'Zinc Stearate provides external/internal lubrication balance',
      'Titanium Dioxide protects against exterior UV photodegradation',
      'Decreases formulation cost without compromising burst pressure'
    ]
  },
  {
    id: 'wall-putty',
    name: 'Wall Putty',
    badge: 'Sheet N • Skim Coat & Levelling',
    iconName: 'Paintbrush',
    shortDesc: 'Mineral powders for polymer-modified white cement wall putties, skim coats, and exterior smoothing compounds.',
    recommendedMinerals: ['Marble Powder', 'Talc Powder', 'Dolomite Powder'],
    keyBenefits: [
      'Brilliant optical whiteness (Hunter L > 95%)',
      'Dolomite & Marble powder provide dense particle packing',
      'Talc imparts buttery smooth knifing and feather-edging',
      'Reduces water demand and shrinkage cracking'
    ]
  },
  {
    id: 'ceramics-sheet',
    name: 'Ceramics (Sheet O)',
    badge: 'Sheet O • Vitrification & Glazes',
    iconName: 'Boxes',
    shortDesc: 'Levigated kaolin, high-purity quartz silica powder, talc, and dolomite for vitreous china bodies, wall tiles, and ceramic glazes.',
    recommendedMinerals: ['Talc Powder', 'Soap Stone', 'Kaolin / China Clay', 'Silica Powder / Quartz'],
    keyBenefits: [
      'Optimal plasticity and green strength for slip casting',
      'Uniform thermal expansion with zero crazing in glazes',
      'High fired whiteness and fluxing efficiency',
      'Reduces firing shrinkage and warping defects'
    ]
  },
  {
    id: 'colors',
    name: 'Colors & Pigment Blends',
    badge: 'Sheet P • Dry Powder Pigments',
    iconName: 'Sparkles',
    shortDesc: 'Ultra-white inert carrier bases, extenders, and brightness enhancers for dry pigments, masterbatches, and pigment pastes. Note: Unclear entry is candidate under verification.',
    recommendedMinerals: ['Chalk Powder', 'Kaolin / China Clay', 'Soap Stone', 'Talc Powder', 'Calcium Carbonate', 'Silica Powder / Quartz', 'Zinc Oxide White Seal'],
    keyBenefits: [
      'High whiteness and low tinting strength preserve pigment hue',
      'Superfine particle size ensures streak-free dispersion',
      'Zinc Oxide adds brilliance and anti-fungal properties',
      'Consistent oil absorption for uniform paste rheology'
    ]
  },
  {
    id: 'mould-release',
    name: 'Mould Release Agents',
    badge: 'Sheet Q • Parting Compounds',
    iconName: 'Layers',
    shortDesc: 'Dry dusting powders and lubricating anti-tack minerals for rubber moulding, plastic die release, and metal casting.',
    recommendedMinerals: ['Talc Powder', 'Soap Stone', 'Calcium Carbonate', 'Zinc Oxide White Seal', 'Zinc Stearate', 'Titanium Di Oxide'],
    keyBenefits: [
      'Extreme lamellar slip prevents sticking in hot dies',
      'Zinc Stearate melts to form a hydrophobic parting film',
      'High thermal stability up to 900°C without charring',
      'Non-staining and easily cleaned from moulded parts'
    ]
  },
  {
    id: 'anti-corrosive-primer',
    name: 'Anti-Corrosive Primers',
    badge: 'Sheet R • Metal Protection',
    iconName: 'ShieldCheck',
    shortDesc: 'Barrier pigments, neutralizing bases, and reinforcing extenders for metal primers, alkyd paints, and industrial maintenance coatings.',
    recommendedMinerals: ['Red Oxide Pigment', 'Talc Powder', 'Calcium Carbonate', 'Hydrated Lime Ca(OH)2 90%+'],
    keyBenefits: [
      'Natural red iron oxide provides impermeable barrier protection',
      'Lamellar talc creates overlapping tortuous moisture paths',
      'Hydrated lime acts as alkaline corrosion inhibitor',
      'Enhances primer adhesion to bare steel surfaces'
    ]
  },
  {
    id: 'foundry',
    name: 'Foundry & Metal Casting',
    badge: 'Sheet S • Refractory & Moulding',
    iconName: 'Boxes',
    shortDesc: 'Refractory dusting powders, parting agents, and core wash minerals for sand casting, ferrous foundries, and non-ferrous moulding. Note: Celite is an uncatalogued candidate raw material.',
    recommendedMinerals: ['Talc Powder', 'Soap Stone', 'Dolomite Powder', 'Marble Powder', 'Hydrated Lime Ca(OH)2 90%+', 'Silica Powder / Quartz'],
    keyBenefits: [
      'High refractoriness preventing metal penetration into sand',
      'Talc parting powder ensures clean separation from pattern',
      'Controlled gas permeability in foundry core washes',
      'Thermal shock resistance during liquid metal pouring'
    ]
  },
  {
    id: 'frp',
    name: 'FRP & Composite Moulding',
    badge: 'Sheet T • Composite Resins',
    iconName: 'Layers',
    shortDesc: 'Polyester resins, reinforcing marble chips, and fine mineral extenders for fiberglass reinforced plastics, SMC/BMC moulding, and pultrusion.',
    recommendedMinerals: ['Hydrated Lime Ca(OH)2 90%+', 'Polyester Resin', 'Talc Powder', 'French Chalk / Porbandar Chalk', 'Marble Chips', 'Marble Powder', 'Calcium Carbonate'],
    keyBenefits: [
      'Supplies prime orthophthalic and isophthalic Polyester Resin',
      'Fine extenders reduce exotherm peak and shrinkage during cure',
      'Marble chips provide structural body in composite casting',
      'Improves surface smoothness, flame retardancy, and rigidity'
    ]
  },
  {
    id: 'paints-sheet',
    name: 'Paints & Coatings (Sheet U)',
    badge: 'Sheet U • Architectural & Industrial',
    iconName: 'Paintbrush',
    shortDesc: 'Complete 13-mineral suite of functional extenders, prime pigments, and rheology modifiers for decorative emulsions, primers, and industrial coatings.',
    recommendedMinerals: ['Talc Powder', 'Calcium Carbonate', 'Silica Powder / Quartz', 'Red Oxide Pigment', 'Chalk Powder', 'Kaolin / China Clay', 'Hydrated Lime Ca(OH)2 90%+', 'Zinc Oxide White Seal', 'Marble Powder', 'Dolomite Powder', 'Titanium Di Oxide', 'Barytes Powder (BaSO4)'],
    keyBenefits: [
      'Comprehensive TiO2 spacing reducing formulation costs by up to 25%',
      'Barytes adds high density, chemical resistance, and scrub resistance',
      'Lamellar talc and kaolin improve film durability and sag resistance',
      'Controlled gloss, sheen, and exterior weatherability'
    ]
  },
  {
    id: 'dal-polish-mills',
    name: 'Dal Polish Mills',
    badge: 'Sheet V • Grain Polishing',
    iconName: 'Sparkles',
    shortDesc: 'Specialized ultra-fine, food-processing contact parting and polishing powders for pulse mills, dal grading, and grain gloss enhancement.',
    recommendedMinerals: ['Talc Powder', 'Soap Stone', 'French Chalk / Porbandar Chalk'],
    keyBenefits: [
      'Food-contact grade cosmetic/pharma quality purity',
      'Imparts natural gloss and lustre to processed pulses and grains',
      'Prevents pulse-to-pulse friction damage and surface abrasions',
      'Smooth, free-flowing, completely odorless and non-toxic'
    ]
  }
];

export const COMPANY_DETAILS = {
  name: 'DEEPALI MINERALS',
  legalName: 'DEEPALI MINERALS (Proprietorship)',
  ceo: 'Mr. Neeraj Monga (CEO)',
  establishedYear: 2004,
  experienceYears: '20+ Years',
  annualProcessingCapacity: '50,000+ Metric Tons',
  registeredAddress: 'C2/29C Lawrence Road, Keshav Puram, Delhi-110035',
  worksAddress: 'Unit I: C2/29C Lawrence Road, Keshav Puram, Delhi-110035 | Unit II: Alwar Industrial Cluster, Rajasthan | Unit III: Kutch Mining Corridor, Gujarat',
  phonePrimary: '9810516065',
  phoneSecondary: '9810715129',
  phoneOffice: '9810715129',
  emailSales: 'info@deepaliminerals.in',
  emailInquiry: 'info@deepaliminerals.in',
  logo: '/assets/images/brand/logo.png',
  whatsappNumber: '+919810516065',
  gstNumber: '07AIMPM0458Q1ZL',
  turnoverRange: '₹5 Crore - ₹25 Crore INR',
  reputableClients: [
    { name: 'Vi-John Cosmetics', industry: 'Cosmetics & Personal Care' },
    { name: 'Aryan Veda Cosmetics', industry: 'Ayurvedic & Cosmeceuticals' },
    { name: 'Prestige Cable Industries', industry: 'Wires & Power Cables' },
    { name: 'Asian Granito Tiles', industry: 'Ceramics & Building Material' },
    { name: 'Supreme Polymer Compounds', industry: 'Plastic Masterbatches' }
  ],
  certifications: [
    { title: 'ISO 9001:2015', desc: 'Quality Management Certified Processing' },
    { title: 'Asbestos-Free Certified', desc: 'Rigorous X-Ray Diffraction & Polarized Light Microscopy' },
    { title: 'RoHS & REACH Compliant', desc: 'Heavy metal free minerals for international exports' },
    { title: 'In-House Testing Laboratory', desc: 'Whiteness spectrophotometers & Sedigraph grain analyzers' }
  ]
};
