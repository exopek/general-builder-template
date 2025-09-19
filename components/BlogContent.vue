<template>
  <div class="min-h-screen container">
    <!-- Hero Section -->
    <div class="relative h-96 md:h-96 overflow-hidden rounded-2xl mb-32">
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
      <div class="relative h-full max-w-4xl mx-auto flex items-end">
        <div class="pb-8">
          <div class="text-white">
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
        <div class="max-w-4xl mx-auto">
          <!-- Article Content -->
          <article>
            <!-- Excerpt -->
            <div v-if="article.excerpt" class="mb-8">
              <p class="text-xl text-gray-600 leading-relaxed italic border-l-4 border-primary pl-6">
                {{ article.excerpt }}
              </p>
            </div>

            <!-- Structured Content -->
            <div v-if="hasStructuredContent(article.content)">
              <StructuredContent :content="article.content.blogPost.content" />
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
        </div>
      

    <!-- Call to Action -->
    <div v-if="hasCallToAction(article.content)" class="rounded-2xl bg-gray-100 mt-16" style="border: 1px solid var(--color-primary-light);">
      <div class="py-12">
        <div class="max-w-4xl mx-auto text-center">
          <h2 v-if="article.content.blogPost.content.callToAction.h2" class="text-3xl font-bold text-white mb-4">
            {{ article.content.blogPost.content.callToAction.h2 }}
          </h2>
          <p v-if="article.content.blogPost.content.callToAction.text" class="text-xl text-gray-800 mb-8" style="line-height: 1.625;">
            {{ article.content.blogPost.content.callToAction.text }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/kurse"
              class="btn btn-primary"
            >
              Kurse entdecken
            </NuxtLink>
            <NuxtLink
              to="/preise"
              class="btn btn-secondary"
            >
              Preise ansehen
            </NuxtLink>
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

const hasStructuredContent = (content: any): boolean => {
  return content
}

const hasCallToAction = (content: any): boolean => {
  return content?.blogPost?.content?.callToAction
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