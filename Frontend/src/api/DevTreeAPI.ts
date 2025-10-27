// TODAS LAS QUERY DE LA VENTANA PRNCIPAL DEL DEV TREE

// AXIOS LIBRERIA DE JS PARA REALIZAR PETICIONES HTTP
import { isAxiosError } from "axios";
import api from "../config/axios";
import type { User, UserHandle } from '../types'

export async function getUser() {
    try {
        // API : URL 
        const { data } = await api<User>('/user')
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateUser(formData: User) {
    try {
        // API : URL 
        const { data } = await api.patch<String>('/user', formData)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function uploadImage(files: File) {
    const formData = new FormData();
    formData.append('file', files)
    try {

        const { data } = await api.post('/user/image', formData)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }

}

export async function getUserByHandle(handle: string) {
    try {

        const { data } = await api<UserHandle>(`/${handle}`)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function searchHandle(handle: string) {
    try {

        const {data} = await api.post<string>('/search', {handle})
        return data
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}