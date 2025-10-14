<template>
  <div :style="{ backgroundColor }" class="py-8 md:py-12">
    <div class="container">
    <ContactCard
      :title="title"
      :description="description"
      :email="email"
      :phone="phone"
      :address="address"
      :gradient="gradient"
    />

    <!-- Footer Note -->
    <div v-if="showFooterNote" class="mt-12 p-6 bg-gray-50 rounded-lg text-center">
      <p class="text-sm text-gray-600">
        {{ footerText }}
        <a
          :href="footerLink"
          target="_blank"
          rel="noopener"
          class="text-primary hover:underline font-semibold"
        >
          {{ footerLinkText }}
        </a>
      </p>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContactCard from '~/components/design-system-ui-components/ContactCard.vue'
interface Props {
  backgroundColor?: string
  title?: string
  description?: string
  email?: string
  phone?: string
  address?: string
  gradient?: 'warm' | 'cool' | 'primary' | 'secondary'
  showFooterNote?: boolean
  footerText?: string
  footerLink?: string
  footerLinkText?: string
}

withDefaults(defineProps<Props>(), {
  backgroundColor: '#ffffff',
  title: 'Kontakt Datenschutz',
  description: 'Bei Fragen zum Datenschutz wenden Sie sich bitte an:',
  email: 'gym@exopek.de',
  phone: '+49 173 190 1010',
  address: 'EXOPEK Gym UG (haftungsbeschränkt)\nLimmerstraße 4c\n30451 Hannover',
  gradient: 'warm',
  showFooterNote: true,
  footerText: 'Erstellt mit den Services von: ',
  footerLink: 'https://www.e-recht24.de',
  footerLinkText: 'e-recht24.de'
})
</script>
