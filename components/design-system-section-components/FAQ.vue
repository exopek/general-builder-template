<template>
  <section id="faq" class="py-16 md:py-20" :style="{ backgroundColor: backgroundColor }">
    <div class="container mx-auto">

      <!-- Section Header -->
      <div class="text-center mb-16 lg:mb-20">
        <slot name="badge">
          <TransformationBadge
            v-if="showBadge"
            :text="badgeText"
            :variant="badgeVariant"
            class="mb-4"
          />
        </slot>

        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-6"
          :style="{ color: headlineColor }"
        >
          {{ headline }}
        </h2>

        <p
          class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          :style="{ color: subheadlineColor }"
        >
          {{ subheadline }}
        </p>
      </div>

      <!-- Search & Categories -->
      <div v-if="showSearch || showCategories" class="max-w-5xl mx-auto mb-16">

        <!-- Search Input -->
        <div v-if="showSearch" class="mb-8">
          <div class="relative max-w-md mx-auto">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="searchPlaceholder"
              class="w-full px-5 py-4 pr-12 text-lg text-gray-900 border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all duration-300"
            />
            <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Category Filter -->
        <div v-if="showCategories" class="flex flex-wrap gap-4 justify-center">
          <Button
            text="Alle"
            variant="ghost"
            size="sm"
            :class="[
              'transition-all duration-300',
              selectedCategory === 'all' ? 'bg-orange-500 text-white shadow-lg transform scale-105' : 'hover:bg-gray-100'
            ]"
            @click="selectCategory('all')"
            :aria-pressed="selectedCategory === 'all'"
          />
          <Button
            v-for="category in categories"
            :key="category.id"
            :text="category.name"
            variant="ghost"
            size="sm"
            :class="[
              'transition-all duration-300',
              selectedCategory === category.id ? 'bg-orange-500 text-white shadow-lg transform scale-105' : 'hover:bg-gray-100'
            ]"
            @click="selectCategory(category.id)"
            :aria-pressed="selectedCategory === category.id"
          />
        </div>
      </div>

      <!-- FAQ Accordion -->
      <div class="max-w-5xl mx-auto">
        <div v-if="filteredFaqs.length === 0" class="text-center py-16">
          <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <slot name="no-results-icon">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </slot>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ noResultsTitle }}</h3>
          <p class="text-gray-600">{{ noResultsText }}</p>
        </div>

        <div v-else class="space-y-4" role="region" aria-label="Häufig gestellte Fragen">
          <div
            v-for="(faq, index) in filteredFaqs"
            :key="index"
            class="bg-white rounded-2xl p-6 cursor-pointer transition-all duration-500 hover:shadow-xl faq-item"
            :class="[
              openItems.includes(index) ? 'ring-2 ring-orange-500 shadow-xl' : 'shadow-md hover:shadow-lg',
              'transform hover:-translate-y-1'
            ]"
            @click="toggleItem(index)"
            @keydown.enter="toggleItem(index)"
            @keydown.space.prevent="toggleItem(index)"
            :tabindex="0"
            role="button"
            :aria-expanded="openItems.includes(index)"
            :aria-controls="`faq-answer-${index}`"
          >
            <!-- Question Header -->
            <div class="flex items-start gap-4">
              <!-- Category Icon -->
              <div v-if="showCategoryIcons" class="flex-shrink-0">
                <div class="w-12 h-12 rounded-full flex items-center justify-center bg-orange-100 text-orange-500">
                  <slot name="category-icon" :category="faq.category">
                    <span class="text-xl">{{ getCategoryEmoji(faq.category) }}</span>
                  </slot>
                </div>
              </div>

              <!-- Question Content -->
              <div class="flex-1">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <h3 class="text-lg md:text-xl font-bold text-gray-900 mb-1">
                      {{ faq.question }}
                    </h3>
                    <!-- Category Badge -->
                    <TransformationBadge
                      v-if="showCategoryBadges"
                      :text="getCategoryName(faq.category)"
                      variant="neutral"
                      size="xs"
                      class="mt-2"
                    />
                  </div>

                  <!-- Toggle Button -->
                  <button
                    class="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-500 hover:bg-gray-200 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                    :class="openItems.includes(index) ? 'bg-orange-500 text-white rotate-180 shadow-lg' : 'text-gray-600'"
                    :aria-label="openItems.includes(index) ? 'Antwort schließen' : 'Antwort anzeigen'"
                    tabindex="-1"
                    @click.stop="toggleItem(index)"
                  >
                    <svg class="w-5 h-5 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Answer Content (Collapsible) -->
            <div
              v-if="openItems.includes(index)"
              :id="`faq-answer-${index}`"
              class="mt-6 pt-6 border-t border-gray-200 animate-fadeIn"
              role="region"
              :aria-labelledby="`faq-question-${index}`"
            >
              <div class="prose prose-gray max-w-none pl-16" v-if="showCategoryIcons">
                <div class="text-gray-700 text-base lg:text-lg leading-relaxed" v-html="faq.answer"></div>

                <!-- Additional Links/Actions -->
                <div v-if="faq.links && faq.links.length > 0" class="mt-4 space-y-2">
                  <h4 class="font-medium text-gray-900">{{ linksTitle }}:</h4>
                  <div class="space-y-1">
                    <a
                      v-for="link in faq.links"
                      :key="link.text"
                      :href="link.url"
                      class="block text-orange-600 hover:text-orange-700 text-sm underline"
                    >
                      {{ link.text }}
                    </a>
                  </div>
                </div>

                <!-- Contact CTA -->
                <div v-if="faq.showContactCta" class="mt-4 p-6 bg-gray-50 rounded-lg">
                  <div class="flex items-start gap-3">
                    <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center mt-0.5">
                      <slot name="contact-icon">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2m2 4h6m-6 4h6m-7-5V3a2 2 0 012-2h2a2 2 0 012 2v4"/>
                        </svg>
                      </slot>
                    </div>
                    <div class="flex-1 flex items-center">
                      <p class="text-sm text-gray-800">{{ contactCtaText }}</p>
                    </div>
                    <Button
                      :text="contactButtonText"
                      :href="contactButtonUrl"
                      variant="primary"
                      size="sm"
                    />
                  </div>
                </div>
              </div>

              <div class="prose prose-gray max-w-none" v-else>
                <div class="text-gray-700 text-base lg:text-lg leading-relaxed" v-html="faq.answer"></div>

                <!-- Additional Links/Actions -->
                <div v-if="faq.links && faq.links.length > 0" class="mt-4 space-y-2">
                  <h4 class="font-medium text-gray-900">{{ linksTitle }}:</h4>
                  <div class="space-y-1">
                    <a
                      v-for="link in faq.links"
                      :key="link.text"
                      :href="link.url"
                      class="block text-orange-600 hover:text-orange-700 text-sm underline"
                    >
                      {{ link.text }}
                    </a>
                  </div>
                </div>

                <!-- Contact CTA -->
                <div v-if="faq.showContactCta" class="mt-4 p-6 bg-gray-50 rounded-lg">
                  <div class="flex items-start gap-3">
                    <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center mt-0.5">
                      <slot name="contact-icon">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2m2 4h6m-6 4h6m-7-5V3a2 2 0 012-2h2a2 2 0 012 2v4"/>
                        </svg>
                      </slot>
                    </div>
                    <div class="flex-1 flex items-center">
                      <p class="text-sm text-gray-800">{{ contactCtaText }}</p>
                    </div>
                    <Button
                      :text="contactButtonText"
                      :href="contactButtonUrl"
                      variant="primary"
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Section -->
      <div v-if="showContactSection" id="still-have-questions" class="max-w-4xl mx-auto mt-20 text-center">
        <div class="bg-gradient-warm rounded-2xl p-8 md:p-12 text-white shadow-2xl border border-orange-200">
          <h3 class="text-2xl md:text-3xl font-bold mb-4">{{ contactSectionHeadline }}</h3>
          <p class="text-lg opacity-90 mb-8">{{ contactSectionDescription }}</p>

          <div class="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <Button
              :text="primaryContactText"
              :href="primaryContactUrl"
              variant="secondary"
              size="lg"
            />
            <Button
              v-if="secondaryContactText"
              :text="secondaryContactText"
              :href="secondaryContactUrl"
              variant="secondaryFull"
              size="lg"
            />
          </div>

          <!-- Response Time Promise -->
          <div v-if="responseTimeText" class="mt-6 flex items-center justify-center gap-2 text-sm opacity-80">
            <div class="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
              <slot name="response-time-icon">
                <svg class="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </slot>
            </div>
            <span>{{ responseTimeText }}</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import Button from '~/components/design-system-ui-components/Button.vue'
interface FaqItem {
  question: string
  answer: string
  category: string
  links?: Array<{ text: string; url: string }>
  showContactCta?: boolean
}

interface Props {
  // Content
  headline?: string
  subheadline?: string
  badgeText?: string
  badgeVariant?: 'new' | 'popular' | 'featured' | 'limited' | 'info' | 'neutral'
  showBadge?: boolean

  // Search & Filter
  showSearch?: boolean
  searchPlaceholder?: string
  showCategories?: boolean
  showCategoryIcons?: boolean
  showCategoryBadges?: boolean

  // FAQ Data
  faqs?: FaqItem[]

  // UI Components
  cardComponent?: string

  // No Results
  noResultsTitle?: string
  noResultsText?: string

  // Links
  linksTitle?: string

  // Contact CTA
  contactCtaText?: string
  contactButtonText?: string
  contactButtonUrl?: string

  // Contact Section
  showContactSection?: boolean
  contactSectionHeadline?: string
  contactSectionDescription?: string
  primaryContactText?: string
  primaryContactUrl?: string
  secondaryContactText?: string
  secondaryContactUrl?: string
  responseTimeText?: string

  // Styling
  backgroundColor?: string
  headlineColor?: string
  subheadlineColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Häufig gestellte Fragen',
  subheadline: 'Hier finden Sie Antworten auf die wichtigsten Fragen.',
  badgeText: 'FAQ',
  badgeVariant: 'info',
  showBadge: true,

  showSearch: true,
  searchPlaceholder: 'Suche nach Stichworten...',
  showCategories: true,
  showCategoryIcons: true,
  showCategoryBadges: true,

  faqs: () => [],

  cardComponent: 'TransformationCard',

  noResultsTitle: 'Keine Ergebnisse gefunden',
  noResultsText: 'Versuche andere Suchbegriffe oder kontaktiere uns direkt.',

  linksTitle: 'Hilfreiche Links',

  contactCtaText: 'Brauchst du weitere Hilfe zu diesem Thema?',
  contactButtonText: 'Fragen stellen',
  contactButtonUrl: '#contact',

  showContactSection: false,
  contactSectionHeadline: 'Noch Fragen? Wir sind für dich da!',
  contactSectionDescription: 'Unser Expertenteam beantwortet gerne alle deine Fragen persönlich und unverbindlich.',
  primaryContactText: 'Kontakt aufnehmen',
  primaryContactUrl: '/kontakt',
  secondaryContactText: '',
  secondaryContactUrl: '',
  responseTimeText: '',

  backgroundColor: '#ffffff',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280'
})

const searchQuery = ref('')
const selectedCategory = ref('all')
const openItems = ref<number[]>([])

// Dynamically extract categories from FAQ items (from Builder.io)
const categories = computed(() => {
  // Extract unique categories from FAQ items
  const uniqueCategories = new Set<string>()
  props.faqs.forEach(faq => {
    if (faq.category) {
      uniqueCategories.add(faq.category)
    }
  })

  // Convert to category objects with automatic emoji assignment
  const categoryEmojis: Record<string, string> = {
    'allgemein': '📋',
    'training': '💪',
    'ernaehrung': '🥗',
    'ernährung': '🥗',
    'mitgliedschaft': '🎫',
    'preise': '💰',
    'kurse': '📅',
    'oeffnungszeiten': '⏰',
    'öffnungszeiten': '⏰',
    'ausstattung': '🏋️',
    'personal-training': '👤',
    'vertrag': '📝',
    'anfaenger': '🌱',
    'anfänger': '🌱',
    'fortgeschritten': '🔥',
    'gesundheit': '❤️',
    'sonstiges': '❓'
  }

  return Array.from(uniqueCategories).map(categoryId => ({
    id: categoryId,
    name: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
    emoji: categoryEmojis[categoryId.toLowerCase()] || '📌',
    variant: 'neutral' as const
  }))
})

const filteredFaqs = computed(() => {
  let filtered = props.faqs

  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(faq => faq.category === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(faq =>
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    )
  }

  return filtered
})

const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId
  searchQuery.value = ''
  openItems.value = []
}

const toggleItem = (index: number) => {
  const actualIndex = props.faqs.indexOf(filteredFaqs.value[index])

  if (openItems.value.includes(actualIndex)) {
    openItems.value = openItems.value.filter(i => i !== actualIndex)
  } else {
    openItems.value.push(actualIndex)
  }
}

const getCategoryEmoji = (categoryId: string) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  return category?.emoji || '❓'
}

const getCategoryVariant = (categoryId: string) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  return category?.variant || 'neutral'
}

const getCategoryName = (categoryId: string) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  return category?.name || 'Allgemein'
}

const getCategoryBgClass = (categoryId: string) => {
  return 'bg-primary'
}
</script>

<style scoped>
/* Fade-in animation for answers */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

/* FAQ item entrance animation */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.faq-item {
  animation: slideInUp 0.6s ease-out;
}

.faq-item:nth-child(1) { animation-delay: 0.1s; }
.faq-item:nth-child(2) { animation-delay: 0.2s; }
.faq-item:nth-child(3) { animation-delay: 0.3s; }
.faq-item:nth-child(4) { animation-delay: 0.4s; }
.faq-item:nth-child(5) { animation-delay: 0.5s; }

/* Search input focus styles */
input:focus {
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.2);
  transform: translateY(-1px);
}

input:hover {
  border-color: rgba(249, 115, 22, 0.3);
}

/* Category button active state */
.bg-orange-500 {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
}

/* Enhanced hover effects */
.hover\:bg-gray-100:hover {
  background-color: rgba(243, 244, 246, 0.8);
  transform: translateY(-1px);
}

.hover\:-translate-y-1:hover {
  transform: translateY(-4px);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}

/* Smooth accordion transitions */
.transition-all {
  transition: all 0.5s ease;
}

/* Focus styles for accessibility */
[tabindex="0"]:focus {
  outline: 2px solid #f97316;
  outline-offset: 2px;
}

button:focus {
  outline: 2px solid #f97316;
  outline-offset: 2px;
}

/* Search icon color change on focus */
input:focus + svg {
  color: #f97316;
}

/* Enhanced prose styling */
.prose p {
  margin-bottom: 1rem;
}

.prose ul {
  margin: 0.5rem 0;
}

.prose li {
  margin: 0.25rem 0;
}
</style>