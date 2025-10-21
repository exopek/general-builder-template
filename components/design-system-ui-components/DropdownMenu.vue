<template>
  <div class="relative inline-block" ref="dropdownRef">
    <div @click="toggleDropdown">
      <slot name="trigger">
        <button
          type="button"
          class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          {{ triggerText }}
          <svg
            class="w-5 h-5 ml-2 transition-transform"
            :class="isOpen ? 'rotate-180' : ''"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </slot>
    </div>

    <Transition
      enter-active-class="transition-all duration-200"
      enter-from-class="opacity-0 scale-95 translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-150"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-1"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
        :class="[widthClass, positionClass]"
      >
        <div class="py-1">
          <template v-for="(item, index) in items" :key="index">
            <div
              v-if="item.divider"
              class="my-1 border-t border-gray-200"
            />
            <component
              v-else
              :is="item.href ? 'a' : 'button'"
              :href="item.href"
              :target="item.external ? '_blank' : undefined"
              :disabled="item.disabled"
              class="w-full flex items-center px-4 py-2.5 text-sm text-left transition-colors"
              :class="[
                item.disabled
                  ? 'text-gray-400 cursor-not-allowed'
                  : item.danger
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-gray-700 hover:bg-gray-100'
              ]"
              @click="handleItemClick(item, index)"
            >
              <component
                v-if="item.icon"
                :is="item.icon"
                class="w-5 h-5 mr-3 flex-shrink-0"
              />
              <span class="flex-1">{{ item.label }}</span>
              <span
                v-if="item.badge"
                class="ml-3 inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full"
                :class="item.danger ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-700'"
              >
                {{ item.badge }}
              </span>
            </component>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface MenuItem {
  label?: string
  icon?: string
  href?: string
  external?: boolean
  badge?: string | number
  disabled?: boolean
  danger?: boolean
  divider?: boolean
}

interface Props {
  items: MenuItem[]
  triggerText?: string
  position?: 'left' | 'right' | 'center'
  width?: 'auto' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  triggerText: 'Menu',
  position: 'left',
  width: 'auto',
  items: () => []
})

const emit = defineEmits<{
  select: [item: MenuItem, index: number]
}>()

const dropdownRef = ref<HTMLElement>()
const isOpen = ref(false)

const positionClass = computed(() => {
  const positions = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2'
  }
  return positions[props.position]
})

const widthClass = computed(() => {
  const widths = {
    auto: 'min-w-48',
    sm: 'w-48',
    md: 'w-64',
    lg: 'w-80'
  }
  return widths[props.width]
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const handleItemClick = (item: MenuItem, index: number) => {
  if (!item.disabled && !item.divider) {
    emit('select', item, index)
    isOpen.value = false
  }
}

const closeDropdown = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>
