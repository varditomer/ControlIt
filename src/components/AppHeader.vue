<template>
  <v-app-bar scroll-behavior="elevate">
    <v-app-bar-title @click="$router.push('/')" class="app-name">
      ControlIt
    </v-app-bar-title>
    <v-btn icon @click="toggleTheme">
      <v-icon>{{ isDarkMode ? 'mdi-brightness-2' : 'mdi-brightness-5' }}</v-icon>
    </v-btn>
    <v-menu offset-y v-if="isUserLoggedIn">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar color="info" size="x-small" class="">
            <v-icon icon="mdi-account-circle"></v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item :title="'Logout'" :prepend-icon="'mdi-logout'" @click="logout">
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>


<script setup lang="ts">
import { useUserStore } from '@/stores/user.store';
import { computed } from 'vue'
import { useTheme } from 'vuetify'
const userStore = useUserStore()
const isUserLoggedIn = computed<boolean>(() => !!userStore.loginToken) // !! transform to boolean value
const theme = useTheme()
const isDarkMode = computed<boolean>(() => {
  return theme.global.current.value.dark
})
const toggleTheme = () => theme.global.name.value = isDarkMode.value ? 'light' : 'dark'
const logout = () => userStore.logout()

</script>

<style scoped>
/* Your component styles here */
.app-name {
  cursor: pointer;
}
</style>