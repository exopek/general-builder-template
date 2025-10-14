<template>
  <div :style="{ backgroundColor }" class="py-8 md:py-12">
    <div class="container">
    <ContentSection :title="sectionTitle">
      <InfoCard
        :title="cardTitle"
        borderPosition="left"
        borderColor="accent-blue"
        bgColor="gray"
      >
        <p class="text-gray-700 leading-relaxed mb-4">
          {{ description }}
        </p>

        <div class="bg-white p-4 rounded-lg">
          <p class="font-semibold text-gray-900 mb-2">{{ hosterLabel }}</p>
          <p class="text-gray-700 mb-2">
            <strong>{{ hosterCompany }}</strong><br>
            {{ hosterAddress }}
          </p>
          <p class="text-gray-700">
            <strong>Kontakt:</strong><br>
            Telefon: <a :href="`tel:${hosterPhone.replace(/\s/g, '')}`" class="text-primary hover:underline">{{ hosterPhone }}</a><br>
            E-Mail: <a :href="`mailto:${hosterEmail}`" class="text-primary hover:underline">{{ hosterEmail }}</a><br>
            Website: <a :href="hosterWebsite" target="_blank" rel="noopener" class="text-primary hover:underline">{{ hosterWebsiteDisplay }}</a>
          </p>
        </div>
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
  hosterLabel?: string
  hosterCompany?: string
  hosterAddress?: string
  hosterPhone?: string
  hosterEmail?: string
  hosterWebsite?: string
  hosterWebsiteDisplay?: string
}

withDefaults(defineProps<Props>(), {
  backgroundColor: '#ffffff',
  sectionTitle: '2. Hosting',
  cardTitle: 'Externes Hosting',
  description: 'Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.',
  hosterLabel: 'Wir setzen folgenden Hoster ein:',
  hosterCompany: 'Cloudflare Germany GmbH',
  hosterAddress: 'Rosental 7, c/o Mindspace, 80331 München',
  hosterPhone: '+49 (89) 26207202',
  hosterEmail: 'support@cloudflare.com',
  hosterWebsite: 'https://www.cloudflare.com/',
  hosterWebsiteDisplay: 'cloudflare.com'
})
</script>
