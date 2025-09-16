<template>
  <div v-if="showFunnel" class="funnel-overlay" @click.self="closeFunnel">
    <div class="contract-form-wrapper">
      <!-- Progress Bar -->
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
        </div>
        <div class="step-indicators">
          <div
            v-for="i in 4"
            :key="i"
            class="step-dot"
            :class="{ active: i <= currentStep, current: i === currentStep }"
          >
            {{ i }}
          </div>
        </div>
      </div>

      <!-- Step 1: Goals Selection -->
      <div v-if="currentStep === 1" class="form-step">
        <div class="glass-card">
          <div class="step-header">
            <h2 class="step-title">Was sind Deine Ziele?</h2>
            <p class="step-subtitle">Wähle alle zutreffenden Optionen aus</p>
          </div>

          <div class="goals-grid">
            <label
              v-for="goal in goals"
              :key="goal.id"
              class="goal-checkbox"
              :class="{ selected: selectedGoals.includes(goal.id) }"
              @click="toggleGoal(goal.id)"
            >
              <div class="checkbox-content">
                <div class="checkbox-icon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="goal-text">{{ goal.text }}</span>
              </div>
            </label>
          </div>

          <button
            class="next-button"
            :disabled="selectedGoals.length === 0"
            @click="goToStep(2)"
          >
            Weiter
          </button>
        </div>
      </div>

      <!-- Step 2: Contract Recommendation -->
      <div v-if="currentStep === 2" class="form-step">
        <div class="glass-card">
          <div class="step-header">
            <h2 class="step-title">Deine perfekte Mitgliedschaft</h2>
            <p class="step-subtitle">Basierend auf Deinen Zielen empfehlen wir:</p>
          </div>

          <div class="contract-recommendation">
            <div class="contract-card">
              <div class="contract-badge">{{ recommendedContract.badge }}</div>
              <h3 class="contract-name">{{ recommendedContract.name }}</h3>
              <div class="contract-price">
                <span class="price">{{ recommendedContract.price }}</span>
                <span class="period">/Woche</span>
              </div>
              <div class="contract-monthly">Monatliche Abbuchung {{ recommendedContract.monthly }}</div>
              
              <div class="contract-features">
                <div v-for="feature in recommendedContract.features" :key="feature" class="feature-item">
                  <svg class="check-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>{{ feature }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="trial-section">
            <h3 class="trial-title">Wann möchtest Du ins Studio zum Probetraining kommen?</h3>
            <div class="time-slots">
              <button
                v-for="slot in timeSlots"
                :key="slot.id"
                class="time-slot"
                :class="{ selected: selectedTimeSlot === slot.id }"
                @click="selectTimeSlot(slot.id)"
              >
                <div class="slot-day">{{ slot.day }}</div>
                <div class="slot-time">{{ slot.time }}</div>
              </button>
            </div>
          </div>

          <div class="step-actions">
            <button class="back-button" @click="goToStep(1)">Zurück</button>
            <button
              class="next-button"
              :disabled="!selectedTimeSlot"
              @click="goToStep(3)"
            >
              Weiter
            </button>
          </div>
        </div>
      </div>

      <!-- Step 3: Contact Information -->
      <div v-if="currentStep === 3" class="form-step">
        <div class="glass-card">
          <div class="step-header">
            <h2 class="step-title">Kontaktdaten</h2>
            <p class="step-subtitle">Damit wir Dich kontaktieren können</p>
          </div>

          <div class="contact-form">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                id="name"
                v-model="contactData.name"
                type="text"
                placeholder="Dein vollständiger Name"
                class="form-input"
              >
            </div>
            <div class="form-group">
              <label for="email">E-Mail</label>
              <input
                id="email"
                v-model="contactData.email"
                type="email"
                placeholder="deine@email.de"
                class="form-input"
              >
            </div>
            <div class="form-group">
              <label for="phone">Handynummer</label>
              <input
                id="phone"
                v-model="contactData.phone"
                type="tel"
                placeholder="+49 123 456 789"
                class="form-input"
              >
            </div>
          </div>

          <div class="step-actions">
            <button class="back-button" @click="goToStep(2)">Zurück</button>
            <button
              class="next-button"
              :disabled="!isContactFormValid"
              @click="submitForm"
            >
              Abschließen
            </button>
          </div>
        </div>
      </div>

      <!-- Step 4: Thank You -->
      <div v-if="currentStep === 4" class="form-step">
        <div class="glass-card thank-you-card">
          <div class="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h2 class="thank-you-title">Vielen Dank!</h2>
          <p class="thank-you-message">
            Wir freuen uns auf Dich im EXOPEK Gym.<br>
            Du erhältst in Kürze eine Bestätigung per E-Mail.
          </p>
          <button class="next-button" @click="closeFunnel">Schließen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Goal {
  id: string
  text: string
}

interface TimeSlot {
  id: string
  day: string
  time: string
}

interface Contract {
  name: string
  badge: string
  price: string
  monthly: string
  features: string[]
}

interface ContactData {
  name: string
  email: string
  phone: string
}

const props = defineProps<{
  show?: boolean
}>()

const emit = defineEmits<{
  close: []
  submit: [data: {
    goals: string[]
    contract: Contract
    timeSlot: string
    contact: ContactData
  }]
}>()

const showFunnel = ref(props.show || false)
const currentStep = ref(1)
const selectedGoals = ref<string[]>([])
const selectedTimeSlot = ref<string | null>(null)
const contactData = ref<ContactData>({
  name: '',
  email: '',
  phone: ''
})

const goals: Goal[] = [
  { id: 'regular-training', text: 'Regelmäßig trainieren' },
  { id: 'personal-training', text: 'Personal Trainings' },
  { id: 'get-fit', text: 'Meine Fitness verbessern & mehr Energie haben' },
  { id: 'track-success', text: 'Erfolg tracken' },
  { id: 'home-training', text: 'An stressigen Tagen zu Hause trainieren können' },
  { id: 'travel-training', text: 'Auf Reisen trainiert werden können' },
  { id: 'nutrition', text: 'Ernährungstipps' },
  { id: 'stress-management', text: 'Stress Management' },
  { id: 'ems', text: 'EMS' },
  { id: 'full-coaching', text: 'Ich möchte in vollem Umfang gecoacht werden' }
]

const timeSlots: TimeSlot[] = [
  { id: '1', day: 'Montag', time: '18:00 - 19:00' },
  { id: '2', day: 'Dienstag', time: '19:00 - 20:00' },
  { id: '3', day: 'Mittwoch', time: '18:00 - 19:00' }
]

const contracts: Record<string, Contract> = {
  core: {
    name: 'CORE',
    badge: 'FÜR EINSTEIGER',
    price: '16€',
    monthly: '69€',
    features: [
      'Teilnahme an allen regulären Gruppenkursen',
      'Persönliche Trainingsberatung',
      'Ausgewählte Tipps und Workouts in der App'
    ]
  },
  hybrid: {
    name: 'HYBRID PRO',
    badge: 'BELIEBT',
    price: '25€',
    monthly: '109€',
    features: [
      'Alles aus Core',
      'Onboarding und Screenings',
      'Open Gym Nutzung',
      'Hybrides Training',
      '1 Personal Training im Quartal',
      'Ernährungstipps, Resilienztraining und mehr'
    ]
  },
  performer: {
    name: 'HIGH PERFORMER',
    badge: 'STARK BEGRENZT',
    price: '135€',
    monthly: '585€',
    features: [
      'Alles aus Hybrid Pro',
      '1 Personal Training die Woche',
      'Persönliche Ernährungsberatung inkl. Supplements',
      '1 EMS Training im Monat',
      '1 HRV Messung pro Monat',
      '1 Resilienzcoaching im Monat'
    ]
  }
}

const progressPercentage = computed(() => (currentStep.value / 4) * 100)

const recommendedContract = computed(() => {
  if (selectedGoals.value.includes('ems') || selectedGoals.value.includes('full-coaching')) {
    return contracts.performer
  }
  
  const coreGoals = ['regular-training', 'get-fit']
  const hasOnlyCoreGoals = selectedGoals.value.every(goal => coreGoals.includes(goal))
  const hasAnyCoreGoal = selectedGoals.value.some(goal => coreGoals.includes(goal))
  
  if (hasOnlyCoreGoals || (hasAnyCoreGoal && selectedGoals.value.length <= 2)) {
    return contracts.core
  }
  
  return contracts.hybrid
})

const isContactFormValid = computed(() => {
  return contactData.value.name && 
         contactData.value.email && 
         contactData.value.phone && 
         contactData.value.email.includes('@')
})

function toggleGoal(goalId: string) {
  const index = selectedGoals.value.indexOf(goalId)
  if (index > -1) {
    selectedGoals.value.splice(index, 1)
  } else {
    selectedGoals.value.push(goalId)
  }
}

function selectTimeSlot(slotId: string) {
  selectedTimeSlot.value = slotId
}

function goToStep(step: number) {
  currentStep.value = step
}

function submitForm() {
  const formData = {
    goals: selectedGoals.value,
    contract: recommendedContract.value,
    timeSlot: selectedTimeSlot.value!,
    contact: contactData.value
  }
  
  emit('submit', formData)
  goToStep(4)
}

function closeFunnel() {
  showFunnel.value = false
  emit('close')
}

function openFunnel() {
  showFunnel.value = true
  currentStep.value = 1
  selectedGoals.value = []
  selectedTimeSlot.value = null
  contactData.value = { name: '', email: '', phone: '' }
}

defineExpose({
  openFunnel
})
</script>

<style scoped>
.funnel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 9999;
  overflow-y: auto;
  padding: 2rem;
}

.contract-form-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.progress-container {
  margin-bottom: 3rem;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.step-indicators {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  max-width: 200px;
  margin-left: auto;
  margin-right: auto;
}

.step-dot {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.step-dot.active {
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 20px rgba(255, 107, 53, 0.3);
}

.step-dot.current {
  transform: scale(1.1);
}

.glass-card {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.step-header {
  text-align: center;
  margin-bottom: 3rem;
}

.step-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.step-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
}

.goals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;
}

.goal-checkbox {
  cursor: pointer;
  transition: all 0.3s ease;
}

.goal-checkbox.selected .checkbox-content {
  background: rgba(255, 107, 53, 0.1);
  border-color: #ff6b35;
}

.goal-checkbox.selected .checkbox-icon {
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  color: white;
}

.goal-checkbox.selected .checkbox-icon svg {
  display: block;
}

.checkbox-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.checkbox-content:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 107, 53, 0.3);
}

.checkbox-icon {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.checkbox-icon svg {
  width: 16px;
  height: 16px;
  display: none;
}

.goal-text {
  color: white;
  font-weight: 500;
  flex: 1;
}

.contract-recommendation {
  margin-bottom: 3rem;
}

.contract-card {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 107, 53, 0.5);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(255, 107, 53, 0.2);
}

.contract-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.contract-name {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.contract-price {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.price {
  font-size: 3rem;
  font-weight: 700;
  color: #ff6b35;
}

.period {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
}

.contract-monthly {
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2rem;
}

.contract-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
}

.check-icon {
  width: 20px;
  height: 20px;
  color: #4CAF50;
  flex-shrink: 0;
}

.trial-section {
  margin-bottom: 3rem;
}

.trial-title {
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1.5rem;
  text-align: center;
}

.time-slots {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.time-slot {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
}

.time-slot:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 107, 53, 0.3);
}

.time-slot.selected {
  background: rgba(255, 107, 53, 0.1);
  border-color: #ff6b35;
}

.slot-day {
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
}

.slot-time {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.contact-form {
  margin-bottom: 3rem;
}

.form-group {
  margin-bottom: 2rem;
}

.form-group label {
  display: block;
  color: white;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-input:focus {
  outline: none;
  border-color: #ff6b35;
  background: rgba(255, 255, 255, 0.08);
}

.step-actions {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.next-button, .back-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.next-button {
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  color: white;
  flex: 1;
  max-width: 200px;
  margin-left: auto;
}

.next-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
}

.next-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.back-button {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.15);
}

.thank-you-card {
  text-align: center;
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  color: #4CAF50;
}

.success-icon svg {
  width: 100%;
  height: 100%;
}

.thank-you-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.thank-you-message {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .funnel-overlay {
    padding: 1rem;
  }
  
  .contract-form-wrapper {
    padding: 1rem;
  }
  
  .glass-card {
    padding: 2rem;
  }
  
  .step-title {
    font-size: 2rem;
  }
  
  .goals-grid {
    grid-template-columns: 1fr;
  }
  
  .time-slots {
    grid-template-columns: 1fr;
  }
  
  .step-actions {
    flex-direction: column;
  }
  
  .next-button {
    max-width: none;
    margin-left: 0;
  }
}
</style>