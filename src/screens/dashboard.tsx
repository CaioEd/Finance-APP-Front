// const SSE_URL = import .meta.env.VITE_API_SSE_URL
import { useState, useEffect } from 'react'
import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbLink
} from '@/components/ui/breadcrumb'
import { Separator } from '@radix-ui/react-dropdown-menu'


import { SidebarInset, SidebarTrigger } from'@/components/ui/sidebar'
import { ToggleTheme } from '@/components/toggleTheme'
import { AppSidebar } from '@/components/app/app-sidebar'


export function Dashboard() {

    return (
        <>
            <AppSidebar />
            
            <SidebarInset className='pl-9'>
                <header className='flex justify-between h-16 mt-3 ml-3 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
                    <div className='flex items-center gap-2 px-4'>
                        <SidebarTrigger className='-ml-1' />
                            <Separator orientation='vertical' className='mr-2 h-4' />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className='hidden md:block'>
                                        <BreadcrumbLink href='#'>Dashboard</BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    <div className='pr-8'>
                        <ToggleTheme />
                    </div>
                </header>

                <div className='flex flex-1 flex-col p-4 mt-1'>
                    <div className='grid grid-cols-10 mt-1'>

                        <div className='col-span-5 bg-white shadow-sm p-10 w-5xl rounded-md dark:bg-[#292929]'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <h1 className='text-[20px] text-[#09090B] font-semibold dark:text-white'>Minhas Tarefas</h1>
                                </div>
                            </div>
                            <div className='mt-10 text-center text-2xl'>
                                <p>Em desenvolvimento...</p>
                            </div>
                        </div>

                    </div>
                </div>
            </SidebarInset>
        </>
    )
}