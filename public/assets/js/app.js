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

  // Enforce Clean Bright White Theme System Tokens
  (function enforceWhiteThemeTokens() {
    if (typeof document === 'undefined') return;
    const rootEl = document.documentElement;
    if (rootEl) {
      rootEl.style.setProperty('--paper', '#FFFFFF');
      rootEl.style.setProperty('--surface', '#FFFFFF');
      rootEl.style.setProperty('--fog', '#F8F9FA');
      rootEl.style.setProperty('--line', '#E5E7EB');
      rootEl.style.setProperty('--ink', '#25241F');
      rootEl.style.setProperty('--slate', '#6F6B61');
      rootEl.style.backgroundColor = '#FFFFFF';
    }
    const applyBody = () => {
      if (document.body && document.body.style) {
        document.body.style.backgroundColor = '#FFFFFF';
        document.body.style.color = '#25241F';
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
            <span style="color: rgba(255,255,255,0.2);">|</span>
            <a href="tel:+919810715129" class="topbar-item" title="Call Secondary Helpline">
              <span>9810715129</span>
            </a>
            <span style="color: rgba(255,255,255,0.2);">|</span>
            <a href="mailto:info@deepaliminerals.in" class="topbar-item" title="Email Sales Desk">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>info@deepaliminerals.in</span>
            </a>
          </div>

          <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
            <div class="topbar-badge-iso">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>ISO 9001:2015 &bull; ISO 14001:2015</span>
            </div>
            <span class="topbar-timing">Mon &ndash; Sat: 9:00 AM &ndash; 7:30 PM IST</span>
            <a href="${getWhatsAppUrl()}" target="_blank" rel="noopener noreferrer" class="topbar-whatsapp-btn">
              ${whatsappIconSvg(13, 13)}
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Main Corporate Header -->
      <header class="site-header">
        <div class="shell header-inner">
          <a class="brand dm-interactive-logo" href="${root}/" aria-label="Deepali Minerals home" data-dm-logo="true">
            <img src="${root}/assets/images/brand/logo.png" alt="Deepali Minerals" class="brand-logo" width="200" height="100" referrerpolicy="no-referrer" />
          </a>

          <!-- Primary Desktop Nav with Mega Menu -->
          <nav class="nav-links" aria-label="Primary navigation">
            <a href="${root}/" class="${page === 'home' ? 'active' : ''}">Home</a>
            <a href="${root}/about.html" class="${page === 'about' ? 'active' : ''}">About Us</a>

            <!-- Products Mega Menu Item -->
            <div class="nav-has-megamenu" id="nav-products-megamenu">
              <a href="${productsUrl}" class="nav-link-with-icon ${page === 'products' || page === 'product' ? 'active' : ''}" aria-expanded="false" aria-haspopup="true">
                <span>Products</span>
                <svg class="nav-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </a>

              <!-- Mega Menu Dropdown -->
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
                              <span class="tag">${p.slug === 'calcium-carbonate' ? '98% CaCO3' : (p.slug === 'talc' ? '300-1250 M' : (p.slug === 'dolomite' ? 'Micronized' : 'Industrial'))}</span>
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
                              <span class="tag">${p.slug === 'zinc-oxide' ? '99.5% White' : (p.slug === 'zinc-stearates' ? 'Lubricant' : 'Additive')}</span>
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
                              <span class="tag">${p.slug === 'quartz-sand' ? 'Silica Sand' : (p.slug === 'marble-chips' ? 'White Grits' : 'Industrial')}</span>
                            </a>
                          </li>
                        `).join('')}
                      </ul>
                    </div>

                    <!-- Column 4: Sourcing Spotlight Card -->
                    <div>
                      <div class="mega-menu-spotlight-card">
                        <div>
                          <span class="mega-spotlight-badge">VERIFIED INDUSTRIAL SUPPLY</span>
                          <h4 class="mega-spotlight-title">22 Master Minerals &amp; Chemicals</h4>
                          <p class="mega-spotlight-desc">
                            Direct processing and sourcing partnerships across India. Tested to strict mesh tolerances with batch COA and TDS documentation.
                          </p>
                        </div>
                        <div>
                          <a href="${productsUrl}" class="mega-spotlight-cta">Explore Full Catalogue &rarr;</a>
                          <div style="margin-top: 0.75rem; text-align: center;">
                            <a href="${root}/#rfq" style="font-size: 0.74rem; font-family: var(--mono); color: #D5A43A; text-decoration: underline;">Request Bulk Quotation &rarr;</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Industries Dropdown Menu -->
            <div class="nav-has-dropdown" id="nav-industries-dropdown">
              <a href="${industriesUrl}" class="nav-link-with-icon ${page === 'industries' ? 'active' : ''}" aria-expanded="false" aria-haspopup="true">
                <span>Industries</span>
                <svg class="nav-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </a>
              <div class="dropdown-menu">
                <div class="dropdown-grid">
                  <a href="${industriesUrl}?industry=paints-coatings" class="dropdown-item">Paints &amp; Coatings</a>
                  <a href="${industriesUrl}?industry=plastics-polymers" class="dropdown-item">Plastics &amp; Masterbatch</a>
                  <a href="${industriesUrl}?industry=rubber-footwear" class="dropdown-item">Rubber &amp; Tyres</a>
                  <a href="${industriesUrl}?industry=rigid-pvc" class="dropdown-item">Rigid &amp; Flexible PVC</a>
                  <a href="${industriesUrl}?industry=ceramics" class="dropdown-item">Ceramics &amp; Sanitaryware</a>
                  <a href="${industriesUrl}?industry=paper-mills" class="dropdown-item">Paper &amp; Pulp Mills</a>
                  <a href="${industriesUrl}?industry=wall-putty-nc-putty" class="dropdown-item">Wall Putty &amp; Mortars</a>
                  <a href="${industriesUrl}?industry=foundry-industrial" class="dropdown-item">Foundry &amp; Metallurgy</a>
                  <a href="${industriesUrl}?industry=cosmetics-pharma" class="dropdown-item">Cosmetics &amp; Pharma</a>
                  <a href="${industriesUrl}?industry=agrochemicals-fertilizers" class="dropdown-item">Agrochemicals</a>
                  <a href="${industriesUrl}" class="dropdown-item-all" style="grid-column: 1 / -1; font-weight: 700; color: #174A70; border-top: 1px solid #E5E7EB; padding-top: 0.5rem; margin-top: 0.25rem;">
                    View All 18 Manufacturing Sectors &rarr;
                  </a>
                </div>
              </div>
            </div>

            <a href="${root}/#quality">Quality</a>
            <a href="${root}/#facilities">Facilities</a>
            <a href="${root}/#resources">Resources</a>
            <a href="${root}/#contact">Contact</a>
          </nav>

          <div class="header-actions">
            <a class="header-whatsapp" href="${getWhatsAppUrl()}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Sales Desk">
              ${whatsappIconSvg(15, 15)}
              <span>WhatsApp Sales Desk</span>
            </a>
            <a class="button header-cta" href="${root}/#rfq">Quotation</a>
            <button class="menu-toggle" aria-expanded="false" aria-controls="mobile-nav">
              <span style="font-size: 1.1rem; line-height: 1; margin-right: 0.25rem;" aria-hidden="true">☰</span>
              <span>Menu</span>
            </button>
          </div>
        </div>

        <!-- Mobile Drawer Navigation with Accordion Submenu -->
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
            
            <h4>Grains &amp; Aggregates</h4>
            ${grains.map(p => `<a href="${productUrl(p)}">${esc(p.name)}</a>`).join('')}
            
            <a href="${productsUrl}" style="font-weight: 700; color: #1769AA; margin-top: 0.5rem; display: block;">View Full 22-Product Catalogue &rarr;</a>
          </div>

          <!-- Industries Accordion -->
          <button type="button" class="mobile-nav-toggle-btn" id="mobile-industries-toggle" aria-expanded="false">
            <span>Industries &amp; Applications (18 Sectors)</span>
            <span class="mobile-toggle-arrow" id="mobile-industries-arrow">&darr;</span>
          </button>
          
          <div class="mobile-nav-submenu" id="mobile-industries-submenu">
            <a href="${industriesUrl}?industry=paints-coatings">Paints &amp; Coatings</a>
            <a href="${industriesUrl}?industry=plastics-polymers">Plastics &amp; Masterbatch</a>
            <a href="${industriesUrl}?industry=rubber-footwear">Rubber &amp; Tyres</a>
            <a href="${industriesUrl}?industry=construction-building-materials">Construction &amp; Building</a>
            <a href="${industriesUrl}?industry=ceramics">Ceramics &amp; Sanitaryware</a>
            <a href="${industriesUrl}?industry=paper-stationery">Paper &amp; Pulp Mills</a>
            <a href="${industriesUrl}?industry=frp-composites">FRP &amp; Composites</a>
            <a href="${industriesUrl}?industry=foundry-industrial">Foundry &amp; Metallurgy</a>
            <a href="${industriesUrl}?industry=agriculture-allied">Agriculture &amp; Allied</a>
            <a href="${industriesUrl}?industry=detergents-household">Detergents &amp; Household</a>
            <a href="${industriesUrl}" style="font-weight: 700; color: #1769AA; margin-top: 0.5rem; display: block;">View All 18 Manufacturing Sectors &rarr;</a>
          </div>

          <a href="${root}/#quality">Quality Assurance</a>
          <a href="${root}/#facilities">Facilities &amp; Infrastructure</a>
          <a href="${root}/#resources">Technical Resources</a>
          <a href="${root}/#contact">Contact Us</a>
          
          <a class="mobile-whatsapp" href="${getWhatsAppUrl()}" target="_blank" rel="noopener noreferrer">
            ${whatsappIconSvg(18, 18)}
            <span>WhatsApp Sales Desk</span>
          </a>
          <a class="button" href="${root}/#rfq" style="margin-top: 0.5rem; text-align: center;">Get Commercial Quotation</a>
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
      <a class="contact-float" href="${root}/#rfq" aria-label="Open quotation">Quotation</a>
      <button type="button" class="back-to-top-btn" aria-label="Back to top" title="Back to top">
        <svg class="back-to-top-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </button>
      <a class="dm-floating-whatsapp" href="${floatingWhatsAppUrl}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Sales Desk">
        ${whatsappIconSvg(20, 20)}
        <span class="floating-label">WhatsApp Sales Desk</span>
      </a>
      <footer class="footer" id="contact">
        <div class="shell footer-grid">
          <!-- COLUMN 1: DEEPALI MINERALS -->
          <div class="footer-col footer-col-brand">
            <a class="brand dm-interactive-logo" href="${root}/" aria-label="Deepali Minerals home" data-dm-logo="true">
              <img src="${root}/assets/images/brand/logo.png" alt="Deepali Minerals" class="brand-logo-footer" width="200" height="100" referrerpolicy="no-referrer" />
            </a>
            <p class="footer-tagline">${company.tagline || 'Industrial materials, clearly connected.'}</p>
            <p class="footer-desc">
              Reliable processor, manufacturer, and bulk supplier of non-metallic industrial minerals and functional chemical extenders since 2004. B2B material supply for industrial manufacturing across India and worldwide.
            </p>
            <div class="footer-meta-box">
              <p><strong>CEO:</strong> ${company.ceo || 'Mr. Neeraj Monga (CEO)'}</p>
              <p><strong>GST:</strong> ${company.gstNumber || '07AIMPM0458Q1ZL'}</p>
              <p><strong>Business:</strong> Industrial Minerals • B2B Supply</p>
            </div>
          </div>

          <!-- COLUMN 2: MATERIALS -->
          <div class="footer-col">
            <h3>Materials</h3>
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
              <a href="${root}/product.html?product=titanium-dioxide">Titanium Di Oxide</a>
              <a href="${root}/product.html?product=quartz-sand">Quartz Sand</a>
              <a href="${root}/product.html?product=marble-chips">Marble Chips</a>
              <a href="${root}/product.html?product=barytes">Barytes</a>
              <a href="${root}/product.html?product=french-chalk-powder">French Chalk Powder</a>
              <a href="${root}/product.html?product=starch">Starch</a>
              <a href="${productsUrl}" class="footer-accent-link">View All 22 Materials →</a>
            </div>
          </div>

          <!-- COLUMN 3: INDUSTRIES & APPLICATIONS -->
          <div class="footer-col">
            <h3>Industries &amp; Applications</h3>
            <div class="footer-links-list">
              <a href="${industriesUrl}?industry=paints-coatings">Paints</a>
              <a href="${industriesUrl}?industry=plastics-polymers">Plastics</a>
              <a href="${industriesUrl}?industry=rubber-footwear">Rubber</a>
              <a href="${productsUrl}?industry=Master%20Batch">Masterbatch</a>
              <a href="${productsUrl}?industry=PVC">PVC</a>
              <a href="${productsUrl}?industry=Paper">Paper</a>
              <a href="${industriesUrl}?industry=ceramics">Ceramics</a>
              <a href="${productsUrl}?industry=Cosmetics">Cosmetics</a>
              <a href="${productsUrl}?industry=Pharmaceutical">Pharmaceutical</a>
              <a href="${productsUrl}?industry=Soap">Soap &amp; Detergent</a>
              <a href="${productsUrl}?industry=Footwear">Footwear</a>
              <a href="${productsUrl}?industry=Cables">Cables</a>
              <a href="${industriesUrl}?industry=construction-building-materials">Construction</a>
              <a href="${productsUrl}?industry=FRP">FRP</a>
              <a href="${industriesUrl}" class="footer-accent-link">Explore Industries →</a>
            </div>
          </div>

          <!-- COLUMN 4: BUY / TECHNICAL -->
          <div class="footer-col">
            <h3>Buy / Technical</h3>
            <div class="footer-links-list">
              <a href="${root}/#materials">Find Your Material</a>
              <a href="${root}/#rfq">Quotation</a>
              <a href="${root}/#resources">Technical Resources</a>
              <a href="${productsUrl}">Product Catalogue</a>
              <a href="${root}/about.html">About Deepali Minerals</a>
              <a href="${root}/#contact">Commercial Desk</a>
              <a href="${whatsappGeneralUrl}" target="_blank" rel="noopener noreferrer" class="footer-whatsapp-link">
                ${whatsappIconSvg(14, 14)} WhatsApp Sales Desk
              </a>
            </div>
          </div>

          <!-- COLUMN 5: CONTACT -->
          <div class="footer-col footer-col-contact">
            <h3>Contact</h3>
            <div class="footer-contact-details">
              <p>
                <strong class="footer-lbl">Email:</strong><br />
                <a href="mailto:${company.emailSales || 'info@deepaliminerals.in'}">${company.emailSales || 'info@deepaliminerals.in'}</a>
              </p>
              <p style="margin-top: .6rem;">
                <strong class="footer-lbl">Phone:</strong><br />
                <a href="tel:+919810516065">9810516065</a>, <a href="tel:+919810715129">9810715129</a>
              </p>
              <p style="margin-top: .6rem;">
                <strong class="footer-lbl">Office:</strong><br />
                <span>${company.headquarters || 'C2/29C Lawrence Road, Keshav Puram, Delhi-110035'}</span>
              </p>
              <p style="margin-top: .6rem;">
                <strong class="footer-lbl">Hours:</strong><br />
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
            <span>© ${new Date().getFullYear()} Deepali Minerals. All rights reserved.</span>
            <span class="footer-sep">•</span>
            <span>Industrial B2B Material Supply &amp; Technical Discovery</span>
          </div>
          <div class="footer-bottom-right">
            <a href="${root}/sitemap.xml" target="_blank" rel="noopener">Sitemap (XML)</a>
            <span class="footer-sep">•</span>
            <a href="${root}/#rfq">Quotation</a>
            <span class="footer-sep">•</span>
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
    const altText = esc(p.alt || `${p.name} - Deepali Minerals Industrial Supply`);

    const technicalBadge = (p.specifications && p.specifications.mesh) 
      ? p.specifications.mesh 
      : (isStarch ? 'Plant-Derived' : (p.category === 'Functional Chemicals' ? 'Compounding Grade' : 'Industrial Spec'));

    return `
      <article class="product-card" data-slug="${esc(p.slug)}">
        <div class="product-card-visual">
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
              <span class="fallback-sub">${isStarch ? 'Plant-Derived Industrial Grade' : 'Laboratory Certified Specimen'}</span>
            </div>
          </div>
          <span class="product-card-badge">${esc(technicalBadge)}</span>
        </div>
        <span class="eyebrow">${esc(p.category)}</span>
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.shortDescription)}</p>
        
        ${p.applications && p.applications.length ? `
          <div style="margin-top: .5rem; font-size: .78rem; color: var(--slate); line-height: 1.4;">
            <strong style="color: var(--ink); font-family: var(--mono); font-size: .7rem; text-transform: uppercase;">Key Uses:</strong>
            <span style="display: block; margin-top: .2rem;">${esc(p.applications.slice(0, 2).join(' • '))}</span>
          </div>
        ` : ''}

        <div class="product-card-actions">
          <a class="product-card-link" href="${productUrl(p, industryCtx, appCtx, routeCtx)}">
            Explore Product <span aria-hidden="true">&rarr;</span>
          </a>
          <a class="product-card-btn-quickbuy" href="${getWhatsAppUrl(`Hello Deepali Minerals, I would like to quickly buy / enquire about ${p.name}. Please share pricing and dispatch availability.`)}" target="_blank" rel="noopener noreferrer" aria-label="Quick Buy ${esc(p.name)} via WhatsApp Sales Desk">
            ${whatsappIconSvg(13, 13)}
            <span>Quick Buy</span>
          </a>
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
                <option value="1 MT Jumbo Bags">1000 Kg (1 MT) Jumbo Bags</option>
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
   * HOMEPAGE
   * ========================================================================= */
  /* =========================================================================
   * HOMEPAGE (REDESIGN EXPERIMENT - MODERN INDUSTRIAL B2B STANDARD)
   * ========================================================================= */
  function home() {
    updateSeoMeta({
      title: 'Deepali Minerals | Industrial Minerals & Pulverized Chemicals Supplier',
      description: 'Established in 2004, Deepali Minerals is an ISO 9001:2015 & ISO 14001:2015 certified B2B supplier of industrial minerals, pulverized powders, and functional chemicals in Delhi.',
      canonical: 'https://www.deepaliminerals.com/',
      ogType: 'website',
      ogImage: 'https://www.deepaliminerals.com/assets/images/brand/logo.png'
    });

    const allProducts = data.products || [];
    const industries = data.industries || [];

    // Flagship materials for Section 3
    const flagshipSlugs = ['talc', 'calcium-carbonate', 'china-clay', 'dolomite', 'zinc-stearates', 'barytes'];
    const flagshipProducts = flagshipSlugs.map(slug => data.getProductBySlug(slug)).filter(Boolean);

    document.querySelector('#main').innerHTML = `
      <!-- ====================================================================
           1. HERO BANNER — FULL BACKGROUND VIDEO SHOWROOM EXPERIENCE
           ==================================================================== -->
      <section class="exp-hero" id="hero">
        <!-- Full-Bleed Background Video -->
        <video
          class="hero-video exp-hero-bg-video"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
          aria-label="Deepali Minerals industrial processing facility video background"
        >
          <source src="${root}/hero%20video%20DM%20watermark%20(1).mp4" type="video/mp4" />
        </video>

        <!-- High-Contrast Blue Gradient Overlay -->
        <div class="exp-hero-bg-overlay"></div>

        <div class="shell" style="position: relative; z-index: 2;">
          <div class="exp-hero-inner">
            <div>
              <div class="exp-hero-estd-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>ESTD. 2004 &bull; ISO 9001:2015 &amp; ISO 14001:2015 ACCREDITED</span>
              </div>

              <h1 class="exp-hero-title">
                Industrial Minerals. Reliable Supply.<br>
                <span style="color: #F8DF8A;">Business Partnerships.</span>
              </h1>

              <p class="exp-hero-lead">
                Your direct sourcing partner for processed non-metallic industrial minerals, pulverized functional extenders, and specialized chemical additives serving diverse manufacturing corridors across India. Operating with direct quarry linkages, dual ISO certified quality systems, and nationwide logistics dispatch.
              </p>

              <div class="exp-hero-btn-group">
                <a href="#portfolio" class="button" style="padding: 0.85rem 1.75rem; font-size: 0.86rem; font-weight: 700; background: #D5A43A; color: #0C2B50; border-color: #D5A43A;">Explore Our Products &rarr;</a>
                <a href="#rfq" class="button" style="padding: 0.85rem 1.75rem; font-size: 0.86rem; font-weight: 700; background: #1769AA; color: #FFFFFF; border-color: #2488C9;">Enquire Now / Get Quotation</a>
                <a href="${getWhatsAppUrl('Hello Deepali Minerals, I would like to discuss my industrial mineral requirement.')}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn" style="padding: 0.75rem 1.25rem; font-size: 0.82rem; display: inline-flex; align-items: center; gap: 0.45rem;">
                  ${whatsappIconSvg(16, 16)}
                  <span>WhatsApp Sales Desk</span>
                </a>
              </div>

              <!-- Audio & Fullscreen Quick Status Bar -->
              <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-top: 0.75rem;">
                <button
                  type="button"
                  class="button hero-sound-btn"
                  data-hero-audio-toggle="true"
                  aria-label="Toggle facility video sound"
                  aria-pressed="false"
                  title="Click to toggle facility sound"
                  style="padding: 0.45rem 0.95rem; font-size: 0.74rem; min-height: 36px; background: rgba(12, 43, 80, 0.92); border-color: rgba(255,255,255,0.3); color: #FFFFFF; display: inline-flex; align-items: center; gap: 0.45rem; border-radius: 4px;"
                >
                  <span class="hero-audio-icon" aria-hidden="true">
                    <svg class="sound-icon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <line x1="23" y1="9" x2="17" y2="15"></line>
                      <line x1="17" y1="9" x2="23" y2="15"></line>
                    </svg>
                  </span>
                  <span class="hero-audio-label">Enable Video Sound</span>
                </button>

                <button
                  type="button"
                  class="button hero-fullscreen-cta-btn"
                  data-hero-fullscreen-trigger="true"
                  style="padding: 0.45rem 0.95rem; font-size: 0.74rem; min-height: 36px; display: inline-flex; align-items: center; gap: 0.45rem; background: rgba(10, 30, 52, 0.88); color: #FFFFFF; border: 1.5px solid #D5A43A; border-radius: 4px;"
                  title="Watch facility video in Full Screen with sound"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                  <span>Full Screen Theater</span>
                </button>

                <span style="font-size: 0.74rem; font-family: var(--mono); color: #D5E7F6;">Live processing facility video playing in background</span>
              </div>
            </div>

            <!-- Frosted Glass Facility & Technical Credibility Card -->
            <div class="exp-hero-facility-glass">
              <div class="glass-live-header">
                <div class="live-pulse-badge">
                  <span class="live-dot"></span>
                  <span>LIVE FACILITY DISPATCH</span>
                </div>
                <span class="iso-audit-tag">ISO 9001 &bull; 14001</span>
              </div>

              <h3 class="glass-facility-title">Central Processing, Pulverization &amp; Buffer Storage</h3>
              <p class="glass-facility-address">Corporate Office: Lawrence Road Industrial Area, Rampura / Keshav Puram, New Delhi</p>

              <div class="glass-spec-metrics">
                <div class="glass-metric-box">
                  <span class="glass-metric-val">100–1250</span>
                  <span class="glass-metric-lbl">Mesh Precision</span>
                </div>
                <div class="glass-metric-box">
                  <span class="glass-metric-val">100%</span>
                  <span class="glass-metric-lbl">COA Verified</span>
                </div>
                <div class="glass-metric-box">
                  <span class="glass-metric-val">Pan-India</span>
                  <span class="glass-metric-lbl">Fleet Logistics</span>
                </div>
              </div>

              <div class="glass-facility-footer">
                <span class="glass-footer-note">&bull; Direct Quarry Linkages: Rajasthan &amp; Gujarat</span>
                <button
                  type="button"
                  data-hero-fullscreen-trigger="true"
                  class="button alt"
                  style="padding: 0.35rem 0.75rem; font-size: 0.72rem; min-height: 32px; background: rgba(255,255,255,0.15); color: #FFFFFF; border-color: rgba(255,255,255,0.4);"
                  title="Expand to Full Screen Theater"
                >
                  ⛶ Expand Theater
                </button>
              </div>
            </div>
          </div>

          <!-- 4 Institutional Benchmark Counter Cards -->
          <div class="exp-hero-stats-grid">
            <div class="exp-hero-stat-card" style="border-top: 3px solid #F8DF8A;">
              <div class="exp-stat-num">2004</div>
              <div class="exp-stat-label">Year Established</div>
              <p class="exp-stat-desc">Over two decades of continuous B2B mineral supply across India.</p>
            </div>
            <div class="exp-hero-stat-card" style="border-top: 3px solid #2488C9;">
              <div class="exp-stat-num">22 Materials</div>
              <div class="exp-stat-label">Master Catalogue</div>
              <p class="exp-stat-desc">Standard pulverized powders, functional additives &amp; grains.</p>
            </div>
            <div class="exp-hero-stat-card" style="border-top: 3px solid #D5A43A;">
              <div class="exp-stat-num">38+ Sectors</div>
              <div class="exp-stat-label">Industrial Applications</div>
              <p class="exp-stat-desc">Serving paints, plastics, PVC, rubber, ceramics, paper &amp; foundry.</p>
            </div>
            <div class="exp-hero-stat-card" style="border-top: 3px solid #77947A;">
              <div class="exp-stat-num">ISO Certified</div>
              <div class="exp-stat-label">QMS &amp; EMS Audited</div>
              <p class="exp-stat-desc">ISO 9001:2015 Quality &amp; ISO 14001:2015 Environmental standards.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           2. ABOUT DEEPALI MINERALS — CORPORATE SHOWROOM INTRODUCTION
           ==================================================================== -->
      <section class="showroom-section" id="about-company" style="padding: 5rem 0; background: #EAF3FB; border-bottom: 1px solid var(--line);">
        <div class="shell">
          <div class="institutional-split">
            <div class="institutional-visual-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column; background: #FFFFFF; border: 1px solid #D5E7F6; border-radius: 8px; box-shadow: 0 8px 24px rgba(18, 62, 112, 0.08);">
              <div style="height: 240px; width: 100%; overflow: hidden; position: relative; background: #0B1C30;">
                <img src="${root}/assets/images/industries/corporate-intro-banner.webp" alt="Deepali Minerals processing facility and quarry supply network" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
                <div style="position: absolute; bottom: 0.75rem; left: 0.75rem; background: rgba(11,28,48,0.85); backdrop-filter: blur(4px); padding: 0.35rem 0.75rem; border-radius: 4px; border: 1px solid rgba(213,164,58,0.4); color: #FFFFFF; font-family: var(--mono); font-size: 0.72rem; font-weight: 700;">
                  MINING CORRIDORS &bull; RAJASTHAN &amp; GUJARAT
                </div>
              </div>
              <div style="padding: 1.6rem;">
                <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.25rem;">
                  <img src="${root}/assets/images/Neeraj%20Monga%20Pic.jpeg" alt="Mr. Neeraj Monga, CEO &amp; Proprietor" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 2px solid #D5A43A; flex-shrink: 0;" />
                  <div>
                    <h4 style="margin: 0; font-size: 1.05rem; color: #123E70;">Mr. Neeraj Monga</h4>
                    <span style="font-family: var(--mono); font-size: 0.72rem; color: #1769AA; font-weight: 700;">CEO &amp; PROPRIETOR &bull; ESTD. 2004</span>
                  </div>
                </div>
                <p style="font-size: 0.86rem; color: #35424E; line-height: 1.55; margin: 0 0 1.25rem;">
                  Operating from our Corporate Office at <strong>Lawrence Road, Rampura / Keshav Puram, New Delhi</strong>, Deepali Minerals coordinates raw material extraction, pulverization, testing, and multi-state transport dispatches with over two decades of technical dedication.
                </p>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                  <div style="font-family: var(--mono); font-size: 0.7rem; color: #123E70; background: #D5E7F6; padding: 0.3rem 0.6rem; border-radius: 4px; font-weight: 700;">
                    ISO 9001:2015 QMS
                  </div>
                  <div style="font-family: var(--mono); font-size: 0.7rem; color: #1769AA; background: #EAF3FB; padding: 0.3rem 0.6rem; border-radius: 4px; font-weight: 700; border: 1px solid #D5E7F6;">
                    ISO 14001:2015 EMS
                  </div>
                  <div style="font-family: var(--mono); font-size: 0.7rem; color: #80664A; background: #E9DDC9; padding: 0.3rem 0.6rem; border-radius: 4px; font-weight: 700;">
                    GST: 07AIMPM0458Q1ZL
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span class="eyebrow" style="color: #1769AA;">OVER TWO DECADES OF DEPENDABLE SUPPLY</span>
              <h2 class="section-title" style="margin-bottom: 1.25rem; color: #123E70;">
                Bridging Mineral Mines &amp; Industrial Manufacturing
              </h2>
              <p class="lede" style="margin-bottom: 1.25rem; color: #252F3D;">
                Deepali Minerals is a recognized manufacturer, processor, and bulk distributor of non-metallic industrial minerals, micronized functional extenders, and specialty chemical additives.
              </p>
              <p style="font-size: 0.92rem; color: #35424E; line-height: 1.65; margin-bottom: 1.5rem;">
                We eliminate the uncertainty in raw material procurement by maintaining dependable mine linkages across mineral-rich zones in Rajasthan and Gujarat, continuous pulverization control, and batch-wise quality documentation. Every consignment is supported by comprehensive Certificates of Analysis (COA) to guarantee chemical purity and particle fineness.
              </p>

              <div class="institutional-pillars-grid">
                <div class="inst-pillar-item" style="border-left: 4px solid #123E70; background: #FFFFFF; padding: 1rem 1.25rem; border-radius: 6px; box-shadow: 0 4px 14px rgba(18,62,112,0.04);">
                  <strong style="color: #123E70; display: block; margin-bottom: 0.25rem;">Direct Quarry Sourcing</strong>
                  <p style="margin: 0; font-size: 0.82rem; color: #526071; line-height: 1.45;">Secured mine tie-ups across Rajasthan, Gujarat, and key mining zones ensuring uninterrupted raw mineral supply.</p>
                </div>
                <div class="inst-pillar-item" style="border-left: 4px solid #1769AA; background: #FFFFFF; padding: 1rem 1.25rem; border-radius: 6px; box-shadow: 0 4px 14px rgba(18,62,112,0.04);">
                  <strong style="color: #1769AA; display: block; margin-bottom: 0.25rem;">Particle Size Consistency</strong>
                  <p style="margin: 0; font-size: 0.82rem; color: #526071; line-height: 1.45;">Micronized and pulverized grades sieved from 100 mesh up to 1250 mesh for demanding compounding.</p>
                </div>
                <div class="inst-pillar-item" style="border-left: 4px solid #80664A; background: #FFFFFF; padding: 1rem 1.25rem; border-radius: 6px; box-shadow: 0 4px 14px rgba(18,62,112,0.04);">
                  <strong style="color: #80664A; display: block; margin-bottom: 0.25rem;">Laboratory Quality Assay</strong>
                  <p style="margin: 0; font-size: 0.82rem; color: #526071; line-height: 1.45;">In-house testing for whiteness, brightness, sieve residue, moisture, and chemical purity.</p>
                </div>
                <div class="inst-pillar-item" style="border-left: 4px solid #D5A43A; background: #FFFFFF; padding: 1rem 1.25rem; border-radius: 6px; box-shadow: 0 4px 14px rgba(18,62,112,0.04);">
                  <strong style="color: #B45309; display: block; margin-bottom: 0.25rem;">Reliable Fleet Logistics</strong>
                  <p style="margin: 0; font-size: 0.82rem; color: #526071; line-height: 1.45;">Corporate Office at Lawrence Road, New Delhi with buffer inventory for prompt regional and national delivery.</p>
                </div>
              </div>

              <div style="margin-top: 2.25rem;">
                <a href="${root}/about.html" class="button" style="padding: 0.85rem 1.65rem; font-weight: 700; background: #123E70; color: #FFFFFF;">Read More About Deepali Minerals &rarr;</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           3. EXPLORE OUR INDUSTRIAL MINERALS — PRODUCT SHOWROOM (ALL 22 PRODUCTS)
           ==================================================================== -->
      <section class="showroom-section" id="portfolio" style="padding: 5rem 0; background: #FFFFFF; border-bottom: 1px solid var(--line);">
        <div class="shell">
          <div class="section-head" style="margin-bottom: 1.75rem;">
            <div>
              <span class="eyebrow" style="color: #1769AA;">MASTER CATALOGUE &bull; ALL 22 MATERIALS UNDER ONE ROOF</span>
              <h2 class="section-title" style="color: #123E70;">EXPLORE OUR INDUSTRIAL MINERALS</h2>
            </div>
            <p class="lede" style="color: #526071;">Explore all 22 catalogued non-metallic minerals, pulverized extenders, and functional additives with verified photography, particle size specifications, and direct WhatsApp sales ordering.</p>
          </div>

          <!-- Category Filter Tabs -->
          <div class="product-showcase-tabs">
            <button type="button" class="showcase-tab-btn is-active" data-filter="all">All Materials (22)</button>
            <button type="button" class="showcase-tab-btn" data-filter="minerals">Minerals &amp; Powders (13)</button>
            <button type="button" class="showcase-tab-btn" data-filter="chemicals">Functional Chemicals (6)</button>
            <button type="button" class="showcase-tab-btn" data-filter="grains">Grains &amp; Aggregates (3)</button>
          </div>

          <!-- 22 Products Grid with Category Tagging -->
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

          <div style="margin-top: 2.75rem; text-align: center;">
            <a href="${productsUrl}" class="button" style="padding: 0.95rem 2.25rem; font-size: 0.92rem; background: #123E70; color: #FFFFFF; border-color: #123E70;">View Full 22-Product Catalogue &rarr;</a>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           4. PARTNERS & BUSINESS RELATIONSHIPS — SOURCING ECOSYSTEM
           ==================================================================== -->
      <section class="showroom-section" id="sourcing" style="padding: 5.5rem 0; background: #0C2B50; color: #FFFFFF; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
        <div class="shell">
          <div class="section-head" style="margin-bottom: 2rem;">
            <div>
              <span class="eyebrow" style="color: #D5A43A;">MINING CORRIDORS &bull; STRATEGIC QUARRY TIE-UPS</span>
              <h2 class="section-title" style="color: #FFFFFF;">Direct Mine Linkages &amp; Strategic Sourcing Network</h2>
            </div>
            <p class="lede" style="color: #D5E7F6;">Secured pit-head arrangements across mineral-rich belts in Rajasthan and Gujarat provide verified raw ore feedstocks for continuous industrial milling.</p>
          </div>

          <!-- Transit Network Photo Banner -->
          <div style="margin-bottom: 2.5rem; border-radius: 8px; overflow: hidden; position: relative; box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4); border: 1px solid rgba(213,164,58,0.35);">
            <img src="${root}/assets/images/gallery/logistics_transit_network.jpg" alt="Deepali Minerals transport logistics fleet and transit loading silos" style="width: 100%; height: 320px; object-fit: cover;" loading="lazy" />
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(180deg, rgba(11,28,48,0) 0%, rgba(11,28,48,0.94) 100%); padding: 1.5rem; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
              <div>
                <span style="font-family: var(--mono); font-size: 0.72rem; color: #D5A43A; font-weight: 700; text-transform: uppercase;">STRATEGIC SOURCING ECOSYSTEM</span>
                <h3 style="margin: 0.25rem 0 0; color: #FFFFFF; font-size: 1.25rem;">Quarry Linkages &bull; Controlled Raymond Milling &bull; Nationwide Logistics</h3>
              </div>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <span style="background: rgba(213,164,58,0.25); color: #F8DF8A; font-family: var(--mono); font-size: 0.72rem; padding: 0.35rem 0.75rem; border-radius: 4px; border: 1px solid #D5A43A; font-weight: 700;">PIT-HEAD TIE-UPS</span>
                <span style="background: rgba(255,255,255,0.15); color: #FFFFFF; font-family: var(--mono); font-size: 0.72rem; padding: 0.35rem 0.75rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.25); font-weight: 700;">PAN-INDIA TRANSIT</span>
              </div>
            </div>
          </div>

          <div class="sourcing-grid">
            <div class="sourcing-card" style="background: #123E70; border: 1px solid rgba(213, 164, 58, 0.3); color: #FFFFFF;">
              <span class="sourcing-hub-badge" style="background: rgba(213, 164, 58, 0.2); color: #F8DF8A; border: 1px solid #D5A43A;">RAJASTHAN MINING BELT</span>
              <h3 class="sourcing-title" style="color: #FFFFFF;">Udaipur, Beawar &amp; Makrana</h3>
              <p class="sourcing-desc" style="color: #D5E7F6;">Direct extraction concessions and quarry partnerships ensuring continuous raw mineral ore feedstocks with high chemical purity and natural whiteness.</p>
              <div class="sourcing-minerals-list" style="background: rgba(11, 28, 48, 0.7); color: #D5E7F6; border-top: 1px solid rgba(255, 255, 255, 0.12);">
                <strong style="color: #F8DF8A;">Key Minerals:</strong> Calcite &bull; Talc / Soapstone &bull; Dolomite &bull; Marble &bull; Quartz
              </div>
            </div>

            <div class="sourcing-card" style="background: #123E70; border: 1px solid rgba(213, 164, 58, 0.3); color: #FFFFFF;">
              <span class="sourcing-hub-badge" style="background: rgba(213, 164, 58, 0.2); color: #F8DF8A; border: 1px solid #D5A43A;">GUJARAT COASTAL &amp; INLAND</span>
              <h3 class="sourcing-title" style="color: #FFFFFF;">Kutch, Sabarkantha &amp; Morvi</h3>
              <p class="sourcing-desc" style="color: #D5E7F6;">Audited mine linkages for sedimentary and levigated minerals, processed to strict chemical specifications for ceramics, paper, and compounding.</p>
              <div class="sourcing-minerals-list" style="background: rgba(11, 28, 48, 0.7); color: #D5E7F6; border-top: 1px solid rgba(255, 255, 255, 0.12);">
                <strong style="color: #F8DF8A;">Key Minerals:</strong> Levigated China Clay &bull; Kaolin &bull; Graded Silica Sand &bull; Bentonite
              </div>
            </div>

            <div class="sourcing-card" style="background: #123E70; border: 1px solid rgba(213, 164, 58, 0.3); color: #FFFFFF;">
              <span class="sourcing-hub-badge" style="background: rgba(213, 164, 58, 0.2); color: #F8DF8A; border: 1px solid #D5A43A;">CONTROLLED MILLING</span>
              <h3 class="sourcing-title" style="color: #FFFFFF;">Raymond Milling &amp; Air-Classification</h3>
              <p class="sourcing-desc" style="color: #D5E7F6;">Multi-deck air-classification and raymond milling infrastructure capable of delivering custom micronized particle distributions from 100 up to 1250 mesh.</p>
              <div class="sourcing-minerals-list" style="background: rgba(11, 28, 48, 0.7); color: #D5E7F6; border-top: 1px solid rgba(255, 255, 255, 0.12);">
                <strong style="color: #F8DF8A;">Capabilities:</strong> 100–1250 Mesh Sieving &bull; Surface Stearate Coating &bull; De-gritting
              </div>
            </div>

            <div class="sourcing-card" style="background: #123E70; border: 1px solid rgba(213, 164, 58, 0.3); color: #FFFFFF;">
              <span class="sourcing-hub-badge" style="background: rgba(213, 164, 58, 0.2); color: #F8DF8A; border: 1px solid #D5A43A;">CENTRAL BUFFER STOCK</span>
              <h3 class="sourcing-title" style="color: #FFFFFF;">Corporate Office &amp; Buffer Hub</h3>
              <p class="sourcing-desc" style="color: #D5E7F6;">Strategic buffer inventory housed at our Corporate Office in Lawrence Road Industrial Area, New Delhi, shielding manufacturing partners from supply interruptions.</p>
              <div class="sourcing-minerals-list" style="background: rgba(11, 28, 48, 0.7); color: #D5E7F6; border-top: 1px solid rgba(255, 255, 255, 0.12);">
                <strong style="color: #F8DF8A;">Logistics:</strong> 25kg/50kg HDPE &bull; 1-Ton Jumbo FIBC &bull; Pan-India FTL Dispatch
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           5. INDUSTRIES WE SERVE — COLOURFUL VISUAL GALLERY
           ==================================================================== -->
      <section class="showroom-section" id="industries" style="padding: 5rem 0; background: #EAF3FB; border-bottom: 1px solid var(--line);">
        <div class="shell">
          <div class="section-head">
            <div>
              <span class="eyebrow" style="color: #1769AA;">APPLICATION DISCOVERY &bull; 18 CANONICAL MANUFACTURING SECTORS</span>
              <h2 class="section-title" style="color: #123E70;">Serving Critical Industrial Manufacturing Sectors</h2>
            </div>
            <p class="lede" style="color: #252F3D;">Every manufacturing formulation demands specific chemical purity, brightness, and particle size distribution.</p>
          </div>

          <div class="industry-matrix-grid">
            <!-- 1. Paints & Coatings -->
            <div class="industry-matrix-card">
              <div class="industry-matrix-img-box">
                <img src="${root}/assets/images/industries/paints-coatings.webp" alt="Paints &amp; Coatings Mineral Applications" class="industry-matrix-img" loading="lazy" />
              </div>
              <div class="industry-matrix-body">
                <div>
                  <h3 class="ind-matrix-title" style="color: #123E70;">Paints &amp; Coatings</h3>
                  <p class="ind-matrix-desc">High-opacity extenders, scrub-resistant fillers, and white brightness enhancers for architectural and industrial paints.</p>
                  <div class="ind-matrix-minerals-list">
                    <span class="ind-matrix-mineral-text">Talc Powder &bull; Calcium Carbonate &bull; China Clay &bull; Barytes &bull; Titanium Dioxide</span>
                  </div>
                </div>
                <a href="${industriesUrl}?industry=paints-coatings" class="ind-matrix-action">Explore Industry Applications &rarr;</a>
              </div>
            </div>

            <!-- 2. Plastics & Polymers -->
            <div class="industry-matrix-card">
              <div class="industry-matrix-img-box">
                <img src="${root}/assets/images/industries/plastics-polymers.webp" alt="Plastics &amp; Polymers Mineral Applications" class="industry-matrix-img" loading="lazy" />
              </div>
              <div class="industry-matrix-body">
                <div>
                  <h3 class="ind-matrix-title" style="color: #123E70;">Plastics &amp; Polymers</h3>
                  <p class="ind-matrix-desc">Surface-treated functional extenders, nucleating agents, and masterbatch fillers for injection moulding and film blowing.</p>
                  <div class="ind-matrix-minerals-list">
                    <span class="ind-matrix-mineral-text">Micro Calcite &bull; Talc Powder &bull; Zinc Stearate &bull; Titanium Dioxide</span>
                  </div>
                </div>
                <a href="${industriesUrl}?industry=plastics-polymers" class="ind-matrix-action">Explore Industry Applications &rarr;</a>
              </div>
            </div>

            <!-- 3. Construction & Building Materials -->
            <div class="industry-matrix-card">
              <div class="industry-matrix-img-box">
                <img src="${root}/assets/images/industries/construction-building-materials.webp" alt="Construction &amp; Building Materials Mineral Applications" class="industry-matrix-img" loading="lazy" />
              </div>
              <div class="industry-matrix-body">
                <div>
                  <h3 class="ind-matrix-title" style="color: #123E70;">Construction &amp; Building</h3>
                  <p class="ind-matrix-desc">High-whiteness calcite, graded aggregates, and chemical binders for tile adhesives, polymer wall putty, and precast mortars.</p>
                  <div class="ind-matrix-minerals-list">
                    <span class="ind-matrix-mineral-text">Dolomite Powder &bull; Marble Powder &bull; Chalk Powder &bull; Hydrated Lime</span>
                  </div>
                </div>
                <a href="${industriesUrl}?industry=construction-building-materials" class="ind-matrix-action">Explore Industry Applications &rarr;</a>
              </div>
            </div>

            <!-- 4. Ceramics & Sanitaryware -->
            <div class="industry-matrix-card">
              <div class="industry-matrix-img-box">
                <img src="${root}/assets/images/industries/ceramics.webp" alt="Ceramics &amp; Sanitaryware Mineral Applications" class="industry-matrix-img" loading="lazy" />
              </div>
              <div class="industry-matrix-body">
                <div>
                  <h3 class="ind-matrix-title" style="color: #123E70;">Ceramics &amp; Sanitaryware</h3>
                  <p class="ind-matrix-desc">High-silica minerals, refractory fluxes, and plastic clays for sanitaryware bodies, ceramic tile glazes, and vitrified ware.</p>
                  <div class="ind-matrix-minerals-list">
                    <span class="ind-matrix-mineral-text">Quartz Powder &bull; Silica Sand &bull; Kaoline &bull; China Clay &bull; Dolomite</span>
                  </div>
                </div>
                <a href="${industriesUrl}?industry=ceramics" class="ind-matrix-action">Explore Industry Applications &rarr;</a>
              </div>
            </div>

            <!-- 5. Rubber & Footwear -->
            <div class="industry-matrix-card">
              <div class="industry-matrix-img-box">
                <img src="${root}/assets/images/industries/rubber-footwear.webp" alt="Rubber &amp; Footwear Mineral Applications" class="industry-matrix-img" loading="lazy" />
              </div>
              <div class="industry-matrix-body">
                <div>
                  <h3 class="ind-matrix-title" style="color: #123E70;">Rubber &amp; Footwear</h3>
                  <p class="ind-matrix-desc">Vulcanization activators, anti-tack dusting agents, and reinforcing fillers for automotive rubber goods and footwear soles.</p>
                  <div class="ind-matrix-minerals-list">
                    <span class="ind-matrix-mineral-text">Zinc Oxide &bull; Magnesium Carbonate &bull; Barytes &bull; French Chalk &bull; Talc</span>
                  </div>
                </div>
                <a href="${industriesUrl}?industry=rubber-footwear" class="ind-matrix-action">Explore Industry Applications &rarr;</a>
              </div>
            </div>

            <!-- 6. Paper & Stationery -->
            <div class="industry-matrix-card">
              <div class="industry-matrix-img-box">
                <img src="${root}/assets/images/industries/paper-stationery.webp" alt="Paper &amp; Stationery Mineral Applications" class="industry-matrix-img" loading="lazy" />
              </div>
              <div class="industry-matrix-body">
                <div>
                  <h3 class="ind-matrix-title" style="color: #123E70;">Paper &amp; Stationery</h3>
                  <p class="ind-matrix-desc">Pitch control talcs, high-brightness surface coating clays, and corrugation adhesive starches for paperboard and printing paper.</p>
                  <div class="ind-matrix-minerals-list">
                    <span class="ind-matrix-mineral-text">Levigated China Clay &bull; Talc Powder &bull; Maize Starch &bull; Calcium Carbonate</span>
                  </div>
                </div>
                <a href="${industriesUrl}?industry=paper-stationery" class="ind-matrix-action">Explore Industry Applications &rarr;</a>
              </div>
            </div>

            <!-- 7. FRP & Composite Applications -->
            <div class="industry-matrix-card">
              <div class="industry-matrix-img-box">
                <img src="${root}/assets/images/industries/frp-composites.webp" alt="FRP &amp; Composite Applications" class="industry-matrix-img" loading="lazy" />
              </div>
              <div class="industry-matrix-body">
                <div>
                  <h3 class="ind-matrix-title" style="color: #123E70;">FRP &amp; Composites</h3>
                  <p class="ind-matrix-desc">Polyester resin matrices, structural gel coat extenders, and dimensional stabilizers for fiberglass composite mouldings.</p>
                  <div class="ind-matrix-minerals-list">
                    <span class="ind-matrix-mineral-text">Polyester Resin &bull; Talc Powder &bull; Calcium Carbonate &bull; Quartz Powder</span>
                  </div>
                </div>
                <a href="${industriesUrl}?industry=frp-composites" class="ind-matrix-action">Explore Industry Applications &rarr;</a>
              </div>
            </div>

            <!-- 8. Foundry & Industrial Applications -->
            <div class="industry-matrix-card">
              <div class="industry-matrix-img-box">
                <img src="${root}/assets/images/industries/foundry.webp" alt="Foundry &amp; Industrial Applications" class="industry-matrix-img" loading="lazy" />
              </div>
              <div class="industry-matrix-body">
                <div>
                  <h3 class="ind-matrix-title" style="color: #123E70;">Foundry &amp; Metallurgy</h3>
                  <p class="ind-matrix-desc">High-fusion silica sand, metallurgical fluxing lime, and refractory dusting powders for metal casting and core moulds.</p>
                  <div class="ind-matrix-minerals-list">
                    <span class="ind-matrix-mineral-text">Silica Sand (Graded) &bull; Hydrated Lime &bull; French Chalk &bull; Soap Stone</span>
                  </div>
                </div>
                <a href="${industriesUrl}?industry=foundry-industrial" class="ind-matrix-action">Explore Industry Applications &rarr;</a>
              </div>
            </div>

            <!-- 9. Agriculture & Allied Applications -->
            <div class="industry-matrix-card">
              <div class="industry-matrix-img-box">
                <img src="${root}/assets/images/industries/agriculture-allied.webp" alt="Agriculture &amp; Allied Applications" class="industry-matrix-img" loading="lazy" />
              </div>
              <div class="industry-matrix-body">
                <div>
                  <h3 class="ind-matrix-title" style="color: #123E70;">Agriculture &amp; Allied</h3>
                  <p class="ind-matrix-desc">Soil pH conditioners, fertilizer anti-caking inert carriers, and micronutrient mineral powders for crop health and livestock feed.</p>
                  <div class="ind-matrix-minerals-list">
                    <span class="ind-matrix-mineral-text">Hydrated Lime &bull; Dolomite Powder &bull; Chalk Powder &bull; Calcium Carbonate</span>
                  </div>
                </div>
                <a href="${industriesUrl}?industry=agriculture-allied" class="ind-matrix-action">Explore Industry Applications &rarr;</a>
              </div>
            </div>

            <!-- 10. Detergents & Household Products -->
            <div class="industry-matrix-card">
              <div class="industry-matrix-img-box">
                <img src="${root}/assets/images/industries/detergents-household.webp" alt="Detergents &amp; Household Products" class="industry-matrix-img" loading="lazy" />
              </div>
              <div class="industry-matrix-body">
                <div>
                  <h3 class="ind-matrix-title" style="color: #123E70;">Detergents &amp; Household</h3>
                  <p class="ind-matrix-desc">Free-flowing mild abrasive scourers, bulk density builders, and particulate carriers for detergent powders and bars.</p>
                  <div class="ind-matrix-minerals-list">
                    <span class="ind-matrix-mineral-text">Natural Chalk &bull; Dolomite Powder &bull; China Clay &bull; Soap Stone</span>
                  </div>
                </div>
                <a href="${industriesUrl}?industry=detergents-household" class="ind-matrix-action">Explore Industry Applications &rarr;</a>
              </div>
            </div>
          </div>

          <div style="margin-top: 2.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <a href="${industriesUrl}" class="button" style="background: #123E70; color: #FFFFFF;">Explore All 18 Canonical Manufacturing Sectors &rarr;</a>
            <a href="${productsUrl}" class="text-link" style="color: #1769AA; font-weight: 700;">View Full 22-Product Catalogue &rarr;</a>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           6. WHY CHOOSE DEEPALI MINERALS — STRENGTHS SHOWROOM SECTION
           ==================================================================== -->
      <section class="showroom-section" id="why" style="padding: 5.5rem 0; background: #123E70; color: #FFFFFF; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
        <div class="shell">
          <div id="quality" style="scroll-margin-top: 100px;"></div>
          <div class="section-head" style="margin-bottom: 2.5rem;">
            <div>
              <span class="eyebrow" style="color: #D5A43A;">CORPORATE CAPABILITIES &bull; TECHNICAL DIFFERENTIATORS</span>
              <h2 class="section-title" style="color: #FFFFFF;">Why Leading Manufacturers Partner with Deepali Minerals</h2>
            </div>
            <p class="lede" style="color: #D5E7F6;">Direct mine linkages, custom particle sizing, and auditable batch quality parameters eliminate production disruptions.</p>
          </div>

          <div class="strengths-showroom-layout">
            <div class="strengths-hero-card" style="background: #0C2B50; border: 1px solid rgba(213, 164, 58, 0.35); color: #FFFFFF;">
              <div class="strengths-hero-img-box">
                <img src="${root}/assets/images/industries/corporate-intro-banner.webp" alt="Deepali Minerals processing infrastructure" class="strengths-hero-img" loading="lazy" />
              </div>
              <div class="strengths-hero-content">
                <span class="strengths-hero-badge" style="background: rgba(213, 164, 58, 0.15); border: 1px solid rgba(213, 164, 58, 0.4); color: #F8DF8A;">ESTABLISHED 2004 &bull; OVER TWO DECADES OF TRUST</span>
                <h3 class="strengths-hero-title" style="color: #FFFFFF;">Industrial Reliability Rooted in Technical Precision</h3>
                <p class="strengths-hero-desc" style="color: #D5E7F6;">Over two decades of commercial operations have proven that manufacturing reliability is built on two pillars: batch-to-batch chemical consistency and prompt consignment logistics. We maintain rigorous quality controls at every step from pit-head extraction to final dispatch.</p>
                <div class="strengths-stats-row">
                  <div class="strengths-stat-item">
                    <span class="strengths-stat-val" style="color: #F8DF8A;">20+</span>
                    <span class="strengths-stat-lbl" style="color: #D5E7F6;">Years in Mineral Supply</span>
                  </div>
                  <div class="strengths-stat-item">
                    <span class="strengths-stat-val" style="color: #F8DF8A;">22</span>
                    <span class="strengths-stat-lbl" style="color: #D5E7F6;">Catalogued Materials</span>
                  </div>
                  <div class="strengths-stat-item">
                    <span class="strengths-stat-val" style="color: #F8DF8A;">100%</span>
                    <span class="strengths-stat-lbl" style="color: #D5E7F6;">Batch COA Assurance</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="strengths-matrix">
              <div class="strength-pillar-card" style="background: #0E3560; border: 1px solid rgba(255, 255, 255, 0.14); border-left: 4px solid #D5A43A; color: #FFFFFF;">
                <div class="strength-pillar-num" style="color: #F8DF8A;">01</div>
                <div>
                  <h4 class="strength-pillar-title" style="color: #FFFFFF;">Direct Mine Quarry Tie-Ups</h4>
                  <p class="strength-pillar-desc" style="color: #D5E7F6;">Secured pit-head linkages across Rajasthan and Gujarat eliminate intermediate broker markups and guarantee steady feedstock delivery.</p>
                </div>
              </div>

              <div class="strength-pillar-card" style="background: #0E3560; border: 1px solid rgba(255, 255, 255, 0.14); border-left: 4px solid #D5A43A; color: #FFFFFF;">
                <div class="strength-pillar-num" style="color: #F8DF8A;">02</div>
                <div>
                  <h4 class="strength-pillar-title" style="color: #FFFFFF;">ISO 9001:2015 &amp; 14001:2015 Audited</h4>
                  <p class="strength-pillar-desc" style="color: #D5E7F6;">Dual certified management systems guarantee auditable documentation, lot traceability, and environmentally compliant processing.</p>
                </div>
              </div>

              <div class="strength-pillar-card" style="background: #0E3560; border: 1px solid rgba(255, 255, 255, 0.14); border-left: 4px solid #D5A43A; color: #FFFFFF;">
                <div class="strength-pillar-num" style="color: #F8DF8A;">03</div>
                <div>
                  <h4 class="strength-pillar-title" style="color: #FFFFFF;">Calibrated Micron Sizing (100–1250 Mesh)</h4>
                  <p class="strength-pillar-desc" style="color: #D5E7F6;">Controlled air-classification delivers tight particle size distribution (PSD), controlled top-cut, and high photometric whiteness.</p>
                </div>
              </div>

              <div class="strength-pillar-card" style="background: #0E3560; border: 1px solid rgba(255, 255, 255, 0.14); border-left: 4px solid #D5A43A; color: #FFFFFF;">
                <div class="strength-pillar-num" style="color: #F8DF8A;">04</div>
                <div>
                  <h4 class="strength-pillar-title" style="color: #FFFFFF;">Corporate Office &amp; Buffer Hub</h4>
                  <p class="strength-pillar-desc" style="color: #D5E7F6;">Covered central dry warehouse at Lawrence Road, Delhi maintains critical buffer stock to safeguard clients against seasonal quarry delays.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           7. PACKAGING AND LOGISTICS — WAREHOUSE & FLEET DISPATCH
           ==================================================================== -->
      <section class="showroom-section" id="facilities" style="padding: 5rem 0; background: #EAF3FB; border-bottom: 1px solid var(--line);">
        <div class="shell">
          <div class="section-head" style="margin-bottom: 2rem;">
            <div>
              <span class="eyebrow" style="color: #1769AA;">CORPORATE OFFICE &bull; NEW DELHI</span>
              <h2 class="section-title" style="color: #123E70;">Packaging Standards &amp; Corporate Logistics</h2>
            </div>
            <p class="lede" style="color: #252F3D;">Robust packaging options and buffer inventory managed from our Corporate Office ensuring seamless logistics without production downtime.</p>
          </div>

          <!-- Warehouse Photo Banner -->
          <div style="margin-bottom: 2.5rem; border-radius: 8px; overflow: hidden; position: relative; box-shadow: 0 8px 24px rgba(18, 62, 112, 0.08); border: 1px solid #D5E7F6;">
            <img src="${root}/assets/images/gallery/packaging_warehouse_bags.jpg" alt="Deepali Minerals Warehousing and Industrial Mineral Packaging Facility" style="width: 100%; height: 340px; object-fit: cover;" loading="lazy" />
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(180deg, rgba(11,28,48,0) 0%, rgba(11,28,48,0.92) 100%); padding: 1.5rem; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
              <div>
                <span style="font-family: var(--mono); font-size: 0.72rem; color: #D5A43A; font-weight: 700; text-transform: uppercase;">CORPORATE OFFICE &bull; CENTRAL BUFFER WAREHOUSING</span>
                <h3 style="margin: 0.25rem 0 0; color: #FFFFFF; font-size: 1.25rem;">Lawrence Road Industrial Area, Keshav Puram, New Delhi</h3>
              </div>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <span style="background: rgba(255,255,255,0.2); color: #FFFFFF; font-family: var(--mono); font-size: 0.72rem; padding: 0.35rem 0.75rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.3); font-weight: 700;">Pan-India FTL</span>
                <span style="background: rgba(255,255,255,0.2); color: #FFFFFF; font-family: var(--mono); font-size: 0.72rem; padding: 0.35rem 0.75rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.3); font-weight: 700;">Buffer Stock Security</span>
              </div>
            </div>
          </div>

          <div class="facility-showcase-grid">
            <div class="facility-card">
              <div class="facility-card-head" style="background: #123E70;">
                <h4 style="color: #FFFFFF;">25kg &amp; 50kg HDPE Bags</h4>
                <span style="color: #F8DF8A;">RETAIL &amp; WHOLESALE BATCH FEEDING</span>
              </div>
              <div class="facility-card-body">
                <div class="facility-feature-item">
                  <span style="color: #1769AA; font-weight: 800;">✓</span>
                  <span>Multi-layer woven polypropylene with laminated moisture-barrier inner LDPE liner.</span>
                </div>
                <div class="facility-feature-item">
                  <span style="color: #1769AA; font-weight: 800;">✓</span>
                  <span>UV-stabilized fabric preventing degradation during outdoor storage or yard staging.</span>
                </div>
                <div class="facility-feature-item">
                  <span style="color: #1769AA; font-weight: 800;">✓</span>
                  <span>Tamper-evident double stitch closing with clear batch identification stenciling.</span>
                </div>
              </div>
            </div>

            <div class="facility-card">
              <div class="facility-card-head" style="background: #123E70;">
                <h4 style="color: #FFFFFF;">1,000 kg (1 MT) Jumbo Bags</h4>
                <span style="color: #F8DF8A;">AUTOMATED SILO CHARGING &amp; EXPORT</span>
              </div>
              <div class="facility-card-body">
                <div class="facility-feature-item">
                  <span style="color: #1769AA; font-weight: 800;">✓</span>
                  <span>Heavy-duty four-loop crane-liftable FIBC bulk bags with bottom discharge spouts.</span>
                </div>
                <div class="facility-feature-item">
                  <span style="color: #1769AA; font-weight: 800;">✓</span>
                  <span>Designed for dust-free pneumatic conveying into industrial plant storage silos.</span>
                </div>
                <div class="facility-feature-item">
                  <span style="color: #1769AA; font-weight: 800;">✓</span>
                  <span>Palletized and shrink-wrapped for safe long-distance transit and zero spillage.</span>
                </div>
              </div>
            </div>

            <div class="facility-card">
              <div class="facility-card-head" style="background: #123E70;">
                <h4 style="color: #FFFFFF;">Corporate Office &amp; Facility</h4>
                <span style="color: #F8DF8A;">CENTRAL BUFFER STOCK &bull; SAME-DAY DISPATCH</span>
              </div>
              <div class="facility-card-body">
                <div class="facility-feature-item">
                  <span style="color: #1769AA; font-weight: 800;">✓</span>
                  <span>Covered, elevated dry warehouse bays at Lawrence Road Industrial Area, Keshav Puram, New Delhi.</span>
                </div>
                <div class="facility-feature-item">
                  <span style="color: #1769AA; font-weight: 800;">✓</span>
                  <span>Strategic buffer stock absorbing seasonal quarry delays and ensuring uninterrupted client supplies.</span>
                </div>
                <div class="facility-feature-item">
                  <span style="color: #1769AA; font-weight: 800;">✓</span>
                  <span>Equipped for rapid sample parcel dispatch and Full Truckload (FTL) transport coordination.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           8. BLOGS AND RESOURCES — TECHNICAL LITERATURE & GUIDES
           ==================================================================== -->
      <section class="showroom-section" id="updates" style="padding: 5rem 0; background: #FFFFFF; border-bottom: 1px solid var(--line);">
        <div class="shell">
          <div class="section-head" style="margin-bottom: 2rem;">
            <div>
              <span class="eyebrow" style="color: #1769AA;">TECHNICAL FORMULATION GUIDES &bull; MINERAL SCIENCE</span>
              <h2 class="section-title" style="color: #123E70;">Technical Updates &amp; Formulation Knowledge</h2>
            </div>
            <p class="lede" style="color: #526071;">Expert insights, particle size calibration guides, and mineral selection criteria for compounding engineers and procurement teams.</p>
          </div>

          <div class="blog-grid">
            <article class="blog-card">
              <div class="blog-img-box">
                <img src="${root}/assets/images/industries/paints-coatings.webp" alt="Mesh size conversion guide for mineral fillers" class="blog-thumb-img" loading="lazy" />
              </div>
              <div class="blog-body">
                <span class="blog-cat-badge">PARTICLE CALIBRATION</span>
                <h3 class="blog-title" style="color: #123E70;">Mesh to Micron Calibration: Understanding 100 to 1250 Mesh in Mineral Fillers</h3>
                <p class="blog-desc">A practical technical guide for paint and masterbatch formulators navigating sieve mesh sizes, D50/D97 laser diffraction metrics, and particle top-cut control.</p>
                <div class="blog-meta-row">
                  <span>Technical Reference</span>
                  <a href="${root}/product.html?product=talc" class="blog-read-link">Read Guide &rarr;</a>
                </div>
              </div>
            </article>

            <article class="blog-card">
              <div class="blog-img-box">
                <img src="${root}/assets/images/industries/plastics-polymers.webp" alt="Calcite vs Dolomite in PVC and polymer compounding" class="blog-thumb-img" loading="lazy" />
              </div>
              <div class="blog-body">
                <span class="blog-cat-badge">COMPOUNDING SCIENCE</span>
                <h3 class="blog-title" style="color: #123E70;">Calcite vs Dolomite: Selecting the Right Carbonate for PVC &amp; Polymer Pipes</h3>
                <p class="blog-desc">Comparative analysis of calcium carbonate (CaCO3) vs dolomite (CaMg(CO3)2) covering whiteness, abrasive index, bulk density, and cost-efficiency in rigid PVC.</p>
                <div class="blog-meta-row">
                  <span>Compounding Guide</span>
                  <a href="${root}/product.html?product=calcium-carbonate" class="blog-read-link">Read Guide &rarr;</a>
                </div>
              </div>
            </article>

            <article class="blog-card">
              <div class="blog-img-box">
                <img src="${root}/assets/images/industries/frp-composites.webp" alt="Nucleating efficiency of micronized talc" class="blog-thumb-img" loading="lazy" />
              </div>
              <div class="blog-body">
                <span class="blog-cat-badge">POLYMER ENGINEERING</span>
                <h3 class="blog-title" style="color: #123E70;">Nucleating Efficiency of Lamellar Talc Powder in Polypropylene Compounding</h3>
                <p class="blog-desc">How platy talc crystals enhance flexural modulus, heat deflection temperature (HDT), and dimensional stability in automotive thermoplastic mouldings.</p>
                <div class="blog-meta-row">
                  <span>Application Note</span>
                  <a href="${root}/product.html?product=talc" class="blog-read-link">Read Guide &rarr;</a>
                </div>
              </div>
            </article>

            <article class="blog-card">
              <div class="blog-img-box">
                <img src="${root}/assets/images/industries/quality-assurance-lab.webp" alt="Industrial mineral Certificate of Analysis" class="blog-thumb-img" loading="lazy" />
              </div>
              <div class="blog-body">
                <span class="blog-cat-badge">QUALITY ASSURANCE</span>
                <h3 class="blog-title" style="color: #123E70;">How to Audit an Industrial Mineral COA: Key Chemical &amp; Physical Benchmarks</h3>
                <p class="blog-desc">What procurement managers should scrutinize in a Certificate of Analysis: oil absorption values, acid insolubles, whiteness index, and moisture limits.</p>
                <div class="blog-meta-row">
                  <span>QA Standard</span>
                  <a href="${root}/about.html#quality" class="blog-read-link">Read Guide &rarr;</a>
                </div>
              </div>
            </article>
          </div>

          <!-- Technical Literature Downloads Strip -->
          <div style="margin-top: 3rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
              <h4 style="margin: 0; font-size: 1.1rem; color: #123E70;">Corporate Brochure &amp; Technical Literature</h4>
              <span style="font-family: var(--mono); font-size: 0.72rem; color: #526071;">PDF Documentation</span>
            </div>
            <div class="downloads-grid">
              <a href="${root}/about.html" class="download-card">
                <div class="download-info">
                  <h5>Deepali Minerals Corporate Profile</h5>
                  <span>Institutional Overview &bull; 20-Year Legacy</span>
                </div>
                <div class="download-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
              </a>

              <a href="${productsUrl}" class="download-card">
                <div class="download-info">
                  <h5>Master Mineral Portfolio Catalogue</h5>
                  <span>All 22 Pulverized Powders &amp; Extenders</span>
                </div>
                <div class="download-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                </div>
              </a>

              <a href="${root}/about.html#quality" class="download-card">
                <div class="download-info">
                  <h5>ISO 9001:2015 &amp; 14001:2015 Certificates</h5>
                  <span>Quality &amp; Environmental Accreditations</span>
                </div>
                <div class="download-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
              </a>

              <a href="${root}/product.html?product=talc" class="download-card">
                <div class="download-info">
                  <h5>Mesh to Micron Conversion Table</h5>
                  <span>100 Mesh to 1250 Mesh Calibration Chart</span>
                </div>
                <div class="download-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           9. CONTACT AND ENQUIRY — COMMERCIAL SOURCING DESK
           ==================================================================== -->
      <section class="showroom-section" id="rfq" style="padding: 5.5rem 0; background: #123E70; color: #FFFFFF; border-top: 1px solid rgba(255,255,255,0.1);">
        <div class="shell detail-grid">
          <div>
            <span class="eyebrow" style="color: #D5A43A;">COMMERCIAL SOURCING DESK</span>
            <h2 class="section-title" style="color: #FFFFFF;">Looking for the Right Industrial Mineral for Your Application?</h2>
            <p class="lede" style="color: #D5E7F6;">Submit your required mineral, target volume, and delivery destination for wholesale pricing and laboratory sample dispatch.</p>
            
            <div style="margin-top: 2rem; padding: 1.6rem; background: #0E325A; border: 1px solid rgba(213, 164, 58, 0.35); border-radius: 8px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);">
              <span style="font-family: var(--mono); font-size: 0.72rem; text-transform: uppercase; color: #D5A43A; font-weight: 700; display: block; margin-bottom: 0.35rem;">Corporate Office</span>
              <p style="font-size: 0.95rem; color: #FFFFFF; margin: 0 0 1rem; line-height: 1.55; font-weight: 600;">
                Deepali Minerals<br>
                C-2/29 C Lawrence Road, Rampura / Keshav Puram,<br>
                New Delhi – 110035, India
              </p>

              <div style="font-size: 0.88rem; color: #D5E7F6; line-height: 1.65;">
                <strong>CEO:</strong> Mr. Neeraj Monga<br>
                <strong>Direct Sales Helplines:</strong> <a href="tel:+919810516065" style="color: #F8DF8A; font-weight: 700;">+91 9810516065</a>, <a href="tel:+919810715129" style="color: #F8DF8A; font-weight: 700;">9810715129</a><br>
                <strong>Email:</strong> <a href="mailto:info@deepaliminerals.in" style="color: #F8DF8A; font-weight: 700;">info@deepaliminerals.in</a><br>
                <strong>GST Identification:</strong> 07AIMPM0458Q1ZL
              </div>
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
    if (!video) return;

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
          if (btn.classList.contains('hero-sound-pill-btn')) {
            labelEl.textContent = isMuted ? 'Tap to Unmute' : '🔊 Sound On (Mute)';
          } else {
            labelEl.textContent = isMuted ? 'Enable Video Sound' : 'Mute Video Sound';
          }
        }

        btn.setAttribute('title', isMuted ? 'Click to play facility video sound' : 'Click to mute facility video sound');
        btn.setAttribute('aria-label', isMuted ? 'Play facility video sound' : 'Mute facility video sound');
      });

      if (soundCard) {
        soundCard.classList.toggle('has-audio-on', !isMuted);
      }

      if (volumeSlider) {
        volumeSlider.value = isMuted ? 0 : (video.volume || 1);
      }
      if (volumeLabel) {
        const pct = isMuted ? 0 : Math.round((video.volume || 1) * 100);
        volumeLabel.textContent = `${pct}%`;
      }
    };

    const enableSound = () => {
      video.muted = false;
      video.volume = 1.0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
      syncUI(false);
    };

    const toggleAudio = () => {
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

    if (volumeSlider) {
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

    if (videoWrap) {
      videoWrap.addEventListener('click', (e) => {
        // Only trigger if not clicking buttons/links
        if (!e.target.closest('button, a, input, select, textarea, form')) {
          toggleAudio();
        }
      });
    }

    video.addEventListener('volumechange', () => {
      syncUI(video.muted);
    });

    // -----------------------------------------------------------------------
    // FULLSCREEN THEATER CONTROLLER
    // -----------------------------------------------------------------------
    const openTheater = () => {
      // Always ensure sound is enabled when opening fullscreen
      enableSound();

      let theaterEl = document.querySelector('#hero-fullscreen-theater');
      if (!theaterEl) {
        theaterEl = document.createElement('div');
        theaterEl.id = 'hero-fullscreen-theater';
        theaterEl.className = 'video-fullscreen-theater';
        theaterEl.setAttribute('role', 'dialog');
        theaterEl.setAttribute('aria-modal', 'true');
        theaterEl.setAttribute('aria-label', 'Deepali Minerals Facility Video Full Screen Theater');

        const rootPath = document.body.getAttribute('data-root') || '.';
        const videoSrc = `${rootPath}/hero%20video%20DM%20watermark%20(1).mp4`;

        theaterEl.innerHTML = `
          <div class="video-theater-header">
            <div class="video-theater-title">
              <span style="background: rgba(213,164,58,0.2); border: 1px solid #D5A43A; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.68rem; font-weight: 700; color: #F8DF8A;">DEEPALI MINERALS</span>
              <div>
                <h3>Central Processing &amp; Dispatch Facility</h3>
                <span>Corporate Office &bull; Keshav Puram, New Delhi</span>
              </div>
            </div>
            <button type="button" class="video-theater-close-btn" id="btn-close-theater" aria-label="Close Full Screen Theater">
              ✕ Close Full Screen [Esc]
            </button>
          </div>
          <div class="video-theater-body">
            <video class="video-theater-player" controls autoplay playsinline preload="auto">
              <source src="${videoSrc}" type="video/mp4" />
            </video>
          </div>
          <div class="video-theater-footer">
            <div>High-Purity Pulverized Extenders &bull; 100–1250 Mesh Grading &bull; Bulk Industrial Supply</div>
            <div style="color: #D5A43A; font-weight: 700;">ISO 9001:2015 &amp; ISO 14001:2015 ACCREDITED</div>
          </div>
        `;
        document.body.appendChild(theaterEl);

        const closeBtn = theaterEl.querySelector('#btn-close-theater');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => closeTheater());
        }

        // Close on clicking backdrop outside player
        theaterEl.addEventListener('click', (e) => {
          if (!e.target.closest('.video-theater-player, .video-theater-header')) {
            closeTheater();
          }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && theaterEl.classList.contains('is-open')) {
            closeTheater();
          }
        });
      }

      const theaterVideo = theaterEl.querySelector('.video-theater-player');
      if (theaterVideo) {
        // Sync current time from hero video
        try {
          theaterVideo.currentTime = video.currentTime || 0;
        } catch (_) {}
        theaterVideo.muted = false;
        theaterVideo.volume = 1.0;
        const playPromise = theaterVideo.play();
        if (playPromise !== undefined) playPromise.catch(() => {});
      }

      theaterEl.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      // Also attempt native fullscreen on the theater element or video if supported
      try {
        if (theaterVideo && theaterVideo.requestFullscreen) {
          theaterVideo.requestFullscreen().catch(() => {});
        } else if (theaterVideo && theaterVideo.webkitEnterFullscreen) {
          theaterVideo.webkitEnterFullscreen();
        }
      } catch (_) {}
    };

    const closeTheater = () => {
      const theaterEl = document.querySelector('#hero-fullscreen-theater');
      if (theaterEl) {
        const theaterVideo = theaterEl.querySelector('.video-theater-player');
        if (theaterVideo) {
          // Sync current time back to hero video
          try {
            video.currentTime = theaterVideo.currentTime || 0;
          } catch (_) {}
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

    // Initial state sync
    syncUI(video.muted);
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
            <option value="1250">Superfine (up to 1250 Mesh)</option>
            <option value="500">Fine Industrial (300 to 500 Mesh)</option>
            <option value="200">Standard Milled (200 to 400 Mesh)</option>
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
        if (val === '1250') {
          matched = data.products.filter(p => (p.specifications.mesh || '').includes('1250'));
          criteriaText = 'Superfine Powders (up to 1250 Mesh)';
        } else if (val === '500') {
          matched = data.products.filter(p => (p.specifications.mesh || '').includes('500'));
          criteriaText = 'Fine Industrial Powders (300 to 500 Mesh)';
        } else if (val === '200') {
          matched = data.products.filter(p => (p.specifications.mesh || '').includes('200') || (p.specifications.mesh || '').includes('400'));
          criteriaText = 'Standard Milled Grades (200 to 400 Mesh)';
        } else {
          matched = data.searchByRequirement('fine micron mesh micronized');
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
              <span style="color: #D5A43A; font-weight: 700;">${esc(ind.name)}</span>
            </div>
            <a href="${industriesUrl}" class="industry-back-all-btn">
              &larr; View All 18 Industries
            </a>
          </div>

          <!-- Header Grid: Title + Sourcing Profile Box -->
          <div class="industry-detail-header-grid">
            <div>
              <span class="industry-hub-badge">
                ${getIndustryIconSvg(ind.slug, 16)}
                <span>${esc(ind.badge)} &bull; ${ind.products.length} VERIFIED MINERAL GRADES</span>
              </span>

              <h1 class="industry-detail-title">${esc(ind.name)}</h1>
              <div class="industry-detail-subtitle">${esc(ind.subtitle)}</div>
              <p class="industry-detail-desc">${esc(ind.description)}</p>

              <div class="industry-detail-actions">
                <a href="#industry-rfq" class="button" style="padding: 0.85rem 1.65rem;">
                  Submit Procurement RFQ &darr;
                </a>
                <a href="${waIndustryUrl}" target="_blank" rel="noopener noreferrer" class="canonical-btn-wa" style="padding: 0.85rem 1.35rem; font-size: 0.82rem;">
                  ${whatsappIconSvg(18, 18)}
                  <span>WhatsApp Commercial Desk</span>
                </a>
              </div>
            </div>

            <!-- Commercial Sourcing Summary Card -->
            <div class="industry-quick-procure-box">
              <div class="industry-procure-title">Commercial Sourcing Profile</div>
              <ul class="industry-procure-list">
                <li class="industry-procure-item">
                  <span class="industry-procure-lbl">Supply Portfolio:</span>
                  <span class="industry-procure-val">${ind.products.length} Verified Minerals</span>
                </li>
                <li class="industry-procure-item">
                  <span class="industry-procure-lbl">Dispatch Hub:</span>
                  <span class="industry-procure-val">Lawrence Road, Delhi (Bulk &amp; FTL)</span>
                </li>
                <li class="industry-procure-item">
                  <span class="industry-procure-lbl">Fineness Range:</span>
                  <span class="industry-procure-val">100 to 1250 Mesh Available</span>
                </li>
                <li class="industry-procure-item">
                  <span class="industry-procure-lbl">Standard Packaging:</span>
                  <span class="industry-procure-val">25kg, 50kg &amp; 1-Ton Jumbo Bags</span>
                </li>
                <li class="industry-procure-item">
                  <span class="industry-procure-lbl">Quality Audit:</span>
                  <span class="industry-procure-val" style="color: #22C55E;">ISO 9001:2015 &amp; 14001:2015</span>
                </li>
              </ul>
              <a href="tel:+919810516065" style="display: block; text-align: center; font: 700 0.78rem var(--mono); color: #D5A43A; text-decoration: none; padding: 0.6rem; border: 1px dashed rgba(213, 164, 58, 0.4); border-radius: 4px; background: rgba(213, 164, 58, 0.05);">
                Direct Commercial Desk: +91 9810516065 (Mr. Neeraj Monga, CEO)
              </a>
            </div>
          </div>
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
      <section style="padding: 4rem 0 3.5rem; background: #F8FAFC; border-bottom: 1px solid var(--line);">
        <div class="shell">
          <div class="section-head" style="margin-bottom: 2rem;">
            <div>
              <span class="eyebrow" style="color: #A84E2B;">VERIFIED RAW MATERIAL PORTFOLIO (${ind.products.length} PRODUCTS)</span>
              <h2 class="section-title">Mineral Extenders, Fillers &amp; Additives for ${esc(ind.name)}</h2>
            </div>
            <p class="lede">Review all catalogued industrial minerals verified for ${esc(ind.name)} compounding, batch processing, and functional formulations.</p>
          </div>

          <div class="industry-products-deck">
            ${ind.products.map(p => {
              const meshTag = (p.specifications && p.specifications.mesh && p.specifications.mesh !== 'N/A') ? p.specifications.mesh : '300 to 1250 Mesh Available';
              const roleText = (ind.productRoles && ind.productRoles[p.slug]) ? ind.productRoles[p.slug] : p.shortDescription;
              const prodWaUrl = `https://wa.me/${(data.company.whatsappNumber || '919810516065').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello Deepali Minerals, I would like to enquire about ${p.name} for ${ind.name}. My required specifications and volume: `)}`;
              return `
                <article class="industry-product-card">
                  <div class="industry-product-img-wrap">
                    <img src="${p.image}" alt="${esc(p.name)} for ${esc(ind.name)}" class="industry-product-img" loading="lazy" />
                    <span class="industry-product-badge-float">${esc(meshTag)}</span>
                  </div>

                  <div class="industry-product-body">
                    <span class="industry-product-cat">${esc(p.category)}</span>
                    <h3 class="industry-product-name">${esc(p.name)}</h3>

                    <div class="industry-product-role-highlight">
                      <span class="industry-product-role-label">Compounding Role in ${esc(ind.name)}:</span>
                      <p class="industry-product-role-text">${esc(roleText)}</p>
                    </div>

                    <div style="font-size: 0.82rem; color: #64748B; margin-bottom: 1rem; line-height: 1.45;">
                      ${esc(p.shortDescription)}
                    </div>

                    <div class="industry-product-actions">
                      <a href="${productUrl(p, ind.slug)}" class="canonical-btn-primary">
                        View Details &rarr;
                      </a>
                      <button type="button" class="canonical-btn-rfq" onclick="prefillIndustryRfq('${esc(ind.name)}', '[Product: ${esc(p.name)}] Required specification: ; Estimated volume: ')">
                        Enquire Now
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
      <section style="padding: 4.5rem 0; background: #FFFFFF; border-bottom: 1px solid var(--line);">
        <div class="shell">
          <div class="section-head">
            <div>
              <span class="eyebrow" style="color: #174A70;">TECHNICAL FORMULATION CAPABILITIES</span>
              <h2 class="section-title">Formulation Capabilities &amp; Quality Governance</h2>
            </div>
            <p class="lede">How Deepali Minerals meets exacting technical thresholds for particle size distribution, chemical purity, and bulk consistency.</p>
          </div>

          <div class="industry-technical-grid">
            <!-- Card 1: Key Applications -->
            <div class="industry-technical-card">
              <div class="industry-technical-head">
                <div class="canonical-card-icon-box">${getIndustryIconSvg(ind.slug, 20)}</div>
                <h3 class="industry-technical-title">Key Formulation Sub-Sectors</h3>
              </div>
              <ul class="industry-feature-list">
                ${(ind.keyApplications || []).map(app => `
                  <li class="industry-feature-item">
                    <span class="industry-feature-bullet">&#10003;</span>
                    <span>${esc(app)}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Card 2: Technical Highlights -->
            <div class="industry-technical-card">
              <div class="industry-technical-head">
                <div class="canonical-card-icon-box" style="color: #D5A43A;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <h3 class="industry-technical-title">Technical Standards &amp; Fineness</h3>
              </div>
              <ul class="industry-feature-list">
                ${(ind.technicalHighlights || []).map(high => `
                  <li class="industry-feature-item">
                    <span class="industry-feature-bullet">&#10003;</span>
                    <span>${esc(high)}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Card 3: Deepali Minerals Supply Assurance -->
            <div class="industry-technical-card">
              <div class="industry-technical-head">
                <div class="canonical-card-icon-box" style="color: #A84E2B;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 class="industry-technical-title">Deepali Minerals Assurance</h3>
              </div>
              <ul class="industry-feature-list">
                <li class="industry-feature-item">
                  <span class="industry-feature-bullet">&#10003;</span>
                  <span><strong>Direct Mine Partnerships:</strong> Rajasthan &amp; Gujarat mineral belts.</span>
                </li>
                <li class="industry-feature-item">
                  <span class="industry-feature-bullet">&#10003;</span>
                  <span><strong>Lab Batch Verification:</strong> Mesh, whiteness &amp; oil absorption verified per consignment.</span>
                </li>
                <li class="industry-feature-item">
                  <span class="industry-feature-bullet">&#10003;</span>
                  <span><strong>Rapid Logistics:</strong> Centralized warehouse in Lawrence Road, Delhi for instant FTL dispatches.</span>
                </li>
                <li class="industry-feature-item">
                  <span class="industry-feature-bullet">&#10003;</span>
                  <span><strong>ISO Audited:</strong> Certified ISO 9001:2015 &amp; ISO 14001:2015 management systems.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. DIRECT PROCUREMENT RFQ FOR THIS INDUSTRY -->
      <section id="industry-rfq" style="background: #F8FAFC; padding: 4.5rem 0; border-bottom: 1px solid var(--line);">
        <div class="shell detail-grid">
          <div>
            <span class="eyebrow" style="color: #A84E2B;">DIRECT COMMERCIAL DESK</span>
            <h2 class="section-title">Request Quotation &amp; Material Samples for ${esc(ind.name)}</h2>
            <p class="lede">Our technical commercial desk handles custom particle gradations, bulk truckload deliveries, and specialized packaging for high-throughput manufacturing plants.</p>
            
            <div style="margin-top: 2rem; font-size: 0.9rem; color: #475569; line-height: 1.65; background: #FFFFFF; border: 1px solid var(--line); border-radius: 6px; padding: 1.5rem;">
              <p style="margin: 0 0 0.5rem;"><strong>CEO Desk:</strong> Mr. Neeraj Monga</p>
              <p style="margin: 0 0 0.5rem;"><strong>Direct Commercial Hotline:</strong> <a href="tel:+919810516065" style="color: #174A70; font-weight: 700;">+91 9810516065</a> / <a href="tel:+919810715129" style="color: #174A70; font-weight: 700;">+91 9810715129</a></p>
              <p style="margin: 0 0 0.5rem;"><strong>Sales Email:</strong> <a href="mailto:info@deepaliminerals.in" style="color: #174A70;">info@deepaliminerals.in</a></p>
              <p style="margin: 0 0 0.5rem;"><strong>Corporate Office:</strong> C2/29C Lawrence Road, Keshav Puram, Delhi-110035</p>
              <p style="margin: 0;"><strong>GST Registration:</strong> 07AIMPM0458Q1ZL</p>
            </div>

            <div style="margin-top: 1.5rem;">
              <a href="${waIndustryUrl}" target="_blank" rel="noopener noreferrer" class="canonical-btn-wa" style="padding: 0.85rem 1.65rem; font-size: 0.88rem;">
                ${whatsappIconSvg(18, 18)}
                <span>Chat Instantly on WhatsApp Regarding ${esc(ind.name)}</span>
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
            <span class="eyebrow" style="color: #174A70;">CENTRALIZED APPLICATION DIRECTORY</span>
            <h3 class="other-industries-title">Explore Other Manufacturing Sectors (${otherSectors.length})</h3>
            <p style="font-size: 0.88rem; color: #64748B; margin: 0 0 1rem;">Seamlessly browse mineral raw material specifications mapped to other manufacturing processes.</p>

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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
            <span>Centralized B2B Application Directory &bull; 18 Manufacturing Sectors</span>
          </span>

          <h1 class="industry-hub-title">Industrial Minerals by Manufacturing Industry</h1>
          <p class="industry-hub-lede">
            Every industrial compound and manufacturing line demands precise mineral particle morphology, chemical purity, and mesh sizing. Discover our comprehensive directory of 18 manufacturing sectors mapped to verified Deepali Minerals raw materials.
          </p>

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
              <div class="industry-hub-stat-num">100 &ndash; 1250</div>
              <div class="industry-hub-stat-lbl">Mesh Particle Fineness</div>
            </div>
            <div class="industry-hub-stat">
              <div class="industry-hub-stat-num">20+ Years</div>
              <div class="industry-hub-stat-lbl">B2B Industrial Supply Track Record</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. INSTANT SEARCH & QUICK FILTER BAR -->
      <section style="background: #FFFFFF; padding: 0 0 2rem;">
        <div class="shell">
          <div class="industry-discovery-bar">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
              <div style="flex: 1; min-width: 280px;">
                <label for="canonical-industry-search" style="display: block; font: 700 0.72rem var(--mono); text-transform: uppercase; color: #475569; margin-bottom: 0.35rem;">Search All 18 Manufacturing Sectors:</label>
                <div class="industry-search-input-wrap">
                  <svg class="industry-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input id="canonical-industry-search" type="search" class="industry-search-input" placeholder="Type an industry or mineral (e.g., Paints, Rubber, Putty, Cattle Feed, Talc, Calcite, Foundry)..." />
                </div>
              </div>
              <div style="font: 600 0.8rem var(--mono); color: #174A70;">
                Showing <span id="visible-sector-count" style="font-weight: 800; color: #0A1E34;">${allIndustries.length}</span> of ${allIndustries.length} Sectors
              </div>
            </div>

            <!-- Quick Category Pill Filters -->
            <div style="display: flex; gap: 0.45rem; flex-wrap: wrap; align-items: center;">
              <span style="font: 700 0.7rem var(--mono); color: #64748B; text-transform: uppercase; margin-right: 0.35rem;">Sector Groups:</span>
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
              
              // Group classification
              let group = 'specialty';
              if (['paints-coatings', 'construction-building-materials', 'wall-putty-nc-putty', 'tile-adhesives'].includes(ind.slug)) group = 'coatings';
              else if (['plastics-polymers', 'rubber-footwear', 'frp-composites'].includes(ind.slug)) group = 'polymers';
              else if (['ceramics', 'foundry-industrial'].includes(ind.slug)) group = 'ceramics';

              return `
                <article class="canonical-industry-card" data-slug="${ind.slug}" data-name="${esc(ind.name.toLowerCase())}" data-group="${group}" data-materials="${esc(ind.products.map(p => p.name.toLowerCase()).join(' '))}">
                  <div>
                    <div class="canonical-card-header">
                      <div class="canonical-card-icon-box">
                        ${getIndustryIconSvg(ind.slug, 22)}
                      </div>
                      <span class="canonical-card-index">SECTOR ${String(idx + 1).padStart(2, '0')} / 18</span>
                    </div>

                    <span class="canonical-card-badge">${esc(ind.badge)}</span>
                    <h3 class="canonical-card-title">${esc(ind.name)}</h3>
                    <div class="canonical-card-subtitle">${esc(ind.subtitle)}</div>
                    <p class="canonical-card-desc">${esc(ind.description)}</p>

                    <!-- Regulatory Caution Pill if applicable -->
                    ${ind.regulatoryNotice ? `
                      <div style="margin: 0.65rem 0 0.85rem; padding: 0.45rem 0.65rem; background: #FFFBEB; border: 1px solid #FDE68A; border-left: 3px solid #D97706; font-size: 0.72rem; line-height: 1.35; color: #92400E; border-radius: 0 4px 4px 0;">
                        <strong>Notice:</strong> ${ind.id === 'cattle-feed' ? 'Mandatory feed-grade qualification required.' : (ind.id === 'fire-safety' ? 'Finished fire ratings formulation dependent.' : 'Technical specification qualification required.')}
                      </div>
                    ` : ''}

                    <!-- Matched Minerals Box -->
                    <div class="canonical-card-minerals-wrap">
                      <div class="canonical-card-minerals-head">
                        <span>Mapped Raw Minerals:</span>
                        <span style="color: #174A70; font-weight: 800;">${ind.products.length} Products</span>
                      </div>
                      <div class="canonical-card-pills">
                        ${ind.products.slice(0, 6).map(p => `
                          <a href="${productUrl(p, ind.slug)}" class="canonical-mineral-pill" title="View ${esc(p.name)} specifications">
                            ${esc(p.name)}
                          </a>
                        `).join('')}
                        ${ind.products.length > 6 ? `
                          <span class="canonical-mineral-pill" style="background: #F1F5F9; color: #475569;">
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
      <section style="background: #F8FAFC; padding: 4.5rem 0; border-top: 1px solid var(--line);">
        <div class="shell detail-grid">
          <div>
            <span class="eyebrow" style="color: #A84E2B;">DIRECT SOURCING DESK</span>
            <h2 class="section-title">Can't Find Your Exact Manufacturing Application?</h2>
            <p class="lede">Our technical commercial team evaluates custom particle gradations, surface treatments, and tailored packaging for high-throughput compounding and manufacturing plants.</p>
            
            <div style="margin-top: 2rem; font-size: 0.9rem; color: #475569; line-height: 1.65; background: #FFFFFF; border: 1px solid var(--line); border-radius: 6px; padding: 1.5rem;">
              <p style="margin: 0 0 0.5rem;"><strong>CEO Commercial Desk:</strong> Mr. Neeraj Monga</p>
              <p style="margin: 0 0 0.5rem;"><strong>Direct Phone:</strong> <a href="tel:+919810516065" style="color: #174A70; font-weight: 700;">+91 9810516065</a> / <a href="tel:+919810715129" style="color: #174A70; font-weight: 700;">+91 9810715129</a></p>
              <p style="margin: 0 0 0.5rem;"><strong>Official Email:</strong> <a href="mailto:info@deepaliminerals.in" style="color: #174A70;">info@deepaliminerals.in</a></p>
              <p style="margin: 0 0 0.5rem;"><strong>Dispatch Hub:</strong> C2/29C Lawrence Road, Keshav Puram, Delhi-110035</p>
              <p style="margin: 0;"><strong>GST:</strong> 07AIMPM0458Q1ZL</p>
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

    mainEl.innerHTML = `
      <!-- Premium Industrial Catalogue Hero -->
      <section class="page-hero" style="background: linear-gradient(135deg, #0A1E34 0%, #0F2B48 100%); color: #FFFFFF; padding: 4.5rem 0 3.75rem; border-bottom: 3px solid #D5A43A;">
        <div class="shell">
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(213, 164, 58, 0.15); border: 1px solid rgba(213, 164, 58, 0.4); padding: 0.35rem 0.75rem; border-radius: 4px; font-family: var(--mono); font-size: 0.72rem; font-weight: 700; color: #F8DF8A; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.08em;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>B2B INDUSTRIAL DIRECTORY &bull; ESTD. 2004</span>
          </div>

          <h1 class="display" style="color: #FFFFFF; font-size: clamp(2.2rem, 4.2vw, 3.6rem); margin: 0 0 1rem; line-height: 1.05;">
            Master Industrial Minerals &amp; Chemicals Portfolio
          </h1>

          <p class="lede" style="color: #CBD5E1; max-width: 68ch; font-size: 1.05rem; line-height: 1.6; margin: 0 0 1.75rem;">
            Explore all 22 processed non-metallic minerals, pulverized functional extenders, and inorganic pigments. Filter by classification or manufacturing sector to identify exact mesh grading and formulation compatibility.
          </p>

          <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; padding-top: 1.25rem; border-top: 1px solid rgba(255,255,255,0.12); font-family: var(--mono); font-size: 0.76rem; color: #E2E8F0;">
            <span><strong style="color: #D5A43A;">22</strong> Verified Materials</span>
            <span style="color: rgba(255,255,255,0.25);">&bull;</span>
            <span><strong style="color: #D5A43A;">38+</strong> Manufacturing Sectors</span>
            <span style="color: rgba(255,255,255,0.25);">&bull;</span>
            <span>ISO 9001:2015 &amp; ISO 14001:2015 Accredited</span>
            <span style="color: rgba(255,255,255,0.25);">&bull;</span>
            <span>Lawrence Road, Delhi Corporate Office</span>
          </div>
        </div>
      </section>

      <section class="catalogue" style="padding: 3rem 0 5rem; background: #FFFFFF;">
        <div class="shell">
          
          <!-- Category Filter Bar (Segmented Controls) -->
          <div class="filter-bar" id="category-filter-bar" style="margin-bottom: 1.5rem;">
            <button type="button" class="filter-btn active" data-cat="all">All Materials (22)</button>
            <button type="button" class="filter-btn" data-cat="Mineral Powders">Mineral Powders (12)</button>
            <button type="button" class="filter-btn" data-cat="Functional Chemicals">Functional Chemicals (7)</button>
            <button type="button" class="filter-btn" data-cat="Grains & Aggregates">Grains &amp; Aggregates (3)</button>
          </div>

          <!-- Search & Count Bar -->
          <div class="catalogue-top" style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; background: #F8FAFC; border: 1px solid var(--line); border-radius: 6px; padding: 1rem 1.25rem;">
            <span class="result-count" style="font-family: var(--mono); font-size: 0.82rem; font-weight: 700; color: #1E293B;">
              SHOWING <b id="product-count" style="color: #A84E2B;">${data.products.length}</b> OF 22 MATERIALS
            </span>
            <div style="flex: 1; max-width: 520px; min-width: 280px; position: relative;">
              <input 
                id="catalogue-search" 
                type="search" 
                placeholder="Search by mineral name, application, or industry (e.g. Talc, PVC, Putty, Rubber)..." 
                aria-label="Search materials"
                style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--line); border-radius: 4px; font-family: var(--sans); font-size: 0.88rem; background: #FFFFFF; color: var(--ink);"
              >
            </div>
          </div>

          <!-- Application Quick Filter Strip -->
          <div style="margin: 1rem 0; padding: 1.15rem; background: #FFFFFF; border: 1px solid var(--line); border-radius: 6px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: .5rem; margin-bottom: .6rem;">
              <span class="eyebrow" style="margin-bottom: 0; color: #174A70;">DISCOVER BY COMPOUND APPLICATION</span>
            </div>
            <div class="pill-list" id="application-quick-pills">
              ${commonApps.map(app => `
                <button type="button" class="pill" data-app="${esc(app.term)}">${esc(app.label)}</button>
              `).join('')}
            </div>
          </div>

          <!-- "What Are You Manufacturing?" Industry Quick Selector -->
          <div style="margin: 1rem 0 2.25rem; padding: 1.25rem; background: #F8FAFC; border: 1px solid var(--line); border-radius: 6px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: .5rem; margin-bottom: .75rem;">
              <span class="eyebrow" style="margin-bottom: 0; color: #A84E2B;">WHAT ARE YOU MANUFACTURING? (FILTER BY SECTOR)</span>
              <button type="button" id="clear-filters-btn" style="font: 700 .72rem var(--mono); color: #174A70; cursor: pointer; text-decoration: underline; background: none; border: 0; text-transform: uppercase;">Clear All Filters &times;</button>
            </div>
            <div class="pill-list" id="industry-pills">
              ${data.industries.map(ind => `
                <button type="button" class="pill" data-industry="${esc(ind)}">${esc(ind)}</button>
              `).join('')}
            </div>
          </div>

          <!-- Active Filter Notice -->
          <div id="filter-status" style="display: none; font: 600 .8rem var(--mono); color: #174A70; margin-bottom: 1.25rem; padding: 0.75rem 1rem; background: rgba(23, 74, 112, 0.06); border-left: 3px solid #174A70; border-radius: 0 4px 4px 0;"></div>

          <!-- Product Grid: 22 Products with Consistent Photography & Dual CTAs -->
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

    // SEO Dynamic Update & Structured Data
    updateSeoMeta({
      title: `${p.name} - Technical Specifications & B2B Supply | Deepali Minerals`,
      description: `${p.name} technical specifications, manufacturing applications, mesh classification, and B2B wholesale supply from Deepali Minerals, Delhi.`,
      canonical: `https://www.deepaliminerals.com/product.html?product=${p.slug}`,
      ogType: 'product',
      ogImage: 'https://www.deepaliminerals.com' + resolveProductImg(p.image)
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
      "image": "https://www.deepaliminerals.com" + resolveProductImg(p.image),
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

    mainEl.innerHTML = `
      <!-- Breadcrumbs & Product Hero -->
      <section style="background: #FFFFFF; padding: 2.5rem 0 3.5rem; border-bottom: 1px solid var(--line);">
        <div class="shell">
          <div class="breadcrumbs" style="margin-bottom: 1.5rem; font-size: 0.76rem;">
            <a href="${root}/" style="color: #174A70;">Home</a> / <a href="${productsUrl}" style="color: #174A70;">Products</a> ${industryCtx ? `/ <a href="${productsUrl}?industry=${encodeURIComponent(industryCtx)}" style="color: #174A70;">${esc(industryCtx)}</a>` : ''} ${appCtx ? `/ <span style="color:var(--slate);">${esc(appCtx)}</span>` : ''} / <strong>${esc(p.name)}</strong>
          </div>

          <div class="detail-intro">
            <div>
              <span class="eyebrow" style="color: #174A70; margin-bottom: 0.5rem;">
                DEEPALI MINERALS &bull; ${esc(p.category.toUpperCase())}
              </span>

              <h1 class="display" style="margin-top: 0.35rem; margin-bottom: 0.5rem; font-size: clamp(2.2rem, 4vw, 3.25rem); color: #0A1E34;">
                ${esc(p.name)}
              </h1>

              ${p.composition ? `
                <div class="detail-composition">
                  ${esc(p.composition)}
                </div>
              ` : ''}

              <p class="lede" style="font-size: 1rem; line-height: 1.6; color: var(--slate); margin-bottom: 1.25rem;">
                ${esc(p.description)}
              </p>

              <!-- Quick Parameters Strip -->
              <div class="product-spec-quick-strip">
                <div class="product-spec-quick-item">
                  <span class="product-spec-quick-label">Particle Mesh</span>
                  <span class="product-spec-quick-val">${(specs.mesh && specs.mesh !== 'Available on request') ? esc(specs.mesh) : 'Graded on request'}</span>
                </div>
                <div class="product-spec-quick-item">
                  <span class="product-spec-quick-label">Quality Standard</span>
                  <span class="product-spec-quick-val">ISO 9001:2015 &bull; 14001</span>
                </div>
                <div class="product-spec-quick-item">
                  <span class="product-spec-quick-label">Corporate Office</span>
                  <span class="product-spec-quick-val">Lawrence Road, Delhi</span>
                </div>
              </div>
              
              <!-- Primary Buyer Actions -->
              <div class="detail-actions" style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1.75rem;">
                <a class="button" href="#rfq" style="padding: 0.85rem 1.65rem; font-size: 0.84rem;">
                  Enquire Now / Get Quote &rarr;
                </a>
                <a class="button alt" href="${whatsappProductUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.85rem 1.35rem; font-size: 0.84rem; color: #15803D; border-color: #86EFAC; background: rgba(34, 197, 94, 0.05);">
                  ${whatsappIconSvg(16, 16)}
                  <span>WhatsApp Enquiry</span>
                </a>
                <a href="tel:+919810516065" class="button alt" style="padding: 0.85rem 1.25rem; font-size: 0.84rem;">
                  Call: +91 9810516065
                </a>
              </div>
            </div>

            <!-- Product Visual Gallery Card -->
            <div class="product-gallery-container">
              <div class="product-gallery-frame" style="border-radius: 6px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); height: 380px;">
                ${p.image ? `
                  <img 
                    id="main-product-img"
                    src="${resolveProductImg(p.image)}" 
                    alt="${esc(p.alt || `${p.name} - Deepali Minerals Industrial Supply`)}" 
                    class="product-gallery-img" 
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
                        ? 'Natural polymeric carbohydrate material derived from plant sources (corn/cassava). Non-mineral biological starch formulation.' 
                        : (p.composition || 'Controlled industrial mineral grade with verified physical and chemical parameters.')}
                    </p>
                    <span class="gallery-fallback-tag">${p.slug === 'starch' ? 'Plant-Derived Industrial Grade' : 'Laboratory Inspected Specimen'}</span>
                  </div>
                </div>
                <div class="product-gallery-pill-overlay">
                  <span class="gallery-pill">${esc(p.category)}</span>
                  ${p.slug === 'starch' ? '<span class="gallery-pill plant">Plant-Derived Polymer</span>' : '<span class="gallery-pill iso">ISO 9001:2015 QA</span>'}
                </div>
              </div>

              ${p.gallery && p.gallery.length > 1 ? `
                <div class="product-gallery-thumbnails" style="display: flex; gap: 0.6rem; margin-top: 0.75rem; align-items: center; flex-wrap: wrap;">
                  ${p.gallery.map((g, idx) => `
                    <button 
                      type="button" 
                      class="product-thumb-btn ${idx === 0 ? 'active' : ''}" 
                      onclick="var m = document.getElementById('main-product-img'); if (m) { m.src = '${resolveProductImg(g.src)}'; m.alt = '${esc(g.alt)}'; } document.querySelectorAll('.product-thumb-btn').forEach(function(b){ b.style.borderColor = 'var(--line)'; b.style.boxShadow = 'none'; }); this.style.borderColor = 'var(--blue)'; this.style.boxShadow = '0 0 0 2px rgba(11,83,148,0.3)';" 
                      style="cursor: pointer; border: 2px solid ${idx === 0 ? 'var(--blue)' : 'var(--line)'}; border-radius: 6px; overflow: hidden; width: 68px; height: 68px; padding: 0; background: #fff; transition: all .2s; box-shadow: ${idx === 0 ? '0 0 0 2px rgba(11,83,148,0.3)' : 'none'};"
                      title="${esc(g.alt)}"
                    >
                      <img src="${resolveProductImg(g.src)}" alt="${esc(g.alt)}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
                    </button>
                  `).join('')}
                  <span style="font-size: 0.75rem; color: var(--slate); margin-left: 0.35rem;">
                    Click thumbnail to switch photo angle (${p.gallery.length} verified photos)
                  </span>
                </div>
              ` : ''}

              <div class="product-gallery-toolbar" style="margin-top: 0.75rem; padding: 0.65rem 0.85rem; background: #F8FAFC; border: 1px solid var(--line); border-radius: 4px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                <div class="toolbar-item" style="font-family: var(--mono); font-size: 0.72rem; color: #1E293B; display: flex; align-items: center; gap: 0.4rem;">
                  <span class="toolbar-dot" style="width: 8px; height: 8px; border-radius: 50%; background: #22C55E; display: inline-block;"></span>
                  <span>Verified B2B Industrial Supply Grade</span>
                </div>
                <a href="${whatsappProductUrl}" target="_blank" rel="noopener noreferrer" class="toolbar-link" style="font-family: var(--mono); font-size: 0.72rem; color: #174A70; font-weight: 700; text-decoration: none;">
                  Request Batch Analysis Report &amp; Samples &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Key Applications & Industries Served -->
      <section style="background: #F8FAFC; padding: 4.5rem 0; border-bottom: 1px solid var(--line);">
        <div class="shell detail-grid">
          <div>
            <span class="eyebrow" style="color: #174A70;">MANUFACTURING APPLICATIONS</span>
            <h2 class="section-title" style="font-size: clamp(1.85rem, 3vw, 2.5rem); margin-bottom: 0.5rem;">
              Where is ${esc(p.name)} Applied?
            </h2>
            <p class="lede" style="margin-bottom: 1.5rem;">Verified compounding functions and industrial production uses supported by this material grade.</p>
            
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.85rem;">
              ${(p.applications && p.applications.length ? p.applications : ['Applications data to be updated after technical verification.']).map(app => `
                <li style="display: flex; gap: 0.65rem; font-size: 0.92rem; color: var(--ink); line-height: 1.5; background: #FFFFFF; border: 1px solid var(--line); border-radius: 4px; padding: 0.75rem 1rem;">
                  <span style="color: #15803D; font-weight: 800; font-family: var(--mono);">&#10003;</span>
                  <span>${esc(app)}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div>
            <span class="eyebrow" style="color: #A84E2B;">COMPATIBLE MANUFACTURING SECTORS</span>
            <h2 class="section-title" style="font-size: clamp(1.85rem, 3vw, 2.5rem); margin-bottom: 0.5rem;">
              Industries Served
            </h2>
            <p class="lede" style="margin-bottom: 1.25rem;">Manufacturing sectors utilizing ${esc(p.name)} in formulation batches.</p>
            
            <div class="pill-list" style="margin-bottom: 1.75rem;">
              ${(p.canonicalIndustries && p.canonicalIndustries.length ? p.canonicalIndustries : (p.industries && p.industries.length ? p.industries : ['Sectors pending verification'])).map(ind => {
                const cInd = (data.getCanonicalIndustryByName && data.getCanonicalIndustryByName(ind)) ||
                             (data.getCanonicalIndustryBySlug && data.getCanonicalIndustryBySlug(ind));
                const targetUrl = cInd ? `${industriesUrl}?industry=${encodeURIComponent(cInd.slug)}` : `${productsUrl}?industry=${encodeURIComponent(ind)}`;
                return `
                  <a href="${targetUrl}" class="pill ${ind.toLowerCase() === industryCtx.toLowerCase() ? 'active' : ''}" title="Explore all minerals for ${esc(ind)}">${esc(ind)} &rarr;</a>
                `;
              }).join('')}
            </div>

            <div style="padding: 1.35rem; background: #FFFFFF; border: 1px solid var(--line); border-radius: 6px;">
              <h3 style="font: 700 1.15rem var(--serif); margin: 0 0 0.6rem; color: #0A1E34;">Industrial Packaging Standards</h3>
              <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.86rem; color: var(--slate); display: flex; flex-direction: column; gap: 0.45rem;">
                ${(p.packaging && p.packaging.length ? p.packaging : ['Standard moisture-proof industrial packaging specifications available on request.']).map(pkg => `
                  <li style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="color: #174A70;">&#9642;</span>
                    <span>${esc(pkg)}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Technical Specifications Section (Table Layout) -->
      <section class="featured" id="specs" style="padding: 4.5rem 0; background: #FFFFFF; border-bottom: 1px solid var(--line);">
        <div class="shell detail-grid">
          
          <div class="spec-box" style="background: #FFFFFF; border: 1px solid var(--line); border-radius: 6px; padding: 1.75rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span class="eyebrow" style="margin-bottom: 0; color: #174A70;">LABORATORY ASSAY PARAMETERS</span>
              <span style="font-family: var(--mono); font-size: 0.7rem; color: #15803D; font-weight: 700; background: #DCFCE7; padding: 0.2rem 0.5rem; border-radius: 3px;">
                ISO 9001:2015 AUDITED
              </span>
            </div>

            <h2 style="font-family: var(--serif); font-size: 1.75rem; margin: 0 0 1.25rem; color: #0A1E34;">
              Technical Specifications
            </h2>

            <div class="table-wrap">
              <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="border-bottom: 2px solid #0A1E34;">
                    <th style="padding: 0.75rem 0.5rem; text-align: left; font-family: var(--mono); font-size: 0.74rem; text-transform: uppercase; color: #0A1E34;">Parameter</th>
                    <th style="padding: 0.75rem 0.5rem; text-align: right; font-family: var(--mono); font-size: 0.74rem; text-transform: uppercase; color: #0A1E34;">Value / Specification</th>
                  </tr>
                </thead>
                <tbody>
                  ${specRows.map(([k, v]) => {
                    const isReq = v === UNAVAILABLE_MSG;
                    return `
                      <tr style="border-bottom: 1px solid var(--line);">
                        <td style="padding: 0.75rem 0.5rem; font-weight: 600; font-size: 0.85rem; color: #1E293B;">${k}</td>
                        <td style="padding: 0.75rem 0.5rem; text-align: right; font-size: 0.85rem;">
                          ${isReq
                            ? `<span class="spec-val-unverified">${v}</span>`
                            : `<strong style="color: #0A1E34; font-family: var(--mono);">${esc(v)}</strong>`
                          }
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div class="data-note" style="background: #F8FAFC; border: 1px solid var(--line); border-left: 3px solid #174A70; border-radius: 0 6px 6px 0; padding: 1.25rem; font-size: 0.84rem; line-height: 1.55; color: var(--slate);">
              <strong style="color: #0A1E34; display: block; margin-bottom: 0.35rem; font-size: 0.9rem;">
                Controlled Technical Information Notice
              </strong>
              Deepali Minerals adheres to strict commercial accuracy standards: technical parameters, certified assays, and test values are published only when verified from source laboratory testing. Where technical specifications are marked as available on request, grade certificates and lot analysis can be provided upon business inquiry.
            </div>

            <div style="margin-top: 1.5rem; background: #FFFFFF; border: 1px solid var(--line); border-radius: 6px; padding: 1.5rem;">
              <span class="eyebrow" style="color: #D5A43A; margin-bottom: 0.4rem;">TECHNICAL MATERIAL LIBRARY</span>
              <h3 style="font: 700 1.2rem var(--serif); margin: 0 0 0.45rem; color: #0A1E34;">Quality Documentation</h3>
              <p style="font-size: .84rem; color: var(--slate); margin: 0 0 1rem; line-height: 1.5;">Official data sheets and certificates provided for client formulation validation.</p>
              
              <ul class="doc-list">
                <li class="doc-item" style="border-radius: 4px;">
                  <span class="doc-name">Technical Data Sheet (TDS)</span>
                  <span class="doc-status" style="color: #174A70;">Available on request</span>
                </li>
                <li class="doc-item" style="border-radius: 4px;">
                  <span class="doc-name">Certificate of Analysis (COA)</span>
                  <span class="doc-status" style="color: #15803D;">Supplied with batch</span>
                </li>
                <li class="doc-item" style="border-radius: 4px;">
                  <span class="doc-name">Material Safety Data Sheet (MSDS)</span>
                  <span class="doc-status" style="color: #174A70;">Available on request</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      <!-- Related Mineral Products -->
      <section style="padding: 4.5rem 0; background: #F8FAFC; border-bottom: 1px solid var(--line);">
        <div class="shell">
          <div class="section-head" style="margin-bottom: 1.75rem;">
            <div>
              <span class="eyebrow" style="color: #174A70;">FORMULATION ALTERNATIVES</span>
              <h2 class="section-title">Related Mineral Products</h2>
            </div>
            <a class="text-link" href="${productsUrl}">View all 22 materials &rarr;</a>
          </div>
          <div class="product-grid">
            ${relatedProds.map(p => productCard(p, industryCtx)).join('')}
          </div>
        </div>
      </section>

      <!-- Commercial Quotation Desk (Prefilled for this Product) -->
      <section style="padding: 4.5rem 0; background: #FFFFFF;">
        <div class="shell detail-grid">
          <div>
            <span class="eyebrow" style="color: #A84E2B;">COMMERCIAL PROCUREMENT</span>
            <h2 class="section-title">Request Quotation for ${esc(p.name)}</h2>
            <p class="lede" style="margin-bottom: 1.5rem;">
              Submit your required quantity, target packaging, and destination. Our Lawrence Road commercial team reviews specifications and provides competitive wholesale pricing.
            </p>

            <div style="padding: 1.5rem; background: #F8FAFC; border: 1px solid var(--line); border-radius: 6px; font-size: 0.88rem; color: var(--slate); line-height: 1.6;">
              <p style="margin: 0 0 0.5rem;"><strong style="color: #0A1E34;">CEO &amp; Proprietor:</strong> Mr. Neeraj Monga</p>
              <p style="margin: 0 0 0.5rem;"><strong style="color: #0A1E34;">Dispatch Hub:</strong> C2/29C Lawrence Road, Keshav Puram, Delhi-110035</p>
              <p style="margin: 0 0 0.5rem;"><strong style="color: #0A1E34;">Direct Sales Desk:</strong> <a href="tel:+919810516065" style="color: #174A70; font-weight: 700;">+91 9810516065</a>, <a href="tel:+919810715129" style="color: #174A70; font-weight: 700;">9810715129</a></p>
              <p style="margin: 0 0 0.5rem;"><strong style="color: #0A1E34;">Email:</strong> <a href="mailto:info@deepaliminerals.in" style="color: #174A70; font-weight: 700;">info@deepaliminerals.in</a></p>
              <p style="margin: 0 0 0.5rem;"><strong style="color: #0A1E34;">GST Identification:</strong> 07AIMPM0458Q1ZL</p>
              <p style="margin: 0; font-size: 0.82rem; color: #15803D;"><strong>Commercial Turnaround:</strong> Inquiries reviewed same-day during IST business hours.</p>
            </div>
          </div>
          ${rfq(p, { industry: industryCtx, application: appCtx, route: routeCtx, requirementText: reqText })}
        </div>
      </section>
    `;

    bindRfq();
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
                extraInfo += `<div style="margin-top: .4rem; padding: .6rem .8rem; background: #EFF6FF; border: 1px solid #3B82F6; color: #1E40AF; font-size: .8rem; font-family: var(--sans); line-height: 1.4;"><strong>Specialty Sourced Material:</strong> ${tax.uncataloguedMaterials.map(m => `<em>${esc(m.name)}</em>`).join(', ')} — Custom formulation grades available upon technical inquiry.</div>`;
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
        if (!e.target.classList.contains('pill')) return;
        const targetInd = e.target.dataset.industry;
        if (activeIndustry === targetInd) {
          activeIndustry = 'all';
          e.target.classList.remove('active');
        } else {
          industryPills.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
          e.target.classList.add('active');
          activeIndustry = targetInd;
        }
        applyFilters();
      });
    }

    if (appQuickPills) {
      appQuickPills.addEventListener('click', e => {
        if (!e.target.classList.contains('pill')) return;
        const appTerm = e.target.dataset.app;
        if (currentSearch === appTerm) {
          currentSearch = '';
          e.target.classList.remove('active');
          if (searchInput) searchInput.value = '';
        } else {
          appQuickPills.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
          e.target.classList.add('active');
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
  initGlobalDMInteractiveLogos();

})();
