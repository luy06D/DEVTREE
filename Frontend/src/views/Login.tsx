import { Link } from "react-router-dom"

export default function Login() {
  return (
    <>
      <h1 className="text-4xl text-white font-bold text-center">Inicie Sesión</h1>

      <nav className="mt-10">
        <Link

          className="text-center text-white text-lg block"
          to="/auth/register"
        >Todavia no tienes una cuenta? Registrate
        </Link>
      </nav>


    </>
  )
}
