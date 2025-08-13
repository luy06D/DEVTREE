import {Request, Response} from 'express'
import User from "../models/User"
import {hashPassword} from "../utils/auth"
import slug from 'slug'

// USER REGISTER 
export const createAccount = async (req: Request, res: Response) =>{

    const {email, password} = req.body
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