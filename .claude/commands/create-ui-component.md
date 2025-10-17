# Create UI Component (Design System)

**Task**: Create a new UI component in the Design System using **only Design Tokens** from global.css: #$ARGUMENTS

Expected format: `[ComponentName] [brief description]` (e.g., `Badge small label component`)

---

## 🎯 Design Token Philosophy

**CRITICAL PRINCIPLE**: The entire visual design must be controllable through `global.css` only.

### Why Design Tokens?

By using **only CSS variables** from global.css:
- ✅ Change the entire theme by editing ONE file (global.css)
- ✅ No hardcoded colors scattered across components
- ✅ Consistent design language
- ✅ Easy theme switching (light/dark mode)
- ✅ Maintainable and scalable

### What NOT to do:

```vue
<!-- ❌ WRONG: Hardcoded Tailwind colors -->
<div class="bg-orange-500 text-white border-gray-300">

<!-- ❌ WRONG: Inline styles with hex colors -->
<div style="background: #FF6B35; color: #ffffff;">

<!-- ❌ WRONG: Component-specific color values -->
<div class="bg-gradient-to-br from-orange-500 to-red-600">
```

### What TO do:

```vue
<!-- ✅ CORRECT: global.css utility classes -->
<div class="bg-primary text-white border-gray-300">

<!-- ✅ CORRECT: CSS variables from global.css -->
<div :style="{ background: 'var(--color-primary)', color: 'var(--color-white)' }">

<!-- ✅ CORRECT: Gradient classes from global.css -->
<div class="bg-gradient-warm">

<!-- ✅ CORRECT: Component-specific classes that use variables -->
<style scoped>
.custom-element {
  background: var(--color-primary);
  border-color: var(--color-gray-300);
  padding: var(--spacing-md);
}
</style>
```

---

## 📦 Available Design Tokens (from global.css)

### Colors

**Primary & Secondary:**
```css
var(--color-primary)        /* #FF6B35 - Orange */
var(--color-primary-light)  /* #FF8F66 */
var(--color-primary-dark)   /* #E55A2B */
var(--color-secondary)      /* #1B365D - Navy Blue */
var(--color-secondary-light)
var(--color-secondary-dark)
```

**Accent Colors:**
```css
var(--color-accent-blue)    /* #4A90E2 */
var(--color-accent-purple)  /* #7B68EE */
var(--color-accent-green)   /* #27AE60 */
var(--color-accent-yellow)  /* #F1C40F */
```

**Neutral/Gray Scale:**
```css
var(--color-white)          /* #FFFFFF */
var(--color-gray-50)        /* Lightest gray */
var(--color-gray-100)
var(--color-gray-200)
var(--color-gray-300)
var(--color-gray-400)
var(--color-gray-500)       /* Medium gray */
var(--color-gray-600)
var(--color-gray-700)
var(--color-gray-800)
var(--color-gray-900)       /* Darkest gray */
var(--color-black)          /* #000000 */
```

**Gradients:**
```css
var(--gradient-primary)     /* Primary to Secondary */
var(--gradient-secondary)   /* Blue to Purple */
var(--gradient-warm)        /* Orange gradient */
var(--gradient-cool)        /* Blue gradient */
```

### Utility Classes for Colors

Use these instead of Tailwind color classes:

```css
/* Text Colors */
.text-primary       /* Orange text */
.text-secondary     /* Navy text */
.text-white
.text-gray-200
.text-gray-500
.text-gray-700
.text-gray-900

/* Background Colors */
.bg-primary         /* Orange background */
.bg-secondary       /* Navy background */
.bg-white
.bg-gray-50
.bg-gray-100

/* Gradients */
.bg-gradient-primary
.bg-gradient-secondary
.bg-gradient-warm
.bg-gradient-cool

/* Text Gradients */
.text-gradient-warm
.text-gradient-primary
.text-gradient-secondary
.text-gradient-cool
```

### Typography

**Font Families:**
```css
var(--font-family-primary)  /* Fira Sans */
var(--font-family-display)  /* Comfortaa */
```

**Font Weights:**
```css
var(--font-weight-light)    /* 300 */
var(--font-weight-regular)  /* 400 */
var(--font-weight-medium)   /* 500 */
var(--font-weight-semibold) /* 600 */
var(--font-weight-bold)     /* 700 */
var(--font-weight-black)    /* 900 */
```

**Font Sizes:**
```css
var(--font-size-xs)    /* 12px */
var(--font-size-sm)    /* 14px */
var(--font-size-base)  /* 16px */
var(--font-size-lg)    /* 18px */
var(--font-size-xl)    /* 20px */
var(--font-size-2xl)   /* 24px */
var(--font-size-3xl)   /* 30px */
var(--font-size-4xl)   /* 36px */
var(--font-size-5xl)   /* 48px */
var(--font-size-6xl)   /* 60px */
```

**Utility Classes:**
```css
.text-xs, .text-sm, .text-base, .text-lg, .text-xl,
.text-2xl, .text-3xl, .text-4xl, .text-5xl, .text-6xl

.font-light, .font-regular, .font-medium,
.font-semibold, .font-bold, .font-black
```

### Spacing

**CSS Variables:**
```css
var(--spacing-xs)   /* 4px */
var(--spacing-sm)   /* 8px */
var(--spacing-md)   /* 16px */
var(--spacing-lg)   /* 24px */
var(--spacing-xl)   /* 32px */
var(--spacing-2xl)  /* 40px */
var(--spacing-3xl)  /* 48px */
var(--spacing-4xl)  /* 64px */
var(--spacing-5xl)  /* 80px */
```

**Utility Classes:**
```css
/* Margin */
.m-0, .m-1, .m-2, .m-3, .m-4, .m-6, .m-8
.mt-0, .mt-1, .mt-2, .mt-3, .mt-4, .mt-6, .mt-8, .mt-12, .mt-16
.mb-0, .mb-1, .mb-2, .mb-3, .mb-4, .mb-6, .mb-8, .mb-12
.ml-0, .ml-1, .ml-2, .ml-3, .ml-4
.mr-0, .mr-1, .mr-2, .mr-3, .mr-4

/* Padding */
.p-0, .p-1, .p-2, .p-3, .p-4, .p-6, .p-8
.pt-0, .pt-1, .pt-2, .pt-4, .pt-8, .pt-12
.pb-0, .pb-1, .pb-2, .pb-4, .pb-8, .pb-12
.pl-0, .pl-1, .pl-2, .pl-4, .pl-6
.pr-0, .pr-1, .pr-2, .pr-4, .pr-6
.px-0, .px-1, .px-2, .px-3, .px-4, .px-6
.py-0, .py-1, .py-2, .py-3, .py-4

/* Gap */
.gap-1, .gap-2, .gap-3, .gap-4, .gap-6, .gap-8
```

### Borders & Radius

**Border Radius:**
```css
var(--border-radius-sm)    /* 4px */
var(--border-radius-md)    /* 8px */
var(--border-radius-lg)    /* 12px */
var(--border-radius-xl)    /* 16px */
var(--border-radius-2xl)   /* 24px */
var(--border-radius-full)  /* 9999px - pill shape */
```

**Utility Classes:**
```css
.rounded-sm, .rounded-md, .rounded-lg,
.rounded-xl, .rounded-2xl, .rounded-full

.border, .border-0, .border-2
.border-t, .border-b, .border-l, .border-r
.border-l-4, .border-t-4

.border-primary, .border-secondary
.border-gray-200, .border-gray-300
```

### Shadows

**CSS Variables:**
```css
var(--shadow-sm)
var(--shadow-md)
var(--shadow-lg)
var(--shadow-xl)
var(--shadow-2xl)
```

**Utility Classes:**
```css
.shadow-sm, .shadow-md, .shadow-lg,
.shadow-xl, .shadow-2xl
```

### Transitions

**CSS Variables:**
```css
var(--transition-fast)    /* 150ms ease */
var(--transition-normal)  /* 300ms ease */
var(--transition-slow)    /* 500ms ease */
```

**Utility Classes:**
```css
.transition-all
.transition-colors
.transition-transform

.duration-150, .duration-200, .duration-300
```

### Special Effects

**Glassmorphism:**
```css
var(--glass-bg)         /* rgba(255, 255, 255, 0.15) */
var(--glass-border)     /* rgba(255, 255, 255, 0.3) */
var(--glass-backdrop)   /* blur(16px) */

.card-glass  /* Pre-built glass card */
```

**Pre-built Component Classes:**
```css
.btn              /* Base button */
.btn-primary
.btn-secondary
.btn-ghost

.card             /* Base card */
.stat-card        /* Statistic card */

.nav-pill         /* Navigation pill */

.progress-bar
.progress-fill

.avatar
.avatar-group
```

---

## 🏗️ UI Component Structure

### Location
`components/design-system-ui-components/[ComponentName].vue`

### Naming Convention
- PascalCase (e.g., `Badge.vue`, not `badge.vue`)
- NO "Base" prefix (e.g., `Button.vue`, not `BaseButton.vue`)
- Descriptive and specific (e.g., `Avatar.vue`, not `Image.vue`)

### Template Pattern

```vue
<template>
  <div
    class="component-root"
    :class="[
      variantClasses,
      sizeClasses,
      customClass
    ]"
    :style="computedStyles"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  customClass: ''
})

// Use computed for dynamic classes based on props
const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    accent: 'bg-gradient-warm text-white'
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3'
  }
  return sizes[props.size]
})

// For dynamic styles, use CSS variables
const computedStyles = computed(() => ({
  // Only use CSS variables from global.css
  borderColor: 'var(--color-gray-300)',
  borderRadius: 'var(--border-radius-lg)'
}))
</script>

<style scoped>
/* Component-specific styles using Design Tokens */
.component-root {
  /* Use CSS variables, NOT hardcoded values */
  font-family: var(--font-family-primary);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-md);
}

.component-root:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(calc(-1 * var(--spacing-xs)));
}

/* NEVER do this: */
/* background: #FF6B35; ❌ */
/* padding: 16px; ❌ */
/* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); ❌ */

/* ALWAYS do this: */
/* background: var(--color-primary); ✅ */
/* padding: var(--spacing-md); ✅ */
/* box-shadow: var(--shadow-md); ✅ */
</style>
```

---

## 📋 Step-by-Step Implementation

### Step 1: Analyze Component Requirements

From the arguments, determine:
1. **Component name** (e.g., "Badge", "Chip", "Tag")
2. **Purpose** (e.g., "small label component", "status indicator")
3. **Similar existing components** - check `design-system-ui-components/` for similar patterns

**Research existing components:**
```bash
# Check what UI components already exist
ls components/design-system-ui-components/
```

Common UI component types:
- **Data Display**: Badge, Tag, Chip, Label, Tooltip
- **Inputs**: TextField, TextArea, Checkbox, Radio, Select, Switch
- **Feedback**: Alert, Toast, Banner, Spinner, Skeleton
- **Navigation**: Breadcrumb, Tabs, Pagination, Steps
- **Media**: Avatar, Image, Icon, Video
- **Layout**: Divider, Spacer, Stack, Grid

### Step 2: Define Component Props

Identify what should be customizable:

**Typical Props:**
- `variant` - Visual style (primary, secondary, success, warning, danger)
- `size` - Component size (xs, sm, md, lg, xl)
- `disabled` - Disabled state
- `loading` - Loading state
- Custom content via slots

**Example Props Interface:**
```typescript
interface Props {
  // Visual variants (map to design tokens)
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral'

  // Size variants
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  // States
  disabled?: boolean
  loading?: boolean

  // Content
  text?: string
  icon?: string

  // Styling
  rounded?: boolean
  outlined?: boolean

  // Custom
  customClass?: string
}
```

### Step 3: Map Variants to Design Tokens

For each variant, use ONLY design tokens:

```typescript
const variantClasses = computed(() => {
  const variants = {
    // Use global.css utility classes
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',

    // Or use CSS variables in :style
    // For custom combinations not in global.css
  }
  return variants[props.variant]
})

// For colors not in utility classes, use CSS variables
const variantStyles = computed(() => {
  const styles = {
    success: {
      background: 'var(--color-accent-green)',
      color: 'var(--color-white)'
    },
    warning: {
      background: 'var(--color-accent-yellow)',
      color: 'var(--color-gray-900)'
    },
    danger: {
      background: '#EF4444', // ❌ WRONG!
      color: '#ffffff'       // ❌ WRONG!
    }
  }
  return styles[props.variant] || {}
})
```

**If a color doesn't exist in global.css:**
1. **First priority**: Add it to global.css as a new design token
2. Use existing similar color from design tokens
3. Use computed style with CSS variable

**Example - Adding missing color to global.css:**
```css
/* In assets/css/global.css */
:root {
  --color-danger: #EF4444;
  --color-success: var(--color-accent-green); /* Alias existing */
}

/* Then add utility class */
.bg-danger { background-color: var(--color-danger); }
.text-danger { color: var(--color-danger); }
```

### Step 4: Implement Responsive Behavior

Use Tailwind's responsive prefixes with global.css classes:

```vue
<template>
  <div class="text-sm md:text-base lg:text-lg">
    <!-- Font size scales with breakpoints -->
  </div>

  <div class="p-2 md:p-4 lg:p-6">
    <!-- Padding scales with breakpoints -->
  </div>
</template>
```

**Available Breakpoints:**
- `md:` - min-width: 768px (tablet)
- `lg:` - min-width: 1024px (desktop)

### Step 5: Add Interactions & States

Use design token transitions:

```vue
<style scoped>
.interactive-element {
  transition: all var(--transition-normal);
  cursor: pointer;
}

.interactive-element:hover {
  transform: translateY(calc(-1 * var(--spacing-xs)));
  box-shadow: var(--shadow-lg);
}

.interactive-element:active {
  transform: translateY(0);
  box-shadow: var(--shadow-md);
}

.interactive-element.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
```

### Step 6: Add Accessibility

Ensure component is accessible:

```vue
<template>
  <button
    class="btn"
    :aria-disabled="disabled"
    :aria-label="ariaLabel || text"
    :tabindex="disabled ? -1 : 0"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space="handleClick"
  >
    <slot />
  </button>
</template>
```

**Accessibility Checklist:**
- [ ] Semantic HTML (button, input, etc.)
- [ ] ARIA labels and roles
- [ ] Keyboard navigation (Tab, Enter, Space, Arrow keys)
- [ ] Focus states (visible outline)
- [ ] Screen reader text
- [ ] Proper contrast ratios (min 4.5:1)

### Step 7: Add Slots for Flexibility

```vue
<template>
  <div class="component">
    <!-- Icon slot -->
    <span v-if="$slots.icon || icon" class="icon">
      <slot name="icon">
        <component :is="icon" />
      </slot>
    </span>

    <!-- Default slot -->
    <span class="content">
      <slot>{{ text }}</slot>
    </span>

    <!-- Action slot -->
    <span v-if="$slots.action" class="action">
      <slot name="action" />
    </span>
  </div>
</template>
```

### Step 8: Testing & Quality Check

**Visual Check:**
- [ ] All colors from design tokens
- [ ] All spacing from design tokens
- [ ] All shadows from design tokens
- [ ] Responsive on mobile/tablet/desktop
- [ ] Hover/focus states work
- [ ] Disabled state visible

**Code Quality:**
- [ ] NO hardcoded colors (no #hex, no rgb(), no Tailwind color-XXX)
- [ ] NO hardcoded spacing (no px values in styles)
- [ ] NO hardcoded shadows (no inline shadow definitions)
- [ ] TypeScript interface complete
- [ ] Props have sensible defaults
- [ ] Component name follows convention

---

## ✅ Design Token Checklist

Before finalizing the component, verify:

### Colors
- [ ] NO `bg-orange-500` or similar Tailwind colors
- [ ] NO `text-blue-600` or similar
- [ ] NO `border-red-400` or similar
- [ ] USE `bg-primary`, `text-secondary`, `border-gray-300`
- [ ] USE `var(--color-primary)` for custom colors
- [ ] USE gradient classes: `.bg-gradient-warm`, `.text-gradient-primary`

### Spacing
- [ ] NO `p-4` should be `p-4` (mapped to var(--spacing-md)) ✅
- [ ] NO `margin: 16px` in scoped styles
- [ ] USE spacing utility classes OR var(--spacing-md)
- [ ] USE `gap-4`, `mt-6`, `px-4` (these map to tokens)

### Typography
- [ ] NO `font-size: 18px` in scoped styles
- [ ] NO `font-weight: 600` with hardcoded value
- [ ] USE `.text-lg`, `.font-semibold` classes
- [ ] USE `var(--font-size-lg)`, `var(--font-weight-semibold)`

### Borders & Shadows
- [ ] NO `border-radius: 12px`
- [ ] NO `box-shadow: 0 4px 6px rgba(0,0,0,0.1)`
- [ ] USE `.rounded-lg`, `.shadow-md` classes
- [ ] USE `var(--border-radius-lg)`, `var(--shadow-md)`

### Transitions
- [ ] NO `transition: all 0.3s ease`
- [ ] USE `.transition-all` class
- [ ] USE `var(--transition-normal)` in scoped styles

### Special Cases

**If you need a color not in global.css:**

1. **Check if similar exists:**
   - Need red/danger? → Use accent-red (if exists) or add to global.css
   - Need success green? → Use `var(--color-accent-green)`

2. **Add to global.css (recommended):**
   ```css
   /* In global.css */
   --color-danger: #EF4444;

   .bg-danger { background-color: var(--color-danger); }
   .text-danger { color: var(--color-danger); }
   ```

3. **Last resort - use existing closest match:**
   - Need danger red → use `var(--color-primary)` (orange, close enough)
   - Prefer design consistency over perfect color

---

## 🎨 Component Examples

### Example 1: Badge Component

```vue
<template>
  <span
    class="inline-flex items-center font-medium transition-all"
    :class="[
      variantClasses,
      sizeClasses,
      rounded ? 'rounded-full' : 'rounded-md',
      customClass
    ]"
  >
    <slot name="icon">
      <span v-if="dot" class="dot" :style="{ background: 'var(--color-white)' }" />
    </slot>
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  variant?: 'primary' | 'secondary' | 'success' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
  dot?: boolean
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  rounded: false,
  dot: false,
  customClass: ''
})

const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    neutral: 'bg-gray-200 text-gray-700'
  }

  // For success, use CSS variable (not in utility classes)
  if (props.variant === 'success') {
    return 'text-white'
  }

  return variants[props.variant]
})

const variantStyles = computed(() => {
  if (props.variant === 'success') {
    return {
      background: 'var(--color-accent-green)'
    }
  }
  return {}
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'text-xs px-2 py-1 gap-1',
    md: 'text-sm px-3 py-1 gap-2',
    lg: 'text-base px-4 py-2 gap-2'
  }
  return sizes[props.size]
})
</script>

<style scoped>
.dot {
  width: 6px;
  height: 6px;
  border-radius: var(--border-radius-full);
}
</style>
```

**Usage:**
```vue
<Badge text="New" variant="primary" size="sm" rounded />
<Badge text="Success" variant="success" :dot="true" />
<Badge variant="secondary" size="lg">
  <template #icon>🔥</template>
  Hot Deal
</Badge>
```

---

### Example 2: Chip Component (Closeable Tag)

```vue
<template>
  <div
    class="inline-flex items-center transition-all"
    :class="[
      variantClasses,
      sizeClasses,
      'rounded-full',
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
  >
    <slot name="icon">
      <span v-if="icon" class="icon flex-shrink-0">
        <component :is="icon" />
      </span>
    </slot>

    <span class="label">
      <slot>{{ text }}</slot>
    </span>

    <button
      v-if="closeable"
      class="close-btn flex-shrink-0 transition-all"
      :disabled="disabled"
      @click="$emit('close')"
      aria-label="Remove"
    >
      <svg class="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  variant?: 'primary' | 'secondary' | 'neutral' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  closeable?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  closeable: false,
  disabled: false
})

const emit = defineEmits<{
  close: []
}>()

const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    neutral: 'bg-gray-100 text-gray-700',
    outlined: 'bg-white text-gray-700 border-2 border-gray-300'
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'text-xs px-2 py-1 gap-1',
    md: 'text-sm px-3 py-2 gap-2',
    lg: 'text-base px-4 py-2 gap-2'
  }
  return sizes[props.size]
})
</script>

<style scoped>
.close-btn {
  width: 1rem;
  height: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity var(--transition-fast);
  color: currentColor;
}

.close-btn:hover:not(:disabled) {
  opacity: 1;
}

.icon {
  width: 1rem;
  height: 1rem;
}
</style>
```

---

### Example 3: Spinner/Loading Component

```vue
<template>
  <div
    class="spinner inline-block"
    :class="sizeClasses"
    :style="spinnerStyles"
    role="status"
    aria-label="Loading"
  >
    <svg class="animate-spin" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="10"
        :stroke="trackColor"
        stroke-width="4"
        class="opacity-25"
      />
      <path
        :fill="fillColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'white' | 'current'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'primary'
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }
  return sizes[props.size]
})

const trackColor = computed(() => {
  const colors = {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    white: 'var(--color-white)',
    current: 'currentColor'
  }
  return colors[props.variant]
})

const fillColor = computed(() => {
  return trackColor.value
})

const spinnerStyles = computed(() => ({
  // All styling through CSS, no hardcoded values
}))
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
```

---

## 🚨 Common Mistakes & Fixes

### Mistake 1: Using Tailwind Color Classes

```vue
<!-- ❌ WRONG -->
<div class="bg-orange-500 text-white border-blue-300">

<!-- ✅ CORRECT -->
<div class="bg-primary text-white border-gray-300">
```

### Mistake 2: Hardcoded Values in Scoped Styles

```vue
<style scoped>
/* ❌ WRONG */
.my-element {
  background: #FF6B35;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* ✅ CORRECT */
.my-element {
  background: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
}
</style>
```

### Mistake 3: Inline Styles with Fixed Values

```vue
<!-- ❌ WRONG -->
<div :style="{ background: '#FF6B35', padding: '16px' }">

<!-- ✅ CORRECT -->
<div :style="{ background: 'var(--color-primary)', padding: 'var(--spacing-md)' }">
```

### Mistake 4: Not Using Available Utility Classes

```vue
<style scoped>
/* ❌ WRONG - reinventing what's in global.css */
.my-button {
  display: inline-flex;
  align-items: center;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #E55A2B 0%, #FF6B35 40%);
  border-radius: 0.75rem;
  font-weight: 500;
}
</style>

<!-- ✅ CORRECT - use existing classes -->
<template>
  <button class="btn btn-primary">
    <!-- btn-primary already has gradient -->
  </button>
</template>
```

### Mistake 5: Component-Specific Color Palette

```typescript
// ❌ WRONG - creating new colors per component
const colors = {
  danger: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B'
}

// ✅ CORRECT - use design tokens
const colors = {
  danger: 'var(--color-primary)', // Use primary as danger (orange)
  success: 'var(--color-accent-green)',
  warning: 'var(--color-accent-yellow)'
}
```

---

## 📚 Additional Guidelines

### When to Add New Design Tokens

If you find yourself needing a color/spacing/shadow that doesn't exist:

1. **Check if really needed**: Can you use an existing token?
2. **Check brand consistency**: Does this fit the design system?
3. **Add to global.css** (preferred):
   ```css
   /* Add new token */
   --color-info: #3B82F6;

   /* Add utility class */
   .bg-info { background-color: var(--color-info); }
   .text-info { color: var(--color-info); }
   ```
4. **Document the addition** in component comments

### Component Composition

UI Components should be **composable**:

```vue
<!-- Good: Composable -->
<Chip variant="primary" closeable @close="handleRemove">
  <template #icon>
    <Avatar size="sm" src="/user.jpg" />
  </template>
  John Doe
</Chip>

<!-- Bad: Too specific -->
<UserChipWithAvatar user="John Doe" />
```

### Props vs Slots

**Use Props for**: Simple data (text, numbers, booleans, variants)
**Use Slots for**: Complex content, other components, custom markup

```vue
<!-- Props for simple data -->
<Badge text="New" variant="primary" />

<!-- Slots for complex content -->
<Badge>
  <template #icon>
    <Icon name="star" />
  </template>
  Featured Item
</Badge>
```

---

## 🎯 Final Implementation Steps

1. **Parse Arguments**: Extract component name and description
2. **Research**: Check existing similar components
3. **Design Tokens**: List all tokens needed (colors, spacing, etc.)
4. **Props Interface**: Define component props with TypeScript
5. **Template**: Build template using ONLY design tokens
6. **Computed Classes**: Map variants to utility classes
7. **Scoped Styles**: Add component-specific styles using CSS variables
8. **Accessibility**: Add ARIA labels, keyboard support
9. **Slots**: Add flexible content slots
10. **Quality Check**: Verify NO hardcoded values
11. **Test**: Check responsive, states, interactions

---

## ✅ Quality Checklist

Before delivering the component:

**Design Tokens:**
- [ ] NO hardcoded colors anywhere
- [ ] NO hardcoded spacing (px, rem values)
- [ ] NO hardcoded shadows
- [ ] NO hardcoded border-radius
- [ ] Uses ONLY CSS variables or utility classes from global.css

**Code Quality:**
- [ ] TypeScript interface complete
- [ ] Props have sensible defaults
- [ ] Computed properties for dynamic classes
- [ ] Scoped styles use CSS variables
- [ ] Component name follows convention (PascalCase, no "Base" prefix)

**Functionality:**
- [ ] Supports multiple variants
- [ ] Supports multiple sizes
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Handles disabled state
- [ ] Smooth transitions using design tokens

**Accessibility:**
- [ ] Semantic HTML
- [ ] ARIA labels where needed
- [ ] Keyboard navigation
- [ ] Focus states visible
- [ ] Screen reader friendly

**Documentation:**
- [ ] Props documented with comments
- [ ] Usage examples in comments
- [ ] Slots explained

---

Now create the UI component based on the provided name and description, following ALL design token principles! 🎨
