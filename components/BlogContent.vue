<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
     <div class="pb-16">
      <BlogHero :article="article" />
     </div>
    

    <!-- Main Content -->
    <div class="container mx-auto px-4 pb-16">
        <div class="max-w-4xl mx-auto">
          <!-- Article Content -->
          <article>
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
    </div>

    <!-- Call to Action -->
     <div class="pb-16">
      <BlogCallToAction
      v-if="hasCallToAction(article.content)"
      :call-to-action="article.content.blogPost.content.callToAction"
    />
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

const hasTags = (tags: string[] | undefined): boolean => {
  return !!tags && tags.length > 0
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