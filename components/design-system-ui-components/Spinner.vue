<template>
  <div
    class="inline-flex items-center justify-center"
    :class="sizeClass"
  >
    <svg
      v-if="type === 'default'"
      class="animate-spin"
      :class="sizeClass"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
        :class="trackColorClass"
      />
      <path
        fill="currentColor"
        :class="colorClass"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>

    <svg
      v-else-if="type === 'dots'"
      :class="[sizeClass, colorClass]"
      viewBox="0 0 120 30"
      fill="currentColor"
    >
      <circle cx="15" cy="15" r="15" class="animate-bounce">
        <animate
          attributeName="r"
          from="15"
          to="15"
          begin="0s"
          dur="0.8s"
          values="15;9;15"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          from="1"
          to="1"
          begin="0s"
          dur="0.8s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="60" cy="15" r="9" fill-opacity="0.5">
        <animate
          attributeName="r"
          from="9"
          to="9"
          begin="0.2s"
          dur="0.8s"
          values="9;15;9"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          from="0.5"
          to="0.5"
          begin="0.2s"
          dur="0.8s"
          values=".5;1;.5"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="105" cy="15" r="15">
        <animate
          attributeName="r"
          from="15"
          to="15"
          begin="0.4s"
          dur="0.8s"
          values="15;9;15"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          from="1"
          to="1"
          begin="0.4s"
          dur="0.8s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
    </svg>

    <div
      v-else-if="type === 'ring'"
      class="border-4 rounded-full animate-spin"
      :class="[sizeClass, ringColorClass]"
    />

    <span v-if="label" class="ml-3 font-medium" :class="labelColorClass">
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type?: 'default' | 'dots' | 'ring'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'white' | 'gray'
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'md',
  color: 'primary'
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }
  return sizes[props.size]
})

const colorClass = computed(() => {
  const colors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white',
    gray: 'text-gray-500'
  }
  return colors[props.color]
})

const trackColorClass = computed(() => {
  const colors = {
    primary: 'opacity-25',
    secondary: 'opacity-25',
    white: 'opacity-25',
    gray: 'opacity-25'
  }
  return colors[props.color]
})

const ringColorClass = computed(() => {
  const colors = {
    primary: 'border-primary border-t-transparent',
    secondary: 'border-secondary border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-500 border-t-transparent'
  }
  return colors[props.color]
})

const labelColorClass = computed(() => {
  const colors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white',
    gray: 'text-gray-500'
  }
  return colors[props.color]
})
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
