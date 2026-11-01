import { defineConfig, Plugin } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Deployment-Aware Robots and Sitemap Policy Plugin
function deploymentRobotsPlugin(): Plugin {
  return {
    name: 'deployment-robots-policy',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawHost = req.headers['x-forwarded-host'] || req.headers.host || '';
        const host = rawHost.toString().toLowerCase();
        const url = (req.url || '').split('?')[0];

        if (url === '/robots.txt') {
          if (host.includes('deepaliminerals.in') && !host.includes('preview.')) {
            const prodRobotsPath = resolve(__dirname, 'robots.prod.txt');
            if (fs.existsSync(prodRobotsPath)) {
              res.setHeader('Content-Type', 'text/plain; charset=utf-8');
              res.end(fs.readFileSync(prodRobotsPath, 'utf8'));
              return;
            }
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end('User-agent: *\nAllow: /\n\nSitemap: https://deepaliminerals.in/sitemap.xml\n');
            return;
          }
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end('User-agent: *\nDisallow: /\n');
          return;
        }

        if (url === '/sitemap.xml') {
          if (host.includes('deepaliminerals.in') && !host.includes('preview.')) {
            const sitemapPath = resolve(__dirname, 'sitemap.xml');
            if (fs.existsSync(sitemapPath)) {
              res.setHeader('Content-Type', 'application/xml; charset=utf-8');
              res.end(fs.readFileSync(sitemapPath, 'utf8'));
              return;
            }
          }
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end('Not Found on preview deployment\n');
          return;
        }

        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawHost = req.headers['x-forwarded-host'] || req.headers.host || '';
        const host = rawHost.toString().toLowerCase();
        const url = (req.url || '').split('?')[0];

        if (url === '/robots.txt') {
          if (host.includes('deepaliminerals.in') && !host.includes('preview.')) {
            const prodRobotsPath = resolve(__dirname, 'robots.prod.txt');
            if (fs.existsSync(prodRobotsPath)) {
              res.setHeader('Content-Type', 'text/plain; charset=utf-8');
              res.end(fs.readFileSync(prodRobotsPath, 'utf8'));
              return;
            }
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end('User-agent: *\nAllow: /\n\nSitemap: https://deepaliminerals.in/sitemap.xml\n');
            return;
          }
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end('User-agent: *\nDisallow: /\n');
          return;
        }

        if (url === '/sitemap.xml') {
          if (host.includes('deepaliminerals.in') && !host.includes('preview.')) {
            const sitemapPath = resolve(__dirname, 'sitemap.xml');
            if (fs.existsSync(sitemapPath)) {
              res.setHeader('Content-Type', 'application/xml; charset=utf-8');
              res.end(fs.readFileSync(sitemapPath, 'utf8'));
              return;
            }
          }
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end('Not Found on preview deployment\n');
          return;
        }

        next();
      });
    }
  };
}

// Multi-Page Application (MPA) configuration for Deepali Minerals
export default defineConfig({
  plugins: [deploymentRobotsPlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: 'all'
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        product: resolve(__dirname, 'product.html'),
        products: resolve(__dirname, 'products/index.html'),
        industries: resolve(__dirname, 'industries/index.html'),
        about: resolve(__dirname, 'about.html'),
        aboutDir: resolve(__dirname, 'about/index.html')
      }
    }
  }
});
