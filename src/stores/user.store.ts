import type { User, UserCredentials, UserFront } from '@/interfaces/user.interface'
import router from '@/router'
import { userService } from '@/services/user.service'
import { defineStore } from 'pinia'

interface State {
  // loggedinUser: User | null
  loggedinUser: UserFront | null
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => <State>({
    loggedinUser: userService.getLoggedinUser()
  }),
  actions: {
    async login(credentials: UserCredentials, remember = false) {
      console.log(`login in store:`,)
      try {
        const user = userService.login(credentials, remember)
        this.loggedinUser = user
        router.push('/accounts')
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message)
        }
        // Handle other error scenarios
        throw new Error('An error occurred during login.')
      }
    },
    async signup(userDetails: UserFront, remember = false) {
      try {
        const user = userService.signup(userDetails, remember)
        this.loggedinUser = user
        router.push('/accounts')
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message)
        }
        // Handle other error scenarios
        throw new Error('An error occurred during signup.')
      }
    },
    async logout() {
      this.loggedinUser = null
      router.push('/')
      userService.logout()
    }
  }


})
