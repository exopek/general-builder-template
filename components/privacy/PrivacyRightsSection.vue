<template>
  <div :style="{ backgroundColor }" class="py-8 md:py-12">
    <div class="container">
    <ContentSection :title="sectionTitle">
      <ContentGrid :columns="gridColumns">

        <!-- Auskunft -->
        <ContentGridItem
          :title="right1Title"
          :description="right1Description"
          :icon="rightIcon"
          bgColor="gray"
          :hoverEffect="true"
        />

        <!-- Berichtigung -->
        <ContentGridItem
          :title="right2Title"
          :description="right2Description"
          :icon="rightIcon"
          bgColor="gray"
          :hoverEffect="true"
        />

        <!-- Löschung -->
        <ContentGridItem
          :title="right3Title"
          :description="right3Description"
          :icon="rightIcon"
          bgColor="gray"
          :hoverEffect="true"
        />

        <!-- Widerruf -->
        <ContentGridItem
          :title="right4Title"
          :description="right4Description"
          :icon="rightIcon"
          bgColor="gray"
          :hoverEffect="true"
        />
      </ContentGrid>
    </ContentSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContentSection from '~/components/design-system-ui-components/ContentSection.vue'
import ContentGrid from '~/components/design-system-ui-components/ContentGrid.vue'
import ContentGridItem from '~/components/design-system-ui-components/ContentGridItem.vue'
interface Props {
  backgroundColor?: string
  sectionTitle?: string
  gridColumns?: '1' | '2' | '3' | '4'
  rightIcon?: string
  right1Title?: string
  right1Description?: string
  right2Title?: string
  right2Description?: string
  right3Title?: string
  right3Description?: string
  right4Title?: string
  right4Description?: string
}

withDefaults(defineProps<Props>(), {
  backgroundColor: '#ffffff',
  sectionTitle: 'Ihre Rechte',
  gridColumns: '2',
  rightIcon: '✓',
  right1Title: '✓ Auskunft',
  right1Description: 'Sie haben das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger sowie den Zweck der Datenverarbeitung.',
  right2Title: '✓ Berichtigung',
  right2Description: 'Sie haben das Recht auf Berichtigung unrichtiger personenbezogener Daten. Sie können außerdem die Vervollständigung unvollständiger Daten verlangen.',
  right3Title: '✓ Löschung',
  right3Description: 'Sie haben das Recht auf Löschung Ihrer bei uns gespeicherten Daten, soweit nicht gesetzliche Aufbewahrungspflichten dem entgegenstehen.',
  right4Title: '✓ Widerruf',
  right4Description: 'Sie können erteilte Einwilligungen jederzeit für die Zukunft widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt davon unberührt.'
})
</script>
