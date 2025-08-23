<template>
  <div class="space-y-6">
    <!-- Profile Information Card -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Persönliche Informationen</h3>
        <p class="mt-1 text-sm text-gray-500">
          Verwalten Sie Ihre persönlichen Daten und Kontaktinformationen
        </p>
      </div>
      
      <form @submit.prevent="handleUpdateProfile" class="p-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <!-- First Name -->
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700">
              Vorname *
            </label>
            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              :disabled="isUpdating"
            />
          </div>

          <!-- Last Name -->
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700">
              Nachname *
            </label>
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              :disabled="isUpdating"
            />
          </div>

          <!-- Email -->
          <div class="sm:col-span-2">
            <label for="email" class="block text-sm font-medium text-gray-700">
              E-Mail-Adresse *
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              :disabled="isUpdating"
            />
            <p class="mt-1 text-xs text-gray-500">
              Diese E-Mail-Adresse wird für Buchungsbestätigungen und wichtige Mitteilungen verwendet
            </p>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <div class="text-red-600 text-sm">
            {{ error }}
          </div>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <div class="text-green-600 text-sm">
            {{ successMessage }}
          </div>
        </div>

        <!-- Save Button -->
        <div class="mt-6 flex justify-end">
          <button
            type="submit"
            :disabled="!isFormChanged || isUpdating"
            class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg 
              v-if="isUpdating" 
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            {{ isUpdating ? 'Speichern...' : 'Änderungen speichern' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Account Settings Card -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Konto-Einstellungen</h3>
        <p class="mt-1 text-sm text-gray-500">
          Passwort ändern und Konto-Sicherheit verwalten
        </p>
      </div>
      
      <div class="p-6">
        <!-- Change Password Form -->
        <form @submit.prevent="handleChangePassword" class="space-y-4">
          <div>
            <label for="currentPassword" class="block text-sm font-medium text-gray-700">
              Aktuelles Passwort
            </label>
            <input
              id="currentPassword"
              v-model="passwordForm.currentPassword"
              type="password"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              :disabled="isChangingPassword"
            />
          </div>

          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700">
              Neues Passwort
            </label>
            <input
              id="newPassword"
              v-model="passwordForm.newPassword"
              type="password"
              required
              minlength="8"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              :disabled="isChangingPassword"
            />
            <p class="mt-1 text-xs text-gray-500">Mindestens 8 Zeichen</p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Passwort bestätigen
            </label>
            <input
              id="confirmPassword"
              v-model="passwordForm.confirmPassword"
              type="password"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              :disabled="isChangingPassword"
            />
          </div>

          <!-- Password Error -->
          <div v-if="passwordError" class="p-4 bg-red-50 border border-red-200 rounded-md">
            <div class="text-red-600 text-sm">
              {{ passwordError }}
            </div>
          </div>

          <!-- Password Validation -->
          <div v-if="passwordValidationErrors.length > 0" class="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <div class="text-yellow-600 text-sm">
              <ul class="list-disc list-inside">
                <li v-for="error in passwordValidationErrors" :key="error">{{ error }}</li>
              </ul>
            </div>
          </div>

          <!-- Change Password Button -->
          <div class="pt-4">
            <button
              type="submit"
              :disabled="!isPasswordFormValid || isChangingPassword"
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg 
                v-if="isChangingPassword" 
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              {{ isChangingPassword ? 'Passwort wird geändert...' : 'Passwort ändern' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Account Information Card -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Konto-Informationen</h3>
      </div>
      
      <div class="p-6">
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Mitglied seit</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ formatMemberSince(user?.createdAt) }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Rolle</dt>
            <dd class="mt-1">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {{ user?.role === 'admin' ? 'Administrator' : 'Mitglied' }}
              </span>
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Letzte Aktualisierung</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ formatLastUpdate(user?.updatedAt) }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Konto-ID</dt>
            <dd class="mt-1 text-sm text-gray-900 font-mono">{{ user?.id }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="bg-white shadow rounded-lg border-l-4 border-red-500">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-red-600">Gefahrenbereich</h3>
        <p class="mt-1 text-sm text-gray-500">
          Irreversible und gefährliche Aktionen
        </p>
      </div>
      
      <div class="p-6">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="text-sm font-medium text-gray-900">Konto löschen</h4>
            <p class="text-sm text-gray-500">
              Alle Ihre Daten werden dauerhaft gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
          </div>
          <button
            @click="handleDeleteAccount"
            class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Konto löschen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Stores and composables
const { user } = useAuth()
const authStore = useAuthStore()

// State
const form = reactive({
  firstName: user.value?.firstName || '',
  lastName: user.value?.lastName || '',
  email: user.value?.email || ''
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const originalData = reactive({
  firstName: user.value?.firstName || '',
  lastName: user.value?.lastName || '',
  email: user.value?.email || ''
})

const isUpdating = ref(false)
const isChangingPassword = ref(false)
const error = ref<string | null>(null)
const passwordError = ref<string | null>(null)
const successMessage = ref<string | null>(null)

// Computed
const isFormChanged = computed(() => {
  return form.firstName !== originalData.firstName ||
         form.lastName !== originalData.lastName ||
         form.email !== originalData.email
})

const passwordValidationErrors = computed(() => {
  const errors: string[] = []
  
  if (passwordForm.newPassword && passwordForm.newPassword.length < 8) {
    errors.push('Passwort muss mindestens 8 Zeichen haben')
  }
  
  if (passwordForm.newPassword && passwordForm.confirmPassword && 
      passwordForm.newPassword !== passwordForm.confirmPassword) {
    errors.push('Passwörter stimmen nicht überein')
  }
  
  return errors
})

const isPasswordFormValid = computed(() => {
  return passwordForm.currentPassword &&
         passwordForm.newPassword &&
         passwordForm.confirmPassword &&
         passwordValidationErrors.value.length === 0
})

// Methods
const handleUpdateProfile = async () => {
  isUpdating.value = true
  error.value = null
  successMessage.value = null

  try {
    // Simulate API call - in real app this would update user profile
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update original data
    Object.assign(originalData, form)
    
    successMessage.value = 'Profil erfolgreich aktualisiert'
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      successMessage.value = null
    }, 5000)
    
  } catch (err: any) {
    error.value = err.message || 'Fehler beim Aktualisieren des Profils'
  } finally {
    isUpdating.value = false
  }
}

const handleChangePassword = async () => {
  isChangingPassword.value = true
  passwordError.value = null

  try {
    // Simulate API call - in real app this would change password
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Reset form
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
    
    successMessage.value = 'Passwort erfolgreich geändert'
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      successMessage.value = null
    }, 5000)
    
  } catch (err: any) {
    passwordError.value = err.message || 'Fehler beim Ändern des Passworts'
  } finally {
    isChangingPassword.value = false
  }
}

const handleDeleteAccount = async () => {
  const confirmed = confirm(
    'Sind Sie sicher, dass Sie Ihr Konto löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.'
  )
  
  if (confirmed) {
    const doubleConfirmed = confirm(
      'Letzte Warnung: Alle Ihre Daten werden dauerhaft gelöscht. Fortfahren?'
    )
    
    if (doubleConfirmed) {
      // In a real app, this would call an API to delete the account
      alert('Konto-Löschung würde hier implementiert werden')
    }
  }
}

const formatMemberSince = (dateString?: string) => {
  if (!dateString) return 'Unbekannt'
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

const formatLastUpdate = (dateString?: string) => {
  if (!dateString) return 'Nie'
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Watch for user changes
watch(() => user.value, (newUser) => {
  if (newUser) {
    form.firstName = newUser.firstName
    form.lastName = newUser.lastName
    form.email = newUser.email
    
    originalData.firstName = newUser.firstName
    originalData.lastName = newUser.lastName
    originalData.email = newUser.email
  }
}, { immediate: true })

// Clear messages when form changes
watch([() => form.firstName, () => form.lastName, () => form.email], () => {
  if (error.value) error.value = null
  if (successMessage.value) successMessage.value = null
})

watch([() => passwordForm.currentPassword, () => passwordForm.newPassword, () => passwordForm.confirmPassword], () => {
  if (passwordError.value) passwordError.value = null
})
</script>