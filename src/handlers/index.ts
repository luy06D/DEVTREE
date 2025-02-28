import {Request, Response} from 'express'
import User from "../models/User"
import { hashPassword } from '../utils/auth';

// REQ ES LO QUE EL USUARIO ENVIA
// RES LA RESPUESTA DEL SERVIDOR 
export const createUsers = async (req: Request , res: Response )  =>{

    const {email, password} = req.body;

    const userExist = await User.findOne({email}) 
    if(userExist){
        const error = new Error('El usuario ya esta registrado')    
        res.status(409).json({error: error.message})
        return;
    }

    const user = new User(req.body)
    user.password = await hashPassword(password) //Hasheamos el password

    await user.save()
    res.status(201).send('Registrado con exito')

}