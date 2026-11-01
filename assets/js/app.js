/**
 * Deepali Minerals B2B Portal - Presentation & Dynamic Routing Controller
 * Phase 4: B2B Buyer Experience + Industry / Application Discovery
 * Preserves the exact approved Codex mineral visual design system.
 */

(function () {
  'use strict';

  // Deployment-Aware Robots Policy (Preview-Only SEO Control)
  (function applyDeploymentRobotsPolicy() {
    if (typeof window === 'undefined' || !window.location) return;
    var host = (window.location.hostname || '').toLowerCase();
    if (host === 'preview.deepaliminerals.in') {
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

            <a href="${industriesUrl}" class="${page === 'industries' ? 'active' : ''}">Industries &amp; Applications</a>
            <a href="${root}/about.html" class="${page === 'about' ? 'active' : ''}">About Deepali Minerals</a>
            <a href="${root}/about.html#quality">Quality &amp; Lab</a>
            <a href="${root}/#contact">Contact</a>
          </nav>

          <div class="header-actions">
            <a class="header-whatsapp" href="${getWhatsAppUrl()}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Sales Desk">
              ${whatsappIconSvg(15, 15)}
              <span>WhatsApp Sales Desk</span>
            </a>
            <a class="button header-cta" href="${root}/#rfq">Quotation</a>
            <button class="menu-toggle" aria-expanded="false" aria-controls="mobile-nav">Menu</button>
          </div>
        </div>

        <!-- Mobile Drawer Navigation with Accordion Submenu -->
        <nav class="shell mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
          <a href="${root}/">Home</a>
          
          <button type="button" class="mobile-nav-toggle-btn" id="mobile-products-toggle" style="display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 0.8rem 0; font-weight: 700; border: none; border-bottom: 1px solid var(--line); background: none; font-size: inherit; text-align: left; cursor: pointer; color: var(--ink);">
            <span>Products (All 22 Materials)</span>
            <span id="mobile-products-arrow">&darr;</span>
          </button>
          
          <div class="mobile-nav-submenu" id="mobile-products-submenu">
            <h4>Minerals &amp; Powders</h4>
            ${powders.map(p => `<a href="${productUrl(p)}">${esc(p.name)}</a>`).join('')}
            
            <h4>Functional Chemicals</h4>
            ${chemicals.map(p => `<a href="${productUrl(p)}">${esc(p.name)}</a>`).join('')}
            
            <h4>Grains &amp; Aggregates</h4>
            ${grains.map(p => `<a href="${productUrl(p)}">${esc(p.name)}</a>`).join('')}
            
            <a href="${productsUrl}" style="font-weight: 700; color: #174A70; margin-top: 0.5rem; display: block;">View Full 22-Product Catalogue &rarr;</a>
          </div>

          <a href="${industriesUrl}">Industries &amp; Applications</a>
          <a href="${root}/about.html">About Deepali Minerals</a>
          <a href="${root}/about.html#quality">Quality &amp; Laboratory</a>
          <a href="${root}/#contact">Contact &amp; Enquiry</a>
          
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
        const open = menu.classList.toggle('open');
        e.currentTarget.setAttribute('aria-expanded', open);
        e.currentTarget.textContent = open ? 'Close' : 'Menu';
      });
    }

    const prodToggle = document.querySelector('#mobile-products-toggle');
    if (prodToggle) {
      prodToggle.addEventListener('click', () => {
        const sub = document.querySelector('#mobile-products-submenu');
        const arrow = document.querySelector('#mobile-products-arrow');
        if (sub) {
          const expanded = sub.classList.toggle('is-expanded');
          if (arrow) arrow.innerHTML = expanded ? '&uarr;' : '&darr;';
        }
      });
    }
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
            View Details <span aria-hidden="true">&rarr;</span>
          </a>
          <a class="product-card-btn-enquire" href="${productUrl(p, industryCtx, appCtx, routeCtx)}#rfq">
            Enquire Now
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
              <label>Delivery Destination / Depot *</label>
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
    const allProducts = data.products || [];
    const industries = data.industries || [];

    document.querySelector('#main').innerHTML = `
      <!-- 1. HIGH-IMPACT INDUSTRIAL HERO SECTION -->
      <section class="exp-hero" id="hero">
        <div class="shell">
          <div class="exp-hero-inner">
            <div>
              <div class="exp-hero-estd-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>ESTD. 2004 &bull; ISO 9001:2015 &amp; ISO 14001:2015 ACCREDITED</span>
              </div>

              <h1 class="exp-hero-title">
                Precision Industrial Minerals<br>
                <span style="color: #174A70;">&amp; Functional Compounding Chemicals</span>
              </h1>

              <p class="exp-hero-lead">
                Supplying verified high-purity pulverized extenders, mineral pigments, and functional compounding ingredients to 38+ manufacturing sectors across India since 2004. Sourced through multi-regional mining partnerships and certified under strict ISO quality systems.
              </p>

              <div class="exp-hero-btn-group">
                <a href="#portfolio" class="button" style="padding: 0.85rem 1.65rem; font-size: 0.84rem;">Explore Product Portfolio &rarr;</a>
                <a href="#rfq" class="button alt" style="padding: 0.85rem 1.65rem; font-size: 0.84rem;">Request Commercial Quotation</a>
                <a href="${getWhatsAppUrl('Hello Deepali Minerals, I would like to discuss my industrial mineral requirement.')}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn" style="padding: 0.75rem 1.25rem; font-size: 0.82rem; display: inline-flex; align-items: center; gap: 0.45rem;">
                  ${whatsappIconSvg(16, 16)}
                  <span>WhatsApp Sales Desk</span>
                </a>
              </div>

              <!-- Audio Toggle for Facility Video -->
              <div style="display: flex; align-items: center; gap: 0.75rem; margin-top: 0.75rem;">
                <button
                  type="button"
                  class="button hero-sound-btn"
                  data-hero-audio-toggle="true"
                  aria-label="Toggle facility video sound"
                  aria-pressed="false"
                  title="Click to toggle facility sound"
                  style="padding: 0.4rem 0.85rem; font-size: 0.72rem; min-height: 34px;"
                >
                  <span class="hero-audio-icon" aria-hidden="true">
                    <svg class="sound-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <line x1="23" y1="9" x2="17" y2="15"></line>
                      <line x1="17" y1="9" x2="23" y2="15"></line>
                    </svg>
                  </span>
                  <span class="hero-audio-label">Facility Video Sound</span>
                </button>
                <span style="font-size: 0.74rem; font-family: var(--mono); color: var(--slate);">Click to enable industrial audio</span>
              </div>
            </div>

            <!-- Hero Facility Video Showcase Card -->
            <div class="exp-hero-media-card">
              <div class="exp-hero-video-box" data-hero-video-click="true" title="Click to toggle facility sound">
                <video
                  class="hero-video"
                  autoplay
                  muted
                  loop
                  playsinline
                  preload="metadata"
                  aria-label="Deepali Minerals industrial processing facility video"
                >
                  <source src="${root}/hero%20video%20DM%20watermark%20(1).mp4" type="video/mp4" />
                </video>
                <div class="hero-overlay"></div>
                <div class="exp-hero-overlay-badge">
                  <div>
                    <strong>Deepali Minerals Central Processing &amp; Dispatch</strong>
                    <span>Lawrence Road Depot &bull; Keshav Puram, New Delhi</span>
                  </div>
                  <div style="background: rgba(213,164,58,0.2); border: 1px solid #D5A43A; padding: 0.25rem 0.5rem; border-radius: 4px; font-family: var(--mono); font-size: 0.68rem; font-weight: 700; color: #F8DF8A;">
                    ISO AUDITED
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 4 Institutional Benchmark Counter Cards -->
          <div class="exp-hero-stats-grid">
            <div class="exp-hero-stat-card" style="border-top: 3px solid #174A70;">
              <div class="exp-stat-num">2004</div>
              <div class="exp-stat-label">Year Established</div>
              <p class="exp-stat-desc">Over two decades of continuous B2B mineral supply across India.</p>
            </div>
            <div class="exp-hero-stat-card" style="border-top: 3px solid #248C91;">
              <div class="exp-stat-num">22 Materials</div>
              <div class="exp-stat-label">Master Catalogue</div>
              <p class="exp-stat-desc">Standard pulverized powders, functional additives &amp; grains.</p>
            </div>
            <div class="exp-hero-stat-card" style="border-top: 3px solid #A84E2B;">
              <div class="exp-stat-num">38+ Sectors</div>
              <div class="exp-stat-label">Industrial Applications</div>
              <p class="exp-stat-desc">Serving paints, plastics, PVC, rubber, ceramics, paper &amp; foundry.</p>
            </div>
            <div class="exp-hero-stat-card" style="border-top: 3px solid #D5A43A;">
              <div class="exp-stat-num">ISO Certified</div>
              <div class="exp-stat-label">QMS &amp; EMS Audited</div>
              <p class="exp-stat-desc">ISO 9001:2015 Quality &amp; ISO 14001:2015 Environmental standards.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. DUAL TECHNICAL DISCOVERY ENGINE -->
      <div class="shell material-strip" id="materials" style="margin-top: 2.5rem; margin-bottom: 2.5rem;">
        <div class="discovery-engine-box">
          <div class="discovery-engine-head">
            <h2 class="discovery-title">
              <span class="dm-interactive-logo" data-dm-logo="true" style="display: inline-block; vertical-align: middle; cursor: pointer;">
                <img src="${root}/assets/images/brand/logo.png" alt="Deepali Minerals" style="height: 28px; width: auto; vertical-align: middle; margin-right: .5rem; display: inline-block; object-fit: contain; border-radius: 4px;" referrerpolicy="no-referrer" />
              </span>
              Technical Material Discovery Engine
            </h2>
            <div class="discovery-mode-nav">
              <button type="button" class="discovery-mode-btn active" id="btn-mode-guided">1. Guided Discovery</button>
              <button type="button" class="discovery-mode-btn" id="btn-mode-freetext">2. Describe Requirement</button>
            </div>
          </div>

          <!-- Mode 1: Guided Discovery -->
          <div id="panel-guided" class="discovery-panel">
            <form id="discovery-guided-form" class="discovery-grid-form">
              <div class="discovery-field-group">
                <label for="discovery-question-select">What are you looking for?</label>
                <select id="discovery-question-select">
                  <option value="material">What material do you need?</option>
                  <option value="manufacturing">What are you manufacturing?</option>
                  <option value="industry">Which industry are you in?</option>
                  <option value="application">What application is the material for?</option>
                  <option value="filler">Do you need a filler or extender?</option>
                  <option value="white">Do you need a white mineral?</option>
                  <option value="micronized">Do you need a fine/micronized powder?</option>
                  <option value="plastics">Do you need a material for plastics?</option>
                  <option value="paints">Do you need a material for paints/coatings?</option>
                  <option value="rubber">Do you need a material for rubber?</option>
                  <option value="pvc">Do you need a material for PVC?</option>
                  <option value="ceramics">Do you need a material for ceramics?</option>
                  <option value="construction">Do you need a material for construction?</option>
                  <option value="paper">Do you need a material for paper?</option>
                  <option value="custom">I have a specific requirement</option>
                </select>
              </div>

              <div class="discovery-field-group" id="discovery-dynamic-field-group">
                <label id="discovery-dynamic-label" for="discovery-dynamic-select">Select Material</label>
                <div id="discovery-dynamic-input-container">
                  <select id="discovery-dynamic-select">
                    <!-- Populated dynamically -->
                  </select>
                </div>
              </div>

              <div>
                <button type="submit" class="button" style="width: 100%;">Discover Materials</button>
              </div>
            </form>

            <div class="discovery-quick-links">
              <strong>Popular routes:</strong>
              <button type="button" class="discovery-quick-btn" data-set-q="pvc">PVC Manufacturing</button>
              <button type="button" class="discovery-quick-btn" data-set-q="paints">Paints &amp; Coatings</button>
              <button type="button" class="discovery-quick-btn" data-set-q="rubber">Rubber Compounding</button>
              <button type="button" class="discovery-quick-btn" data-set-q="white">White Minerals</button>
            </div>
          </div>

          <!-- Mode 2: Free-Text Requirement Search -->
          <div id="panel-freetext" class="discovery-panel" style="display: none;">
            <form id="discovery-freetext-form">
              <div class="discovery-field-group">
                <label for="discovery-freetext-input">Describe your requirement in natural language</label>
                <div style="display: grid; grid-template-columns: 1fr auto; gap: .75rem;">
                  <input id="discovery-freetext-input" type="text" placeholder="e.g. Need fine white mineral filler for PVC compound, or high brightness powder for wall putty..." autocomplete="off">
                  <button type="submit" class="button">Find Materials</button>
                </div>
              </div>
            </form>

            <div class="discovery-quick-links">
              <strong>Examples:</strong>
              <button type="button" class="discovery-quick-btn" data-freetext-example="White mineral powder for plastic manufacturing">"White mineral powder for plastic manufacturing"</button>
              <button type="button" class="discovery-quick-btn" data-freetext-example="Looking for mineral filler for PVC compound">"Mineral filler for PVC compound"</button>
              <button type="button" class="discovery-quick-btn" data-freetext-example="Need fine powder for paint application">"Need fine powder for paint application"</button>
            </div>
          </div>

          <!-- Discovery Results Container -->
          <div id="discovery-results" class="discovery-results-section" style="display: none;">
            <div class="discovery-results-header">
              <div>
                <span class="discovery-results-badge" id="discovery-results-badge">POTENTIALLY RELEVANT MATERIALS</span>
                <span id="discovery-results-count" style="font: 500 .75rem var(--mono); color: var(--slate); margin-left: .5rem;"></span>
              </div>
              <div class="discovery-active-criteria" id="discovery-active-criteria"></div>
            </div>

            <div class="discovery-grid" id="discovery-results-grid"></div>

            <div style="margin-top: 1.5rem; text-align: right;">
              <a href="${productsUrl}" class="text-link" id="discovery-view-all-link">View all 22 materials in full catalogue &rarr;</a>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. INSTITUTIONAL INTRODUCTION & SOURCING STRENGTHS -->
      <section style="padding: 4.5rem 0; background: #FFFFFF; border-bottom: 1px solid var(--line);">
        <div class="shell">
          <div class="institutional-split">
            <div class="institutional-visual-card">
              <span class="eyebrow" style="color: #174A70;">CORPORATE PROFILE &bull; NEW DELHI</span>
              <h3 style="font-family: var(--serif); font-size: 1.65rem; color: var(--ink); margin: 0.35rem 0 1rem;">
                Deepali Minerals Sourcing Network
              </h3>
              <p style="font-size: 0.88rem; color: var(--slate); line-height: 1.6; margin-bottom: 1.5rem;">
                Operating from our central commercial depot at <strong>Lawrence Road, Rampura / Keshav Puram, New Delhi</strong>, Deepali Minerals coordinates raw material extraction, pulverization, testing, and multi-state transport dispatches.
              </p>

              <div style="padding: 1.25rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; margin-bottom: 1.25rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <strong style="font-size: 0.95rem; color: var(--ink);">Mr. Neeraj Monga</strong>
                  <span style="font-family: var(--mono); font-size: 0.72rem; color: #174A70; font-weight: 700;">CEO &amp; PROPRIETOR</span>
                </div>
                <p style="font-size: 0.8rem; color: var(--slate); margin: 0; line-height: 1.45;">
                  Leading industrial supply and material trading since 2004 with a focus on long-term client partnerships and technical transparency.
                </p>
              </div>

              <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                <div style="display: inline-flex; align-items: center; gap: 0.4rem; font-family: var(--mono); font-size: 0.72rem; color: #174A70; background: rgba(23,74,112,0.08); padding: 0.35rem 0.65rem; border-radius: 4px; font-weight: 700;">
                  <span>ISO 9001:2015 QMS</span>
                </div>
                <div style="display: inline-flex; align-items: center; gap: 0.4rem; font-family: var(--mono); font-size: 0.72rem; color: #248C91; background: rgba(36,140,145,0.08); padding: 0.35rem 0.65rem; border-radius: 4px; font-weight: 700;">
                  <span>ISO 14001:2015 EMS</span>
                </div>
                <div style="display: inline-flex; align-items: center; gap: 0.4rem; font-family: var(--mono); font-size: 0.72rem; color: #B45309; background: #FEF3C7; padding: 0.35rem 0.65rem; border-radius: 4px; font-weight: 700;">
                  <span>GST: 07AIMPM0458Q1ZL</span>
                </div>
              </div>
            </div>

            <div>
              <span class="eyebrow" style="color: #A84E2B;">OVER TWO DECADES OF RELIABLE SUPPLY</span>
              <h2 class="section-title" style="margin-bottom: 1.25rem;">
                Bridging Mineral Mines &amp; Industrial Formulations
              </h2>
              <p class="lede" style="margin-bottom: 2rem;">
                We eliminate the uncertainty in raw material procurement by maintaining dependable mine sourcing, continuous pulverization control, and batch-wise quality documentation.
              </p>

              <div class="institutional-pillars-grid">
                <div class="inst-pillar-item" style="border-left-color: #174A70;">
                  <strong>Direct Quarry Partnerships</strong>
                  <p>Secured long-term sourcing arrangements with trusted mining zones in Rajasthan, Gujarat, and mineral corridors.</p>
                </div>
                <div class="inst-pillar-item" style="border-left-color: #248C91;">
                  <strong>Particle Size Consistency</strong>
                  <p>Micronized and pulverized grades sieved from 100 mesh up to 1250 mesh for demanding compounding.</p>
                </div>
                <div class="inst-pillar-item" style="border-left-color: #A84E2B;">
                  <strong>Lab Batch Testing</strong>
                  <p>Quality parameters including whiteness, brightness, oil absorption, and calcium carbonate content verified per batch.</p>
                </div>
                <div class="inst-pillar-item" style="border-left-color: #D5A43A;">
                  <strong>Reliable Fleet Logistics</strong>
                  <p>Strategically situated in North India for rapid full truckload (FTL) and multi-ton consignments.</p>
                </div>
              </div>

              <div style="margin-top: 2.25rem;">
                <a href="${root}/about.html" class="button alt" style="padding: 0.85rem 1.65rem;">Explore Full Corporate Profile &amp; ISO Certificates &rarr;</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. MASTER PRODUCT PORTFOLIO SHOWCASE (INTERACTIVE TABBED DISPLAY) -->
      <section class="featured" id="portfolio" style="padding: 5rem 0; background: #F8FAFC; border-bottom: 1px solid var(--line);">
        <div class="shell">
          <div class="section-head" style="margin-bottom: 1.5rem;">
            <div>
              <span class="eyebrow">MASTER CATALOGUE &bull; VERIFIED INDUSTRIAL SPECIFICATIONS</span>
              <h2 class="section-title">Industrial Raw Material Portfolio</h2>
            </div>
            <p class="lede">Explore all 22 catalogued non-metallic minerals, pulverized extenders, and functional additives with verified photography.</p>
          </div>

          <!-- Product Category Filter Tabs -->
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

          <div style="margin-top: 2.5rem; text-align: center;">
            <a href="${productsUrl}" class="button" style="padding: 0.85rem 2rem;">Open Master Product Directory &rarr;</a>
          </div>
        </div>
      </section>

      <!-- 5. INDUSTRY APPLICATIONS 8-CARD MATRIX -->
      <section id="industries" style="padding: 5rem 0; background: #FFFFFF; border-bottom: 1px solid var(--line);">
        <div class="shell">
          <div class="section-head">
            <div>
              <span class="eyebrow">APPLICATION DISCOVERY &bull; 38 INDUSTRIAL SECTORS</span>
              <h2 class="section-title">Discover Materials by Industry Application</h2>
            </div>
            <p class="lede">Every manufacturing formulation demands specific chemical purity, brightness, and particle size distribution.</p>
          </div>

          <div class="industry-matrix-grid">
            <!-- Sector 1: Paints & Coatings -->
            <div class="industry-matrix-card">
              <div>
                <div class="ind-matrix-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/><path d="M9 8c-2 3-4 3.5-7 4l8 8c.5-3 1-5 4-7"/><path d="M14.5 17.5 4.5 7.5"/></svg>
                </div>
                <h3 class="ind-matrix-title">Paints &amp; Coatings</h3>
                <p class="ind-matrix-desc">High-opacity extenders, scrub-resistant fillers, and white brightness enhancers for architectural and industrial paints.</p>
                <div class="ind-matrix-minerals-list">
                  <span class="ind-matrix-mineral-pill">Talc Powder</span>
                  <span class="ind-matrix-mineral-pill">Calcium Carbonate</span>
                  <span class="ind-matrix-mineral-pill">China Clay</span>
                  <span class="ind-matrix-mineral-pill">Titanium Dioxide</span>
                  <span class="ind-matrix-mineral-pill">Barytes</span>
                </div>
              </div>
              <a href="${productsUrl}?industry=Paints" class="ind-matrix-action">View Matching Minerals &rarr;</a>
            </div>

            <!-- Sector 2: Plastics & Masterbatch -->
            <div class="industry-matrix-card">
              <div>
                <div class="ind-matrix-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                </div>
                <h3 class="ind-matrix-title">Plastics &amp; Masterbatch</h3>
                <p class="ind-matrix-desc">Surface-treated functional extenders and white color concentrates for injection moulding, film blowing, and masterbatch.</p>
                <div class="ind-matrix-minerals-list">
                  <span class="ind-matrix-mineral-pill">Calcite Powder</span>
                  <span class="ind-matrix-mineral-pill">Talc (Micro)</span>
                  <span class="ind-matrix-mineral-pill">Zinc Stearate</span>
                  <span class="ind-matrix-mineral-pill">Titanium Dioxide</span>
                </div>
              </div>
              <a href="${productsUrl}?industry=Plastic" class="ind-matrix-action">View Matching Minerals &rarr;</a>
            </div>

            <!-- Sector 3: Rubber & Tyres -->
            <div class="industry-matrix-card">
              <div>
                <div class="ind-matrix-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></svg>
                </div>
                <h3 class="ind-matrix-title">Rubber &amp; Elastomers</h3>
                <p class="ind-matrix-desc">Vulcanization activators, anti-blocking dusting agents, and reinforcing fillers for automotive rubber goods and soles.</p>
                <div class="ind-matrix-minerals-list">
                  <span class="ind-matrix-mineral-pill">Zinc Oxide (Active)</span>
                  <span class="ind-matrix-mineral-pill">Magnesium Carbonate</span>
                  <span class="ind-matrix-mineral-pill">Barytes</span>
                  <span class="ind-matrix-mineral-pill">French Chalk</span>
                </div>
              </div>
              <a href="${productsUrl}?industry=Rubber" class="ind-matrix-action">View Matching Minerals &rarr;</a>
            </div>

            <!-- Sector 4: PVC Compounding -->
            <div class="industry-matrix-card">
              <div>
                <div class="ind-matrix-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 12h10"/><path d="M12 7v10"/></svg>
                </div>
                <h3 class="ind-matrix-title">Rigid &amp; Flexible PVC</h3>
                <p class="ind-matrix-desc">Impact modifiers, cost-reducing mineral extenders, and thermal stabilizers for PVC pipes, conduits, and profiles.</p>
                <div class="ind-matrix-minerals-list">
                  <span class="ind-matrix-mineral-pill">Calcium Carbonate</span>
                  <span class="ind-matrix-mineral-pill">Zinc Stearate</span>
                  <span class="ind-matrix-mineral-pill">Talc Powder</span>
                  <span class="ind-matrix-mineral-pill">Hydrated Lime</span>
                </div>
              </div>
              <a href="${industriesUrl}?industry=plastics-polymers" class="ind-matrix-action">View Matching Minerals &rarr;</a>
            </div>

            <!-- Sector 5: Ceramics & Glass -->
            <div class="industry-matrix-card">
              <div>
                <div class="ind-matrix-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                </div>
                <h3 class="ind-matrix-title">Ceramics, Glass &amp; Sanitary</h3>
                <p class="ind-matrix-desc">High-silica minerals, refractory fluxes, and plastic clays for sanitaryware, glazes, ceramic tiles, and float glass.</p>
                <div class="ind-matrix-minerals-list">
                  <span class="ind-matrix-mineral-pill">Quartz Powder</span>
                  <span class="ind-matrix-mineral-pill">Silica Sand</span>
                  <span class="ind-matrix-mineral-pill">Dolomite Powder</span>
                  <span class="ind-matrix-mineral-pill">China Clay</span>
                </div>
              </div>
              <a href="${productsUrl}?industry=Ceramics" class="ind-matrix-action">View Matching Minerals &rarr;</a>
            </div>

            <!-- Sector 6: Paper & Board Mills -->
            <div class="industry-matrix-card">
              <div>
                <div class="ind-matrix-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <h3 class="ind-matrix-title">Paper &amp; Pulp Mills</h3>
                <p class="ind-matrix-desc">Pitch control talcs, surface coating clays, and corrugation adhesive starches for paperboard and printing stock.</p>
                <div class="ind-matrix-minerals-list">
                  <span class="ind-matrix-mineral-pill">Levigated China Clay</span>
                  <span class="ind-matrix-mineral-pill">Talc Powder</span>
                  <span class="ind-matrix-mineral-pill">Maize Starch</span>
                  <span class="ind-matrix-mineral-pill">Calcium Carbonate</span>
                </div>
              </div>
              <a href="${productsUrl}?industry=Paper" class="ind-matrix-action">View Matching Minerals &rarr;</a>
            </div>

            <!-- Sector 7: Wall Putty & Construction -->
            <div class="industry-matrix-card">
              <div>
                <div class="ind-matrix-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                </div>
                <h3 class="ind-matrix-title">Wall Putty &amp; Construction</h3>
                <p class="ind-matrix-desc">High whiteness calcite, fine dolomite, and natural chalk powder for polymer wall putty, dry-mix mortars, and grouts.</p>
                <div class="ind-matrix-minerals-list">
                  <span class="ind-matrix-mineral-pill">Dolomite Powder</span>
                  <span class="ind-matrix-mineral-pill">Chalk Powder</span>
                  <span class="ind-matrix-mineral-pill">Marble Powder</span>
                  <span class="ind-matrix-mineral-pill">Hydrated Lime</span>
                </div>
              </div>
              <a href="${industriesUrl}?industry=wall-putty-nc-putty" class="ind-matrix-action">View Matching Minerals &rarr;</a>
            </div>

            <!-- Sector 8: Foundry & Metallurgy -->
            <div class="industry-matrix-card">
              <div>
                <div class="ind-matrix-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <h3 class="ind-matrix-title">Foundry, Steel &amp; Refractory</h3>
                <p class="ind-matrix-desc">High-fusion silica sand, metallurgical fluxing lime, and refractory dusting powders for metal casting and core moulds.</p>
                <div class="ind-matrix-minerals-list">
                  <span class="ind-matrix-mineral-pill">Silica Sand (Graded)</span>
                  <span class="ind-matrix-mineral-pill">Hydrated Lime</span>
                  <span class="ind-matrix-mineral-pill">French Chalk</span>
                  <span class="ind-matrix-mineral-pill">Soap Stone</span>
                </div>
              </div>
              <a href="${industriesUrl}?industry=foundry-industrial" class="ind-matrix-action">View Matching Minerals &rarr;</a>
            </div>
          </div>

          <div style="margin-top: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <a href="${industriesUrl}" class="button alt">Explore All 38 Manufacturing Sectors Directory &rarr;</a>
            <a href="${productsUrl}" class="text-link">View Full 22-Product Catalogue &rarr;</a>
          </div>
        </div>
      </section>

      <!-- 6. QUALITY ASSURANCE, LAB TESTING & INFRASTRUCTURE -->
      <section id="quality-assurance" style="padding: 5rem 0; background: #F8FAFC; border-bottom: 1px solid var(--line);">
        <div class="shell">
          <div class="section-head">
            <div>
              <span class="eyebrow">ACCREDITED QUALITY CONTROL &bull; ISO 9001:2015 &amp; ISO 14001:2015</span>
              <h2 class="section-title">Institutional Quality Assurance &amp; Logistics</h2>
            </div>
            <p class="lede">Our quality framework ensures every consignment strictly complies with approved mesh, brightness, and purity parameters.</p>
          </div>

          <!-- 5-Step QA Process Diagram -->
          <div class="about-process-infographic">
            <div class="about-process-step">
              <div class="about-step-badge">01</div>
              <div>
                <h4 class="about-step-title">Mine Quarry Sourcing</h4>
                <p class="about-step-desc">Direct selection of raw non-metallic mineral ore chunks from audited mining pits.</p>
              </div>
            </div>

            <div class="about-process-step">
              <div class="about-step-badge">02</div>
              <div>
                <h4 class="about-step-title">Pulverizing &amp; Sifting</h4>
                <p class="about-step-desc">Controlled milling and multi-deck air-classification from 100 mesh up to 1250 mesh.</p>
              </div>
            </div>

            <div class="about-process-step">
              <div class="about-step-badge">03</div>
              <div>
                <h4 class="about-step-title">Laboratory Assay</h4>
                <p class="about-step-desc">Batch verification for whiteness, brightness, moisture, oil absorption, and CaCO3 assay.</p>
              </div>
            </div>

            <div class="about-process-step">
              <div class="about-step-badge">04</div>
              <div>
                <h4 class="about-step-title">Moisture Sealing</h4>
                <p class="about-step-desc">Sealed packaging in 25kg / 50kg HDPE laminated bags or 1-Ton FIBC Jumbo bags.</p>
              </div>
            </div>

            <div class="about-process-step">
              <div class="about-step-badge">05</div>
              <div>
                <h4 class="about-step-title">Dispatch with COA</h4>
                <p class="about-step-desc">Full consignment dispatch accompanied by formal Certificate of Analysis and TDS records.</p>
              </div>
            </div>
          </div>

          <!-- 4 Operational & Packaging Capabilities -->
          <div class="qa-infra-grid">
            <div class="qa-infra-card">
              <div class="qa-infra-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              </div>
              <h4 class="qa-infra-title">Custom Mesh Grinding</h4>
              <p class="qa-infra-desc">Custom pulverized powders calibrated to exact customer mesh requirements (100 to 1250 Mesh) with minimal oversize residue.</p>
            </div>

            <div class="qa-infra-card">
              <div class="qa-infra-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              </div>
              <h4 class="qa-infra-title">Industrial Packaging</h4>
              <p class="qa-infra-desc">Moisture-resistant 25kg &amp; 50kg PP/HDPE woven sacks, palletized shrink-wrapped units, and heavy-duty 1-Ton FIBC Jumbo bags.</p>
            </div>

            <div class="qa-infra-card">
              <div class="qa-infra-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <h4 class="qa-infra-title">Central Lawrence Rd Depot</h4>
              <p class="qa-infra-desc">Strategic warehousing facility at Lawrence Road Industrial Area, New Delhi for prompt order turnaround and sample dispatch.</p>
            </div>

            <div class="qa-infra-card">
              <div class="qa-infra-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              </div>
              <h4 class="qa-infra-title">Pan-India Freight Logistics</h4>
              <p class="qa-infra-desc">Reliable logistics network enabling full truckload (FTL) and partial consignment transit across Northern, Central and Western industrial hubs.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. BUSINESS STRENGTHS / WHY DEEPALI MINERALS -->
      <section class="why" id="why" style="padding: 5rem 0;">
        <div class="shell">
          <div class="section-head" style="margin-bottom: 2rem;">
            <div>
              <span class="eyebrow" style="color: #D5A43A;">WHY PARTNER WITH DEEPALI MINERALS</span>
              <h2 class="section-title" style="color: #FFFFFF;">Built on Commercial Reliability &amp; Technical Consistency</h2>
            </div>
            <p class="lede" style="color: #94A3B8;">Direct mine linkages, custom particle sizing, and auditable batch quality parameters eliminate production disruptions.</p>
          </div>
          
          <div class="why-grid">
            <article class="why-card">
              <b>01 / Experience</b>
              <h3>Established Since 2004</h3>
              <p>Over two decades of continuous commercial trading and industrial mineral distribution serving tier-1 manufacturing clients across India.</p>
            </article>

            <article class="why-card">
              <b>02 / Compliance</b>
              <h3>Audited ISO Systems</h3>
              <p>Dual accredited under ISO 9001:2015 (Quality) and ISO 14001:2015 (Environmental Management) ensuring auditable operating standards.</p>
            </article>

            <article class="why-card">
              <b>03 / Particle Precision</b>
              <h3>Custom 100–1250 Mesh</h3>
              <p>Calibrated air-classification and milling matching exact particle size distribution and whiteness requirements for demanding formulations.</p>
            </article>

            <article class="why-card">
              <b>04 / Strategic Hub</b>
              <h3>Lawrence Rd Depot &amp; Fleet</h3>
              <p>Equipped with central buffer warehousing in Delhi NCT, sample dispatch capability, and pan-India full-truckload (FTL) transport coordination.</p>
            </article>
          </div>
        </div>
      </section>

      <!-- 8. DIRECT COMMERCIAL B2B RFQ SECTION -->
      <section style="padding: 4.5rem 0; background: #FFFFFF;">
        <div class="shell detail-grid">
          <div>
            <span class="eyebrow" style="color: #174A70;">COMMERCIAL SOURCING DESK</span>
            <h2 class="section-title">Request B2B Quotation &amp; Samples</h2>
            <p class="lede">Submit your required mineral, target volume, and delivery destination for direct wholesale pricing and technical sample dispatch.</p>
            
            <div style="margin-top: 2rem; padding: 1.5rem; background: var(--fog); border: 1px solid var(--line); border-radius: 6px;">
              <span style="font-family: var(--mono); font-size: 0.72rem; text-transform: uppercase; color: var(--slate); display: block; margin-bottom: 0.35rem;">Central Corporate Depot</span>
              <p style="font-size: 0.92rem; color: var(--ink); margin: 0 0 1rem; line-height: 1.5; font-weight: 600;">
                Deepali Minerals<br>
                C-2/29 C Lawrence Road, Rampura / Keshav Puram,<br>
                New Delhi – 110035, India
              </p>

              <div style="font-size: 0.88rem; color: var(--slate); line-height: 1.6;">
                <strong>CEO:</strong> Mr. Neeraj Monga<br>
                <strong>Direct Sales Helplines:</strong> <a href="tel:+919810516065" style="color: #174A70; font-weight: 700;">+91 9810516065</a>, <a href="tel:+919810715129" style="color: #174A70; font-weight: 700;">9810715129</a><br>
                <strong>Email:</strong> <a href="mailto:info@deepaliminerals.in" style="color: #174A70; font-weight: 700;">info@deepaliminerals.in</a><br>
                <strong>GST Identification:</strong> 07AIMPM0458Q1ZL
              </div>
            </div>
          </div>
          ${rfq()}
        </div>
      </section>
    `;

    bindDiscoveryEngine();
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
    const soundCard = document.querySelector('.hero-sound-card');
    const volumeSlider = document.querySelector('.hero-volume-slider');
    const volumeLabel = document.querySelector('.hero-volume-label');
    const videoWrap = document.querySelector('[data-hero-video-click]');
    if (!video || !toggleBtns.length) return;

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
      toggleBtns.forEach(btn => {
        btn.setAttribute('aria-pressed', (!isMuted).toString());
        btn.classList.toggle('is-active', !isMuted);

        const iconEl = btn.querySelector('.hero-audio-icon');
        if (iconEl) {
          iconEl.innerHTML = isMuted ? mutedSvg : playingSvg;
        }

        const labelEl = btn.querySelector('.hero-audio-label');
        if (labelEl) {
          const isPill = btn.classList.contains('hero-sound-pill');
          if (isPill) {
            labelEl.textContent = isMuted ? 'Play Video Sound' : 'Sound On (Mute)';
          } else {
            labelEl.textContent = isMuted ? 'Play Video Sound' : 'Mute Video Sound';
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

    const toggleAudio = () => {
      if (video.muted) {
        video.muted = false;
        if (!video.volume || video.volume < 0.1) {
          video.volume = 1.0;
        }
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
        syncUI(false);
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
        // Toggle if user clicks video area directly
        if (!e.target.closest('button, a, input, select, textarea, form')) {
          toggleAudio();
        }
      });
    }

    video.addEventListener('volumechange', () => {
      syncUI(video.muted);
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
    document.title = `${ind.name} Raw Minerals & Compounding Materials | Deepali Minerals`;

    // Dynamic Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = `Discover verified industrial minerals for ${ind.name}. Deepali Minerals supplies high-whiteness extenders, functional fillers, and raw materials from Delhi with ISO certified quality.`;

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
      "url": `https://deepaliminerals.in/industries/?industry=${ind.slug}`,
      "mainEntity": {
        "@type": "ItemList",
        "name": `Industrial Minerals for ${ind.name}`,
        "numberOfItems": ind.products.length,
        "itemListElement": ind.products.map((p, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": p.name,
          "url": `https://deepaliminerals.in/product.html?product=${p.slug}`
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
              <p style="margin: 0 0 0.5rem;"><strong>Central Dispatch Depot:</strong> C2/29C Lawrence Road, Keshav Puram, Delhi-110035</p>
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
    document.title = `Industries & Manufacturing Applications | Deepali Minerals`;

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

    // Set SEO Meta
    document.title = 'Industrial Minerals & Chemicals Master Catalogue | Deepali Minerals';
    const metaDescEl = document.querySelector('meta[name="description"]');
    if (metaDescEl) {
      metaDescEl.setAttribute('content', 'Explore all 22 industrial minerals, pulverized powders, and functional chemicals from Deepali Minerals. Filter by category, manufacturing sector, or application.');
    }

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
            <span>Lawrence Road, Delhi Central Depot</span>
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

    // SEO Dynamic Update
    document.title = `${p.name} - Technical Specifications & B2B Supply | Deepali Minerals`;
    const metaDescEl = document.querySelector('meta[name="description"]');
    if (metaDescEl) {
      metaDescEl.setAttribute('content', `${p.name} technical specifications, manufacturing applications, mesh classification, and B2B wholesale pricing from Deepali Minerals, Delhi.`);
    }
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', `https://deepaliminerals.in/product.html?product=${p.slug}`);

    // Dynamic Schema.org Product Structured Data
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
      "image": "https://deepaliminerals.in" + resolveProductImg(p.image),
      "description": p.description || p.shortDescription,
      "category": p.category,
      "brand": {
        "@type": "Brand",
        "name": "Deepali Minerals"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "Deepali Minerals",
        "url": "https://deepaliminerals.in",
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
                  <span class="product-spec-quick-label">Central Depot</span>
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
