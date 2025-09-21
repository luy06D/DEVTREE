// TODAS LAS QUERY DE LA VENTANA PRNCIPAL DEL DEV TREE

import { isAxiosError } from "axios";
import api from "../config/axios";

export async function getUser(){
    try {
        // API : URL 
        const {data} = await api('/user')
        console.log(data)
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error (error.response.data.error)
        }
    }
}