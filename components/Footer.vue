<template>
  <footer class="bg-white border-t border-gray-200 py-16">
    <div class="container">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <!-- Brand Section -->
        <div class="lg:col-span-2">
          <div class="flex items-center mb-3">
            <NuxtLink to="/" class="flex items-center">
              <img src="https://cdn.builder.io/api/v1/image/assets%2F2221ab9020b44cdd9cbb4a4793414e46%2F698b3f14d8e54640a0e15fce4eb0c6a3"
                   alt="EXOPEK GYM Logo"
                   class="w-auto h-24">
            </NuxtLink>
          </div>
          <p class="text-gray-600 mb-4 max-w-md text-sm">
            Dein Gym für hybrides Training. Mehr Kraft, Stabilität und Mobilität – überall wo du bist.
          </p>

          <!-- Contact Information -->
          <div class="space-y-2">
            <div class="flex items-center gap-2 text-gray-600 text-sm">
              <svg class="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              <span>Limmerstraße 4c, 30451 Hannover</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600 text-sm">
              <svg class="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>0173 190 10 10</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600 text-sm">
              <svg class="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>gym@exopek.de</span>
            </div>
          </div>
        </div>

        <!-- Training Section -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-3 text-sm">Training</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/kurse" class="text-gray-600 hover:text-orange-500 transition-colors text-sm">
                Unsere Kurse
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/mitgliedschaft" class="text-gray-600 hover:text-orange-500 transition-colors text-sm">
                Mitgliedschaft
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/preise" class="text-gray-600 hover:text-orange-500 transition-colors text-sm">
                Preise
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/personal-training" class="text-gray-600 hover:text-orange-500 transition-colors text-sm">
                Personal Training
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Service Section -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-3 text-sm">Service</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/probetraining" class="text-gray-600 hover:text-orange-500 transition-colors text-sm">
                Probetraining
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/kursplan" class="text-gray-600 hover:text-orange-500 transition-colors text-sm">
                Kursplan
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/support" class="text-gray-600 hover:text-orange-500 transition-colors text-sm">
                Support
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/faq" class="text-gray-600 hover:text-orange-500 transition-colors text-sm">
                FAQ
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-200 pt-4 flex flex-col md:flex-row justify-between items-center gap-3">
        <p class="text-gray-500 text-xs">
          © 2025 EXOPEK GYM UG. Alle Rechte vorbehalten.
        </p>

        <div class="flex items-center gap-4">
          <NuxtLink to="/impressum" class="text-gray-500 hover:text-orange-500 transition-colors text-xs">
            Impressum
          </NuxtLink>
          <NuxtLink to="/datenschutz" class="text-gray-500 hover:text-orange-500 transition-colors text-xs">
            Datenschutz
          </NuxtLink>

          <!-- Social Media Icon -->
          <div class="flex items-center gap-2">
            <a href="#" class="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component for EXOPEK GYM
// Contains navigation links, contact information, and legal pages
</script>