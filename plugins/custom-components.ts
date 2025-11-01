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
import TransformationQuiz from '~/components/TransformationQuiz.vue';
import ContactForm from '~/components/ContactForm.vue';
import LeadForm from '~/components/LeadForm.vue';

// About Components
import AboutHero from '~/components/about/AboutHero.vue';
import AboutStory from '~/components/about/AboutStory.vue';
import AboutTeam from '~/components/about/AboutTeam.vue';
import AboutValues from '~/components/about/AboutValues.vue';
import AboutStats from '~/components/about/AboutStats.vue';
import AboutLocation from '~/components/about/AboutLocation.vue';
import AboutCTA from '~/components/about/AboutCTA.vue';

// Gym Linden Components
import GymLindenHero from '~/components/gym-linden/GymLindenHero.vue';
import GymLindenUSPGrid from '~/components/gym-linden/GymLindenUSPGrid.vue';
import GymLindenExopekShowcase from '~/components/gym-linden/GymLindenExopekShowcase.vue';
import GymLindenMorningSchedule from '~/components/gym-linden/GymLindenMorningSchedule.vue';
import GymLindenComparison from '~/components/gym-linden/GymLindenComparison.vue';
import GymLindenCTA from '~/components/gym-linden/GymLindenCTA.vue';
import GymLindenFAQ from '~/components/gym-linden/GymLindenFAQ.vue';

// Base Components
import Button from '~/components/design-system-ui-components/Button.vue';
import Hero from '~/components/design-system-section-components/Hero.vue';
import HeroImage from '~/components/design-system-section-components/HeroImage.vue';
import HeroEmailCapture from '~/components/design-system-section-components/HeroEmailCapture.vue';
import HeroEmailCaptureImage from '~/components/design-system-section-components/HeroEmailCaptureImage.vue';
import HeroEmailCaptureVideo from '~/components/design-system-section-components/HeroEmailCaptureVideo.vue';
import FAQ from '~/components/design-system-section-components/FAQ.vue';
import Statistic from '~/components/design-system-section-components/Statistic.vue';
import StatisticGrid from '~/components/design-system-section-components/StatisticGrid.vue';
import EventCard from '~/components/design-system-ui-components/EventCard.vue';
import Timeline from '~/components/design-system-section-components/Timeline.vue';
import CTA from '~/components/design-system-section-components/CTA.vue';
import Modal from '~/components/design-system-ui-components/Modal.vue';
import GallerySection from '~/components/design-system-section-components/GallerySection.vue';
import GalleryGrid from '~/components/design-system-section-components/GalleryGrid.vue';

// Privacy & Legal Sections (use Base components internally)
import PrivacyHeroSection from '~/components/privacy/PrivacyHeroSection.vue';
import PrivacyOverviewSection from '~/components/privacy/PrivacyOverviewSection.vue';
import PrivacyResponsibleSection from '~/components/privacy/PrivacyResponsibleSection.vue';
import PrivacyHostingSection from '~/components/privacy/PrivacyHostingSection.vue';
import PrivacyDataCollectionSection from '~/components/privacy/PrivacyDataCollectionSection.vue';
import PrivacyNewsletterSection from '~/components/privacy/PrivacyNewsletterSection.vue';
import PrivacyPluginsSection from '~/components/privacy/PrivacyPluginsSection.vue';
import PrivacyRightsSection from '~/components/privacy/PrivacyRightsSection.vue';
import PrivacyContactSection from '~/components/privacy/PrivacyContactSection.vue';
import AlternatingFeatures from '~/components/design-system-section-components/AlternatingFeatures.vue';
import BentoGrid from '~/components/design-system-section-components/BentoGrid.vue';
import FeatureShowcase from '~/components/design-system-section-components/FeatureShowcase.vue';
import FeatureGrid from '~/components/design-system-section-components/FeatureGrid.vue';
import USPGrid from '~/components/design-system-section-components/USPGrid.vue';
import USPCard from '~/components/design-system-ui-components/USPCard.vue';
import ScheduleSection from '~/components/design-system-section-components/ScheduleSection.vue';
import ComparisonTable from '~/components/design-system-section-components/ComparisonTable.vue';
import ContentImageGrid from '~/components/design-system-section-components/ContentImageGrid.vue';
import ContentStatsGallery from '~/components/design-system-section-components/ContentStatsGallery.vue';
import StatsFeatureCards from '~/components/design-system-section-components/StatsFeatureCards.vue';
import ContentBentoGrid from '~/components/design-system-section-components/ContentBentoGrid.vue';
import ContentSection48 from '~/components/design-system-section-components/ContentSection48.vue';
import ContentSection71 from '~/components/design-system-section-components/ContentSection71.vue';
import ContentSection68 from '~/components/design-system-section-components/ContentSection68.vue';
import ContentSection82 from '~/components/design-system-section-components/ContentSection82.vue';
import CTASection11 from '~/components/design-system-section-components/CTASection11.vue';
import FeatureSection76 from '~/components/design-system-section-components/FeatureSection76.vue';
import IntroSection4 from '~/components/design-system-section-components/IntroSection4.vue';
import IntroSection10 from '~/components/design-system-section-components/IntroSection10.vue';
import IntroSection11 from '~/components/design-system-section-components/IntroSection11.vue';
import IntroSection6 from '~/components/design-system-section-components/IntroSection6.vue';
import IntroSection3 from '~/components/design-system-section-components/IntroSection3.vue';
import PricingSection12 from '~/components/design-system-section-components/PricingSection12.vue';
import PricingSection13 from '~/components/design-system-section-components/PricingSection13.vue';
import TestimonialSection28 from '~/components/design-system-section-components/TestimonialSection28.vue';

// Composite Components
import SevenWeekQuestionnaire from '~/components/composite/SevenWeekQuestionnaire.vue';

// Feature Components
import TransformationPopup from '~/components/feature/TransformationPopup.vue';

// Level Up Week Components
import LevelUpWeekHero from '~/components/levelup/LevelUpWeekHero.vue';
import LevelUpWeekProgram from '~/components/levelup/LevelUpWeekProgram.vue';
import LevelUpWeekBenefits from '~/components/levelup/LevelUpWeekBenefits.vue';
import LevelUpWeekTestimonials from '~/components/levelup/LevelUpWeekTestimonials.vue';

type ComponentInput = {
    name: string;
    type: string;
    defaultValue?: any;
    allowedFileTypes?: string[];
    enum?: string[];
    subFields?: ComponentInput[];
    required?: boolean;
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

            // Counters - New dynamic structure
            { name: 'showCounters', type: 'boolean', defaultValue: true },
            {
                name: 'counters',
                type: 'list',
                subFields: [
                    { name: 'key', type: 'string' },
                    { name: 'value', type: 'number', defaultValue: 0, required: true },
                    { name: 'label', type: 'string', defaultValue: 'Statistik', required: true },
                    { name: 'suffix', type: 'string', defaultValue: '' },
                    { name: 'variant', type: 'string', defaultValue: 'primary' },
                    { name: 'description', type: 'string' },
                    { name: 'iconName', type: 'string' },
                    { name: 'size', type: 'string' },
                    { name: 'animated', type: 'boolean' },
                    { name: 'countUp', type: 'boolean' },
                    { name: 'showTrend', type: 'boolean', defaultValue: false },
                    { name: 'trendValue', type: 'number' },
                    { name: 'trendSuffix', type: 'string', defaultValue: '%' },
                    { name: 'showProgress', type: 'boolean', defaultValue: false },
                    { name: 'maxValue', type: 'number' },
                    { name: 'progressLabel', type: 'string' }
                ],
                defaultValue: [
                    {
                        key: 'participants',
                        value: 2847,
                        label: 'Erfolgreiche Teilnehmer',
                        suffix: '+',
                        variant: 'highlight',
                        iconName: 'people'
                    },
                    {
                        key: 'successRate',
                        value: 94,
                        label: 'Erfolgsquote',
                        suffix: '%',
                        variant: 'primary',
                        iconName: 'target'
                    },
                    {
                        key: 'weightLoss',
                        value: 8,
                        label: 'Ø Gewichtsverlust',
                        suffix: 'kg',
                        variant: 'secondary',
                        iconName: 'award'
                    }
                ]
            },

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

            // Timeline Weeks Configuration
            {
                name: 'timelineWeeks',
                type: 'list',
                subFields: [
                    { name: 'title', type: 'string', defaultValue: 'Woche Titel' },
                    { name: 'description', type: 'text', defaultValue: 'Beschreibung der Woche' },
                    { name: 'emoji', type: 'string', defaultValue: '💪' },
                    { name: 'goals', type: 'list', subFields: [
                        { name: 'goal', type: 'string', defaultValue: 'Ziel' }
                    ]},
                    { name: 'results', type: 'string', defaultValue: '' }
                ],
                defaultValue: [
                    {
                        title: 'Fundament schaffen',
                        description: 'Grundlagen des Trainings erlernen und Gewohnheiten etablieren',
                        emoji: '🏗️',
                        goals: [
                            { goal: 'Trainingsroutine entwickeln' },
                            { goal: 'Ernährungsplan einführen' },
                            { goal: 'Ziele definieren' }
                        ]
                    },
                    {
                        title: 'Intensität steigern',
                        description: 'Training intensivieren und erste Erfolge sehen',
                        emoji: '💪',
                        goals: [
                            { goal: 'Gewichte erhöhen' },
                            { goal: 'Cardio ausbauen' },
                            { goal: 'Motivation aufrechterhalten' }
                        ]
                    },
                    {
                        title: 'Durchbruch erleben',
                        description: 'Plateau überwinden und neue Kraftlevel erreichen',
                        emoji: '🚀',
                        goals: [
                            { goal: 'Neue Übungen integrieren' },
                            { goal: 'Ernährung optimieren' },
                            { goal: 'Erholung verbessern' }
                        ]
                    },
                    {
                        title: 'Stabilität finden',
                        description: 'Fortschritte konsolidieren und Technik verfeinern',
                        emoji: '⚖️',
                        goals: [
                            { goal: 'Technik perfektionieren' },
                            { goal: 'Routine festigen' },
                            { goal: 'Kraftzuwachs messen' }
                        ]
                    },
                    {
                        title: 'Grenzen überwinden',
                        description: 'Persönliche Bestleistungen erreichen und neue Ziele setzen',
                        emoji: '🎯',
                        goals: [
                            { goal: 'Neue Rekorde aufstellen' },
                            { goal: 'Schwächen ausmerzen' },
                            { goal: 'Mentale Stärke' }
                        ]
                    },
                    {
                        title: 'Vollgas geben',
                        description: 'Maximale Intensität für die letzten großen Fortschritte',
                        emoji: '🔥',
                        goals: [
                            { goal: 'Alles geben' },
                            { goal: 'Kondition maximieren' },
                            { goal: 'Letzter Schliff' }
                        ]
                    },
                    {
                        title: 'Erfolg feiern',
                        description: 'Transformation abschließen und Erfolg würdigen',
                        emoji: '🏆',
                        goals: [
                            { goal: 'Erfolg messen' },
                            { goal: 'Fotos vergleichen' },
                            { goal: 'Zukunft planen' }
                        ]
                    }
                ]
            },

            // Overall Stats
            { name: 'showOverallStats', type: 'boolean', defaultValue: true },
            { name: 'totalCoursesPerWeek', type: 'number', defaultValue: 16 },
            { name: 'averageWeightLoss', type: 'number', defaultValue: 8.2 },
            { name: 'completionRate', type: 'number', defaultValue: 94 },
            { name: 'satisfactionRate', type: 'number', defaultValue: 98 },

            // CTA Section
            { name: 'showCta', type: 'boolean', defaultValue: true },
            { name: 'ctaHeadline', type: 'string', defaultValue: 'Starte deine eigene 7-Wochen Transformation' },
            { name: 'ctaDescription', type: 'text', defaultValue: 'Schließe dich über 2.800 erfolgreichen Teilnehmern an und verwandle deinen Körper in nur 7 Wochen.' },
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Jetzt anmelden' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#anmeldung' },
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'Kostenloses Beratungsgespräch' },
            { name: 'secondaryCtaUrl', type: 'url', defaultValue: '/kontakt' },

            // Styling
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'headlineColor', type: 'color', defaultValue: '#1f2937' },
            { name: 'subheadlineColor', type: 'color', defaultValue: '#6b7280' }
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

            // Benefits Configuration
            {
                name: 'benefits',
                type: 'list',
                subFields: [
                    { name: 'title', type: 'string', defaultValue: 'Benefit Titel' },
                    { name: 'description', type: 'text', defaultValue: 'Beschreibung des Benefits' },
                    { name: 'icon', type: 'string', defaultValue: 'bullseye-arrow' },
                    { name: 'iconVariant', type: 'text', enum: ['primary', 'secondary', 'accent', 'success', 'warning', 'neutral'], defaultValue: 'primary' },
                    { name: 'features', type: 'list', subFields: [
                        { name: 'feature', type: 'string', defaultValue: 'Feature' }
                    ]},
                    { name: 'highlight', type: 'string', defaultValue: '' }
                ],
                defaultValue: [
                    {
                        title: 'Personalisierte Trainingspläne',
                        description: 'Maßgeschneiderte Workouts basierend auf deinem Fitnesslevel, deinen Zielen und verfügbarer Zeit.',
                        icon: 'bullseye-arrow',
                        iconVariant: 'primary',
                        features: [
                            { feature: 'Individueller Trainingsplan' },
                            { feature: 'Wöchentliche Anpassungen' },
                            { feature: 'Progressionstracking' },
                            { feature: 'Technik-Coaching' }
                        ],
                        highlight: 'Bestseller'
                    },
                    {
                        title: 'Ernährungsberatung',
                        description: 'Professionelle Ernährungsstrategien für optimale Ergebnisse ohne Verzicht auf Lieblingsspeisen.',
                        icon: 'recipe',
                        iconVariant: 'success',
                        features: [
                            { feature: 'Flexible Meal Plans' },
                            { feature: 'Makro-Berechnung' },
                            { feature: 'Restaurant-Guide' },
                            { feature: 'Rezept-Sammlung' }
                        ]
                    },
                    {
                        title: 'Community & Support',
                        description: 'Eine motivierende Gemeinschaft und persönliche Betreuung durch zertifizierte Trainer.',
                        icon: 'users-medical',
                        iconVariant: 'secondary',
                        features: [
                            { feature: '24/7 Support Chat' },
                            { feature: 'Wöchentliche Check-ins' },
                            { feature: 'Motivationsgruppen' },
                            { feature: 'Erfolgs-Tracking' }
                        ]
                    },
                    {
                        title: 'Mentale Stärke',
                        description: 'Entwickle die richtige Mindset und überwinde mentale Barrieren für langanhaltenden Erfolg.',
                        icon: 'brain-lightning',
                        iconVariant: 'accent',
                        features: [
                            { feature: 'Mindset-Training' },
                            { feature: 'Stress-Management' },
                            { feature: 'Gewohnheits-Coaching' },
                            { feature: 'Selbstvertrauen' }
                        ]
                    },
                    {
                        title: 'Flexibilität',
                        description: 'Trainiere wann und wo du willst - im Studio, zu Hause oder unterwegs.',
                        icon: 'calendar-clock',
                        iconVariant: 'warning',
                        features: [
                            { feature: 'Home Workouts' },
                            { feature: 'Studio Sessions' },
                            { feature: 'Reise-Routinen' },
                            { feature: 'Zeitsparende Optionen' }
                        ]
                    },
                    {
                        title: 'Messbare Ergebnisse',
                        description: 'Verfolge deinen Fortschritt mit detaillierten Metriken und regelmäßigen Erfolgskontrollen.',
                        icon: 'chart-pie-alt',
                        iconVariant: 'neutral',
                        features: [
                            { feature: 'Body Composition' },
                            { feature: 'Kraftmessungen' },
                            { feature: 'Foto-Vergleiche' },
                            { feature: 'Leistungsanalyse' }
                        ],
                        highlight: 'Datenbasiert'
                    }
                ]
            },

            // Comparison Section
            { name: 'showComparison', type: 'boolean', defaultValue: true },
            { name: 'comparisonHeadline', type: 'string', defaultValue: 'Der Unterschied ist deutlich sichtbar' },
            { name: 'comparisonSubheadline', type: 'string', defaultValue: 'Vergleiche selbst: Mit und ohne professionelle Begleitung' },
            { name: 'withoutProgramTitle', type: 'string', defaultValue: 'Alleine versuchen' },
            {
                name: 'withoutProgramItems',
                type: 'list',
                subFields: [
                    { name: 'item', type: 'string', defaultValue: 'Nachteil' }
                ],
                defaultValue: [
                    { item: 'Unstrukturiertes Training ohne Plan' },
                    { item: 'Verwirrende und widersprüchliche Informationen' },
                    { item: 'Mangelnde Motivation und Durchhaltevermögen' },
                    { item: 'Plateaus ohne Lösungsansätze' },
                    { item: 'Verletzungsrisiko durch falsche Technik' },
                    { item: 'Langsamere oder ausbleibende Ergebnisse' }
                ]
            },
            { name: 'withProgramTitle', type: 'string', defaultValue: 'Mit unserem Programm' },
            {
                name: 'withProgramItems',
                type: 'list',
                subFields: [
                    { name: 'item', type: 'string', defaultValue: 'Vorteil' }
                ],
                defaultValue: [
                    { item: 'Strukturierter 7-Wochen Trainingsplan' },
                    { item: 'Wissenschaftlich fundierte Methoden' },
                    { item: 'Tägliche Motivation und Community-Support' },
                    { item: 'Professionelle Lösungen für alle Herausforderungen' },
                    { item: 'Sichere Übungsausführung durch Expertenbetreuung' },
                    { item: 'Garantierte Ergebnisse in nur 7 Wochen' }
                ]
            },

            // Metrics Section
            { name: 'showMetrics', type: 'boolean', defaultValue: true },
            { name: 'metricsHeadline', type: 'string', defaultValue: 'Unsere Teilnehmer erreichen durchschnittlich' },
            {
                name: 'metrics',
                type: 'list',
                subFields: [
                    { name: 'key', type: 'string' },
                    { name: 'value', type: 'number', required: true },
                    { name: 'label', type: 'string', required: true },
                    { name: 'suffix', type: 'string', defaultValue: '' },
                    { name: 'description', type: 'string' }
                ],
                defaultValue: [
                    { key: 'muscleGain', value: 15, label: 'Muskelzuwachs', suffix: '%' },
                    { key: 'energyIncrease', value: 40, label: 'Mehr Energie', suffix: '%' },
                    { key: 'satisfactionRate', value: 94, label: 'Zufriedenheit', suffix: '%' }
                ]
            },

            // CTA Section
            { name: 'showCta', type: 'boolean', defaultValue: true },
            { name: 'ctaHeadline', type: 'string', defaultValue: 'Bereit für deine Transformation?' },
            { name: 'ctaDescription', type: 'text', defaultValue: 'Schließe dich über 2.800 erfolgreichen Teilnehmern an und erlebe selbst die Vorteile unseres bewährten Systems.' },
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Programm starten' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#anmeldung' },
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'Kostenlose Beratung' },
            { name: 'secondaryCtaUrl', type: 'url', defaultValue: '#beratung' },

            // Styling
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'headlineColor', type: 'color', defaultValue: '#1f2937' },
            { name: 'subheadlineColor', type: 'color', defaultValue: '#6b7280' }
        ]
    },

    {
        component: TransformationTestimonials,
        name: 'TransformationTestimonials',
        inputs: [
            // === HEADER ===
            { name: 'headline', type: 'richText', defaultValue: 'Echte Erfolgsgeschichten unserer Teilnehmer' },
            { name: 'subheadline', type: 'richText', defaultValue: 'Überzeuge dich selbst von den beeindruckenden Transformationen. Diese Ergebnisse sprechen für sich und können auch deine Realität werden.' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },
            { name: 'badgeText', type: 'string', defaultValue: 'Verifizierte Erfolge' },
            { name: 'badgeVariant', type: 'text', defaultValue: 'success', enum: ['new', 'popular', 'featured', 'limited', 'success', 'warning', 'info', 'neutral'] },

            // === TESTIMONIALS ===
            {
                name: 'testimonials',
                type: 'list',
                defaultValue: [
                    {
                        name: 'Sarah Mueller',
                        details: '29 Jahre, Bürokauffrau aus München',
                        quote: 'Ich hatte schon so viele Diäten probiert, aber nie langfristige Erfolge erzielt. Das 7-Wochen Programm hat mein Leben verändert.',
                        rating: 5,
                        beforeImage: 'https://images.unsplash.com/photo-1494790108755-2616c20e2a7c?w=300&h=400&fit=crop&crop=center',
                        afterImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=center',
                        weightLoss: 12,
                        durationWeeks: 7,
                        satisfactionScore: 98,
                        programHighlight: {
                            title: 'Ernährungsumstellung ohne Verzicht',
                            description: 'Sarah lernte, wie sie ihre Lieblingsspeisen gesund zubereiten kann'
                        }
                    }
                ],
                subFields: [
                    { name: 'name', type: 'richText', required: true, defaultValue: 'Max Mustermann' },
                    { name: 'details', type: 'richText', required: true, defaultValue: '30 Jahre, Beruf aus Stadt' },
                    { name: 'quote', type: 'richText', required: true, defaultValue: 'Deine Erfolgsgeschichte hier...' },
                    { name: 'rating', type: 'number', required: true, defaultValue: 5 },
                    { name: 'beforeImage', type: 'file', required: false, allowedFileTypes: ['jpeg', 'png', 'webp'] },
                    { name: 'afterImage', type: 'file', required: false, allowedFileTypes: ['jpeg', 'png', 'webp'] },
                    { name: 'showBeforeBadge', type: 'boolean', defaultValue: true },
                    { name: 'showAfterBadge', type: 'boolean', defaultValue: true },
                    { name: 'showResultsBadge', type: 'boolean', defaultValue: true },
                    { name: 'resultsBadgeText', type: 'string', defaultValue: '' },
                    { name: 'weightLoss', type: 'number', required: true, defaultValue: 10 },
                    { name: 'durationWeeks', type: 'number', required: true, defaultValue: 7 },
                    { name: 'satisfactionScore', type: 'number', required: true, defaultValue: 95 },
                    {
                        name: 'programHighlight',
                        type: 'object',
                        subFields: [
                            { name: 'title', type: 'richText', defaultValue: 'Programm-Highlight' },
                            { name: 'description', type: 'richText', defaultValue: 'Beschreibung des Highlights' }
                        ]
                    }
                ]
            },

            // === SUMMARY STATS ===
            { name: 'showSummaryStats', type: 'boolean', defaultValue: true },
            { name: 'summaryStatsHeadline', type: 'richText', defaultValue: 'Diese Erfolge sprechen für sich' },
            {
                name: 'summaryStatsData',
                type: 'list',
                defaultValue: [
                    { value: 2847, label: 'Erfolgreiche Teilnehmer', suffix: '+', variant: 'primary', animated: true },
                    { value: 4.8, label: 'Durchschnittliche Bewertung', suffix: '/5', variant: 'highlight', animated: true },
                    { value: 8.2, label: 'Durchschnittlicher Gewichtsverlust', suffix: 'kg', variant: 'gradient', animated: true },
                    { value: 96, label: 'Weiterempfehlungsrate', suffix: '%', variant: 'secondary', animated: true }
                ],
                subFields: [
                    { name: 'value', type: 'number', required: true, defaultValue: 100 },
                    { name: 'label', type: 'string', required: true, defaultValue: 'Statistik Label' },
                    { name: 'suffix', type: 'string', defaultValue: '' },
                    { name: 'variant', type: 'text', defaultValue: 'primary', enum: ['default', 'primary', 'secondary', 'gradient', 'glass', 'minimal', 'highlight'] },
                    { name: 'animated', type: 'boolean', defaultValue: true }
                ]
            },

            // === CTA SECTION ===
            { name: 'showCta', type: 'boolean', defaultValue: true },
            { name: 'ctaHeadline', type: 'richText', defaultValue: 'Deine Erfolgsgeschichte beginnt jetzt' },
            { name: 'ctaDescription', type: 'richText', defaultValue: 'Schließe dich über 2.800 erfolgreichen Teilnehmern an und schreibe deine eigene Transformation.' },
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Meine Transformation starten' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#anmeldung' },
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'Erfolgsgeschichten entdecken' },
            { name: 'secondaryCtaUrl', type: 'url', defaultValue: '#galerie' },

            // === STYLING ===
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'headlineColor', type: 'color', defaultValue: '#1f2937' },
            { name: 'subheadlineColor', type: 'color', defaultValue: '#6b7280' }
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
            {
                name: 'faqs',
                type: 'list',
                subFields: [
                    { name: 'question', type: 'string', required: true },
                    { name: 'answer', type: 'longText', required: true },
                    { name: 'category', type: 'string', required: true },
                    { name: 'showContactCta', type: 'boolean', defaultValue: false },
                    {
                        name: 'links',
                        type: 'list',
                        subFields: [
                            { name: 'text', type: 'string' },
                            { name: 'url', type: 'string' }
                        ]
                    }
                ],
                defaultValue: [
                    {
                        question: 'Für wen ist das 7-Wochen Programm geeignet?',
                        answer: 'Unser Programm ist für alle Fitnesslevel geeignet - vom absoluten Anfänger bis zum fortgeschrittenen Sportler.',
                        category: 'program'
                    }
                ]
            },
            { name: 'showContactSection', type: 'boolean', defaultValue: true },
            { name: 'contactSectionHeadline', type: 'string', defaultValue: 'Noch Fragen? Wir sind für dich da!' },
            { name: 'primaryContactText', type: 'string', defaultValue: 'Kostenloses Beratungsgespräch' },
            { name: 'primaryContactUrl', type: 'url', defaultValue: '/kontakt' },
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' }
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
    },

    {
        component: TransformationQuiz,
        name: 'TransformationQuiz',
        inputs: [
            // Content
            { name: 'headline', type: 'richText', defaultValue: 'Bist du bereit für deine 7-Wochen Transformation?' },
            { name: 'subheadline', type: 'text', defaultValue: 'Beantworte diese kurzen Fragen und finde heraus, ob unser Programm perfekt für dich ist' },

            // Badge
            { name: 'showBadge', type: 'boolean', defaultValue: true },
            { name: 'badgeText', type: 'string', defaultValue: 'Quiz' },

            // Step Labels
            { name: 'showStepLabels', type: 'boolean', defaultValue: true },

            // === STEP 1 ===
            { name: 'step1Label', type: 'string', defaultValue: 'Schritt 1: Deine Ziele' },
            {
                name: 'step1Questions',
                type: 'list',
                defaultValue: [{
                    question: 'Willst du in den nächsten 7 Wochen sichtbar stärker, energiegeladener und fitter werden – mit einem Trainingsplan, der wirklich zu dir passt?',
                    answer: 'Ja, auf jeden Fall!'
                }],
                subFields: [
                    { name: 'question', type: 'longText', defaultValue: 'Deine Frage hier...' },
                    { name: 'answer', type: 'string', defaultValue: 'Deine Antwort hier...' }
                ]
            },
            { name: 'step1AnswerColor', type: 'text', defaultValue: 'orange', enum: ['orange', 'blue', 'green', 'red', 'purple', 'yellow', 'pink', 'gray'] },
            { name: 'step1BadgeVariant', type: 'text', defaultValue: 'featured', enum: ['new', 'popular', 'featured', 'limited', 'success', 'warning', 'info', 'neutral'] },

            // === STEP 2 ===
            { name: 'step2Label', type: 'string', defaultValue: 'Schritt 2: Betreuung & Sicherheit' },
            {
                name: 'step2Questions',
                type: 'list',
                defaultValue: [{
                    question: 'Willst du mit einem Coach trainieren, der dich persönlich betreut, deinen Plan steuert und dich wirklich ans Ziel bringt?',
                    answer: 'Ja, das wäre perfekt!'
                }],
                subFields: [
                    { name: 'question', type: 'longText', defaultValue: 'Deine Frage hier...' },
                    { name: 'answer', type: 'string', defaultValue: 'Deine Antwort hier...' }
                ]
            },
            { name: 'step2AnswerColor', type: 'text', defaultValue: 'blue', enum: ['orange', 'blue', 'green', 'red', 'purple', 'yellow', 'pink', 'gray'] },
            { name: 'step2BadgeVariant', type: 'text', defaultValue: 'info', enum: ['new', 'popular', 'featured', 'limited', 'success', 'warning', 'info', 'neutral'] },

            // === STEP 3 ===
            { name: 'step3Label', type: 'string', defaultValue: 'Schritt 3: Dein Start' },
            {
                name: 'step3Questions',
                type: 'list',
                defaultValue: [{
                    question: 'Das ist der Moment, an dem du entscheidest, ob du redest – oder fit wirst. Bist du bereit, deine 7 Wochen Transformation zu starten und deinen Schweinehund zu besiegen?',
                    answer: 'Ja, ich bin bereit! 🚀'
                }],
                subFields: [
                    { name: 'question', type: 'longText', defaultValue: 'Deine Frage hier...' },
                    { name: 'answer', type: 'string', defaultValue: 'Deine Antwort hier...' }
                ]
            },
            { name: 'step3AnswerColor', type: 'text', defaultValue: 'green', enum: ['orange', 'blue', 'green', 'red', 'purple', 'yellow', 'pink', 'gray'] },
            { name: 'step3BadgeVariant', type: 'text', defaultValue: 'success', enum: ['new', 'popular', 'featured', 'limited', 'success', 'warning', 'info', 'neutral'] },

            // === FINAL CTA ===
            { name: 'finalCtaHeadline', type: 'string', defaultValue: 'Perfekt! Du bist bereit für deine Transformation' },
            { name: 'finalCtaSubtext', type: 'text', defaultValue: 'Sichere dir jetzt deinen Platz und starte noch heute mit deiner 7-Wochen Transformation' },
            { name: 'finalCtaText', type: 'string', defaultValue: 'Jetzt starten - Nur 297€' },
            { name: 'finalCtaUrl', type: 'url', defaultValue: '#anmeldung' },
            { name: 'cashbackText', type: 'string', defaultValue: '💰 100€ Cashback bei erfolgreichem Abschluss' },

            // === STYLING ===
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'headlineColor', type: 'color', defaultValue: '#1f2937' },
            { name: 'subheadlineColor', type: 'color', defaultValue: '#6b7280' }
        ]
    },

    {
        component: ContactForm,
        name: 'ContactForm',
        inputs: [
            // === CONTENT SECTION ===
            { name: 'headline', type: 'richText', defaultValue: 'Kontaktiere uns' },
            { name: 'subheadline', type: 'text', defaultValue: 'Hast du Fragen zu unseren Kursen oder benötigst du persönliche Beratung? Wir sind für dich da!' },

            // Badge
            { name: 'showBadge', type: 'boolean', defaultValue: true },
            { name: 'badgeText', type: 'string', defaultValue: 'Kontakt' },

            // === FORM LABELS ===
            { name: 'nameLabel', type: 'string', defaultValue: 'Vollständiger Name' },
            { name: 'emailLabel', type: 'string', defaultValue: 'E-Mail-Adresse' },
            { name: 'phoneLabel', type: 'string', defaultValue: 'Telefonnummer' },
            { name: 'subjectLabel', type: 'string', defaultValue: 'Betreff' },
            { name: 'messageLabel', type: 'string', defaultValue: 'Nachricht' },

            // === FORM PLACEHOLDERS ===
            { name: 'namePlaceholder', type: 'string', defaultValue: 'Dein vollständiger Name' },
            { name: 'emailPlaceholder', type: 'string', defaultValue: 'deine@email.de' },
            { name: 'phonePlaceholder', type: 'string', defaultValue: '+49 123 456 7890' },
            { name: 'subjectPlaceholder', type: 'string', defaultValue: 'Worum geht es?' },
            { name: 'messagePlaceholder', type: 'string', defaultValue: 'Teile uns mit, wie wir dir helfen können...' },

            // === FIELD VISIBILITY ===
            { name: 'showPhoneField', type: 'boolean', defaultValue: true },
            { name: 'showSubjectField', type: 'boolean', defaultValue: true },
            { name: 'showMarketingConsent', type: 'boolean', defaultValue: true },

            // === FIELD REQUIREMENTS ===
            { name: 'nameRequired', type: 'boolean', defaultValue: true },
            { name: 'phoneRequired', type: 'boolean', defaultValue: false },
            { name: 'subjectRequired', type: 'boolean', defaultValue: false },

            // === CONSENT TEXT ===
            { name: 'marketingConsentText', type: 'text', defaultValue: 'Ja, ich möchte über neue Kurse und Angebote per E-Mail informiert werden.' },
            { name: 'privacyConsentText', type: 'text', defaultValue: 'Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zu.' },

            // === BUTTON TEXT ===
            { name: 'submitButtonText', type: 'string', defaultValue: 'Nachricht senden' },
            { name: 'loadingText', type: 'string', defaultValue: 'Wird gesendet...' },

            // === SUCCESS/ERROR MESSAGES ===
            { name: 'successTitle', type: 'string', defaultValue: 'Nachricht erfolgreich gesendet!' },
            { name: 'successMessage', type: 'text', defaultValue: 'Vielen Dank für deine Nachricht. Wir melden uns so schnell wie möglich bei dir.' },

            // === STYLING ===
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'headlineColor', type: 'color', defaultValue: '#1f2937' },
            { name: 'subheadlineColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'labelColor', type: 'color', defaultValue: '#374151' },

            // === FUNCTIONALITY ===
            { name: 'enableRouteTracking', type: 'boolean', defaultValue: true },
            { name: 'debugMode', type: 'boolean', defaultValue: false },
            { name: 'submitUrl', type: 'string', defaultValue: '/api/contact' }
        ]
    },

    {
        component: LeadForm,
        name: 'LeadForm',
        inputs: [
            // === CONTENT SECTION ===
            { name: 'headline', type: 'richText', defaultValue: 'Jetzt informieren' },
            { name: 'subheadline', type: 'text', defaultValue: 'Hinterlasse uns deine Kontaktdaten und wir melden uns bei dir!' },

            // Badge
            { name: 'showBadge', type: 'boolean', defaultValue: true },
            { name: 'badgeText', type: 'string', defaultValue: 'Kostenlose Beratung' },

            // === FORM LABELS ===
            { name: 'firstNameLabel', type: 'string', defaultValue: 'Vorname' },
            { name: 'lastNameLabel', type: 'string', defaultValue: 'Nachname' },
            { name: 'emailLabel', type: 'string', defaultValue: 'E-Mail-Adresse' },

            // === FORM PLACEHOLDERS ===
            { name: 'firstNamePlaceholder', type: 'string', defaultValue: 'Dein Vorname' },
            { name: 'lastNamePlaceholder', type: 'string', defaultValue: 'Dein Nachname' },
            { name: 'emailPlaceholder', type: 'string', defaultValue: 'deine@email.de' },

            // === CONSENT TEXT ===
            { name: 'privacyConsentText', type: 'text', defaultValue: 'Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zu.' },

            // === BUTTON TEXT ===
            { name: 'submitButtonText', type: 'string', defaultValue: 'Jetzt anfragen' },
            { name: 'loadingText', type: 'string', defaultValue: 'Wird gesendet...' },

            // === SUCCESS/ERROR MESSAGES ===
            { name: 'successTitle', type: 'string', defaultValue: 'Anfrage erfolgreich!' },
            { name: 'successMessage', type: 'text', defaultValue: 'Vielen Dank! Wir melden uns in Kürze bei dir.' },

            // === STYLING ===
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'headlineColor', type: 'color', defaultValue: '#1f2937' },
            { name: 'subheadlineColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'labelColor', type: 'color', defaultValue: '#374151' },

            // === FACEBOOK TRACKING ===
            { name: 'leadValue', type: 'number', defaultValue: 50 },
            { name: 'leadContentName', type: 'string', defaultValue: 'Lead Formular' }
        ]
    },

    // === BASE COMPONENTS ===
    {
        component: Button,
        name: 'BaseButton',
        inputs: [
            { name: 'text', type: 'string', defaultValue: 'Button Text' },
            { name: 'href', type: 'url' },
            { name: 'external', type: 'boolean', defaultValue: false },
            { name: 'variant', type: 'list', enum: ['primary', 'secondary', 'secondaryFull', 'ghost', 'gradient', 'outline'], defaultValue: 'primary' },
            { name: 'size', type: 'list', enum: ['sm', 'md', 'lg', 'xl'], defaultValue: 'md' },
            { name: 'icon', type: 'string' },
            { name: 'iconPosition', type: 'list', enum: ['left', 'right'], defaultValue: 'left' },
            { name: 'iconOnly', type: 'boolean', defaultValue: false },
            { name: 'badge', type: 'string' },
            { name: 'loading', type: 'boolean', defaultValue: false },
            { name: 'disabled', type: 'boolean', defaultValue: false }
        ]
    },

    {
        component: Hero,
        name: 'BaseHero',
        inputs: [
            // Content
            { name: 'headline', type: 'richText', defaultValue: 'Your Hero Headline' },
            { name: 'subheadline', type: 'text', defaultValue: 'Your hero subheadline text goes here.' },
            { name: 'badgeText', type: 'string', defaultValue: 'New' },
            { name: 'badgeVariant', type: 'list', enum: ['new', 'popular', 'featured', 'limited'], defaultValue: 'featured' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },

            // CTAs
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Get Started' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#' },
            { name: 'primaryCtaExternal', type: 'boolean', defaultValue: false },
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'Learn More' },
            { name: 'secondaryCtaUrl', type: 'url', defaultValue: '#' },
            { name: 'secondaryCtaExternal', type: 'boolean', defaultValue: false },

            // Visual
            { name: 'heroImage', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png'], defaultValue: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=750&fit=crop&crop=center' },
            { name: 'heroImageAlt', type: 'string', defaultValue: 'Hero Image' },
            { name: 'imageOverlay', type: 'boolean', defaultValue: false },
            { name: 'showImageBadge', type: 'boolean', defaultValue: true },
            { name: 'imageBadgeText', type: 'string', defaultValue: 'Featured' },

            // Statistics
            { name: 'showStats', type: 'boolean', defaultValue: false },
            {
                name: 'statistics',
                type: 'list',
                subFields: [
                    { name: 'key', type: 'string' },
                    { name: 'value', type: 'number', defaultValue: 0, required: true },
                    { name: 'label', type: 'string', defaultValue: 'Statistic', required: true },
                    { name: 'suffix', type: 'string', defaultValue: '' },
                    { name: 'variant', type: 'string', defaultValue: 'primary' }
                ],
                defaultValue: []
            },
            { name: 'defaultCountUp', type: 'boolean', defaultValue: true },

            // Trust Indicators
            { name: 'showTrustIndicators', type: 'boolean', defaultValue: false },
            {
                name: 'trustIndicators',
                type: 'list',
                subFields: [
                    { name: 'indicator', type: 'string', required: true }
                ],
                defaultValue: []
            },

            // Floating Cards
            { name: 'showFloatingCards', type: 'boolean', defaultValue: true },
            { name: 'floatingCard1Title', type: 'string', defaultValue: 'Card 1' },
            { name: 'floatingCard1Text', type: 'string', defaultValue: 'Description' },
            { name: 'floatingCard1Icon', type: 'boolean', defaultValue: true },
            { name: 'floatingCard1Emoji', type: 'string', defaultValue: '' },
            { name: 'floatingCard2Title', type: 'string', defaultValue: 'Card 2' },
            { name: 'floatingCard2Text', type: 'string', defaultValue: 'Description' },
            { name: 'floatingCard2Icon', type: 'boolean', defaultValue: true },
            { name: 'floatingCard2Emoji', type: 'string', defaultValue: '' },

            // Styling
            { name: 'backgroundColor', type: 'color', defaultValue: '#0f0f0f' },
            { name: 'headlineColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'subheadlineColor', type: 'color', defaultValue: '#d1d5db' }
        ]
    },

    {
        component: HeroImage,
        name: 'BaseHeroImage',
        inputs: [
            // Content
            { name: 'headline', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet consectetur' },
            { name: 'subheadline', type: 'text', defaultValue: 'Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar.' },
            { name: 'badgeText', type: 'string', defaultValue: 'New' },
            { name: 'showBadge', type: 'boolean', defaultValue: false },

            // CTAs
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Contact now' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#' },
            { name: 'primaryCtaExternal', type: 'boolean', defaultValue: false },
            { name: 'secondaryCtaText', type: 'string', defaultValue: '' },
            { name: 'secondaryCtaUrl', type: 'url', defaultValue: '#' },
            { name: 'secondaryCtaExternal', type: 'boolean', defaultValue: false },

            // Background Image
            { name: 'backgroundImage', type: 'file', defaultValue: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=1000&fit=crop' },
            { name: 'backgroundImageAlt', type: 'string', defaultValue: 'Hero Background' },
            { name: 'imagePosition', type: 'string', defaultValue: 'center' },

            // Overlay
            { name: 'overlayColor', type: 'color', defaultValue: '#000000' },
            { name: 'overlayOpacity', type: 'number', defaultValue: 0.5 },
            { name: 'showGradientOverlay', type: 'boolean', defaultValue: true },
            { name: 'gradientDirection', type: 'string', defaultValue: 'to-r' },

            // Trust Indicators
            { name: 'showTrustIndicators', type: 'boolean', defaultValue: false },
            {
                name: 'trustIndicators',
                type: 'list',
                subFields: [
                    { name: 'indicator', type: 'string', required: true }
                ],
                defaultValue: []
            },

            // Colors
            { name: 'headlineColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'subheadlineColor', type: 'color', defaultValue: '#e5e7eb' }
        ]
    },

    {
        component: HeroEmailCapture,
        name: 'HeroEmailCapture',
        inputs: [
            // Visibility Toggles
            { name: 'showHeadline', type: 'boolean', defaultValue: true },
            { name: 'showDescription', type: 'boolean', defaultValue: true },
            { name: 'showEmailForm', type: 'boolean', defaultValue: true },
            { name: 'showTerms', type: 'boolean', defaultValue: true },

            // Content (richText)
            { name: 'headline', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet <strong>consectetur adipiscing</strong>' },
            { name: 'description', type: 'richText', defaultValue: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolor.' },
            { name: 'termsText', type: 'richText', defaultValue: 'By clicking Register, you acknowledge that you have read and accepted our <a href="#" class="underline hover:no-underline">Terms and Conditions</a>.' },

            // Form Configuration
            { name: 'emailPlaceholder', type: 'string', defaultValue: 'Your email' },
            { name: 'buttonText', type: 'string', defaultValue: 'Register' },
            { name: 'submitUrl', type: 'url', defaultValue: '' },

            // Success/Error Messages
            { name: 'successTitle', type: 'string', defaultValue: 'Success!' },
            { name: 'successMessage', type: 'text', defaultValue: 'Thank you! We will contact you shortly.' },

            // Facebook Tracking
            { name: 'leadValue', type: 'number', defaultValue: 179 },

            // Colors
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'headlineColor', type: 'color', defaultValue: '#111827' },
            { name: 'descriptionColor', type: 'color', defaultValue: '#4b5563' },
            { name: 'termsColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'inputBorderColor', type: 'color', defaultValue: '#d1d5db' }
        ]
    },

    {
        component: HeroEmailCaptureImage,
        name: 'HeroEmailCaptureImage',
        inputs: [
            // Visibility Toggles
            { name: 'showHeadline', type: 'boolean', defaultValue: true },
            { name: 'showDescription', type: 'boolean', defaultValue: true },
            { name: 'showEmailForm', type: 'boolean', defaultValue: true },
            { name: 'showTerms', type: 'boolean', defaultValue: true },
            { name: 'showImage', type: 'boolean', defaultValue: true },

            // Content (richText)
            { name: 'headline', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet <strong>consectetur adipiscing</strong>' },
            { name: 'description', type: 'richText', defaultValue: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolor.' },
            { name: 'termsText', type: 'richText', defaultValue: 'By clicking Register, you acknowledge that you have read and accepted our <a href="#" class="underline hover:no-underline">Terms and Conditions</a>.' },

            // Form Configuration
            { name: 'emailPlaceholder', type: 'string', defaultValue: 'Your email' },
            { name: 'buttonText', type: 'string', defaultValue: 'Register' },
            { name: 'submitUrl', type: 'url', defaultValue: '' },

            // Success/Error Messages
            { name: 'successTitle', type: 'string', defaultValue: 'Success!' },
            { name: 'successMessage', type: 'text', defaultValue: 'Thank you! We will contact you shortly.' },

            // Facebook Tracking
            { name: 'leadValue', type: 'number', defaultValue: 179 },

            // Image Configuration
            { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'], defaultValue: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=675&fit=crop' },
            { name: 'imageAlt', type: 'string', defaultValue: 'Hero Image' },
            { name: 'imageAspectRatio', type: 'string', defaultValue: '16/9' },
            { name: 'showImageShadow', type: 'boolean', defaultValue: true },

            // Colors
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'headlineColor', type: 'color', defaultValue: '#111827' },
            { name: 'descriptionColor', type: 'color', defaultValue: '#4b5563' },
            { name: 'termsColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'inputBorderColor', type: 'color', defaultValue: '#d1d5db' }
        ]
    },

    {
        component: HeroEmailCaptureVideo,
        name: 'HeroEmailCaptureVideo',
        inputs: [
            // Visibility Toggles
            { name: 'showHeadline', type: 'boolean', defaultValue: true },
            { name: 'showDescription', type: 'boolean', defaultValue: true },
            { name: 'showEmailForm', type: 'boolean', defaultValue: true },
            { name: 'showTerms', type: 'boolean', defaultValue: true },
            { name: 'showVideo', type: 'boolean', defaultValue: true },

            // Content (richText)
            { name: 'headline', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet <strong>consectetur adipiscing</strong>' },
            { name: 'description', type: 'richText', defaultValue: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolor.' },
            { name: 'termsText', type: 'richText', defaultValue: 'By clicking Register, you acknowledge that you have read and accepted our <a href="#" class="underline hover:no-underline">Terms and Conditions</a>.' },

            // Form Configuration
            { name: 'emailPlaceholder', type: 'string', defaultValue: 'Your email' },
            { name: 'buttonText', type: 'string', defaultValue: 'Register' },
            { name: 'submitUrl', type: 'url', defaultValue: '' },

            // Success/Error Messages
            { name: 'successTitle', type: 'string', defaultValue: 'Success!' },
            { name: 'successMessage', type: 'text', defaultValue: 'Thank you! We will contact you shortly.' },

            // Facebook Tracking
            { name: 'leadValue', type: 'number', defaultValue: 179 },

            // Video Configuration
            { name: 'videoUrl', type: 'url', defaultValue: '' },
            { name: 'videoThumbnail', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'], defaultValue: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=675&fit=crop' },
            { name: 'videoThumbnailAlt', type: 'string', defaultValue: 'Video Thumbnail' },
            { name: 'videoAspectRatio', type: 'string', defaultValue: '16/9' },
            { name: 'showVideoShadow', type: 'boolean', defaultValue: true },
            { name: 'showControls', type: 'boolean', defaultValue: true },
            { name: 'autoplay', type: 'boolean', defaultValue: false },
            { name: 'loop', type: 'boolean', defaultValue: false },
            { name: 'muted', type: 'boolean', defaultValue: false },

            // Colors
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'headlineColor', type: 'color', defaultValue: '#111827' },
            { name: 'descriptionColor', type: 'color', defaultValue: '#4b5563' },
            { name: 'termsColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'inputBorderColor', type: 'color', defaultValue: '#d1d5db' }
        ]
    },

    {
        component: FAQ,
        name: 'BaseFAQ',
        inputs: [
            // Content
            { name: 'headline', type: 'richText', defaultValue: 'Häufig gestellte Fragen' },
            { name: 'subheadline', type: 'text', defaultValue: 'Hier finden Sie Antworten auf die wichtigsten Fragen.' },
            { name: 'badgeText', type: 'string', defaultValue: 'FAQ' },
            { name: 'badgeVariant', type: 'list', enum: ['new', 'popular', 'featured', 'limited', 'info', 'neutral'], defaultValue: 'info' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },

            // Search & Filter
            { name: 'showSearch', type: 'boolean', defaultValue: true },
            { name: 'searchPlaceholder', type: 'string', defaultValue: 'Suche nach Stichworten...' },
            { name: 'showCategories', type: 'boolean', defaultValue: true },
            { name: 'showCategoryIcons', type: 'boolean', defaultValue: true },
            { name: 'showCategoryBadges', type: 'boolean', defaultValue: true },
            {
                name: 'categories',
                type: 'list',
                subFields: [
                    { name: 'id', type: 'string', required: true },
                    { name: 'name', type: 'string', required: true },
                    { name: 'emoji', type: 'string' },
                    { name: 'variant', type: 'string', defaultValue: 'primary' }
                ],
                defaultValue: []
            },

            // FAQ Data
            {
                name: 'faqs',
                type: 'list',
                subFields: [
                    { name: 'question', type: 'string', required: true },
                    { name: 'answer', type: 'longText', required: true },
                    { name: 'category', type: 'string', required: true },
                    { name: 'showContactCta', type: 'boolean', defaultValue: false },
                    {
                        name: 'links',
                        type: 'list',
                        subFields: [
                            { name: 'text', type: 'string' },
                            { name: 'url', type: 'string' }
                        ]
                    }
                ],
                defaultValue: []
            },

            // UI Components
            { name: 'cardComponent', type: 'string', defaultValue: 'TransformationCard' },

            // No Results
            { name: 'noResultsTitle', type: 'string', defaultValue: 'Keine Ergebnisse gefunden' },
            { name: 'noResultsText', type: 'string', defaultValue: 'Versuche andere Suchbegriffe oder kontaktiere uns direkt.' },

            // Links
            { name: 'linksTitle', type: 'string', defaultValue: 'Hilfreiche Links' },

            // Contact CTA
            { name: 'contactCtaText', type: 'string', defaultValue: 'Brauchst du weitere Hilfe zu diesem Thema?' },
            { name: 'contactButtonText', type: 'string', defaultValue: 'Fragen stellen' },
            { name: 'contactButtonUrl', type: 'url', defaultValue: '#contact' },

            // Contact Section
            { name: 'showContactSection', type: 'boolean', defaultValue: false },
            { name: 'contactSectionHeadline', type: 'string', defaultValue: 'Noch Fragen? Wir sind für dich da!' },
            { name: 'contactSectionDescription', type: 'text', defaultValue: 'Unser Expertenteam beantwortet gerne alle deine Fragen persönlich und unverbindlich.' },
            { name: 'primaryContactText', type: 'string', defaultValue: 'Kontakt aufnehmen' },
            { name: 'primaryContactUrl', type: 'url', defaultValue: '/kontakt' },
            { name: 'secondaryContactText', type: 'string' },
            { name: 'secondaryContactUrl', type: 'url' },
            { name: 'responseTimeText', type: 'string' },

            // Styling
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'headlineColor', type: 'color', defaultValue: '#1f2937' },
            { name: 'subheadlineColor', type: 'color', defaultValue: '#6b7280' }
        ]
    },

    {
        component: Statistic,
        name: 'BaseStatistic',
        inputs: [
            // Main data
            { name: 'value', type: 'number', defaultValue: 100, required: true },
            { name: 'targetValue', type: 'number' },
            { name: 'maxValue', type: 'number' },
            { name: 'label', type: 'string', defaultValue: 'Statistik' },
            { name: 'description', type: 'string' },
            { name: 'suffix', type: 'string', defaultValue: '' },

            // Icon
            { name: 'icon', type: 'string' },
            { name: 'iconName', type: 'string' },
            { name: 'iconVariant', type: 'string', defaultValue: 'primary' },
            { name: 'iconSize', type: 'string', defaultValue: 'md' },

            // Styling
            { name: 'variant', type: 'string', defaultValue: 'default' },
            { name: 'size', type: 'string', defaultValue: 'md' },
            { name: 'alignment', type: 'string', defaultValue: 'center' },
            { name: 'labelPosition', type: 'string', defaultValue: 'bottom' },

            // Animations & Effects
            { name: 'animated', type: 'boolean', defaultValue: false },
            { name: 'countUp', type: 'boolean', defaultValue: true },
            { name: 'duration', type: 'number', defaultValue: 2000 },

            // Progress & Trends
            { name: 'showProgress', type: 'boolean', defaultValue: false },
            { name: 'progressLabel', type: 'string', defaultValue: 'erreicht' },
            { name: 'showTrend', type: 'boolean', defaultValue: false },
            { name: 'trendValue', type: 'number' },
            { name: 'trendSuffix', type: 'string', defaultValue: '%' }
        ]
    },

    {
        component: StatisticGrid,
        name: 'BaseStatisticGrid',
        inputs: [
            // Statistics data
            {
                name: 'statistics',
                type: 'list',
                required: true,
                subFields: [
                    { name: 'key', type: 'string' },
                    { name: 'value', type: 'number', defaultValue: 0, required: true },
                    { name: 'label', type: 'string', defaultValue: 'Statistik', required: true },
                    { name: 'suffix', type: 'string', defaultValue: '' },
                    { name: 'description', type: 'string' },
                    { name: 'iconName', type: 'string' },
                    { name: 'variant', type: 'string', defaultValue: 'primary' },
                    { name: 'size', type: 'string' },
                    { name: 'animated', type: 'boolean' },
                    { name: 'countUp', type: 'boolean' },
                    { name: 'showTrend', type: 'boolean', defaultValue: false },
                    { name: 'trendValue', type: 'number' },
                    { name: 'trendSuffix', type: 'string', defaultValue: '%' },
                    { name: 'showProgress', type: 'boolean', defaultValue: false },
                    { name: 'maxValue', type: 'number' },
                    { name: 'progressLabel', type: 'string' }
                ],
                defaultValue: [
                    {
                        value: 100,
                        label: 'Beispiel Statistik',
                        suffix: '%',
                        iconName: 'target',
                        variant: 'primary'
                    }
                ]
            },

            // Grid layout
            { name: 'gridType', type: 'string', defaultValue: 'auto' },
            { name: 'gap', type: 'string', defaultValue: 'md' },
            { name: 'maxWidth', type: 'string', defaultValue: 'none' },
            { name: 'alignment', type: 'string', defaultValue: 'center' },

            // Default props for all statistics
            { name: 'defaultSize', type: 'string', defaultValue: 'md' },
            { name: 'defaultVariant', type: 'string', defaultValue: 'primary' },
            { name: 'defaultAnimated', type: 'boolean', defaultValue: true },
            { name: 'defaultCountUp', type: 'boolean', defaultValue: true },

            // Animation
            { name: 'animation', type: 'string', defaultValue: 'stagger' },
            { name: 'animationDuration', type: 'number', defaultValue: 100 },

            // Context
            { name: 'showContext', type: 'boolean', defaultValue: false },
            { name: 'contextText', type: 'text' },

            // Styling
            { name: 'containerClass', type: 'string' }
        ]
    },

    // === ABOUT US COMPONENTS ===
    {
        component: AboutHero,
        name: 'AboutHero',
        inputs: [
            // Content
            { name: 'headline', type: 'richText', defaultValue: 'Über <span style="color: #f97316;">unser</span><br>Unternehmen' },
            { name: 'subheadline', type: 'text', defaultValue: 'Erfahren Sie mehr über unsere Geschichte, Mission und die Menschen hinter unserem Erfolg. Wir sind stolz darauf, seit Jahren innovative Lösungen zu entwickeln.' },
            { name: 'badgeText', type: 'string', defaultValue: 'Seit 2015' },
            { name: 'badgeVariant', type: 'list', enum: ['new', 'popular', 'featured', 'limited'], defaultValue: 'featured' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },

            // CTAs
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Kontakt aufnehmen' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#kontakt' },
            { name: 'primaryCtaExternal', type: 'boolean', defaultValue: false },
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'Mehr erfahren' },
            { name: 'secondaryCtaUrl', type: 'url', defaultValue: '#story' },
            { name: 'secondaryCtaExternal', type: 'boolean', defaultValue: false },

            // Visual
            { name: 'heroImage', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png'], defaultValue: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=750&fit=crop&crop=center' },
            { name: 'heroImageAlt', type: 'string', defaultValue: 'Unser Team bei der Arbeit' },
            { name: 'imageOverlay', type: 'boolean', defaultValue: false },
            { name: 'showImageBadge', type: 'boolean', defaultValue: true },
            { name: 'imageBadgeText', type: 'string', defaultValue: '100% Engagement' },

            // Floating Cards
            { name: 'showFloatingCards', type: 'boolean', defaultValue: true },
            { name: 'floatingCard1Title', type: 'string', defaultValue: 'Zertifiziert' },
            { name: 'floatingCard1Text', type: 'string', defaultValue: 'ISO 9001 Standard' },
            { name: 'floatingCard2Title', type: 'string', defaultValue: 'Unser Team' },
            { name: 'floatingCard2Text', type: 'string', defaultValue: '50+ Experten' },

            // Company Stats
            { name: 'showStats', type: 'boolean', defaultValue: true },
            { name: 'foundedYear', type: 'number', defaultValue: 2015 },
            { name: 'clientsServed', type: 'number', defaultValue: 1000 },
            { name: 'projectsCompleted', type: 'number', defaultValue: 500 },

            // Trust Indicators
            { name: 'showTrustIndicators', type: 'boolean', defaultValue: true },

            // Styling
            { name: 'backgroundColor', type: 'color', defaultValue: '#0f0f0f' },
            { name: 'headlineColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'subheadlineColor', type: 'color', defaultValue: '#d1d5db' }
        ]
    },

    {
        component: AboutStory,
        name: 'AboutStory',
        inputs: [
            // Content
            { name: 'headline', type: 'richText', defaultValue: 'Unsere <span style="color: #f97316;">Geschichte</span>' },
            { name: 'subheadline', type: 'text', defaultValue: 'Von einer kleinen Idee zu einem führenden Unternehmen - erfahren Sie, wie alles begann und wohin die Reise geht.' },
            { name: 'badgeText', type: 'string', defaultValue: 'Unsere Story' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },

            // Story Content
            { name: 'storyText', type: 'longText', defaultValue: 'Was als kleine Vision zweier Freunde begann, hat sich zu einem innovativen Unternehmen entwickelt, das heute Tausende von Kunden weltweit bedient.' },
            { name: 'highlightsTitle', type: 'string', defaultValue: 'Unsere Erfolgsfaktoren' },

            // Visual Content
            { name: 'storyImage', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png'], defaultValue: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&crop=center' },
            { name: 'storyImageAlt', type: 'string', defaultValue: 'Unser Team bei einem wichtigen Meilenstein' },
            { name: 'videoUrl', type: 'url' },
            { name: 'videoTitle', type: 'string', defaultValue: 'Unsere Geschichte' },

            // Timeline
            { name: 'showTimeline', type: 'boolean', defaultValue: true },
            { name: 'timelineTitle', type: 'string', defaultValue: 'Wichtige Meilensteine' },
            { name: 'timelineSubtitle', type: 'text', defaultValue: 'Die entscheidenden Momente unserer Unternehmensgeschichte' },
            { name: 'timelineLayout', type: 'list', enum: ['vertical', 'horizontal'], defaultValue: 'vertical' },
            { name: 'showTimelineProgress', type: 'boolean', defaultValue: true },

            // Achievements
            { name: 'showAchievements', type: 'boolean', defaultValue: true },
            { name: 'achievementsTitle', type: 'string', defaultValue: 'Unsere Erfolge in Zahlen' },

            // CTAs
            { name: 'showFinalCta', type: 'boolean', defaultValue: true },
            { name: 'finalCtaTitle', type: 'string', defaultValue: 'Bereit für Ihre eigene Erfolgsgeschichte?' },
            { name: 'finalCtaSubtitle', type: 'text', defaultValue: 'Lassen Sie uns gemeinsam an Ihrem nächsten großen Projekt arbeiten.' },
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Projekt starten' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#kontakt' },
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'Portfolio ansehen' },
            { name: 'secondaryCtaUrl', type: 'url', defaultValue: '#portfolio' },

            // Styling
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'headlineColor', type: 'color', defaultValue: '#1f2937' },
            { name: 'subheadlineColor', type: 'color', defaultValue: '#6b7280' }
        ]
    },

    {
        component: AboutTeam,
        name: 'AboutTeam',
        inputs: [
            // Content
            { name: 'headline', type: 'richText', defaultValue: 'Unsere <span style="color: #f97316;">Trainer</span> & Gründer' },
            { name: 'subheadline', type: 'text', defaultValue: 'Lernen Sie die leidenschaftlichen Menschen kennen, die das Exopek Gym zu einem besonderen Ort für funktionelles Training machen.' },
            { name: 'badgeText', type: 'string', defaultValue: 'Unser Team' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },

            // Dynamic Team Members
            {
                name: 'teamMembers',
                type: 'list',
                subFields: [
                    { name: 'name', type: 'string', defaultValue: 'Max Mustermann', required: true },
                    { name: 'role', type: 'string', defaultValue: 'Trainer', required: true },
                    { name: 'bio', type: 'longText', defaultValue: 'Leidenschaftlicher Trainer mit Fokus auf funktionelles Training und individuelle Betreuung.' },
                    { name: 'photo', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'], defaultValue: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face' },
                    { name: 'yearsExperience', type: 'number', defaultValue: 5 },
                    {
                        name: 'specialties',
                        type: 'list',
                        subFields: [
                            { name: 'specialty', type: 'string', defaultValue: 'Funktionelles Training' }
                        ],
                        defaultValue: []
                    },
                    {
                        name: 'socialLinks',
                        type: 'list',
                        subFields: [
                            { name: 'platform', type: 'string', defaultValue: 'Instagram' },
                            { name: 'url', type: 'url', defaultValue: 'https://instagram.com' },
                            { name: 'icon', type: 'string', defaultValue: 'instagram' }
                        ],
                        defaultValue: []
                    }
                ],
                defaultValue: [
                    {
                        name: 'Tom Richter',
                        role: 'Gründer & Head Trainer',
                        bio: 'Als Gründer des Exopek Gyms bringt Tom seine Leidenschaft für funktionelles Training und über 10 Jahre Coaching-Erfahrung mit. Seine Vision: Training, das wirklich im Leben hilft.',
                        photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face',
                        yearsExperience: 10,
                        specialties: [{ specialty: 'Funktionelles Training' }, { specialty: 'Krafttraining' }, { specialty: 'Bewegungsanalyse' }],
                        socialLinks: [{ platform: 'Instagram', url: 'https://instagram.com/tom_exopek', icon: 'instagram' }]
                    },
                    {
                        name: 'Lisa Weber',
                        role: 'Co-Gründerin & Mobility Coach',
                        bio: 'Lisa ist spezialisiert auf Beweglichkeit und Rehabilitation. Als Co-Gründerin sorgt sie dafür, dass jedes Training nicht nur stark, sondern auch gesund macht.',
                        photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b641?w=400&h=400&fit=crop&crop=face',
                        yearsExperience: 8,
                        specialties: [{ specialty: 'Mobility Training' }, { specialty: 'Rehabilitation' }, { specialty: 'Yoga' }],
                        socialLinks: [{ platform: 'Instagram', url: 'https://instagram.com/lisa_exopek', icon: 'instagram' }]
                    }
                ]
            },

            // Team Display
            { name: 'cardSize', type: 'list', enum: ['sm', 'md', 'lg'], defaultValue: 'lg' },
            { name: 'imageStyle', type: 'list', enum: ['square', 'portrait', 'landscape', 'circle'], defaultValue: 'landscape' },

            // Team Stats
            { name: 'showTeamStats', type: 'boolean', defaultValue: true },
            { name: 'teamStatsTitle', type: 'string', defaultValue: 'Unser Trainer-Team' },
            { name: 'totalTeamSize', type: 'number', defaultValue: 8 },
            { name: 'averageExperience', type: 'number', defaultValue: 7 },
            { name: 'departmentsCount', type: 'number', defaultValue: 4 },
            { name: 'satisfactionScore', type: 'number', defaultValue: 98 },

            // Training Philosophy (instead of Company Culture)
            { name: 'showCulture', type: 'boolean', defaultValue: true },
            { name: 'cultureTitle', type: 'string', defaultValue: 'Unsere Trainingsphilosophie' },
            { name: 'cultureDescription', type: 'longText', defaultValue: 'Wir glauben an ein Training, das über das Fitnessstudio hinausgeht. Unser Team arbeitet zusammen, um jedem Mitglied zu helfen, stärker, beweglicher und selbstbewusster zu werden.' },
            { name: 'cultureImage', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'], defaultValue: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=400&fit=crop&crop=center' },

            // Join CTA (Training focused)
            { name: 'showJoinCta', type: 'boolean', defaultValue: true },
            { name: 'joinCtaTitle', type: 'string', defaultValue: 'Bereit für dein Training?' },
            { name: 'joinCtaSubtitle', type: 'text', defaultValue: 'Unser erfahrenes Trainer-Team freut sich darauf, dich bei deiner Fitness-Reise zu begleiten.' },
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Probetraining buchen' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#probetraining' },
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'Team kontaktieren' },
            { name: 'secondaryCtaUrl', type: 'url', defaultValue: '#kontakt' },

            // Styling
            { name: 'backgroundColor', type: 'color', defaultValue: '#f8fafc' },
            { name: 'headlineColor', type: 'color', defaultValue: '#1f2937' },
            { name: 'subheadlineColor', type: 'color', defaultValue: '#6b7280' }
        ]
    },

    {
        component: AboutValues,
        name: 'AboutValues',
        inputs: [
            // Content
            { name: 'headline', type: 'richText', defaultValue: 'Unsere <span style="color: #f97316;">Werte</span>' },
            { name: 'subheadline', type: 'text', defaultValue: 'Diese Grundsätze leiten uns in allem, was wir tun, und prägen die Art, wie wir zusammenarbeiten und unsere Kunden betreuen.' },
            { name: 'badgeText', type: 'string', defaultValue: 'Unsere Werte' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },

            // Values Display
            { name: 'cardVariant', type: 'list', enum: ['default', 'elevated', 'glass'], defaultValue: 'elevated' },
            { name: 'cardSize', type: 'list', enum: ['sm', 'md', 'lg'], defaultValue: 'md' },
            { name: 'iconVariant', type: 'list', enum: ['primary', 'secondary', 'accent'], defaultValue: 'primary' },

            // Mission
            { name: 'showMission', type: 'boolean', defaultValue: true },
            { name: 'missionTitle', type: 'string', defaultValue: 'Unsere Mission' },
            { name: 'missionStatement', type: 'longText', defaultValue: 'Wir schaffen innovative Lösungen, die das Leben unserer Kunden verbessern und nachhaltigen Wert für alle Beteiligten generieren.' },

            // Vision
            { name: 'showVision', type: 'boolean', defaultValue: true },
            { name: 'visionTitle', type: 'string', defaultValue: 'Unsere Vision' },
            { name: 'visionStatement', type: 'longText', defaultValue: 'Wir möchten der führende Anbieter in unserer Branche werden und dabei unsere Werte niemals kompromittieren.' },
            { name: 'visionImage', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png'], defaultValue: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&crop=center' },

            // CTA
            { name: 'showCta', type: 'boolean', defaultValue: true },
            { name: 'ctaTitle', type: 'string', defaultValue: 'Teilen Sie unsere Werte?' },
            { name: 'ctaSubtitle', type: 'text', defaultValue: 'Entdecken Sie, wie wir gemeinsam Großes erreichen können.' },
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Mit uns arbeiten' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#kontakt' },
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'Mehr erfahren' },
            { name: 'secondaryCtaUrl', type: 'url', defaultValue: '#story' },

            // Styling
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'headlineColor', type: 'color', defaultValue: '#1f2937' },
            { name: 'subheadlineColor', type: 'color', defaultValue: '#6b7280' }
        ]
    },

    {
        component: AboutStats,
        name: 'AboutStats',
        inputs: [
            // Content
            { name: 'headline', type: 'richText', defaultValue: 'Das <span style="color: #f97316;">Exopek Gym</span> in Zahlen' },
            { name: 'subheadline', type: 'text', defaultValue: 'Diese Zahlen zeigen, was echtes funktionelles Training und eine starke Community bewirken können.' },
            { name: 'badgeText', type: 'string', defaultValue: 'Unsere Zahlen' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },

            // Dynamic Statistics Configuration
            {
                name: 'stats',
                type: 'list',
                subFields: [
                    { name: 'label', type: 'string', defaultValue: 'Aktive Mitglieder', required: true },
                    { name: 'value', type: 'number', defaultValue: 800, required: true },
                    { name: 'suffix', type: 'string', defaultValue: '+' },
                    { name: 'description', type: 'string', defaultValue: 'Teil unserer Trainingsgemeinschaft' },
                    { name: 'showTrend', type: 'boolean', defaultValue: false },
                    { name: 'trendValue', type: 'number', defaultValue: 0 },
                    { name: 'trendSuffix', type: 'string', defaultValue: '%' }
                ],
                defaultValue: [
                    {
                        label: 'Aktive Mitglieder',
                        value: 800,
                        suffix: '+',
                        description: 'Teil unserer Trainingsgemeinschaft',
                        iconName: 'people',
                        variant: 'primary',
                        showTrend: true,
                        trendValue: 15,
                        trendSuffix: '%'
                    },
                    {
                        label: 'Trainingsstunden',
                        value: 5000,
                        suffix: '+',
                        description: 'Funktionelles Training absolviert',
                        iconName: 'target',
                        variant: 'primary',
                        showTrend: false
                    },
                    {
                        label: 'Qualifizierte Trainer',
                        value: 8,
                        description: 'Experten für funktionelles Training',
                        iconName: 'award',
                        variant: 'primary',
                        showTrend: false
                    },
                    {
                        label: 'Mitgliederzufriedenheit',
                        value: 98,
                        suffix: '%',
                        description: 'Bewertung unserer Community',
                        iconName: 'heart',
                        variant: 'primary',
                        showTrend: false
                    }
                ]
            },

            // Context
            { name: 'showContext', type: 'boolean', defaultValue: true },
            { name: 'contextText', type: 'text', defaultValue: 'Diese Zahlen spiegeln wider, was echte Community und leidenschaftliches Coaching bewirken können. Jede einzelne Zahl steht für Menschen, die stärker geworden sind.' },

            // Styling
            { name: 'backgroundColor', type: 'color', defaultValue: '#f8fafc' },
            { name: 'headlineColor', type: 'color', defaultValue: '#1f2937' },
            { name: 'subheadlineColor', type: 'color', defaultValue: '#6b7280' }
        ]
    },

    {
        component: AboutLocation,
        name: 'AboutLocation',
        inputs: [
            // Content
            { name: 'headline', type: 'richText', defaultValue: 'Unser <span style="color: #f97316;">Standort</span> in Hannover-Linden' },
            { name: 'subheadline', type: 'text', defaultValue: 'Besuchen Sie uns in unserem Gym in Hannover-Linden oder kontaktieren Sie uns für weitere Informationen.' },
            { name: 'badgeText', type: 'string', defaultValue: 'Unser Gym' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },

            // Dynamic Location Configuration
            {
                name: 'locations',
                type: 'list',
                subFields: [
                    { name: 'name', type: 'string', defaultValue: 'Exopek Gym Hannover-Linden', required: true },
                    { name: 'description', type: 'longText', defaultValue: 'Unser modernes Functional Training Studio im Herzen von Hannover-Linden. Hier findest du alles für effektives, funktionelles Training in kleinen Gruppen.' },
                    { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'], defaultValue: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center' },
                    { name: 'address', type: 'longText', defaultValue: 'Musterstraße 123\n30451 Hannover-Linden\nDeutschland', required: true },
                    { name: 'phone', type: 'string', defaultValue: '+49 511 123 456 78' },
                    { name: 'email', type: 'string', defaultValue: 'info@exopek-gym.de' },
                    {
                        name: 'hours',
                        type: 'list',
                        subFields: [
                            { name: 'day', type: 'string', required: true },
                            { name: 'time', type: 'string', required: true }
                        ],
                        defaultValue: [
                            { day: 'Montag - Freitag', time: '6:00 - 22:00' },
                            { day: 'Samstag', time: '8:00 - 20:00' },
                            { day: 'Sonntag', time: '10:00 - 18:00' }
                        ]
                    },
                    { name: 'ctaText', type: 'string', defaultValue: 'Probetraining buchen' },
                    { name: 'ctaUrl', type: 'url', defaultValue: '#probetraining' },
                    { name: 'ctaExternal', type: 'boolean', defaultValue: false }
                ],
                defaultValue: [{
                    name: 'Exopek Gym Hannover-Linden',
                    description: 'Unser modernes Functional Training Studio im Herzen von Hannover-Linden. Hier findest du alles für effektives, funktionelles Training in kleinen Gruppen.',
                    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center',
                    address: 'Musterstraße 123\n30451 Hannover-Linden\nDeutschland',
                    phone: '+49 511 123 456 78',
                    email: 'info@exopek-gym.de',
                    hours: [
                        { day: 'Montag - Freitag', time: '6:00 - 22:00' },
                        { day: 'Samstag', time: '8:00 - 20:00' },
                        { day: 'Sonntag', time: '10:00 - 18:00' }
                    ],
                    ctaText: 'Probetraining buchen',
                    ctaUrl: '#probetraining',
                    ctaExternal: false
                }]
            },

            // Map
            { name: 'showMap', type: 'boolean', defaultValue: true },
            { name: 'mapTitle', type: 'string', defaultValue: 'Finden Sie uns' },
            { name: 'mapPlaceholderText', type: 'string', defaultValue: 'Interaktive Karte hier einfügen' },
            { name: 'mapEmbedHtml', type: 'longText', defaultValue: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.234!2d9.689!3d52.386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDIzJzA5LjYiTiA5wrA0MSczMi40IkU!5e0!3m2!1sde!2sde!4v1234567890123!5m2!1sde!2sde" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' },

            // Contact CTA
            { name: 'showContactCta', type: 'boolean', defaultValue: true },
            { name: 'contactCtaTitle', type: 'string', defaultValue: 'Besuche uns im Gym' },
            { name: 'contactCtaSubtitle', type: 'text', defaultValue: 'Komm vorbei für ein kostenloses Probetraining oder vereinbare einen persönlichen Termin mit unserem Trainer-Team.' },
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Probetraining buchen' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#probetraining' },
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'Route planen' },
            { name: 'secondaryCtaUrl', type: 'url', defaultValue: 'https://maps.google.com' },

            // Styling
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'headlineColor', type: 'color', defaultValue: '#1f2937' },
            { name: 'subheadlineColor', type: 'color', defaultValue: '#6b7280' }
        ]
    },

    {
        component: AboutCTA,
        name: 'AboutCTA',
        inputs: [
            // Content
            { name: 'headline', type: 'richText', defaultValue: 'Bereit <span style="color: #f97316;">durchzustarten?</span>' },
            { name: 'subheadline', type: 'text', defaultValue: 'Nehmen Sie den nächsten Schritt und lassen Sie uns gemeinsam an Ihrem Erfolg arbeiten.' },
            { name: 'badgeText', type: 'string', defaultValue: 'Call to Action' },
            { name: 'badgeVariant', type: 'list', enum: ['new', 'popular', 'featured', 'limited'], defaultValue: 'featured' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },

            // Primary CTA Card
            { name: 'showPrimaryCta', type: 'boolean', defaultValue: true },
            { name: 'primaryCtaTitle', type: 'string', defaultValue: 'Projekt starten' },
            { name: 'primaryCtaDescription', type: 'text', defaultValue: 'Beginnen Sie Ihr nächstes großes Projekt mit unserem erfahrenen Team.' },
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Jetzt anfragen' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#kontakt' },
            { name: 'primaryCtaVariant', type: 'list', enum: ['default', 'elevated', 'glass', 'gradient'], defaultValue: 'gradient' },

            // Secondary CTA Card
            { name: 'showSecondaryCta', type: 'boolean', defaultValue: true },
            { name: 'secondaryCtaTitle', type: 'string', defaultValue: 'Mehr erfahren' },
            { name: 'secondaryCtaDescription', type: 'text', defaultValue: 'Entdecken Sie unsere Leistungen und bisherigen Erfolgsgeschichten.' },
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'Portfolio ansehen' },
            { name: 'secondaryCtaUrl', type: 'url', defaultValue: '#portfolio' },
            { name: 'secondaryCtaVariant', type: 'list', enum: ['default', 'elevated', 'glass', 'gradient'], defaultValue: 'elevated' },

            // Contact Info
            { name: 'showContactInfo', type: 'boolean', defaultValue: true },
            { name: 'contactPhone', type: 'string', defaultValue: '+49 89 123 456 78' },
            { name: 'contactEmail', type: 'string', defaultValue: 'kontakt@example.com' },

            // Final Buttons
            { name: 'showFinalButtons', type: 'boolean', defaultValue: false },
            { name: 'finalPrimaryText', type: 'string', defaultValue: 'Hauptaktion' },
            { name: 'finalPrimaryUrl', type: 'url', defaultValue: '#' },

            // Visual
            { name: 'showBackgroundElements', type: 'boolean', defaultValue: true },

            // Styling
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'headlineColor', type: 'color', defaultValue: '#1f2937' },
            { name: 'subheadlineColor', type: 'color', defaultValue: '#6b7280' }
        ]
    },

    // === BASE COMPONENTS (NEW) ===
    {
        component: EventCard,
        name: 'BaseEventCard',
        inputs: [
            // Content
            { name: 'title', type: 'string', defaultValue: 'Event Title' },
            { name: 'description', type: 'text', defaultValue: 'Event description goes here.' },
            { name: 'icon', type: 'string', defaultValue: 'target' },
            { name: 'iconComponent', type: 'string', defaultValue: 'Icon' },
            { name: 'badge', type: 'string', defaultValue: '' },
            { name: 'date', type: 'string', defaultValue: '' },
            { name: 'status', type: 'string', defaultValue: '' },

            // Features/Tags
            {
                name: 'features',
                type: 'list',
                subFields: [
                    { name: 'feature', type: 'string', defaultValue: 'Feature' },
                    { name: 'text', type: 'string', defaultValue: '' }
                ],
                defaultValue: []
            },

            // Progress
            { name: 'showProgress', type: 'boolean', defaultValue: false },
            { name: 'progress', type: 'number', defaultValue: 0 },
            { name: 'progressLabel', type: 'string', defaultValue: 'Progress' },

            // CTA
            { name: 'ctaText', type: 'string', defaultValue: '' },
            { name: 'ctaUrl', type: 'url', defaultValue: '' },
            { name: 'ctaVariant', type: 'list', enum: ['primary', 'secondary', 'ghost', 'gradient', 'outline'], defaultValue: 'primary' },
            { name: 'ctaSize', type: 'list', enum: ['sm', 'md', 'lg'], defaultValue: 'md' },
            { name: 'ctaExternal', type: 'boolean', defaultValue: false },

            // Styling
            { name: 'variant', type: 'list', enum: ['default', 'featured', 'timeline', 'glass', 'elevated', 'gradient'], defaultValue: 'default' },
            { name: 'size', type: 'list', enum: ['sm', 'md', 'lg'], defaultValue: 'md' },
            { name: 'statusVariant', type: 'list', enum: ['default', 'success', 'warning', 'error', 'info'], defaultValue: 'default' },

            // Behavior
            { name: 'clickable', type: 'boolean', defaultValue: false },
            { name: 'hoverEffect', type: 'boolean', defaultValue: true }
        ]
    },

    {
        component: Timeline,
        name: 'BaseTimeline',
        inputs: [
            // Content
            { name: 'headline', type: 'string', defaultValue: 'Timeline Title' },
            { name: 'subheadline', type: 'text', defaultValue: 'Timeline description goes here.' },
            {
                name: 'items',
                type: 'list',
                required: true,
                subFields: [
                    { name: 'key', type: 'string' },
                    { name: 'title', type: 'string', defaultValue: 'Timeline Item', required: true },
                    { name: 'description', type: 'text', defaultValue: 'Item description' },
                    { name: 'date', type: 'string' },
                    { name: 'step', type: 'string' },
                    { name: 'icon', type: 'string' },
                    {
                        name: 'features',
                        type: 'list',
                        subFields: [
                            { name: 'feature', type: 'string', defaultValue: 'Feature' },
                            { name: 'text', type: 'string', defaultValue: '' }
                        ]
                    },
                    { name: 'active', type: 'boolean', defaultValue: false },
                    { name: 'completed', type: 'boolean', defaultValue: false },
                    { name: 'status', type: 'list', enum: ['pending', 'active', 'completed'], defaultValue: 'pending' },
                    { name: 'ctaText', type: 'string' },
                    { name: 'ctaUrl', type: 'url' },
                    { name: 'ctaVariant', type: 'list', enum: ['primary', 'secondary', 'ghost', 'outline'], defaultValue: 'outline' }
                ],
                defaultValue: [
                    {
                        title: 'Step 1',
                        description: 'First step description',
                        step: 'Day 1',
                        icon: 'target',
                        status: 'completed'
                    },
                    {
                        title: 'Step 2',
                        description: 'Second step description',
                        step: 'Day 2',
                        icon: 'heart',
                        status: 'active'
                    }
                ]
            },

            // Layout
            { name: 'orientation', type: 'list', enum: ['vertical', 'horizontal'], defaultValue: 'vertical' },
            { name: 'variant', type: 'list', enum: ['default', 'minimal', 'cards', 'connected'], defaultValue: 'default' },
            { name: 'size', type: 'list', enum: ['sm', 'md', 'lg'], defaultValue: 'md' },

            // Progress
            { name: 'showProgress', type: 'boolean', defaultValue: false },
            { name: 'currentStep', type: 'number', defaultValue: 1 },
            { name: 'showNumbers', type: 'boolean', defaultValue: true },

            // Styling
            { name: 'iconComponent', type: 'string', defaultValue: 'Icon' },
            { name: 'colorScheme', type: 'list', enum: ['primary', 'secondary', 'gradient'], defaultValue: 'primary' },

            // Behavior
            { name: 'interactive', type: 'boolean', defaultValue: false }
        ]
    },

    {
        component: CTA,
        name: 'BaseCTA',
        inputs: [
            // Content
            { name: 'title', type: 'richText', defaultValue: 'Ready to Get Started?' },
            { name: 'description', type: 'text', defaultValue: 'Join thousands of members who have already transformed their lives with our programs.' },
            { name: 'badgeText', type: 'string', defaultValue: '' },
            { name: 'badgeVariant', type: 'list', enum: ['new', 'popular', 'featured', 'limited', 'info'], defaultValue: 'featured' },
            { name: 'showBadge', type: 'boolean', defaultValue: false },

            // Primary Action
            { name: 'primaryText', type: 'string', defaultValue: 'Get Started Now' },
            { name: 'primaryUrl', type: 'url', defaultValue: '#' },
            { name: 'primaryVariant', type: 'list', enum: ['primary', 'secondary', 'ghost', 'gradient', 'outline'], defaultValue: 'gradient' },
            { name: 'primaryExternal', type: 'boolean', defaultValue: false },
            { name: 'primaryDisabled', type: 'boolean', defaultValue: false },

            // Secondary Action
            { name: 'secondaryText', type: 'string', defaultValue: 'Learn More' },
            { name: 'secondaryUrl', type: 'url', defaultValue: '#' },
            { name: 'secondaryVariant', type: 'list', enum: ['primary', 'secondary', 'ghost', 'gradient', 'outline'], defaultValue: 'outline' },
            { name: 'secondaryExternal', type: 'boolean', defaultValue: false },
            { name: 'secondaryDisabled', type: 'boolean', defaultValue: false },

            // Trust Indicators
            {
                name: 'trustIndicators',
                type: 'list',
                subFields: [
                    { name: 'text', type: 'string', defaultValue: 'Trust indicator' },
                    { name: 'icon', type: 'string', defaultValue: '' }
                ],
                defaultValue: []
            },

            // Styling
            { name: 'variant', type: 'list', enum: ['default', 'elevated', 'glass', 'gradient', 'outline', 'minimal'], defaultValue: 'default' },
            { name: 'size', type: 'list', enum: ['sm', 'md', 'lg', 'xl'], defaultValue: 'md' },
            { name: 'buttonSize', type: 'list', enum: ['sm', 'md', 'lg', 'xl'], defaultValue: 'lg' },
            { name: 'alignment', type: 'list', enum: ['left', 'center', 'right'], defaultValue: 'center' },

            // Colors
            { name: 'titleColor', type: 'string', defaultValue: '' },
            { name: 'descriptionColor', type: 'string', defaultValue: '' },
            { name: 'backgroundColor', type: 'string', defaultValue: '' },
            { name: 'borderColor', type: 'string', defaultValue: '' },

            // Layout
            { name: 'fullWidth', type: 'boolean', defaultValue: false },
            { name: 'spacing', type: 'list', enum: ['tight', 'normal', 'relaxed'], defaultValue: 'normal' },

            // Components
            { name: 'iconComponent', type: 'string', defaultValue: 'Icon' }
        ]
    },

    // === LEVEL UP WEEK COMPONENTS ===
    {
        component: LevelUpWeekHero,
        name: 'LevelUpWeekHero',
        inputs: [
            // Content
            { name: 'headline', type: 'richText', defaultValue: 'Level Up Week: Deine intensive <span style="color: #ff6b35;">Community-Woche</span>' },
            { name: 'subheadline', type: 'text', defaultValue: 'Die Level Up Weeks sind unser halbjährliches Community-Event, bei dem sich alles um deinen persönlichen Fortschritt dreht. Eine Woche voller intensiver Workshops, neuer Routinen und wertvollen Wissens – gemeinsam mit Gleichgesinnten.' },
            { name: 'badgeText', type: 'string', defaultValue: 'Halbjährliches Event' },
            { name: 'badgeVariant', type: 'list', enum: ['new', 'popular', 'featured', 'limited'], defaultValue: 'featured' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },

            // Event-specific content
            { name: 'nextEventDate', type: 'string', defaultValue: '' },
            { name: 'registrationDeadline', type: 'string', defaultValue: '' },
            { name: 'eventDuration', type: 'string', defaultValue: '7 Tage' },
            { name: 'showEventCountdown', type: 'boolean', defaultValue: false },
            { name: 'registrationStatus', type: 'string', defaultValue: 'Anmeldung offen' },

            // CTAs
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Zur nächsten Level Up Week anmelden' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#anmeldung' },
            { name: 'primaryCtaExternal', type: 'boolean', defaultValue: false },
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'Mehr über das Event erfahren' },
            { name: 'secondaryCtaUrl', type: 'url', defaultValue: '#details' },
            { name: 'secondaryCtaExternal', type: 'boolean', defaultValue: false },

            // Visual
            { name: 'heroImage', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png'], defaultValue: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=750&fit=crop&crop=center' },
            { name: 'heroImageAlt', type: 'string', defaultValue: 'Level Up Week Community Training' },
            { name: 'imageOverlay', type: 'boolean', defaultValue: false },
            { name: 'showImageBadge', type: 'boolean', defaultValue: true },
            { name: 'imageBadgeText', type: 'string', defaultValue: 'Community Event' },

            // Statistics
            { name: 'showStats', type: 'boolean', defaultValue: true },
            {
                name: 'statistics',
                type: 'list',
                subFields: [
                    { name: 'key', type: 'string' },
                    { name: 'value', type: 'number', defaultValue: 0, required: true },
                    { name: 'label', type: 'string', defaultValue: 'Statistik', required: true },
                    { name: 'suffix', type: 'string', defaultValue: '' },
                    { name: 'variant', type: 'string', defaultValue: 'primary' },
                    { name: 'description', type: 'string' },
                    { name: 'iconName', type: 'string' }
                ],
                defaultValue: []
            },
            { name: 'defaultCountUp', type: 'boolean', defaultValue: true },

            // Trust Indicators
            { name: 'showTrustIndicators', type: 'boolean', defaultValue: true },
            {
                name: 'trustIndicators',
                type: 'list',
                subFields: [
                    { name: 'indicator', type: 'string', required: true }
                ],
                defaultValue: [
                    { indicator: 'Halbjährliches Community-Event' },
                    { indicator: 'Intensive Workshops & Routinen' },
                    { indicator: 'Wertvolles Wissen & Fortschritt' }
                ]
            },

            // Floating Cards
            { name: 'showFloatingCards', type: 'boolean', defaultValue: true },
            { name: 'floatingCard1Title', type: 'string', defaultValue: 'Nächstes Event' },
            { name: 'floatingCard1Text', type: 'string', defaultValue: 'Jetzt anmelden' },
            { name: 'floatingCard1Icon', type: 'string', defaultValue: 'target' },
            { name: 'floatingCard2Title', type: 'string', defaultValue: 'Community' },
            { name: 'floatingCard2Text', type: 'string', defaultValue: 'Gleichgesinnte' },
            { name: 'floatingCard2Icon', type: 'string', defaultValue: 'people' },

            // Level Up Week specific
            { name: 'participantCount', type: 'number', defaultValue: 150 },
            { name: 'completionRate', type: 'number', defaultValue: 94 },
            { name: 'averageProgress', type: 'number', defaultValue: 85 },
            { name: 'communitySize', type: 'number', defaultValue: 500 },

            // Styling
            { name: 'backgroundColor', type: 'color', defaultValue: '#0f0f0f' },
            { name: 'headlineColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'subheadlineColor', type: 'color', defaultValue: '#d1d5db' }
        ]
    },

    {
        component: LevelUpWeekProgram,
        name: 'LevelUpWeekProgram',
        inputs: [
            // Content
            { name: 'headline', type: 'richText', defaultValue: 'Dein <span style="color: #ff6b35;">7-Tage Intensivprogramm</span>' },
            { name: 'subheadline', type: 'text', defaultValue: 'Jeder Tag der Level Up Week hat einen spezifischen Fokus. Von intensiven Workshops bis hin zu neuen Routinen – hier ist dein kompletter Überblick über die Woche.' },
            { name: 'badgeText', type: 'string', defaultValue: 'Programm-Überblick' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },

            // Overview Statistics
            { name: 'showOverviewStats', type: 'boolean', defaultValue: true },
            { name: 'totalDays', type: 'number', defaultValue: 7 },
            { name: 'workshopsCount', type: 'number', defaultValue: 14 },
            { name: 'participantCapacity', type: 'number', defaultValue: 150 },

            // Timeline
            { name: 'timelineOrientation', type: 'list', enum: ['vertical', 'horizontal'], defaultValue: 'vertical' },
            { name: 'timelineVariant', type: 'list', enum: ['default', 'minimal', 'cards', 'connected'], defaultValue: 'cards' },
            { name: 'timelineSize', type: 'list', enum: ['sm', 'md', 'lg'], defaultValue: 'md' },
            { name: 'showTimelineProgress', type: 'boolean', defaultValue: true },
            { name: 'currentDay', type: 'number', defaultValue: 1 },
            { name: 'showDayNumbers', type: 'boolean', defaultValue: true },
            { name: 'interactiveTimeline', type: 'boolean', defaultValue: false },

            // Daily Focus
            { name: 'showDailyFocus', type: 'boolean', defaultValue: true },
            { name: 'dailyFocusTitle', type: 'string', defaultValue: 'Tägliche Schwerpunkte' },
            { name: 'focusCardSize', type: 'list', enum: ['sm', 'md', 'lg'], defaultValue: 'md' },

            // Workshops
            { name: 'showWorkshops', type: 'boolean', defaultValue: true },
            { name: 'workshopsTitle', type: 'string', defaultValue: 'Workshop-Highlights' },
            { name: 'workshopCardSize', type: 'list', enum: ['sm', 'md', 'lg'], defaultValue: 'md' },

            // Schedule
            { name: 'showSchedule', type: 'boolean', defaultValue: true },
            { name: 'scheduleTitle', type: 'string', defaultValue: 'Wochenübersicht' },

            // CTA
            { name: 'showCta', type: 'boolean', defaultValue: true },
            { name: 'ctaTitle', type: 'string', defaultValue: 'Bereit für deine intensive Woche?' },
            { name: 'ctaDescription', type: 'text', defaultValue: 'Sichere dir deinen Platz für die nächste Level Up Week und erlebe eine Woche voller Fortschritt.' },
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Jetzt anmelden' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#anmeldung' },
            { name: 'primaryCtaExternal', type: 'boolean', defaultValue: false },
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'Fragen stellen' },
            { name: 'secondaryCtaUrl', type: 'url', defaultValue: '#kontakt' },
            { name: 'secondaryCtaExternal', type: 'boolean', defaultValue: false },

            // Styling
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'headlineColor', type: 'color', defaultValue: '#1f2937' },
            { name: 'subheadlineColor', type: 'color', defaultValue: '#6b7280' }
        ]
    },

    {
        component: LevelUpWeekBenefits,
        name: 'LevelUpWeekBenefits',
        inputs: [
            // Content
            { name: 'headline', type: 'richText', defaultValue: 'Was die <span style="color: #ff6b35;">Level Up Week</span> dir bringt' },
            { name: 'subheadline', type: 'text', defaultValue: 'Eine Woche, die dein Leben verändert. Erlebe intensive Workshops, baue neue Routinen auf und gewinne wertvolles Wissen – gemeinsam mit einer starken Community.' },
            { name: 'badgeText', type: 'string', defaultValue: 'Deine Vorteile' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },

            // Benefits
            { name: 'benefitCardSize', type: 'list', enum: ['sm', 'md', 'lg'], defaultValue: 'md' },

            // Metrics
            { name: 'showMetrics', type: 'boolean', defaultValue: true },
            { name: 'metricsTitle', type: 'string', defaultValue: 'Messbare Ergebnisse nach nur einer Woche' },
            { name: 'metricsSubtitle', type: 'string', defaultValue: 'Das erreichen unsere Teilnehmer durchschnittlich' },

            // Community Impact
            { name: 'showCommunityImpact', type: 'boolean', defaultValue: true },
            { name: 'communityImpactTitle', type: 'string', defaultValue: 'Die Kraft der Community' },
            { name: 'communityImpactDescription', type: 'text', defaultValue: 'Gemeinsam erreichen wir mehr. Die Level Up Week verbindet dich mit Gleichgesinnten und schafft langfristige Verbindungen.' },
            { name: 'communitySize', type: 'number', defaultValue: 500 },

            // Before/After Comparison
            { name: 'showComparison', type: 'boolean', defaultValue: true },
            { name: 'comparisonTitle', type: 'string', defaultValue: 'Deine Transformation in einer Woche' },
            { name: 'comparisonSubtitle', type: 'string', defaultValue: 'So veränderst du dich während der Level Up Week' },
            { name: 'beforeTitle', type: 'string', defaultValue: 'Ausgangssituation' },
            { name: 'beforeDescription', type: 'text', defaultValue: 'Wo du stehst, bevor die Level Up Week beginnt' },
            {
                name: 'beforePoints',
                type: 'list',
                subFields: [
                    { name: 'feature', type: 'string', defaultValue: 'Punkt' }
                ]
            },
            { name: 'afterTitle', type: 'string', defaultValue: 'Nach der Level Up Week' },
            { name: 'afterDescription', type: 'text', defaultValue: 'Was du nach einer intensiven Woche erreicht hast' },
            {
                name: 'afterPoints',
                type: 'list',
                subFields: [
                    { name: 'feature', type: 'string', defaultValue: 'Punkt' }
                ]
            },

            // Success Stories Preview
            { name: 'showSuccessPreview', type: 'boolean', defaultValue: true },
            { name: 'successPreviewTitle', type: 'string', defaultValue: 'Was andere erreicht haben' },
            { name: 'successPreviewSubtitle', type: 'string', defaultValue: 'Echte Ergebnisse von echten Teilnehmern' },

            // CTA
            { name: 'showCta', type: 'boolean', defaultValue: true },
            { name: 'ctaTitle', type: 'string', defaultValue: 'Bereit für deine eigene Transformation?' },
            { name: 'ctaDescription', type: 'text', defaultValue: 'Sichere dir deinen Platz für die nächste Level Up Week und erlebe, was in einer intensiven Woche möglich ist.' },
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Zur Level Up Week anmelden' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#anmeldung' },
            { name: 'primaryCtaExternal', type: 'boolean', defaultValue: false },
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'Kostenlose Beratung' },
            { name: 'secondaryCtaUrl', type: 'url', defaultValue: '#beratung' },
            { name: 'secondaryCtaExternal', type: 'boolean', defaultValue: false },

            // Styling
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'headlineColor', type: 'color', defaultValue: '#1f2937' },
            { name: 'subheadlineColor', type: 'color', defaultValue: '#6b7280' }
        ]
    },

    {
        component: LevelUpWeekTestimonials,
        name: 'LevelUpWeekTestimonials',
        inputs: [
            // Content
            { name: 'headline', type: 'richText', defaultValue: 'Echte <span style="color: #ff6b35;">Erfolgsgeschichten</span> aus der Community' },
            { name: 'subheadline', type: 'text', defaultValue: 'Höre direkt von Teilnehmern der Level Up Week, wie eine intensive Woche ihr Leben verändert hat. Diese authentischen Geschichten zeigen, was möglich ist.' },
            { name: 'badgeText', type: 'string', defaultValue: 'Community Stories' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },

            // Summary Statistics
            { name: 'showSummaryStats', type: 'boolean', defaultValue: true },
            { name: 'summaryStatsTitle', type: 'string', defaultValue: 'Community-Erfolge in Zahlen' },
            { name: 'summaryStatsSubtitle', type: 'string', defaultValue: 'Was unsere Teilnehmer gemeinsam erreicht haben' },

            // Featured Testimonials
            { name: 'showFeaturedTestimonials', type: 'boolean', defaultValue: true },

            // Community Testimonials
            { name: 'showCommunityTestimonials', type: 'boolean', defaultValue: true },
            { name: 'communityTestimonialsTitle', type: 'string', defaultValue: 'Stimmen aus der Community' },
            { name: 'communityTestimonialsSubtitle', type: 'string', defaultValue: 'Was Teilnehmer über ihre Level Up Week sagen' },

            // Progress Highlights
            { name: 'showProgressHighlights', type: 'boolean', defaultValue: true },
            { name: 'progressHighlightsTitle', type: 'string', defaultValue: 'Durchschnittliche Verbesserungen' },
            { name: 'progressHighlightsSubtitle', type: 'string', defaultValue: 'Das erreichen unsere Teilnehmer in nur 7 Tagen' },

            // Before/After Stories
            { name: 'showBeforeAfter', type: 'boolean', defaultValue: true },
            { name: 'beforeAfterTitle', type: 'string', defaultValue: 'Transformation in 7 Tagen' },
            { name: 'beforeAfterSubtitle', type: 'string', defaultValue: 'Echte Vorher-Nachher Geschichten' },

            // Community Feedback
            { name: 'showCommunityFeedback', type: 'boolean', defaultValue: true },
            { name: 'communityFeedbackTitle', type: 'string', defaultValue: 'Die Community spricht für sich' },
            { name: 'communityFeedbackDescription', type: 'text', defaultValue: 'Diese Zahlen zeigen die Kraft einer starken Gemeinschaft' },

            // CTA
            { name: 'showCta', type: 'boolean', defaultValue: true },
            { name: 'ctaTitle', type: 'string', defaultValue: 'Schreibe deine eigene Erfolgsgeschichte' },
            { name: 'ctaDescription', type: 'text', defaultValue: 'Werde Teil der nächsten Level Up Week und erlebe, was in einer intensiven Woche möglich ist.' },
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Meine Level Up Week starten' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#anmeldung' },
            { name: 'primaryCtaExternal', type: 'boolean', defaultValue: false },
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'Success Stories ansehen' },
            { name: 'secondaryCtaUrl', type: 'url', defaultValue: '#stories' },
            { name: 'secondaryCtaExternal', type: 'boolean', defaultValue: false },

            // Styling
            { name: 'backgroundColor', type: 'color', defaultValue: '#f8fafc' },
            { name: 'headlineColor', type: 'color', defaultValue: '#1f2937' },
            { name: 'subheadlineColor', type: 'color', defaultValue: '#6b7280' }
        ]
    },

    // === BASE COMPONENTS ===
    {
        component: Modal,
        name: 'BaseModal',
        inputs: [
            { name: 'show', type: 'boolean', defaultValue: false },
            { name: 'closeOnBackdrop', type: 'boolean', defaultValue: true },
            { name: 'maxWidth', type: 'list', enum: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'], defaultValue: 'lg' },
            { name: 'backdrop', type: 'list', enum: ['blur', 'dark', 'glass'], defaultValue: 'glass' },
            { name: 'contentClass', type: 'string', defaultValue: '' }
        ]
    },
    {
        component: GallerySection,
        name: 'BaseGallerySection',
        inputs: [
            // Content
            { name: 'tagline', type: 'string', defaultValue: 'Tagline' },
            { name: 'headline', type: 'string', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'description', type: 'text', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },

            // Images (4 images exactly)
            {
                name: 'images',
                type: 'list',
                subFields: [
                    { name: 'src', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp', 'svg'] },
                    { name: 'alt', type: 'string', defaultValue: '' }
                ],
                defaultValue: []
            },

            // Styling
            { name: 'gap', type: 'list', enum: ['sm', 'md', 'lg'], defaultValue: 'md' },
            { name: 'badgeVariant', type: 'list', enum: ['new', 'popular', 'featured', 'limited', 'success', 'warning', 'info', 'neutral'], defaultValue: 'featured' },
            { name: 'backgroundColor', type: 'color', defaultValue: 'var(--color-gray-50)' },
            { name: 'headlineColor', type: 'color', defaultValue: 'var(--color-gray-900)' },
            { name: 'descriptionColor', type: 'color', defaultValue: 'var(--color-gray-700)' },
            { name: 'showOverlay', type: 'boolean', defaultValue: true }
        ]
    },

    {
        component: GalleryGrid,
        name: 'BaseGalleryGrid',
        inputs: [
            // Content
            { name: 'tagline', type: 'string', defaultValue: 'Tagline' },
            { name: 'headline', type: 'string', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'description', type: 'text', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },

            // Images
            {
                name: 'images',
                type: 'list',
                subFields: [
                    { name: 'src', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp', 'svg'] },
                    { name: 'alt', type: 'string', defaultValue: '' }
                ],
                defaultValue: []
            },

            // Layout
            { name: 'gap', type: 'list', enum: ['sm', 'md', 'lg'], defaultValue: 'md' },
            { name: 'imageAspectRatio', type: 'list', enum: ['auto', '1/1', '4/3', '16/9', '3/4'], defaultValue: 'auto' },
            { name: 'bottomImageAspectRatio', type: 'list', enum: ['auto', '16/9', '21/9', '2/1'], defaultValue: 'auto' },

            // Styling
            { name: 'backgroundColor', type: 'color', defaultValue: 'var(--color-gray-50)' },
            { name: 'taglineColor', type: 'color', defaultValue: 'var(--color-primary)' },
            { name: 'headlineColor', type: 'color', defaultValue: 'var(--color-gray-900)' },
            { name: 'descriptionColor', type: 'color', defaultValue: 'var(--color-gray-700)' },
            { name: 'showOverlay', type: 'boolean', defaultValue: true }
        ]
    },

    {
        component: AlternatingFeatures,
        name: 'BaseAlternatingFeatures',
        inputs: [
            // Section Header
            { name: 'tagline', type: 'string', defaultValue: 'Tagline' },
            { name: 'headline', type: 'string', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'subheadline', type: 'text', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },

            // Features List
            {
                name: 'features',
                type: 'list',
                subFields: [
                    { name: 'number', type: 'string', defaultValue: '01' },
                    { name: 'heading', type: 'string', defaultValue: 'Lorem ipsum dolor sit amet' },
                    { name: 'description', type: 'text', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu id pellentesque placerat elerismod.' },
                    { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'] },
                    { name: 'imageAlt', type: 'string', defaultValue: '' },
                    { name: 'primaryButtonText', type: 'string', defaultValue: 'Contact' },
                    { name: 'primaryButtonUrl', type: 'url', defaultValue: '#' },
                    { name: 'secondaryButtonText', type: 'string', defaultValue: 'See more' },
                    { name: 'secondaryButtonUrl', type: 'url', defaultValue: '#' }
                ],
                defaultValue: [
                    {
                        number: '01',
                        heading: 'Lorem ipsum dolor sit amet',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu id pellentesque placerat elerismod.',
                        primaryButtonText: 'Contact',
                        primaryButtonUrl: '#',
                        secondaryButtonText: 'See more',
                        secondaryButtonUrl: '#'
                    },
                    {
                        number: '02',
                        heading: 'Lorem ipsum dolor sit amet',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu id pellentesque placerat elerismod.',
                        primaryButtonText: 'Contact',
                        primaryButtonUrl: '#',
                        secondaryButtonText: 'See more',
                        secondaryButtonUrl: '#'
                    },
                    {
                        number: '03',
                        heading: 'Lorem ipsum dolor sit amet',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu id pellentesque placerat elerismod.',
                        primaryButtonText: 'Contact',
                        primaryButtonUrl: '#',
                        secondaryButtonText: 'See more',
                        secondaryButtonUrl: '#'
                    },
                    {
                        number: '04',
                        heading: 'Lorem ipsum dolor sit amet',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu id pellentesque placerat elerismod.',
                        primaryButtonText: 'Contact',
                        primaryButtonUrl: '#',
                        secondaryButtonText: 'See more',
                        secondaryButtonUrl: '#'
                    }
                ]
            },

            // Styling
            { name: 'sectionBackgroundColor', type: 'color', defaultValue: 'var(--color-white)' }
        ]
    },

    {
        component: BentoGrid,
        name: 'BaseBentoGrid',
        inputs: [
            // Section Header
            { name: 'tagline', type: 'string', defaultValue: 'Tagline' },
            { name: 'headline', type: 'string', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'subheadline', type: 'text', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },

            // Featured Card (Left)
            {
                name: 'featuredCard',
                type: 'object',
                subFields: [
                    { name: 'type', type: 'text', enum: ['image', 'content'], defaultValue: 'image' },
                    { name: 'heading', type: 'string', defaultValue: 'Lorem ipsum' },
                    { name: 'description', type: 'text', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                    { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'] },
                    { name: 'imageAlt', type: 'string', defaultValue: '' },
                    { name: 'buttonText', type: 'string', defaultValue: 'Learn more' },
                    { name: 'buttonUrl', type: 'url', defaultValue: '#' },
                    { name: 'backgroundColor', type: 'color', defaultValue: 'var(--color-gray-200)' },
                    { name: 'textColor', type: 'color', defaultValue: 'var(--color-white)' }
                ],
                defaultValue: {
                    type: 'image'
                }
            },

            // Cards (Right Grid)
            {
                name: 'cards',
                type: 'list',
                subFields: [
                    { name: 'type', type: 'text', enum: ['image', 'content'], defaultValue: 'image' },
                    { name: 'heading', type: 'string', defaultValue: 'Lorem ipsum' },
                    { name: 'description', type: 'text', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu id pellentesque placerat elerismod.' },
                    { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'] },
                    { name: 'imageAlt', type: 'string', defaultValue: '' },
                    { name: 'buttonText', type: 'string', defaultValue: 'Learn more' },
                    { name: 'buttonUrl', type: 'url', defaultValue: '#' },
                    { name: 'backgroundColor', type: 'color', defaultValue: 'var(--color-gray-200)' },
                    { name: 'textColor', type: 'color', defaultValue: 'var(--color-white)' },
                    { name: 'spanFull', type: 'boolean', defaultValue: false }
                ],
                defaultValue: [
                    {
                        type: 'content',
                        heading: 'Lorem ipsum',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu id pellentesque placerat elerismod.',
                        buttonText: 'Learn more',
                        buttonUrl: '#',
                        backgroundColor: 'var(--color-gray-900)',
                        textColor: 'var(--color-white)'
                    },
                    {
                        type: 'image'
                    },
                    {
                        type: 'image',
                        spanFull: true
                    }
                ]
            },

            // Styling
            { name: 'sectionBackgroundColor', type: 'color', defaultValue: 'var(--color-white)' }
        ]
    },

    {
        component: FeatureShowcase,
        name: 'BaseFeatureShowcase',
        inputs: [
            // Section Header
            { name: 'tagline', type: 'string', defaultValue: 'Tagline' },
            { name: 'headline', type: 'string', defaultValue: 'Lorem ipsum dolor sit amet consectetur adipiscing' },
            { name: 'description', type: 'text', defaultValue: 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim tempor sunt.' },

            // Featured Items (Slider)
            {
                name: 'featuredItems',
                type: 'list',
                subFields: [
                    { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'] },
                    { name: 'imageAlt', type: 'string', defaultValue: '' },
                    { name: 'heading', type: 'string', defaultValue: 'Lorem ipsum' },
                    { name: 'description', type: 'text', defaultValue: 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim.' }
                ],
                defaultValue: [
                    {
                        heading: 'Lorem ipsum',
                        description: 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim.'
                    },
                    {
                        heading: 'Lorem ipsum 2',
                        description: 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim.'
                    }
                ]
            },

            // Styling
            { name: 'sectionBackgroundColor', type: 'color', defaultValue: 'var(--color-white)' }
        ]
    },

    {
        component: FeatureGrid,
        name: 'BaseFeatureGrid',
        inputs: [
            // Section Header
            { name: 'tagline', type: 'string', defaultValue: 'Tagline' },
            { name: 'headline', type: 'string', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'description', type: 'text', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },

            // Button (Optional)
            { name: 'showButton', type: 'boolean', defaultValue: true },
            { name: 'buttonText', type: 'string', defaultValue: 'View all' },
            { name: 'buttonUrl', type: 'string', defaultValue: '#' },

            // Features
            {
                name: 'features',
                type: 'list',
                subFields: [
                    { name: 'number', type: 'string', defaultValue: '01' },
                    { name: 'heading', type: 'string', defaultValue: 'Lorem ipsum dolor sit amet' },
                    { name: 'description', type: 'text', defaultValue: 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim.' },
                    { name: 'backgroundColor', type: 'color', defaultValue: 'var(--color-gray-100)' },
                    { name: 'numberColor', type: 'color', defaultValue: 'var(--color-gray-400)' },
                    { name: 'headingColor', type: 'color', defaultValue: 'var(--color-gray-900)' },
                    { name: 'descriptionColor', type: 'color', defaultValue: 'var(--color-gray-600)' }
                ],
                defaultValue: [
                    {
                        number: '01',
                        heading: 'Lorem ipsum dolor sit amet',
                        description: 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim and more lorem.',
                        backgroundColor: 'var(--color-gray-900)',
                        numberColor: 'var(--color-gray-700)',
                        headingColor: 'var(--color-white)',
                        descriptionColor: 'var(--color-gray-300)'
                    },
                    {
                        number: '02',
                        heading: 'Lorem ipsum dolor sit amet',
                        description: 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim.',
                        backgroundColor: 'var(--color-gray-100)',
                        numberColor: 'var(--color-gray-400)',
                        headingColor: 'var(--color-gray-900)',
                        descriptionColor: 'var(--color-gray-600)'
                    },
                    {
                        number: '03',
                        heading: 'Lorem ipsum dolor sit amet',
                        description: 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim.',
                        backgroundColor: 'var(--color-gray-100)',
                        numberColor: 'var(--color-gray-400)',
                        headingColor: 'var(--color-gray-900)',
                        descriptionColor: 'var(--color-gray-600)'
                    },
                    {
                        number: '04',
                        heading: 'Lorem ipsum dolor sit amet',
                        description: 'Aliqua id fugiat nostrud lorem est dolus sit amet. Duis exercitation dolor sed tempor incididunt ut labore et dolore minim lorem anim.',
                        backgroundColor: 'var(--color-gray-100)',
                        numberColor: 'var(--color-gray-400)',
                        headingColor: 'var(--color-gray-900)',
                        descriptionColor: 'var(--color-gray-600)'
                    }
                ]
            },

            // Styling
            { name: 'sectionBackgroundColor', type: 'color', defaultValue: 'var(--color-white)' }
        ]
    },

    {
        component: ContentImageGrid,
        name: 'BaseContentImageGrid',
        inputs: [
            // Section Header
            { name: 'tagline', type: 'string', defaultValue: 'Tagline' },
            { name: 'headline', type: 'string', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'description', type: 'text', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },
            { name: 'sectionBackgroundColor', type: 'color', defaultValue: 'var(--color-gray-50)' },

            // Content Card
            { name: 'contentHeading', type: 'string', defaultValue: 'Lorem ipsum dolor sit' },
            { name: 'contentDescription', type: 'text', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit lobortis arcu enim urna adipiscing praesent velit viverra sit semper lorem eu cursus vel hendrerit elementum morbi curabitur etiam nibh justo.' },
            { name: 'ctaText', type: 'string', defaultValue: 'Contact now' },
            { name: 'ctaUrl', type: 'url', defaultValue: '#' },

            // Feature Pills
            {
                name: 'featurePills',
                type: 'list',
                subFields: [
                    { name: 'text', type: 'string', defaultValue: 'Feature item' }
                ],
                defaultValue: [
                    { text: 'Feature item' },
                    { text: 'Feature item' },
                    { text: 'Feature item' },
                    { text: 'Feature item' }
                ]
            },

            // Images
            { name: 'image1', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'], defaultValue: '' },
            { name: 'image1Alt', type: 'string', defaultValue: 'Feature image 1' },
            { name: 'image2', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'], defaultValue: '' },
            { name: 'image2Alt', type: 'string', defaultValue: 'Feature image 2' },
            { name: 'image3', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'], defaultValue: '' },
            { name: 'image3Alt', type: 'string', defaultValue: 'Feature image 3' },

            // Image Settings
            { name: 'imageAspectRatio', type: 'string', defaultValue: '4/3' }
        ]
    },

    {
        component: ContentStatsGallery,
        name: 'BaseContentStatsGallery',
        inputs: [
            // Section Header
            { name: 'tagline', type: 'string', defaultValue: 'Tagline' },
            { name: 'headline', type: 'string', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'description', type: 'text', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.' },
            { name: 'sectionBackgroundColor', type: 'color', defaultValue: 'var(--color-white)' },

            // Statistics
            {
                name: 'statistics',
                type: 'list',
                subFields: [
                    { name: 'value', type: 'string', defaultValue: '100', required: true },
                    { name: 'suffix', type: 'string', defaultValue: '+' },
                    { name: 'label', type: 'string', defaultValue: 'Lorem ipsum', required: true }
                ],
                defaultValue: [
                    { value: '100', suffix: '+', label: 'Lorem ipsum' },
                    { value: '50', suffix: 'k', label: 'Class aptent' },
                    { value: '23', suffix: '+', label: 'Aliquam in' },
                    { value: '10', suffix: 'M+', label: 'Vestibulum' }
                ]
            },

            // Gallery Images
            {
                name: 'galleryImages',
                type: 'list',
                subFields: [
                    { name: 'src', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'] },
                    { name: 'alt', type: 'string', defaultValue: 'Gallery image' }
                ],
                defaultValue: [
                    { src: '', alt: 'Gallery image 1' },
                    { src: '', alt: 'Gallery image 2' },
                    { src: '', alt: 'Gallery image 3' },
                    { src: '', alt: 'Gallery image 4' },
                    { src: '', alt: 'Gallery image 5' }
                ]
            },

            // Gallery Settings
            { name: 'galleryLayout', type: 'text', enum: ['scroll', 'grid'], defaultValue: 'scroll' },
            { name: 'imageAspectRatio', type: 'string', defaultValue: '4/3' },
            { name: 'imageWidth', type: 'string', defaultValue: '280px' }
        ]
    },

    {
        component: StatsFeatureCards,
        name: 'BaseStatsFeatureCards',
        inputs: [
            // Section Header
            { name: 'tagline', type: 'string', defaultValue: 'Tagline' },
            { name: 'headline', type: 'string', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'description', type: 'text', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },
            { name: 'sectionBackgroundColor', type: 'color', defaultValue: 'var(--color-white)' },

            // Statistics
            {
                name: 'statistics',
                type: 'list',
                subFields: [
                    { name: 'value', type: 'string', defaultValue: '100', required: true },
                    { name: 'suffix', type: 'string', defaultValue: '+' },
                    { name: 'label', type: 'string', defaultValue: 'Lorem ipsum', required: true }
                ],
                defaultValue: [
                    { value: '100', suffix: '+', label: 'Lorem ipsum' },
                    { value: '50', suffix: '+', label: 'Class aptent' },
                    { value: '5', suffix: '+', label: 'Aliquam in' }
                ]
            },

            // Feature Cards
            {
                name: 'featureCards',
                type: 'list',
                subFields: [
                    { name: 'icon', type: 'string', defaultValue: '📦' },
                    { name: 'heading', type: 'string', defaultValue: 'Lorem ipsum', required: true },
                    { name: 'description', type: 'text', defaultValue: 'Lorem ipsum dolor sit amet consectetur adipiscing elit lectus dapibus.', required: true }
                ],
                defaultValue: [
                    {
                        icon: '📦',
                        heading: 'Lorem ipsum',
                        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit lectus dapibus.'
                    },
                    {
                        icon: '📦',
                        heading: 'Lorem ipsum',
                        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit lectus dapibus.'
                    },
                    {
                        icon: '📦',
                        heading: 'Lorem ipsum',
                        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit lectus dapibus.'
                    }
                ]
            },

            // Styling
            { name: 'cardBackgroundColor', type: 'color', defaultValue: 'var(--color-gray-100)' },
            { name: 'iconSize', type: 'string', defaultValue: '2.5rem' }
        ]
    },

    {
        component: ContentBentoGrid,
        name: 'BaseContentBentoGrid',
        inputs: [
            // Section Header
            { name: 'tagline', type: 'string', defaultValue: 'Tagline' },
            { name: 'headline', type: 'string', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'description', type: 'text', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },
            { name: 'sectionBackgroundColor', type: 'color', defaultValue: 'var(--color-white)' },

            // Cell 1 (Content Card - Top Left)
            { name: 'cell1Icon', type: 'string', defaultValue: '📦' },
            { name: 'cell1Heading', type: 'string', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'cell1Description', type: 'text', defaultValue: 'Lorem ipsum dolor sit amet consectetur adipiscin.' },
            { name: 'cell1BackgroundColor', type: 'color', defaultValue: 'var(--color-gray-100)' },
            { name: 'cell1MinHeight', type: 'string', defaultValue: '250px' },

            // Cell 2 (Image - Top Middle, spans 2 rows)
            { name: 'cell2Image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'], defaultValue: '' },
            { name: 'cell2ImageAlt', type: 'string', defaultValue: 'Feature image 2' },
            { name: 'cell2MinHeight', type: 'string', defaultValue: '400px' },

            // Cell 3 (Image - Top Right)
            { name: 'cell3Image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'], defaultValue: '' },
            { name: 'cell3ImageAlt', type: 'string', defaultValue: 'Feature image 3' },
            { name: 'cell3MinHeight', type: 'string', defaultValue: '250px' },

            // Cell 4 (Image - Bottom Left)
            { name: 'cell4Image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'], defaultValue: '' },
            { name: 'cell4ImageAlt', type: 'string', defaultValue: 'Feature image 4' },
            { name: 'cell4MinHeight', type: 'string', defaultValue: '250px' },

            // Cell 5 (Content Card with CTA - Bottom Right)
            { name: 'cell5Heading', type: 'string', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'cell5Description', type: 'text', defaultValue: 'Lorem ipsum dolor sit amet consectetur adipiscing elit lectus dapibus natoque viverra in lectus mauris sit elementum in lectus mauris sit eget.' },
            { name: 'cell5CtaText', type: 'string', defaultValue: 'Contact Us' },
            { name: 'cell5CtaUrl', type: 'url', defaultValue: '#' },
            { name: 'cell5BackgroundColor', type: 'color', defaultValue: 'var(--color-gray-100)' },
            { name: 'cell5MinHeight', type: 'string', defaultValue: '250px' },

            // Global Settings
            { name: 'iconSize', type: 'string', defaultValue: '2.5rem' }
        ]
    },

    {
        component: ContentSection48,
        name: 'BaseContentSection48',
        inputs: [
            // Header Section
            { name: 'tagline', type: 'string', defaultValue: 'Tagline' },
            { name: 'heading', type: 'string', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'description', type: 'text', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },

            // Card Content
            { name: 'cardHeading', type: 'string', defaultValue: 'Ut tempus dui non enim accumsan, eu rutrum' },
            { name: 'cardDescription', type: 'text', defaultValue: 'Cras in nibh lacus. Sed in congue sapien. Vestibulum euismod, orci quis vehicula consectetur, lacus magna fringilla lectus, et commodo orci tellus egestas dui.' },

            // Button
            { name: 'buttonText', type: 'string', defaultValue: 'Contact Us' },
            { name: 'buttonVariant', type: 'text', enum: ['primary', 'secondary', 'secondaryFull', 'ghost', 'gradient', 'outline'], defaultValue: 'primary' },
            { name: 'buttonSize', type: 'text', enum: ['sm', 'md', 'lg', 'xl'], defaultValue: 'md' },

            // Media
            { name: 'mediaType', type: 'text', enum: ['image', 'video'], defaultValue: 'video' },
            { name: 'mediaUrl', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp', 'mp4', 'webm'], defaultValue: '' },
            { name: 'videoThumbnail', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'], defaultValue: '' },
            { name: 'mediaAlt', type: 'string', defaultValue: 'Media content' },
            { name: 'showPlayButton', type: 'boolean', defaultValue: true },
            { name: 'playButtonLabel', type: 'string', defaultValue: 'Play video' },
            { name: 'aspectRatio', type: 'string', defaultValue: '56.25%' }
        ]
    },

    {
        component: ContentSection71,
        name: 'ContentSection71',
        inputs: [
            // === LAYOUT ===
            { name: 'layoutColumns', type: 'text', enum: ['1-column', '2-columns'], defaultValue: '2-columns' },
            { name: 'imagePosition', type: 'text', enum: ['left', 'right'], defaultValue: 'left' },

            // === VISIBILITY TOGGLES ===
            { name: 'showTagline', type: 'boolean', defaultValue: true },
            { name: 'showHeadline', type: 'boolean', defaultValue: true },
            { name: 'showDescription', type: 'boolean', defaultValue: true },
            { name: 'showImage', type: 'boolean', defaultValue: true },
            { name: 'showStatistics', type: 'boolean', defaultValue: true },

            // === CONTENT ===
            { name: 'tagline', type: 'richText', defaultValue: 'Tagline' },
            { name: 'headline', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet consectetur adipiscing' },
            { name: 'description', type: 'richText', defaultValue: '' },

            // === IMAGE ===
            { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'], defaultValue: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=600&fit=crop' },
            { name: 'imageAlt', type: 'string', defaultValue: 'Content Image' },
            { name: 'imageAspectRatio', type: 'string', defaultValue: '4/3' },
            { name: 'showImageShadow', type: 'boolean', defaultValue: true },

            // === STATISTICS ===
            {
                name: 'statistics',
                type: 'list',
                defaultValue: [
                    {
                        value: 75,
                        suffix: '%',
                        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.'
                    },
                    {
                        value: 83,
                        suffix: '%',
                        description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.'
                    }
                ],
                subFields: [
                    { name: 'value', type: 'number', required: true, defaultValue: 50 },
                    { name: 'suffix', type: 'string', defaultValue: '%' },
                    { name: 'description', type: 'richText', required: true, defaultValue: 'Statistic description' }
                ]
            },

            // === COLORS ===
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'taglineColor', type: 'color', defaultValue: '#374151' },
            { name: 'headlineColor', type: 'color', defaultValue: '#111827' },
            { name: 'descriptionColor', type: 'color', defaultValue: '#4b5563' },
            { name: 'statValueColor', type: 'color', defaultValue: '#111827' },
            { name: 'statDescriptionColor', type: 'color', defaultValue: '#4b5563' }
        ]
    },

    {
        component: ContentSection68,
        name: 'ContentSection68',
        inputs: [
            // === VISIBILITY TOGGLES ===
            { name: 'showTagline', type: 'boolean', defaultValue: true },
            { name: 'showHeadline', type: 'boolean', defaultValue: true },
            { name: 'showDescription', type: 'boolean', defaultValue: true },
            { name: 'showIconCard', type: 'boolean', defaultValue: true },
            { name: 'showIcon', type: 'boolean', defaultValue: true },
            { name: 'showImage1', type: 'boolean', defaultValue: true },
            { name: 'showImage2', type: 'boolean', defaultValue: true },
            { name: 'showImage3', type: 'boolean', defaultValue: true },
            { name: 'showImage4', type: 'boolean', defaultValue: true },
            { name: 'showTextCard', type: 'boolean', defaultValue: true },
            { name: 'showCta', type: 'boolean', defaultValue: true },

            // === SECTION HEADER ===
            { name: 'tagline', type: 'richText', defaultValue: 'Tagline' },
            { name: 'headline', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'description', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },

            // === SECTION COLORS ===
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'taglineColor', type: 'color', defaultValue: '#6366f1' },
            { name: 'headlineColor', type: 'color', defaultValue: '#111827' },
            { name: 'descriptionColor', type: 'color', defaultValue: '#6b7280' },

            // === ICON CARD ===
            { name: 'icon', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'], defaultValue: '' },
            { name: 'iconAlt', type: 'string', defaultValue: 'Icon' },
            { name: 'iconCardTitle', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'iconCardDescription', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet consectetur adipiscin.' },
            { name: 'iconCardBackgroundColor', type: 'color', defaultValue: '#f9fafb' },
            { name: 'iconCardTitleColor', type: 'color', defaultValue: '#111827' },
            { name: 'iconCardDescriptionColor', type: 'color', defaultValue: '#6b7280' },

            // === IMAGE 1 ===
            { name: 'image1', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'], defaultValue: '' },
            { name: 'image1Alt', type: 'string', defaultValue: 'Image 1' },
            { name: 'image1AspectRatio', type: 'string', defaultValue: '4/3' },
            { name: 'image1PlaceholderColor', type: 'color', defaultValue: '#d1d5db' },

            // === IMAGE 2 ===
            { name: 'image2', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'], defaultValue: '' },
            { name: 'image2Alt', type: 'string', defaultValue: 'Image 2' },
            { name: 'image2AspectRatio', type: 'string', defaultValue: '4/3' },
            { name: 'image2PlaceholderColor', type: 'color', defaultValue: '#d1d5db' },

            // === IMAGE 3 ===
            { name: 'image3', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'], defaultValue: '' },
            { name: 'image3Alt', type: 'string', defaultValue: 'Image 3' },
            { name: 'image3AspectRatio', type: 'string', defaultValue: '4/3' },
            { name: 'image3PlaceholderColor', type: 'color', defaultValue: '#d1d5db' },

            // === IMAGE 4 ===
            { name: 'image4', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'], defaultValue: '' },
            { name: 'image4Alt', type: 'string', defaultValue: 'Image 4' },
            { name: 'image4AspectRatio', type: 'string', defaultValue: '4/3' },
            { name: 'image4PlaceholderColor', type: 'color', defaultValue: '#d1d5db' },

            // === TEXT CARD ===
            { name: 'textCardTitle', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'textCardDescription', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet consectetur adipiscing elit lectus dapibus natoque viverra in lectus mauris est elementum in lectus curabitur vivamus sit eget.' },
            { name: 'textCardBackgroundColor', type: 'color', defaultValue: '#f9fafb' },
            { name: 'textCardTitleColor', type: 'color', defaultValue: '#111827' },
            { name: 'textCardDescriptionColor', type: 'color', defaultValue: '#6b7280' },

            // === CTA ===
            { name: 'ctaText', type: 'string', defaultValue: 'Contact Us' },
            { name: 'ctaUrl', type: 'url', defaultValue: '' },
            { name: 'ctaBackgroundColor', type: 'color', defaultValue: '#000000' }
        ]
    },

    {
        component: ContentSection82,
        name: 'ContentSection82',
        inputs: [
            // === VISIBILITY TOGGLES ===
            { name: 'showTagline', type: 'boolean', defaultValue: true },
            { name: 'showHeadline', type: 'boolean', defaultValue: true },
            { name: 'showDescription', type: 'boolean', defaultValue: true },
            { name: 'showContentBlock', type: 'boolean', defaultValue: true },
            { name: 'showCta', type: 'boolean', defaultValue: true },
            { name: 'showFeatureItems', type: 'boolean', defaultValue: true },
            { name: 'showFeaturedImage', type: 'boolean', defaultValue: true },
            { name: 'showBottomImages', type: 'boolean', defaultValue: true },
            { name: 'showBottomImage1', type: 'boolean', defaultValue: true },
            { name: 'showBottomImage2', type: 'boolean', defaultValue: true },

            // === LAYOUT ===
            { name: 'contentPosition', type: 'text', enum: ['left', 'right'], defaultValue: 'left' },

            // === SECTION HEADER ===
            { name: 'tagline', type: 'richText', defaultValue: 'Tagline' },
            { name: 'headline', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'description', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },

            // === SECTION COLORS ===
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'taglineColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'headlineColor', type: 'color', defaultValue: '#111827' },
            { name: 'descriptionColor', type: 'color', defaultValue: '#6b7280' },

            // === CONTENT BLOCK ===
            { name: 'contentBlockHeadline', type: 'richText', defaultValue: 'Lorem ipsum dolor sit' },
            { name: 'contentBlockDescription', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit lobortis arcu enim urna adipiscing praesent velit viverra sit semper lorem eu cursus vel hendrerit elementum morbi curabitur etiam nibh justo.' },
            { name: 'contentBlockHeadlineColor', type: 'color', defaultValue: '#111827' },
            { name: 'contentBlockDescriptionColor', type: 'color', defaultValue: '#6b7280' },

            // === CTA ===
            { name: 'ctaText', type: 'string', defaultValue: 'Contact now' },
            { name: 'ctaUrl', type: 'url', defaultValue: '' },
            { name: 'ctaColor', type: 'color', defaultValue: '#111827' },

            // === FEATURE ITEMS ===
            {
                name: 'featureItems',
                type: 'list',
                defaultValue: [
                    { text: 'Feature item' },
                    { text: 'Feature item' },
                    { text: 'Feature item' },
                    { text: 'Feature item' }
                ],
                subFields: [
                    { name: 'text', type: 'string', required: true, defaultValue: 'Feature item' }
                ]
            },
            { name: 'featureItemBackgroundColor', type: 'color', defaultValue: '#f3f4f6' },
            { name: 'featureItemTextColor', type: 'color', defaultValue: '#111827' },

            // === FEATURED IMAGE ===
            { name: 'featuredImage', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'], defaultValue: '' },
            { name: 'featuredImageAlt', type: 'string', defaultValue: 'Featured Image' },
            { name: 'featuredImageAspectRatio', type: 'string', defaultValue: '4/3' },
            { name: 'featuredImagePlaceholderColor', type: 'color', defaultValue: '#d1d5db' },

            // === BOTTOM IMAGE 1 ===
            { name: 'bottomImage1', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'], defaultValue: '' },
            { name: 'bottomImage1Alt', type: 'string', defaultValue: 'Bottom Image 1' },
            { name: 'bottomImage1AspectRatio', type: 'string', defaultValue: '16/9' },
            { name: 'bottomImage1PlaceholderColor', type: 'color', defaultValue: '#d1d5db' },

            // === BOTTOM IMAGE 2 ===
            { name: 'bottomImage2', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'], defaultValue: '' },
            { name: 'bottomImage2Alt', type: 'string', defaultValue: 'Bottom Image 2' },
            { name: 'bottomImage2AspectRatio', type: 'string', defaultValue: '16/9' },
            { name: 'bottomImage2PlaceholderColor', type: 'color', defaultValue: '#d1d5db' }
        ]
    },

    {
        component: CTASection11,
        name: 'CTASection11',
        inputs: [
            // === VISIBILITY TOGGLES ===
            { name: 'showHeadline', type: 'boolean', defaultValue: true },
            { name: 'showDescription', type: 'boolean', defaultValue: true },
            { name: 'showForm', type: 'boolean', defaultValue: true },
            { name: 'showDisclaimer', type: 'boolean', defaultValue: true },

            // === CONTENT ===
            { name: 'headline', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'description', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },

            // === FORM ===
            { name: 'inputPlaceholder', type: 'string', defaultValue: 'Your email' },
            { name: 'buttonText', type: 'string', defaultValue: 'Register' },
            { name: 'formAction', type: 'url', defaultValue: '' },

            // === DISCLAIMER ===
            { name: 'disclaimerPrefix', type: 'string', defaultValue: 'By clicking Register, you acknowledge that you have read and accepted our ' },
            { name: 'termsLinkText', type: 'string', defaultValue: 'Terms and Conditions' },
            { name: 'termsUrl', type: 'url', defaultValue: '' },

            // === COLORS ===
            { name: 'backgroundColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'headlineColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'descriptionColor', type: 'color', defaultValue: '#f3f4f6' },
            { name: 'inputBackgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'inputTextColor', type: 'color', defaultValue: '#111827' },
            { name: 'buttonBackgroundColor', type: 'color', defaultValue: '#111827' },
            { name: 'buttonTextColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'disclaimerColor', type: 'color', defaultValue: '#d1d5db' },
            { name: 'disclaimerLinkColor', type: 'color', defaultValue: '#ffffff' }
        ]
    },

    {
        component: FeatureSection76,
        name: 'FeatureSection76',
        inputs: [
            // === VISIBILITY TOGGLES ===
            { name: 'showCard1', type: 'boolean', defaultValue: true },
            { name: 'showCard1Icon', type: 'boolean', defaultValue: true },
            { name: 'showCard1Cta', type: 'boolean', defaultValue: true },
            { name: 'showCard2', type: 'boolean', defaultValue: true },
            { name: 'showCard2Icon', type: 'boolean', defaultValue: true },
            { name: 'showCard2Cta', type: 'boolean', defaultValue: true },
            { name: 'showCard3', type: 'boolean', defaultValue: true },
            { name: 'showCard3Icon', type: 'boolean', defaultValue: true },
            { name: 'showCard3Cta', type: 'boolean', defaultValue: true },
            { name: 'showBackgroundOverlay', type: 'boolean', defaultValue: false },

            // === SECTION BACKGROUND ===
            { name: 'backgroundColor', type: 'color', defaultValue: '#8b8b8b' },
            { name: 'backgroundImage', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'], defaultValue: '' },
            { name: 'backgroundOverlayColor', type: 'color', defaultValue: '#000000' },
            { name: 'backgroundOverlayOpacity', type: 'number', defaultValue: 40 },

            // === CARD 1 ===
            { name: 'card1BackgroundColor', type: 'color', defaultValue: 'rgba(139, 139, 139, 0.5)' },
            { name: 'card1Icon', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'], defaultValue: '' },
            { name: 'card1IconAlt', type: 'string', defaultValue: 'Feature icon' },
            { name: 'card1IconBackgroundColor', type: 'color', defaultValue: 'rgba(255, 255, 255, 0.1)' },
            { name: 'card1IconColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'card1Headline', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'card1HeadlineColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'card1Description', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },
            { name: 'card1DescriptionColor', type: 'color', defaultValue: '#f3f4f6' },
            { name: 'card1CtaText', type: 'string', defaultValue: 'See more' },
            { name: 'card1CtaUrl', type: 'url', defaultValue: '' },
            { name: 'card1CtaColor', type: 'color', defaultValue: '#ffffff' },

            // === CARD 2 (Center - Highlighted) ===
            { name: 'card2BackgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'card2Icon', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'], defaultValue: '' },
            { name: 'card2IconAlt', type: 'string', defaultValue: 'Feature icon' },
            { name: 'card2IconBackgroundColor', type: 'color', defaultValue: '#f3f4f6' },
            { name: 'card2IconColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'card2Headline', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'card2HeadlineColor', type: 'color', defaultValue: '#111827' },
            { name: 'card2Description', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },
            { name: 'card2DescriptionColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'card2CtaText', type: 'string', defaultValue: 'See more' },
            { name: 'card2CtaUrl', type: 'url', defaultValue: '' },
            { name: 'card2CtaColor', type: 'color', defaultValue: '#111827' },

            // === CARD 3 ===
            { name: 'card3BackgroundColor', type: 'color', defaultValue: 'rgba(139, 139, 139, 0.5)' },
            { name: 'card3Icon', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'], defaultValue: '' },
            { name: 'card3IconAlt', type: 'string', defaultValue: 'Feature icon' },
            { name: 'card3IconBackgroundColor', type: 'color', defaultValue: 'rgba(255, 255, 255, 0.1)' },
            { name: 'card3IconColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'card3Headline', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'card3HeadlineColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'card3Description', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },
            { name: 'card3DescriptionColor', type: 'color', defaultValue: '#f3f4f6' },
            { name: 'card3CtaText', type: 'string', defaultValue: 'See more' },
            { name: 'card3CtaUrl', type: 'url', defaultValue: '' },
            { name: 'card3CtaColor', type: 'color', defaultValue: '#ffffff' }
        ]
    },

    {
        component: IntroSection4,
        name: 'IntroSection4',
        inputs: [
            // === VISIBILITY TOGGLES ===
            { name: 'showTagline', type: 'boolean', defaultValue: true },
            { name: 'showHeadline', type: 'boolean', defaultValue: true },
            { name: 'showDescription', type: 'boolean', defaultValue: true },
            { name: 'showIcon', type: 'boolean', defaultValue: true },
            { name: 'showCtaButtons', type: 'boolean', defaultValue: true },
            { name: 'showPrimaryCta', type: 'boolean', defaultValue: true },
            { name: 'showSecondaryCta', type: 'boolean', defaultValue: true },
            { name: 'showBackgroundOverlay', type: 'boolean', defaultValue: false },

            // === CONTENT ===
            { name: 'tagline', type: 'richText', defaultValue: 'Tagline' },
            { name: 'headline', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet consectetur' },
            { name: 'description', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },

            // === COLORS ===
            { name: 'backgroundColor', type: 'color', defaultValue: '#8b8b8b' },
            { name: 'backgroundImage', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'], defaultValue: '' },
            { name: 'backgroundOverlayColor', type: 'color', defaultValue: '#000000' },
            { name: 'backgroundOverlayOpacity', type: 'number', defaultValue: 40 },
            { name: 'taglineColor', type: 'color', defaultValue: '#f3f4f6' },
            { name: 'headlineColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'descriptionColor', type: 'color', defaultValue: '#d1d5db' },

            // === ICON ===
            { name: 'icon', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'], defaultValue: '' },
            { name: 'iconAlt', type: 'string', defaultValue: 'Icon' },
            { name: 'iconColor', type: 'color', defaultValue: '#ffffff' },

            // === PRIMARY CTA ===
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Contact now' },
            { name: 'primaryCtaUrl', type: 'string', defaultValue: '' },
            { name: 'primaryCtaBackgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'primaryCtaTextColor', type: 'color', defaultValue: '#111827' },

            // === SECONDARY CTA ===
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'See more' },
            { name: 'secondaryCtaUrl', type: 'string', defaultValue: '' },
            { name: 'secondaryCtaBorderColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'secondaryCtaTextColor', type: 'color', defaultValue: '#ffffff' }
        ]
    },

    {
        component: IntroSection10,
        name: 'IntroSection10',
        inputs: [
            // === VISIBILITY TOGGLES ===
            { name: 'showTagline', type: 'boolean', defaultValue: true },
            { name: 'showHeadline', type: 'boolean', defaultValue: true },
            { name: 'showDescription', type: 'boolean', defaultValue: true },
            { name: 'showContentBlock', type: 'boolean', defaultValue: true },
            { name: 'showImage', type: 'boolean', defaultValue: true },

            // === LAYOUT ===
            { name: 'imagePosition', type: 'text', enum: ['left', 'right'], defaultValue: 'right' },

            // === CONTENT ===
            { name: 'tagline', type: 'richText', defaultValue: 'Tagline' },
            { name: 'headline', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet consectetur' },
            { name: 'description', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },

            // === COLORS ===
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'taglineColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'headlineColor', type: 'color', defaultValue: '#111827' },
            { name: 'descriptionColor', type: 'color', defaultValue: '#6b7280' },

            // === IMAGE ===
            { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'], defaultValue: '' },
            { name: 'imageAlt', type: 'string', defaultValue: 'Image' },
            { name: 'imageAspectRatio', type: 'string', defaultValue: '4/3' },
            { name: 'imagePlaceholderColor', type: 'color', defaultValue: '#d1d5db' }
        ]
    },

    {
        component: IntroSection6,
        name: 'IntroSection6',
        inputs: [
            // === VISIBILITY TOGGLES ===
            { name: 'showTagline', type: 'boolean', defaultValue: true },
            { name: 'showHeadline', type: 'boolean', defaultValue: true },
            { name: 'showDescription', type: 'boolean', defaultValue: true },
            { name: 'showCtaButtons', type: 'boolean', defaultValue: true },
            { name: 'showPrimaryCta', type: 'boolean', defaultValue: true },
            { name: 'showSecondaryCta', type: 'boolean', defaultValue: true },
            { name: 'showBackgroundOverlay', type: 'boolean', defaultValue: false },

            // === CONTENT ===
            { name: 'tagline', type: 'richText', defaultValue: 'Tagline' },
            { name: 'headline', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet consectetur' },
            { name: 'description', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },

            // === COLORS ===
            { name: 'backgroundColor', type: 'color', defaultValue: '#8b8b8b' },
            { name: 'backgroundImage', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'], defaultValue: '' },
            { name: 'backgroundOverlayColor', type: 'color', defaultValue: '#000000' },
            { name: 'backgroundOverlayOpacity', type: 'number', defaultValue: 40 },
            { name: 'taglineColor', type: 'color', defaultValue: '#f3f4f6' },
            { name: 'headlineColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'descriptionColor', type: 'color', defaultValue: '#d1d5db' },

            // === PRIMARY CTA ===
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Contact now' },
            { name: 'primaryCtaUrl', type: 'string', defaultValue: '' },
            { name: 'primaryCtaBackgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'primaryCtaTextColor', type: 'color', defaultValue: '#111827' },

            // === SECONDARY CTA ===
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'See more' },
            { name: 'secondaryCtaUrl', type: 'string', defaultValue: '' },
            { name: 'secondaryCtaBorderColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'secondaryCtaTextColor', type: 'color', defaultValue: '#ffffff' }
        ]
    },

    {
        component: IntroSection3,
        name: 'IntroSection3',
        inputs: [
            // === VISIBILITY TOGGLES ===
            { name: 'showTagline', type: 'boolean', defaultValue: true },
            { name: 'showHeadline', type: 'boolean', defaultValue: true },
            { name: 'showDescription', type: 'boolean', defaultValue: true },
            { name: 'showCtaButtons', type: 'boolean', defaultValue: true },
            { name: 'showPrimaryCta', type: 'boolean', defaultValue: true },
            { name: 'showSecondaryCta', type: 'boolean', defaultValue: true },
            { name: 'showBackgroundOverlay', type: 'boolean', defaultValue: false },

            // === CONTENT ===
            { name: 'tagline', type: 'richText', defaultValue: 'Tagline' },
            { name: 'headline', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet consectetur' },
            { name: 'description', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },

            // === COLORS ===
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'backgroundImage', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'], defaultValue: '' },
            { name: 'backgroundOverlayColor', type: 'color', defaultValue: '#000000' },
            { name: 'backgroundOverlayOpacity', type: 'number', defaultValue: 40 },
            { name: 'taglineColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'headlineColor', type: 'color', defaultValue: '#111827' },
            { name: 'descriptionColor', type: 'color', defaultValue: '#6b7280' },

            // === PRIMARY CTA ===
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Contact now' },
            { name: 'primaryCtaUrl', type: 'string', defaultValue: '' },
            { name: 'primaryCtaBackgroundColor', type: 'color', defaultValue: '#111827' },
            { name: 'primaryCtaTextColor', type: 'color', defaultValue: '#ffffff' },

            // === SECONDARY CTA ===
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'See more' },
            { name: 'secondaryCtaUrl', type: 'string', defaultValue: '' },
            { name: 'secondaryCtaBorderColor', type: 'color', defaultValue: '#111827' },
            { name: 'secondaryCtaTextColor', type: 'color', defaultValue: '#111827' }
        ]
    },

    {
        component: IntroSection11,
        name: 'IntroSection11',
        inputs: [
            // === VISIBILITY TOGGLES ===
            { name: 'showTagline', type: 'boolean', defaultValue: true },
            { name: 'showHeadline', type: 'boolean', defaultValue: true },
            { name: 'showDescription', type: 'boolean', defaultValue: true },
            { name: 'showContentBlock', type: 'boolean', defaultValue: true },
            { name: 'showImage', type: 'boolean', defaultValue: true },
            { name: 'showCtaButtons', type: 'boolean', defaultValue: true },
            { name: 'showPrimaryCta', type: 'boolean', defaultValue: true },
            { name: 'showSecondaryCta', type: 'boolean', defaultValue: true },

            // === LAYOUT ===
            { name: 'imagePosition', type: 'text', enum: ['left', 'right'], defaultValue: 'right' },

            // === CONTENT ===
            { name: 'tagline', type: 'richText', defaultValue: 'Tagline' },
            { name: 'headline', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet consectetur' },
            { name: 'description', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },

            // === COLORS ===
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'taglineColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'headlineColor', type: 'color', defaultValue: '#111827' },
            { name: 'descriptionColor', type: 'color', defaultValue: '#6b7280' },

            // === IMAGE ===
            { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'], defaultValue: '' },
            { name: 'imageAlt', type: 'string', defaultValue: 'Image' },
            { name: 'imageAspectRatio', type: 'string', defaultValue: '4/3' },
            { name: 'imagePlaceholderColor', type: 'color', defaultValue: '#d1d5db' },

            // === PRIMARY CTA ===
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Contact now' },
            { name: 'primaryCtaUrl', type: 'string', defaultValue: '' },
            { name: 'primaryCtaBackgroundColor', type: 'color', defaultValue: '#111827' },
            { name: 'primaryCtaTextColor', type: 'color', defaultValue: '#ffffff' },

            // === SECONDARY CTA ===
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'See more' },
            { name: 'secondaryCtaUrl', type: 'string', defaultValue: '' },
            { name: 'secondaryCtaBorderColor', type: 'color', defaultValue: '#111827' },
            { name: 'secondaryCtaTextColor', type: 'color', defaultValue: '#111827' }
        ]
    },

    {
        component: PricingSection12,
        name: 'PricingSection12',
        inputs: [
            // === VISIBILITY TOGGLES ===
            { name: 'showTagline', type: 'boolean', defaultValue: true },
            { name: 'showHeadline', type: 'boolean', defaultValue: true },
            { name: 'showDescription', type: 'boolean', defaultValue: true },
            { name: 'showHeaderBlock', type: 'boolean', defaultValue: true },
            { name: 'showFeatureBox', type: 'boolean', defaultValue: true },
            { name: 'showFeature1', type: 'boolean', defaultValue: true },
            { name: 'showFeature2', type: 'boolean', defaultValue: true },
            { name: 'showFeature3', type: 'boolean', defaultValue: true },
            { name: 'showFeature4', type: 'boolean', defaultValue: true },
            { name: 'showFeature5', type: 'boolean', defaultValue: true },
            { name: 'showCard1', type: 'boolean', defaultValue: true },
            { name: 'showCard1Cta', type: 'boolean', defaultValue: true },
            { name: 'showCard2', type: 'boolean', defaultValue: true },
            { name: 'showCard2Cta', type: 'boolean', defaultValue: true },
            { name: 'showCard3', type: 'boolean', defaultValue: true },
            { name: 'showCard3Cta', type: 'boolean', defaultValue: true },

            // === HEADER CONTENT ===
            { name: 'tagline', type: 'richText', defaultValue: 'Tagline' },
            { name: 'headline', type: 'richText', defaultValue: 'Ut tempus dui non enim accumsan, eu rutrum' },
            { name: 'description', type: 'richText', defaultValue: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore minim.' },

            // === FEATURE BOX ===
            { name: 'featureBoxHeadline', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet consect adipisicing elit.' },
            { name: 'feature1Text', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'feature2Text', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'feature3Text', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'feature4Text', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'feature5Text', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet' },

            // === COLORS ===
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'taglineColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'headlineColor', type: 'color', defaultValue: '#111827' },
            { name: 'descriptionColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'featureBoxBackgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'featureBoxBorderColor', type: 'color', defaultValue: '#e5e7eb' },
            { name: 'featureBoxHeadlineColor', type: 'color', defaultValue: '#111827' },
            { name: 'featureCheckmarkColor', type: 'color', defaultValue: '#111827' },
            { name: 'featureTextColor', type: 'color', defaultValue: '#111827' },

            // === CARD 1 (FREE) ===
            { name: 'card1Title', type: 'string', defaultValue: 'Free' },
            { name: 'card1Description', type: 'richText', defaultValue: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum.' },
            { name: 'card1Price', type: 'string', defaultValue: '$00' },
            { name: 'card1PriceInterval', type: 'string', defaultValue: '/month' },
            { name: 'card1PriceSubtext', type: 'string', defaultValue: 'Lorem ipsum dolor sit' },
            { name: 'card1CtaText', type: 'string', defaultValue: 'Buy now' },
            { name: 'card1CtaUrl', type: 'string', defaultValue: '' },
            { name: 'card1BackgroundColor', type: 'color', defaultValue: '#f3f4f6' },
            { name: 'card1TitleColor', type: 'color', defaultValue: '#111827' },
            { name: 'card1DescriptionColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'card1PriceColor', type: 'color', defaultValue: '#111827' },
            { name: 'card1PriceIntervalColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'card1PriceSubtextColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'card1CtaBackgroundColor', type: 'color', defaultValue: '#111827' },
            { name: 'card1CtaTextColor', type: 'color', defaultValue: '#ffffff' },

            // === CARD 2 (PRO) ===
            { name: 'card2Title', type: 'string', defaultValue: 'Pro' },
            { name: 'card2Description', type: 'richText', defaultValue: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim elit aute irure tempor.' },
            { name: 'card2Price', type: 'string', defaultValue: '$29' },
            { name: 'card2PriceInterval', type: 'string', defaultValue: '/month' },
            { name: 'card2PriceSubtext', type: 'string', defaultValue: 'Lorem ipsum dolor sit' },
            { name: 'card2CtaText', type: 'string', defaultValue: 'Buy now' },
            { name: 'card2CtaUrl', type: 'string', defaultValue: '' },
            { name: 'card2BackgroundColor', type: 'color', defaultValue: '#f3f4f6' },
            { name: 'card2TitleColor', type: 'color', defaultValue: '#111827' },
            { name: 'card2DescriptionColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'card2PriceColor', type: 'color', defaultValue: '#111827' },
            { name: 'card2PriceIntervalColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'card2PriceSubtextColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'card2CtaBackgroundColor', type: 'color', defaultValue: '#111827' },
            { name: 'card2CtaTextColor', type: 'color', defaultValue: '#ffffff' },

            // === CARD 3 (ENTERPRISE) ===
            { name: 'card3Title', type: 'string', defaultValue: 'Enterprise' },
            { name: 'card3Description', type: 'richText', defaultValue: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum.' },
            { name: 'card3Price', type: 'string', defaultValue: 'Custom' },
            { name: 'card3PriceSubtext', type: 'string', defaultValue: 'Lorem ipsum dolor sit' },
            { name: 'card3CtaText', type: 'string', defaultValue: 'Contact Sales' },
            { name: 'card3CtaUrl', type: 'string', defaultValue: '' },
            { name: 'card3BackgroundColor', type: 'color', defaultValue: '#111827' },
            { name: 'card3TitleColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'card3DescriptionColor', type: 'color', defaultValue: '#d1d5db' },
            { name: 'card3PriceColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'card3PriceSubtextColor', type: 'color', defaultValue: '#d1d5db' },
            { name: 'card3CtaBackgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'card3CtaTextColor', type: 'color', defaultValue: '#111827' }
        ]
    },

    {
        component: PricingSection13,
        name: 'PricingSection13',
        inputs: [
            // === VISIBILITY TOGGLES ===
            { name: 'showHeader', type: 'boolean', defaultValue: true },
            { name: 'showTagline', type: 'boolean', defaultValue: true },
            { name: 'showHeadline', type: 'boolean', defaultValue: true },
            { name: 'showDescription', type: 'boolean', defaultValue: true },
            { name: 'showCard1', type: 'boolean', defaultValue: true },
            { name: 'showCard1Icon', type: 'boolean', defaultValue: true },
            { name: 'showCard1Feature1', type: 'boolean', defaultValue: true },
            { name: 'showCard1Feature2', type: 'boolean', defaultValue: true },
            { name: 'showCard1Feature3', type: 'boolean', defaultValue: true },
            { name: 'showCard1Cta', type: 'boolean', defaultValue: true },
            { name: 'showCard2', type: 'boolean', defaultValue: true },
            { name: 'showCard2Icon', type: 'boolean', defaultValue: true },
            { name: 'showCard2Feature1', type: 'boolean', defaultValue: true },
            { name: 'showCard2Feature2', type: 'boolean', defaultValue: true },
            { name: 'showCard2Feature3', type: 'boolean', defaultValue: true },
            { name: 'showCard2Feature4', type: 'boolean', defaultValue: true },
            { name: 'showCard2Feature5', type: 'boolean', defaultValue: true },
            { name: 'showCard2Feature6', type: 'boolean', defaultValue: true },
            { name: 'showCard2Cta', type: 'boolean', defaultValue: true },

            // === HEADER CONTENT ===
            { name: 'tagline', type: 'richText', defaultValue: 'Tagline' },
            { name: 'headline', type: 'richText', defaultValue: 'Lorem ipsum dolor' },
            { name: 'description', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet consect adipisicing elit.' },

            // === COLORS ===
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'taglineColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'headlineColor', type: 'color', defaultValue: '#111827' },
            { name: 'descriptionColor', type: 'color', defaultValue: '#6b7280' },

            // === CARD 1 (BASIC) ===
            { name: 'card1Title', type: 'string', defaultValue: 'Basic' },
            { name: 'card1Description', type: 'richText', defaultValue: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim elit aute irure tempor.' },
            { name: 'card1Price', type: 'string', defaultValue: '$29' },
            { name: 'card1PriceInterval', type: 'string', defaultValue: '/month' },
            { name: 'card1Feature1Text', type: 'string', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'card1Feature1Active', type: 'boolean', defaultValue: true },
            { name: 'card1Feature2Text', type: 'string', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'card1Feature2Active', type: 'boolean', defaultValue: true },
            { name: 'card1Feature3Text', type: 'string', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'card1Feature3Active', type: 'boolean', defaultValue: false },
            { name: 'card1CtaText', type: 'string', defaultValue: 'Buy now' },
            { name: 'card1CtaUrl', type: 'string', defaultValue: '' },
            { name: 'card1BackgroundColor', type: 'color', defaultValue: '#f3f4f6' },
            { name: 'card1IconColor', type: 'color', defaultValue: '#111827' },
            { name: 'card1TitleColor', type: 'color', defaultValue: '#111827' },
            { name: 'card1DescriptionColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'card1PriceColor', type: 'color', defaultValue: '#111827' },
            { name: 'card1PriceIntervalColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'card1FeatureActiveColor', type: 'color', defaultValue: '#111827' },
            { name: 'card1FeatureInactiveColor', type: 'color', defaultValue: '#9ca3af' },
            { name: 'card1FeatureTextActiveColor', type: 'color', defaultValue: '#111827' },
            { name: 'card1FeatureTextInactiveColor', type: 'color', defaultValue: '#9ca3af' },
            { name: 'card1CtaBackgroundColor', type: 'color', defaultValue: '#111827' },
            { name: 'card1CtaTextColor', type: 'color', defaultValue: '#ffffff' },

            // === CARD 2 (PROFESSIONAL) ===
            { name: 'card2Title', type: 'string', defaultValue: 'Professional' },
            { name: 'card2Description', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
            { name: 'card2Price', type: 'string', defaultValue: '$199' },
            { name: 'card2PriceInterval', type: 'string', defaultValue: '/month' },
            { name: 'card2Feature1Text', type: 'string', defaultValue: 'Lorem ipsum dolor sit' },
            { name: 'card2Feature1Active', type: 'boolean', defaultValue: true },
            { name: 'card2Feature2Text', type: 'string', defaultValue: 'Lorem ipsum dolor sit' },
            { name: 'card2Feature2Active', type: 'boolean', defaultValue: false },
            { name: 'card2Feature3Text', type: 'string', defaultValue: 'Lorem ipsum dolor sit' },
            { name: 'card2Feature3Active', type: 'boolean', defaultValue: true },
            { name: 'card2Feature4Text', type: 'string', defaultValue: 'Lorem ipsum dolor sit' },
            { name: 'card2Feature4Active', type: 'boolean', defaultValue: false },
            { name: 'card2Feature5Text', type: 'string', defaultValue: 'Lorem ipsum dolor sit' },
            { name: 'card2Feature5Active', type: 'boolean', defaultValue: true },
            { name: 'card2Feature6Text', type: 'string', defaultValue: 'Lorem ipsum dolor sit' },
            { name: 'card2Feature6Active', type: 'boolean', defaultValue: false },
            { name: 'card2CtaText', type: 'string', defaultValue: 'Buy now' },
            { name: 'card2CtaUrl', type: 'string', defaultValue: '' },
            { name: 'card2BackgroundColor', type: 'color', defaultValue: '#111827' },
            { name: 'card2IconColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'card2TitleColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'card2DescriptionColor', type: 'color', defaultValue: '#d1d5db' },
            { name: 'card2PriceColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'card2PriceIntervalColor', type: 'color', defaultValue: '#d1d5db' },
            { name: 'card2FeatureActiveColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'card2FeatureInactiveColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'card2FeatureTextActiveColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'card2FeatureTextInactiveColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'card2CtaBackgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'card2CtaTextColor', type: 'color', defaultValue: '#111827' }
        ]
    },

    {
        component: TestimonialSection28,
        name: 'TestimonialSection28',
        inputs: [
            // === VISIBILITY TOGGLES ===
            { name: 'showHeader', type: 'boolean', defaultValue: true },
            { name: 'showTagline', type: 'boolean', defaultValue: true },
            { name: 'showHeadline', type: 'boolean', defaultValue: true },
            { name: 'showDescription', type: 'boolean', defaultValue: true },
            { name: 'showTestimonial1', type: 'boolean', defaultValue: true },
            { name: 'showTestimonial1Avatar', type: 'boolean', defaultValue: true },
            { name: 'showTestimonial2', type: 'boolean', defaultValue: true },
            { name: 'showTestimonial2Avatar', type: 'boolean', defaultValue: true },
            { name: 'showTestimonial3', type: 'boolean', defaultValue: true },
            { name: 'showTestimonial3Avatar', type: 'boolean', defaultValue: true },
            { name: 'showTestimonial4', type: 'boolean', defaultValue: true },
            { name: 'showTestimonial4Avatar', type: 'boolean', defaultValue: true },
            { name: 'showTestimonial5', type: 'boolean', defaultValue: true },
            { name: 'showTestimonial5Avatar', type: 'boolean', defaultValue: true },
            { name: 'showTestimonial6', type: 'boolean', defaultValue: true },
            { name: 'showTestimonial6Avatar', type: 'boolean', defaultValue: true },

            // === HEADER CONTENT ===
            { name: 'tagline', type: 'richText', defaultValue: 'Tagline' },
            { name: 'headline', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet' },
            { name: 'description', type: 'richText', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },

            // === COLORS ===
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'taglineColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'headlineColor', type: 'color', defaultValue: '#111827' },
            { name: 'descriptionColor', type: 'color', defaultValue: '#6b7280' },

            // === TESTIMONIAL 1 ===
            { name: 'testimonial1Quote', type: 'richText', defaultValue: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."' },
            { name: 'testimonial1Name', type: 'string', defaultValue: 'Adam Smith' },
            { name: 'testimonial1Role', type: 'string', defaultValue: 'CEO, Company' },
            { name: 'testimonial1Avatar', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'], defaultValue: '' },
            { name: 'testimonial1BackgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'testimonial1BorderColor', type: 'color', defaultValue: '#e5e7eb' },
            { name: 'testimonial1QuoteColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'testimonial1NameColor', type: 'color', defaultValue: '#111827' },
            { name: 'testimonial1RoleColor', type: 'color', defaultValue: '#9ca3af' },
            { name: 'testimonial1AvatarPlaceholderColor', type: 'color', defaultValue: '#d1d5db' },

            // === TESTIMONIAL 2 ===
            { name: 'testimonial2Quote', type: 'richText', defaultValue: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."' },
            { name: 'testimonial2Name', type: 'string', defaultValue: 'Adam Smith' },
            { name: 'testimonial2Role', type: 'string', defaultValue: 'CEO, Company' },
            { name: 'testimonial2Avatar', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'], defaultValue: '' },
            { name: 'testimonial2BackgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'testimonial2BorderColor', type: 'color', defaultValue: '#e5e7eb' },
            { name: 'testimonial2QuoteColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'testimonial2NameColor', type: 'color', defaultValue: '#111827' },
            { name: 'testimonial2RoleColor', type: 'color', defaultValue: '#9ca3af' },
            { name: 'testimonial2AvatarPlaceholderColor', type: 'color', defaultValue: '#d1d5db' },

            // === TESTIMONIAL 3 ===
            { name: 'testimonial3Quote', type: 'richText', defaultValue: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."' },
            { name: 'testimonial3Name', type: 'string', defaultValue: 'Adam Smith' },
            { name: 'testimonial3Role', type: 'string', defaultValue: 'CEO, Company' },
            { name: 'testimonial3Avatar', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'], defaultValue: '' },
            { name: 'testimonial3BackgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'testimonial3BorderColor', type: 'color', defaultValue: '#e5e7eb' },
            { name: 'testimonial3QuoteColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'testimonial3NameColor', type: 'color', defaultValue: '#111827' },
            { name: 'testimonial3RoleColor', type: 'color', defaultValue: '#9ca3af' },
            { name: 'testimonial3AvatarPlaceholderColor', type: 'color', defaultValue: '#d1d5db' },

            // === TESTIMONIAL 4 ===
            { name: 'testimonial4Quote', type: 'richText', defaultValue: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."' },
            { name: 'testimonial4Name', type: 'string', defaultValue: 'Adam Smith' },
            { name: 'testimonial4Role', type: 'string', defaultValue: 'CEO, Company' },
            { name: 'testimonial4Avatar', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'], defaultValue: '' },
            { name: 'testimonial4BackgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'testimonial4BorderColor', type: 'color', defaultValue: '#e5e7eb' },
            { name: 'testimonial4QuoteColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'testimonial4NameColor', type: 'color', defaultValue: '#111827' },
            { name: 'testimonial4RoleColor', type: 'color', defaultValue: '#9ca3af' },
            { name: 'testimonial4AvatarPlaceholderColor', type: 'color', defaultValue: '#d1d5db' },

            // === TESTIMONIAL 5 ===
            { name: 'testimonial5Quote', type: 'richText', defaultValue: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."' },
            { name: 'testimonial5Name', type: 'string', defaultValue: 'Adam Smith' },
            { name: 'testimonial5Role', type: 'string', defaultValue: 'CEO, Company' },
            { name: 'testimonial5Avatar', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'], defaultValue: '' },
            { name: 'testimonial5BackgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'testimonial5BorderColor', type: 'color', defaultValue: '#e5e7eb' },
            { name: 'testimonial5QuoteColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'testimonial5NameColor', type: 'color', defaultValue: '#111827' },
            { name: 'testimonial5RoleColor', type: 'color', defaultValue: '#9ca3af' },
            { name: 'testimonial5AvatarPlaceholderColor', type: 'color', defaultValue: '#d1d5db' },

            // === TESTIMONIAL 6 ===
            { name: 'testimonial6Quote', type: 'richText', defaultValue: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."' },
            { name: 'testimonial6Name', type: 'string', defaultValue: 'Adam Smith' },
            { name: 'testimonial6Role', type: 'string', defaultValue: 'CEO, Company' },
            { name: 'testimonial6Avatar', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'], defaultValue: '' },
            { name: 'testimonial6BackgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'testimonial6BorderColor', type: 'color', defaultValue: '#e5e7eb' },
            { name: 'testimonial6QuoteColor', type: 'color', defaultValue: '#6b7280' },
            { name: 'testimonial6NameColor', type: 'color', defaultValue: '#111827' },
            { name: 'testimonial6RoleColor', type: 'color', defaultValue: '#9ca3af' },
            { name: 'testimonial6AvatarPlaceholderColor', type: 'color', defaultValue: '#d1d5db' }
        ]
    },

    // === COMPOSITE COMPONENTS ===
    {
        component: SevenWeekQuestionnaire,
        name: 'SevenWeekQuestionnaire',
        inputs: []
    },

    // === FEATURE COMPONENTS ===
    {
        component: TransformationPopup,
        name: 'TransformationPopup',
        inputs: [
            // Button Configuration
            { name: 'buttonText', type: 'string', defaultValue: '7-Wochen Challenge starten' },
            { name: 'buttonVariant', type: 'list', enum: ['primary', 'secondary', 'secondaryFull', 'ghost', 'gradient', 'outline'], defaultValue: 'gradient' },
            { name: 'buttonSize', type: 'list', enum: ['sm', 'md', 'lg', 'xl'], defaultValue: 'lg' },
            { name: 'buttonIcon', type: 'string', defaultValue: '' },

            // Modal Configuration
            { name: 'modalMaxWidth', type: 'list', enum: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'], defaultValue: '2xl' },
            { name: 'modalBackdrop', type: 'list', enum: ['blur', 'dark', 'glass'], defaultValue: 'glass' },
            { name: 'closeOnBackdrop', type: 'boolean', defaultValue: true },
            { name: 'showCloseButton', type: 'boolean', defaultValue: true },

            // Behavior
            { name: 'autoClose', type: 'boolean', defaultValue: true },
            { name: 'redirectUrl', type: 'url', defaultValue: '' }
        ]
    },

    // === GYM LINDEN LANDING PAGE COMPONENTS ===
    {
        component: GymLindenHero,
        name: 'GymLindenHero',
        inputs: [
            // Content
            { name: 'headline', type: 'richText', defaultValue: 'Dein <span class="text-gradient-warm">Gym in Linden</span> – Starte fit in den Tag' },
            { name: 'subheadline', type: 'text', defaultValue: 'Morgentraining vor der Arbeit mit dem innovativen EXOPEK-Konzept. Kürzer trainieren, mehr erreichen – das beste Fitnessstudio in Hannover Linden.' },

            // Hero Image
            { name: 'heroImage', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png'], defaultValue: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=1000&fit=crop' },
            { name: 'heroImageAlt', type: 'string', defaultValue: 'Functional Training im Gym Linden Hannover mit EXOPEK' },

            // Badge
            { name: 'badgeText', type: 'string', defaultValue: 'Jetzt neu' },
            { name: 'badgeVariant', type: 'text', enum: ['new', 'popular', 'featured', 'limited'], defaultValue: 'featured' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },

            // CTAs
            { name: 'primaryCtaText', type: 'string', defaultValue: 'Probetraining buchen' },
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#kontakt' },
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'Mehr erfahren' },
            { name: 'secondaryCtaUrl', type: 'url', defaultValue: '#vorteile' },

            // Statistics
            { name: 'showStats', type: 'boolean', defaultValue: true },
            {
                name: 'statistics',
                type: 'list',
                subFields: [
                    { name: 'value', type: 'number', required: true },
                    { name: 'label', type: 'string', required: true },
                    { name: 'suffix', type: 'string' },
                    { name: 'variant', type: 'text', enum: ['minimal', 'default'], defaultValue: 'minimal' }
                ],
                defaultValue: [
                    { value: 45, label: 'Minuten Training', suffix: 'min', variant: 'minimal' },
                    { value: 6, label: 'Uhr Kursbeginn', suffix: ':30', variant: 'minimal' },
                    { value: 100, label: 'Zufriedenheit', suffix: '%', variant: 'minimal' }
                ]
            },

            // Trust Indicators
            { name: 'showTrustIndicators', type: 'boolean', defaultValue: true },
            {
                name: 'trustIndicators',
                type: 'list',
                subFields: [
                    { name: 'indicator', type: 'string', required: true }
                ],
                defaultValue: [
                    { indicator: 'Exklusiv in Hannover Linden' },
                    { indicator: 'EXOPEK zertifiziert' },
                    { indicator: 'Profi Trainer-Team' }
                ]
            },

            // Styling
            { name: 'backgroundColor', type: 'color', defaultValue: '#0f0f0f' }
        ]
    },
    {
        component: GymLindenUSPGrid,
        name: 'GymLindenUSPGrid',
        inputs: [
            // Header
            { name: 'tagline', type: 'string', defaultValue: 'Deine Vorteile' },
            { name: 'headline', type: 'richText', defaultValue: 'Warum unser Gym in Hannover Linden?' },
            { name: 'description', type: 'text', defaultValue: 'Entdecke die Vorteile von funktionalem Training und HIIT im besten Fitnessstudio Hannover Linden. Morgens trainieren, voller Energie in den Tag starten.' },

            // Grid Settings
            { name: 'columns', type: 'text', enum: ['2', '3', '4'], defaultValue: '3' },
            { name: 'backgroundColor', type: 'text', enum: ['white', 'gray', 'dark'], defaultValue: 'white' },
            { name: 'showCta', type: 'boolean', defaultValue: false },

            // USP Cards
            {
                name: 'uspCards',
                type: 'list',
                subFields: [
                    { name: 'title', type: 'string', required: true },
                    { name: 'description', type: 'longText', required: true },
                    { name: 'variant', type: 'text', enum: ['primary', 'secondary', 'gradient', 'outline'], defaultValue: 'primary' },
                    { name: 'badge', type: 'string' },
                    { name: 'linkText', type: 'string' },
                    { name: 'linkUrl', type: 'url' },
                    { name: 'iconClass', type: 'string', defaultValue: 'text-orange-600' },
                    { name: 'iconPath', type: 'longText', required: true }
                ],
                defaultValue: [
                    {
                        title: 'Morgentraining vor der Arbeit',
                        description: 'Starte deinen Tag mit Energie! Unsere Morgenkurse ab 6:30 Uhr bringen dich fit und motiviert zur Arbeit. Perfekt für Berufstätige in Hannover Linden.',
                        variant: 'primary',
                        iconClass: 'text-orange-600',
                        iconPath: 'M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                    },
                    {
                        title: 'Konzentrations-Boost für den Tag',
                        description: 'Morgentraining steigert deine mentale Leistungsfähigkeit. Functional Training und HIIT aktivieren Körper und Geist – perfekt für einen produktiven Arbeitstag.',
                        variant: 'gradient',
                        badge: 'Beliebt',
                        iconClass: 'text-white',
                        iconPath: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
                    },
                    {
                        title: 'Innovatives EXOPEK-Konzept',
                        description: 'Revolutionäres Trainingssystem aus der Schweiz. EXOPEK kombiniert Functional Training mit spezieller Ausrüstung für maximale Effizienz – exklusiv in unserem Gym Linden.',
                        variant: 'primary',
                        linkText: 'Mehr über EXOPEK →',
                        linkUrl: 'https://exopek.de',
                        iconClass: 'text-orange-600',
                        iconPath: 'M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z'
                    },
                    {
                        title: 'Kürzere & effektivere Workouts',
                        description: 'Nur 45 Minuten pro Session! EXOPEK Training ist hochintensiv und maximal effizient. Spare Zeit, erreiche mehr – ideal für dein Fitness-Ziel im Gym Hannover.',
                        variant: 'primary',
                        iconClass: 'text-orange-600',
                        iconPath: 'M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z'
                    },
                    {
                        title: 'Functional Training + HIIT',
                        description: 'Kombiniere dein gewohntes HIIT mit dem EXOPEK-Rucksack. Functional Training für den ganzen Körper – intensiver, effektiver, nachhaltiger.',
                        variant: 'primary',
                        iconClass: 'text-orange-600',
                        iconPath: 'M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                    },
                    {
                        title: 'Perfekte Lage in Linden',
                        description: 'Zentral in Hannover Linden gelegen – schnell erreichbar vor oder nach der Arbeit. Das Fitnessstudio Linden Hannover für deine Nachbarschaft.',
                        variant: 'outline',
                        iconClass: 'text-orange-600',
                        iconPath: 'M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                    }
                ]
            }
        ]
    },
    {
        component: GymLindenExopekShowcase,
        name: 'GymLindenExopekShowcase',
        inputs: [
            // Header
            { name: 'tagline', type: 'string', defaultValue: 'Das EXOPEK System' },
            { name: 'headline', type: 'richText', defaultValue: 'Trainiere mit dem innovativsten Fitness-Konzept' },
            { name: 'subheadline', type: 'text', defaultValue: 'EXOPEK revolutioniert Functional Training und HIIT. Erfahre mehr über das Schweizer Trainingssystem, das unser Gym in Linden so besonders macht.' },

            // Features
            {
                name: 'features',
                type: 'list',
                subFields: [
                    { name: 'number', type: 'string', required: true },
                    { name: 'heading', type: 'string', required: true },
                    { name: 'description', type: 'longText', required: true },
                    { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png'], required: true },
                    { name: 'imageAlt', type: 'string', required: true },
                    { name: 'primaryButtonText', type: 'string' },
                    { name: 'primaryButtonUrl', type: 'url' },
                    { name: 'secondaryButtonText', type: 'string' },
                    { name: 'secondaryButtonUrl', type: 'url' }
                ],
                defaultValue: [
                    {
                        number: '01',
                        heading: 'Was ist EXOPEK Training?',
                        description: 'EXOPEK ist ein revolutionäres Trainingssystem aus Hannover. Es kombiniert Functional Training und HIIT mit spezieller Ausrüstung für maximale Trainingseffizienz. Nur 30 Minuten pro Session – perfekt für Berufstätige.',
                        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=450&fit=crop',
                        imageAlt: 'EXOPEK Functional Training im Gym Hannover Linden',
                        primaryButtonText: 'Mehr über EXOPEK',
                        primaryButtonUrl: 'https://exopek.de',
                        secondaryButtonText: 'Jetzt testen',
                        secondaryButtonUrl: '#kontakt'
                    },
                    {
                        number: '02',
                        heading: 'Morgentraining – Der Energie-Boost',
                        description: 'Training am Morgen aktiviert deinen Stoffwechsel, steigert die Konzentration und gibt dir Energie für den ganzen Tag. Unsere Kurse ab 6:30 Uhr sind perfekt vor der Arbeit. Functional Training Hannover – starte stark in den Tag!',
                        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=450&fit=crop',
                        imageAlt: 'Morgentraining vor der Arbeit im Fitnessstudio Linden',
                        primaryButtonText: 'Trainingszeiten',
                        primaryButtonUrl: '#schedule'
                    },
                    {
                        number: '03',
                        heading: 'Functional Training + HIIT',
                        description: 'Kombiniere dein gewohntes HIIT-Training mit dem EXOPEK-System. Ganzkörper-Workouts, die alle Muskelgruppen ansprechen. Effizienter trainieren, schneller Ergebnisse sehen – im besten Gym Hannover Linden.',
                        image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600&h=450&fit=crop',
                        imageAlt: 'HIIT und Functional Training im Gym Linden Hannover'
                    }
                ]
            },

            // Styling
            { name: 'sectionBackgroundColor', type: 'color', defaultValue: 'var(--color-gray-300)' }
        ]
    },
    {
        component: GymLindenMorningSchedule,
        name: 'GymLindenMorningSchedule',
        inputs: [
            // Header
            { name: 'tagline', type: 'string', defaultValue: 'Dein Trainingsplan' },
            { name: 'headline', type: 'richText', defaultValue: 'Morgens trainieren im Gym Linden' },
            { name: 'subheadline', type: 'text', defaultValue: 'Starte deinen Tag mit Energie! Unsere Morgenkurse bringen dich fit und konzentriert zur Arbeit. Functional Training Hannover Linden – perfekt vor dem Büro.' },

            // Time Slots
            {
                name: 'timeSlots',
                type: 'list',
                subFields: [
                    { name: 'day', type: 'string', required: true },
                    { name: 'time', type: 'string', required: true },
                    { name: 'duration', type: 'string', required: true },
                    { name: 'courseName', type: 'string', required: true },
                    { name: 'benefit', type: 'string', required: true },
                    { name: 'featured', type: 'boolean', defaultValue: false },
                    { name: 'spotsAvailable', type: 'number', required: true }
                ],
                defaultValue: [
                    {
                        day: 'Montag',
                        time: '06:30',
                        duration: '45 Minuten',
                        courseName: 'EXOPEK Morning Power',
                        benefit: 'Perfekt vor der Arbeit',
                        featured: true,
                        spotsAvailable: 8
                    },
                    {
                        day: 'Mittwoch',
                        time: '06:30',
                        duration: '45 Minuten',
                        courseName: 'Functional HIIT Intensive',
                        benefit: 'Ganzkörper-Workout',
                        spotsAvailable: 12
                    },
                    {
                        day: 'Freitag',
                        time: '06:30',
                        duration: '45 Minuten',
                        courseName: 'EXOPEK Weekend Starter',
                        benefit: 'Energie fürs Wochenende',
                        spotsAvailable: 6
                    }
                ]
            },

            // CTA
            { name: 'showCta', type: 'boolean', defaultValue: true },
            { name: 'ctaText', type: 'string', defaultValue: 'Jetzt zum Probetraining anmelden' },
            { name: 'ctaUrl', type: 'url', defaultValue: '#kontakt' }
        ]
    },
    {
        component: GymLindenComparison,
        name: 'GymLindenComparison',
        inputs: [
            // Header
            { name: 'tagline', type: 'string', defaultValue: 'Der Unterschied' },
            { name: 'headline', type: 'richText', defaultValue: 'EXOPEK vs. Traditionelles Gym-Training' },
            { name: 'subheadline', type: 'text', defaultValue: 'Entdecke, warum EXOPEK das effizienteste Training für Berufstätige ist. Fitness Hannover Linden – maximale Ergebnisse in minimaler Zeit.' },

            // Column Titles
            { name: 'leftColumnTitle', type: 'string', defaultValue: 'Klassisches Fitnessstudio' },
            { name: 'rightColumnTitle', type: 'string', defaultValue: 'EXOPEK im Gym Linden' },

            // Comparison Rows
            {
                name: 'comparisonRows',
                type: 'list',
                subFields: [
                    { name: 'feature', type: 'string', required: true },
                    { name: 'traditional', type: 'string', required: true },
                    { name: 'exopek', type: 'string', required: true }
                ],
                defaultValue: [
                    {
                        feature: 'Trainingsdauer pro Session',
                        traditional: '60-90 Minuten',
                        exopek: 'Nur 45 Minuten – maximale Effizienz'
                    },
                    {
                        feature: 'Trainingsintensität',
                        traditional: 'Moderat bis hoch',
                        exopek: 'Hochintensiv (HIIT) + Functional Training'
                    },
                    {
                        feature: 'Zeitersparnis pro Woche',
                        traditional: 'Keine',
                        exopek: 'Bis zu 2 Stunden gespart'
                    },
                    {
                        feature: 'Ganzkörper-Training',
                        traditional: 'Split-Training über mehrere Tage',
                        exopek: 'Komplettes Workout in 45 Minuten'
                    },
                    {
                        feature: 'Konzentration & Fokus',
                        traditional: 'Standard-Effekt',
                        exopek: 'Maximaler Fokus-Boost für den Arbeitstag'
                    },
                    {
                        feature: 'Trainingskonzept',
                        traditional: 'Klassisches Gerätetraining',
                        exopek: 'Innovatives EXOPEK-System aus der Schweiz'
                    }
                ]
            },

            // CTA
            { name: 'showCta', type: 'boolean', defaultValue: true },
            { name: 'ctaText', type: 'string', defaultValue: 'Jetzt EXOPEK ausprobieren' },
            { name: 'ctaUrl', type: 'url', defaultValue: '#kontakt' }
        ]
    },
    {
        component: GymLindenCTA,
        name: 'GymLindenCTA',
        inputs: [
            // Content
            { name: 'title', type: 'richText', defaultValue: 'Bereit für dein bestes Training im <span class="text-gradient-warm">Gym Linden</span>?' },
            { name: 'description', type: 'text', defaultValue: 'Erlebe EXOPEK Training live! Buche jetzt dein kostenloses Probetraining und starte mit mehr Energie in den Tag. Das beste Fitnessstudio Hannover Linden wartet auf dich.' },

            // CTAs
            { name: 'primaryText', type: 'string', defaultValue: 'Kostenloses Probetraining' },
            { name: 'primaryUrl', type: 'url', defaultValue: '/kontakt' },
            { name: 'secondaryText', type: 'string', defaultValue: 'Kurse ansehen' },
            { name: 'secondaryUrl', type: 'url', defaultValue: '/kurse' },

            // Styling
            { name: 'variant', type: 'text', enum: ['default', 'gradient', 'outline'], defaultValue: 'gradient' },
            { name: 'size', type: 'text', enum: ['sm', 'md', 'lg', 'xl'], defaultValue: 'lg' },

            // Trust Indicators
            {
                name: 'trustIndicators',
                type: 'list',
                subFields: [
                    { name: 'indicator', type: 'string', required: true }
                ],
                defaultValue: [
                    { indicator: 'Keine Anmeldegebühr' },
                    { indicator: 'Flexible Verträge' },
                    { indicator: 'Profi-Trainer' }
                ]
            }
        ]
    },
    {
        component: GymLindenFAQ,
        name: 'GymLindenFAQ',
        inputs: [
            // Header
            { name: 'badgeText', type: 'string', defaultValue: 'Häufige Fragen' },
            { name: 'badgeVariant', type: 'text', enum: ['new', 'popular', 'featured', 'limited', 'info', 'neutral'], defaultValue: 'info' },
            { name: 'showBadge', type: 'boolean', defaultValue: true },
            { name: 'headline', type: 'richText', defaultValue: 'Alles über unser Gym in Linden' },
            { name: 'subheadline', type: 'text', defaultValue: 'Häufige Fragen zu EXOPEK, Morgentraining und unserem Fitnessstudio Hannover Linden' },

            // Search & Filter
            { name: 'showSearch', type: 'boolean', defaultValue: true },
            { name: 'searchPlaceholder', type: 'string', defaultValue: 'Nach Thema suchen...' },
            { name: 'showCategories', type: 'boolean', defaultValue: true },
            { name: 'showCategoryIcons', type: 'boolean', defaultValue: false },
            { name: 'showCategoryBadges', type: 'boolean', defaultValue: true },

            // Categories
            {
                name: 'categories',
                type: 'list',
                subFields: [
                    { name: 'id', type: 'string', required: true },
                    { name: 'name', type: 'string', required: true },
                    { name: 'emoji', type: 'string' }
                ],
                defaultValue: [
                    { id: 'Allgemein', name: 'Allgemein', emoji: '💡' },
                    { id: 'Training', name: 'Training', emoji: '💪' },
                    { id: 'Mitgliedschaft', name: 'Mitgliedschaft', emoji: '📋' }
                ]
            },

            // FAQs
            {
                name: 'faqs',
                type: 'list',
                subFields: [
                    { name: 'question', type: 'string', required: true },
                    { name: 'answer', type: 'longText', required: true },
                    { name: 'category', type: 'string', required: true }
                ],
                defaultValue: [
                    {
                        question: 'Was macht euer Gym in Linden besonders?',
                        answer: 'Wir sind das einzige Fitnessstudio in Hannover Linden mit dem innovativen EXOPEK-Trainingssystem. Unsere Morgenkurse ab 6:30 Uhr sind perfekt für Berufstätige. Functional Training und HIIT in nur 30 Minuten – effizienter geht es nicht!',
                        category: 'Allgemein'
                    },
                    {
                        question: 'Was ist EXOPEK Training genau?',
                        answer: 'EXOPEK ist ein revolutionäres Trainingssystem aus Hannover, das Functional Training und HIIT mit spezieller Ausrüstung kombiniert. Du trainierst intensiver, effizienter und erreichst schneller deine Fitness-Ziele. Mehr Infos auf exopek.de',
                        category: 'Training'
                    },
                    {
                        question: 'Warum sollte ich morgens trainieren?',
                        answer: 'Morgentraining vor der Arbeit steigert deinen Stoffwechsel, verbessert die Konzentration und gibt dir Energie für den ganzen Tag. Unsere Kurse ab 6:30 Uhr sind zeitlich perfekt abgestimmt – du bist pünktlich und energiegeladen im Büro!',
                        category: 'Training'
                    },
                    {
                        question: 'Wie lange dauert ein Training im Gym Linden?',
                        answer: 'Nur 45 Minuten! EXOPEK Training ist hochintensiv und maximal effizient. Du sparst Zeit gegenüber traditionellem Gym-Training (60-90 Min.) und erreichst bessere Ergebnisse. Perfekt für Berufstätige in Hannover.',
                        category: 'Training'
                    },
                    {
                        question: 'Ist EXOPEK auch für Anfänger geeignet?',
                        answer: 'Absolut! Unsere erfahrenen Trainer passen das Training individuell an dein Fitness-Level an. Egal ob Anfänger oder Fortgeschrittener – beim Functional Training im Gym Hannover Linden bist du richtig.',
                        category: 'Training'
                    },
                    {
                        question: 'Wo genau ist euer Fitnessstudio in Linden?',
                        answer: 'Wir sind zentral in Hannover Linden gelegen und perfekt erreichbar – vor oder nach der Arbeit. Das Gym Linden für deine Nachbarschaft. Kontaktiere uns für die genaue Adresse und Wegbeschreibung!',
                        category: 'Allgemein'
                    },
                    {
                        question: 'Kann ich ein Probetraining machen?',
                        answer: 'Ja! Buche jetzt dein kostenloses Probetraining und erlebe EXOPEK live. Teste Functional Training Hannover Linden und überzeuge dich selbst vom besten Fitnessstudio in der Region.',
                        category: 'Mitgliedschaft'
                    },
                    {
                        question: 'Was brauche ich für das Training?',
                        answer: 'Nur Sportkleidung und Motivation! Die EXOPEK-Ausrüstung stellen wir. Für Functional Training und HIIT empfehlen wir feste Sportschuhe und ein Handtuch.',
                        category: 'Training'
                    }
                ]
            }
        ]
    },

    // === PRIVACY & LEGAL SECTIONS ===

    {
        component: PrivacyHeroSection,
        name: 'PrivacyHeroSection',
        inputs: [
            { name: 'headline', type: 'string', defaultValue: 'Datenschutzerklärung' },
            { name: 'subheadline', type: 'string', defaultValue: 'Letzte Aktualisierung: ' + new Date().toLocaleDateString('de-DE') },
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'showQuickAction', type: 'boolean', defaultValue: true },
            { name: 'quickActionTitle', type: 'string', defaultValue: 'Cookie-Einstellungen verwalten' },
            { name: 'quickActionDescription', type: 'longText', defaultValue: 'Sie können Ihre Präferenzen jederzeit ändern und Ihre Einwilligungen verwalten.' },
            { name: 'quickActionGradient', type: 'text', enum: ['warm', 'cool', 'primary', 'secondary'], defaultValue: 'warm' },
            { name: 'quickActionButtonText', type: 'string', defaultValue: 'Einstellungen öffnen' },
            { name: 'quickActionButtonHref', type: 'url', defaultValue: '/cookie-einstellungen' },
            { name: 'quickActionButtonVariant', type: 'text', enum: ['primary', 'secondary', 'outline', 'gradient'], defaultValue: 'secondary' },
            { name: 'quickActionButtonSize', type: 'text', enum: ['sm', 'md', 'lg', 'xl'], defaultValue: 'lg' }
        ]
    },

    {
        component: PrivacyOverviewSection,
        name: 'PrivacyOverviewSection',
        inputs: [
            { name: 'sectionTitle', type: 'string', defaultValue: '1. Datenschutz auf einen Blick' },
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'highlightTitle', type: 'string', defaultValue: 'Allgemeine Hinweise' },
            { name: 'highlightIcon', type: 'string', defaultValue: 'ℹ️' },
            { name: 'highlightVariant', type: 'text', enum: ['default', 'warning', 'info', 'success', 'primary'], defaultValue: 'info' },
            { name: 'generalInfo', type: 'longText', defaultValue: 'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.' },
            { name: 'accordion1Title', type: 'string', defaultValue: 'Wer ist verantwortlich für die Datenerfassung auf dieser Website?' },
            { name: 'accordion1Content', type: 'longText', defaultValue: 'Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt "Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.' },
            { name: 'accordion2Title', type: 'string', defaultValue: 'Wie erfassen wir Ihre Daten?' },
            { name: 'accordion2Content1', type: 'longText', defaultValue: 'Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.' },
            { name: 'accordion2Content2', type: 'longText', defaultValue: 'Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).' },
            { name: 'accordion3Title', type: 'string', defaultValue: 'Wofür nutzen wir Ihre Daten?' },
            { name: 'accordion3Content1', type: 'longText', defaultValue: 'Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.' },
            { name: 'accordion3Content2', type: 'longText', defaultValue: 'Sofern über die Website Verträge geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen verarbeitet.' },
            { name: 'accordion4Title', type: 'string', defaultValue: 'Welche Rechte haben Sie bezüglich Ihrer Daten?' },
            { name: 'accordion4Content', type: 'longText', defaultValue: 'Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.' }
        ]
    },

    {
        component: PrivacyResponsibleSection,
        name: 'PrivacyResponsibleSection',
        inputs: [
            { name: 'sectionTitle', type: 'string', defaultValue: 'Hinweis zur verantwortlichen Stelle' },
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'cardTitle', type: 'string', defaultValue: 'Verantwortliche Stelle' },
            { name: 'companyName', type: 'string', defaultValue: 'EXOPEK Gym UG (haftungsbeschränkt)' },
            { name: 'address', type: 'longText', defaultValue: 'Limmerstraße 4c<br>30451 Hannover' },
            { name: 'phone', type: 'string', defaultValue: '0173 190 1010' },
            { name: 'email', type: 'string', defaultValue: 'gym@exopek.de' },
            { name: 'legalNote', type: 'longText', defaultValue: 'Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.' }
        ]
    },

    {
        component: PrivacyHostingSection,
        name: 'PrivacyHostingSection',
        inputs: [
            { name: 'sectionTitle', type: 'string', defaultValue: '2. Hosting' },
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'cardTitle', type: 'string', defaultValue: 'Externes Hosting' },
            { name: 'description', type: 'longText', defaultValue: 'Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.' },
            { name: 'hosterLabel', type: 'string', defaultValue: 'Wir setzen folgenden Hoster ein:' },
            { name: 'hosterCompany', type: 'string', defaultValue: 'Cloudflare Germany GmbH' },
            { name: 'hosterAddress', type: 'string', defaultValue: 'Rosental 7, c/o Mindspace, 80331 München' },
            { name: 'hosterPhone', type: 'string', defaultValue: '+49 (89) 26207202' },
            { name: 'hosterEmail', type: 'string', defaultValue: 'support@cloudflare.com' },
            { name: 'hosterWebsite', type: 'url', defaultValue: 'https://www.cloudflare.com/' },
            { name: 'hosterWebsiteDisplay', type: 'string', defaultValue: 'cloudflare.com' }
        ]
    },

    {
        component: PrivacyDataCollectionSection,
        name: 'PrivacyDataCollectionSection',
        inputs: [
            { name: 'sectionTitle', type: 'string', defaultValue: '4. Datenerfassung auf dieser Website' },
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'cookiesTitle', type: 'string', defaultValue: 'Cookies' },
            { name: 'cookiesDescription', type: 'longText', defaultValue: 'Unsere Internetseiten verwenden so genannte "Cookies". Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.' },
            { name: 'cookiesSettingsLink', type: 'url', defaultValue: '/cookie-einstellungen' },
            { name: 'cookiesLinkText', type: 'string', defaultValue: 'Zu den Cookie-Einstellungen' },
            { name: 'contactFormTitle', type: 'string', defaultValue: 'Kontaktformular' },
            { name: 'contactFormContent', type: 'longText', defaultValue: 'Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.' },
            { name: 'inquiryTitle', type: 'string', defaultValue: 'Anfrage per E-Mail, Telefon oder Telefax' },
            { name: 'inquiryContent', type: 'longText', defaultValue: 'Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.' }
        ]
    },

    {
        component: PrivacyNewsletterSection,
        name: 'PrivacyNewsletterSection',
        inputs: [
            { name: 'sectionTitle', type: 'string', defaultValue: '5. Newsletter' },
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'cardTitle', type: 'string', defaultValue: 'Newsletterdaten' },
            { name: 'description', type: 'longText', defaultValue: 'Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind.' }
        ]
    },

    {
        component: PrivacyPluginsSection,
        name: 'PrivacyPluginsSection',
        inputs: [
            { name: 'sectionTitle', type: 'string', defaultValue: '6. Plugins und Tools' },
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'gridColumns', type: 'text', enum: ['1', '2', '3', '4'], defaultValue: '3' },
            { name: 'youtubeTitle', type: 'string', defaultValue: 'YouTube' },
            { name: 'youtubeIcon', type: 'string', defaultValue: '▶️' },
            { name: 'youtubeDescription', type: 'longText', defaultValue: 'Diese Website bindet Videos der Website YouTube ein. Betreiber der Website ist die Google Ireland Limited ("Google"), Gordon House, Barrow Street, Dublin 4, Irland. Wir nutzen YouTube im erweiterten Datenschutzmodus.' },
            { name: 'fontsTitle', type: 'string', defaultValue: 'Google Fonts' },
            { name: 'fontsIcon', type: 'string', defaultValue: '🔤' },
            { name: 'fontsDescription', type: 'longText', defaultValue: 'Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts, die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.' },
            { name: 'mapsTitle', type: 'string', defaultValue: 'Google Maps' },
            { name: 'mapsIcon', type: 'string', defaultValue: '🗺️' },
            { name: 'mapsDescription', type: 'longText', defaultValue: 'Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited ("Google"), Gordon House, Barrow Street, Dublin 4, Irland. Mit Hilfe dieses Dienstes können wir Kartenmaterial auf unserer Website einbinden.' }
        ]
    },

    {
        component: PrivacyRightsSection,
        name: 'PrivacyRightsSection',
        inputs: [
            { name: 'sectionTitle', type: 'string', defaultValue: 'Ihre Rechte' },
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'gridColumns', type: 'text', enum: ['1', '2', '3', '4'], defaultValue: '2' },
            { name: 'rightIcon', type: 'string', defaultValue: '✓' },
            { name: 'right1Title', type: 'string', defaultValue: '✓ Auskunft' },
            { name: 'right1Description', type: 'longText', defaultValue: 'Sie haben das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger sowie den Zweck der Datenverarbeitung.' },
            { name: 'right2Title', type: 'string', defaultValue: '✓ Berichtigung' },
            { name: 'right2Description', type: 'longText', defaultValue: 'Sie haben das Recht auf Berichtigung unrichtiger personenbezogener Daten. Sie können außerdem die Vervollständigung unvollständiger Daten verlangen.' },
            { name: 'right3Title', type: 'string', defaultValue: '✓ Löschung' },
            { name: 'right3Description', type: 'longText', defaultValue: 'Sie haben das Recht auf Löschung Ihrer bei uns gespeicherten Daten, soweit nicht gesetzliche Aufbewahrungspflichten dem entgegenstehen.' },
            { name: 'right4Title', type: 'string', defaultValue: '✓ Widerruf' },
            { name: 'right4Description', type: 'longText', defaultValue: 'Sie können erteilte Einwilligungen jederzeit für die Zukunft widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt davon unberührt.' }
        ]
    },

    {
        component: PrivacyContactSection,
        name: 'PrivacyContactSection',
        inputs: [
            { name: 'title', type: 'string', defaultValue: 'Kontakt Datenschutz' },
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' },
            { name: 'description', type: 'longText', defaultValue: 'Bei Fragen zum Datenschutz wenden Sie sich bitte an:' },
            { name: 'email', type: 'string', defaultValue: 'gym@exopek.de' },
            { name: 'phone', type: 'string', defaultValue: '+49 173 190 1010' },
            { name: 'address', type: 'longText', defaultValue: 'EXOPEK Gym UG (haftungsbeschränkt)\nLimmerstraße 4c\n30451 Hannover' },
            { name: 'gradient', type: 'text', enum: ['warm', 'cool', 'primary', 'secondary'], defaultValue: 'cool' },
            { name: 'showFooterNote', type: 'boolean', defaultValue: true },
            { name: 'footerText', type: 'string', defaultValue: 'Erstellt mit den Services von: ' },
            { name: 'footerLink', type: 'url', defaultValue: 'https://www.e-recht24.de' },
            { name: 'footerLinkText', type: 'string', defaultValue: 'e-recht24.de' }
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
              name: 'Gray 50',
              value: 'var(--color-gray-50, #FAFAFA)'
            },
            {
              name: 'Gray 100',
              value: 'var(--color-gray-100, #F5F5F5)'
            },
            {
              name: 'Gray 200',
              value: 'var(--color-gray-200, #EEEEEE)'
            },
            {
              name: 'Gray 300',
              value: 'var(--color-gray-300, #E0E0E0)'
            },
            {
              name: 'Gray 400',
              value: 'var(--color-gray-400, #BDBDBD)'
            },
            {
              name: 'Gray 500',
              value: 'var(--color-gray-500, #9E9E9E)'
            },
            {
              name: 'Gray 600',
              value: 'var(--color-gray-600, #757575)'
            },
            {
              name: 'Gray 700',
              value: 'var(--color-gray-700, #616161)'
            },
            {
              name: 'Gray 800',
              value: 'var(--color-gray-800, #424242)'
            },
            {
              name: 'Gray 900',
              value: 'var(--color-gray-900, #212121)'
            },
            {
              name: 'Black',
              value: 'var(--color-black, #000000)'
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