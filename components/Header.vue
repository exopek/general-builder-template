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
                  <a href="/fragebogen" class="nav-pill">
                    Fitness-Check
                  </a>
                  <a href="/blog" class="nav-pill">
                    Blog
                  </a>
                  <a href="/kontakt" class="nav-pill">
                    Kontakt
                  </a>
                  <a href="/anfahrt" class="nav-pill">
                    Anfahrt
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
      ]">
      <!-- Logo -->
      <a href="/" class="flex items-center">
        <img src="https://cdn.builder.io/api/v1/image/assets%2F2221ab9020b44cdd9cbb4a4793414e46%2F698b3f14d8e54640a0e15fce4eb0c6a3"
             alt="Gym Logo"
             class="w-auto transition-all"
             :class="isScrolled ? 'h-6' : 'h-7'">
      </a>

      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu"
        class="p-2 text-gray-900 transition-all hover:text-gray-500 z-50 relative"
        :class="{ 'burger-active': isMobileMenuOpen }">
        <div class="burger-icon">
          <span class="burger-line"></span>
          <span class="burger-line"></span>
          <span class="burger-line"></span>
        </div>
      </button>
    </div>

    <!-- Mobile Dropdown Menu -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isMobileMenuOpen" class="fixed inset-0 z-40 md:hidden">
        <!-- Mobile Menu Content -->
        <div class="card-glass h-full flex flex-col justify-center items-center">
          <!-- Navigation Links -->
          <nav class="flex flex-col items-center gap-8 text-center">
            <a @click="toggleMobileMenu" href="/kurse"
              class="text-3xl font-bold text-gray-900 hover:bg-gradient-warm hover:text-transparent hover:bg-clip-text transition-all">
              Kurse
            </a>
            <a @click="toggleMobileMenu" href="/angebot"
              class="text-3xl font-bold text-gray-900 hover:bg-gradient-warm hover:text-transparent hover:bg-clip-text transition-all">
              Angebot
            </a>
            <a @click="toggleMobileMenu" href="/mitgliedschaften"
              class="text-3xl font-bold text-gray-900 hover:bg-gradient-warm hover:text-transparent hover:bg-clip-text transition-all">
              Preise
            </a>

            <!-- Mobile CTA Button -->
            <div class="pt-8">
              <a @click="toggleMobileMenu" href="/probetraining"
                class="btn-primary text-xl px-8 py-4 hover:scale-110">
                Probetraining
              </a>
            </div>
          </nav>
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

// Text color detection for dynamic header text - analyze section text color
const detectBackgroundColor = () => {
  if (typeof window === 'undefined') return
  
  const header = document.querySelector('.header-elastic')
  if (!header) return
  
  // Get the element behind the header
  const headerRect = header.getBoundingClientRect()
  let elementBehind = document.elementFromPoint(headerRect.left + headerRect.width / 2, headerRect.bottom + 1)
  
  // Walk up the DOM tree to find the nearest section/container
  while (elementBehind && elementBehind !== document.body) {
    // Only consider elements that are likely containers/sections
    const isContainer = elementBehind.tagName.toLowerCase().match(/^(section|div|main|article|header|footer|aside)$/) ||
                       elementBehind.classList.contains('section') ||
                       elementBehind.classList.contains('container') ||
                       elementBehind.classList.contains('hero') ||
                       elementBehind.classList.contains('bg-')
    
    if (isContainer) {
      // Find text elements within this container
      const textElements = elementBehind.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, a')
      let whiteTextCount = 0
      let darkTextCount = 0
      
      textElements.forEach(el => {
        const computedStyle = window.getComputedStyle(el)
        const textColor = computedStyle.color
        
        // Parse RGB values to determine if text is light or dark
        const rgb = textColor.match(/\d+/g)
        if (rgb && rgb.length >= 3) {
          const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000
          if (brightness > 200) {
            whiteTextCount++
          } else if (brightness < 100) {
            darkTextCount++
          }
        }
      })
      
      // If we found text elements, determine the dominant color
      if (whiteTextCount > 0 || darkTextCount > 0) {
        // If more white text than dark text, use white header text
        isDarkBackground.value = whiteTextCount > darkTextCount
        return
      }
    }
    
    // Move up to parent element
    elementBehind = elementBehind.parentElement
  }
  
  // Default to dark text if no text found
  isDarkBackground.value = false
}

// Scroll detection with elastic animation
const handleScroll = () => {
  const newScrolled = window.scrollY > 10
  
  // Trigger elastic animation only when state changes
  if (newScrolled !== isScrolled.value) {
    // Add animation class briefly for elastic effect
    const header = document.querySelector('.header-elastic')
    if (header) {
      header.classList.add('animate')
      setTimeout(() => {
        header.classList.remove('animate')
      }, 800)
    }
  }
  
  isScrolled.value = newScrolled
  
  // Detect background color only when scrolled (glassmorphism header)
  if (newScrolled) {
    detectBackgroundColor()
  } else {
    isDarkBackground.value = false // Always dark text when not scrolled
  }
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
}

.burger-line {
  width: 100%;
  height: 2px;
  background-color: currentColor;
  transition: all var(--transition-normal);
  border-radius: var(--border-radius-sm);
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

</style>