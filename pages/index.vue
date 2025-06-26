<template>
  <div>
    <Content 
      :api-key="apiKey" 
      :model="model" 
      :content="content"
    />
    <template>
      <div>
        <CustomFooter api-key='test'/>
      </div>
    </template>
  </div>
</template>

<script setup>
import { Content, fetchOneEntry, isPreviewing } from '@builder.io/sdk-vue';
import { ref } from 'vue';

const route = useRoute();

const apiKey = '';
const canShowContent = ref(false);
const model = 'page';

const { data: content } = await useAsyncData('builderData', () =>
  fetchOneEntry({
    model,
    apiKey,
    userAttributes: {
      urlPath: '/',
      pageType: 'home-page'
    }
  })
);

canShowContent.value = content.value ? true : isPreviewing(route.path);
</script>