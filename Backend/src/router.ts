import { Router } from "express";
import { createAccount, getUser, getUserByHandle, login, updateUser, uploadImage } from "./handlers";
import { body } from 'express-validator'
import { handleInputErrors } from "./middleware/validation";
import { authenticate } from "./middleware/auth";


const router = Router();

// Routing -- CREAMOS LAS RUTAS DE LA APLICACIÓN

/**  Registro y validación */
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
    handleInputErrors,
    createAccount);

/** Autenticacion de usuario */
router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('El email no puede ir vacio'),
    body('password')
        .notEmpty()
        .withMessage('El password es obligatorio'),
    handleInputErrors,
    login);

/** Validar autenticacion & recuperar data */
router.get('/user', authenticate, getUser)

/** Actualizacion de informacion usuario */
router.patch('/user',
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacio'),
    body('descripcion')
        .notEmpty()
        .withMessage('La descripcion no puede ir vacia'),
    handleInputErrors,
    authenticate,
    updateUser);

/** UPLOAD IMAGEN - CLOUDINARY */
router.post('/user/image', authenticate, uploadImage)

/** DATA - VISTA PREVIA DE USUARIO */
router.get('/:handle', getUserByHandle)





export default router;