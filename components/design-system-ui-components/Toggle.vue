<template>
  <div class="inline-flex items-center">
    <label class="inline-flex items-center cursor-pointer group" :class="disabled ? 'cursor-not-allowed' : ''">
      <span
        v-if="label && labelPosition === 'left'"
        class="mr-3 transition-colors"
        :class="[
          disabled ? 'text-gray-400' : 'text-gray-700',
          labelSizeClass
        ]"
      >
        {{ label }}
      </span>

      <div class="relative">
        <input
          :id="toggleId"
          type="checkbox"
          :checked="modelValue"
          :disabled="disabled"
          class="sr-only"
          @change="handleChange"
        />

        <div
          class="relative transition-all rounded-full"
          :class="[
            toggleSizeClass,
            disabled
              ? 'bg-gray-300 cursor-not-allowed'
              : modelValue
                ? bgColorClass
                : 'bg-gray-300 group-hover:bg-gray-400'
          ]"
        >
          <div
            class="absolute top-1 bg-white rounded-full shadow-md transition-all"
            :class="[
              dotSizeClass,
              modelValue ? dotActiveClass : 'left-1'
            ]"
          />
        </div>

        <div
          v-if="loading"
          class="absolute inset-0 flex items-center justify-center"
        >
          <svg class="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-30"/>
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
        </div>
      </div>

      <span
        v-if="label && labelPosition === 'right'"
        class="ml-3 transition-colors"
        :class="[
          disabled ? 'text-gray-400' : 'text-gray-700',
          labelSizeClass
        ]"
      >
        {{ label }}
      </span>
    </label>

    <p
      v-if="hint"
      class="mt-2 text-sm text-gray-500"
    >
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: boolean
  label?: string
  labelPosition?: 'left' | 'right'
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'green' | 'blue' | 'purple'
  disabled?: boolean
  loading?: boolean
  hint?: string
}

const props = withDefaults(defineProps<Props>(), {
  labelPosition: 'right',
  size: 'md',
  color: 'primary',
  disabled: false,
  loading: false,
  modelValue: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const toggleId = computed(() => `toggle-${Math.random().toString(36).substr(2, 9)}`)

const toggleSizeClass = computed(() => {
  const sizes = {
    sm: 'w-9 h-5',
    md: 'w-11 h-6',
    lg: 'w-14 h-7'
  }
  return sizes[props.size]
})

const dotSizeClass = computed(() => {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }
  return sizes[props.size]
})

const dotActiveClass = computed(() => {
  const positions = {
    sm: 'left-5',
    md: 'left-6',
    lg: 'left-8'
  }
  return positions[props.size]
})

const bgColorClass = computed(() => {
  const colors = {
    primary: 'bg-primary',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500'
  }
  return colors[props.color]
})

const labelSizeClass = computed(() => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  return sizes[props.size]
})

const handleChange = (event: Event) => {
  if (!props.disabled && !props.loading) {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.checked)
    emit('change', target.checked)
  }
}
</script>
