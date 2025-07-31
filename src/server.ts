import express from 'express'
import router from './router'
const app = express()

// CONFIGURACION DEL SERVIDOR 

app.use("/", router);


export default app;
 