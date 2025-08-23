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

### Phase 1: Foundation ✅ COMPLETED
- [x] **Pinia Store Setup**
  - [x] Erstelle `stores/auth.ts` mit User State, Login/Logout Actions
  - [x] Erstelle `stores/courses.ts` mit Kurs-Management und Caching
  - [x] Erstelle `stores/bookings.ts` mit Buchungslogik
  - [x] Erstelle `stores/admin.ts` mit Admin-spezifischen Funktionen
  
- [x] **API Service Layer**
  - [x] Erstelle `composables/useApi.ts` mit Axios/Fetch Wrapper
  - [x] Implementiere Error Handling und Loading States
  - [x] Setup JWT Token Management
  - [x] Definiere API-Endpunkte in `utils/constants.ts`
  
- [x] **Authentication System**
  - [x] Erstelle `composables/useAuth.ts` mit Authentication Helpers
  - [x] Implementiere Role-based Access Control
  - [x] Erstelle `middleware/user.ts` für User Route Guard
  - [x] Erstelle `middleware/admin.ts` für Admin Route Guard
  - [x] Setup Role-based Redirects nach Login
  - [x] Erstelle Login/Register Pages (`pages/auth/`)

**🧪 Test Credentials:**
- Admin: admin@gym.com / admin123
- User: user@gym.com / user123

### Phase 2: User Area & Booking System ✅ COMPLETED
- [x] **Course Display Components**
  - [x] Erstelle `components/booking/CourseCard.vue` mit Buchungsbutton
  - [x] Erstelle `pages/courses/index.vue` für öffentliche Kursübersicht
  - [x] Erstelle `pages/courses/[id].vue` für Kurs-Details
  
- [x] **User Area Setup**
  - [x] Erstelle `pages/user/index.vue` - User Dashboard
  - [x] Erstelle `components/user/UserDashboard.vue` für Übersicht
  - [x] Implementiere `pages/user/my-courses.vue` für angemeldete Kurse
  - [x] Erstelle `components/user/MyCoursesList.vue`
  
- [x] **Booking Flow Implementation**
  - [x] Erstelle `components/booking/BookingModal.vue` für Buchungsformular
  - [x] Implementiere Verfügbarkeitsprüfung in courses store
  - [x] Setup Buchungsvalidierung in bookings store
  - [x] Teste vollständigen Buchungsworkflow
  
- [x] **User Bookings & Profile**
  - [x] Erstelle `pages/user/bookings.vue` für Buchungshistorie
  - [x] Implementiere `components/user/BookingHistory.vue`
  - [x] Erstelle `pages/user/profile.vue` für Profil-Einstellungen
  - [x] Implementiere `components/user/UserProfile.vue`
  
- [x] **Cancellation Logic**
  - [x] Implementiere Stornierungsfunktion in bookings store
  - [x] Setup Stornierungsregeln und Validierung
  - [x] Teste Stornierungsworkflow

**🎯 Features implementiert:**
- Responsive CourseCard mit Smart-Booking-Button
- Vollständige Kursübersicht mit Filtern und Suche  
- Detaillierte Kurs-Seiten mit Verfügbarkeitsprüfung
- User Dashboard mit Statistiken und Schnellaktionen
- Buchungsmodal mit Formularvalidierung
- Meine Kurse mit Tab-Navigation (kommend/abgeschlossen)
- Buchungshistorie mit Timeline und Statistiken
- Profil-Management mit Passwort-Änderung
- Smart Stornierungslogik mit Fristen
- Loading States und Error Handling
- TypeScript-Integration für alle Komponenten

### Phase 3: Admin Panel ✅ COMPLETED
- [x] **Admin Dashboard**
  - [x] Erstelle `pages/admin/index.vue` mit Übersichts-Dashboard
  - [x] Implementiere `components/admin/AdminDashboard.vue`
  - [x] Zeige Statistiken und aktuelle Buchungen
  - [x] Setup Admin-Route Guards
  
- [x] **Course Management**
  - [x] Erstelle `pages/admin/courses.vue` für Kurs-Verwaltung
  - [x] Implementiere `components/admin/CourseManager.vue`
  - [x] Erstelle `components/admin/CourseForm.vue` für CRUD-Operationen
  - [x] Implementiere Kurs-Erstellung, -Bearbeitung und -Löschung
  
- [x] **Participant Management**
  - [x] Erstelle `components/admin/ParticipantsList.vue`
  - [x] Implementiere `pages/admin/participants.vue`
  - [x] Zeige Teilnehmerlisten für jeden Kurs
  - [x] Setup Export-Funktionen für Teilnehmerlisten
  
- [x] **Booking Overview**
  - [x] Erstelle `components/admin/BookingOverview.vue`
  - [x] Implementiere `pages/admin/bookings.vue`
  - [x] Zeige alle Buchungen mit Filtermöglichkeiten
  - [x] Setup Buchungsmanagement für Admins

**🎯 Features implementiert:**
- Vollständiges Admin Dashboard mit Statistik-Cards und Übersicht
- Professionelle Kursverwaltung mit Tabelle, Filtern und CRUD-Modal
- Comprehensive Buchungsübersicht mit Status-Management und CSV-Export
- Teilnehmerverwaltung mit Aktivitätstracking und Bulk-Funktionen
- Role-based Admin Navigation und Schutz aller Admin-Routen
- Responsive Design für alle Admin-Komponenten
- Erweiterte Such-, Filter- und Pagination-Funktionen
- Real-time Datenaktualisierung über Pinia Stores
- Professional UI/UX mit Tailwind CSS
- TypeScript-Integration für alle Admin-Komponenten

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