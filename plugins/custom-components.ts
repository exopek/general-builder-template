import { register } from '@builder.io/sdk-vue';
import { Fragment } from 'vue';
import GymOfferCard from '~/components/GymOfferCard.vue';
import CurrentWeekCoursesGrid from '~/components/CurrentWeekCoursesGrid.vue';
import CourseRecommendationFunnel from '~/components/CourseRecommendationFunnel.vue';
import ChallengeHeroSection from '~/components/ChallengeHeroSection.vue';
import CashbackBadge from '~/components/CashbackBadge.vue';

// Transformation Components
import TransformationHero from '~/components/transformation/TransformationHero.vue';
import TransformationTimeline from '~/components/transformation/TransformationTimeline.vue';
import TransformationBenefits from '~/components/transformation/TransformationBenefits.vue';
import TransformationTestimonials from '~/components/transformation/TransformationTestimonials.vue';
import TransformationPricing from '~/components/transformation/TransformationPricing.vue';
import TransformationFAQ from '~/components/transformation/TransformationFAQ.vue';
import TransformationResults from '~/components/transformation/TransformationResults.vue';

type ComponentInput = {
    name: string;
    type: string;
    defaultValue?: any;
    allowedFileTypes?: string[];
    enum?: string[];
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
    },
    {
        component: CourseRecommendationFunnel,
        name: 'CourseRecommendationFunnel',
        inputs: [
            { name: 'show', type: 'boolean', defaultValue: false }
        ]
    },
    {
        component: ChallengeHeroSection,
        name: 'ChallengeHeroSection',
        inputs: [
            // Content Props
            { name: 'subheadText', type: 'text', defaultValue: 'Andere geben dir Geld zurück, wenn du scheiterst. Wir geben dir Geld zurück, wenn du durchziehst.' },
            { name: 'headlineText', type: 'text', defaultValue: '7 Wochen durchziehen. <span style="color: #ff3b2f;">Direkt 100€ Cashback.</span>' },
            { name: 'descriptionText', type: 'text', defaultValue: 'Investiere 297€ in deine Fitness. Ziehst du die 7 Wochen durch, bekommst du sofort 100€ zurück – Cash. Die restlichen 197€ kannst du komplett auf Gym-Services anrechnen lassen.' },
            
            // CTA Props
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Jetzt Challenge starten' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#' },
            { name: 'primaryCtaColor', type: 'color', defaultValue: '#ff3b2f' },
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'Challenge-Plan ansehen' },
            { name: 'secondaryCtaUrl', type: 'url', defaultValue: '#' },
            { name: 'secondaryCtaColor', type: 'color', defaultValue: '#ffffff' },
            
            // Visual Props
            { name: 'heroImage', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'], defaultValue: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop&crop=center' },
            { name: 'heroImageAlt', type: 'string', defaultValue: 'Fitness Challenge' },
            
            // Cashback Badge Props
            { name: 'showCashbackBadge', type: 'boolean', defaultValue: true },
            { name: 'cashbackAmount', type: 'string', defaultValue: '100€' },
            { name: 'cashbackText', type: 'string', defaultValue: 'Cashback' },
            { name: 'badgePosition', type: 'list', enum: ['top-right', 'top-left', 'bottom-right', 'bottom-left'], defaultValue: 'top-right' },
            { name: 'badgeColor', type: 'color', defaultValue: '#ff3b2f' },
            { name: 'enableAnimation', type: 'boolean', defaultValue: true },
            
            // Section Styling
            { name: 'backgroundColor', type: 'color', defaultValue: '#0f0f0f' },
            { name: 'backgroundGradient', type: 'string', defaultValue: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)' },
            { name: 'textColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'minHeight', type: 'string', defaultValue: '90vh' },
            { name: 'padding', type: 'string', defaultValue: '4rem' }
        ]
    },
    {
        component: CashbackBadge,
        name: 'CashbackBadge',
        inputs: [
            { name: 'amount', type: 'string', defaultValue: '100€' },
            { name: 'text', type: 'string', defaultValue: 'Cashback' },
            { name: 'position', type: 'list', enum: ['top-right', 'top-left', 'bottom-right', 'bottom-left'], defaultValue: 'top-right' },
            { name: 'color', type: 'color', defaultValue: '#ff3b2f' },
            { name: 'textColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'rotation', type: 'number', defaultValue: -8 },
            { name: 'scale', type: 'number', defaultValue: 1 },
            { name: 'glowEffect', type: 'boolean', defaultValue: true },
            { name: 'pulseAnimation', type: 'boolean', defaultValue: false }
        ]
    },

    // === TRANSFORMATION COMPONENTS ===
    {
        component: TransformationHero,
        name: 'TransformationHero',
        inputs: [
            // Content
            { name: 'headline', type: 'richText', defaultValue: 'Deine <span style="color: #f97316;">7-Wochen</span><br>Transformation beginnt jetzt' },
            { name: 'subheadline', type: 'text', defaultValue: 'Erreiche deine Fitnessziele mit unserem bewährten 7-Wochen-Programm. Professionelle Betreuung, maßgeschneiderte Trainingspläne und eine Gemeinschaft, die dich unterstützt.' },
            { name: 'badgeText', type: 'string', defaultValue: 'Limitiertes Angebot' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },

            // CTAs
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Jetzt starten' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#anmeldung' },
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'Mehr erfahren' },
            { name: 'secondaryCtaUrl', type: 'url', defaultValue: '#details' },

            // Visual
            { name: 'heroImage', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png'], defaultValue: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=750&fit=crop&crop=center' },
            { name: 'heroImageAlt', type: 'string', defaultValue: '7-Wochen Fitness Transformation' },
            { name: 'showImageBadge', type: 'boolean', defaultValue: true },
            { name: 'imageBadgeText', type: 'string', defaultValue: '100% Erfolgsgarantie' },

            // Counters
            { name: 'showCounters', type: 'boolean', defaultValue: true },
            { name: 'participantsCount', type: 'number', defaultValue: 2847 },
            { name: 'successRate', type: 'number', defaultValue: 94 },
            { name: 'avgWeightLoss', type: 'number', defaultValue: 8 },

            // Trust Indicators
            { name: 'showTrustIndicators', type: 'boolean', defaultValue: true },
            { name: 'trustIndicator1', type: 'string', defaultValue: 'Geld-zurück-Garantie' },
            { name: 'trustIndicator2', type: 'string', defaultValue: 'Zertifizierte Trainer' },
            { name: 'trustIndicator3', type: 'string', defaultValue: 'Kostenlose Probestunde' }
        ]
    },

    {
        component: TransformationTimeline,
        name: 'TransformationTimeline',
        inputs: [
            { name: 'headline', type: 'string', defaultValue: 'Dein 7-Wochen Transformations-Plan' },
            { name: 'subheadline', type: 'text', defaultValue: 'Jede Woche bringt dich deinem Ziel näher. Unser strukturierter Plan führt dich Schritt für Schritt zu deiner besten Version.' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },
            { name: 'badgeText', type: 'string', defaultValue: 'Bewährtes System' },
            { name: 'currentWeek', type: 'number', defaultValue: 3 },
            { name: 'progressPercentage', type: 'number', defaultValue: 45 },
            { name: 'showOverallStats', type: 'boolean', defaultValue: true },
            { name: 'showCta', type: 'boolean', defaultValue: true },
            { name: 'ctaHeadline', type: 'string', defaultValue: 'Starte deine eigene 7-Wochen Transformation' },
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Jetzt anmelden' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#anmeldung' }
        ]
    },

    {
        component: TransformationBenefits,
        name: 'TransformationBenefits',
        inputs: [
            { name: 'headline', type: 'string', defaultValue: 'Warum unser 7-Wochen Programm funktioniert' },
            { name: 'subheadline', type: 'text', defaultValue: 'Entdecke die wissenschaftlich fundierten Vorteile unseres Transformationsprogramms und erlebe selbst, warum über 94% unserer Teilnehmer ihre Ziele erreichen.' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },
            { name: 'badgeText', type: 'string', defaultValue: 'Bewiesene Erfolge' },
            { name: 'showComparison', type: 'boolean', defaultValue: true },
            { name: 'comparisonHeadline', type: 'string', defaultValue: 'Der Unterschied ist deutlich sichtbar' },
            { name: 'showMetrics', type: 'boolean', defaultValue: true },
            { name: 'metricsHeadline', type: 'string', defaultValue: 'Unsere Teilnehmer erreichen durchschnittlich' },
            { name: 'showCta', type: 'boolean', defaultValue: true },
            { name: 'ctaHeadline', type: 'string', defaultValue: 'Bereit für deine Transformation?' },
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Programm starten' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#anmeldung' }
        ]
    },

    {
        component: TransformationTestimonials,
        name: 'TransformationTestimonials',
        inputs: [
            { name: 'headline', type: 'string', defaultValue: 'Echte Erfolgsgeschichten unserer Teilnehmer' },
            { name: 'subheadline', type: 'text', defaultValue: 'Überzeuge dich selbst von den beeindruckenden Transformationen. Diese Ergebnisse sprechen für sich und können auch deine Realität werden.' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },
            { name: 'badgeText', type: 'string', defaultValue: 'Verifizierte Erfolge' },
            { name: 'showSummaryStats', type: 'boolean', defaultValue: true },
            { name: 'summaryStatsHeadline', type: 'string', defaultValue: 'Diese Erfolge sprechen für sich' },
            { name: 'showCta', type: 'boolean', defaultValue: true },
            { name: 'ctaHeadline', type: 'string', defaultValue: 'Deine Erfolgsgeschichte beginnt jetzt' },
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Meine Transformation starten' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#anmeldung' }
        ]
    },

    {
        component: TransformationPricing,
        name: 'TransformationPricing',
        inputs: [
            { name: 'headline', type: 'string', defaultValue: 'Wähle dein Transformations-Paket' },
            { name: 'subheadline', type: 'text', defaultValue: 'Investiere in deine Gesundheit und wähle das Paket, das perfekt zu deinen Zielen und deinem Budget passt. Alle Pakete beinhalten unsere Erfolgsgarantie.' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },
            { name: 'badgeText', type: 'string', defaultValue: 'Limitierte Zeit' },
            { name: 'showValueProposition', type: 'boolean', defaultValue: true },
            { name: 'valuePropositionHeadline', type: 'string', defaultValue: 'Warum sich die Investition lohnt' },
            { name: 'showComparison', type: 'boolean', defaultValue: true },
            { name: 'comparisonHeadline', type: 'string', defaultValue: 'Detaillierter Paket-Vergleich' },
            { name: 'showFaqTeaser', type: 'boolean', defaultValue: true },
            { name: 'faqTeaserHeadline', type: 'string', defaultValue: 'Noch Fragen zu den Paketen?' }
        ]
    },

    {
        component: TransformationFAQ,
        name: 'TransformationFAQ',
        inputs: [
            { name: 'headline', type: 'string', defaultValue: 'Häufig gestellte Fragen' },
            { name: 'subheadline', type: 'text', defaultValue: 'Finde schnell Antworten auf die wichtigsten Fragen zu unserem 7-Wochen Transformationsprogramm. Falls du weitere Fragen hast, kontaktiere uns gerne direkt.' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },
            { name: 'badgeText', type: 'string', defaultValue: 'Alles erklärt' },
            { name: 'showSearch', type: 'boolean', defaultValue: true },
            { name: 'searchPlaceholder', type: 'string', defaultValue: 'Suche nach Stichworten...' },
            { name: 'showCategories', type: 'boolean', defaultValue: true },
            { name: 'showContactSection', type: 'boolean', defaultValue: true },
            { name: 'contactSectionHeadline', type: 'string', defaultValue: 'Noch Fragen? Wir sind für dich da!' },
            { name: 'primaryContactText', type: 'string', defaultValue: 'Kostenloses Beratungsgespräch' },
            { name: 'primaryContactUrl', type: 'url', defaultValue: '#beratung' }
        ]
    },

    {
        component: TransformationResults,
        name: 'TransformationResults',
        inputs: [
            { name: 'headline', type: 'string', defaultValue: 'Echte Transformationen. Echte Ergebnisse.' },
            { name: 'subheadline', type: 'text', defaultValue: 'Sieh selbst, was in nur 7 Wochen möglich ist. Diese Erfolgsgeschichten zeigen das wahre Potenzial unseres Programms und können auch deine Realität werden.' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },
            { name: 'badgeText', type: 'string', defaultValue: 'Verifizierte Ergebnisse' },
            { name: 'showStatistics', type: 'boolean', defaultValue: true },
            { name: 'showFilters', type: 'boolean', defaultValue: true },
            { name: 'showLoadMore', type: 'boolean', defaultValue: true },
            { name: 'loadMoreText', type: 'string', defaultValue: 'Weitere Erfolgsgeschichten laden' },
            { name: 'showCta', type: 'boolean', defaultValue: true },
            { name: 'ctaHeadline', type: 'string', defaultValue: 'Schreibe deine eigene Erfolgsgeschichte' },
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Meine Transformation starten' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#anmeldung' }
        ]
    }
];

export default defineNuxtPlugin(() => {
    // Register custom components with Builder.io
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
            },
            { name: 'Primary Gradient',
              value: 'var(--gradient-primary, linear-gradient(135deg, #FF6B35 0%, #1B365D 100%))'
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