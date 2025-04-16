"use client"

import { useState, useEffect } from 'react'
import {
    ArrowBigUp,
    ArrowBigDown,
    CalendarIcon,
} from 'lucide-react'
import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbLink
} from '@/components/ui/breadcrumb'
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from '@radix-ui/react-dropdown-menu'

import { cn } from "@/lib/utils";

import { SidebarInset, SidebarTrigger } from'@/components/ui/sidebar'
import { ToggleTheme } from '@/components/toggleTheme'
import { AppSidebar } from '@/components/app/app-sidebar'
import { DateRange } from 'react-day-picker'

import ApiDashboard from './service'

export function Dashboard() {
    const [totalExpenses, setTotalExpenses] = useState('')
    const [totalIncomes, setTotalIncomes] = useState('')
    const [balance, setBalance] = useState(0)
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        fromt: new Date(),  // Data inicial padrão (hoje)
        to: new Date(), // Data final padrão (hoje)
    }) 
    
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

    // /api/balance/date/?start_date=2025-04-01&end_date=2025-05-01

    const handleFilter = async () => {
        if (!dateRange?.from || !dateRange?.to) return // Verifica se as datas estão definidas

        try {
            // Formata as datas para YYYY-MM-DD (padrão ISO)
            const start_date = format(dateRange.from, 'yyyy-MM-dd');
            const end_date = format(dateRange.to, 'yyyy-MM-dd');

            const response = await ApiDashboard.getBalanceByDate(start_date, end_date)

            if (response) {
                setTotalExpenses(response.total_expenses || '');
                setTotalIncomes(response.total_incomes || '');
                setBalance(response.total_balance || 0);
            }
        } catch (error) {
            console.log(error, 'error to fetch balance by date')
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
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className="w-[280px] justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dateRange?.from ? (
                                        dateRange.to ? (
                                            <>
                                                {format(dateRange.from, "dd/MM/yyyy")} -{" "}
                                                {format(dateRange.to, "dd/MM/yyyy")}
                                            </>
                                        ) : (
                                            format(dateRange.from, "dd/MM/yyyy")
                                        )
                                    ) : (
                                        <span>Selecione um intervalo</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="range"
                                    selected={dateRange}
                                    onSelect={setDateRange}
                                    numberOfMonths={2} // Mostra 2 meses lado a lado
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>                        

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