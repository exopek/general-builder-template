<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100">
    <!-- Desktop Header -->
    <div class="hidden md:flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center">
        <div class="text-2xl font-bold text-gray-900">EXOPEK GYM</div>
      </NuxtLink>

      <!-- Navigation -->
      <nav class="flex items-center space-x-8">
        <NuxtLink to="/kurse" class="text-gray-700 hover:text-gray-900 font-medium transition-colors">
          Kurse
        </NuxtLink>
        <NuxtLink to="/preise" class="text-gray-700 hover:text-gray-900 font-medium transition-colors">
          Preise
        </NuxtLink>
        <NuxtLink to="/angebot" class="text-gray-700 hover:text-gray-900 font-medium transition-colors">
          Angebot
        </NuxtLink>
        <NuxtLink to="/kontakt" class="text-gray-700 hover:text-gray-900 font-medium transition-colors">
          Kontakt
        </NuxtLink>
        <NuxtLink to="/faq" class="text-gray-700 hover:text-gray-900 font-medium transition-colors">
          FAQ
        </NuxtLink>
      </nav>

      <!-- CTA Button -->
      <NuxtLink to="/probiertraining" 
        class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
        Probiertraining
      </NuxtLink>
    </div>

    <!-- Mobile Header -->
    <div class="flex md:hidden items-center justify-between px-4 py-4">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center">
        <div class="text-xl font-bold text-gray-900">EXOPEK GYM</div>
      </NuxtLink>

      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu" 
        class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
        <svg class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Sidebar -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isMobileMenuOpen" class="fixed inset-0 z-50 md:hidden">
        <!-- Backdrop -->
        <div @click="toggleMobileMenu" class="fixed inset-0 bg-black/50"></div>
        
        <!-- Sidebar -->
        <Transition
          enter-active-class="transition-transform duration-300 ease-out"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition-transform duration-300 ease-in"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <div class="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl">
            <!-- Sidebar Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200">
              <div class="text-xl font-bold text-gray-900">EXOPEK GYM</div>
              <button @click="toggleMobileMenu" 
                class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <svg class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <!-- Sidebar Navigation -->
            <nav class="flex flex-col p-6 space-y-4">
              <NuxtLink @click="toggleMobileMenu" to="/kurse" 
                class="block py-3 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                Kurse
              </NuxtLink>
              <NuxtLink @click="toggleMobileMenu" to="/preise" 
                class="block py-3 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                Preise
              </NuxtLink>
              <NuxtLink @click="toggleMobileMenu" to="/angebot" 
                class="block py-3 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                Angebot
              </NuxtLink>
              <NuxtLink @click="toggleMobileMenu" to="/kontakt" 
                class="block py-3 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                Kontakt
              </NuxtLink>
              <NuxtLink @click="toggleMobileMenu" to="/faq" 
                class="block py-3 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                FAQ
              </NuxtLink>
              
              <!-- Mobile CTA Button -->
              <div class="pt-4 border-t border-gray-200">
                <NuxtLink @click="toggleMobileMenu" to="/probiertraining" 
                  class="block w-full bg-red-500 hover:bg-red-600 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors">
                  Probiertraining
                </NuxtLink>
              </div>
            </nav>
          </div>
        </Transition>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Close menu on escape key
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
}

// Prevent body scroll when mobile menu is open
watch(isMobileMenuOpen, (isOpen) => {
  if (typeof document !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeydown)
    } else {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeydown)
    }
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleKeydown)
  }
})
</script>