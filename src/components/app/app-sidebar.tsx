'use client'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  ArrowBigDown,
  ArrowBigUp,
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CircleDollarSign,
  LayoutDashboard,
  LogOut,
  Receipt,
  User,
} from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import axios from 'axios';


export function AppSidebar() {

    async function logOut() {
        localStorage.removeItem("first_name");
        localStorage.removeItem("username");
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // Remove o token global do axios
        delete axios.defaults.headers.common['Authorization'];
        
        window.location.href = '/';
    }

    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')

    useEffect(() => {
        const storedName = localStorage.getItem("first_name")
        const storedUserName = localStorage.getItem("username");

        if ( storedUserName && storedName ) {
            setName(storedName);
            setUserName(storedUserName);
    }
    }, [])

    return (
        <Sidebar className="w-64 md:w-64 lg:w-72">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                            <SidebarMenuButton
                                size='lg'
                                className='mt-3 ml-3 bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent'
                            >
                                <CircleDollarSign className='text-[#23CFCE]' style={{ width: '27px', height: '27px' }} />
                                <div className='flex flex-col gap-0.5 leading-none pl-2'>
                                    <span className='font-semibold'>Finance Hub</span>
                                </div>
                            </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <hr />
            <SidebarContent>
                <SidebarGroup key={1} className='pl-5 mt-3 w-[270px]'>
                    <SidebarGroupContent>
                        <SidebarMenu>

                            <SidebarMenuItem>
                                <Link to='/dashboard' className='flex items-center ml-2'>
                                    <SidebarMenuButton className='h-12 hover:bg-[#23CFCE] dark:hover:bg-[#23CFCE] dark:hover:text-black'>
                                        <LayoutDashboard style={{ width: '21px', height: '21px' }} strokeWidth={2.5} />
                                        <span className='font-mono ml-4'>Dashboard</span>
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>


                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            
                <SidebarGroup key={2} className='pl-5 mt-3'>
                    <SidebarGroupLabel>Financeiro</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>

                            <SidebarMenuItem>
                                <Link to='/balance' className='flex items-center ml-2'>
                                    <SidebarMenuButton className='h-12 hover:bg-[#23CFCE] dark:hover:bg-[#23CFCE] dark:hover:text-black'>
                                        <Receipt style={{ width: '21px', height: '21px' }} strokeWidth={2.5} />
                                        <span className='font-mono ml-4'>Saldos</span>
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <Link to='/incomes' className='flex items-center ml-2'>
                                    <SidebarMenuButton className='h-12 hover:bg-[#23CFCE] dark:hover:bg-[#23CFCE] dark:hover:text-black'>
                                        <ArrowBigUp style={{ width: '21px', height: '21px', color: 'green' }} strokeWidth={2.5} />
                                        <span className='font-mono ml-4'>Receitas</span>
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <Link to='/expenses' className='flex items-center ml-2'>
                                    <SidebarMenuButton className='h-12 hover:bg-[#23CFCE] dark:hover:bg-[#23CFCE] dark:hover:text-black'>
                                        <ArrowBigDown style={{ width: '21px', height: '21px', color: 'red' }} />
                                        <span className='font-mono ml-4'>Despesas</span>
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
				
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size='lg'
                                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                            >
                                <Avatar className='h-8 w-8 rounded-lg'>
                                    <AvatarImage
                                        src=''
                                        alt={userName}
                                />
                                    <AvatarFallback className='rounded-lg'></AvatarFallback>
                                </Avatar>
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-semibold pl-2'>{userName}</span>
                                </div>
                                <ChevronsUpDown className='ml-auto size-4' />
                            </SidebarMenuButton>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg dark:bg-[#212121]'
                                side='bottom'
                                align='end'
                                sideOffset={4}
                                
                            >
                                <DropdownMenuLabel className='p-0 font-normal'>
                                    <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                                        <Avatar className='h-8 w-8 rounded-lg'>
                                            <AvatarImage
                                                src=''
                                                alt={name}
                                            />
                                            <AvatarFallback className='rounded-lg'></AvatarFallback>
                                        </Avatar>
                                        <div className='grid flex-1 text-left text-sm leading-tight'>
                                            <span className='truncate font-semibold'>{name}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <DropdownMenuGroup>
                                    <Link to='/account'>
                                        <DropdownMenuItem className='cursor-pointer'> 
                                            <User />
                                            Minha Conta
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuGroup>

                                <DropdownMenuGroup>
                                    
                                    <DropdownMenuSeparator />
                                        <DropdownMenuItem className='cursor-pointer' onClick={logOut}>
                                            <LogOut />
                                            Log out
                                        </DropdownMenuItem>

                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
