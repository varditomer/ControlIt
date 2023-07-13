<template>
    <v-container class="d-flex flex-column justify-space-around fill-height">
        <h1 class="text-center mb-3">Welcome to ControlIt</h1>
        <v-img src="src/assets/imgs/control_it_img.jpg" alt="ControlIt image" :width="300" class="mx-auto home-page-img"
            contain></v-img>
        <v-row class="d-flex align-center">
            <v-col v-if="isUserLoggedIn" cols="12" class="text-center">
                <v-btn color="success" to="/accounts" prepend-icon="mdi-account-multiple-outline" stacked variant="tonal"
                    width="200">Accounts</v-btn>
            </v-col>
            <v-col v-else cols="12" class="text-center">
                <v-btn color="primary" to="/login" prepend-icon="mdi-login" stacked variant="tonal"
                    width="200">Login</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user.store'

const userStore = useUserStore()
const isUserLoggedIn = computed<boolean>(() => !!userStore.loginToken) // !! transform to boolean value


</script>

<style scoped></style>