import { Router } from "express";
import { createAccount } from "./handlers";
import { body } from 'express-validator'


const router = Router();

// Routing -- CREAMOS LAS RUTAS DE LA APLICACIÓN

/** Autenticación y Registro */
router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('El hanlde no puede ir vacio'),
    body('name')
        .notEmpty()
        .withMessage('El nombre no puede ir vacio'),
    body('email')
        .isEmail()
        .withMessage('El email no puede ir vacio'),
    body('password')
        .isLength({min: 8})
        .notEmpty()
        .withMessage('La contraseña debe tener como minimo 8 caracteres'),

    createAccount);




export default router;