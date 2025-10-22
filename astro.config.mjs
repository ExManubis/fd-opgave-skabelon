// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  prefetch: {
      prefetchAll: true,
      defaultStrategy: 'viewport',
	},

  image: {
      responsiveStyles: true,
      layout: 'constrained',
	},

  vite: {
      plugins: [tailwindcss()],
	},

  experimental: {
      fonts: [
          {
              provider: fontProviders.google(),
              name: 'Cabin',
              cssVariable: '--font-cabin',
          },
          {
              provider: fontProviders.google(),
              name: 'Lato',
              cssVariable: '--font-lato',
          },
      ],
	},

  adapter: netlify(),
});