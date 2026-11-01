// Script to update industries implementation in assets/js/app.js
const fs = require('fs');
const path = require('path');

const appFilePath = path.join(__dirname, '../assets/js/app.js');
let appContent = fs.readFileSync(appFilePath, 'utf8');

// 1. Icon Helper function to insert before industries()
const iconHelperCode = `
  /* =========================================================================
   * PHASE 3: INDUSTRY SVG ICON HELPER (18 CANONICAL SECTORS)
   * ========================================================================= */
  function getIndustryIconSvg(slug, size) {
    const s = size || 22;
    switch (slug) {
      case 'paints-coatings':
        return \`<svg width="\${s}" height="\${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/><path d="M9 8c-2 3-4 3.5-7 4l8 8c.5-3 1-5 4-7"/><path d="M14.5 17.5 4.5 7.5"/></svg>\`;
      case 'plastics-polymers':
        return \`<svg width="\${s}" height="\${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>\`;
      case 'rubber-footwear':
        return \`<svg width="\${s}" height="\${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></svg>\`;
      case 'construction-building-materials':
        return \`<svg width="\${s}" height="\${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="22.01"/><line x1="15" y1="22" x2="15" y2="22.01"/><line x1="9" y1="18" x2="9" y2="18.01"/><line x1="15" y1="18" x2="15" y2="18.01"/><line x1="9" y1="14" x2="9" y2="14.01"/><line x1="15" y1="14" x2="15" y2="14.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/></svg>\`;
      case 'ceramics':
        return \`<svg width="\${s}" height="\${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>\`;
      case 'paper-stationery':
        return \`<svg width="\${s}" height="\${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>\`;
      case 'frp-composites':
        return \`<svg width="\${s}" height="\${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>\`;
      case 'agriculture-allied':
        return \`<svg width="\${s}" height="\${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22h20"/><path d="M12 2v20"/><path d="M12 7c-4 0-7 3-7 7v8"/><path d="M12 7c4 0 7 3 7 7v8"/></svg>\`;
      case 'detergents-household':
        return \`<svg width="\${s}" height="\${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>\`;
      case 'foundry-industrial':
        return \`<svg width="\${s}" height="\${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>\`;
      case 'plywood':
        return \`<svg width="\${s}" height="\${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>\`;
      case 'wall-putty-nc-putty':
        return \`<svg width="\${s}" height="\${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 11-6 6v3h3l6-6"/><path d="m22 2-6 6"/><path d="M13 13 4 4"/><circle cx="18" cy="6" r="3"/></svg>\`;
      case 'fibre-murti':
        return \`<svg width="\${s}" height="\${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 2 18 2 22 7 12 22 2 7 6 2"/><line x1="2" y1="7" x2="22" y2="7"/><line x1="12" y1="22" x2="12" y2="7"/></svg>\`;
      case 'gulal-rangoli':
        return \`<svg width="\${s}" height="\${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>\`;
      case 'tile-adhesives':
        return \`<svg width="\${s}" height="\${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>\`;
      case 'cattle-feed':
        return \`<svg width="\${s}" height="\${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>\`;
      case 'fire-safety':
        return \`<svg width="\${s}" height="\${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>\`;
      case 'gym-powder':
        return \`<svg width="\${s}" height="\${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>\`;
      default:
        return \`<svg width="\${s}" height="\${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>\`;
    }
  }
`;

// 2. Full Phase 3 industries() replacement code
const newIndustriesCode = `
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
    document.title = \`\${ind.name} Raw Minerals & Compounding Materials | Deepali Minerals\`;

    // Dynamic Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = \`Discover verified industrial minerals for \${ind.name}. Deepali Minerals supplies high-whiteness extenders, functional fillers, and raw materials from Delhi with ISO certified quality.\`;

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
      "name": \`\${ind.name} Minerals — Deepali Minerals\`,
      "description": ind.description,
      "url": \`https://deepaliminerals.in/industries/?industry=\${ind.slug}\`,
      "mainEntity": {
        "@type": "ItemList",
        "name": \`Industrial Minerals for \${ind.name}\`,
        "numberOfItems": ind.products.length,
        "itemListElement": ind.products.map((p, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": p.name,
          "url": \`https://deepaliminerals.in/product.html?product=\${p.slug}\`
        }))
      }
    };
    schemaScript.textContent = JSON.stringify(schemaData);

    const waIndustryUrl = \`https://wa.me/\${(data.company.whatsappNumber || '919810516065').replace(/[^0-9]/g, '')}?text=\${encodeURIComponent(ind.whatsappPrefill || \`Hello Deepali Minerals, I would like to enquire about mineral materials for \${ind.name}.\`)}\`;

    const otherSectors = allIndustries.filter(other => other.slug !== ind.slug);

    mainEl.innerHTML = \`
      <!-- 1. INDUSTRY DETAIL HERO BANNER -->
      <section class="industry-detail-hero">
        <div class="shell">
          <!-- Breadcrumb Navigation Bar -->
          <div class="industry-breadcrumb-bar">
            <div class="industry-breadcrumb-links">
              <a href="\${root}/">Home</a>
              <span>/</span>
              <a href="\${industriesUrl}">Industries</a>
              <span>/</span>
              <span style="color: #D5A43A; font-weight: 700;">\${esc(ind.name)}</span>
            </div>
            <a href="\${industriesUrl}" class="industry-back-all-btn">
              &larr; View All 18 Industries
            </a>
          </div>

          <!-- Header Grid: Title + Sourcing Profile Box -->
          <div class="industry-detail-header-grid">
            <div>
              <span class="industry-hub-badge">
                \${getIndustryIconSvg(ind.slug, 16)}
                <span>\${esc(ind.badge)} &bull; \${ind.products.length} VERIFIED MINERAL GRADES</span>
              </span>

              <h1 class="industry-detail-title">\${esc(ind.name)}</h1>
              <div class="industry-detail-subtitle">\${esc(ind.subtitle)}</div>
              <p class="industry-detail-desc">\${esc(ind.description)}</p>

              <div class="industry-detail-actions">
                <a href="#industry-rfq" class="button" style="padding: 0.85rem 1.65rem;">
                  Submit Procurement RFQ &darr;
                </a>
                <a href="\${waIndustryUrl}" target="_blank" rel="noopener noreferrer" class="canonical-btn-wa" style="padding: 0.85rem 1.35rem; font-size: 0.82rem;">
                  \${whatsappIconSvg(18, 18)}
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
                  <span class="industry-procure-val">\${ind.products.length} Verified Minerals</span>
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
      \${ind.regulatoryNotice ? \`
        <section style="background: #FFFFFF; padding: 1.5rem 0 0;">
          <div class="shell">
            <div class="industry-regulatory-alert \${ind.id === 'cattle-feed' ? 'critical' : ''}">
              <div class="industry-regulatory-head">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span>\${ind.id === 'cattle-feed' ? 'MANDATORY REGULATORY COMPLIANCE NOTICE: LIVESTOCK FEED & PREMIXES' : (ind.id === 'fire-safety' ? 'TECHNICAL GOVERNANCE NOTICE: FLAME RETARDANCY & CABLE COMPOUNDING' : (ind.id === 'agriculture-allied' ? 'COMMERCIAL NOTICE: TECHNICAL & AGRICULTURAL GRADE BLENDING' : (ind.id === 'gulal-rangoli' ? 'FORMULATION NOTICE: COSMETIC COMPLIANCE & SKIN CONTACT' : 'APPLICATION ADVISORY: ATHLETIC CHALK & GRIP COMPOUNDS')))}</span>
              </div>
              <div class="industry-regulatory-body">
                \${esc(ind.regulatoryNotice)}
              </div>
            </div>
          </div>
        </section>
      \` : ''}

      <!-- 3. MATCHED VERIFIED MINERALS (PRODUCT LISTINGS GRID) -->
      <section style="padding: 4rem 0 3.5rem; background: #F8FAFC; border-bottom: 1px solid var(--line);">
        <div class="shell">
          <div class="section-head" style="margin-bottom: 2rem;">
            <div>
              <span class="eyebrow" style="color: #A84E2B;">VERIFIED RAW MATERIAL PORTFOLIO (\${ind.products.length} PRODUCTS)</span>
              <h2 class="section-title">Mineral Extenders, Fillers &amp; Additives for \${esc(ind.name)}</h2>
            </div>
            <p class="lede">Review all catalogued industrial minerals verified for \${esc(ind.name)} compounding, batch processing, and functional formulations.</p>
          </div>

          <div class="industry-products-deck">
            \${ind.products.map(p => {
              const meshTag = (p.specifications && p.specifications.mesh && p.specifications.mesh !== 'N/A') ? p.specifications.mesh : '300 to 1250 Mesh Available';
              const roleText = (ind.productRoles && ind.productRoles[p.slug]) ? ind.productRoles[p.slug] : p.shortDescription;
              const prodWaUrl = \`https://wa.me/\${(data.company.whatsappNumber || '919810516065').replace(/[^0-9]/g, '')}?text=\${encodeURIComponent(\`Hello Deepali Minerals, I would like to enquire about \${p.name} for \${ind.name}. My required specifications and volume: \`)}\`;
              return \`
                <article class="industry-product-card">
                  <div class="industry-product-img-wrap">
                    <img src="\${p.image}" alt="\${esc(p.name)} for \${esc(ind.name)}" class="industry-product-img" loading="lazy" />
                    <span class="industry-product-badge-float">\${esc(meshTag)}</span>
                  </div>

                  <div class="industry-product-body">
                    <span class="industry-product-cat">\${esc(p.category)}</span>
                    <h3 class="industry-product-name">\${esc(p.name)}</h3>

                    <div class="industry-product-role-highlight">
                      <span class="industry-product-role-label">Compounding Role in \${esc(ind.name)}:</span>
                      <p class="industry-product-role-text">\${esc(roleText)}</p>
                    </div>

                    <div style="font-size: 0.82rem; color: #64748B; margin-bottom: 1rem; line-height: 1.45;">
                      \${esc(p.shortDescription)}
                    </div>

                    <div class="industry-product-actions">
                      <a href="\${productUrl(p, ind.slug)}" class="canonical-btn-primary">
                        View Details &rarr;
                      </a>
                      <button type="button" class="canonical-btn-rfq" onclick="prefillIndustryRfq('\${esc(ind.name)}', '[Product: \${esc(p.name)}] Required specification: ; Estimated volume: ')">
                        Enquire Now
                      </button>
                      <a href="\${prodWaUrl}" target="_blank" rel="noopener noreferrer" class="canonical-btn-wa" title="WhatsApp Enquiry for \${esc(p.name)}">
                        \${whatsappIconSvg(13, 13)}
                        <span>WA</span>
                      </a>
                    </div>
                  </div>
                </article>
              \`;
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
                <div class="canonical-card-icon-box">\${getIndustryIconSvg(ind.slug, 20)}</div>
                <h3 class="industry-technical-title">Key Formulation Sub-Sectors</h3>
              </div>
              <ul class="industry-feature-list">
                \${(ind.keyApplications || []).map(app => \`
                  <li class="industry-feature-item">
                    <span class="industry-feature-bullet">&#10003;</span>
                    <span>\${esc(app)}</span>
                  </li>
                \`).join('')}
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
                \${(ind.technicalHighlights || []).map(high => \`
                  <li class="industry-feature-item">
                    <span class="industry-feature-bullet">&#10003;</span>
                    <span>\${esc(high)}</span>
                  </li>
                \`).join('')}
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
            <h2 class="section-title">Request Quotation &amp; Material Samples for \${esc(ind.name)}</h2>
            <p class="lede">Our technical commercial desk handles custom particle gradations, bulk truckload deliveries, and specialized packaging for high-throughput manufacturing plants.</p>
            
            <div style="margin-top: 2rem; font-size: 0.9rem; color: #475569; line-height: 1.65; background: #FFFFFF; border: 1px solid var(--line); border-radius: 6px; padding: 1.5rem;">
              <p style="margin: 0 0 0.5rem;"><strong>CEO Desk:</strong> Mr. Neeraj Monga</p>
              <p style="margin: 0 0 0.5rem;"><strong>Direct Commercial Hotline:</strong> <a href="tel:+919810516065" style="color: #174A70; font-weight: 700;">+91 9810516065</a> / <a href="tel:+919810715129" style="color: #174A70; font-weight: 700;">+91 9810715129</a></p>
              <p style="margin: 0 0 0.5rem;"><strong>Sales Email:</strong> <a href="mailto:info@deepaliminerals.in" style="color: #174A70;">info@deepaliminerals.in</a></p>
              <p style="margin: 0 0 0.5rem;"><strong>Central Dispatch Depot:</strong> C2/29C Lawrence Road, Keshav Puram, Delhi-110035</p>
              <p style="margin: 0;"><strong>GST Registration:</strong> 07AIMPM0458Q1ZL</p>
            </div>

            <div style="margin-top: 1.5rem;">
              <a href="\${waIndustryUrl}" target="_blank" rel="noopener noreferrer" class="canonical-btn-wa" style="padding: 0.85rem 1.65rem; font-size: 0.88rem;">
                \${whatsappIconSvg(18, 18)}
                <span>Chat Instantly on WhatsApp Regarding \${esc(ind.name)}</span>
              </a>
            </div>
          </div>

          <div>
            \${rfq(null, { industry: ind.name, notes: ind.defaultNotes })}
          </div>
        </div>
      </section>

      <!-- 6. EXPLORE OTHER MANUFACTURING SECTORS (17) -->
      <section style="background: #FFFFFF; padding: 3.5rem 0 4.5rem;">
        <div class="shell">
          <div class="other-industries-box">
            <span class="eyebrow" style="color: #174A70;">CENTRALIZED APPLICATION DIRECTORY</span>
            <h3 class="other-industries-title">Explore Other Manufacturing Sectors (\${otherSectors.length})</h3>
            <p style="font-size: 0.88rem; color: #64748B; margin: 0 0 1rem;">Seamlessly browse mineral raw material specifications mapped to other manufacturing processes.</p>

            <div class="other-industries-pills">
              \${otherSectors.map(other => \`
                <a href="\${industriesUrl}?industry=\${encodeURIComponent(other.slug)}" class="other-industry-pill" title="\${esc(other.subtitle)}">
                  \${esc(other.name)} (\${other.products.length})
                </a>
              \`).join('')}
            </div>
          </div>
        </div>
      </section>
    \`;

    bindRfq();
    initBackToTop();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  /* -------------------------------------------------------------------------
   * ALL 18 CANONICAL INDUSTRIES DISCOVERY HUB
   * ------------------------------------------------------------------------- */
  function renderIndustryDiscoveryHub(mainEl, allIndustries) {
    document.title = \`Industries & Manufacturing Applications | Deepali Minerals\`;

    mainEl.innerHTML = \`
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
                Showing <span id="visible-sector-count" style="font-weight: 800; color: #0A1E34;">\${allIndustries.length}</span> of \${allIndustries.length} Sectors
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
            \${allIndustries.map((ind, idx) => {
              const waUrl = \`https://wa.me/\${(data.company.whatsappNumber || '919810516065').replace(/[^0-9]/g, '')}?text=\${encodeURIComponent(ind.whatsappPrefill || \`Hello Deepali Minerals, I would like to enquire about mineral materials for \${ind.name}.\`)}\`;
              
              // Group classification
              let group = 'specialty';
              if (['paints-coatings', 'construction-building-materials', 'wall-putty-nc-putty', 'tile-adhesives'].includes(ind.slug)) group = 'coatings';
              else if (['plastics-polymers', 'rubber-footwear', 'frp-composites'].includes(ind.slug)) group = 'polymers';
              else if (['ceramics', 'foundry-industrial'].includes(ind.slug)) group = 'ceramics';

              return \`
                <article class="canonical-industry-card" data-slug="\${ind.slug}" data-name="\${esc(ind.name.toLowerCase())}" data-group="\${group}" data-materials="\${esc(ind.products.map(p => p.name.toLowerCase()).join(' '))}">
                  <div>
                    <div class="canonical-card-header">
                      <div class="canonical-card-icon-box">
                        \${getIndustryIconSvg(ind.slug, 22)}
                      </div>
                      <span class="canonical-card-index">SECTOR \${String(idx + 1).padStart(2, '0')} / 18</span>
                    </div>

                    <span class="canonical-card-badge">\${esc(ind.badge)}</span>
                    <h3 class="canonical-card-title">\${esc(ind.name)}</h3>
                    <div class="canonical-card-subtitle">\${esc(ind.subtitle)}</div>
                    <p class="canonical-card-desc">\${esc(ind.description)}</p>

                    <!-- Regulatory Caution Pill if applicable -->
                    \${ind.regulatoryNotice ? \`
                      <div style="margin: 0.65rem 0 0.85rem; padding: 0.45rem 0.65rem; background: #FFFBEB; border: 1px solid #FDE68A; border-left: 3px solid #D97706; font-size: 0.72rem; line-height: 1.35; color: #92400E; border-radius: 0 4px 4px 0;">
                        <strong>Notice:</strong> \${ind.id === 'cattle-feed' ? 'Mandatory feed-grade qualification required.' : (ind.id === 'fire-safety' ? 'Finished fire ratings formulation dependent.' : 'Technical specification qualification required.')}
                      </div>
                    \` : ''}

                    <!-- Matched Minerals Box -->
                    <div class="canonical-card-minerals-wrap">
                      <div class="canonical-card-minerals-head">
                        <span>Mapped Raw Minerals:</span>
                        <span style="color: #174A70; font-weight: 800;">\${ind.products.length} Products</span>
                      </div>
                      <div class="canonical-card-pills">
                        \${ind.products.slice(0, 6).map(p => \`
                          <a href="\${productUrl(p, ind.slug)}" class="canonical-mineral-pill" title="View \${esc(p.name)} specifications">
                            \${esc(p.name)}
                          </a>
                        \`).join('')}
                        \${ind.products.length > 6 ? \`
                          <span class="canonical-mineral-pill" style="background: #F1F5F9; color: #475569;">
                            +\${ind.products.length - 6} more
                          </span>
                        \` : ''}
                      </div>
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="canonical-card-actions">
                    <a href="\${industriesUrl}?industry=\${encodeURIComponent(ind.slug)}" class="canonical-btn-primary">
                      Explore Sector &rarr;
                    </a>
                    <button type="button" class="canonical-btn-rfq" onclick="prefillIndustryRfq('\${esc(ind.name)}', '\${esc(ind.defaultNotes || '')}')">
                      Quick RFQ
                    </button>
                    <a href="\${waUrl}" target="_blank" rel="noopener noreferrer" class="canonical-btn-wa" title="WhatsApp Enquiry for \${esc(ind.name)}">
                      \${whatsappIconSvg(14, 14)}
                      <span>WA</span>
                    </a>
                  </div>
                </article>
              \`;
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
            \${rfq(null, { industry: 'Industrial Manufacturing' })}
          </div>
        </div>
      </section>
    \`;

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
`;

// Replace lines between /* =========================================================================\n   * INDUSTRIES & APPLICATIONS LANDING PAGE (`/industries/`)
// and window.prefillIndustryRfq
const startMarker = "  /* =========================================================================\n   * INDUSTRIES & APPLICATIONS LANDING PAGE (`/industries/`)\n   * ========================================================================= */";
const endMarker = "  // Global helper for RFQ button click on industry cards\n  window.prefillIndustryRfq";

const startIndex = appContent.indexOf(startMarker);
const endIndex = appContent.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find markers in app.js:', { startIndex, endIndex });
  process.exit(1);
}

const replacement = iconHelperCode + '\n' + newIndustriesCode + '\n';
appContent = appContent.substring(0, startIndex) + replacement + appContent.substring(endIndex);

// Also update Homepage Section 5 link targets in home() so they link to /industries/?industry=<slug>
// Replace href="${productsUrl}?industry=Paints" etc with ${industriesUrl}?industry=paints-coatings
const homepageReplacements = [
  { from: 'href="${productsUrl}?industry=Paints"', to: 'href="${industriesUrl}?industry=paints-coatings"' },
  { from: 'href="${productsUrl}?industry=Plastic"', to: 'href="${industriesUrl}?industry=plastics-polymers"' },
  { from: 'href="${productsUrl}?industry=Rubber"', to: 'href="${industriesUrl}?industry=rubber-footwear"' },
  { from: 'href="${productsUrl}?industry=Rigid%20PVC"', to: 'href="${industriesUrl}?industry=plastics-polymers"' },
  { from: 'href="${productsUrl}?industry=Ceramics"', to: 'href="${industriesUrl}?industry=ceramics"' },
  { from: 'href="${productsUrl}?industry=Construction"', to: 'href="${industriesUrl}?industry=construction-building-materials"' },
  { from: 'href="${productsUrl}?industry=Wall%20Putty"', to: 'href="${industriesUrl}?industry=wall-putty-nc-putty"' },
  { from: 'href="${productsUrl}?industry=Foundry"', to: 'href="${industriesUrl}?industry=foundry-industrial"' }
];

homepageReplacements.forEach(({ from, to }) => {
  if (appContent.includes(from)) {
    appContent = appContent.replace(from, to);
  }
});

fs.writeFileSync(appFilePath, appContent, 'utf8');
console.log('Successfully updated assets/js/app.js with Phase 3 industries implementation');
