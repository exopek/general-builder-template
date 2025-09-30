<template>
  <div class="container py-16">
    <div class="max-w-4xl mx-auto">
      <!-- Demo Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-black mb-4 text-gradient-warm">
          7-Wochen Transformation Popup Demo
        </h1>
        <p class="text-lg text-gray-500 mb-8">
          Verschiedene Konfigurationen der TransformationPopup Komponente
        </p>
      </div>

      <!-- Demo Configurations -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        <!-- Standard Configuration -->
        <div class="card p-6">
          <h3 class="text-xl font-bold mb-4">Standard</h3>
          <p class="text-gray-500 mb-6">
            Standard-Konfiguration mit Gradient-Button und automatischem Schließen.
          </p>
          <TransformationPopup
            @complete="handleComplete"
            @open="handleOpen"
            @close="handleClose"
            @step-change="handleStepChange"
          />
        </div>

        <!-- Primary Button Variant -->
        <div class="card p-6">
          <h3 class="text-xl font-bold mb-4">Primary Button</h3>
          <p class="text-gray-500 mb-6">
            Mit Primary-Button und manueller Kontrolle.
          </p>
          <TransformationPopup
            button-text="Challenge beginnen!"
            button-variant="primary"
            button-size="md"
            :auto-close="false"
            @complete="handleComplete"
          />
        </div>

        <!-- Large Modal -->
        <div class="card p-6">
          <h3 class="text-xl font-bold mb-4">Extra Large</h3>
          <p class="text-gray-500 mb-6">
            Großes Modal mit dunklem Hintergrund.
          </p>
          <TransformationPopup
            button-text="Große Ansicht"
            button-variant="outline"
            modal-max-width="3xl"
            modal-backdrop="dark"
            @complete="handleComplete"
          />
        </div>

        <!-- Custom CTA -->
        <div class="card p-6">
          <h3 class="text-xl font-bold mb-4">Custom CTA</h3>
          <p class="text-gray-500 mb-6">
            Mit benutzerdefiniertem Text und Weiterleitung.
          </p>
          <TransformationPopup
            button-text="Fitness-Check starten 💪"
            button-variant="secondary"
            button-size="lg"
            redirect-url="/success"
            @complete="handleComplete"
          />
        </div>

        <!-- Minimal Design -->
        <div class="card p-6">
          <h3 class="text-xl font-bold mb-4">Minimal</h3>
          <p class="text-gray-500 mb-6">
            Kleines Modal ohne Close-Button.
          </p>
          <TransformationPopup
            button-text="Schnelltest"
            button-variant="ghost"
            button-size="sm"
            modal-max-width="lg"
            :show-close-button="false"
            :close-on-backdrop="false"
            @complete="handleComplete"
          />
        </div>

        <!-- Glass Effect -->
        <div class="card p-6">
          <h3 class="text-xl font-bold mb-4">Glass Effect</h3>
          <p class="text-gray-500 mb-6">
            Mit Glasmorphismus-Effekt und XL-Button.
          </p>
          <TransformationPopup
            button-text="Transformation starten ✨"
            button-variant="gradient"
            button-size="xl"
            modal-backdrop="glass"
            @complete="handleComplete"
          />
        </div>

      </div>

      <!-- Event Log -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold mb-6">Event Log</h2>
        <div class="card p-6 max-h-64 overflow-y-auto">
          <div v-if="events.length === 0" class="text-gray-500 italic">
            Keine Events bisher. Klicke auf einen der Buttons oben, um zu beginnen.
          </div>
          <div v-else class="space-y-2">
            <div
              v-for="(event, index) in events.slice().reverse()"
              :key="index"
              class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <span class="text-xs text-gray-400 font-mono">
                {{ event.timestamp }}
              </span>
              <span class="font-medium">{{ event.type }}</span>
              <span class="text-gray-600">{{ event.message }}</span>
            </div>
          </div>
          <button
            v-if="events.length > 0"
            @click="clearEvents"
            class="mt-4 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Events löschen
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import TransformationPopup from '~/components/feature/TransformationPopup.vue'

interface UserData {
  age: number | null
  gender: string
  fitness: number
  balance: number
  happiness: number
  pushups: number
  summer: string
  followUp: string
  barriers: string[]
  otherReasons: string
}

interface Event {
  timestamp: string
  type: string
  message: string
}

const events = ref<Event[]>([])

const addEvent = (type: string, message: string) => {
  events.value.push({
    timestamp: new Date().toLocaleTimeString(),
    type,
    message
  })
}

const handleComplete = (data: UserData) => {
  addEvent('✅ Complete', `Fragebogen abgeschlossen. Alter: ${data.age}, Geschlecht: ${data.gender}, Pushups: ${data.pushups}`)
  console.log('Fragebogen-Daten:', data)
}

const handleOpen = () => {
  addEvent('🚀 Open', 'Modal wurde geöffnet')
}

const handleClose = () => {
  addEvent('❌ Close', 'Modal wurde geschlossen')
}

const handleStepChange = (step: number) => {
  addEvent('👣 Step', `Schritt ${step} erreicht`)
}

const clearEvents = () => {
  events.value = []
}
</script>