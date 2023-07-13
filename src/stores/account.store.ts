// account.store.js
import { defineStore } from 'pinia'
import { accountService } from '@/services/account.service'
import type { Account } from '@/interfaces/account.interface';
import { userService } from '@/services/user.service';

interface AccountState {
    accounts: Account[],
    partnerIds: string[]
}

export const useAccountStore = defineStore({
    id: 'account',
    state: () => <AccountState>({
        accounts: [] as Account[],
        partnerIds: []
    }),
    actions: {
        async getAccounts(loginToken: string) {
            try {
                const res = await accountService.getAccountsAndPartners(loginToken)
                this.accounts = res.accounts
                this.partnerIds = res.partners
            } catch (error: any) {
                userService.logout()
                throw new Error('Failed to retrieve account data.')
            }
        }
    }
})
