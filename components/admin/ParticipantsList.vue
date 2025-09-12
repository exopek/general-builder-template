<template>
  <div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Gesamt Klienten</dt>
                <dd class="text-lg font-medium text-gray-900">{{ clientStats.total }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Aktive Klienten</dt>
                <dd class="text-lg font-medium text-gray-900">{{ clientStats.active }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Inaktive Klienten</dt>
                <dd class="text-lg font-medium text-gray-900">{{ clientStats.inactive }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Actions -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div class="flex-1 min-w-0">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Nach Name oder E-Mail suchen..."
              class="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div class="flex space-x-3">
            <select
              v-model="statusFilter"
              class="block px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Alle Klienten</option>
              <option value="active">Aktive</option>
              <option value="inactive">Inaktive</option>
            </select>
            <button
              @click="exportClients"
              class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
            >
              Export CSV
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Participants Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">
          Klienten ({{ filteredClients.length }})
        </h3>
      </div>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
        <p class="text-gray-500">Klienten werden geladen...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredClients.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p class="text-gray-500 text-lg">{{ searchQuery || statusFilter ? 'Keine passenden Klienten gefunden' : 'Noch keine Klienten registriert' }}</p>
        <p v-if="searchQuery || statusFilter" class="text-sm text-gray-400 mt-1">
          Versuchen Sie andere Filterkriterien
        </p>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Klient
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rollen
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                E-Mail
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="client in paginatedClients"
              :key="client.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0">
                    <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span class="text-sm font-medium text-indigo-600">
                        {{ getInitials(`${client.firstName} ${client.lastName}`) }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ client.firstName }} {{ client.lastName }}</div>
                    <div class="text-sm text-gray-500">{{ client.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ client.roles.join(', ') }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ client.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusBadgeClass(client.isActive)"
                >
                  {{ getStatusText(client.isActive) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ client.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex space-x-2">
                  <button
                    @click="viewClientDetails(client)"
                    class="text-indigo-600 hover:text-indigo-900 font-medium"
                  >
                    Details
                  </button>
                  <button
                    @click="contactClient(client)"
                    class="text-green-600 hover:text-green-900 font-medium"
                  >
                    Kontakt
                  </button>
                  <button
                    v-if="client.isActive"
                    @click="deactivateClient(client.id)"
                    class="text-red-600 hover:text-red-900 font-medium"
                    :disabled="isUpdating"
                  >
                    Deaktivieren
                  </button>
                  <button
                    v-else
                    @click="activateClient(client.id)"
                    class="text-green-600 hover:text-green-900 font-medium"
                    :disabled="isUpdating"
                  >
                    Aktivieren
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Zurück
            </button>
            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Weiter
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Zeige
                <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
                bis
                <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredClients.length) }}</span>
                von
                <span class="font-medium">{{ filteredClients.length }}</span>
                Ergebnissen
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="currentPage--"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                
                <template v-for="page in visiblePages" :key="page">
                  <button
                    v-if="page === '...'"
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                  >
                    ...
                  </button>
                  <button
                    v-else
                    @click="currentPage = page"
                    :class="[
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                      page === currentPage
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    ]"
                  >
                    {{ page }}
                  </button>
                </template>
                
                <button
                  @click="currentPage++"
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types'

// Stores
const adminStore = useAdminStore()

// State
const isLoading = ref(false)
const isUpdating = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = 15

// Computed
const clients = computed(() => adminStore.users)

const clientStats = computed(() => {
  return {
    total: clients.value.length,
    active: clients.value.filter(c => c.isActive).length,
    inactive: clients.value.filter(c => !c.isActive).length
  }
})

const filteredClients = computed(() => {
  let filtered = clients.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(client => 
      `${client.firstName} ${client.lastName}`.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query)
    )
  }

  // Status filter
  if (statusFilter.value) {
    if (statusFilter.value === 'active') {
      filtered = filtered.filter(client => client.isActive)
    } else if (statusFilter.value === 'inactive') {
      filtered = filtered.filter(client => !client.isActive)
    }
  }

  // Sort by email (alphabetical)
  return filtered.sort((a, b) => a.email.localeCompare(b.email))
})

const totalPages = computed(() => Math.ceil(filteredClients.value.length / itemsPerPage))

const paginatedClients = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredClients.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)
    
    if (current > 3) {
      pages.push('...')
    }
    
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i)
    }
    
    if (current < total - 2) {
      pages.push('...')
    }
    
    if (total > 1) {
      pages.push(total)
    }
  }

  return pages
})

// Methods
const getInitials = (name: string) => {
  return name.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Removed formatDate function as we no longer display dates

const getStatusText = (isActive: boolean) => {
  return isActive ? 'Aktiv' : 'Inaktiv'
}

const getStatusBadgeClass = (isActive: boolean) => {
  return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
}

const viewClientDetails = (client: User) => {
  // TODO: Implement client details modal or navigation
  console.log('View client details:', client)
}

const contactClient = (client: User) => {
  // Create mailto link
  const subject = encodeURIComponent('Kontakt vom Fitnessstudio')
  const body = encodeURIComponent(`Hallo ${client.firstName} ${client.lastName},\n\n`)
  window.open(`mailto:${client.email}?subject=${subject}&body=${body}`)
}

const activateClient = async (clientId: string) => {
  isUpdating.value = true
  try {
    // TODO: Implement client status update in admin store
    console.log('Activate client:', clientId)
    // const result = await adminStore.updateClientStatus(clientId, true)
    // if (!result.success) {
    //   console.error('Failed to activate client:', result.error)
    // }
  } catch (error) {
    console.error('Error activating client:', error)
  } finally {
    isUpdating.value = false
  }
}

const deactivateClient = async (clientId: string) => {
  if (!confirm('Sind Sie sicher, dass Sie diesen Klienten deaktivieren möchten?')) {
    return
  }
  
  isUpdating.value = true
  try {
    // TODO: Implement client status update in admin store
    console.log('Deactivate client:', clientId)
    // const result = await adminStore.updateClientStatus(clientId, false)
    // if (!result.success) {
    //   console.error('Failed to deactivate client:', result.error)
    // }
  } catch (error) {
    console.error('Error deactivating client:', error)
  } finally {
    isUpdating.value = false
  }
}

const exportClients = () => {
  try {
    // Create CSV content
    const headers = ['Name', 'E-Mail', 'Status', 'Rollen', 'ID']
    const csvContent = [
      headers.join(','),
      ...filteredClients.value.map(client => [
        `"${client.firstName} ${client.lastName}"`,
        `"${client.email}"`,
        getStatusText(client.isActive),
        `"${client.roles.join(', ')}"`,
        client.id
      ].join(','))
    ].join('\n')
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `klienten-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  } catch (error) {
    console.error('Error exporting clients:', error)
  }
}

// Reset pagination when filters change
watch([searchQuery, statusFilter], () => {
  currentPage.value = 1
})

// Load clients on mount
onMounted(async () => {
  isLoading.value = true
  try {
    console.log('Loading clients...')
    await adminStore.getUsers()
  } catch (error) {
    console.error('Error loading clients:', error)
  } finally {
    isLoading.value = false
  }
})
</script>