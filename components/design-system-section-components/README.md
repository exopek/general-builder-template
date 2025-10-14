# Design System - Section Components

Complete, standalone sections for Builder.io.

## Purpose

These components are **REGISTERED in Builder.io** and available in the visual editor. They are generic, reusable sections without domain-specific content.

## Naming Convention

- **NO "Base" prefix** (e.g., `Hero.vue`, not `BaseHero.vue`)
- Descriptive names that explain the section's purpose
- Example: `ContactSection.vue`, `TimelineSection.vue`, `GalleryGrid.vue`

## Component Categories

### Hero Sections
- `Hero.vue` - Basic hero section
- `HeroImage.vue` - Hero with background image

### Content Sections
- `ContentSection48.vue` - 48/52 split layout
- `ContentBentoGrid.vue` - Bento-style grid
- `ContentImageGrid.vue` - Image + content grid
- `ContentStatsGallery.vue` - Stats with gallery

### Feature Sections
- `AlternatingFeatures.vue` - Alternating left/right features
- `FeatureGrid.vue` - Grid of features
- `FeatureShowcase.vue` - Feature showcase
- `BentoGrid.vue` - Bento-style feature grid

### Interactive Sections
- `FAQ.vue` - FAQ accordion section
- `Timeline.vue` - Timeline section
- `ComparisonTable.vue` - Comparison table

### Call-to-Action
- `CTA.vue` - Call-to-action section
- `USPGrid.vue` - USP grid

### Gallery
- `GalleryGrid.vue` - Gallery grid
- `GallerySection.vue` - Gallery section

### Statistics
- `Statistic.vue` - Individual statistic
- `StatisticGrid.vue` - Statistics grid
- `StatsFeatureCards.vue` - Stats + features

### Privacy Sections
- `PrivacyHeroSection.vue`
- `PrivacyOverviewSection.vue`
- `PrivacyResponsibleSection.vue`
- `PrivacyHostingSection.vue`
- `PrivacyDataCollectionSection.vue`
- `PrivacyNewsletterSection.vue`
- `PrivacyPluginsSection.vue`
- `PrivacyRightsSection.vue`
- `PrivacyContactSection.vue`
- `PrivacyQuickAction.vue`

### Other
- `ScheduleSection.vue` - Schedule display
- `ConsentBanner.vue` - Cookie consent

**Total: 32 Section Components**

## Usage in Builder.io

1. Open Builder.io editor
2. Click "Insert" → "Custom Components"
3. Select desired section (e.g., "Hero", "FAQ")
4. Configure props in the right panel
5. Add your content

## Usage in Code

```vue
<script setup>
import Hero from '~/components/design-system-section-components/Hero.vue'
import FAQ from '~/components/design-system-section-components/FAQ.vue'
</script>

<template>
  <div>
    <Hero
      headline="Welcome"
      subheadline="Get started today"
      backgroundColor="#f5f5f5"
    />

    <FAQ
      title="Frequently Asked Questions"
      :items="faqItems"
    />
  </div>
</template>
```

## Guidelines

- **Generic Content**: No domain-specific content
- **Reusable**: Must work in multiple contexts
- **Builder.io Ready**: All props have meaningful defaults
- **UI Components**: Use components from `design-system-ui-components/`
- **Design Tokens**: Use only tokens from `global.css`
- **Props**: Provide backgroundColor, title, and other common props
- **Documentation**: Document all props with defaults

## Creating New Section Components

1. Check if a similar section already exists
2. Create component in this directory WITHOUT "Base" prefix
3. Import UI Components from `design-system-ui-components/`
4. Use design tokens, not hardcoded values
5. Provide all props with meaningful defaults
6. Register in `plugins/custom-components.ts`:
   ```typescript
   {
     component: YourSection,
     name: 'YourSection',
     inputs: [
       { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
       { name: 'title', type: 'string', defaultValue: 'Section Title' },
       // ... more inputs
     ]
   }
   ```
7. Test in Builder.io editor
8. Add to this README
