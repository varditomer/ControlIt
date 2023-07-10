import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import { useUserStore } from '@/stores/user.store'
import { useAccountStore } from '@/stores/account.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      // lazy-loaded when the route is visited.
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: () => import('@/views/Accounts.vue'),
      meta: { requiresAuth: true }, // meta field to indicate authentication requirement
      beforeEnter: async (to, from, next) => {
        const userStore = useUserStore()
        const token = userStore.userToken
        const accountStore = useAccountStore()
        if (token) {
          try {
            await accountStore.getAccounts()
            next()
          } catch (error) {
            console.error('Error retrieving account data:', error)
            next({ name: 'login' })
          }
        } else {
          // Token does not exist, redirect to login page
          next({ name: 'login' })
        }
      }
    }
  ]
})

export default router
