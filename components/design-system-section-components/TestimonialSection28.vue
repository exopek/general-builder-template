<template>
  <section
    class="py-12 md:py-16 lg:py-20"
    :style="{ backgroundColor }"
  >
    <div class="container mx-auto px-4 md:px-6">

      <!-- Header Section (Centered) -->
      <div v-if="showHeader" class="text-center mb-12 md:mb-16">
        <!-- Tagline -->
        <p
          v-if="showTagline && tagline"
          class="text-sm md:text-base font-semibold mb-3"
          :style="{ color: taglineColor }"
          v-html="tagline"
        ></p>

        <!-- Headline -->
        <div
          v-if="showHeadline && headline"
          class="text-3xl md:text-4xl lg:text-5xl font-black mb-4"
          :style="{ color: headlineColor }"
          v-html="headline"
        ></div>

        <!-- Description -->
        <div
          v-if="showDescription && description"
          class="text-base md:text-lg max-w-3xl mx-auto"
          :style="{ color: descriptionColor }"
          v-html="description"
        ></div>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

        <!-- Testimonial 1 -->
        <div
          v-if="showTestimonial1"
          class="p-6 md:p-8 rounded-2xl border"
          :style="{
            backgroundColor: testimonial1BackgroundColor,
            borderColor: testimonial1BorderColor
          }"
        >
          <!-- Quote Text -->
          <div
            v-if="testimonial1Quote"
            class="text-base mb-6"
            :style="{ color: testimonial1QuoteColor }"
            v-html="testimonial1Quote"
          ></div>

          <!-- Author Info -->
          <div class="flex items-center gap-4">
            <!-- Avatar -->
            <div
              v-if="showTestimonial1Avatar"
              class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
              :style="{ backgroundColor: testimonial1AvatarPlaceholderColor }"
            >
              <img
                v-if="testimonial1Avatar"
                :src="testimonial1Avatar"
                :alt="testimonial1Name || 'Avatar'"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Name & Role -->
            <div>
              <div
                v-if="testimonial1Name"
                class="font-bold text-base"
                :style="{ color: testimonial1NameColor }"
              >
                {{ testimonial1Name }}
              </div>
              <div
                v-if="testimonial1Role"
                class="text-sm"
                :style="{ color: testimonial1RoleColor }"
              >
                {{ testimonial1Role }}
              </div>
            </div>
          </div>
        </div>

        <!-- Testimonial 2 -->
        <div
          v-if="showTestimonial2"
          class="p-6 md:p-8 rounded-2xl border"
          :style="{
            backgroundColor: testimonial2BackgroundColor,
            borderColor: testimonial2BorderColor
          }"
        >
          <div
            v-if="testimonial2Quote"
            class="text-base mb-6"
            :style="{ color: testimonial2QuoteColor }"
            v-html="testimonial2Quote"
          ></div>

          <div class="flex items-center gap-4">
            <div
              v-if="showTestimonial2Avatar"
              class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
              :style="{ backgroundColor: testimonial2AvatarPlaceholderColor }"
            >
              <img
                v-if="testimonial2Avatar"
                :src="testimonial2Avatar"
                :alt="testimonial2Name || 'Avatar'"
                class="w-full h-full object-cover"
              />
            </div>

            <div>
              <div
                v-if="testimonial2Name"
                class="font-bold text-base"
                :style="{ color: testimonial2NameColor }"
              >
                {{ testimonial2Name }}
              </div>
              <div
                v-if="testimonial2Role"
                class="text-sm"
                :style="{ color: testimonial2RoleColor }"
              >
                {{ testimonial2Role }}
              </div>
            </div>
          </div>
        </div>

        <!-- Testimonial 3 -->
        <div
          v-if="showTestimonial3"
          class="p-6 md:p-8 rounded-2xl border"
          :style="{
            backgroundColor: testimonial3BackgroundColor,
            borderColor: testimonial3BorderColor
          }"
        >
          <div
            v-if="testimonial3Quote"
            class="text-base mb-6"
            :style="{ color: testimonial3QuoteColor }"
            v-html="testimonial3Quote"
          ></div>

          <div class="flex items-center gap-4">
            <div
              v-if="showTestimonial3Avatar"
              class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
              :style="{ backgroundColor: testimonial3AvatarPlaceholderColor }"
            >
              <img
                v-if="testimonial3Avatar"
                :src="testimonial3Avatar"
                :alt="testimonial3Name || 'Avatar'"
                class="w-full h-full object-cover"
              />
            </div>

            <div>
              <div
                v-if="testimonial3Name"
                class="font-bold text-base"
                :style="{ color: testimonial3NameColor }"
              >
                {{ testimonial3Name }}
              </div>
              <div
                v-if="testimonial3Role"
                class="text-sm"
                :style="{ color: testimonial3RoleColor }"
              >
                {{ testimonial3Role }}
              </div>
            </div>
          </div>
        </div>

        <!-- Testimonial 4 -->
        <div
          v-if="showTestimonial4"
          class="p-6 md:p-8 rounded-2xl border"
          :style="{
            backgroundColor: testimonial4BackgroundColor,
            borderColor: testimonial4BorderColor
          }"
        >
          <div
            v-if="testimonial4Quote"
            class="text-base mb-6"
            :style="{ color: testimonial4QuoteColor }"
            v-html="testimonial4Quote"
          ></div>

          <div class="flex items-center gap-4">
            <div
              v-if="showTestimonial4Avatar"
              class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
              :style="{ backgroundColor: testimonial4AvatarPlaceholderColor }"
            >
              <img
                v-if="testimonial4Avatar"
                :src="testimonial4Avatar"
                :alt="testimonial4Name || 'Avatar'"
                class="w-full h-full object-cover"
              />
            </div>

            <div>
              <div
                v-if="testimonial4Name"
                class="font-bold text-base"
                :style="{ color: testimonial4NameColor }"
              >
                {{ testimonial4Name }}
              </div>
              <div
                v-if="testimonial4Role"
                class="text-sm"
                :style="{ color: testimonial4RoleColor }"
              >
                {{ testimonial4Role }}
              </div>
            </div>
          </div>
        </div>

        <!-- Testimonial 5 -->
        <div
          v-if="showTestimonial5"
          class="p-6 md:p-8 rounded-2xl border"
          :style="{
            backgroundColor: testimonial5BackgroundColor,
            borderColor: testimonial5BorderColor
          }"
        >
          <div
            v-if="testimonial5Quote"
            class="text-base mb-6"
            :style="{ color: testimonial5QuoteColor }"
            v-html="testimonial5Quote"
          ></div>

          <div class="flex items-center gap-4">
            <div
              v-if="showTestimonial5Avatar"
              class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
              :style="{ backgroundColor: testimonial5AvatarPlaceholderColor }"
            >
              <img
                v-if="testimonial5Avatar"
                :src="testimonial5Avatar"
                :alt="testimonial5Name || 'Avatar'"
                class="w-full h-full object-cover"
              />
            </div>

            <div>
              <div
                v-if="testimonial5Name"
                class="font-bold text-base"
                :style="{ color: testimonial5NameColor }"
              >
                {{ testimonial5Name }}
              </div>
              <div
                v-if="testimonial5Role"
                class="text-sm"
                :style="{ color: testimonial5RoleColor }"
              >
                {{ testimonial5Role }}
              </div>
            </div>
          </div>
        </div>

        <!-- Testimonial 6 -->
        <div
          v-if="showTestimonial6"
          class="p-6 md:p-8 rounded-2xl border"
          :style="{
            backgroundColor: testimonial6BackgroundColor,
            borderColor: testimonial6BorderColor
          }"
        >
          <div
            v-if="testimonial6Quote"
            class="text-base mb-6"
            :style="{ color: testimonial6QuoteColor }"
            v-html="testimonial6Quote"
          ></div>

          <div class="flex items-center gap-4">
            <div
              v-if="showTestimonial6Avatar"
              class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
              :style="{ backgroundColor: testimonial6AvatarPlaceholderColor }"
            >
              <img
                v-if="testimonial6Avatar"
                :src="testimonial6Avatar"
                :alt="testimonial6Name || 'Avatar'"
                class="w-full h-full object-cover"
              />
            </div>

            <div>
              <div
                v-if="testimonial6Name"
                class="font-bold text-base"
                :style="{ color: testimonial6NameColor }"
              >
                {{ testimonial6Name }}
              </div>
              <div
                v-if="testimonial6Role"
                class="text-sm"
                :style="{ color: testimonial6RoleColor }"
              >
                {{ testimonial6Role }}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  // === VISIBILITY TOGGLES ===
  showHeader?: boolean
  showTagline?: boolean
  showHeadline?: boolean
  showDescription?: boolean
  showTestimonial1?: boolean
  showTestimonial1Avatar?: boolean
  showTestimonial2?: boolean
  showTestimonial2Avatar?: boolean
  showTestimonial3?: boolean
  showTestimonial3Avatar?: boolean
  showTestimonial4?: boolean
  showTestimonial4Avatar?: boolean
  showTestimonial5?: boolean
  showTestimonial5Avatar?: boolean
  showTestimonial6?: boolean
  showTestimonial6Avatar?: boolean

  // === HEADER CONTENT ===
  tagline?: string
  headline?: string
  description?: string

  // === COLORS ===
  backgroundColor?: string
  taglineColor?: string
  headlineColor?: string
  descriptionColor?: string

  // === TESTIMONIAL 1 ===
  testimonial1Quote?: string
  testimonial1Name?: string
  testimonial1Role?: string
  testimonial1Avatar?: string
  testimonial1BackgroundColor?: string
  testimonial1BorderColor?: string
  testimonial1QuoteColor?: string
  testimonial1NameColor?: string
  testimonial1RoleColor?: string
  testimonial1AvatarPlaceholderColor?: string

  // === TESTIMONIAL 2 ===
  testimonial2Quote?: string
  testimonial2Name?: string
  testimonial2Role?: string
  testimonial2Avatar?: string
  testimonial2BackgroundColor?: string
  testimonial2BorderColor?: string
  testimonial2QuoteColor?: string
  testimonial2NameColor?: string
  testimonial2RoleColor?: string
  testimonial2AvatarPlaceholderColor?: string

  // === TESTIMONIAL 3 ===
  testimonial3Quote?: string
  testimonial3Name?: string
  testimonial3Role?: string
  testimonial3Avatar?: string
  testimonial3BackgroundColor?: string
  testimonial3BorderColor?: string
  testimonial3QuoteColor?: string
  testimonial3NameColor?: string
  testimonial3RoleColor?: string
  testimonial3AvatarPlaceholderColor?: string

  // === TESTIMONIAL 4 ===
  testimonial4Quote?: string
  testimonial4Name?: string
  testimonial4Role?: string
  testimonial4Avatar?: string
  testimonial4BackgroundColor?: string
  testimonial4BorderColor?: string
  testimonial4QuoteColor?: string
  testimonial4NameColor?: string
  testimonial4RoleColor?: string
  testimonial4AvatarPlaceholderColor?: string

  // === TESTIMONIAL 5 ===
  testimonial5Quote?: string
  testimonial5Name?: string
  testimonial5Role?: string
  testimonial5Avatar?: string
  testimonial5BackgroundColor?: string
  testimonial5BorderColor?: string
  testimonial5QuoteColor?: string
  testimonial5NameColor?: string
  testimonial5RoleColor?: string
  testimonial5AvatarPlaceholderColor?: string

  // === TESTIMONIAL 6 ===
  testimonial6Quote?: string
  testimonial6Name?: string
  testimonial6Role?: string
  testimonial6Avatar?: string
  testimonial6BackgroundColor?: string
  testimonial6BorderColor?: string
  testimonial6QuoteColor?: string
  testimonial6NameColor?: string
  testimonial6RoleColor?: string
  testimonial6AvatarPlaceholderColor?: string
}

withDefaults(defineProps<Props>(), {
  // Visibility
  showHeader: true,
  showTagline: true,
  showHeadline: true,
  showDescription: true,
  showTestimonial1: true,
  showTestimonial1Avatar: true,
  showTestimonial2: true,
  showTestimonial2Avatar: true,
  showTestimonial3: true,
  showTestimonial3Avatar: true,
  showTestimonial4: true,
  showTestimonial4Avatar: true,
  showTestimonial5: true,
  showTestimonial5Avatar: true,
  showTestimonial6: true,
  showTestimonial6Avatar: true,

  // Header Content
  tagline: 'Tagline',
  headline: 'Lorem ipsum dolor sit amet',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',

  // Colors
  backgroundColor: '#ffffff',
  taglineColor: '#6b7280',
  headlineColor: '#111827',
  descriptionColor: '#6b7280',

  // Testimonial 1
  testimonial1Quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."',
  testimonial1Name: 'Adam Smith',
  testimonial1Role: 'CEO, Company',
  testimonial1Avatar: '',
  testimonial1BackgroundColor: '#ffffff',
  testimonial1BorderColor: '#e5e7eb',
  testimonial1QuoteColor: '#6b7280',
  testimonial1NameColor: '#111827',
  testimonial1RoleColor: '#9ca3af',
  testimonial1AvatarPlaceholderColor: '#d1d5db',

  // Testimonial 2
  testimonial2Quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."',
  testimonial2Name: 'Adam Smith',
  testimonial2Role: 'CEO, Company',
  testimonial2Avatar: '',
  testimonial2BackgroundColor: '#ffffff',
  testimonial2BorderColor: '#e5e7eb',
  testimonial2QuoteColor: '#6b7280',
  testimonial2NameColor: '#111827',
  testimonial2RoleColor: '#9ca3af',
  testimonial2AvatarPlaceholderColor: '#d1d5db',

  // Testimonial 3
  testimonial3Quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."',
  testimonial3Name: 'Adam Smith',
  testimonial3Role: 'CEO, Company',
  testimonial3Avatar: '',
  testimonial3BackgroundColor: '#ffffff',
  testimonial3BorderColor: '#e5e7eb',
  testimonial3QuoteColor: '#6b7280',
  testimonial3NameColor: '#111827',
  testimonial3RoleColor: '#9ca3af',
  testimonial3AvatarPlaceholderColor: '#d1d5db',

  // Testimonial 4
  testimonial4Quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."',
  testimonial4Name: 'Adam Smith',
  testimonial4Role: 'CEO, Company',
  testimonial4Avatar: '',
  testimonial4BackgroundColor: '#ffffff',
  testimonial4BorderColor: '#e5e7eb',
  testimonial4QuoteColor: '#6b7280',
  testimonial4NameColor: '#111827',
  testimonial4RoleColor: '#9ca3af',
  testimonial4AvatarPlaceholderColor: '#d1d5db',

  // Testimonial 5
  testimonial5Quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."',
  testimonial5Name: 'Adam Smith',
  testimonial5Role: 'CEO, Company',
  testimonial5Avatar: '',
  testimonial5BackgroundColor: '#ffffff',
  testimonial5BorderColor: '#e5e7eb',
  testimonial5QuoteColor: '#6b7280',
  testimonial5NameColor: '#111827',
  testimonial5RoleColor: '#9ca3af',
  testimonial5AvatarPlaceholderColor: '#d1d5db',

  // Testimonial 6
  testimonial6Quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."',
  testimonial6Name: 'Adam Smith',
  testimonial6Role: 'CEO, Company',
  testimonial6Avatar: '',
  testimonial6BackgroundColor: '#ffffff',
  testimonial6BorderColor: '#e5e7eb',
  testimonial6QuoteColor: '#6b7280',
  testimonial6NameColor: '#111827',
  testimonial6RoleColor: '#9ca3af',
  testimonial6AvatarPlaceholderColor: '#d1d5db'
})
</script>
