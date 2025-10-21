<template>
  <div class="relative inline-block" ref="tooltipRef">
    <div
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
      @focus="showTooltip"
      @blur="hideTooltip"
    >
      <slot />
    </div>

    <Transition
      enter-active-class="transition-all duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="show"
        class="absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap"
        :class="[positionClass, sizeClass]"
        role="tooltip"
      >
        {{ text }}
        <div class="tooltip-arrow" :class="arrowClass" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  size?: 'sm' | 'md' | 'lg'
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top',
  size: 'md',
  delay: 200
})

const tooltipRef = ref<HTMLElement>()
const show = ref(false)
let timeout: NodeJS.Timeout | null = null

const positionClass = computed(() => {
  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }
  return positions[props.position]
})

const arrowClass = computed(() => {
  const arrows = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-900'
  }
  return arrows[props.position]
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-2.5'
  }
  return sizes[props.size]
})

const showTooltip = () => {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    show.value = true
  }, props.delay)
}

const hideTooltip = () => {
  if (timeout) clearTimeout(timeout)
  show.value = false
}

onUnmounted(() => {
  if (timeout) clearTimeout(timeout)
})
</script>

<style scoped>
.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border: 6px solid transparent;
}
</style>
