<template>
  <nav class="flex items-center justify-between" aria-label="Pagination">
    <div v-if="showInfo" class="text-sm text-gray-700">
      Showing <span class="font-medium">{{ startItem }}</span> to
      <span class="font-medium">{{ endItem }}</span> of
      <span class="font-medium">{{ total }}</span> results
    </div>

    <ul class="inline-flex items-center space-x-1" :class="[!showInfo ? 'mx-auto' : '']">
      <li>
        <button
          type="button"
          class="inline-flex items-center justify-center border rounded-lg transition-all"
          :class="[
            sizeClass,
            currentPage === 1
              ? 'border-gray-200 text-gray-400 cursor-not-allowed'
              : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
          ]"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span v-if="showLabels" class="ml-2">Previous</span>
        </button>
      </li>

      <li v-for="page in displayPages" :key="page">
        <button
          v-if="page !== '...'"
          type="button"
          class="inline-flex items-center justify-center border rounded-lg transition-all font-medium"
          :class="[
            sizeClass,
            currentPage === page
              ? 'bg-primary text-white border-primary'
              : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
          ]"
          @click="goToPage(page as number)"
        >
          {{ page }}
        </button>
        <span v-else class="inline-flex items-center justify-center" :class="sizeClass">
          ...
        </span>
      </li>

      <li>
        <button
          type="button"
          class="inline-flex items-center justify-center border rounded-lg transition-all"
          :class="[
            sizeClass,
            currentPage === totalPages
              ? 'border-gray-200 text-gray-400 cursor-not-allowed'
              : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
          ]"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          <span v-if="showLabels" class="mr-2">Next</span>
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: number
  total: number
  pageSize?: number
  size?: 'sm' | 'md' | 'lg'
  showInfo?: boolean
  showLabels?: boolean
  maxPages?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 1,
  pageSize: 10,
  size: 'md',
  showInfo: true,
  showLabels: false,
  maxPages: 7
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const currentPage = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  currentPage.value = newValue
})

const totalPages = computed(() => {
  return Math.ceil(props.total / props.pageSize)
})

const startItem = computed(() => {
  return (currentPage.value - 1) * props.pageSize + 1
})

const endItem = computed(() => {
  return Math.min(currentPage.value * props.pageSize, props.total)
})

const displayPages = computed(() => {
  const pages: (number | string)[] = []
  const maxPages = props.maxPages
  const total = totalPages.value

  if (total <= maxPages) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    const current = currentPage.value
    const half = Math.floor(maxPages / 2)

    if (current <= half + 1) {
      for (let i = 1; i <= maxPages - 2; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - half) {
      pages.push(1)
      pages.push('...')
      for (let i = total - maxPages + 3; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - half + 2; i <= current + half - 2; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'px-2 py-1 text-sm min-w-8 h-8',
    md: 'px-3 py-2 text-base min-w-10 h-10',
    lg: 'px-4 py-3 text-lg min-w-12 h-12'
  }
  return sizes[props.size]
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    currentPage.value = page
    emit('update:modelValue', page)
    emit('change', page)
  }
}
</script>
