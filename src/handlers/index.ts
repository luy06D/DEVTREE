import {Request, Response} from 'express'
import User from "../models/User"
import {hashPassword} from "../utils/auth"
import slug from 'slug'
import { validationResult } from 'express-validator'

// USER REGISTER 
export const createAccount = async (req: Request, res: Response) =>{

    // Manejar errores
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    
    }

    const {email, password} = req.body // Obtiene los datos del body


    const userExists = await User.findOne({email})

    if(userExists){
        const error = new Error('El usuario ya esta registrado')
        return res.status(409).json({error: error.message})
    }

    const handle = slug(req.body.handle)
    const handleExists = await User.findOne({handle})

    if(handleExists){
        const error = new Error('El handle ya esta registrado')
        return res.status(409).json({error: error.message})
    }


    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle

    await user.save()

     res.status(201).send('Registro correctamente')
     
}