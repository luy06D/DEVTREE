import mongoose, { Schema , Document} from "mongoose";
// libreria node.js - mongoose ODM  para crear estructura de mongoDB

export interface IUser extends Document {
    handle: string,
    name: string,
    email: string,
    password: string,
    descripcion: string,
    image: string

}

// Define el esquema
const userSchema = new Schema({
    handle: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    descripcion: {
        type: String,
        require: true,
        trim: true

    },
    
    image: {
        type: String,
        default: ''
    }
})

const User = mongoose.model<IUser>('User', userSchema);
export default User