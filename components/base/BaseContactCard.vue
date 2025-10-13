<template>
  <div :class="['p-6 md:p-8 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5', gradientClass]">
    <h3 v-if="title" class="text-2xl font-bold mb-4 text-white">
      {{ title }}
    </h3>
    <p v-if="description" class="mb-4 text-white">
      {{ description }}
    </p>

    <div class="space-y-2 text-white">
      <p v-if="email" class="flex items-start gap-2">
        <strong class="flex-shrink-0">E-Mail:</strong>
        <a :href="`mailto:${email}`" class="hover:underline text-white">{{ email }}</a>
      </p>
      <p v-if="phone" class="flex items-start gap-2">
        <strong class="flex-shrink-0">Telefon:</strong>
        <a :href="`tel:${phone}`" class="hover:underline text-white">{{ phone }}</a>
      </p>
      <p v-if="address" class="flex items-start gap-2">
        <strong class="flex-shrink-0">Adresse:</strong>
        <span class="text-white whitespace-pre-line">{{ address }}</span>
      </p>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  email?: string
  phone?: string
  address?: string
  gradient?: 'warm' | 'cool' | 'primary' | 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  email: '',
  phone: '',
  address: '',
  gradient: ''
})

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
