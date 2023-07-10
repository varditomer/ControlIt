import { httpService } from './http.service'

const getAccounts = async () => {
    try {
        const response = await httpService.getWithToken('account')
        return response.data
    } catch (error) {
        console.error('Error retrieving accounts:', error)
        throw new Error('Failed to retrieve accounts.')
    }
}
export const accountService = {
    getAccounts
}
