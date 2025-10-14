<template>
  <div :style="{ backgroundColor }" class="py-12 md:py-16">
    <div class="container">
      <!-- Page Header -->
      <div class="mb-8 md:mb-12">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          {{ headline }}
        </h1>
        <p v-if="subheadline" class="text-lg text-gray-600">
          {{ subheadline }}
        </p>
      </div>

    <!-- Quick Action: Cookie Settings -->
    <PrivacyQuickAction
      v-if="showQuickAction"
      :title="quickActionTitle"
      :description="quickActionDescription"
      :gradient="quickActionGradient"
      :buttonText="quickActionButtonText"
      :buttonHref="quickActionButtonHref"
      :buttonVariant="quickActionButtonVariant"
      :buttonSize="quickActionButtonSize"
    />
    </div>
  </div>
</template>

<script setup lang="ts">
import PrivacyQuickAction from '~/components/privacy/PrivacyQuickAction.vue'
interface Props {
  headline?: string
  subheadline?: string
  backgroundColor?: string
  showQuickAction?: boolean
  quickActionTitle?: string
  quickActionDescription?: string
  quickActionGradient?: 'warm' | 'cool' | 'primary' | 'secondary'
  quickActionButtonText?: string
  quickActionButtonHref?: string
  quickActionButtonVariant?: 'primary' | 'secondary' | 'outline' | 'gradient'
  quickActionButtonSize?: 'sm' | 'md' | 'lg' | 'xl'
}

withDefaults(defineProps<Props>(), {
  headline: 'Datenschutzerklärung',
  subheadline: 'Letzte Aktualisierung: ' + new Date().toLocaleDateString('de-DE'),
  backgroundColor: '#ffffff',
  showQuickAction: true,
  quickActionTitle: 'Cookie-Einstellungen verwalten',
  quickActionDescription: 'Sie können Ihre Präferenzen jederzeit ändern und Ihre Einwilligungen verwalten.',
  quickActionGradient: 'warm',
  quickActionButtonText: 'Einstellungen öffnen',
  quickActionButtonHref: '/cookie-einstellungen',
  quickActionButtonVariant: 'secondary',
  quickActionButtonSize: 'lg'
})
</script>
