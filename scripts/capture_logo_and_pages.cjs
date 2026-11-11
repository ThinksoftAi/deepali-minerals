const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  fs.mkdirSync('screenshots', { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  try {
    const page = await browser.newPage();

    // 1. Desktop Viewport (1440x900)
    await page.setViewport({ width: 1440, height: 900 });
    console.log('Navigating to http://localhost:3000/ ...');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('.site-header', { timeout: 10000 });
    await page.waitForSelector('.brand-logo', { timeout: 10000 });

    // Scroll smoothly to trigger lazy loading of all images
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
        }, 100);
      });
    });

    // Wait a brief moment after scroll to ensure all images and fonts settle
    await new Promise(r => setTimeout(r, 2000));

    // Capture Desktop Header
    const headerEl = await page.$('.site-header');
    if (headerEl) {
      await headerEl.screenshot({ path: 'screenshots/desktop-header.png' });
      console.log('Captured screenshots/desktop-header.png');
    }

    // Capture Individual Sections
    const sectionA = await page.$('#hero');
    if (sectionA) {
      await sectionA.screenshot({ path: 'screenshots/section-a-hero.png' });
      console.log('Captured screenshots/section-a-hero.png');
    }

    const sectionC = await page.$('#about-company');
    if (sectionC) {
      await sectionC.screenshot({ path: 'screenshots/section-c-about.png' });
      console.log('Captured screenshots/section-c-about.png');
    }

    const sectionD = await page.$('#portfolio');
    if (sectionD) {
      await sectionD.screenshot({ path: 'screenshots/section-d-products.png' });
      console.log('Captured screenshots/section-d-products.png');
    }

    const sectionE = await page.$('#sourcing');
    if (sectionE) {
      await sectionE.screenshot({ path: 'screenshots/section-e-sourcing.png' });
      console.log('Captured screenshots/section-e-sourcing.png');
    }

    const sectionF = await page.$('#industries');
    if (sectionF) {
      await sectionF.screenshot({ path: 'screenshots/section-f-industries.png' });
      console.log('Captured screenshots/section-f-industries.png');
    }

    const sectionG = await page.$('#why');
    if (sectionG) {
      await sectionG.screenshot({ path: 'screenshots/section-g-strengths.png' });
      console.log('Captured screenshots/section-g-strengths.png');
    }

    const sectionH = await page.$('#updates');
    if (sectionH) {
      await sectionH.screenshot({ path: 'screenshots/section-h-blogs.png' });
      console.log('Captured screenshots/section-h-blogs.png');
    }

    const sectionIJFooter = await page.$('#rfq');
    if (sectionIJFooter) {
      await sectionIJFooter.screenshot({ path: 'screenshots/section-i-j-footer.png' });
      console.log('Captured screenshots/section-i-j-footer.png');
    }

    // Capture Footer
    const footerEl = await page.$('.footer');
    if (footerEl) {
      await footerEl.screenshot({ path: 'screenshots/footer.png' });
      console.log('Captured screenshots/footer.png');
    }

    // Full-page Desktop Homepage
    await page.screenshot({ path: 'deepali-homepage-full-desktop.png', fullPage: true });
    console.log('Captured deepali-homepage-full-desktop.png');

    // 2. Mobile Viewport (390x844 iPhone 13/14)
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('.site-header', { timeout: 10000 });

    // Scroll to lazy load images on mobile
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
        }, 100);
      });
    });
    await new Promise(r => setTimeout(r, 1500));

    // Capture Mobile Header
    const mobileHeaderEl = await page.$('.site-header');
    if (mobileHeaderEl) {
      await mobileHeaderEl.screenshot({ path: 'screenshots/mobile-header.png' });
      console.log('Captured screenshots/mobile-header.png');
    }

    // Capture Mobile Footer
    const mobileFooterEl = await page.$('.footer');
    if (mobileFooterEl) {
      await mobileFooterEl.screenshot({ path: 'screenshots/mobile-footer.png' });
      console.log('Captured screenshots/mobile-footer.png');
    }

    // Full-page Mobile Homepage
    await page.screenshot({ path: 'deepali-homepage-full-mobile.png', fullPage: true });
    console.log('Captured deepali-homepage-full-mobile.png');

    // 3. About Us Page Desktop
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/about.html', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('.site-header', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: 'screenshots/about-desktop.png', fullPage: false });
    console.log('Captured screenshots/about-desktop.png');

    // 4. Product Page Desktop (Talc)
    await page.goto('http://localhost:3000/product.html?product=talc', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('.site-header', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: 'screenshots/product-talc-desktop.png', fullPage: false });
    console.log('Captured screenshots/product-talc-desktop.png');

    console.log('All verification screenshots captured successfully!');
  } finally {
    await browser.close();
  }
})();
