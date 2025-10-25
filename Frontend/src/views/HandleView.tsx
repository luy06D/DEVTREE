import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getUserByHandle } from "../api/DevTreeAPI"
import HandleData from "./HandleData"

export default function HandleView(){

  const params = useParams()
  const handle = params.handle!

  const {data , error , isLoading} = useQuery({
    queryFn: () => getUserByHandle(handle),
    queryKey: ['handle', handle]

  }) 

  if(isLoading) return 'Cargando...'
  if(error) return <Navigate to={'/404'} />


    if(data) return <HandleData data={data} />
}