<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Buchungen-Verwaltung</h1>
              <p class="mt-1 text-sm text-gray-500">
                Überblick und Verwaltung aller Buchungen
              </p>
            </div>
            <div class="flex items-center space-x-4">
              <NuxtLink
                to="/admin"
                class="text-gray-400 hover:text-gray-600 transition-colors"
                title="Zurück zum Dashboard"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </NuxtLink>
              <button
                @click="exportBookings"
                class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BookingOverview />
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  middleware: 'admin',
  title: 'Buchungen-Verwaltung'
})

// Stores
const adminStore = useAdminStore()

// Methods
const exportBookings = async () => {
  try {
    const bookings = adminStore.allBookings
    
    // Create CSV content
    const headers = ['Buchungs-ID', 'Kurs', 'Kunde', 'E-Mail', 'Datum', 'Status', 'Buchungsdatum']
    const csvContent = [
      headers.join(','),
      ...bookings.map(booking => [
        booking.id,
        `"${booking.courseName || 'Unbekannt'}"`,
        `"${booking.userName}"`,
        `"${booking.userEmail || ''}"`,
        booking.courseDate || '',
        booking.status,
        new Date(booking.createdAt).toLocaleDateString('de-DE')
      ].join(','))
    ].join('\n')
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `buchungen-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  } catch (error) {
    console.error('Error exporting bookings:', error)
  }
}

// Dynamic imports
const BookingOverview = defineAsyncComponent(() => import('~/components/admin/BookingOverview.vue'))
</script>