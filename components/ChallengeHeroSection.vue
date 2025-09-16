<template>
  <section class="challenge-hero" :style="sectionStyles">
    <div class="hero-content">
      <!-- Hero Text -->
      <div class="hero-text">
        <div class="subhead" v-if="subheadText">{{ subheadText }}</div>
        <h1 class="headline">
          <span v-html="headlineText"></span>
        </h1>
        <p class="hero-description" v-if="descriptionText">{{ descriptionText }}</p>
        
        <!-- CTA Buttons -->
        <div class="cta-container">
          <a 
            v-if="primaryCtaText" 
            :href="primaryCtaUrl" 
            class="cta cta-primary"
            :style="primaryCtaStyles"
          >
            {{ primaryCtaText }}
          </a>
          <a 
            v-if="secondaryCtaText" 
            :href="secondaryCtaUrl" 
            class="cta cta-secondary"
            :style="secondaryCtaStyles"
          >
            {{ secondaryCtaText }}
          </a>
        </div>
      </div>

      <!-- Hero Visual -->
      <div class="hero-visual" v-if="heroImage">
        <img :src="heroImage" :alt="heroImageAlt" />
        <CashbackBadge 
          v-if="showCashbackBadge"
          :amount="cashbackAmount"
          :text="cashbackText"
          :position="badgePosition"
          :color="badgeColor"
          @badge-click="handleBadgeClick"
        />
      </div>
    </div>
    
    <!-- Canvas covering entire hero section -->
    <canvas 
      v-if="enableAnimation" 
      ref="cashbackCanvas" 
      class="cashback-canvas"
    ></canvas>
  </section>
</template>

<script setup lang="ts">
interface Props {
  // Content Props
  subheadText?: string
  headlineText?: string
  descriptionText?: string
  
  // CTA Props
  primaryCtaText?: string
  primaryCtaUrl?: string
  primaryCtaColor?: string
  secondaryCtaText?: string
  secondaryCtaUrl?: string
  secondaryCtaColor?: string
  
  // Visual Props
  heroImage?: string
  heroImageAlt?: string
  
  // Cashback Badge Props
  showCashbackBadge?: boolean
  cashbackAmount?: string
  cashbackText?: string
  badgePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  badgeColor?: string
  enableAnimation?: boolean
  
  // Section Styling
  backgroundColor?: string
  backgroundGradient?: string
  textColor?: string
  minHeight?: string
  padding?: string
}

const props = withDefaults(defineProps<Props>(), {
  subheadText: 'Andere geben dir Geld zurück, wenn du scheiterst. Wir geben dir Geld zurück, wenn du durchziehst.',
  headlineText: '7 Wochen durchziehen. <span style="color: #ff3b2f;">Direkt 100€ Cashback.</span>',
  descriptionText: 'Investiere 297€ in deine Fitness. Ziehst du die 7 Wochen durch, bekommst du sofort 100€ zurück – Cash. Die restlichen 197€ kannst du komplett auf Gym-Services anrechnen lassen.',
  primaryCtaText: 'Jetzt Challenge starten',
  primaryCtaUrl: '#',
  primaryCtaColor: '#ff3b2f',
  secondaryCtaText: 'Challenge-Plan ansehen',
  secondaryCtaUrl: '#',
  secondaryCtaColor: '#ffffff',
  heroImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop&crop=center',
  heroImageAlt: 'Fitness Challenge',
  showCashbackBadge: true,
  cashbackAmount: '100€',
  cashbackText: 'Cashback',
  badgePosition: 'top-right',
  badgeColor: '#ff3b2f',
  enableAnimation: true,
  backgroundColor: '#0f0f0f',
  backgroundGradient: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
  textColor: '#ffffff',
  minHeight: '90vh',
  padding: '4rem'
})

const cashbackCanvas = ref<HTMLCanvasElement>()

const sectionStyles = computed(() => ({
  background: props.backgroundGradient || props.backgroundColor,
  color: props.textColor,
  minHeight: props.minHeight,
  padding: props.padding
}))

const primaryCtaStyles = computed(() => ({
  backgroundColor: props.primaryCtaColor,
  color: '#ffffff'
}))

const secondaryCtaStyles = computed(() => ({
  borderColor: props.secondaryCtaColor,
  color: props.secondaryCtaColor
}))

const handleBadgeClick = () => {
  // Emit event for Builder.io tracking
  console.log('Cashback badge clicked')
}

// Animation setup
let cashbackAnimation: any = null
const { initAnimation } = useCashbackAnimation()

onMounted(() => {
  if (props.enableAnimation && cashbackCanvas.value) {
    initCashbackAnimation()
  }
})

onUnmounted(() => {
  if (cashbackAnimation) {
    cashbackAnimation.destroy()
  }
})

const initCashbackAnimation = () => {
  if (!cashbackCanvas.value) return
  
  // Find the badge element
  nextTick(() => {
    const badgeElement = document.querySelector('.cashback-badge') as HTMLElement
    if (badgeElement && cashbackCanvas.value) {
      cashbackAnimation = initAnimation(cashbackCanvas.value, badgeElement)
    }
  })
}
</script>

<style scoped>
.challenge-hero {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: visible;
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  gap: 4rem;
}

.hero-text {
  flex: 1;
  max-width: 50%;
  z-index: 1;
}

.subhead {
  font-size: 1rem;
  font-weight: 500;
  color: #aaa;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.headline {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.hero-description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #ddd;
  line-height: 1.6;
}

.cta-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.cta {
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.cta-primary {
  background: #ff3b2f;
  color: #fff;
}

.cta-primary:hover {
  background: #e62e23;
  transform: translateY(-2px);
}

.cta-secondary {
  border: 2px solid #fff;
  color: #fff;
  background: transparent;
}

.cta-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.hero-visual {
  position: relative;
  flex: 1;
  max-width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.hero-visual img {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 12px;
  opacity: 0.9;
}

.cashback-canvas {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999;
  overflow: visible;
}

@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .hero-text,
  .hero-visual {
    max-width: 100%;
  }
  
  .headline {
    font-size: 2rem;
  }
  
  .cta-container {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .challenge-hero {
    padding: 2rem 1rem;
  }
  
  .headline {
    font-size: 1.75rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .cta {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>