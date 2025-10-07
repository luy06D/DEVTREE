import 'dotenv/config'
import express from 'express'
import router from './router'
import cors from 'cors'
import { connectDB } from './config/database';
import { configCors } from './config/cors';

connectDB()

const app = express()
// HABILITANDO CORS

app.use(cors(configCors))

// Leer datos de formularios
app.use(express.json())
// CONFIGURACION DEL SERVIDOR 
app.use("/", router);


export default app;
 
