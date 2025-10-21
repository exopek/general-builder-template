<template>
  <div
    class="grid w-full"
    :class="[gridClass, gapClass, customClass]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  colsSm?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  colsMd?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  colsLg?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  colsXl?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  cols: 1,
  gap: 'md',
  customClass: ''
})

const gridClass = computed(() => {
  const classes: string[] = []

  // Base columns
  const colsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    12: 'grid-cols-12'
  }
  classes.push(colsMap[props.cols])

  // Responsive columns
  if (props.colsSm) {
    const colsSmMap = {
      1: 'sm:grid-cols-1',
      2: 'sm:grid-cols-2',
      3: 'sm:grid-cols-3',
      4: 'sm:grid-cols-4',
      5: 'sm:grid-cols-5',
      6: 'sm:grid-cols-6',
      12: 'sm:grid-cols-12'
    }
    classes.push(colsSmMap[props.colsSm])
  }

  if (props.colsMd) {
    const colsMdMap = {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-4',
      5: 'md:grid-cols-5',
      6: 'md:grid-cols-6',
      12: 'md:grid-cols-12'
    }
    classes.push(colsMdMap[props.colsMd])
  }

  if (props.colsLg) {
    const colsLgMap = {
      1: 'lg:grid-cols-1',
      2: 'lg:grid-cols-2',
      3: 'lg:grid-cols-3',
      4: 'lg:grid-cols-4',
      5: 'lg:grid-cols-5',
      6: 'lg:grid-cols-6',
      12: 'lg:grid-cols-12'
    }
    classes.push(colsLgMap[props.colsLg])
  }

  if (props.colsXl) {
    const colsXlMap = {
      1: 'xl:grid-cols-1',
      2: 'xl:grid-cols-2',
      3: 'xl:grid-cols-3',
      4: 'xl:grid-cols-4',
      5: 'xl:grid-cols-5',
      6: 'xl:grid-cols-6',
      12: 'xl:grid-cols-12'
    }
    classes.push(colsXlMap[props.colsXl])
  }

  return classes.join(' ')
})

const gapClass = computed(() => {
  const gaps = {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
    '2xl': 'gap-12'
  }
  return gaps[props.gap]
})
</script>
