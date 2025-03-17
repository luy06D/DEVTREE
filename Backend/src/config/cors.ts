import { CorsOptions } from "cors"; // Es un TYPE DE CORS 

export const corsConfig : CorsOptions = {
    origin: function(origin , callback){
        if(origin === 'http://localhost:5173'){
            callback(null, true)
        }else{
            callback(new Error('Error en el CORS'))

        }
    }
}