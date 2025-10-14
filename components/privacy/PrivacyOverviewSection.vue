<template>
  <div :style="{ backgroundColor }" class="py-8 md:py-12">
    <div class="container">
    <ContentSection :title="sectionTitle">
      <!-- Allgemeine Hinweise -->
      <InfoHighlight
        :title="highlightTitle"
        :icon="highlightIcon"
        :variant="highlightVariant"
      >
        <p class="text-gray-700 leading-relaxed">
          {{ generalInfo }}
        </p>
      </InfoHighlight>

      <!-- FAQ Accordions -->
      <div class="mt-6 space-y-4">
        <Accordion :title="accordion1Title">
          <p class="text-gray-700 leading-relaxed">
            {{ accordion1Content }}
          </p>
        </Accordion>

        <Accordion :title="accordion2Title">
          <p class="text-gray-700 leading-relaxed mb-3">
            {{ accordion2Content1 }}
          </p>
          <p class="text-gray-700 leading-relaxed">
            {{ accordion2Content2 }}
          </p>
        </Accordion>

        <Accordion :title="accordion3Title">
          <p class="text-gray-700 leading-relaxed mb-3">
            {{ accordion3Content1 }}
          </p>
          <p class="text-gray-700 leading-relaxed">
            {{ accordion3Content2 }}
          </p>
        </Accordion>

        <Accordion :title="accordion4Title">
          <p class="text-gray-700 leading-relaxed">
            {{ accordion4Content }}
          </p>
        </Accordion>
      </div>
    </ContentSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContentSection from '~/components/design-system-ui-components/ContentSection.vue'
import InfoHighlight from '~/components/design-system-ui-components/InfoHighlight.vue'
import Accordion from '~/components/design-system-ui-components/Accordion.vue'
interface Props {
  sectionTitle?: string
  backgroundColor?: string
  highlightTitle?: string
  highlightIcon?: string
  highlightVariant?: 'default' | 'warning' | 'info' | 'success' | 'primary'
  generalInfo?: string
  accordion1Title?: string
  accordion1Content?: string
  accordion2Title?: string
  accordion2Content1?: string
  accordion2Content2?: string
  accordion3Title?: string
  accordion3Content1?: string
  accordion3Content2?: string
  accordion4Title?: string
  accordion4Content?: string
}

withDefaults(defineProps<Props>(), {
  sectionTitle: '1. Datenschutz auf einen Blick',
  backgroundColor: '#ffffff',
  highlightTitle: 'Allgemeine Hinweise',
  highlightIcon: 'ℹ️',
  highlightVariant: 'info',
  generalInfo: 'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.',
  accordion1Title: 'Wer ist verantwortlich für die Datenerfassung auf dieser Website?',
  accordion1Content: 'Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt "Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.',
  accordion2Title: 'Wie erfassen wir Ihre Daten?',
  accordion2Content1: 'Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.',
  accordion2Content2: 'Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.',
  accordion3Title: 'Wofür nutzen wir Ihre Daten?',
  accordion3Content1: 'Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.',
  accordion3Content2: 'Sofern über die Website Verträge geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen verarbeitet.',
  accordion4Title: 'Welche Rechte haben Sie bezüglich Ihrer Daten?',
  accordion4Content: 'Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen.'
})
</script>
