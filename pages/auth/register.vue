<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Registrierung
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Oder
          <NuxtLink to="/auth/login" class="font-medium text-indigo-600 hover:text-indigo-500">
            melden Sie sich an, wenn Sie bereits ein Konto haben
          </NuxtLink>
        </p>
      </div>
      
      <form @submit.prevent="handleRegister" class="mt-8 space-y-6">
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700">Vorname</label>
              <input
                id="firstName"
                v-model="form.firstName"
                name="firstName"
                type="text"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Max"
                :disabled="isLoading"
              />
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700">Nachname</label>
              <input
                id="lastName"
                v-model="form.lastName"
                name="lastName"
                type="text"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mustermann"
                :disabled="isLoading"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">E-Mail-Adresse</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="max@example.com"
              :disabled="isLoading"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Passwort</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Mindestens 8 Zeichen"
              :disabled="isLoading"
            />
            <p class="mt-1 text-xs text-gray-500">
              Das Passwort muss mindestens 8 Zeichen lang sein.
            </p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Passwort bestätigen</label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              name="confirmPassword"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Passwort wiederholen"
              :disabled="isLoading"
            />
          </div>
        </div>

        <div v-if="error" class="rounded-md bg-red-50 p-4">
          <div class="text-sm text-red-700">
            {{ error }}
          </div>
        </div>

        <div v-if="validationErrors.length > 0" class="rounded-md bg-yellow-50 p-4">
          <div class="text-sm text-yellow-700">
            <ul class="list-disc list-inside space-y-1">
              <li v-for="err in validationErrors" :key="err">{{ err }}</li>
            </ul>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading || !isFormValid"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                v-if="!isLoading"
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
              <svg
                v-else
                class="animate-spin h-5 w-5 text-indigo-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </span>
            {{ isLoading ? 'Registrierung läuft...' : 'Registrieren' }}
          </button>
        </div>

        <div class="text-center">
          <NuxtLink to="/" class="text-sm text-indigo-600 hover:text-indigo-500">
            ← Zurück zur Startseite
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const { register, isLoading } = useAuth()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const error = ref<string | null>(null)

const validationErrors = computed(() => {
  const errors: string[] = []
  
  if (form.password && form.password.length < 8) {
    errors.push('Das Passwort muss mindestens 8 Zeichen lang sein')
  }
  
  if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
    errors.push('Die Passwörter stimmen nicht überein')
  }
  
  return errors
})

const isFormValid = computed(() => {
  return form.firstName.trim() !== '' &&
         form.lastName.trim() !== '' &&
         form.email.trim() !== '' &&
         form.password.trim() !== '' &&
         form.confirmPassword.trim() !== '' &&
         validationErrors.value.length === 0
})

const handleRegister = async () => {
  if (!isFormValid.value) return
  
  error.value = null
  
  const result = await register({
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    email: form.email.trim(),
    password: form.password
  })
  
  if (!result.success) {
    error.value = result.error || 'Registrierung fehlgeschlagen'
  }
}

// Clear error when form changes
watch([
  () => form.firstName,
  () => form.lastName, 
  () => form.email,
  () => form.password,
  () => form.confirmPassword
], () => {
  if (error.value) {
    error.value = null
  }
})
</script>