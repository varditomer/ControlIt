import type { UserCredentials } from '@/interfaces/user.interface'
import router from '@/router'
import { userService } from '@/services/user.service'
import { defineStore } from 'pinia'

interface UserState {
  loginToken: string | null
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => <UserState>({
    loginToken: userService.getLoginToken()
  }),
  actions: {
    async login(credentials: UserCredentials) {
      try {
        const loginToken = await userService.login(credentials)
        if (loginToken) {
          // If login succeeded => set login token in store and redirect user to /accounts
          this.loginToken = loginToken
          router.push('/accounts')
        } else {
          throw new Error('Login Fail')
        }
        return
      }
      catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message)
        }
        // Handle other error scenarios
        throw new Error('An error occurred during login.')
      }
    },
    async logout() {
      userService.logout()
      this.loginToken = null
      router.push('/')
    }
  }


})
