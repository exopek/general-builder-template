<template>
  <section class="py-12 md:py-16 lg:py-20" :style="{ backgroundColor }">
    <div class="container mx-auto px-4 md:px-6">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Badge -->
        <TransformationBadge
          v-if="showBadge && badgeText"
          :text="badgeText"
          :variant="badgeVariant"
          class="mx-auto mb-6"
        />

        <!-- Title -->
        <div
          v-if="showTitle && title"
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-4"
          :style="{ color: titleColor }"
          v-html="title"
        ></div>

        <!-- Description -->
        <div
          v-if="showDescription && description"
          class="text-base md:text-lg mb-8"
          :style="{ color: descriptionColor }"
          v-html="description"
        ></div>

        <!-- Custom Content Slot -->
        <div v-if="$slots.default" class="mb-8">
          <slot />
        </div>

        <!-- Action Buttons -->
        <div v-if="primaryText || secondaryText || $slots.actions" class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            v-if="primaryText"
            :text="primaryText"
            :href="primaryUrl"
            :variant="primaryVariant"
            size="lg"
            :external="primaryExternal"
            :disabled="primaryDisabled"
          />
          <Button
            v-if="secondaryText"
            :text="secondaryText"
            :href="secondaryUrl"
            :variant="secondaryVariant"
            size="lg"
            :external="secondaryExternal"
            :disabled="secondaryDisabled"
          />

          <!-- Additional actions slot -->
          <slot name="actions" />
        </div>

        <!-- Footer Content -->
        <div v-if="$slots.footer || (trustIndicators && trustIndicators.length > 0)" class="mt-8">
          <slot name="footer" />

          <!-- Trust indicators -->
          <div v-if="trustIndicators && trustIndicators.length > 0" class="flex flex-wrap gap-4 justify-center mt-6 pt-6 border-t border-gray-200">
            <div
              v-for="(indicator, index) in trustIndicators"
              :key="index"
              class="flex items-center gap-2 text-sm"
              :style="{ color: trustIndicatorColor }"
            >
              <span>{{ typeof indicator === 'string' ? indicator : indicator.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from '~/components/design-system-ui-components/Button.vue'

interface TrustIndicator {
  text?: string
  icon?: string
}

interface Props {
  // Visibility Toggles
  showBadge?: boolean
  showTitle?: boolean
  showDescription?: boolean

  // Content (richText)
  title?: string
  description?: string
  badgeText?: string
  badgeVariant?: 'new' | 'popular' | 'featured' | 'limited' | 'info'

  // Primary Action
  primaryText?: string
  primaryUrl?: string
  primaryVariant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'outline'
  primaryExternal?: boolean
  primaryDisabled?: boolean

  // Secondary Action
  secondaryText?: string
  secondaryUrl?: string
  secondaryVariant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'outline'
  secondaryExternal?: boolean
  secondaryDisabled?: boolean

  // Trust Indicators
  trustIndicators?: (string | TrustIndicator)[]

  // Colors
  backgroundColor?: string
  titleColor?: string
  descriptionColor?: string
  trustIndicatorColor?: string
}

withDefaults(defineProps<Props>(), {
  // Visibility Toggles
  showBadge: false,
  showTitle: true,
  showDescription: true,

  // Content
  title: 'Ready to get started?',
  description: 'Join thousands of satisfied customers today.',
  badgeVariant: 'featured',

  // Primary Button
  primaryVariant: 'gradient',
  primaryExternal: false,
  primaryDisabled: false,

  // Secondary Button
  secondaryVariant: 'outline',
  secondaryExternal: false,
  secondaryDisabled: false,

  // Colors
  backgroundColor: '#ffffff',
  titleColor: '#111827',
  descriptionColor: '#4b5563',
  trustIndicatorColor: '#6b7280'
})
</script>
