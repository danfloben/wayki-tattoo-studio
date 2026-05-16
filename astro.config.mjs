import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://waykitattoostudio.pe',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
  output: 'static',
  build: {
    format: 'directory', // genera /portafolio/index.html → URL limpia /portafolio
  },
});
