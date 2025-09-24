<template>
  <section class="py-16 md:py-20 overflow-hidden" :style="{ backgroundColor: backgroundColor }">
    <div class="container mx-auto">

      <!-- Section Header -->
      <div class="text-center mb-16 lg:mb-20">
        <TransformationBadge
          v-if="showBadge"
          :text="badgeText"
          variant="featured"
          class="mb-4"
        />

        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-6"
          :style="{ color: headlineColor }"
          v-html="headline"
        ></h2>

        <p
          class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          :style="{ color: subheadlineColor }"
        >
          {{ subheadline }}
        </p>
      </div>

      <div class="max-w-4xl mx-auto space-y-12 lg:space-y-16">
        <!-- Schritt 1 - Einstiegsfragen -->
        <div class="mb-16">
          <div v-if="showStepLabels" class="text-center mb-8 lg:mb-12">
            <TransformationBadge
              :text="step1Label"
              variant="new"
              size="md"
              class="mb-4"
            />
          </div>

          <div
            v-for="(question, index) in step1Questions"
            :key="index"
            class="quiz-question"
            :class="index % 2 === 0 ? 'slide-from-left' : 'slide-from-right'"
          >
            <TransformationCard
              variant="elevated"
              size="md"
              :hover-effect="true"
              class="group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 mb-6"
              :class="index % 2 === 0 ? 'mr-0 lg:mr-8' : 'ml-0 lg:ml-8'"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <p class="text-lg md:text-xl font-medium text-gray-700 mb-6">{{ question }}</p>
              <div class="flex items-center gap-3 text-lg font-semibold text-primary">
                <div class="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span>Ja, auf jeden Fall!</span>
              </div>
            </TransformationCard>
          </div>
        </div>

        <!-- Schritt 2 - Verstärkung -->
        <div class="mb-16">
          <div v-if="showStepLabels" class="text-center mb-8 lg:mb-12">
            <TransformationBadge
              :text="step2Label"
              variant="info"
              size="md"
              class="mb-4"
            />
          </div>

          <div
            v-for="(question, index) in step2Questions"
            :key="index"
            class="quiz-question"
            :class="index % 2 === 0 ? 'slide-from-left' : 'slide-from-right'"
          >
            <TransformationCard
              variant="elevated"
              size="md"
              :hover-effect="true"
              class="group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 mb-6"
              :class="index % 2 === 0 ? 'mr-0 lg:mr-8' : 'ml-0 lg:ml-8'"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <p class="text-lg md:text-xl font-medium text-gray-700 mb-6">{{ question }}</p>
              <div class="flex items-center gap-3 text-lg font-semibold text-blue-600">
                <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span>Ja, das wäre perfekt!</span>
              </div>
            </TransformationCard>
          </div>
        </div>

        <!-- Schritt 3 - Abschluss -->
        <div class="mb-16">
          <div v-if="showStepLabels" class="text-center mb-8 lg:mb-12">
            <TransformationBadge
              :text="step3Label"
              variant="success"
              size="md"
              class="mb-4"
            />
          </div>

          <div
            v-for="(question, index) in step3Questions"
            :key="index"
            class="quiz-question"
            :class="index % 2 === 0 ? 'slide-from-left' : 'slide-from-right'"
          >
            <TransformationCard
              variant="elevated"
              size="md"
              :hover-effect="true"
              class="group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 mb-6"
              :class="index % 2 === 0 ? 'mr-0 lg:mr-8' : 'ml-0 lg:ml-8'"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <p class="text-lg md:text-xl font-medium text-gray-700 mb-6">{{ question }}</p>
              <div class="flex items-center gap-3 text-lg font-semibold text-green-600">
                <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span>Ja, ich bin bereit! 🚀</span>
              </div>
            </TransformationCard>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center mt-16 lg:mt-20">
          <TransformationCard
            variant="glass"
            size="lg"
            class="max-w-2xl mx-auto"
          >
            <div class="text-center">
              <h3 class="text-2xl md:text-3xl lg:text-4xl font-black text-gray-800 mb-4">
                {{ finalCtaHeadline }}
              </h3>
              <p class="text-lg md:text-xl text-gray-600 mb-8">
                {{ finalCtaSubtext }}
              </p>
              <TransformationButton
                :text="finalCtaText"
                :href="finalCtaUrl"
                variant="gradient"
                size="xl"
                class="mb-4"
              />
              <p class="text-sm md:text-base text-gray-500">
                {{ cashbackText }}
              </p>
            </div>
          </TransformationCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import TransformationCard from '~/components/transformation/TransformationCard.vue'
import TransformationButton from '~/components/transformation/TransformationButton.vue'
import TransformationBadge from '~/components/transformation/TransformationBadge.vue'

interface Props {
  headline?: string
  subheadline?: string
  showBadge?: boolean
  badgeText?: string
  showStepLabels?: boolean
  step1Label?: string
  step2Label?: string
  step3Label?: string
  finalCtaHeadline?: string
  finalCtaSubtext?: string
  finalCtaText?: string
  finalCtaUrl?: string
  cashbackText?: string
  backgroundColor?: string
  headlineColor?: string
  subheadlineColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Bist du bereit für deine 7-Wochen Transformation?',
  subheadline: 'Beantworte diese kurzen Fragen und finde heraus, ob unser Programm perfekt für dich ist',
  showBadge: true,
  badgeText: 'Quiz',
  showStepLabels: true,
  step1Label: 'Schritt 1: Deine Ziele',
  step2Label: 'Schritt 2: Betreuung & Sicherheit',
  step3Label: 'Schritt 3: Dein Start',
  finalCtaHeadline: 'Perfekt! Du bist bereit für deine Transformation',
  finalCtaSubtext: 'Sichere dir jetzt deinen Platz und starte noch heute mit deiner 7-Wochen Transformation',
  finalCtaText: 'Jetzt starten - Nur 297€',
  finalCtaUrl: '#anmeldung',
  cashbackText: '💰 100€ Cashback bei erfolgreichem Abschluss',
  backgroundColor: '#ffffff',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280'
})

const step1Questions = [
  "Möchtest du in den nächsten 7 Wochen sichtbare Veränderungen an deinem Körper erreichen?",
  "Würdest du dich besser fühlen, wenn du mehr Energie und Ausdauer hättest?",
  "Willst du endlich einen Trainingsplan, der wirklich auf dich zugeschnitten ist?"
]

const step2Questions = [
  "Wäre es für dich hilfreich, wenn ein Coach dich jede Woche persönlich betreut?",
  "Würdest du schneller an dein Ziel kommen, wenn du einen klaren Ernährungsplan hast?",
  "Fühlst du dich motivierter, wenn du mit einem Experten an deiner Seite trainierst?"
]

const step3Questions = [
  "Klingt es für dich fair, wenn du nach erfolgreicher Teilnahme sogar 100€ Cashback zurückbekommst?",
  "Möchtest du zusätzlich 297€ auf deine Mitgliedschaft angerechnet bekommen, falls du danach weitermachst?",
  "Bist du bereit, jetzt mit deiner 7-Wochen Transformation zu starten?"
]

// Intersection Observer für Scroll-Animationen
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('animate-slide-in')) {
        // Kleine Verzögerung um Blinken zu vermeiden
        setTimeout(() => {
          entry.target.classList.add('animate-slide-in')
        }, 50)
        // Element aus Observer entfernen nach Animation
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  })

  // Kurze Verzögerung vor dem Start der Observer
  setTimeout(() => {
    const questions = document.querySelectorAll('.quiz-question')
    questions.forEach((question) => observer.observe(question))
  }, 100)
})
</script>

<style scoped>
/* Scroll Animation Styles */
.quiz-question {
  opacity: 0;
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0); /* Hardware acceleration */
}

.slide-from-left {
  transform: translateX(-60px) translateZ(0);
}

.slide-from-right {
  transform: translateX(60px) translateZ(0);
}

.animate-slide-in {
  animation-fill-mode: forwards;
}

.animate-slide-in.slide-from-left {
  animation: slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animate-slide-in.slide-from-right {
  animation: slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes slideInLeft {
  0% {
    opacity: 0;
    transform: translateX(-60px) translateZ(0);
  }
  100% {
    opacity: 1;
    transform: translateX(0) translateZ(0);
  }
}

@keyframes slideInRight {
  0% {
    opacity: 0;
    transform: translateX(60px) translateZ(0);
  }
  100% {
    opacity: 1;
    transform: translateX(0) translateZ(0);
  }
}

/* Enhanced hover effects for quiz cards */
.quiz-question .group {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, box-shadow;
}

.quiz-question .group:hover {
  transform: translateY(-4px) translateZ(0);
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.12);
}

/* Responsive margin adjustments */
@media (max-width: 1024px) {
  .quiz-question.slide-from-left,
  .quiz-question.slide-from-right {
    margin-left: 0;
    margin-right: 0;
  }

  .slide-from-left {
    transform: translateX(-30px) translateZ(0);
  }

  .slide-from-right {
    transform: translateX(30px) translateZ(0);
  }

  @keyframes slideInLeft {
    0% {
      opacity: 0;
      transform: translateX(-30px) translateZ(0);
    }
    100% {
      opacity: 1;
      transform: translateX(0) translateZ(0);
    }
  }

  @keyframes slideInRight {
    0% {
      opacity: 0;
      transform: translateX(30px) translateZ(0);
    }
    100% {
      opacity: 1;
      transform: translateX(0) translateZ(0);
    }
  }
}

/* Ensure smooth rendering */
.quiz-question * {
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>