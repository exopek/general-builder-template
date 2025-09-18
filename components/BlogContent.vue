<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="relative h-64 md:h-96 overflow-hidden">
      <!-- Background Image -->
      <div
        v-if="hasImage(article.image)"
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${article.image})` }"
      >
        <div class="absolute inset-0 bg-black/40"></div>
      </div>
      <div v-else class="absolute inset-0 bg-gradient-to-br from-primary to-secondary"></div>

      <!-- Hero Content -->
      <div class="relative h-full flex items-end">
        <div class="container mx-auto px-4 pb-8">
          <div class="max-w-4xl mx-auto text-white">
            <!-- Category -->
            <div v-if="article.category" class="mb-4">
              <span class="inline-block bg-primary px-4 py-2 rounded-full text-sm font-medium">
                {{ article.category }}
              </span>
            </div>

            <!-- Title -->
            <h1 class="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {{ props.article.title }}
            </h1>

            <!-- Meta Information -->
            <div class="flex flex-wrap items-center gap-6 text-sm opacity-90">
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
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <div class="grid lg:grid-cols-4 gap-8">
          <!-- Article Content -->
          <article class="lg:col-span-3">
            <!-- Excerpt -->
            <div v-if="article.excerpt" class="mb-8">
              <p class="text-xl text-gray-600 leading-relaxed italic border-l-4 border-primary pl-6">
                {{ article.excerpt }}
              </p>
            </div>

            <!-- Structured Content -->
            <div v-if="hasStructuredContent(article.content)" class="structured-content-wrapper">
              <StructuredContent :content="article.content.blogPost.content" />
            </div>

            <!-- Fallback: Builder.io Content -->
            <div v-else class="prose prose-lg max-w-none">
              <RenderContent
                :content="article.content"
                :model="'blog'"
              />
            </div>

            <!-- Tags -->
            <div v-if="hasTags(article.tags)" class="mt-12 pt-8 border-t border-gray-200">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Tags</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in article.tags"
                  :key="tag"
                  class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
          </article>

          <!-- Sidebar -->
          <aside class="lg:col-span-1">
            <!-- Share Section -->
            <div class="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Artikel teilen</h3>
              <div class="space-y-3">
                <button
                  @click="shareOnFacebook"
                  class="w-full flex items-center gap-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
                <button
                  @click="shareOnTwitter"
                  class="w-full flex items-center gap-3 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </button>
                <button
                  @click="shareOnLinkedIn"
                  class="w-full flex items-center gap-3 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </button>
                <button
                  @click="copyToClipboard"
                  class="w-full flex items-center gap-3 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  Link kopieren
                </button>
              </div>
            </div>

            <!-- Back to Blog -->
            <div class="bg-white rounded-xl shadow-md p-6">
              <NuxtLink
                to="/blog"
                class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Zurueck zum Blog
              </NuxtLink>
            </div>
          </aside>
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

const hasStructuredContent = (content: any): boolean => {
  return content
}

const shareOnFacebook = () => {
  if (typeof window === 'undefined') return
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

const shareOnTwitter = () => {
  if (typeof window === 'undefined') return
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(props.article.title)
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
}

const shareOnLinkedIn = () => {
  if (typeof window === 'undefined') return
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
}

const copyToClipboard = async () => {
  if (typeof window === 'undefined') return

  try {
    await navigator.clipboard.writeText(window.location.href)
    alert('Link wurde in die Zwischenablage kopiert!')
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
  }
}
</script>

<style scoped>
.structured-content-wrapper {
  max-width: none;
}

.prose {
  color: #374151;
  line-height: 1.75;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  color: #111827;
  font-weight: 700;
  margin-top: 2em;
  margin-bottom: 1em;
  line-height: 1.25;
}

.prose h1 {
  font-size: 2.25em;
  margin-top: 0;
}

.prose h2 {
  font-size: 1.875em;
}

.prose h3 {
  font-size: 1.5em;
}

.prose p {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}

.prose img {
  border-radius: 0.75rem;
  margin: 2em 0;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.prose blockquote {
  border-left: 4px solid var(--color-primary);
  padding-left: 1.5em;
  font-style: italic;
  background: #f9fafb;
  padding: 1.5em;
  border-radius: 0.5rem;
  margin: 2em 0;
}

.prose ul,
.prose ol {
  margin: 1.25em 0;
  padding-left: 1.625em;
}

.prose li {
  margin: 0.5em 0;
}

.prose a {
  color: var(--color-primary);
  text-decoration: underline;
  font-weight: 500;
}

.prose a:hover {
  color: var(--color-secondary);
}
</style>