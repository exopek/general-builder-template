<template>
  <div :style="{ backgroundColor }" class="py-8 md:py-12">
    <div class="container">
    <ContentSection :title="sectionTitle">
      <InfoCard
        :title="cardTitle"
        borderPosition="left"
        borderColor="accent-green"
        bgColor="gray"
      >
        <p class="text-gray-700 leading-relaxed">
          {{ description }}
        </p>
      </InfoCard>
    </ContentSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContentSection from '~/components/design-system-ui-components/ContentSection.vue'
import InfoCard from '~/components/design-system-ui-components/InfoCard.vue'
interface Props {
  backgroundColor?: string
  sectionTitle?: string
  cardTitle?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  backgroundColor: '#ffffff',
  sectionTitle: '5. Newsletter',
  cardTitle: 'Newsletterdaten',
  description: 'Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind.'
})
</script>
