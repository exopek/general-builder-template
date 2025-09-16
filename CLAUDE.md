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
1. Create Vue component in `components/website`
2. Register in `plugins/custom-components.ts` with input schema
3. Define Builder.io compatible props and types
4. Test in Builder.io visual editor

### Environment Configuration
- Builder.io API key: `BUILDER_API_KEY` environment variable
- Configured in both `nuxt.config.ts` and `wrangler.toml`
- Development vs production environment handling

## Style
Minimal, grid-based, rounded corners, glassmorphism, gradients, bold display headlines, bright sporty visuals.  

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