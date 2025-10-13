<template>
  <div :class="['grid gap-6 md:gap-8', gridColsClass]">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  columns?: '1' | '2' | '3' | '4'
}

const props = withDefaults(defineProps<Props>(), {
  columns: '2'
})

const gridColsClass = computed(() => {
  const cols = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }
  return cols[props.columns]
})
</script>
