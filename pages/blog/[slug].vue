<template>
  <div class="min-h-screen">
    <!-- Loading State -->
    <div v-if="pending" class="animate-pulse">
      <!-- Header Skeleton -->
      <div class="bg-gray-300 h-64 md:h-96"></div>
      <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto">
          <div class="h-8 bg-gray-300 rounded mb-4 w-3/4"></div>
          <div class="h-4 bg-gray-300 rounded mb-8 w-1/2"></div>
          <div class="space-y-4">
            <div class="h-4 bg-gray-300 rounded"></div>
            <div class="h-4 bg-gray-300 rounded w-5/6"></div>
            <div class="h-4 bg-gray-300 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !article" class="container mx-auto px-4 py-16">
      <div class="max-w-2xl mx-auto text-center">
        <div class="text-red-500 text-6xl mb-4">📄</div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Artikel nicht gefunden</h1>
        <p class="text-gray-600 mb-8">Der gewuenschte Blog-Artikel konnte nicht gefunden werden.</p>
        <NuxtLink to="/blog" class="btn-primary">
          Zurueck zum Blog
        </NuxtLink>
      </div>
    </div>

    <!-- Article Content -->
    <BlogContent v-else :article="article" />
  </div>
</template>

<script setup lang="ts">
import { fetchOneEntry } from '@builder.io/sdk-vue'
import { articleMapper } from '~/utils/mappers/articleMapper'

const route = useRoute()
const slug = route.params.slug as string
const config = useRuntimeConfig()

const { data: article, pending, error } = useLazyAsyncData(`blog-article-${slug}`, async () => {
  try {
    const entry = await fetchOneEntry({
      model: 'blog',
      apiKey: config.public.builderApiKey,
      options: {
        includeRefs: true
      },
      query: {
        'id': slug
      }
    })

    const mappedEntry = articleMapper.fromBuilderIoEntry(entry)

    console.log('Fetched and mapped blog article:', mappedEntry)

    if (!mappedEntry) {
      return null
    }

    return mappedEntry
  } catch (err) {
    console.error('Error fetching blog article:', err)
    throw err
  }
})

/* const builderArticle = computed(() => {
  if (!article.value) return null

  try {
    return articleMapper.fromBuilderIoEntry(article.value)
  } catch (err) {
    console.error('Error mapping article to domain model:', err)
    return null
  }
}) */

watchEffect(() => {
  if (article.value) {
    useHead({
      title: `${article.value.content.blogPost.meta.title}`,
      meta: [
        {
          name: 'description',
          content: `${article.value.content.blogPost.meta.description}`
        },
        {
          property: 'og:title',
          content: `${article.value.content.blogPost.meta.title}`
        }/* ,
        {
          property: 'og:description',
          content: article.excerpt || 'Entdecke wertvolle Tipps und Insights zu Fitness und Training.'
        },
        {
          property: 'og:image',
          content: article.image || ''
        },
        {
          property: 'og:type',
          content: 'article'
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        } */
      ]
    })
  }
})
</script>

