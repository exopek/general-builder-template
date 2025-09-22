<template>
  <img
    :src="`/icons/${name}.svg`"
    :alt="alt || ''"
    :class="className"
    :style="{ width: size, height: size }"
  />
</template>

<script setup lang="ts">
interface Props {
  name: string
  size?: string
  className?: string
  alt?: string
}

withDefaults(defineProps<Props>(), {
  size: '24px',
  className: 'inline-block'
})
</script>