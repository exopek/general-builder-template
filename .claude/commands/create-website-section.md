# Create Website Section for Builder.io

**Task**: Create a new website section component for Builder.io based on: #$ARGUMENTS

---

## 🎯 Pre-Implementation Analysis

Before starting, analyze the requirements:

1. **Component Type Decision**:
   - Is this a **Section Component** (complete, standalone section for Builder.io)?
   - Or a **UI Component** (small, reusable building block used by sections)?
   - Or a **Content Wrapper** (domain-specific implementation)?
   - **Rule**: Only Section Components and Content Wrappers get registered in Builder.io

2. **Existing Components Check**:
   - Search `components/design-system-ui-components/` for UI primitives
   - Search `components/design-system-section-components/` for sections
   - Search `components/[domain]/` for similar content wrappers
   - **Reuse before creating new**

3. **Design Tokens Review**:
   - Check `assets/css/global.css` for available utility classes
   - **Never use hardcoded values** (#hex, px, specific colors)
   - Use: Design Tokens → Tailwind Utilities → Custom CSS (in that order)

---

## 🎨 Builder.io Konfigurierbarkeits-Philosophie

**Prinzip**: "Konsistenz wo nötig, Flexibilität wo sinnvoll"

### ❌ NICHT konfigurierbar machen

Diese Werte sollten **fest in Tailwind** codiert sein, nicht als Props:

- **Spacing** (padding, gap, margin)
  - Grund: Konsistentes Design-System
  - Beispiel: `py-12 md:py-16 lg:py-20` (nicht als `paddingTop` prop)

- **Font Sizes**
  - Grund: Responsive Typography sollte standardisiert sein
  - Beispiel: `text-3xl md:text-4xl lg:text-5xl` (nicht als `fontSize` prop)

- **Border Radius**
  - Grund: Einheitliches visuelles Erscheinungsbild
  - Beispiel: `rounded-2xl` (nicht als `borderRadius` prop)

- **Max-Width**
  - Grund: Konsistente Container-Breiten
  - Beispiel: `max-w-6xl` (nicht als `maxWidth` prop)

### ✅ Konfigurierbar machen

Diese Werte **sollten als Props** verfügbar sein:

- **Layout-Optionen**
  - `layoutColumns`: '1-column' | '2-columns'
  - `imagePosition`: 'left' | 'right'

- **Visibility Toggles** (für jedes Haupt-Element)
  - `showTagline`, `showHeadline`, `showDescription`, `showImage`

- **Farben** (mit color picker)
  - `backgroundColor`, `headlineColor`, `textColor`, etc.

- **Content** (mit richText)
  - `tagline`, `headline`, `description` (siehe Rich Text Best Practices)

- **Image-Optionen**
  - `image` (file upload)
  - `imageAspectRatio` (string wie "4/3", "16/9")
  - `showImageShadow` (boolean)

**Ergebnis**: Einfachere Bedienung in Builder.io + konsistentes Design

---

## 🏗️ Component Architecture

### Section Component Structure

**Location**: `components/design-system-section-components/[ComponentName].vue`

**Naming**: WITHOUT "Base" prefix (e.g., `Hero.vue`, not `BaseHero.vue`)

**Template Pattern** (with backgroundColor property):
```vue
<template>
  <div :style="{ backgroundColor }" class="py-8 md:py-12">
    <div class="container">
      <!-- Section Content -->
      <Button variant="primary">Click me</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/design-system-ui-components/Button.vue'

interface Props {
  backgroundColor?: string
  // ... other props
}

withDefaults(defineProps<Props>(), {
  backgroundColor: '#ffffff',
  // ... other defaults
})
</script>
```

**⚠️ Critical**: Two closing `</div>` tags required (outer backgroundColor + inner container)!

### UI Component Structure

**Location**: `components/design-system-ui-components/[ComponentName].vue`

**Naming**: WITHOUT "Base" prefix (e.g., `Button.vue`, not `BaseButton.vue`)

**Template Pattern**:
```vue
<template>
  <div class="[tailwind-classes]">
    <!-- Component Content -->
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary'
  // ... other props
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary'
})
</script>
```

---

## 📐 Standardisierte Design Patterns

### Pattern A: Standard für neue Sections (Empfohlen)

**Verwendet in:** ContentSection71, FeatureGrid, ContentImageGrid, USPGrid

```vue
<template>
  <!-- Section -->
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">

      <!-- Section Header -->
      <div class="text-center mb-8 md:mb-12">
        <!-- Tagline -->
        <p
          v-if="showTagline && tagline"
          class="text-sm md:text-base font-semibold mb-3"
          :style="{ color: taglineColor }"
          v-html="tagline"
        ></p>

        <!-- Headline -->
        <div
          v-if="showHeadline && headline"
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-4"
          :style="{ color: headlineColor }"
          v-html="headline"
        ></div>

        <!-- Description -->
        <div
          v-if="showDescription && description"
          class="text-base md:text-lg"
          :style="{ color: descriptionColor }"
          v-html="description"
        ></div>
      </div>

      <!-- Content -->
      <div class="space-y-6">
        <!-- Grid example -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <!-- Cards -->
          <div class="p-6 md:p-8 rounded-2xl shadow-lg">
            <!-- Card content -->
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
```

**Pattern A Werte:**
- Section Padding: `py-12 md:py-16 lg:py-20`
- Container: `container mx-auto px-4 md:px-6`
- Header Margin: `mb-8 md:mb-12`
- Content Gap: `space-y-6`
- Grid Gap: `gap-4 md:gap-6` (oder `gap-6 md:gap-8` für größere Abstände)
- Card Padding: `p-6 md:p-8`
- Border Radius: `rounded-2xl`

**Typography (responsive):**
- Tagline: `text-sm md:text-base`
- Headline: `text-3xl md:text-4xl lg:text-5xl`
- Description: `text-base md:text-lg`
- Large Value/Number: `text-4xl md:text-5xl`

### Pattern B: Für Hero & FAQ Sections

**Verwendet in:** Hero, FAQ

```vue
<section class="py-16 md:py-20" :style="{ backgroundColor }">
  <div class="container mx-auto">
    <!-- Größere Abstände -->
    <div class="mb-12 lg:mb-16">
      <!-- oder mb-16 lg:mb-20 -->
    </div>
  </div>
</section>
```

**Pattern B Werte:**
- Section Padding: `py-16 md:py-20` (größer für Impact)
- Container: `container mx-auto` (Padding oft in Child-Elements)
- Header Margin: `mb-12 lg:mb-16` (oder `mb-16 lg:mb-20`)
- Content Gap: `space-y-8`
- Grid Gap: `gap-12 lg:gap-16`

**Wann verwenden:**
- ✅ Hero Sections (brauchen mehr visuellen Impact)
- ✅ FAQ Sections (brauchen mehr Luftraum für Lesbarkeit)
- ❌ Standard Content Sections (verwende Pattern A)

---

## 🎨 Styling Rules & Common Pitfalls

### ⚠️ CRITICAL: Avoid `.card` Class

**Problem**: `.card` in `global.css` sets `background: var(--color-white)` which overrides:
- Custom backgrounds
- Gradients
- backgroundColor prop

**Solution**: Use Tailwind utilities instead:
```vue
<!-- ❌ DON'T -->
<div class="card bg-gradient-warm">

<!-- ✅ DO -->
<div class="p-6 md:p-8 rounded-xl shadow-md transition-all hover:shadow-lg bg-gradient-warm">
```

### Contrast & Accessibility Checklist

**Text Colors**:
- ✅ Dark text on light backgrounds: `text-gray-900`, `text-gray-700`
- ✅ Light text on dark/gradient backgrounds: `text-white`
- ✅ Headlines on white: `text-gray-900`
- ✅ Descriptions on white: `text-gray-600`, `text-gray-700`

**Common Mistakes**:
- ❌ `text-white` on white background
- ❌ `text-gray-900` on `bg-gray-50` (too dark)
- ❌ Links without `hover:underline`

### Responsive Design

**Required breakpoints**:
- Mobile-first: Base styles = mobile
- Tablet: `md:` prefix (768px+)
- Desktop: `lg:` prefix (1024px+)

**Spacing pattern**:
```vue
<!-- Section padding -->
<div class="py-8 md:py-12">

<!-- Grid gaps -->
<div class="grid gap-6 md:gap-8">

<!-- Card padding -->
<div class="p-5 md:p-6">
```

---

## 🔧 Builder.io Integration

### Section Component Registration

**Only register Section Components & Content Wrappers**, NOT UI Components!

**In `plugins/custom-components.ts`**:
```typescript
{
  component: SectionName,
  name: 'SectionName',
  inputs: [
    {
      name: 'backgroundColor',
      type: 'color',
      defaultValue: '#ffffff'
    },
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Default Title'
    },
    {
      name: 'variant',
      type: 'text',
      enum: ['primary', 'secondary', 'tertiary'],
      defaultValue: 'primary'
    },
    {
      name: 'showElement',
      type: 'boolean',
      defaultValue: true
    }
    // ... more inputs
  ]
}
```

**Input Types**:
- `type: 'richText'` - **EMPFOHLEN für alle Textfelder** (erlaubt HTML-Formatierung)
- `type: 'string'` - Plain text input (nur für Labels/Namen)
- `type: 'color'` - Color picker
- `type: 'boolean'` - Toggle
- `type: 'text', enum: [...]` - Dropdown (NOT `type: 'list'`!)
- `type: 'longText'` - Textarea (veraltet, nutze richText)
- `type: 'number'` - Number input
- `type: 'file'` - File upload (für Bilder)

### Rich Text Best Practices

**Verwende `type: 'richText'` für alle Content-Felder:**

```typescript
// ✅ RICHTIG - Rich Text für Content
{ name: 'tagline', type: 'richText', defaultValue: 'Tagline' }
{ name: 'headline', type: 'richText', defaultValue: 'Lorem ipsum' }
{ name: 'description', type: 'richText', defaultValue: '' }

// ❌ FALSCH - String für Content
{ name: 'headline', type: 'string', defaultValue: 'Lorem ipsum' }
```

**Vorteile:**
- ✅ HTML-Formatierung möglich (`<strong>`, `<em>`, etc.)
- ✅ Keine headlineTag Props nötig (direkt `<h2>Text</h2>` im richText)
- ✅ Konsistent über alle Components
- ✅ Flexibler für Content-Editoren

**Ausnahmen (verwende `type: 'string'`):**
- Button Text / CTA Text
- Labels / Namen
- Alt-Texte für Bilder
- URLs

### Visibility Toggles Pattern

**Für jedes Haupt-Element sollte ein Toggle existieren:**

```typescript
inputs: [
  // Visibility Toggles (gruppiert)
  { name: 'showTagline', type: 'boolean', defaultValue: true },
  { name: 'showHeadline', type: 'boolean', defaultValue: true },
  { name: 'showDescription', type: 'boolean', defaultValue: true },
  { name: 'showImage', type: 'boolean', defaultValue: true },
  { name: 'showStatistics', type: 'boolean', defaultValue: true },

  // Content (richText)
  { name: 'tagline', type: 'richText', defaultValue: 'Tagline' },
  { name: 'headline', type: 'richText', defaultValue: 'Headline' },
  // ...
]
```

**Template Pattern:**
```vue
<p
  v-if="showTagline && tagline"
  class="text-sm md:text-base"
  v-html="tagline"
></p>
```

---

## 📝 Step-by-Step Implementation

### Step 1: Component Creation

1. **Create component file** in correct location
2. **Write template** with proper structure:
   - Outer wrapper with backgroundColor (for sections)
   - Inner container div
   - Semantic HTML elements
3. **Define TypeScript interface** with all props
4. **Set default values** for all props

### Step 2: Styling

1. **Wähle das richtige Pattern**:
   - **Pattern A** (Standard): Für normale Content Sections
   - **Pattern B** (Hero/FAQ): Nur für Hero oder FAQ Sections

2. **Verwende Pattern A Template** (empfohlen):
   ```vue
   <section class="py-12 md:py-16 lg:py-20" :style="{ backgroundColor }">
     <div class="container mx-auto px-4 md:px-6">
       <!-- Content -->
     </div>
   </section>
   ```

3. **Typography als responsive Tailwind-Classes**:
   - Tagline: `text-sm md:text-base`
   - Headline: `text-3xl md:text-4xl lg:text-5xl`
   - Description: `text-base md:text-lg`
   - Large Values: `text-4xl md:text-5xl`

4. **Spacing fest in Tailwind** (nicht als Props):
   - Header Margin: `mb-8 md:mb-12`
   - Content Gap: `space-y-6`
   - Grid Gap: `gap-4 md:gap-6`
   - Card Padding: `p-6 md:p-8`

5. **Check `global.css`** for existing utility classes
6. **Avoid `.card` class** - use individual utilities
7. **Test contrast** of all text elements
8. **Add responsive classes** (mobile-first)

### Step 3: Builder.io Registration (Section Components only)

1. **Import component** in `plugins/custom-components.ts`
2. **Add registration object** with inputs schema
3. **Set meaningful defaults** for all inputs
4. **Use correct input types** (especially dropdowns: `type: 'text', enum: [...]`)

### Step 4: Testing

1. **Visual inspection**: Check contrast, spacing, responsiveness
2. **Template validation**: Count opening/closing tags
3. **Builder.io test**: Drag component into editor, test all props
4. **Responsive test**: Check mobile, tablet, desktop views

---

## ✅ Pre-Commit Checklist

**Code Quality**:
- [ ] No hardcoded colors/values (only tokens/Tailwind)
- [ ] No `.card` class usage (use Tailwind utilities)
- [ ] All text has proper contrast with background
- [ ] Responsive classes applied (mobile-first)
- [ ] Template < 80 lines (split if larger)
- [ ] TypeScript interface complete with all props
- [ ] Default values set for all props

**Design Pattern** (NEU):
- [ ] Verwendet Pattern A (Standard) oder Pattern B (Hero/FAQ)
- [ ] Spacing fest in Tailwind (nicht als Props)
- [ ] Font Sizes fest in Tailwind mit responsive classes
- [ ] Border Radius fest in Tailwind (`rounded-2xl`)
- [ ] Max-Width fest in Tailwind (z.B. `max-w-6xl`)

**Template Structure** (for sections with backgroundColor):
- [ ] Outer `<section>` mit `:style="{ backgroundColor }"`
- [ ] Inner div mit `container mx-auto px-4 md:px-6`
- [ ] Proper section padding: `py-12 md:py-16 lg:py-20` (Pattern A)
- [ ] TWO closing tags present (`</div></section>`)
- [ ] No unclosed tags

**Builder.io** (Section Components only):
- [ ] Component imported in `custom-components.ts`
- [ ] Registration object added
- [ ] All content fields use `type: 'richText'` (nicht string)
- [ ] Visibility Toggles für alle Haupt-Elemente (`show*`)
- [ ] Correct input types used (especially `type: 'text', enum: [...]` for dropdowns)
- [ ] NO spacing/fontSize/borderRadius props (fest in Tailwind)
- [ ] Meaningful default values set

**Accessibility**:
- [ ] Semantic HTML used (section, h1-h6, article, etc.)
- [ ] Links have hover states
- [ ] Buttons have proper text/aria-labels
- [ ] Images have alt text (if applicable)
- [ ] v-html only used for richText content

**Testing**:
- [ ] Component renders correctly
- [ ] All props work as expected
- [ ] Visibility toggles work correctly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Works in Builder.io editor (if registered)
- [ ] Rich text formatting works (bold, italic, etc.)

---

## 🚀 Implementation

Now create the component with all guidelines above in mind. Think carefully about:

1. **Component architecture** (UI vs Section vs Content Wrapper)
2. **Location** (design-system-ui-components/ vs design-system-section-components/ vs domain/)
3. **Naming** (NO "Base" prefix for new components)
4. **Design Pattern** (Pattern A für Standard, Pattern B für Hero/FAQ)
5. **Template structure** (proper wrapper divs with backgroundColor)
6. **Styling** (tokens, Tailwind, no `.card` class)
7. **Typography** (responsive Tailwind classes, fest codiert)
8. **Spacing** (fest in Tailwind, NICHT als Props)
9. **Contrast** (text colors vs backgrounds)
10. **Responsiveness** (mobile-first)
11. **Builder.io integration**:
    - Only sections & wrappers (NOT UI components)
    - Use `type: 'richText'` for all content fields
    - Add visibility toggles for all main elements
    - NO spacing/fontSize/borderRadius props
12. **Rich Text** (all content fields use richText, v-html in template)

**Quick Start Template** (Pattern A):

```vue
<template>
  <section class="py-12 md:py-16 lg:py-20" :style="{ backgroundColor }">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center mb-8 md:mb-12">
        <p v-if="showTagline && tagline" class="text-sm md:text-base font-semibold mb-3" v-html="tagline"></p>
        <div v-if="showHeadline && headline" class="text-3xl md:text-4xl lg:text-5xl font-black mb-4" v-html="headline"></div>
      </div>
      <!-- Your content here -->
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  // Visibility
  showTagline?: boolean
  showHeadline?: boolean
  // Content (richText!)
  tagline?: string
  headline?: string
  // Colors
  backgroundColor?: string
}

withDefaults(defineProps<Props>(), {
  showTagline: true,
  showHeadline: true,
  tagline: 'Tagline',
  headline: 'Headline',
  backgroundColor: '#ffffff'
})
</script>
```

Keep the implementation clean, reusable, and following all design system principles from CLAUDE.md.
