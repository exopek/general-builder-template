<template>
  <MetaTags
      :title="`${article.content.blogPost.meta.title}`"
      :description="`${article.content.blogPost.meta.description}`"
    />
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
     <div class="pb-16 pt-8">
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