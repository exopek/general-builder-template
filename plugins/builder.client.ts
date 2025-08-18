import { register } from '@builder.io/sdk-vue'

export default defineNuxtPlugin(() => {
  // Only register in browser to avoid SSR serialization issues
  
    register("editor.settings", {
      designTokens: {
        colors: [
          {
            name: 'Primary Blue',
            value: 'var(--color-primary-blue, #007bff)'
          },
          {
            name: 'Success Green',
            value: 'var(--color-success-green, #28a745)'
          },
          {
            name: 'Warning Orange',
            value: 'var(--color-warning-orange, #fd7e14)'
          },
          {
            name: 'Danger Red',
            value: 'var(--color-danger-red, #dc3545)'
          },
          {
            name: 'Dark Gray',
            value: 'var(--color-dark-gray, #343a40)'
          },
          {
            name: 'Light Gray',
            value: 'var(--color-light-gray, #f8f9fa)'
          }
        ],
        spacing: [
          {
            name: 'Extra Small',
            value: 'var(--spacing-xs, 4px)'
          },
          {
            name: 'Small',
            value: 'var(--spacing-sm, 8px)'
          },
          {
            name: 'Medium',
            value: 'var(--spacing-md, 16px)'
          },
          {
            name: 'Large',
            value: 'var(--spacing-lg, 24px)'
          },
          {
            name: 'Extra Large',
            value: 'var(--spacing-xl, 32px)'
          },
          {
            name: '2XL',
            value: 'var(--spacing-2xl, 48px)'
          }
        ],
        padding: [
          {
            name: 'Extra Small',
            value: 'var(--spacing-xs, 4px)'
          },
          {
            name: 'Small',
            value: 'var(--spacing-sm, 8px)'
          },
          {
            name: 'Medium',
            value: 'var(--spacing-md, 16px)'
          },
          {
            name: 'Large',
            value: 'var(--spacing-lg, 24px)'
          },
          {
            name: 'Extra Large',
            value: 'var(--spacing-xl, 32px)'
          },
          {
            name: '2XL',
            value: 'var(--spacing-2xl, 48px)'
          }
        ],
        borderRadius: [
          {
            name: 'Small',
            value: 'var(--border-radius-sm, 4px)'
          },
          {
            name: 'Medium',
            value: 'var(--border-radius-md, 8px)'
          },
          {
            name: 'Large',
            value: 'var(--border-radius-lg, 12px)'
          },
          {
            name: 'Full',
            value: 'var(--border-radius-full, 9999px)'
          }
        ],
        fontSize: [
          {
            name: 'Small',
            value: 'var(--font-size-sm, 14px)'
          },
          {
            name: 'Base',
            value: 'var(--font-size-base, 16px)'
          },
          {
            name: 'Large',
            value: 'var(--font-size-lg, 18px)'
          },
          {
            name: 'Extra Large',
            value: 'var(--font-size-xl, 20px)'
          },
          {
            name: '2XL',
            value: 'var(--font-size-2xl, 24px)'
          },
          {
            name: '3XL',
            value: 'var(--font-size-3xl, 30px)'
          }
        ],
        allowOverridingTokens: true
      }
    })
  
})