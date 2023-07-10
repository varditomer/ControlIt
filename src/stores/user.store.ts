import type { UserCredentials } from '@/interfaces/user.interface'
import router from '@/router'
import { userService } from '@/services/user.service'
import { defineStore } from 'pinia'

interface UserState {
  userToken: string | null
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => <UserState>({
    userToken: userService.getUserToken()
  }),
  actions: {
    async login(credentials: UserCredentials, remember = false) {
      try {
        const res = await userService.login(credentials, remember)
        const token = res.data
        if (token) {
          // if (remember) userService.setToken(token)
          // i tackled a problem with my storage service mechanism so i shut it down :(
          this.userToken = token
          router.push('/accounts')
        } else {
          throw new Error('Invalid token in response')
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
      this.userToken = null
      router.push('/')
    }
  }


})
