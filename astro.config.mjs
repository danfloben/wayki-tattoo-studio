import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://waykitattoostudio.pe',
  integrations: [
    sitemap({
      customPages: [],
      serialize(item) {
        // Home — máxima prioridad
        if (item.url === 'https://waykitattoostudio.pe/') {
          return { ...item, changefreq: 'daily', priority: 1.0 };
        }
        // Portafolio y tienda cambian seguido
        if (item.url.includes('/portafolio') || item.url.includes('/tienda')) {
          return { ...item, changefreq: 'weekly', priority: 0.9 };
        }
        // Artistas y nosotros cambian poco
        if (item.url.includes('/artistas') || item.url.includes('/nosotros')) {
          return { ...item, changefreq: 'monthly', priority: 0.8 };
        }
        // Resto
        return { ...item, changefreq: 'weekly', priority: 0.7 };
      },
    }),
  ],
  output: 'static',
  build: {
    format: 'directory', // genera /portafolio/index.html → URL limpia /portafolio
  },
});
