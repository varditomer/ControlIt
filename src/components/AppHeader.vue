<template>
  <v-app-bar scroll-behavior="elevate">
    <v-app-bar-title @click="$router.push('/')" class="app-name">
      ControlIt
    </v-app-bar-title>
    <v-btn icon @click="toggleTheme">
      <v-icon>mdi-palette</v-icon>
    </v-btn>
  </v-app-bar>
</template>


<script setup lang="ts">
import { useTheme } from 'vuetify'
const theme = useTheme()
const toggleTheme = () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'

</script>

<style scoped>
/* Your component styles here */
.app-name {
  cursor: pointer;
}
</style>