// Dependencies
import type { UserCredentials } from "@/interfaces/user.interface"
import { useUserStore } from "@/stores/user.store"
import Axios, { type AxiosRequestConfig, type AxiosResponse } from "axios"
// Interfaces

const isProduction = false // Set this to true or false based on your environment

const BASE_URL: string = isProduction ? '/api/' : '//localhost:3030/api/'

interface AjaxConfig extends AxiosRequestConfig {
    withToken?: boolean
}

const axios = Axios.create({
    withCredentials: true
})

export const httpService = {
    get(endpoint: string, data: string | null = null) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint: string, data: UserCredentials | string | null = null) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint: string, data: string | null = null) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint: string, data: string | null = null) {
        return ajax(endpoint, 'DELETE', data)
    },
    getWithToken(endpoint: string, data = null) {
        return ajax(endpoint, 'GET', data, true)
    },
}

async function ajax(endpoint: string, method: string = 'GET', data: any = null, withToken: boolean = false) {
    try {
        const config: AjaxConfig = {
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: method === 'GET' ? data : null,
        }

        if (withToken) {
            const userStore = useUserStore()
            const token = userStore.userToken
            config.headers = {
                Authorization: `Bearer ${token}`,
            }
        }

        const response: AxiosResponse = await axios(config)
        return response
    } catch (error) {
        console.error(`Error in ${method} request: ${endpoint}`, error)
        throw new Error(`Failed to retrieve data from ${endpoint}.`)
    }
}