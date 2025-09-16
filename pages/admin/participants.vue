<template>
  <div>
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Klienten-Verwaltung</h1>
        <p class="mt-1 text-sm text-gray-500">
          Überblick und Verwaltung aller Klienten
        </p>
      </div>
      <div class="flex items-center space-x-3">
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

    <!-- Main Content -->
    <ParticipantsList />

    <!-- Statistics Modal -->
    <!-- <div
      v-if="showStatsModal"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click="showStatsModal = false"
    >
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div 
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl"
          @click.stop
        >
         
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">
                Klienten-Statistiken
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

            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-medium text-gray-900 mb-3">Anmeldungen</h4>
                <div class="space-y-2">
                  <div class="text-center text-gray-500">
                    Keine Statistiken verfügbar
                  </div>
                </div>
              </div>

              
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-medium text-gray-900 mb-3">Aktivität</h4>
                <div class="space-y-2">
                  <div class="text-center text-gray-500">
                    Keine Statistiken verfügbar
                  </div>
                </div>
              </div>

              
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-medium text-gray-900 mb-3">Buchungen</h4>
                <div class="space-y-2">
                  <div class="text-center text-gray-500">
                    Keine Statistiken verfügbar
                  </div>
                </div>
              </div>
            </div>
          </div>

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
    </div> -->
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  middleware: 'admin',
  layout: 'admin',
  title: 'Klienten-Verwaltung'
})

// Stores
const adminStore = useAdminStore()

// State
const showStatsModal = ref(false)

// Computed
const clients = computed(() => adminStore.users)
const bookings = computed(() => adminStore.allBookings)

// Removed complex statistics - keeping it simple with just user data

// Removed complex statistics - keeping it simple with just user data

// Removed complex calculations - keeping it simple with just user data

// Removed complex calculations - keeping it simple with just user data

// Methods
const sendBulkEmail = () => {
  const activeClients = clients.value.filter(c => c.isActive)
  const emails = activeClients.map(c => c.email).join(';')
  
  const subject = encodeURIComponent('Neuigkeiten von Ihrem Fitnessstudio')
  const body = encodeURIComponent(`Liebe Klienten,\n\n`)
  
  window.open(`mailto:?bcc=${emails}&subject=${subject}&body=${body}`)
}

// Dynamic imports
const ParticipantsList = defineAsyncComponent(() => import('~/components/admin/ParticipantsList.vue'))
</script>