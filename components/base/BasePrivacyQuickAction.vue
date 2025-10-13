<template>
  <div :class="['p-6 md:p-8 mb-8 md:mb-12 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5', gradientClass, 'text-white']">
    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex-1 text-center md:text-left">
        <h2 v-if="title" class="text-2xl font-bold mb-2">
          {{ title }}
        </h2>
        <p v-if="description" class="text-white/90">
          {{ description }}
        </p>
        <slot name="content" />
      </div>

      <div v-if="buttonText || hasButtonSlot" class="flex-shrink-0">
        <slot name="button">
          <BaseButton
            v-if="buttonText"
            :text="buttonText"
            :href="buttonHref"
            :variant="buttonVariant"
            :size="buttonSize"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  gradient?: 'warm' | 'cool' | 'primary' | 'secondary'
  buttonText?: string
  buttonHref?: string
  buttonVariant?: 'primary' | 'secondary' | 'outline' | 'gradient'
  buttonSize?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  gradient: 'warm',
  buttonText: '',
  buttonHref: '',
  buttonVariant: 'secondary',
  buttonSize: 'lg'
})

const slots = useSlots()
const hasButtonSlot = computed(() => !!slots.button)

const gradientClass = computed(() => {
  const gradients = {
    warm: 'bg-gradient-warm',
    cool: 'bg-gradient-cool',
    primary: 'bg-gradient-primary',
    secondary: 'bg-gradient-secondary'
  }
  return gradients[props.gradient]
})
</script>
