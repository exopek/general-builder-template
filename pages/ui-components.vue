<template>
  <div class="ui-components">
    <div class="container py-12">
      <h1 class="text-5xl font-bold mb-2 text-gradient-warm">UI Components</h1>
      <p class="text-gray-600 mb-12">Übersicht aller UI-Komponenten aus dem Design System</p>

      <!-- Buttons Section -->
      <section class="ds-section">
        <h2 class="ds-section-title">Buttons</h2>

        <!-- Button Variants -->
        <div class="ds-subsection">
          <h3 class="ds-subsection-title">Varianten</h3>
          <div class="flex flex-wrap gap-4">
            <Button text="Primary Button" variant="primary" />
            <Button text="Secondary Button" variant="secondary" />
            <Button text="Ghost Button" variant="ghost" />
            <Button text="Gradient Button" variant="gradient" />
            <Button text="Outline Button" variant="outline" />
          </div>
        </div>

        <!-- Button Sizes -->
        <div class="ds-subsection">
          <h3 class="ds-subsection-title">Größen</h3>
          <div class="flex flex-wrap items-center gap-4">
            <Button text="Small" size="sm" />
            <Button text="Medium" size="md" />
            <Button text="Large" size="lg" />
            <Button text="Extra Large" size="xl" />
          </div>
        </div>

        <!-- Button States -->
        <div class="ds-subsection">
          <h3 class="ds-subsection-title">States</h3>
          <div class="flex flex-wrap gap-4">
            <Button text="Normal" />
            <Button text="Loading" :loading="true" />
            <Button text="Disabled" :disabled="true" />
          </div>
        </div>
      </section>

      <!-- Info Cards Section -->
      <section class="ds-section">
        <h2 class="ds-section-title">Info Cards</h2>

        <div class="ds-subsection">
          <h3 class="ds-subsection-title">Border Varianten</h3>
          <div class="ds-grid">
            <InfoCard title="Left Border" border-position="left" border-color="primary">
              <p class="text-gray-600">Card mit linkem Border</p>
            </InfoCard>
            <InfoCard title="Top Border" border-position="top" border-color="accent-blue">
              <p class="text-gray-600">Card mit oberem Border</p>
            </InfoCard>
            <InfoCard title="All Border" border-position="all" border-color="accent-green">
              <p class="text-gray-600">Card mit komplettem Border</p>
            </InfoCard>
          </div>
        </div>

        <div class="ds-subsection">
          <h3 class="ds-subsection-title">Hintergrund-Farben</h3>
          <div class="ds-grid">
            <InfoCard title="White Background" bg-color="white">
              <p class="text-gray-600">Standard weißer Hintergrund</p>
            </InfoCard>
            <InfoCard title="Gray Background" bg-color="gray">
              <p class="text-gray-600">Grauer Hintergrund</p>
            </InfoCard>
            <InfoCard title="Primary Background" bg-color="primary">
              <p class="text-gray-600">Primary Hintergrund</p>
            </InfoCard>
          </div>
        </div>
      </section>

      <!-- USP Cards Section -->
      <section class="ds-section">
        <h2 class="ds-section-title">USP Cards</h2>

        <div class="ds-subsection">
          <div class="ds-grid">
            <USPCard
              title="Professionelles Training"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              variant="primary"
            />
            <USPCard
              title="Flexible Zeiten"
              description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              variant="secondary"
            />
            <USPCard
              title="Moderne Ausstattung"
              description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              variant="gradient"
              badge="Neu"
            />
            <USPCard
              title="Persönliche Betreuung"
              description="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              variant="outline"
              link-text="Mehr erfahren"
              link-url="#"
            />
          </div>
        </div>
      </section>

      <!-- Event Cards Section -->
      <section class="ds-section">
        <h2 class="ds-section-title">Event Cards</h2>

        <div class="ds-subsection">
          <div class="ds-grid">
            <EventCard
              title="Yoga Kurs"
              description="Entspannende Yoga-Session für Anfänger und Fortgeschrittene."
              date="2024-03-15"
              badge="Beliebt"
              :features="['60 Minuten', 'Max. 12 Teilnehmer', 'Alle Levels']"
              cta-text="Jetzt buchen"
              cta-url="#"
              variant="default"
            />
            <EventCard
              title="HIIT Training"
              description="Intensives High-Intensity Interval Training für maximale Fettverbrennung."
              date="2024-03-20"
              :show-progress="true"
              :progress="75"
              progress-label="Auslastung"
              :features="['45 Minuten', 'Max. 15 Teilnehmer', 'Fortgeschritten']"
              cta-text="Anmelden"
              cta-url="#"
              variant="featured"
            />
            <EventCard
              title="Ernährungsberatung"
              description="Individuelle Ernährungsberatung für optimale Ergebnisse."
              badge="Neu"
              :features="['90 Minuten', 'Einzelberatung', 'Ernährungsplan inklusive']"
              cta-text="Termin vereinbaren"
              cta-url="#"
              variant="gradient"
            />
          </div>
        </div>
      </section>

      <!-- Contact Cards Section -->
      <section class="ds-section">
        <h2 class="ds-section-title">Contact Cards</h2>

        <div class="ds-subsection">
          <div class="ds-grid">
            <ContactCard
              title="Hauptstandort"
              description="Unser Hauptstudio in der Innenstadt"
              email="info@clubexopek.de"
              phone="+49 123 456789"
              address="Musterstraße 123&#10;12345 Musterstadt"
              gradient="warm"
            />
            <ContactCard
              title="Zweigstelle"
              description="Unser zweites Studio im Norden"
              email="nord@clubexopek.de"
              phone="+49 987 654321"
              address="Nordstraße 456&#10;54321 Nordstadt"
              gradient="cool"
            />
            <ContactCard
              title="Online Support"
              description="Wir sind auch digital für dich da"
              email="support@clubexopek.de"
              gradient="primary"
            />
          </div>
        </div>
      </section>

      <!-- Accordion Section -->
      <section class="ds-section">
        <h2 class="ds-section-title">Accordion</h2>

        <div class="ds-subsection">
          <div class="space-y-4">
            <Accordion title="Was ist im Mitgliedsbeitrag enthalten?">
              <p class="text-gray-600">
                Der Mitgliedsbeitrag beinhaltet die Nutzung aller Trainingsbereiche, Gruppenkurse und der Umkleidebereiche mit Duschen.
                Zusätzlich erhältst du Zugang zu unserer mobilen App mit individuellen Trainingsplänen.
              </p>
            </Accordion>
            <Accordion title="Welche Öffnungszeiten hat das Studio?">
              <p class="text-gray-600">
                Unser Studio ist Montag bis Freitag von 6:00 bis 23:00 Uhr geöffnet.
                Am Wochenende haben wir von 8:00 bis 20:00 Uhr für dich geöffnet.
              </p>
            </Accordion>
            <Accordion title="Kann ich eine Probestunde vereinbaren?" :default-open="true">
              <p class="text-gray-600">
                Ja, natürlich! Vereinbare einfach einen Termin für ein kostenloses Probetraining.
                Dabei zeigen wir dir alle Bereiche und du kannst unverbindlich testen, ob unser Studio zu dir passt.
              </p>
            </Accordion>
            <Accordion title="Gibt es Parkplätze?">
              <p class="text-gray-600">
                Ja, wir haben kostenlose Parkplätze direkt vor dem Studio. Zusätzlich gibt es einen Fahrradstellplatz.
              </p>
            </Accordion>
          </div>
        </div>
      </section>

      <!-- Modal Section -->
      <section class="ds-section">
        <h2 class="ds-section-title">Modal</h2>

        <div class="ds-subsection">
          <h3 class="ds-subsection-title">Modal Beispiele</h3>
          <div class="flex flex-wrap gap-4">
            <Button text="Standard Modal öffnen" @click="showModal1 = true" />
            <Button text="Small Modal öffnen" variant="secondary" @click="showModal2 = true" />
            <Button text="Large Modal öffnen" variant="gradient" @click="showModal3 = true" />
          </div>

          <!-- Modal 1 - Standard -->
          <Modal :show="showModal1" @close="showModal1 = false">
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-4 text-gray-900">Standard Modal</h3>
              <p class="text-gray-600 mb-6">
                Dies ist ein Standard-Modal mit mittlerer Größe. Es eignet sich perfekt für die meisten Anwendungsfälle.
              </p>
              <div class="flex justify-end gap-3">
                <Button text="Abbrechen" variant="ghost" @click="showModal1 = false" />
                <Button text="Bestätigen" @click="showModal1 = false" />
              </div>
            </div>
          </Modal>

          <!-- Modal 2 - Small -->
          <Modal :show="showModal2" max-width="sm" @close="showModal2 = false">
            <div class="p-6">
              <h3 class="text-xl font-bold mb-3 text-gray-900">Kleines Modal</h3>
              <p class="text-gray-600 mb-4">
                Ein kompaktes Modal für einfache Bestätigungen.
              </p>
              <div class="flex justify-end">
                <Button text="OK" size="sm" @click="showModal2 = false" />
              </div>
            </div>
          </Modal>

          <!-- Modal 3 - Large -->
          <Modal :show="showModal3" max-width="2xl" @close="showModal3 = false">
            <div class="p-8">
              <h3 class="text-3xl font-bold mb-4 text-gray-900">Großes Modal</h3>
              <p class="text-gray-600 mb-6">
                Ein großes Modal für umfangreichere Inhalte. Hier ist viel Platz für Formulare, Listen oder detaillierte Informationen.
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <InfoCard title="Feature 1" border-position="left">
                  <p class="text-gray-600">Beschreibung des ersten Features</p>
                </InfoCard>
                <InfoCard title="Feature 2" border-position="left" border-color="accent-blue">
                  <p class="text-gray-600">Beschreibung des zweiten Features</p>
                </InfoCard>
              </div>
              <div class="flex justify-end gap-3">
                <Button text="Schließen" variant="secondary" @click="showModal3 = false" />
                <Button text="Speichern" @click="showModal3 = false" />
              </div>
            </div>
          </Modal>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/design-system-ui-components/Button.vue'
import InfoCard from '~/components/design-system-ui-components/InfoCard.vue'
import USPCard from '~/components/design-system-ui-components/USPCard.vue'
import EventCard from '~/components/design-system-ui-components/EventCard.vue'
import ContactCard from '~/components/design-system-ui-components/ContactCard.vue'
import Accordion from '~/components/design-system-ui-components/Accordion.vue'
import Modal from '~/components/design-system-ui-components/Modal.vue'

// SEO Meta Tags with noindex
useHead({
  title: 'UI Components - Club Exopek',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// Modal states
const showModal1 = ref(false)
const showModal2 = ref(false)
const showModal3 = ref(false)
</script>

<style scoped>
.ui-components {
  min-height: 100vh;
  background-color: var(--color-gray-50);
}

.ds-section {
  margin-bottom: var(--spacing-5xl);
  padding: var(--spacing-xl);
  background: var(--color-white);
  border-radius: var(--border-radius-2xl);
  box-shadow: var(--shadow-md);
}

.ds-section-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-secondary);
  margin-bottom: var(--spacing-2xl);
  padding-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--color-gray-200);
}

.ds-subsection {
  margin-bottom: var(--spacing-3xl);
}

.ds-subsection:last-child {
  margin-bottom: 0;
}

.ds-subsection-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-lg);
}

.ds-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}
</style>
