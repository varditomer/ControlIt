
<script setup lang="ts">
import { useUserStore } from '@/stores/user.store'
import { computed } from 'vue'
import { ref } from 'vue'

const userStore = useUserStore()

const signupError = ref('')
const isError = ref(false)
const email = ref('')
const password = ref('')

const rules = {
  required: (value: string) => value ? true : 'Field is required',
  emailFormat: (value: string) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(value) || 'Invalid email format',
}

const performLogin = async () => {
  if (!isFormValid.value) return

  const credentials = {
    email: email.value,
    password: password.value
  }

  try {
    await userStore.login(credentials)
  } catch (error) {
    if (error instanceof Error) {
      isError.value = true
      signupError.value = 'Incorrect email or password!'
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
              <v-btn type="submit" class="mt-4" block color="success" :disabled="!isFormValid"
                prepend-icon="mdi-login">Login</v-btn>
            </v-form>
            <v-snackbar v-model="isError" :timeout="3000" color="warning" outlined>
              {{ signupError }}
            </v-snackbar>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>



