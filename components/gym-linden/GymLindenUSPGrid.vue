<template>
  <BaseUSPGrid v-bind="gridProps">
    <!-- USP Card 1: Morning Training -->
    <BaseUSPCard
      title="Morgentraining vor der Arbeit"
      description="Starte deinen Tag mit Energie! Unsere Morgenkurse ab 6:30 Uhr bringen dich fit und motiviert zur Arbeit. Perfekt für Berufstätige in Hannover Linden."
      variant="primary"
    >
      <template #icon>
        <svg class="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
        </svg>
      </template>
    </BaseUSPCard>

    <!-- USP Card 2: Concentration Boost -->
    <BaseUSPCard
      title="Konzentrations-Boost für den Tag"
      description="Morgentraining steigert deine mentale Leistungsfähigkeit. Functional Training und HIIT aktivieren Körper und Geist – perfekt für einen produktiven Arbeitstag."
      variant="gradient"
      badge="Beliebt"
    >
      <template #icon>
        <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      </template>
    </BaseUSPCard>

    <!-- USP Card 3: EXOPEK Concept -->
    <BaseUSPCard
      title="Innovatives EXOPEK-Konzept"
      description="Revolutionäres Trainingssystem aus der Schweiz. EXOPEK kombiniert Functional Training mit spezieller Ausrüstung für maximale Effizienz – exklusiv in unserem Gym Linden."
      variant="primary"
      link-text="Mehr über EXOPEK →"
      link-url="https://exopek.de"
    >
      <template #icon>
        <svg class="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
        </svg>
      </template>
    </BaseUSPCard>

    <!-- USP Card 4: Shorter Workouts -->
    <BaseUSPCard
      title="Kürzere & effektivere Workouts"
      description="Nur 45 Minuten pro Session! EXOPEK Training ist hochintensiv und maximal effizient. Spare Zeit, erreiche mehr – ideal für dein Fitness-Ziel im Gym Hannover."
      variant="primary"
    >
      <template #icon>
        <svg class="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clip-rule="evenodd"/>
        </svg>
      </template>
    </BaseUSPCard>

    <!-- USP Card 5: Functional Training + HIIT -->
    <BaseUSPCard
      title="Functional Training + HIIT"
      description="Kombiniere dein gewohntes HIIT mit dem EXOPEK-Rucksack. Functional Training für den ganzen Körper – intensiver, effektiver, nachhaltiger."
      variant="primary"
    >
      <template #icon>
        <svg class="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
        </svg>
      </template>
    </BaseUSPCard>

    <!-- USP Card 6: Perfect Location -->
    <BaseUSPCard
      title="Perfekte Lage in Linden"
      description="Zentral in Hannover Linden gelegen – schnell erreichbar vor oder nach der Arbeit. Das Fitnessstudio Linden Hannover für deine Nachbarschaft."
      variant="outline"
    >
      <template #icon>
        <svg class="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
        </svg>
      </template>
    </BaseUSPCard>
  </BaseUSPGrid>
</template>

<script setup lang="ts">
const gridProps = {
  tagline: 'Deine Vorteile',
  headline: 'Warum unser Gym in Hannover Linden?',
  description: 'Entdecke die Vorteile von funktionalem Training und HIIT im besten Fitnessstudio Hannover Linden. Morgens trainieren, voller Energie in den Tag starten.',
  columns: '3' as const,
  backgroundColor: 'white' as const,
  showCta: false
}
</script>
