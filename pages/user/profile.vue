<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <h1 class="text-3xl font-bold text-gray-900">Profil</h1>
          <p class="mt-1 text-sm text-gray-500">
            Verwalten Sie Ihre persönlichen Daten und Einstellungen
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mt-6">
        <NuxtLink
          to="/user"
          class="inline-flex items-center text-indigo-600 hover:text-indigo-500"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Zurück
        </NuxtLink>
      </div>
    </div>
    

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <UserProfile />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'user',
  title: 'Profil'
})

const UserProfile = defineAsyncComponent(() => import('~/components/user/UserProfile.vue'))
</script>