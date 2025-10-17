<template>
  <div class="design-system">
    <div class="container py-12">
      <h1 class="text-5xl font-bold mb-2 text-gradient-warm">Design System</h1>
      <p class="text-gray-600 mb-12">Übersicht aller Design Tokens und Komponenten</p>

      <!-- Typography Section -->
      <section class="ds-section">
        <h2 class="ds-section-title">Typografie</h2>

        <!-- Font Families -->
        <div class="ds-subsection">
          <h3 class="ds-subsection-title">Schriftarten</h3>
          <div class="ds-grid">
            <div class="ds-card">
              <p class="text-sm text-gray-500 mb-3">Primary (Fira Sans)</p>
              <p style="font-family: var(--font-family-primary);" class="text-base leading-relaxed text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>
            <div class="ds-card">
              <p class="text-sm text-gray-500 mb-3">Display (Comfortaa)</p>
              <p style="font-family: var(--font-family-display);" class="text-base leading-relaxed text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>
          </div>
        </div>

        <!-- Font Sizes -->
        <div class="ds-subsection">
          <h3 class="ds-subsection-title">Schriftgrößen</h3>
          <div class="ds-grid">
            <div v-for="size in fontSizes" :key="size.name" class="ds-card">
              <div class="flex justify-between items-end mb-3">
                <span class="text-xs text-gray-500">{{ size.name }}</span>
                <span class="text-xs text-gray-400">{{ size.value }}</span>
              </div>
              <p :class="`text-${size.class}`" class="text-gray-700">Lorem ipsum dolor sit amet consectetur adipiscing elit</p>
            </div>
          </div>
        </div>

        <!-- Font Weights -->
        <div class="ds-subsection">
          <h3 class="ds-subsection-title">Schriftgewichte</h3>
          <div class="ds-grid">
            <div v-for="weight in fontWeights" :key="weight.name" class="ds-card">
              <div class="flex justify-between items-end mb-3">
                <span class="text-xs text-gray-500">{{ weight.name }}</span>
                <span class="text-xs text-gray-400">{{ weight.value }}</span>
              </div>
              <p :class="`font-${weight.class} text-xl`" class="text-gray-700">Lorem ipsum dolor sit amet consectetur adipiscing elit</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Colors Section -->
      <section class="ds-section">
        <h2 class="ds-section-title">Farben</h2>

        <!-- Primary Colors -->
        <div class="ds-subsection">
          <h3 class="ds-subsection-title">Primary Colors</h3>
          <div class="ds-grid">
            <div v-for="color in primaryColors" :key="color.name" class="ds-card p-0 overflow-hidden">
              <div
                :style="{ backgroundColor: color.value }"
                class="h-32 flex items-center justify-center"
              >
                <span class="text-white font-medium drop-shadow-md">{{ color.name }}</span>
              </div>
              <div class="p-4">
                <p class="text-xs text-gray-500">{{ color.variable }}</p>
                <p class="text-xs font-mono text-gray-700 mt-1">{{ color.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Secondary Colors -->
        <div class="ds-subsection">
          <h3 class="ds-subsection-title">Secondary Colors</h3>
          <div class="ds-grid">
            <div v-for="color in secondaryColors" :key="color.name" class="ds-card p-0 overflow-hidden">
              <div
                :style="{ backgroundColor: color.value }"
                class="h-32 flex items-center justify-center"
              >
                <span class="text-white font-medium drop-shadow-md">{{ color.name }}</span>
              </div>
              <div class="p-4">
                <p class="text-xs text-gray-500">{{ color.variable }}</p>
                <p class="text-xs font-mono text-gray-700 mt-1">{{ color.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Accent Colors -->
        <div class="ds-subsection">
          <h3 class="ds-subsection-title">Accent Colors</h3>
          <div class="ds-grid">
            <div v-for="color in accentColors" :key="color.name" class="ds-card p-0 overflow-hidden">
              <div
                :style="{ backgroundColor: color.value }"
                class="h-32 flex items-center justify-center"
              >
                <span class="text-white font-medium drop-shadow-md">{{ color.name }}</span>
              </div>
              <div class="p-4">
                <p class="text-xs text-gray-500">{{ color.variable }}</p>
                <p class="text-xs font-mono text-gray-700 mt-1">{{ color.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Gray Scale -->
        <div class="ds-subsection">
          <h3 class="ds-subsection-title">Gray Scale (Neutral)</h3>
          <div class="ds-grid">
            <div v-for="color in grayColors" :key="color.name" class="ds-card p-0 overflow-hidden">
              <div
                :style="{ backgroundColor: color.value }"
                class="h-32 flex items-center justify-center"
                :class="color.darkText ? 'text-gray-900' : 'text-white'"
              >
                <span class="font-medium drop-shadow-sm">{{ color.name }}</span>
              </div>
              <div class="p-4">
                <p class="text-xs text-gray-500">{{ color.variable }}</p>
                <p class="text-xs font-mono text-gray-700 mt-1">{{ color.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Gradients -->
        <div class="ds-subsection">
          <h3 class="ds-subsection-title">Gradients</h3>
          <div class="ds-grid">
            <div v-for="gradient in gradients" :key="gradient.name" class="ds-card p-0 overflow-hidden">
              <div
                :style="{ background: gradient.value }"
                class="h-32 flex items-center justify-center"
              >
                <span class="text-white font-medium drop-shadow-md">{{ gradient.name }}</span>
              </div>
              <div class="p-4">
                <p class="text-xs text-gray-500">{{ gradient.variable }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Spacing Section -->
      <section class="ds-section">
        <h2 class="ds-section-title">Abstände (Spacing)</h2>

        <div class="ds-subsection">
          <h3 class="ds-subsection-title">Spacing Scale</h3>
          <div class="space-y-4">
            <div v-for="space in spacings" :key="space.name" class="ds-card">
              <div class="flex items-center gap-4">
                <div class="w-24 text-sm text-gray-600">
                  {{ space.name }}
                </div>
                <div class="w-20 text-xs text-gray-400 font-mono">
                  {{ space.value }}
                </div>
                <div
                  :style="{ width: space.value }"
                  class="h-8 bg-gradient-warm rounded"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Shadows Section -->
      <section class="ds-section">
        <h2 class="ds-section-title">Schatten (Shadows)</h2>

        <div class="ds-subsection">
          <div class="ds-grid">
            <div v-for="shadow in shadows" :key="shadow.name" class="ds-card bg-gray-50">
              <div
                class="bg-white p-8 rounded-lg flex items-center justify-center"
                :style="{ boxShadow: shadow.value }"
              >
                <span class="text-gray-700 font-medium">{{ shadow.name }}</span>
              </div>
              <p class="text-xs text-gray-500 mt-4">{{ shadow.variable }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Border Radius Section -->
      <section class="ds-section">
        <h2 class="ds-section-title">Border Radius</h2>

        <div class="ds-subsection">
          <div class="ds-grid">
            <div v-for="radius in borderRadii" :key="radius.name" class="ds-card bg-gray-50">
              <div
                class="bg-gradient-primary p-8 flex items-center justify-center text-white font-medium"
                :style="{ borderRadius: radius.value }"
              >
                {{ radius.name }}
              </div>
              <div class="mt-4">
                <p class="text-xs text-gray-500">{{ radius.variable }}</p>
                <p class="text-xs font-mono text-gray-700 mt-1">{{ radius.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Transitions Section -->
      <section class="ds-section">
        <h2 class="ds-section-title">Transitions</h2>

        <div class="ds-subsection">
          <div class="ds-grid">
            <div v-for="transition in transitions" :key="transition.name" class="ds-card bg-gray-50">
              <div
                class="bg-gradient-secondary p-8 rounded-lg flex items-center justify-center text-white font-medium hover:scale-110 cursor-pointer"
                :style="{ transition: `transform ${transition.value}` }"
              >
                Hover me - {{ transition.name }}
              </div>
              <div class="mt-4">
                <p class="text-xs text-gray-500">{{ transition.variable }}</p>
                <p class="text-xs font-mono text-gray-700 mt-1">{{ transition.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO Meta Tags with noindex
useHead({
  title: 'Design System - Club Exopek',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// Font Sizes
const fontSizes = [
  { name: 'Extra Small', class: 'xs', value: '0.75rem (12px)' },
  { name: 'Small', class: 'sm', value: '0.875rem (14px)' },
  { name: 'Base', class: 'base', value: '1rem (16px)' },
  { name: 'Large', class: 'lg', value: '1.125rem (18px)' },
  { name: 'Extra Large', class: 'xl', value: '1.25rem (20px)' },
  { name: '2XL', class: '2xl', value: '1.5rem (24px)' },
  { name: '3XL', class: '3xl', value: '1.875rem (30px)' },
  { name: '4XL', class: '4xl', value: '2.25rem (36px)' },
  { name: '5XL', class: '5xl', value: '3rem (48px)' },
  { name: '6XL', class: '6xl', value: '3.75rem (60px)' }
]

// Font Weights
const fontWeights = [
  { name: 'Light', class: 'light', value: '300' },
  { name: 'Regular', class: 'regular', value: '400' },
  { name: 'Medium', class: 'medium', value: '500' },
  { name: 'Semibold', class: 'semibold', value: '600' },
  { name: 'Bold', class: 'bold', value: '700' },
  { name: 'Black', class: 'black', value: '900' }
]

// Primary Colors
const primaryColors = [
  { name: 'Primary', variable: '--color-primary', value: '#FF6B35' },
  { name: 'Primary Light', variable: '--color-primary-light', value: '#FF8F66' },
  { name: 'Primary Dark', variable: '--color-primary-dark', value: '#E55A2B' }
]

// Secondary Colors
const secondaryColors = [
  { name: 'Secondary', variable: '--color-secondary', value: '#1B365D' },
  { name: 'Secondary Light', variable: '--color-secondary-light', value: '#2D4A6B' },
  { name: 'Secondary Dark', variable: '--color-secondary-dark', value: '#0F2940' }
]

// Accent Colors
const accentColors = [
  { name: 'Accent Blue', variable: '--color-accent-blue', value: '#4A90E2' },
  { name: 'Accent Purple', variable: '--color-accent-purple', value: '#7B68EE' },
  { name: 'Accent Green', variable: '--color-accent-green', value: '#27AE60' },
  { name: 'Accent Yellow', variable: '--color-accent-yellow', value: '#F1C40F' }
]

// Gray Colors
const grayColors = [
  { name: 'White', variable: '--color-white', value: '#FFFFFF', darkText: true },
  { name: 'Gray 50', variable: '--color-gray-50', value: '#FAFAFA', darkText: true },
  { name: 'Gray 100', variable: '--color-gray-100', value: '#F5F5F5', darkText: true },
  { name: 'Gray 200', variable: '--color-gray-200', value: '#EEEEEE', darkText: true },
  { name: 'Gray 300', variable: '--color-gray-300', value: '#E0E0E0', darkText: true },
  { name: 'Gray 400', variable: '--color-gray-400', value: '#BDBDBD', darkText: true },
  { name: 'Gray 500', variable: '--color-gray-500', value: '#9E9E9E', darkText: false },
  { name: 'Gray 600', variable: '--color-gray-600', value: '#757575', darkText: false },
  { name: 'Gray 700', variable: '--color-gray-700', value: '#616161', darkText: false },
  { name: 'Gray 800', variable: '--color-gray-800', value: '#424242', darkText: false },
  { name: 'Gray 900', variable: '--color-gray-900', value: '#212121', darkText: false },
  { name: 'Black', variable: '--color-black', value: '#000000', darkText: false }
]

// Gradients
const gradients = [
  {
    name: 'Primary',
    variable: '--gradient-primary',
    value: 'linear-gradient(135deg, #FF6B35 0%, #1B365D 100%)'
  },
  {
    name: 'Secondary',
    variable: '--gradient-secondary',
    value: 'linear-gradient(135deg, #4A90E2 0%, #7B68EE 100%)'
  },
  {
    name: 'Warm',
    variable: '--gradient-warm',
    value: 'linear-gradient(135deg, #E55A2B 0%, #FF6B35 40%, #F1C40F 100%)'
  },
  {
    name: 'Cool',
    variable: '--gradient-cool',
    value: 'linear-gradient(135deg, #4A90E2 0%, #7B68EE 100%)'
  }
]

// Spacings
const spacings = [
  { name: 'xs', value: '0.25rem', variable: '--spacing-xs' },
  { name: 'sm', value: '0.5rem', variable: '--spacing-sm' },
  { name: 'md', value: '1rem', variable: '--spacing-md' },
  { name: 'lg', value: '1.5rem', variable: '--spacing-lg' },
  { name: 'xl', value: '2rem', variable: '--spacing-xl' },
  { name: '2xl', value: '2.5rem', variable: '--spacing-2xl' },
  { name: '3xl', value: '3rem', variable: '--spacing-3xl' },
  { name: '4xl', value: '4rem', variable: '--spacing-4xl' },
  { name: '5xl', value: '5rem', variable: '--spacing-5xl' }
]

// Shadows
const shadows = [
  { name: 'sm', variable: '--shadow-sm', value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
  { name: 'md', variable: '--shadow-md', value: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' },
  { name: 'lg', variable: '--shadow-lg', value: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' },
  { name: 'xl', variable: '--shadow-xl', value: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' },
  { name: '2xl', variable: '--shadow-2xl', value: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }
]

// Border Radii
const borderRadii = [
  { name: 'sm', variable: '--border-radius-sm', value: '0.25rem' },
  { name: 'md', variable: '--border-radius-md', value: '0.5rem' },
  { name: 'lg', variable: '--border-radius-lg', value: '0.75rem' },
  { name: 'xl', variable: '--border-radius-xl', value: '1rem' },
  { name: '2xl', variable: '--border-radius-2xl', value: '1.5rem' },
  { name: 'full', variable: '--border-radius-full', value: '9999px' }
]

// Transitions
const transitions = [
  { name: 'fast', variable: '--transition-fast', value: '150ms ease' },
  { name: 'normal', variable: '--transition-normal', value: '300ms ease' },
  { name: 'slow', variable: '--transition-slow', value: '500ms ease' }
]
</script>

<style scoped>
.design-system {
  min-height: 100vh;
  background-color: var(--color-gray-50);
}

.ds-section {
  margin-bottom: var(--spacing-5xl);
  padding: var(--spacing-xl);
  background: var(--color-white);
  border-radius: var(--border-radius-2xl);
  box-shadow: var(--shadow-md);
}

.ds-section-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-secondary);
  margin-bottom: var(--spacing-2xl);
  padding-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--color-gray-200);
}

.ds-subsection {
  margin-bottom: var(--spacing-3xl);
}

.ds-subsection:last-child {
  margin-bottom: 0;
}

.ds-subsection-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-lg);
}

.ds-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.ds-card {
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  transition: all var(--transition-normal);
}

.ds-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}
</style>
