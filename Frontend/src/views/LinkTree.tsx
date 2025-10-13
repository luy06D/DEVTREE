import { useState } from "react"
import { social } from "../data/social"
import DevTreeInputs from "../components/DevTreeInput";

export default function LinkTree() {

  const [devTreeLinks , setDevTreeLinks] =  useState(social);

  console.log(devTreeLinks);


  return (
    <div className="space-y-5">
      {devTreeLinks.map(item => (
        <DevTreeInputs
        key={item.name}
        item={item}
        />
      ))}

    </div>
  )
}
