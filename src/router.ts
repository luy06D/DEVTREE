import { Router } from "express";

const router = Router();

// ROUTING
// AUTENTIFICACION Y REGISTRO (POST)
router.post('/auth/register', (req, res) =>{
    console.log(req.body)
})

export default router   