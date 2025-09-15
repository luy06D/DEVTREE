import {Request, Response} from 'express'
import User from "../models/User"
import {hashPassword, checkPassword} from "../utils/auth"
import slug from 'slug'
import jwt from 'jsonwebtoken'
import { generateJWT } from '../utils/jwt'
import { ExpressValidator } from 'express-validator'


// USER REGISTER 
export const createAccount = async (req: Request, res: Response) =>{


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

// USER VALIDATION
export const login = async (req: Request, res: Response) => {


    const {email, password} = req.body

    //Revisamos si el email existe 
    const user = await User.findOne({email})
    if(!user){
        const error = new Error('El email no esta registrado')
        return res.status(404).json({error: error.message})
    }

    // Comprobamos si el password en correcto
    const comparePassword = await checkPassword(password, user.password)
    
     if(!comparePassword){
        const error = new Error('La contraseña es incorrecta')
        return res.status(401).json({error: error.message})
    }

        const token = generateJWT({id: user._id})

    res.send(token)


    



    
}

// USER AUTHENTICATION
export const getUser = async (req: Request, res: Response) => {
    const bearer =  req.headers.authorization
    if(!bearer){
        const error = new Error('No esta Autorizado')
        return res.status(401).json({error: error.message})
    }


    const [, token] = bearer.split(' ')

    if(!token){
        const error = new Error('No autorizado')
        return res.status(401).json({error: error.message})
    }

    try {
        const result = jwt.verify(token, process.env.JWT_SECRET)
        if(typeof result === 'object' && result.id){
            const user = await User.findById(result.id).select('name handle email')
            if(!user){
                const error = new Error('El Usuario no existe')
                return res.status(404).json({error: error.message})
            }
            res.json(user)
        }
        
    } catch (error) {
        res.status(500).json({error: 'Token No Válido'})
    }

}