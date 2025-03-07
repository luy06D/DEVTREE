// AQUI ESTARA TODA LA CONFIGURACIÓN DE LA BD 
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoURL = process.env.URL_MONGO;

export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(mongoURL);
        const url2 = `${connection.host}:${connection.port}`
        console.log(`Mongo bd CONECTADO EN : ${url2} ` )
    } catch (error) {
        console.log(error)

        
    }
}