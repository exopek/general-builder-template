```markdown
# CLAUDE.md

This document serves as **persistent context for language models** (Claude, ChatGPT, etc.) working on code in this repository.  
It contains **mandatory guidelines** for architecture, styling, deployment, and component development.  
👉 **Every new coding task MUST reference this file.**

---

## Development Commands

**Core Development:**
```bash
yarn dev       # Start development server on localhost:3000
yarn build     # Build application for production
yarn generate  # Generate static files
yarn preview   # Preview production build locally
```

**Package Management:**
- Package manager: `yarn@1.22.22` (locked via yarn.lock)

---

## Technical Architecture

### Core Stack
- **Framework:** Nuxt.js 3 + TypeScript
- **State Management:** Pinia stores
- **Styling:** Tailwind CSS + global.css (Design Tokens)
- **CMS/Content:** Builder.io
- **Deployment:** Cloudflare Pages (via wrangler.toml)

### Builder.io Integration
- Builder.io-first architecture with strong design token system
- Custom components registered in `plugins/custom-components.ts`
- Props & Input Schemas defined for Builder.io Editor
- Only registered components appear in the visual editor
- { name: 'position', type: 'list', enum: ['top-right', 'top-left', 'bottom-right', 'bottom-left'], defaultValue: 'top-right' }, this dont work, only
    subfields with a key value paire works for a list. enum: ['top-right', 'top-left', 'bottom-right', 'bottom-left'] is for builder.io not readable.
- For a Dropdown to select values this is the way: type: 'text', enum: ['image', 'content'], defaultValue: 'image'

---

## Project Structure

```
pages/
  index.vue        # Home
  [slug].vue       # Dynamic Builder.io pages

components/
  base/            # Primitives (Button, Input, Card, Icon)
  layout/          # Header, Footer, Grid
  composite/       # Combined elements (e.g. FormSections)
  feature/         # Domain-specific features (e.g. GymOfferCard)
  builder/         # Components prepared for Builder.io

config/
  nuxt.config.ts   # Nuxt + Cloudflare + Builder.io
  wrangler.toml    # Cloudflare deployment
```

---

## Cloudflare Pages Optimization

- Nitro preset: `cloudflare-pages`
- Hydration mismatch prevention enabled
- Route-specific caching for static/dynamic content
- Prerendered routes: `/kurse`, `/preise`, `/team`
- Builder.io content routes use SSR with caching headers

---

## Design Token Architecture

**Token Categories:**
- Colors (brand + semantic palette)
- Typography (fonts, sizes, weights)
- Spacing & sizing
- Shadows, border radius, z-index
- Component-specific tokens
- Responsive breakpoints

👉 **Tokens in `assets/css/global.css` have highest priority** (before Tailwind utilities).

---

## Design System & Component Structure

**Goal:** Build a Design System with reusable components, consistent across all pages, dashboards, and Builder.io integrations.

### Principles

**Atomic Design (lightweight)**
- **Base** = primitives (Button, Input, Card, Icon)
- **Composite** = combinations of Base/Layout
- **Feature** = domain-specific, built on Base/Composite

**Reusability**
- No single-use components
- Props & slots for flexible variations

**Design Tokens First**
- Colors, spacing, typography only via tokens
- No hardcoded values (#hex, px, etc.)

**Builder.io Compatibility**
- Props must have defaults for visual editor
- Always register in `custom-components.ts`

---

## Component Rules

- Always check `base/` before creating a new component
- Use props instead of variant-specific classes (`<Button variant="primary" />`)
- Templates under 80 lines → split if larger
- Document props with JSDoc/TS comments

---

## Development Patterns

### Adding New Builder.io Components

1. Create Vue component (`components/builder/`)
2. Register in `plugins/custom-components.ts`
3. Define input schema + props
4. Test in Builder.io editor
5. Document component props

---

## Environment Configuration

- **API Key:** `BUILDER_API_KEY`
- Configured in `nuxt.config.ts` + `wrangler.toml`
- Handle dev vs prod environments

---

## UI Development Style Guide

### Design Philosophy
- Minimal, grid-based
- Rounded corners, glassmorphism, gradients
- Bold headlines, sporty visuals
- Consistent across marketing site, dashboards, admin panels

### CSS Framework Usage
- **Primary:** Tailwind CSS utilities
- **Priority:** Tokens First → then Tailwind → then custom CSS
- **Never** inline styles or hardcoded values

---

## Component Development Rules

- Reuse before creating new
- Create base component before creating specific component, then reuse base component to create specific
- Props + slots for variations
- Accessible markup (semantic HTML, ARIA)

---

## Responsive Design

- Mobile-first
- Container max-width: `var(--container-max-width)` (1200px)
- Use responsive padding defined in `global.css`

---

## Animation & Transitions

- Use variables: `--transition-fast`, `--transition-normal`, `--transition-slow`
- Prebuilt classes: `.fade-in`, `.slide-up`

---

## Builder.io Component Guidelines

- Keep templates simple
- Always use design tokens
- Provide meaningful input schemas
- Test in the visual editor
- Document props

---

## Code Review Checklist

- ✅ Uses design tokens (no hardcoded values)
- ✅ Reuses existing components when possible
- ✅ Tailwind utility-first approach
- ✅ Template within size guidelines
- ✅ Responsive & accessible
- ✅ Proper Builder.io registration

---

## Key File Dependencies

- `plugins/custom-components.ts` → Builder.io registration
- `nuxt.config.ts` → Nuxt + Cloudflare + Builder.io config
- `specs/plan.md` → Roadmap for gym booking system

---

## Future Development Notes

See `specs/plan.md` for planned features:
- Authentication & roles
- Course booking system
- Admin panel
- Pinia stores for API communication
- Separate user & admin dashboards

---

## 🔑 Quick Reference / TL;DR

```
✅ Use design tokens from global.css
✅ Structure components into base/composite/feature
✅ Props + slots for variations, no duplication
✅ Always register Builder.io components in custom-components.ts
✅ Reuse existing components before creating new ones

❌ No inline styles or hardcoded colors (#hex)
❌ No oversized templates (>80 lines)
❌ No one-off components built only for a single page
```
```