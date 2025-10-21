<template>
  <div>
    <Content 
      :api-key="apiKey" 
      :model="model" 
      :content="content"
      :customComponents="registeredComponents"
    />
   
  </div>
</template>

<script setup>
import { Content, fetchOneEntry, isPreviewing } from '@builder.io/sdk-vue';
import { ref } from 'vue';
import { registeredComponents } from '~/plugins/custom-components';

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
      urlPath: '/',
      pageType: 'home-page'
    },
    cachebust: hasCache,
    preview: hasPreview
  })
);

canShowContent.value = content.value ? true : isPreviewing(route.path);

watchEffect(() => {
    console.log('Current route path:', content.value);
  if (content.value) {
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
        },
        ...(content.value.data.facebookDomainVerification ? [{
          name: 'facebook-domain-verification',
          content: content.value.data.facebookDomainVerification
        }] : [])/* ,
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
        }] : []),
        // Facebook Pixel Tracking
        ...(content.value.data.facebookPixelScript ? [{
          innerHTML: content.value.data.facebookPixelScript,
          type: 'text/javascript'
        }] : [])
      ],
      noscript: [
        ...(content.value.data.facebookPixelNoScript ? [{
          innerHTML: content.value.data.facebookPixelNoScript
        }] : [])
      ]
    })
  }
})

</script>