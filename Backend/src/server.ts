// SEPARAMOS PARA LLEVAR TODA LA CONFIGURACION DEL SERVIDOR 
import express from 'express';
import cors from 'cors'
import router from './router';
import { connectDB } from './config/database';
import { corsConfig } from './config/cors';
connectDB();    

const app = express();


//CORS
app.use(cors(corsConfig))

//LEER DATOS DE FORMULARIO 
app.use(express.json());

app.use('/', router)




export default app