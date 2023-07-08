<template>
    <v-container class="d-flex flex-column justify-space-around fill-height">
        <h1 class="text-center mb-3">Welcome to ControlIt</h1>
        <v-img src="src/assets/imgs/control_it_img.jpg" alt="ControlIt image" :width="300" class="mx-auto home-page-img" contain></v-img>
        <v-btn color="primary" to="/login" prepend-icon="mdi-login" stacked variant="tonal" width="200">Login</v-btn>
    </v-container>
</template>

<script setup lang="ts">

</script>

<style scoped>
</style>