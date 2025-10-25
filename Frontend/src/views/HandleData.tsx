import type { SocialNetwork,  UserHandle } from "../types"

type HandleDataProps = {
    data : UserHandle
}

export default function HandleData({data} : HandleDataProps) {

    const DataLinks : SocialNetwork[] = JSON.parse(data.links).filter((link : SocialNetwork) => link.enabled)

  return (
    <div className="space-y-6 text-white">
        <p className="font-black text-center text-4xl">{data.handle}</p>
        {data.image &&  <img src={data.image} className="max-w-[250px] mx-auto"/>}

        <p className="text-center font-bold text-lg" >{data.descripcion}</p>

        <div className="mt-20 flex flex-col gap-6">
            {DataLinks.length? 
                DataLinks.map(link => (
                    <a 
                    key={link.name}
                    href={link.url}
                    className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
                    target="_blank"
                    rel="noreferrer noopener"
                    >
                    <img src={`/social/icon_${link.name}.svg`} alt="img red social" className="w-12" />    
                    <p className="text-black capitalize font-bold text-lg ">Visita mi : {link.name}</p>
                    </a>
                ))
            : <p className="text-center">No hay enlaces en este perfil</p>

            }
        </div>
    </div>
  )
}
