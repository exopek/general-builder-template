<template>
  <div class="w-full relative" ref="selectRef">
    <label
      v-if="label"
      :for="selectId"
      class="block mb-2 font-medium transition-colors"
      :class="[
        disabled ? 'text-gray-400' : 'text-gray-700',
        labelSizeClass
      ]"
    >
      {{ label }}
      <span v-if="required" class="text-primary ml-1">*</span>
    </label>

    <div
      :id="selectId"
      class="relative cursor-pointer"
      @click="toggleDropdown"
    >
      <div
        class="w-full px-4 py-2.5 border rounded-lg transition-all flex items-center justify-between"
        :class="[
          selectSizeClass,
          disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-900',
          error ? 'border-red-500' : 'border-gray-300',
          isOpen && !disabled ? 'ring-2 ring-primary/30 border-primary' : ''
        ]"
      >
        <span :class="!selectedLabel ? 'text-gray-400' : ''">
          {{ selectedLabel || placeholder || 'Select an option' }}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-5 h-5 text-gray-400 transition-transform"
          :class="isOpen ? 'rotate-180' : ''"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      <Transition
        enter-active-class="transition-all duration-200"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-1"
      >
        <div
          v-if="isOpen && !disabled"
          class="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          <input
            v-if="searchable"
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="w-full px-4 py-2 border-b border-gray-200 focus:outline-none"
            @click.stop
          />

          <div
            v-for="option in filteredOptions"
            :key="option.value"
            class="px-4 py-2.5 cursor-pointer transition-colors hover:bg-gray-100"
            :class="modelValue === option.value ? 'bg-primary/10 text-primary font-medium' : 'text-gray-900'"
            @click="selectOption(option)"
          >
            {{ option.label }}
          </div>

          <div
            v-if="filteredOptions.length === 0"
            class="px-4 py-6 text-center text-gray-400 text-sm"
          >
            No options found
          </div>
        </div>
      </Transition>
    </div>

    <p
      v-if="error || hint"
      class="mt-2 text-sm transition-colors"
      :class="error ? 'text-red-500' : 'text-gray-500'"
    >
      {{ error || hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string
  value: string | number
}

interface Props {
  modelValue?: string | number
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
  options: Option[]
  disabled?: boolean
  required?: boolean
  searchable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  disabled: false,
  required: false,
  searchable: false,
  options: () => []
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const selectRef = ref<HTMLElement>()
const isOpen = ref(false)
const searchQuery = ref('')

const selectId = computed(() => `select-${Math.random().toString(36).substr(2, 9)}`)

const selectedLabel = computed(() => {
  const option = props.options.find(opt => opt.value === props.modelValue)
  return option?.label || ''
})

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return props.options
  }
  const query = searchQuery.value.toLowerCase()
  return props.options.filter(option =>
    option.label.toLowerCase().includes(query)
  )
})

const labelSizeClass = computed(() => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  return sizes[props.size]
})

const selectSizeClass = computed(() => {
  const sizes = {
    sm: 'text-sm py-2',
    md: 'text-base py-2.5',
    lg: 'text-lg py-3'
  }
  return sizes[props.size]
})

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
      searchQuery.value = ''
    }
  }
}

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value)
  emit('change', option.value)
  isOpen.value = false
  searchQuery.value = ''
}

const closeDropdown = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false
    searchQuery.value = ''
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>
