import { Link, useNavigate } from 'react-router-dom'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
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

import { AppSidebar } from '@/components/app/app-sidebar'
import { ToggleTheme } from '@/components/toggleTheme'
import { 
    SidebarInset, 
    SidebarTrigger 
} from '@/components/ui/sidebar'

import ApiUser from './service'

const FormSchema = z.object({
	name: z.string().min(5, {message: 'Mínimo 5 caracteres'}),
    mobile: z.string().min(11, {message: 'Mínimo 11 caracteres'}),
    password: z.string().min(6, {message: 'Mínimo 6 caracteres'}),
    confirm: z.string().min(6, {message: 'Mínimo 6 caracteres'}),
    role: z.string().min(3, {message: 'Selecione o tipo de usuário'}),
}).refine(data => data.password === data.confirm, {
    message: 'Senha e Confirmação devem ser os mesmos',
    path: ['confirm']
});


export function AddUsers() {
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            role: '', 
        },
    })
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const response = await ApiUser.Insert( data )
            if (response) {
                toast.success('Produto adicionado com sucesso!')                
                navigate('/users')
            } else {
                toast.error('Erro ao adicionar o produto');
            }
        } catch (error) {
            console.log(error, 'error')
        }

        console.log(data)
    }
              
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
                                            <Link to='/users'>Usuários</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className='hidden md:block' />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Adicionar Usuário</BreadcrumbPage>
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
                                <div className='flex items-cente'>
                                    <div className='w-full'>
                                        <FormField
                                            control={form.control}
                                            name='role'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Tipo de Usuário</FormLabel>
                                                        <Select 
                                                            value={field.value}
                                                            onValueChange={(value) => field.onChange({
                                                                target: { value }
                                                            })}
                                                            >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder='Selecione o Tipo de Usuário' />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value='Admin'>Administrador</SelectItem>
                                                                <SelectItem value='Usuário'>Usuário</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='flex items-center mt-5'>
                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name='name'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nome</FormLabel>
                                                    <Input placeholder='Nome Completo' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='w-1/2'>
                                        <FormField
                                            control={form.control}
                                            name='mobile'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Celular</FormLabel>
                                                    <Input placeholder='Celular com DDD' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className='flex items-center mt-5'>
                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name='password'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Informe a Senha</FormLabel>
                                                    <Input type='password' placeholder='Senha' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='w-1/2'>
                                        <FormField
                                            control={form.control}
                                            name='confirm'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Confirme a Senha</FormLabel>
                                                    <Input type='password' placeholder='Confirmação' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='pt-7'>
                                    <Button type='submit' 
                                        className='bg-[#F2F2F2] hover:bg-[#23CFCE] text-black dark:bg-[#212121] dark:text-white dark:hover:bg-[#23CFCE] dark:hover:text-black'>
                                        Adicionar
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