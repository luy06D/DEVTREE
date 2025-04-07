import { CorsOptions } from "cors"; // Es un TYPE DE CORS 

export const corsConfig : CorsOptions = {
    origin: function(origin , callback){
        const whiteList = [process.env.FRONTEND_URL];
        // Para que puede correr la consulta en TUNDER CLIENT
        if(process.argv[2] === '--api'){
            whiteList.push(undefined)
        }

        if(whiteList.includes(origin) ){
            callback(null, true)
        }else{
            callback(new Error('Error en el CORS'))

        }
    }
}