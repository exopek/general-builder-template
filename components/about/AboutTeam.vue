<template>
  <section
    class="py-16 md:py-20 overflow-hidden"
    :style="{ backgroundColor: backgroundColor }"
  >
    <div class="container mx-auto">

      <!-- Section Header -->
      <div class="text-center mb-12 lg:mb-16">
        <TransformationBadge
          v-if="showBadge"
          :text="badgeText"
          variant="info"
          class="mb-4"
        />

        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-6"
          :style="{ color: headlineColor }"
          v-html="headline"
        />

        <p
          class="text-lg md:text-xl max-w-3xl mx-auto"
          :style="{ color: subheadlineColor }"
        >
          {{ subheadline }}
        </p>
      </div>

      <!-- Team Grid -->
      <div v-if="teamMembers && teamMembers.length > 0" class="mb-16">
        <div
          class="grid gap-4 lg:gap-6"
          :class="getGridClasses(teamMembers.length)"
        >
          <!-- Updated Team Cards using AboutCard flip functionality -->
          <AboutCard
            v-for="(member, index) in teamMembers"
            :key="index"
            :flip-card="true"
            :title="member.name"
            :subtitle="member.role"
            :description="member.bio"
            :image="getTrainerImage(member.photo)"
            :image-alt="`${member.name} - ${member.role}`"
            :years-experience="member.yearsExperience"
            size="lg"
            variant="team"
            class="team-member-card"
            @flip="handleCardFlip(index, $event)"
          >
            <!-- Back content slot -->
            <template #back-content>
              <!-- Header -->
              <div class="text-center mb-6">
                <h3 class="text-xl font-bold mb-1">{{ member.name }}</h3>
                <p class="text-orange-200 text-sm">{{ member.role }}</p>
              </div>

              <!-- Experience Stat -->
              <div class="text-center mb-6">
                <div class="text-3xl font-black text-white mb-1">{{ member.yearsExperience }}+</div>
                <div class="text-orange-200 text-sm font-medium">Jahre Erfahrung</div>
              </div>

              <!-- Specialties -->
              <div v-if="member.specialties && member.specialties.length > 0" class="mb-6">
                <h5 class="text-sm font-semibold text-orange-200 mb-3 text-center">Spezialisierungen</h5>
                <div class="flex flex-wrap gap-2 justify-center">
                  <span
                    v-for="specialty in member.specialties"
                    :key="typeof specialty === 'string' ? specialty : specialty.specialty"
                    class="px-3 py-1 bg-white/20 text-xs rounded-full text-white font-medium"
                  >
                    {{ typeof specialty === 'string' ? specialty : specialty.specialty }}
                  </span>
                </div>
              </div>

              <!-- Social Links -->
              <div v-if="member.socialLinks && member.socialLinks.length > 0" class="flex justify-center gap-3 mb-4">
                <a
                  v-for="social in member.socialLinks"
                  :key="social.platform"
                  :href="social.url"
                  class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  @click.stop
                >
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
              </div>

              <!-- Hover hint -->
              <div class="flex items-center justify-center text-xs text-orange-200 mt-auto">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                Hover für Details
              </div>
            </template>
          </AboutCard>
        </div>
      </div>

      <!-- Team Stats -->
      <div v-if="showTeamStats" class="mb-16">
        <div class="text-center mb-8">
          <h3
            class="text-2xl md:text-3xl font-bold"
            :style="{ color: headlineColor }"
          >
            {{ teamStatsTitle }}
          </h3>
        </div>

        <BaseStatisticGrid
          :statistics="teamStatsData"
          grid-type="fixed-4"
          gap="lg"
          default-size="md"
          default-variant="primary"
          :default-count-up="true"
          animation="stagger"
        />
      </div>

      <!-- Company Culture Section -->
      <div v-if="showCulture" class="mb-16">
        <div class="grid lg:grid-cols-2 gap-12 items-center">

          <!-- Culture Content -->
          <div class="space-y-6">
            <h3
              class="text-2xl md:text-3xl font-bold"
              :style="{ color: headlineColor }"
            >
              {{ cultureTitle }}
            </h3>
            <p
              class="text-base md:text-lg leading-relaxed"
              :style="{ color: textColor }"
            >
              {{ cultureDescription }}
            </p>

            <!-- Culture Values -->
            <div v-if="cultureValues && cultureValues.length > 0" class="space-y-4">
              <div
                v-for="value in cultureValues"
                :key="value.title"
                class="flex items-start gap-4"
              >
                <AboutIcon
                  :name="value.iconName"
                  variant="primary"
                  size="sm"
                />
                <div>
                  <h5 class="font-semibold" :style="{ color: headlineColor }">{{ value.title }}</h5>
                  <p class="text-sm" :style="{ color: textColor }">{{ value.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Culture Visual -->
          <div class="relative">
            <img
              v-if="cultureImage"
              :src="cultureImage"
              :alt="cultureImageAlt"
              class="w-full h-auto object-cover rounded-2xl shadow-lg"
            />
            <!-- Fallback: Team composition chart -->
            <div v-else class="grid grid-cols-2 gap-4">
              <AboutCard
                variant="elevated"
                size="sm"
                title="Remote Work"
                subtitle="100%"
                icon-name="location"
              />
              <AboutCard
                variant="elevated"
                size="sm"
                title="Work-Life Balance"
                subtitle="5/5 ⭐"
                icon-name="heart"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Join Us CTA -->
      <div v-if="showJoinCta" class="text-center">
        <div class="max-w-2xl mx-auto space-y-6">
          <h3
            class="text-2xl md:text-3xl font-bold"
            :style="{ color: headlineColor }"
          >
            {{ joinCtaTitle }}
          </h3>
          <p
            class="text-base md:text-lg"
            :style="{ color: subheadlineColor }"
          >
            {{ joinCtaSubtitle }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <TransformationButton
              :text="primaryCtaText"
              :href="primaryCtaUrl"
              variant="gradient"
              size="lg"
              :external="primaryCtaExternal"
            />
            <TransformationButton
              v-if="secondaryCtaText"
              :text="secondaryCtaText"
              :href="secondaryCtaUrl"
              variant="outline"
              size="lg"
              :external="secondaryCtaExternal"
            />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
interface SocialLink {
  platform: string
  url: string
  icon: string
}

interface SpecialtyItem {
  specialty: string
}

interface TeamMember {
  name: string
  role: string
  bio?: string
  photo?: string
  socialLinks?: SocialLink[]
  specialties?: string[] | SpecialtyItem[]
  yearsExperience?: number
}

interface CultureValue {
  title: string
  description: string
  iconName: 'heart' | 'target' | 'people' | 'shield' | 'location' | 'award' | 'handshake' | 'lightbulb'
}

interface Props {
  // Content
  headline?: string
  subheadline?: string
  badgeText?: string
  showBadge?: boolean

  // Team Members
  teamMembers?: TeamMember[]
  cardSize?: 'sm' | 'md' | 'lg'
  imageStyle?: 'square' | 'portrait' | 'landscape' | 'circle'

  // Team Stats
  showTeamStats?: boolean
  teamStatsTitle?: string
  totalTeamSize?: number
  averageExperience?: number
  departmentsCount?: number
  satisfactionScore?: number

  // Company Culture
  showCulture?: boolean
  cultureTitle?: string
  cultureDescription?: string
  cultureValues?: CultureValue[]
  cultureImage?: string
  cultureImageAlt?: string

  // Join Us CTA
  showJoinCta?: boolean
  joinCtaTitle?: string
  joinCtaSubtitle?: string
  primaryCtaText?: string
  primaryCtaUrl?: string
  primaryCtaExternal?: boolean
  secondaryCtaText?: string
  secondaryCtaUrl?: string
  secondaryCtaExternal?: boolean

  // Styling
  backgroundColor?: string
  headlineColor?: string
  subheadlineColor?: string
  textColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Unsere <span style="color: #f97316;">Trainer</span> & Gründer',
  subheadline: 'Lernen Sie die leidenschaftlichen Menschen kennen, die das Exopek Gym zu einem besonderen Ort für funktionelles Training machen.',
  badgeText: 'Unser Team',
  showBadge: true,

  teamMembers: () => [
    {
      name: 'Tom Richter',
      role: 'Gründer & Head Trainer',
      bio: 'Als Gründer des Exopek Gyms bringt Tom seine Leidenschaft für funktionelles Training und über 10 Jahre Coaching-Erfahrung mit. Seine Vision: Training, das wirklich im Leben hilft.',
      photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face',
      yearsExperience: 10,
      specialties: [{ specialty: 'Funktionelles Training' }, { specialty: 'Krafttraining' }, { specialty: 'Bewegungsanalyse' }, { specialty: 'Trainingsplanung' }],
      socialLinks: [
        { platform: 'Instagram', url: 'https://instagram.com/tom_exopek', icon: 'instagram' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/tom-richter', icon: 'linkedin' }
      ]
    },
    {
      name: 'Lisa Weber',
      role: 'Co-Gründerin & Mobility Coach',
      bio: 'Lisa ist spezialisiert auf Beweglichkeit und Rehabilitation. Als Co-Gründerin sorgt sie dafür, dass jedes Training nicht nur stark, sondern auch gesund macht.',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b641?w=400&h=400&fit=crop&crop=face',
      yearsExperience: 8,
      specialties: [{ specialty: 'Mobility Training' }, { specialty: 'Rehabilitation' }, { specialty: 'Yoga' }, { specialty: 'Physiotherapie' }],
      socialLinks: [
        { platform: 'Instagram', url: 'https://instagram.com/lisa_exopek', icon: 'instagram' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/lisa-weber', icon: 'linkedin' }
      ]
    }
  ],
  cardSize: 'lg',
  imageStyle: 'landscape',

  showTeamStats: true,
  teamStatsTitle: 'Unser Trainer-Team',
  totalTeamSize: 8,
  averageExperience: 7,
  departmentsCount: 4,
  satisfactionScore: 98,

  showCulture: true,
  cultureTitle: 'Unsere Trainingsphilosophie',
  cultureDescription: 'Wir glauben an ein Training, das über das Fitnessstudio hinausgeht. Unser Team arbeitet zusammen, um jedem Mitglied zu helfen, stärker, beweglicher und selbstbewusster zu werden.',
  cultureValues: () => [
    {
      title: 'Individualität',
      description: 'Jeder bekommt das Training, das zu seinen Zielen passt.',
      iconName: 'people'
    },
    {
      title: 'Sicherheit First',
      description: 'Korrekte Ausführung und Verletzungsprävention haben Priorität.',
      iconName: 'shield'
    },
    {
      title: 'Community Spirit',
      description: 'Gemeinsam trainieren, sich gegenseitig motivieren und Erfolge feiern.',
      iconName: 'heart'
    }
  ],
  cultureImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=400&fit=crop&crop=center',
  cultureImageAlt: 'Trainer bei der Betreuung im Exopek Gym',

  showJoinCta: true,
  joinCtaTitle: 'Bereit für dein Training?',
  joinCtaSubtitle: 'Unser erfahrenes Trainer-Team freut sich darauf, dich bei deiner Fitness-Reise zu begleiten.',
  primaryCtaText: 'Probetraining buchen',
  primaryCtaUrl: '#probetraining',
  primaryCtaExternal: false,
  secondaryCtaText: 'Team kontaktieren',
  secondaryCtaUrl: '#kontakt',
  secondaryCtaExternal: false,

  backgroundColor: '#ffffff',
  headlineColor: '#1f2937',
  subheadlineColor: '#6b7280',
  textColor: '#374151'
})

// Transform team stats into array format
const teamStatsData = computed(() => {
  const stats: any[] = [
    {
      key: 'teamSize',
      value: props.totalTeamSize,
      label: 'Qualifizierte Trainer',
      suffix: '',
      iconName: 'people'
    }
  ]

  if (props.averageExperience) {
    stats.push({
      key: 'averageExperience',
      value: props.averageExperience,
      label: 'Ø Erfahrung',
      suffix: ' Jahre',
      iconName: 'award'
    })
  }

  if (props.departmentsCount) {
    stats.push({
      key: 'departments',
      value: props.departmentsCount,
      label: 'Trainingsbereiche',
      suffix: '',
      iconName: 'target'
    })
  }

  if (props.satisfactionScore) {
    stats.push({
      key: 'satisfaction',
      value: props.satisfactionScore,
      label: 'Mitgliederzufriedenheit',
      suffix: '%',
      iconName: 'heart'
    })
  }

  return stats
})

// Reactive state for flipped cards
const flippedCards = ref<number[]>([])

// Function to handle card flipping from AboutCard
const handleCardFlip = (index: number, flipped: boolean) => {
  console.log(`Card ${index} flipped to: ${flipped}`)
}

// Function to get trainer image with fallback placeholder
const getTrainerImage = (photo?: string): string => {
  if (photo && photo.trim() !== '') {
    return photo
  }

  // Default trainer placeholder images based on role/type
  const placeholderImages = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face', // Male trainer 1
    'https://images.unsplash.com/photo-1494790108755-2616b612b641?w=400&h=400&fit=crop&crop=face', // Female trainer 1
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face', // Male trainer 2
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face', // Female trainer 2
    'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&crop=face', // Male trainer 3
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face'  // Female trainer 3
  ]

  // Return a random placeholder image
  return placeholderImages[Math.floor(Math.random() * placeholderImages.length)]
}

// Helper function to determine grid classes - max 3 per row
const getGridClasses = (memberCount: number): string => {
  if (memberCount === 1) return 'grid-cols-1 max-w-lg mx-auto'
  if (memberCount === 2) return 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
  // Always max 3 per row, regardless of count
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
}
</script>

<style scoped>
/* Team member card animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.team-member-card {
  animation: fadeInUp 0.8s ease-out;
}

/* Stagger the team member animations */
.team-member-card:nth-child(1) { animation-delay: 0.1s; }
.team-member-card:nth-child(2) { animation-delay: 0.2s; }
.team-member-card:nth-child(3) { animation-delay: 0.3s; }
.team-member-card:nth-child(4) { animation-delay: 0.4s; }
.team-member-card:nth-child(5) { animation-delay: 0.5s; }
.team-member-card:nth-child(6) { animation-delay: 0.6s; }
.team-member-card:nth-child(7) { animation-delay: 0.7s; }
.team-member-card:nth-child(8) { animation-delay: 0.8s; }

/* Specialty tags styling */
.px-2.py-1 {
  transition: all 0.2s ease;
}

.px-2.py-1:hover {
  background-color: var(--color-primary-light);
  color: white;
  transform: scale(1.05);
}

/* Culture values animation */
.flex.items-start.gap-4 {
  animation: fadeInUp 0.6s ease-out;
}

.flex.items-start.gap-4:nth-child(1) { animation-delay: 0.2s; }
.flex.items-start.gap-4:nth-child(2) { animation-delay: 0.4s; }
.flex.items-start.gap-4:nth-child(3) { animation-delay: 0.6s; }

/* Team stats animation */
.grid.grid-cols-2 > * {
  animation: fadeInUp 0.8s ease-out;
}

.grid.grid-cols-2 > *:nth-child(1) { animation-delay: 0.1s; }
.grid.grid-cols-2 > *:nth-child(2) { animation-delay: 0.2s; }
.grid.grid-cols-2 > *:nth-child(3) { animation-delay: 0.3s; }
.grid.grid-cols-2 > *:nth-child(4) { animation-delay: 0.4s; }

/* Culture image hover effect */
.shadow-lg:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-xl);
  transition: all 0.3s ease;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .text-3xl {
    font-size: 1.875rem;
  }

  .text-2xl {
    font-size: 1.5rem;
  }

  .grid.gap-8 {
    gap: 1.5rem;
  }

  .max-w-4xl {
    max-width: 100%;
  }
}

/* Circle image styling enhancements for team photos */
.aspect-square.rounded-full img {
  transition: all 0.3s ease;
}

.aspect-square.rounded-full:hover img {
  transform: scale(1.1);
}
</style>