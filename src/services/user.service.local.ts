import type { User, UserCredentials, UserFront } from "@/interfaces/user.interface"
import { storageService } from "./storage.service"

const USER_KEY = 'user'
const USERS_KEY = 'users'

const _users = _getUsers() || []
console.log(`_users:`, _users)
const _loggedinUser = getLoggedinUser() || null

const add = (credentials: UserCredentials, remember = false) => {
    const user = ''
    if (remember) {
        storageService.saveToStorage(USER_KEY, user)
    }
}

const login = (credentials: UserCredentials, remember: boolean) => {
    if (!_users.length) {
        throw new Error('Signup first')
    }

    const currentUser = _users.find(u => u.email === credentials.email)
    if (!currentUser) {
        throw new Error('User with this email does not exist')
    }

    if (currentUser.password !== credentials.password) {
        throw new Error('Incorrect password')
    }

    if (_loggedinUser) {
        storageService.removeFromStorage(USER_KEY)
    }
    if (remember) {
        storageService.saveToStorage(USER_KEY, currentUser)
    }

    return currentUser
}

const signup = (userDetails: UserFront, remember: boolean) => {
    console.log(`userDetails:`, userDetails)

    const currentUser = _users.find(u => u.email === userDetails.email)
    console.log(`currentUser:`, currentUser)

    if (currentUser) {
        throw new Error('Email already exist')
    }

    if (_loggedinUser) {
        storageService.removeFromStorage(USER_KEY)
    }

    if (remember) {
        storageService.saveToStorage(USER_KEY, userDetails)
    }

    _users.push(userDetails)
    storageService.saveToStorage(USERS_KEY, _users)

    return userDetails
}

const logout = () => {
    return storageService.removeFromStorage(USER_KEY)
}

function getLoggedinUser() {
    return storageService.loadFromStorage(USER_KEY) as UserFront || null
}

function _getUsers() {
    return storageService.loadFromStorage(USERS_KEY) as UserFront[]
}

export const userService = {
    add,
    login,
    signup,
    logout,
    getLoggedinUser
}