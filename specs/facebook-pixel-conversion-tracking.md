# Facebook Pixel Tracking - Implementierungsplan (Client-side)

**Datum:** 2025-01-20
**Status:** In Planung
**Ziel:** Facebook Pixel Tracking mit Pinia Store Pattern (nur Client-side)

---

## 📋 Übersicht

Client-side Facebook Pixel Implementation mit Pinia Store:
- **Store:** `useFacebookStore()` für State Management
- **Client-side:** Meta Pixel (Browser, fbq())
- **GDPR-konform:** Consent Management
- **Type-safe:** TypeScript
- **Pattern:** Wie `stores/courses.ts`

---

## 🏗️ Architektur

```
┌─────────────────────────────────────────────────────────────┐
│                     Vue Component                            │
├─────────────────────────────────────────────────────────────┤
│  const facebookStore = useFacebookStore()                    │
│  facebookStore.trackLead({ content_name: 'Kontakt' })       │
└──────────────────────────┬──────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              stores/facebook.ts (Pinia Store)                │
├─────────────────────────────────────────────────────────────┤
│  State:                                                      │
│    - hasConsent: boolean                                     │
│    - isLoading: boolean                                      │
│    - error: string | null                                    │
│    - events: TrackedEvent[]                                  │
│    - isPixelLoaded: boolean                                  │
│                                                               │
│  Actions:                                                    │
│    - trackLead(params)                                       │
│    - trackSchedule(params)                                   │
│    - trackContact(params)                                    │
│    - trackCompleteRegistration(params)                       │
│    - trackStartTrial(params)                                 │
│    - trackSubmitApplication(params)                          │
│    - trackSubscribe(params)                                  │
│    - trackViewContent(params)                                │
│    - trackSearch(params)                                     │
│    - grantConsent()                                          │
│    - revokeConsent()                                         │
│                                                               │
│  Getters:                                                    │
│    - canTrack                                                │
│    - recentEvents                                            │
│    - eventsByType(type)                                      │
└──────────────────────────┬──────────────────────────────────┘
                           ↓
                    window.fbq('track', ...)
                           ↓
                   ┌────────────────┐
                   │  Meta Servers  │
                   └────────────────┘
```

---

## 📊 Facebook Pixel Events (9 Events)

### Lead Generation (3 Events)
| Event | Verwendung | Wert-Empfehlung |
|-------|-----------|-----------------|
| `Lead` | Kontaktformular, Info-Anfrage | €50 |
| `CompleteRegistration` | Newsletter, Account-Erstellung | €10-20 |
| `Contact` | Live-Chat, Telefon-Callback | €30-40 |

### Appointments & Trial (3 Events)
| Event | Verwendung | Wert-Empfehlung |
|-------|-----------|-----------------|
| `Schedule` | Probetraining, Beratungstermin | €30-40 |
| `StartTrial` | Probeabo gestartet | €50-100 |
| `SubmitApplication` | Mitgliedschafts-Antrag | €75-100 |

### Subscription (1 Event)
| Event | Verwendung | Wert-Empfehlung |
|-------|-----------|-----------------|
| `Subscribe` | Mitgliedschaft abgeschlossen | €600-1200/Jahr |

### Engagement (2 Events)
| Event | Verwendung | Wert-Empfehlung |
|-------|-----------|-----------------|
| `ViewContent` | Kursseite, Preisseite angesehen | Optional |
| `Search` | Kurssuche verwendet | Optional |

---

## 🔧 Implementierungsplan

### Phase 1: Constants erweitern
**Datei:** `utils/constants.ts`

```typescript
// Nach ERROR_MESSAGES hinzufügen:

export const FACEBOOK_EVENTS = {
  LEAD: 'Lead',
  COMPLETE_REGISTRATION: 'CompleteRegistration',
  CONTACT: 'Contact',
  SCHEDULE: 'Schedule',
  START_TRIAL: 'StartTrial',
  SUBMIT_APPLICATION: 'SubmitApplication',
  SUBSCRIBE: 'Subscribe',
  VIEW_CONTENT: 'ViewContent',
  SEARCH: 'Search'
} as const

export const LEAD_VALUES = {
  CONTACT_FORM: 50,
  TRIAL_BOOKING: 30,
  NUTRITION_CONSULTATION: 40,
  NEWSLETTER: 10,
  LIVE_CHAT: 35,
  CALLBACK: 30,
  MEMBERSHIP_PREMIUM: 1200,
  MEMBERSHIP_STANDARD: 600
} as const

// STORAGE_KEYS erweitern:
export const STORAGE_KEYS = {
  TOKEN: 'gym_auth_token',
  USER: 'gym_user',
  FB_CONSENT: 'fb_consent'  // ← NEU
} as const
```

---

### Phase 2: TypeScript Types
**Datei:** `types/facebook.d.ts`

```typescript
// Facebook Pixel Event Types
export type FacebookPixelEvent =
  | 'Lead'
  | 'CompleteRegistration'
  | 'Contact'
  | 'Schedule'
  | 'StartTrial'
  | 'SubmitApplication'
  | 'Subscribe'
  | 'ViewContent'
  | 'Search'

// Event Parameters
export interface FacebookEventParams {
  content_name?: string
  content_category?: string
  value?: number
  currency?: string
  search_string?: string
  status?: string
  predicted_ltv?: number
}

// Tracked Event (für Store History)
export interface TrackedEvent {
  event: FacebookPixelEvent
  timestamp: Date
  params: FacebookEventParams
  success: boolean
  error?: string
}

// Window Interface Extension
declare global {
  interface Window {
    fbq?: (
      command: string,
      eventName: string,
      params?: FacebookEventParams
    ) => void
  }
}
```

---

### Phase 3: Pinia Store
**Datei:** `stores/facebook.ts`

```typescript
import { defineStore } from 'pinia'
import { FACEBOOK_EVENTS, STORAGE_KEYS } from '~/utils/constants'
import type {
  FacebookPixelEvent,
  FacebookEventParams,
  TrackedEvent
} from '~/types/facebook'

export const useFacebookStore = defineStore('facebook', {
  state: () => ({
    hasConsent: false,
    isLoading: false,
    error: null as string | null,
    events: [] as TrackedEvent[],
    isPixelLoaded: false
  }),

  getters: {
    // Kann getrackt werden?
    canTrack: (state) => state.hasConsent && state.isPixelLoaded,

    // Events nach Typ filtern
    eventsByType: (state) => (eventType: FacebookPixelEvent) => {
      return state.events.filter(e => e.event === eventType)
    },

    // Letzte 10 Events
    recentEvents: (state) => {
      return state.events
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 10)
    },

    // Anzahl erfolgreicher Events
    successfulEventsCount: (state) => {
      return state.events.filter(e => e.success).length
    }
  },

  actions: {
    // Consent aus localStorage laden
    initConsent() {
      const stored = localStorage.getItem(STORAGE_KEYS.FB_CONSENT)
      this.hasConsent = stored === 'true'

      if (this.hasConsent && window.fbq) {
        window.fbq('consent', 'grant')
      }
    },

    // Consent gewähren
    grantConsent() {
      this.hasConsent = true
      localStorage.setItem(STORAGE_KEYS.FB_CONSENT, 'true')

      if (window.fbq) {
        window.fbq('consent', 'grant')
      }
    },

    // Consent widerrufen
    revokeConsent() {
      this.hasConsent = false
      localStorage.setItem(STORAGE_KEYS.FB_CONSENT, 'false')

      if (window.fbq) {
        window.fbq('consent', 'revoke')
      }
    },

    // Pixel Loaded Status setzen
    setPixelLoaded(loaded: boolean) {
      this.isPixelLoaded = loaded
    },

    // Event tracken (generische Methode)
    trackEvent(
      event: FacebookPixelEvent,
      params: FacebookEventParams = {}
    ): { success: boolean; error?: string } {
      // Consent Check
      if (!this.canTrack) {
        console.warn('Facebook tracking blocked: No consent or pixel not loaded')
        return { success: false, error: 'No consent' }
      }

      try {
        this.isLoading = true
        this.error = null

        // Facebook Pixel aufrufen
        if (window.fbq) {
          window.fbq('track', event, params)
        } else {
          throw new Error('Facebook Pixel not loaded')
        }

        // Event in History speichern
        const trackedEvent: TrackedEvent = {
          event,
          timestamp: new Date(),
          params,
          success: true
        }

        this.events.push(trackedEvent)

        // History auf 100 Items limitieren
        if (this.events.length > 100) {
          this.events = this.events.slice(-100)
        }

        return { success: true }
      } catch (error: any) {
        console.error('Facebook tracking error:', error)
        this.error = error?.message || 'Tracking failed'

        // Fehler in History
        const trackedEvent: TrackedEvent = {
          event,
          timestamp: new Date(),
          params,
          success: false,
          error: this.error
        }
        this.events.push(trackedEvent)

        return {
          success: false,
          error: this.error
        }
      } finally {
        this.isLoading = false
      }
    },

    // Lead Event
    trackLead(params: FacebookEventParams = {}) {
      return this.trackEvent(FACEBOOK_EVENTS.LEAD, params)
    },

    // Schedule Event
    trackSchedule(params: FacebookEventParams = {}) {
      return this.trackEvent(FACEBOOK_EVENTS.SCHEDULE, params)
    },

    // Contact Event
    trackContact(params: FacebookEventParams = {}) {
      return this.trackEvent(FACEBOOK_EVENTS.CONTACT, params)
    },

    // Complete Registration Event
    trackCompleteRegistration(params: FacebookEventParams = {}) {
      return this.trackEvent(FACEBOOK_EVENTS.COMPLETE_REGISTRATION, params)
    },

    // Start Trial Event
    trackStartTrial(params: FacebookEventParams = {}) {
      return this.trackEvent(FACEBOOK_EVENTS.START_TRIAL, params)
    },

    // Submit Application Event
    trackSubmitApplication(params: FacebookEventParams = {}) {
      return this.trackEvent(FACEBOOK_EVENTS.SUBMIT_APPLICATION, params)
    },

    // Subscribe Event
    trackSubscribe(params: FacebookEventParams = {}) {
      return this.trackEvent(FACEBOOK_EVENTS.SUBSCRIBE, params)
    },

    // View Content Event
    trackViewContent(params: FacebookEventParams = {}) {
      return this.trackEvent(FACEBOOK_EVENTS.VIEW_CONTENT, params)
    },

    // Search Event
    trackSearch(params: FacebookEventParams = {}) {
      return this.trackEvent(FACEBOOK_EVENTS.SEARCH, params)
    },

    // Error löschen
    clearError() {
      this.error = null
    },

    // Event History löschen
    clearEventHistory() {
      this.events = []
    }
  }
})
```

---

### Phase 4: Client Plugin
**Datei:** `plugins/facebook-pixel.client.ts`

```typescript
export default defineNuxtPlugin(() => {
  const facebookStore = useFacebookStore()

  // Check if fbq is loaded
  if (typeof window !== 'undefined') {
    // Wait for fbq to be available
    const checkFbq = setInterval(() => {
      if (window.fbq) {
        facebookStore.setPixelLoaded(true)
        facebookStore.initConsent()
        clearInterval(checkFbq)
        console.log('Facebook Pixel loaded')
      }
    }, 100)

    // Timeout after 5 seconds
    setTimeout(() => {
      clearInterval(checkFbq)
      if (!window.fbq) {
        console.warn('Facebook Pixel not loaded after 5 seconds')
      }
    }, 5000)
  }
})
```

---

## 🎨 Verwendung in Komponenten

### Beispiel 1: Kontaktformular (Lead)

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.name" placeholder="Name" required />
    <input v-model="form.email" type="email" placeholder="Email" required />
    <textarea v-model="form.message" placeholder="Nachricht" required />

    <button
      type="submit"
      :disabled="facebookStore.isLoading"
    >
      {{ facebookStore.isLoading ? 'Wird gesendet...' : 'Absenden' }}
    </button>

    <p v-if="facebookStore.error" class="error">
      {{ facebookStore.error }}
    </p>
  </form>
</template>

<script setup lang="ts">
import { LEAD_VALUES } from '~/utils/constants'

const facebookStore = useFacebookStore()

const form = ref({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = async () => {
  // Lead Event tracken
  facebookStore.trackLead({
    content_name: 'Kontaktformular',
    value: LEAD_VALUES.CONTACT_FORM,
    currency: 'EUR'
  })

  // Formular absenden
  await submitContactForm(form.value)

  // Success Handling
  form.value = { name: '', email: '', message: '' }
}
</script>
```

### Beispiel 2: Probetraining buchen (Schedule)

```vue
<template>
  <div class="trial-booking">
    <h2>Kostenloses Probetraining</h2>
    <p>Teste unser Studio unverbindlich!</p>

    <button @click="handleBookTrial">
      Jetzt buchen
    </button>
  </div>
</template>

<script setup lang="ts">
import { LEAD_VALUES } from '~/utils/constants'

const facebookStore = useFacebookStore()

const handleBookTrial = async () => {
  // Schedule Event tracken
  facebookStore.trackSchedule({
    content_name: 'Probetraining',
    value: LEAD_VALUES.TRIAL_BOOKING,
    currency: 'EUR'
  })

  // Zur Buchungsseite navigieren
  await navigateTo('/booking/trial')
}
</script>
```

### Beispiel 3: Newsletter Anmeldung (CompleteRegistration)

```vue
<template>
  <form @submit.prevent="handleSignup" class="newsletter-form">
    <input
      v-model="email"
      type="email"
      placeholder="Email-Adresse"
      required
    />
    <button type="submit">Newsletter abonnieren</button>
  </form>
</template>

<script setup lang="ts">
import { LEAD_VALUES } from '~/utils/constants'

const facebookStore = useFacebookStore()
const email = ref('')

const handleSignup = async () => {
  // CompleteRegistration Event tracken
  facebookStore.trackCompleteRegistration({
    content_name: 'Newsletter',
    value: LEAD_VALUES.NEWSLETTER,
    currency: 'EUR',
    status: 'subscribed'
  })

  // Newsletter-Anmeldung
  await subscribeToNewsletter(email.value)

  email.value = ''
}
</script>
```

### Beispiel 4: Kursseite angesehen (ViewContent)

```vue
<template>
  <div class="course-detail">
    <h1>{{ course.name }}</h1>
    <p>{{ course.description }}</p>
    <p class="price">{{ course.price }}€</p>
  </div>
</template>

<script setup lang="ts">
const facebookStore = useFacebookStore()

const props = defineProps<{
  course: {
    name: string
    description: string
    price: number
    category: string
  }
}>()

// ViewContent beim Laden der Seite tracken
onMounted(() => {
  facebookStore.trackViewContent({
    content_name: props.course.name,
    content_category: props.course.category,
    value: props.course.price,
    currency: 'EUR'
  })
})
</script>
```

### Beispiel 5: Mitgliedschaft buchen (Subscribe)

```vue
<template>
  <div class="membership-card">
    <h3>Premium Mitgliedschaft</h3>
    <p class="price">€49.99 / Monat</p>

    <ul>
      <li>Alle Kurse inklusive</li>
      <li>24/7 Zugang</li>
      <li>Personal Training</li>
    </ul>

    <button @click="handleSubscribe">
      Mitglied werden
    </button>
  </div>
</template>

<script setup lang="ts">
import { LEAD_VALUES } from '~/utils/constants'

const facebookStore = useFacebookStore()

const handleSubscribe = async () => {
  // Subscribe Event tracken
  facebookStore.trackSubscribe({
    value: LEAD_VALUES.MEMBERSHIP_PREMIUM,
    currency: 'EUR',
    predicted_ltv: LEAD_VALUES.MEMBERSHIP_PREMIUM * 12 // Jahreswert
  })

  // Zur Checkout-Seite
  await navigateTo('/membership/checkout')
}
</script>
```

### Beispiel 6: ConsentBanner Integration

```vue
<!-- components/design-system-section-components/ConsentBanner.vue -->
<template>
  <div v-if="!hasAccepted" class="consent-banner">
    <p>Wir verwenden Cookies und Tracking-Tools...</p>

    <div class="actions">
      <button @click="handleAcceptAll">Alle akzeptieren</button>
      <button @click="handleRejectAll">Ablehnen</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const facebookStore = useFacebookStore()
const hasAccepted = ref(false)

const handleAcceptAll = () => {
  // Facebook Consent gewähren
  facebookStore.grantConsent()

  // Andere Consent-Logik...
  hasAccepted.value = true
}

const handleRejectAll = () => {
  // Facebook Consent widerrufen
  facebookStore.revokeConsent()

  // Andere Consent-Logik...
  hasAccepted.value = true
}

// Consent Status beim Mount prüfen
onMounted(() => {
  hasAccepted.value = facebookStore.hasConsent
})
</script>
```

### Beispiel 7: Event History anzeigen (Debug/Admin)

```vue
<template>
  <div class="event-history">
    <h3>Facebook Pixel Events (letzte 10)</h3>

    <div class="stats">
      <p>Erfolgreich: {{ facebookStore.successfulEventsCount }}</p>
      <p>Gesamt: {{ facebookStore.events.length }}</p>
    </div>

    <ul>
      <li v-for="event in facebookStore.recentEvents" :key="event.timestamp.getTime()">
        <strong>{{ event.event }}</strong>
        <span>{{ event.params.content_name }}</span>
        <span :class="{ error: !event.success }">
          {{ event.success ? '✓' : '✗' }}
        </span>
        <small>{{ event.timestamp.toLocaleTimeString() }}</small>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const facebookStore = useFacebookStore()
</script>
```

---

## 📁 Dateistruktur

```
stores/
  facebook.ts                      ← NEU: Pinia Store
  courses.ts                       ← Bestehendes Pattern
  bookings.ts
  auth.ts
  admin.ts

types/
  facebook.d.ts                    ← NEU: Type Definitions

plugins/
  facebook-pixel.client.ts         ← NEU: Plugin für fbq()

utils/
  constants.ts                     ← ERWEITERN: Facebook Constants

pages/index.vue                    ← Facebook Pixel Script (Builder.io)
```

---

## ✅ Testing-Checkliste

### Setup
- [ ] Facebook Pixel Script in Builder.io konfiguriert
- [ ] `facebookPixelScript` Feld in Builder.io ausgefüllt
- [ ] `facebookPixelNoScript` Feld in Builder.io ausgefüllt

### Store
- [ ] Store wird korrekt initialisiert
- [ ] `hasConsent` wird aus localStorage geladen
- [ ] `trackLead()` funktioniert
- [ ] `trackSchedule()` funktioniert
- [ ] Event History wird gespeichert
- [ ] Getters liefern korrekte Daten

### Plugin
- [ ] Plugin initialisiert Store
- [ ] `isPixelLoaded` wird auf `true` gesetzt
- [ ] Timeout funktioniert (5 Sekunden)
- [ ] Console Log erscheint

### Client-side Tracking
- [ ] `window.fbq` ist verfügbar
- [ ] Events werden getrackt
- [ ] Meta Pixel Helper zeigt Events
- [ ] Parameter sind korrekt

### GDPR Compliance
- [ ] Consent Banner Integration funktioniert
- [ ] `grantConsent()` aktiviert Tracking
- [ ] `revokeConsent()` stoppt Tracking
- [ ] localStorage speichert Status
- [ ] `fbq('consent', 'grant/revoke')` wird aufgerufen

### Meta Pixel Helper (Browser Extension)
- [ ] PageView Event wird automatisch getrackt
- [ ] Standard Events erscheinen
- [ ] Parameter sind vollständig
- [ ] Keine Fehler in Console

---

## 🎯 Event-Priorisierung

### Priorität 1: Must-Have
| Event | Store Method | Verwendung | Wert |
|-------|-------------|-----------|------|
| Lead | `trackLead()` | Kontaktformular | €50 |
| Schedule | `trackSchedule()` | Probetraining | €30 |
| Subscribe | `trackSubscribe()` | Mitgliedschaft | €600+ |

### Priorität 2: Should-Have
| Event | Store Method | Verwendung | Wert |
|-------|-------------|-----------|------|
| CompleteRegistration | `trackCompleteRegistration()` | Newsletter | €10 |
| Contact | `trackContact()` | Live-Chat | €35 |
| StartTrial | `trackStartTrial()` | Probeabo | €75 |

### Priorität 3: Nice-to-Have
| Event | Store Method | Verwendung | Wert |
|-------|-------------|-----------|------|
| ViewContent | `trackViewContent()` | Seiten | - |
| Search | `trackSearch()` | Suche | - |
| SubmitApplication | `trackSubmitApplication()` | Bewerbung | €50 |

---

## 🔄 Rollout-Plan

### Woche 1: Foundation (3 Tage)
**Tag 1:**
- [ ] `utils/constants.ts` erweitern
- [ ] `types/facebook.d.ts` erstellen

**Tag 2:**
- [ ] `stores/facebook.ts` implementieren
- [ ] `plugins/facebook-pixel.client.ts` erstellen

**Tag 3:**
- [ ] Testing mit Meta Pixel Helper
- [ ] Event History testen
- [ ] Consent Management testen

### Woche 2: Integration (4 Tage)
**Tag 1:**
- [ ] Kontaktformular (Lead)
- [ ] Probetraining (Schedule)

**Tag 2:**
- [ ] Newsletter (CompleteRegistration)
- [ ] ConsentBanner Integration

**Tag 3:**
- [ ] Mitgliedschaft (Subscribe)
- [ ] Kursseiten (ViewContent)

**Tag 4:**
- [ ] Testing aller Komponenten
- [ ] Cross-Browser Testing

### Woche 3: Deployment (2 Tage)
**Tag 1:**
- [ ] Final Testing
- [ ] Staging Deployment

**Tag 2:**
- [ ] Production Deployment
- [ ] Events Manager Monitoring

---

## 💡 Best Practices

### 1. Store Pattern nutzen
```typescript
// ✅ RICHTIG: Store verwenden
const facebookStore = useFacebookStore()
facebookStore.trackLead({ content_name: 'Kontakt' })

// ❌ FALSCH: Direkt fbq() aufrufen
window.fbq('track', 'Lead', { content_name: 'Kontakt' })
```

### 2. Consent immer prüfen
```typescript
// Store prüft automatisch
facebookStore.trackLead({...}) // ← Prüft hasConsent intern

// canTrack Getter nutzen
if (facebookStore.canTrack) {
  // Tracking ist erlaubt
}
```

### 3. Loading State nutzen
```vue
<button :disabled="facebookStore.isLoading">
  {{ facebookStore.isLoading ? 'Lädt...' : 'Absenden' }}
</button>
```

### 4. Wert-Parameter verwenden
```typescript
import { LEAD_VALUES } from '~/utils/constants'

// ✅ RICHTIG: Konstante verwenden
facebookStore.trackLead({
  value: LEAD_VALUES.CONTACT_FORM,
  currency: 'EUR'
})

// ❌ FALSCH: Hardcoded Werte
facebookStore.trackLead({
  value: 50,
  currency: 'EUR'
})
```

### 5. Event History nutzen (für Debugging)
```typescript
// Letzte Events
const recent = facebookStore.recentEvents

// Events nach Typ
const leadEvents = facebookStore.eventsByType('Lead')

// Erfolgsrate
const rate = facebookStore.successfulEventsCount / facebookStore.events.length
```

---

## 📚 Ressourcen

### Offizielle Dokumentation
- **Meta Pixel:** https://developers.facebook.com/docs/meta-pixel
- **Standard Events:** https://www.facebook.com/business/help/402791146561655
- **Consent Mode:** https://developers.facebook.com/docs/meta-pixel/implementation/gdpr

### Tools
- **Meta Pixel Helper:** Chrome/Firefox Extension
- **Events Manager:** https://business.facebook.com/events_manager

### Pinia & Nuxt
- **Pinia Docs:** https://pinia.vuejs.org
- **Nuxt Pinia:** https://nuxt.com/modules/pinia
- **Nuxt Plugins:** https://nuxt.com/docs/guide/directory-structure/plugins

---

## 🔜 Nächste Schritte

1. ✅ **Bestätigung:** Implementation starten
2. 📝 **Constants:** `utils/constants.ts` erweitern
3. 🎯 **Types:** `types/facebook.d.ts` erstellen
4. 🏪 **Store:** `stores/facebook.ts` implementieren
5. 🔌 **Plugin:** `plugins/facebook-pixel.client.ts` erstellen
6. 🧪 **Test:** Meta Pixel Helper verifizieren
7. 🔗 **Integration:** Komponenten anbinden
8. ✅ **Verify:** Events Manager prüfen
9. 🚀 **Deploy:** Production Rollout

---

## 📝 Später (Optional)

Diese Features können später hinzugefügt werden:

- **Conversion API:** Server-side Tracking für höhere Genauigkeit
- **Event Deduplication:** Verhindert doppeltes Zählen (Client + Server)
- **Advanced Matching:** Email/Name hashing für bessere Attribution
- **Custom Events:** Eigene Event-Namen definieren

---

**Erstellt:** 2025-01-20
**Autor:** Claude Code
**Version:** 4.0 (Client-side only, Store Pattern)
**Architecture:** Pinia Store (wie `stores/courses.ts`)
**Events:** 9 relevante Events für Gym-Business
**Tracking:** Client-side nur (Meta Pixel via fbq())
**Complexity:** ⭐⭐ (einfach, überschaubar)
