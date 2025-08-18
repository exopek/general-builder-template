<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-900">FitGym</h1>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <a href="/" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Start</a>
          <a href="/kurse" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Kurse</a>
          <a href="/preise" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Preise</a>
          <a href="/team" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Team</a>
          <a href="/kontakt" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Kontakt</a>
        </nav>

        <!-- CTA Button -->
        <div class="hidden md:flex items-center gap-4">
          <button class="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5">
            Jetzt anmelden
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="toggleMobileMenu" class="md:hidden p-2">
          <svg class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t border-gray-200">
        <div class="flex flex-col gap-4">
          <a href="/" class="text-gray-700 hover:text-blue-600 font-medium py-2">Start</a>
          <a href="/kurse" class="text-gray-700 hover:text-blue-600 font-medium py-2">Kurse</a>
          <a href="/preise" class="text-gray-700 hover:text-blue-600 font-medium py-2">Preise</a>
          <a href="/team" class="text-gray-700 hover:text-blue-600 font-medium py-2">Team</a>
          <a href="/kontakt" class="text-gray-700 hover:text-blue-600 font-medium py-2">Kontakt</a>
          <button class="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold mt-4 w-full">
            Jetzt anmelden
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>