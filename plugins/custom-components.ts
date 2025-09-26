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

// About Components
import AboutHero from '~/components/about/AboutHero.vue';
import AboutStory from '~/components/about/AboutStory.vue';
import AboutTeam from '~/components/about/AboutTeam.vue';
import AboutValues from '~/components/about/AboutValues.vue';
import AboutStats from '~/components/about/AboutStats.vue';
import AboutLocation from '~/components/about/AboutLocation.vue';
import AboutCTA from '~/components/about/AboutCTA.vue';

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
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#anmeldung' },
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'Kostenloses Beratungsgespräch' },
            { name: 'secondaryCtaUrl', type: 'url', defaultValue: '/kontakt' }
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
            { name: 'primaryCtaUrl', type: 'url', defaultValue: '#anmeldung' },
            { name: 'secondaryCtaText', type: 'string', defaultValue: 'Kostenloses Beratungsgespräch' },
            { name: 'secondaryCtaUrl', type: 'url', defaultValue: '/kontakt' },
            { name: 'backgroundColor', type: 'color', defaultValue: '#ffffff' }
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
            {
                name: 'faqs',
                type: 'list',
                subFields: [
                    { name: 'question', type: 'string', required: true },
                    { name: 'answer', type: 'longText', required: true },
                    { name: 'category', type: 'string', required: true, enum: ['program', 'pricing', 'training', 'nutrition', 'support', 'results'] },
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
            { name: 'step1Label', type: 'string', defaultValue: 'Schritt 1: Deine Ziele' },
            { name: 'step2Label', type: 'string', defaultValue: 'Schritt 2: Betreuung & Sicherheit' },
            { name: 'step3Label', type: 'string', defaultValue: 'Schritt 3: Dein Start' },

            // Final CTA
            { name: 'finalCtaHeadline', type: 'string', defaultValue: 'Perfekt! Du bist bereit für deine Transformation' },
            { name: 'finalCtaSubtext', type: 'text', defaultValue: 'Sichere dir jetzt deinen Platz und starte noch heute mit deiner 7-Wochen Transformation' },
            { name: 'finalCtaText', type: 'string', defaultValue: 'Jetzt starten - Nur 297€' },
            { name: 'finalCtaUrl', type: 'url', defaultValue: '#anmeldung' },
            { name: 'cashbackText', type: 'string', defaultValue: '💰 100€ Cashback bei erfolgreichem Abschluss' },

            // Styling
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