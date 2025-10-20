# Create Content Section (Content Wrapper)

**Task**: Create a new domain-specific Content Wrapper component based on: #$ARGUMENTS

Expected format: `[domain] [SectionType]` (e.g., `gym-linden Hero` or `transformation USPGrid`)

---

## 🎯 What are Content Wrappers?

Content Wrappers are **domain-specific implementations** that:
- Use Section Components internally (3-Tier Architecture)
- Have predefined, domain-specific content (texts, images, data)
- Are registered in Builder.io for easy content management
- Follow the naming pattern: `[Domain][SectionType].vue` (e.g., `GymLindenHero.vue`)

**Examples**:
- `components/gym-linden/GymLindenHero.vue` - Uses `Hero.vue` with Gym Linden content
- `components/transformation/TransformationTimeline.vue` - Uses `Timeline.vue` with Transformation content
- `components/levelup/LevelUpWeekBenefits.vue` - Uses section component with Level Up content

---

## 📋 Pre-Implementation Checklist

Before creating a Content Wrapper, verify:

1. **Domain Folder Exists**:
   - Check if `components/[domain]/` exists
   - Create if missing: `mkdir -p components/[domain]`

2. **Section Component Available**:
   - Verify the Section Component exists in `components/design-system-section-components/`
   - Common Section Components: Hero, USPGrid, FAQ, Timeline, CTA, GalleryGrid, StatisticGrid, etc.
   - **If missing**: Create Section Component first using `/create-website-section`

3. **Component Naming**:
   - Format: `[Domain][SectionType].vue`
   - Examples: `GymLindenHero.vue`, `TransformationUSPGrid.vue`, `LevelUpWeekCTA.vue`
   - Use PascalCase for both domain and section type

4. **Domain Content Strategy**:
   - Gather domain-specific content (headlines, descriptions, images, data)
   - Define realistic default values that showcase the domain
   - Ensure content aligns with domain's brand voice and messaging

---

## 🏗️ Content Wrapper Structure

### Template Pattern (Preferred: Gym-Linden Style)

**Best Practice**: Use Section Component internally and forward props

```vue
<template>
  <SectionComponent
    :prop1="prop1"
    :prop2="prop2"
    :prop3="prop3"
    :background-color="backgroundColor"
  />
</template>

<script setup lang="ts">
import SectionComponent from '~/components/design-system-section-components/SectionComponent.vue'

interface Props {
  prop1?: string
  prop2?: string
  prop3?: string
  backgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  prop1: 'Domain-specific default value',
  prop2: 'Another domain-specific value',
  prop3: 'More specific content',
  backgroundColor: '#0f0f0f'
})
</script>
```

**Why this approach?**
- ✅ Follows 3-Tier Architecture (UI → Section → Content Wrapper)
- ✅ Reuses existing Section Components
- ✅ Maintains single source of truth for styling
- ✅ Easy to update when Section Component changes
- ✅ Cleaner, more maintainable code

### Alternative: Custom Implementation (Transformation Style)

**Use only when**:
- Section Component doesn't exist or isn't suitable
- Highly specialized layout required
- Complex domain-specific interactions needed

```vue
<template>
  <section class="py-16 md:py-20" :style="{ backgroundColor }">
    <div class="container mx-auto">
      <!-- Custom implementation -->
      <h2 class="text-3xl md:text-4xl font-black mb-6">{{ headline }}</h2>
      <p class="text-lg text-gray-600">{{ description }}</p>
      <!-- ... more custom content -->
    </div>
  </section>
</template>

<script setup lang="ts">
// Custom implementation details
</script>
```

---

## 🎨 Domain-Specific Content Examples

### Gym Linden Domain
**Theme**: Functional Training, EXOPEK, Morning Workouts, Hannover Linden
**Tone**: Energetic, motivating, local, professional
**Keywords**: Morgentraining, EXOPEK, Functional Training, HIIT, Gym Linden

**Example Defaults**:
```typescript
headline: 'Dein <span class="text-gradient-warm">Gym in Linden</span> – Starte fit in den Tag'
subheadline: 'Morgentraining vor der Arbeit mit dem innovativen EXOPEK-Konzept.'
primaryCtaText: 'Probetraining buchen'
heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48'
```

### Transformation Domain
**Theme**: 7-Wochen Transformation, Weight Loss, Personal Training
**Tone**: Motivational, supportive, results-driven
**Keywords**: 7-Wochen, Transformation, Abnehmen, Personal Training

**Example Defaults**:
```typescript
headline: 'Deine <span style="color: #f97316;">7-Wochen</span> Transformation beginnt jetzt'
subheadline: 'Erreiche deine Fitnessziele mit unserem bewährten 7-Wochen-Programm.'
primaryCtaText: 'Jetzt starten'
badgeText: 'Limitiertes Angebot'
```

### Level Up Domain
**Theme**: Intensive Week Program, Skill Development, Advanced Training
**Tone**: Challenging, achievement-oriented, exclusive
**Keywords**: Level Up, Intensive, Week Challenge, Progress

**Example Defaults**:
```typescript
headline: 'Level Up Week – Bring dein Training auf das nächste Level'
subheadline: 'Eine intensive Woche für maximalen Fortschritt und neue Bestleistungen.'
primaryCtaText: 'Challenge annehmen'
badgeText: 'Nur für Mitglieder'
```

---

## 🔧 Builder.io Registration

**CRITICAL**: Content Wrappers MUST be registered in `plugins/custom-components.ts`

### Registration Template

```typescript
// 1. Import Component
import DomainSectionType from '~/components/[domain]/DomainSectionType.vue'

// 2. Add to components array
{
  component: DomainSectionType,
  name: 'DomainSectionType',
  inputs: [
    {
      name: 'headline',
      type: 'string',
      defaultValue: 'Domain-specific headline'
    },
    {
      name: 'subheadline',
      type: 'longText',
      defaultValue: 'Domain-specific description'
    },
    {
      name: 'primaryCtaText',
      type: 'string',
      defaultValue: 'Call to action'
    },
    {
      name: 'primaryCtaUrl',
      type: 'string',
      defaultValue: '#contact'
    },
    {
      name: 'backgroundColor',
      type: 'color',
      defaultValue: '#ffffff'
    }
    // ... more inputs matching component props
  ]
}
```

**Input Types Reference**:
- `type: 'string'` - Text input
- `type: 'longText'` - Textarea
- `type: 'color'` - Color picker
- `type: 'boolean'` - Toggle switch
- `type: 'number'` - Number input
- `type: 'text', enum: [...]` - Dropdown (NOT `type: 'list'`!)
- `type: 'file'` - File upload (e.g., images)

**Dropdown Example** (IMPORTANT: enum requires `type: 'text'`):
```typescript
{
  name: 'variant',
  type: 'text',  // NOT 'list'!
  enum: ['primary', 'secondary', 'gradient'],
  defaultValue: 'primary'
}
```

---

## 📝 Step-by-Step Implementation

### Step 1: Parse Arguments

Extract domain and section type from `#$ARGUMENTS`:
- Format: `[domain] [SectionType]`
- Example: `gym-linden Hero`
- Domain: `gym-linden`
- Section Type: `Hero`
- Component Name: `GymLindenHero.vue`

### Step 2: Verify Prerequisites

1. **Check domain folder**:
   ```bash
   ls components/[domain]/
   ```

2. **Verify Section Component exists**:
   ```bash
   ls components/design-system-section-components/[SectionType].vue
   ```

3. **Check for existing Content Wrapper**:
   ```bash
   ls components/[domain]/[Domain][SectionType].vue
   ```

### Step 3: Analyze Section Component

1. **Read Section Component** to understand:
   - Available props and their types
   - Required vs optional props
   - Default values
   - Special features (slots, computed props, etc.)

2. **Example Analysis**:
   ```typescript
   // From Hero.vue
   interface Props {
     headline?: string
     subheadline?: string
     primaryCtaText?: string
     primaryCtaUrl?: string
     heroImage?: string
     backgroundColor?: string
     // ... more props
   }
   ```

### Step 4: Create Content Wrapper

1. **Create file**: `components/[domain]/[Domain][SectionType].vue`

2. **Use Template Pattern**:
   ```vue
   <template>
     <SectionComponent
       v-bind="$props"
     />
   </template>

   <script setup lang="ts">
   import SectionComponent from '~/components/design-system-section-components/SectionComponent.vue'

   // Copy Props interface from Section Component
   interface Props {
     // ... all props
   }

   const props = withDefaults(defineProps<Props>(), {
     // Domain-specific defaults
   })
   </script>
   ```

3. **Add Domain-Specific Defaults**:
   - Replace generic defaults with domain-specific content
   - Use domain's brand voice and messaging
   - Include realistic example data
   - Set appropriate colors/images for domain

### Step 5: Register in Builder.io

1. **Open**: `plugins/custom-components.ts`

2. **Add Import** (at top with other domain imports):
   ```typescript
   import DomainSectionType from '~/components/[domain]/DomainSectionType.vue'
   ```

3. **Add Registration** (in components array):
   ```typescript
   {
     component: DomainSectionType,
     name: 'DomainSectionType',
     inputs: [
       // Map all props to Builder.io inputs
     ]
   }
   ```

4. **Group with Domain Components**:
   - Keep domain components together in file
   - Add comment header if starting new domain section

### Step 6: Testing

1. **Visual Check**:
   - Verify file created in correct location
   - Check syntax (no TypeScript errors)
   - Confirm imports are correct

2. **Builder.io Integration**:
   - Component appears in Builder.io editor
   - All props editable in UI
   - Default values display correctly
   - Changes in Builder.io reflect in preview

3. **Responsive Test**:
   - Check mobile view
   - Check tablet view
   - Check desktop view

---

## ✅ Pre-Commit Checklist

**File Structure**:
- [ ] Component in correct folder: `components/[domain]/[Name].vue`
- [ ] Naming follows pattern: `[Domain][SectionType].vue`
- [ ] Section Component imported correctly

**Content Wrapper Quality**:
- [ ] Uses Section Component internally (preferred)
- [ ] Props interface matches Section Component
- [ ] Domain-specific defaults set for all props
- [ ] Default values realistic and showcase-worthy
- [ ] No hardcoded content (everything as props)

**Builder.io Registration**:
- [ ] Import added to `custom-components.ts`
- [ ] Registration object complete
- [ ] All props mapped to inputs
- [ ] Input types correct (especially dropdowns: `type: 'text', enum`)
- [ ] Default values match component defaults
- [ ] Component name is descriptive and unique

**Code Quality**:
- [ ] TypeScript types correct
- [ ] No console errors
- [ ] Follows CLAUDE.md guidelines
- [ ] Design tokens used (no hardcoded colors)
- [ ] Responsive design implemented

**Testing**:
- [ ] Component renders without errors
- [ ] Props can be edited in Builder.io
- [ ] Responsive on all screen sizes
- [ ] Content displays correctly

---

## 🚀 Common Content Wrapper Patterns

### 1. Hero Content Wrapper

```vue
<template>
  <Hero
    :headline="headline"
    :subheadline="subheadline"
    :hero-image="heroImage"
    :hero-image-alt="heroImageAlt"
    :primary-cta-text="primaryCtaText"
    :primary-cta-url="primaryCtaUrl"
    :secondary-cta-text="secondaryCtaText"
    :secondary-cta-url="secondaryCtaUrl"
    :show-stats="showStats"
    :statistics="statistics"
    :background-color="backgroundColor"
  />
</template>

<script setup lang="ts">
import Hero from '~/components/design-system-section-components/Hero.vue'

interface Statistic {
  value: number
  label: string
  suffix: string
  variant: 'minimal' | 'default'
}

const props = withDefaults(defineProps<{
  headline?: string
  subheadline?: string
  heroImage?: string
  heroImageAlt?: string
  primaryCtaText?: string
  primaryCtaUrl?: string
  secondaryCtaText?: string
  secondaryCtaUrl?: string
  showStats?: boolean
  statistics?: Statistic[]
  backgroundColor?: string
}>(), {
  headline: 'Domain-specific headline with <span class="text-gradient-warm">highlight</span>',
  subheadline: 'Compelling domain-specific description',
  heroImage: 'https://images.unsplash.com/photo-XXXXX',
  heroImageAlt: 'Domain-specific alt text',
  primaryCtaText: 'Primary Action',
  primaryCtaUrl: '#action',
  secondaryCtaText: 'Learn More',
  secondaryCtaUrl: '#details',
  showStats: true,
  statistics: () => [
    { value: 100, label: 'Metric 1', suffix: '+', variant: 'minimal' },
    { value: 50, label: 'Metric 2', suffix: '%', variant: 'minimal' }
  ],
  backgroundColor: '#0f0f0f'
})
</script>
```

### 2. USPGrid Content Wrapper

```vue
<template>
  <USPGrid
    :tagline="tagline"
    :headline="headline"
    :description="description"
    :columns="columns"
    :background-color="backgroundColor"
    :show-cta="showCta"
  >
    <USPCard
      v-for="(card, index) in uspCards"
      :key="index"
      :title="card.title"
      :description="card.description"
      :variant="card.variant"
      :badge="card.badge"
      :link-text="card.linkText"
      :link-url="card.linkUrl"
    >
      <template #icon>
        <svg class="w-8 h-8" :class="card.iconClass" fill="currentColor" viewBox="0 0 20 20">
          <path :d="card.iconPath" />
        </svg>
      </template>
    </USPCard>
  </USPGrid>
</template>

<script setup lang="ts">
import USPGrid from '~/components/design-system-section-components/USPGrid.vue'
import USPCard from '~/components/design-system-ui-components/USPCard.vue'

interface USPCard {
  title: string
  description: string
  variant: 'primary' | 'secondary' | 'gradient' | 'outline'
  badge?: string
  linkText?: string
  linkUrl?: string
  iconClass: string
  iconPath: string
}

const props = withDefaults(defineProps<{
  tagline?: string
  headline?: string
  description?: string
  columns?: '2' | '3' | '4'
  backgroundColor?: 'white' | 'gray' | 'dark'
  showCta?: boolean
  uspCards?: USPCard[]
}>(), {
  tagline: 'Domain Tagline',
  headline: 'Domain-specific USP headline',
  description: 'Why choose us - domain-specific value proposition',
  columns: '3',
  backgroundColor: 'white',
  showCta: false,
  uspCards: () => [
    {
      title: 'USP 1',
      description: 'Domain-specific benefit explanation',
      variant: 'primary',
      iconClass: 'text-orange-600',
      iconPath: 'M10 18a8 8 0 100-16 8 8 0 000 16z'
    },
    {
      title: 'USP 2',
      description: 'Another domain-specific benefit',
      variant: 'gradient',
      badge: 'Popular',
      iconClass: 'text-white',
      iconPath: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462z'
    },
    // ... more cards
  ]
})
</script>
```

### 3. FAQ Content Wrapper

```vue
<template>
  <FAQ
    :headline="headline"
    :description="description"
    :faqs="faqs"
    :background-color="backgroundColor"
  />
</template>

<script setup lang="ts">
import FAQ from '~/components/design-system-section-components/FAQ.vue'

interface FAQItem {
  question: string
  answer: string
}

const props = withDefaults(defineProps<{
  headline?: string
  description?: string
  faqs?: FAQItem[]
  backgroundColor?: string
}>(), {
  headline: 'Häufig gestellte Fragen',
  description: 'Domain-specific FAQ introduction',
  faqs: () => [
    {
      question: 'Domain-specific question 1?',
      answer: 'Detailed answer with domain context.'
    },
    {
      question: 'Domain-specific question 2?',
      answer: 'Another detailed answer.'
    }
    // ... more FAQs
  ],
  backgroundColor: '#ffffff'
})
</script>
```

---

## 🔍 Troubleshooting

### Common Issues

**1. Component not showing in Builder.io**
- ✅ Check registration in `custom-components.ts`
- ✅ Verify import path is correct
- ✅ Ensure component name is unique
- ✅ Restart dev server: `yarn dev`

**2. Props not editable in Builder.io**
- ✅ Check inputs array in registration
- ✅ Verify input names match prop names
- ✅ Ensure correct input types
- ✅ Add default values for all inputs

**3. Section Component not found**
- ✅ Check Section Component exists in `design-system-section-components/`
- ✅ Verify import path is correct
- ✅ Check for typos in component name
- ✅ Create Section Component first if missing

**4. TypeScript errors**
- ✅ Props interface matches Section Component
- ✅ Default values match prop types
- ✅ Array defaults use arrow function: `() => []`
- ✅ Enum values match TypeScript union types

**5. Styling issues**
- ✅ Section Component handles all styling
- ✅ Don't override Section Component styles
- ✅ Use design tokens and Tailwind classes
- ✅ Check responsive breakpoints

---

## 📚 Reference Links

**Related Commands**:
- `/create-website-section` - Create generic Section Components
- Project Guidelines: `CLAUDE.md`
- Design System: `assets/css/global.css`

**Component Locations**:
- UI Components: `components/design-system-ui-components/`
- Section Components: `components/design-system-section-components/`
- Content Wrappers: `components/[domain]/`
- Registration: `plugins/custom-components.ts`

---

## 🚀 Implementation

Now create the Content Wrapper component based on the arguments provided. Follow all guidelines, use the appropriate Section Component internally, add domain-specific defaults, and register in Builder.io.

**Remember**:
1. Parse arguments to get domain and section type
2. Verify Section Component exists
3. Create Content Wrapper using template pattern
4. Add realistic domain-specific defaults
5. Register in `custom-components.ts`
6. Test in Builder.io editor

Keep the code clean, reusable, and following the 3-Tier Architecture from CLAUDE.md!
