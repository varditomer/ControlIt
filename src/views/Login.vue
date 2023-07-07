
<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';

    const email = ref('');
    const password = ref('');

    const login = () => {
      // Add your login logic here
      console.log('Login:', email.value, password.value);
      // Redirect to the accounts page if login is successful
      router.push('/accounts');
    };

</script>

<template>
  <v-container class="login-container">
    <v-card class="login-card">
      <v-card-title class="login-title">Login</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="login">
          <v-text-field v-model="email" label="Email" type="email" outlined required></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" outlined required></v-text-field>
          <v-btn type="submit" color="primary">Login</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

