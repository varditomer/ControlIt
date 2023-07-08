
<script setup lang="ts">
import router from '@/router'
import { computed } from 'vue';
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const confirmedPassword = ref('')
const remember = ref(false)
const rules = {
  required: (value: string) => value ? true : 'Field is required',
  emailFormat: (value: string) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(value) || 'Invalid email format',
  passMatch: (value: string) => value === password.value || 'Passwords do not match',
}

const login = () => {
  if (!isFormValid.value) return
  // Add your login logic here
  console.log('Login:', email.value, password.value)
  // Redirect to the accounts page if login is successful
  // router.push('/accounts')
}

// Computed property to check if the fields are filled
const isFormValid = computed(() => {
  return (
    rules.emailFormat(email.value) === true &&
    rules.required(password.value) === true &&
    rules.required(confirmedPassword.value) === true &&
    rules.passMatch(confirmedPassword.value) === true
  )
})

</script>

<template>
  <v-container class="" fluid>
    <v-row class="align-center justify-center">
      <v-col cols="12" sm="8" md="4" lg="4">
        <v-card class="elevation-0">
          <!-- <v-card-title class="login-title">Login</v-card-title> -->
          <v-img src="src/assets/imgs/signup_img.jpg" alt="login image" height="180"></v-img>
          <v-card-text>
            <v-form ref="form" @submit.prevent="login">
              <v-text-field type="email" v-model="email" label="Enter your email" name="email"
                placeholder="johndoe@gmail.com" prepend-inner-icon="mdi-email" outlined
                :rules="[rules.required, rules.emailFormat]" clearable class="mb-2">
              </v-text-field>
              <v-text-field type="password" v-model="password" label="Enter your password" name="password"
                hint="Enter your password to access this website" prepend-inner-icon="mdi-lock" outlined
                :rules="[rules.required]" clearable class="mb-2">
              </v-text-field>
              <v-text-field type="password" v-model="confirmedPassword" label="Confirm your password"
                name="confirmedPassword" hint="Enter your password again to verify" prepend-inner-icon="mdi-lock" outlined
                :rules="[rules.required, rules.passMatch]" clearable>
              </v-text-field>
              <v-btn type="submit" class="mt-4" block color="primary" :disabled="!isFormValid">Login</v-btn>
            </v-form>
            <v-card-actions class="text--secondary">
              <v-checkbox label="Remember me" v-model="remember" hide-details></v-checkbox>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

