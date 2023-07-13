// Dependencies
import type { UserCredentials } from "@/interfaces/user.interface"
import Axios, { type AxiosRequestConfig, type AxiosResponse } from "axios"
// Interfaces

const isProduction = false // Set this to true or false based on your environment

const BASE_URL: string = isProduction ? '/api/' : '//localhost:3030/api/'

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
    getWithToken(endpoint: string, loginToken: string) {
        // passing loginToken = true to make a get with token in the request header
        return ajax(endpoint, 'GET', null , loginToken)
    },
}

async function ajax(endpoint: string, method: string = 'GET', data: any = null, loginToken: string | null = null) {
    try {
        const config: AxiosRequestConfig = {
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: method === 'GET' ? data : null,
            headers: loginToken? {Authorization: `Bearer ${loginToken}`}: undefined
        }
        const response: AxiosResponse = await axios(config)
        return response.data // sending the res.data for the use of the app
    } catch (error) {
        console.error(`Error in ${method} request: ${endpoint}`, error)
        throw new Error(`Failed to retrieve data from ${endpoint}.`)
    }
}