import { httpService } from './http.service'

const getAccountsAndPartners = async (loginToken: string) => {
    try {
        const res = await httpService.getWithToken('account', loginToken)
        return res
    } catch (error) {
        console.error('Error retrieving accounts:', error)
        throw new Error('Failed to retrieve accounts.')
    }
}
export const accountService = {
    getAccountsAndPartners
}
