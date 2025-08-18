<template>
  
    <div>
      
      <Content 
      :api-key="apiKey" 
      :model="model" 
      :content="content"
      :customComponents="registeredComponents"
      :data="designTokensData.designTokens"
       />
     
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

  const { designTokensData } = useDesignTokens()

  console.log('Design Tokens Data End:', designTokensData)
  
  const { data: content } = await useAsyncData('builderData', () =>
    fetchOneEntry({
      model,
      apiKey,
      userAttributes: {
        urlPath: route.path,
        pageType: 'content-page'
      },
      cachebust: true,
      preview: true
    })
  );
  
  canShowContent.value = content.value ? true : isPreviewing(route.path);
  </script>
  