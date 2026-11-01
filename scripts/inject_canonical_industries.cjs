// Script to define and integrate the 18 Canonical Industries into assets/js/data.js
const fs = require('fs');
const path = require('path');

const canonicalIndustries = [
  {
    id: 'paints-coatings',
    slug: 'paints-coatings',
    name: 'Paints and Coatings',
    badge: 'Coatings & Primers',
    icon: 'palette',
    subtitle: 'Extenders, Functional Fillers, Primers & Opacifying Minerals for Architectural & Industrial Coatings',
    description: 'Deepali Minerals supplies high-whiteness mineral extenders, barrier pigments, matting agents, and opacifiers engineered for emulsion paints, primers, automotive finishes, and protective industrial coatings. Our minerals optimize pigment volume concentration (PVC), scrub resistance, anti-sagging properties, and weathering durability across solvent and waterborne formulations.',
    keyApplications: [
      'Architectural exterior and interior emulsion paints',
      'Industrial anti-corrosive primers and heavy-duty epoxy floor coatings',
      'Automotive OEM and refinish primers and surfacers',
      'Wood primers, sanding sealers, and exterior textured wall finishes'
    ],
    technicalHighlights: [
      'Controlled particle size distribution from 300 to 1250 mesh',
      'High whiteness (>92-98% L-value) and low oil absorption grades',
      'Chemical inertness, scrub resistance, and superior tint retention'
    ],
    linkedProductSlugs: [
      'talc', 'soap-stone', 'chalk-powder', 'hydrated-lime', 'china-clay',
      'kaoline', 'marble-powder', 'quartz-powder', 'calcium-carbonate',
      'redoxide', 'zinc-oxide', 'zinc-stearates', 'dolomite-powder',
      'silica', 'titanium-dioxide', 'barytes', 'french-chalk-powder',
      'marble-chips', 'quartz-sand', 'polyester-resin'
    ],
    productRoles: {
      'talc': 'Extender pigment, anti-sagging agent, weather resistance, and sheen control in primers & exterior paints',
      'soap-stone': 'Cost-effective lubricating filler for industrial primers and undercoats',
      'chalk-powder': 'Soft extender for distempers, lime washes, and utility emulsion paints',
      'hydrated-lime': 'Traditional mineral whitewashes, lime washes, and silicate paint formulations',
      'china-clay': 'Semi-reinforcing extender providing brushability, opacity enhancement, and anti-settling properties',
      'kaoline': 'Calcined/hydrated clay for gloss control, titanium dioxide extension, and enamel whiteness',
      'marble-powder': 'High-brightness calcium carbonate for texture paints, exterior wall coatings, and skim coats',
      'quartz-powder': 'High-hardness silica flour imparting scratch resistance and abrasion durability to industrial coatings',
      'calcium-carbonate': 'Primary high-brightness white extender optimizing pigment volume concentration (PVC) and hiding power',
      'redoxide': 'High-purity natural iron oxide pigment for anti-corrosive industrial primers, machinery enamels, and metal coats',
      'zinc-oxide': 'Fungistatic/mildew-resistant additive, pigment activator, and corrosion-inhibiting agent',
      'zinc-stearates': 'Anti-settling additive, flattening agent, and sanding lubricant for wood sanding sealers',
      'dolomite-powder': 'Weather-resistant magnesium-calcium carbonate extender for exterior coatings and primers',
      'silica': 'Matting agent, hardness enhancer, and abrasion-resistant filler for heavy-duty epoxy coatings',
      'titanium-dioxide': 'Prime white opacifying pigment providing maximum refractive index, tint strength, and UV weatherability',
      'barytes': 'Heavy barium sulphate filler providing high chemical resistance, acid/alkali barrier, and sound-damping primers',
      'french-chalk-powder': 'Micro-fine talc for satin-finish specialty coatings and dusting barrier applications',
      'marble-chips': 'Architectural aggregates for textured plaster coats and exterior stone-finish paints',
      'quartz-sand': 'Anti-skid floor coating aggregate and heavy-duty textured plaster filler',
      'polyester-resin': 'Protective clear coats, fiberglass-reinforced coatings, and automotive repair primers'
    },
    searchAliases: ['paints', 'coatings', 'varnish', 'primer', 'enamel', 'distemper', 'emulsion', 'anti-corrosive primer', 'automobile paints', 'paint'],
    defaultNotes: '[Sector Enquiry: Paints and Coatings] Required mineral(s): ; Formulation type (emulsion/primer/epoxy): ; Mesh/Micron specification: ; Volume: ',
    whatsappPrefill: 'Hello Deepali Minerals, I would like to enquire about mineral raw materials for Paints and Coatings. Required specifications: '
  },
  {
    id: 'plastics-polymers',
    slug: 'plastics-polymers',
    name: 'Plastics and Polymers',
    badge: 'Compounding & Masterbatch',
    icon: 'layers',
    subtitle: 'Functional Reinforcing Fillers, Lubricants & Opacifiers for Thermoplastics & Masterbatches',
    description: 'Mineral fillers, heat stabilizers, and slip agents for PP, PE, PVC, engineering plastics, masterbatches, and extruded profile compounding. Deepali Minerals supplies precision-graded calcium carbonates, lamellar talcs, and metallic stearates that dramatically enhance dimensional rigidity, heat deflection temperature (HDT), and processing economics.',
    keyApplications: [
      'Polypropylene (PP) and Polyethylene (PE) filler masterbatches',
      'Rigid and flexible PVC pipes, conduits, cables, and fitting compounds',
      'Automotive plastic components, battery casings, and appliance housings',
      'Engineering plastic compounding and mineral-reinforced polymer blends'
    ],
    technicalHighlights: [
      'Substantially improves flexural modulus, HDT, and impact strength',
      'Extremely low moisture content (<0.2%) preventing surface splay and polymer degradation',
      'Uniform surface treatment and high dispersion at compounding loadings up to 70%'
    ],
    linkedProductSlugs: [
      'talc', 'calcium-carbonate', 'zinc-stearates', 'titanium-dioxide',
      'barytes', 'china-clay', 'soap-stone', 'chalk-powder', 'dolomite-powder', 'redoxide'
    ],
    productRoles: {
      'talc': 'Nucleating agent, stiffness enhancer, and heat distortion temperature (HDT) booster for PP & automotive compounds',
      'calcium-carbonate': 'Dominant white filler in PE, PP, and PVC providing dimensional stability, opacity, and cost reduction',
      'zinc-stearates': 'Internal/external lubricant, mould release agent, and heat stabilizer for PVC, polystyrene, and masterbatch',
      'titanium-dioxide': 'High-opacity white masterbatch pigment providing brilliant whiteness and long-term UV weathering resistance',
      'barytes': 'High-density filler for automotive acoustic dampening plastics, sound barriers, and weighted appliance components',
      'china-clay': 'Calcined/hydrated clay filler for electrical cable insulation and high-dielectric polymer compounds',
      'soap-stone': 'Lubricating functional mineral filler for utility polymer compounding',
      'chalk-powder': 'Soft, low-abrasion mineral filler for flexible PVC goods, shoe compounds, and filler batches',
      'dolomite-powder': 'Economical magnesium-calcium carbonate filler for general industrial thermoplastic compounding',
      'redoxide': 'Coloring additive and pigment masterbatch base for reddish and terracotta plastic mouldings'
    },
    searchAliases: ['plastics', 'polymers', 'plastic', 'masterbatch', 'rigid pvc', 'pvc', 'eva', 'polypropylene', 'compounding'],
    defaultNotes: '[Sector Enquiry: Plastics and Polymers] Polymer base (PP/PE/PVC/EVA): ; Target loading percentage: ; Required mineral: ; Volume: ',
    whatsappPrefill: 'Hello Deepali Minerals, I would like to enquire about mineral raw materials for Plastics and Polymers. Required specifications: '
  },
  {
    id: 'rubber-footwear',
    slug: 'rubber-footwear',
    name: 'Rubber and Footwear',
    badge: 'Vulcanization & Moulding',
    icon: 'footprints',
    subtitle: 'Vulcanizing Activators, Reinforcing Fillers, Dusting Powders & Mould Release Minerals',
    description: 'Critical mineral raw materials for tires, industrial rubber goods, conveyor belts, footwear outsoles, EVA sheets, and moulded elastomer profiles. Our active zinc oxide, reinforcing carbonaceous whiteners, and platey dusting agents ensure smooth extrusion, fast cure activation, and high abrasion resistance in demanding vulcanized rubber compounds.',
    keyApplications: [
      'Tire treads, sidewalls, inner tubes, and retreading compounds',
      'Footwear outsoles, microcellular EVA sheets, and Hawaiian slipper soles',
      'Conveyor belting, industrial rubber hoses, gaskets, and seals',
      'Rubber extrusions, calendered sheets, and moulded footwear components'
    ],
    technicalHighlights: [
      'Active Zinc Oxide (>99% purity) for optimum vulcanization cure rate and rubber elasticity',
      'French Chalk / Talc platey dusting agents preventing rubber sheet sticking and adhesion',
      'Reinforcing carbonates and clays providing balanced tensile strength, modulus, and tear resistance'
    ],
    linkedProductSlugs: [
      'talc', 'french-chalk-powder', 'calcium-carbonate', 'zinc-oxide',
      'zinc-stearates', 'magnesium-carbonate', 'china-clay', 'soap-stone',
      'chalk-powder', 'titanium-dioxide', 'barytes'
    ],
    productRoles: {
      'talc': 'Anti-tack dusting agent, extrusion lubricant, and inert reinforcing filler for rubber compounding',
      'french-chalk-powder': 'Traditional silky dusting powder, mould release agent, and anti-adhesion barrier for footwear soles and unvulcanized rubber',
      'calcium-carbonate': 'High-purity white reinforcing filler improving hardness, tensile strength, and compound economics in rubber & EVA',
      'zinc-oxide': 'Essential vulcanization activator and accelerator synergist promoting cross-link formation and heat conductivity',
      'zinc-stearates': 'Internal processing aid, mould release lubricant, and rubber slab dip anti-adhesive',
      'magnesium-carbonate': 'Reinforcing white filler imparting transparency, hardness, and stiffness in translucent rubber soles',
      'china-clay': 'Semi-reinforcing clay filler enhancing modulus, tear strength, and abrasion resistance in mechanical rubber goods',
      'soap-stone': 'Parting powder and anti-stick dusting agent for calendered rubber sheeting and extrusion lines',
      'chalk-powder': 'Soft, low-abrasion mineral extender for utility rubber floor mats, shoe soles, and moulded articles',
      'titanium-dioxide': 'High-brightness white pigment for pure white footwear outsoles and colored rubber profiles',
      'barytes': 'Heavy mineral filler for high-density sound-proofing rubber pads and chemical-resistant industrial linings'
    },
    searchAliases: ['rubber', 'footwear', 'eva', 'shoes', 'soles', 'vulcanization', 'tires', 'mould release', 'chappal'],
    defaultNotes: '[Sector Enquiry: Rubber and Footwear] Rubber type (Natural/SBR/EPDM/EVA): ; Compound component (sole/mat/hose): ; Required mineral: ; Volume: ',
    whatsappPrefill: 'Hello Deepali Minerals, I would like to enquire about mineral raw materials for Rubber and Footwear. Required specifications: '
  },
  {
    id: 'construction-building-materials',
    slug: 'construction-building-materials',
    name: 'Construction and Building Materials',
    badge: 'Civil & Infrastructure',
    icon: 'building',
    subtitle: 'Hydraulic Binders, Architectural Aggregates, Silicas & Mortar Additives',
    description: 'High-calcium hydrated lime, graded silica aggregates, marble powders, and mineral extenders for ready-mix concrete, dry mortars, terrazzo, road construction, and masonry stabilization. Deepali Minerals supplies dependable bulk mineral grades that enhance compressive strength, workability, and long-term durability in civil infrastructure projects.',
    keyApplications: [
      'Ready-mix concrete, self-compacting concrete (SCC), and precast elements',
      'Traditional and dry-mix masonry mortars, structural plasters, and renders',
      'Terrazzo flooring, exposed aggregate architectural concrete, and paving blocks',
      'Road base stabilization, soil lime treatment, and asphalt filler compounding'
    ],
    technicalHighlights: [
      'High-calcium hydrated lime (>85-90% Available Ca(OH)2) for superior lime carbonation and workability',
      'Sub-angular graded quartz sand and marble aggregates providing structural interlock and compressive strength',
      'Natural iron oxide redoxide for permanent non-fading concrete pigmentation and interlocking pavers'
    ],
    linkedProductSlugs: [
      'hydrated-lime', 'marble-powder', 'marble-chips', 'quartz-sand',
      'quartz-powder', 'dolomite-powder', 'calcium-carbonate', 'redoxide',
      'silica', 'polyester-resin'
    ],
    productRoles: {
      'hydrated-lime': 'High-calcium chemical lime for masonry mortars, structural plaster stabilization, and soil lime treatment',
      'marble-powder': 'Fine calcium carbonate powder for architectural skim coats, dry-mix mortars, and artificial marble stone',
      'marble-chips': 'Graded crystalline marble aggregates for terrazzo flooring, exposed architectural concrete, and landscaping',
      'quartz-sand': 'Strictly sieved sub-angular quartz sand for high-strength structural concrete, grouts, and repair mortars',
      'quartz-powder': 'Micro-fine silica flour for ultra-high-performance concrete (UHPC), epoxy flooring, and dry mortar mixes',
      'dolomite-powder': 'Dense magnesium-calcium carbonate aggregate for structural plasters, exterior stucco, and terrazzo binder',
      'calcium-carbonate': 'Standard mineral filler for dry-mix mortars, gypsum joint compounds, caulks, and construction sealants',
      'redoxide': 'Natural UV-stable iron oxide pigment for coloring interlocking paver blocks, cement tiles, and roof tiles',
      'silica': 'Graded silica grains and flour for polymer-modified concrete, industrial flooring, and self-levelling screeds',
      'polyester-resin': 'Polymer concrete matrix, chemical anchor grouts, and composite structural reinforcing elements'
    },
    searchAliases: ['construction', 'building materials', 'masonry', 'plaster', 'concrete', 'aggregates', 'flooring', 'terrazzo'],
    defaultNotes: '[Sector Enquiry: Construction and Building Materials] Application (concrete/mortar/terrazzo/pavers): ; Required mineral: ; Grain/Mesh specification: ; Volume: ',
    whatsappPrefill: 'Hello Deepali Minerals, I would like to enquire about mineral raw materials for Construction and Building Materials. Required specifications: '
  },
  {
    id: 'ceramics',
    slug: 'ceramics',
    name: 'Ceramics',
    badge: 'Vitrification & Glazes',
    icon: 'circle-dot',
    subtitle: 'Plastic Clays, Fluxes, Glaze Modifiers & Thermal Shock Stabilizers',
    description: 'Raw mineral inputs for sanitaryware, ceramic wall and floor tiles, electrical porcelain insulators, refractories, and glaze frits. Deepali Minerals supplies high-plasticity china clays, pure kaolins, quartz powders, and fluxing minerals (Talc, Calcite, Dolomite) that optimize slip rheology, green strength, firing vitrification, and thermal shock resistance.',
    keyApplications: [
      'Vitreous sanitaryware slip casting (washbasins, water closets)',
      'Ceramic wall and floor tile bodies, engobes, and vitrified porcelain tiles',
      'Ceramic glazes, frits, crystalline glaze formulations, and color stains',
      'Electrical porcelain high-voltage insulators, cordierite bodies, and refractories'
    ],
    technicalHighlights: [
      'High green strength and controlled drying shrinkage in whiteware slip casting',
      'Fluxing minerals (Talc, Dolomite, Calcite) facilitating vitrification at optimum firing temperatures',
      'High-purity quartz and silica for thermal expansion matching, glaze hardness, and crazing resistance'
    ],
    linkedProductSlugs: [
      'china-clay', 'kaoline', 'quartz-powder', 'quartz-sand',
      'soap-stone', 'talc', 'dolomite-powder', 'calcium-carbonate',
      'zinc-oxide', 'marble-powder', 'redoxide', 'silica', 'marble-chips'
    ],
    productRoles: {
      'china-clay': 'High-plasticity white burning clay providing green casting strength and suspension stability in sanitaryware slip',
      'kaoline': 'Refractory white kaolin providing chemical purity, casting body suspension, and high-whiteness firing properties',
      'quartz-powder': 'Pure silica network former controlling body thermal expansion and preventing ceramic glaze crazing',
      'quartz-sand': 'Refractory silica grain providing thermal shock stability in kiln furniture and ceramic body formulations',
      'soap-stone': 'Talc-soapstone body flux reducing vitrification temperature and imparting thermal shock resistance in tiles',
      'talc': 'High-magnesium body flux for low-expansion wall tiles, cordierite bodies, and steatite electrical insulators',
      'dolomite-powder': 'Source of calcium and magnesium oxides (CaO & MgO) acting as high-temperature flux in ceramic glazes',
      'calcium-carbonate': 'Calcite flux reacting with silica during firing to form anorthite, enhancing glaze gloss and vitrification',
      'zinc-oxide': 'High-temperature glaze flux improving glaze gloss, thermal expansion matching, and crystalline flower formation',
      'marble-powder': 'Calcium flux in specialty ceramic bodies, engobes, and artistic terracotta preparations',
      'redoxide': 'Natural iron oxide ceramic stain and coloring agent for red body tiles, terracotta, and rustic glazes',
      'silica': 'High-purity SiO2 network former ensuring dimensional stability and thermal shock durability in fired ceramics',
      'marble-chips': 'Coarse marble fragments pressed into rustic terrazzo ceramic floor tiles and composite tiles'
    },
    searchAliases: ['ceramics', 'pottery', 'sanitaryware', 'ceramic tiles', 'glaze', 'vitrification', 'porcelain'],
    defaultNotes: '[Sector Enquiry: Ceramics] Ceramic type (sanitaryware/wall tile/glaze/insulator): ; Required mineral: ; Mesh/Firing requirement: ; Volume: ',
    whatsappPrefill: 'Hello Deepali Minerals, I would like to enquire about mineral raw materials for Ceramics. Required specifications: '
  },
  {
    id: 'paper-stationery',
    slug: 'paper-stationery',
    name: 'Paper and Stationery',
    badge: 'Pulp & Papermaking',
    icon: 'file-text',
    subtitle: 'Wet-End Retention Fillers, Sizing Binders, Opacifiers & Coating Clays',
    description: 'Essential mineral fillers, coating pigments, and sizing agents for pulp mills, paper mills, duplex packaging boards, writing paper, school blackboard chalk, and art stationery. Our lamellar talcs provide pitch control in pulp circuits, while our high-whiteness carbonates and kaolins deliver unmatched printing opacity, smoothness, and ink gloss.',
    keyApplications: [
      'Pulp mill pitch control, stickies passivation, and wet-end fiber retention',
      'Alkaline papermaking fillers for printing, writing, and photocopy papers',
      'Duplex board coating pigments for packaging boxes and folding cartons',
      'School blackboard chalks, pastel crayons, and stationery modeling materials'
    ],
    technicalHighlights: [
      'Organophilic talc selectively absorbing pitch and organic resins to keep pulp paper machines clean',
      'High-brightness kaolin and PCC/calcite delivering superior opacity, whiteness, and ink absorption',
      'Industrial starch for internal fiber bonding, wet-end tensile strength, and corrugated board gluing'
    ],
    linkedProductSlugs: [
      'talc', 'china-clay', 'kaoline', 'calcium-carbonate',
      'titanium-dioxide', 'hydrated-lime', 'starch', 'chalk-powder', 'french-chalk-powder'
    ],
    productRoles: {
      'talc': 'Pitch control agent in pulp processing and organophilic filler improving paper sheet smoothness and opacity',
      'china-clay': 'Premier paper coating pigment and wet-end filler providing ink holdout, gloss, and sheet formation',
      'kaoline': 'Ultra-fine high-whiteness coating clay for premium coated art papers, duplex boards, and publication grades',
      'calcium-carbonate': 'Dominant alkaline papermaking filler providing high brightness, opacity, bulk, and acid-free archival quality',
      'titanium-dioxide': 'Specialty premium opacifier for high-opacity thin papers, laminating decor papers, and currency grades',
      'hydrated-lime': 'Chemical recovery agent in kraft pulp liquor causticization, effluent water treatment, and bleaching',
      'starch': 'Modified/native starch for wet-end internal sizing, surface sizing press, and corrugated carton board adhesive',
      'chalk-powder': 'Primary raw material for dustless blackboard writing chalk, pastel crayons, and art stationery sticks',
      'french-chalk-powder': 'Superfine talc powder for dusting paper converting rolls, envelope manufacturing, and stationery items'
    },
    searchAliases: ['paper', 'stationery', 'pulp', 'paper mill', 'chalk', 'crayons', 'paperboard', 'duplex'],
    defaultNotes: '[Sector Enquiry: Paper and Stationery] Application (paper mill/coating/chalk/board): ; Required mineral: ; Whiteness/Mesh target: ; Volume: ',
    whatsappPrefill: 'Hello Deepali Minerals, I would like to enquire about mineral raw materials for Paper and Stationery. Required specifications: '
  },
  {
    id: 'frp-composites',
    slug: 'frp-composites',
    name: 'FRP and Composite Applications',
    badge: 'Composites & Tooling',
    icon: 'shield',
    subtitle: 'Unsaturated Resins, Shrink-Control Fillers & Gel Coat Minerals',
    description: 'High-performance polymer resins, casting fillers, and functional mineral additives for fiberglass reinforced plastics (FRP), SMC/BMC, and artificial stone. Deepali Minerals supplies unsaturated polyester resins along with micronized mineral fillers that reduce exothermic peak temperatures, eliminate shrinkage cracking, and produce flawless composite mouldings.',
    keyApplications: [
      'FRP tanks, pipes, chemical storage vessels, and cooling tower louvers',
      'Sheet Moulding Compound (SMC) and Bulk Moulding Compound (BMC) compression moulding',
      'Cultured marble bathtubs, kitchen sinks, vanity counters, and solid surface sheets',
      'Fiberglass boats, automotive body kits, electrical junction boxes, and architectural domes'
    ],
    technicalHighlights: [
      'General-purpose and isophthalic polyester resins with controlled reactivity and curing profiles',
      'Micro-fine mineral fillers reducing exothermic heat and volumetric shrinkage during resin curing',
      'Lamellar talc and marble powders for silky gel coat finishes and chemical corrosion barrier layers'
    ],
    linkedProductSlugs: [
      'polyester-resin', 'talc', 'china-clay', 'calcium-carbonate',
      'quartz-powder', 'marble-powder', 'marble-chips', 'french-chalk-powder'
    ],
    productRoles: {
      'polyester-resin': 'Unsaturated polyester resin matrix for fiberglass hand lay-up, spray-up, filament winding, and casting',
      'talc': 'Composite filler reducing polymerization shrinkage, improving flexural modulus, and boosting corrosion resistance',
      'china-clay': 'Functional filler for SMC/BMC formulations controlling resin flow, surface finish, and electrical insulation',
      'calcium-carbonate': 'Cost-effective high-loading filler for pultrusion profiles, sheet moulding, and artificial stone casting',
      'quartz-powder': 'High-hardness silica filler for wear-resistant composite tooling, chemical pipes, and epoxy casting',
      'marble-powder': 'Dense casting filler for cultured marble bathtubs, sanitary wash basins, and artificial stone slabs',
      'marble-chips': 'Crushed decorative marble fragments embedded into cast polymer vanity tops and architectural panels',
      'french-chalk-powder': 'Fine mould release dusting powder and filler for smooth, pinhole-free FRP surface gel coats'
    },
    searchAliases: ['frp', 'fiberglass', 'composites', 'grp', 'smc', 'bmc', 'polyester resin', 'composite tooling'],
    defaultNotes: '[Sector Enquiry: FRP and Composite Applications] Composite product: ; Resin or filler needed: ; Target filler loading: ; Volume: ',
    whatsappPrefill: 'Hello Deepali Minerals, I would like to enquire about mineral raw materials for FRP and Composites. Required specifications: '
  },
  {
    id: 'agriculture-allied',
    slug: 'agriculture-allied',
    name: 'Agriculture and Allied Applications',
    badge: 'Soil & Agrochemicals',
    icon: 'sprout',
    subtitle: 'Soil Conditioners, Agrochemical Carriers, Biofertilizer Fillers & Micronutrients',
    description: 'Neutralizing agricultural limes, micronized carrier powders for bio-fertilizers and bio-pesticides, and mineral soil amendments. Deepali Minerals supplies high-purity calcium and magnesium minerals that correct acidic soils, condition agricultural plots, and serve as biologically inert carriers for living microbial bio-fertilizers and pest-control dusts.',
    regulatoryNotice: 'COMMERCIAL QUALIFICATION NOTICE: Deepali Minerals supplies technical and industrial-grade bulk minerals. Prior to formulating direct soil fertilizers or bio-fertilizer carriers, customers must confirm required particle fineness, heavy metal assays, and carrier inertness for specific agricultural formulations.',
    keyApplications: [
      'Agricultural soil liming for pH correction and calcium/magnesium replenishment',
      'Inert dry carrier powders for bio-fertilizers (Rhizobium, Trichoderma, Azotobacter)',
      'Dry dusting carrier and diluent for agricultural pesticide and fungicide wettable powders',
      'Micronutrient fertilizer blending and soil conditioning amendments'
    ],
    technicalHighlights: [
      'Agricultural lime and dolomite for correcting soil pH and replenishing vital Ca/Mg nutrients',
      'Chemically inert talc and soapstone carriers preserving living bacterial cultures and shelf-life',
      'Micronized zinc oxide for foliar micronutrient spray formulations and soil zinc blending'
    ],
    linkedProductSlugs: [
      'hydrated-lime', 'dolomite-powder', 'kaoline', 'soap-stone',
      'talc', 'calcium-carbonate', 'zinc-oxide'
    ],
    productRoles: {
      'hydrated-lime': 'Agricultural lime for rapid neutralization of soil acidity, soil flocculation, and calcium enrichment',
      'dolomite-powder': 'Slow-release calcium and magnesium soil amendment balancing soil pH and preventing magnesium deficiency',
      'kaoline': 'Inert suspension carrier for crop dust formulations, wettable powders, and sunburn protection sprays',
      'soap-stone': 'Non-toxic, chemically inert carrier powder for bio-fertilizer formulations and microbial seed inoculants',
      'talc': 'Smooth lubricating carrier for bio-fertilizers, dry pesticide dusts, and seed treatment coatings',
      'calcium-carbonate': 'Natural calcium nutrient source and neutralizer for fertilizer blending and granulated soil conditioners',
      'zinc-oxide': 'High-concentration zinc source for micronutrient fertilizer blending and foliar agricultural sprays'
    },
    searchAliases: ['agriculture', 'biofertilizers', 'pesticides', 'soil conditioning', 'agrochemicals', 'fertilizer', 'lime'],
    defaultNotes: '[Sector Enquiry: Agriculture and Allied Applications] Application (soil liming/carrier/fertilizer): ; Required mineral: ; Target specification: ; Volume: ',
    whatsappPrefill: 'Hello Deepali Minerals, I would like to enquire about mineral raw materials for Agriculture and Allied Applications. Required specifications: '
  },
  {
    id: 'detergents-household',
    slug: 'detergents-household',
    name: 'Detergents and Household Products',
    badge: 'Cleaning & Detergency',
    icon: 'sparkles',
    subtitle: 'Mild Abrasives, Soap Builders, Bulking Agents & Cleaning Scrubbers',
    description: 'Inert mineral builders, scrubbing abrasives, and anti-caking agents for detergent bars, laundry powders, dishwashing cakes, and industrial cleaners. Deepali Minerals supplies controlled-hardness clays, carbonates, and soapstones that provide effective cleaning power without scratching delicate surfaces, while ensuring uniform bar structure and dry powder flow.',
    keyApplications: [
      'Laundry detergent bars, washing cakes, and synthetic detergent cakes',
      'Dry laundry detergent washing powders and industrial cleaning formulations',
      'Household scouring powders, abrasive cleaning pastes, and dishwashing bars',
      'Hard-surface cleansers, floor cleaning compounds, and grease-cutting pastes'
    ],
    technicalHighlights: [
      'Non-scratching Mohs hardness minerals (Talc, China Clay, Calcite) for gentle surface scouring',
      'China clay and soapstone yielding smooth bar consistency, moisture retention, and binder integration',
      'Anti-caking flow aids ensuring free-flowing dry laundry detergent mixes even in humid conditions'
    ],
    linkedProductSlugs: [
      'china-clay', 'soap-stone', 'talc', 'calcium-carbonate',
      'hydrated-lime', 'marble-powder', 'silica'
    ],
    productRoles: {
      'china-clay': 'Functional builder and plasticizer providing smooth bar texture, binding, and soil suspension in detergent cakes',
      'soap-stone': 'Mild abrasive and bulking filler for laundry detergent bars, scouring cakes, and cleaning pastes',
      'talc': 'Anti-caking flow agent for dry laundry powders and soft lubricant for smooth bar extrusion',
      'calcium-carbonate': 'Economical abrasive filler providing scouring power and density in domestic scouring powders and pastes',
      'hydrated-lime': 'Alkaline saponification agent, water softening additive in effluent treatment, and chemical builder',
      'marble-powder': 'Controlled-grit abrasive for heavy-duty household cleaning powders, tile cleaners, and polishing pastes',
      'silica': 'Hard abrasive grit for heavy-duty industrial scouring cleansers, mechanic hand soaps, and rust removers'
    },
    searchAliases: ['detergent', 'soap', 'household', 'cleaning', 'scouring powder', 'detergents', 'washing powder', 'dishwash'],
    defaultNotes: '[Sector Enquiry: Detergents and Household Products] Formulation (bar/powder/paste/scourer): ; Required mineral: ; Mesh size: ; Volume: ',
    whatsappPrefill: 'Hello Deepali Minerals, I would like to enquire about mineral raw materials for Detergents and Household Products. Required specifications: '
  },
  {
    id: 'foundry-industrial',
    slug: 'foundry-industrial',
    name: 'Foundry and Industrial Applications',
    badge: 'Casting & Metallurgy',
    icon: 'flame',
    subtitle: 'High-Purity Silica Sands, Refractory Powders, Parting Agents & Core Binders',
    description: 'Refractory quartz sands, silica flours, mould parting dusts, and organic core binders for ferrous and non-ferrous foundry casting operations. Deepali Minerals supplies high-refractoriness minerals that resist thermal shock at molten metal temperatures, prevent sand burn-on, and ensure clean casting strip and dimensional accuracy in metal foundries.',
    keyApplications: [
      'High-purity mould and core sands for grey iron, ductile iron, steel, and non-ferrous foundries',
      'Refractory mould washes, core washes, and high-temperature furnace coatings',
      'Pattern dusting and parting powders for green sand and shell moulding processes',
      'Cupola slag conditioning, hot metal desulphurization, and furnace lining maintenance'
    ],
    technicalHighlights: [
      'High-purity silica sand (>98.5% SiO2) with uniform sub-angular grain fineness and low acid demand',
      'Refractory parting powders preventing sand adherence to metal and wood patterns',
      'Starch core binders ensuring robust green strength and clean collapsibility after metal pouring'
    ],
    linkedProductSlugs: [
      'quartz-sand', 'quartz-powder', 'soap-stone', 'french-chalk-powder',
      'talc', 'starch', 'hydrated-lime', 'marble-powder', 'silica', 'dolomite-powder'
    ],
    productRoles: {
      'quartz-sand': 'High-purity sub-angular silica sand for green sand moulds, shell moulding, and resin-coated core sand',
      'quartz-powder': 'Refractory silica flour for refractory mould coatings, zircon wash substitutes, and foundry washes',
      'soap-stone': 'Foundry mould dusting and parting powder preventing sand adherence to metal patterns',
      'french-chalk-powder': 'Superfine parting powder for non-ferrous casting patterns, core boxes, and foundry moulds',
      'talc': 'Refractory parting dust and anti-stick release agent for high-precision casting patterns',
      'starch': 'Foundry core binder and green sand additive providing green compressive strength and clean thermal breakdown',
      'hydrated-lime': 'Slag conditioning flux and hot metal desulphurization additive in electric arc and induction furnaces',
      'marble-powder': 'Calcium carbonate fluxing agent for foundry cupolas, slag formation, and metal purification',
      'silica': 'High-temperature refractory sand and grains for furnace linings, ramming mass, and foundry patches',
      'dolomite-powder': 'Refractory fettling material and dead-burnt dolomite precursor for steel foundry furnace hearths'
    },
    searchAliases: ['foundry', 'foundary', 'casting', 'moulding', 'core sand', 'parting powder', 'metallurgy', 'refractory'],
    defaultNotes: '[Sector Enquiry: Foundry and Industrial Applications] Casting process (green sand/shell/core): ; Required mineral: ; AFS/Mesh requirement: ; Volume: ',
    whatsappPrefill: 'Hello Deepali Minerals, I would like to enquire about mineral raw materials for Foundry and Industrial Applications. Required specifications: '
  },
  {
    id: 'plywood',
    slug: 'plywood',
    name: 'Plywood',
    badge: 'Wood & Laminates',
    icon: 'box',
    subtitle: 'Resin Adhesive Extenders, Gap-Filling Fillers & Viscosity Stabilizers',
    description: 'Mineral extenders and fillers for urea-formaldehyde (UF) and phenol-formaldehyde (PF) adhesive glue lines in plywood, block boards, and flush doors. Deepali Minerals supplies fine clays and mineral carbonates that prevent resin bleed-through onto face veneers, extend glue pot life, and enhance shear bond strength under hot press conditions.',
    keyApplications: [
      'Plywood glue line extension for commercial (MR) and boiling waterproof (BWP) grades',
      'Block board, flush door, and particle board adhesive compounding',
      'Decorative laminate backing adhesives and veneer hot-pressing formulations',
      'Industrial wood sealers, putty formulations, and edge-banding adhesives'
    ],
    technicalHighlights: [
      'Effectively prevents resin bleed-through onto delicate decorative face veneers during hot pressing',
      'Stabilizes glue line viscosity and extends adhesive pot life in ambient workshop temperatures',
      'Enhances bond shear strength while reducing costly synthetic resin consumption'
    ],
    linkedProductSlugs: [
      'china-clay', 'calcium-carbonate', 'talc', 'soap-stone', 'silica'
    ],
    productRoles: {
      'china-clay': 'Premier extender for UF and PF plywood resin adhesives preventing glue penetration through face veneers',
      'calcium-carbonate': 'Economical high-purity filler for wood adhesives, resin glues, and flush door core bonding',
      'talc': 'Lubricating mineral extender improving glue spreadability, gap-filling capacity, and viscosity stability',
      'soap-stone': 'Inert, low-cost mineral extender for particle board and commercial plywood glue mixes',
      'silica': 'Fine silica flour additive improving glue line hardness, moisture barrier, and adhesive shear resistance'
    },
    searchAliases: ['plywood', 'plywood industry', 'blockboard', 'flush doors', 'uf glue', 'wood adhesive', 'resin extender'],
    defaultNotes: '[Sector Enquiry: Plywood] Resin type (UF/PF/Melamine): ; Product (plywood/blockboard/flush door): ; Required mineral: ; Volume: ',
    whatsappPrefill: 'Hello Deepali Minerals, I would like to enquire about mineral raw materials for Plywood. Required specifications: '
  },
  {
    id: 'wall-putty-nc-putty',
    slug: 'wall-putty-nc-putty',
    name: 'Wall Putty and NC Putty',
    badge: 'Surface Preparation',
    icon: 'brush',
    subtitle: 'Micronized Calcite, Fine Talc & Marble Powders for Cementitious & Body Putties',
    description: 'High-brightness white mineral bases engineered for cement-based wall putties, acrylic skim coats, and automotive nitrocellulose (NC) body repair putties. Our strictly graded calcite powders, marble flours, and lamellar talcs deliver exceptional whiteness, smooth knife trowelability, zero pinholing, and effortless feather-edge sandability.',
    keyApplications: [
      'White cement-based dry wall putties for interior and exterior masonry wall leveling',
      'Ready-to-use acrylic paste putties and decorative architectural skim coats',
      'Automotive nitrocellulose (NC) body putties, knifing fillers, and spot repair putties',
      'Wood putties, primer surfacers, and industrial metal repair paste compounds'
    ],
    technicalHighlights: [
      'Optimum particle size distribution (300 to 800 mesh) providing easy trowel glide and high square-foot coverage',
      'Exceptional whiteness (>94-96% L-value) creating an ultra-bright, uniform substrate for paint topcoats',
      'Fine talc and french chalk imparting feather-edge sandability without clogging sandpaper or producing pinholes'
    ],
    linkedProductSlugs: [
      'calcium-carbonate', 'dolomite-powder', 'marble-powder', 'talc',
      'french-chalk-powder', 'china-clay', 'soap-stone', 'silica'
    ],
    productRoles: {
      'calcium-carbonate': 'Primary high-brightness calcite base mineral for white cement and acrylic wall putties',
      'dolomite-powder': 'Dense, high-whiteness mineral bulk filler providing structural volume and weather resistance in wall putties',
      'marble-powder': 'Micro-fine crystalline marble flour imparting superior whiteness, smooth finish, and water resistance',
      'talc': 'Essential knife-grade smoothing agent providing easy butter-like trowelability, sandability, and anti-cracking in NC putty',
      'french-chalk-powder': 'Ultra-fine talc ensuring feather-edge blending and zero pinholing in automotive NC knifing putty',
      'china-clay': 'Rheology modifier, suspension agent, and anti-shrinkage clay filler in acrylic and paste putties',
      'soap-stone': 'Lubricious mineral filler for industrial body fillers and economical knifing putty formulations',
      'silica': 'Micronized silica flour imparting surface hardness, scratch resistance, and adhesion in heavy-duty repair putties'
    },
    searchAliases: ['wall putty', 'nc putty', 'putty', 'skim coat', 'body filler', 'cement putty', 'acrylic putty'],
    defaultNotes: '[Sector Enquiry: Wall Putty and NC Putty] Putty type (cement wall putty/acrylic/NC body putty): ; Required mineral: ; Mesh/Whiteness requirement: ; Volume: ',
    whatsappPrefill: 'Hello Deepali Minerals, I would like to enquire about mineral raw materials for Wall Putty and NC Putty. Required specifications: '
  },
  {
    id: 'fibre-murti',
    slug: 'fibre-murti',
    name: 'Fibre Murti',
    badge: 'Idols & Artware',
    icon: 'gem',
    subtitle: 'Polyester Casting Resins, Marble Flours & Heavy Density Fillers for Statues & Artware',
    description: 'Formulation minerals, casting resins, and mould-release dusting powders specialized for religious idols, architectural statues, and fiberglass craft mouldings. Deepali Minerals supplies premium unsaturated polyester resins and super-white marble powders that impart authentic stone density, crisp surface detail, and crack-free curing in silicone and FRP moulds.',
    keyApplications: [
      'Religious deity idols, fiberglass murtis, and devotional temple statuary',
      'Architectural fiberglass domes, ornamental pillars, jali panels, and decorative reliefs',
      'Cold-cast marble figurines, simulated stone sculptures, and museum replicas',
      'Theatrical props, themed park sculptures, and decorative artware castings'
    ],
    technicalHighlights: [
      'Clear and thixotropic polyester casting resins with controlled curing and low peak exotherm',
      'Super-white marble flour producing authentic carved-stone aesthetics, surface shine, and realistic weight',
      'French chalk and talc ensuring crisp detail replication and clean, flawless mould separation'
    ],
    linkedProductSlugs: [
      'polyester-resin', 'marble-powder', 'calcium-carbonate', 'talc',
      'marble-chips', 'french-chalk-powder', 'silica'
    ],
    productRoles: {
      'polyester-resin': 'Primary thermosetting binder resin for casting, laminating, and fabricating fiberglass murtis and statues',
      'marble-powder': 'Super-white crystalline casting filler blended with resin to give statues realistic stone weight and marble finish',
      'calcium-carbonate': 'Dense white filler reducing resin consumption, controlling exotherm, and providing solid casting weight',
      'talc': 'Lubricating filler promoting smooth resin flow into intricate mould details, sharp facial lines, and crack prevention',
      'marble-chips': 'Heavy marble fragments used as internal core weighting aggregates in large hollow statue bases',
      'french-chalk-powder': 'Silky parting dust applied to silicone and FRP moulds for flawless, defect-free statue demoulding',
      'silica': 'Reinforcing mineral flour for high-strength internal statue armature bonding and base stability'
    },
    searchAliases: ['fibre murti', 'murti', 'statues', 'idols', 'artware', 'crafts', 'casting resin', 'marble statue'],
    defaultNotes: '[Sector Enquiry: Fibre Murti] Statue type (idols/architectural/casting): ; Required resin/filler: ; Volume: ',
    whatsappPrefill: 'Hello Deepali Minerals, I would like to enquire about mineral raw materials for Fibre Murti. Required specifications: '
  },
  {
    id: 'gulal-rangoli',
    slug: 'gulal-rangoli',
    name: 'Gulal and Rangoli',
    badge: 'Festive & Decorative',
    icon: 'sun',
    subtitle: 'Silky Mineral Bases, Vibrant Dry Carriers & Free-Flowing Floor Color Minerals',
    description: 'Natural talcs, starches, and calcium carbonates used as safe, soft-textured carriers for herbal Gulal festival powders and free-flowing outdoor Rangoli colors. Deepali Minerals supplies high-brightness white mineral bases that absorb pigments evenly, feel silky smooth on application, and flow freely for intricate floor rangoli patterns.',
    regulatoryNotice: 'IMPORTANT FORMULATION NOTICE: Deepali Minerals supplies technical and industrial-grade mineral base powders. For festive gulal coming into direct skin contact, formulators must blend only certified cosmetic-safe, skin-tested organic dyes, and conduct dermatological verification.',
    keyApplications: [
      'Herbal and scented festive Gulal (Holi color powders)',
      'Dry powder color concentrates for festivals, color runs, and celebratory events',
      'Free-flowing granular white and colored floor Rangoli powders',
      'Decorative sand art, floral rangoli bases, and ceremonial white floor drawings'
    ],
    technicalHighlights: [
      'Ultra-soft talc base offering a silky smooth skin feel and gentle touch',
      'High dry pigment absorption delivering vibrant, saturated color development with minimal dye usage',
      'Free-flowing granulated marble and dolomite powders providing sharp, non-spreading floor rangoli lines'
    ],
    linkedProductSlugs: [
      'talc', 'chalk-powder', 'french-chalk-powder', 'marble-powder',
      'dolomite-powder', 'china-clay', 'kaoline', 'calcium-carbonate'
    ],
    productRoles: {
      'talc': 'Silky, soft base powder for herbal Gulal, imparting superior skin feel, soft glide, and uniform color absorption',
      'chalk-powder': 'Traditional soft white mineral base for economical non-toxic festive powders and colored chalk sticks',
      'french-chalk-powder': 'Premium silky cosmetic-touch mineral base for high-end scented festive gulal formulations',
      'marble-powder': 'Dense, bright white granular base mineral for outdoor floor Rangoli powders and decorative lines',
      'dolomite-powder': 'Sparkling white mineral aggregate for free-flowing rangoli powders that hold crisp geometrical patterns',
      'china-clay': 'Soft clay carrier enhancing pigment dispersion and adhesion in dry decorative color powders',
      'kaoline': 'Ultra-fine soft white kaolin base for smooth herbal gulal formulations and pastel decorative powders',
      'calcium-carbonate': 'Economical white bulking carrier for rangoli powders, floor powders, and bulk festive color blends'
    },
    searchAliases: ['gulal', 'rangoli', 'gulal / rangoli', 'colors', 'festival colors', 'holi powder', 'decorative colors'],
    defaultNotes: '[Sector Enquiry: Gulal and Rangoli] Product (Gulal/Rangoli): ; Required mineral base: ; Mesh size: ; Volume: ',
    whatsappPrefill: 'Hello Deepali Minerals, I would like to enquire about mineral raw materials for Gulal and Rangoli. Required specifications: '
  },
  {
    id: 'tile-adhesives',
    slug: 'tile-adhesives',
    name: 'Tile Adhesives',
    badge: 'Adhesives & Grouts',
    icon: 'grid',
    subtitle: 'Graded Silica Sands, Rheology Modifiers & Fine Carbonate Fillers for Tile Mortars',
    description: 'Strictly graded quartz sands, calcium carbonate extenders, and hydrated lime additives for polymer-modified tile adhesives (Type 1 to Type 4) and tile grouts. Deepali Minerals supplies precisely classified aggregates and mineral powders that ensure high tensile adhesion strength, zero vertical tile slip, extended open time, and non-shrink grout performance.',
    keyApplications: [
      'Polymer-modified cementitious tile adhesives (Type 1 for ceramic, Type 2 for vitrified, Type 4 for exterior stone)',
      'Cementitious and epoxy tile joint grouts, wall grouts, and swimming pool tile mortars',
      'Large-format porcelain and granite slab fixing mortars and flexible bonding adhesives',
      'Waterproof tile fixing mortars, floor screeds, and self-levelling underlayments'
    ],
    technicalHighlights: [
      'Sub-angular graded quartz sand (30-60, 40-80, 50-100 mesh) providing high mechanical interlock and slip resistance',
      'Fine calcium carbonate and talc improving open time, buttery trowel glide, and sag resistance on vertical walls',
      'Hydrated lime enhancing chemical bond strength, water retention, and long-term carbonation durability'
    ],
    linkedProductSlugs: [
      'quartz-sand', 'calcium-carbonate', 'hydrated-lime', 'marble-powder',
      'quartz-powder', 'silica', 'talc', 'marble-chips'
    ],
    productRoles: {
      'quartz-sand': 'Strictly graded silica sand providing tensile adhesion strength, mechanical interlock, and non-shrink performance',
      'calcium-carbonate': 'Fine filler optimizing water demand, workability, open time, and trowel slip resistance',
      'hydrated-lime': 'Plasticizer and bonding promoter improving water retention and long-term chemical adhesion in tile grouts',
      'marble-powder': 'High-whiteness calcium carbonate filler for white tile adhesives, premium wall grouts, and marble mortars',
      'quartz-powder': 'Micro-silica flour boosting bond strength, density, and chemical resistance in heavy-duty tile adhesives',
      'silica': 'Sub-angular silica flour for waterproof tile adhesives, non-shrink grouts, and pool fixing mortars',
      'talc': 'Anti-sagging additive imparting thixotropy and non-slip performance on vertical wall tile installations',
      'marble-chips': 'Decorative aggregate for heavy-duty commercial tile joint grouts, epoxy terrazzo joints, and stone grouts'
    },
    searchAliases: ['tile adhesives', 'tile adhesive', 'tile grout', 'dry mix mortar', 'thinset', 'polymer mortar'],
    defaultNotes: '[Sector Enquiry: Tile Adhesives] Adhesive grade (Type 1/Type 2/Grout): ; Required mineral: ; Sand mesh grade: ; Volume: ',
    whatsappPrefill: 'Hello Deepali Minerals, I would like to enquire about mineral raw materials for Tile Adhesives. Required specifications: '
  },
  {
    id: 'cattle-feed',
    slug: 'cattle-feed',
    name: 'Cattle Feed',
    badge: 'Livestock Premixes',
    icon: 'activity',
    subtitle: 'Calcium Carbonate (Calcite) & Mineral Buffers for Livestock Formulation Premixes',
    description: 'High-calcium mineral carbonates and buffering powders utilized in animal nutrition premixes, silage treatment, and agricultural feed manufacturing. Deepali Minerals supplies high-purity limestone and calcite powders providing essential elemental calcium for bone development, milk yield maintenance, and poultry eggshell integrity in formulated livestock feeds.',
    regulatoryNotice: 'MANDATORY REGULATORY COMPLIANCE NOTICE: Deepali Minerals is an industrial mineral supplier. Suitability of calcium carbonate or other minerals for livestock feed, poultry premixes, or animal nutrition is strictly subject to technical review and certified batch assay verifying regulatory limits for heavy metals (fluorine, lead, cadmium, arsenic). Deepali Minerals does NOT represent standard industrial stock as certified feed-grade without prior written technical qualification and batch release assay.',
    keyApplications: [
      'Dairy cattle mineral mixtures and dietary calcium supplements for milk yield',
      'Poultry layer and broiler feed premixes for skeletal strength and strong eggshells',
      'Silage buffering, pH stabilization, and livestock farm environmental hygiene',
      'Animal feed pelletizing, premix bulking, and anti-caking flow conditioning'
    ],
    technicalHighlights: [
      'High elemental calcium content (CaCO3 >90-95%) supporting bone mineralization and metabolic health',
      'Strict particle size classification ensuring homogeneous dispersion in bulk automated feed mixers',
      'Anti-caking flow aids preventing moisture clumping and bridging in bulk storage silos'
    ],
    linkedProductSlugs: [
      'calcium-carbonate', 'hydrated-lime', 'dolomite-powder', 'talc'
    ],
    productRoles: {
      'calcium-carbonate': 'Primary calcium mineral supplement in poultry and cattle feed premixes for bone and eggshell formation',
      'hydrated-lime': 'pH buffer for agricultural silage treatment and technical livestock farm sanitization',
      'dolomite-powder': 'Dual source of calcium and magnesium minerals for commercial agricultural livestock mineral blocks',
      'talc': 'Inert anti-caking flow aid and pelletizing lubricant for bulk feed concentrates and premixes'
    },
    searchAliases: ['cattle feed', 'animal feed', 'feed', 'livestock', 'poultry feed', 'calcium supplement', 'mineral mixture'],
    defaultNotes: '[Sector Enquiry: Cattle Feed] Feed type (dairy cattle/poultry/premix): ; Required mineral: ; Mesh/Assay requirement: ; Volume: ',
    whatsappPrefill: 'Hello Deepali Minerals, I would like to enquire about mineral raw materials for Cattle Feed. Required specifications: '
  },
  {
    id: 'fire-safety',
    slug: 'fire-safety',
    name: 'Fire Safety',
    badge: 'Flame Retardance',
    icon: 'shield-alert',
    subtitle: 'Endothermic Fillers, Cable Jacket Minerals & High-Temperature Barrier Compounds',
    description: 'Hydrated minerals, barium sulphate, and calcium carbonates used in flame-retardant polymer formulations, fire-stop mastics, and low-smoke halogen-free (LSHF) cables. Deepali Minerals supplies high-purity inert mineral fillers that assist in endothermic cooling, char stabilization, and smoke reduction when exposed to high thermal environments.',
    regulatoryNotice: 'TECHNICAL GOVERNANCE NOTICE: Mineral fillers contribute endothermic cooling, char formation, and smoke suppression in compounded plastics and rubbers. However, official fire ratings (UL 94 V-0, LOI, BS 476, ASTM E84) depend entirely on the customer\'s finished formulation and curing process. Deepali Minerals supplies raw industrial mineral fillers and does not provide standalone certified fire-retardant compound guarantees.',
    keyApplications: [
      'Low Smoke Zero Halogen (LSZH / LSHF) wire and cable compounding',
      'Fire-stop mastics, intumescent sealant formulations, and thermal barrier coatings',
      'Flame-retardant thermoplastic and rubber goods for public transit and construction',
      'Radiation shielding, sound deadening, and high-temperature fire barrier mastics'
    ],
    technicalHighlights: [
      'Talc lamellar crystals forming insulating ceramic char layers under direct flame impingement',
      'High-purity barytes imparting high density, heat absorption, and acoustic dampening in barrier coats',
      'Controlled chemical purity and low electrolyte content preventing electrical breakdown in cable compounds'
    ],
    linkedProductSlugs: [
      'talc', 'hydrated-lime', 'calcium-carbonate', 'barytes'
    ],
    productRoles: {
      'talc': 'Endothermic and char-forming mineral filler for flame-retardant PP, nylon, and cable sheath compounds',
      'hydrated-lime': 'Acidic gas neutralizer for fire suppression flue gases and high-temperature refractory bonding',
      'calcium-carbonate': 'Cost-effective endothermic mineral filler for fire-retardant carpet backings, sealants, and PVC cable jackets',
      'barytes': 'Heavy barium sulphate filler providing extreme density, radiation absorption, and thermal barrier mass in fire-stop compounds'
    },
    searchAliases: ['fire safety', 'fire retardant', 'flame retardant', 'cables', 'lshf', 'fire barrier', 'smoke suppressant'],
    defaultNotes: '[Sector Enquiry: Fire Safety] Application (LSZH cables/fire-stop sealant/plastic): ; Required mineral: ; Target flame retardance: ; Volume: ',
    whatsappPrefill: 'Hello Deepali Minerals, I would like to enquire about mineral raw materials for Fire Safety. Required specifications: '
  },
  {
    id: 'gym-powder',
    slug: 'gym-powder',
    name: 'Gym Powder Applications',
    badge: 'Athletic Grip',
    icon: 'dumbbell',
    subtitle: 'Magnesium Carbonate (Athletic Chalk) & Moisture-Absorbing Barrier Minerals',
    description: 'High-purity basic magnesium carbonate and french chalk used for maximum hand grip, moisture absorption, and friction control in gymnastics, rock climbing, and weightlifting. Deepali Minerals supplies light magnesium carbonates that absorb perspiration rapidly, keeping hands dry and preventing slipping during high-intensity athletic performance.',
    regulatoryNotice: 'APPLICATION ADVISORY: Deepali Minerals supplies technical and athletic-grade magnesium carbonate and french chalk for grip, sweat absorption, and sports equipment handling. Batches are packed in bulk industrial packaging. For retail branding or direct consumer packaging, buyers should ensure individual dermal compatibility testing.',
    keyApplications: [
      'Athletic gym chalk for powerlifting, Olympic weightlifting, and CrossFit',
      'Rock climbing chalk (loose chalk and chalk block formulation)',
      'Gymnastics beam, bars, and vault hand friction powder',
      'Sports equipment handling, racket grip dusting, and friction barrier powder'
    ],
    technicalHighlights: [
      'Basic light magnesium carbonate absorbing multiple times its weight in skin perspiration',
      'Non-toxic, clean mineral composition providing instant high-friction grip without greasy residue',
      'French chalk providing smooth friction control for gymnastics apparatus and sports accessories'
    ],
    linkedProductSlugs: [
      'magnesium-carbonate', 'french-chalk-powder', 'talc'
    ],
    productRoles: {
      'magnesium-carbonate': 'Premier athletic gym chalk for weightlifting, gymnastics, and climbing, absorbing sweat to create maximum friction',
      'french-chalk-powder': 'Fine mineral dusting powder for athletic equipment handling, gymnastics accessories, and grip control',
      'talc': 'Anti-friction dusting agent for gym equipment mats, weight training gear, and athletic accessories'
    },
    searchAliases: ['gym powder', 'gym chalk', 'athletic chalk', 'weightlifting chalk', 'climbing chalk', 'magnesium carbonate', 'grip powder'],
    defaultNotes: '[Sector Enquiry: Gym Powder Applications] Product (chalk powder/blocks/equipment grip): ; Required mineral: ; Packaging format: ; Volume: ',
    whatsappPrefill: 'Hello Deepali Minerals, I would like to enquire about mineral raw materials for Gym Powder Applications. Required specifications: '
  }
];

// Read existing data.js
const dataFilePath = path.join(__dirname, '../assets/js/data.js');
let dataContent = fs.readFileSync(dataFilePath, 'utf8');

// Check if canonicalIndustries already injected
if (dataContent.includes('const canonicalIndustries = [')) {
  console.log('canonicalIndustries already present in data.js');
} else {
  // Inject canonicalIndustries right before const masterTaxonomy = [
  const target = '  const masterTaxonomy = [';
  const replacement = `  const canonicalIndustries = ${JSON.stringify(canonicalIndustries, null, 2)};\n\n  // Bidirectional link: resolve actual product objects inside canonicalIndustries\n  canonicalIndustries.forEach(function (ind) {\n    ind.products = ind.linkedProductSlugs.map(function (slug) {\n      return products.find(function (p) { return p.slug === slug || p.id === slug; });\n    }).filter(Boolean);\n  });\n\n  // Bidirectional link: attach canonicalIndustries to products\n  canonicalIndustries.forEach(function (ind) {\n    ind.linkedProductSlugs.forEach(function (slug) {\n      var prod = products.find(function (p) { return p.slug === slug || p.id === slug; });\n      if (prod) {\n        if (!prod.canonicalIndustries) prod.canonicalIndustries = [];\n        if (prod.canonicalIndustries.indexOf(ind.name) === -1) prod.canonicalIndustries.push(ind.name);\n        if (!prod.industries) prod.industries = [];\n        if (prod.industries.indexOf(ind.name) === -1) prod.industries.push(ind.name);\n      }\n    });\n  });\n\n${target}`;

  dataContent = dataContent.replace(target, replacement);

  // Now inject exports into window.DeepaliData
  const exportTarget = '    masterTaxonomy: masterTaxonomy,';
  const exportReplacement = `    canonicalIndustries: canonicalIndustries,
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
    masterTaxonomy: masterTaxonomy,`;

  dataContent = dataContent.replace(exportTarget, exportReplacement);

  fs.writeFileSync(dataFilePath, dataContent, 'utf8');
  console.log('Successfully injected canonicalIndustries into assets/js/data.js');
}
