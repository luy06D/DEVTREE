import { Router } from "express";
import User from "./models/User";
const router = Router();

// Routing -- CREAMOS LAS RUTAS DE LA APLICACIÓN

/** Autenticación y Registro */
router.post('/auth/register', async (req, res) =>{
     await User.create(req.body)
     
})




export default router;