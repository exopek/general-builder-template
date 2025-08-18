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




})