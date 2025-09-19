<template>
  <div class="container">
    <div class="rounded-2xl bg-gray-100 mt-16" style="border: 1px solid var(--color-primary-light);">
      <div class="py-12">
        <div class="max-w-4xl mx-auto text-center">
          <h2 v-if="callToAction.h2" class="text-3xl font-bold text-white mb-4">
            {{ callToAction.h2 }}
          </h2>
          <p v-if="callToAction.text" class="text-xl text-gray-800 mb-8" style="line-height: 1.625;">
            {{ callToAction.text }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/kurse"
              class="btn btn-primary"
            >
              Kurse entdecken
            </NuxtLink>
            <NuxtLink
              to="/mitgliedschaften"
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
interface CallToActionData {
  h2?: string
  text?: string
}

interface Props {
  callToAction: CallToActionData
}

defineProps<Props>()
</script>