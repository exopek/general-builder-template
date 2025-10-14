<template>
  <div :style="{ backgroundColor }" class="py-8 md:py-12">
    <div class="container">
    <ContentSection :title="sectionTitle">

      <!-- Cookies -->
      <InfoCard
        :title="cookiesTitle"
        borderPosition="left"
        borderColor="accent-yellow"
        bgColor="white"
        :hoverEffect="true"
        customClass="mb-6"
      >
        <p class="text-gray-700 leading-relaxed mb-4">
          {{ cookiesDescription }}
        </p>
        <NuxtLink
          :to="cookiesSettingsLink"
          class="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
        >
          {{ cookiesLinkText }}
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </InfoCard>

      <!-- Kontaktformular -->
      <Accordion
        :title="contactFormTitle"
        customClass="mb-4"
      >
        <p class="text-gray-700 leading-relaxed">
          {{ contactFormContent }}
        </p>
      </Accordion>

      <!-- Anfrage per E-Mail, Telefon oder Telefax -->
      <Accordion
        :title="inquiryTitle"
      >
        <p class="text-gray-700 leading-relaxed">
          {{ inquiryContent }}
        </p>
      </Accordion>
    </ContentSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContentSection from '~/components/design-system-ui-components/ContentSection.vue'
import Accordion from '~/components/design-system-ui-components/Accordion.vue'
import InfoCard from '~/components/design-system-ui-components/InfoCard.vue'
interface Props {
  backgroundColor?: string
  sectionTitle?: string
  cookiesTitle?: string
  cookiesDescription?: string
  cookiesSettingsLink?: string
  cookiesLinkText?: string
  contactFormTitle?: string
  contactFormContent?: string
  inquiryTitle?: string
  inquiryContent?: string
}

withDefaults(defineProps<Props>(), {
  backgroundColor: '#ffffff',
  sectionTitle: '4. Datenerfassung auf dieser Website',
  cookiesTitle: 'Cookies',
  cookiesDescription: 'Unsere Internetseiten verwenden so genannte "Cookies". Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.',
  cookiesSettingsLink: '/cookie-einstellungen',
  cookiesLinkText: 'Zu den Cookie-Einstellungen',
  contactFormTitle: 'Kontaktformular',
  contactFormContent: 'Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.',
  inquiryTitle: 'Anfrage per E-Mail, Telefon oder Telefax',
  inquiryContent: 'Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.'
})
</script>
