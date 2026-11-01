// Automated verification test script for Phase 3 - Industries & Application Mapping
const http = require('http');

// 1. Data Store Integrity Check
global.window = global;
require('../assets/js/data.js');

const data = window.DeepaliData;
console.log('=== 1. VERIFYING MASTER DATA INTEGRITY ===');
const industries = data.getCanonicalIndustries();
console.log(`Canonical Industries Count: ${industries.length} (Expected: 18)`);

if (industries.length !== 18) {
  console.error(`ERROR: Expected 18 canonical industries, got ${industries.length}`);
  process.exit(1);
}

const expected18 = [
  'Paints and Coatings',
  'Plastics and Polymers',
  'Rubber and Footwear',
  'Construction and Building Materials',
  'Ceramics',
  'Paper and Stationery',
  'FRP and Composite Applications',
  'Agriculture and Allied Applications',
  'Detergents and Household Products',
  'Foundry and Industrial Applications',
  'Plywood',
  'Wall Putty and NC Putty',
  'Fibre Murti',
  'Gulal and Rangoli',
  'Tile Adhesives',
  'Cattle Feed',
  'Fire Safety',
  'Gym Powder Applications'
];

let allMatched = true;
expected18.forEach((name, i) => {
  const ind = industries.find(item => item.name.toLowerCase() === name.toLowerCase());
  if (!ind) {
    console.error(`Missing expected industry: ${name}`);
    allMatched = false;
  } else {
    console.log(`[PASS] ${i + 1}. ${ind.name} (slug: ${ind.slug}) -> ${ind.products.length} products`);
  }
});

if (!allMatched) {
  process.exit(1);
}

// Check that all 22 products are mapped
console.log('\n=== 2. VERIFYING ALL 22 PRODUCTS MAPPING ===');
const prods = data.products;
console.log(`Catalogue Products: ${prods.length} (Expected: 22)`);
if (prods.length !== 22) {
  console.error(`ERROR: Expected 22 products, got ${prods.length}`);
  process.exit(1);
}

let unmappedCount = 0;
prods.forEach(p => {
  const cInds = p.canonicalIndustries || [];
  if (cInds.length === 0) {
    console.error(`[FAIL] Product ${p.name} has no canonical industries!`);
    unmappedCount++;
  } else {
    console.log(`[PASS] ${p.name} (${p.slug}): ${cInds.length} industries [${cInds.slice(0, 3).join(', ')}...]`);
  }
});

if (unmappedCount > 0) {
  console.error(`ERROR: ${unmappedCount} products have no canonical industry mapping!`);
  process.exit(1);
}

// 3. Check Regulatory Notices
console.log('\n=== 3. VERIFYING REGULATORY GOVERNANCE NOTICES ===');
const regulatedSectors = ['cattle-feed', 'fire-safety', 'agriculture-allied', 'gulal-rangoli', 'gym-powder'];
regulatedSectors.forEach(slug => {
  const ind = data.getCanonicalIndustryBySlug(slug);
  if (!ind || !ind.regulatoryNotice) {
    console.error(`[FAIL] Missing regulatory notice for ${slug}`);
    process.exit(1);
  } else {
    console.log(`[PASS] Regulatory notice verified for ${ind.name}`);
  }
});

console.log('\n=== ALL PHASE 3 DATA & APPLICATION CHECKS PASSED ===');
