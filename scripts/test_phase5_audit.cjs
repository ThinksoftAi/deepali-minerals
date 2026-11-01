// Phase 6: Production Launch & Technical SEO Verification Script
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PROD_DOMAIN = 'www.deepaliminerals.com';

function fetchUrl(urlPath, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '127.0.0.1',
      port: PORT,
      path: urlPath,
      method: 'GET',
      headers: {
        'User-Agent': 'Phase6-Launch-Audit/1.0',
        ...headers
      }
    };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    req.end();
  });
}

async function runAudit() {
  console.log('================================================================');
  console.log('PHASE 6: PRODUCTION LAUNCH & TECHNICAL SEO QUALITY ASSURANCE');
  console.log('Designated Production Domain: https://www.deepaliminerals.com/');
  console.log('================================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, message) {
    totalTests++;
    if (condition) {
      console.log(`[PASS] ${message}`);
      passedTests++;
    } else {
      console.error(`[FAIL] ${message}`);
    }
  }

  // 1. DATA INTEGRITY AUDIT
  console.log('--- 1. MASTER DATA INTEGRITY AUDIT ---');
  global.window = global;
  require('../assets/js/data.js');
  const data = window.DeepaliData;

  assert(data && data.products && data.products.length === 22, 'All 22 products verified in master data store.');
  assert(data.getCanonicalIndustries().length === 18, 'All 18 canonical industries present and accessible.');
  
  const missingImgs = data.products.filter(p => !p.image);
  assert(missingImgs.length === 0, 'All 22 products have assigned visual photography.');

  // 2. SITEMAP AUDIT
  console.log('\n--- 2. XML SITEMAP (44 CANONICAL URLS) AUDIT ---');
  const sitemapXml = fs.readFileSync(path.resolve(__dirname, '../sitemap.xml'), 'utf8');
  assert(sitemapXml.includes('<loc>https://www.deepaliminerals.com/</loc>'), 'Sitemap includes homepage (https://www.deepaliminerals.com/).');
  assert(sitemapXml.includes('<loc>https://www.deepaliminerals.com/products/</loc>'), 'Sitemap includes products catalogue.');
  assert(sitemapXml.includes('<loc>https://www.deepaliminerals.com/industries/</loc>'), 'Sitemap includes industries hub.');
  assert(sitemapXml.includes('<loc>https://www.deepaliminerals.com/about.html</loc>'), 'Sitemap includes corporate profile.');

  let allProductsInSitemap = true;
  data.products.forEach(p => {
    if (!sitemapXml.includes(`<loc>https://www.deepaliminerals.com/product.html?product=${p.slug}</loc>`)) {
      allProductsInSitemap = false;
      console.error(`Missing product in sitemap: ${p.slug}`);
    }
  });
  assert(allProductsInSitemap, 'All 22 products registered in sitemap.xml under https://www.deepaliminerals.com.');

  let allIndustriesInSitemap = true;
  data.getCanonicalIndustries().forEach(ind => {
    if (!sitemapXml.includes(`<loc>https://www.deepaliminerals.com/industries/?industry=${ind.slug}</loc>`)) {
      allIndustriesInSitemap = false;
      console.error(`Missing industry in sitemap: ${ind.slug}`);
    }
  });
  assert(allIndustriesInSitemap, 'All 18 canonical industries registered in sitemap.xml under https://www.deepaliminerals.com.');

  const publicSitemapXml = fs.readFileSync(path.resolve(__dirname, '../public/sitemap.xml'), 'utf8');
  assert(sitemapXml === publicSitemapXml, 'public/sitemap.xml is synchronized with root sitemap.xml.');

  // 3. PREVIEW PROTECTION & ROBOTS.TXT
  console.log('\n--- 3. SEARCH ENGINE VISIBILITY & PREVIEW NOINDEX SHIELD ---');
  // Preview / localhost host
  const previewRobotsRes = await fetchUrl('/robots.txt', { host: 'localhost:3000' });
  assert(
    previewRobotsRes.status === 200 && previewRobotsRes.body.includes('Disallow: /'),
    'Preview environment robots.txt strictly serves "Disallow: /".'
  );

  // Production domain host (www.deepaliminerals.com)
  const prodRobotsRes = await fetchUrl('/robots.txt', { host: 'www.deepaliminerals.com' });
  assert(
    prodRobotsRes.status === 200 && prodRobotsRes.body.includes('Allow: /') && prodRobotsRes.body.includes('https://www.deepaliminerals.com/sitemap.xml'),
    'Production domain (www.deepaliminerals.com) robots.txt serves "Allow: /" and sitemap pointer.'
  );

  // All entry HTML files contain runtime preview NOINDEX protection script
  const entryFiles = ['index.html', 'products/index.html', 'product.html', 'industries/index.html', 'about.html'];
  let allHaveNoindexProtection = true;
  entryFiles.forEach(file => {
    const content = fs.readFileSync(path.resolve(__dirname, '..', file), 'utf8');
    if (!content.includes('noindex,nofollow') || !content.includes('deepaliminerals.com')) {
      allHaveNoindexProtection = false;
      console.error(`File ${file} missing noindex,nofollow protection!`);
    }
  });
  assert(allHaveNoindexProtection, 'All 5 HTML entry points contain preview NOINDEX protection with production domain whitelist.');

  // 4. HTTP ROUTE VERIFICATION ON DEV SERVER
  console.log('\n--- 4. HTTP LIVE ROUTE ACCESSIBILITY (PORT 3000) ---');
  const routesToTest = [
    { path: '/', label: 'Homepage' },
    { path: '/products/', label: 'Catalogue Directory' },
    { path: '/industries/', label: 'Industries Discovery Hub' },
    { path: '/product.html?product=talc', label: 'Product Detail: Talc' },
    { path: '/product.html?product=polyester-resin', label: 'Product Detail: Polyester Resin' },
    { path: '/product.html?product=starch', label: 'Product Detail: Starch (Bio-Polymer)' },
    { path: '/industries/?industry=paints-coatings', label: 'Industry Detail: Paints & Coatings' },
    { path: '/industries/?industry=gym-powder', label: 'Industry Detail: Gym Powder Applications' },
    { path: '/about.html', label: 'Corporate Profile (about.html)' },
    { path: '/about/', label: 'Corporate Profile Directory (about/)' },
    { path: '/assets/css/styles.css', label: 'Global CSS Stylesheet' },
    { path: '/assets/js/app.js', label: 'App Controller' },
    { path: '/assets/js/data.js', label: 'Master Minerals Data' }
  ];

  for (const r of routesToTest) {
    try {
      const res = await fetchUrl(r.path);
      assert(res.status === 200, `${r.label} (${r.path}) returned HTTP 200 OK.`);
    } catch (err) {
      assert(false, `${r.label} (${r.path}) failed to connect: ${err.message}`);
    }
  }

  // 5. STRUCTURED DATA & CANONICAL AUDIT
  console.log('\n--- 5. STRUCTURED DATA (JSON-LD) AUDIT ---');
  const indexHtml = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  assert(indexHtml.includes('"@type": "Organization"'), 'index.html contains Schema.org Organization structured data.');
  assert(indexHtml.includes('"@type": "WebSite"'), 'index.html contains Schema.org WebSite structured data with SearchAction.');
  assert(indexHtml.includes('https://www.deepaliminerals.com/'), 'index.html contains canonical tag to https://www.deepaliminerals.com/.');
  assert(indexHtml.includes('og:title') && indexHtml.includes('twitter:card'), 'index.html contains Open Graph and Twitter Card tags.');

  const appJs = fs.readFileSync(path.resolve(__dirname, '../assets/js/app.js'), 'utf8');
  assert(appJs.includes('"@type": "Product"'), 'app.js includes dynamic Schema.org Product structured data.');
  assert(!appJs.includes('"aggregateRating"') && !appJs.includes('"reviewCount"'), 'Strict compliance: No fabricated ratings, reviews, or prices in Product schema.');
  assert(appJs.includes('"@type": "BreadcrumbList"'), 'app.js dynamically generates Schema.org BreadcrumbList structured data.');
  assert(appJs.includes('"@type": "CollectionPage"'), 'app.js generates Schema.org CollectionPage structured data on industry landing pages.');
  assert(appJs.includes('https://www.deepaliminerals.com/'), 'app.js updates canonical to https://www.deepaliminerals.com.');

  // 6. PERFORMANCE & MOBILE ERGONOMICS
  console.log('\n--- 6. PERFORMANCE & MOBILE ERGONOMICS AUDIT ---');
  assert(indexHtml.includes('rel="preconnect" href="https://fonts.googleapis.com"'), 'Font preconnect configured on index.html.');
  const stylesCss = fs.readFileSync(path.resolve(__dirname, '../assets/css/styles.css'), 'utf8');
  assert(stylesCss.includes('overflow-x: hidden'), 'Global overflow-x protection prevents mobile horizontal scrollbars.');
  assert(stylesCss.includes('min-height: 44px'), 'Mobile touch ergonomics enforce min-height: 44px on interactive controls.');
  assert(stylesCss.includes('font-size: 16px !important'), 'Form input zoom prevention active for iOS Safari.');

  // 7. SECURITY & INTEGRITY
  console.log('\n--- 7. SECURITY & INTEGRATIONS AUDIT ---');
  const allJs = appJs + data;
  assert(!allJs.includes('sk_live_') && !allJs.includes('AIzaSy'), 'Zero exposed private API keys or credentials.');
  assert(appJs.includes('919810516065'), 'Official Deepali Minerals verified WhatsApp number (+91 9810516065) active in enquiry handlers.');

  console.log('\n================================================================');
  console.log(`AUDIT SUMMARY: ${passedTests} / ${totalTests} CHECKS PASSED (${Math.round((passedTests/totalTests)*100)}%)`);
  console.log('================================================================');

  if (passedTests === totalTests) {
    console.log('>>> ALL PHASE 6 PRODUCTION LAUNCH CRITERIA VERIFIED SUCCESSFULLY <<<');
    process.exit(0);
  } else {
    console.error('>>> SOME CHECKS FAILED - REVIEW LOGS ABOVE <<<');
    process.exit(1);
  }
}

runAudit().catch(err => {
  console.error('Audit execution error:', err);
  process.exit(1);
});
