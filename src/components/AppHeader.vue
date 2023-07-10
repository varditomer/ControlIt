<template>
  <v-app-bar scroll-behavior="elevate">
    <v-app-bar-title @click="$router.push('/')" class="app-name">
      ControlIt
    </v-app-bar-title>
    <v-btn icon @click="toggleTheme">
      <v-icon>{{ isDarkMode ? 'mdi-brightness-2' : 'mdi-brightness-5' }}</v-icon>
    </v-btn>
    <v-btn v-if="true" icon>
      <v-avatar color="info" size="x-small" class="">
        <v-icon icon="mdi-account-circle"></v-icon>
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from 'vuetify'
const theme = useTheme()
const isDarkMode = computed<boolean>(() => {
  return theme.global.current.value.dark
})
const toggleTheme = () => theme.global.name.value = isDarkMode.value ? 'light' : 'dark'

</script>

<style scoped>
/* Your component styles here */
.app-name {
  cursor: pointer;
}
</style>