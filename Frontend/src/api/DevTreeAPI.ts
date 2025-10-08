// TODAS LAS QUERY DE LA VENTANA PRNCIPAL DEL DEV TREE

// AXIOS LIBRERIA DE JS PARA REALIZAR PETICIONES HTTP
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

export async function uploadImage(files: File) {
    const formData = new FormData();
    formData.append('file', files)
    try {

        const {data} = await api.post('/user/image', formData)
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
    
}