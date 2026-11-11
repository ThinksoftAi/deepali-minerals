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
      }, 70);
    });
  });
  await new Promise(r => setTimeout(r, 1000));
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
    console.log('[1/11] Capturing Full Desktop Homepage...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Convert lazy to eager and wait for all images
    await page.evaluate(async () => {
      document.querySelectorAll('img').forEach(img => {
        img.loading = 'eager';
      });
    });
    await smoothScroll(page);
    await page.evaluate(async () => {
      const imgs = Array.from(document.querySelectorAll('img'));
      await Promise.all(imgs.map(img => {
        if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = img.onerror = resolve;
        });
      }));
    });
    await new Promise(r => setTimeout(r, 800));

    await page.screenshot({ path: 'screenshots/deepali-homepage-full-desktop.png', fullPage: true });
    fs.copyFileSync('screenshots/deepali-homepage-full-desktop.png', 'screenshots/full-homepage.png');
    console.log(' -> Saved screenshots/deepali-homepage-full-desktop.png');

    // 2. Full Mobile Homepage (390x844)
    console.log('[2/11] Capturing Full Mobile Homepage...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 30000 });
    await smoothScroll(page);
    await page.screenshot({ path: 'screenshots/deepali-homepage-full-mobile.png', fullPage: true });
    console.log(' -> Saved screenshots/deepali-homepage-full-mobile.png');

    // Reset to Desktop for section screenshots
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 30000 });
    await smoothScroll(page);

    // Helper for element screenshot
    async function captureSection(selector, filename, label) {
      console.log(`Capturing ${label} (${selector})...`);
      const el = await page.$(selector);
      if (el) {
        await page.evaluate((sel) => {
          const target = document.querySelector(sel);
          if (target) {
            target.scrollIntoView({ behavior: 'instant', block: 'center' });
            target.querySelectorAll('img').forEach(img => {
              img.loading = 'eager';
            });
          }
        }, selector);
        await new Promise(r => setTimeout(r, 600));
        await page.evaluate(async (sel) => {
          const target = document.querySelector(sel);
          if (target) {
            const imgs = Array.from(target.querySelectorAll('img'));
            await Promise.all(imgs.map(img => {
              if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
              return new Promise(resolve => {
                img.onload = img.onerror = resolve;
              });
            }));
          }
        }, selector);
        await new Promise(r => setTimeout(r, 400));
        await el.screenshot({ path: `screenshots/${filename}` });
        console.log(` -> Saved screenshots/${filename}`);
      } else {
        console.warn(` [WARN] Selector ${selector} not found!`);
      }
    }

    // 3. Hero banner
    await captureSection('#hero', 'section-hero.png', '[3/11] Hero Banner');

    // 4. About section
    await captureSection('#about-company', 'section-about.png', '[4/11] About Section');

    // 5. Complete product showcase
    await captureSection('#portfolio', 'section-products.png', '[5/11] Product Showcase');

    // 6. Sourcing & Logistics Network
    await captureSection('#sourcing', 'section-sourcing.png', 'Sourcing Corridors');

    // 7. Industries We Serve
    await captureSection('#industries', 'section-industries.png', '[6/11] Industries We Serve');

    // 8. Why Choose Deepali Minerals
    await captureSection('#why', 'section-strengths.png', '[7/11] Why Choose Deepali Minerals');

    // 9. Packaging and Logistics
    await captureSection('#facilities', 'section-logistics.png', '[8/11] Packaging & Logistics');

    // 10. Blogs and Resources
    await captureSection('#updates', 'section-resources.png', '[9/11] Blogs & Resources');

    // 11. Contact section
    await captureSection('#rfq', 'section-contact.png', '[10/11] Contact Section');

    // 12. Open Desktop Dropdown
    console.log('[11/11] Capturing Open Navigation Dropdown...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 400));
    
    await page.waitForSelector('#nav-products-megamenu > a', { timeout: 10000 });
    await page.click('#nav-products-megamenu > a');
    await new Promise(r => setTimeout(r, 600));
    const productsDropdown = await page.$('#nav-products-megamenu .mega-menu-dropdown');
    if (productsDropdown) {
      await page.screenshot({ path: 'screenshots/dropdown-products-open.png', fullPage: false });
      console.log(' -> Saved screenshots/dropdown-products-open.png');
    } else {
      console.warn(' [WARN] productsDropdown element not found!');
    }

    console.log('\n>>> ALL HOMEPAGE SHOWCASE SCREENSHOTS CAPTURED SUCCESSFULLY <<<');
  } catch (err) {
    console.error('Screenshot capture failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
