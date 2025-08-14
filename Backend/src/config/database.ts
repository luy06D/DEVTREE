import mongoose from "mongoose";
import colors from 'colors'


export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URL)
        const url = `${connection.host}: ${connection.port}`
        console.log( colors.bgCyan.magenta.italic(`MongoDB conectado en ${url}`))

        
    } catch (error) {
        console.log(error.message)
        
    }
}