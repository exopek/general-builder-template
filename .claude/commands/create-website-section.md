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
- `type: 'string'` - Text input
- `type: 'color'` - Color picker
- `type: 'boolean'` - Toggle
- `type: 'text', enum: [...]` - Dropdown (NOT `type: 'list'`!)
- `type: 'longText'` - Textarea
- `type: 'number'` - Number input

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

1. **Check `global.css`** for existing utility classes
2. **Use Tailwind utilities** (avoid custom CSS)
3. **Avoid `.card` class** - use individual utilities
4. **Test contrast** of all text elements
5. **Add responsive classes** (mobile-first)

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

**Template Structure** (for sections with backgroundColor):
- [ ] Outer div with `:style="{ backgroundColor }"`
- [ ] Inner div with `.container` class
- [ ] TWO closing `</div>` tags present
- [ ] No unclosed tags

**Builder.io** (Section Components only):
- [ ] Component imported in `custom-components.ts`
- [ ] Registration object added
- [ ] All props have input definitions
- [ ] Correct input types used (no `type: 'list'`)
- [ ] Meaningful default values set

**Accessibility**:
- [ ] Semantic HTML used (h1-h6, section, article, etc.)
- [ ] Links have hover states
- [ ] Buttons have proper text/aria-labels
- [ ] Images have alt text (if applicable)

**Testing**:
- [ ] Component renders correctly
- [ ] All props work as expected
- [ ] Responsive on mobile/tablet/desktop
- [ ] Works in Builder.io editor (if registered)

---

## 🚀 Implementation

Now create the component with all guidelines above in mind. Think carefully about:

1. **Component architecture** (UI vs Section vs Content Wrapper)
2. **Location** (design-system-ui-components/ vs design-system-section-components/ vs domain/)
3. **Naming** (NO "Base" prefix for new components)
4. **Template structure** (proper wrapper divs)
5. **Styling** (tokens, Tailwind, no `.card` class)
6. **Contrast** (text colors vs backgrounds)
7. **Responsiveness** (mobile-first)
8. **Builder.io integration** (only sections & wrappers, proper inputs)

Keep the implementation clean, reusable, and following all design system principles from CLAUDE.md.
