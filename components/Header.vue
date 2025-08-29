<template>
  <header class="self-stretch py-2 px-4 sticky top-0 z-50 bg-tarnsparent backdrop-blur-lg flex flex-col justify-center items-center gap-4">
    <!-- Desktop Header -->
    <div class="flex md:hidden self-stretch py-2 px-2 justify-between items-center overflow-hidden">
      <div class="h-16 flex justify-start items-center gap-3">
        <div class="justify-start text-primary text-5xl font-semibold leading-10"></div>
      </div>
      <div class="p-4 rounded-full flex justify-start items-start gap-3">
        <div class="px-6 py-2 bg-white btn-primary rounded-full flex justify-center items-center gap-2.5 overflow-hidden">
          <img class="w-6 h-6 opacity-30" src="https://placehold.co/24x24" />
          <div class="text-center justify-start text-black text-base font-normal leading-normal">HOME</div>
        </div>
        <div class="px-4 py-2 bg-white btn-primary rounded-full flex justify-center items-center gap-2.5 overflow-hidden">
          <div class="text-center justify-start text-black text-base font-normal leading-normal">OUR VALUE</div>
        </div>
        <div class="px-4 py-2 bg-white btn-primary rounded-full flex justify-center items-center gap-2.5 overflow-hidden">
          <div class="text-center justify-start text-black text-base font-normal leading-normal">CLASS</div>
        </div>
        <div class="px-4 py-2 bg-white btn-primary rounded-full flex justify-center items-center gap-2.5 overflow-hidden">
          <div class="text-center justify-start text-black text-base font-normal leading-normal">JOIN NOW</div>
        </div>
      </div>
      <div class="flex justify-end items-start gap-8">
        <div class="px-4 py-2 bg-white btn-primary rounded-full flex justify-center items-center gap-2.5 overflow-hidden">
          <div class="text-center justify-start text-black text-base font-normal leading-normal">JOIN NOW</div>
        </div>
      </div>
    </div>

    <!-- Mobile Header -->
    <div class="hidden md:flex justify-between items-center overflow-hidden w-full px-4">
      <div class="h-16 flex justify-start items-center gap-3">
        <div class="justify-start text-stone-800 text-2xl font-semibold leading-6">EXOPEK GYM</div>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu" class="p-2 rounded-[90px] bg-zinc-100">
        <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Sidebar -->
    <div v-if="isMobileMenuOpen" class="fixed inset-0 z-50 lg:hidden">
      <!-- Backdrop -->
      <div @click="toggleMobileMenu" class="fixed inset-0 bg-black bg-opacity-50"></div>
      
      <!-- Sidebar -->
      <div class="fixed right-0 top-0 h-full w-80 shadow-xl transform transition-transform duration-300 ease-in-out bg-white">
        <!-- Sidebar Header -->
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
          <div class="text-2xl font-semibold text-stone-800">EXOPEK GYM</div>
          <button @click="toggleMobileMenu" class="p-2 rounded-[90px] bg-zinc-100">
            <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Sidebar Navigation -->
        <div class="flex flex-col gap-4 p-6">
          <div class="px-4 py-3 rounded-[90px] flex justify-center items-center gap-2.5 overflow-hidden bg-zinc-100">
            <img class="w-6 h-6 opacity-30" src="https://placehold.co/24x24" />
            <div class="text-center justify-start text-black text-base font-normal font-['Plus_Jakarta_Sans'] leading-normal">HOME</div>
          </div>
          <div class="px-4 py-3 rounded-[90px] flex justify-center items-center gap-2.5 overflow-hidden bg-zinc-100">
            <div class="text-center justify-start text-black text-base font-normal font-['Plus_Jakarta_Sans'] leading-normal">OUR VALUE</div>
          </div>
          <div class="px-4 py-3 rounded-[90px] flex justify-center items-center gap-2.5 overflow-hidden bg-zinc-100">
            <div class="text-center justify-start text-black text-base font-normal font-['Plus_Jakarta_Sans'] leading-normal">CLASS</div>
          </div>
          <div class="px-4 py-3 border-2 rounded-[90px] flex justify-center items-center gap-2.5 overflow-hidden bg-white border-zinc-200">
            <div class="text-center justify-start text-black text-base font-normal font-['Plus_Jakarta_Sans'] leading-normal">JOIN NOW</div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>