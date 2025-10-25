import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { DndContext,  closestCenter } from '@dnd-kit/core'
import type {DragEndEvent} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import NavigationTabs from "../components/NavigationTaps";
import type { SocialNetwork, User } from "../types";
import { useEffect, useState } from "react";
import DevTreeLink from "./DevTreeLink";
import { useQueryClient } from "@tanstack/react-query";
import Header from "./Header";

type DevTreeProts = {
    data: User
}

const DevTree = ({ data }: DevTreeProts) => {

    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(JSON.parse(data.links).filter((item:
        SocialNetwork) => item.enabled))

    useEffect(() => {
        setEnabledLinks(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))
    }, [data])

    
    // Funcion para movimiento de link handleDragEnd
    const queryCliente  = useQueryClient()
    const handleDragEnd = (e: DragEndEvent) => {
        const {active,  over } = e
        
        if(over && over.id){
            const prevIndex = enabledLinks.findIndex(link => link.id === active.id)
            const newIndex = enabledLinks.findIndex(link => link.id === over.id)
            const order = arrayMove(enabledLinks, prevIndex, newIndex)
            setEnabledLinks(order)

            const disabledLinks : SocialNetwork[] = JSON.parse(data.links).filter((item: SocialNetwork) => !item.enabled)
            const links = order.concat(disabledLinks)
            queryCliente.setQueryData(['user'], (prevData: User) => {
                return{
                    ...prevData,
                    links: JSON.stringify(links)
                }
            })
        }


    }

    return (
        <>
            <Header/>
         
            <div className="bg-gray-100  min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">
                    <NavigationTabs />

                    <div className="flex justify-end">
                        <Link
                            className="font-bold text-right text-slate-800 text-2xl"
                            to={`/${data.handle}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >Visitar Mi Perfil - {data.handle}</Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
                            <p className="text-center text-3xl text-white font-black">{data.handle}</p>

                            {data.image &&
                                <img className="mx-auto max-w-[250 px]" src={data.image} alt="Imagen de perfil" />
                            }

                            <p className="text-center text-white font-black">{data.descripcion}</p>

                            <DndContext
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >

                                <div className="mt-20 flex flex-col gap-5">
                                    <SortableContext
                                        items={enabledLinks}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {enabledLinks.map(link => (
                                            <DevTreeLink key={link.name} link={link} />
                                        ))}
                                    </SortableContext>
                                </div>

                            </DndContext>


                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" richColors />
        </>
    )
}

export default DevTree