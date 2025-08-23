<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Teilnehmer-Verwaltung</h1>
              <p class="mt-1 text-sm text-gray-500">
                Überblick und Verwaltung aller Teilnehmer
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
                @click="sendBulkEmail"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Rundmail senden
              </button>
              <button
                @click="showStatsModal = true"
                class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                Statistiken
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ParticipantsList />
    </div>

    <!-- Statistics Modal -->
    <div
      v-if="showStatsModal"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click="showStatsModal = false"
    >
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div 
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl"
          @click.stop
        >
          <!-- Modal Header -->
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">
                Teilnehmer-Statistiken
              </h3>
              <button
                @click="showStatsModal = false"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Statistics Content -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Registration Trends -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-medium text-gray-900 mb-3">Anmeldungen</h4>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Diese Woche:</span>
                    <span class="font-medium">{{ registrationStats.thisWeek }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Letzter Monat:</span>
                    <span class="font-medium">{{ registrationStats.lastMonth }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Insgesamt:</span>
                    <span class="font-medium">{{ registrationStats.total }}</span>
                  </div>
                </div>
              </div>

              <!-- Activity Stats -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-medium text-gray-900 mb-3">Aktivität</h4>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Aktive Nutzer:</span>
                    <span class="font-medium">{{ activityStats.active }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Inaktive Nutzer:</span>
                    <span class="font-medium">{{ activityStats.inactive }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Aktivitätsrate:</span>
                    <span class="font-medium">{{ Math.round((activityStats.active / (activityStats.active + activityStats.inactive)) * 100) }}%</span>
                  </div>
                </div>
              </div>

              <!-- Booking Stats -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-medium text-gray-900 mb-3">Buchungen</h4>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Ø pro Nutzer:</span>
                    <span class="font-medium">{{ averageBookingsPerUser }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Häufigste Kategorie:</span>
                    <span class="font-medium">{{ mostPopularCategory || '-' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              @click="showStatsModal = false"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Schließen
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  middleware: 'admin',
  title: 'Teilnehmer-Verwaltung'
})

// Stores
const adminStore = useAdminStore()

// State
const showStatsModal = ref(false)

// Computed
const participants = computed(() => adminStore.participants)
const bookings = computed(() => adminStore.allBookings)

const registrationStats = computed(() => {
  const now = new Date()
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  return {
    thisWeek: participants.value.filter(p => new Date(p.registrationDate) > oneWeekAgo).length,
    lastMonth: participants.value.filter(p => new Date(p.registrationDate) > oneMonthAgo).length,
    total: participants.value.length
  }
})

const activityStats = computed(() => ({
  active: participants.value.filter(p => p.status === 'active').length,
  inactive: participants.value.filter(p => p.status === 'inactive').length
}))

const averageBookingsPerUser = computed(() => {
  if (participants.value.length === 0) return 0
  const totalBookings = participants.value.reduce((sum, p) => sum + p.totalBookings, 0)
  return Math.round((totalBookings / participants.value.length) * 10) / 10
})

const mostPopularCategory = computed(() => {
  const categories: Record<string, number> = {}
  
  bookings.value.forEach(booking => {
    if (booking.courseCategory) {
      categories[booking.courseCategory] = (categories[booking.courseCategory] || 0) + 1
    }
  })

  let maxCount = 0
  let mostPopular = ''
  
  Object.entries(categories).forEach(([category, count]) => {
    if (count > maxCount) {
      maxCount = count
      mostPopular = category
    }
  })

  return mostPopular
})

// Methods
const sendBulkEmail = () => {
  const activeParticipants = participants.value.filter(p => p.status === 'active')
  const emails = activeParticipants.map(p => p.email).join(';')
  
  const subject = encodeURIComponent('Neuigkeiten von Ihrem Fitnessstudio')
  const body = encodeURIComponent(`Liebe Mitglieder,\n\n`)
  
  window.open(`mailto:?bcc=${emails}&subject=${subject}&body=${body}`)
}

// Dynamic imports
const ParticipantsList = defineAsyncComponent(() => import('~/components/admin/ParticipantsList.vue'))

// Load data on mount
onMounted(async () => {
  await Promise.all([
    adminStore.fetchParticipants(),
    adminStore.fetchAllBookings()
  ])
})
</script>