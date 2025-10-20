<template>
  <div class="section-components">
    <div class="container py-12">
      <h1 class="text-5xl font-bold mb-2 text-gradient-warm">Section Components</h1>
      <p class="text-gray-600 mb-12">Übersicht aller Section-Komponenten aus dem Design System</p>

      <!-- Table of Contents -->
      <div class="bg-white p-6 rounded-xl shadow-md mb-12">
        <h2 class="text-2xl font-bold mb-4 text-gray-900">Inhalt</h2>
        <ul class="space-y-2">
          <li><a href="#hero" class="text-primary hover:underline">Hero Section</a></li>
          <li><a href="#cta" class="text-primary hover:underline">CTA (Call-to-Action)</a></li>
          <li><a href="#statistics" class="text-primary hover:underline">Statistics Grid</a></li>
          <li><a href="#feature-grid" class="text-primary hover:underline">Feature Grid</a></li>
          <li><a href="#timeline" class="text-primary hover:underline">Timeline</a></li>
          <li><a href="#faq" class="text-primary hover:underline">FAQ</a></li>
        </ul>
      </div>

      <!-- Hero Section -->
      <section id="hero" class="ds-section">
        <h2 class="ds-section-title">Hero Section</h2>
        <p class="text-gray-600 mb-6">Große Einstiegssektion mit Bild, Headlines und CTAs</p>

        <div class="showcase-box">
          <Hero
            headline="Erreiche deine <span class='text-gradient-warm'>Fitness-Ziele</span>"
            subheadline="Werde Teil unserer Community und starte deine Transformation noch heute. Professionelles Training, individuelle Betreuung und modernste Ausstattung warten auf dich."
            badge-text="Neu"
            :show-badge="true"
            primary-cta-text="Jetzt starten"
            primary-cta-url="#"
            secondary-cta-text="Mehr erfahren"
            secondary-cta-url="#"
            hero-image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=750&fit=crop"
            hero-image-alt="Fitness Training"
            :show-stats="true"
            :statistics="[
              { value: 500, label: 'Mitglieder', suffix: '+' },
              { value: 15, label: 'Jahre Erfahrung' },
              { value: 98, label: 'Zufriedenheit', suffix: '%' }
            ]"
            :show-trust-indicators="true"
            :trust-indicators="['Keine Anmeldegebühr', '7 Tage Testphase', 'Jederzeit kündbar']"
            background-color="#f9fafb"
          />
        </div>
      </section>

      <!-- CTA Section -->
      <section id="cta" class="ds-section">
        <h2 class="ds-section-title">CTA (Call-to-Action)</h2>
        <p class="text-gray-600 mb-6">Aufmerksamkeitsstarke Call-to-Action Sektionen in verschiedenen Varianten</p>

        <div class="space-y-8">
          <!-- Default CTA -->
          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-700">Default Variant</h3>
            <div class="showcase-box">
              <CTA
                title="Bereit für deine Transformation?"
                description="Starte noch heute mit deinem persönlichen Trainingsplan und erreiche deine Ziele schneller als je zuvor."
                primary-text="Jetzt anmelden"
                primary-url="#"
                secondary-text="Kontakt"
                secondary-url="#"
                variant="default"
              />
            </div>
          </div>

          <!-- Gradient CTA -->
          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-700">Gradient Variant</h3>
            <div class="showcase-box">
              <CTA
                title="Exklusive Mitgliedschaft sichern"
                description="Profitiere von unserem Limited Angebot und spare bis zu 30% auf deine Jahresmitgliedschaft."
                :show-badge="true"
                badge-text="Limited"
                primary-text="Angebot sichern"
                primary-url="#"
                variant="gradient"
                size="lg"
              />
            </div>
          </div>

          <!-- Glass CTA -->
          <div class="bg-gradient-secondary p-8 rounded-2xl">
            <h3 class="text-xl font-semibold mb-4 text-white">Glass Variant (auf Gradient)</h3>
            <div class="showcase-box">
              <CTA
                title="Bleib auf dem Laufenden"
                description="Melde dich für unseren Newsletter an und erhalte exklusive Trainingstipps und Angebote."
                primary-text="Newsletter abonnieren"
                primary-url="#"
                variant="glass"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Statistics Grid Section -->
      <section id="statistics" class="ds-section">
        <h2 class="ds-section-title">Statistics Grid</h2>
        <p class="text-gray-600 mb-6">Darstellung von Zahlen und Statistiken in verschiedenen Layouts</p>

        <div class="space-y-8">
          <!-- 3 Column Grid -->
          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-700">3-Spalten Grid</h3>
            <div class="showcase-box">
              <StatisticGrid
                :statistics="[
                  { value: 1500, label: 'Aktive Mitglieder', suffix: '+', iconName: 'people' },
                  { value: 50, label: 'Kurse pro Woche', iconName: 'target' },
                  { value: 99, label: 'Kundenzufriedenheit', suffix: '%', iconName: 'heart' }
                ]"
                grid-type="fixed-3"
                gap="lg"
              />
            </div>
          </div>

          <!-- 4 Column Grid with Variants -->
          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-700">4-Spalten Grid mit verschiedenen Varianten</h3>
            <div class="showcase-box">
              <StatisticGrid
                :statistics="[
                  { value: 250, label: 'Trainingsfläche', suffix: 'm²', variant: 'primary' },
                  { value: 20, label: 'Trainer', suffix: '+', variant: 'secondary' },
                  { value: 7, label: 'Öffnungstage', variant: 'gradient' },
                  { value: 15, label: 'Jahre Erfahrung', variant: 'highlight' }
                ]"
                grid-type="fixed-4"
                gap="md"
                animation="stagger"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Feature Grid Section -->
      <section id="feature-grid" class="ds-section">
        <h2 class="ds-section-title">Feature Grid</h2>
        <p class="text-gray-600 mb-6">Asymmetrisches Grid für Features mit nummerierten Karten</p>

        <div class="showcase-box">
          <FeatureGrid
            tagline="Unsere Features"
            headline="Alles was du für dein Training brauchst"
            description="Von modernster Ausstattung bis hin zu persönlicher Betreuung - wir bieten dir alles für deinen Erfolg."
            :show-button="true"
            button-text="Alle Features"
            button-url="#"
            :features="[
              {
                number: '01',
                heading: 'Moderne Trainingsbereiche',
                description: 'State-of-the-art Geräte für Kraft- und Cardiotraining auf über 250qm Trainingsfläche.',
                backgroundColor: 'var(--color-gray-900)',
                numberColor: 'var(--color-gray-700)',
                headingColor: 'var(--color-white)',
                descriptionColor: 'var(--color-gray-300)'
              },
              {
                number: '02',
                heading: 'Persönliche Trainer',
                description: 'Qualifizierte und motivierte Trainer begleiten dich auf deinem Weg zu deinen Zielen.',
                backgroundColor: 'var(--color-gray-100)',
                numberColor: 'var(--color-gray-400)',
                headingColor: 'var(--color-gray-900)',
                descriptionColor: 'var(--color-gray-600)'
              },
              {
                number: '03',
                heading: 'Vielfältige Kurse',
                description: 'Von Yoga bis HIIT - über 50 verschiedene Kurse pro Woche für jeden Geschmack.',
                backgroundColor: 'var(--color-gray-100)',
                numberColor: 'var(--color-gray-400)',
                headingColor: 'var(--color-gray-900)',
                descriptionColor: 'var(--color-gray-600)'
              },
              {
                number: '04',
                heading: 'Wellness-Bereich',
                description: 'Sauna, Dampfbad und Entspannungsbereich für die perfekte Regeneration.',
                backgroundColor: 'var(--color-gray-100)',
                numberColor: 'var(--color-gray-400)',
                headingColor: 'var(--color-gray-900)',
                descriptionColor: 'var(--color-gray-600)'
              }
            ]"
          />
        </div>
      </section>

      <!-- Timeline Section -->
      <section id="timeline" class="ds-section">
        <h2 class="ds-section-title">Timeline</h2>
        <p class="text-gray-600 mb-6">Zeitstrahl für Prozesse, Historie oder Schritt-für-Schritt Anleitungen</p>

        <div class="space-y-8">
          <!-- Vertical Timeline -->
          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-700">Vertikale Timeline</h3>
            <div class="showcase-box">
              <Timeline
                headline="Deine Transformation in 4 Schritten"
                subheadline="So startest du erfolgreich mit uns durch"
                orientation="vertical"
                :show-numbers="true"
                :items="[
                  {
                    title: 'Probetraining vereinbaren',
                    description: 'Lerne unser Studio und das Team kennen. Kostenlos und unverbindlich.',
                    date: 'Schritt 1',
                    completed: true
                  },
                  {
                    title: 'Fitness-Check & Zieldefinition',
                    description: 'Wir analysieren deinen aktuellen Fitnesslevel und definieren gemeinsam deine Ziele.',
                    date: 'Schritt 2',
                    active: true
                  },
                  {
                    title: 'Individueller Trainingsplan',
                    description: 'Erhalte einen auf dich zugeschnittenen Trainingsplan von unseren Experten.',
                    date: 'Schritt 3'
                  },
                  {
                    title: 'Regelmäßige Erfolgskontrollen',
                    description: 'Gemeinsam tracken wir deine Fortschritte und passen den Plan bei Bedarf an.',
                    date: 'Schritt 4'
                  }
                ]"
              />
            </div>
          </div>

          <!-- Card Timeline -->
          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-700">Timeline mit Karten</h3>
            <div class="showcase-box">
              <Timeline
                headline="Unsere Geschichte"
                orientation="vertical"
                variant="cards"
                :items="historyTimelineItems"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section id="faq" class="ds-section">
        <h2 class="ds-section-title">FAQ</h2>
        <p class="text-gray-600 mb-6">Häufig gestellte Fragen mit Suche und Kategorien</p>

        <div class="showcase-box">
          <FAQ
            headline="Häufig gestellte Fragen"
            subheadline="Hier findest du Antworten auf die wichtigsten Fragen rund um deine Mitgliedschaft."
            :show-search="true"
            search-placeholder="Frage suchen..."
            :show-categories="true"
            :show-category-icons="true"
            :categories="[
              { id: 'membership', name: 'Mitgliedschaft', emoji: '💳' },
              { id: 'training', name: 'Training', emoji: '💪' },
              { id: 'courses', name: 'Kurse', emoji: '🧘' },
              { id: 'payment', name: 'Zahlung', emoji: '💰' }
            ]"
            :faqs="[
              {
                question: 'Welche Mitgliedschaftsmodelle gibt es?',
                answer: 'Wir bieten flexible Mitgliedschaften an: Monatliche Mitgliedschaft ohne Mindestlaufzeit, 6-Monats-Mitgliedschaft mit 10% Rabatt, und Jahresmitgliedschaft mit 20% Rabatt. Alle Mitgliedschaften beinhalten Zugang zu allen Trainingsbereichen und Kursen.',
                category: 'membership'
              },
              {
                question: 'Kann ich eine Probestunde vereinbaren?',
                answer: 'Ja, absolut! Du kannst jederzeit ein kostenloses Probetraining vereinbaren. Dabei zeigen wir dir das gesamte Studio, du kannst alle Bereiche testen und wir beraten dich individuell zu deinen Zielen.',
                category: 'membership'
              },
              {
                question: 'Gibt es einen individuellen Trainingsplan?',
                answer: 'Ja, jedes neue Mitglied erhält einen kostenlosen, individuell erstellten Trainingsplan. Unsere zertifizierten Trainer analysieren zunächst deinen aktuellen Fitnesslevel und erstellen dann einen Plan, der perfekt zu deinen Zielen passt.',
                category: 'training'
              },
              {
                question: 'Wie melde ich mich für Kurse an?',
                answer: 'Die Anmeldung erfolgt ganz einfach über unsere App oder direkt an der Rezeption. Du kannst bis zu 24 Stunden vor Kursbeginn buchen und bis zu 3 Stunden vorher stornieren.',
                category: 'courses'
              },
              {
                question: 'Welche Zahlungsmöglichkeiten gibt es?',
                answer: 'Wir akzeptieren Lastschrift, Kreditkarte und PayPal. Die Zahlung erfolgt automatisch monatlich bzw. entsprechend deines gewählten Mitgliedschaftsmodells.',
                category: 'payment'
              },
              {
                question: 'Kann ich meine Mitgliedschaft pausieren?',
                answer: 'Ja, du kannst deine Mitgliedschaft für mindestens 4 Wochen und maximal 3 Monate pausieren. Während der Pause fällt eine reduzierte Gebühr von 15€ pro Monat an.',
                category: 'membership'
              }
            ]"
            :show-contact-section="true"
            contact-section-headline="Noch Fragen? Wir sind für dich da!"
            contact-section-description="Unser Team beantwortet gerne alle deine Fragen persönlich."
            primary-contact-text="Kontakt aufnehmen"
            primary-contact-url="/kontakt"
          />
        </div>
      </section>

      <!-- Footer Note -->
      <div class="mt-12 p-6 bg-gray-100 rounded-xl">
        <p class="text-sm text-gray-600">
          💡 <strong>Hinweis:</strong> Diese Seite zeigt nur eine Auswahl der verfügbaren Section Components.
          Weitere Components findest du im Ordner <code class="bg-white px-2 py-1 rounded">components/design-system-section-components/</code>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hero from '~/components/design-system-section-components/Hero.vue'
import CTA from '~/components/design-system-section-components/CTA.vue'
import StatisticGrid from '~/components/design-system-section-components/StatisticGrid.vue'
import FeatureGrid from '~/components/design-system-section-components/FeatureGrid.vue'
import Timeline from '~/components/design-system-section-components/Timeline.vue'
import FAQ from '~/components/design-system-section-components/FAQ.vue'

// SEO Meta Tags with noindex
useHead({
  title: 'Section Components - Club Exopek',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// Timeline data
const historyTimelineItems = [
  {
    title: '2010 - Die Gründung',
    description: 'Mit einer Vision und viel Leidenschaft eröffneten wir unser erstes Studio.',
    date: '2010'
  },
  {
    title: '2015 - Expansion',
    description: 'Aufgrund der großen Nachfrage erweiterten wir unsere Fläche um 150qm.',
    date: '2015'
  },
  {
    title: '2020 - Digitalisierung',
    description: 'Einführung unserer App und Online-Kurse für maximale Flexibilität.',
    date: '2020'
  },
  {
    title: '2024 - Award Winner',
    description: 'Auszeichnung als "Bestes Fitness-Studio der Region".',
    date: '2024'
  }
]
</script>

<style scoped>
.section-components {
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
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--color-gray-200);
}

.showcase-box {
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  background: var(--color-white);
}

code {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
}

/* Smooth scroll for anchor links */
html {
  scroll-behavior: smooth;
}

/* Anchor offset for fixed header */
section[id] {
  scroll-margin-top: 2rem;
}
</style>
