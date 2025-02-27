import { Router } from "express";
import { createUsers } from "./handlers";

const router = Router();

// ROUTING
// AUTENTIFICACION Y REGISTRO (POST)

router.post('/auth/register', createUsers )

export default router   