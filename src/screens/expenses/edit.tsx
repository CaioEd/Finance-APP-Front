import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbPage, 
    BreadcrumbSeparator 
} from '@/components/ui/breadcrumb'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { cn } from '@/lib/utils'

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import { 
    CalendarIcon,
    Trash,
 } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { AppSidebar } from '@/components/app/app-sidebar'
import { ToggleTheme } from '@/components/toggleTheme'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'

import ApiRegister from './service'
import ApiProduct from '../incomes/service'


import { Calendar } from '@/components/ui/calendar'
import { toast } from 'sonner'

const FormSchema = z.object({
    name: z.string({ required_error: 'Selecione o produto' }),
    register_date: z.string({ required_error: 'Informe a data' }),
    quantity: z.string().min(1, { message: 'Quantidade precisa ser ao menos 1' }),
    price: z.string().min(0, { message: 'Preço não pode ser negativo' }),
})


export function EditRegister() {
    const navigate = useNavigate()
    const [products, setProducts] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [date, setDate] = useState<Date | null>(null)
    const id = useParams().id
    const [name, setName] = useState('')

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const response = await ApiRegister.Update({ id, data })
            if (response === 200) {                
                navigate('/registers')
            } else {
                toast.error('Error adding product')
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }

    const deleteRegister = async () => {
        try {
            const response = await ApiRegister.Delete({id}) 
            if (response) {
                navigate('/registers')
            } else {
                toast.error('Error deleting the register')
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }

    const getRegisterByID = async () => {
        try {
            const response = await ApiRegister.GetRegisterByID({ id })
            if (response) {
                form.setValue('name', response.name)
                form.setValue('register_date', response.register_date)
                form.setValue('quantity', response.quantity)
                form.setValue('price', response.price)

            }
        } catch (error) {
            console.log('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getRegisterByID()
    }, [])
              
    return (
        <>
            <AppSidebar />
            <SidebarInset className='pl-9'>
                <header className='flex justify-between h-16 mt-3 ml-3 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
                    <div className='flex items-center gap-2 px-4'>
                        <SidebarTrigger className='-ml-1' />
                            <Separator className='mr-2 h-4' />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className='hidden md:block'>
                                        <BreadcrumbLink>
                                            <Link to='/dashboard'>Dashboard</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className='hidden md:block' />
                                    <BreadcrumbItem className='hidden md:block'>
                                        <BreadcrumbLink>
                                            <Link to='/registers'>Registros</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className='hidden md:block' />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Editando: {name}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    <div className='pr-8'>
                        <ToggleTheme />
                    </div>
                </header>
                <div className='flex flex-1 flex-col  p-4 mt-1 mr-3 ml-3'>
                    <div className='col-span-2 bg-white shadow-sm p-10 rounded-md dark:bg-[#292929]'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="flex items-center">
                                     <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name='name'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Produto</FormLabel>
                                                    <Input type='text' placeholder='Nome do Produto' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                        
                                    <div className="w-1/2 mr-5">
                                        <FormField
                                            control={form.control}
                                            name="register_date"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Data</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                className={cn(
                                                                    'w-full flex justify-start',
                                                                    !date && 'text-muted-foreground'
                                                                )}
                                                            >
                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                {date
                                                                    ? format(date, 'dd-MM-yyyy', { locale: ptBR })
                                                                    : 'Selecione uma data'}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-full p-0">
                                                            <Calendar
                                                                mode="single"
                                                                selected={date}
                                                                onSelect={(selectedDate) => {
                                                                    setDate(selectedDate)
                                                                    field.onChange(
                                                                        format(selectedDate, 'yyyy-MM-dd')
                                                                    )
                                                                }}
                                                                initialFocus
                                                                locale={ptBR}
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div> 

                                <div className='flex items-center mt-5'>

                                        <div className='w-1/2 mr-5 '>
                                            <FormField
                                                control={form.control}
                                                name='quantity'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Quantidade <br /> (Edite de acordo com a quantidade que saiu do estoque)</FormLabel>
                                                        <Input
                                                        type='number'
                                                        placeholder='Quantidade comprada'
                                                        {...field}
                                                        />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className='w-1/2 mr-5 mt-5'>
                                            <FormField
                                                control={form.control}
                                                name='price'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Preço</FormLabel>
                                                        <Input
                                                        type='number'
                                                        placeholder='Preço'
                                                        {...field}
                                                         />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                </div>
                                <div className='pt-7'>
                                    <Button type='submit' 
                                        className='bg-black text-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:text-white dark:hover:bg-[#23CFCE] dark:hover:text-black'>
                                        Salvar Alterações
                                    </Button>

                                    <Button onClick={deleteRegister}
                                        className='ml-3 bg-red-500 text-white'>
                                        <Trash />
                                        Deletar Produto
                                    </Button>
                                </div>
                            </form>    
                        </Form>
                    </div>
                </div> 
            </SidebarInset>
        </>
    )
}
