import { register } from '@builder.io/sdk-vue';
import GymOfferCard from '~/components/GymOfferCard.vue';
import CurrentWeekCoursesGrid from '~/components/CurrentWeekCoursesGrid.vue';

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
    },
    {
        component: CurrentWeekCoursesGrid,
        name: 'CurrentWeekCoursesGrid',
        inputs: [
            { name: 'showHeader', type: 'boolean', defaultValue: true },
            { name: 'headerTitle', type: 'string', defaultValue: 'Aktuelle Woche' },
            { name: 'headerSubtitle', type: 'string', defaultValue: '' }
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

    register("editor.settings", {
        designTokens: {
          colors: [
            {
              name: 'Primary Orange',
              value: 'var(--color-primary, #FF6B35)'
            },
            {
              name: 'Primary Light',
              value: 'var(--color-primary-light, #FF8F66)'
            },
            {
              name: 'Primary Dark',
              value: 'var(--color-primary-dark, #E55A2B)'
            },
            {
              name: 'Secondary Navy',
              value: 'var(--color-secondary, #1B365D)'
            },
            {
              name: 'Secondary Light',
              value: 'var(--color-secondary-light, #2D4A6B)'
            },
            {
              name: 'Secondary Dark',
              value: 'var(--color-secondary-dark, #0F2940)'
            },
            {
              name: 'Accent Blue',
              value: 'var(--color-accent-blue, #4A90E2)'
            },
            {
              name: 'Accent Purple',
              value: 'var(--color-accent-purple, #7B68EE)'
            },
            {
              name: 'Accent Green',
              value: 'var(--color-accent-green, #27AE60)'
            },
            {
              name: 'Accent Yellow',
              value: 'var(--color-accent-yellow, #F1C40F)'
            },
            {
              name: 'White',
              value: 'var(--color-white, #FFFFFF)'
            },
            {
              name: 'Gray 100',
              value: 'var(--color-gray-100, #F5F5F5)'
            },
            {
              name: 'Gray 300',
              value: 'var(--color-gray-300, #E0E0E0)'
            },
            {
              name: 'Gray 500',
              value: 'var(--color-gray-500, #9E9E9E)'
            },
            {
              name: 'Gray 700',
              value: 'var(--color-gray-700, #616161)'
            },
            {
              name: 'Gray 900',
              value: 'var(--color-gray-900, #212121)'
            }
          ],
          gradients: [
            {
              name: 'Primary Gradient',
              value: 'var(--gradient-primary, linear-gradient(135deg, #FF6B35 0%, #1B365D 100%))'
            },
            {
              name: 'Secondary Gradient',
              value: 'var(--gradient-secondary, linear-gradient(135deg, #4A90E2 0%, #7B68EE 100%))'
            },
            {
              name: 'Warm Gradient',
              value: 'var(--gradient-warm, linear-gradient(135deg, #FF6B35 0%, #F1C40F 100%))'
            },
            {
              name: 'Cool Gradient',
              value: 'var(--gradient-cool, linear-gradient(135deg, #4A90E2 0%, #7B68EE 100%))'
            }
          ],
          spacing: [
            {
              name: 'XS',
              value: 'var(--spacing-xs, 0.25rem)'
            },
            {
              name: 'Small',
              value: 'var(--spacing-sm, 0.5rem)'
            },
            {
              name: 'Medium',
              value: 'var(--spacing-md, 1rem)'
            },
            {
              name: 'Large',
              value: 'var(--spacing-lg, 1.5rem)'
            },
            {
              name: 'XL',
              value: 'var(--spacing-xl, 2rem)'
            },
            {
              name: '2XL',
              value: 'var(--spacing-2xl, 2.5rem)'
            },
            {
              name: '3XL',
              value: 'var(--spacing-3xl, 3rem)'
            },
            {
              name: '4XL',
              value: 'var(--spacing-4xl, 4rem)'
            },
            {
              name: '5XL',
              value: 'var(--spacing-5xl, 5rem)'
            }
          ],
          padding: [
            {
              name: 'XS',
              value: 'var(--spacing-xs, 0.25rem)'
            },
            {
              name: 'Small',
              value: 'var(--spacing-sm, 0.5rem)'
            },
            {
              name: 'Medium',
              value: 'var(--spacing-md, 1rem)'
            },
            {
              name: 'Large',
              value: 'var(--spacing-lg, 1.5rem)'
            },
            {
              name: 'XL',
              value: 'var(--spacing-xl, 2rem)'
            },
            {
              name: '2XL',
              value: 'var(--spacing-2xl, 2.5rem)'
            },
            {
              name: '3XL',
              value: 'var(--spacing-3xl, 3rem)'
            },
            {
              name: '4XL',
              value: 'var(--spacing-4xl, 4rem)'
            },
            {
              name: '5XL',
              value: 'var(--spacing-5xl, 5rem)'
            }
          ],
          borderRadius: [
            {
              name: 'Small',
              value: 'var(--border-radius-sm, 0.25rem)'
            },
            {
              name: 'Medium',
              value: 'var(--border-radius-md, 0.5rem)'
            },
            {
              name: 'Large',
              value: 'var(--border-radius-lg, 0.75rem)'
            },
            {
              name: 'XL',
              value: 'var(--border-radius-xl, 1rem)'
            },
            {
              name: '2XL',
              value: 'var(--border-radius-2xl, 1.5rem)'
            },
            {
              name: 'Full',
              value: 'var(--border-radius-full, 9999px)'
            }
          ],
          fontSize: [
            {
              name: 'XS',
              value: 'var(--font-size-xs, 0.75rem)'
            },
            {
              name: 'Small',
              value: 'var(--font-size-sm, 0.875rem)'
            },
            {
              name: 'Base',
              value: 'var(--font-size-base, 1rem)'
            },
            {
              name: 'Large',
              value: 'var(--font-size-lg, 1.125rem)'
            },
            {
              name: 'XL',
              value: 'var(--font-size-xl, 1.25rem)'
            },
            {
              name: '2XL',
              value: 'var(--font-size-2xl, 1.5rem)'
            },
            {
              name: '3XL',
              value: 'var(--font-size-3xl, 1.875rem)'
            },
            {
              name: '4XL',
              value: 'var(--font-size-4xl, 2.25rem)'
            },
            {
              name: '5XL',
              value: 'var(--font-size-5xl, 3rem)'
            },
            {
              name: '6XL',
              value: 'var(--font-size-6xl, 3.75rem)'
            }
          ],
          fontWeight: [
            {
              name: 'Light',
              value: 'var(--font-weight-light, 300)'
            },
            {
              name: 'Regular',
              value: 'var(--font-weight-regular, 400)'
            },
            {
              name: 'Medium',
              value: 'var(--font-weight-medium, 500)'
            },
            {
              name: 'Semibold',
              value: 'var(--font-weight-semibold, 600)'
            },
            {
              name: 'Bold',
              value: 'var(--font-weight-bold, 700)'
            },
            {
              name: 'Black',
              value: 'var(--font-weight-black, 900)'
            }
          ],
          boxShadow: [
            {
              name: 'Small',
              value: 'var(--shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05))'
            },
            {
              name: 'Medium',
              value: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06))'
            },
            {
              name: 'Large',
              value: 'var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05))'
            },
            {
              name: 'XL',
              value: 'var(--shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04))'
            },
            {
              name: '2XL',
              value: 'var(--shadow-2xl, 0 25px 50px -12px rgba(0, 0, 0, 0.25))'
            }
          ],
          allowOverridingTokens: false
        }
      })


})