import { useState } from "react"
import { social } from "../data/social"
import DevTreeInputs from "../components/DevTreeInput";
import { isValidateUrl } from "../utils";
import { toast } from "sonner";

export default function LinkTree() {

  const [devTreeLinks , setDevTreeLinks] =  useState(social);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const updatedLinks = devTreeLinks.map(links => links.name === e.target.name ? {...links , url: e.target.value} :
      links 
    )
    setDevTreeLinks(updatedLinks)
    console.log(updatedLinks);
  }

  const handleEnableLinks = (socialNetwork : string) => {
    const updateEnables = devTreeLinks.map(links => {
      if(links.name === socialNetwork ){
        if(isValidateUrl(links.url)){
          return {...links , enabled: !links.enabled}
        }else{
          toast.error("Formato URL incorrecto")
        }
        
      }
      return links

    }) 

    setDevTreeLinks(updateEnables)
    console.log(updateEnables);
    
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

    </div>
  )
}
