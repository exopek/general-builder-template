<template>
  <div>
    <Content 
      v-if="content || canShowContent"
      :api-key="apiKey" 
      :model="model" 
      :content="content"
      :customComponents="registeredComponents"
    />
    <!-- Fallback for missing content -->
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Seite nicht gefunden</h1>
        <p class="text-gray-600">Für diese Route wurde kein Content in Builder.io gefunden.</p>
        <p class="text-sm text-gray-500 mt-2">Route: {{ route.path }}</p>
      </div>
    </div>
  </div>
</template>
  <script setup>
  import { Content, fetchOneEntry, isPreviewing } from '@builder.io/sdk-vue';
  import { ref } from 'vue';
  import  { registeredComponents } from '~/plugins/custom-components';
  
  const route = useRoute();
  const config = useRuntimeConfig();
  
  const apiKey = config.public.builderApiKey;
  const canShowContent = ref(false);
  const model = 'page';

  const hasCache = process.env.NODE_ENV === 'development';
  const hasPreview = process.env.NODE_ENV === 'development';

  const { data: content } = await useAsyncData('builderData', () =>
    fetchOneEntry({
      model,
      apiKey,
      userAttributes: {
        urlPath: route.path,
        pageType: 'content-page'
      },
      cachebust: hasCache,
      preview: hasPreview
    })
  );
  
  canShowContent.value = content.value ? true : isPreviewing(route.path);

  // Facebook Pixel Store
  const facebookStore = useFacebookStore()

  watchEffect(() => {
    console.log('Current route path:', content.value);
  if (content.value) {
    // Facebook Pixel Codes an Store übergeben (werden NICHT automatisch geladen)
    const pixelScript = content.value.data.facebookPixelScript || null
    const pixelNoScript = content.value.data.facebookPixelNoScript || null
    if (pixelScript) {
      facebookStore.setPixelScriptCodes(pixelScript, pixelNoScript)
    }

    useHead({
      title: `${content.value.data.title}`,
      meta: [
        {
          name: 'description',
          content: `${content.value.data.description}`
        },
        {
          property: 'og:title',
          content: `${content.value.data.title}`
        }/* ,
        {
          property: 'og:description',
          content: article.excerpt || 'Entdecke wertvolle Tipps und Insights zu Fitness und Training.'
        },
        {
          property: 'og:image',
          content: article.image || ''
        },
        {
          property: 'og:type',
          content: 'article'
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        } */
      ],
      script: [
        // Strukturierte Daten (JSON-LD Schema.org)
        ...(content.value.data.structuredData ? [{
          type: 'application/ld+json',
          innerHTML: content.value.data.structuredData
        }] : []),
        ...(content.value.data.organizationSchema ? [{
          type: 'application/ld+json',
          innerHTML: content.value.data.organizationSchema
        }] : []),
        ...(content.value.data.faqPageSchema ? [{
          type: 'application/ld+json',
          innerHTML: content.value.data.faqPageSchema
        }] : []),
        ...(content.value.data.articleSchema ? [{
          type: 'application/ld+json',
          innerHTML: content.value.data.articleSchema
        }] : [])
        // Facebook Pixel wird NICHT mehr hier geladen, sondern dynamisch nach Consent
      ]
    })
  }
})

  </script>
  