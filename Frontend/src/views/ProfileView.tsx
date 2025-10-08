import {useForm} from 'react-hook-form'
import ErrorMessage from '../components/ErrorMessage'
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { User, ProfileForm } from '../types';
import { updateUser, uploadImage } from '../api/DevTreeAPI';
import { toast } from 'sonner';



export default function ProfileView() {

    const queryClient = useQueryClient();
    // Para obtener los datos que estan en cache.
    const data : User = queryClient.getQueryData(['user'])!

     
    const {register, handleSubmit, formState: {errors} } = useForm<ProfileForm>({ defaultValues: {
        handle: data.handle,
        descripcion: data.descripcion
    }})

    // Utilizamos useMutation para realizar peticiones (cambio de datos)
    const updateProfileMutation = useMutation({
        mutationFn: updateUser,

        onError: (error) => {
            toast.error(error.message)
        },

        onSuccess: (data) => {
           toast.success(data)
           // invalidateQueries - invalida el cache 
           // realiza refetch y trae los nuevos datos del back.
           queryClient.invalidateQueries({queryKey: ['user']})
        }

    })

    // GUARDA LA DATA DEL FORMULARIO....
    const handleSaveForm = (formData: ProfileForm ) =>{
        updateProfileMutation.mutate(formData)
    }

        const uploadImageMutation = useMutation({
        mutationFn: uploadImage,

        onError: (error) => {
           console.log(error)
        },

        onSuccess: (data) => {
            console.log(data)
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files)
        uploadImageMutation.mutate(e.target.files[0])
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
                    onChange={handleChange}
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