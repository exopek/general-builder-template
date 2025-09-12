<template>
  <div>
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Buchungen-Verwaltung</h1>
        <p class="mt-1 text-sm text-gray-500">
          Überblick und Verwaltung aller Buchungen
        </p>
      </div>
      <button
        @click="exportBookings"
        class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
      >
        Export CSV
      </button>
    </div>

    <!-- Main Content -->
    <BookingOverview />
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  middleware: 'admin',
  layout: 'admin',
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