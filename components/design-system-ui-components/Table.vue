<template>
  <div class="w-full overflow-x-auto">
    <table class="min-w-full divide-y" :class="tableClass">
      <thead :class="headClass">
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            scope="col"
            class="px-6 py-3 text-left font-semibold"
            :class="[
              sizeClass,
              column.sortable ? 'cursor-pointer select-none hover:bg-gray-100' : '',
              column.align ? `text-${column.align}` : 'text-left'
            ]"
            @click="column.sortable ? handleSort(column.key) : null"
          >
            <div class="flex items-center" :class="column.align === 'right' ? 'justify-end' : column.align === 'center' ? 'justify-center' : ''">
              {{ column.label }}
              <svg
                v-if="column.sortable"
                class="w-4 h-4 ml-1 transition-transform"
                :class="sortKey === column.key && sortDirection === 'desc' ? 'rotate-180' : ''"
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
            </div>
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="(row, rowIndex) in sortedData"
          :key="rowIndex"
          class="transition-colors"
          :class="[
            hoverable ? 'hover:bg-gray-50' : '',
            striped && rowIndex % 2 === 1 ? 'bg-gray-50' : 'bg-white'
          ]"
        >
          <td
            v-for="(column, colIndex) in columns"
            :key="colIndex"
            class="px-6 py-4 whitespace-nowrap"
            :class="[
              sizeClass,
              column.align ? `text-${column.align}` : 'text-left'
            ]"
          >
            <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]" :index="rowIndex">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>

        <tr v-if="data.length === 0">
          <td :colspan="columns.length" class="px-6 py-12 text-center text-gray-400">
            <slot name="empty">
              No data available
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface Column {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
}

interface Props {
  columns: Column[]
  data: Record<string, unknown>[]
  size?: 'sm' | 'md' | 'lg'
  striped?: boolean
  hoverable?: boolean
  bordered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  striped: false,
  hoverable: true,
  bordered: false,
  columns: () => [],
  data: () => []
})

const emit = defineEmits<{
  sort: [key: string, direction: 'asc' | 'desc']
}>()

const sortKey = ref<string>('')
const sortDirection = ref<'asc' | 'desc'>('asc')

const tableClass = computed(() => {
  return props.bordered ? 'border border-gray-200' : ''
})

const headClass = computed(() => {
  return props.bordered ? 'bg-gray-100' : 'bg-gray-50'
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }
  return sizes[props.size]
})

const sortedData = computed(() => {
  if (!sortKey.value) {
    return props.data
  }

  return [...props.data].sort((a, b) => {
    const aVal = a[sortKey.value]
    const bVal = b[sortKey.value]

    if (aVal === bVal) return 0

    const comparison = aVal > bVal ? 1 : -1
    return sortDirection.value === 'asc' ? comparison : -comparison
  })
})

const handleSort = (key: string) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDirection.value = 'asc'
  }

  emit('sort', key, sortDirection.value)
}
</script>
