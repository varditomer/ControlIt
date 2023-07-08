
<script setup lang="ts">
import { useUserStore } from '@/stores/user.store'
import { computed } from 'vue'
import { ref } from 'vue'

const userStore = useUserStore()

const signupError = ref('')
const email = ref('')
const password = ref('')
const remember = ref(false)
const rules = {
  required: (value: string) => value ? true : 'Field is required',
  emailFormat: (value: string) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(value) || 'Invalid email format',
}

const performLogin = async () => {
  if (!isFormValid.value) return
  console.log(`123:`, )

  const credentials = {
    email: email.value,
    password: password.value
  }

  try {
    console.log(`12345:`, )
    await userStore.login(credentials, remember.value)
    console.log(`1234568:`, )
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
  return rules.emailFormat(email.value) === true && rules.required(password.value) === true
})

</script>

<template>
  <v-container class="" fluid>
    <v-row class="align-center justify-center">
      <v-col cols="12" sm="8" md="4" lg="4">
        <v-card class="elevation-0">
          <v-img src="src/assets/imgs/login_img.jpg" alt="login image" height="180"></v-img>
          <v-card-text>
            <v-form ref="form" @submit.prevent="performLogin">
              <v-text-field type="email" v-model="email" label="Enter your email" name="email"
                placeholder="johndoe@gmail.com" prepend-inner-icon="mdi-email" outlined
                :rules="[rules.required, rules.emailFormat]" clearable class="mb-2"></v-text-field>
              <v-text-field type="password" v-model="password" label="Enter your password" name="password"
                hint="Enter your password to access this website" prepend-inner-icon="mdi-lock" outlined
                :rules="[rules.required]" clearable></v-text-field>
              <v-btn type="submit" class="mt-4" block color="success" :disabled="!isFormValid" prepend-icon="mdi-login">Login</v-btn>
              <div v-if="signupError" class="error-message">{{ signupError }}</div>
            </v-form>
            <v-card-actions class="text--secondary">
              <v-checkbox label="Remember me" v-model="remember" hide-details></v-checkbox>
              <v-spacer></v-spacer>
              <div>
                No account? <router-link to="/signup" class="ml-1">Signup</router-link>
              </div>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

