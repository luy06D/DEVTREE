import { Request, Response } from 'express'
import User from "../models/User"
import { hashPassword, checkPassword } from "../utils/auth"
import formidable from 'formidable'
import cloudinary from '../config/cloudinary'
import slug from 'slug'
import { generateJWT } from '../utils/jwt'



// USER REGISTER 
export const createAccount = async (req: Request, res: Response) => {


    const { email, password } = req.body // Obtiene los datos del body


    const userExists = await User.findOne({ email })

    if (userExists) {
        const error = new Error('El usuario ya esta registrado')
        return res.status(409).json({ error: error.message })
    }

    const handle = slug(req.body.handle)
    const handleExists = await User.findOne({ handle })

    if (handleExists) {
        const error = new Error('El handle ya esta registrado')
        return res.status(409).json({ error: error.message })
    }


    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle

    await user.save()

    res.status(201).send('Registro correctamente')

}

// USER VALIDATION
export const login = async (req: Request, res: Response) => {


    const { email, password } = req.body

    //Revisamos si el email existe 
    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error('El email no esta registrado')
        return res.status(404).json({ error: error.message })
    }

    // Comprobamos si el password en correcto
    const comparePassword = await checkPassword(password, user.password)

    if (!comparePassword) {
        const error = new Error('La contraseña es incorrecta')
        return res.status(401).json({ error: error.message })
    }

    const token = generateJWT({ id: user._id })

    res.send(token)

}

// USER AUTHENTICATION
export const getUser = async (req: Request, res: Response) => {
    res.json(req.user)

}

// UPDATE INFORMATION - USER
export const updateUser = async (req: Request, res: Response) => {
    try {
        // Extraemos descripcion del body...
        const { descripcion } = req.body

        const handle = slug(req.body.handle)
        const handleExists = await User.findOne({ handle })

        // Si existe el handle y el email es distinto.
        if (handleExists && handleExists.email !== req.user.email) {
            const error = new Error('El handle ya esta registrado')
            return res.status(409).json({ error: error.message })
        }

        req.user.descripcion = descripcion
        req.user.handle = handle
        await req.user.save()
        res.send("Los datos se actualizaron correctamente")


    } catch (err) {
        const error = new Error('Error al actualizar')
        return res.status(500).json({ error: error.message })

    }
}

// UPLOAD IMAGE - USER 
export const uploadImage = async (req: Request, res: Response) => {

    const form = formidable({ multiples: false })

    try {
        form.parse(req, (error, fields, files) => {

            const url_img = files.file[0].filepath // Ruta -- direccion de imagen en cloudinary
            cloudinary.uploader.upload(url_img, {}, async function (error, result) {
                if(error){
                    const error = new Error('Error al subir la imagen')
                    return res.status(500).json({error: error.message})
                }

                if(result){
                    req.user.image = result.secure_url
                    await req.user.save()
                    res.json({imagen: result.secure_url}) // repuesta json - url img
                }
                

            })
        })


    } catch (err) {
        const error = new Error('Error al cargar la imagen')
        return res.status(500).json({ error: error.message })

    }
}