import { Router } from "express";
import { createAccount } from "./handlers";
const router = Router();

// Routing -- CREAMOS LAS RUTAS DE LA APLICACIÓN

/** Autenticación y Registro */
router.post('/auth/register', createAccount);




export default router;