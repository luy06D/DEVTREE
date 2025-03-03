import { Router } from "express";
import { createUsers } from "./handlers";
import { body } from "express-validator";
const router = Router();

// ROUTING
// AUTENTIFICACION Y REGISTRO (POST)

router.post('/auth/register',
    body('handle') // CAMPO A VALIDAR
        .notEmpty()
        .withMessage('El handle no puede ir vacio'), // MSJ DE VALIDACIÓN

    body('name')
        .notEmpty()
        .withMessage('Ingrese un nombre'),

    body('email')
        .isEmail() // Valida el formato Email Luis04@gmail.com
        .withMessage('Email no valido'),

    body('password')
        .isLength({min: 5})
        .withMessage('La contraseña en muy corta, minimo 5 caracteres '),
        
    createUsers )

export default router   