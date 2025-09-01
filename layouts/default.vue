<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Builder.io Header -->
      
      
      <!-- Fallback Header wenn Builder.io Content nicht verfügbar -->
      <Header/>
      
      <!-- Page Content -->
      <main class="-mt-24 relative z-10">
        <slot/>
      </main>
      
      <!-- Builder.io Footer -->
     
      
      <!-- Fallback Footer wenn Builder.io Content nicht verfügbar -->
      <Footer/>
      
      <!-- Global Toast Container -->
      <ToastContainer />
    </div>
  </template>
  
  <script setup>

  
  
  </script>