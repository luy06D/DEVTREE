import { CorsOptions } from "cors"; // Es un TYPE DE CORS 

export const corsConfig : CorsOptions = {
    origin: function(origin , callback){
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
        }else{
            callback(new Error('Error en el CORS'))

        }
    }
}