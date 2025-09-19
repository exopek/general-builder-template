<template>
  <div>
    <!-- Main Heading -->
    <h1 v-if="props.content.h1" class="text-4xl md:text-5xl font-bold text-white mb-8">
      {{ props.content.h1 }}
    </h1>

    <!-- Introduction -->
    <div v-if="content.introduction" class="mb-12">
      <div class="text-xl text-white bg-gray-100 font-medium rounded-xl border-1 p-6" style="line-height: 1.625; border-color: var(--color-primary);">
        {{ content.introduction.text }}
      </div>
    </div>

    <!-- Sections -->
    <div v-if="content.sections" class="sections space-y-12">
      <section
        v-for="(section, index) in content.sections"
        :key="index"
        class="section"
      >
        <!-- Section Heading -->
        <h2 v-if="section.h2" class="text-2xl font-bold text-white" style="margin-bottom: 1.5rem;">
          {{ section.h2 }}
        </h2>

        <!-- Section Content -->
        <div v-if="section.content" class="section-content">
          <!-- Main text -->
          <div v-if="section.content.text" class="text-lg text-gray-800 prose-links" style="line-height: 1.625; margin-bottom: 1.5rem;" v-html="section.content.text">
          </div>

          <!-- Subsections -->
          <div v-if="section.content.h3 && section.content.h3.length > 0" class="subsections">
            <div class="grid gap-4 md:gap-6">
              <div
                v-for="(subsection, subIndex) in section.content.h3"
                :key="subIndex"
                class="card" style="padding: 1rem; transition: all 0.2s ease;"
              >
                <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                  <span style="width: 0.5rem; height: 0.5rem; border-radius: 50%; margin-right: 0.75rem; background-color: var(--color-primary);"></span>
                  {{ subsection }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Conclusion -->
    <div v-if="content.conclusion" class="conclusion bg-gray-100 rounded-xl" style="margin-top: 4rem; padding: 2rem;">
      <h2 v-if="content.conclusion.h2" class="text-2xl font-bold text-white" style="margin-bottom: 1.5rem;">
        {{ content.conclusion.h2 }}
      </h2>
      <p v-if="content.conclusion.text" class="text-lg text-gray-800" style="line-height: 1.625;">
        {{ content.conclusion.text }}
      </p>
    </div>

  </div>
</template>

<script setup lang="ts">
interface StructuredContentProps {
  content: {
    h1?: string
    introduction?: {
      text: string
    }
    sections?: Array<{
      h2?: string
      content?: {
        text?: string
        h3?: string[]
      }
    }>
    conclusion?: {
      h2?: string
      text?: string
    }
    callToAction?: {
      h2?: string
      text?: string
    }
  }
}

const props = defineProps<StructuredContentProps>()
</script>

<style scoped>
.section:not(:last-child) {
  border-bottom: 1px solid var(--color-gray-200);
  padding-bottom: 3rem;
}

.prose-links :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
}

.prose-links :deep(a:hover) {
  opacity: 0.8;
}
</style>