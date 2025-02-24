// SEPARAMOS PARA LLEVAR TODA LA CONFIGURACION DEL SERVIDOR 
import express from 'express';
import router from './router';
import { connectDB } from './config/DataBase';

const app = express();

connectDB();

//LEER DATOS DE FORMULARIO 
app.use(express.json());

app.use('/', router)




export default app