import {Request, Response} from 'express'
import User from "../models/User"
import { hashPassword } from '../utils/auth';
import slug from 'slug'
import { validationResult } from 'express-validator';

// REQ ES LO QUE EL USUARIO ENVIA
// RES LA RESPUESTA DEL SERVIDOR 
export const createUsers = async (req: Request , res: Response )  =>{

    let errors = validationResult(req);
    if(!errors.isEmpty()){
         res.status(400).json({errors: errors.array()})
         return;
    }

    const {email, password} = req.body;

    const userExist = await User.findOne({email}) 
    if(userExist){
        const error = new Error('El usuario ya esta registrado')    
        res.status(409).json({error: error.message})
        return;
    }

    const handle = slug(req.body.handle, '');
    const handleExist =  await User.findOne({handle})
    if(handleExist){
        const error = new Error('Nombre de usuario no disponible')
        res.status(409).json({error: error.message})
    }

    const user = new User(req.body)
    user.password = await hashPassword(password) //Hasheamos el password
    user.handle = handle

    await user.save()
    res.status(201).send('Registrado con exito')

}

export const login = async (req: Request, res: Response) => {
    
    let errors = validationResult(req);
    if(!errors.isEmpty()){
         res.status(400).json({errors: errors.array()})
         return;
    }
}