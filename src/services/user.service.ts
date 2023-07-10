import type { User, UserCredentials, UserFront } from "@/interfaces/user.interface"
import { storageService } from "./storage.service"
import { httpService } from "./http.service"

const USER_KEY = 'login_token'

const _userToken = _getUserToken()


const login = async (credentials: UserCredentials, remember: boolean) => {
    return await httpService.post('auth/login', credentials)
}

const logout = () => {
    console.log(`logginout:`, )
    return storageService.removeFromStorage(USER_KEY)
}

function _getUserToken() {
    return storageService.loadFromStorage(USER_KEY) as string || null
}

const getUserToken = () => _userToken

const setToken = (token: string) => {
    storageService.removeFromStorage(USER_KEY)
    storageService.saveToStorage(USER_KEY, token)
}

export const userService = {
    login,
    // signup,
    logout,
    getUserToken,
    setToken
}