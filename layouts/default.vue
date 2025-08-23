<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Builder.io Header -->
      
      
      <!-- Fallback Header wenn Builder.io Content nicht verfügbar -->
      <Header/>
      
      <!-- Page Content -->
      <main>
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