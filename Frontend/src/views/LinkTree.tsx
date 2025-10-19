import { useEffect, useState } from "react"
import { social } from "../data/social"
import DevTreeInputs from "../components/DevTreeInput";
import { isValidateUrl } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/DevTreeAPI";
import type { User, SocialNetwork } from "../types";

export default function LinkTree() {

  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(['user'])!
  console.log(JSON.parse(user.links));

  const { mutate } = useMutation({
    mutationFn: updateUser,

    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Actualizado Correctamente')
    }
  })

  useEffect(() => {
    const updateData = devTreeLinks.map(item => {
      const userLinks = JSON.parse(user.links).find((link: SocialNetwork) => link.name === item.name)
      if(userLinks){
        return { ...item , url: userLinks.url, enabled: userLinks.enabled}
      }
      return item
    }) 
    setDevTreeLinks(updateData)
  }, [])



  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const updatedLinks = devTreeLinks.map(links => links.name === e.target.name ? { ...links, url: e.target.value } :
      links
    )
    setDevTreeLinks(updatedLinks)

    // PODEMOS MEJORAR ESTO POR EL MOMENTO ESTARA ASI 
        queryClient.setQueryData(['user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedLinks)
      }

    })
  }

  const handleEnableLinks = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map(links => {
      if (links.name === socialNetwork) {
        if (isValidateUrl(links.url)) {
          return { ...links, enabled: !links.enabled }
        } else {
          toast.error("Formato URL incorrecto")
        }
      }
      return links
    })
    setDevTreeLinks(updatedLinks)

    queryClient.setQueryData(['user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedLinks)
      }

    })

  }


  return (
    <div className="space-y-5">
      {devTreeLinks.map(item => (
        <DevTreeInputs
          key={item.name}
          item={item}
          handleUrlChange={handleUrlChange}
          handleEnableLinks={handleEnableLinks}
        />
      ))}
      <button
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer "
        onClick={() => mutate(user)}
      >

        Guardar cambios</button>

    </div>
  )
}
