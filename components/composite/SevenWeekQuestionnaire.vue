<template>
  <div class="w-full">
    <!-- Hook Header -->
    <div v-if="!isStarted" class="text-center py-8">
      <h1 class="text-4xl md:text-5xl font-black mb-6 text-gradient-warm leading-tight">
        7 Wochen. Neuer Körper. Null Kosten.
      </h1>
      <p class="text-lg md:text-xl text-gray-500 mb-8 leading-relaxed max-w-2xl mx-auto">
        Unter allen Teilnehmern verlosen wir eine komplette Transformation. Dauert 90 Sekunden, kann dein Leben verändern.
      </p>

      <div class="flex flex-col gap-4 mb-8 max-w-md mx-auto">
        <div v-for="step in steps" :key="step.number" class="card-glass p-6 flex items-center gap-4 hover:scale-105 transition-transform">
          <div class="w-12 h-12 rounded-full bg-gradient-warm text-white font-bold text-lg flex items-center justify-center flex-shrink-0">
            {{ step.number }}
          </div>
          <div class="text-left text-gray-500 font-medium">{{ step.text }}</div>
        </div>
      </div>

      <BaseButton
        text="Jetzt starten! 🚀"
        variant="gradient"
        size="lg"
        @click="startQuestionnaire"
      />
    </div>

    <!-- Content Wrapper -->
    <div v-else class="fade-in">
      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressWidth + '%' }"></div>
        </div>
        <div class="text-center text-sm text-gray-500 mt-2">
          Schritt {{ currentStep }} von {{ totalSteps }}
        </div>
      </div>

      <!-- Step 1: Personal Info -->
      <div v-show="currentStep === 1" class="card p-8 slide-up">
        <div class="text-center mb-6">
          <div class="text-5xl mb-4">👋</div>
          <h2 class="text-2xl text-gray-900 font-bold mb-2">Schön, dass du hier bist!</h2>
          <p class="text-gray-500 font-medium">Lass uns dich kurz kennenlernen</p>
        </div>

        <div class="space-y-6">
          <div>
            <label class="block font-semibold mb-2 text-gray-700">Wie alt bist du? *</label>
            <input
              v-model.number="userData.age"
              type="number"
              min="16"
              max="99"
              class="w-full p-4 border-2 border-gray-200 rounded-lg text-lg text-gray-700 transition-colors focus:border-primary focus:outline-none"
              :class="{ 'border-red-500 bg-red-50': ageError }"
            >
          </div>

          <div>
            <label class="block font-semibold mb-2 text-gray-700">Geschlecht *</label>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="gender in genders"
                :key="gender.value"
                class="p-4 border-2 border-gray-200 text-gray-700 rounded-lg font-medium transition-all hover:border-primary hover:bg-primary/5"
                :class="{
                  'border-primary bg-primary text-gray-200': userData.gender === gender.value,
                  'border-red-500 bg-red-50': genderError
                }"
                @click="selectGender(gender.value)"
              >
                {{ gender.label }}
              </button>
            </div>
          </div>
        </div>

        <div class="flex justify-center mt-8">
          <BaseButton
            text="Weiter"
            variant="primary"
            size="lg"
            @click="nextStep"
          />
        </div>
      </div>

      <!-- Step 2: Feelings -->
      <div v-show="currentStep === 2" class="card p-8 slide-up">
        <div class="text-center mb-6">
          <div class="text-5xl mb-4">💭</div>
          <h2 class="text-2xl text-gray-900 font-bold mb-2">Wie fühlst du dich aktuell?</h2>
          <p class="text-gray-500 font-medium">Sei ehrlich zu dir selbst – das ist der erste Schritt!</p>
        </div>

        <div class="space-y-8">
          <div v-for="feeling in feelings" :key="feeling.key">
            <h4 class="font-semibold mb-4">{{ feeling.label }} (1-10)</h4>
            <div class="flex items-center gap-4">
              <button
                class="w-10 h-10 rounded-full border-2 border-primary bg-white text-primary font-bold hover:bg-primary hover:text-white transition-all"
                @click="decreaseSlider(feeling.key)"
              >
                −
              </button>
              <input
                v-model.number="userData[feeling.key]"
                type="range"
                min="1"
                max="10"
                class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none slider"
              >
              <button
                class="w-10 h-10 rounded-full border-2 border-primary bg-white text-primary font-bold hover:bg-primary hover:text-white transition-all"
                @click="increaseSlider(feeling.key)"
              >
                +
              </button>
            </div>
            <div class="text-center mt-2 text-2xl font-bold text-primary">{{ userData[feeling.key] }}</div>
          </div>
        </div>

        <div class="flex justify-center gap-4 mt-8">
          <BaseButton
            text="Zurück"
            variant="ghost"
            @click="previousStep"
          />
          <BaseButton
            text="Weiter"
            variant="primary"
            size="lg"
            @click="nextStep"
          />
        </div>
      </div>

      <!-- Step 3: Pushups -->
      <div v-show="currentStep === 3" class="card p-8 slide-up">
        <div class="text-center mb-6">
          <div class="text-5xl mb-4">💪</div>
          <h2 class="text-2xl text-gray-900 font-bold mb-2">Wie stark bist du?</h2>
          <p class="text-gray-500 font-medium">Eine einfache Frage, die viel über deinen aktuellen Stand verrät</p>
        </div>

        <div class="flex items-center justify-center gap-8 my-8">
          <button
            class="w-16 h-16 rounded-full border-4 border-primary bg-white text-primary text-2xl font-bold hover:bg-primary hover:text-white hover:scale-110 transition-all"
            @click="decreasePushups"
          >
            −
          </button>

          <div class="text-center min-w-32">
            <div class="text-4xl font-black text-primary">{{ userData.pushups }}</div>
            <p class="font-medium text-gray-500">Liegestütze</p>
          </div>

          <button
            class="w-16 h-16 rounded-full border-4 border-primary bg-white text-primary text-2xl font-bold hover:bg-primary hover:text-white hover:scale-110 transition-all"
            @click="increasePushups"
          >
            +
          </button>
        </div>

        <div class="flex justify-center gap-4 mt-8">
          <BaseButton
            text="Zurück"
            variant="ghost"
            @click="previousStep"
          />
          <BaseButton
            text="Weiter"
            variant="primary"
            size="lg"
            @click="nextStep"
          />
        </div>
      </div>

      <!-- Step 4: Summer Review -->
      <div v-show="currentStep === 4" class="card p-8 slide-up">
        <div class="text-center mb-6">
          <div class="text-5xl mb-4">☀️</div>
          <h2 class="text-2xl text-gray-900 font-bold mb-2">Rückblick auf diesen Sommer</h2>
          <p class="text-gray-500 font-medium">Warst du so fit, wie du wolltest?</p>
        </div>

        <div v-if="!userData.summer" class="grid grid-cols-1 gap-4 max-w-md mx-auto">
          <button
            class="p-4 border-2 border-gray-200 text-gray-900 rounded-lg font-medium transition-all hover:border-primary hover:bg-primary/5"
            @click="selectSummer('ja')"
          >
            Ja, war ich!
          </button>
          <button
            class="p-4 border-2 border-gray-200 text-gray-900 rounded-lg font-medium transition-all hover:border-primary hover:bg-primary/5"
            @click="selectSummer('nein')"
          >
            Nein, leider nicht
          </button>
        </div>

        <div v-if="userData.summer === 'ja'" class="text-center fade-in">
          <h3 class="text-lg text-gray-500 font-semibold mb-4">Willst du, dass das so bleibt?</h3>
          <div class="grid grid-cols-1 gap-4 max-w-md mx-auto">
            <button
              class="p-4 border-2 border-gray-200 text-gray-900 rounded-lg font-medium transition-all hover:border-primary hover:bg-primary/5"
              @click="selectFollowUp('bleibt')"
            >
              Auf jeden Fall!
            </button>
            <button
              class="p-4 border-2 border-gray-200 text-gray-900 rounded-lg font-medium transition-all hover:border-primary hover:bg-primary/5"
              @click="selectFollowUp('fitter')"
            >
              Ich will noch fitter werden
            </button>
          </div>
        </div>

        <div v-if="userData.summer === 'nein'" class="text-center fade-in">
          <h3 class="text-lg font-semibold mb-4">Lass es uns ändern!</h3>
          <BaseButton
            text="7 Wochen - Let's go! 🚀"
            variant="gradient"
            size="lg"
            @click="selectFollowUp('change')"
          />
        </div>

        <div class="flex justify-center mt-8">
          <BaseButton
            text="Zurück"
            variant="ghost"
            @click="previousStep"
          />
        </div>
      </div>

      <!-- Step 5: Barriers -->
      <div v-show="currentStep === 5" class="card p-8 slide-up">
        <div class="text-center mb-6">
          <div class="text-5xl mb-4">🤔</div>
          <h2 class="text-2xl text-gray-900 font-bold mb-2">"Versprochen, morgen mach ich Sport."</h2>
          <p class="text-gray-500 font-medium">Schweinehund-Bingo – Buzzword Edition</p>
        </div>

        <div class="space-y-3">
          <label
            v-for="barrier in barriers"
            :key="barrier.value"
            class="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:border-primary hover:bg-primary/5"
            :class="{ 'border-primary bg-primary text-white': userData.barriers.includes(barrier.value) }"
            @click="toggleBarrier(barrier.value)"
          >
            <input
              type="checkbox"
              :checked="userData.barriers.includes(barrier.value)"
              class="mr-4 w-5 h-5"
              tabindex="-1"
            >
            <span class="font-medium text-gray-900">{{ barrier.label }}</span>
          </label>
        </div>

        <div v-if="userData.barriers.includes('andere')" class="mt-6 fade-in">
          <label class="block font-semibold mb-2 text-gray-700">Welche anderen Gründe hindern dich?</label>
          <textarea
            v-model="userData.otherReasons"
            placeholder="Beschreibe kurz, was dich wirklich abhält..."
            class="w-full p-4 border-2 border-gray-200 rounded-lg min-h-24 transition-colors focus:border-primary focus:outline-none"
          ></textarea>
        </div>

        <div class="flex justify-center gap-4 mt-8">
          <BaseButton
            text="Zurück"
            variant="ghost"
            @click="previousStep"
          />
          <BaseButton
            text="Weiter"
            variant="primary"
            size="lg"
            @click="nextStep"
          />
        </div>
      </div>

      <!-- Step 6: Final -->
      <div v-show="currentStep === 6" class="card p-8 slide-up">
        <div class="text-center">
          <div class="text-6xl mb-6">🎯</div>
          <h2 class="text-3xl font-black mb-4 text-gradient-warm">Zeit für Veränderung!</h2>
          <p class="text-lg text-gray-500 mb-8 max-w-lg mx-auto leading-relaxed">
            Du hast den ersten Schritt gemacht und dich selbst reflektiert. Jetzt ist es Zeit, aus Worten Taten werden zu lassen!
          </p>
          <BaseButton
            text="🚀 Jetzt Challenge starten!"
            variant="gradient"
            size="xl"
            @click="startChallenge"
          />
        </div>

        <div class="flex justify-center mt-8">
          <BaseButton
            text="Zurück"
            variant="ghost"
            @click="previousStep"
          />
        </div>
      </div>
    </div>

    <!-- Falling Block Animation -->
    <div
      class="fixed top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-warm rounded-xl flex items-center justify-center text-white font-bold text-xl transition-all duration-1000 pointer-events-none"
      :class="{
        'opacity-0 -translate-y-48': !showFallingBlock,
        'opacity-100 translate-y-96': showFallingBlock
      }"
      style="z-index: 1000;"
    >
      HYBRID
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/base/BaseButton.vue'

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

interface Props {
  onComplete?: (data: UserData) => void
}

const props = defineProps<Props>()

const emit = defineEmits<{
  complete: [data: UserData]
  stepChange: [step: number]
}>()

const isStarted = ref(false)
const currentStep = ref(1)
const totalSteps = 6
const ageError = ref(false)
const genderError = ref(false)
const showFallingBlock = ref(false)

const userData = ref<UserData>({
  age: null,
  gender: '',
  fitness: 5,
  balance: 5,
  happiness: 5,
  pushups: 0,
  summer: '',
  followUp: '',
  barriers: [],
  otherReasons: ''
})

const steps = [
  { number: 1, text: 'Fragebogen ausfüllen' },
  { number: 2, text: 'An Verlosung teilnehmen' },
  { number: 3, text: '7 Wochen durchziehen' },
  { number: 4, text: 'Chance auf kostenlose Teilnahme und eigenes EXOPEK' }
]

const genders = [
  { value: 'männlich', label: 'Männlich' },
  { value: 'weiblich', label: 'Weiblich' },
  { value: 'divers', label: 'Divers' },
  { value: 'keine-angabe', label: 'Keine Angabe' }
]

const feelings = [
  { key: 'fitness', label: 'Wie fit fühlst du dich?' },
  { key: 'balance', label: 'Wie ausgeglichen fühlst du dich?' },
  { key: 'happiness', label: 'Wie glücklich fühlst du dich?' }
]

const barriers = [
  { value: 'zeit', label: 'Keine Zeit' },
  { value: 'motivation', label: 'Fehlende Motivation' },
  { value: 'energie', label: 'Zu wenig Energie' },
  { value: 'plan', label: 'Kein konkreter Plan' },
  { value: 'partner', label: 'Kein:e Trainingspartner:in' },
  { value: 'andere', label: 'Andere Gründe' }
]

const progressWidth = computed(() => {
  return (currentStep.value / totalSteps) * 100
})

watch(() => userData.value.age, () => {
  if (ageError.value) ageError.value = false
})

watch(() => userData.value.gender, () => {
  if (genderError.value) genderError.value = false
})

watch(currentStep, (newStep) => {
  emit('stepChange', newStep)
})

const startQuestionnaire = () => {
  isStarted.value = true
}

const nextStep = () => {
  if (currentStep.value === 1) {
    if (!userData.value.age || userData.value.age < 16 || userData.value.age > 99) {
      ageError.value = true
      setTimeout(() => ageError.value = false, 500)
      return
    }
    if (!userData.value.gender) {
      genderError.value = true
      setTimeout(() => genderError.value = false, 500)
      return
    }
  }

  if (currentStep.value < totalSteps) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const selectGender = (gender: string) => {
  userData.value.gender = gender
}

const increaseSlider = (key: keyof UserData) => {
  if (typeof userData.value[key] === 'number' && userData.value[key] < 10) {
    (userData.value[key] as number)++
  }
}

const decreaseSlider = (key: keyof UserData) => {
  if (typeof userData.value[key] === 'number' && userData.value[key] > 1) {
    (userData.value[key] as number)--
  }
}

const increasePushups = () => {
  if (userData.value.pushups < 200) {
    userData.value.pushups++
  }
}

const decreasePushups = () => {
  if (userData.value.pushups > 0) {
    userData.value.pushups--
  }
}

const selectSummer = (answer: string) => {
  userData.value.summer = answer
}

const selectFollowUp = (followUp: string) => {
  userData.value.followUp = followUp
  setTimeout(() => nextStep(), 300)
}

const toggleBarrier = (barrier: string) => {
  const index = userData.value.barriers.indexOf(barrier)
  if (index > -1) {
    userData.value.barriers.splice(index, 1)
  } else {
    userData.value.barriers.push(barrier)
  }
}

const startChallenge = () => {
  showFallingBlock.value = true

  setTimeout(() => {
    emit('complete', userData.value)
    if (props.onComplete) {
      props.onComplete(userData.value)
    }
    showFallingBlock.value = false
  }, 1000)
}
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: var(--color-primary);
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: var(--color-primary);
  cursor: pointer;
  border: none;
}
</style>