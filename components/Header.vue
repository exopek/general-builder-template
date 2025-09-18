<template>
  <header class="fixed top-0 z-[60] transition-all duration-700 ease-out" 
    :class="[
      // Mobile: Immer volle Breite
      'w-full left-0 md:left-1/2 md:transform md:-translate-x-1/2',
      // Desktop: Zentrierte Breite
      isScrolled 
        ? 'bg-white/10 backdrop-blur-lg rounded-full shadow-lg mt-4 px-8 md:w-[1200px] md:max-w-[calc(100vw-2rem)] md:mx-auto' 
        : 'bg-white border-b border-gray-200 rounded-none mt-0 px-0',
      'header-elastic'
    ]">
    <!-- Desktop Header -->
    <div class="desktop-header flex items-center justify-between transition-all duration-700 ease-out"
      :class="[
        isScrolled 
          ? 'max-w-none mx-0 px-0 py-2' 
          : 'max-w-7xl mx-auto px-6 py-2',
        !isScrolled ? 'text-gray-900' : (isDarkBackground ? 'text-white' : 'text-gray-900')
      ]">
      <!-- Logo -->
      <a href="/" class="flex items-center">
        <img src="https://cdn.builder.io/api/v1/image/assets%2F2221ab9020b44cdd9cbb4a4793414e46%2F698b3f14d8e54640a0e15fce4eb0c6a3" 
             alt="Gym Logo" 
             class="w-auto h-14 transition-all duration-700 ease-out">
      </a>

      <!-- Navigation -->
      <nav class="flex items-center space-x-8" style="gap: 2rem;">
        <a href="/kurse" class="nav-link">
          Kurse
        </a>
        <div class="relative mega-menu-container" @mouseenter="handleShowAngebotMenu" @mouseleave="handleHideAngebotMenu">
          <button class="nav-link flex items-center">
            Angebot
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <!-- NEUES Glasmorphism Mega Menu -->
          <div v-if="showAngebotMenu" 
            class="absolute top-full mt-2 bg-white/10 backdrop-blur-lg border border-gray-200/30 rounded-2xl shadow-xl py-4 z-50 mega-menu-glassmorphism mega-menu-full-width"
            :class="isDarkBackground ? 'text-white' : 'text-gray-900'"
            @mouseenter="handleShowAngebotMenu" @mouseleave="handleHideAngebotMenu">
            
            <!-- 3-Spalten Layout -->
            <div class="grid grid-cols-3 gap-6 px-6">
              
              <!-- Spalte 1: Direkt Loslegen -->
              <div class="mega-menu-column">
                <h3 class="text-2xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600">Direkt Loslegen</h3>
                
                <!-- Kurse -->
                <a href="/kurse" 
                  class="mega-menu-item group block p-4 bg-gray-800/80 hover:bg-white hover:scale-[1.02] rounded-xl transition-all duration-200 mb-3">
                  <div class="mega-menu-title font-semibold text-sm mb-1 text-gray-900">Kurse</div>
                  <div class="text-gray-600 text-xs">Wann kommst Du das nächste mal ins Training?</div>
                </a>

                <!-- Mitgliedschaften -->
                <a href="/mitgliedschaften" 
                  class="mega-menu-item group block p-4 bg-gray-800/80 hover:bg-white hover:scale-[1.02] rounded-xl transition-all duration-200 mb-3">
                  <div class="mega-menu-title font-semibold text-sm mb-1 text-gray-900">Mitgliedschaften</div>
                  <div class="text-gray-600 text-xs">Was ist Dir Deine Fitness wert?</div>
                </a>

                <!-- Probetraining Button -->
                <a href="/probetraining" 
                  class="block text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 text-center"
                  style="background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%)">
                  Probetraining
                </a>
              </div>

              <!-- Spalte 2: Programm & Specials -->
              <div class="mega-menu-column">
                <h3 class="text-2xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600">Programm & Specials</h3>
                
                <!-- 7 Wochen Challenge -->
                <a href="/7-wochen-challenge" 
                  class="mega-menu-item group block p-4 bg-gray-800/80 hover:bg-white hover:scale-[1.02] rounded-xl transition-all duration-200 mb-3">
                  <div class="mega-menu-title font-semibold text-sm mb-1 text-gray-900">7 Wochen Challenge</div>
                  <div class="text-gray-600 text-xs">Geld Zurück für Deinen Erfolg</div>
                </a>

                <!-- Personal Training -->
                <a href="/personal-training" 
                  class="mega-menu-item group block p-4 bg-gray-800/80 hover:bg-white hover:scale-[1.02] rounded-xl transition-all duration-200 mb-3">
                  <div class="mega-menu-title font-semibold text-sm mb-1 text-gray-900">Personal Training</div>
                  <div class="text-gray-600 text-xs">Abgestimmte Trainingserfolge</div>
                </a>

                <!-- Level Up Weeks -->
                <a href="/level-up-weeks" 
                  class="mega-menu-item group block p-4 bg-gray-800/80 hover:bg-white hover:scale-[1.02] rounded-xl transition-all duration-200">
                  <div class="mega-menu-title font-semibold text-sm mb-1 text-gray-900">Level Up Weeks</div>
                  <div class="text-gray-600 text-xs">Dein Performance Schub</div>
                </a>
              </div>

              <!-- Spalte 3: Mehr erfahren -->
              <div class="mega-menu-column">
                <h3 class="text-2xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600">Mehr erfahren</h3>
                <div class="space-y-2">
                  <a href="/ueber-uns" class="mega-menu-link block hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 transition-all duration-300 py-1 font-medium">
                    Über uns
                  </a>
                  <a href="/fragebogen" class="mega-menu-link block hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 transition-all duration-300 py-1 font-medium">
                    Fitness-Check
                  </a>
                  <a href="/blog" class="mega-menu-link block hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 transition-all duration-300 py-1 font-medium">
                    Blog
                  </a>
                  <a href="/kontakt" class="mega-menu-link block hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 transition-all duration-300 py-1 font-medium">
                    Kontakt
                  </a>
                  <a href="/anfahrt" class="mega-menu-link block hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 transition-all duration-300 py-1 font-medium">
                    Anfahrt
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
        <a href="/mitgliedschaften" class="nav-link">
          Preise
        </a>
      </nav>

      <!-- CTA Button -->
      <a href="/probetraining" 
        class="text-white px-6 py-2 rounded-lg font-medium transition-colors"
        style="background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%)">
        Probetraining
      </a>
    </div>

    <!-- Mobile Header -->
    <div class="mobile-header flex items-center justify-between transition-all duration-700 ease-out"
      :class="[
        isScrolled 
          ? 'px-6 py-2 mx-auto max-w-7xl' 
          : 'px-6 py-4 mx-auto max-w-7xl',
        !isScrolled ? 'text-gray-900' : (isDarkBackground ? 'text-white' : 'text-gray-900')
      ]">
      <!-- Logo -->
      <a href="/" class="flex items-center">
        <img src="https://cdn.builder.io/api/v1/image/assets%2F2221ab9020b44cdd9cbb4a4793414e46%2F698b3f14d8e54640a0e15fce4eb0c6a3" 
             alt="Gym Logo" 
             class="w-auto transition-all duration-700 ease-out"
             :class="isScrolled ? 'h-6' : 'h-7'">
      </a>

      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu" 
        class="burger-menu p-2 -mr-2 text-gray-900 transition-all duration-300 hover:text-gray-600 focus:outline-none z-[999] relative"
        :class="{ 'burger-active': isMobileMenuOpen }">
        <div class="burger-icon">
          <span class="burger-line burger-line-1"></span>
          <span class="burger-line burger-line-2"></span>
          <span class="burger-line burger-line-3"></span>
        </div>
      </button>
    </div>

    <!-- Mobile Dropdown Menu -->
    <Transition
      enter-active-class="mobile-menu-enter-active"
      enter-from-class="mobile-menu-enter-from"
      enter-to-class="mobile-menu-enter-to"
      leave-active-class="mobile-menu-leave-active"
      leave-from-class="mobile-menu-leave-from"
      leave-to-class="mobile-menu-leave-to"
    >
      <div v-if="isMobileMenuOpen" class="fixed inset-0 z-40 md:hidden mobile-menu-dropdown">
        <!-- Mobile Menu Content -->
        <div class="mobile-menu-content bg-white/95 backdrop-blur-lg shadow-lg h-full flex flex-col justify-center items-center">
          <!-- Navigation Links -->
          <nav class="flex flex-col items-center space-y-8 text-center">
            <a @click="toggleMobileMenu" href="/kurse" 
              class="mobile-nav-link text-3xl font-bold text-gray-900 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 transition-all duration-300">
              Kurse
            </a>
            <a @click="toggleMobileMenu" href="/angebot" 
              class="mobile-nav-link text-3xl font-bold text-gray-900 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 transition-all duration-300">
              Angebot
            </a>
            <a @click="toggleMobileMenu" href="/mitgliedschaften" 
              class="mobile-nav-link text-3xl font-bold text-gray-900 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 transition-all duration-300">
              Preise
            </a>
            
            <!-- Mobile CTA Button -->
            <div class="pt-8">
              <a @click="toggleMobileMenu" href="/probetraining" 
                class="inline-block text-white text-xl font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-110"
                style="background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%)">
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

/* Elastische Widerstandsband-Animation */
.header-elastic {
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center;
}

/* Animationseffekt für die Transformation */
@keyframes elastic-transform {
  0% {
    transform: translateX(-50%) scaleX(1) scaleY(1);
  }
  50% {
    transform: translateX(-50%) scaleX(0.95) scaleY(1.05);
  }
  100% {
    transform: translateX(-50%) scaleX(1) scaleY(1);
  }
}

/* Anwenden der elastischen Animation beim Zustandswechsel */
.header-elastic.animate {
  animation: elastic-transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Glasmorphism Mega Menu */
.mega-menu-glassmorphism {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Full Width Mega Menu - spans from logo to CTA button */
.mega-menu-full-width {
  left: 0;
  right: 0;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

@media (min-width: 768px) {
  .mega-menu-container {
    position: static;
  }
  
  .mega-menu-full-width {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 1200px;
    margin-left: 0;
  }
}

/* Mega Menu Items (Pill Elements) */
.mega-menu-item {
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Mega Menu Title Gradient Hover Effect */
.mega-menu-title {
  font-weight: 600;
  background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%);
  background-size: 0% 100%;
  background-repeat: no-repeat;
  background-position: left;
  -webkit-background-clip: text;
  transition: all 0.3s ease-in-out;
}

.mega-menu-item:hover .mega-menu-title {
  background-size: 100% 100%;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}

/* Mega Menu Description Hover Effect */
.mega-menu-item .text-gray-600 {
  font-weight: 400;
  transition: all 0.3s ease-in-out;
  color: rgb(75, 85, 99);
}

.mega-menu-item:hover .text-gray-600 {
  font-weight: 500;
  color: rgb(0, 0, 0);
}

/* Mega Menu Links Hover Effect */
.mega-menu-link {
  background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%);
  background-size: 0% 100%;
  background-repeat: no-repeat;
  background-position: left;
  -webkit-background-clip: text;
  transition: all 0.3s ease-in-out;
}

.mega-menu-link:hover {
  background-size: 100% 100%;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
}

/* Navigation Links with Gradient Hover */
.nav-link {
  font-weight: 500;
  transition: all 0.15s ease-in-out;
  text-decoration: none;
  background: linear-gradient(-90deg, rgb(252, 209, 34) 0%, rgb(252, 124, 34) 35%, rgb(252, 85, 32) 70%, rgb(251, 60, 54) 100%);
  background-size: 0% 100%;
  background-repeat: no-repeat;
  background-position: left;
  -webkit-background-clip: text;
}

/* Default text color (inherits from parent) */
.text-gray-900 .nav-link {
  color: rgb(55, 65, 81);
  -webkit-text-fill-color: rgb(55, 65, 81);
}

.text-white .nav-link {
  color: white;
  -webkit-text-fill-color: white;
}

.nav-link:hover {
  background-size: 100% 100%;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
}

/* Mobile Header Anpassungen */
@media (max-width: 768px) {
  .mobile-header {
    width: 100%;
    margin: 0 auto;
  }
}

/* Smooth backdrop blur transition */
.backdrop-blur-lg {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Burger Menu Icon Styles */
.burger-icon {
  width: 24px;
  height: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.burger-line {
  width: 100%;
  height: 2px;
  background-color: currentColor;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform-origin: center;
  border-radius: 1px;
}

/* Burger to X Animation with Elastic Bounce */
.burger-active .burger-line-1 {
  transform: translateY(8px) rotate(45deg);
  animation: elasticBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.burger-active .burger-line-2 {
  opacity: 0;
  transform: scaleX(0);
}

.burger-active .burger-line-3 {
  transform: translateY(-8px) rotate(-45deg);
  animation: elasticBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes elasticBounce {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}


/* Mobile Menu Horizontal Expansion Animation - Like Desktop Header */
.mobile-menu-dropdown {
  transform-origin: center center;
}

.mobile-menu-enter-active {
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.mobile-menu-leave-active {
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: scaleX(0) scaleY(1);
}

.mobile-menu-enter-to {
  opacity: 1;
  transform: scaleX(1) scaleY(1);
}

.mobile-menu-leave-from {
  opacity: 1;
  transform: scaleX(1) scaleY(1);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: scaleX(0) scaleY(1);
}

.mobile-menu-content {
  animation: menuContentFadeIn 0.6s ease-out 0.2s both;
}

@keyframes menuContentFadeIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>