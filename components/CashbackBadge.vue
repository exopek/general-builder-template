<template>
  <div 
    class="cashback-badge" 
    :class="positionClass"
    :style="badgeStyles"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    role="button"
    :aria-label="`${amount} ${text} Button`"
  >
    <div class="badge-content">
      <div class="amount">{{ amount }}</div>
      <div class="text">{{ text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  amount?: string
  text?: string
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  color?: string
  textColor?: string
  rotation?: number
  scale?: number
  glowEffect?: boolean
  pulseAnimation?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  amount: '100€',
  text: 'Cashback',
  position: 'top-right',
  color: '#ff3b2f',
  textColor: '#ffffff',
  rotation: -8,
  scale: 1,
  glowEffect: true,
  pulseAnimation: false
})

const emit = defineEmits<{
  'badge-click': []
  'badge-hover': [isHovering: boolean]
}>()

const isHovering = ref(false)

const positionClass = computed(() => `position-${props.position}`)

const badgeStyles = computed(() => ({
  backgroundColor: props.color,
  color: props.textColor,
  transform: `rotate(${props.rotation}deg) scale(${props.scale})`,
  boxShadow: props.glowEffect 
    ? `0 0 0 2px #fff, 0 4px 12px ${props.color}66, 0 0 20px ${props.color}33`
    : '0 4px 12px rgba(0, 0, 0, 0.3)',
  animation: props.pulseAnimation ? 'pulse 2s infinite' : 'none'
}))

const handleClick = () => {
  emit('badge-click')
}

const handleMouseEnter = () => {
  isHovering.value = true
  emit('badge-hover', true)
}

const handleMouseLeave = () => {
  isHovering.value = false
  emit('badge-hover', false)
}
</script>

<style scoped>
.cashback-badge {
  position: absolute;
  font-weight: 800;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  z-index: 4;
  transition: all 0.2s ease;
  user-select: none;
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.2;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
}

.cashback-badge:hover {
  transform: rotate(-8deg) scale(1.05) !important;
}

.cashback-badge:active {
  transform: rotate(-8deg) scale(0.98) !important;
}

.badge-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
}

.amount {
  font-size: 1.1em;
  font-weight: 900;
  line-height: 1;
}

.text {
  font-size: 0.8em;
  font-weight: 600;
  line-height: 1;
  opacity: 0.9;
}

/* Position classes */
.position-top-right {
  top: 5%;
  right: -10px;
}

.position-top-left {
  top: 5%;
  left: -10px;
}

.position-bottom-right {
  bottom: 5%;
  right: -10px;
}

.position-bottom-left {
  bottom: 5%;
  left: -10px;
}

/* Animations */
@keyframes pulse {
  0% {
    transform: rotate(-8deg) scale(1);
  }
  50% {
    transform: rotate(-8deg) scale(1.05);
  }
  100% {
    transform: rotate(-8deg) scale(1);
  }
}

@media (max-width: 768px) {
  .position-top-right,
  .position-bottom-right {
    right: 10%;
  }
  
  .position-top-left,
  .position-bottom-left {
    left: 10%;
  }
  
  .cashback-badge {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cashback-badge {
    transition: none !important;
    animation: none !important;
  }
}
</style>