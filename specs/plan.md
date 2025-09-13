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

### Phase 4: Polish & Integration ✅ COMPLETED
- [x] **Error Handling**
  - [x] Erstelle `components/ui/ErrorMessage.vue` für Fehleranzeigen
  - [x] Implementiere globale Error Handling in useApi
  - [x] Setup Toast-Notifications für User Feedback
  - [x] Setup `useToast` Composable mit Presets
  
- [x] **Loading States**
  - [x] Erstelle `components/ui/LoadingSpinner.vue`
  - [x] Implementiere Loading States in allen Komponenten
  - [x] Setup Skeleton Screens für bessere UX (`SkeletonLoader.vue`)
  - [x] Erstelle `components/ui/ToastContainer.vue` für Success/Error Messages
  
- [x] **UI Components & UX**
  - [x] Erstelle `components/ui/ConfirmModal.vue` für kritische Aktionen
  - [x] Verbessere mobile Responsivität in CourseCard und Admin Components
  - [x] Integriere neue UI Components in bestehende Komponenten
  - [x] Setup globaler Toast Container im Default Layout
  
- [x] **Technical Improvements**
  - [x] Fixed unused import warnings in Stores
  - [x] Enhanced Error Handling mit automatic token management
  - [x] Verbesserte mobile Touch-Interaktionen
  - [x] Professional Loading States mit Heroicons

### Phase 4.1: Authentication Refactoring ✅ COMPLETED
- [x] **useAuth Composable Cleanup**
  - [x] Removed Nuxt plugin functionality from `composables/useAuth.ts`
  - [x] Streamlined composable to focus purely on auth state management
  - [x] Improved separation of concerns by removing plugin initialization
  
- [x] **Login Form Optimization**
  - [x] Refactored `pages/auth/login.vue` form state from reactive to ref
  - [x] Updated form validation logic to use ref-based form state
  - [x] Enhanced reactivity and performance of login form
  - [x] Fixed form field watchers to work with new ref structure

### Phase 4.2: Admin System Bug Fixes ✅ COMPLETED
- [x] **Admin Route Authentication Issues**
  - [x] Identified and resolved admin 404 errors caused by middleware authentication
  - [x] Fixed middleware authentication state initialization timing
  - [x] Ensured proper admin access with correct credentials (admin@gym.com / admin123)
  
- [x] **Server-Side Rendering Fixes**
  - [x] Fixed `setInterval` SSR issues in admin dashboard by moving to client-side only
  - [x] Enhanced `formatPrice` function with proper error handling for SSR
  - [x] Added null checks and proper type safety for dashboard statistics
  - [x] Resolved `formatPrice is not a function` SSR errors

### Phase 4.3: Admin Routing Fix ✅ COMPLETED
- [x] **Admin Middleware Navigation Fix**
  - [x] Fixed admin middleware routing by replacing `return false` with proper `navigateTo()` calls
  - [x] Aligned admin middleware pattern with working user middleware structure
  - [x] Implemented proper authentication redirection with redirect parameter for login flow
  - [x] Added proper 403 error handling for authenticated users without admin permissions

### Phase 4.4: Membership-Based Course Access ✅ COMPLETED
- [x] **Pricing Model Transition**
  - [x] Removed individual course pricing from booking system
  - [x] Replaced price displays with "Im Abo enthalten" / "Im Mitgliedsabonnement enthalten" messages
  - [x] Updated BookingModal to remove pricing information and payment flow
  - [x] Modified CourseCard to show membership inclusion badges instead of prices
  
- [x] **Membership Validation System**
  - [x] Added `isActive` membership field to User interface in auth store
  - [x] Created `hasActiveMembership` getter for membership status validation
  - [x] Implemented membership validation in booking process
  - [x] Updated booking error messages to reflect membership requirements
  - [x] Modified booking buttons to show membership status and requirements

**🎯 Features implementiert:**
- Umfassendes UI Component System mit ErrorMessage, LoadingSpinner, SkeletonLoader
- Globales Toast Notification System mit Presets für häufige Szenarien  
- Enhanced Error Handling mit automatischem Auth-State Management
- ConfirmModal für kritische User-Aktionen mit verschiedenen Typen
- Mobile-optimierte Layouts mit responsive Button-Stacks
- Professional Loading States mit Heroicons und Tailwind CSS
- Toast Container mit eleganten Animations und Transitions
- TypeScript Integration für alle neuen UI Komponenten
- Refactored Authentication System mit verbesserter Separation of Concerns
- Optimized Form State Management mit ref-based Reactivity
- Streamlined Composables für bessere Performance und Wartbarkeit
- Resolved Admin Authentication Issues und SSR Compatibility
- Stable Admin Dashboard mit korrekter Middleware-Authentifizierung
- Enhanced SSR Error Handling für Production-Ready Deployment
- **Membership-Based Course Access System** - Vollständiger Übergang zu abonnement-basiertem Modell
- Kurse sind für Mitglieder kostenlos verfügbar - keine Einzelpreise mehr
- Smart Membership Validation mit visuellen Indikatoren und klaren Fehlermeldungen
- Intuitive UI Updates mit "Im Abo enthalten" Badges und Membership Status

### Phase 5: User Dashboard & Course Management Restructure ✅ COMPLETED
- [x] **User Dashboard Simplification**
  - [x] Removed booking-specific functionality from UserDashboard component
  - [x] Streamlined quick actions to focus on core course browsing and profile management
  - [x] Updated dashboard to show unified "My Courses" section instead of separate upcoming/completed bookings
  - [x] Removed booking history from dashboard (simplified to focus on core functionality)
  
- [x] **Course Display Component Refactoring**
  - [x] Completely refactored MyCoursesList.vue to display courses instead of bookings
  - [x] Removed booking-specific status badges and actions (cancel booking, booking notes)
  - [x] Replaced booking timeline with clean course information display
  - [x] Updated component to show available course slots and direct course details
  - [x] Simplified UI to focus on course information and availability
  
- [x] **Page Structure Optimization**
  - [x] Deleted components/user/BookingHistory.vue (removed booking-centric functionality)
  - [x] Deleted pages/user/bookings.vue (consolidated functionality into my-courses)
  - [x] Added MyCompletedCourses.vue and MyUpcomingCourses.vue for better course organization
  - [x] Updated user area navigation to focus on course participation rather than booking management
  
- [x] **Data Layer Improvements**
  - [x] Updated stores/courses.ts to better support user course management
  - [x] Enhanced utils/mockData.ts with additional course data for better testing
  - [x] Improved course-centric data flow throughout user components

**🎯 Key Changes Implemented:**
- **Booking → Course Transition**: Shifted from booking-centric to course-centric user experience
- **Simplified User Flow**: Users now view and manage their courses directly rather than through booking abstractions
- **Cleaner Component Architecture**: Removed complex booking status management in favor of straightforward course participation
- **Enhanced Course Information**: Better display of course details, availability, and instructor information
- **Streamlined Navigation**: Focused user dashboard on essential actions and course management
- **Improved Mobile UX**: Simplified layouts work better on mobile devices without booking complexity
- **Future-Ready Structure**: Course-centric approach better supports future features like attendance tracking

### Phase 6: Admin Panel Enhancement ✅ COMPLETED
- [x] **BookingOverview Component Redesign**
  - [x] Replaced statistics cards with intelligent quick action filters  
  - [x] Added smart filter buttons: "Needs Attention", "Today's Courses", "Cancellations", "Recent Activity"
  - [x] Implemented dynamic badge counters showing relevant item counts
  - [x] Enhanced filtering system with course-specific and date range filtering
  - [x] Integrated Vue3 DatePicker (@vuepic/vue-datepicker) for advanced date filtering
  - [x] Streamlined booking table with improved responsive design
  
- [x] **CourseManager Component Optimization**
  - [x] Removed complex filtering interface that was redundant with improved data flow
  - [x] Simplified course management table with focus on essential actions
  - [x] Removed individual price display in favor of membership model
  - [x] Enhanced course status management with cleaner UI
  - [x] Improved hover states and visual feedback for better UX
  
- [x] **Admin Dashboard Simplification**
  - [x] Streamlined admin index page by removing redundant statistics
  - [x] Focused dashboard on essential admin actions and navigation
  - [x] Improved load performance by reducing unnecessary data fetching
  - [x] Enhanced mobile responsiveness for admin interface
  
- [x] **Data Layer Integration**
  - [x] Enhanced admin store with new filtering and query parameters
  - [x] Added support for advanced booking queries with pagination
  - [x] Integrated with courses store for dynamic dropdown filtering
  - [x] Updated package.json with new DatePicker dependency

**🎯 Key Improvements:**
- **Smart Filtering System**: Quick action filters provide immediate access to important booking categories
- **Enhanced User Experience**: Dynamic counters and visual feedback guide admin workflow
- **Advanced Date Handling**: Professional date range picker for precise filtering capabilities  
- **Streamlined Interface**: Removed redundant elements while maintaining full functionality
- **Better Performance**: Optimized data loading with intelligent query parameters
- **Mobile-First Design**: All admin components now work seamlessly on mobile devices
- **TypeScript Integration**: Full type safety across all enhanced admin components

### Phase 7: Admin Dashboard mit Sidebar-Navigation ✅ COMPLETED
- [x] **Neues Admin-Layout erstellen**
  - [x] Erstelle `layouts/admin.vue` mit fester Sidebar und Hauptinhaltsbereich
  - [x] Implementiere responsive Sidebar die auf mobilen Geräten kollabiert
  - [x] Integriere Hamburger-Menü für mobile Navigation
  
- [x] **Sidebar-Navigation implementieren**
  - [x] Dashboard (Übersicht/Statistiken)
  - [x] Buchungen verwalten (bestehende Funktionen)
  - [x] Kurse verwalten (bestehende Funktionen)  
  - [x] Teilnehmer verwalten (bestehende Funktionen)
  - [x] Logout und User-Bereich Links im oberen Bereich
  - [x] Aktiver Menüpunkt wird optisch hervorgehoben
  
- [x] **Admin-Seiten Layout-Migration**
  - [x] `pages/admin/index.vue`: Header entfernen, Layout `admin` verwenden
  - [x] `pages/admin/bookings.vue`: Header entfernen, Layout `admin` verwenden
  - [x] `pages/admin/courses.vue`: Header entfernen, Layout `admin` verwenden
  - [x] `pages/admin/participants.vue`: Header entfernen, Layout `admin` verwenden

**🎯 Features implementiert:**
- **Einheitliche Admin-Navigation**: Alle Admin-Bereiche sind über eine feste Sidebar erreichbar mit professioneller Struktur
- **Mobile-Responsive Design**: Sidebar kollabiert automatisch zu Hamburger-Menü auf mobilen Geräten
- **Verbesserte UX**: Nahtlose Navigation zwischen Admin-Bereichen ohne Seitenwechsel - alle Funktionen in zusammenhängender Oberfläche
- **Konsistentes Design**: Moderne Sidebar mit Tailwind CSS Design-System und Gradient-Akzenten
- **Aktive Menü-Hervorhebung**: Intelligente Hervorhebung des aktuellen Bereichs mit blauer Akzentfarbe und rechtem Border
- **User-Management Integration**: Direkter Zugang zu User-Bereich und Logout-Funktion in der Sidebar
- **Clean Layout Migration**: Alle Admin-Seiten erfolgreich von Header-basierten zu Sidebar-basierten Layouts migriert
- **TypeScript-Integration**: Vollständige Typsicherheit für alle neuen Layout-Komponenten
- **Performance-Optimierung**: Leichtgewichtige Inline-SVG-Icons für bessere Performance

### Phase 8: Admin Panel - Klienten-Management Integration ⏳ IN PROGRESS
- [ ] **Users Endpoint Integration**
  - [ ] Admin Store `getUsers()` Methode bereits vorhanden nutzen
  - [ ] `pages/admin/participants.vue` umstellen: `adminStore.getUsers()` statt `fetchParticipants()`
  - [ ] `adminStore.users` statt `adminStore.participants` verwenden

- [ ] **Umbenennung Teilnehmer → Klienten**
  - [ ] Alle UI-Texte in `pages/admin/participants.vue`: "Teilnehmer" → "Klienten"
  - [ ] Page Title: "Teilnehmer-Verwaltung" → "Klienten-Verwaltung"
  - [ ] `components/admin/ParticipantsList.vue`: Alle "Teilnehmer" → "Klienten"
  - [ ] Button-Labels und Tabellenspalten entsprechend anpassen

- [ ] **Einfache User-Daten Darstellung**
  - [ ] ParticipantsList.vue: User Properties direkt anzeigen (`firstName`, `lastName`, `email`)
  - [ ] Basis-Tabelle: Name, E-Mail, Status (`isActive`), Rollen
  - [ ] Keine berechneten Werte (totalBookings, etc.) - nur vorhandene User-Daten
  - [ ] `AdminParticipant` Type durch `User` Type ersetzen
  - [ ] Statistiken-Modal entfernen (da keine zusätzlichen Berechnungen)

**🎯 Resultat:** Schlanke Klienten-Verwaltung mit nur den vorhandenen User-Daten aus der API.

### Phase 8.1: User Dashboard Enhancement ✅ COMPLETED
- [x] **Statistik-Sektion für User**
  - [x] Erstelle `components/user/UserStats.vue` mit responsivem Card-Layout
  - [x] Implementiere Datenanalyse aus bestehenden Stores (`bookingsStore`, `coursesStore`, `authStore`)
  - [x] Zeige User-Metriken: Anzahl gebuchter Kurse, abgeschlossene Kurse, Lieblingskategorie
  - [x] Implementiere Mitgliedsstatus-Anzeige und Aktivitäts-Streak (aufeinanderfolgende Wochen)
  - [x] Design mit Exopek-Gradient-Cards, Icons und mobile-optimiertem Grid-Layout

- [x] **Nächster Kurs Feature**
  - [x] Implementiere Hero-Card ganz oben auf der Dashboard-Seite
  - [x] Nutze `bookingsStore.upcomingBookings` für nächsten Kurs (erster Eintrag)
  - [x] Features: Große Kurs-Details Card mit Titel, Datum, Uhrzeit, Trainer, Ort
  - [x] Implementiere Live-Countdown bis zum Kurs-Beginn
  - [x] Quick-Action Buttons (z.B. "Details anzeigen", "Zum Kalender hinzufügen")
  - [x] Fallback-Anzeige wenn kein nächster Kurs vorhanden ("Jetzt Kurs buchen!")
  - [x] Google Calendar Integration für Termin-Export

- [ ] **News-Bereich** (Future Implementation)
  - [ ] Erstelle `components/user/NewsSection.vue` mit scrollbaren News-Cards
  - [ ] Implementiere temporäre statische News-Einträge als Platzhalter
  - [ ] Features: Kategorien (Gym-News, Exopek-Updates), Datum, Kurzbeschreibung
  - [ ] "Mehr lesen" Links und responsive horizontaler Slider
  - [ ] **Backend-Anforderung**: Dokumentiere benötigte News-API Endpunkte:
    - `GET /api/news` - Alle News abrufen (mit Kategorien und Pagination)
    - `GET /api/news/:id` - Einzelne News-Detail

- [x] **Dashboard Layout-Integration**
  - [x] Erweitere `pages/user/index.vue` um neue Sektionen
  - [x] Layout-Struktur: [Nächster Kurs Hero] → [User-Statistiken Grid] → [Bestehende Schnellaktionen]
  - [x] Implementiere Loading States und Error Handling für alle neuen Komponenten
  - [x] Mobile-First responsive Design mit Tailwind CSS
  - [x] Integration mit bestehenden Pinia Stores und computed properties

**🎯 Features implementiert:**
- **UserStats.vue**: 4 Statistik-Cards mit Exopek-Design (Gebuchte/Abgeschlossene Kurse, Lieblingskategorie, Wochen-Streak)
- **NextCourseHero.vue**: Hero-Card mit Live-Countdown, Kurs-Details und Google Calendar Integration
- **Erweiterte Dashboard-Page**: Optimierte Layout-Struktur mit neuen Komponenten
- **Responsive Design**: Mobile-First Implementierung mit Tailwind CSS und Hover-Effekten
- **Smart Data Integration**: Intelligente Berechnung von Statistiken und Streaks aus bestehenden Stores
- **Performance-Optimiert**: Efficient Reactivity mit Vue 3 Composition API und TypeScript
- **Production-Ready**: Vollständig funktionsfähige Implementierung wartet nur auf Backend-Daten

### Phase 9: Future Enhancements (Optional)
- [ ] **Builder.io Integration**
  - [ ] Setup Builder.io Content-Bereiche
  - [ ] Erstelle Custom Components für Builder
  - [ ] Teste Content-Management Workflow
  - [ ] Dokumentiere Builder.io Setup
  
- [ ] **Advanced Features**
  - [ ] Implementiere Push Notifications
  - [ ] Setup Email Templates für Buchungsbestätigungen
  - [ ] Erweiterte Analytics und Reporting
  - [ ] Offline-Support mit Service Workers