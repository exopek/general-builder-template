// nuxt.config.js - Hydration Safe + LCP Optimized
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  
  modules: [
    '@builder.io/sdk-vue/nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/sitemap',
    'nuxt-simple-cookie-consent',
  ],

  css: ['~/assets/css/global.css'],

  // Component Auto-Import Configuration
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
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
    prerender: {
      routes: ['/kurse', '/preise', '/team']
    },
    routeRules: {
      // STATISCHE Teile (werden zur Build-Zeit generiert)
      '/': { 
        ssr: true, // Server-side rendering
        // prerender: true, // Prerendered für bessere LCP
        headers: { 
          'cache-control': 's-maxage=60, stale-while-revalidate=300', // Kurzer Cache
          'x-builder-content': 'true'
        },
        // experimentalNoScripts: false // JS für dynamischen Content
      },
      
      // DYNAMISCHE API (läuft auf Cloudflare Workers)
      '/api/**': { 
        cors: true,
        headers: { 
          'cache-control': 'max-age=60' // Kurzer Cache
        }
      },
      
      // Dynamic pages über [slug].vue - werden prerendered
      '/kurse': { prerender: true },
      '/preise': { prerender: true },
      '/team': { prerender: true }
    }
  },
  
  // Builder.io Hydration-safe Config
  runtimeConfig: {
    public: {
      builderApiKey: process.env.BUILDER_API_KEY
    }
  },

  // Site Configuration for SEO and Sitemap
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://gym.exopek.de'
  },

  // Sitemap Configuration
  sitemap: {
    sources: [
      '/sitemap/builder-urls'
    ],
    exclude: [
      '/auth/**',
      '/admin/**',
      '/user/**',
      '/courses/**',
      '/api/**'
    ]
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
  
  // Vite Build Optimierung - Development optimiert
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

  // Cookie Consent Configuration (GDPR/DSGVO compliant)
  cookieConsent: {
    // Consent is required before any non-essential cookies are set
    consentMode: true,

    // Cookie categories for granular control
    cookies: {
      essential: {
        label: 'Essenzielle Cookies',
        description: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.',
        required: true
      },
      analytics: {
        label: 'Analyse & Statistik',
        description: 'Diese Cookies helfen uns, die Nutzung unserer Website zu verstehen und zu verbessern.',
        required: false,
        src: 'https://www.googletagmanager.com/gtag/js',
        async: true,
        accepted: () => {
          // Initialize Google Analytics only after consent
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('consent', 'update', {
              analytics_storage: 'granted'
            })
          }
        },
        declined: () => {
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('consent', 'update', {
              analytics_storage: 'denied'
            })
          }
        }
      },
      marketing: {
        label: 'Marketing',
        description: 'Diese Cookies werden verwendet, um Ihnen personalisierte Werbung anzuzeigen.',
        required: false
      },
      functional: {
        label: 'Funktional',
        description: 'Diese Cookies ermöglichen erweiterte Funktionalitäten wie z.B. die Speicherung Ihrer Präferenzen.',
        required: false
      }
    },

    // Storage settings
    cookieExpiryDays: 365,

    // Google Consent Mode v2
    googleConsentMode: {
      enabled: true,
      defaultConsent: {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted'
      }
    }
  },
})