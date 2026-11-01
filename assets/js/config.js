/**
 * Deepali Minerals Portal Configuration
 * Supports environment-configurable site URL via window or fallback
 */
window.DEEPALI_CONFIG = (function () {
  // Support configurable site URL (NEXT_PUBLIC_SITE_URL or VITE_SITE_URL or default)
  var configuredUrl = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SITE_URL)
    ? process.env.NEXT_PUBLIC_SITE_URL
    : 'https://deepaliminerals.in';

  return {
    siteUrl: configuredUrl,
    companyName: 'Deepali Minerals',
    tagline: 'Industrial Materials Product Discovery and Business Enquiries',
    targetDomain: 'deepaliminerals.in'
  };
})();
