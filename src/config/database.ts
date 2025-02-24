// AQUI ESTARA TODA LA CONFIGURACIÓN DE LA BD 
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoURL = process.env.URL_MONGO;

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(mongoURL);
        console.log(connection);
        console.log("Connection for MongoDB")
    } catch (error) {
        console.log(error)

        
    }
}