# Design System - UI Components

Small, reusable building blocks for the design system.

## Purpose

These components are **NOT registered in Builder.io**. They are used internally by Section Components and Content Wrappers.

## Components

| Component | Description |
|-----------|-------------|
| `Button.vue` | Button component with variants |
| `Modal.vue` | Modal/Dialog component |
| `InfoCard.vue` | Information card with borders |
| `ContactCard.vue` | Contact display with gradient |
| `EventCard.vue` | Event card item |
| `USPCard.vue` | USP/Feature card item |
| `PrivacyAccordion.vue` | Collapsible accordion |
| `PrivacyGrid.vue` | Grid layout system |
| `PrivacyGridItem.vue` | Grid item component |
| `PrivacyHighlight.vue` | Highlighted info box |
| `PrivacyList.vue` | Styled list component |
| `PrivacySection.vue` | Section wrapper |

## Usage

```vue
<script setup>
import Button from '~/components/design-system-ui-components/Button.vue'
import Modal from '~/components/design-system-ui-components/Modal.vue'
</script>

<template>
  <div>
    <Button variant="primary" @click="openModal">
      Click me
    </Button>

    <Modal v-if="showModal">
      Modal content
    </Modal>
  </div>
</template>
```

## Guidelines

- **Reusability**: All components must be reusable
- **Props**: Use props for variations, not separate components
- **Slots**: Provide slots for flexible content
- **Design Tokens**: Use only tokens from `global.css`
- **No Builder.io**: These components are NOT registered in Builder.io

## Creating New UI Components

1. Check if a similar component already exists
2. Create component in this directory
3. Use design tokens, not hardcoded values
4. Provide props with meaningful defaults
5. Add to this README
6. Do NOT register in `plugins/custom-components.ts`
