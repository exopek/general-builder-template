<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-primary to-secondary text-white py-16">
      <div class="container mx-auto px-4">
        <h1 class="text-6xl md:text-6xl font-bold text-center mb-4">Der Blog für deinen Fortschritt</h1>
        <p class="text-xl text-center opacity-90 max-w-2xl mx-auto">
          Entdecke die neuesten Artikel zu Fitness, Training und Gesundheit
        </p>
      </div>
    </div>

    <!-- Blog Articles Grid -->
    <div class="container mx-auto px-4 py-16">
      <!-- Loading State -->
      <div v-if="pending" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="n in 6" :key="n" class="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
          <div class="h-48 bg-gray-300"></div>
          <div class="p-6">
            <div class="h-4 bg-gray-300 rounded mb-2"></div>
            <div class="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div class="h-3 bg-gray-300 rounded mb-2"></div>
            <div class="h-3 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <div class="text-red-500 text-6xl mb-4">!</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Fehler beim Laden</h2>
        <p class="text-gray-600 mb-6">Die Blog-Artikel konnten nicht geladen werden.</p>
        <button
          @click="refresh()"
          class="btn-primary"
        >
          Erneut versuchen
        </button>
      </div>

      <!-- Articles Grid -->
      <div v-else-if="articles && articles.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="article in articles"
          :key="article.id"
          class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <!-- Article Image -->
          <div class="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
            <img
              v-if="article.data?.image"
              :src="article.data.image"
              :alt="article.data?.title || 'Blog Artikel'"
              class="w-full h-full object-cover"
              loading="lazy"
            >
            <div v-else class="flex items-center justify-center h-full text-primary text-4xl">
              📝
            </div>
          </div>

          <!-- Article Content -->
          <div class="p-6">
            <!-- Category Tag -->
            <div v-if="article.data?.category" class="mb-3">
              <span class="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {{ article.data.category }}
              </span>
            </div>

            <!-- Title -->
            <h2 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {{ article.data?.title || 'Untitled' }}
            </h2>

            <!-- Excerpt -->
            <p v-if="article.data?.excerpt" class="text-gray-600 mb-4 line-clamp-3">
              {{ article.data.excerpt }}
            </p>

            <!-- Meta Information -->
            <div class="flex justify-between items-center text-sm text-gray-500 mb-4">
              <span v-if="article.data?.author">{{ article.data.author }}</span>
              <span v-if="article.data?.date">{{ formatDate(article.data.date) }}</span>
            </div>

            <!-- Read More Button -->
            <NuxtLink
              :to="`/blog/${article.data?.slug || article.id}`"
              class="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
            >
              Mehr lesen
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="text-gray-400 text-6xl mb-4">📝</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Noch keine Artikel</h2>
        <p class="text-gray-600">Die ersten Blog-Artikel werden bald veröffentlicht.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchEntries } from '@builder.io/sdk-vue'

// Meta Tags
useHead({
  title: 'Blog - Fitness & Training Artikel',
  meta: [
    {
      name: 'description',
      content: 'Entdecke die neuesten Artikel zu Fitness, Training und Gesundheit. Tipps und Insights für dein optimales Workout.'
    }
  ]
})

// Runtime Config
const config = useRuntimeConfig()

// Fetch Blog Articles
const { data: articles, pending, error, refresh } = useLazyAsyncData('blog-articles', async () => {
  try {
    const entries = await fetchEntries({
      model: 'blog',
      apiKey: config.public.builderApiKey,
      options: {
        noTargeting: true
      }
    })
    console.log('Fetched blog articles:', entries)
    return entries || []
  } catch (err) {
    console.error('Error fetching blog articles:', err)
    throw err
  }
})

// Utility function to format dates
const formatDate = (dateString: string) => {
  if (!dateString) return ''

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>