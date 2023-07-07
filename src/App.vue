<script setup lang="ts">
    // Import any required components or modules
    import { RouterView } from 'vue-router'
    import AppHeader from '@/components/AppHeader.vue'
    
    
    // Define your component logic
    // ...
    
    // Export the component
    
    
    
    
</script>

<template>
  <v-app>
    <app-header />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>



<style>
  html { overflow-y: auto !important }
</style>