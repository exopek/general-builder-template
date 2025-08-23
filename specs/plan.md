# Plan: Gym-Website mit externem Backend & Store Pattern

## 🏗️ Technische Architektur
- **Frontend**: Nuxt.js 3 + TypeScript
- **State Management**: Pinia Stores für API-Kommunikation
- **Styling**: Tailwind CSS + bestehende global.css
- **Backend**: Externe API-Endpunkte
- **Components**: Modulare Vue-Komponenten

## 📡 API Endpunkte definieren

### Authentication
- `POST /api/auth/login` - Benutzer-Login
- `POST /api/auth/register` - Registrierung
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Aktueller Benutzer

### Kurse
- `GET /api/courses` - Alle Kurse abrufen
- `GET /api/courses/:id` - Einzelner Kurs
- `POST /api/courses` - Kurs erstellen (Admin)
- `PUT /api/courses/:id` - Kurs bearbeiten (Admin)
- `DELETE /api/courses/:id` - Kurs löschen (Admin)

### Buchungen
- `GET /api/bookings` - Meine Buchungen
- `POST /api/bookings` - Neue Buchung
- `DELETE /api/bookings/:id` - Buchung stornieren
- `GET /api/courses/:id/bookings` - Teilnehmer eines Kurses (Admin)

## 🗂️ Pinia Stores

### 1. `stores/auth.ts`
- Login/Logout Funktionen
- User State Management
- JWT Token Handling
- Permission Checks

### 2. `stores/courses.ts`  
- Kurse laden und cachen
- Kurs-CRUD Operationen
- Filter und Suche
- Verfügbarkeits-Check

### 3. `stores/bookings.ts`
- Buchungen verwalten
- Booking-Validierung
- Stornierungen
- Buchungshistorie

### 4. `stores/admin.ts`
- Admin-spezifische Funktionen
- Teilnehmerlisten
- Kurs-Management
- Dashboard-Daten

## 🎨 Vue Komponenten Struktur

### Booking Components (`components/booking/`)
- `CourseCard.vue` - Kursanzeige mit Buchungsbutton
- `BookingModal.vue` - Buchungsformular Modal
- `BookingsList.vue` - Liste der eigenen Buchungen
- `CourseCalendar.vue` - Kalenderansicht der Kurse

### Admin Components (`components/admin/`)
- `AdminDashboard.vue` - Übersichts-Dashboard
- `CourseManager.vue` - Kurs-Verwaltung
- `CourseForm.vue` - Kurs erstellen/bearbeiten
- `ParticipantsList.vue` - Teilnehmerliste
- `BookingOverview.vue` - Buchungsübersicht

### User Components (`components/user/`)
- `UserDashboard.vue` - User Dashboard Übersicht
- `MyCoursesList.vue` - Liste angemeldeter Kurse
- `UserProfile.vue` - Profil-Einstellungen
- `BookingHistory.vue` - Buchungshistorie

### UI Components (`components/ui/`)
- `LoadingSpinner.vue` - Loading States
- `ErrorMessage.vue` - Fehler-Anzeige
- `SuccessToast.vue` - Success Notifications
- `ConfirmModal.vue` - Bestätigungsdialoge
- `Navigation.vue` - Role-based Navigation

## 📄 Pages Struktur

### Public Pages
- `pages/courses/index.vue` - Öffentliche Kursübersicht
- `pages/courses/[id].vue` - Kurs-Detail
- `pages/auth/login.vue` - Login-Seite
- `pages/auth/register.vue` - Registrierung

### User Pages
- `pages/user/index.vue` - User Dashboard
- `pages/user/my-courses.vue` - Angemeldete Kurse detailliert
- `pages/user/bookings.vue` - Buchungshistorie
- `pages/user/profile.vue` - Profil-Einstellungen

### Admin Pages  
- `pages/admin/index.vue` - Admin Dashboard
- `pages/admin/courses.vue` - Kurs-Management
- `pages/admin/bookings.vue` - Buchungsübersicht
- `pages/admin/participants.vue` - Teilnehmer-Management

## 🛠️ Utilities & Composables

### `composables/useApi.ts`
- Axios/Fetch Wrapper
- Error Handling
- Loading States
- Token Management

### `composables/useAuth.ts`
- Authentication Helpers
- Role Checks
- Route Guards
- Role-based Redirects

### `middleware/user.ts`
- User Route Guard
- User-spezifische Authentifizierung

### `middleware/admin.ts`
- Admin Route Guard
- Admin-spezifische Authentifizierung

### `utils/constants.ts`
- API Endpoints
- Error Messages
- App Constants

## 🎯 Implementation Plan

### Phase 1: Foundation
- [ ] **Pinia Store Setup**
  - [ ] Erstelle `stores/auth.ts` mit User State, Login/Logout Actions
  - [ ] Erstelle `stores/courses.ts` mit Kurs-Management und Caching
  - [ ] Erstelle `stores/bookings.ts` mit Buchungslogik
  - [ ] Erstelle `stores/admin.ts` mit Admin-spezifischen Funktionen
  
- [ ] **API Service Layer**
  - [ ] Erstelle `composables/useApi.ts` mit Axios/Fetch Wrapper
  - [ ] Implementiere Error Handling und Loading States
  - [ ] Setup JWT Token Management
  - [ ] Definiere API-Endpunkte in `utils/constants.ts`
  
- [ ] **Authentication System**
  - [ ] Erstelle `composables/useAuth.ts` mit Authentication Helpers
  - [ ] Implementiere Role-based Access Control
  - [ ] Erstelle `middleware/user.ts` für User Route Guard
  - [ ] Erstelle `middleware/admin.ts` für Admin Route Guard
  - [ ] Setup Role-based Redirects nach Login
  - [ ] Erstelle Login/Register Pages (`pages/auth/`)

### Phase 2: User Area & Booking System
- [ ] **Course Display Components**
  - [ ] Erstelle `components/booking/CourseCard.vue` mit Buchungsbutton
  - [ ] Implementiere `components/booking/CourseCalendar.vue` für Kalenderansicht
  - [ ] Erstelle `pages/courses/index.vue` für öffentliche Kursübersicht
  - [ ] Erstelle `pages/courses/[id].vue` für Kurs-Details
  
- [ ] **User Area Setup**
  - [ ] Erstelle `pages/user/index.vue` - User Dashboard
  - [ ] Erstelle `components/user/UserDashboard.vue` für Übersicht
  - [ ] Implementiere `pages/user/my-courses.vue` für angemeldete Kurse
  - [ ] Erstelle `components/user/MyCoursesList.vue`
  
- [ ] **Booking Flow Implementation**
  - [ ] Erstelle `components/booking/BookingModal.vue` für Buchungsformular
  - [ ] Implementiere Verfügbarkeitsprüfung in courses store
  - [ ] Setup Buchungsvalidierung in bookings store
  - [ ] Teste vollständigen Buchungsworkflow
  
- [ ] **User Bookings & Profile**
  - [ ] Erstelle `pages/user/bookings.vue` für Buchungshistorie
  - [ ] Implementiere `components/user/BookingHistory.vue`
  - [ ] Erstelle `pages/user/profile.vue` für Profil-Einstellungen
  - [ ] Implementiere `components/user/UserProfile.vue`
  
- [ ] **Cancellation Logic**
  - [ ] Implementiere Stornierungsfunktion in bookings store
  - [ ] Erstelle `components/ui/ConfirmModal.vue` für Bestätigungen
  - [ ] Setup Stornierungsregeln und Validierung
  - [ ] Teste Stornierungsworkflow

### Phase 3: Admin Panel
- [ ] **Admin Dashboard**
  - [ ] Erstelle `pages/admin/index.vue` mit Übersichts-Dashboard
  - [ ] Implementiere `components/admin/AdminDashboard.vue`
  - [ ] Zeige Statistiken und aktuelle Buchungen
  - [ ] Setup Admin-Route Guards
  
- [ ] **Course Management**
  - [ ] Erstelle `pages/admin/courses.vue` für Kurs-Verwaltung
  - [ ] Implementiere `components/admin/CourseManager.vue`
  - [ ] Erstelle `components/admin/CourseForm.vue` für CRUD-Operationen
  - [ ] Implementiere Kurs-Erstellung, -Bearbeitung und -Löschung
  
- [ ] **Participant Management**
  - [ ] Erstelle `components/admin/ParticipantsList.vue`
  - [ ] Implementiere `pages/admin/participants.vue`
  - [ ] Zeige Teilnehmerlisten für jeden Kurs
  - [ ] Setup Export-Funktionen für Teilnehmerlisten
  
- [ ] **Booking Overview**
  - [ ] Erstelle `components/admin/BookingOverview.vue`
  - [ ] Implementiere `pages/admin/bookings.vue`
  - [ ] Zeige alle Buchungen mit Filtermöglichkeiten
  - [ ] Setup Buchungsmanagement für Admins

### Phase 4: Polish & Integration
- [ ] **Error Handling**
  - [ ] Erstelle `components/ui/ErrorMessage.vue` für Fehleranzeigen
  - [ ] Implementiere globale Error Handling in useApi
  - [ ] Setup Toast-Notifications für User Feedback
  - [ ] Teste alle Error-Szenarien
  
- [ ] **Loading States**
  - [ ] Erstelle `components/ui/LoadingSpinner.vue`
  - [ ] Implementiere Loading States in allen Stores
  - [ ] Setup Skeleton Screens für bessere UX
  - [ ] Erstelle `components/ui/SuccessToast.vue` für Success Messages
  
- [ ] **Responsive Design**
  - [ ] Optimiere alle Komponenten für Mobile
  - [ ] Teste Tablet und Desktop Layouts
  - [ ] Implementiere Touch-optimierte Interaktionen
  - [ ] Validiere Accessibility (A11y) Standards
  
- [ ] **Builder.io Integration**
  - [ ] Setup Builder.io Content-Bereiche
  - [ ] Erstelle Custom Components für Builder
  - [ ] Teste Content-Management Workflow
  - [ ] Dokumentiere Builder.io Setup