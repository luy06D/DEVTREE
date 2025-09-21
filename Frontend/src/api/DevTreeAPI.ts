// TODAS LAS QUERY DE LA VENTANA PRNCIPAL DEL DEV TREE

import { isAxiosError } from "axios";
import api from "../config/axios";

export async function getUser() {

    const token = localStorage.getItem('AUTH_TOKEN')
    try {
        // API : URL 
        const { data } = await api('/user', {
            headers: {
                //Agregando autorización 
                Authorization: `Bearer ${token}`
            }
        })

        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}