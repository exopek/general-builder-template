<template>
  <div class="w-full">
    <div
      class="flex border-b"
      :class="[
        variant === 'pills' ? 'border-transparent gap-2' : 'border-gray-200',
        alignClass
      ]"
      role="tablist"
    >
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="relative transition-all font-medium focus:outline-none"
        :class="[
          sizeClass,
          getTabClass(index),
          tab.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        ]"
        :disabled="tab.disabled"
        role="tab"
        :aria-selected="activeTab === index"
        @click="selectTab(index)"
      >
        <component v-if="tab.icon" :is="tab.icon" class="w-5 h-5 mr-2" />
        {{ tab.label }}
        <span
          v-if="tab.badge"
          class="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-full"
          :class="activeTab === index ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'"
        >
          {{ tab.badge }}
        </span>
      </button>
    </div>

    <div class="mt-4">
      <Transition
        :enter-active-class="animated ? 'transition-all duration-300' : ''"
        :enter-from-class="animated ? 'opacity-0 translate-x-4' : ''"
        :enter-to-class="animated ? 'opacity-100 translate-x-0' : ''"
        :leave-active-class="animated ? 'transition-all duration-200' : ''"
        :leave-from-class="animated ? 'opacity-100 translate-x-0' : ''"
        :leave-to-class="animated ? 'opacity-0 -translate-x-4' : ''"
        mode="out-in"
      >
        <div :key="activeTab" role="tabpanel">
          <slot :name="`tab-${activeTab}`">
            {{ tabs[activeTab]?.content }}
          </slot>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Tab {
  label: string
  content?: string
  icon?: string
  badge?: string | number
  disabled?: boolean
}

interface Props {
  tabs: Tab[]
  modelValue?: number
  variant?: 'default' | 'pills'
  size?: 'sm' | 'md' | 'lg'
  align?: 'left' | 'center' | 'right'
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  variant: 'default',
  size: 'md',
  align: 'left',
  animated: true,
  tabs: () => []
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const activeTab = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  activeTab.value = newValue
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'text-sm px-3 py-2',
    md: 'text-base px-4 py-2.5',
    lg: 'text-lg px-6 py-3'
  }
  return sizes[props.size]
})

const alignClass = computed(() => {
  const aligns = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  }
  return aligns[props.align]
})

const getTabClass = (index: number) => {
  const isActive = activeTab.value === index

  if (props.variant === 'pills') {
    return isActive
      ? 'bg-primary text-white rounded-lg'
      : 'text-gray-600 hover:bg-gray-100 rounded-lg'
  }

  return isActive
    ? 'text-primary border-b-2 border-primary'
    : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent'
}

const selectTab = (index: number) => {
  if (!props.tabs[index]?.disabled) {
    activeTab.value = index
    emit('update:modelValue', index)
    emit('change', index)
  }
}
</script>
