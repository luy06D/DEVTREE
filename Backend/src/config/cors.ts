import { CorsOptions } from "cors";

export const configCors : CorsOptions = {
    origin: function(origin, callback){
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
        }else{
            callback(new Error('Error de CORS'))
        }

    }
}
