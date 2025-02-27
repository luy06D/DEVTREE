import {Request, Response} from 'express'
import User from "../models/User"

// REQ ES LO QUE EL USUARIO ENVIA
// RES LA RESPUESTA DEL SERVIDOR 
export const createUsers = async (req: Request, res: Response) =>{

    const {email} = req.body;

    const userExist = await User.findOne({email})
    if(userExist){
        const error = new Error('El usuario ya esta registrado')    
        return res.status(409).json({error: error.message})
    }

    const user = new User(req.body)

    await user.save()
    res.status(201).send('Registrado en existo')

}