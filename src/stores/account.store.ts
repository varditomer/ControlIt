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
        async getAccounts() {
            try {
                const res = await accountService.getAccounts()
                // Update the accounts state
                this.accounts = res.accounts
                this.partnerIds = res.partners
            } catch (error: any) {
                userService.logout()
                console.error('Error retrieving account data:', error);
                if (error.response && error.response.data && error.response.data.error === 'TokenExpiredError') {
                    console.log('Token has expired. Redirecting to login...')

                } else {
                    console.log(`error:`, error)
                    console.log(`123124124:`,)
                    // throw new Error('Failed to retrieve account data.');
                }
            }
        }
    }
});
