
import { Link } from "react-router-dom"
import {useForm} from 'react-hook-form'


export default function loginViews() {


  return (
    <>

      <h1 className="text-4xl text-center text-white font-bold" >Inicia Sesión</h1>
      <nav className="mt-10">
        
        <Link
        className="text-center text-white text-lg block" 
        to="/auth/register"
        >¿No tienes una cuenta registrate ahora?</Link>

      </nav>
   
    </>
  )
}
