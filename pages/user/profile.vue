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