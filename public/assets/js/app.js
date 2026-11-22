/**
 * Deepali Minerals B2B Portal - Presentation & Dynamic Routing Controller
 * Phase 4: B2B Buyer Experience + Industry / Application Discovery
 * Preserves the exact approved Codex mineral visual design system.
 */

(function () {
  'use strict';

  // Deployment-Aware Robots Policy (Strict Preview-Only NOINDEX Protection)
  (function applyDeploymentRobotsPolicy() {
    if (typeof window === 'undefined' || !window.location) return;
    var host = (window.location.hostname || '').toLowerCase();
    // Protect ALL preview environments (preview.deepaliminerals.com, Cloud Run, localhost, staging) from indexing
    var isProduction = (host === 'www.deepaliminerals.com' || host === 'deepaliminerals.com' || host === 'www.deepaliminerals.in' || host === 'deepaliminerals.in');
    if (!isProduction) {
      var existing = document.querySelector('meta[name="robots"]');
      if (!existing) {
        var meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex,nofollow';
        document.head.appendChild(meta);
      } else {
        existing.setAttribute('content', 'noindex,nofollow');
      }
    }
  })();

  // SEO & Structured Data Management Helpers
  function setMetaTag(name, content, isProperty) {
    if (!content) return;
    const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      if (isProperty) el.setAttribute('property', name);
      else el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function setCanonicalUrl(url) {
    if (!url) return;
    let el = document.querySelector('link[rel="canonical"]');
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', 'canonical');
      document.head.appendChild(el);
    }
    el.setAttribute('href', url);
  }

  function updateSeoMeta(config) {
    if (!config) return;
    if (config.title) {
      document.title = config.title;
      setMetaTag('og:title', config.title, true);
      setMetaTag('twitter:title', config.title, false);
    }
    if (config.description) {
      setMetaTag('description', config.description, false);
      setMetaTag('og:description', config.description, true);
      setMetaTag('twitter:description', config.description, false);
    }
    if (config.canonical) {
      setCanonicalUrl(config.canonical);
      setMetaTag('og:url', config.canonical, true);
    }
    if (config.ogType) {
      setMetaTag('og:type', config.ogType, true);
    }
    if (config.ogImage) {
      setMetaTag('og:image', config.ogImage, true);
      setMetaTag('twitter:image', config.ogImage, false);
    }
    setMetaTag('twitter:card', 'summary_large_image', false);
    setMetaTag('og:site_name', 'Deepali Minerals', true);
  }

  function setBreadcrumbsJsonLd(items) {
    if (!items || !items.length) return;
    let script = document.getElementById('breadcrumbs-jsonld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'breadcrumbs-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": item.name,
        "item": item.url
      }))
    });
  }

  // Enforce Clean Natural Mineral White Theme Tokens
  (function enforceWhiteThemeTokens() {
    if (typeof document === 'undefined') return;
    const rootEl = document.documentElement;
    if (rootEl) {
      rootEl.style.setProperty('--paper', '#FFFFFF');
      rootEl.style.setProperty('--surface', '#FFFFFF');
      rootEl.style.setProperty('--fog', '#F8F9FA');
      rootEl.style.setProperty('--line', '#E2E5E9');
      rootEl.style.setProperty('--ink', '#252F3D');
      rootEl.style.setProperty('--slate', '#526071');
      rootEl.style.backgroundColor = '#FFFFFF';
    }
    const applyBody = () => {
      if (document.body && document.body.style) {
        document.body.style.backgroundColor = '#FFFFFF';
        document.body.style.color = '#252F3D';
      }
    };
    applyBody();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyBody);
    }
  })();

  const data = window.DeepaliData;
  const root = document.body ? (document.body.dataset.root || '.') : '.';
  const page = document.body.dataset.page;
  const esc = (value) => String(value || '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  
  const whatsappIconSvg = (w = 16, h = 16) => `
    <svg class="whatsapp-icon" viewBox="0 0 24 24" width="${w}" height="${h}" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8.01 12.27C8.14 12.44 9.76 14.94 12.24 16.01C12.83 16.27 13.28 16.42 13.64 16.53C14.23 16.72 14.77 16.69 15.2 16.63C15.68 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 13.98C16.32 13.86 15.12 13.27 14.9 13.19C14.68 13.1 14.52 13.06 14.36 13.3C14.19 13.55 13.73 14.09 13.59 14.25C13.45 14.41 13.31 14.43 13.07 14.31C12.82 14.18 11.78 13.84 10.56 12.75C9.61 11.9 8.97 10.86 8.84 10.64C8.72 10.42 8.83 10.3 8.95 10.18C9.06 10.07 9.2 9.89 9.32 9.75C9.45 9.61 9.49 9.5 9.57 9.34C9.65 9.17 9.61 9.03 9.55 8.91C9.49 8.78 9.03 7.65 8.84 7.2C8.65 6.75 8.46 6.82 8.32 6.81C8.18 6.81 8.02 6.81 7.85 6.81"/>
    </svg>
  `;

  const getWhatsAppUrl = (msg) => {
    const rawNumber = (data && data.company && data.company.whatsappNumber) || '919810516065';
    const cleanNumber = String(rawNumber).replace(/[^0-9]/g, '') || '919810516065';
    const text = msg || 'Hello Deepali Minerals, I would like to discuss my industrial mineral requirement.';
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  const productUrl = (product, industryCtx, appCtx, routeCtx) => {
    let url = `${root}/product.html?product=${encodeURIComponent(product.slug || product.id)}`;
    if (industryCtx) url += `&industry=${encodeURIComponent(industryCtx)}`;
    if (appCtx) url += `&app=${encodeURIComponent(appCtx)}`;
    if (routeCtx) url += `&route=${encodeURIComponent(routeCtx)}`;
    return url;
  };
  const productsUrl = `${root}/products/`;
  const industriesUrl = `${root}/industries/`;

  /* =========================================================================
   * TITLE-MATCHED HERO PHOTOS & RESTORE CONTROLLER (PER-PAGE + SITE-WIDE)
   * ========================================================================= */
  const VISUAL_BACKUP_SLUGS = new Set([
    'agriculture-allied',
    'ceramics',
    'construction-building-materials',
    'corporate-intro-banner',
    'detergents-household',
    'foundry',
    'frp-composites',
    'packaging-logistics-depot',
    'paints-coatings',
    'paper-stationery',
    'plastics-polymers',
    'quality-assurance-lab',
    'rubber-footwear'
  ]);

  const getIndustryImageSrc = (slug) => `${root}/assets/images/industries/${slug}.webp`;

  const getBackupImageSrc = (slug) => {
    const norm = slug === 'foundry-industrial' ? 'foundry' : slug;
    return VISUAL_BACKUP_SLUGS.has(norm) ? `${root}/assets/images/industries/backup/${norm}.webp` : '';
  };

  function renderHeroVisualBanner({ pageKey, imgSrc, alt, caption, backupSrc }) {
    return `
      <div class="page-hero-visual-banner" data-hero-visual-banner="${esc(pageKey)}">
        <div class="page-hero-photo-frame">
          <img
            src="${imgSrc}"
            alt="${esc(alt)}"
            data-photo-src="${imgSrc}"
            ${backupSrc ? `data-backup-src="${backupSrc}"` : ''}
            loading="eager"
          />
        </div>
        <div class="hero-visual-toolbar">
          <span class="hero-visual-caption">${esc(caption)}</span>
          <div class="hero-visual-actions">
            <button type="button" class="hero-visual-btn" data-hero-toggle-page="${esc(pageKey)}">
              Hide Hero Photo (Restore Classic)
            </button>
            <button type="button" class="hero-visual-btn hero-visual-btn-restore" data-hero-toggle-global>
              Restore All Original Visuals
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function initVisualRestoreControls() {
    const GLOBAL_KEY = 'dm_visual_restore_global';
    const PAGES_KEY = 'dm_visual_restore_pages';

    const readGlobal = () => {
      try {
        return localStorage.getItem(GLOBAL_KEY) === '1';
      } catch (_) {
        return false;
      }
    };

    const writeGlobal = (val) => {
      try {
        localStorage.setItem(GLOBAL_KEY, val ? '1' : '0');
      } catch (_) {}
    };

    const readPages = () => {
      try {
        const raw = localStorage.getItem(PAGES_KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        return (parsed && typeof parsed === 'object') ? parsed : {};
      } catch (_) {
        return {};
      }
    };

    const writePages = (obj) => {
      try {
        localStorage.setItem(PAGES_KEY, JSON.stringify(obj));
      } catch (_) {}
    };

    const applyVisualState = () => {
      const isGlobal = readGlobal();
      const hiddenPages = readPages();

      if (document.body) {
        document.body.classList.toggle('dm-restored-classic', isGlobal);
      }

      document.querySelectorAll('[data-hero-visual-banner]').forEach((banner) => {
        const key = banner.getAttribute('data-hero-visual-banner') || '';
        const isRestored = isGlobal || !!hiddenPages[key];
        banner.classList.toggle('is-classic-restored', isRestored);

        const pageBtn = banner.querySelector('[data-hero-toggle-page]');
        if (pageBtn) {
          pageBtn.textContent = isRestored ? 'Show Hero Photo' : 'Hide Hero Photo (Restore Classic)';
          pageBtn.setAttribute('aria-pressed', isRestored ? 'true' : 'false');
        }
      });

      document.querySelectorAll('[data-hero-toggle-global]').forEach((btn) => {
        btn.textContent = isGlobal ? 'Show New Industry Photos' : 'Restore All Original Visuals';
        btn.setAttribute('aria-pressed', isGlobal ? 'true' : 'false');
      });

      document.querySelectorAll('img[data-photo-src][data-backup-src]').forEach((img) => {
        const target = isGlobal ? img.getAttribute('data-backup-src') : img.getAttribute('data-photo-src');
        if (target && img.getAttribute('src') !== target) {
          img.setAttribute('src', target);
        }
      });
    };

    document.querySelectorAll('[data-hero-toggle-page]').forEach((btn) => {
      if (btn.dataset.restoreBound === '1') return;
      btn.dataset.restoreBound = '1';
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-hero-toggle-page') || '';
        const isGlobal = readGlobal();
        const hiddenPages = readPages();
        if (isGlobal) {
          // Switching a single page back to photo exits global classic mode while keeping other pages intact
          writeGlobal(false);
          delete hiddenPages[key];
        } else if (hiddenPages[key]) {
          delete hiddenPages[key];
        } else {
          hiddenPages[key] = true;
        }
        writePages(hiddenPages);
        applyVisualState();
      });
    });

    document.querySelectorAll('[data-hero-toggle-global]').forEach((btn) => {
      if (btn.dataset.restoreBound === '1') return;
      btn.dataset.restoreBound = '1';
      btn.addEventListener('click', () => {
        const nextGlobal = !readGlobal();
        writeGlobal(nextGlobal);
        if (!nextGlobal) {
          writePages({});
        }
        applyVisualState();
      });
    });

    applyVisualState();
  }

  function header() {
    const headerEl = document.querySelector('#site-header');
    if (!headerEl) return;

    // Categorize products for the mega menu
    const powders = (data.products || []).filter(p => p.category === 'Industrial Minerals' || p.category === 'Mineral Powders');
    const chemicals = (data.products || []).filter(p => p.category === 'Functional Chemicals');
    const grains = (data.products || []).filter(p => p.category === 'Grains & Aggregates' || p.category === 'Industrial Materials');

    headerEl.innerHTML = `
      <!-- Corporate Utility Top Bar -->
      <div class="corporate-topbar">
        <div class="shell corporate-topbar-inner">
          <div class="topbar-contact-group">
            <a href="tel:+919810516065" class="topbar-item" title="Call Primary Helpline">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+91 9810516065</span>
            </a>
            <span class="topbar-sep">|</span>
            <a href="tel:+919810715129" class="topbar-item" title="Call Secondary Helpline">
              <span>9810715129</span>
            </a>
            <span class="topbar-sep">|</span>
            <a href="mailto:info@deepaliminerals.in" class="topbar-item" title="Email Sales Desk">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>info@deepaliminerals.in</span>
            </a>
          </div>

          <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
            <div class="topbar-badge-iso">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>ISO 9001:2015 &middot; ISO 14001:2015</span>
            </div>
            <span class="topbar-timing">Mon &ndash; Sat: 9:00 AM &ndash; 7:30 PM IST</span>
            <a href="${getWhatsAppUrl()}" target="_blank" rel="noopener noreferrer" class="topbar-whatsapp-btn">
              ${whatsappIconSvg(13, 13)}
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Main Corporate Header (White Background, Dark Readable Nav) -->
      <header class="site-header">
        <div class="shell header-inner">
          <a class="brand dm-interactive-logo" href="${root}/" aria-label="Deepali Minerals home" data-dm-logo="true">
            <img src="${root}/assets/images/brand/logo.png" alt="Deepali Minerals" class="brand-logo" width="200" height="100" referrerpolicy="no-referrer" />
          </a>

          <!-- Primary Desktop Nav -->
          <nav class="nav-links" aria-label="Primary navigation">
            <a href="${root}/" class="${page === 'home' ? 'active' : ''}">Home</a>
            <a href="${root}/about.html" class="${page === 'about' ? 'active' : ''}">About Us</a>

            <!-- Products Mega Menu (All 22 Products — Zero Mesh Captions) -->
            <div class="nav-has-megamenu" id="nav-products-megamenu">
              <a href="${productsUrl}" class="nav-link-with-icon ${page === 'products' || page === 'product' ? 'active' : ''}" aria-expanded="false" aria-haspopup="true">
                <span>Products</span>
                <svg class="nav-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </a>

              <div class="mega-menu-dropdown">
                <div class="shell">
                  <div class="mega-menu-grid">
                    <!-- Column 1: Minerals & Powders -->
                    <div>
                      <div class="mega-menu-col-title">
                        <span>Minerals &amp; Powders</span>
                        <span class="count">${powders.length} Items</span>
                      </div>
                      <ul class="mega-menu-list">
                        ${powders.map(p => `
                          <li class="mega-menu-item">
                            <a href="${productUrl(p)}">
                              <span>${esc(p.name)}</span>
                              <span class="tag">Mineral</span>
                            </a>
                          </li>
                        `).join('')}
                      </ul>
                    </div>

                    <!-- Column 2: Functional Chemicals -->
                    <div>
                      <div class="mega-menu-col-title">
                        <span>Functional Chemicals</span>
                        <span class="count">${chemicals.length} Items</span>
                      </div>
                      <ul class="mega-menu-list">
                        ${chemicals.map(p => `
                          <li class="mega-menu-item">
                            <a href="${productUrl(p)}">
                              <span>${esc(p.name)}</span>
                              <span class="tag">${p.slug === 'starch' ? 'Industrial' : 'Chemical'}</span>
                            </a>
                          </li>
                        `).join('')}
                      </ul>
                    </div>

                    <!-- Column 3: Grains & Materials -->
                    <div>
                      <div class="mega-menu-col-title">
                        <span>Grains &amp; Materials</span>
                        <span class="count">${grains.length} Items</span>
                      </div>
                      <ul class="mega-menu-list">
                        ${grains.map(p => `
                          <li class="mega-menu-item">
                            <a href="${productUrl(p)}">
                              <span>${esc(p.name)}</span>
                              <span class="tag">Material</span>
                            </a>
                          </li>
                        `).join('')}
                      </ul>
                    </div>

                    <!-- Column 4: Sourcing Spotlight Card -->
                    <div>
                      <div class="mega-menu-spotlight-card">
                        <div>
                          <span class="mega-spotlight-badge">INDUSTRIAL MATERIALS PORTFOLIO</span>
                          <h4 class="mega-spotlight-title">All 22 Minerals &amp; Materials</h4>
                          <ul class="dm-bullet-list dm-bullet-list--compact" style="margin-bottom: 1.15rem;">
                            <li>Verified industrial mineral powders, chemicals, and granular grades.</li>
                            <li>ISO 9001:2015 &amp; ISO 14001:2015 certified trading operations.</li>
                            <li>Technical Data Sheets (TDS) and batch COAs shared on request.</li>
                          </ul>
                        </div>
                        <div>
                          <a href="${productsUrl}" class="mega-spotlight-cta">View All Products &rarr;</a>
                          <div style="margin-top: 0.7rem; text-align: center;">
                            <a href="${root}/#rfq" style="font-size: 0.76rem; font-weight: 700; color: #1769AA; text-decoration: underline;">Enquire Now &rarr;</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Industries Dropdown Menu (Verified Canonical Slugs Only) -->
            <div class="nav-has-dropdown" id="nav-industries-dropdown">
              <a href="${industriesUrl}" class="nav-link-with-icon ${page === 'industries' ? 'active' : ''}" aria-expanded="false" aria-haspopup="true">
                <span>Industries</span>
                <svg class="nav-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </a>
              <div class="dropdown-menu">
                <div class="dropdown-grid">
                  <a href="${industriesUrl}?industry=paints-coatings" class="dropdown-item">Paints &amp; Coatings</a>
                  <a href="${industriesUrl}?industry=plastics-polymers" class="dropdown-item">Plastics &amp; Polymers</a>
                  <a href="${industriesUrl}?industry=rubber-footwear" class="dropdown-item">Rubber &amp; Footwear</a>
                  <a href="${industriesUrl}?industry=ceramics" class="dropdown-item">Ceramics</a>
                  <a href="${industriesUrl}?industry=construction-building-materials" class="dropdown-item">Construction Materials</a>
                  <a href="${industriesUrl}?industry=paper-stationery" class="dropdown-item">Paper &amp; Stationery</a>
                  <a href="${industriesUrl}?industry=wall-putty-nc-putty" class="dropdown-item">Wall Putty &amp; NC Putty</a>
                  <a href="${industriesUrl}?industry=foundry-industrial" class="dropdown-item">Foundry &amp; Industrial</a>
                  <a href="${industriesUrl}?industry=agriculture-allied" class="dropdown-item">Agriculture &amp; Allied</a>
                  <a href="${industriesUrl}?industry=detergents-household" class="dropdown-item">Soaps &amp; Detergents</a>
                  <a href="${industriesUrl}" class="dropdown-item-all" style="grid-column: 1 / -1; font-weight: 700; color: #1769AA; border-top: 1px solid #E2E5E9; padding-top: 0.5rem; margin-top: 0.25rem;">
                    View All 18 Industries &rarr;
                  </a>
                </div>
              </div>
            </div>

            <a href="${root}/#quality">Quality</a>
            <a href="${root}/#operations">Operations</a>
            <a href="${root}/#resources">Resources</a>
            <a href="${root}/#contact">Contact Us</a>
          </nav>

          <div class="header-actions">
            <a class="header-whatsapp" href="${getWhatsAppUrl()}" target="_blank" rel="noopener noreferrer" aria-label="Contact on WhatsApp">
              ${whatsappIconSvg(15, 15)}
              <span>WhatsApp</span>
            </a>
            <a class="button header-cta" href="${root}/#rfq">Enquire Now</a>
            <button class="menu-toggle" aria-expanded="false" aria-controls="mobile-nav">
              <span style="font-size: 1.05rem; line-height: 1; margin-right: 0.25rem;" aria-hidden="true">☰</span>
              <span>Menu</span>
            </button>
          </div>
        </div>

        <!-- Mobile Drawer Navigation -->
        <nav class="shell mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
          <a href="${root}/">Home</a>
          <a href="${root}/about.html">About Us</a>

          <!-- Products Accordion -->
          <button type="button" class="mobile-nav-toggle-btn" id="mobile-products-toggle" aria-expanded="false">
            <span>Products (All 22 Materials)</span>
            <span class="mobile-toggle-arrow" id="mobile-products-arrow">&darr;</span>
          </button>

          <div class="mobile-nav-submenu" id="mobile-products-submenu">
            <h4>Minerals &amp; Powders</h4>
            ${powders.map(p => `<a href="${productUrl(p)}">${esc(p.name)}</a>`).join('')}

            <h4>Functional Chemicals</h4>
            ${chemicals.map(p => `<a href="${productUrl(p)}">${esc(p.name)}</a>`).join('')}

            <h4>Grains &amp; Materials</h4>
            ${grains.map(p => `<a href="${productUrl(p)}">${esc(p.name)}</a>`).join('')}

            <a href="${productsUrl}" style="font-weight: 700; color: #1769AA; margin-top: 0.5rem; display: block;">View All 22 Products &rarr;</a>
          </div>

          <!-- Industries Accordion -->
          <button type="button" class="mobile-nav-toggle-btn" id="mobile-industries-toggle" aria-expanded="false">
            <span>Industries (18 Sectors)</span>
            <span class="mobile-toggle-arrow" id="mobile-industries-arrow">&darr;</span>
          </button>

          <div class="mobile-nav-submenu" id="mobile-industries-submenu">
            <a href="${industriesUrl}?industry=paints-coatings">Paints &amp; Coatings</a>
            <a href="${industriesUrl}?industry=plastics-polymers">Plastics &amp; Polymers</a>
            <a href="${industriesUrl}?industry=rubber-footwear">Rubber &amp; Footwear</a>
            <a href="${industriesUrl}?industry=ceramics">Ceramics</a>
            <a href="${industriesUrl}?industry=construction-building-materials">Construction Materials</a>
            <a href="${industriesUrl}?industry=paper-stationery">Paper &amp; Stationery</a>
            <a href="${industriesUrl}?industry=frp-composites">FRP &amp; Composites</a>
            <a href="${industriesUrl}?industry=foundry-industrial">Foundry &amp; Industrial</a>
            <a href="${industriesUrl}?industry=agriculture-allied">Agriculture &amp; Allied</a>
            <a href="${industriesUrl}?industry=detergents-household">Soaps &amp; Detergents</a>
            <a href="${industriesUrl}" style="font-weight: 700; color: #1769AA; margin-top: 0.5rem; display: block;">View All 18 Industries &rarr;</a>
          </div>

          <a href="${root}/#quality">Quality</a>
          <a href="${root}/#operations">Operations</a>
          <a href="${root}/#resources">Resources</a>
          <a href="${root}/#contact">Contact Us</a>

          <a class="mobile-whatsapp" href="${getWhatsAppUrl()}" target="_blank" rel="noopener noreferrer">
            ${whatsappIconSvg(18, 18)}
            <span>WhatsApp Sales Desk</span>
          </a>
          <a class="button" href="${root}/#rfq" style="margin-top: 0.5rem; text-align: center;">Enquire Now</a>
        </nav>
      </header>
    `;

    const toggle = document.querySelector('.menu-toggle');
    if (toggle) {
      toggle.addEventListener('click', e => {
        const menu = document.querySelector('.mobile-nav');
        if (!menu) return;
        const open = menu.classList.toggle('open');
        e.currentTarget.setAttribute('aria-expanded', open);
        e.currentTarget.innerHTML = open 
          ? '<span style="font-size: 1.1rem; line-height: 1; margin-right: 0.25rem;">✕</span><span>Close</span>'
          : '<span style="font-size: 1.1rem; line-height: 1; margin-right: 0.25rem;">☰</span><span>Menu</span>';
      });
    }

    const prodToggle = document.querySelector('#mobile-products-toggle');
    if (prodToggle) {
      prodToggle.addEventListener('click', () => {
        const sub = document.querySelector('#mobile-products-submenu');
        const arrow = document.querySelector('#mobile-products-arrow');
        if (sub) {
          const expanded = sub.classList.toggle('is-expanded');
          prodToggle.setAttribute('aria-expanded', expanded);
          if (arrow) arrow.innerHTML = expanded ? '&uarr;' : '&darr;';
        }
      });
    }

    const indToggle = document.querySelector('#mobile-industries-toggle');
    if (indToggle) {
      indToggle.addEventListener('click', () => {
        const sub = document.querySelector('#mobile-industries-submenu');
        const arrow = document.querySelector('#mobile-industries-arrow');
        if (sub) {
          const expanded = sub.classList.toggle('is-expanded');
          indToggle.setAttribute('aria-expanded', expanded);
          if (arrow) arrow.innerHTML = expanded ? '&uarr;' : '&darr;';
        }
      });
    }

    // Auto-close mobile menu when clicking any link inside it
    document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventListener('click', () => {
        const menu = document.querySelector('.mobile-nav');
        if (menu && menu.classList.contains('open')) {
          menu.classList.remove('open');
          if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.innerHTML = '<span style="font-size: 1.1rem; line-height: 1; margin-right: 0.25rem;">☰</span><span>Menu</span>';
          }
        }
      });
    });

    // Initialize Desktop Nav Hover Intent & Grace Period
    initDesktopNavDropdowns();
  }

  /* =========================================================================
   * DESKTOP NAV DROPDOWN & MEGA MENU CONTROLLER (CLICK & HOVER TOGGLE)
   * ========================================================================= */
  function initDesktopNavDropdowns() {
    const dropdownTriggers = [
      {
        wrap: document.querySelector('#nav-products-megamenu'),
        menu: document.querySelector('#nav-products-megamenu .mega-menu-dropdown')
      },
      {
        wrap: document.querySelector('#nav-industries-dropdown'),
        menu: document.querySelector('#nav-industries-dropdown .dropdown-menu')
      }
    ];

    dropdownTriggers.forEach(({ wrap, menu }) => {
      if (!wrap || !menu) return;

      let closeTimer = null;

      const openDropdown = () => {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
        // Close other open dropdowns first
        dropdownTriggers.forEach(other => {
          if (other.wrap && other.wrap !== wrap) {
            other.wrap.classList.remove('is-open');
            const otherLink = other.wrap.querySelector('.nav-link-with-icon');
            if (otherLink) otherLink.setAttribute('aria-expanded', 'false');
          }
        });

        wrap.classList.add('is-open');
        const link = wrap.querySelector('.nav-link-with-icon');
        if (link) link.setAttribute('aria-expanded', 'true');
      };

      const closeDropdownImmediately = () => {
        if (closeTimer) clearTimeout(closeTimer);
        wrap.classList.remove('is-open');
        const link = wrap.querySelector('.nav-link-with-icon');
        if (link) link.setAttribute('aria-expanded', 'false');
      };

      const queueCloseDropdown = () => {
        if (closeTimer) clearTimeout(closeTimer);
        closeTimer = setTimeout(() => {
          closeDropdownImmediately();
        }, 300);
      };

      // Hover bridge behavior
      wrap.addEventListener('mouseenter', openDropdown);
      wrap.addEventListener('mouseleave', queueCloseDropdown);

      menu.addEventListener('mouseenter', openDropdown);
      menu.addEventListener('mouseleave', queueCloseDropdown);

      // Support clicking parent navigation link to toggle
      const link = wrap.querySelector('.nav-link-with-icon');
      if (link) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          if (wrap.classList.contains('is-open')) {
            closeDropdownImmediately();
          } else {
            openDropdown();
          }
        });
      }

      // Keyboard accessibility
      wrap.addEventListener('focusin', openDropdown);
      wrap.addEventListener('focusout', (e) => {
        if (!wrap.contains(e.relatedTarget)) {
          closeDropdownImmediately();
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.nav-has-megamenu.is-open, .nav-has-dropdown.is-open').forEach(el => {
          el.classList.remove('is-open');
          const link = el.querySelector('.nav-link-with-icon');
          if (link) link.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-has-megamenu') && !e.target.closest('.nav-has-dropdown')) {
        document.querySelectorAll('.nav-has-megamenu.is-open, .nav-has-dropdown.is-open').forEach(el => {
          el.classList.remove('is-open');
          const link = el.querySelector('.nav-link-with-icon');
          if (link) link.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  // Global Reusable DM Interactive Logo Controller
  function initGlobalDMInteractiveLogos() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let popover = document.getElementById('dm-global-logo-popover');
    if (!popover) {
      popover = document.createElement('div');
      popover.id = 'dm-global-logo-popover';
      popover.className = 'dm-global-logo-popover';
      popover.setAttribute('aria-hidden', 'true');
      popover.innerHTML = `
        <video
          class="brand-animated-video"
          muted
          playsinline
          preload="none"
        >
          <source src="${root}/Cinematic_logo_animation_script_1080p_20260928120021.mp4" type="video/mp4" />
        </video>
        <button type="button" class="brand-video-close" aria-label="Close animation" tabindex="-1">×</button>
      `;
      document.body.appendChild(popover);
    }

    const video = popover.querySelector('video');
    const closeBtn = popover.querySelector('.brand-video-close');
    let activeLogo = null;
    let leaveTimer = null;
    let isPlaying = false;
    let isTouch = false;

    function positionPopover(logoEl) {
      const rect = logoEl.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let targetWidth = 480;
      if (vw < 520) {
        targetWidth = Math.min(420, vw - 24);
      } else if (vw < 768) {
        targetWidth = Math.min(440, vw - 32);
      } else {
        targetWidth = Math.min(480, vw - 32);
      }
      const targetHeight = Math.round(targetWidth * (9 / 16));

      // Intelligently position relative to the hovered logo
      // If near viewport bottom (e.g. footer), show above the logo
      // If near top (e.g. header), show below the logo
      const spaceBelow = vh - rect.bottom;
      const spaceAbove = rect.top;
      let top = 0;

      if (spaceBelow >= targetHeight + 12) {
        top = rect.bottom + 8;
      } else if (spaceAbove >= targetHeight + 12) {
        top = rect.top - targetHeight - 8;
      } else {
        top = Math.max(12, Math.min(vh - targetHeight - 12, rect.top + (rect.height - targetHeight) / 2));
      }

      // Horizontal alignment: align with logo left edge, then clamp safely in viewport
      let left = rect.left;
      if (left + targetWidth > vw - 16) {
        left = vw - 16 - targetWidth;
      }
      if (left < 16) {
        left = 16;
      }

      popover.style.top = `${Math.round(top)}px`;
      popover.style.left = `${Math.round(left)}px`;
      popover.style.width = `${Math.round(targetWidth)}px`;
    }

    function showAndPlay(logoEl) {
      clearTimeout(leaveTimer);
      if (activeLogo !== logoEl || !isPlaying) {
        activeLogo = logoEl;
        positionPopover(logoEl);
        popover.classList.add('is-active');
        popover.setAttribute('aria-hidden', 'false');
        isPlaying = true;
        try {
          video.currentTime = 0;
        } catch (_) {}
        const p = video.play();
        if (p !== undefined) p.catch(() => {});
      }
    }

    function hideAndStop() {
      clearTimeout(leaveTimer);
      if (isPlaying) {
        popover.classList.remove('is-active');
        popover.setAttribute('aria-hidden', 'true');
        isPlaying = false;
        activeLogo = null;
        setTimeout(() => {
          if (!isPlaying) {
            try {
              video.pause();
              video.currentTime = 0;
            } catch (_) {}
          }
        }, 300);
      }
    }

    video.addEventListener('ended', () => {
      hideAndStop();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        hideAndStop();
      });
    }

    popover.addEventListener('mouseenter', () => {
      if (isTouch) return;
      clearTimeout(leaveTimer);
    });

    popover.addEventListener('mouseleave', () => {
      if (isTouch) return;
      leaveTimer = setTimeout(() => {
        hideAndStop();
      }, 250);
    });

    function getLogoElement(target) {
      if (!target || !(target instanceof Element)) return null;
      if (target.closest('#dm-global-logo-popover')) return null;
      return target.closest('[data-dm-logo="true"], .dm-interactive-logo, .brand-logo, .brand-logo-footer, img[src*="brand/logo"]');
    }

    // Delegated hover events for all current and future logo instances
    document.addEventListener('mouseover', (e) => {
      if (isTouch) return;
      const logoEl = getLogoElement(e.target);
      if (logoEl) {
        clearTimeout(leaveTimer);
        showAndPlay(logoEl);
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (isTouch) return;
      const logoEl = getLogoElement(e.target);
      if (logoEl && activeLogo === logoEl) {
        leaveTimer = setTimeout(() => {
          hideAndStop();
        }, 250);
      }
    });

    // Touch / Mobile delegation
    document.addEventListener('touchstart', (e) => {
      isTouch = true;
      const logoEl = getLogoElement(e.target);
      if (isPlaying && !popover.contains(e.target) && (!logoEl || logoEl !== activeLogo)) {
        hideAndStop();
      }
    }, { passive: true });

    document.addEventListener('click', (e) => {
      if (!isTouch) return;
      const logoEl = getLogoElement(e.target);
      if (logoEl) {
        if (!isPlaying || activeLogo !== logoEl) {
          e.preventDefault();
          showAndPlay(logoEl);
        }
      }
    });

    window.addEventListener('resize', () => {
      if (isPlaying && activeLogo) {
        positionPopover(activeLogo);
      }
    });

    window.addEventListener('scroll', () => {
      if (isPlaying && activeLogo) {
        positionPopover(activeLogo);
      }
    }, { passive: true });
  }

  // Persistent Back-to-Top Floating Arrow Controller
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top-btn');
    if (!btn || btn.dataset.initialized === 'true') return;
    btn.dataset.initialized = 'true';

    let ticking = false;
    const updateVisibility = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (scrollY >= 400) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateVisibility);
        ticking = true;
      }
    }, { passive: true });

    // Initial check
    updateVisibility();

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReduced ? 'auto' : 'smooth'
      });
    });
  }

  function footer() {
    const footerEl = document.querySelector('#site-footer');
    if (!footerEl) return;

    const company = data.company || {};

    // Contextual message for floating WhatsApp button
    let floatingMsg = 'Hello Deepali Minerals, I would like to discuss my industrial mineral requirement.';
    if (page === 'product') {
      const params = new URLSearchParams(location.search);
      const slug = params.get('product');
      const p = data.getProductBySlug(slug);
      if (p) {
        floatingMsg = `Hello Deepali Minerals, I would like to discuss my requirement for ${p.name}.`;
      }
    }
    const floatingWhatsAppUrl = getWhatsAppUrl(floatingMsg);
    const whatsappGeneralUrl = getWhatsAppUrl();

    footerEl.innerHTML = `
      <a class="contact-float" href="${root}/#rfq" aria-label="Enquire Now">Enquire</a>
      <button type="button" class="back-to-top-btn" aria-label="Back to top" title="Back to top">
        <svg class="back-to-top-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </button>
      <a class="dm-floating-whatsapp" href="${floatingWhatsAppUrl}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Sales Desk">
        ${whatsappIconSvg(20, 20)}
        <span class="floating-label">WhatsApp Sales Desk</span>
      </a>
      <footer class="footer" ${page === 'home' || page === 'about' ? 'id="site-footer-band"' : 'id="contact"'}>
        <div class="shell footer-grid">
          <!-- COLUMN 1: DEEPALI MINERALS -->
          <div class="footer-col footer-col-brand">
            <a class="brand dm-interactive-logo" href="${root}/" aria-label="Deepali Minerals home" data-dm-logo="true">
              <img src="${root}/assets/images/brand/logo.png" alt="Deepali Minerals" class="brand-logo-footer" width="200" height="100" referrerpolicy="no-referrer" />
            </a>
            <p class="footer-tagline">${company.tagline || 'Industrial Minerals'}</p>
            <p class="footer-desc">
              Delhi-based B2B supplier of industrial minerals, pulverized powders, and functional chemicals since 2004.
            </p>
            <div class="footer-meta-box">
              <p><strong>CEO:</strong> ${company.ceo || 'Mr. Neeraj Monga'}</p>
              <p><strong>GSTIN:</strong> ${company.gstNumber || '07AIMPM0458Q1ZL'}</p>
              <p><strong>Certifications:</strong> ISO 9001:2015 &middot; ISO 14001:2015</p>
            </div>
          </div>

          <!-- COLUMN 2: PRODUCTS -->
          <div class="footer-col">
            <h3>Products</h3>
            <div class="footer-links-list">
              <a href="${root}/product.html?product=talc">Talc</a>
              <a href="${root}/product.html?product=soap-stone">Soap Stone</a>
              <a href="${root}/product.html?product=chalk-powder">Chalk Powder</a>
              <a href="${root}/product.html?product=hydrated-lime">Hydrated Lime</a>
              <a href="${root}/product.html?product=china-clay">China Clay</a>
              <a href="${root}/product.html?product=kaoline">Kaoline</a>
              <a href="${root}/product.html?product=marble-powder">Marble Powder</a>
              <a href="${root}/product.html?product=quartz-powder">Quartz Powder</a>
              <a href="${root}/product.html?product=calcium-carbonate">Calcium Carbonate</a>
              <a href="${root}/product.html?product=dolomite-powder">Dolomite Powder</a>
              <a href="${root}/product.html?product=barytes">Barytes</a>
              <a href="${root}/product.html?product=titanium-dioxide">Titanium Di Oxide</a>
              <a href="${root}/product.html?product=quartz-sand">Quartz Sand</a>
              <a href="${root}/product.html?product=starch">Starch</a>
              <a href="${productsUrl}" class="footer-accent-link">View All 22 Products &rarr;</a>
            </div>
          </div>

          <!-- COLUMN 3: INDUSTRIES -->
          <div class="footer-col">
            <h3>Industries</h3>
            <div class="footer-links-list">
              <a href="${industriesUrl}?industry=paints-coatings">Paints &amp; Coatings</a>
              <a href="${industriesUrl}?industry=plastics-polymers">Plastics &amp; Polymers</a>
              <a href="${industriesUrl}?industry=rubber-footwear">Rubber &amp; Footwear</a>
              <a href="${industriesUrl}?industry=ceramics">Ceramics</a>
              <a href="${industriesUrl}?industry=construction-building-materials">Construction Materials</a>
              <a href="${industriesUrl}?industry=paper-stationery">Paper &amp; Stationery</a>
              <a href="${industriesUrl}?industry=frp-composites">FRP &amp; Composites</a>
              <a href="${industriesUrl}?industry=foundry-industrial">Foundry &amp; Industrial</a>
              <a href="${industriesUrl}?industry=agriculture-allied">Agriculture &amp; Allied</a>
              <a href="${industriesUrl}?industry=detergents-household">Soaps &amp; Detergents</a>
              <a href="${industriesUrl}?industry=wall-putty-nc-putty">Wall Putty &amp; NC Putty</a>
              <a href="${industriesUrl}" class="footer-accent-link">Explore All 18 Industries &rarr;</a>
            </div>
          </div>

          <!-- COLUMN 4: COMPANY & QUALITY -->
          <div class="footer-col">
            <h3>Company &amp; Quality</h3>
            <div class="footer-links-list">
              <a href="${root}/about.html">About Us</a>
              <a href="${root}/about.html#certifications">ISO Certifications</a>
              <a href="${root}/#quality">Quality &amp; Assurance</a>
              <a href="${root}/#operations">Operations &amp; Capabilities</a>
              <a href="${root}/#resources">Resources &amp; Guides</a>
              <a href="${productsUrl}">Product Catalogue</a>
              <a href="${root}/#rfq">Enquire Now</a>
            </div>
          </div>

          <!-- COLUMN 5: CONTACT -->
          <div class="footer-col footer-col-contact">
            <h3>Contact Us</h3>
            <div class="footer-contact-details">
              <p>
                <strong class="footer-lbl">Email:</strong><br />
                <a href="mailto:${company.emailSales || 'info@deepaliminerals.in'}">${company.emailSales || 'info@deepaliminerals.in'}</a>
              </p>
              <p style="margin-top: .6rem;">
                <strong class="footer-lbl">Phone:</strong><br />
                <a href="tel:+919810516065">+91 9810516065</a>, <a href="tel:+919810715129">9810715129</a>
              </p>
              <p style="margin-top: .6rem;">
                <strong class="footer-lbl">Office:</strong><br />
                <span>${company.headquarters || 'C-2/29 C Lawrence Road, Rampura / Keshav Puram, New Delhi - 110035'}</span>
              </p>
              <p style="margin-top: .6rem;">
                <strong class="footer-lbl">Business Hours:</strong><br />
                <span>${company.businessHours || 'Monday – Saturday: 9:00 AM – 7:30 PM IST'}</span>
              </p>
              <div style="margin-top: .85rem;">
                <a href="${whatsappGeneralUrl}" target="_blank" rel="noopener noreferrer" class="footer-whatsapp-btn">
                  ${whatsappIconSvg(15, 15)}
                  <span>WhatsApp Sales Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="shell footer-bottom">
          <div class="footer-bottom-left">
            <span>&copy; ${new Date().getFullYear()} Deepali Minerals. All rights reserved.</span>
            <span class="footer-sep">&middot;</span>
            <span>Industrial Minerals B2B Supply</span>
          </div>
          <div class="footer-bottom-right">
            <a href="${root}/sitemap.xml" target="_blank" rel="noopener">Sitemap (XML)</a>
            <span class="footer-sep">&middot;</span>
            <a href="${root}/about.html#certifications">Quality &amp; Legal Notice</a>
            <span class="footer-sep">&middot;</span>
            <a href="${root}/#rfq">Enquire Now</a>
            <span class="footer-sep">&middot;</span>
            <a href="${whatsappGeneralUrl}" target="_blank" rel="noopener noreferrer">WhatsApp Desk</a>
          </div>
        </div>
      </footer>
    `;

    initBackToTop();
  }

  const resolveProductImg = (img) => {
    if (!img) return '';
    const clean = img.replace(/^\/+/, '');
    if (root && root !== '.') {
      return `${root}/${clean}`;
    }
    return `${root === '.' ? './' : '/'}${clean}`;
  };

  const getProductCategoryIcon = (p) => {
    if (p.slug === 'starch') {
      return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12A10 10 0 0 1 12 2z"/><path d="M12 6v12"/><path d="M8 10c2-2 4-2 4 0s2 2 4 0"/><path d="M8 14c2-2 4-2 4 0s2 2 4 0"/></svg>`;
    }
    if (p.category === 'Functional Chemicals') {
      return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 2v7.31L4.62 18.2A2 2 0 0 0 6.36 21h11.28a2 2 0 0 0 1.74-2.8L14 9.31V2"/><line x1="8.5" y1="2" x2="15.5" y2="2"/><path d="M14 9.3h-4"/><path d="M7 16h10"/></svg>`;
    }
    if (p.category === 'Grains & Aggregates' || p.category === 'Industrial Materials') {
      return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`;
    }
    return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M11 3 8 9l4 12 4-12-3-6"/><path d="M2 9h20"/></svg>`;
  };

  const productCard = (p, industryCtx, appCtx, routeCtx) => {
    const isStarch = p.slug === 'starch';
    const fallbackTheme = isStarch ? 'fallback-starch' : (
      p.category === 'Functional Chemicals' ? 'fallback-chemical' : (
        p.category === 'Industrial Materials' || p.category === 'Grains & Aggregates' ? 'fallback-aggregate' : 'fallback-mineral'
      )
    );
    const imgSrc = resolveProductImg(p.image);
    const altText = esc(p.alt || `${p.name} — Deepali Minerals`);
    const bullets = (p.applications && p.applications.length)
      ? p.applications.slice(0, 2)
      : [p.shortDescription];

    return `
      <article class="product-card" data-slug="${esc(p.slug)}">
        <a href="${productUrl(p, industryCtx, appCtx, routeCtx)}" class="product-card-visual" aria-label="View ${esc(p.name)}">
          ${imgSrc ? `
            <img 
              src="${imgSrc}" 
              alt="${altText}" 
              class="product-card-img" 
              loading="lazy" 
              onerror="this.style.display='none'; var fb = this.parentElement.querySelector('.product-card-fallback'); if (fb) fb.style.display='flex';" 
            />
          ` : ''}
          <div class="product-card-fallback ${fallbackTheme}" style="${imgSrc ? 'display:none;' : 'display:flex;'}">
            <div class="fallback-icon-wrap">
              ${getProductCategoryIcon(p)}
            </div>
            <div class="fallback-info">
              <span class="fallback-cat">${esc(p.category)}</span>
              <span class="fallback-title">${esc(p.name)}</span>
            </div>
          </div>
        </a>
        <div class="product-card-body">
          <span class="product-card-cat">${esc(p.category)}</span>
          <h3><a href="${productUrl(p, industryCtx, appCtx, routeCtx)}">${esc(p.name)}</a></h3>
          <ul class="dm-bullet-list dm-bullet-list--compact">
            ${bullets.map(b => `<li>${esc(b)}</li>`).join('')}
          </ul>
          <div class="product-card-actions">
            <a class="product-card-link" href="${productUrl(p, industryCtx, appCtx, routeCtx)}">
              View Product <span aria-hidden="true">&rarr;</span>
            </a>
            <a class="product-card-btn-quickbuy" href="${getWhatsAppUrl(`Hello Deepali Minerals, I would like to enquire about ${p.name}. Please share specifications and availability.`)}" target="_blank" rel="noopener noreferrer" aria-label="Enquire about ${esc(p.name)} on WhatsApp">
              ${whatsappIconSvg(13, 13)}
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </article>
    `;
  };

  const applicationCard = (app) => {
    const productsHtml = (app.products || []).map(slug => {
      const p = data.getProductBySlug(slug);
      if (!p) return '';
      return `
        <a href="${productUrl(p, null, app.title)}" class="pill" style="font-size: .75rem; font-weight: 600; padding: .35rem .75rem;">
          ${esc(p.name)} →
        </a>
      `;
    }).filter(Boolean).join('');

    const whatsappMsg = app.id === 'fire-safety'
      ? 'Hello Deepali Minerals, I would like to enquire about mineral materials (Calcium Carbonate, Talc, Hydrated Lime) for Fire Safety applications.'
      : 'Hello Deepali Minerals, I would like to enquire about Magnesium Carbonate for Gym Powder / sports-grip applications.';

    const defaultNotes = app.id === 'fire-safety'
      ? '[Application: Fire Safety] Intended fire-safety application, required material & technical requirements: '
      : '[Application: Gym Powder] Intended application, required grade/specifications & packaging preference: ';

    const ctaHref = app.id === 'gym-powder'
      ? `${root}/product.html?product=magnesium-carbonate&app=${encodeURIComponent(app.title)}#rfq`
      : '#rfq';

    return `
      <article class="industry-card application-card" id="app-${app.id}">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: .5rem; margin-bottom: .4rem;">
            <span class="category-index" style="color: var(--terracotta, #A84E2B); font-weight: 700;">APPLICATION</span>
            <span style="font: 700 .68rem var(--mono); color: var(--slate); text-transform: uppercase; background: var(--fog); padding: .2rem .5rem; border: 1px solid var(--line);">Discovery Card</span>
          </div>
          
          <h3 style="margin-top: .2rem; margin-bottom: .25rem;">${esc(app.title)}</h3>
          <div style="font: 600 .82rem var(--mono); color: var(--terracotta, #A84E2B); margin-bottom: .75rem;">${esc(app.subtitle)}</div>
          
          <p style="color: var(--ink); font-size: .88rem; line-height: 1.5; margin-bottom: 1rem;">
            ${esc(app.cardDescription)}
          </p>

          <div style="margin: .85rem 0 1rem;">
            <span style="font: 600 .7rem var(--mono); color: var(--slate); text-transform: uppercase; display: block; margin-bottom: .45rem;">
              ${app.products.length > 1 ? 'Compatible Materials (Linked Pages):' : 'Compatible Material (Linked Page):'}
            </span>
            <div class="pill-list">
              ${productsHtml}
            </div>
          </div>

          <div style="margin-bottom: 1rem; padding: .75rem; background: var(--fog); border: 1px solid var(--line); font-size: .78rem; line-height: 1.45; color: var(--slate);">
            <strong style="color: var(--ink); display: block; margin-bottom: .2rem;">Technical Qualification:</strong>
            ${esc(app.disclaimer)}
          </div>

          <div style="margin-bottom: 1.25rem;">
            <span style="font: 600 .7rem var(--mono); color: var(--slate); text-transform: uppercase; display: block; margin-bottom: .35rem;">Buyer Enquiry Details Captured:</span>
            <ul style="list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: .25rem; font-size: .75rem; color: var(--slate);">
              ${app.enquiryFields.map(f => `<li style="display: flex; gap: .35rem; align-items: center;"><span style="color: var(--blue);">•</span> <span>${esc(f)}</span></li>`).join('')}
            </ul>
          </div>
        </div>

        <div style="display: flex; gap: .5rem; flex-wrap: wrap; margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--line);">
          <a href="${ctaHref}" class="button" style="flex: 1; min-width: 190px; padding: .65rem .85rem; font-size: .72rem; text-align: center;" onclick="prefillApplicationRfq('${esc(app.title)}', '${app.ctaProduct}', '${esc(defaultNotes)}')">
            ${esc(app.ctaText)}
          </a>
          <a href="https://wa.me/${(data.company.whatsappNumber || '919810516065').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMsg)}" target="_blank" rel="noopener noreferrer" class="button alt" style="padding: .65rem .85rem; font-size: .72rem; display: inline-flex; align-items: center; gap: .35rem;">
            ${whatsappIconSvg(13, 13)}
            <span>WhatsApp Enquiry</span>
          </a>
        </div>
      </article>
    `;
  };

  const rfq = (selectedProduct, prefillContext) => {
    const currentProd = selectedProduct ? selectedProduct.name : '';
    const ctx = prefillContext || {};
    const defaultApp = ctx.application || (selectedProduct && selectedProduct.applications && selectedProduct.applications[0] ? selectedProduct.applications[0] : '');
    
    let defaultNotes = '';
    if (ctx.industry) defaultNotes += `[Industry / Manufacturing Sector: ${ctx.industry}] `;
    if (ctx.application) defaultNotes += `[Application: ${ctx.application}] `;
    if (ctx.route) defaultNotes += `[Discovery Path: ${ctx.route}] `;
    if (ctx.requirementText) defaultNotes += `[Requirement: "${ctx.requirementText}"] `;
    if (ctx.notes) defaultNotes += `${ctx.notes} `;

    return `
      <aside class="rfq-preview" id="rfq">
        <span class="eyebrow" style="color:var(--aqua)">B2B Procurement Request</span>
        <h2 class="section-title">Quotation</h2>
        <p>Submit your industrial material requirement. Our Lawrence Road commercial desk will review parameters and provide competitive wholesale terms.</p>
        
        <form data-rfq>
          <div class="rfq-grid-layout">
            
            <div class="rfq-full">
              <label>Material / Mineral *</label>
              <select name="product" required>
                <option value="">Select a material</option>
                ${data.products.map(p => `
                  <option value="${esc(p.name)}" ${p.name === currentProd ? 'selected' : ''}>${esc(p.name)} (${esc(p.category)})</option>
                `).join('')}
              </select>
            </div>

            <div>
              <label>Application/Manufacturing</label>
              <input type="text" name="application" value="${esc(defaultApp)}" placeholder="e.g. Rigid PVC Pipes, Wall Putty, EVA Soles">
            </div>

            <div>
              <label>Estimated Quantity *</label>
              <input type="text" name="quantity" placeholder="e.g. 15 MT / Full Truckload (FTL)" required>
            </div>

            <div>
              <label>Packaging Preference</label>
              <select name="packaging">
                <option value="50 Kg PP Bags">50 Kg PP Woven Bags (Standard Wholesale)</option>
                <option value="25 Kg Paper / HDPE">25 Kg Paper / HDPE Bags</option>
                <option value="Custom / Palletized">Palletized Export Packaging</option>
              </select>
            </div>

            <div>
              <label>Delivery Destination / Unloading Point *</label>
              <input type="text" name="destination" placeholder="City / State / Port" required>
            </div>

            <div>
              <label>Company Name *</label>
              <input type="text" name="company" placeholder="Manufacturing / Trading Entity" required>
            </div>

            <div>
              <label>Contact Person *</label>
              <input type="text" name="contactPerson" placeholder="Full Name" required>
            </div>

            <div>
              <label>Mobile / WhatsApp *</label>
              <input type="tel" name="phone" placeholder="+91-98765-43210" required>
            </div>

            <div>
              <label>Company Email *</label>
              <input type="email" name="email" placeholder="purchase@company.com" required>
            </div>

            <div class="rfq-full">
              <label>Specification Requirement / Grade Details</label>
              <input type="text" name="notes" value="${esc(defaultNotes)}" placeholder="Specify mesh size, whiteness, or technical compound requirements...">
            </div>

          </div>

          <button class="button" type="submit" style="width: 100%; margin-top: 1.25rem;">Submit Quotation to Sales Desk</button>
          
          <div class="rfq-feedback" style="display:none;"></div>
        </form>
      </aside>
    `;
  };

  /* =========================================================================
   * HOMEPAGE — NATURAL MINERAL B2B REDESIGN
   * ========================================================================= */
  function home() {
    updateSeoMeta({
      title: 'Deepali Minerals | Industrial Minerals Supplier',
      description: 'Established in 2004, Deepali Minerals is an ISO 9001:2015 & ISO 14001:2015 certified B2B supplier of industrial minerals, pulverized powders, and functional chemicals in Delhi.',
      canonical: 'https://www.deepaliminerals.com/',
      ogType: 'website',
      ogImage: 'https://www.deepaliminerals.com/assets/images/brand/logo.png'
    });

    const allProducts = data.products || [];
    const mineralsCount = allProducts.filter(p => p.category === 'Industrial Minerals' || p.category === 'Mineral Powders').length;
    const chemicalsCount = allProducts.filter(p => p.category === 'Functional Chemicals').length;
    const grainsCount = allProducts.filter(p => p.category === 'Grains & Aggregates' || p.category === 'Industrial Materials').length;

    const featuredIndustries = [
      {
        slug: 'paints-coatings',
        img: 'paints-coatings',
        title: 'Paints & Coatings',
        bullets: [
          'Extenders and brightness enhancers for architectural and industrial coatings.',
          'Supports scrub resistance, film build, and pigment dispersion.',
          'Key materials: Talc, Calcium Carbonate, China Clay, Barytes, Titanium Di Oxide.'
        ]
      },
      {
        slug: 'plastics-polymers',
        img: 'plastics-polymers',
        title: 'Plastics & Polymers',
        bullets: [
          'Functional fillers and internal lubricants for PVC, PP, and masterbatches.',
          'Improves dimensional stability, surface finish, and processing flow.',
          'Key materials: Calcium Carbonate, Talc, Zinc Stearates, Titanium Di Oxide.'
        ]
      },
      {
        slug: 'rubber-footwear',
        img: 'rubber-footwear',
        title: 'Rubber & Footwear',
        bullets: [
          'Activators, dusting powders, and fillers for rubber compounds and EVA soles.',
          'Supports vulcanization activation, anti-tack release, and compound reinforcement.',
          'Key materials: Zinc Oxide, Magnesium Carbonate, Barytes, French Chalk Powder, Talc.'
        ]
      },
      {
        slug: 'ceramics',
        img: 'ceramics',
        title: 'Ceramics',
        bullets: [
          'Silica, clays, and carbonate fluxes for ceramic tiles and sanitaryware bodies.',
          'Contributes to firing stability, plasticity, and glaze formulation.',
          'Key materials: Quartz Powder, Silica, Kaoline, China Clay, Dolomite Powder.'
        ]
      },
      {
        slug: 'construction-building-materials',
        img: 'construction-building-materials',
        title: 'Construction Materials',
        bullets: [
          'Mineral fillers and graded aggregates for wall putty, mortars, and tile adhesives.',
          'Enhances whiteness, workability, and structural consistency.',
          'Key materials: Dolomite Powder, Marble Powder, Chalk Powder, Hydrated Lime, Marble Chips.'
        ]
      },
      {
        slug: 'paper-stationery',
        img: 'paper-stationery',
        title: 'Paper & Stationery',
        bullets: [
          'Brightness fillers, pitch-control minerals, and industrial binders for paper mills.',
          'Used across writing paper, paperboard coating, and corrugation.',
          'Key materials: China Clay, Talc, Calcium Carbonate, Starch.'
        ]
      },
      {
        slug: 'frp-composites',
        img: 'frp-composites',
        title: 'FRP & Composites',
        bullets: [
          'Resin matrices and mineral extenders for fiberglass composite mouldings.',
          'Supports viscosity control, surface smoothness, and dimensional stability.',
          'Key materials: Polyester Resin, Talc, Calcium Carbonate, Quartz Powder.'
        ]
      },
      {
        slug: 'foundry-industrial',
        img: 'foundry',
        title: 'Foundry & Metallurgy',
        bullets: [
          'Graded silica sand, parting powders, and chemical fluxes for metal casting.',
          'Supports core moulding, mould release, and thermal durability.',
          'Key materials: Quartz Sand, Silica, Hydrated Lime, French Chalk Powder, Soap Stone.'
        ]
      },
      {
        slug: 'detergents-household',
        img: 'detergents-household',
        title: 'Soaps & Detergents',
        bullets: [
          'Mineral fillers and gentle abrasive extenders for toilet soaps and detergent cakes.',
          'Supports bar structure, free-flowing powder blends, and formulation balance.',
          'Key materials: Soap Stone, Chalk Powder, Dolomite Powder, China Clay.'
        ]
      }
    ];

    document.querySelector('#main').innerHTML = `
      <!-- ====================================================================
           B. HERO BANNER — INDUSTRIAL MINERALS
           ==================================================================== -->
      <section class="dm-mineral-hero" id="hero">
        <div class="dm-mineral-hero-media">
          <img
            src="${root}/assets/images/gallery/hero_industrial_minerals.jpg"
            alt="Industrial mineral quarry and material processing landscape"
            class="dm-mineral-hero-img"
            loading="eager"
          />
          <div class="dm-mineral-hero-scrim"></div>
        </div>

        <div class="shell dm-mineral-hero-inner">
          <span class="dm-mineral-hero-kicker">DEEPALI MINERALS &middot; ESTABLISHED 2004 &middot; NEW DELHI</span>
          <h1 class="dm-mineral-hero-title">INDUSTRIAL MINERALS</h1>
          <p class="dm-mineral-hero-lead">
            Explore our range of 22 industrial minerals for diverse manufacturing requirements.
          </p>
          <div class="dm-mineral-hero-actions">
            <a href="#portfolio" class="dm-hero-btn-primary">Explore Products</a>
            <a href="#rfq" class="dm-hero-btn-secondary">Enquire Now</a>
            <button type="button" class="dm-hero-btn-video" data-hero-fullscreen-trigger="true" title="Watch Deepali Minerals facility video">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 4 20 12 6 20 6 4"/></svg>
              <span>Watch Overview Video</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Quiet Factual Benchmark Strip -->
      <div class="dm-benchmark-strip">
        <div class="shell dm-benchmark-grid">
          <div class="dm-benchmark-item">
            <div class="dm-benchmark-val">Since 2004</div>
            <div class="dm-benchmark-lbl">Over two decades in industrial mineral trading</div>
          </div>
          <div class="dm-benchmark-item">
            <div class="dm-benchmark-val">22 Materials</div>
            <div class="dm-benchmark-lbl">Mineral powders, chemicals &amp; granular aggregates</div>
          </div>
          <div class="dm-benchmark-item">
            <div class="dm-benchmark-val">18 Sectors</div>
            <div class="dm-benchmark-lbl">Verified manufacturing &amp; industrial applications</div>
          </div>
          <div class="dm-benchmark-item">
            <div class="dm-benchmark-val">ISO 9001 &amp; 14001</div>
            <div class="dm-benchmark-lbl">Certified quality &amp; environmental management</div>
          </div>
        </div>
      </div>

      <!-- ====================================================================
           C. ABOUT DEEPALI MINERALS
           ==================================================================== -->
      <section class="dm-band-white" id="about-company">
        <div class="shell dm-about-split">
          <div class="dm-about-media-frame">
            <img
              src="${root}/assets/images/industries/corporate-intro-banner.webp"
              data-photo-src="${root}/assets/images/industries/corporate-intro-banner.webp"
              data-backup-src="${root}/assets/images/industries/backup/corporate-intro-banner.webp"
              alt="Industrial mineral supply and processing workflow"
              loading="lazy"
            />
            <div class="dm-about-caption">
              <span>Corporate Office: Lawrence Road, New Delhi</span>
              <span>Illustrative industrial image</span>
            </div>
          </div>

          <div>
            <span class="dm-section-kicker">ABOUT DEEPALI MINERALS</span>
            <h2 class="dm-section-heading">Trusted B2B Partner for Industrial Minerals</h2>
            <p class="dm-section-sub" style="margin-bottom: 1.35rem;">
              Established in 2004 and led by CEO Mr. Neeraj Monga, Deepali Minerals is a Delhi-based B2B supplier of industrial minerals and pulverized mineral powders serving diverse manufacturing sectors across India.
            </p>
            <ul class="dm-bullet-list" style="margin-bottom: 1.75rem;">
              <li><strong>22 Industrial Minerals:</strong> Comprehensive catalogue of mineral powders, functional extenders, and graded aggregates.</li>
              <li><strong>Certified Systems:</strong> ISO 9001:2015 and ISO 14001:2015 certified for trading of mineral and chemical products.</li>
              <li><strong>Multi-Region Sourcing:</strong> Established supply partnerships across Rajasthan, Gujarat, and regional industrial hubs.</li>
              <li><strong>Responsive Commercial Desk:</strong> Coordinated warehousing, sample support, and dispatch from Lawrence Road, New Delhi.</li>
            </ul>
            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center;">
              <a href="${root}/about.html" class="button" style="padding: 0.8rem 1.55rem; font-size: 0.86rem;">Read More &rarr;</a>
              <a href="${root}/about.html#certifications" class="button alt" style="padding: 0.8rem 1.35rem; font-size: 0.86rem;">View ISO Certificates</a>
            </div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           D. OUR INDUSTRIAL MINERALS (ALL 22 PRODUCTS)
           ==================================================================== -->
      <section class="dm-band-offwhite" id="portfolio">
        <div id="materials" style="scroll-margin-top: 90px;"></div>
        <div class="shell">
          <div class="section-head" style="margin-bottom: 1.75rem; align-items: flex-end;">
            <div>
              <span class="dm-section-kicker">PRODUCT PORTFOLIO &middot; 22 INDUSTRIAL MINERALS</span>
              <h2 class="dm-section-heading">OUR INDUSTRIAL MINERALS</h2>
            </div>
            <a href="${productsUrl}" class="text-link" style="color: #1769AA; font-weight: 700;">View All Products &rarr;</a>
          </div>

          <!-- Category Filter Tabs -->
          <div class="product-showcase-tabs">
            <button type="button" class="showcase-tab-btn is-active" data-filter="all">All Products (${allProducts.length})</button>
            <button type="button" class="showcase-tab-btn" data-filter="minerals">Minerals &amp; Powders (${mineralsCount})</button>
            <button type="button" class="showcase-tab-btn" data-filter="chemicals">Functional Chemicals (${chemicalsCount})</button>
            <button type="button" class="showcase-tab-btn" data-filter="grains">Grains &amp; Aggregates (${grainsCount})</button>
          </div>

          <!-- 22 Products Image-Led Gallery (Zero Mesh Captions) -->
          <div class="product-grid" id="homepage-product-grid">
            ${allProducts.map(p => {
              const catGroup = (p.category === 'Industrial Minerals' || p.category === 'Mineral Powders') ? 'minerals' : (
                p.category === 'Functional Chemicals' ? 'chemicals' : 'grains'
              );
              return `
                <div class="homepage-product-card" data-category="${catGroup}">
                  ${productCard(p)}
                </div>
              `;
            }).join('')}
          </div>

          <div style="margin-top: 2.5rem; text-align: center;">
            <a href="${productsUrl}" class="button" style="padding: 0.88rem 2rem; font-size: 0.88rem;">View All Products &rarr;</a>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           E. INDUSTRIES WE SERVE
           ==================================================================== -->
      <section class="dm-band-white" id="industries">
        <div class="shell">
          <div class="section-head" style="margin-bottom: 2rem; align-items: flex-end;">
            <div>
              <span class="dm-section-kicker">INDUSTRIAL APPLICATIONS &middot; 18 SECTORS</span>
              <h2 class="dm-section-heading">Industries We Serve</h2>
              <p class="dm-section-sub">
                Tailored mineral grades and functional additives supplied across major manufacturing and compounding sectors.
              </p>
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.6rem;">
              <a href="${industriesUrl}" class="text-link" style="color: #1769AA; font-weight: 700;">View All 18 Industries &rarr;</a>
              <button type="button" class="hero-visual-btn hero-visual-btn-restore" data-hero-toggle-global>Restore All Original Visuals</button>
            </div>
          </div>

          <div class="dm-industry-grid">
            ${featuredIndustries.map(item => `
              <article class="dm-industry-card">
                <a href="${industriesUrl}?industry=${item.slug}" class="dm-industry-photo">
                  <img
                    src="${root}/assets/images/industries/${item.img}.webp"
                    data-photo-src="${root}/assets/images/industries/${item.img}.webp"
                    data-backup-src="${root}/assets/images/industries/backup/${item.img}.webp"
                    alt="${esc(item.title)} — Deepali Minerals"
                    loading="lazy"
                  />
                </a>
                <div class="dm-industry-body">
                  <h3 class="dm-industry-title">${esc(item.title)}</h3>
                  <ul class="dm-bullet-list dm-bullet-list--compact" style="margin-bottom: 1rem;">
                    ${item.bullets.map(b => `<li>${esc(b)}</li>`).join('')}
                  </ul>
                  <a href="${industriesUrl}?industry=${item.slug}" class="dm-industry-link">
                    Explore ${esc(item.title)} &rarr;
                  </a>
                </div>
              </article>
            `).join('')}
          </div>

          <div style="margin-top: 2.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <a href="${industriesUrl}" class="button" style="padding: 0.82rem 1.65rem; font-size: 0.86rem;">Explore All 18 Industries &rarr;</a>
            <a href="${productsUrl}" class="text-link" style="color: #1769AA; font-weight: 700;">Browse Product Catalogue &rarr;</a>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           F. QUALITY AND ASSURANCE
           ==================================================================== -->
      <section class="dm-band-offwhite" id="quality">
        <div class="shell dm-quality-split">
          <div>
            <span class="dm-section-kicker">QUALITY &amp; ASSURANCE</span>
            <h2 class="dm-section-heading">Consistent Sourcing &amp; Quality Processes</h2>
            <p class="dm-section-sub" style="margin-bottom: 1.5rem;">
              Deepali Minerals operates under audited ISO 9001:2015 and ISO 14001:2015 management systems covering the trading of mineral and chemical products.
            </p>

            <ul class="dm-bullet-list" style="margin-bottom: 1.75rem;">
              <li><strong>Quality Checks:</strong> Material screening for particle fineness, optical brightness, moisture limits, and grade consistency.</li>
              <li><strong>Product Inspection:</strong> Pre-dispatch verification of bag weight, clean lot separation, and moisture-barrier packaging integrity.</li>
              <li><strong>Sourcing Standards:</strong> Multi-region supplier linkages across established mineral belts to reduce supply disruption risks.</li>
              <li><strong>Technical Documentation:</strong> Batch Certificates of Analysis (COA), Technical Data Sheets (TDS), and MSDS shared on request.</li>
              <li><strong>Audited Management Systems:</strong> Active ISO 9001:2015 (QMS) and ISO 14001:2015 (EMS) certifications subject to annual surveillance audits.</li>
            </ul>

            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
              <a href="${root}/about.html#certifications" class="button" style="padding: 0.8rem 1.5rem; font-size: 0.85rem;">View Verified ISO Certificates &rarr;</a>
              <a href="${root}/about.html#quality" class="button alt" style="padding: 0.8rem 1.35rem; font-size: 0.85rem;">Quality Workflow Details</a>
            </div>
          </div>

          <div class="dm-about-media-frame">
            <img
              src="${root}/assets/images/industries/quality-assurance-lab.webp"
              data-photo-src="${root}/assets/images/industries/quality-assurance-lab.webp"
              data-backup-src="${root}/assets/images/industries/backup/quality-assurance-lab.webp"
              alt="Industrial mineral quality inspection and testing workflow"
              loading="lazy"
            />
            <div class="dm-about-caption">
              <span>ISO 9001:2015 &middot; ISO 14001:2015 Trading Scope</span>
              <span>Illustrative quality control image</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           G. OPERATIONS AND CAPABILITIES
           ==================================================================== -->
      <section class="dm-band-white" id="operations">
        <div id="facilities" style="scroll-margin-top: 90px;"></div>
        <div class="shell">
          <div class="section-head" style="margin-bottom: 2rem;">
            <div>
              <span class="dm-section-kicker">OPERATIONS &amp; CAPABILITIES</span>
              <h2 class="dm-section-heading">Sourcing, Handling &amp; Dispatch Coordination</h2>
            </div>
            <p class="dm-section-sub" style="margin: 0;">
              Structured B2B trading operations coordinated from our corporate office in Lawrence Road, New Delhi.
            </p>
          </div>

          <!-- Illustrative Industrial Visual Row -->
          <div class="dm-ops-photo-row">
            <div class="dm-ops-photo-card">
              <img
                src="${root}/assets/images/gallery/packaging_warehouse_bags.jpg"
                alt="Industrial mineral bag packaging and covered dry storage"
                loading="lazy"
              />
              <div class="dm-ops-photo-caption">
                <strong>Packaging &amp; Dry Storage:</strong> Moisture-protected 25 kg &amp; 50 kg PP/HDPE bag handling (illustrative industrial image).
              </div>
            </div>
            <div class="dm-ops-photo-card">
              <img
                src="${root}/assets/images/gallery/logistics_transit_network.jpg"
                alt="Industrial freight transport and mineral dispatch logistics"
                loading="lazy"
              />
              <div class="dm-ops-photo-caption">
                <strong>Pan-India Logistics:</strong> Coordinated FTL and PTL road transport across industrial corridors (illustrative industrial image).
              </div>
            </div>
          </div>

          <!-- 6 Verified Operational Activities in Concise Bullet Points -->
          <div class="dm-ops-grid">
            <div class="dm-ops-card">
              <span class="dm-ops-step">01 / SOURCING</span>
              <h3>Material Sourcing</h3>
              <ul class="dm-bullet-list dm-bullet-list--compact">
                <li>Upstream partnerships across Rajasthan and Gujarat mineral regions.</li>
                <li>Selection aligned with required mineral composition and grade.</li>
                <li>Multi-source availability for continuity of industrial supply.</li>
              </ul>
            </div>

            <div class="dm-ops-card">
              <span class="dm-ops-step">02 / PREPARATION</span>
              <h3>Processing &amp; Preparation</h3>
              <ul class="dm-bullet-list dm-bullet-list--compact">
                <li>Pulverized, micronized, levigated, and screened granular grades.</li>
                <li>Custom particle fineness coordinated to application requirements.</li>
                <li>Grade matching for paints, plastics, rubber, ceramics, and construction.</li>
              </ul>
            </div>

            <div class="dm-ops-card">
              <span class="dm-ops-step">03 / INSPECTION</span>
              <h3>Quality Inspection</h3>
              <ul class="dm-bullet-list dm-bullet-list--compact">
                <li>Verification of visual whiteness, cleanliness, and sieve parameters.</li>
                <li>Batch-level COA and TDS provided on customer request.</li>
                <li>Documented procedures aligned with ISO 9001:2015 QMS.</li>
              </ul>
            </div>

            <div class="dm-ops-card">
              <span class="dm-ops-step">04 / PACKAGING</span>
              <h3>Packaging</h3>
              <ul class="dm-bullet-list dm-bullet-list--compact">
                <li>Standard 25 kg and 50 kg PP woven and HDPE industrial bags.</li>
                <li>Moisture-barrier LDPE inner liners for hygroscopic powders.</li>
                <li>Clear lot stenciling and palletized options on request.</li>
              </ul>
            </div>

            <div class="dm-ops-card">
              <span class="dm-ops-step">05 / STORAGE</span>
              <h3>Storage</h3>
              <ul class="dm-bullet-list dm-bullet-list--compact">
                <li>Covered dry storage managed from Lawrence Road, New Delhi.</li>
                <li>Clean lot segregation to prevent cross-contamination.</li>
                <li>Buffer inventory maintained for recurring industrial requirements.</li>
              </ul>
            </div>

            <div class="dm-ops-card">
              <span class="dm-ops-step">06 / DISPATCH</span>
              <h3>Dispatch</h3>
              <ul class="dm-bullet-list dm-bullet-list--compact">
                <li>Prompt local NCR dispatches and scheduled pan-India freight.</li>
                <li>Support for trial sample lots, part-loads, and full truckloads.</li>
                <li>Complete GST invoicing, e-way bills, and delivery documentation.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           H. WHY CHOOSE DEEPALI MINERALS
           ==================================================================== -->
      <section class="dm-band-offwhite" id="why">
        <div class="shell">
          <div class="section-head" style="margin-bottom: 2.25rem;">
            <div>
              <span class="dm-section-kicker">WHY CHOOSE DEEPALI MINERALS</span>
              <h2 class="dm-section-heading">Built for Practical B2B Procurement</h2>
            </div>
            <p class="dm-section-sub" style="margin: 0;">
              Focused on transparent specifications, steady multi-material availability, and direct commercial coordination.
            </p>
          </div>

          <div class="dm-why-grid">
            <div class="dm-why-card">
              <span class="dm-why-num">01 / PORTFOLIO</span>
              <h3>Diverse Product Range</h3>
              <ul class="dm-bullet-list">
                <li>22 industrial minerals, functional chemicals, and granular aggregates under one roof.</li>
                <li>Suitable for paints, plastics, rubber, ceramics, paper, soaps, and construction.</li>
                <li>Simplifies multi-material procurement with consolidated vendor coordination.</li>
              </ul>
            </div>

            <div class="dm-why-card">
              <span class="dm-why-num">02 / SOURCING</span>
              <h3>Quality-Focused Sourcing</h3>
              <ul class="dm-bullet-list">
                <li>ISO 9001:2015 Quality and ISO 14001:2015 Environmental certified trading operations.</li>
                <li>Established supplier relationships across key Indian mineral belts.</li>
                <li>Transparent disclosure of verified technical specifications and batch documentation.</li>
              </ul>
            </div>

            <div class="dm-why-card">
              <span class="dm-why-num">03 / EXPERIENCE</span>
              <h3>Industrial Materials Expertise</h3>
              <ul class="dm-bullet-list">
                <li>Continuous B2B trading presence in Delhi since 2004 under CEO Mr. Neeraj Monga.</li>
                <li>Practical understanding of filler selection, whiteness, and particle fineness needs.</li>
                <li>Guidance to match mineral grades with specific manufacturing formulations.</li>
              </ul>
            </div>

            <div class="dm-why-card">
              <span class="dm-why-num">04 / SUPPORT</span>
              <h3>Customer Support</h3>
              <ul class="dm-bullet-list">
                <li>Direct commercial communication via phone, email, and WhatsApp Sales Desk.</li>
                <li>Responsive quotations for both trial lots and recurring bulk requirements.</li>
                <li>Coordinated dispatch tracking and statutory GST billing support.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           J. RESOURCES AND BLOGS
           ==================================================================== -->
      <section class="dm-band-white" id="resources">
        <div id="updates" style="scroll-margin-top: 90px;"></div>
        <div class="shell">
          <div class="section-head" style="margin-bottom: 2rem;">
            <div>
              <span class="dm-section-kicker">RESOURCES &amp; GUIDES</span>
              <h2 class="dm-section-heading">Technical Guides &amp; Material Insights</h2>
            </div>
            <p class="dm-section-sub" style="margin: 0;">
              Practical references on mineral selection, particle grading, and quality documentation for industrial buyers.
            </p>
          </div>

          <div class="dm-resource-grid">
            <article class="dm-resource-card">
              <div class="dm-resource-photo">
                <img
                  src="${root}/assets/images/industries/paints-coatings.webp"
                  data-photo-src="${root}/assets/images/industries/paints-coatings.webp"
                  data-backup-src="${root}/assets/images/industries/backup/paints-coatings.webp"
                  alt="Particle fineness and sieve calibration reference"
                  loading="lazy"
                />
              </div>
              <div class="dm-resource-body">
                <span class="dm-resource-cat">PARTICLE GRADING</span>
                <h3>Understanding Sieve &amp; Micron Grading in Mineral Fillers</h3>
                <ul class="dm-bullet-list dm-bullet-list--compact" style="margin-bottom: 1rem;">
                  <li>How sieve mesh relates to micron particle size distribution.</li>
                  <li>Impact of fineness on paint smoothness and polymer dispersion.</li>
                </ul>
                <a href="${root}/product.html?product=talc" class="dm-resource-link">Read More &rarr;</a>
              </div>
            </article>

            <article class="dm-resource-card">
              <div class="dm-resource-photo">
                <img
                  src="${root}/assets/images/industries/plastics-polymers.webp"
                  data-photo-src="${root}/assets/images/industries/plastics-polymers.webp"
                  data-backup-src="${root}/assets/images/industries/backup/plastics-polymers.webp"
                  alt="Calcium Carbonate vs Dolomite selection guide"
                  loading="lazy"
                />
              </div>
              <div class="dm-resource-body">
                <span class="dm-resource-cat">MATERIAL SELECTION</span>
                <h3>Calcium Carbonate vs. Dolomite in Polymers &amp; Coatings</h3>
                <ul class="dm-bullet-list dm-bullet-list--compact" style="margin-bottom: 1rem;">
                  <li>Comparing optical whiteness, hardness, and oil absorption.</li>
                  <li>Selecting the right carbonate for PVC, wall putty, and paints.</li>
                </ul>
                <a href="${root}/product.html?product=calcium-carbonate" class="dm-resource-link">Read More &rarr;</a>
              </div>
            </article>

            <article class="dm-resource-card">
              <div class="dm-resource-photo">
                <img
                  src="${root}/assets/images/industries/frp-composites.webp"
                  data-photo-src="${root}/assets/images/industries/frp-composites.webp"
                  data-backup-src="${root}/assets/images/industries/backup/frp-composites.webp"
                  alt="Role of lamellar talc in polymer compounding"
                  loading="lazy"
                />
              </div>
              <div class="dm-resource-body">
                <span class="dm-resource-cat">APPLICATIONS</span>
                <h3>Role of Platy Talc in Polypropylene &amp; FRP Formulations</h3>
                <ul class="dm-bullet-list dm-bullet-list--compact" style="margin-bottom: 1rem;">
                  <li>Supports dimensional stability and surface smoothness.</li>
                  <li>Key considerations when requesting industrial talc grades.</li>
                </ul>
                <a href="${root}/industries/?industry=frp-composites" class="dm-resource-link">Read More &rarr;</a>
              </div>
            </article>

            <article class="dm-resource-card">
              <div class="dm-resource-photo">
                <img
                  src="${root}/assets/images/industries/quality-assurance-lab.webp"
                  data-photo-src="${root}/assets/images/industries/quality-assurance-lab.webp"
                  data-backup-src="${root}/assets/images/industries/backup/quality-assurance-lab.webp"
                  alt="Reviewing Certificate of Analysis documentation"
                  loading="lazy"
                />
              </div>
              <div class="dm-resource-body">
                <span class="dm-resource-cat">QUALITY DOCUMENTATION</span>
                <h3>Key Parameters to Check in an Industrial Mineral COA</h3>
                <ul class="dm-bullet-list dm-bullet-list--compact" style="margin-bottom: 1rem;">
                  <li>Reviewing brightness, moisture limits, and sieve residue.</li>
                  <li>Requesting TDS and MSDS prior to plant trials.</li>
                </ul>
                <a href="${root}/about.html#quality" class="dm-resource-link">Read More &rarr;</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           K. CONTACT AND ENQUIRY
           ==================================================================== -->
      <section class="dm-band-offwhite" id="contact">
        <div class="shell detail-grid" style="align-items: start;">
          <div>
            <span class="dm-section-kicker">COMMERCIAL DESK &middot; NEW DELHI</span>
            <h2 class="dm-section-heading">Contact Us</h2>
            <p class="dm-section-sub" style="margin-bottom: 1.5rem;">
              Share your material, required grade, and delivery location to receive commercial pricing and documentation from our team.
            </p>

            <div style="background: #FFFFFF; border: 1px solid #E2E5E9; border-top: 2px solid #D8C3A5; border-radius: 6px; padding: 1.5rem; margin-bottom: 1.5rem;">
              <ul class="dm-bullet-list">
                <li><strong>Leadership:</strong> Mr. Neeraj Monga (CEO / Proprietor)</li>
                <li><strong>Corporate Office:</strong> C-2/29 C Lawrence Road, Rampura / Keshav Puram, New Delhi &ndash; 110035, India</li>
                <li><strong>Sales Helplines:</strong> <a href="tel:+919810516065" style="color: #1769AA; font-weight: 700;">+91 9810516065</a>, <a href="tel:+919810715129" style="color: #1769AA; font-weight: 700;">9810715129</a></li>
                <li><strong>Email:</strong> <a href="mailto:info@deepaliminerals.in" style="color: #1769AA; font-weight: 700;">info@deepaliminerals.in</a></li>
                <li><strong>GSTIN:</strong> 07AIMPM0458Q1ZL</li>
                <li><strong>Business Hours:</strong> Monday &ndash; Saturday, 9:00 AM &ndash; 7:30 PM IST</li>
              </ul>
            </div>

            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
              <a href="${getWhatsAppUrl('Hello Deepali Minerals, I would like to enquire about your industrial minerals and materials.')}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn" style="border-radius: 4px;">
                ${whatsappIconSvg(16, 16)}
                <span>Enquire on WhatsApp</span>
              </a>
              <a href="tel:+919810516065" class="button alt" style="padding: 0.75rem 1.25rem; font-size: 0.82rem;">
                Call Sales Desk
              </a>
            </div>
          </div>

          ${rfq()}
        </div>
      </section>
    `;

    bindRfq();
    bindHeroVideoAudio();
    bindProductShowcaseTabs();
  }

  /* =========================================================================
   * PRODUCT SHOWCASE TABS CONTROLLER (HOMEPAGE)
   * ========================================================================= */
  function bindProductShowcaseTabs() {
    const tabs = document.querySelectorAll('.showcase-tab-btn');
    const cards = document.querySelectorAll('.homepage-product-card');
    if (!tabs.length || !cards.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        const filter = tab.getAttribute('data-filter');

        cards.forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* =========================================================================
   * HERO VIDEO AUDIO CONTROLLER
   * ========================================================================= */
  function bindHeroVideoAudio() {
    const video = document.querySelector('.hero-video');
    const toggleBtns = document.querySelectorAll('[data-hero-audio-toggle]');
    const fullscreenTriggers = document.querySelectorAll('[data-hero-fullscreen-trigger]');
    const unmutePrompt = document.querySelector('[data-hero-unmute-hint]');
    const soundCard = document.querySelector('.hero-sound-card');
    const volumeSlider = document.querySelector('.hero-volume-slider');
    const volumeLabel = document.querySelector('.hero-volume-label');
    const videoWrap = document.querySelector('[data-hero-video-click]');
    if (!video && !fullscreenTriggers.length) return;

    const mutedSvg = `
      <svg class="sound-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
      </svg>
    `;

    const playingSvg = `
      <svg class="sound-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
      </svg>
    `;

    const syncUI = (isMuted) => {
      if (unmutePrompt) {
        if (!isMuted) {
          unmutePrompt.classList.add('is-hidden');
        } else {
          unmutePrompt.classList.remove('is-hidden');
        }
      }

      toggleBtns.forEach(btn => {
        btn.setAttribute('aria-pressed', (!isMuted).toString());
        btn.classList.toggle('is-active', !isMuted);

        const iconEl = btn.querySelector('.hero-audio-icon');
        if (iconEl) {
          iconEl.innerHTML = isMuted ? mutedSvg : playingSvg;
        }

        const labelEl = btn.querySelector('.hero-audio-label');
        if (labelEl) {
          labelEl.textContent = isMuted ? 'Enable Video Sound' : 'Mute Video Sound';
        }
      });

      if (soundCard) {
        soundCard.classList.toggle('has-audio-on', !isMuted);
      }

      if (volumeSlider && video) {
        volumeSlider.value = isMuted ? 0 : (video.volume || 1);
      }
      if (volumeLabel && video) {
        const pct = isMuted ? 0 : Math.round((video.volume || 1) * 100);
        volumeLabel.textContent = `${pct}%`;
      }
    };

    const enableSound = () => {
      if (!video) return;
      video.muted = false;
      video.volume = 1.0;
      const playPromise = video.play();
      if (playPromise !== undefined) playPromise.catch(() => {});
      syncUI(false);
    };

    const toggleAudio = () => {
      if (!video) return;
      if (video.muted) {
        enableSound();
      } else {
        video.muted = true;
        syncUI(true);
      }
    };

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleAudio();
      });
    });

    if (volumeSlider && video) {
      volumeSlider.addEventListener('input', (e) => {
        e.stopPropagation();
        const val = parseFloat(e.target.value);
        video.volume = val;
        if (val > 0) {
          if (video.muted) {
            video.muted = false;
            const playPromise = video.play();
            if (playPromise !== undefined) playPromise.catch(() => {});
          }
          syncUI(false);
        } else {
          video.muted = true;
          syncUI(true);
        }
      });
      volumeSlider.addEventListener('click', (e) => e.stopPropagation());
    }

    if (videoWrap && video) {
      videoWrap.addEventListener('click', (e) => {
        if (!e.target.closest('button, a, input, select, textarea, form')) {
          toggleAudio();
        }
      });
    }

    if (video) {
      video.addEventListener('volumechange', () => {
        syncUI(video.muted);
      });
    }

    // FULLSCREEN THEATER CONTROLLER
    const openTheater = () => {
      if (video) enableSound();

      let theaterEl = document.querySelector('#hero-fullscreen-theater');
      if (!theaterEl) {
        theaterEl = document.createElement('div');
        theaterEl.id = 'hero-fullscreen-theater';
        theaterEl.className = 'video-fullscreen-theater';
        theaterEl.setAttribute('role', 'dialog');
        theaterEl.setAttribute('aria-modal', 'true');
        theaterEl.setAttribute('aria-label', 'Deepali Minerals Overview Video');

        const rootPath = document.body.getAttribute('data-root') || '.';
        const videoSrc = `${rootPath}/hero%20video%20DM%20watermark%20(1).mp4`;

        theaterEl.innerHTML = `
          <div class="video-theater-header">
            <div class="video-theater-title">
              <span style="background: rgba(216,195,165,0.2); border: 1px solid #D8C3A5; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.68rem; font-weight: 700; color: #E9DDC9;">DEEPALI MINERALS</span>
              <div>
                <h3>Industrial Minerals</h3>
                <span>Corporate Office &middot; Lawrence Road, New Delhi</span>
              </div>
            </div>
            <button type="button" class="video-theater-close-btn" id="btn-close-theater" aria-label="Close Video">
              ✕ Close [Esc]
            </button>
          </div>
          <div class="video-theater-body">
            <video class="video-theater-player" controls autoplay playsinline preload="auto">
              <source src="${videoSrc}" type="video/mp4" />
            </video>
          </div>
          <div class="video-theater-footer">
            <div>Industrial Minerals &middot; Pulverized Powders &middot; 22 Products</div>
            <div style="color: #E9DDC9; font-weight: 700;">ISO 9001:2015 &amp; ISO 14001:2015 CERTIFIED</div>
          </div>
        `;
        document.body.appendChild(theaterEl);

        const closeBtn = theaterEl.querySelector('#btn-close-theater');
        if (closeBtn) closeBtn.addEventListener('click', () => closeTheater());

        theaterEl.addEventListener('click', (e) => {
          if (!e.target.closest('.video-theater-player, .video-theater-header')) {
            closeTheater();
          }
        });

        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && theaterEl.classList.contains('is-open')) {
            closeTheater();
          }
        });
      }

      const theaterVideo = theaterEl.querySelector('.video-theater-player');
      if (theaterVideo) {
        try {
          theaterVideo.currentTime = video ? (video.currentTime || 0) : 0;
        } catch (_) {}
        theaterVideo.muted = false;
        theaterVideo.volume = 1.0;
        const playPromise = theaterVideo.play();
        if (playPromise !== undefined) playPromise.catch(() => {});
      }

      theaterEl.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };

    const closeTheater = () => {
      const theaterEl = document.querySelector('#hero-fullscreen-theater');
      if (theaterEl) {
        const theaterVideo = theaterEl.querySelector('.video-theater-player');
        if (theaterVideo) {
          if (video) {
            try {
              video.currentTime = theaterVideo.currentTime || 0;
            } catch (_) {}
          }
          theaterVideo.pause();
        }
        theaterEl.classList.remove('is-open');
      }
      document.body.style.overflow = '';
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    };

    fullscreenTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openTheater();
      });
    });

    if (video) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) playPromise.catch(() => {});
      syncUI(true);
    }
  }

  /* =========================================================================
   * BUYER-INTENT MATERIAL DISCOVERY ENGINE CONTROLLER
   * ========================================================================= */
  function bindDiscoveryEngine() {
    const box = document.querySelector('.discovery-engine-box');
    if (!box) return;

    const btnGuided = document.querySelector('#btn-mode-guided');
    const btnFreetext = document.querySelector('#btn-mode-freetext');
    const panelGuided = document.querySelector('#panel-guided');
    const panelFreetext = document.querySelector('#panel-freetext');

    const questionSelect = document.querySelector('#discovery-question-select');
    const dynamicLabel = document.querySelector('#discovery-dynamic-label');
    const dynamicContainer = document.querySelector('#discovery-dynamic-input-container');
    const guidedForm = document.querySelector('#discovery-guided-form');

    const freetextForm = document.querySelector('#discovery-freetext-form');
    const freetextInput = document.querySelector('#discovery-freetext-input');

    const resultsSection = document.querySelector('#discovery-results');
    const resultsGrid = document.querySelector('#discovery-results-grid');
    const resultsCount = document.querySelector('#discovery-results-count');
    const activeCriteriaEl = document.querySelector('#discovery-active-criteria');
    const viewAllLink = document.querySelector('#discovery-view-all-link');

    // Mode Toggle
    function setMode(mode) {
      if (mode === 'freetext') {
        btnFreetext.classList.add('active');
        btnGuided.classList.remove('active');
        panelFreetext.style.display = 'block';
        panelGuided.style.display = 'none';
        if (freetextInput) freetextInput.focus();
      } else {
        btnGuided.classList.add('active');
        btnFreetext.classList.remove('active');
        panelGuided.style.display = 'block';
        panelFreetext.style.display = 'none';
      }
    }

    if (btnGuided) btnGuided.addEventListener('click', () => setMode('guided'));
    if (btnFreetext) btnFreetext.addEventListener('click', () => setMode('freetext'));

    // Dynamic Filter Generator for Guided Discovery
    function updateDynamicFilter() {
      const q = questionSelect ? questionSelect.value : 'material';

      if (q === 'material') {
        dynamicLabel.textContent = 'Select Material';
        dynamicContainer.innerHTML = `
          <select id="discovery-dynamic-select">
            <option value="">All 22 Catalogue Materials</option>
            ${data.products.map(p => `<option value="${esc(p.slug)}">${esc(p.name)} (${esc(p.category)})</option>`).join('')}
          </select>
        `;
      } else if (q === 'manufacturing' || q === 'industry') {
        dynamicLabel.textContent = 'Select Manufacturing Sector';
        dynamicContainer.innerHTML = `
          <select id="discovery-dynamic-select">
            <option value="">Select an industrial sector</option>
            ${data.industries.map(ind => `<option value="${esc(ind)}">${esc(ind)}</option>`).join('')}
          </select>
        `;
      } else if (q === 'application') {
        dynamicLabel.textContent = 'Select Specific Application';
        const apps = data.getCommonApplications ? data.getCommonApplications() : [];
        dynamicContainer.innerHTML = `
          <select id="discovery-dynamic-select">
            <option value="">Select application area</option>
            ${apps.map(a => `<option value="${esc(a.term)}">${esc(a.label)}</option>`).join('')}
          </select>
        `;
      } else if (q === 'filler') {
        dynamicLabel.textContent = 'Functional Filler & Extender Category';
        dynamicContainer.innerHTML = `
          <select id="discovery-dynamic-select">
            <option value="filler">All Functional Fillers & Extenders</option>
            <option value="Mineral Powders">Mineral Powder Fillers</option>
            <option value="Functional Chemicals">Functional Additives & Chemicals</option>
          </select>
        `;
      } else if (q === 'white') {
        dynamicLabel.textContent = 'High-Whiteness & Brightness Materials';
        dynamicContainer.innerHTML = `
          <select id="discovery-dynamic-select">
            <option value="white">All High-Whiteness & Bright Mineral Grades</option>
            <option value="calcium-carbonate">Calcium Carbonate (GCC / PCC)</option>
            <option value="talc">Talc (High Whiteness)</option>
            <option value="marble-powder">Marble Powder (Super White)</option>
            <option value="dolomite-powder">Dolomite Powder (94-97% Whiteness)</option>
            <option value="kaoline">Kaoline (Calcined White)</option>
          </select>
        `;
      } else if (q === 'micronized' || q === 'particle') {
        dynamicLabel.textContent = 'Fine / Micronized Gradations';
        dynamicContainer.innerHTML = `
          <select id="discovery-dynamic-select">
            <option value="micronized">All Fine & Micronized Powders</option>
            <option value="superfine">Superfine Micronized Grades</option>
            <option value="fine">Fine Industrial Powders</option>
            <option value="standard">Standard Milled &amp; Granular Grades</option>
          </select>
        `;
      } else if (['plastics', 'paints', 'rubber', 'cosmetics', 'pharma', 'pvc', 'ceramics', 'construction', 'paper', 'cables'].includes(q)) {
        const sectorNames = {
          plastics: 'Plastic',
          paints: 'Paints',
          rubber: 'Rubber',
          cosmetics: 'Cosmetics',
          pharma: 'Pharmaceutical',
          pvc: 'PVC',
          ceramics: 'Ceramics',
          construction: 'Construction',
          paper: 'Paper',
          cables: 'Cables'
        };
        const targetSector = sectorNames[q];
        dynamicLabel.textContent = `Target Compounding for ${targetSector}`;
        const matchingProds = data.getProductsByIndustry(targetSector);
        dynamicContainer.innerHTML = `
          <select id="discovery-dynamic-select">
            <option value="${esc(targetSector)}">All ${matchingProds.length} Materials for ${targetSector}</option>
            ${matchingProds.map(p => `<option value="${esc(p.slug)}">${esc(p.name)}</option>`).join('')}
          </select>
        `;
      } else if (q === 'custom') {
        dynamicLabel.textContent = 'Describe Requirement';
        dynamicContainer.innerHTML = `
          <input type="text" id="discovery-dynamic-text" placeholder="Type your formulation or grade requirement..." style="padding:.7rem .85rem; font: 500 .9rem var(--sans); border: 1px solid var(--line); width:100%; background:var(--paper);" />
        `;
      }
    }

    if (questionSelect) {
      questionSelect.addEventListener('change', () => {
        updateDynamicFilter();
      });
      updateDynamicFilter();
    }

    // Quick links for guided questions
    document.querySelectorAll('[data-set-q]').forEach(btn => {
      btn.addEventListener('click', () => {
        const qVal = btn.dataset.setQ;
        if (questionSelect) {
          questionSelect.value = qVal;
          updateDynamicFilter();
          executeGuidedDiscovery();
        }
      });
    });

    // Quick links for free-text examples
    document.querySelectorAll('[data-freetext-example]').forEach(btn => {
      btn.addEventListener('click', () => {
        setMode('freetext');
        if (freetextInput) {
          freetextInput.value = btn.dataset.freetextExample;
          executeFreetextDiscovery();
        }
      });
    });

    // Render Material Results
    function renderDiscoveryResults(productsList, criteriaDesc, routeContext) {
      if (!resultsSection || !resultsGrid) return;
      resultsSection.style.display = 'block';

      if (resultsCount) {
        resultsCount.textContent = `(${productsList.length} ${productsList.length === 1 ? 'material' : 'materials'})`;
      }
      if (activeCriteriaEl) {
        activeCriteriaEl.innerHTML = criteriaDesc ? `Showing matches for: <strong>${esc(criteriaDesc)}</strong>` : '';
      }

      if (!productsList.length) {
        resultsGrid.innerHTML = `
          <div class="empty" style="grid-column: 1 / -1; padding: 2.5rem; background: var(--fog); text-align: center;">
            <p style="font-weight: 700; color: var(--ink); margin-bottom: .5rem;">No exact matching materials found for this requirement.</p>
            <p style="font-size: .88rem; color: var(--slate); margin-bottom: 1rem;">Our Lawrence Road commercial desk sources and processes custom industrial mineral grades on request.</p>
            <a href="#rfq" class="button alt" style="margin-right: .5rem;">Submit Custom Quotation</a>
            <a href="${productsUrl}" class="button">Explore All 22 Materials</a>
          </div>
        `;
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }

      const indCtx = routeContext && routeContext.industry ? routeContext.industry : '';
      const appCtx = routeContext && routeContext.application ? routeContext.application : '';
      const rCtx = routeContext && routeContext.route ? routeContext.route : 'Find Your Material';

      resultsGrid.innerHTML = productsList.map(p => productCard(p, indCtx, appCtx, rCtx)).join('');
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Execution: Guided
    function executeGuidedDiscovery() {
      const q = questionSelect ? questionSelect.value : 'material';
      const dynamicSelect = document.querySelector('#discovery-dynamic-select');
      const dynamicTextInput = document.querySelector('#discovery-dynamic-text');
      const val = dynamicSelect ? dynamicSelect.value : (dynamicTextInput ? dynamicTextInput.value : '');

      let matched = [];
      let criteriaText = '';
      let routeContext = { route: `Guided Discovery: ${q}` };

      if (q === 'material') {
        if (val) {
          const p = data.getProductBySlug(val);
          matched = p ? [p] : data.products;
          criteriaText = p ? p.name : 'All Catalogue Materials';
        } else {
          matched = data.products;
          criteriaText = 'All 22 Catalogue Materials';
        }
      } else if (q === 'manufacturing' || q === 'industry') {
        if (val) {
          matched = data.getProductsByIndustry(val);
          criteriaText = `${val} Manufacturing Sector`;
          routeContext.industry = val;
        } else {
          matched = data.products;
          criteriaText = 'All Manufacturing Sectors';
        }
      } else if (q === 'application') {
        if (val) {
          matched = data.searchProducts(val);
          criteriaText = `Application: ${val}`;
          routeContext.application = val;
        } else {
          matched = data.products;
          criteriaText = 'All Applications';
        }
      } else if (q === 'filler') {
        if (val === 'Mineral Powders') {
          matched = data.getProductsByCategory('Mineral Powders');
          criteriaText = 'Mineral Powder Fillers';
        } else if (val === 'Functional Chemicals') {
          matched = data.getProductsByCategory('Functional Chemicals');
          criteriaText = 'Functional Additives & Chemicals';
        } else {
          matched = data.searchByRequirement('filler extender');
          criteriaText = 'Functional Fillers & Extenders';
        }
      } else if (q === 'white') {
        if (val && val !== 'white') {
          const p = data.getProductBySlug(val);
          matched = p ? [p] : data.searchByRequirement('white brightness');
          criteriaText = p ? `${p.name} (High Whiteness)` : 'White Minerals';
        } else {
          matched = data.searchByRequirement('white brightness marble carbonate talc dolomite kaoline');
          criteriaText = 'White & High-Brightness Minerals';
        }
      } else if (q === 'micronized' || q === 'particle') {
        if (val === 'superfine') {
          matched = data.searchByRequirement('superfine micronized lamellar coated');
          criteriaText = 'Superfine Micronized Grades';
        } else if (val === 'fine') {
          matched = data.getProductsByCategory('Mineral Powders');
          criteriaText = 'Fine Industrial Powders';
        } else if (val === 'standard') {
          matched = data.getProductsByCategory('Industrial Materials');
          criteriaText = 'Standard Milled & Granular Grades';
        } else {
          matched = data.searchByRequirement('fine micron micronized');
          criteriaText = 'Fine & Micronized Powders';
        }
      } else if (['plastics', 'paints', 'rubber', 'cosmetics', 'pharma', 'pvc', 'ceramics', 'construction', 'paper', 'cables'].includes(q)) {
        const sectorNames = {
          plastics: 'Plastic',
          paints: 'Paints',
          rubber: 'Rubber',
          cosmetics: 'Cosmetics',
          pharma: 'Pharmaceutical',
          pvc: 'PVC',
          ceramics: 'Ceramics',
          construction: 'Construction',
          paper: 'Paper',
          cables: 'Cables'
        };
        const targetSector = sectorNames[q];
        routeContext.industry = targetSector;
        if (val && val !== targetSector) {
          const p = data.getProductBySlug(val);
          matched = p ? [p] : data.getProductsByIndustry(targetSector);
          criteriaText = p ? `${p.name} for ${targetSector}` : `Materials for ${targetSector}`;
        } else {
          matched = data.getProductsByIndustry(targetSector);
          criteriaText = `Materials for ${targetSector}`;
        }
      } else if (q === 'custom') {
        if (val && val.trim()) {
          matched = data.searchByRequirement(val);
          criteriaText = `"${val}"`;
          routeContext.route = `Custom Requirement: "${val}"`;
        } else {
          matched = data.products;
          criteriaText = 'All Materials';
        }
      }

      renderDiscoveryResults(matched, criteriaText, routeContext);
    }

    // Execution: Free-Text
    function executeFreetextDiscovery() {
      const qText = freetextInput ? freetextInput.value.trim() : '';
      if (!qText) {
        renderDiscoveryResults(data.products, 'All Materials', { route: 'Free-text Search' });
        return;
      }

      const matched = data.searchByRequirement(qText);
      renderDiscoveryResults(matched, `"${qText}"`, { route: 'Describe Requirement', requirementText: qText });
    }

    if (guidedForm) {
      guidedForm.addEventListener('submit', e => {
        e.preventDefault();
        executeGuidedDiscovery();
      });
    }

    if (freetextForm) {
      freetextForm.addEventListener('submit', e => {
        e.preventDefault();
        executeFreetextDiscovery();
      });
    }
  }


  /* =========================================================================
   * PHASE 3: INDUSTRY SVG ICON HELPER (18 CANONICAL SECTORS)
   * ========================================================================= */
  function getIndustryIconSvg(slug, size) {
    const s = size || 22;
    switch (slug) {
      case 'paints-coatings':
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/><path d="M9 8c-2 3-4 3.5-7 4l8 8c.5-3 1-5 4-7"/><path d="M14.5 17.5 4.5 7.5"/></svg>`;
      case 'plastics-polymers':
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`;
      case 'rubber-footwear':
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></svg>`;
      case 'construction-building-materials':
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="22.01"/><line x1="15" y1="22" x2="15" y2="22.01"/><line x1="9" y1="18" x2="9" y2="18.01"/><line x1="15" y1="18" x2="15" y2="18.01"/><line x1="9" y1="14" x2="9" y2="14.01"/><line x1="15" y1="14" x2="15" y2="14.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/></svg>`;
      case 'ceramics':
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`;
      case 'paper-stationery':
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`;
      case 'frp-composites':
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
      case 'agriculture-allied':
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22h20"/><path d="M12 2v20"/><path d="M12 7c-4 0-7 3-7 7v8"/><path d="M12 7c4 0 7 3 7 7v8"/></svg>`;
      case 'detergents-household':
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`;
      case 'foundry-industrial':
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`;
      case 'plywood':
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`;
      case 'wall-putty-nc-putty':
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 11-6 6v3h3l6-6"/><path d="m22 2-6 6"/><path d="M13 13 4 4"/><circle cx="18" cy="6" r="3"/></svg>`;
      case 'fibre-murti':
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 2 18 2 22 7 12 22 2 7 6 2"/><line x1="2" y1="7" x2="22" y2="7"/><line x1="12" y1="22" x2="12" y2="7"/></svg>`;
      case 'gulal-rangoli':
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
      case 'tile-adhesives':
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`;
      case 'cattle-feed':
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`;
      case 'fire-safety':
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
      case 'gym-powder':
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>`;
      default:
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`;
    }
  }


  /* =========================================================================
   * PHASE 3: INDUSTRY-WISE PRODUCT DISCOVERY & APPLICATION MAPPING
   * Dedicated Landing Pages for 18 Canonical Sectors + Discovery Hub
   * ========================================================================= */
  function industries() {
    const mainEl = document.querySelector('#main');
    if (!mainEl) return;

    const params = new URLSearchParams(window.location.search);
    const rawIndustry = params.get('industry') || params.get('sector') || params.get('slug');

    const canonicalIndustries = data.getCanonicalIndustries ? data.getCanonicalIndustries() : [];

    // Check if user is requesting a specific individual industry page
    if (rawIndustry) {
      const ind = (data.getCanonicalIndustryBySlug && data.getCanonicalIndustryBySlug(rawIndustry)) ||
                  (data.getCanonicalIndustryByName && data.getCanonicalIndustryByName(rawIndustry));
      if (ind) {
        renderIndividualIndustryPage(ind, mainEl, canonicalIndustries);
        return;
      }
    }

    // Default: Render the 18 Canonical Industries Discovery Hub
    renderIndustryDiscoveryHub(mainEl, canonicalIndustries);
  }

  /* -------------------------------------------------------------------------
   * INDIVIDUAL INDUSTRY LANDING PAGE VIEW
   * ------------------------------------------------------------------------- */
  function renderIndividualIndustryPage(ind, mainEl, allIndustries) {
    updateSeoMeta({
      title: `${ind.name} Raw Minerals & Compounding Materials | Deepali Minerals`,
      description: `Discover verified industrial minerals for ${ind.name}. Deepali Minerals supplies high-whiteness extenders, functional fillers, and raw materials from Delhi with ISO certified quality.`,
      canonical: `https://www.deepaliminerals.com/industries/?industry=${ind.slug}`,
      ogType: 'website',
      ogImage: 'https://www.deepaliminerals.com/assets/images/brand/logo.png'
    });

    setBreadcrumbsJsonLd([
      { name: 'Home', url: 'https://www.deepaliminerals.com/' },
      { name: 'Industries', url: 'https://www.deepaliminerals.com/industries/' },
      { name: ind.name, url: `https://www.deepaliminerals.com/industries/?industry=${ind.slug}` }
    ]);

    // Schema.org CollectionPage / ItemList JSON-LD
    let schemaScript = document.getElementById('industry-schema-jsonld');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'industry-schema-jsonld';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": `${ind.name} Minerals — Deepali Minerals`,
      "description": ind.description,
      "url": `https://www.deepaliminerals.com/industries/?industry=${ind.slug}`,
      "mainEntity": {
        "@type": "ItemList",
        "name": `Industrial Minerals for ${ind.name}`,
        "numberOfItems": ind.products.length,
        "itemListElement": ind.products.map((p, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": p.name,
          "url": `https://www.deepaliminerals.com/product.html?product=${p.slug}`
        }))
      }
    };
    schemaScript.textContent = JSON.stringify(schemaData);

    const waIndustryUrl = `https://wa.me/${(data.company.whatsappNumber || '919810516065').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(ind.whatsappPrefill || `Hello Deepali Minerals, I would like to enquire about mineral materials for ${ind.name}.`)}`;

    const otherSectors = allIndustries.filter(other => other.slug !== ind.slug);

    const indHighlights = (ind.keyApplications && ind.keyApplications.length)
      ? ind.keyApplications.slice(0, 3)
      : [ind.subtitle];

    mainEl.innerHTML = `
      <!-- 1. INDUSTRY DETAIL HERO BANNER -->
      <section class="industry-detail-hero">
        <div class="shell">
          <!-- Breadcrumb Navigation Bar -->
          <div class="industry-breadcrumb-bar">
            <div class="industry-breadcrumb-links">
              <a href="${root}/">Home</a>
              <span>/</span>
              <a href="${industriesUrl}">Industries</a>
              <span>/</span>
              <span style="color: #252F3D; font-weight: 700;">${esc(ind.name)}</span>
            </div>
            <a href="${industriesUrl}" class="industry-back-all-btn">
              &larr; View All 18 Industries
            </a>
          </div>

          <!-- Header Grid: Title + Sourcing Profile Box -->
          <div class="industry-detail-header-grid">
            <div>
              <span class="industry-hub-badge">
                ${getIndustryIconSvg(ind.slug, 15)}
                <span>${esc(ind.badge)} &middot; ${ind.products.length} Verified Materials</span>
              </span>

              <h1 class="industry-detail-title">${esc(ind.name)}</h1>
              <div class="industry-detail-subtitle">${esc(ind.subtitle)}</div>

              <ul class="dm-bullet-list" style="margin: 0 0 1.75rem; max-width: 60ch;">
                <li>${esc(ind.description)}</li>
                ${indHighlights.slice(0, 2).map(item => `<li><strong>Application focus:</strong> ${esc(item)}</li>`).join('')}
              </ul>

              <div class="industry-detail-actions">
                <a href="#industry-rfq" class="button" style="padding: 0.85rem 1.65rem;">
                  Enquire Now &darr;
                </a>
                <a href="${waIndustryUrl}" target="_blank" rel="noopener noreferrer" class="canonical-btn-wa" style="padding: 0.85rem 1.35rem; font-size: 0.84rem;">
                  ${whatsappIconSvg(16, 16)}
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </div>

            <!-- Commercial Sourcing Summary Card -->
            <div class="industry-quick-procure-box">
              <div class="industry-procure-title">Commercial Sourcing Summary</div>
              <ul class="dm-bullet-list dm-bullet-list--compact" style="margin: 0 0 1.15rem;">
                <li><strong>Mapped Materials:</strong> ${ind.products.length} verified catalogue grades</li>
                <li><strong>Grading Options:</strong> Custom particle sizing on request</li>
                <li><strong>Standard Packaging:</strong> 25 kg &amp; 50 kg HDPE / PP bags</li>
                <li><strong>Management Systems:</strong> ISO 9001:2015 &amp; ISO 14001:2015</li>
              </ul>
              <a href="tel:+919810516065" style="display: block; text-align: center; font: 600 0.78rem var(--mono); color: #252F3D; text-decoration: none; padding: 0.65rem; border: 1px solid #D8C3A5; border-radius: 4px; background: #F8F9FA;">
                Commercial Desk: +91 9810516065 (Mr. Neeraj Monga, CEO)
              </a>
            </div>
          </div>

          ${renderHeroVisualBanner({
            pageKey: 'industry:' + ind.slug,
            imgSrc: getIndustryImageSrc(ind.slug),
            backupSrc: getBackupImageSrc(ind.slug),
            alt: `${ind.name} — Industrial Sector Applications | Deepali Minerals`,
            caption: `Sector Visual · ${ind.name}`
          })}
        </div>
      </section>

      <!-- 2. REGULATORY & TECHNICAL QUALIFICATION NOTICE (IF APPLICABLE) -->
      ${ind.regulatoryNotice ? `
        <section style="background: #FFFFFF; padding: 1.5rem 0 0;">
          <div class="shell">
            <div class="industry-regulatory-alert ${ind.id === 'cattle-feed' ? 'critical' : ''}">
              <div class="industry-regulatory-head">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span>${ind.id === 'cattle-feed' ? 'MANDATORY REGULATORY COMPLIANCE NOTICE: LIVESTOCK FEED & PREMIXES' : (ind.id === 'fire-safety' ? 'TECHNICAL GOVERNANCE NOTICE: FLAME RETARDANCY & CABLE COMPOUNDING' : (ind.id === 'agriculture-allied' ? 'COMMERCIAL NOTICE: TECHNICAL & AGRICULTURAL GRADE BLENDING' : (ind.id === 'gulal-rangoli' ? 'FORMULATION NOTICE: COSMETIC COMPLIANCE & SKIN CONTACT' : 'APPLICATION ADVISORY: ATHLETIC CHALK & GRIP COMPOUNDS')))}</span>
              </div>
              <div class="industry-regulatory-body">
                ${esc(ind.regulatoryNotice)}
              </div>
            </div>
          </div>
        </section>
      ` : ''}

      <!-- 3. MATCHED VERIFIED MINERALS (PRODUCT LISTINGS GRID) -->
      <section style="padding: 4rem 0 3.5rem; background: #F8F9FA; border-bottom: 1px solid #E2E5E9;">
        <div class="shell">
          <div class="section-head" style="margin-bottom: 2rem;">
            <div>
              <span class="eyebrow" style="color: #80664A;">VERIFIED RAW MATERIAL PORTFOLIO (${ind.products.length} PRODUCTS)</span>
              <h2 class="section-title">Minerals &amp; Materials for ${esc(ind.name)}</h2>
            </div>
            <p class="lede">Catalogued minerals and functional materials supplied for ${esc(ind.name)} formulations.</p>
          </div>

          <div class="industry-products-deck">
            ${ind.products.map(p => {
              const roleText = (ind.productRoles && ind.productRoles[p.slug]) ? ind.productRoles[p.slug] : p.shortDescription;
              const prodWaUrl = `https://wa.me/${(data.company.whatsappNumber || '919810516065').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello Deepali Minerals, I would like to enquire about ${p.name} for ${ind.name}. My required specifications and volume: `)}`;
              return `
                <article class="industry-product-card">
                  <div class="industry-product-img-wrap">
                    <img src="${resolveProductImg(p.image)}" alt="${esc(p.name)} for ${esc(ind.name)}" class="industry-product-img" loading="lazy" />
                  </div>

                  <div class="industry-product-body">
                    <span class="industry-product-cat">${esc(p.category)}</span>
                    <h3 class="industry-product-name">${esc(p.name)}</h3>

                    <ul class="dm-bullet-list dm-bullet-list--compact" style="margin: 0.4rem 0 1rem; flex-grow: 1;">
                      <li><strong>Role in ${esc(ind.name)}:</strong> ${esc(roleText)}</li>
                      ${p.shortDescription && p.shortDescription !== roleText ? `<li>${esc(p.shortDescription)}</li>` : ''}
                    </ul>

                    <div class="industry-product-actions">
                      <a href="${productUrl(p, ind.slug)}" class="canonical-btn-primary">
                        View Product &rarr;
                      </a>
                      <button type="button" class="canonical-btn-rfq" onclick="prefillIndustryRfq('${esc(ind.name)}', '[Product: ${esc(p.name)}] Required specification: ; Estimated volume: ')">
                        Enquire
                      </button>
                      <a href="${prodWaUrl}" target="_blank" rel="noopener noreferrer" class="canonical-btn-wa" title="WhatsApp Enquiry for ${esc(p.name)}">
                        ${whatsappIconSvg(13, 13)}
                        <span>WA</span>
                      </a>
                    </div>
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </div>
      </section>

      <!-- 4. TECHNICAL SPECIFICATIONS & QUALITY ASSURANCE -->
      <section style="padding: 4.5rem 0; background: #FFFFFF; border-bottom: 1px solid #E2E5E9;">
        <div class="shell">
          <div class="section-head">
            <div>
              <span class="eyebrow" style="color: #80664A;">TECHNICAL CAPABILITIES</span>
              <h2 class="section-title">Application Scope &amp; Supply Assurance</h2>
            </div>
            <p class="lede">Structured application focus, technical highlights, and supply checks for ${esc(ind.name)}.</p>
          </div>

          <div class="industry-technical-grid">
            <!-- Card 1: Key Applications -->
            <div class="industry-technical-card">
              <div class="industry-technical-head">
                <div class="canonical-card-icon-box">${getIndustryIconSvg(ind.slug, 20)}</div>
                <h3 class="industry-technical-title">Key Application Areas</h3>
              </div>
              <ul class="dm-bullet-list dm-bullet-list--compact">
                ${(ind.keyApplications || []).map(app => `<li>${esc(app)}</li>`).join('')}
              </ul>
            </div>

            <!-- Card 2: Technical Highlights -->
            <div class="industry-technical-card">
              <div class="industry-technical-head">
                <div class="canonical-card-icon-box" style="color: #80664A;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <h3 class="industry-technical-title">Technical Highlights</h3>
              </div>
              <ul class="dm-bullet-list dm-bullet-list--compact">
                ${(ind.technicalHighlights || []).map(high => `<li>${esc(high)}</li>`).join('')}
              </ul>
            </div>

            <!-- Card 3: Deepali Minerals Supply Assurance -->
            <div class="industry-technical-card">
              <div class="industry-technical-head">
                <div class="canonical-card-icon-box" style="color: #252F3D;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 class="industry-technical-title">Deepali Minerals Assurance</h3>
              </div>
              <ul class="dm-bullet-list dm-bullet-list--compact">
                <li><strong>Sourcing Network:</strong> Established quarry partnerships across Rajasthan and Gujarat.</li>
                <li><strong>Quality Checks:</strong> Particle fineness, whiteness, and batch suitability reviewed per order.</li>
                <li><strong>Commercial Coordination:</strong> Managed from Lawrence Road, Keshav Puram, New Delhi.</li>
                <li><strong>Certified Systems:</strong> ISO 9001:2015 &amp; ISO 14001:2015 (Trading of Mineral &amp; Chemical Products).</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. DIRECT PROCUREMENT RFQ FOR THIS INDUSTRY -->
      <section id="industry-rfq" style="background: #F8F9FA; padding: 4.5rem 0; border-bottom: 1px solid #E2E5E9;">
        <div class="shell detail-grid">
          <div>
            <span class="eyebrow" style="color: #80664A;">COMMERCIAL ENQUIRY DESK</span>
            <h2 class="section-title">Enquire for ${esc(ind.name)}</h2>
            <p class="lede">Share your target grade, packaging requirement, and volume for commercial pricing and sample coordination.</p>

            <div class="dm-detail-block" style="margin-top: 1.5rem;">
              <h3>Direct Commercial Contact</h3>
              <ul class="dm-bullet-list dm-bullet-list--compact">
                <li><strong>CEO Desk:</strong> Mr. Neeraj Monga</li>
                <li><strong>Phone:</strong> <a href="tel:+919810516065" style="color: #1769AA; font-weight: 600;">+91 9810516065</a> / <a href="tel:+919810715129" style="color: #1769AA; font-weight: 600;">+91 9810715129</a></li>
                <li><strong>Email:</strong> <a href="mailto:info@deepaliminerals.in" style="color: #1769AA;">info@deepaliminerals.in</a></li>
                <li><strong>Office:</strong> C2/29C Lawrence Road, Keshav Puram, Delhi-110035</li>
                <li><strong>GSTIN:</strong> 07AIMPM0458Q1ZL</li>
              </ul>
            </div>

            <div style="margin-top: 1.25rem;">
              <a href="${waIndustryUrl}" target="_blank" rel="noopener noreferrer" class="canonical-btn-wa" style="padding: 0.85rem 1.5rem; font-size: 0.86rem;">
                ${whatsappIconSvg(16, 16)}
                <span>WhatsApp Regarding ${esc(ind.name)}</span>
              </a>
            </div>
          </div>

          <div>
            ${rfq(null, { industry: ind.name, notes: ind.defaultNotes })}
          </div>
        </div>
      </section>

      <!-- 6. EXPLORE OTHER MANUFACTURING SECTORS (17) -->
      <section style="background: #FFFFFF; padding: 3.5rem 0 4.5rem;">
        <div class="shell">
          <div class="other-industries-box">
            <span class="eyebrow" style="color: #80664A;">APPLICATION DIRECTORY</span>
            <h3 class="other-industries-title">Explore Other Industries (${otherSectors.length})</h3>
            <p style="font-size: 0.9rem; color: #526071; margin: 0 0 1rem;">Browse verified material mappings for other industrial sectors.</p>

            <div class="other-industries-pills">
              ${otherSectors.map(other => `
                <a href="${industriesUrl}?industry=${encodeURIComponent(other.slug)}" class="other-industry-pill" title="${esc(other.subtitle)}">
                  ${esc(other.name)} (${other.products.length})
                </a>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    `;

    bindRfq();
    initBackToTop();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  /* -------------------------------------------------------------------------
   * ALL 18 CANONICAL INDUSTRIES DISCOVERY HUB
   * ------------------------------------------------------------------------- */
  function renderIndustryDiscoveryHub(mainEl, allIndustries) {
    updateSeoMeta({
      title: 'Industries & Manufacturing Applications | Deepali Minerals',
      description: 'Explore all 18 manufacturing sectors and discover verified industrial minerals, pulverized extenders, and compounding chemicals from Deepali Minerals.',
      canonical: 'https://www.deepaliminerals.com/industries/',
      ogType: 'website',
      ogImage: 'https://www.deepaliminerals.com/assets/images/brand/logo.png'
    });

    setBreadcrumbsJsonLd([
      { name: 'Home', url: 'https://www.deepaliminerals.com/' },
      { name: 'Industries', url: 'https://www.deepaliminerals.com/industries/' }
    ]);

    mainEl.innerHTML = `
      <!-- 1. HUB HERO BANNER -->
      <section class="industry-hub-hero">
        <div class="shell">
          <span class="industry-hub-badge">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
            <span>Application Directory &middot; 18 Manufacturing Sectors</span>
          </span>

          <h1 class="industry-hub-title">Industries We Serve</h1>
          <ul class="dm-bullet-list" style="max-width: 64ch; margin: 0 0 1.75rem;">
            <li>Browse 18 verified manufacturing sectors mapped directly to our 22 catalogued industrial minerals.</li>
            <li>Compare compounding roles, key application areas, and relevant grades for each industrial sector.</li>
            <li>Submit sector-specific quotations or sample inquiries directly to our New Delhi commercial desk.</li>
          </ul>

          <div class="industry-hub-stats">
            <div class="industry-hub-stat">
              <div class="industry-hub-stat-num">18</div>
              <div class="industry-hub-stat-lbl">Manufacturing Sectors</div>
            </div>
            <div class="industry-hub-stat">
              <div class="industry-hub-stat-num">22</div>
              <div class="industry-hub-stat-lbl">Verified Mineral Products</div>
            </div>
            <div class="industry-hub-stat">
              <div class="industry-hub-stat-num">Custom</div>
              <div class="industry-hub-stat-lbl">Particle Fineness Grading</div>
            </div>
            <div class="industry-hub-stat">
              <div class="industry-hub-stat-num">20+ Years</div>
              <div class="industry-hub-stat-lbl">B2B Industrial Supply Track Record</div>
            </div>
          </div>

          ${renderHeroVisualBanner({
            pageKey: 'industries-hub',
            imgSrc: `${root}/assets/images/industries/industries-hub-hero.webp`,
            alt: 'Industrial Manufacturing Sectors Supplied by Deepali Minerals',
            caption: 'Directory Visual · 18 Manufacturing Sectors'
          })}
        </div>
      </section>

      <!-- 2. INSTANT SEARCH & QUICK FILTER BAR -->
      <section style="background: #FFFFFF; padding: 0 0 2.5rem;">
        <div class="shell">
          <div class="industry-discovery-bar">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
              <div style="flex: 1; min-width: 280px;">
                <label for="canonical-industry-search" style="display: block; font: 700 0.72rem var(--mono); text-transform: uppercase; color: #526071; margin-bottom: 0.35rem;">Search All 18 Manufacturing Sectors:</label>
                <div class="industry-search-input-wrap">
                  <svg class="industry-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input id="canonical-industry-search" type="search" class="industry-search-input" placeholder="Type an industry or mineral (e.g., Paints, Rubber, Putty, Cattle Feed, Talc, Calcite, Foundry)..." />
                </div>
              </div>
              <div style="font: 600 0.8rem var(--mono); color: #526071;">
                Showing <span id="visible-sector-count" style="font-weight: 800; color: #252F3D;">${allIndustries.length}</span> of ${allIndustries.length} Sectors
              </div>
            </div>

            <!-- Quick Category Pill Filters -->
            <div style="display: flex; gap: 0.45rem; flex-wrap: wrap; align-items: center;">
              <span style="font: 700 0.7rem var(--mono); color: #526071; text-transform: uppercase; margin-right: 0.35rem;">Sector Groups:</span>
              <button type="button" class="pill active sector-group-btn" data-group="all">All Sectors (18)</button>
              <button type="button" class="pill sector-group-btn" data-group="coatings">Coatings &amp; Construction (4)</button>
              <button type="button" class="pill sector-group-btn" data-group="polymers">Polymers &amp; Rubber (3)</button>
              <button type="button" class="pill sector-group-btn" data-group="ceramics">Ceramics &amp; Foundry (2)</button>
              <button type="button" class="pill sector-group-btn" data-group="specialty">Specialty &amp; Allied (9)</button>
            </div>
          </div>

          <!-- 3. 18 CANONICAL INDUSTRY CARDS GRID -->
          <div class="canonical-industry-grid" id="canonical-industry-cards-container">
            ${allIndustries.map((ind, idx) => {
              const waUrl = `https://wa.me/${(data.company.whatsappNumber || '919810516065').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(ind.whatsappPrefill || `Hello Deepali Minerals, I would like to enquire about mineral materials for ${ind.name}.`)}`;

              let group = 'specialty';
              if (['paints-coatings', 'construction-building-materials', 'wall-putty-nc-putty', 'tile-adhesives'].includes(ind.slug)) group = 'coatings';
              else if (['plastics-polymers', 'rubber-footwear', 'frp-composites'].includes(ind.slug)) group = 'polymers';
              else if (['ceramics', 'foundry-industrial'].includes(ind.slug)) group = 'ceramics';

              const indPhotoSrc = getIndustryImageSrc(ind.slug);
              const indBackupSrc = getBackupImageSrc(ind.slug);
              const cardPoints = (ind.keyApplications && ind.keyApplications.length)
                ? ind.keyApplications.slice(0, 3)
                : [ind.subtitle];

              return `
                <article class="canonical-industry-card" data-slug="${ind.slug}" data-name="${esc(ind.name.toLowerCase())}" data-group="${group}" data-materials="${esc(ind.products.map(p => p.name.toLowerCase()).join(' '))}">
                  <div>
                    <div class="canonical-card-photo-wrap">
                      <img src="${indPhotoSrc}" data-photo-src="${indPhotoSrc}" ${indBackupSrc ? `data-backup-src="${indBackupSrc}"` : ''} alt="${esc(ind.name)} industrial applications" loading="lazy" />
                    </div>
                    <div class="canonical-card-header">
                      <div class="canonical-card-icon-box">
                        ${getIndustryIconSvg(ind.slug, 20)}
                      </div>
                      <span class="canonical-card-index">SECTOR ${String(idx + 1).padStart(2, '0')} / 18</span>
                    </div>

                    <span class="canonical-card-badge">${esc(ind.badge)}</span>
                    <h3 class="canonical-card-title">${esc(ind.name)}</h3>
                    <div class="canonical-card-subtitle">${esc(ind.subtitle)}</div>

                    <ul class="dm-bullet-list dm-bullet-list--compact" style="margin: 0.45rem 0 0.85rem;">
                      ${cardPoints.map(pt => `<li>${esc(pt)}</li>`).join('')}
                    </ul>

                    ${ind.regulatoryNotice ? `
                      <div style="margin: 0.5rem 0 0.85rem; padding: 0.45rem 0.65rem; background: #FFFBEB; border: 1px solid #FDE68A; font-size: 0.74rem; line-height: 1.4; color: #92400E; border-radius: 4px;">
                        <strong>Notice:</strong> ${ind.id === 'cattle-feed' ? 'Mandatory feed-grade qualification required.' : (ind.id === 'fire-safety' ? 'Finished fire ratings formulation dependent.' : 'Technical specification qualification required.')}
                      </div>
                    ` : ''}

                    <!-- Matched Minerals Box -->
                    <div class="canonical-card-minerals-wrap">
                      <div class="canonical-card-minerals-head">
                        <span>Mapped Materials:</span>
                        <span style="color: #252F3D; font-weight: 700;">${ind.products.length} Products</span>
                      </div>
                      <div class="canonical-card-pills">
                        ${ind.products.slice(0, 6).map(p => `
                          <a href="${productUrl(p, ind.slug)}" class="canonical-mineral-pill" title="View ${esc(p.name)} specifications">
                            ${esc(p.name)}
                          </a>
                        `).join('')}
                        ${ind.products.length > 6 ? `
                          <span class="canonical-mineral-pill" style="background: #F1F3F5; color: #526071;">
                            +${ind.products.length - 6} more
                          </span>
                        ` : ''}
                      </div>
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="canonical-card-actions">
                    <a href="${industriesUrl}?industry=${encodeURIComponent(ind.slug)}" class="canonical-btn-primary">
                      Explore Sector &rarr;
                    </a>
                    <button type="button" class="canonical-btn-rfq" onclick="prefillIndustryRfq('${esc(ind.name)}', '${esc(ind.defaultNotes || '')}')">
                      Quick RFQ
                    </button>
                    <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="canonical-btn-wa" title="WhatsApp Enquiry for ${esc(ind.name)}">
                      ${whatsappIconSvg(14, 14)}
                      <span>WA</span>
                    </a>
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </div>
      </section>

      <!-- 4. DIRECT PROCUREMENT RFQ FOR GENERAL INDUSTRIAL ENQUIRIES -->
      <section style="background: #F8F9FA; padding: 4.5rem 0; border-top: 1px solid #E2E5E9;">
        <div class="shell detail-grid">
          <div>
            <span class="eyebrow" style="color: #80664A;">DIRECT SOURCING DESK</span>
            <h2 class="section-title">Need Guidance for Your Application?</h2>
            <ul class="dm-bullet-list" style="margin: 0.75rem 0 1.5rem;">
              <li>Share your target manufacturing process and performance requirements.</li>
              <li>Discuss custom particle sizing, packaging formats, and bulk dispatch schedules.</li>
              <li>Receive prompt quotations from our Lawrence Road commercial desk.</li>
            </ul>

            <div class="dm-detail-block">
              <h3>Commercial Desk Details</h3>
              <ul class="dm-bullet-list dm-bullet-list--compact">
                <li><strong>CEO Commercial Desk:</strong> Mr. Neeraj Monga</li>
                <li><strong>Phone:</strong> <a href="tel:+919810516065" style="color: #1769AA; font-weight: 600;">+91 9810516065</a> / <a href="tel:+919810715129" style="color: #1769AA; font-weight: 600;">+91 9810715129</a></li>
                <li><strong>Official Email:</strong> <a href="mailto:info@deepaliminerals.in" style="color: #1769AA;">info@deepaliminerals.in</a></li>
                <li><strong>GSTIN:</strong> 07AIMPM0458Q1ZL</li>
              </ul>
            </div>
          </div>

          <div>
            ${rfq(null, { industry: 'Industrial Manufacturing' })}
          </div>
        </div>
      </section>
    `;

    // Bind real-time directory search filter
    const searchInput = document.querySelector('#canonical-industry-search');
    const cards = document.querySelectorAll('.canonical-industry-card');
    const countEl = document.querySelector('#visible-sector-count');
    const groupButtons = document.querySelectorAll('.sector-group-btn');

    let activeGroup = 'all';

    function filterCards() {
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      let visible = 0;

      cards.forEach(card => {
        const name = card.dataset.name || '';
        const materials = card.dataset.materials || '';
        const group = card.dataset.group || '';

        const matchesQuery = !query || name.includes(query) || materials.includes(query);
        const matchesGroup = activeGroup === 'all' || group === activeGroup;

        if (matchesQuery && matchesGroup) {
          card.style.display = 'flex';
          visible++;
        } else {
          card.style.display = 'none';
        }
      });

      if (countEl) countEl.textContent = visible;
    }

    if (searchInput) {
      searchInput.addEventListener('input', filterCards);
    }

    groupButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        groupButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeGroup = btn.dataset.group || 'all';
        filterCards();
      });
    });

    bindRfq();
    initBackToTop();
  }

  // Global helper for RFQ button click on industry cards
  window.prefillIndustryRfq = function (indName, customNotes) {
    const rfqSec = document.querySelector('#rfq');
    if (!rfqSec) {
      window.location.href = `${root}/#rfq`;
      return;
    }
    const appInput = rfqSec.querySelector('input[name="application"]');
    if (appInput) {
      appInput.value = indName;
    }
    const notesInput = rfqSec.querySelector('input[name="notes"]');
    if (notesInput) {
      notesInput.value = customNotes || `[Manufacturing Sector: ${indName}] `;
      notesInput.focus();
    }
    rfqSec.scrollIntoView({ behavior: 'smooth' });
  };

  // Global helper for Application Card Quotation / RFQ button click
  window.prefillApplicationRfq = function (appName, defaultProductSlug, defaultNotes) {
    const rfqSec = document.querySelector('#rfq');
    if (!rfqSec) {
      const targetUrl = defaultProductSlug
        ? `${root}/product.html?product=${encodeURIComponent(defaultProductSlug)}&app=${encodeURIComponent(appName)}#rfq`
        : `${root}/#rfq`;
      window.location.href = targetUrl;
      return;
    }
    const appInput = rfqSec.querySelector('input[name="application"]');
    if (appInput) appInput.value = appName;

    if (defaultProductSlug) {
      const prodSelect = rfqSec.querySelector('select[name="product"]');
      if (prodSelect) {
        const prodObj = data.getProductBySlug(defaultProductSlug);
        const searchName = prodObj ? prodObj.name.toLowerCase() : defaultProductSlug.toLowerCase();
        for (let i = 0; i < prodSelect.options.length; i++) {
          if (prodSelect.options[i].value.toLowerCase().includes(searchName)) {
            prodSelect.selectedIndex = i;
            break;
          }
        }
      }
    }

    const notesInput = rfqSec.querySelector('input[name="notes"]');
    if (notesInput) {
      notesInput.value = defaultNotes || `[Application: ${appName}] `;
      notesInput.focus();
    }
    rfqSec.scrollIntoView({ behavior: 'smooth' });
  };

  /* =========================================================================
   * PRODUCTS CATALOGUE INDEX (`/products/`)
   * ========================================================================= */
  /* =========================================================================
   * PRODUCTS CATALOGUE INDEX (`/products/`)
   * ========================================================================= */
  function products() {
    const mainEl = document.querySelector('#main');
    if (!mainEl) return;

    // Set SEO Meta & Structured Breadcrumbs
    updateSeoMeta({
      title: 'Industrial Minerals & Chemicals Master Catalogue | Deepali Minerals',
      description: 'Explore all 22 industrial minerals, pulverized powders, and functional chemicals from Deepali Minerals. Filter by category, manufacturing sector, or application.',
      canonical: 'https://www.deepaliminerals.com/products/',
      ogType: 'website',
      ogImage: 'https://www.deepaliminerals.com/assets/images/brand/logo.png'
    });

    setBreadcrumbsJsonLd([
      { name: 'Home', url: 'https://www.deepaliminerals.com/' },
      { name: 'Products', url: 'https://www.deepaliminerals.com/products/' }
    ]);

    const commonApps = data.getCommonApplications ? data.getCommonApplications() : [];
    const mineralPowderCount = data.products.filter(p => p.category === 'Mineral Powders').length;
    const functionalChemCount = data.products.filter(p => p.category === 'Functional Chemicals').length;
    const aggregateCount = data.products.filter(p => p.category === 'Industrial Materials' || ['silica', 'quartz-sand', 'marble-chips'].includes(p.slug)).length;

    mainEl.innerHTML = `
      <!-- Natural Mineral Catalogue Hero -->
      <section class="page-hero" style="background: #FFFFFF; color: #252F3D; padding: 3.5rem 0 3rem; border-bottom: 1px solid #E2E5E9;">
        <div class="shell">
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: #F8F9FA; border: 1px solid #D8C3A5; padding: 0.35rem 0.75rem; border-radius: 4px; font-family: var(--mono); font-size: 0.72rem; font-weight: 600; color: #80664A; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.08em;">
            <span>B2B Product Catalogue &middot; Estd. 2004</span>
          </div>

          <h1 class="display" style="color: #252F3D; font-size: clamp(2.15rem, 4.2vw, 3.4rem); margin: 0 0 1rem; line-height: 1.08;">
            Our Industrial Minerals
          </h1>

          <ul class="dm-bullet-list" style="max-width: 66ch; margin: 0 0 1.65rem;">
            <li>Browse all ${data.products.length} catalogued non-metallic mineral powders, functional chemicals, and granular materials.</li>
            <li>Filter by material category, compounding application, or manufacturing industry sector.</li>
            <li>Open any product page for verified technical specifications, packaging formats, and quotation requests.</li>
          </ul>

          <div style="display: flex; align-items: center; gap: 1.35rem; flex-wrap: wrap; padding-top: 1.15rem; border-top: 1px solid #E2E5E9; font-family: var(--mono); font-size: 0.75rem; color: #526071;">
            <span><strong style="color: #252F3D;">${data.products.length}</strong> Verified Materials</span>
            <span style="color: #D8C3A5;">&bull;</span>
            <span><strong style="color: #252F3D;">18</strong> Industry Sectors</span>
            <span style="color: #D8C3A5;">&bull;</span>
            <span>ISO 9001:2015 &amp; ISO 14001:2015 Certified</span>
            <span style="color: #D8C3A5;">&bull;</span>
            <span>Lawrence Road, New Delhi</span>
          </div>

          ${renderHeroVisualBanner({
            pageKey: 'products-catalogue',
            imgSrc: `${root}/assets/images/gallery/hero_industrial_minerals.jpg`,
            alt: 'Industrial Minerals Quarry & Processing Portfolio — Deepali Minerals',
            caption: 'Catalogue Visual · 22 Industrial Minerals & Materials'
          })}
        </div>
      </section>

      <section class="catalogue" style="padding: 3rem 0 5rem; background: #FFFFFF;">
        <div class="shell">
          <!-- Category Filter Bar (Dynamic Counts) -->
          <div class="filter-bar" id="category-filter-bar" style="margin-bottom: 1.5rem;">
            <button type="button" class="filter-btn active" data-cat="all">All Materials (${data.products.length})</button>
            <button type="button" class="filter-btn" data-cat="Mineral Powders">Mineral Powders (${mineralPowderCount})</button>
            <button type="button" class="filter-btn" data-cat="Functional Chemicals">Functional Chemicals (${functionalChemCount})</button>
            <button type="button" class="filter-btn" data-cat="Grains & Aggregates">Grains &amp; Aggregates (${aggregateCount})</button>
          </div>

          <!-- Search & Count Bar -->
          <div class="catalogue-top" style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; background: #F8F9FA; border: 1px solid #E2E5E9; border-radius: 6px; padding: 1rem 1.25rem;">
            <span class="result-count" style="font-family: var(--mono); font-size: 0.8rem; font-weight: 700; color: #252F3D;">
              SHOWING <b id="product-count" style="color: #1769AA;">${data.products.length}</b> OF ${data.products.length} MATERIALS
            </span>
            <div style="flex: 1; max-width: 520px; min-width: 280px; position: relative;">
              <input 
                id="catalogue-search" 
                type="search" 
                placeholder="Search by mineral name, application, or industry (e.g. Talc, PVC, Putty, Rubber)..." 
                aria-label="Search materials"
                style="width: 100%; padding: 0.72rem 1rem; border: 1px solid #D1D5DB; border-radius: 4px; font-family: var(--sans); font-size: 0.88rem; background: #FFFFFF; color: #252F3D;"
              >
            </div>
          </div>

          <!-- Application Quick Filter Strip (Images + Text) -->
          <div style="margin: 1.25rem 0; padding: 1.25rem; background: #FFFFFF; border: 1px solid #E2E5E9; border-radius: 6px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: .5rem; margin-bottom: .9rem;">
              <span class="eyebrow" style="margin-bottom: 0; color: #80664A;">DISCOVER BY APPLICATION</span>
              <span style="font: 500 0.74rem var(--mono); color: #526071;">Select an application to filter materials</span>
            </div>
            <div class="dm-visual-filter-grid" id="application-quick-pills">
              ${commonApps.map(app => {
                const appImgMap = {
                  'Fire Safety': 'fire-safety.webp',
                  'Gym Powder': 'gym-powder.webp',
                  'PVC': 'rigid-pvc-profiles.jpg',
                  'Wall Putty': 'wall-putty-nc-putty.webp',
                  'Cosmetic': 'cosmetics-personal-care.jpg',
                  'Rubber': 'rubber-footwear.webp',
                  'Ceramic': 'ceramics.webp',
                  'Cable': 'cables-wires.jpg',
                  'Master Batch': 'plastics-polymers.webp',
                  'Primers': 'paints-coatings.webp',
                  'Foundry': 'foundry-industrial.webp',
                  'Effluent': 'effluent-water-treatment.jpg'
                };
                const appImgFile = appImgMap[app.term] || 'industries-hub-hero.webp';
                const appImgSrc = `${root}/assets/images/industries/${appImgFile}`;
                return `
                  <button type="button" class="pill dm-visual-filter-card" data-app="${esc(app.term)}" aria-label="Filter by ${esc(app.label)}">
                    <span class="dm-vfc-media">
                      <img src="${appImgSrc}" alt="${esc(app.label)}" loading="lazy" />
                      <span class="dm-vfc-check" aria-hidden="true">&#10003;</span>
                    </span>
                    <span class="dm-vfc-label">${esc(app.label)}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Industry Quick Selector (Images + Text) -->
          <div style="margin: 1.25rem 0 2.25rem; padding: 1.25rem; background: #F8F9FA; border: 1px solid #E2E5E9; border-radius: 6px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: .5rem; margin-bottom: .9rem;">
              <span class="eyebrow" style="margin-bottom: 0; color: #80664A;">FILTER BY INDUSTRY SECTOR</span>
              <button type="button" id="clear-filters-btn" style="font: 700 .72rem var(--mono); color: #1769AA; cursor: pointer; text-decoration: underline; background: none; border: 0; text-transform: uppercase;">Clear All Filters &times;</button>
            </div>
            <div class="dm-visual-filter-grid dm-visual-filter-grid--sectors" id="industry-pills">
              ${data.industries.map(ind => {
                const sectorImgMap = {
                  'Home / Household Applications': 'detergents-household.webp',
                  'Agriculture': 'agriculture-allied.webp',
                  'Plastic': 'plastics-polymers.webp',
                  'Putty': 'wall-putty-nc-putty.webp',
                  'Soap': 'detergents-household.webp',
                  'Footwear': 'rubber-footwear.webp',
                  'Pesticides': 'agriculture-allied.webp',
                  'Detergent': 'detergents-household.webp',
                  'Construction': 'construction-building-materials.webp',
                  'EVA': 'rubber-footwear.webp',
                  'Biofertilizers': 'agriculture-allied.webp',
                  'Cattle Feed': 'cattle-feed.webp',
                  'Rigid PVC': 'rigid-pvc-profiles.jpg',
                  'Wall Putty': 'wall-putty-nc-putty.webp',
                  'Ceramics': 'ceramics.webp',
                  'Colors': 'gulal-rangoli.webp',
                  'Mould Release': 'plastics-polymers.webp',
                  'Anti-Corrosive Primer': 'paints-coatings.webp',
                  'Foundry': 'foundry-industrial.webp',
                  'FRP': 'frp-composites.webp',
                  'Paints': 'paints-coatings.webp',
                  'Dal Polish Mills': 'agriculture-allied.webp',
                  'Fire Safety': 'fire-safety.webp',
                  'Gym Powder': 'gym-powder.webp',
                  'Fibre Murti': 'fibre-murti.webp',
                  'Tile Adhesives': 'tile-adhesives.webp',
                  'Plywood': 'plywood.webp',
                  'Gulal / Rangoli': 'gulal-rangoli.webp',
                  'NC Putty': 'wall-putty-nc-putty.webp',
                  'Stationery': 'paper-stationery.webp',
                  'Cosmetics': 'cosmetics-personal-care.jpg',
                  'Pharmaceutical': 'pharma-ayurvedic.jpg',
                  'Ayurvedic Medicines': 'pharma-ayurvedic.jpg',
                  'Cables': 'cables-wires.jpg',
                  'Rubber': 'rubber-footwear.webp',
                  'Paper': 'paper-stationery.webp',
                  'Master Batch': 'plastics-polymers.webp',
                  'Automobile Paints': 'automobile-paints.jpg'
                };
                const indImgFile = sectorImgMap[ind] || 'industries-hub-hero.webp';
                const indImgSrc = `${root}/assets/images/industries/${indImgFile}`;
                return `
                  <button type="button" class="pill dm-visual-filter-card" data-industry="${esc(ind)}" aria-label="Filter by ${esc(ind)}">
                    <span class="dm-vfc-media">
                      <img src="${indImgSrc}" alt="${esc(ind)}" loading="lazy" />
                      <span class="dm-vfc-check" aria-hidden="true">&#10003;</span>
                    </span>
                    <span class="dm-vfc-label">${esc(ind)}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Active Filter Notice -->
          <div id="filter-status" style="display: none; font: 600 .8rem var(--mono); color: #252F3D; margin-bottom: 1.25rem; padding: 0.75rem 1rem; background: #F8F9FA; border: 1px solid #D8C3A5; border-radius: 4px;"></div>

          <!-- Product Grid: All 22 Products (Zero Mesh Captions) -->
          <div class="product-grid" id="catalogue-grid">
            ${data.products.map(p => productCard(p)).join('')}
          </div>

        </div>
      </section>
    `;

    initCatalogueFiltering();
  }

  /* =========================================================================
   * PRODUCT DETAIL PAGE (`product.html?product=<slug>`)
   * ========================================================================= */
  function product() {
    const mainEl = document.querySelector('#main');
    if (!mainEl) return;

    const params = new URLSearchParams(location.search);
    const slug = params.get('product');
    const industryCtx = params.get('industry') || '';
    const appCtx = params.get('app') || '';
    const routeCtx = params.get('route') || '';
    const reqText = params.get('req') || '';

    const p = data.getProductBySlug(slug) || data.products[0];

    const absProductImg = p.image
      ? 'https://www.deepaliminerals.com/' + p.image.replace(/^\/+/, '')
      : '';

    // SEO Dynamic Update & Structured Data
    updateSeoMeta({
      title: `${p.name} - Technical Specifications & B2B Supply | Deepali Minerals`,
      description: `${p.name} technical specifications, manufacturing applications, mesh classification, and B2B wholesale supply from Deepali Minerals, Delhi.`,
      canonical: `https://www.deepaliminerals.com/product.html?product=${p.slug}`,
      ogType: 'product',
      ogImage: absProductImg
    });

    setBreadcrumbsJsonLd([
      { name: 'Home', url: 'https://www.deepaliminerals.com/' },
      { name: 'Products', url: 'https://www.deepaliminerals.com/products/' },
      { name: p.name, url: `https://www.deepaliminerals.com/product.html?product=${p.slug}` }
    ]);

    // Dynamic Schema.org Product Structured Data (Strictly without fabricated reviews, ratings, or prices)
    let schemaScript = document.getElementById('product-schema-jsonld');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'product-schema-jsonld';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": p.name,
      "image": absProductImg,
      "description": p.description || p.shortDescription,
      "category": p.category,
      "sku": `DM-${p.slug.toUpperCase()}`,
      "mpn": `DM-${p.slug.toUpperCase()}`,
      "brand": {
        "@type": "Brand",
        "name": "Deepali Minerals"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "Deepali Minerals",
        "url": "https://www.deepaliminerals.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "C2/29C Lawrence Road, Keshav Puram",
          "addressLocality": "Delhi",
          "postalCode": "110035",
          "addressCountry": "IN"
        }
      }
    });

    // Governance Helper: Strict mandate where unavailable values display verified standard message
    const UNAVAILABLE_MSG = 'Technical specifications and available grades can be shared on request.';
    const formatSpecValue = (val) => {
      if (!val || val === 'Available on request' || val === 'Technical data available on request.' || val === 'Technical data available on request') {
        return UNAVAILABLE_MSG;
      }
      return val;
    };

    const specs = p.specifications || {};
    const specRows = [];
    if (p.composition || specs.composition) {
      specRows.push(['Primary Composition', formatSpecValue(p.composition || specs.composition)]);
    }
    specRows.push(['Grade / Classification', formatSpecValue(specs.grade)]);
    specRows.push(['Purity / Chemical Assay', formatSpecValue(specs.purity)]);
    specRows.push(['Mesh Size (Sieve Analysis)', formatSpecValue(specs.mesh)]);
    specRows.push(['Micron Size (D50/D97)', formatSpecValue(specs.micron)]);
    specRows.push(['Particle Size Distribution', formatSpecValue(specs.particleSize)]);
    specRows.push(['Whiteness / Brightness %', formatSpecValue(specs.whiteness)]);
    specRows.push(['Moisture Content %', formatSpecValue(specs.moisture)]);
    specRows.push(['Bulk Density (g/cm³)', formatSpecValue(specs.bulkDensity)]);

    if (specs.ph) {
      specRows.push(['pH Value (Aqueous Slurry)', formatSpecValue(specs.ph)]);
    }
    if (specs.oilAbsorption) {
      specRows.push(['Oil Absorption (g/100g)', formatSpecValue(specs.oilAbsorption)]);
    }
    if (specs.asbestosStatus) {
      specRows.push(['Asbestos Safety Status', formatSpecValue(specs.asbestosStatus)]);
    }

    const relatedProds = data.getRelatedProducts(p.slug, 3);
    const whatsappProductUrl = `https://wa.me/919810516065?text=${encodeURIComponent(
      `Hello Deepali Minerals, I would like to request commercial pricing and specifications for ${p.name}${industryCtx ? ' for ' + industryCtx + ' application' : (reqText ? ' for requirement: ' + reqText : '')}.`
    )}`;

    // Build verified Product Overview bullet points (no fabricated claims)
    const isVerifiedSpecVal = (val) => {
      if (!val) return false;
      const s = String(val).trim().toLowerCase();
      return s !== '' && !s.includes('available on request') && s !== 'n/a' && s !== 'na';
    };

    const overviewBullets = [];
    overviewBullets.push(`<strong>Classification:</strong> ${esc(p.category)}${p.composition ? ` (${esc(p.composition)})` : ''}`);
    if (p.shortDescription) {
      overviewBullets.push(`<strong>Industrial Purpose:</strong> ${esc(p.shortDescription)}`);
    }
    if (p.description) {
      const sentences = p.description.split(/(?<=\.)\s+/).map(s => s.trim()).filter(Boolean);
      sentences.slice(0, 2).forEach(sent => {
        if (sent !== p.shortDescription) {
          overviewBullets.push(esc(sent));
        }
      });
    }

    // Build verified Key Features bullet points strictly from verified fields
    const keyFeatureBullets = [];
    if (isVerifiedSpecVal(specs.grade)) {
      keyFeatureBullets.push(`<strong>Available Grade:</strong> ${esc(specs.grade)}`);
    }
    if (isVerifiedSpecVal(specs.whiteness)) {
      keyFeatureBullets.push(`<strong>Whiteness / Optical Profile:</strong> ${esc(specs.whiteness)}`);
    }
    if (isVerifiedSpecVal(specs.moisture)) {
      keyFeatureBullets.push(`<strong>Moisture Control:</strong> ${esc(specs.moisture)}`);
    }
    if (isVerifiedSpecVal(specs.asbestosStatus)) {
      keyFeatureBullets.push(`<strong>Safety Verification:</strong> ${esc(specs.asbestosStatus)}`);
    }
    if (isVerifiedSpecVal(specs.ph)) {
      keyFeatureBullets.push(`<strong>Aqueous Slurry pH:</strong> ${esc(specs.ph)}`);
    }
    if (isVerifiedSpecVal(specs.oilAbsorption)) {
      keyFeatureBullets.push(`<strong>Oil Absorption:</strong> ${esc(specs.oilAbsorption)}`);
    }
    keyFeatureBullets.push('<strong>Quality Systems:</strong> Supplied under ISO 9001:2015 &amp; ISO 14001:2015 certified trading operations.');
    keyFeatureBullets.push('<strong>Technical Documentation:</strong> Grade-specific TDS, COA, and MSDS shared upon business enquiry.');

    const verifiedApplications = (p.applications && p.applications.length)
      ? p.applications
      : ['Application details can be confirmed on technical enquiry.'];

    const verifiedPackaging = (p.packaging && p.packaging.length)
      ? p.packaging
      : ['Standard moisture-resistant industrial packaging options can be confirmed on request.'];

    const verifiedSectors = (p.canonicalIndustries && p.canonicalIndustries.length)
      ? p.canonicalIndustries
      : (p.industries && p.industries.length ? p.industries : []);

    mainEl.innerHTML = `
      <!-- 1. PRODUCT NAME & HERO IMAGE GALLERY (ZERO MESH CAPTIONS NEAR IMAGE) -->
      <section style="background: #FFFFFF; padding: 2.5rem 0 3.5rem; border-bottom: 1px solid #E2E5E9;">
        <div class="shell">
          <div class="breadcrumbs" style="margin-bottom: 1.5rem; font-size: 0.78rem; color: #526071;">
            <a href="${root}/" style="color: #1769AA;">Home</a> / <a href="${productsUrl}" style="color: #1769AA;">Products</a> ${industryCtx ? `/ <a href="${productsUrl}?industry=${encodeURIComponent(industryCtx)}" style="color: #1769AA;">${esc(industryCtx)}</a>` : ''} ${appCtx ? `/ <span>${esc(appCtx)}</span>` : ''} / <strong style="color: #252F3D;">${esc(p.name)}</strong>
          </div>

          <div class="detail-intro">
            <div>
              <span class="eyebrow" style="color: #80664A; margin-bottom: 0.45rem;">
                DEEPALI MINERALS &middot; ${esc(p.category.toUpperCase())}
              </span>

              <h1 class="display" style="margin-top: 0.25rem; margin-bottom: 0.65rem; font-size: clamp(2.1rem, 4vw, 3.2rem); color: #252F3D;">
                ${esc(p.name)}
              </h1>

              ${p.composition ? `
                <div class="detail-composition" style="margin-bottom: 1.1rem;">
                  ${esc(p.composition)}
                </div>
              ` : ''}

              <!-- 2. PRODUCT OVERVIEW (CONCISE BULLET POINTS) -->
              <div style="margin: 0 0 1.45rem;">
                <h2 style="font: 600 0.78rem var(--mono); letter-spacing: 0.08em; text-transform: uppercase; color: #80664A; margin: 0 0 0.6rem;">
                  Product Overview
                </h2>
                <ul class="dm-bullet-list dm-bullet-list--compact">
                  ${overviewBullets.slice(0, 4).map(b => `<li>${b}</li>`).join('')}
                </ul>
              </div>

              <!-- Verified Supply Strip (No Mesh Size Captions Here) -->
              <div class="product-spec-quick-strip">
                <div class="product-spec-quick-item">
                  <span class="product-spec-quick-label">Category</span>
                  <span class="product-spec-quick-val">${esc(p.category)}</span>
                </div>
                <div class="product-spec-quick-item">
                  <span class="product-spec-quick-label">Quality Systems</span>
                  <span class="product-spec-quick-val">ISO 9001:2015 &middot; 14001</span>
                </div>
                <div class="product-spec-quick-item">
                  <span class="product-spec-quick-label">Corporate Office</span>
                  <span class="product-spec-quick-val">Lawrence Road, Delhi</span>
                </div>
              </div>

              <!-- Primary Buyer Actions -->
              <div class="detail-actions" style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1.65rem;">
                <a class="button" href="#rfq" style="padding: 0.85rem 1.65rem; font-size: 0.86rem;">
                  Enquire Now &rarr;
                </a>
                <a class="button alt" href="${whatsappProductUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.85rem 1.35rem; font-size: 0.86rem; color: #166534; border-color: #BBF7D0; background: #F0FDF4;">
                  ${whatsappIconSvg(16, 16)}
                  <span>WhatsApp Enquiry</span>
                </a>
                <a href="tel:+919810516065" class="button alt" style="padding: 0.85rem 1.25rem; font-size: 0.86rem;">
                  Call: +91 9810516065
                </a>
              </div>
            </div>

            <!-- Product Hero Image Gallery -->
            <div class="product-gallery-container">
              <div class="product-gallery-frame" style="border-radius: 6px; border: 1px solid #E2E5E9; background: #F8F9FA; box-shadow: 0 8px 24px rgba(37, 47, 61, 0.06); height: 380px;">
                ${p.image ? `
                  <img 
                    id="main-product-img"
                    src="${resolveProductImg(p.image)}" 
                    alt="${esc(p.alt || `${p.name} - Deepali Minerals Industrial Supply`)}" 
                    class="product-gallery-img ${p.gallery && p.gallery.length > 1 ? 'product-gallery-img--contain' : ''}" 
                    onerror="this.style.display='none'; var fb = this.parentElement.querySelector('.product-gallery-fallback'); if (fb) fb.style.display='flex';"
                  />
                ` : ''}
                <div class="product-gallery-fallback ${p.slug === 'starch' ? 'fallback-starch' : (p.category === 'Functional Chemicals' ? 'fallback-chemical' : (p.category === 'Industrial Materials' || p.category === 'Grains & Aggregates' ? 'fallback-aggregate' : 'fallback-mineral'))}" style="${p.image ? 'display:none;' : 'display:flex;'}">
                  <div class="gallery-fallback-center">
                    <div class="gallery-fallback-icon">
                      ${getProductCategoryIcon(p)}
                    </div>
                    <h3 class="gallery-fallback-title">${esc(p.name)}</h3>
                    <p class="gallery-fallback-desc">
                      ${p.slug === 'starch'
                        ? 'Natural polymeric carbohydrate material derived from plant sources.'
                        : (p.composition || 'Industrial material grade supplied by Deepali Minerals.')}
                    </p>
                  </div>
                </div>
              </div>

              ${p.gallery && p.gallery.length > 1 ? `
                <div class="product-gallery-thumbnails" style="display: flex; gap: 0.6rem; margin-top: 0.75rem; align-items: center; flex-wrap: wrap;">
                  ${p.gallery.map((g, idx) => `
                    <button 
                      type="button" 
                      class="product-thumb-btn ${idx === 0 ? 'active' : ''}" 
                      data-gallery-src="${resolveProductImg(g.src)}"
                      data-gallery-alt="${esc(g.alt)}"
                      data-gallery-caption="${esc(g.caption || g.alt)}"
                      style="cursor: pointer; border: 2px solid ${idx === 0 ? '#1769AA' : '#E2E5E9'}; border-radius: 5px; overflow: hidden; width: 68px; height: 68px; padding: 0; background: #F8F9FA; transition: all .2s; box-shadow: ${idx === 0 ? '0 0 0 2px rgba(23,105,170,0.22)' : 'none'};"
                      title="${esc(g.caption || g.alt)}"
                    >
                      <img src="${resolveProductImg(g.src)}" alt="${esc(g.alt)}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
                    </button>
                  `).join('')}
                  <span id="product-gallery-active-caption" style="font-size: 0.76rem; color: #526071; margin-left: 0.25rem;">
                    ${esc((p.gallery[0] && p.gallery[0].caption) || `${p.gallery.length} product photos`)}
                  </span>
                </div>
              ` : ''}

              <div class="product-gallery-toolbar" style="margin-top: 0.75rem; padding: 0.7rem 0.9rem; background: #F8F9FA; border: 1px solid #E2E5E9; border-radius: 5px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                <span style="font-family: var(--mono); font-size: 0.72rem; color: #35424E;">
                  ${esc(p.category)} &middot; B2B Industrial Supply
                </span>
                <a href="${whatsappProductUrl}" target="_blank" rel="noopener noreferrer" style="font-family: var(--mono); font-size: 0.72rem; color: #1769AA; font-weight: 600; text-decoration: none;">
                  Request TDS &amp; Samples &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      ${p.gallery && p.gallery.length > 1 ? `
        <!-- 2B. PRODUCT & PACKAGING PHOTO GALLERY -->
        <section class="dm-product-gallery-section" id="product-photos">
          <div class="shell">
            <div class="section-head" style="margin-bottom: 1.5rem; align-items: flex-end;">
              <div>
                <span class="eyebrow" style="color: #80664A;">PRODUCT &amp; PACKAGING GALLERY</span>
                <h2 style="font-family: var(--serif); font-size: 1.75rem; margin: 0.25rem 0 0; color: #252F3D;">
                  ${esc(p.name)} Mineral &amp; Branded Packaging Views
                </h2>
              </div>
              <span style="font: 600 0.75rem var(--mono); color: #526071;">
                Click any photo to view full size
              </span>
            </div>
            <div class="dm-product-gallery-grid">
              ${p.gallery.slice(1).map(g => `
                <button
                  type="button"
                  class="dm-product-gallery-card"
                  data-lightbox-src="${resolveProductImg(g.src)}"
                  data-lightbox-alt="${esc(g.alt)}"
                  data-lightbox-caption="${esc(g.caption || g.alt)}"
                  aria-label="View full size photo: ${esc(g.caption || g.alt)}"
                >
                  <span class="dm-product-gallery-media">
                    <img src="${resolveProductImg(g.src)}" alt="${esc(g.alt)}" loading="lazy" />
                  </span>
                  <span class="dm-product-gallery-caption">
                    <span>${esc(g.caption || g.alt)}</span>
                    <span class="dm-product-gallery-zoom">View</span>
                  </span>
                </button>
              `).join('')}
            </div>
          </div>
        </section>

        <div class="dm-gallery-lightbox" id="dm-gallery-lightbox" role="dialog" aria-modal="true" aria-label="${esc(p.name)} photo preview">
          <div class="dm-gallery-lightbox-inner">
            <div class="dm-gallery-lightbox-stage">
              <img id="dm-gallery-lightbox-img" src="" alt="" />
            </div>
            <div class="dm-gallery-lightbox-bar">
              <span class="dm-gallery-lightbox-caption" id="dm-gallery-lightbox-caption"></span>
              <button type="button" class="dm-gallery-lightbox-close" id="dm-gallery-lightbox-close">Close &times;</button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 3. KEY FEATURES & 4. INDUSTRIAL APPLICATIONS (BULLET POINTS) -->
      <section style="background: #F8F9FA; padding: 4rem 0; border-bottom: 1px solid #E2E5E9;">
        <div class="shell detail-grid">
          <div class="dm-detail-block">
            <span class="eyebrow" style="color: #80664A;">KEY FEATURES</span>
            <h2 style="font-family: var(--serif); font-size: 1.65rem; margin: 0.25rem 0 1rem; color: #252F3D;">
              Verified Material Highlights
            </h2>
            <ul class="dm-bullet-list">
              ${keyFeatureBullets.slice(0, 6).map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>

          <div class="dm-detail-block">
            <span class="eyebrow" style="color: #80664A;">INDUSTRIAL APPLICATIONS</span>
            <h2 style="font-family: var(--serif); font-size: 1.65rem; margin: 0.25rem 0 1rem; color: #252F3D;">
              Where ${esc(p.name)} Is Used
            </h2>
            <ul class="dm-bullet-list">
              ${verifiedApplications.map(app => `<li>${esc(app)}</li>`).join('')}
            </ul>

            ${verifiedSectors.length ? `
              <div style="margin-top: 1.35rem; padding-top: 1.15rem; border-top: 1px solid #E2E5E9;">
                <span style="display: block; font: 600 0.72rem var(--mono); text-transform: uppercase; letter-spacing: 0.08em; color: #526071; margin-bottom: 0.6rem;">
                  Related Industry Pages
                </span>
                <div class="pill-list">
                  ${verifiedSectors.map(ind => {
                    const cInd = (data.getCanonicalIndustryByName && data.getCanonicalIndustryByName(ind)) ||
                                 (data.getCanonicalIndustryBySlug && data.getCanonicalIndustryBySlug(ind));
                    const targetUrl = cInd ? `${industriesUrl}?industry=${encodeURIComponent(cInd.slug)}` : `${productsUrl}?industry=${encodeURIComponent(ind)}`;
                    return `
                      <a href="${targetUrl}" class="pill ${ind.toLowerCase() === industryCtx.toLowerCase() ? 'active' : ''}" title="Explore materials for ${esc(ind)}">${esc(ind)} &rarr;</a>
                    `;
                  }).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </section>

      <!-- 5. TECHNICAL SPECIFICATIONS TABLE & 6. PACKAGING INFORMATION -->
      <section class="featured" id="specs" style="padding: 4.25rem 0; background: #FFFFFF; border-bottom: 1px solid #E2E5E9;">
        <div class="shell detail-grid">
          <div class="spec-box" style="background: #FFFFFF; border: 1px solid #E2E5E9; border-radius: 6px; padding: 1.75rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.45rem;">
              <span class="eyebrow" style="margin-bottom: 0; color: #80664A;">TECHNICAL SPECIFICATIONS</span>
              <span style="font-family: var(--mono); font-size: 0.7rem; color: #35424E; font-weight: 600;">
                ISO 9001:2015 Certified Operations
              </span>
            </div>

            <h2 style="font-family: var(--serif); font-size: 1.75rem; margin: 0 0 1.25rem; color: #252F3D;">
              Approved Technical Parameters
            </h2>

            <div class="table-wrap">
              <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="border-bottom: 2px solid #252F3D;">
                    <th style="padding: 0.75rem 0.5rem; text-align: left; font-family: var(--mono); font-size: 0.74rem; text-transform: uppercase; color: #252F3D;">Parameter</th>
                    <th style="padding: 0.75rem 0.5rem; text-align: right; font-family: var(--mono); font-size: 0.74rem; text-transform: uppercase; color: #252F3D;">Value / Specification</th>
                  </tr>
                </thead>
                <tbody>
                  ${specRows.map(([k, v]) => {
                    const isReq = v === UNAVAILABLE_MSG;
                    return `
                      <tr style="border-bottom: 1px solid #E2E5E9;">
                        <td style="padding: 0.75rem 0.5rem; font-weight: 600; font-size: 0.86rem; color: #252F3D;">${k}</td>
                        <td style="padding: 0.75rem 0.5rem; text-align: right; font-size: 0.86rem; font-variant-numeric: tabular-nums;">
                          ${isReq
                            ? `<span class="spec-val-unverified">${v}</span>`
                            : `<strong style="color: #252F3D; font-family: var(--mono);">${esc(v)}</strong>`
                          }
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1.35rem;">
            <!-- 6. Packaging Information -->
            <div class="dm-detail-block">
              <span class="eyebrow" style="color: #80664A;">PACKAGING</span>
              <h3 style="font: 600 1.3rem var(--serif); margin: 0.25rem 0 0.85rem; color: #252F3D;">
                Verified Packaging Options
              </h3>
              <ul class="dm-bullet-list dm-bullet-list--compact">
                ${verifiedPackaging.map(pkg => `<li>${esc(pkg)}</li>`).join('')}
              </ul>
            </div>

            <!-- Technical Documentation -->
            <div class="dm-detail-block">
              <span class="eyebrow" style="color: #80664A;">DOCUMENTATION</span>
              <h3 style="font: 600 1.25rem var(--serif); margin: 0.25rem 0 0.85rem; color: #252F3D;">
                Quality Documentation
              </h3>
              <ul class="dm-bullet-list dm-bullet-list--compact">
                <li><strong>Technical Data Sheet (TDS):</strong> Shared on enquiry for target grades.</li>
                <li><strong>Certificate of Analysis (COA):</strong> Supplied with commercial consignments.</li>
                <li><strong>Material Safety Data Sheet (MSDS):</strong> Available on request.</li>
              </ul>
            </div>

            <!-- Controlled Technical Information Notice -->
            <div class="dm-detail-block" style="background: #F8F9FA;">
              <h3 style="font: 600 0.95rem var(--sans); margin: 0 0 0.6rem; color: #252F3D;">
                Controlled Technical Information
              </h3>
              <ul class="dm-bullet-list dm-bullet-list--compact">
                <li>Only verified technical parameters are published on product pages.</li>
                <li>Values marked as available on request are confirmed against current grade availability upon enquiry.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. RELATED MINERAL PRODUCTS -->
      <section style="padding: 4.25rem 0; background: #F8F9FA; border-bottom: 1px solid #E2E5E9;">
        <div class="shell">
          <div class="section-head" style="margin-bottom: 1.75rem;">
            <div>
              <span class="eyebrow" style="color: #80664A;">RELATED MATERIALS</span>
              <h2 class="section-title">Related Products</h2>
            </div>
            <a class="text-link" href="${productsUrl}">View all ${data.products.length} products &rarr;</a>
          </div>
          <div class="product-grid">
            ${relatedProds.map(rel => productCard(rel, industryCtx)).join('')}
          </div>
        </div>
      </section>

      <!-- 8. ENQUIRY FORM & COMMERCIAL DESK -->
      <section style="padding: 4.25rem 0; background: #FFFFFF;">
        <div class="shell detail-grid">
          <div>
            <span class="eyebrow" style="color: #80664A;">PRODUCT ENQUIRY</span>
            <h2 class="section-title">Enquire for ${esc(p.name)}</h2>
            <ul class="dm-bullet-list" style="margin: 0.75rem 0 1.5rem;">
              <li>Share required quantity, target grade, and delivery destination.</li>
              <li>Request Technical Data Sheets (TDS), Certificates of Analysis (COA), or evaluation samples.</li>
              <li>Inquiries are reviewed promptly during IST business hours (Mon–Sat).</li>
            </ul>

            <div class="dm-detail-block">
              <h3>Commercial Desk Details</h3>
              <ul class="dm-bullet-list dm-bullet-list--compact">
                <li><strong>CEO &amp; Proprietor:</strong> Mr. Neeraj Monga</li>
                <li><strong>Phone:</strong> <a href="tel:+919810516065" style="color: #1769AA; font-weight: 600;">+91 9810516065</a>, <a href="tel:+919810715129" style="color: #1769AA; font-weight: 600;">+91 9810715129</a></li>
                <li><strong>Email:</strong> <a href="mailto:info@deepaliminerals.in" style="color: #1769AA; font-weight: 600;">info@deepaliminerals.in</a></li>
                <li><strong>Office:</strong> C2/29C Lawrence Road, Keshav Puram, Delhi-110035</li>
                <li><strong>GSTIN:</strong> 07AIMPM0458Q1ZL</li>
              </ul>
            </div>
          </div>
          ${rfq(p, { industry: industryCtx, application: appCtx, route: routeCtx, requirementText: reqText })}
        </div>
      </section>
    `;

    bindRfq();

    // Interactive product hero thumbnails & full-size lightbox viewer
    const mainProductImg = document.getElementById('main-product-img');
    const activeCaptionEl = document.getElementById('product-gallery-active-caption');
    const thumbBtns = document.querySelectorAll('.product-thumb-btn');
    const lightbox = document.getElementById('dm-gallery-lightbox');
    const lightboxImg = document.getElementById('dm-gallery-lightbox-img');
    const lightboxCaption = document.getElementById('dm-gallery-lightbox-caption');
    const lightboxClose = document.getElementById('dm-gallery-lightbox-close');

    const openLightbox = (src, alt, caption) => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = src;
      lightboxImg.alt = alt || caption || p.name;
      if (lightboxCaption) lightboxCaption.textContent = caption || alt || p.name;
      lightbox.classList.add('is-open');
    };

    const closeLightbox = () => {
      if (!lightbox) return;
      lightbox.classList.remove('is-open');
    };

    thumbBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const src = btn.getAttribute('data-gallery-src');
        const alt = btn.getAttribute('data-gallery-alt') || p.name;
        const caption = btn.getAttribute('data-gallery-caption') || alt;
        if (mainProductImg && src) {
          mainProductImg.src = src;
          mainProductImg.alt = alt;
          mainProductImg.style.display = 'block';
        }
        if (activeCaptionEl) activeCaptionEl.textContent = caption;
        thumbBtns.forEach(b => {
          b.classList.remove('active');
          b.style.borderColor = '#E2E5E9';
          b.style.boxShadow = 'none';
        });
        btn.classList.add('active');
        btn.style.borderColor = '#1769AA';
        btn.style.boxShadow = '0 0 0 2px rgba(23,105,170,0.22)';
      });
    });

    if (mainProductImg && lightbox) {
      mainProductImg.style.cursor = 'zoom-in';
      mainProductImg.addEventListener('click', () => {
        const cap = (activeCaptionEl && activeCaptionEl.textContent) || mainProductImg.alt;
        openLightbox(mainProductImg.src, mainProductImg.alt, cap);
      });
    }

    document.querySelectorAll('.dm-product-gallery-card').forEach(card => {
      card.addEventListener('click', () => {
        const src = card.getAttribute('data-lightbox-src');
        const alt = card.getAttribute('data-lightbox-alt') || p.name;
        const caption = card.getAttribute('data-lightbox-caption') || alt;
        if (src) openLightbox(src, alt, caption);
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
          closeLightbox();
        }
      });
    }
  }

  /* =========================================================================
   * CATALOGUE FILTERING CONTROLLER
   * ========================================================================= */
  function initCatalogueFiltering() {
    let activeCategory = 'all';
    let activeIndustry = 'all';
    let currentSearch = '';

    const searchInput = document.querySelector('#catalogue-search');
    const categoryBar = document.querySelector('#category-filter-bar');
    const industryPills = document.querySelector('#industry-pills');
    const appQuickPills = document.querySelector('#application-quick-pills');
    const clearBtn = document.querySelector('#clear-filters-btn');
    const statusEl = document.querySelector('#filter-status');

    function applyFilters() {
      let filtered = data.products;

      // 1. Search filter (cross-product, category, application, industry)
      if (currentSearch && currentSearch.trim() !== '') {
        const q = currentSearch.toLowerCase().trim();
        filtered = filtered.filter(p => {
          return p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q) ||
            p.applications.some(app => app.toLowerCase().includes(q)) ||
            p.industries.some(ind => ind.toLowerCase().includes(q));
        });
      }

      // 2. Category filter
      if (activeCategory && activeCategory !== 'all') {
        const catNorm = activeCategory.toLowerCase().trim().replace(/-/g, ' ');
        if (catNorm === 'industrial minerals' || catNorm === 'industrial materials' || catNorm === 'all materials' || catNorm === 'all industrial minerals' || catNorm === 'all') {
          // All 22 products of Deepali Minerals are industrial minerals
          filtered = filtered.filter(p => p.isIndustrialMineral !== false);
        } else if (catNorm === 'mineral powders') {
          filtered = filtered.filter(p => p.category === 'Mineral Powders' || (p.categories && p.categories.includes('Mineral Powders')));
        } else if (catNorm === 'functional chemicals') {
          filtered = filtered.filter(p => p.category === 'Functional Chemicals' || (p.categories && p.categories.includes('Functional Chemicals')));
        } else if (catNorm === 'grains & aggregates' || catNorm === 'grains aggregates' || catNorm === 'granules & aggregates' || catNorm === 'grains') {
          filtered = filtered.filter(p => p.category === 'Industrial Materials' || (p.categories && p.categories.includes('Grains & Aggregates')) || ['silica', 'quartz-sand', 'marble-chips'].includes(p.slug));
        } else {
          filtered = filtered.filter(p => 
            (p.category && p.category.toLowerCase() === catNorm) || 
            (p.categories && p.categories.some(c => c.toLowerCase() === catNorm))
          );
        }
      }

      // 3. Industry filter
      if (activeIndustry && activeIndustry !== 'all') {
        const targetInd = activeIndustry.toLowerCase().trim();
        filtered = filtered.filter(p => p.industries.some(ind => ind.toLowerCase() === targetInd));
      }

      // Render results
      const grid = document.querySelector('#catalogue-grid');
      const countEl = document.querySelector('#product-count');
      if (countEl) countEl.textContent = filtered.length;

      if (grid) {
        grid.innerHTML = filtered.length
          ? filtered.map(p => productCard(p, activeIndustry !== 'all' ? activeIndustry : '')).join('')
          : `<div class="empty">No catalogue materials match your filter criteria. <button type="button" class="button alt" style="margin-top: 1rem;" id="reset-filter-btn">Reset Filters</button></div>`;

        const resetBtn = document.querySelector('#reset-filter-btn');
        if (resetBtn) resetBtn.addEventListener('click', resetAllFilters);
      }

      // Update status notice
      if (statusEl && statusEl.style) {
        if (activeIndustry !== 'all' || activeCategory !== 'all' || currentSearch) {
          statusEl.style.display = 'block';
          const parts = [];
          if (activeCategory !== 'all') parts.push(`Category: ${activeCategory}`);
          if (activeIndustry !== 'all') parts.push(`Manufacturing Sector: ${activeIndustry}`);
          if (currentSearch) parts.push(`Search: "${currentSearch}"`);

          let extraInfo = '';
          if (activeIndustry !== 'all' && data.getTaxonomyByName) {
            const tax = data.getTaxonomyByName(activeIndustry);
            if (tax) {
              const indIdx = parts.findIndex(p => p.startsWith('Manufacturing Sector:'));
              if (indIdx !== -1) {
                parts[indIdx] = `Sector: ${tax.name}`;
              }
              if (tax.safetyNotice) {
                extraInfo += `<div style="margin-top: .4rem; padding: .6rem .8rem; background: #FEF3C7; border: 1px solid #F59E0B; color: #92400E; font-size: .8rem; font-family: var(--sans); line-height: 1.4;"><strong>Technical Qualification Notice:</strong> ${esc(tax.safetyNotice)}</div>`;
              }
              if (tax.uncataloguedMaterials && tax.uncataloguedMaterials.length > 0) {
                extraInfo += `<div style="margin-top: .4rem; padding: .6rem .8rem; background: #EFF6FF; border: 1px solid #3B82F6; color: #1E40AF; font-size: .8rem; font-family: var(--sans); line-height: 1.4;"><strong>Additional Sourced Mineral:</strong> ${tax.uncataloguedMaterials.map(m => `<em>${esc(m.name)}</em>`).join(', ')} — Custom formulation grades available upon technical inquiry.</div>`;
              }
            }
          }

          statusEl.innerHTML = `<div style="font-weight: 600;">Active Filters: ${parts.join(' | ')}</div>${extraInfo}`;
        } else {
          statusEl.style.display = 'none';
          statusEl.innerHTML = '';
        }
      }
    }

    function resetAllFilters() {
      activeCategory = 'all';
      activeIndustry = 'all';
      currentSearch = '';
      if (searchInput) searchInput.value = '';
      if (categoryBar) {
        categoryBar.querySelectorAll('.filter-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.cat === 'all'));
      }
      if (industryPills) {
        industryPills.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
      }
      if (appQuickPills) {
        appQuickPills.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
      }
      applyFilters();
    }

    if (searchInput) {
      searchInput.addEventListener('input', e => {
        currentSearch = e.target.value;
        applyFilters();
      });
    }

    if (categoryBar) {
      categoryBar.addEventListener('click', e => {
        if (!e.target.classList.contains('filter-btn')) return;
        categoryBar.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        activeCategory = e.target.dataset.cat;
        applyFilters();
      });
    }

    if (industryPills) {
      industryPills.addEventListener('click', e => {
        const clickedBtn = e.target.closest('.pill');
        if (!clickedBtn) return;
        const targetInd = clickedBtn.dataset.industry;
        if (activeIndustry === targetInd) {
          activeIndustry = 'all';
          clickedBtn.classList.remove('active');
        } else {
          industryPills.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
          clickedBtn.classList.add('active');
          activeIndustry = targetInd;
        }
        applyFilters();
      });
    }

    if (appQuickPills) {
      appQuickPills.addEventListener('click', e => {
        const clickedBtn = e.target.closest('.pill');
        if (!clickedBtn) return;
        const appTerm = clickedBtn.dataset.app;
        if (currentSearch === appTerm) {
          currentSearch = '';
          clickedBtn.classList.remove('active');
          if (searchInput) searchInput.value = '';
        } else {
          appQuickPills.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
          clickedBtn.classList.add('active');
          currentSearch = appTerm;
          if (searchInput) searchInput.value = appTerm;
        }
        applyFilters();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', resetAllFilters);
    }

    // Check URL parameters on mount
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const appParam = params.get('app');
    const catParam = params.get('category');
    const indParam = params.get('industry');

    const effectiveSearch = searchParam || appParam;
    if (effectiveSearch) {
      currentSearch = effectiveSearch;
      if (searchInput) searchInput.value = effectiveSearch;
      if (appQuickPills) {
        appQuickPills.querySelectorAll('.pill').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.app && btn.dataset.app.toLowerCase() === effectiveSearch.toLowerCase());
        });
      }
    }
    if (catParam) {
      activeCategory = catParam;
      if (categoryBar) {
        categoryBar.querySelectorAll('.filter-btn').forEach(btn => {
          const btnCat = btn.dataset.cat.toLowerCase().replace(/-/g, ' ');
          const cleanParam = catParam.toLowerCase().replace(/-/g, ' ');
          const isMatch = btnCat === cleanParam || 
            ((btnCat === 'industrial minerals' || btnCat === 'industrial materials') && (cleanParam === 'industrial minerals' || cleanParam === 'industrial materials'));
          btn.classList.toggle('active', isMatch);
        });
      }
    }
    if (indParam) {
      activeIndustry = indParam;
      if (industryPills) {
        industryPills.querySelectorAll('.pill').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.industry.toLowerCase() === indParam.toLowerCase());
        });
      }
    }

    if (searchParam || appParam || catParam || indParam) {
      applyFilters();
    }
  }

  /* =========================================================================
   * EVENT BINDINGS (SEARCH & RFQ)
   * ========================================================================= */
  function bindSearch() {
    const form = document.querySelector('[data-search]');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const input = form.querySelector('input');
        const val = input ? input.value : '';
        location.href = `${productsUrl}?search=${encodeURIComponent(val)}`;
      });
    }
  }

  function bindRfq() {
    document.querySelectorAll('[data-rfq]').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        
        const fd = new FormData(form);
        const productVal = fd.get('product') || 'Mineral Product';
        const appVal = fd.get('application') || '';
        const quantityVal = fd.get('quantity') || 'Commercial Volume';
        const packagingVal = fd.get('packaging') || 'Standard';
        const destVal = fd.get('destination') || 'Pending';
        const companyVal = fd.get('company') || '';
        const contactVal = fd.get('contactPerson') || '';
        const phoneVal = fd.get('phone') || '';
        const emailVal = fd.get('email') || '';
        const notesVal = fd.get('notes') || '';

        const refId = `DM-RFQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

        const whatsappText = `*Deepali Minerals Quotation Submission*
Ref: ${refId}
Product: ${productVal}
Application: ${appVal || 'Industrial Compounding'}
Quantity: ${quantityVal} (${packagingVal})
Destination: ${destVal}
Buyer: ${contactVal} (${companyVal})
Phone: ${phoneVal}
Email: ${emailVal}
${notesVal ? 'Notes: ' + notesVal : ''}`;

        const fb = form.querySelector('.rfq-feedback');
        if (fb) {
          fb.style.display = 'block';
          fb.innerHTML = `
            <div class="rfq-success-card">
              <h3>Quotation Logged Successfully</h3>
              <p>Reference: <strong style="font-family: var(--mono); color: var(--aqua);">${refId}</strong></p>
              <p>Your requirement for <strong>${esc(productVal)}</strong> has been recorded for review by our Lawrence Road commercial desk. We will respond with pricing and dispatch terms shortly.</p>
              <div>
                <a href="https://wa.me/${(data.company.whatsappNumber || '919810516065').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappText)}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn">
                  Send directly via WhatsApp →
                </a>
              </div>
            </div>
          `;
          const submitBtn = form.querySelector('button[type="submit"]');
          if (submitBtn) submitBtn.style.display = 'none';
        }
      });
    });
  }

  /* =========================================================================
   * ABOUT PAGE CONTROLLER
   * ========================================================================= */
  function about() {
    // Initialize sticky subnav scrollspy
    const subnavLinks = document.querySelectorAll('.about-subnav-link');
    const sections = Array.from(subnavLinks).map(link => {
      const targetId = link.getAttribute('href').replace('#', '');
      return document.getElementById(targetId);
    }).filter(Boolean);

    if (subnavLinks.length && sections.length) {
      const onScroll = () => {
        const scrollPos = window.scrollY + 140;
        let currentSectionId = '';
        sections.forEach(sec => {
          if (sec.offsetTop <= scrollPos) {
            currentSectionId = sec.id;
          }
        });
        subnavLinks.forEach(link => {
          const href = link.getAttribute('href').replace('#', '');
          link.classList.toggle('is-active', href === currentSectionId);
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    bindRfq();
    bindSearch();
    initBackToTop();
  }

  // App initialization
  header();
  footer();
  if (page === 'home') home();
  if (page === 'industries') industries();
  if (page === 'products') products();
  if (page === 'product') product();
  if (page === 'about') about();
  initVisualRestoreControls();
  initGlobalDMInteractiveLogos();

})();
