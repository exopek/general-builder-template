<template>
  <div>
    <!-- Challenge Hero Section as first section -->
    <ChallengeHeroSection />
    
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
</script>