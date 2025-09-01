<template>
  <header class="sticky top-0 z-50 bg-white/10 backdrop-blur-lg border-b border-gray-100">
    <!-- Desktop Header -->
    <div class="desktop-header flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center">
        <img src="https://cdn.builder.io/api/v1/image/assets%2F2221ab9020b44cdd9cbb4a4793414e46%2F698b3f14d8e54640a0e15fce4eb0c6a3" alt="Gym Logo" class="h-18 w-auto">
      </NuxtLink>

      <!-- Navigation -->
      <nav class="flex items-center space-x-8">
        <NuxtLink to="/kurse" class="nav-link">
          Kurse
        </NuxtLink>
        <NuxtLink to="/preise" class="nav-link">
          Preise
        </NuxtLink>
        <div class="relative" @mouseenter="handleShowAngebotMenu" @mouseleave="handleHideAngebotMenu">
          <button class="nav-link flex items-center">
            Angebot
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <!-- Mega Menu -->
          <div v-if="showAngebotMenu" 
            class="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50" @mouseenter="handleShowAngebotMenu" @mouseleave="handleHideAngebotMenu">
            <NuxtLink to="/mitgliedschaften" 
              class="block py-2 px-4 text-gray-700 nav-link">
              Mitgliedschaften
            </NuxtLink>
            <NuxtLink to="/fragebogen" 
              class="block py-2 px-4 text-gray-700 nav-link">
              Fragebogen
            </NuxtLink>
          </div>
        </div>
        <NuxtLink to="/kontakt" class="nav-link">
          Kontakt
        </NuxtLink>
        <NuxtLink to="/faq" class="nav-link">
          FAQ
        </NuxtLink>
      </nav>

      <!-- CTA Button -->
      <NuxtLink to="/probiertraining" 
        class="text-white px-6 py-2 rounded-lg font-medium transition-colors"
        style="background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%)">
        Probiertraining
      </NuxtLink>
    </div>

    <!-- Mobile Header -->
    <div class="mobile-header flex items-center justify-between px-4 py-4">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center">
        <img src="https://cdn.builder.io/api/v1/image/assets%2F2221ab9020b44cdd9cbb4a4793414e46%2F698b3f14d8e54640a0e15fce4eb0c6a3" alt="Gym Logo" class="h-7 w-auto">
      </NuxtLink>

      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu" 
        >
        <svg class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Sidebar -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      
      leave-active-class="transition-all duration-300 ease-in"
      
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
          <div class="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white/70 shadow-xl">
            <!-- Sidebar Header -->
            <div class="flex items-center justify-between px-4 py-4">
              <img src="https://cdn.builder.io/api/v1/image/assets%2F2221ab9020b44cdd9cbb4a4793414e46%2F698b3f14d8e54640a0e15fce4eb0c6a3" alt="Gym Logo" class="h-7 w-auto">
              <button @click="toggleMobileMenu">
                <svg class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <!-- Sidebar Navigation -->
            <nav class="flex flex-col px-4 pt-0 pb-6 space-y-4 bg-white/70">
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
                  class="block w-full text-white text-center py-3 px-4 rounded-lg font-medium transition-colors"
                  style="background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%)">
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
const showAngebotMenu = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

let hideMenuTimeout: NodeJS.Timeout | null = null

const handleShowAngebotMenu = () => {
  showAngebotMenu.value = true
  if (hideMenuTimeout) {
    clearTimeout(hideMenuTimeout)
    hideMenuTimeout = null
  }
}

const handleHideAngebotMenu = () => {
  hideMenuTimeout = setTimeout(() => {
    showAngebotMenu.value = false
  }, 200)
}

// Close menu on escape key
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
}

// Prevent body scroll when mobile menu is open
watch(isMobileMenuOpen, (isOpen: boolean) => {
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

<style scoped>
/* Mobile-First: Mobile Header sichtbar, Desktop Header versteckt */
.mobile-header {
  display: flex;
}

.desktop-header {
  display: none;
}

/* Desktop: Ab 768px - Desktop Header sichtbar, Mobile Header versteckt */
@media (min-width: 768px) {
  .mobile-header {
    display: none;
  }
  
  .desktop-header {
    display: flex;
  }
}

/* Navigation Links with Gradient Hover */
.nav-link {
  color: rgb(55, 65, 81);
  font-weight: 500;
  transition: all 0.15s ease-in-out;
  text-decoration: none;
  background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%);
  background-size: 0% 100%;
  background-repeat: no-repeat;
  background-position: left;
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgb(55, 65, 81);
}

.nav-link:hover {
  background-size: 100% 100%;
  -webkit-text-fill-color: transparent;
}

</style>