<template>
  <div class="animate-pulse">
    <!-- Course Card Skeleton -->
    <div v-if="type === 'course-card'" class="bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="h-48 bg-gray-300"></div>
      <div class="p-6">
        <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div class="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div class="space-y-2 mb-4">
          <div class="h-3 bg-gray-300 rounded w-full"></div>
          <div class="h-3 bg-gray-300 rounded w-full"></div>
          <div class="h-3 bg-gray-300 rounded w-2/3"></div>
        </div>
        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
          <div class="h-8 bg-gray-300 rounded w-20"></div>
          <div class="flex gap-2">
            <div class="h-8 bg-gray-300 rounded w-16"></div>
            <div class="h-8 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table Row Skeleton -->
    <div v-else-if="type === 'table-row'" class="bg-white border-b border-gray-200">
      <div class="px-6 py-4 flex items-center space-x-4">
        <div class="h-4 bg-gray-300 rounded flex-1"></div>
        <div class="h-4 bg-gray-300 rounded w-20"></div>
        <div class="h-4 bg-gray-300 rounded w-16"></div>
        <div class="h-8 bg-gray-300 rounded w-24"></div>
      </div>
    </div>

    <!-- Dashboard Stats Skeleton -->
    <div v-else-if="type === 'stats-card'" class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <div class="h-12 w-12 bg-gray-300 rounded-lg"></div>
        </div>
        <div class="ml-4 flex-1">
          <div class="h-6 bg-gray-300 rounded w-16 mb-2"></div>
          <div class="h-4 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>

    <!-- User Profile Skeleton -->
    <div v-else-if="type === 'user-profile'" class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center space-x-4">
        <div class="h-16 w-16 bg-gray-300 rounded-full"></div>
        <div class="flex-1">
          <div class="h-5 bg-gray-300 rounded w-32 mb-2"></div>
          <div class="h-4 bg-gray-300 rounded w-48"></div>
        </div>
      </div>
    </div>

    <!-- List Item Skeleton -->
    <div v-else-if="type === 'list-item'" class="bg-white border-b border-gray-200">
      <div class="px-4 py-4 flex items-center space-x-3">
        <div class="h-10 w-10 bg-gray-300 rounded-full"></div>
        <div class="flex-1">
          <div class="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
          <div class="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div class="h-6 bg-gray-300 rounded w-16"></div>
      </div>
    </div>

    <!-- Form Skeleton -->
    <div v-else-if="type === 'form'" class="space-y-4">
      <div>
        <div class="h-4 bg-gray-300 rounded w-24 mb-2"></div>
        <div class="h-10 bg-gray-300 rounded w-full"></div>
      </div>
      <div>
        <div class="h-4 bg-gray-300 rounded w-32 mb-2"></div>
        <div class="h-10 bg-gray-300 rounded w-full"></div>
      </div>
      <div>
        <div class="h-4 bg-gray-300 rounded w-28 mb-2"></div>
        <div class="h-24 bg-gray-300 rounded w-full"></div>
      </div>
      <div class="flex justify-end space-x-3">
        <div class="h-10 bg-gray-300 rounded w-20"></div>
        <div class="h-10 bg-gray-300 rounded w-24"></div>
      </div>
    </div>

    <!-- Generic Content Skeleton -->
    <div v-else-if="type === 'text'" class="space-y-3">
      <div class="h-4 bg-gray-300 rounded w-full"></div>
      <div class="h-4 bg-gray-300 rounded w-5/6"></div>
      <div class="h-4 bg-gray-300 rounded w-4/6"></div>
    </div>

    <!-- Custom Lines -->
    <div v-else-if="type === 'lines'" class="space-y-3">
      <div 
        v-for="(line, index) in lines" 
        :key="index"
        class="h-4 bg-gray-300 rounded"
        :class="`w-${line}`"
      ></div>
    </div>

    <!-- Repeat Pattern -->
    <div v-else-if="type === 'repeat'" class="space-y-4">
      <component 
        :is="'div'"
        v-for="n in count" 
        :key="n"
      >
        <SkeletonLoader :type="repeatType" />
      </component>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type: 'course-card' | 'table-row' | 'stats-card' | 'user-profile' | 'list-item' | 'form' | 'text' | 'lines' | 'repeat'
  lines?: ('full' | '5/6' | '4/6' | '3/6' | '2/6' | '1/2' | '1/3' | '1/4')[]
  count?: number
  repeatType?: string
}

withDefaults(defineProps<Props>(), {
  lines: () => ['full', '5/6', '4/6'],
  count: 3,
  repeatType: 'text'
})
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>