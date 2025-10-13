<template>
  <details
    :class="['card p-6 transition-all', openClass, customClass]"
    :open="defaultOpen"
  >
    <summary :class="['cursor-pointer font-semibold text-lg flex items-center justify-between gap-4', summaryClass]">
      <span>{{ title }}</span>
      <svg
        class="w-5 h-5 transition-transform flex-shrink-0"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </summary>

    <div class="mt-4">
      <slot />
    </div>
  </details>
</template>

<script setup lang="ts">
interface Props {
  title: string
  defaultOpen?: boolean
  summaryClass?: string
  openClass?: string
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  defaultOpen: false,
  summaryClass: 'text-gray-900',
  openClass: 'hover:shadow-md',
  customClass: ''
})

const isOpen = ref(props.defaultOpen)
</script>

<style scoped>
/* Remove default details marker */
details summary {
  list-style: none;
}

details summary::-webkit-details-marker {
  display: none;
}

/* Smooth accordion animation */
details[open] summary ~ * {
  animation: slideDown 300ms ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
