# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Core Development:**
```bash
yarn dev                  # Start development server on localhost:3000
yarn build               # Build application for production
yarn generate            # Generate static files
yarn preview             # Preview production build locally
```

**Package Management:**
- This project uses Yarn (`yarn.lock` present)
- Package manager is locked to `yarn@1.22.22`

## Technical Architecture

### Core Stack
- **Framework**: Nuxt.js 3 with TypeScript
- **State Management**: Pinia stores
- **Styling**: Tailwind CSS + global.css
- **CMS/Content**: Builder.io integration
- **Deployment**: Cloudflare Pages (via wrangler.toml)

### Builder.io Integration

**Key Architectural Concept**: This is a **Builder.io-first** application with a sophisticated design token system.

**Custom Components Registration**: 
- Custom components are registered in `plugins/custom-components.ts`
- Design tokens are extensively configured for Builder.io editor
- Components must be registered with Builder.io to appear in the visual editor

### Project Structure

**Pages**: 
- `pages/[slug].vue` - Dynamic Builder.io page handling
- `pages/index.vue` - Home page
- Uses Nuxt 3 file-based routing

**Components**:
- `components/GymOfferCard.vue` - Registered with Builder.io
- Standard Vue 3 components with TypeScript

**Configuration**:
- `nuxt.config.ts` - Complex Cloudflare Pages optimized config
- `wrangler.toml` - Cloudflare deployment config
- Builder.io API key configured in environment variables

### Cloudflare Pages Optimization

**Critical Configuration Details**:
- Nitro preset: `cloudflare-pages`
- Hydration mismatch prevention settings active
- Route-specific caching rules for static/dynamic content
- Prerendered routes: `/kurse`, `/preise`, `/team`
- Builder.io content routes use SSR with caching headers

### Design Token Architecture

**Token Categories**:
- Colors (semantic + brand palette)  
- Typography (fonts, sizes, weights)
- Spacing & Sizing
- Shadows, Border Radius, Z-index
- Component-specific tokens
- Responsive breakpoints

## Development Patterns

### Adding New Builder.io Components
1. Create Vue component in `components/`
2. Register in `plugins/custom-components.ts` with input schema
3. Define Builder.io compatible props and types
4. Test in Builder.io visual editor

### Environment Configuration
- Builder.io API key: `BUILDER_API_KEY` environment variable
- Configured in both `nuxt.config.ts` and `wrangler.toml`
- Development vs production environment handling

## UI Development Style Guide

### Design Philosophy
Minimal, grid-based, rounded corners, glassmorphism, gradients, bold display headlines, bright sporty visuals.

**Important**: This style guide applies to **both the marketing website AND the booking system**. All UI components, design tokens, and patterns should be consistent across the entire application ecosystem - from public pages to user dashboards to admin panels.

### CSS Framework Usage
- **Primary**: Tailwind CSS utility classes
- **Custom tokens**: Use CSS custom properties from `assets/css/global.css`
- **Avoid**: Inline styles or arbitrary values in Tailwind
- **Priority**: Design tokens > Tailwind utilities > Custom CSS

### Design Token Usage (from global.css)

**Colors**:
```css
/* Primary palette */
var(--color-primary)        /* #FF6B35 - main brand color */
var(--color-secondary)      /* #1B365D - dark blue */
var(--color-accent-blue)    /* #4A90E2 */
var(--color-accent-green)   /* #27AE60 */

/* Neutral colors */
var(--color-gray-50) to var(--color-gray-900)
var(--color-white)
var(--color-black)

/* Gradients */
var(--gradient-primary)     /* Primary to secondary */
var(--gradient-warm)        /* Orange to yellow */
var(--gradient-cool)        /* Blue to purple */
```

**Spacing** (use these over arbitrary Tailwind values):
```css
var(--spacing-xs)    /* 4px */
var(--spacing-sm)    /* 8px */
var(--spacing-md)    /* 16px */
var(--spacing-lg)    /* 24px */
var(--spacing-xl)    /* 32px */
var(--spacing-2xl)   /* 40px */
/* Also: --space-3, --space-4, --space-6, --space-8, --space-16 */
```

**Typography**:
```css
var(--font-family-primary)  /* Fira Sans stack */
var(--font-family-display)  /* Comfortaa display font */
var(--font-size-xs) to var(--font-size-6xl)
var(--font-weight-light) to var(--font-weight-black)
```

### Component Development Rules

**1. Reuse Before Creating**
- Check `components/` folder for existing base components
- Prefer composition over duplication
- Use slots and props for component variants

**2. Component Organization**
```
components/
├── base/           # Reusable primitives (buttons, cards, inputs)
├── layout/         # Layout components (header, footer)
├── feature/        # Feature-specific components
└── GymOfferCard.vue # Builder.io registered components
```

**3. Template Size Guidelines**
- **Single component**: Max 50-80 lines template
- **Large templates**: Split into smaller composable components
- **Builder.io components**: Keep simple for visual editor

**4. Tailwind CSS Best Practices**

**Preferred utility class patterns**:
```vue
<!-- Good: Use design tokens via utility classes -->
<div class="bg-white rounded-xl shadow-md p-6">
  <h2 class="text-2xl font-bold text-gray-800">Title</h2>
</div>

<!-- Better: Use CSS custom properties when available -->
<div class="card">  <!-- Pre-defined in global.css -->
  <h2 class="text-2xl font-bold">Title</h2>
</div>
```

**Avoid**:
```vue
<!-- Don't use arbitrary values -->
<div class="bg-[#FF6B35] rounded-[12px] p-[24px]">

<!-- Don't duplicate complex styles -->
<div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
<div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
```

**5. Pre-built Component Classes (from global.css)**

Use these instead of building from scratch:
```css
/* Buttons */
.btn, .btn-primary, .btn-secondary, .btn-ghost

/* Cards */
.card, .card-glass

/* Navigation */
.nav-pill

/* Stats */
.stat-card, .stat-number, .stat-label

/* Progress */
.progress-bar, .progress-fill

/* Avatar */
.avatar, .avatar-group
```

**6. Responsive Design**
- Mobile-first approach with Tailwind breakpoints
- Use container max-width: `var(--container-max-width)` (1200px)
- Test on mobile, tablet, desktop

**Container Classes - Responsive Layout Best Practices**:

**Preferred approach for responsive containers**:
```vue
<!-- GOOD: Use container with responsive padding -->
<div class="container mx-auto">
  <div class="max-w-4xl mx-auto">
    <!-- Content -->
  </div>
</div>
```

**How the container class works in global.css**:
```css
.container {
  max-width: var(--container-max-width); /* 1200px */
  margin: 0 auto;
  width: 100%;                          /* Responsive: 100% width up to max-width */
  padding: 0 var(--spacing-md);         /* Base padding: 16px */
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--spacing-lg);       /* Tablet+: 24px padding */
  }
}
```

**Container responsive behavior**:
- **Mobile (375px)**: `width: 100%` = 375px with 16px padding
- **Tablet (768px)**: `width: 100%` = 768px with 24px padding
- **Desktop (1024px+)**: `width: 100%` up to max 1200px
- **Large screens**: Capped at 1200px max-width, centered

**Common container patterns**:
```vue
<!-- Basic container with responsive padding -->
<div class="container mx-auto">

<!-- Container with content width constraint -->
<div class="container mx-auto">
  <div class="max-w-4xl mx-auto">
    <!-- Long-form content like blog posts -->
  </div>
</div>

<!-- Container with section-specific constraints -->
<div class="container mx-auto">
  <div class="max-w-2xl mx-auto text-center">
    <!-- Error states, forms, centered content -->
  </div>
</div>
```

**AVOID these container anti-patterns**:
```vue
<!-- DON'T: Use w-full without max-width on large screens -->
<div class="w-full px-4">  <!-- Content gets too wide on desktop -->

<!-- DON'T: Use fixed container padding without responsiveness -->
<div class="container mx-auto px-4">  <!-- Same padding on all screens -->

<!-- DON'T: Mix container with width overrides -->
<div class="container w-screen">  <!-- Conflicts with container logic -->
```

**7. Animation & Transitions**
```css
/* Use predefined transitions */
var(--transition-fast)    /* 150ms */
var(--transition-normal)  /* 300ms */
var(--transition-slow)    /* 500ms */

/* Animation classes available */
.fade-in, .slide-up
```

### Builder.io Component Guidelines

**When creating Builder.io components**:
1. Keep templates simple and focused
2. Use design tokens for consistent theming
3. Provide meaningful input schemas
4. Test in Builder.io visual editor
5. Document component props and usage

**Example structure**:
```vue
<template>
  <div class="card">
    <h3 class="text-xl font-semibold">{{ title }}</h3>
    <p class="text-gray-600">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
}
defineProps<Props>()
</script>
```

### Code Review Checklist

- [ ] Uses design tokens over hardcoded values
- [ ] Reuses existing components where possible
- [ ] Follows Tailwind utility-first approach
- [ ] Template is reasonably sized (consider splitting)
- [ ] Responsive design implemented
- [ ] Accessible markup (semantic HTML, ARIA)
- [ ] Builder.io components are registered properly  

## Key File Dependencies

- `plugins/custom-components.ts` → Builder.io component registration
- `types/design-tokens.ts` → TypeScript definitions for token system
- `nuxt.config.ts` → Cloudflare Pages + Builder.io configuration
- `specs/plan.md` → Detailed implementation roadmap for gym booking system

## Future Development Notes

The `specs/plan.md` file contains a comprehensive plan for expanding this into a full gym booking system with:
- User authentication and role-based areas
- Course booking functionality  
- Admin panel for course management
- Pinia stores for API communication
- Separate user and admin dashboards

When implementing new features, follow the phase-based approach outlined in the specifications.