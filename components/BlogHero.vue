<template>
  <div class="container mx-auto px-4 py-16">
    <div class="max-w-6xl mx-auto">
      <!-- Back Navigation -->
      <div class="mb-8">
        <NuxtLink
          to="/blog"
          class="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          ALLE ARTIKEL
        </NuxtLink>
      </div>

      <!-- Hero Card -->
      <div class="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div class="grid lg:grid-cols-2 gap-0 min-h-[400px]">
          <!-- Content Section - Left Side -->
          <div class="p-8 md:p-12 flex flex-col justify-center">
            <!-- Category Badge -->
            <div v-if="article.category" class="mb-6">
              <span class="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                {{ article.category }}
              </span>
            </div>

            <!-- Title -->
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight uppercase">
              {{ article.title }}
            </h1>

            <!-- Excerpt -->
            <div v-if="article.excerpt" class="mb-8">
              <p class="text-lg text-gray-600 leading-relaxed">
                {{ article.excerpt }}
              </p>
            </div>

            <!-- Meta Information -->
            <div class="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <span v-if="article.author" class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                </svg>
                {{ article.author }}
              </span>
              <span v-if="article.publishedAt" class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                </svg>
                {{ formatDate(article.publishedAt) }}
              </span>
              <span v-if="article.readTime" class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                </svg>
                {{ article.readTime }} Min. Lesezeit
              </span>
            </div>
          </div>

          <!-- Image Section - Right Side -->
          <div class="relative overflow-hidden">
            <div
              v-if="hasImage(article.image)"
              class="absolute inset-0 bg-cover bg-center"
              :style="{ backgroundImage: `url(${article.image})` }"
            >
            </div>
            <div v-else class="absolute inset-0 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <div class="text-white text-6xl opacity-50">📝</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogArticle } from '~/types/article.types'
import { formatDate } from '~/utils/date'

interface Props {
  article: BlogArticle
}

const props = defineProps<Props>()

const hasImage = (image: string | undefined): boolean => {
  return !!image && image.trim() !== ''
}
</script>