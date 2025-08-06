import express from 'express'
import router from './router'
import 'dotenv/config'
import { connectDB } from './config/database';


const app = express()

connectDB()
// CONFIGURACION DEL SERVIDOR 

app.use("/", router);


export default app;
 