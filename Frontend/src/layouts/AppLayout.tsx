import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { getUser } from "../api/DevTreeAPI";
import DevTree from "../components/DevTree";


export default function AppLayout() {

    const { data, isLoading, isError } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 1,
        refetchOnWindowFocus: false
    })
    // proteje las rutas - componente padre
    if (isLoading) return 'Cargando ....'
    if (isError) return <Navigate to={'/auth/login'} />

    // RENDERIZA LA VISTA DE INICIO
    if (data) return <DevTree data={data}/>




}