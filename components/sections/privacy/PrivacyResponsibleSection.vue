<template>
  <div :style="{ backgroundColor }" class="py-8 md:py-12">
    <div class="container">
    <BasePrivacySection :title="sectionTitle">
      <BaseInfoCard
        :title="cardTitle"
        borderPosition="left"
        borderColor="primary"
        bgColor="white"
        :hoverEffect="true"
      >
        <div class="space-y-2 text-gray-700">
          <p class="font-semibold text-gray-900">{{ companyName }}</p>
          <p v-html="address"></p>
          <p>
            <strong>Telefon:</strong>
            <a :href="`tel:${phone.replace(/\s/g, '')}`" class="text-primary hover:underline">{{ phone }}</a>
          </p>
          <p>
            <strong>E-Mail:</strong>
            <a :href="`mailto:${email}`" class="text-primary hover:underline">{{ email }}</a>
          </p>
        </div>
        <p class="text-gray-600 text-sm mt-4 italic">
          {{ legalNote }}
        </p>
      </BaseInfoCard>
    </BasePrivacySection>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  sectionTitle?: string
  backgroundColor?: string
  cardTitle?: string
  companyName?: string
  address?: string
  phone?: string
  email?: string
  legalNote?: string
}

withDefaults(defineProps<Props>(), {
  sectionTitle: 'Hinweis zur verantwortlichen Stelle',
  backgroundColor: '#ffffff',
  cardTitle: 'Verantwortliche Stelle',
  companyName: 'EXOPEK Gym UG (haftungsbeschränkt)',
  address: 'Limmerstraße 4c<br>30451 Hannover',
  phone: '0173 190 1010',
  email: 'gym@exopek.de',
  legalNote: 'Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.'
})
</script>
