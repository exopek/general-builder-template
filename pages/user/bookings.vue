<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <h1 class="text-3xl font-bold text-gray-900">Buchungshistorie</h1>
          <p class="mt-1 text-sm text-gray-500">
            Übersicht all Ihrer Buchungen und Stornierungen
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BookingHistory />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'user',
  title: 'Buchungshistorie'
})

const BookingHistory = defineAsyncComponent(() => import('~/components/user/BookingHistory.vue'))
</script>