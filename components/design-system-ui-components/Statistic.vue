<template>
  <div class="stat-card" :class="[sizeClass, customClass]">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <p class="stat-label mb-2" :class="labelSizeClass">
          {{ label }}
        </p>

        <div class="flex items-baseline">
          <p class="stat-number" :class="[valueSizeClass, valueColorClass]">
            <span v-if="prefix">{{ prefix }}</span>
            {{ formattedValue }}
            <span v-if="suffix">{{ suffix }}</span>
          </p>

          <div
            v-if="trend"
            class="ml-3 flex items-center text-sm font-medium"
            :class="trendColorClass"
          >
            <svg
              class="w-4 h-4 mr-1"
              :class="trend === 'up' ? '' : 'rotate-180'"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            {{ trendValue }}
          </div>
        </div>

        <p v-if="description" class="mt-2 text-sm text-gray-500">
          {{ description }}
        </p>
      </div>

      <div
        v-if="icon"
        class="flex-shrink-0 ml-4 p-3 rounded-lg"
        :class="iconBgClass"
      >
        <component :is="icon" class="w-6 h-6" :class="iconColorClass" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  value: number | string
  prefix?: string
  suffix?: string
  description?: string
  icon?: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'gray'
  trend?: 'up' | 'down'
  trendValue?: string
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary',
  customClass: ''
})

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value.toLocaleString()
  }
  return props.value
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  return sizes[props.size]
})

const labelSizeClass = computed(() => {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }
  return sizes[props.size]
})

const valueSizeClass = computed(() => {
  const sizes = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  }
  return sizes[props.size]
})

const valueColorClass = computed(() => {
  const colors = {
    primary: 'text-primary',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
    info: 'text-blue-600',
    gray: 'text-gray-600'
  }
  return colors[props.color]
})

const iconBgClass = computed(() => {
  const backgrounds = {
    primary: 'bg-primary/10',
    success: 'bg-green-100',
    warning: 'bg-yellow-100',
    error: 'bg-red-100',
    info: 'bg-blue-100',
    gray: 'bg-gray-100'
  }
  return backgrounds[props.color]
})

const iconColorClass = computed(() => {
  const colors = {
    primary: 'text-primary',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
    info: 'text-blue-600',
    gray: 'text-gray-600'
  }
  return colors[props.color]
})

const trendColorClass = computed(() => {
  return props.trend === 'up' ? 'text-green-600' : 'text-red-600'
})
</script>
