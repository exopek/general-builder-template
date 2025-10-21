<template>
  <div
    class="flex items-center"
    :class="orientation === 'vertical' ? 'flex-col h-full' : 'w-full'"
  >
    <div
      v-if="text && textPosition === 'left'"
      class="flex-shrink-0"
      :class="[
        textSizeClass,
        textColorClass,
        orientation === 'vertical' ? 'mb-3' : 'mr-3'
      ]"
    >
      {{ text }}
    </div>

    <div
      class="flex-grow"
      :class="[
        orientation === 'vertical' ? 'w-px h-full' : 'h-px w-full',
        variantClass,
        sizeClass
      ]"
    />

    <div
      v-if="text && textPosition === 'center'"
      class="flex-shrink-0 px-3"
      :class="[textSizeClass, textColorClass]"
    >
      {{ text }}
    </div>

    <div
      v-if="text && (textPosition === 'center' || textPosition === 'right')"
      class="flex-grow"
      :class="[
        orientation === 'vertical' ? 'w-px h-full' : 'h-px w-full',
        variantClass,
        sizeClass
      ]"
    />

    <div
      v-if="text && textPosition === 'right'"
      class="flex-shrink-0"
      :class="[
        textSizeClass,
        textColorClass,
        orientation === 'vertical' ? 'mt-3' : 'ml-3'
      ]"
    >
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  textPosition?: 'left' | 'center' | 'right'
  orientation?: 'horizontal' | 'vertical'
  variant?: 'solid' | 'dashed' | 'dotted'
  color?: 'gray' | 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  textPosition: 'center',
  orientation: 'horizontal',
  variant: 'solid',
  color: 'gray',
  size: 'md'
})

const variantClass = computed(() => {
  const colorClasses = {
    gray: 'border-gray-300',
    primary: 'border-primary',
    secondary: 'border-secondary'
  }

  const variantClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted'
  }

  const borderDirection = props.orientation === 'vertical' ? 'border-l' : 'border-t'

  return `${borderDirection} ${variantClasses[props.variant]} ${colorClasses[props.color]}`
})

const sizeClass = computed(() => {
  if (props.orientation === 'vertical') {
    const sizes = {
      sm: 'border-l',
      md: 'border-l-2',
      lg: 'border-l-4'
    }
    return sizes[props.size]
  } else {
    const sizes = {
      sm: 'border-t',
      md: 'border-t-2',
      lg: 'border-t-4'
    }
    return sizes[props.size]
  }
})

const textSizeClass = computed(() => {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }
  return sizes[props.size]
})

const textColorClass = computed(() => {
  const colors = {
    gray: 'text-gray-500',
    primary: 'text-primary',
    secondary: 'text-secondary'
  }
  return colors[props.color]
})
</script>
