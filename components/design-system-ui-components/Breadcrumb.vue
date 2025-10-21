<template>
  <nav aria-label="Breadcrumb" class="flex">
    <ol class="inline-flex items-center space-x-1" :class="sizeClass">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="inline-flex items-center"
      >
        <component
          :is="item.href ? 'a' : 'span'"
          :href="item.href"
          class="inline-flex items-center transition-colors"
          :class="[
            item.href ? 'hover:text-primary cursor-pointer' : '',
            index === items.length - 1 ? 'text-gray-500 cursor-default' : 'text-gray-700'
          ]"
          @click="handleClick($event, item, index)"
        >
          <component
            v-if="item.icon && index === 0"
            :is="item.icon"
            class="w-4 h-4 mr-2"
          />
          {{ item.label }}
        </component>

        <svg
          v-if="index < items.length - 1"
          class="w-4 h-4 mx-2 text-gray-400"
          :class="separatorClass"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            v-if="separator === 'chevron'"
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
          <path
            v-else-if="separator === 'slash'"
            d="M7 10l5 5 5-5z"
          />
        </svg>
        <span
          v-else-if="index < items.length - 1 && separator === 'dot'"
          class="mx-2 text-gray-400"
        >
          •
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  href?: string
  icon?: string
}

interface Props {
  items: BreadcrumbItem[]
  separator?: 'chevron' | 'slash' | 'dot'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  separator: 'chevron',
  size: 'md',
  items: () => []
})

const emit = defineEmits<{
  click: [item: BreadcrumbItem, index: number]
}>()

const sizeClass = computed(() => {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }
  return sizes[props.size]
})

const separatorClass = computed(() => {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }
  return sizes[props.size]
})

const handleClick = (event: Event, item: BreadcrumbItem, index: number) => {
  if (index === props.items.length - 1) {
    event.preventDefault()
  }
  emit('click', item, index)
}
</script>
