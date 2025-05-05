"use client"
import { useState, useEffect } from 'react';
import { ArrowBigUp, ArrowBigDown, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';

import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbLink 
} from '@/components/ui/breadcrumb';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@radix-ui/react-dropdown-menu';

import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { ToggleTheme } from '@/components/toggleTheme';
import { AppSidebar } from '@/components/app/app-sidebar';

import ApiDashboard from './service';


export function Dashboard() {
    const [totalExpenses, setTotalExpenses] = useState('')
    const [totalIncomes, setTotalIncomes] = useState('')
    const [balance, setBalance] = useState(0)
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(),  // Data inicial padrão (hoje)
        to: new Date(), // Data final padrão (hoje)
    }) 
    const [actualMonth, setActualMonth] = useState('')
    
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
        if (!dateRange?.from || !dateRange?.to) return // Verifica se as datas estão definidas

        try {
            // Formata as datas para YYYY-MM-DD (padrão ISO)
            const start_date = format(dateRange.from, 'yyyy-MM-dd');
            const end_date = format(dateRange.to, 'yyyy-MM-dd');

            setActualMonth(
                format(dateRange.from, 'MMMM', { locale: ptBR }).charAt(0).toUpperCase() +
                format(dateRange.from, 'MMMM', { locale: ptBR }).slice(1)
            )

            const response = await ApiDashboard.getBalanceByDate(start_date, end_date)
            console.log(response)
            if (response) {
                setTotalExpenses(response.expenses || '');
                setTotalIncomes(response.incomes || '');
                setBalance(response.total_balance || 0);
            }
        } catch (error) {
            console.log(error, 'error to fetch balance by date')
        }
    } 

    const getActualmonth = () => {
        const data = new Date();
        const month = new Intl.DateTimeFormat('pt-BR', { month: 'long' })
        .format(data);

        setActualMonth(month.charAt(0).toLocaleUpperCase() + month.slice(1))
    }

    useEffect(() => {
        getExpensesValue();
        getIncomesValue();
        getBalance();
        getActualmonth();
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
                            <PopoverTrigger className='bg-white dark:bg-[#292929]' asChild>
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
                            <PopoverContent className="w-auto p-0 dark:bg-white dark:text-black" align="start">
                                <Calendar
                                mode="range"
                                selected={dateRange}
                                onSelect={setDateRange}
                                numberOfMonths={2}
                                initialFocus
                                classNames={{
                                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                                    month: "space-y-4",
                                    table: "w-full border-collapse space-y-1",
                                    head_row: "flex",
                                    head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                                    row: "flex w-full mt-2",
                                    cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                                    day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                                    day_range_end: "day-range-end",
                                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                                    day_today: "bg-accent text-accent-foreground",
                                }}
                                />
                            </PopoverContent>
                        </Popover>                        

                        <button
                            className="h-10 bg-[#23CFCE] text-white px-5 py-2 rounded-md hover:opacity-90"
                            onClick={handleFilter}
                        >
                            Filtrar
                        </button>
                    </div>

                    <div className='mt-5 font-semibold'>
                        Balanço de {actualMonth}
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