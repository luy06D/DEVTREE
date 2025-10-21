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
      if (userLinks) {
        return { ...item, url: userLinks.url, enabled: userLinks.enabled }
      }
      return item
    })
    setDevTreeLinks(updateData)
  }, [])


  // ALMACENA LA URL DEL USUARIO EN EL STATE
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map(links => links.name === e.target.name ? { ...links, url: e.target.value } :
      links
    )
    setDevTreeLinks(updatedLinks)
  }

  const links: SocialNetwork[] = JSON.parse(user.links)

  //HABILITA LAS URLS VALIDAS 
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

    let updatedItems: SocialNetwork[] = []
    const selectedSocialNetwork = updatedLinks.find(link => link.name === socialNetwork);

    if (selectedSocialNetwork?.enabled) {
      const id = links.filter(link => link.id).length + 1

      if (links.some(link => link.name === socialNetwork)) {
        updatedItems = links.map(link => {
          if (link.name === socialNetwork) {
            return {
              ...link,
              enabled: true,
              id
            }
          }else{
            return link
          }
        })

      } else {
        const newItem = {
          ...selectedSocialNetwork,
          id
        }
        updatedItems = [...links, newItem]

      }
    } else {
      // Me da el indice de los links 
      const indexToUpdate = links.findIndex(link => link.name === socialNetwork)

      updatedItems = links.map(link => {
        if (link.name === socialNetwork) {
          return {
            ...link,
            id: 0,
            enabled: false
          }
        } else if(link.id > indexToUpdate) {

          return {
            ...link,
            id: link.id - 1
          }
        } else {
          return link
        }
      })

    }

    console.log(updatedItems);

    // Almacenar en base de datos..
    queryClient.setQueryData(['user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems)
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
