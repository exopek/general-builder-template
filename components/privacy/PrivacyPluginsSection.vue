<template>
  <div :style="{ backgroundColor }" class="py-8 md:py-12">
    <div class="container">
    <ContentSection :title="sectionTitle">
      <ContentGrid :columns="gridColumns">

        <!-- YouTube -->
        <ContentGridItem
          :title="youtubeTitle"
          :icon="youtubeIcon"
          bgColor="white"
          :hoverEffect="true"
        >
          <p class="text-sm text-gray-700 leading-relaxed">
            {{ youtubeDescription }}
          </p>
        </ContentGridItem>

        <!-- Google Fonts -->
        <ContentGridItem
          :title="fontsTitle"
          :icon="fontsIcon"
          bgColor="white"
          :hoverEffect="true"
        >
          <p class="text-sm text-gray-700 leading-relaxed">
            {{ fontsDescription }}
          </p>
        </ContentGridItem>

        <!-- Google Maps -->
        <ContentGridItem
          :title="mapsTitle"
          :icon="mapsIcon"
          bgColor="white"
          :hoverEffect="true"
        >
          <p class="text-sm text-gray-700 leading-relaxed">
            {{ mapsDescription }}
          </p>
        </ContentGridItem>
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
  youtubeTitle?: string
  youtubeIcon?: string
  youtubeDescription?: string
  fontsTitle?: string
  fontsIcon?: string
  fontsDescription?: string
  mapsTitle?: string
  mapsIcon?: string
  mapsDescription?: string
}

withDefaults(defineProps<Props>(), {
  backgroundColor: '#ffffff',
  sectionTitle: '6. Plugins und Tools',
  gridColumns: '3',
  youtubeTitle: 'YouTube',
  youtubeIcon: '▶️',
  youtubeDescription: 'Diese Website bindet Videos der Website YouTube ein. Betreiber der Website ist die Google Ireland Limited ("Google"), Gordon House, Barrow Street, Dublin 4, Irland. Wir nutzen YouTube im erweiterten Datenschutzmodus.',
  fontsTitle: 'Google Fonts',
  fontsIcon: '🔤',
  fontsDescription: 'Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts, die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.',
  mapsTitle: 'Google Maps',
  mapsIcon: '🗺️',
  mapsDescription: 'Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited ("Google"), Gordon House, Barrow Street, Dublin 4, Irland. Mit Hilfe dieses Dienstes können wir Kartenmaterial auf unserer Website einbinden.'
})
</script>
