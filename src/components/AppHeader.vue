<template>
  <v-app-bar color="info" scroll-behavior="elevate">
    <v-app-bar-title @click="$router.push('/')" class="app-name">
      ControlIt
    </v-app-bar-title>
  </v-app-bar>
</template>


<script setup lang="ts">
</script>

<style scoped>
/* Your component styles here */
.app-name {
  cursor: pointer;
}
</style>