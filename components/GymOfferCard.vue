<template>
  <div class="relative bg-white border-2 border-gray-200 rounded-2xl p-8 transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl" :class="{ 'border-blue-500 scale-105 shadow-2xl': featured }">
    <div v-if="featured" class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
      Beliebteste Option
    </div>
    
    <div class="text-center mb-8">
      <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ planName }}</h3>
      <div class="flex items-baseline justify-center gap-1 mb-2">
        <span class="text-5xl font-extrabold text-gray-900 leading-none">{{ price }}€</span>
        <span class="text-lg text-gray-500 font-medium">/ {{ period }}</span>
      </div>
      <p v-if="subtitle" class="text-gray-500 text-base">{{ subtitle }}</p>
    </div>

    <div class="mb-8">
      <div v-for="feature in features" :key="feature" class="flex items-center gap-3 py-3 border-b border-gray-100 text-gray-700 font-medium last:border-b-0">
        <svg class="w-5 h-5 text-emerald-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <span>{{ feature }}</span>
      </div>
    </div>

    <div class="text-center">
      <button class="w-full py-4 px-6 rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5" :class="featured ? 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white' : 'bg-gray-900 hover:bg-gray-700 text-white'">
        {{ ctaText || 'Jetzt anmelden' }}
      </button>
      <p v-if="disclaimer" class="mt-3 text-xs text-gray-500 leading-relaxed">{{ disclaimer }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';


const props = defineProps({
    planName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    period: {
        type: String,
        default: 'Monat'
    },
    features: {
        type: Array as () => string[],
        required: true
    },
    subtitle: {
        type: String,
        default: ''
    },
    ctaText: {
        type: String,
        default: 'Jetzt anmelden'
    },
    disclaimer: {
        type: String,
        default: ''
    },
    featured: {
        type: Boolean,
        default: false
    }
})
</script>