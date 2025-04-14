// const SSE_URL = import .meta.env.VITE_API_SSE_URL
import { useState, useEffect } from 'react'
import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbLink
} from '@/components/ui/breadcrumb'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { 
    Select, 
    SelectTrigger, 
    SelectContent, 
    SelectItem, 
    SelectValue 
} from "@/components/ui/select"

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

    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')

    const months = [
        { name: "Janeiro", value: "01" },
        { name: "Fevereiro", value: "02" },
        { name: "Março", value: "03" },
        { name: "Abril", value: "04" },
        { name: "Maio", value: "05" },
        { name: "Junho", value: "06" },
        { name: "Julho", value: "07" },
        { name: "Agosto", value: "08" },
        { name: "Setembro", value: "09" },
        { name: "Outubro", value: "10" },
        { name: "Novembro", value: "11" },
        { name: "Dezembro", value: "12" },
    ]

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

    const handleFilter = async () => {
        try {
            const data = { month, year }
            console.log("Enviando:", data)

            // const response = await ApiDashboard.sendDate(data)
        } catch (error) {
            console.log(error)
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
                    <div className='flex gap-5 mt-3'>
                        <div>
                            <label className="block mb-1 text-sm">Mês</label>
                                <Select onValueChange={setMonth}>
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Selecione o mês" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {months.map((m) => (
                                        <SelectItem key={m.value} value={m.value}>{m.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>    
                        </div>

                        <div>
                            <label className="block mb-1 text-sm">Ano</label>
                            <Select onValueChange={setYear}>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Selecione o ano" />
                            </SelectTrigger>
                            <SelectContent>
                                {[...Array(10)].map((_, i) => {
                                const y = 2020 + i
                                return <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                                })}
                            </SelectContent>
                            </Select>
                        </div>

                        <button
                            className="mt-6 h-10 bg-[#23CFCE] text-white px-5 py-2 rounded-md hover:opacity-90"
                            onClick={handleFilter}
                        >
                            Filtrar
                        </button>
                    </div>

                    <div className='grid grid-cols-10 mt-5'>
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