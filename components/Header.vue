<template>
  <header class="fixed top-0 z-50 w-full transition-all"
    :class="[
      isScrolled
        ? 'card-glass mt-4 rounded-full shadow-lg'
        : 'bg-white border-b border-gray-200',
      'header-container'
    ]">
    <!-- Desktop Header -->
    <div class="desktop-header container flex items-center justify-between transition-all py-2"
      :class="[
        !isScrolled ? 'text-gray-900' : 'text-white'
      ]">
      <!-- Logo -->
      <a href="/" class="flex items-center">
        <img src="https://cdn.builder.io/api/v1/image/assets%2F2221ab9020b44cdd9cbb4a4793414e46%2F698b3f14d8e54640a0e15fce4eb0c6a3"
             alt="Gym Logo"
             class="w-auto h-14 transition-all">
      </a>

      <!-- Navigation -->
      <nav class="flex items-center gap-16">
        <a href="/kurse">
          Kurse
        </a>
        <div class="relative" @mouseenter="handleShowAngebotMenu" @mouseleave="handleHideAngebotMenu">
          <button class="flex items-center gap-1">
            Angebot
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <!-- Glasmorphism Mega Menu -->
          <div v-if="showAngebotMenu"
            class="fixed mt-8 card-glass py-6 z-50 left-1/2 transform -translate-x-1/2"
            style="top: 60px;"
            @mouseenter="handleShowAngebotMenu" @mouseleave="handleHideAngebotMenu">

            <!-- 3-Spalten Layout -->
            <div class="container">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

              <!-- Spalte 1: Direkt Loslegen -->
              <div>
                <h3 class="text-2xl font-black mb-4 text-gradient-warm">Direkt Loslegen</h3>
                
                <!-- Kurse -->
                <a href="/kurse" class="block bg-white rounded-xl p-4 mb-3 shadow-md">
                  <div class="font-semibold text-sm mb-1 text-gray-900">Kurse</div>
                  <div class="text-gray-500 text-xs">Wann kommst Du das nächste mal ins Training?</div>
                </a>

                <!-- Mitgliedschaften -->
                <a href="/mitgliedschaften" class="block bg-white rounded-xl p-4 mb-3 shadow-md">
                  <div class="font-semibold text-sm mb-1 text-gray-900">Mitgliedschaften</div>
                  <div class="text-gray-500 text-xs">Was ist Dir Deine Fitness wert?</div>
                </a>

                <!-- Probetraining Button -->
                <a href="/probetraining" class="btn btn-primary text-sm px-6 py-3 text-center">
                  Probetraining
                </a>
              </div>

              <!-- Spalte 2: Programm & Specials -->
              <div>
                <h3 class="text-2xl font-black mb-4 text-gradient-warm">Programm & Specials</h3>

                <!-- 7 Wochen Challenge -->
                <a href="/7-wochen-challenge" class="block bg-white rounded-xl p-4 mb-3 shadow-md">
                  <div class="font-semibold text-sm mb-1 text-gray-900">7 Wochen Challenge</div>
                  <div class="text-gray-500 text-xs">Geld Zurück für Deinen Erfolg</div>
                </a>

                <!-- Personal Training -->
                <a href="/personal-training" class="block bg-white rounded-xl p-4 mb-3 shadow-md">
                  <div class="font-semibold text-sm mb-1 text-gray-900">Personal Training</div>
                  <div class="text-gray-500 text-xs">Abgestimmte Trainingserfolge</div>
                </a>

                <!-- Level Up Weeks -->
                <a href="/level-up-weeks" class="block bg-white rounded-xl p-4 shadow-md">
                  <div class="font-semibold text-sm mb-1 text-gray-900">Level Up Weeks</div>
                  <div class="text-gray-500 text-xs">Dein Performance Schub</div>
                </a>
              </div>

              <!-- Spalte 3: Mehr erfahren -->
              <div>
                <h3 class="text-2xl font-black mb-4 text-gradient-warm">Mehr erfahren</h3>
                <div class="flex flex-col gap-2">
                  <a href="/ueber-uns" class="nav-pill">
                    Über uns
                  </a>
                  <a href="/gym-in-linden" class="nav-pill">
                    Gym in Linden
                  </a>
                  <a href="/fragebogen" class="nav-pill">
                    Fitness-Check
                  </a>
                  <a href="/blog" class="nav-pill">
                    Blog
                  </a>
                  <a href="/kontakt" class="nav-pill">
                    Kontakt
                  </a>
                </div>
              </div>

              </div>
            </div>

          </div>
        </div>
        <a href="/mitgliedschaften">
          Preise
        </a>
      </nav>

      <!-- CTA Button -->
      <a href="/probetraining" class="btn btn-primary">
        Probetraining
      </a>
    </div>

    <!-- Mobile Header -->
    <div class="mobile-header container flex items-center justify-between py-4 transition-all"
      :class="[
        !isScrolled ? 'text-gray-900' : (isDarkBackground ? 'text-white' : 'text-gray-900')
      ]"
      style="pointer-events: auto; position: relative; z-index: 60;">
      <!-- Logo -->
      <a href="/" class="flex items-center">
        <img src="https://cdn.builder.io/api/v1/image/assets%2F2221ab9020b44cdd9cbb4a4793414e46%2F698b3f14d8e54640a0e15fce4eb0c6a3"
             alt="Gym Logo"
             class="w-auto transition-all"
             :class="isScrolled ? 'h-6' : 'h-7'">
      </a>

      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu"
        class="p-3 text-gray-900 transition-all hover:text-gray-500 z-[100] relative touch-manipulation"
        :class="{
          'burger-active': isMobileMenuOpen,
          'text-white': isScrolled && !isMobileMenuOpen,
          'text-gray-900': !isScrolled || isMobileMenuOpen
        }"
        :aria-expanded="isMobileMenuOpen"
        :aria-controls="'mobile-menu'"
        aria-label="Toggle navigation menu"
        style="pointer-events: auto; -webkit-tap-highlight-color: transparent;">
        <div class="burger-icon">
          <span class="burger-line"></span>
          <span class="burger-line"></span>
          <span class="burger-line"></span>
        </div>
      </button>
    </div>

    <!-- Mobile Drawer Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isMobileMenuOpen" class="fixed inset-0 z-[999] md:hidden" @click="closeMobileMenu">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <!-- Full-width Mobile Menu -->
        <div
          id="mobile-menu"
          class="absolute inset-0 bg-white overflow-y-auto safe-area-inset"
          @click.stop
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
          role="navigation"
          aria-label="Main navigation"
          style="height: 100vh; height: 100dvh;">

            <!-- Header with close button -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
              <img src="https://cdn.builder.io/api/v1/image/assets%2F2221ab9020b44cdd9cbb4a4793414e46%2F698b3f14d8e54640a0e15fce4eb0c6a3"
                   alt="Gym Logo"
                   class="h-8">
              <button @click="toggleMobileMenu"
                class="p-3 -m-3 text-gray-500 hover:text-gray-700 transition-colors touch-manipulation"
                aria-label="Close menu"
                style="min-height: 44px; min-width: 44px;">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Navigation Content -->
            <div class="px-6 py-6 space-y-8 min-h-0 flex-1">

              <!-- Quick Actions Section -->
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Direkt Loslegen</h3>
                <div class="space-y-3">
                  <a @click="closeMobileMenu" href="/kurse"
                    class="mobile-nav-item group">
                    <div class="font-semibold text-gray-900 group-hover:text-orange-500">Kurse</div>
                    <div class="text-sm text-gray-500">Wann kommst Du das nächste mal ins Training?</div>
                  </a>
                  <a @click="closeMobileMenu" href="/mitgliedschaften"
                    class="mobile-nav-item group">
                    <div class="font-semibold text-gray-900 group-hover:text-orange-500">Mitgliedschaften</div>
                    <div class="text-sm text-gray-500">Was ist Dir Deine Fitness wert?</div>
                  </a>
                </div>
              </div>

              <!-- Programs Section -->
              <div>
                <button @click="toggleProgramsSection"
                  class="flex items-center justify-between w-full text-left mb-3"
                  :aria-expanded="showProgramsSection"
                  aria-controls="programs-section">
                  <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Programme & Specials</h3>
                  <svg class="w-5 h-5 text-gray-400 transition-transform"
                    :class="{ 'rotate-180': showProgramsSection }"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <Transition
                  enter-active-class="transition-all duration-200 ease-out"
                  enter-from-class="opacity-0 max-h-0"
                  enter-to-class="opacity-100 max-h-96"
                  leave-active-class="transition-all duration-200 ease-in"
                  leave-from-class="opacity-100 max-h-96"
                  leave-to-class="opacity-0 max-h-0">
                  <div v-show="showProgramsSection" id="programs-section" class="space-y-3 overflow-hidden">
                    <a @click="closeMobileMenu" href="/7-wochen-challenge"
                      class="mobile-nav-item group">
                      <div class="font-semibold text-gray-900 group-hover:text-orange-500">7 Wochen Challenge</div>
                      <div class="text-sm text-gray-500">Geld Zurück für Deinen Erfolg</div>
                    </a>
                    <a @click="closeMobileMenu" href="/personal-training"
                      class="mobile-nav-item group">
                      <div class="font-semibold text-gray-900 group-hover:text-orange-500">Personal Training</div>
                      <div class="text-sm text-gray-500">Abgestimmte Trainingserfolge</div>
                    </a>
                    <a @click="closeMobileMenu" href="/level-up-weeks"
                      class="mobile-nav-item group">
                      <div class="font-semibold text-gray-900 group-hover:text-orange-500">Level Up Weeks</div>
                      <div class="text-sm text-gray-500">Dein Performance Schub</div>
                    </a>
                  </div>
                </Transition>
              </div>

              <!-- Info Section -->
              <div>
                <button @click="toggleInfoSection"
                  class="flex items-center justify-between w-full text-left mb-3"
                  :aria-expanded="showInfoSection"
                  aria-controls="info-section">
                  <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Mehr erfahren</h3>
                  <svg class="w-5 h-5 text-gray-400 transition-transform"
                    :class="{ 'rotate-180': showInfoSection }"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <Transition
                  enter-active-class="transition-all duration-200 ease-out"
                  enter-from-class="opacity-0 max-h-0"
                  enter-to-class="opacity-100 max-h-96"
                  leave-active-class="transition-all duration-200 ease-in"
                  leave-from-class="opacity-100 max-h-96"
                  leave-to-class="opacity-0 max-h-0">
                  <div v-show="showInfoSection" id="info-section" class="space-y-2 overflow-hidden">
                    <a @click="closeMobileMenu" href="/ueber-uns"
                      class="mobile-nav-pill">Über uns</a>
                    <a @click="closeMobileMenu" href="/gym-in-linden"
                      class="mobile-nav-pill">Gym in Linden</a>  
                    <a @click="closeMobileMenu" href="/fragebogen"
                      class="mobile-nav-pill">Fitness-Check</a>
                    <a @click="closeMobileMenu" href="/blog"
                      class="mobile-nav-pill">Blog</a>
                    <a @click="closeMobileMenu" href="/kontakt"
                      class="mobile-nav-pill">Kontakt</a>
                  </div>
                </Transition>
              </div>

              <!-- CTA Button -->
              <div class="pt-6">
                <a @click="closeMobileMenu" href="/probetraining"
                  class="btn btn-primary w-full text-center py-4 text-lg font-semibold">
                  Probetraining
                </a>
              </div>

              <!-- Swipe hint -->
              <div class="pt-8 pb-6 text-center">
                <p class="text-sm text-gray-400">Swipe nach unten zum Schließen</p>
              </div>

            </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false)
const showAngebotMenu = ref(false)
const isScrolled = ref(false)
const isDarkBackground = ref(false)
const showProgramsSection = ref(false)
const showInfoSection = ref(false)

// Touch gesture state
const touchStartX = ref(0)
const touchStartY = ref(0)
const isDragging = ref(false)

// Mobile menu management
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  showProgramsSection.value = false
  showInfoSection.value = false
}

// Collapsible section toggles
const toggleProgramsSection = () => {
  showProgramsSection.value = !showProgramsSection.value
}

const toggleInfoSection = () => {
  showInfoSection.value = !showInfoSection.value
}

// Touch gesture handlers for swipe-to-close (swipe down from top)
const handleTouchStart = (event: TouchEvent) => {
  if (!isMobileMenuOpen.value) return

  const touch = event.touches[0]
  touchStartX.value = touch.clientX
  touchStartY.value = touch.clientY
  isDragging.value = true
}

const handleTouchMove = (event: TouchEvent) => {
  if (!isDragging.value || !isMobileMenuOpen.value) return

  const touch = event.touches[0]
  const deltaX = touch.clientX - touchStartX.value
  const deltaY = touch.clientY - touchStartY.value

  // Only handle downward swipes from the top area
  if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0 && touchStartY.value < 100) {
    // Prevent default scrolling behavior
    event.preventDefault()

    // Apply visual feedback - slightly scale down the menu
    const menu = document.getElementById('mobile-menu')
    if (menu && deltaY > 30) {
      const scale = Math.max(0.95, 1 - (deltaY * 0.001))
      menu.style.transform = `scale(${scale})`
      menu.style.transition = 'none'
    }
  }
}

const handleTouchEnd = (event: TouchEvent) => {
  if (!isDragging.value || !isMobileMenuOpen.value) return

  const touch = event.changedTouches[0]
  const deltaX = touch.clientX - touchStartX.value
  const deltaY = touch.clientY - touchStartY.value

  // Reset visual feedback
  const menu = document.getElementById('mobile-menu')
  if (menu) {
    menu.style.transform = ''
    menu.style.transition = ''
  }

  // Close menu if swipe distance is significant (>80px downward from top)
  if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 80 && touchStartY.value < 100) {
    closeMobileMenu()
  }

  isDragging.value = false
}

let hideMenuTimeout: number | null = null

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

// Simplified background detection for desktop only
const detectBackgroundColor = () => {
  if (typeof window === 'undefined') return

  // Skip complex detection on mobile for performance
  const isMobile = window.innerWidth < 768
  if (isMobile) {
    isDarkBackground.value = false
    return
  }

  // Simple detection based on common patterns
  const header = document.querySelector('.header-container')
  if (!header) return

  const headerRect = header.getBoundingClientRect()
  const elementBehind = document.elementFromPoint(headerRect.left + headerRect.width / 2, headerRect.bottom + 10)

  if (elementBehind) {
    // Check for common dark background patterns
    const hasDarkBg = elementBehind.classList.contains('bg-gray-900') ||
                     elementBehind.classList.contains('bg-black') ||
                     elementBehind.classList.contains('hero-dark') ||
                     !!elementBehind.closest('.bg-gray-900, .bg-black, .hero-dark')

    isDarkBackground.value = hasDarkBg
  }
}

// Optimized scroll detection with throttling
let scrollTimeout: number | null = null

const handleScroll = () => {
  // Throttle scroll events for better mobile performance
  if (scrollTimeout) return

  scrollTimeout = setTimeout(() => {
    const newScrolled = window.scrollY > 10

    // Only run expensive operations when state changes
    if (newScrolled !== isScrolled.value) {
      isScrolled.value = newScrolled

      // Only detect background color on desktop when scrolled
      if (newScrolled && window.innerWidth >= 768) {
        detectBackgroundColor()
      } else {
        isDarkBackground.value = false
      }
    }

    scrollTimeout = null
  }, 16) // ~60fps throttling
}

// Enhanced keyboard navigation for mobile menu
const handleKeydown = (event: KeyboardEvent) => {
  if (!isMobileMenuOpen.value) return

  if (event.key === 'Escape') {
    closeMobileMenu()
    // Focus the menu button after closing
    nextTick(() => {
      const menuButton = document.querySelector('[aria-label="Toggle navigation menu"]') as HTMLElement
      menuButton?.focus()
    })
  }

  // Handle Enter key on collapsible sections
  if (event.key === 'Enter' && event.target) {
    const target = event.target as HTMLElement
    if (target.getAttribute('aria-expanded') !== null) {
      target.click()
    }
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

// Prevent body scroll when mega menu is open
watch(showAngebotMenu, (isOpen: boolean) => {
  if (typeof document !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

// Setup scroll listener
onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll)
    // Initial check
    handleScroll()
    // Initial background detection
    setTimeout(() => {
      detectBackgroundColor()
    }, 100)
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleKeydown)
  }
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll)
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

/* Header Container Animation */
.header-container {
  transition: all var(--transition-slow);
  transform-origin: center;
}

/* Burger Menu Icon */
.burger-icon {
  width: 24px;
  height: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none; /* Let parent button handle clicks */
}

.burger-line {
  width: 100%;
  height: 2px;
  background-color: currentColor;
  transition: all var(--transition-normal);
  border-radius: var(--border-radius-sm);
  pointer-events: none; /* Let parent button handle clicks */
}

/* Burger Animation */
.burger-active .burger-line:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.burger-active .burger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.burger-active .burger-line:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Mobile Navigation Styles */
.mobile-nav-item {
  display: block;
  padding: 12px 16px;
  border-radius: var(--border-radius-md);
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  transition: all var(--transition-normal);
  min-height: 44px; /* Thumb-friendly touch target */
  text-decoration: none;
}

.mobile-nav-item:hover {
  background-color: #fff;
  border-color: #fbbf24;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  transform: translateY(-1px);
}

.mobile-nav-item:active {
  transform: translateY(0);
}

.mobile-nav-pill {
  display: block;
  padding: 10px 16px;
  border-radius: var(--border-radius-full);
  background-color: #f3f4f6;
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all var(--transition-normal);
  min-height: 44px; /* Thumb-friendly touch target */
  display: flex;
  align-items: center;
}

.mobile-nav-pill:hover {
  background-color: #fbbf24;
  color: #78350f;
  transform: translateX(4px);
}

.mobile-nav-pill:active {
  transform: translateX(2px);
}

/* Mobile menu optimizations */
@media (max-width: 768px) {
  body.menu-open {
    overflow: hidden;
  }

  /* Prevent horizontal scrolling */
  #mobile-menu {
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }

  /* Safe area handling for mobile devices */
  .safe-area-inset {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }

  /* Ensure full height on mobile */
  #mobile-menu {
    height: 100vh;
    height: 100dvh; /* Dynamic viewport height for mobile browsers */
    max-height: 100vh;
    max-height: 100dvh;
  }
}

/* Enhanced focus styles for accessibility */
.mobile-nav-item:focus,
.mobile-nav-pill:focus,
button:focus {
  outline: 2px solid #f59e0b;
  outline-offset: 2px;
}

/* Improve button touch targets */
button {
  min-height: 44px;
  min-width: 44px;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

/* Ensure mobile header button works when scrolled */
.mobile-header {
  pointer-events: auto;
  position: relative;
}

.mobile-header button {
  pointer-events: auto;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
  background: transparent;
  border: none;
  cursor: pointer;
}

/* Fix for glassmorphism state touch issues */
.header-container.card-glass .mobile-header {
  pointer-events: auto;
}

.header-container.card-glass .mobile-header button {
  pointer-events: auto;
  position: relative;
  z-index: 100;
}

</style>