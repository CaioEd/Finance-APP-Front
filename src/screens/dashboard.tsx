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
import {
    ArrowBigUp,
    ArrowBigDown,
} from 'lucide-react'

import ApiDashboard from './service'


export function Dashboard() {
    const [totalExpenses, setTotalExpenses] = useState('')
    const [totalIncomes, setTotalIncomes] = useState('')
    const [balance, setBalance] = useState(0)

    async function getExpensesValue () {
        try {
            const response = await ApiDashboard.getTotalExpenses()
            if (response) {
                console.log(response)
                setTotalExpenses(response.total_expenses)
            }
        } catch (error) {
            console.log(error)
        }
    }    

    async function getIncomesValue () {
        try {
            const response = await ApiDashboard.getTotalIncomes()
            if (response) {
                console.log(response)
                setTotalIncomes(response.total_incomes)
            }
        } catch (error) {
            console.log(error)
        }
    }   

    async function getBalance () {
        try {
            const response = await ApiDashboard.getBalance()
            if (response) {
                console.log(response)
                setBalance(response.total_balance)
            }
        } catch (error) {
            console.log(error, 'error to fetch balance')
        }
    }  

    useEffect(() => {
        getExpensesValue();
        getIncomesValue();
        getBalance();
      }, []);

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

                        <div className='col-span-3 bg-white shadow-sm p-5 w-2xl rounded-md dark:bg-[#292929]'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <h1 className='text-[20px] text-[#09090B] font-semibold dark:text-white'>Total de Receitas <ArrowBigUp  className='text-green-500'/> </h1>
                                </div>
                            </div>
                            <div className='mt-10 text-center text-2xl text-green-500'>
                                <p>+ R$ {totalIncomes}</p>
                            </div>
                        </div>

                        <div className='ml-5 col-span-3 bg-white shadow-sm p-5 w-2xl rounded-md dark:bg-[#292929]'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <h1 className='text-[20px] text-[#09090B] font-semibold dark:text-white'>Total de Despesas <ArrowBigDown  className='text-red-500'/> </h1>
                                </div>
                            </div>
                            <div className='mt-10 text-center text-2xl text-red-500'>
                                <p>- R$ {totalExpenses}</p>
                            </div>
                        </div>

                        <div className='ml-5 col-span-3 bg-white shadow-sm p-5 w-2xl rounded-md dark:bg-[#292929]'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <h1 className='text-[20px] text-[#09090B] font-semibold dark:text-white'>Saldo do mês</h1>
                                </div>
                            </div>
                            <div className='mt-10 text-center text-2xl'>
                                
                                {balance >= 0 ? (
                                    <div>
                                        <p className='text-green-500'>R$ {balance}</p>
                                        <p className='text-lg mt-3'>O seu saldo este mês é positivo</p>
                                    </div>
                                 ) : (
                                    <div>
                                        <p className='text-red-500'>R$ {balance}</p>
                                        <p className='text-lg mt-3'>O seu saldo este mês é negativo</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </SidebarInset>
        </>
    )
}