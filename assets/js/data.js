/**
 * Deepali Minerals B2B Portal - Centralized Product & Master Data Store
 * Phase 3: Product Catalogue + Technical Material Library + B2B Buyer Experience
 * Strict Technical Governance: Information not verified is marked "Available on request" or "Technical data available on request."
 */

(function () {
  'use strict';

  const company = {
    name: 'DEEPALI MINERALS',
    legalName: 'DEEPALI MINERALS',
    constitution: 'Proprietorship',
    ceo: 'Mr. Neeraj Monga (CEO)',
    tagline: 'Industrial materials, clearly connected.',
    establishedYear: 2004,
    headquarters: 'C2/29C Lawrence Road, Keshav Puram, Delhi-110035',
    phonePrimary: '9810516065',
    phoneSecondary: '9810715129',
    phoneOffice: '9810715129',
    whatsappNumber: '+919810516065',
    emailSales: 'info@deepaliminerals.in',
    emailInquiry: 'info@deepaliminerals.in',
    logo: '/assets/images/brand/logo.png',
    gstNumber: '07AIMPM0458Q1ZL',
    businessHours: 'Monday – Saturday: 9:00 AM – 7:30 PM IST',
    targetDomain: 'https://deepaliminerals.in'
  };

  const categories = [
    { id: 'industrial-minerals', name: 'Industrial Minerals', description: 'Complete 22-material portfolio of verified industrial minerals and functional compounds.' },
    { id: 'mineral-powders', name: 'Mineral Powders', description: 'Pulverized & micronized non-metallic mineral powders (Talc, Calcite, Clays, Barytes, etc.).' },
    { id: 'functional-chemicals', name: 'Functional Chemicals', description: 'Mineral compounding additives, activators, and inorganic chemical pigments.' },
    { id: 'grains-aggregates', name: 'Grains & Aggregates', description: 'Granular silica, quartz sand, and marble chips for construction and foundry.' }
  ];

  const industries = [
    'Home / Household Applications',
    'Agriculture',
    'Plastic',
    'Putty',
    'Soap',
    'Footwear',
    'Pesticides',
    'Detergent',
    'Construction',
    'EVA',
    'Biofertilizers',
    'Cattle Feed',
    'Rigid PVC',
    'Wall Putty',
    'Ceramics',
    'Colors',
    'Mould Release',
    'Anti-Corrosive Primer',
    'Foundry',
    'FRP',
    'Paints',
    'Dal Polish Mills',
    'Fire Safety',
    'Gym Powder',
    'Fibre Murti',
    'Tile Adhesives',
    'Plywood',
    'Gulal / Rangoli',
    'NC Putty',
    'Stationery',
    'Cosmetics',
    'Pharmaceutical',
    'Ayurvedic Medicines',
    'Cables',
    'Rubber',
    'Paper',
    'Master Batch',
    'Automobile Paints'
  ];

  const products = [
    {
      id: 'talc',
      slug: 'talc',
      name: 'Talc',
      image: '/assets/images/products/talc-powder.webp',
      alt: 'Deepali Minerals Talc Powder and Natural Mineral Rocks Display',
      gallery: [
        {
          src: '/assets/images/products/talc-powder.webp',
          alt: 'Talc Powder and Natural Mineral Rocks'
        },
        {
          src: '/assets/images/products/talc-powder-alt.webp',
          alt: 'Micronized Talc Mineral Powder in Inspection Dish'
        }
      ],
      category: 'Mineral Powders',
      status: 'source-catalogue',
      shortDescription: 'Natural hydrated magnesium silicate with platey lamellar crystal morphology, high slip, and chemical inertness.',
      description: 'Hydrated magnesium silicate powder processed for industrial fillers, plastic compounding, paints, and cosmetic grades. Sourced and processed at our Lawrence Road, Delhi facility with controlled particle classification.',
      applications: [
        'Cosmetic face powders, body powders, blushes and calamine lotions',
        'Polypropylene (PP), PE and polymer masterbatch compounding',
        'Industrial anti-corrosive primers and architectural finishes',
        'Rubber goods and EVA sheet dusting parting agent',
        'Ceramic vitreous body and wall tile glazes',
        'Fire Safety & fire-safety-related industrial compounding (suitability subject to technical verification)'
      ],
      industries: [
        'Cosmetics', 'Plastic', 'Master Batch', 'Paints', 'Rubber', 'Paper', 'Ceramics', 'Soap',
        'Fibre Murti Industry', 'Plywood Industry', 'Gulal / Rangoli Industry',
        'NC Putty Industry', 'Stationery Industry', 'Tile Adhesives Industry'
      ],
      specifications: {
        grade: 'Cosmetic USP & Industrial Micro grades',
        purity: 'Technical data available on request.',
        mesh: '300 to 1250 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'High whiteness grades available',
        moisture: 'Technical data available on request.',
        bulkDensity: 'Available on request',
        asbestosStatus: 'Negative / Asbestos-Free tested for cosmetic batches'
      },
      packaging: ['25 Kg Bags', '50 Kg PP Bags', '1 MT Jumbo Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['soap-stone', 'chalk-powder', 'calcium-carbonate'],
      composition: "Primary composition: Hydrated Magnesium Silicate (Mg₃Si₄O₁₀(OH)₂)",
      synonyms: ["talc", "talcum", "steatite", "talc powder"],
      enquiryEnabled: true
    },
    {
      id: 'soap-stone',
      slug: 'soap-stone',
      name: 'Soap Stone',
      image: '/assets/images/products/soap-stone-powder.webp',
      alt: 'Soap Stone - Deepali Minerals Industrial Supply',
      category: 'Mineral Powders',
      status: 'source-catalogue',
      shortDescription: 'Steatite talcose mineral powder valued for softness, thermal stability, and electrical insulation properties.',
      description: 'Soapstone / Steatite mineral powder processed for industrial applications requiring high lubricity, thermal endurance, and anti-adhesion characteristics.',
      applications: [
        'Cable sheathing lubricant and parting agent',
        'Foundry refractory mold wash and casting release dusting',
        'Ceramic insulators, spark plug bodies, and porcelain fixtures',
        'Functional filler for domestic cleaners and paints'
      ],
      industries: ['Rubber', 'Foundary', 'Ceramics', 'Paints', 'Cables'],
      specifications: {
        grade: 'Commercial Soapstone Powder',
        purity: 'Technical data available on request.',
        mesh: '200 to 500 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'Available on request',
        moisture: 'Available on request',
        bulkDensity: 'Available on request'
      },
      packaging: ['50 Kg PP Bags', '1 MT Jumbo Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['talc', 'chalk-powder', 'marble-powder'],
      composition: "Primary composition: Steatite / Hydrated Magnesium Silicate (Mg₃Si₄O₁₀(OH)₂)",
      synonyms: ["soapstone", "soap stone", "steatite"],
      enquiryEnabled: true
    },
    {
      id: 'chalk-powder',
      slug: 'chalk-powder',
      name: 'Chalk Powder',
      image: '/assets/images/products/chalk-powder.webp',
      alt: 'Deepali Minerals White Chalk Powder and Mineral Rocks Display',
      gallery: [
        {
          src: '/assets/images/products/chalk-powder.webp',
          alt: 'White Chalk Powder with Raw Natural Mineral Chunks'
        },
        {
          src: '/assets/images/products/chalk-powder-alt.webp',
          alt: 'Refined Chalk Powder Laboratory Still Life'
        }
      ],
      category: 'Mineral Powders',
      status: 'source-catalogue',
      shortDescription: 'Fine soft natural chalk powder used as an anti-tack dusting agent and cost-effective functional extender.',
      description: 'Naturally occurring soft chalk mineral processed into fine particle gradations to prevent tackiness during vulcanization and storage in rubber and polymer processing.',
      applications: [
        'Rubber sheets, tire inner tubes, and molded goods dusting',
        'Power cable cores and wiring parting agent',
        'Extender for primer paints and domestic whitening powders',
        'Filler for school writing chalk and craft materials'
      ],
      industries: ['Rubber', 'Footwear', 'Cables', 'Paints', 'Plastic', 'Gulal / Rangoli Industry', 'Stationery Industry'],
      specifications: {
        grade: 'French Chalk & Whitening Chalk grades',
        purity: 'Technical data available on request.',
        mesh: '300 to 500 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'Available on request',
        moisture: 'Available on request',
        bulkDensity: 'Available on request'
      },
      packaging: ['25 Kg Bags', '50 Kg PP Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['calcium-carbonate', 'talc', 'marble-powder'],
      composition: "Primary composition: Calcium Carbonate (CaCO₃)",
      synonyms: ["chalk", "chalk powder", "natural chalk"],
      enquiryEnabled: true
    },
    {
      id: 'hydrated-lime',
      slug: 'hydrated-lime',
      name: 'Hydrated Lime',
      image: '/assets/images/products/hydrated-lime-powder.webp',
      alt: 'Hydrated Lime - Deepali Minerals Industrial Supply',
      category: 'Functional Chemicals',
      status: 'source-catalogue',
      shortDescription: 'High available calcium hydroxide Ca(OH)2 powder for chemical synthesis, effluent treatment (ETP), and construction.',
      description: 'Refined calcium hydroxide slaked from high-grade quicklime, offering high chemical reactivity, rapid slaking rate, and alkaline buffering capacity.',
      applications: [
        'Industrial effluent treatment (ETP) and wastewater neutralization',
        'Chemical synthesis, calcium stearate, and calcium soap manufacture',
        'Sugar juice clarification and metallurgical fluxing',
        'Mortars, plasters, and road subgrade stabilization',
        'Agricultural soil amendment and biofertilizer enrichment',
        'Fire Safety & fire-safety-related industrial applications (suitability subject to technical verification)'
      ],
      industries: ['Construction', 'Paper', 'Detergent', 'Biofertilizers', 'Paints', 'Tile Adhesives Industry'],
      specifications: {
        grade: 'Chemical & Water Treatment Grade',
        purity: 'Available Ca(OH)2 > 90% (Available on request)',
        mesh: '200 to 400 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'Available on request',
        moisture: '< 1.5% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['25 Kg Moisture-Resistant Bags', '50 Kg HDPE Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['calcium-carbonate', 'dolomite-powder'],
      composition: "Primary composition: Calcium Hydroxide (Ca(OH)₂)",
      synonyms: ["hydrated lime", "slaked lime", "calcium hydroxide", "caoh2"],
      enquiryEnabled: true
    },
    {
      id: 'china-clay',
      slug: 'china-clay',
      name: 'China Clay',
      image: '/assets/images/products/china-clay-powder.webp',
      alt: 'China Clay - Deepali Minerals Industrial Supply',
      category: 'Mineral Powders',
      status: 'source-catalogue',
      shortDescription: 'Hydrous aluminum silicate kaolin refined through systematic levigation for ceramic casting, paper, and coatings.',
      description: 'Systematically levigated kaolin clay characterized by fine particle size, high plasticity, chemical inertness, and good dielectric insulation properties.',
      applications: [
        'Sanitaryware, tableware, and ceramic casting slips',
        'Emulsion paints, primers, and protective wall finishes',
        'Reinforcing filler for power cable insulation (XLPE/PVC)',
        'Paper coating and loading filler for sheet opacity',
        'FRP resin composite filler'
      ],
      industries: ['Ceramics', 'Paints', 'Rubber', 'Paper', 'Cables', 'FRP', 'Plywood Industry', 'NC Putty Industry', 'Stationery Industry'],
      specifications: {
        grade: 'Levigated & Industrial Grade',
        purity: 'Technical data available on request.',
        mesh: '300 to 500 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'Available on request',
        moisture: 'Technical data available on request.',
        bulkDensity: 'Available on request'
      },
      packaging: ['25 Kg Bags', '50 Kg PP Bags', '1 MT Jumbo Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['kaoline', 'silica', 'talc'],
      composition: "Primary composition: Hydrated Aluminum Silicate (Kaolinite: Al₂Si₂O₅(OH)₄)",
      synonyms: ["china clay", "kaolin", "white clay"],
      enquiryEnabled: true
    },
    {
      id: 'kaoline',
      slug: 'kaoline',
      name: 'Kaoline',
      image: '/assets/images/products/kaoline-clay-powder.webp',
      alt: 'Kaoline - Deepali Minerals Industrial Supply',
      category: 'Mineral Powders',
      status: 'source-catalogue',
      shortDescription: 'High-brightness calcined and pharmaceutical kaolin clay refined for opacity, purity, and low abrasion index.',
      description: 'Calcined and micronized kaolin clay processed for strict brightness requirements, titanium dioxide extension in paints, and pharmaceutical formulations.',
      applications: [
        'Pharmaceutical suspensions and excipient carrier',
        'Cosmetic face masks, calamine lotions, and skin protectants',
        'Calcined coating pigment for high-opacity architectural paints',
        'Porcelain bodies, glazes, and refractory ceramics'
      ],
      industries: ['Pharmaceutical', 'Cosmetics', 'Paints', 'Ceramics', 'Paper'],
      specifications: {
        grade: 'Calcined & Pharma/Cosmetic Grade',
        purity: 'Technical data available on request.',
        mesh: '400 to 500 Mesh',
        micron: 'Micro-fine gradations',
        particleSize: 'Available on request',
        whiteness: 'High whiteness grades available',
        moisture: '< 0.5% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['25 Kg Bags', '50 Kg Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['china-clay', 'talc', 'magnesium-carbonate'],
      composition: "Primary composition: Hydrated Aluminum Silicate (Kaolinite: Al₂Si₂O₅(OH)₄)",
      synonyms: ["kaoline", "calcined kaolin", "pharmaceutical kaolin"],
      enquiryEnabled: true
    },
    {
      id: 'marble-powder',
      slug: 'marble-powder',
      name: 'Marble Powder',
      image: '/assets/images/products/marble-powder.webp',
      alt: 'Marble Powder - Deepali Minerals Industrial Supply',
      category: 'Mineral Powders',
      status: 'source-catalogue',
      shortDescription: 'Crushed high-whiteness marble mineral powder for wall putty, cultured marble, and decorative cement flooring.',
      description: 'Pure crystalline calcium carbonate derived from selected high-whiteness marble stone, offering high density, weather resistance, and brilliant natural whiteness.',
      applications: [
        'Cement wall putty, skim coats, and exterior texture finishes',
        'Cultured marble casting, vanity tops, and terrazzo flooring',
        'Tile adhesives, joint grouts, and construction chemicals',
        'Bulk filler for fiberglass composite (FRP) resins'
      ],
      industries: ['Construction', 'Putty', 'Paints', 'Ceramics', 'FRP', 'Fibre Murti Industry', 'Gulal / Rangoli Industry', 'NC Putty Industry'],
      specifications: {
        grade: 'Super White Marble Powder',
        purity: 'Technical data available on request.',
        mesh: '200 to 400 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'High natural brightness',
        moisture: '< 0.3% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['50 Kg Bags', '1 MT Jumbo Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['calcium-carbonate', 'dolomite-powder', 'quartz-powder'],
      composition: "Primary composition: Calcium Carbonate (CaCO₃)",
      synonyms: ["marble powder", "caco3", "calcite marble"],
      enquiryEnabled: true
    },
    {
      id: 'quartz-powder',
      slug: 'quartz-powder',
      name: 'Quartz Powder',
      image: '/assets/images/products/quartz-powder.webp',
      alt: 'Deepali Minerals Quartz Powder Heap with Metal Scoop, Raw Quartz Boulders and Processing Yard',
      category: 'Mineral Powders',
      status: 'source-catalogue',
      shortDescription: 'High-purity crystalline silicon dioxide powder offering Mohs hardness 7, chemical inertness, and thermal endurance.',
      description: 'Milled quartz rock powder characterized by extreme hardness, low thermal expansion coefficient, and superior electrical resistance across demanding industrial matrices.',
      applications: [
        'Vitrified tile bodies, sanitaryware, and porcelain glazes',
        'Foundry casting mold sands and refractory coatings',
        'Heavy-duty anti-skid epoxy floorings and industrial grouts',
        'Engineered quartz stone slabs and artificial granite'
      ],
      industries: ['Ceramics', 'Foundary', 'Paints', 'Construction', 'FRP'],
      specifications: {
        grade: 'Micronized Optical Quartz',
        purity: 'SiO2 content available on request',
        mesh: '200 to 500 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'Available on request',
        moisture: '< 0.2% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['50 Kg Bags', '1 MT Jumbo Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['silica', 'marble-powder', 'china-clay'],
      composition: "Primary composition: Silicon Dioxide (SiO₂)",
      synonyms: ["quartz powder", "silica powder", "sio2"],
      enquiryEnabled: true
    },
    {
      id: 'calcium-carbonate',
      slug: 'calcium-carbonate',
      name: 'Calcium Carbonate',
      image: '/assets/images/products/calcium-carbonate-powder.webp',
      alt: 'Calcium Carbonate - Deepali Minerals Industrial Supply',
      category: 'Mineral Powders',
      status: 'source-catalogue',
      shortDescription: 'Precipitated (PCC), Ground (GCC), and Surface-Coated Calcium Carbonate for rigid PVC, cables, and polymers.',
      description: 'Extensively engineered calcium carbonate powders supporting high filler loadings, impact modification, smooth surface finish, and cost optimization in polymer compounding.',
      applications: [
        'Rigid PVC pipes, conduit fittings, window profiles, and trunking',
        'Polymer masterbatches (PP/PE matrix filler concentrates)',
        'Power cable insulation and wiring sheathing compounds',
        'Architectural emulsion paints, primers, and wall putties',
        'Rubber footwear soles, mats, and conveyor belts',
        'Fire Safety & fire-safety-related industrial applications and formulations (suitability subject to technical verification)'
      ],
      industries: [
        'Plastic', 'PVC', 'Master Batch', 'Cables', 'Paints', 'Rubber', 'Paper',
        'Fibre Murti Industry', 'Plywood Industry', 'Gulal / Rangoli Industry',
        'NC Putty Industry', 'Stationery Industry', 'Cattle Feed Industry',
        'Tile Adhesives Industry'
      ],
      specifications: {
        grade: 'PCC, GCC & Stearic Coated Grades',
        purity: 'CaCO3 content available on request',
        mesh: '300 to 1250 Mesh',
        micron: 'Superfine micronized options',
        particleSize: 'Available on request',
        whiteness: 'High whiteness up to 98%+',
        moisture: '< 0.3% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['25 Kg Paper/HDPE Bags', '50 Kg PP Bags', '1 MT Jumbo Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['talc', 'marble-powder', 'dolomite-powder'],
      composition: "Primary composition: Calcium Carbonate (CaCO₃)",
      synonyms: ["calcium carbonate", "caco3", "gcc", "pcc"],
      enquiryEnabled: true
    },
    {
      id: 'redoxide',
      slug: 'redoxide',
      name: 'Redoxide',
      image: '/assets/images/products/red-oxide-powder.webp',
      alt: 'Red Oxide - Deepali Minerals Industrial Supply',
      category: 'Functional Chemicals',
      status: 'source-catalogue',
      shortDescription: 'Natural and synthetic iron oxide red pigment (Fe2O3) offering strong tinting power and anti-corrosive protection.',
      description: 'Iron oxide red mineral pigment processed for excellent opacity, weather resistance, UV stability, and rust-inhibitive performance in metal protective coatings.',
      applications: [
        'Anti-corrosive structural steel primers and automotive primers',
        'Coloring cement flooring tiles, paving blocks, and terrazzo',
        'Plastics, masterbatches, and rubber compounding pigment'
      ],
      industries: ['Paints', 'Automobile Paints', 'Construction', 'Ceramics', 'Plastic'],
      specifications: {
        grade: 'Natural Hematite & Synthetic Red Oxide',
        purity: 'Fe2O3 content available on request',
        mesh: '300 to 400 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'N/A (Deep Brick Red)',
        moisture: '< 1.0% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['25 Kg Multiwall Paper Bags', '50 Kg HDPE Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['zinc-oxide', 'calcium-carbonate'],
      composition: "Primary composition: Ferric Oxide (Fe₂O₃)",
      synonyms: ["redoxide", "red oxide", "fe2o3", "iron oxide"],
      enquiryEnabled: true
    },
    {
      id: 'polyester-resin',
      slug: 'polyester-resin',
      name: 'Polyester Resin',
      image: '/assets/images/products/polyester-resin.webp',
      alt: 'Polyester Resin - Deepali Minerals Industrial Supply',
      category: 'Functional Chemicals',
      status: 'source-catalogue',
      shortDescription: 'Unsaturated polyester resins formulated for mineral compounding in composites, FRP laminates, and gelcoats.',
      description: 'Thermosetting polymer resin system tailored for optimal wetting and dispersion with mineral fillers such as quartz, talc, and marble powder in composite manufacturing.',
      applications: [
        'Fiberglass reinforced plastics (FRP) laminates, tanks, and pipes',
        'Automotive body repair fillers and metal puttys',
        'Artificial stone castings, sink vanity tops, and decorative moldings'
      ],
      industries: ['FRP', 'Automobile Paints', 'Construction'],
      specifications: {
        grade: 'General Purpose & Mineral-Filled Resin Grade',
        purity: 'Technical data available on request.',
        mesh: 'N/A (Liquid / Binder Matrix)',
        micron: 'N/A',
        particleSize: 'N/A',
        whiteness: 'N/A',
        moisture: 'N/A',
        bulkDensity: 'Specific gravity available on request'
      },
      packaging: ['35 Kg Carboys', '225 Kg Metal Barrels'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['quartz-powder', 'marble-powder', 'talc'],
      composition: "Composition: Unsaturated Polyester Synthetic Polymer",
      synonyms: ["polyester resin", "frp resin", "unsaturated polyester"],
      enquiryEnabled: true
    },
    {
      id: 'zinc-oxide',
      slug: 'zinc-oxide',
      name: 'Zinc Oxide',
      image: '/assets/images/products/zinc-oxide-powder.webp',
      alt: 'Zinc Oxide - Deepali Minerals Industrial Supply',
      category: 'Functional Chemicals',
      status: 'source-catalogue',
      shortDescription: 'High-purity White Seal and Active Rubber Grade Zinc Oxide (ZnO) for vulcanization kinetics and personal care.',
      description: 'Refined zinc oxide produced via pyrometallurgical French process, serving as the essential inorganic activator in elastomer compounding and rubber vulcanization.',
      applications: [
        'Tire, tube, and conveyor belt vulcanization activator',
        'EVA footwear slipper sheets, soles, and molded articles',
        'Cosmetic creams, lotions, barrier ointments, and calamine',
        'Ceramic glazes, frits, and anti-corrosive primers'
      ],
      industries: ['Rubber', 'Footwear', 'EVA', 'Cosmetics', 'Ceramics', 'Paints', 'Pharmaceutical'],
      specifications: {
        grade: 'White Seal & Active Rubber Grade',
        purity: 'ZnO assay available on request',
        mesh: '325 to 500 Mesh',
        micron: 'Micro-fine active surface area',
        particleSize: 'Available on request',
        whiteness: 'High whiteness powder',
        moisture: '< 0.3% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['25 Kg Multiwall Paper Bags with PE liner', '50 Kg HDPE Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['zinc-stearates', 'magnesium-carbonate', 'talc'],
      composition: "Primary composition: Zinc Oxide (ZnO)",
      synonyms: ["zinc oxide", "zno", "french process"],
      enquiryEnabled: true
    },
    {
      id: 'zinc-stearates',
      slug: 'zinc-stearates',
      name: 'Zinc Stearates',
      image: '/assets/images/products/zinc-stearates-powder.webp',
      alt: 'Deepali Minerals Zinc Stearate 50Kg Crown Packaging Bags, Powder Scoop and Laboratory Crystallization Dish',
      category: 'Functional Chemicals',
      status: 'source-catalogue',
      shortDescription: 'Fine hydrophobic metal soap functioning as an internal lubricant, release agent, and heat stabilizer.',
      description: 'Premium zinc stearate powder synthesized from refined stearic acid, offering low moisture content, high clear-melt clarity, and exceptional polymer dispersion.',
      applications: [
        'Internal and external lubricant for PVC pipes and masterbatches',
        'Sanding sealer additive for wood finishes and lacquers',
        'Anti-tack release dusting agent for rubber compounding'
      ],
      industries: ['Plastic', 'Master Batch', 'PVC', 'Rubber', 'Paints', 'Cosmetics'],
      specifications: {
        grade: 'Polymer & Coating Grade',
        purity: 'Technical data available on request.',
        mesh: '200 to 325 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'Snow white powder',
        moisture: '< 1.0% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['20 Kg Paper Bags', '25 Kg Laminated Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['zinc-oxide', 'calcium-carbonate', 'talc'],
      composition: "Primary composition: Zinc Stearate (Zn(C₁₈H₃₅O₂)₂)",
      synonyms: ["zinc stearates", "zinc stearate", "metallic soap"],
      enquiryEnabled: true
    },
    {
      id: 'magnesium-carbonate',
      slug: 'magnesium-carbonate',
      name: 'Magnesium Carbonate',
      image: '/assets/images/products/magnesium-carbonate-powder.webp',
      alt: 'Magnesium Carbonate - Deepali Minerals Industrial Supply',
      category: 'Mineral Powders',
      status: 'source-catalogue',
      shortDescription: 'Basic Magnesium Carbonate in light and heavy grades for translucent rubber reinforcing and cosmetic powders.',
      description: 'Basic Magnesium Carbonate offering ultra-low bulk density, high liquid absorbency, and good reinforcing properties in elastomers and personal care formulations.',
      applications: [
        'Translucent rubber compounds, slipper sheets, and EVA soles',
        'Cosmetic face powders, compacts, and perfumes carrier',
        'Sports, rock-climbing, and gymnastics athletic grip chalk',
        'Gym Powder, gym chalk, and sports-grip moisture absorption powder (suitability subject to grade verification)',
        'Thermal pipe insulation compounds'
      ],
      industries: ['Rubber', 'EVA', 'Cosmetics', 'Pharmaceutical', 'Footwear'],
      specifications: {
        grade: 'Light Basic & Heavy Grade',
        purity: 'MgO equivalent available on request',
        mesh: '300 to 400 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'Ultra-white powder',
        moisture: '< 1.5% Max',
        bulkDensity: 'Light grade ~ 0.12 - 0.15 g/cm³'
      },
      packaging: ['15 Kg Paper Bags (High volume)', '25 Kg Laminated Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['talc', 'zinc-oxide', 'dolomite-powder'],
      composition: "Primary composition: Basic Magnesium Carbonate (4MgCO₃·Mg(OH)₂·4H₂O)",
      synonyms: ["magnesium carbonate", "mgco3", "athletic chalk"],
      enquiryEnabled: true
    },
    {
      id: 'dolomite-powder',
      slug: 'dolomite-powder',
      name: 'Dolomite Powder',
      image: '/assets/images/products/dolomite-powder.webp',
      alt: 'Deepali Minerals Dolomite 50Kg Mountain-Logo Packaging, Granular Mineral Heap, Metal Scoop, Inspection Dish and Quarry Plant',
      category: 'Mineral Powders',
      status: 'source-catalogue',
      shortDescription: 'Double carbonate of calcium and magnesium CaMg(CO3)2 for wall putty, texture paints, and ceramics.',
      description: 'Natural crystalline dolomite mineral powder distinguished by mechanical hardness, chemical buffering action, weatherability, and high bulk density.',
      applications: [
        'Exterior texture paints, architectural coatings, and primers',
        'Cement wall putty, skim coats, and tile adhesives',
        'Ceramic tile glazes and glass batch melting flux',
        'Bulk filler for plastic and rubber formulations'
      ],
      industries: ['Paints', 'Putty', 'Construction', 'Ceramics', 'Plastic', 'Biofertilizers'],
      specifications: {
        grade: 'Superfine & Micronized Dolomite',
        purity: 'CaCO3 & MgCO3 assay available on request',
        mesh: '300 to 1250 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: '94% - 97%',
        moisture: '< 0.3% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['50 Kg HDPE Bags', '1 MT Jumbo Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['calcium-carbonate', 'marble-powder', 'hydrated-lime'],
      composition: "Primary composition: Calcium Magnesium Carbonate (CaMg(CO₃)₂)",
      synonyms: ["dolomite powder", "dolomite", "camgco32"],
      enquiryEnabled: true
    },
    {
      id: 'silica',
      slug: 'silica',
      name: 'Silica',
      image: '/assets/images/products/silica-sand-powder.webp',
      alt: 'Silica - Deepali Minerals Industrial Supply',
      category: 'Industrial Materials',
      status: 'source-catalogue',
      shortDescription: 'Crystalline silicon dioxide SiO2 powder offering hardness, chemical inertness, and thermal stability.',
      description: 'Refined silica mineral powder derived from vein quartz deposits, engineered for superior electrical resistance, thermal shock endurance, and mechanical durability.',
      applications: [
        'Ceramic glazes, sanitaryware bodies, and porcelain tiles',
        'Heavy-duty epoxy coatings and self-leveling floors',
        'Foundry casting molding sand and refractory washes',
        'Abrasive formulations and electrical cable fillers'
      ],
      industries: ['Ceramics', 'Foundary', 'Paints', 'Construction', 'Cables', 'Fibre Murti Industry', 'Plywood Industry', 'Tile Adhesives Industry'],
      specifications: {
        grade: 'Micronized Industrial Silica',
        purity: 'SiO2 content available on request',
        mesh: '200 to 500 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'Available on request',
        moisture: '< 0.2% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['50 Kg Bags', '1 MT Jumbo Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['quartz-powder', 'quartz-sand', 'marble-powder'],
      synonyms: ['silica', 'silicon dioxide', 'sio2', 'silica powder'],
      composition: 'Primary composition: Silicon Dioxide (SiO₂)',
      enquiryEnabled: true
    },
    {
      id: 'titanium-dioxide',
      slug: 'titanium-dioxide',
      name: 'Titanium Di Oxide',
      image: '/assets/images/products/titanium-dioxide-powder.webp',
      alt: 'Titanium Di Oxide - Deepali Minerals Industrial Supply',
      category: 'Functional Chemicals',
      status: 'source-catalogue',
      composition: 'Primary composition: Titanium Dioxide (TiO₂)',
      shortDescription: 'High-opacity white inorganic pigment widely utilized for brightness, tinting strength, and UV resistance in coatings, polymers, and inks.',
      description: 'Titanium dioxide is an inorganic white pigment widely utilized across industrial manufacturing for whiteness, opacity, and optical performance. Common industrial applications include paints, coatings, plastics, masterbatches, rubber, paper, and technical inks. Deepali-specific grade specifications, crystal form, and surface coating characteristics are available on request.',
      applications: [
        'Paints, architectural finishes, industrial coatings, and primers',
        'Plastics compounding and polymer colour masterbatches',
        'Rubber compounding and technical elastomer goods',
        'Paper manufacturing, surface coating, and filler formulations',
        'Printing inks, paste colorants, and specialized coatings'
      ],
      industries: ['Paints', 'Plastic', 'Master Batch', 'Rubber', 'Paper'],
      specifications: {
        grade: 'Industrial Pigment Grade',
        purity: 'Technical data available on request.',
        mesh: 'Available on request',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'High opacity pigment (Technical data available on request)',
        moisture: 'Technical data available on request.',
        bulkDensity: 'Available on request'
      },
      packaging: ['25 Kg Bags', '50 Kg Bags', '1 MT Jumbo Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['calcium-carbonate', 'zinc-oxide', 'talc'],
      synonyms: ['titanium dioxide', 'titanium', 'tio2', 'tio2 pigment', 'white pigment', 'titanium di oxide'],
      enquiryEnabled: true
    },
    {
      id: 'quartz-sand',
      slug: 'quartz-sand',
      name: 'Quartz Sand',
      image: '/assets/images/products/quartz-sand-grains.webp',
      alt: 'Quartz Sand - Deepali Minerals Industrial Supply',
      category: 'Industrial Materials',
      status: 'source-catalogue',
      composition: 'Primary composition: Silicon Dioxide (SiO₂)',
      shortDescription: 'Silica-rich natural quartz granular media engineered for foundry molding, glass manufacturing, epoxy screeds, and filtration.',
      description: 'Quartz Sand is a silica-rich granular material processed from high-purity quartz deposits for industrial applications requiring chemical inertness, high melting point, and controlled grain size distribution. Common industrial applications include foundry molds, glass batching, refractory formulations, water filtration, and construction mortars. Grain size distribution and silica purity to be confirmed by Deepali Minerals.',
      applications: [
        'Glass batch formulations for container glass and sheet production',
        'Foundry molding sand, core making, and casting release',
        'Construction mortars, epoxy screeds, grouts, and textured coatings',
        'Ceramic bodies compounding and refractory kiln formulations',
        'Industrial water filtration media and abrasive blasting'
      ],
      industries: ['Foundary', 'Ceramics', 'Construction', 'Paints'],
      specifications: {
        grade: 'Industrial Quartz Sand',
        purity: 'SiO2 content available on request',
        mesh: 'Graded sieve fractions available on request',
        micron: 'Available on request',
        particleSize: 'Granular mesh fractions available on request',
        whiteness: 'Natural silica grain (Available on request)',
        moisture: '< 0.5% Max (Technical data available on request)',
        bulkDensity: 'Available on request'
      },
      packaging: ['50 Kg HDPE Bags', '1 MT Jumbo Bags', 'Loose Bulk on request'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['quartz-powder', 'silica', 'marble-chips'],
      synonyms: ['quartz sand', 'quartz', 'silica sand', 'sand', 'sio2', 'casting sand'],
      enquiryEnabled: true
    },
    {
      id: 'marble-chips',
      slug: 'marble-chips',
      name: 'Marble Chips',
      image: '/assets/images/products/marble-chips-aggregates.webp',
      alt: 'Marble Chips - Deepali Minerals Industrial Supply',
      category: 'Industrial Materials',
      status: 'source-catalogue',
      composition: 'Primary composition: Calcium Carbonate (CaCO₃)',
      shortDescription: 'Screened natural crystalline marble stone chippings for terrazzo flooring, exposed aggregates, precast panels, and landscaping.',
      description: 'Marble Chips are crushed and screened natural marble stone granules primarily associated with calcium carbonate. Common industrial applications include architectural terrazzo floors, decorative exposed cast panels, garden pathways, and structural aggregates. Natural stone color, chip sizing fractions, and source to be confirmed by Deepali Minerals.',
      applications: [
        'Terrazzo flooring, mosaic tiles, and decorative cast stone panels',
        'Exposed aggregate plaster, textured exterior renders, and wall coatings',
        'Decorative landscaping, garden pathways, and architectural rockeries',
        'Precast concrete elements, pavement tiles, and polymer concrete',
        'Construction aggregates for high-durability floor screeds'
      ],
      industries: ['Construction', 'Paints', 'Ceramics'],
      specifications: {
        grade: 'Screened Industrial & Decorative Chips',
        purity: 'CaCO3 content available on request',
        mesh: 'Standard chip sizes available on request',
        micron: 'N/A (Granular / Chippings)',
        particleSize: 'Sieved stone chip sizes available on request',
        whiteness: 'Natural white to off-white chips',
        moisture: '< 0.5% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['50 Kg HDPE Bags', '1 MT Jumbo Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['marble-powder', 'calcium-carbonate', 'dolomite-powder'],
      synonyms: ['marble chips', 'marble', 'caco3', 'terrazzo chips', 'stone chips'],
      enquiryEnabled: true
    },
    {
      id: 'barytes',
      slug: 'barytes',
      name: 'Barytes',
      image: '/assets/images/products/barytes-powder.webp',
      alt: 'Barytes - Deepali Minerals Industrial Supply',
      category: 'Mineral Powders',
      status: 'source-catalogue',
      composition: 'Primary composition: Barium Sulfate (BaSO₄)',
      shortDescription: 'High-density barium sulfate mineral powder valued for chemical inertness, high specific gravity, and acoustic damping performance.',
      description: 'Barytes (natural barium sulfate) is an exceptionally dense mineral powder characterized by high specific gravity, low oil absorption, and chemical resistance. Common industrial applications include industrial coatings, plastics, rubber, soundproofing mats, and industrial weighting formulations. Certified commercial density and purity parameters to be confirmed by Deepali Minerals.',
      applications: [
        'High-density weighting agent in industrial fluids and compounding',
        'Automotive primers, corrosion-resistant undercoats, and powder paints',
        'Acoustic sound-deadening mats, carpet backing, and heavy rubber goods',
        'Friction materials, brake linings, and clutch facings',
        'Polymer counterweights and radiation attenuation formulations'
      ],
      industries: ['Paints', 'Rubber', 'Plastic', 'Construction', 'Automobile Paints'],
      specifications: {
        grade: 'Industrial Barium Sulfate Mineral Grade',
        purity: 'BaSO4 content available on request',
        mesh: '200 to 500 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'Available on request',
        moisture: '< 0.5% Max',
        bulkDensity: 'High specific gravity (~ 4.2 - 4.4 g/cm³)'
      },
      packaging: ['50 Kg HDPE Bags', '1 MT Jumbo Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['calcium-carbonate', 'dolomite-powder', 'talc'],
      synonyms: ['barytes', 'barite', 'barium sulfate', 'baso4', 'heavy spar'],
      enquiryEnabled: true
    },
    {
      id: 'french-chalk-powder',
      slug: 'french-chalk-powder',
      name: 'French Chalk Powder',
      image: '/assets/images/products/french-chalk-powder.webp',
      alt: 'French Chalk Powder - Deepali Minerals Industrial Supply',
      category: 'Mineral Powders',
      status: 'source-catalogue',
      composition: 'Primary mineral: Talc | Chemical formula: Mg₃Si₄O₁₀(OH)₂',
      shortDescription: 'Talc-associated natural mineral powder processed for industrial lubricity, surface dusting, marking, and anti-friction applications.',
      description: 'French Chalk Powder is a talc-associated mineral powder characterized by extreme softness, lubricity, and non-stick release properties. Common industrial applications include rubber tyre demolding, cable drawing lubrication, metal marking, and tailoring chalks. French Chalk Powder is maintained as its own commercial product, with grade specifications to be confirmed by Deepali Minerals.',
      applications: [
        'Rubber extrusion dusting, mold release, tyre curing, and vulcanizing parting',
        'Industrial metal fabrication marking and tailors grading chalk',
        'Electrical cable sheathing lubricant and non-stick wiring powder',
        'Welding anti-spatter dusting and dry industrial surface lubrication',
        'Footwear sole demolding and EVA sheet non-stick dusting'
      ],
      industries: ['Rubber', 'Footwear', 'Cables', 'Paints', 'Foundary'],
      specifications: {
        grade: 'Commercial French Chalk Grade',
        purity: 'Technical data available on request.',
        mesh: '300 to 500 Mesh',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'Good whiteness (Available on request)',
        moisture: '< 1.0% Max',
        bulkDensity: 'Available on request'
      },
      packaging: ['25 Kg Bags', '50 Kg HDPE Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['talc', 'soap-stone', 'calcium-carbonate'],
      synonyms: ['french chalk', 'french chalk powder', 'steatite chalk', 'tailors chalk'],
      enquiryEnabled: true
    },
    {
      id: 'starch',
      slug: 'starch',
      name: 'Starch',
      image: '/assets/images/products/starch-powder.webp',
      alt: 'Starch - Deepali Minerals Industrial Supply',
      originType: 'Plant-Derived Industrial Formulation',
      imageDescription: 'White starch powder, bowl, and natural starch sources such as corn or cassava',
      category: 'Functional Chemicals',
      status: 'source-catalogue',
      composition: 'Composition: Starch | General empirical formula: (C₆H₁₀O₅)ₙ',
      shortDescription: 'Natural polymeric carbohydrate material utilized as an industrial binder, sizing agent, thickener, and rheology modifier across technical manufacturing.',
      description: 'Starch is a natural polymeric carbohydrate material widely employed in non-food industrial processing as a green binder, film former, and adhesive modifier. Common industrial applications include paper mills for wet-end and surface sizing, corrugated packaging adhesives, textile warp sizing, and foundry core binders. Industrial technical grade specifications to be confirmed by Deepali Minerals.',
      applications: [
        'Paper manufacturing, wet-end sizing, surface sizing, and coating binders',
        'Corrugated board packaging adhesives, box lamination, and paste compounding',
        'Textile yarn warp sizing, fabric stiffening, and finishing operations',
        'Foundry sand core binder and green sand molding additive',
        'Industrial briquette and pellet agglomeration binding agent'
      ],
      industries: ['Paper', 'Foundary', 'Paints', 'Construction', 'Pharmaceutical', 'Stationery Industry'],
      specifications: {
        grade: 'Industrial Technical Grade',
        purity: 'Technical data available on request.',
        mesh: 'Fine powder',
        micron: 'Available on request',
        particleSize: 'Available on request',
        whiteness: 'White to creamy powder',
        moisture: 'Technical data available on request.',
        bulkDensity: 'Available on request'
      },
      packaging: ['25 Kg Bags', '50 Kg HDPE Bags'],
      documents: { tds: null, msds: null, testReport: null, certificate: null, brochure: null },
      related: ['calcium-carbonate', 'talc', 'china-clay'],
      synonyms: ['starch', 'industrial starch', 'maize starch', 'corn starch', 'tapioca starch'],
      enquiryEnabled: true
    }
  ];

  // Register all 22 products as Industrial Minerals
  products.forEach(function (p) {
    p.isIndustrialMineral = true;
    p.subCategory = p.category;
    if (!p.categories) {
      p.categories = ['Industrial Minerals', p.category];
      if (['silica', 'quartz-sand', 'marble-chips'].indexOf(p.slug) !== -1) {
        p.categories.push('Grains & Aggregates');
      }
    }
  });

  const masterUncataloguedMaterials = [
    {
      id: "celite",
      name: "Celite",
      chemicalName: "Diatomaceous Earth / Flux-Calcined Diatomite (SiO₂)",
      category: "Specialty Sourced Mineral",
      status: "Custom formulation grade available on technical enquiry",
      sheetOccurrences: [
        { sheetIndex: "K", industry: "Biofertilizers", role: "Inert microbial carrier & moisture retention medium" },
        { sheetIndex: "L", industry: "Cattle Feed", role: "Mineral carrier & flow conditioning agent" },
        { sheetIndex: "S", industry: "Foundry", role: "Thermal insulation aid & foundry casting release" },
        { sheetIndex: "T", industry: "FRP Composites", role: "Secondary functional filler & resin viscosity modifier" },
        { sheetIndex: "U", industry: "Paints & Coatings", role: "Silica flatting agent & sheen matting extender" },
        { sheetIndex: "AA", industry: "Plywood & Adhesives", role: "Adhesive extender & glue line thickener" },
        { sheetIndex: "AD", industry: "Stationery & Paper", role: "Paper processing aid & functional mineral filler" }
      ],
      description: "Celite (diatomaceous earth / flux-calcined silica) is supplied for specialized industrial filtration, microbial carrier, functional filler, and thermal insulation applications. Deepali Minerals supplies custom mesh sizes, calcined grades, and purity specifications upon direct commercial enquiry.",
      catalogueStatus: "Specialty Sourced Formulation Grade",
      action: "Technical specifications and batch volume confirmed on enquiry"
    },
    {
      id: "calcite",
      name: "Calcite / Calcite Powder",
      chemicalName: "Crystalline Calcium Carbonate (CaCO₃)",
      category: "Specialty Sourced Mineral",
      status: "Custom formulation grade available on technical enquiry",
      sheetOccurrences: [
        { sheetIndex: "G", industry: "Pesticides", role: "Inert carrier & dusting diluent" },
        { sheetIndex: "H", industry: "Detergent", role: "Bulk density & scouring extender" },
        { sheetIndex: "N", industry: "Wall Putty", role: "High-whiteness mineral extender for white cement putties" }
      ],
      description: "High-purity crystalline Calcite and micronized Calcite Powder engineered for fine wall putties, dry agricultural carriers, and detergent scouring compounds. Tailored particle size distributions (300 to 1250 mesh) and whiteness grades supplied on request.",
      catalogueStatus: "Specialty Sourced Formulation Grade",
      action: "Technical specifications and batch volume confirmed on enquiry"
    }
  ];

  const canonicalIndustries = [
  {
    "id": "paints-coatings",
    "slug": "paints-coatings",
    "name": "Paints and Coatings",
    "badge": "Coatings & Primers",
    "icon": "palette",
    "subtitle": "Extenders, Functional Fillers, Primers & Opacifying Minerals for Architectural & Industrial Coatings",
    "description": "Deepali Minerals supplies high-whiteness mineral extenders, barrier pigments, matting agents, and opacifiers engineered for emulsion paints, primers, automotive finishes, and protective industrial coatings. Our minerals optimize pigment volume concentration (PVC), scrub resistance, anti-sagging properties, and weathering durability across solvent and waterborne formulations.",
    "keyApplications": [
      "Architectural exterior and interior emulsion paints",
      "Industrial anti-corrosive primers and heavy-duty epoxy floor coatings",
      "Automotive OEM and refinish primers and surfacers",
      "Wood primers, sanding sealers, and exterior textured wall finishes"
    ],
    "technicalHighlights": [
      "Controlled particle size distribution from 300 to 1250 mesh",
      "High whiteness (>92-98% L-value) and low oil absorption grades",
      "Chemical inertness, scrub resistance, and superior tint retention"
    ],
    "linkedProductSlugs": [
      "talc",
      "soap-stone",
      "chalk-powder",
      "hydrated-lime",
      "china-clay",
      "kaoline",
      "marble-powder",
      "quartz-powder",
      "calcium-carbonate",
      "redoxide",
      "zinc-oxide",
      "zinc-stearates",
      "dolomite-powder",
      "silica",
      "titanium-dioxide",
      "barytes",
      "french-chalk-powder",
      "marble-chips",
      "quartz-sand",
      "polyester-resin"
    ],
    "productRoles": {
      "talc": "Extender pigment, anti-sagging agent, weather resistance, and sheen control in primers & exterior paints",
      "soap-stone": "Cost-effective lubricating filler for industrial primers and undercoats",
      "chalk-powder": "Soft extender for distempers, lime washes, and utility emulsion paints",
      "hydrated-lime": "Traditional mineral whitewashes, lime washes, and silicate paint formulations",
      "china-clay": "Semi-reinforcing extender providing brushability, opacity enhancement, and anti-settling properties",
      "kaoline": "Calcined/hydrated clay for gloss control, titanium dioxide extension, and enamel whiteness",
      "marble-powder": "High-brightness calcium carbonate for texture paints, exterior wall coatings, and skim coats",
      "quartz-powder": "High-hardness silica flour imparting scratch resistance and abrasion durability to industrial coatings",
      "calcium-carbonate": "Primary high-brightness white extender optimizing pigment volume concentration (PVC) and hiding power",
      "redoxide": "High-purity natural iron oxide pigment for anti-corrosive industrial primers, machinery enamels, and metal coats",
      "zinc-oxide": "Fungistatic/mildew-resistant additive, pigment activator, and corrosion-inhibiting agent",
      "zinc-stearates": "Anti-settling additive, flattening agent, and sanding lubricant for wood sanding sealers",
      "dolomite-powder": "Weather-resistant magnesium-calcium carbonate extender for exterior coatings and primers",
      "silica": "Matting agent, hardness enhancer, and abrasion-resistant filler for heavy-duty epoxy coatings",
      "titanium-dioxide": "Prime white opacifying pigment providing maximum refractive index, tint strength, and UV weatherability",
      "barytes": "Heavy barium sulphate filler providing high chemical resistance, acid/alkali barrier, and sound-damping primers",
      "french-chalk-powder": "Micro-fine talc for satin-finish specialty coatings and dusting barrier applications",
      "marble-chips": "Architectural aggregates for textured plaster coats and exterior stone-finish paints",
      "quartz-sand": "Anti-skid floor coating aggregate and heavy-duty textured plaster filler",
      "polyester-resin": "Protective clear coats, fiberglass-reinforced coatings, and automotive repair primers"
    },
    "searchAliases": [
      "paints",
      "coatings",
      "varnish",
      "primer",
      "enamel",
      "distemper",
      "emulsion",
      "anti-corrosive primer",
      "automobile paints",
      "paint"
    ],
    "defaultNotes": "[Sector Enquiry: Paints and Coatings] Required mineral(s): ; Formulation type (emulsion/primer/epoxy): ; Mesh/Micron specification: ; Volume: ",
    "whatsappPrefill": "Hello Deepali Minerals, I would like to enquire about mineral raw materials for Paints and Coatings. Required specifications: "
  },
  {
    "id": "plastics-polymers",
    "slug": "plastics-polymers",
    "name": "Plastics and Polymers",
    "badge": "Compounding & Masterbatch",
    "icon": "layers",
    "subtitle": "Functional Reinforcing Fillers, Lubricants & Opacifiers for Thermoplastics & Masterbatches",
    "description": "Mineral fillers, heat stabilizers, and slip agents for PP, PE, PVC, engineering plastics, masterbatches, and extruded profile compounding. Deepali Minerals supplies precision-graded calcium carbonates, lamellar talcs, and metallic stearates that dramatically enhance dimensional rigidity, heat deflection temperature (HDT), and processing economics.",
    "keyApplications": [
      "Polypropylene (PP) and Polyethylene (PE) filler masterbatches",
      "Rigid and flexible PVC pipes, conduits, cables, and fitting compounds",
      "Automotive plastic components, battery casings, and appliance housings",
      "Engineering plastic compounding and mineral-reinforced polymer blends"
    ],
    "technicalHighlights": [
      "Substantially improves flexural modulus, HDT, and impact strength",
      "Extremely low moisture content (<0.2%) preventing surface splay and polymer degradation",
      "Uniform surface treatment and high dispersion at compounding loadings up to 70%"
    ],
    "linkedProductSlugs": [
      "talc",
      "calcium-carbonate",
      "zinc-stearates",
      "titanium-dioxide",
      "barytes",
      "china-clay",
      "soap-stone",
      "chalk-powder",
      "dolomite-powder",
      "redoxide"
    ],
    "productRoles": {
      "talc": "Nucleating agent, stiffness enhancer, and heat distortion temperature (HDT) booster for PP & automotive compounds",
      "calcium-carbonate": "Dominant white filler in PE, PP, and PVC providing dimensional stability, opacity, and cost reduction",
      "zinc-stearates": "Internal/external lubricant, mould release agent, and heat stabilizer for PVC, polystyrene, and masterbatch",
      "titanium-dioxide": "High-opacity white masterbatch pigment providing brilliant whiteness and long-term UV weathering resistance",
      "barytes": "High-density filler for automotive acoustic dampening plastics, sound barriers, and weighted appliance components",
      "china-clay": "Calcined/hydrated clay filler for electrical cable insulation and high-dielectric polymer compounds",
      "soap-stone": "Lubricating functional mineral filler for utility polymer compounding",
      "chalk-powder": "Soft, low-abrasion mineral filler for flexible PVC goods, shoe compounds, and filler batches",
      "dolomite-powder": "Economical magnesium-calcium carbonate filler for general industrial thermoplastic compounding",
      "redoxide": "Coloring additive and pigment masterbatch base for reddish and terracotta plastic mouldings"
    },
    "searchAliases": [
      "plastics",
      "polymers",
      "plastic",
      "masterbatch",
      "rigid pvc",
      "pvc",
      "eva",
      "polypropylene",
      "compounding"
    ],
    "defaultNotes": "[Sector Enquiry: Plastics and Polymers] Polymer base (PP/PE/PVC/EVA): ; Target loading percentage: ; Required mineral: ; Volume: ",
    "whatsappPrefill": "Hello Deepali Minerals, I would like to enquire about mineral raw materials for Plastics and Polymers. Required specifications: "
  },
  {
    "id": "rubber-footwear",
    "slug": "rubber-footwear",
    "name": "Rubber and Footwear",
    "badge": "Vulcanization & Moulding",
    "icon": "footprints",
    "subtitle": "Vulcanizing Activators, Reinforcing Fillers, Dusting Powders & Mould Release Minerals",
    "description": "Critical mineral raw materials for tires, industrial rubber goods, conveyor belts, footwear outsoles, EVA sheets, and moulded elastomer profiles. Our active zinc oxide, reinforcing carbonaceous whiteners, and platey dusting agents ensure smooth extrusion, fast cure activation, and high abrasion resistance in demanding vulcanized rubber compounds.",
    "keyApplications": [
      "Tire treads, sidewalls, inner tubes, and retreading compounds",
      "Footwear outsoles, microcellular EVA sheets, and Hawaiian slipper soles",
      "Conveyor belting, industrial rubber hoses, gaskets, and seals",
      "Rubber extrusions, calendered sheets, and moulded footwear components"
    ],
    "technicalHighlights": [
      "Active Zinc Oxide (>99% purity) for optimum vulcanization cure rate and rubber elasticity",
      "French Chalk / Talc platey dusting agents preventing rubber sheet sticking and adhesion",
      "Reinforcing carbonates and clays providing balanced tensile strength, modulus, and tear resistance"
    ],
    "linkedProductSlugs": [
      "talc",
      "french-chalk-powder",
      "calcium-carbonate",
      "zinc-oxide",
      "zinc-stearates",
      "magnesium-carbonate",
      "china-clay",
      "soap-stone",
      "chalk-powder",
      "titanium-dioxide",
      "barytes"
    ],
    "productRoles": {
      "talc": "Anti-tack dusting agent, extrusion lubricant, and inert reinforcing filler for rubber compounding",
      "french-chalk-powder": "Traditional silky dusting powder, mould release agent, and anti-adhesion barrier for footwear soles and unvulcanized rubber",
      "calcium-carbonate": "High-purity white reinforcing filler improving hardness, tensile strength, and compound economics in rubber & EVA",
      "zinc-oxide": "Essential vulcanization activator and accelerator synergist promoting cross-link formation and heat conductivity",
      "zinc-stearates": "Internal processing aid, mould release lubricant, and rubber slab dip anti-adhesive",
      "magnesium-carbonate": "Reinforcing white filler imparting transparency, hardness, and stiffness in translucent rubber soles",
      "china-clay": "Semi-reinforcing clay filler enhancing modulus, tear strength, and abrasion resistance in mechanical rubber goods",
      "soap-stone": "Parting powder and anti-stick dusting agent for calendered rubber sheeting and extrusion lines",
      "chalk-powder": "Soft, low-abrasion mineral extender for utility rubber floor mats, shoe soles, and moulded articles",
      "titanium-dioxide": "High-brightness white pigment for pure white footwear outsoles and colored rubber profiles",
      "barytes": "Heavy mineral filler for high-density sound-proofing rubber pads and chemical-resistant industrial linings"
    },
    "searchAliases": [
      "rubber",
      "footwear",
      "eva",
      "shoes",
      "soles",
      "vulcanization",
      "tires",
      "mould release",
      "chappal"
    ],
    "defaultNotes": "[Sector Enquiry: Rubber and Footwear] Rubber type (Natural/SBR/EPDM/EVA): ; Compound component (sole/mat/hose): ; Required mineral: ; Volume: ",
    "whatsappPrefill": "Hello Deepali Minerals, I would like to enquire about mineral raw materials for Rubber and Footwear. Required specifications: "
  },
  {
    "id": "construction-building-materials",
    "slug": "construction-building-materials",
    "name": "Construction and Building Materials",
    "badge": "Civil & Infrastructure",
    "icon": "building",
    "subtitle": "Hydraulic Binders, Architectural Aggregates, Silicas & Mortar Additives",
    "description": "High-calcium hydrated lime, graded silica aggregates, marble powders, and mineral extenders for ready-mix concrete, dry mortars, terrazzo, road construction, and masonry stabilization. Deepali Minerals supplies dependable bulk mineral grades that enhance compressive strength, workability, and long-term durability in civil infrastructure projects.",
    "keyApplications": [
      "Ready-mix concrete, self-compacting concrete (SCC), and precast elements",
      "Traditional and dry-mix masonry mortars, structural plasters, and renders",
      "Terrazzo flooring, exposed aggregate architectural concrete, and paving blocks",
      "Road base stabilization, soil lime treatment, and asphalt filler compounding"
    ],
    "technicalHighlights": [
      "High-calcium hydrated lime (>85-90% Available Ca(OH)2) for superior lime carbonation and workability",
      "Sub-angular graded quartz sand and marble aggregates providing structural interlock and compressive strength",
      "Natural iron oxide redoxide for permanent non-fading concrete pigmentation and interlocking pavers"
    ],
    "linkedProductSlugs": [
      "hydrated-lime",
      "marble-powder",
      "marble-chips",
      "quartz-sand",
      "quartz-powder",
      "dolomite-powder",
      "calcium-carbonate",
      "redoxide",
      "silica",
      "polyester-resin"
    ],
    "productRoles": {
      "hydrated-lime": "High-calcium chemical lime for masonry mortars, structural plaster stabilization, and soil lime treatment",
      "marble-powder": "Fine calcium carbonate powder for architectural skim coats, dry-mix mortars, and artificial marble stone",
      "marble-chips": "Graded crystalline marble aggregates for terrazzo flooring, exposed architectural concrete, and landscaping",
      "quartz-sand": "Strictly sieved sub-angular quartz sand for high-strength structural concrete, grouts, and repair mortars",
      "quartz-powder": "Micro-fine silica flour for ultra-high-performance concrete (UHPC), epoxy flooring, and dry mortar mixes",
      "dolomite-powder": "Dense magnesium-calcium carbonate aggregate for structural plasters, exterior stucco, and terrazzo binder",
      "calcium-carbonate": "Standard mineral filler for dry-mix mortars, gypsum joint compounds, caulks, and construction sealants",
      "redoxide": "Natural UV-stable iron oxide pigment for coloring interlocking paver blocks, cement tiles, and roof tiles",
      "silica": "Graded silica grains and flour for polymer-modified concrete, industrial flooring, and self-levelling screeds",
      "polyester-resin": "Polymer concrete matrix, chemical anchor grouts, and composite structural reinforcing elements"
    },
    "searchAliases": [
      "construction",
      "building materials",
      "masonry",
      "plaster",
      "concrete",
      "aggregates",
      "flooring",
      "terrazzo"
    ],
    "defaultNotes": "[Sector Enquiry: Construction and Building Materials] Application (concrete/mortar/terrazzo/pavers): ; Required mineral: ; Grain/Mesh specification: ; Volume: ",
    "whatsappPrefill": "Hello Deepali Minerals, I would like to enquire about mineral raw materials for Construction and Building Materials. Required specifications: "
  },
  {
    "id": "ceramics",
    "slug": "ceramics",
    "name": "Ceramics",
    "badge": "Vitrification & Glazes",
    "icon": "circle-dot",
    "subtitle": "Plastic Clays, Fluxes, Glaze Modifiers & Thermal Shock Stabilizers",
    "description": "Raw mineral inputs for sanitaryware, ceramic wall and floor tiles, electrical porcelain insulators, refractories, and glaze frits. Deepali Minerals supplies high-plasticity china clays, pure kaolins, quartz powders, and fluxing minerals (Talc, Calcite, Dolomite) that optimize slip rheology, green strength, firing vitrification, and thermal shock resistance.",
    "keyApplications": [
      "Vitreous sanitaryware slip casting (washbasins, water closets)",
      "Ceramic wall and floor tile bodies, engobes, and vitrified porcelain tiles",
      "Ceramic glazes, frits, crystalline glaze formulations, and color stains",
      "Electrical porcelain high-voltage insulators, cordierite bodies, and refractories"
    ],
    "technicalHighlights": [
      "High green strength and controlled drying shrinkage in whiteware slip casting",
      "Fluxing minerals (Talc, Dolomite, Calcite) facilitating vitrification at optimum firing temperatures",
      "High-purity quartz and silica for thermal expansion matching, glaze hardness, and crazing resistance"
    ],
    "linkedProductSlugs": [
      "china-clay",
      "kaoline",
      "quartz-powder",
      "quartz-sand",
      "soap-stone",
      "talc",
      "dolomite-powder",
      "calcium-carbonate",
      "zinc-oxide",
      "marble-powder",
      "redoxide",
      "silica",
      "marble-chips"
    ],
    "productRoles": {
      "china-clay": "High-plasticity white burning clay providing green casting strength and suspension stability in sanitaryware slip",
      "kaoline": "Refractory white kaolin providing chemical purity, casting body suspension, and high-whiteness firing properties",
      "quartz-powder": "Pure silica network former controlling body thermal expansion and preventing ceramic glaze crazing",
      "quartz-sand": "Refractory silica grain providing thermal shock stability in kiln furniture and ceramic body formulations",
      "soap-stone": "Talc-soapstone body flux reducing vitrification temperature and imparting thermal shock resistance in tiles",
      "talc": "High-magnesium body flux for low-expansion wall tiles, cordierite bodies, and steatite electrical insulators",
      "dolomite-powder": "Source of calcium and magnesium oxides (CaO & MgO) acting as high-temperature flux in ceramic glazes",
      "calcium-carbonate": "Calcite flux reacting with silica during firing to form anorthite, enhancing glaze gloss and vitrification",
      "zinc-oxide": "High-temperature glaze flux improving glaze gloss, thermal expansion matching, and crystalline flower formation",
      "marble-powder": "Calcium flux in specialty ceramic bodies, engobes, and artistic terracotta preparations",
      "redoxide": "Natural iron oxide ceramic stain and coloring agent for red body tiles, terracotta, and rustic glazes",
      "silica": "High-purity SiO2 network former ensuring dimensional stability and thermal shock durability in fired ceramics",
      "marble-chips": "Coarse marble fragments pressed into rustic terrazzo ceramic floor tiles and composite tiles"
    },
    "searchAliases": [
      "ceramics",
      "pottery",
      "sanitaryware",
      "ceramic tiles",
      "glaze",
      "vitrification",
      "porcelain"
    ],
    "defaultNotes": "[Sector Enquiry: Ceramics] Ceramic type (sanitaryware/wall tile/glaze/insulator): ; Required mineral: ; Mesh/Firing requirement: ; Volume: ",
    "whatsappPrefill": "Hello Deepali Minerals, I would like to enquire about mineral raw materials for Ceramics. Required specifications: "
  },
  {
    "id": "paper-stationery",
    "slug": "paper-stationery",
    "name": "Paper and Stationery",
    "badge": "Pulp & Papermaking",
    "icon": "file-text",
    "subtitle": "Wet-End Retention Fillers, Sizing Binders, Opacifiers & Coating Clays",
    "description": "Essential mineral fillers, coating pigments, and sizing agents for pulp mills, paper mills, duplex packaging boards, writing paper, school blackboard chalk, and art stationery. Our lamellar talcs provide pitch control in pulp circuits, while our high-whiteness carbonates and kaolins deliver unmatched printing opacity, smoothness, and ink gloss.",
    "keyApplications": [
      "Pulp mill pitch control, stickies passivation, and wet-end fiber retention",
      "Alkaline papermaking fillers for printing, writing, and photocopy papers",
      "Duplex board coating pigments for packaging boxes and folding cartons",
      "School blackboard chalks, pastel crayons, and stationery modeling materials"
    ],
    "technicalHighlights": [
      "Organophilic talc selectively absorbing pitch and organic resins to keep pulp paper machines clean",
      "High-brightness kaolin and PCC/calcite delivering superior opacity, whiteness, and ink absorption",
      "Industrial starch for internal fiber bonding, wet-end tensile strength, and corrugated board gluing"
    ],
    "linkedProductSlugs": [
      "talc",
      "china-clay",
      "kaoline",
      "calcium-carbonate",
      "titanium-dioxide",
      "hydrated-lime",
      "starch",
      "chalk-powder",
      "french-chalk-powder"
    ],
    "productRoles": {
      "talc": "Pitch control agent in pulp processing and organophilic filler improving paper sheet smoothness and opacity",
      "china-clay": "Premier paper coating pigment and wet-end filler providing ink holdout, gloss, and sheet formation",
      "kaoline": "Ultra-fine high-whiteness coating clay for premium coated art papers, duplex boards, and publication grades",
      "calcium-carbonate": "Dominant alkaline papermaking filler providing high brightness, opacity, bulk, and acid-free archival quality",
      "titanium-dioxide": "Specialty premium opacifier for high-opacity thin papers, laminating decor papers, and currency grades",
      "hydrated-lime": "Chemical recovery agent in kraft pulp liquor causticization, effluent water treatment, and bleaching",
      "starch": "Modified/native starch for wet-end internal sizing, surface sizing press, and corrugated carton board adhesive",
      "chalk-powder": "Primary raw material for dustless blackboard writing chalk, pastel crayons, and art stationery sticks",
      "french-chalk-powder": "Superfine talc powder for dusting paper converting rolls, envelope manufacturing, and stationery items"
    },
    "searchAliases": [
      "paper",
      "stationery",
      "pulp",
      "paper mill",
      "chalk",
      "crayons",
      "paperboard",
      "duplex"
    ],
    "defaultNotes": "[Sector Enquiry: Paper and Stationery] Application (paper mill/coating/chalk/board): ; Required mineral: ; Whiteness/Mesh target: ; Volume: ",
    "whatsappPrefill": "Hello Deepali Minerals, I would like to enquire about mineral raw materials for Paper and Stationery. Required specifications: "
  },
  {
    "id": "frp-composites",
    "slug": "frp-composites",
    "name": "FRP and Composite Applications",
    "badge": "Composites & Tooling",
    "icon": "shield",
    "subtitle": "Unsaturated Resins, Shrink-Control Fillers & Gel Coat Minerals",
    "description": "High-performance polymer resins, casting fillers, and functional mineral additives for fiberglass reinforced plastics (FRP), SMC/BMC, and artificial stone. Deepali Minerals supplies unsaturated polyester resins along with micronized mineral fillers that reduce exothermic peak temperatures, eliminate shrinkage cracking, and produce flawless composite mouldings.",
    "keyApplications": [
      "FRP tanks, pipes, chemical storage vessels, and cooling tower louvers",
      "Sheet Moulding Compound (SMC) and Bulk Moulding Compound (BMC) compression moulding",
      "Cultured marble bathtubs, kitchen sinks, vanity counters, and solid surface sheets",
      "Fiberglass boats, automotive body kits, electrical junction boxes, and architectural domes"
    ],
    "technicalHighlights": [
      "General-purpose and isophthalic polyester resins with controlled reactivity and curing profiles",
      "Micro-fine mineral fillers reducing exothermic heat and volumetric shrinkage during resin curing",
      "Lamellar talc and marble powders for silky gel coat finishes and chemical corrosion barrier layers"
    ],
    "linkedProductSlugs": [
      "polyester-resin",
      "talc",
      "china-clay",
      "calcium-carbonate",
      "quartz-powder",
      "marble-powder",
      "marble-chips",
      "french-chalk-powder"
    ],
    "productRoles": {
      "polyester-resin": "Unsaturated polyester resin matrix for fiberglass hand lay-up, spray-up, filament winding, and casting",
      "talc": "Composite filler reducing polymerization shrinkage, improving flexural modulus, and boosting corrosion resistance",
      "china-clay": "Functional filler for SMC/BMC formulations controlling resin flow, surface finish, and electrical insulation",
      "calcium-carbonate": "Cost-effective high-loading filler for pultrusion profiles, sheet moulding, and artificial stone casting",
      "quartz-powder": "High-hardness silica filler for wear-resistant composite tooling, chemical pipes, and epoxy casting",
      "marble-powder": "Dense casting filler for cultured marble bathtubs, sanitary wash basins, and artificial stone slabs",
      "marble-chips": "Crushed decorative marble fragments embedded into cast polymer vanity tops and architectural panels",
      "french-chalk-powder": "Fine mould release dusting powder and filler for smooth, pinhole-free FRP surface gel coats"
    },
    "searchAliases": [
      "frp",
      "fiberglass",
      "composites",
      "grp",
      "smc",
      "bmc",
      "polyester resin",
      "composite tooling"
    ],
    "defaultNotes": "[Sector Enquiry: FRP and Composite Applications] Composite product: ; Resin or filler needed: ; Target filler loading: ; Volume: ",
    "whatsappPrefill": "Hello Deepali Minerals, I would like to enquire about mineral raw materials for FRP and Composites. Required specifications: "
  },
  {
    "id": "agriculture-allied",
    "slug": "agriculture-allied",
    "name": "Agriculture and Allied Applications",
    "badge": "Soil & Agrochemicals",
    "icon": "sprout",
    "subtitle": "Soil Conditioners, Agrochemical Carriers, Biofertilizer Fillers & Micronutrients",
    "description": "Neutralizing agricultural limes, micronized carrier powders for bio-fertilizers and bio-pesticides, and mineral soil amendments. Deepali Minerals supplies high-purity calcium and magnesium minerals that correct acidic soils, condition agricultural plots, and serve as biologically inert carriers for living microbial bio-fertilizers and pest-control dusts.",
    "regulatoryNotice": "COMMERCIAL QUALIFICATION NOTICE: Deepali Minerals supplies technical and industrial-grade bulk minerals. Prior to formulating direct soil fertilizers or bio-fertilizer carriers, customers must confirm required particle fineness, heavy metal assays, and carrier inertness for specific agricultural formulations.",
    "keyApplications": [
      "Agricultural soil liming for pH correction and calcium/magnesium replenishment",
      "Inert dry carrier powders for bio-fertilizers (Rhizobium, Trichoderma, Azotobacter)",
      "Dry dusting carrier and diluent for agricultural pesticide and fungicide wettable powders",
      "Micronutrient fertilizer blending and soil conditioning amendments"
    ],
    "technicalHighlights": [
      "Agricultural lime and dolomite for correcting soil pH and replenishing vital Ca/Mg nutrients",
      "Chemically inert talc and soapstone carriers preserving living bacterial cultures and shelf-life",
      "Micronized zinc oxide for foliar micronutrient spray formulations and soil zinc blending"
    ],
    "linkedProductSlugs": [
      "hydrated-lime",
      "dolomite-powder",
      "kaoline",
      "soap-stone",
      "talc",
      "calcium-carbonate",
      "zinc-oxide"
    ],
    "productRoles": {
      "hydrated-lime": "Agricultural lime for rapid neutralization of soil acidity, soil flocculation, and calcium enrichment",
      "dolomite-powder": "Slow-release calcium and magnesium soil amendment balancing soil pH and preventing magnesium deficiency",
      "kaoline": "Inert suspension carrier for crop dust formulations, wettable powders, and sunburn protection sprays",
      "soap-stone": "Non-toxic, chemically inert carrier powder for bio-fertilizer formulations and microbial seed inoculants",
      "talc": "Smooth lubricating carrier for bio-fertilizers, dry pesticide dusts, and seed treatment coatings",
      "calcium-carbonate": "Natural calcium nutrient source and neutralizer for fertilizer blending and granulated soil conditioners",
      "zinc-oxide": "High-concentration zinc source for micronutrient fertilizer blending and foliar agricultural sprays"
    },
    "searchAliases": [
      "agriculture",
      "biofertilizers",
      "pesticides",
      "soil conditioning",
      "agrochemicals",
      "fertilizer",
      "lime"
    ],
    "defaultNotes": "[Sector Enquiry: Agriculture and Allied Applications] Application (soil liming/carrier/fertilizer): ; Required mineral: ; Target specification: ; Volume: ",
    "whatsappPrefill": "Hello Deepali Minerals, I would like to enquire about mineral raw materials for Agriculture and Allied Applications. Required specifications: "
  },
  {
    "id": "detergents-household",
    "slug": "detergents-household",
    "name": "Detergents and Household Products",
    "badge": "Cleaning & Detergency",
    "icon": "sparkles",
    "subtitle": "Mild Abrasives, Soap Builders, Bulking Agents & Cleaning Scrubbers",
    "description": "Inert mineral builders, scrubbing abrasives, and anti-caking agents for detergent bars, laundry powders, dishwashing cakes, and industrial cleaners. Deepali Minerals supplies controlled-hardness clays, carbonates, and soapstones that provide effective cleaning power without scratching delicate surfaces, while ensuring uniform bar structure and dry powder flow.",
    "keyApplications": [
      "Laundry detergent bars, washing cakes, and synthetic detergent cakes",
      "Dry laundry detergent washing powders and industrial cleaning formulations",
      "Household scouring powders, abrasive cleaning pastes, and dishwashing bars",
      "Hard-surface cleansers, floor cleaning compounds, and grease-cutting pastes"
    ],
    "technicalHighlights": [
      "Non-scratching Mohs hardness minerals (Talc, China Clay, Calcite) for gentle surface scouring",
      "China clay and soapstone yielding smooth bar consistency, moisture retention, and binder integration",
      "Anti-caking flow aids ensuring free-flowing dry laundry detergent mixes even in humid conditions"
    ],
    "linkedProductSlugs": [
      "china-clay",
      "soap-stone",
      "talc",
      "calcium-carbonate",
      "hydrated-lime",
      "marble-powder",
      "silica"
    ],
    "productRoles": {
      "china-clay": "Functional builder and plasticizer providing smooth bar texture, binding, and soil suspension in detergent cakes",
      "soap-stone": "Mild abrasive and bulking filler for laundry detergent bars, scouring cakes, and cleaning pastes",
      "talc": "Anti-caking flow agent for dry laundry powders and soft lubricant for smooth bar extrusion",
      "calcium-carbonate": "Economical abrasive filler providing scouring power and density in domestic scouring powders and pastes",
      "hydrated-lime": "Alkaline saponification agent, water softening additive in effluent treatment, and chemical builder",
      "marble-powder": "Controlled-grit abrasive for heavy-duty household cleaning powders, tile cleaners, and polishing pastes",
      "silica": "Hard abrasive grit for heavy-duty industrial scouring cleansers, mechanic hand soaps, and rust removers"
    },
    "searchAliases": [
      "detergent",
      "soap",
      "household",
      "cleaning",
      "scouring powder",
      "detergents",
      "washing powder",
      "dishwash"
    ],
    "defaultNotes": "[Sector Enquiry: Detergents and Household Products] Formulation (bar/powder/paste/scourer): ; Required mineral: ; Mesh size: ; Volume: ",
    "whatsappPrefill": "Hello Deepali Minerals, I would like to enquire about mineral raw materials for Detergents and Household Products. Required specifications: "
  },
  {
    "id": "foundry-industrial",
    "slug": "foundry-industrial",
    "name": "Foundry and Industrial Applications",
    "badge": "Casting & Metallurgy",
    "icon": "flame",
    "subtitle": "High-Purity Silica Sands, Refractory Powders, Parting Agents & Core Binders",
    "description": "Refractory quartz sands, silica flours, mould parting dusts, and organic core binders for ferrous and non-ferrous foundry casting operations. Deepali Minerals supplies high-refractoriness minerals that resist thermal shock at molten metal temperatures, prevent sand burn-on, and ensure clean casting strip and dimensional accuracy in metal foundries.",
    "keyApplications": [
      "High-purity mould and core sands for grey iron, ductile iron, steel, and non-ferrous foundries",
      "Refractory mould washes, core washes, and high-temperature furnace coatings",
      "Pattern dusting and parting powders for green sand and shell moulding processes",
      "Cupola slag conditioning, hot metal desulphurization, and furnace lining maintenance"
    ],
    "technicalHighlights": [
      "High-purity silica sand (>98.5% SiO2) with uniform sub-angular grain fineness and low acid demand",
      "Refractory parting powders preventing sand adherence to metal and wood patterns",
      "Starch core binders ensuring robust green strength and clean collapsibility after metal pouring"
    ],
    "linkedProductSlugs": [
      "quartz-sand",
      "quartz-powder",
      "soap-stone",
      "french-chalk-powder",
      "talc",
      "starch",
      "hydrated-lime",
      "marble-powder",
      "silica",
      "dolomite-powder"
    ],
    "productRoles": {
      "quartz-sand": "High-purity sub-angular silica sand for green sand moulds, shell moulding, and resin-coated core sand",
      "quartz-powder": "Refractory silica flour for refractory mould coatings, zircon wash substitutes, and foundry washes",
      "soap-stone": "Foundry mould dusting and parting powder preventing sand adherence to metal patterns",
      "french-chalk-powder": "Superfine parting powder for non-ferrous casting patterns, core boxes, and foundry moulds",
      "talc": "Refractory parting dust and anti-stick release agent for high-precision casting patterns",
      "starch": "Foundry core binder and green sand additive providing green compressive strength and clean thermal breakdown",
      "hydrated-lime": "Slag conditioning flux and hot metal desulphurization additive in electric arc and induction furnaces",
      "marble-powder": "Calcium carbonate fluxing agent for foundry cupolas, slag formation, and metal purification",
      "silica": "High-temperature refractory sand and grains for furnace linings, ramming mass, and foundry patches",
      "dolomite-powder": "Refractory fettling material and dead-burnt dolomite precursor for steel foundry furnace hearths"
    },
    "searchAliases": [
      "foundry",
      "foundary",
      "casting",
      "moulding",
      "core sand",
      "parting powder",
      "metallurgy",
      "refractory"
    ],
    "defaultNotes": "[Sector Enquiry: Foundry and Industrial Applications] Casting process (green sand/shell/core): ; Required mineral: ; AFS/Mesh requirement: ; Volume: ",
    "whatsappPrefill": "Hello Deepali Minerals, I would like to enquire about mineral raw materials for Foundry and Industrial Applications. Required specifications: "
  },
  {
    "id": "plywood",
    "slug": "plywood",
    "name": "Plywood",
    "badge": "Wood & Laminates",
    "icon": "box",
    "subtitle": "Resin Adhesive Extenders, Gap-Filling Fillers & Viscosity Stabilizers",
    "description": "Mineral extenders and fillers for urea-formaldehyde (UF) and phenol-formaldehyde (PF) adhesive glue lines in plywood, block boards, and flush doors. Deepali Minerals supplies fine clays and mineral carbonates that prevent resin bleed-through onto face veneers, extend glue pot life, and enhance shear bond strength under hot press conditions.",
    "keyApplications": [
      "Plywood glue line extension for commercial (MR) and boiling waterproof (BWP) grades",
      "Block board, flush door, and particle board adhesive compounding",
      "Decorative laminate backing adhesives and veneer hot-pressing formulations",
      "Industrial wood sealers, putty formulations, and edge-banding adhesives"
    ],
    "technicalHighlights": [
      "Effectively prevents resin bleed-through onto delicate decorative face veneers during hot pressing",
      "Stabilizes glue line viscosity and extends adhesive pot life in ambient workshop temperatures",
      "Enhances bond shear strength while reducing costly synthetic resin consumption"
    ],
    "linkedProductSlugs": [
      "china-clay",
      "calcium-carbonate",
      "talc",
      "soap-stone",
      "silica"
    ],
    "productRoles": {
      "china-clay": "Premier extender for UF and PF plywood resin adhesives preventing glue penetration through face veneers",
      "calcium-carbonate": "Economical high-purity filler for wood adhesives, resin glues, and flush door core bonding",
      "talc": "Lubricating mineral extender improving glue spreadability, gap-filling capacity, and viscosity stability",
      "soap-stone": "Inert, low-cost mineral extender for particle board and commercial plywood glue mixes",
      "silica": "Fine silica flour additive improving glue line hardness, moisture barrier, and adhesive shear resistance"
    },
    "searchAliases": [
      "plywood",
      "plywood industry",
      "blockboard",
      "flush doors",
      "uf glue",
      "wood adhesive",
      "resin extender"
    ],
    "defaultNotes": "[Sector Enquiry: Plywood] Resin type (UF/PF/Melamine): ; Product (plywood/blockboard/flush door): ; Required mineral: ; Volume: ",
    "whatsappPrefill": "Hello Deepali Minerals, I would like to enquire about mineral raw materials for Plywood. Required specifications: "
  },
  {
    "id": "wall-putty-nc-putty",
    "slug": "wall-putty-nc-putty",
    "name": "Wall Putty and NC Putty",
    "badge": "Surface Preparation",
    "icon": "brush",
    "subtitle": "Micronized Calcite, Fine Talc & Marble Powders for Cementitious & Body Putties",
    "description": "High-brightness white mineral bases engineered for cement-based wall putties, acrylic skim coats, and automotive nitrocellulose (NC) body repair putties. Our strictly graded calcite powders, marble flours, and lamellar talcs deliver exceptional whiteness, smooth knife trowelability, zero pinholing, and effortless feather-edge sandability.",
    "keyApplications": [
      "White cement-based dry wall putties for interior and exterior masonry wall leveling",
      "Ready-to-use acrylic paste putties and decorative architectural skim coats",
      "Automotive nitrocellulose (NC) body putties, knifing fillers, and spot repair putties",
      "Wood putties, primer surfacers, and industrial metal repair paste compounds"
    ],
    "technicalHighlights": [
      "Optimum particle size distribution (300 to 800 mesh) providing easy trowel glide and high square-foot coverage",
      "Exceptional whiteness (>94-96% L-value) creating an ultra-bright, uniform substrate for paint topcoats",
      "Fine talc and french chalk imparting feather-edge sandability without clogging sandpaper or producing pinholes"
    ],
    "linkedProductSlugs": [
      "calcium-carbonate",
      "dolomite-powder",
      "marble-powder",
      "talc",
      "french-chalk-powder",
      "china-clay",
      "soap-stone",
      "silica"
    ],
    "productRoles": {
      "calcium-carbonate": "Primary high-brightness calcite base mineral for white cement and acrylic wall putties",
      "dolomite-powder": "Dense, high-whiteness mineral bulk filler providing structural volume and weather resistance in wall putties",
      "marble-powder": "Micro-fine crystalline marble flour imparting superior whiteness, smooth finish, and water resistance",
      "talc": "Essential knife-grade smoothing agent providing easy butter-like trowelability, sandability, and anti-cracking in NC putty",
      "french-chalk-powder": "Ultra-fine talc ensuring feather-edge blending and zero pinholing in automotive NC knifing putty",
      "china-clay": "Rheology modifier, suspension agent, and anti-shrinkage clay filler in acrylic and paste putties",
      "soap-stone": "Lubricious mineral filler for industrial body fillers and economical knifing putty formulations",
      "silica": "Micronized silica flour imparting surface hardness, scratch resistance, and adhesion in heavy-duty repair putties"
    },
    "searchAliases": [
      "wall putty",
      "nc putty",
      "putty",
      "skim coat",
      "body filler",
      "cement putty",
      "acrylic putty"
    ],
    "defaultNotes": "[Sector Enquiry: Wall Putty and NC Putty] Putty type (cement wall putty/acrylic/NC body putty): ; Required mineral: ; Mesh/Whiteness requirement: ; Volume: ",
    "whatsappPrefill": "Hello Deepali Minerals, I would like to enquire about mineral raw materials for Wall Putty and NC Putty. Required specifications: "
  },
  {
    "id": "fibre-murti",
    "slug": "fibre-murti",
    "name": "Fibre Murti",
    "badge": "Idols & Artware",
    "icon": "gem",
    "subtitle": "Polyester Casting Resins, Marble Flours & Heavy Density Fillers for Statues & Artware",
    "description": "Formulation minerals, casting resins, and mould-release dusting powders specialized for religious idols, architectural statues, and fiberglass craft mouldings. Deepali Minerals supplies premium unsaturated polyester resins and super-white marble powders that impart authentic stone density, crisp surface detail, and crack-free curing in silicone and FRP moulds.",
    "keyApplications": [
      "Religious deity idols, fiberglass murtis, and devotional temple statuary",
      "Architectural fiberglass domes, ornamental pillars, jali panels, and decorative reliefs",
      "Cold-cast marble figurines, simulated stone sculptures, and museum replicas",
      "Theatrical props, themed park sculptures, and decorative artware castings"
    ],
    "technicalHighlights": [
      "Clear and thixotropic polyester casting resins with controlled curing and low peak exotherm",
      "Super-white marble flour producing authentic carved-stone aesthetics, surface shine, and realistic weight",
      "French chalk and talc ensuring crisp detail replication and clean, flawless mould separation"
    ],
    "linkedProductSlugs": [
      "polyester-resin",
      "marble-powder",
      "calcium-carbonate",
      "talc",
      "marble-chips",
      "french-chalk-powder",
      "silica"
    ],
    "productRoles": {
      "polyester-resin": "Primary thermosetting binder resin for casting, laminating, and fabricating fiberglass murtis and statues",
      "marble-powder": "Super-white crystalline casting filler blended with resin to give statues realistic stone weight and marble finish",
      "calcium-carbonate": "Dense white filler reducing resin consumption, controlling exotherm, and providing solid casting weight",
      "talc": "Lubricating filler promoting smooth resin flow into intricate mould details, sharp facial lines, and crack prevention",
      "marble-chips": "Heavy marble fragments used as internal core weighting aggregates in large hollow statue bases",
      "french-chalk-powder": "Silky parting dust applied to silicone and FRP moulds for flawless, defect-free statue demoulding",
      "silica": "Reinforcing mineral flour for high-strength internal statue armature bonding and base stability"
    },
    "searchAliases": [
      "fibre murti",
      "murti",
      "statues",
      "idols",
      "artware",
      "crafts",
      "casting resin",
      "marble statue"
    ],
    "defaultNotes": "[Sector Enquiry: Fibre Murti] Statue type (idols/architectural/casting): ; Required resin/filler: ; Volume: ",
    "whatsappPrefill": "Hello Deepali Minerals, I would like to enquire about mineral raw materials for Fibre Murti. Required specifications: "
  },
  {
    "id": "gulal-rangoli",
    "slug": "gulal-rangoli",
    "name": "Gulal and Rangoli",
    "badge": "Festive & Decorative",
    "icon": "sun",
    "subtitle": "Silky Mineral Bases, Vibrant Dry Carriers & Free-Flowing Floor Color Minerals",
    "description": "Natural talcs, starches, and calcium carbonates used as safe, soft-textured carriers for herbal Gulal festival powders and free-flowing outdoor Rangoli colors. Deepali Minerals supplies high-brightness white mineral bases that absorb pigments evenly, feel silky smooth on application, and flow freely for intricate floor rangoli patterns.",
    "regulatoryNotice": "IMPORTANT FORMULATION NOTICE: Deepali Minerals supplies technical and industrial-grade mineral base powders. For festive gulal coming into direct skin contact, formulators must blend only certified cosmetic-safe, skin-tested organic dyes, and conduct dermatological verification.",
    "keyApplications": [
      "Herbal and scented festive Gulal (Holi color powders)",
      "Dry powder color concentrates for festivals, color runs, and celebratory events",
      "Free-flowing granular white and colored floor Rangoli powders",
      "Decorative sand art, floral rangoli bases, and ceremonial white floor drawings"
    ],
    "technicalHighlights": [
      "Ultra-soft talc base offering a silky smooth skin feel and gentle touch",
      "High dry pigment absorption delivering vibrant, saturated color development with minimal dye usage",
      "Free-flowing granulated marble and dolomite powders providing sharp, non-spreading floor rangoli lines"
    ],
    "linkedProductSlugs": [
      "talc",
      "chalk-powder",
      "french-chalk-powder",
      "marble-powder",
      "dolomite-powder",
      "china-clay",
      "kaoline",
      "calcium-carbonate"
    ],
    "productRoles": {
      "talc": "Silky, soft base powder for herbal Gulal, imparting superior skin feel, soft glide, and uniform color absorption",
      "chalk-powder": "Traditional soft white mineral base for economical non-toxic festive powders and colored chalk sticks",
      "french-chalk-powder": "Premium silky cosmetic-touch mineral base for high-end scented festive gulal formulations",
      "marble-powder": "Dense, bright white granular base mineral for outdoor floor Rangoli powders and decorative lines",
      "dolomite-powder": "Sparkling white mineral aggregate for free-flowing rangoli powders that hold crisp geometrical patterns",
      "china-clay": "Soft clay carrier enhancing pigment dispersion and adhesion in dry decorative color powders",
      "kaoline": "Ultra-fine soft white kaolin base for smooth herbal gulal formulations and pastel decorative powders",
      "calcium-carbonate": "Economical white bulking carrier for rangoli powders, floor powders, and bulk festive color blends"
    },
    "searchAliases": [
      "gulal",
      "rangoli",
      "gulal / rangoli",
      "colors",
      "festival colors",
      "holi powder",
      "decorative colors"
    ],
    "defaultNotes": "[Sector Enquiry: Gulal and Rangoli] Product (Gulal/Rangoli): ; Required mineral base: ; Mesh size: ; Volume: ",
    "whatsappPrefill": "Hello Deepali Minerals, I would like to enquire about mineral raw materials for Gulal and Rangoli. Required specifications: "
  },
  {
    "id": "tile-adhesives",
    "slug": "tile-adhesives",
    "name": "Tile Adhesives",
    "badge": "Adhesives & Grouts",
    "icon": "grid",
    "subtitle": "Graded Silica Sands, Rheology Modifiers & Fine Carbonate Fillers for Tile Mortars",
    "description": "Strictly graded quartz sands, calcium carbonate extenders, and hydrated lime additives for polymer-modified tile adhesives (Type 1 to Type 4) and tile grouts. Deepali Minerals supplies precisely classified aggregates and mineral powders that ensure high tensile adhesion strength, zero vertical tile slip, extended open time, and non-shrink grout performance.",
    "keyApplications": [
      "Polymer-modified cementitious tile adhesives (Type 1 for ceramic, Type 2 for vitrified, Type 4 for exterior stone)",
      "Cementitious and epoxy tile joint grouts, wall grouts, and swimming pool tile mortars",
      "Large-format porcelain and granite slab fixing mortars and flexible bonding adhesives",
      "Waterproof tile fixing mortars, floor screeds, and self-levelling underlayments"
    ],
    "technicalHighlights": [
      "Sub-angular graded quartz sand (30-60, 40-80, 50-100 mesh) providing high mechanical interlock and slip resistance",
      "Fine calcium carbonate and talc improving open time, buttery trowel glide, and sag resistance on vertical walls",
      "Hydrated lime enhancing chemical bond strength, water retention, and long-term carbonation durability"
    ],
    "linkedProductSlugs": [
      "quartz-sand",
      "calcium-carbonate",
      "hydrated-lime",
      "marble-powder",
      "quartz-powder",
      "silica",
      "talc",
      "marble-chips"
    ],
    "productRoles": {
      "quartz-sand": "Strictly graded silica sand providing tensile adhesion strength, mechanical interlock, and non-shrink performance",
      "calcium-carbonate": "Fine filler optimizing water demand, workability, open time, and trowel slip resistance",
      "hydrated-lime": "Plasticizer and bonding promoter improving water retention and long-term chemical adhesion in tile grouts",
      "marble-powder": "High-whiteness calcium carbonate filler for white tile adhesives, premium wall grouts, and marble mortars",
      "quartz-powder": "Micro-silica flour boosting bond strength, density, and chemical resistance in heavy-duty tile adhesives",
      "silica": "Sub-angular silica flour for waterproof tile adhesives, non-shrink grouts, and pool fixing mortars",
      "talc": "Anti-sagging additive imparting thixotropy and non-slip performance on vertical wall tile installations",
      "marble-chips": "Decorative aggregate for heavy-duty commercial tile joint grouts, epoxy terrazzo joints, and stone grouts"
    },
    "searchAliases": [
      "tile adhesives",
      "tile adhesive",
      "tile grout",
      "dry mix mortar",
      "thinset",
      "polymer mortar"
    ],
    "defaultNotes": "[Sector Enquiry: Tile Adhesives] Adhesive grade (Type 1/Type 2/Grout): ; Required mineral: ; Sand mesh grade: ; Volume: ",
    "whatsappPrefill": "Hello Deepali Minerals, I would like to enquire about mineral raw materials for Tile Adhesives. Required specifications: "
  },
  {
    "id": "cattle-feed",
    "slug": "cattle-feed",
    "name": "Cattle Feed",
    "badge": "Livestock Premixes",
    "icon": "activity",
    "subtitle": "Calcium Carbonate (Calcite) & Mineral Buffers for Livestock Formulation Premixes",
    "description": "High-calcium mineral carbonates and buffering powders utilized in animal nutrition premixes, silage treatment, and agricultural feed manufacturing. Deepali Minerals supplies high-purity limestone and calcite powders providing essential elemental calcium for bone development, milk yield maintenance, and poultry eggshell integrity in formulated livestock feeds.",
    "regulatoryNotice": "MANDATORY REGULATORY COMPLIANCE NOTICE: Deepali Minerals is an industrial mineral supplier. Suitability of calcium carbonate or other minerals for livestock feed, poultry premixes, or animal nutrition is strictly subject to technical review and certified batch assay verifying regulatory limits for heavy metals (fluorine, lead, cadmium, arsenic). Deepali Minerals does NOT represent standard industrial stock as certified feed-grade without prior written technical qualification and batch release assay.",
    "keyApplications": [
      "Dairy cattle mineral mixtures and dietary calcium supplements for milk yield",
      "Poultry layer and broiler feed premixes for skeletal strength and strong eggshells",
      "Silage buffering, pH stabilization, and livestock farm environmental hygiene",
      "Animal feed pelletizing, premix bulking, and anti-caking flow conditioning"
    ],
    "technicalHighlights": [
      "High elemental calcium content (CaCO3 >90-95%) supporting bone mineralization and metabolic health",
      "Strict particle size classification ensuring homogeneous dispersion in bulk automated feed mixers",
      "Anti-caking flow aids preventing moisture clumping and bridging in bulk storage silos"
    ],
    "linkedProductSlugs": [
      "calcium-carbonate",
      "hydrated-lime",
      "dolomite-powder",
      "talc"
    ],
    "productRoles": {
      "calcium-carbonate": "Primary calcium mineral supplement in poultry and cattle feed premixes for bone and eggshell formation",
      "hydrated-lime": "pH buffer for agricultural silage treatment and technical livestock farm sanitization",
      "dolomite-powder": "Dual source of calcium and magnesium minerals for commercial agricultural livestock mineral blocks",
      "talc": "Inert anti-caking flow aid and pelletizing lubricant for bulk feed concentrates and premixes"
    },
    "searchAliases": [
      "cattle feed",
      "animal feed",
      "feed",
      "livestock",
      "poultry feed",
      "calcium supplement",
      "mineral mixture"
    ],
    "defaultNotes": "[Sector Enquiry: Cattle Feed] Feed type (dairy cattle/poultry/premix): ; Required mineral: ; Mesh/Assay requirement: ; Volume: ",
    "whatsappPrefill": "Hello Deepali Minerals, I would like to enquire about mineral raw materials for Cattle Feed. Required specifications: "
  },
  {
    "id": "fire-safety",
    "slug": "fire-safety",
    "name": "Fire Safety",
    "badge": "Flame Retardance",
    "icon": "shield-alert",
    "subtitle": "Endothermic Fillers, Cable Jacket Minerals & High-Temperature Barrier Compounds",
    "description": "Hydrated minerals, barium sulphate, and calcium carbonates used in flame-retardant polymer formulations, fire-stop mastics, and low-smoke halogen-free (LSHF) cables. Deepali Minerals supplies high-purity inert mineral fillers that assist in endothermic cooling, char stabilization, and smoke reduction when exposed to high thermal environments.",
    "regulatoryNotice": "TECHNICAL GOVERNANCE NOTICE: Mineral fillers contribute endothermic cooling, char formation, and smoke suppression in compounded plastics and rubbers. However, official fire ratings (UL 94 V-0, LOI, BS 476, ASTM E84) depend entirely on the customer's finished formulation and curing process. Deepali Minerals supplies raw industrial mineral fillers and does not provide standalone certified fire-retardant compound guarantees.",
    "keyApplications": [
      "Low Smoke Zero Halogen (LSZH / LSHF) wire and cable compounding",
      "Fire-stop mastics, intumescent sealant formulations, and thermal barrier coatings",
      "Flame-retardant thermoplastic and rubber goods for public transit and construction",
      "Radiation shielding, sound deadening, and high-temperature fire barrier mastics"
    ],
    "technicalHighlights": [
      "Talc lamellar crystals forming insulating ceramic char layers under direct flame impingement",
      "High-purity barytes imparting high density, heat absorption, and acoustic dampening in barrier coats",
      "Controlled chemical purity and low electrolyte content preventing electrical breakdown in cable compounds"
    ],
    "linkedProductSlugs": [
      "talc",
      "hydrated-lime",
      "calcium-carbonate",
      "barytes"
    ],
    "productRoles": {
      "talc": "Endothermic and char-forming mineral filler for flame-retardant PP, nylon, and cable sheath compounds",
      "hydrated-lime": "Acidic gas neutralizer for fire suppression flue gases and high-temperature refractory bonding",
      "calcium-carbonate": "Cost-effective endothermic mineral filler for fire-retardant carpet backings, sealants, and PVC cable jackets",
      "barytes": "Heavy barium sulphate filler providing extreme density, radiation absorption, and thermal barrier mass in fire-stop compounds"
    },
    "searchAliases": [
      "fire safety",
      "fire retardant",
      "flame retardant",
      "cables",
      "lshf",
      "fire barrier",
      "smoke suppressant"
    ],
    "defaultNotes": "[Sector Enquiry: Fire Safety] Application (LSZH cables/fire-stop sealant/plastic): ; Required mineral: ; Target flame retardance: ; Volume: ",
    "whatsappPrefill": "Hello Deepali Minerals, I would like to enquire about mineral raw materials for Fire Safety. Required specifications: "
  },
  {
    "id": "gym-powder",
    "slug": "gym-powder",
    "name": "Gym Powder Applications",
    "badge": "Athletic Grip",
    "icon": "dumbbell",
    "subtitle": "Magnesium Carbonate (Athletic Chalk) & Moisture-Absorbing Barrier Minerals",
    "description": "High-purity basic magnesium carbonate and french chalk used for maximum hand grip, moisture absorption, and friction control in gymnastics, rock climbing, and weightlifting. Deepali Minerals supplies light magnesium carbonates that absorb perspiration rapidly, keeping hands dry and preventing slipping during high-intensity athletic performance.",
    "regulatoryNotice": "APPLICATION ADVISORY: Deepali Minerals supplies technical and athletic-grade magnesium carbonate and french chalk for grip, sweat absorption, and sports equipment handling. Batches are packed in bulk industrial packaging. For retail branding or direct consumer packaging, buyers should ensure individual dermal compatibility testing.",
    "keyApplications": [
      "Athletic gym chalk for powerlifting, Olympic weightlifting, and CrossFit",
      "Rock climbing chalk (loose chalk and chalk block formulation)",
      "Gymnastics beam, bars, and vault hand friction powder",
      "Sports equipment handling, racket grip dusting, and friction barrier powder"
    ],
    "technicalHighlights": [
      "Basic light magnesium carbonate absorbing multiple times its weight in skin perspiration",
      "Non-toxic, clean mineral composition providing instant high-friction grip without greasy residue",
      "French chalk providing smooth friction control for gymnastics apparatus and sports accessories"
    ],
    "linkedProductSlugs": [
      "magnesium-carbonate",
      "french-chalk-powder",
      "talc"
    ],
    "productRoles": {
      "magnesium-carbonate": "Premier athletic gym chalk for weightlifting, gymnastics, and climbing, absorbing sweat to create maximum friction",
      "french-chalk-powder": "Fine mineral dusting powder for athletic equipment handling, gymnastics accessories, and grip control",
      "talc": "Anti-friction dusting agent for gym equipment mats, weight training gear, and athletic accessories"
    },
    "searchAliases": [
      "gym powder",
      "gym chalk",
      "athletic chalk",
      "weightlifting chalk",
      "climbing chalk",
      "magnesium carbonate",
      "grip powder"
    ],
    "defaultNotes": "[Sector Enquiry: Gym Powder Applications] Product (chalk powder/blocks/equipment grip): ; Required mineral: ; Packaging format: ; Volume: ",
    "whatsappPrefill": "Hello Deepali Minerals, I would like to enquire about mineral raw materials for Gym Powder Applications. Required specifications: "
  }
];

  // Bidirectional link: resolve actual product objects inside canonicalIndustries
  canonicalIndustries.forEach(function (ind) {
    ind.products = ind.linkedProductSlugs.map(function (slug) {
      return products.find(function (p) { return p.slug === slug || p.id === slug; });
    }).filter(Boolean);
  });

  // Bidirectional link: attach canonicalIndustries to products
  canonicalIndustries.forEach(function (ind) {
    ind.linkedProductSlugs.forEach(function (slug) {
      var prod = products.find(function (p) { return p.slug === slug || p.id === slug; });
      if (prod) {
        if (!prod.canonicalIndustries) prod.canonicalIndustries = [];
        if (prod.canonicalIndustries.indexOf(ind.name) === -1) prod.canonicalIndustries.push(ind.name);
        if (!prod.industries) prod.industries = [];
        if (prod.industries.indexOf(ind.name) === -1) prod.industries.push(ind.name);
      }
    });
  });

  const masterTaxonomy = [
    {
      id: 'home-household',
      name: 'Home / Household Applications',
      slug: 'home-household',
      sheetIndex: 'A',
      badge: 'Cleaning & Formulations',
      subtitle: 'Mineral Materials for Household Cleaning, Scouring & Formulation Products',
      description: 'Mineral powders utilized in household formulations, scouring compounds, domestic whitening agents and chemical neutralizing preparations. Final application suitability and specific formulation compatibility to be confirmed with Deepali Minerals commercial desk.',
      applicationDetails: [
        'Scouring powders, abrasive domestic cleaners and scouring pastes',
        'Household surface polishing and cleaning formulations',
        'Domestic whitening, filler and pH buffering applications',
        'Formulation suitability and grade confirmation with commercial desk'
      ],
      linkedProductSlugs: ['talc', 'calcium-carbonate', 'silica', 'hydrated-lime'],
      uncataloguedMaterials: [],
      safetyNotice: 'Confirm intended domestic product type and grade specifications prior to procurement. Deepali Minerals supplies bulk industrial raw minerals.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['home applications', 'household', 'household cleaners', 'cleaning powder', 'domestic polish', 'scouring powder', 'home'],
      ctaText: 'ENQUIRE FOR HOME & HOUSEHOLD APPLICATIONS',
      defaultNotes: '[Sector Enquiry: Home & Household Applications] Product type: ; Intended cleaning/household use: ; Required material: ; Quantity: '
    },
    {
      id: 'agriculture',
      name: 'Agriculture',
      slug: 'agriculture',
      sheetIndex: 'B',
      badge: 'Soil Amendment & Crop Care',
      subtitle: 'Mineral Materials for Soil Conditioning, Carrier Dusts & Crop Formulations',
      description: 'Industrial minerals used as inert carriers for agricultural dusting powders, soil acidity neutralizers, anti-caking agents, and micronutrient zinc supplement compounding.',
      applicationDetails: [
        'Soil acidity neutralization and agricultural conditioning',
        'Inert carriers and diluents for dry agricultural dusting powders',
        'Anti-caking and moisture-absorption conditioning for fertilizers',
        'Micronutrient zinc source for agricultural formulations'
      ],
      linkedProductSlugs: ['talc', 'soap-stone', 'kaoline', 'calcium-carbonate', 'zinc-oxide'],
      uncataloguedMaterials: [],
      safetyNotice: 'Standard industrial-grade materials; agricultural and crop-use suitability depends on confirmed chemical assay and particle size distribution.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['agriculture', 'agricultural minerals', 'soil conditioner', 'crop dusting', 'fertilizer carrier', 'farm minerals'],
      ctaText: 'ENQUIRE FOR AGRICULTURAL MINERALS',
      defaultNotes: '[Sector Enquiry: Agriculture] Crop/soil application: ; Formulation role (carrier/conditioner): ; Required material: ; Quantity: '
    },
    {
      id: 'plastic',
      name: 'Plastic',
      slug: 'plastic',
      sheetIndex: 'C',
      badge: 'Polymer Compounding',
      subtitle: 'Mineral Fillers, Reinforcing Powders & Lubricants for Plastics Compounding',
      description: 'High-performance mineral fillers and functional processing additives engineered for thermoplastics, masterbatches, extrusion profiles, and injection moulding.',
      applicationDetails: [
        'Functional extenders and impact modifiers for PP, PE and engineering polymers',
        'Dimensional stability and heat-deflection temperature (HDT) improvement',
        'Internal and external lubrication via zinc stearates',
        'High whiteness and smooth surface finish optimization'
      ],
      linkedProductSlugs: ['talc', 'soap-stone', 'calcium-carbonate', 'zinc-stearates'],
      uncataloguedMaterials: [],
      safetyNotice: 'Technical grade, mesh size and stearic acid coating specifications to be verified against compounding matrix.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['plastic', 'plastics', 'polymer compounding', 'thermoplastics', 'polypropylene', 'polyethylene', 'masterbatch filler'],
      ctaText: 'ENQUIRE FOR PLASTICS COMPOUNDING',
      defaultNotes: '[Sector Enquiry: Plastic] Base polymer: ; Processing type (extrusion/injection): ; Required mineral: ; Target loading: '
    },
    {
      id: 'putty',
      name: 'Putty',
      slug: 'putty',
      sheetIndex: 'D',
      badge: 'Body & Repair Putty',
      subtitle: 'Extenders and Mineral Powders for Industrial & Architectural Putty',
      description: 'Fine natural minerals processed to provide body, knifing smoothness, high solids content, and exceptional sandability in putty formulations.',
      applicationDetails: [
        'Body building and volume extension in oil, resin and knifing putties',
        'Smooth spreading and sag resistance for vertical knife applications',
        'Fast drying and easy feather-edge sanding properties',
        'High whiteness and consistent batch-to-batch fineness'
      ],
      linkedProductSlugs: ['french-chalk-powder', 'talc', 'soap-stone', 'calcium-carbonate', 'silica'],
      uncataloguedMaterials: [],
      safetyNotice: 'Formulation performance depends on binder selection (polyester, alkyd, or acrylic) and oil absorption parameters.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['putty', 'knifing putty', 'body putty', 'industrial putty', 'wood putty', 'sanding putty'],
      ctaText: 'ENQUIRE FOR PUTTY MATERIALS',
      defaultNotes: '[Sector Enquiry: Putty] Putty type: ; Binder system: ; Required mineral: ; Mesh fineness: '
    },
    {
      id: 'soap',
      name: 'Soap',
      slug: 'soap',
      sheetIndex: 'E',
      badge: 'Toilet & Laundry Soaps',
      subtitle: 'Mineral Fillers & Structuring Powders for Soap & Detergent Bars',
      description: 'Selected soft mineral powders and clays utilized as functional structuring agents, opacity enhancers, and cost extenders in toilet soaps, laundry bars and washing cakes.',
      applicationDetails: [
        'Softness, slip, and smooth lathering enhancement in soap bars',
        'Structural firmness, bar hardness, and wear-rate control',
        'High natural whiteness and opacity for laundry and toilet soaps',
        'Controlled low grit content for skin comfort and product consistency'
      ],
      linkedProductSlugs: ['talc', 'soap-stone', 'kaoline', 'china-clay', 'titanium-dioxide'],
      uncataloguedMaterials: [],
      safetyNotice: 'Sourced as industrial raw materials; skin contact and cosmetic grade certification must be confirmed for specific commercial batches.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['soap', 'soap manufacturing', 'soap noodles filler', 'laundry soap', 'toilet soap', 'soapstone powder'],
      ctaText: 'ENQUIRE FOR SOAP MANUFACTURING',
      defaultNotes: '[Sector Enquiry: Soap] Soap bar type: ; Formulation role (filler/structurant): ; Required material: ; Quantity: '
    },
    {
      id: 'footwear',
      name: 'Footwear',
      slug: 'footwear',
      sheetIndex: 'F',
      badge: 'Soles & Slipper Sheets',
      subtitle: 'Mineral Compounding Materials for Rubber Soles, EVA & Microcellular Footwear',
      description: 'Fine minerals, reinforcing clays, and activators engineered for EVA slippers, vulcanized rubber outsoles, polyurethane midsoles, and hawai chappal compounding.',
      applicationDetails: [
        'Volume loading, hardness, and abrasion resistance in shoe soles',
        'Anti-tack surface dusting for uncured rubber sheets and footwear blanks',
        'Inorganic vulcanization activation via zinc oxide',
        'Lubrication and mould release during high-speed sole compression'
      ],
      linkedProductSlugs: ['calcium-carbonate', 'talc', 'zinc-stearates', 'chalk-powder', 'china-clay', 'zinc-oxide'],
      uncataloguedMaterials: [],
      safetyNotice: 'Physical specifications including particle size, bulk density, and dispersion kinetics to be matched with sole compounding recipe.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['footwear', 'shoe soles', 'hawai chappal', 'eva footwear', 'rubber soles', 'footwear compounding'],
      ctaText: 'ENQUIRE FOR FOOTWEAR COMPOUNDING',
      defaultNotes: '[Sector Enquiry: Footwear] Compound type (EVA/Rubber/PU): ; Soling component: ; Required material: ; Quantity: '
    },
    {
      id: 'pesticides',
      name: 'Pesticides',
      slug: 'pesticides',
      sheetIndex: 'G',
      badge: 'Carrier & Formulation Dusts',
      subtitle: 'Inert Mineral Carriers and Diluents for Agrochemical Formulations',
      description: 'Chemically inert, low-abrasion mineral carriers and diluents engineered for wettable powders (WP), dustable powders (DP), and granular agrochemical pesticides.',
      applicationDetails: [
        'High liquid absorbency and active ingredient carrier capability',
        'Non-abrasive particle morphology to protect spray nozzles and dusting equipment',
        'Neutral pH and chemical inertness to prevent active ingredient degradation',
        'Uniform particle suspension kinetics in wettable formulation tanks'
      ],
      linkedProductSlugs: ['china-clay', 'kaoline', 'talc', 'soap-stone', 'hydrated-lime'],
      uncataloguedMaterials: [
        { name: "Calcite Powder", status: "Specialty Sourced Grade", notes: "Micronized calcite powder supplied to specific mesh and purity criteria on enquiry." }
      ],
      safetyNotice: 'Raw mineral carriers; biological efficacy and active ingredient compatibility must be tested by the agrochemical formulator.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['pesticides', 'agrochemical carrier', 'wettable powder', 'dusting carrier', 'insecticide diluent'],
      ctaText: 'ENQUIRE FOR PESTICIDE CARRIERS',
      defaultNotes: '[Sector Enquiry: Pesticides] Agrochemical formulation (WP/DP/Granule): ; Active ingredient: ; Required carrier: ; Mesh size: '
    },
    {
      id: 'detergent',
      name: 'Detergent',
      slug: 'detergent',
      sheetIndex: 'H',
      badge: 'Washing Powders & Cakes',
      subtitle: 'Mineral Builders, Extenders & Scouring Agents for Detergent Formulations',
      description: 'Granular and pulverized mineral powders providing density, flowability, mechanical soil detachment, and cost optimization in detergent powders and washing bars.',
      applicationDetails: [
        'Bulk density control and anti-caking performance in spray-dried and dry-mix powders',
        'Mechanical scouring action without aggressive substrate scratching',
        'Alkaline buffering and water softening support',
        'High natural brightness and pure white appearance for laundry formulations'
      ],
      linkedProductSlugs: ['marble-powder', 'talc', 'soap-stone', 'china-clay', 'kaoline'],
      uncataloguedMaterials: [
        { name: "Calcite Powder", status: "Specialty Sourced Grade", notes: "Bulk density and scouring grade calcite supplied on enquiry." }
      ],
      safetyNotice: 'Sourced as industrial mineral raw materials; batch-to-batch brightness and soluble salts to be confirmed on enquiry.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['detergent', 'washing powder', 'detergent cake', 'laundry powder filler', 'detergent builder'],
      ctaText: 'ENQUIRE FOR DETERGENT MINERALS',
      defaultNotes: '[Sector Enquiry: Detergent] Detergent format (powder/bar): ; Target bulk density: ; Required mineral: ; Quantity: '
    },
    {
      id: 'construction',
      name: 'Construction',
      slug: 'construction',
      sheetIndex: 'I',
      badge: 'Mortars & Building Materials',
      subtitle: 'Mineral Powders, Lime & Aggregates for Construction Chemicals & Masonry',
      description: 'Heavy-duty mineral materials for mortars, plasters, soil stabilization, building chemicals, precast terrazzo elements, and road subgrades.',
      applicationDetails: [
        'High available calcium hydroxide for masonry mortars and chemical plasters',
        'Crushed marble powder for decorative flooring and cementitious skim coats',
        'Graded silica and quartz sand for structural grouts, screeds, and mortars',
        'Soil stabilization and alkaline treatment for civil engineering works'
      ],
      linkedProductSlugs: ['marble-powder', 'hydrated-lime', 'quartz-sand', 'silica'],
      uncataloguedMaterials: [],
      safetyNotice: 'Structural performance depends on binder (cement/lime) ratios and water-cement compliance.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['construction', 'building materials', 'masonry', 'plaster', 'civil engineering', 'mortar lime'],
      ctaText: 'ENQUIRE FOR CONSTRUCTION MATERIALS',
      defaultNotes: '[Sector Enquiry: Construction] Building application: ; Required material: ; Gradation/mesh: ; Delivery destination: '
    },
    {
      id: 'eva',
      name: 'EVA',
      slug: 'eva',
      sheetIndex: 'J',
      badge: 'Copolymer Compounding',
      subtitle: 'Functional Fillers, Activators & Pigments for Ethylene Vinyl Acetate Compounding',
      description: 'Precision minerals engineered for EVA injection foam moulding, expansion sheets, packaging foams, and athletic midsoles requiring high resilience.',
      applicationDetails: [
        'Cell structure regulation, expansion ratio control, and hardness in EVA foams',
        'Cross-linking and vulcanization activation via French-process Zinc Oxide',
        'Pure white pigmentation and UV shielding via Titanium Dioxide',
        'Microfine Calcium Carbonate for shrinkage control and volume economics'
      ],
      linkedProductSlugs: ['calcium-carbonate', 'talc', 'titanium-dioxide', 'zinc-oxide'],
      uncataloguedMaterials: [],
      safetyNotice: 'EVA foam density and expansion behavior depend on blowing agent/activator kinetics and filler dispersion quality.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['eva', 'ethylene vinyl acetate', 'eva sheets', 'eva foam', 'eva slippers', 'eva crosslinking'],
      ctaText: 'ENQUIRE FOR EVA COMPOUNDING',
      defaultNotes: '[Sector Enquiry: EVA] Expansion ratio: ; Product format (sheet/injected foam): ; Required material: ; Quantity: '
    },
    {
      id: 'biofertilizers',
      name: 'Biofertilizers',
      slug: 'biofertilizers',
      sheetIndex: 'K',
      badge: 'Microbial Carrier Media',
      subtitle: 'Inert Mineral Carrier Powders for Microbial Inoculants & Organic Fertilizers',
      description: 'Porous and non-toxic mineral powders functioning as protective solid carrier media for Rhizobium, Azotobacter, PSB, and mycorrhizal biofertilizers.',
      applicationDetails: [
        'High surface area and moisture retention to support microbial shelf-life',
        'Non-toxic, neutral pH buffering for delicate biological cultures',
        'Particle sizing for smooth drill application and seed coating',
        'Natural mineral purity free from biocidal heavy metal contaminants'
      ],
      linkedProductSlugs: ['talc', 'soap-stone', 'china-clay', 'silica', 'calcium-carbonate'],
      uncataloguedMaterials: [
        { name: "Celite (Diatomite)", status: "Specialty Sourced Grade", notes: "Inert microbial carrier and moisture retention medium available on technical enquiry." }
      ],
      safetyNotice: 'Microbial shelf-life depends on carrier sterilization, moisture content, and packaging barrier properties.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['biofertilizers', 'biofertilizer carrier', 'microbial inoculant', 'rhizobium carrier', 'organic fertilizer'],
      ctaText: 'ENQUIRE FOR BIOFERTILIZER CARRIERS',
      defaultNotes: '[Sector Enquiry: Biofertilizers] Inoculant type: ; Carrier role: ; Required material: ; Mesh size/sterilization requirement: '
    },
    {
      id: 'cattle-feed',
      name: 'Cattle Feed',
      slug: 'cattle-feed',
      sheetIndex: 'L & AE',
      badge: 'Application Enquiry',
      subtitle: 'Enquiries for Mineral Ingredients Used in Animal Feed & Cattle Nutrition Formulations',
      description: 'Mineral materials such as Calcium Carbonate are widely utilized in animal nutrition as dietary calcium supplements and carrier grits. Deepali Minerals invites commercial enquiries and technical discussions regarding grade specifications, purity, and availability.',
      applicationDetails: [
        'Dietary calcium supplementation in cattle and poultry feed rations',
        'Mineral carrier and flow conditioning in premixes',
        'Technical consultation on particle size distribution and calcium assay',
        'Sourcing and verification pathway for livestock feed compounders'
      ],
      linkedProductSlugs: ['calcium-carbonate', 'hydrated-lime', 'talc'],
      uncataloguedMaterials: [
        { name: "Celite (Carrier Grade)", status: "Specialty Sourced Grade", notes: "Inert mineral carrier and flow conditioning aid for animal feed premixes." }
      ],
      safetyNotice: 'Deepali Minerals supplies industrial-grade minerals. Feed-grade suitability, purity, heavy metal limits, and animal nutrition compliance must be confirmed directly with Deepali Minerals prior to supply. Do not claim feed-grade status, animal nutrition compliance, or regulatory certification unless verified.',
      validationStatus: 'Feed-Grade Technical Consultation',
      searchAliases: ['cattle feed', 'animal feed', 'feed grade calcium carbonate', 'poultry grit', 'calcium feed supplement'],
      ctaText: 'ENQUIRE FOR CATTLE FEED APPLICATIONS',
      defaultNotes: '[Sector Enquiry: Cattle Feed Industry] Feed type: ; Intended role: ; Required grade/purity: ; Delivery destination: '
    },
    {
      id: 'rigid-pvc',
      name: 'Rigid PVC',
      slug: 'rigid-pvc',
      sheetIndex: 'M',
      badge: 'Pipes & Extrusion Profiles',
      subtitle: 'Extenders, Lubricants & Stabilizing Minerals for Unplasticized Polyvinyl Chloride (uPVC)',
      description: 'Engineered mineral fillers and processing additives optimized for rigid PVC conduits, pressure pipes, agricultural piping, window profiles, and drainage fittings.',
      applicationDetails: [
        'Impact resistance, tensile strength, and flexural modulus enhancement in uPVC',
        'Stearic acid coated Calcium Carbonate for high filler loadings and low torque',
        'Internal and external metal soap lubrication with Zinc Stearate',
        'Heat stabilization and thermal endurance support with Zinc Oxide',
        'Weatherability, UV resistance, and exterior profile whiteness via Titanium Dioxide'
      ],
      linkedProductSlugs: ['calcium-carbonate', 'talc', 'soap-stone', 'china-clay', 'zinc-stearates', 'zinc-oxide', 'titanium-dioxide'],
      uncataloguedMaterials: [],
      safetyNotice: 'Formulation performance depends on resin K-value, screw configuration, and stabilizer/lubricant balance.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['rigid pvc', 'upvc', 'pvc pipes', 'pvc profiles', 'pvc compounding', 'calcium carbonate for pvc', 'pvc'],
      ctaText: 'ENQUIRE FOR RIGID PVC MATERIALS',
      defaultNotes: '[Sector Enquiry: Rigid PVC] Extrusion application (pipes/profiles): ; Target CaCO3 loading: ; Required materials: ; Quantity: '
    },
    {
      id: 'wall-putty',
      name: 'Wall Putty',
      slug: 'wall-putty',
      sheetIndex: 'N',
      badge: 'Cementitious Skim Coats',
      subtitle: 'High-Whiteness Minerals for White Cement Wall Putty & Texture Coats',
      description: 'Screened natural marble powders, superfine talc, and dolomite minerals engineered for white cement wall putties, skim coats, and exterior texture plasters.',
      applicationDetails: [
        'Exceptional natural whiteness and brilliant brightness for cementitious coats',
        'Controlled particle gradation to ensure tight pore closure and water repellency',
        'Smooth troweling workability and reduced applicator blade friction',
        'Superior adhesion, substrate tensile bond, and crack resistance'
      ],
      linkedProductSlugs: ['marble-powder', 'talc', 'dolomite-powder'],
      uncataloguedMaterials: [
        { name: "Calcite Powder", status: "Specialty Sourced Grade", notes: "High-whiteness micronized extender for cementitious putties." }
      ],
      safetyNotice: 'Wall putty tensile adhesion and pot life depend on polymer dispersible powder (RDP) and cellulose ether (HPMC) additives.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['wall putty', 'cement putty', 'skim coat', 'white cement putty', 'dolomite for putty', 'marble powder for putty'],
      ctaText: 'ENQUIRE FOR WALL PUTTY MINERALS',
      defaultNotes: '[Sector Enquiry: Wall Putty] Putty type (cementitious/acrylic): ; Whiteness requirement: ; Required mineral: ; Quantity: '
    },
    {
      id: 'ceramics',
      name: 'Ceramics',
      slug: 'ceramics',
      sheetIndex: 'O',
      badge: 'Glazes, Frits & Bodies',
      subtitle: 'Refractory Silicates, Clays & Fluxes for Ceramic Tiles & Sanitaryware',
      description: 'High-purity kaolinitic clays, micronized silica, talc, and feldspathic fluxes for ceramic vitreous bodies, sanitaryware casting slips, and glossy tile glazes.',
      applicationDetails: [
        'Plasticity, green body strength, and slip rheology in sanitaryware casting',
        'Thermal expansion matching and anti-crazing control in glaze compounding',
        'Vitrification fluxing and reduction of firing shrinkage',
        'High dielectric insulation for electrical porcelain insulators'
      ],
      linkedProductSlugs: ['talc', 'soap-stone', 'china-clay', 'quartz-powder', 'kaoline'],
      uncataloguedMaterials: [],
      safetyNotice: 'Ceramic firing behavior (shrinkage, MOR, vitrification) depends on kiln cycle and chemical flux composition.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['ceramics', 'ceramic tiles', 'sanitaryware', 'glazes', 'frits', 'quartz for ceramics', 'china clay for ceramics'],
      ctaText: 'ENQUIRE FOR CERAMIC RAW MATERIALS',
      defaultNotes: '[Sector Enquiry: Ceramics] Ceramic type (tiles/sanitaryware/insulators): ; Formulation role (body/glaze): ; Required material: ; Mesh size: '
    },
    {
      id: 'colors',
      name: 'Colors',
      slug: 'colors',
      sheetIndex: 'P',
      badge: 'Dry Color & Pigments',
      subtitle: 'Base Powders, Diluents & Extenders for Color Compounding & Pigment Masterbatches',
      description: 'Inert, high-whiteness mineral bases and functional extenders utilized in dry color compounding, cement colors, masterbatch pigments, and industrial colorants.',
      applicationDetails: [
        'Base powders and uniform carrier media for organic and inorganic pigments',
        'Extension of expensive pigmentary dyes with minimal tinting strength loss',
        'Opacity enhancement, light scattering, and UV stability via Zinc Oxide',
        'Smooth particle dispersion without streaking or grit formation'
      ],
      linkedProductSlugs: ['chalk-powder', 'china-clay', 'soap-stone', 'talc', 'calcium-carbonate', 'silica', 'zinc-oxide'],
      uncataloguedMaterials: [],
      safetyNotice: 'Raw industrial mineral extenders; tinting performance and chemical compatibility to be confirmed by the pigment manufacturer.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['colors', 'pigment compounding', 'cement colors', 'color masterbatch', 'pigment extenders', 'dry colors'],
      ctaText: 'ENQUIRE FOR COLOR COMPOUNDING MINERALS',
      defaultNotes: '[Sector Enquiry: Colors] Pigment type: ; Compounding process: ; Required mineral base: ; Quantity: '
    },
    {
      id: 'mould-release',
      name: 'Mould Release',
      slug: 'mould-release',
      sheetIndex: 'Q',
      badge: 'Lubrication & Parting',
      subtitle: 'Dry Parting Agents, Anti-Tack Powders & Release Additives for Industrial Moulds',
      description: 'Specialized lamellar minerals and metallic soaps providing high lubricity, thermal stability, and clean release for rubber vulcanization, metal casting, and plastic moulding.',
      applicationDetails: [
        'High-temperature dry lubrication and anti-adhesion between mould and elastomer',
        'Prevention of rubber blank tackiness during handling and vulcanization storage',
        'Internal mould release for thermoplastic extrusion and compression moulding',
        'Thermal barrier protection to extend metal tooling and mould cycle life'
      ],
      linkedProductSlugs: ['talc', 'soap-stone', 'calcium-carbonate', 'zinc-oxide', 'zinc-stearates', 'titanium-dioxide'],
      uncataloguedMaterials: [],
      safetyNotice: 'Application technique (dry dusting, slurry spray, or internal resin mix) must be validated against mould operating temperatures.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['mould release', 'mold release', 'parting agent', 'anti-tack powder', 'rubber demoulding', 'dusting powder'],
      ctaText: 'ENQUIRE FOR MOULD RELEASE MINERALS',
      defaultNotes: '[Sector Enquiry: Mould Release] Moulding process (rubber/plastic/metal): ; Operating temperature: ; Required material: ; Quantity: '
    },
    {
      id: 'anti-corrosive-primer',
      name: 'Anti-Corrosive Primer',
      slug: 'anti-corrosive-primer',
      sheetIndex: 'R',
      badge: 'Metal Protective Coatings',
      subtitle: 'Rust-Inhibitive Pigments & Barrier Minerals for Industrial Primers',
      description: 'Natural and synthetic iron oxides, barrier talcs, and alkaline calcium minerals providing electrochemical corrosion passivation and mechanical barrier protection.',
      applicationDetails: [
        'High-opacity iron oxide (Fe2O3) passivation for structural steelwork primers',
        'Lamellar platey talc morphology providing barrier shielding against water and chloride ingress',
        'Alkaline buffering to neutralize acidic atmospheric corrosion agents',
        'Adhesion promotion and smooth undercoat sanding properties'
      ],
      linkedProductSlugs: ['redoxide', 'talc', 'calcium-carbonate', 'hydrated-lime'],
      uncataloguedMaterials: [],
      safetyNotice: 'Anti-corrosive primer durability depends on vehicle binder (alkyd, epoxy, polyurethane) and salt spray resistance testing.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['anti-corrosive primer', 'redoxide primer', 'rust inhibitive paint', 'metal primer', 'anti rust coating', 'primer'],
      ctaText: 'ENQUIRE FOR ANTI-CORROSIVE PRIMER MATERIALS',
      defaultNotes: '[Sector Enquiry: Anti-Corrosive Primer] Primer vehicle (alkyd/epoxy): ; Exposure environment: ; Required mineral: ; Quantity: '
    },
    {
      id: 'foundry',
      name: 'Foundry',
      slug: 'foundry',
      sheetIndex: 'S',
      badge: 'Moulding & Castings',
      subtitle: 'Refractory Powders, Parting Dusts & Sands for Metal Casting Foundries',
      description: 'High-fusion mineral powders, steatite mold washes, dolomite refractory fluxes, and casting sands engineered for iron, steel, and non-ferrous foundry operations.',
      applicationDetails: [
        'High refractory melting point to withstand molten metal erosion',
        'Mould release and surface dusting for sand core box stripping',
        'Slag conditioning and chemical fluxing in cupolas and induction furnaces',
        'Refractory mold and core washes to prevent metal penetration and veining'
      ],
      linkedProductSlugs: ['talc', 'soap-stone', 'dolomite-powder', 'marble-powder', 'hydrated-lime', 'silica'],
      uncataloguedMaterials: [
        { name: "Celite (Insulation Grade)", status: "Specialty Sourced Grade", notes: "Thermal insulation and casting release aid available on enquiry." }
      ],
      safetyNotice: 'Refractory thermal shock resistance, AFS grain fineness, and loss on ignition (LOI) to be verified against casting metallurgy.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['foundry', 'casting', 'mould wash', 'core sand', 'refractory minerals', 'foundry parting', 'foundary'],
      ctaText: 'ENQUIRE FOR FOUNDRY MINERALS',
      defaultNotes: '[Sector Enquiry: Foundry] Casting metal (iron/steel/aluminum): ; Application (mold wash/dusting/flux): ; Required material: ; Quantity: '
    },
    {
      id: 'frp',
      name: 'FRP',
      slug: 'frp',
      sheetIndex: 'T',
      badge: 'Resin Composites',
      subtitle: 'Resin Systems, Functional Fillers & Surface Minerals for FRP Composites',
      description: 'Unsaturated polyester resins, calcium carbonate bulk extenders, platey talcs, and decorative marble chips for pultrusion, SMC/BMC moulding, hand lay-up, and composite fabrication.',
      applicationDetails: [
        'Thermoset matrix bonding with Unsaturated Polyester Resin (General Purpose / Isophthalic)',
        'High filler loading, shrinkage reduction, and surface smoothness with Calcium Carbonate and Talc',
        'Cultured marble, artificial stone, and terrazzo composite casting with Marble Chips and Marble Powder',
        'Mould demoulding and parting lubrication with French Chalk Powder',
        'Alkaline conditioning and chemical buffering with Hydrated Lime'
      ],
      linkedProductSlugs: ['hydrated-lime', 'polyester-resin', 'talc', 'french-chalk-powder', 'marble-chips', 'marble-powder', 'calcium-carbonate'],
      uncataloguedMaterials: [
        { name: "Celite (Reinforcing Aid)", status: "Specialty Sourced Grade", notes: "Secondary functional filler for specialized composite formulations." }
      ],
      safetyNotice: 'Resin-filler viscosity, wet-out rate, and exotherm temperature curve must be tested for the specific composite moulding process.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['frp', 'fiber reinforced plastics', 'composite resin', 'polyester resin for frp', 'smc bmc filler', 'cultured marble'],
      ctaText: 'ENQUIRE FOR FRP COMPOSITE MATERIALS',
      defaultNotes: '[Sector Enquiry: FRP] Composite moulding process (lay-up/pultrusion/SMC): ; Resin/filler requirement: ; Quantity: '
    },
    {
      id: 'paints',
      name: 'Paints',
      slug: 'paints',
      sheetIndex: 'U',
      badge: 'Architectural & Industrial Coatings',
      subtitle: 'Extenders, Opaque Pigments & Functional Minerals for Paints & Coatings',
      description: 'The definitive mineral suite for paints: titanium dioxide extension, tinting, anti-settling, sheen control, scrub resistance, and exterior weatherability.',
      applicationDetails: [
        'Titanium dioxide extension and dry hiding enhancement in emulsion paints',
        'Sheen matting and film reinforcement with lamellar talc and kaolin',
        'High specific gravity and anti-corrosive priming with Barytes',
        'Rust inhibition and weather resistance with natural Redoxide',
        'Viscosity control, anti-settling, and brushability in architectural coatings'
      ],
      linkedProductSlugs: ['talc', 'calcium-carbonate', 'silica', 'redoxide', 'chalk-powder', 'china-clay', 'kaoline', 'hydrated-lime', 'zinc-oxide', 'marble-powder', 'dolomite-powder', 'titanium-dioxide', 'barytes'],
      uncataloguedMaterials: [
        { name: "Celite (Matting Grade)", status: "Specialty Sourced Grade", notes: "Silica flatting agent and sheen matting extender available on enquiry." }
      ],
      safetyNotice: 'Paint formulation properties (PVC, CPVC, oil absorption, fineness of grind) depend on binder system and dispersing protocols.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['paints', 'coatings', 'emulsion paint', 'paint extenders', 'barytes for paint', 'tio2 for coatings'],
      ctaText: 'ENQUIRE FOR PAINT & COATING MINERALS',
      defaultNotes: '[Sector Enquiry: Paints] Paint category (decorative/industrial/primer): ; Target PVC/sheen: ; Required mineral: ; Quantity: '
    },
    {
      id: 'dal-polish-mills',
      name: 'Dal Polish Mills',
      slug: 'dal-polish-mills',
      sheetIndex: 'V',
      badge: 'Grain Polishing & Buffing',
      subtitle: 'Mineral Buffing Powders for Pulse Polishing Mills & Grain Processing',
      description: 'Soft, lamellar mineral powders utilized in dal milling facilities to remove bran residues, impart surface luster, and improve flowability during grain processing.',
      applicationDetails: [
        'Controlled friction and gentle buffing action in pulse polishing cylinders',
        'Enhances natural shine and clean commercial appearance of processed pulses',
        'Ultra-soft Mohs hardness 1 to protect grain surface integrity from cracking',
        'Controlled low moisture and fine mesh classification for uniform machine dispersion'
      ],
      linkedProductSlugs: ['talc', 'soap-stone', 'french-chalk-powder'],
      uncataloguedMaterials: [],
      safetyNotice: 'Sourced as industrial mineral raw materials; food contact suitability and regulatory compliance must be independently confirmed with commercial desk prior to processing.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['dal polish mills', 'dal polishing', 'pulse polishing', 'grain buffing', 'french chalk for dal', 'talc for dal mills', 'dal polish'],
      ctaText: 'ENQUIRE FOR DAL POLISHING POWDERS',
      defaultNotes: '[Sector Enquiry: Dal Polish Mills] Mill machinery type: ; Grain/pulse processed: ; Required polishing powder: ; Quantity: '
    },
    {
      id: 'fire-safety',
      name: 'Fire Safety',
      slug: 'fire-safety',
      sheetIndex: 'W',
      badge: 'Application Discovery',
      subtitle: 'Mineral Materials for Fire-Safety Applications & Formulations',
      description: 'Mineral materials relevant to fire-safety-related industrial formulations, refractory barriers, and composite applications. Suitability depends on formulation performance.',
      applicationDetails: [
        'Endothermic heat absorption and water vapor release in composite barriers',
        'Non-combustible mineral fillers for cable jacketing and fire-resistant compounds',
        'Technical consultation on decomposition kinetics and formulation requirements'
      ],
      linkedProductSlugs: ['calcium-carbonate', 'talc', 'hydrated-lime'],
      uncataloguedMaterials: [],
      safetyNotice: 'These materials must not automatically be described as certified fire-retardant materials or as suitable for a specific fire-safety formulation. Actual suitability depends on the formulation and required performance standards. Do not claim fire-resistance ratings, certifications, flame-retardant performance or compliance unless supported by verified product documentation.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['fire safety', 'fire retardant filler', 'flame retardant compounding', 'cable sheathing fire'],
      ctaText: 'ENQUIRE FOR FIRE-SAFETY MATERIALS',
      defaultNotes: '[Sector Enquiry: Fire Safety] Intended fire-safety application: ; Required material: ; Technical requirements: ; Quantity: '
    },
    {
      id: 'gym-powder',
      name: 'Gym Powder',
      slug: 'gym-powder',
      sheetIndex: 'X',
      badge: 'Sports Grip & Moisture Absorption',
      subtitle: 'Magnesium Carbonate for Gym Chalk & Athletic Grip Formulations',
      description: 'Basic Magnesium Carbonate engineered for superior moisture absorption, hand sweat reduction, and non-slip traction in weightlifting, gymnastics, and climbing.',
      applicationDetails: [
        'Ultra-low bulk density and fluffy physical texture for high volume yield',
        'High liquid absorbency to dry skin perspiration and maximize friction',
        'Non-greasy, non-staining mineral white powder',
        'Custom packaging formats for wholesale repacking and commercial gyms'
      ],
      linkedProductSlugs: ['magnesium-carbonate'],
      uncataloguedMaterials: [],
      safetyNotice: 'Actual suitability for finished gym chalk, skin contact, or sports use depends on confirmed grade specifications. Deepali Minerals supplies industrial mineral grades; grade, particle size, packaging, and certifications to be confirmed with commercial desk prior to processing.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['gym powder', 'gym chalk', 'sports grip', 'weightlifting chalk', 'rock climbing chalk', 'magnesium carbonate chalk'],
      ctaText: 'ENQUIRE ABOUT MAGNESIUM CARBONATE',
      defaultNotes: '[Sector Enquiry: Gym Powder] Intended sports application: ; Required grade/mesh: ; Packaging preference: ; Quantity: '
    },
    {
      id: 'fibre-murti',
      name: 'Fibre Murti',
      slug: 'fibre-murti',
      sheetIndex: 'Y',
      badge: 'Idol & Statue Moulding',
      subtitle: 'Mineral Materials for Fibre Idol & Statue Manufacturing',
      description: 'Mineral fillers, talc, and decorative marble materials utilized in moulding, casting, reinforcement, and surface finishing of glass fibre idols and decorative statues.',
      applicationDetails: [
        'Mineral fillers in compatible polyester resin matrices for smooth reproduction',
        'Surface finishing, knifing putty base, and sharp detail capture',
        'Demoulding parting powder with French Chalk Powder and Talc',
        'Cast stone and textured base compounding with Marble Chips and Marble Powder'
      ],
      linkedProductSlugs: ['french-chalk-powder', 'talc', 'soap-stone', 'marble-chips', 'calcium-carbonate', 'marble-powder', 'silica'],
      uncataloguedMaterials: [],
      safetyNotice: 'Do not claim that every listed mineral is compatible with every resin system. Present these as potential materials pending formulation-specific confirmation.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['fibre murti', 'fibre idol', 'fibre statue', 'murti casting', 'idol manufacturing', 'statue resin filler', 'fibre murti industry'],
      ctaText: 'EXPLORE MATERIALS FOR FIBRE MURTI MANUFACTURING',
      defaultNotes: '[Sector Enquiry: Fibre Murti Industry] Type of product: ; Resin/binder system: ; Intended application: ; Technical requirements: '
    },
    {
      id: 'tile-adhesives',
      name: 'Tile Adhesives',
      slug: 'tile-adhesives',
      sheetIndex: 'Z',
      badge: 'Drymix Mortars & Grouts',
      subtitle: 'Mineral Materials for Tile Adhesive Formulations & Joint Fillers',
      description: 'Graded aggregates, fine quartz powders, marble chippings, and rheology-supporting mineral powders for cementitious tile adhesives (CTA) and polymer grouts.',
      applicationDetails: [
        'Controlled particle gradation for optimal packing density and open time',
        'Pure silica aggregates for mechanical keying and high tensile pull-off bond strength',
        'Rheology modifiers for superior slip and vertical sag resistance',
        'Decorative joint filler compounding with marble chips and fine marble powders'
      ],
      linkedProductSlugs: ['marble-chips', 'quartz-sand', 'talc', 'marble-powder', 'quartz-powder', 'calcium-carbonate', 'hydrated-lime', 'silica'],
      uncataloguedMaterials: [],
      safetyNotice: 'Mineral materials serve as formulation components; finished adhesive performance depends on binder, polymer and additive balance. Technical parameters must be confirmed against manufacturer formulation requirements.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['tile adhesives', 'tile grout', 'cementitious adhesive', 'cta', 'polymer modified mortar', 'quartz for tile adhesive', 'tile adhesives industry'],
      ctaText: 'ENQUIRE FOR TILE ADHESIVE MATERIALS',
      defaultNotes: '[Sector Enquiry: Tile Adhesives Industry] Adhesive type: ; Target standard: ; Required material: ; Gradation requirement: '
    },
    {
      id: 'plywood',
      name: 'Plywood',
      slug: 'plywood',
      sheetIndex: 'AA',
      badge: 'Adhesives & Wood Panels',
      subtitle: 'Mineral Materials for Plywood & Wood-Panel Manufacturing',
      description: 'Mineral extenders and fillers for urea-formaldehyde (UF), phenol-formaldehyde (PF), and melamine resin glues used in plywood, particle board, and panel manufacturing.',
      applicationDetails: [
        'Viscosity control, glue line retention, and resin strike-through prevention',
        'Pot-life extension and cost optimization in adhesive formulations',
        'Surface filler and coating minerals for wood panel finishing',
        'Sourcing for commercial plywood and particle board producers'
      ],
      linkedProductSlugs: ['talc', 'soap-stone', 'calcium-carbonate', 'china-clay', 'silica'],
      uncataloguedMaterials: [
        { name: "Celite (Adhesive Extender)", status: "Specialty Sourced Grade", notes: "Functional extender and glue-line rheology control agent." }
      ],
      safetyNotice: 'Do not claim that these materials are universally suitable for all plywood adhesives or resin systems. Technical suitability depends on manufacturer requirements.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['plywood', 'wood panels', 'plywood glue filler', 'resin extender for plywood', 'wood panel manufacturing', 'plywood industry'],
      ctaText: 'ENQUIRE FOR PLYWOOD MANUFACTURING',
      defaultNotes: '[Sector Enquiry: Plywood Industry] Plywood/panel type: ; Intended application: ; Adhesive/coating system: ; Technical requirements: '
    },
    {
      id: 'gulal-rangoli',
      name: 'Gulal / Rangoli',
      slug: 'gulal-rangoli',
      sheetIndex: 'AB',
      badge: 'Decorative Colours & Powders',
      subtitle: 'Mineral Powders for Decorative Colour & Rangoli Products',
      description: 'Soft, free-flowing mineral powders utilized as base carriers, bulk fillers, and texturizing agents for dry colours, floor rangoli, and festive decorative powders.',
      applicationDetails: [
        'Base powders and uniform carriers for dry color pigments',
        'Bulk mineral fillers for decorative floor rangoli and craft powders',
        'High natural brightness and smooth particle flow for easy application',
        'Custom mesh classification and packaging for seasonal production'
      ],
      linkedProductSlugs: ['calcium-carbonate', 'marble-powder', 'dolomite-powder', 'talc', 'china-clay', 'kaoline', 'chalk-powder'],
      uncataloguedMaterials: [],
      safetyNotice: 'These materials must not be described as skin-safe, cosmetic-grade, non-toxic, certified herbal or food-grade unless verified. Distinguish decorative / craft rangoli powders from skin-contact festival gulal powders. Deepali Minerals supplies industrial mineral raw materials; suitability for specific finished consumer products must be independently confirmed by the manufacturer.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['gulal', 'rangoli', 'dry colors', 'decorative colors', 'rangoli powder', 'gulal base powder', 'gulal / rangoli industry'],
      ctaText: 'ENQUIRE FOR GULAL & RANGOLI POWDERS',
      defaultNotes: '[Sector Enquiry: Gulal / Rangoli Industry] End-product type: ; Target colour/formulation process: ; Mesh size/fineness: ; Whiteness preference: '
    },
    {
      id: 'nc-putty',
      name: 'NC Putty',
      slug: 'nc-putty',
      sheetIndex: 'AC',
      badge: 'Automotive & Knifing Putty',
      subtitle: 'Mineral Materials for NC Putty Formulations',
      description: 'Extenders and fine powders engineered for nitrocellulose-based automotive, wood, and industrial knifing putties supporting rapid drying, build, and sandability.',
      applicationDetails: [
        'Body building and volume extension in NC knifing formulations',
        'Fine particle distribution to support feather-edge surface smoothness',
        'Controlled oil absorption for fast drying and solvent release',
        'Exceptional sandability without clogging sandpaper grit'
      ],
      linkedProductSlugs: ['french-chalk-powder', 'talc', 'chalk-powder', 'calcium-carbonate', 'china-clay', 'marble-powder'],
      uncataloguedMaterials: [],
      safetyNotice: 'NC putty may refer to nitrocellulose putty or a related knifing putty system. Suitability depends on binder compatibility, oil absorption, particle size distribution and drying performance. Deepali Minerals supplies raw materials; formulation suitability must be confirmed by the manufacturer.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['nc putty', 'nitrocellulose putty', 'knifing putty', 'automotive putty', 'sandable putty', 'nc putty industry'],
      ctaText: 'ENQUIRE FOR NC PUTTY MATERIALS',
      defaultNotes: '[Sector Enquiry: NC Putty Industry] Putty type: ; Binder/resin system: ; Specific mineral: ; Mesh size/fineness: '
    },
    {
      id: 'stationery',
      name: 'Stationery',
      slug: 'stationery',
      sheetIndex: 'AD',
      badge: 'Paper, Chalk & School Supplies',
      subtitle: 'Mineral Materials for Paper, Chalk & Stationery Manufacturing',
      description: 'Functional mineral powders and organic binders utilized in writing and printing paper, writing chalks, crayons, modelling clays, pencils, and office supplies.',
      applicationDetails: [
        'Opacity, brightness, and ink hold-out in paper making and surface coating',
        'Body filler and extrusion lubricity for school writing chalk and crayons',
        'Natural green starch binder for paper wet-end sizing and packaging adhesives',
        'Fine clays for pencil leads and modelling compounds'
      ],
      linkedProductSlugs: ['talc', 'marble-powder', 'calcium-carbonate', 'china-clay', 'kaoline', 'titanium-dioxide', 'chalk-powder', 'starch'],
      uncataloguedMaterials: [
        { name: "Celite (Functional Filler)", status: "Specialty Sourced Grade", notes: "Paper processing and specialty stationery mineral aid." }
      ],
      safetyNotice: 'Sourcing materials pending formulation-specific validation. No universal claims for paper, chalk or school supply formulations without confirmation.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['stationery', 'writing paper', 'school chalk', 'crayons', 'modelling clay', 'paper fillers', 'stationery industry'],
      ctaText: 'ENQUIRE FOR STATIONERY MANUFACTURING',
      defaultNotes: '[Sector Enquiry: Stationery Industry] Product type: ; Intended function: ; Technical specifications: '
    },
    {
      id: 'cosmetics',
      name: 'Cosmetics',
      slug: 'cosmetics',
      sheetIndex: 'Portal Baseline',
      badge: 'Personal Care & Powders',
      subtitle: 'High-Purity Talc, Kaolin & Zinc Compounds for Personal Care Products',
      description: 'Selected ultra-fine minerals and dermatological bases for cosmetic face powders, foundations, calamine lotions, body dusts, and personal care preparations.',
      applicationDetails: [
        'Asbestos-tested cosmetic grade talc for face powders and blushes',
        'Kaolin clay for soothing face masks, compacts, and skin protectants',
        'Active Zinc Oxide for soothing lotions and barrier ointments',
        'Basic Magnesium Carbonate for perfume carriers and oil absorption'
      ],
      linkedProductSlugs: ['talc', 'kaoline', 'zinc-oxide', 'magnesium-carbonate', 'zinc-stearates'],
      uncataloguedMaterials: [],
      safetyNotice: 'Cosmetic batches are tested for asbestos-free compliance and heavy metal limits. Inquire for batch test certificates.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['cosmetics', 'personal care', 'talcum powder', 'face powder', 'calamine', 'skincare minerals'],
      ctaText: 'ENQUIRE FOR COSMETIC MINERALS',
      defaultNotes: '[Sector Enquiry: Cosmetics] Product line: ; Purity/asbestos requirement: ; Required mineral: ; Quantity: '
    },
    {
      id: 'pharmaceutical',
      name: 'Pharmaceutical',
      slug: 'pharmaceutical',
      sheetIndex: 'Portal Baseline',
      badge: 'Excipients & Mineral Salts',
      subtitle: 'Mineral Excipients, Antacids & Carriers for Pharmaceutical Compounding',
      description: 'High-purity kaolin, USP talc, zinc oxide, and starch binders serving as functional pharmaceutical excipients, antacids, and active carriers.',
      applicationDetails: [
        'Pharmaceutical suspensions and excipient tablet binders',
        'Gastric protective and antacid preparations with basic magnesium carbonate',
        'Active topical skin protectants with French-process zinc oxide',
        'Natural starch disintegrant and binder for tablet compaction'
      ],
      linkedProductSlugs: ['kaoline', 'talc', 'zinc-oxide', 'magnesium-carbonate', 'starch'],
      uncataloguedMaterials: [],
      safetyNotice: 'Pharmaceutical and pharmacopoeial grade suitability (USP/IP/BP) must be confirmed on enquiry.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['pharmaceutical', 'pharma', 'excipient', 'antacid base', 'kaolin pharma', 'tablet binder'],
      ctaText: 'ENQUIRE FOR PHARMACEUTICAL MINERALS',
      defaultNotes: '[Sector Enquiry: Pharmaceutical] Pharmacopoeia grade (IP/BP/USP): ; Formulation type: ; Required mineral: ; Quantity: '
    },
    {
      id: 'ayurvedic-medicines',
      name: 'Ayurvedic Medicines',
      slug: 'ayurvedic-medicines',
      sheetIndex: 'Portal Baseline',
      badge: 'Traditional Formulations',
      subtitle: 'Natural Mineral Bases for Ayurvedic, Herbal & Traditional Preparations',
      description: 'Refined natural minerals utilized as traditional mineral bases, carriers, and excipients in Ayurvedic churna, lepa, and classical herbal formulations.',
      applicationDetails: [
        'Fine inert mineral bases for traditional Ayurvedic topical lepa',
        'Purified mineral powder carriers for herbal extracts',
        'Traditional natural calcium carbonate sources for processing'
      ],
      linkedProductSlugs: ['talc', 'kaoline', 'calcium-carbonate'],
      uncataloguedMaterials: [],
      safetyNotice: 'Supplied as industrial mineral raw materials; Ayurvedic processing and purification (Shodhana) parameters must be confirmed by the manufacturer.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['ayurvedic medicines', 'ayurveda', 'herbal minerals', 'traditional medicine carrier', 'ayurvedic lepa'],
      ctaText: 'ENQUIRE FOR AYURVEDIC MINERALS',
      defaultNotes: '[Sector Enquiry: Ayurvedic Medicines] Traditional preparation: ; Required mineral: ; Particle fineness: ; Quantity: '
    },
    {
      id: 'cables',
      name: 'Cables',
      slug: 'cables',
      sheetIndex: 'Portal Baseline',
      badge: 'Power & Telecommunications',
      subtitle: 'Dielectric Mineral Fillers & Parting Dusts for Cable Sheathing & Wiring',
      description: 'High-dielectric minerals, talc parting agents, and reinforcing kaolin clays engineered for XLPE power cables, PVC sheathing, and flexible wiring insulation.',
      applicationDetails: [
        'High dielectric breakdown strength and insulation resistance in PVC/XLPE',
        'Non-stick dusting and parting lubrication for cable wire drawing and cores',
        'Thermal endurance and mechanical reinforcement in heavy-duty cable jackets',
        'Low moisture absorption to maintain electrical insulation integrity'
      ],
      linkedProductSlugs: ['talc', 'soap-stone', 'chalk-powder', 'china-clay', 'calcium-carbonate', 'silica'],
      uncataloguedMaterials: [],
      safetyNotice: 'Electrical resistivity and dielectric loss angle (tan delta) specifications to be verified against IS/IEC cable standards.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['cables', 'cable sheathing', 'wiring insulation', 'dielectric filler', 'xlpe filler', 'cable parting powder'],
      ctaText: 'ENQUIRE FOR CABLE INSULATION MINERALS',
      defaultNotes: '[Sector Enquiry: Cables] Cable voltage/type (LT/HT/XLPE): ; Required function (insulation/sheathing/parting): ; Required mineral: ; Quantity: '
    },
    {
      id: 'rubber',
      name: 'Rubber',
      slug: 'rubber',
      sheetIndex: 'Portal Baseline',
      badge: 'Elastomer Compounding',
      subtitle: 'Reinforcing Fillers, Activators & Dusting Minerals for Rubber Goods',
      description: 'Essential mineral powders, zinc oxide vulcanization activators, barium sulfate weighting agents, and anti-tack parting dusts for automotive rubber and industrial belts.',
      applicationDetails: [
        'Inorganic vulcanization activation and cure kinetics control via Zinc Oxide',
        'High volume loading, tensile modulus, and tear resistance with China Clay and Talc',
        'Heavy-duty acoustic damping and high density compounding with Barytes',
        'Anti-tack dusting for uncured rubber extrusions, calendered sheets, and inner tubes'
      ],
      linkedProductSlugs: ['talc', 'soap-stone', 'chalk-powder', 'china-clay', 'zinc-oxide', 'zinc-stearates', 'magnesium-carbonate', 'barytes', 'french-chalk-powder', 'calcium-carbonate'],
      uncataloguedMaterials: [],
      safetyNotice: 'Elastomer compound vulcanization kinetics (scorch time, cure rate) and mechanical properties depend on activator and filler loading.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['rubber', 'rubber compounding', 'vulcanization', 'tyre manufacturing', 'rubber dusting', 'barytes for rubber'],
      ctaText: 'ENQUIRE FOR RUBBER COMPOUNDING',
      defaultNotes: '[Sector Enquiry: Rubber] Elastomer polymer (NR/SBR/EPDM/NBR): ; Compounding role: ; Required mineral: ; Quantity: '
    },
    {
      id: 'paper',
      name: 'Paper',
      slug: 'paper',
      sheetIndex: 'Portal Baseline',
      badge: 'Pulp, Paper & Board',
      subtitle: 'Functional Fillers, Coating Clays & Sizing Binders for Paper Mills',
      description: 'High-brightness kaolins, calcium carbonates, starches, and titanium dioxide pigments engineered for sheet formation, opacity, smoothness, and printability.',
      applicationDetails: [
        'Internal filler loading for sheet opacity, bulk, and raw material cost reduction',
        'Surface coating and calendering slip with high-brightness China Clay and PCC',
        'Wet-end sizing, surface sizing, and corrugation bonding with industrial starch',
        'Pulp bleaching, alkaline extraction, and effluent treatment with Hydrated Lime'
      ],
      linkedProductSlugs: ['talc', 'china-clay', 'kaoline', 'calcium-carbonate', 'titanium-dioxide', 'starch', 'hydrated-lime'],
      uncataloguedMaterials: [],
      safetyNotice: 'Abrasiveness, ISO brightness, retention kinetics, and particle size distribution to be verified against paper mill specifications.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['paper', 'paper mill', 'paper coating', 'pulp and paper', 'starch for paper', 'china clay for paper'],
      ctaText: 'ENQUIRE FOR PAPER MILL MINERALS',
      defaultNotes: '[Sector Enquiry: Paper] Paper grade (writing/printing/kraft/board): ; Application (internal filler/coating/sizing): ; Required mineral: ; Quantity: '
    },
    {
      id: 'master-batch',
      name: 'Master Batch',
      slug: 'master-batch',
      sheetIndex: 'Portal Baseline',
      badge: 'Polymer Concentrates',
      subtitle: 'High-Loading Mineral Powders & Processing Aids for Color & Filler Masterbatches',
      description: 'Ultrafine coated calcium carbonates, high-whiteness talcs, and titanium dioxide concentrates engineered for 70%+ filler masterbatches and color concentrates.',
      applicationDetails: [
        'Superfine stearic acid coated calcium carbonate for high filler loading concentrates',
        'Exceptional polymer dispersion and low melt flow index (MFI) perturbation',
        'High opacity white masterbatches with pure pigmentary Titanium Dioxide',
        'Internal lubrication and pigment wetting with Zinc Stearates'
      ],
      linkedProductSlugs: ['talc', 'calcium-carbonate', 'zinc-stearates', 'titanium-dioxide'],
      uncataloguedMaterials: [],
      safetyNotice: 'Filler loading percentage, masterbatch carrier compatibility (PE/PP), and dispersant balance to be confirmed.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['master batch', 'masterbatch', 'filler masterbatch', 'white masterbatch', 'polymer concentrates', 'caco3 masterbatch'],
      ctaText: 'ENQUIRE FOR MASTERBATCH MINERALS',
      defaultNotes: '[Sector Enquiry: Master Batch] Carrier resin (LDPE/LLDPE/PP): ; Target filler loading (%): ; Required mineral: ; Quantity: '
    },
    {
      id: 'automobile-paints',
      name: 'Automobile Paints',
      slug: 'automobile-paints',
      sheetIndex: 'Portal Baseline',
      badge: 'OEM & Refinish Coatings',
      subtitle: 'High-Purity Extenders & Pigments for Automotive Primers & OEM Finishes',
      description: 'High-density barytes, microfine barrier talcs, and synthetic iron oxides engineered for electrodeposition primers, surfacers, and automotive refinish topcoats.',
      applicationDetails: [
        'High specific gravity anti-settling weighting with bleached Barytes',
        'Electrochemical corrosion passivation and stone-chip resistance',
        'Smooth feather-edge sanding and surface hold-out in automotive undercoats',
        'High opacity and exterior UV durability with Titanium Dioxide and Redoxide'
      ],
      linkedProductSlugs: ['talc', 'barytes', 'titanium-dioxide', 'redoxide'],
      uncataloguedMaterials: [],
      safetyNotice: 'Automotive OEM and refinish specifications (Hegman grind fineness, oil absorption, salt spray hours) to be verified.',
      validationStatus: 'Verified Industrial Application',
      searchAliases: ['automobile paints', 'automotive coatings', 'car primer', 'oem paint extenders', 'barytes automotive', 'refinish putty'],
      ctaText: 'ENQUIRE FOR AUTOMOTIVE COATING MINERALS',
      defaultNotes: '[Sector Enquiry: Automobile Paints] Coating tier (OEM primer/surfacer/refinish): ; Required mineral: ; Hegman fineness requirement: ; Quantity: '
    }
  ];

  // Bidirectional synchronization: update products[].industries with mapped taxonomy sectors
  masterTaxonomy.forEach(function (tax) {
    if (tax.linkedProductSlugs && tax.linkedProductSlugs.length) {
      tax.linkedProductSlugs.forEach(function (slug) {
        var prod = products.find(function (p) { return p.slug === slug || p.id === slug; });
        if (prod) {
          if (!prod.industries) prod.industries = [];
          if (prod.industries.indexOf(tax.name) === -1) {
            prod.industries.push(tax.name);
          }
        }
      });
    }
  });

  window.DeepaliData = {
    company: company,
    categories: categories,
    industries: industries,
    products: products,
    getProductBySlug: function (slug) {
      if (!slug) return null;
      var clean = String(slug).toLowerCase().trim();
      return products.find(function (p) { return p.slug === clean || p.id === clean; }) || null;
    },
    getProductsByCategory: function (catName) {
      if (!catName || catName === 'all' || catName === 'All') return products;
      var clean = String(catName).toLowerCase().trim().replace(/-/g, ' ');
      if (clean === 'industrial minerals' || clean === 'industrial-minerals' || clean === 'industrial materials' || clean === 'industrial-materials' || clean === 'all materials' || clean === 'all industrial minerals') {
        return products;
      }
      return products.filter(function (p) {
        if (p.category && p.category.toLowerCase() === clean) return true;
        if (p.categories && p.categories.some(function (c) { return c.toLowerCase() === clean; })) return true;
        return false;
      });
    },
    getProductsByIndustry: function (industryName) {
      if (!industryName || industryName === 'all' || industryName === 'All') return products;
      var target = String(industryName).toLowerCase().trim();
      var tax = (masterTaxonomy || []).find(function (t) {
        return t.name.toLowerCase() === target ||
               t.slug.toLowerCase() === target ||
               t.id.toLowerCase() === target ||
               (t.searchAliases && t.searchAliases.some(function(a) { return a.toLowerCase() === target; }));
      });
      if (tax && tax.linkedProductSlugs && tax.linkedProductSlugs.length) {
        var matched = products.filter(function (p) {
          return tax.linkedProductSlugs.indexOf(p.slug) !== -1 || tax.linkedProductSlugs.indexOf(p.id) !== -1;
        });
        if (matched.length) return matched;
      }
      return products.filter(function (p) {
        return p.industries.some(function (ind) { return ind.toLowerCase() === target; });
      });
    },
    searchProducts: function (query) {
      if (!query || String(query).trim() === '') return products;
      var q = String(query).toLowerCase().trim();
      var qHyphen = q.replace(/\s+/g, '-');
      var qSpace = q.replace(/-/g, ' ');
      var matchText = function (target) {
        if (!target) return false;
        var t = String(target).toLowerCase();
        return t.indexOf(q) !== -1 || t.indexOf(qHyphen) !== -1 || t.indexOf(qSpace) !== -1;
      };
      return products.filter(function (p) {
        return matchText(p.name) ||
          matchText(p.category) ||
          matchText(p.shortDescription) ||
          (p.composition && matchText(p.composition)) ||
          (p.synonyms && p.synonyms.some(matchText)) ||
          p.applications.some(matchText) ||
          p.industries.some(matchText);
      });
    },
    getRelatedProducts: function (slug, limit) {
      var current = products.find(function (p) { return p.slug === slug || p.id === slug; });
      var count = limit || 3;
      if (!current) return products.slice(0, count);
      var related = [];
      if (current.related && current.related.length) {
        current.related.forEach(function (relSlug) {
          var found = products.find(function (p) { return p.slug === relSlug; });
          if (found && related.indexOf(found) === -1) related.push(found);
        });
      }
      if (related.length < count) {
        var sameCat = products.filter(function (p) { return p.id !== current.id && p.category === current.category && related.indexOf(p) === -1; });
        related = related.concat(sameCat);
      }
      return related.slice(0, count);
    },
    canonicalIndustries: canonicalIndustries,
    getCanonicalIndustries: function () {
      return canonicalIndustries;
    },
    getCanonicalIndustryBySlug: function (slug) {
      if (!slug) return null;
      var target = String(slug).toLowerCase().trim().replace(/_/g, '-');
      return canonicalIndustries.find(function (ind) {
        return ind.slug.toLowerCase() === target ||
               ind.id.toLowerCase() === target ||
               ind.name.toLowerCase() === target ||
               (ind.searchAliases && ind.searchAliases.some(function (a) { return a.toLowerCase() === target; }));
      }) || null;
    },
    getCanonicalIndustryByName: function (name) {
      if (!name) return null;
      var target = String(name).toLowerCase().trim();
      return canonicalIndustries.find(function (ind) {
        return ind.name.toLowerCase() === target ||
               ind.slug.toLowerCase() === target ||
               (ind.searchAliases && ind.searchAliases.some(function (a) { return a.toLowerCase() === target; }));
      }) || null;
    },
    getCanonicalIndustriesForProduct: function (slug) {
      var prod = products.find(function (p) { return p.slug === slug || p.id === slug; });
      if (!prod) return [];
      return canonicalIndustries.filter(function (ind) {
        return ind.linkedProductSlugs.indexOf(prod.slug) !== -1 ||
               ind.linkedProductSlugs.indexOf(prod.id) !== -1 ||
               (prod.canonicalIndustries && prod.canonicalIndustries.indexOf(ind.name) !== -1);
      });
    },
    masterTaxonomy: masterTaxonomy,
    masterUncataloguedMaterials: masterUncataloguedMaterials,
    uncataloguedMaterials: masterUncataloguedMaterials,
    getMasterTaxonomy: function () {
      return masterTaxonomy;
    },
    getUncataloguedMaterials: function () {
      return masterUncataloguedMaterials;
    },
    getTaxonomyBySlug: function (slug) {
      if (!slug) return null;
      var target = String(slug).toLowerCase().trim();
      return masterTaxonomy.find(function (t) {
        return t.slug.toLowerCase() === target || t.id.toLowerCase() === target;
      }) || null;
    },
    getTaxonomyByName: function (name) {
      if (!name) return null;
      var target = String(name).toLowerCase().trim();
      return masterTaxonomy.find(function (t) {
        return t.name.toLowerCase() === target ||
               t.slug.toLowerCase() === target ||
               (t.searchAliases && t.searchAliases.some(function (a) { return a.toLowerCase() === target; }));
      }) || null;
    },
    sectorProfiles: (function () {
      var dict = {};
      masterTaxonomy.forEach(function (t) {
        dict[t.name] = {
          subtitle: t.subtitle,
          status: t.validationStatus,
          statusColor: (t.id === 'cattle-feed') ? '#DC2626' : (t.id === 'colors' && t.uncataloguedMaterials && t.uncataloguedMaterials.length) ? '#D97706' : '#2563EB',
          description: t.description,
          safetyNotice: t.safetyNotice,
          applicationDetails: t.applicationDetails,
          buyerEnquiryDetails: t.applicationDetails,
          uncataloguedMaterials: t.uncataloguedMaterials || [],
          sheetIndex: t.sheetIndex,
          ctaText: t.ctaText,
          defaultNotes: t.defaultNotes
        };
      });
      return dict;
    })(),
    getSectorProfile: function (sectorName) {
      var tax = (masterTaxonomy || []).find(function (t) {
        var clean = String(sectorName || '').toLowerCase().trim();
        return t.name.toLowerCase() === clean ||
               t.slug.toLowerCase() === clean ||
               (t.searchAliases && t.searchAliases.some(function (a) { return a.toLowerCase() === clean; }));
      });
      if (!tax) return null;
      return {
        subtitle: tax.subtitle,
        status: tax.validationStatus,
        statusColor: (tax.id === 'cattle-feed') ? '#DC2626' : (tax.id === 'colors' && tax.uncataloguedMaterials && tax.uncataloguedMaterials.length) ? '#D97706' : '#2563EB',
        description: tax.description,
        safetyNotice: tax.safetyNotice,
        applicationDetails: tax.applicationDetails,
        buyerEnquiryDetails: tax.applicationDetails,
        uncataloguedMaterials: tax.uncataloguedMaterials || [],
        sheetIndex: tax.sheetIndex,
        ctaText: tax.ctaText,
        defaultNotes: tax.defaultNotes
      };
    },
    getIndustrySummary: function () {
      var self = this;
      return masterTaxonomy.map(function (tax) {
        var matchingProds = products.filter(function (p) {
          return tax.linkedProductSlugs.indexOf(p.slug) !== -1 ||
                 tax.linkedProductSlugs.indexOf(p.id) !== -1 ||
                 p.industries.some(function (ind) { return ind.toLowerCase() === tax.name.toLowerCase(); });
        });
        return {
          id: tax.id,
          name: tax.name,
          slug: tax.slug,
          sheetIndex: tax.sheetIndex,
          badge: tax.badge,
          products: matchingProds,
          count: matchingProds.length,
          profile: self.getSectorProfile(tax.name),
          uncataloguedMaterials: tax.uncataloguedMaterials || []
        };
      });
    },
    getIndustriesForProduct: function (slug) {
      var prod = products.find(function (p) { return p.slug === slug || p.id === slug; });
      if (!prod) return [];
      return masterTaxonomy.filter(function (tax) {
        return tax.linkedProductSlugs.indexOf(prod.slug) !== -1 ||
               tax.linkedProductSlugs.indexOf(prod.id) !== -1 ||
               prod.industries.some(function (ind) { return ind.toLowerCase() === tax.name.toLowerCase(); });
      });
    },
    getCommonApplications: function () {
      return [
        { term: 'Fire Safety', label: 'Fire Safety' },
        { term: 'Gym Powder', label: 'Gym Powder' },
        { term: 'PVC', label: 'Rigid PVC & Profiles' },
        { term: 'Wall Putty', label: 'Wall Putty & Textures' },
        { term: 'Cosmetic', label: 'Cosmetic Powders' },
        { term: 'Rubber', label: 'Rubber Compounding' },
        { term: 'Ceramic', label: 'Ceramic Glazes & Bodies' },
        { term: 'Cable', label: 'Cable Sheathing & Wires' },
        { term: 'Master Batch', label: 'Polymer Masterbatches' },
        { term: 'Primers', label: 'Anti-corrosive Primers' },
        { term: 'Foundry', label: 'Foundry & Refractory' },
        { term: 'Effluent', label: 'Effluent Treatment (ETP)' }
      ];
    },
    getApplicationCategories: function () {
      return [
        {
          id: 'fire-safety',
          title: 'Fire Safety',
          subtitle: 'Mineral Materials for Fire-Safety Applications',
          description: "Explore mineral materials relevant to fire-safety-related industrial formulations and manufacturing applications. Deepali Minerals' application-discovery section should help buyers identify materials and enquire about their technical specifications and availability.",
          cardDescription: 'Explore Calcium Carbonate, Talc and Hydrated Lime for potential fire-safety-related industrial applications. Contact Deepali Minerals to discuss material suitability and technical requirements.',
          products: ['calcium-carbonate', 'talc', 'hydrated-lime'],
          enquiryFields: [
            'Company name',
            'Contact person',
            'Phone and email',
            'Intended fire-safety application',
            'Required material',
            'Technical requirements',
            'Required quantity',
            'Additional notes'
          ],
          ctaText: 'ENQUIRE FOR FIRE-SAFETY MATERIALS',
          ctaApplication: 'Fire Safety',
          ctaProduct: 'calcium-carbonate',
          disclaimer: 'These materials must not automatically be described as certified fire-retardant materials or as suitable for a specific fire-safety formulation. Actual suitability depends on the formulation and required performance standards. Do not claim fire-resistance ratings, certifications, flame-retardant performance or compliance unless supported by verified product documentation.'
        },
        {
          id: 'gym-powder',
          title: 'Gym Powder',
          subtitle: 'Magnesium Carbonate for Gym & Sports-Grip Applications',
          description: 'Magnesium Carbonate is commonly used in gym chalk and sports-grip powders to help absorb moisture from the hands and improve grip during weightlifting, gymnastics and other grip-intensive activities.',
          cardDescription: 'Explore Magnesium Carbonate for gym chalk and sports-grip powder applications. Contact Deepali Minerals to discuss grade, technical specifications and supply requirements.',
          products: ['magnesium-carbonate'],
          enquiryFields: [
            'Company or brand name',
            'Contact person',
            'Phone and email',
            'Intended application',
            'Required grade or specifications',
            'Required quantity',
            'Packaging preference',
            'Additional notes'
          ],
          ctaText: 'ENQUIRE ABOUT MAGNESIUM CARBONATE',
          ctaApplication: 'Gym Powder',
          ctaProduct: 'magnesium-carbonate',
          disclaimer: 'Actual suitability for finished gym chalk, skin contact or sports use depends on confirmed grade specifications. Deepali Minerals supplies industrial mineral grades; grade, particle size, packaging, and certifications to be confirmed with commercial desk prior to processing.'
        }
      ];
    },
    getDiscoveryQuestions: function () {
      return [
        { id: 'material', text: 'What material do you need?' },
        { id: 'manufacturing', text: 'What are you manufacturing?' },
        { id: 'industry', text: 'Which industry are you in?' },
        { id: 'application', text: 'What application is the material for?' },
        { id: 'filler', text: 'Do you need a filler or extender?' },
        { id: 'white', text: 'Do you need a white mineral?' },
        { id: 'micronized', text: 'Do you need a fine/micronized powder?' },
        { id: 'particle', text: 'Do you need a specific particle size?' },
        { id: 'plastics', text: 'Do you need a material for plastics?' },
        { id: 'paints', text: 'Do you need a material for paints/coatings?' },
        { id: 'rubber', text: 'Do you need a material for rubber?' },
        { id: 'cosmetics', text: 'Do you need a material for cosmetics?' },
        { id: 'pharma', text: 'Do you need a material for pharmaceutical applications?' },
        { id: 'pvc', text: 'Do you need a material for PVC?' },
        { id: 'ceramics', text: 'Do you need a material for ceramics?' },
        { id: 'construction', text: 'Do you need a material for construction?' },
        { id: 'paper', text: 'Do you need a material for paper?' },
        { id: 'cables', text: 'Do you need a material for cables?' },
        { id: 'custom', text: 'I have a specific requirement' }
      ];
    },
    searchByRequirement: function (text) {
      if (!text || String(text).trim() === '') return [];
      var clean = String(text).toLowerCase().trim();
      var stopWords = ['i', 'need', 'a', 'an', 'the', 'for', 'in', 'and', 'or', 'of', 'to', 'with', 'looking', 'want', 'require', 'material', 'materials', 'product', 'products'];
      var rawTokens = clean.split(/[^a-z0-9+#.-]+/);
      var tokens = rawTokens.filter(function (t) { return t.length > 1 && stopWords.indexOf(t) === -1; });
      if (!tokens.length) tokens = rawTokens.filter(function (t) { return t.length > 0; });

      var scored = products.map(function (p) {
        var score = 0;
        var matchedTerms = [];
        var nameLower = p.name.toLowerCase();
        var catLower = p.category.toLowerCase();
        var descLower = (p.shortDescription + ' ' + p.description).toLowerCase();
        var appsLower = (p.applications || []).join(' ').toLowerCase();
        var indsLower = (p.industries || []).join(' ').toLowerCase();
        var specsLower = JSON.stringify(p.specifications || {}).toLowerCase();
        var compLower = (p.composition || '').toLowerCase();
        var synsLower = (p.synonyms || []).join(' ').toLowerCase();

        // Exact phrase boost
        if (nameLower.indexOf(clean) !== -1) { score += 20; matchedTerms.push(p.name); }
        if (synsLower.indexOf(clean) !== -1) { score += 18; matchedTerms.push('Synonym match'); }
        if (compLower.indexOf(clean) !== -1) { score += 16; matchedTerms.push('Composition match'); }
        if (indsLower.indexOf(clean) !== -1) { score += 15; matchedTerms.push('Industry match'); }
        if (appsLower.indexOf(clean) !== -1) { score += 15; matchedTerms.push('Application match'); }

        // Token matches (with stem matching for plurals)
        tokens.forEach(function (token) {
          var stem = token.endsWith('s') && token.length > 3 ? token.slice(0, -1) : token;
          var matchToken = function (target) {
            return target.indexOf(token) !== -1 || (stem && target.indexOf(stem) !== -1);
          };

          if (matchToken(nameLower)) { score += 10; matchedTerms.push(token); }
          else if (matchToken(synsLower)) { score += 9; matchedTerms.push(token); }
          else if (matchToken(compLower)) { score += 8; matchedTerms.push(token); }
          else if (matchToken(indsLower)) { score += 7; matchedTerms.push(token); }
          else if (matchToken(appsLower)) { score += 6; matchedTerms.push(token); }
          else if (matchToken(catLower)) { score += 4; matchedTerms.push(token); }
          else if (matchToken(descLower)) { score += 3; matchedTerms.push(token); }
          else if (matchToken(specsLower)) { score += 2; matchedTerms.push(token); }
        });

        // Taxonomy sector and alias matching boost
        (masterTaxonomy || []).forEach(function (tax) {
          var matchedSector = false;
          if (clean.indexOf(tax.name.toLowerCase()) !== -1 || clean.indexOf(tax.slug.toLowerCase()) !== -1) {
            matchedSector = true;
          } else if (tax.searchAliases && tax.searchAliases.some(function (a) { return clean.indexOf(a.toLowerCase()) !== -1; })) {
            matchedSector = true;
          }
          if (matchedSector && (tax.linkedProductSlugs.indexOf(p.slug) !== -1 || tax.linkedProductSlugs.indexOf(p.id) !== -1)) {
            score += 15;
            matchedTerms.push(tax.name);
          }
        });

        // Uncatalogued candidate materials heuristic (Celite, Calcite)
        if (clean.indexOf('celite') !== -1) {
          if (['talc', 'china-clay', 'silica', 'calcium-carbonate'].indexOf(p.slug) !== -1) {
            score += 12;
            matchedTerms.push('Celite carrier application');
          }
        }
        if (clean.indexOf('calcite') !== -1) {
          if (['calcium-carbonate', 'marble-powder'].indexOf(p.slug) !== -1) {
            score += 14;
            matchedTerms.push('Calcite mineral base');
          }
        }

        // Heuristics for natural language keywords
        if ((clean.indexOf('white') !== -1 || clean.indexOf('bright') !== -1) && (p.specifications.whiteness || '').length > 0 && p.specifications.whiteness !== 'N/A') {
          score += 4; matchedTerms.push('Whiteness');
        }
        if ((clean.indexOf('fine') !== -1 || clean.indexOf('micron') !== -1 || clean.indexOf('mesh') !== -1) && (p.specifications.mesh || '').length > 0 && p.specifications.mesh !== 'N/A') {
          score += 4; matchedTerms.push('Micron/Mesh');
        }
        if ((clean.indexOf('filler') !== -1 || clean.indexOf('extender') !== -1) && (descLower.indexOf('filler') !== -1 || descLower.indexOf('extender') !== -1)) {
          score += 4; matchedTerms.push('Functional filler');
        }

        return {
          product: p,
          score: score,
          matches: matchedTerms.filter(function (val, idx, self) { return self.indexOf(val) === idx; })
        };
      });

      var matches = scored.filter(function (item) { return item.score > 0; });
      matches.sort(function (a, b) { return b.score - a.score; });
      return matches.map(function (item) { return item.product; });
    }
  };

  // Backwards compatibility alias
  window.DEEPALI_DATA = window.DeepaliData;

})();
