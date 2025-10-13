# Privacy & Legal Base Components

Responsive Base-Komponenten für Datenschutz-, Impressums- und Legal-Seiten in Builder.io.

## 🎨 Design-Prinzipien

- ✅ **Tailwind CSS first** - Primär Tailwind Utility-Klassen
- ✅ **Global.css Tokens** - Design-Tokens aus `global.css`
- ✅ **Responsive** - Mobile-First mit `md:` und `lg:` Breakpoints
- ✅ **Builder.io ready** - Alle Komponenten in Builder.io verfügbar
- ✅ **Accessibility** - Semantisches HTML & ARIA-Support

---

## 📦 Komponenten-Übersicht

### 1. **BasePrivacySection**
Container für Datenschutz-Abschnitte mit optionaler Überschrift.

**Props:**
- `title` (string) - Abschnittstitel
- `sectionClass` (string) - Zusätzliche CSS-Klassen

**Verwendung:**
```vue
<BasePrivacySection title="1. Verantwortlicher">
  <p>Inhalt hier...</p>
</BasePrivacySection>
```

---

### 2. **BaseInfoCard**
Flexible Info-Card mit Border, Background und Hover-Effekt.

**Props:**
- `title` (string) - Kartentitel
- `titleSize` ('sm' | 'md' | 'lg' | 'xl') - Titelgröße
- `borderPosition` ('none' | 'left' | 'top' | 'right' | 'bottom' | 'all') - Border-Position
- `borderColor` ('primary' | 'accent-blue' | 'accent-purple' | 'accent-green' | 'accent-yellow' | 'gray') - Border-Farbe
- `bgColor` ('white' | 'gray' | 'primary' | 'yellow') - Hintergrundfarbe
- `hoverEffect` (boolean) - Hover-Shadow-Effekt
- `customClass` (string) - Zusätzliche Klassen

**Verwendung:**
```vue
<BaseInfoCard
  title="Essenzielle Cookies"
  borderPosition="left"
  borderColor="primary"
  :hoverEffect="true"
>
  <p>Diese Cookies sind erforderlich...</p>
</BaseInfoCard>
```

---

### 3. **BasePrivacyGrid**
Responsive Grid für DSGVO-Rechte, Features, etc.

**Props:**
- `columns` ('1' | '2' | '3' | '4') - Anzahl Spalten (responsive)

**Verwendung:**
```vue
<BasePrivacyGrid columns="2">
  <BasePrivacyGridItem title="Auskunftsrecht" />
  <BasePrivacyGridItem title="Löschungsrecht" />
</BasePrivacyGrid>
```

---

### 4. **BasePrivacyGridItem**
Einzelnes Grid-Item mit Icon, Titel und Beschreibung.

**Props:**
- `title` (string) - Titel
- `description` (string) - Beschreibung
- `icon` (string) - Icon/Emoji
- `bgColor` ('white' | 'gray' | 'primary') - Hintergrund
- `textColor` ('gray' | 'dark') - Textfarbe
- `hoverEffect` (boolean) - Hover-Effekt

**Verwendung:**
```vue
<BasePrivacyGridItem
  title="✓ Auskunftsrecht"
  description="Sie haben das Recht auf Auskunft..."
  icon="✓"
  bgColor="gray"
/>
```

---

### 5. **BasePrivacyList**
Styled Liste für Aufzählungen.

**Props:**
- `listStyle` ('disc' | 'decimal' | 'none' | 'check') - Listen-Stil
- `textColor` ('gray' | 'dark' | 'white') - Textfarbe
- `customClass` (string) - Zusätzliche Klassen

**Verwendung:**
```vue
<BasePrivacyList listStyle="disc" textColor="gray">
  <li>IP-Adresse (anonymisiert)</li>
  <li>Datum und Uhrzeit</li>
  <li>Browser-Typ</li>
</BasePrivacyList>
```

---

### 6. **BaseContactCard**
Gradient-Card für Kontaktinformationen.

**Props:**
- `title` (string) - Titel
- `description` (string) - Beschreibung
- `email` (string) - E-Mail-Adresse
- `phone` (string) - Telefonnummer
- `address` (string) - Adresse
- `gradient` ('warm' | 'cool' | 'primary' | 'secondary') - Gradient-Variante

**Verwendung:**
```vue
<BaseContactCard
  title="Kontakt Datenschutz"
  description="Bei Fragen wenden Sie sich bitte an:"
  email="datenschutz@exopek.de"
  phone="+49 (0) 123 456789"
  address="Musterstraße 123, 12345 Musterstadt"
  gradient="cool"
/>
```

---

### 7. **BasePrivacyHighlight**
Hervorgehobene Box mit Icon (Warnung, Info, etc.).

**Props:**
- `title` (string) - Titel
- `icon` (string) - Icon/Emoji
- `variant` ('default' | 'warning' | 'info' | 'success' | 'primary') - Stil-Variante
- `customClass` (string) - Zusätzliche Klassen

**Verwendung:**
```vue
<BasePrivacyHighlight
  title="Wichtig"
  icon="⚠️"
  variant="warning"
>
  <p>Sie haben das Recht, Ihre Einwilligung jederzeit zu widerrufen.</p>
</BasePrivacyHighlight>
```

---

### 8. **BasePrivacyQuickAction**
CTA-Card mit Gradient und Button.

**Props:**
- `title` (string) - Titel
- `description` (string) - Beschreibung
- `gradient` ('warm' | 'cool' | 'primary' | 'secondary') - Gradient
- `buttonText` (string) - Button-Text
- `buttonHref` (string) - Button-Link
- `buttonVariant` ('primary' | 'secondary' | 'outline' | 'gradient') - Button-Stil
- `buttonSize` ('sm' | 'md' | 'lg' | 'xl') - Button-Größe

**Verwendung:**
```vue
<BasePrivacyQuickAction
  title="Cookie-Einstellungen verwalten"
  description="Sie können Ihre Präferenzen jederzeit ändern."
  gradient="warm"
  buttonText="Einstellungen öffnen"
  buttonHref="/cookie-einstellungen"
  buttonVariant="secondary"
  buttonSize="lg"
/>
```

---

### 9. **BasePrivacyAccordion**
Aufklappbarer Accordion mit Smooth-Animation.

**Props:**
- `title` (string, required) - Accordion-Titel
- `defaultOpen` (boolean) - Standardmäßig geöffnet
- `summaryClass` (string) - CSS-Klasse für Summary
- `openClass` (string) - CSS-Klasse bei geöffnet
- `customClass` (string) - Zusätzliche Klassen

**Verwendung:**
```vue
<BasePrivacyAccordion
  title="Cookie-Details anzeigen"
  :defaultOpen="false"
>
  <p>Detaillierte Informationen über verwendete Cookies...</p>
</BasePrivacyAccordion>
```

---

## 🎯 Verwendungsbeispiel: Komplette Datenschutz-Seite

```vue
<template>
  <div class="container py-12">
    <!-- Quick Action -->
    <BasePrivacyQuickAction
      title="Cookie-Einstellungen verwalten"
      description="Ändern Sie Ihre Präferenzen jederzeit"
      gradient="warm"
      buttonText="Einstellungen"
      buttonHref="/cookie-einstellungen"
    />

    <!-- Section 1 -->
    <BasePrivacySection title="1. Verantwortlicher">
      <BaseInfoCard bgColor="white">
        <p><strong>Club Exopek</strong></p>
        <p>Musterstraße 123, 12345 Musterstadt</p>
      </BaseInfoCard>
    </BasePrivacySection>

    <!-- Section 2 -->
    <BasePrivacySection title="2. Cookies">
      <BaseInfoCard
        title="Essenzielle Cookies"
        borderPosition="left"
        borderColor="primary"
      >
        <p>Diese Cookies sind erforderlich...</p>
      </BaseInfoCard>
    </BasePrivacySection>

    <!-- Section 3 - DSGVO Rechte -->
    <BasePrivacySection title="3. Ihre Rechte">
      <BasePrivacyGrid columns="2">
        <BasePrivacyGridItem
          title="✓ Auskunftsrecht"
          description="Sie haben das Recht auf Auskunft..."
        />
        <BasePrivacyGridItem
          title="✓ Löschungsrecht"
          description="Sie können Löschung verlangen..."
        />
      </BasePrivacyGrid>
    </BasePrivacySection>

    <!-- Contact -->
    <BaseContactCard
      title="Kontakt"
      email="info@exopek.de"
      phone="+49 123 456789"
      gradient="cool"
    />
  </div>
</template>
```

---

## 📋 Checkliste: Komponenten-Erstellung

- ✅ Tailwind CSS Utility-First
- ✅ Design-Tokens aus `global.css`
- ✅ Responsive (md:, lg: Breakpoints)
- ✅ Props mit TypeScript
- ✅ Slots für flexible Content
- ✅ Builder.io Input Schema
- ✅ Minimal Custom CSS
- ✅ Accessibility (semantisches HTML)

---

## 🔧 Builder.io Integration

Alle Komponenten sind automatisch in Builder.io verfügbar unter:
**Components → Privacy & Legal**

Die Komponenten können per Drag & Drop in den Editor gezogen werden.
Alle Props sind im Builder.io Editor editierbar.

---

## 🎨 Design-Tokens (aus global.css)

**Farben:**
- `bg-primary` / `text-primary` / `border-primary`
- `bg-gray-50` / `bg-gray-100` / etc.
- `bg-gradient-warm` / `bg-gradient-cool`

**Spacing:**
- `space-y-4`, `gap-4`, `mb-6`, `p-6`

**Shadows:**
- `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`

**Transitions:**
- `transition-all`, `transition-colors`, `transition-transform`

---

## 📝 Wartung & Updates

**Änderungen an Komponenten:**
1. Komponente in `/components/base/` bearbeiten
2. Props-Schema in `/plugins/custom-components.ts` aktualisieren
3. Builder.io cache clearen (falls nötig)

**Neue Komponente hinzufügen:**
1. Komponente in `/components/base/` erstellen
2. Import in `/plugins/custom-components.ts` hinzufügen
3. Registration im `registeredComponents` Array
4. Dokumentation hier ergänzen
