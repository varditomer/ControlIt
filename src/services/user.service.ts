import type { User, UserCredentials, UserFront } from "@/interfaces/user.interface"
import { storageService } from "./storage.service"
import { httpService } from "./http.service"

const USER_KEY = 'control_it_login_token'

const _loginToken = _getLoginToken()


const login = async (credentials: UserCredentials) => {
    const loginToken = await httpService.post('auth/login', credentials)
    _setToken(loginToken)
    return loginToken


}

const logout = () => {
    return storageService.removeFromStorage(USER_KEY)
}

function _getLoginToken() {
    return storageService.loadFromStorage(USER_KEY) as string || null
}

const getLoginToken = () => _loginToken

const _setToken = (token: string) => {
    storageService.clearStorage()
    storageService.saveToStorage(USER_KEY, token)
}

export const userService = {
    login,
    logout,
    getLoginToken,
}