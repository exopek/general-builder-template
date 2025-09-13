<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Profil</h1>
      <p class="mt-1 text-sm text-gray-500">
        Verwalten Sie Ihre persönlichen Daten und Einstellungen
      </p>
    </div>

    <!-- Main Content -->
    <div>
      <UserProfile />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'user',
  layout: 'user',
  title: 'Profil'
})

const UserProfile = defineAsyncComponent(() => import('~/components/user/UserProfile.vue'))
</script>