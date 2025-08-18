import { register } from '@builder.io/sdk-vue';
import GymOfferCard from '~/components/GymOfferCard.vue';

type ComponentInput = {
    name: string;
    type: string;
    defaultValue?: any;
};

type RegisteredComponent = {
    component: any;
    name: string;
    inputs: ComponentInput[];
};

export const registeredComponents: RegisteredComponent[] = [
    {
        component: GymOfferCard,
        name: 'GymOfferCard',
        inputs: [
            { name: 'title', type: 'string', defaultValue: 'Angebotstitel' },
            { name: 'price', type: 'number', defaultValue: 29.99 },
            { name: 'period', type: 'string', defaultValue: 'Monat' },
            { name: 'featured', type: 'boolean', defaultValue: false },
            { name: 'ctaText', type: 'string', defaultValue: 'Jetzt anmelden' },
            { name: 'disclaimer', type: 'string', defaultValue: '' }
        ]
    }
];

export default defineNuxtPlugin(() => {

    // Register components with Builder.io
    registeredComponents.forEach(({ component, name, inputs }) => {
        register('component', {
            name,
            component,
            inputs
        });
    });     

    /* register("editor.settings", {
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
          allowOverridingTokens: false
        }
      }) */


})