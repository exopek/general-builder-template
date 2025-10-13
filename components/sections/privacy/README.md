# Privacy Sections für Builder.io

Fertige Datenschutz-Sections mit Default-Content, die direkt in Builder.io verwendet werden können.

---

## 🎯 Verwendung in Builder.io

Alle Sections sind als **Drag & Drop Elemente** in Builder.io verfügbar unter:
**Components → Privacy & Legal Sections**

Jede Section ist bereits mit EXOPEK Gym Datenschutz-Inhalten befüllt und kann direkt verwendet werden.

---

## 📦 Verfügbare Sections

### 1. **PrivacyHeroSection**
Header der Datenschutzseite mit Titel und Cookie-Settings CTA.

**Enthält:**
- H1 Headline
- Subheadline (mit aktuellem Datum)
- BasePrivacyQuickAction (Cookie-Einstellungen Button)

**Default Content:**
- Headline: "Datenschutzerklärung"
- Quick Action: "Cookie-Einstellungen verwalten" → `/cookie-einstellungen`

---

### 2. **PrivacyOverviewSection**
"Datenschutz auf einen Blick" - Übersicht mit FAQ-Accordions.

**Enthält:**
- BasePrivacySection
- BasePrivacyHighlight (Allgemeine Hinweise)
- 4x BasePrivacyAccordion (FAQ)

**Default Content:**
- Wer ist verantwortlich?
- Wie erfassen wir Daten?
- Wofür nutzen wir Daten?
- Welche Rechte haben Sie?

---

### 3. **PrivacyResponsibleSection**
Verantwortliche Stelle mit Kontaktdaten.

**Enthält:**
- BasePrivacySection
- BaseInfoCard (mit Border links, Primary-Color)

**Default Content:**
- EXOPEK Gym UG (haftungsbeschränkt)
- Limmerstraße 4c, 30451 Hannover
- Telefon: 0173 190 1010
- E-Mail: gym@exopek.de

---

### 4. **PrivacyHostingSection**
Hosting-Informationen (Cloudflare).

**Enthält:**
- BasePrivacySection
- BaseInfoCard (mit Border links, Accent-Blue)

**Default Content:**
- Cloudflare Germany GmbH
- Adresse, Telefon, E-Mail, Website
- Beschreibung der gespeicherten Daten

---

### 5. **PrivacyDataCollectionSection**
Datenerfassung: Cookies, Kontaktformular, E-Mail/Telefon.

**Enthält:**
- BasePrivacySection
- BaseInfoCard (Cookies mit Link zu Cookie-Einstellungen)
- 2x BasePrivacyAccordion (Kontaktformular, Anfragen)

**Default Content:**
- Cookie-Erklärung
- Kontaktformular-Datenverarbeitung
- E-Mail/Telefon-Anfragen

---

### 6. **PrivacyNewsletterSection**
Newsletter-Daten Erklärung.

**Enthält:**
- BasePrivacySection
- BaseInfoCard (Border links, Accent-Green)

**Default Content:**
- Newsletter-Opt-In Erklärung
- E-Mail-Adresse Verarbeitung

---

### 7. **PrivacyPluginsSection**
Plugins und Tools (YouTube, Google Fonts, Google Maps).

**Enthält:**
- BasePrivacySection
- BasePrivacyGrid (3 Spalten)
- 3x BasePrivacyGridItem

**Default Content:**
- YouTube (erweiteter Datenschutzmodus)
- Google Fonts
- Google Maps

---

### 8. **PrivacyRightsSection**
DSGVO-Rechte Grid.

**Enthält:**
- BasePrivacySection
- BasePrivacyGrid (2 Spalten)
- 4x BasePrivacyGridItem

**Default Content:**
- ✓ Auskunftsrecht
- ✓ Berichtigungsrecht
- ✓ Löschungsrecht
- ✓ Widerrufsrecht

---

### 9. **PrivacyContactSection**
Kontakt-Card mit e-recht24 Footer.

**Enthält:**
- BaseContactCard (Gradient Cool)
- Footer Note (e-recht24.de Attribution)

**Default Content:**
- Kontakt Datenschutz
- gym@exopek.de
- +49 173 190 1010
- EXOPEK Gym Adresse

---

## 🎨 Design & Styling

- **Tailwind CSS first** - Alle Styles via Utility-Klassen
- **global.css Tokens** - Design-Tokens für Colors, Spacing, Shadows
- **Responsive** - Mobile-First mit `md:` und `lg:` Breakpoints
- **Minimal Custom CSS** - Nur für Vue-spezifische Features

---

## ✅ Workflow in Builder.io

### Komplette Datenschutzseite erstellen:

1. **Neue Page erstellen** in Builder.io
2. **Sections per Drag & Drop hinzufügen:**
   - PrivacyHeroSection (ganz oben)
   - PrivacyOverviewSection
   - PrivacyResponsibleSection
   - PrivacyHostingSection
   - PrivacyDataCollectionSection
   - PrivacyNewsletterSection
   - PrivacyPluginsSection
   - PrivacyRightsSection
   - PrivacyContactSection (ganz unten)

3. **Content anpassen** über die Props im Editor (falls nötig)
4. **Publizieren** ✅

---

## 🔧 Props bearbeiten

Alle Sections haben bearbeitbare Props:

**Beispiel PrivacyHeroSection:**
- `headline` - Hauptüberschrift
- `subheadline` - Unterüberschrift
- `showQuickAction` - Quick Action anzeigen (true/false)
- `quickActionTitle` - Button-Titel
- `quickActionButtonHref` - Button-Link
- etc.

---

## 📝 Anpassungen

**Section hinzufügen:**
1. Neue `.vue` Datei in `/components/sections/privacy/` erstellen
2. Base-Komponenten verwenden
3. Props mit Default-Werten definieren
4. In `/plugins/custom-components.ts` registrieren

**Content ändern:**
- In Builder.io: Props im Editor anpassen
- Im Code: Default-Werte in `/plugins/custom-components.ts` ändern

---

## 🌐 Links

- Cookie-Einstellungen: `/cookie-einstellungen`
- Datenschutzseite: Wird in Builder.io erstellt (z.B. `/datenschutz`)

---

## ✨ Vorteile

✅ **Plug & Play** - Sections sind sofort einsatzbereit
✅ **DSGVO-konform** - Alle Texte nach deutschem Datenschutzrecht
✅ **Wiederverwendbar** - Base-Komponenten können für andere Pages genutzt werden
✅ **Anpassbar** - Alle Inhalte über Props editierbar
✅ **Responsive** - Mobile, Tablet, Desktop optimiert

---

Erstellt für **EXOPEK Gym UG** - Datenschutzseite Builder.io Integration
