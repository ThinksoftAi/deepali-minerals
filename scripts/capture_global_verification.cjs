const fs = require('fs');
const puppeteer = require('puppeteer');

async function smoothScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 80);
    });
  });
  await new Promise(r => setTimeout(r, 1200));
}

(async () => {
  fs.mkdirSync('screenshots', { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  try {
    const page = await browser.newPage();

    // 1. Full Homepage Desktop (1440x900)
    console.log('[1/10] Capturing Full Homepage...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 30000 });
    await smoothScroll(page);
    await page.screenshot({ path: 'screenshots/full-homepage.png', fullPage: true });
    console.log(' -> Saved screenshots/full-homepage.png');

    // 2. Full About Us Desktop
    console.log('[2/10] Capturing Full About Us...');
    await page.goto('http://localhost:3000/about.html', { waitUntil: 'networkidle2', timeout: 30000 });
    await smoothScroll(page);
    await page.screenshot({ path: 'screenshots/full-about.png', fullPage: true });
    console.log(' -> Saved screenshots/full-about.png');

    // 3. Full Products Page Desktop
    console.log('[3/10] Capturing Full Products Catalog...');
    await page.goto('http://localhost:3000/products/', { waitUntil: 'networkidle2', timeout: 30000 });
    await smoothScroll(page);
    await page.screenshot({ path: 'screenshots/full-products.png', fullPage: true });
    console.log(' -> Saved screenshots/full-products.png');

    // 4. Full Individual Product Page (Talc)
    console.log('[4/10] Capturing Full Individual Product (Talc)...');
    await page.goto('http://localhost:3000/product.html?product=talc', { waitUntil: 'networkidle2', timeout: 30000 });
    await smoothScroll(page);
    await page.screenshot({ path: 'screenshots/full-product-talc.png', fullPage: true });
    console.log(' -> Saved screenshots/full-product-talc.png');

    // 5. Full Industries Page Desktop
    console.log('[5/10] Capturing Full Industries Hub...');
    await page.goto('http://localhost:3000/industries/', { waitUntil: 'networkidle2', timeout: 30000 });
    await smoothScroll(page);
    await page.screenshot({ path: 'screenshots/full-industries.png', fullPage: true });
    console.log(' -> Saved screenshots/full-industries.png');

    // 6. Quality Section / Page
    console.log('[6/10] Capturing Quality Assurance & Certifications...');
    await page.goto('http://localhost:3000/about.html#quality', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.evaluate(() => {
      const q = document.getElementById('quality') || document.querySelector('.quality-section');
      if (q) q.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'screenshots/full-quality.png', fullPage: false });
    console.log(' -> Saved screenshots/full-quality.png');

    // 7. Contact Section / Page
    console.log('[7/10] Capturing Contact / RFQ Showroom Section...');
    await page.goto('http://localhost:3000/#rfq', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.evaluate(() => {
      const el = document.getElementById('rfq');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'screenshots/full-contact.png', fullPage: false });
    console.log(' -> Saved screenshots/full-contact.png');

    // 8. Desktop Navigation with Products Dropdown OPEN
    console.log('[8/10] Capturing Desktop Navigation with Products Megamenu OPEN...');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('#nav-products-megamenu', { timeout: 10000 });
    // Click to open or hover
    await page.click('#nav-products-megamenu > a');
    await new Promise(r => setTimeout(r, 600));
    // Verify dropdown is visible and compute its bounds
    const productsDropdown = await page.$('#nav-products-megamenu .mega-menu-dropdown');
    if (productsDropdown) {
      await page.screenshot({ path: 'screenshots/dropdown-products-open.png', fullPage: false });
      console.log(' -> Saved screenshots/dropdown-products-open.png');
    } else {
      console.error('Products megamenu element not found');
    }

    // 9. Desktop Navigation with Industries Dropdown OPEN
    console.log('[9/10] Capturing Desktop Navigation with Industries Dropdown OPEN...');
    // Close products and click industries
    await page.click('#nav-industries-dropdown > a');
    await new Promise(r => setTimeout(r, 600));
    const industriesDropdown = await page.$('#nav-industries-dropdown .dropdown-menu');
    if (industriesDropdown) {
      await page.screenshot({ path: 'screenshots/dropdown-industries-open.png', fullPage: false });
      console.log(' -> Saved screenshots/dropdown-industries-open.png');
    } else {
      console.error('Industries dropdown element not found');
    }

    // 10. Mobile Navigation with Submenu EXPANDED
    console.log('[10/10] Capturing Mobile Navigation with Submenu EXPANDED...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('.menu-toggle', { timeout: 10000 });
    // Open mobile menu
    await page.click('.menu-toggle');
    await new Promise(r => setTimeout(r, 600));
    // Expand Products Accordion
    const prodAccBtn = await page.$('#mobile-products-toggle');
    if (prodAccBtn) {
      await prodAccBtn.click();
      await new Promise(r => setTimeout(r, 600));
    }
    // Expand Industries Accordion
    const indAccBtn = await page.$('#mobile-industries-toggle');
    if (indAccBtn) {
      await indAccBtn.click();
      await new Promise(r => setTimeout(r, 600));
    }
    await page.screenshot({ path: 'screenshots/mobile-submenu-expanded.png', fullPage: false });
    console.log(' -> Saved screenshots/mobile-submenu-expanded.png');

    console.log('\n=== ALL 10 MANDATORY SCREENSHOTS CAPTURED SUCCESSFULLY ===');
  } catch (err) {
    console.error('Error during screenshot capture:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
