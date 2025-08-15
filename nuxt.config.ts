// nuxt.config.js - Hydration Safe + LCP Optimized
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  
  css: ['~/assets/css/global.css'],
  
  modules: [
    '@builder.io/sdk-vue/nuxt'
  ],
  
  // SSR Settings für Hydration Fix
  ssr: true,
  
  // CRITICAL: Hydration Mismatch Prevention
  experimental: {
    payloadExtraction: false,
    
    writeEarlyHints: false
  },
  
  nitro: {
    preset: 'cloudflare-pages',
    routeRules: {
      // STATISCHE Teile (werden zur Build-Zeit generiert)
      '/': { 
        prerender: true, // Statischer HTML-Shell
        experimentalNoScripts: false // JS für dynamischen Content
      },
      
      // DYNAMISCHE API (läuft auf Cloudflare Workers)
      '/api/**': { 
        cors: true,
        headers: { 
          'cache-control': 'max-age=60' // Kurzer Cache
        }
      },
      
      // Andere Pages - auch hybrid
      '/kurse': { prerender: true },
      '/preise': { prerender: true },
      '/team': { prerender: true },
      
      // Catch-all für Builder.io Pages
      '/**': { 
        ssr: true, // Server-side rendering, aber nicht prerendered
        headers: { 
          'cache-control': 's-maxage=60, stale-while-revalidate=300',
          'x-builder-content': 'true'
        }
      }
    }
  },
  
  // Builder.io Hydration-safe Config
  runtimeConfig: {
    public: {
      builderApiKey: process.env.BUILDER_API_KEY
    }
  },
  
  // App Settings - Hydration Safe
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1',
      charset: 'utf-8',
      
      // Hydration Debug (development only)
      script: process.env.NODE_ENV === 'development' ? [
        {
          innerHTML: `
            window.__NUXT_HYDRATION_DEBUG__ = true;
            window.addEventListener('vite:beforeUpdate', () => {
              console.log('Hydration mismatch detected');
            });
          `
        }
      ] : []
    }
  },
  
  // Vite Build Optimierung
  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // Builder SDK isolieren
            'builder': ['@builder.io/sdk-vue'],
            'vue-vendor': ['vue', '@vue/shared']
          }
        }
      }
    },
    
    // SSR/Client Build Consistency
    ssr: {
      noExternal: ['@builder.io/sdk-vue']
    }
  },
})