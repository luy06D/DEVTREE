import {useForm} from 'react-hook-form'
import ErrorMessage from '../components/ErrorMessage'
import { useQueryClient } from "@tanstack/react-query";
import type { User, ProfileForm } from '../types';



export default function ProfileView() {

    const queryClient = useQueryClient();
    // Para obtener los datos que estan en cache.
    const data : User = queryClient.getQueryData(['user'])!


    console.log(data)

    const {register, handleSubmit, formState: {errors} } = useForm({ defaultValues: {
        handle: data.handle,
        descripcion: data.descripcion
    }})

    // GUARDA LA DATA DEL FORMULARIO....

    const handleSaveForm = (formData: ProfileForm ) =>{
        console.log(formData)
    }
    

    return (
        <form 
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleSaveForm)}
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    {...register('handle', {
                        required: "El nombre de usuario es obligatorio"
                    })}
                />

                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="descripcion"
                >Descripción:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    {...register('descripcion', {
                        required: "La descripción es obligatoria"
                    })}
                />

                {errors.descripcion && <ErrorMessage>{errors.descripcion.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={ () => {} }
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Guardar Cambios'
            />
        </form>
    )
}