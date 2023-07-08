
<script setup lang="ts">
import { useUserStore } from '@/stores/user.store'
import { computed } from 'vue'
import { ref } from 'vue'

const userStore = useUserStore()

const signupError = ref('')
const name = ref('')
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

const performSignup = async () => {
  if (!isFormValid.value) return

  const userDetails = {
    name: name.value,
    email: email.value,
    password: password.value
  }

  try {
    signupError.value = '' // Clear any previous error message
    await userStore.signup(userDetails, remember.value)
  } catch (error) {
    if (error instanceof Error) {
      signupError.value = error.message
    } else {
      signupError.value = 'An error occurred during signup.'
    }
  }
}

// Computed property to check if the fields are filled
const isFormValid = computed(() => {
  return (
    rules.emailFormat(email.value) === true &&
    rules.required(password.value) === true &&
    rules.required(name.value) === true &&
    rules.required(confirmedPassword.value) === true &&
    rules.passMatch(confirmedPassword.value) === true
  )
})

</script>

<template>
  <v-container class="" fluid>
    <v-row class="justify-center">
      <v-col cols="12" sm="8" md="4" lg="4">
        <v-card class="elevation-0">
          <v-img src="src/assets/imgs/signup_img.jpg" alt="login image" height="180"></v-img>
          <v-card-text>
            <v-form ref="form" @submit.prevent="performSignup">
              <v-text-field type="text" v-model="name" label="Enter your name" name="name"
                prepend-inner-icon="mdi-text-account" outlined
                :rules="[rules.required]" clearable class="mb-2">
              </v-text-field>
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
              <v-btn type="submit" class="mt-4" block color="success" :disabled="!isFormValid" prepend-icon="mdi-account-plus-outline">Register</v-btn>
              <div v-if="signupError" class="error-message">{{ signupError }}</div>
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

