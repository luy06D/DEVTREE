import { Link } from "react-router-dom"
import {useForm } from 'react-hook-form'

export default function Register() {

  const {register, watch, handleSubmit, formState: {errors}} = useForm()
  
  console.log(errors)
  const handleRegister = () => {
    console.log("PROBANDOOO....")
  }

  return (
    <>
      <h1 className="text-4xl text-white font-bold text-center">Crear cuenta</h1>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('name',{
              required: "El nombre es obligatorio"
            })}
          />
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
              {...register('email',{
              required: "El email es obligatorio"
            })}
       />
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
          <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario: sin espacios"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
              {...register('handle',{
              required: "El handle es obligatorio"
            })}
        />
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
              {...register('password',{
              required: "El Password es obligatorio"
            })}
          />
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                {...register('password_confirmation',{
              required: "El Password es obligatorio"
            })}
        />
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value='Crear Cuenta'
        />
      </form>

      <nav className="mt-10">
        <Link

          to="/auth/login"
          className="text-center text-white tex-lg block"
        >Inicia sesion ya!

        </Link>
      </nav>

    </>
  )
}
