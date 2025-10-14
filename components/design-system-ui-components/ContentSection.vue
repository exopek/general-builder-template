<template>
  <section :class="['mb-12 md:mb-16', sectionClass]">
    <h2 v-if="title" class="text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">
      {{ title }}
    </h2>
    <slot />
  </section>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  sectionClass?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  sectionClass: ''
})
</script>
