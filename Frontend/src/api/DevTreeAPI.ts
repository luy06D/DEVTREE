// TODAS LAS QUERY DE LA VENTANA PRNCIPAL DEL DEV TREE

import { isAxiosError } from "axios";
import api from "../config/axios";
import type { ProfileForm, User } from '../types'

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

export async function updateUser(formData: ProfileForm) {
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