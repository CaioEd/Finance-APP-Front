import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { 
    Pen,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const userMap = {
    0: 'Admin',
    1: 'Usuário',
}

export type User = {
    id: string
    name: string
    mobile: string
    role: string
}

export const columns = (setUser: React.Dispatch<React.SetStateAction<User[]>>): ColumnDef<User>[] => [
    {
        accessorKey: 'name',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Nome</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px] font-semibold'>{row.original.name}</p>
            )
        }
    },
    {
        accessorKey: 'mobile',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Celular</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px]'>{row.original.mobile}</p>
            )
        }
    },
    {
        accessorKey: 'role',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Tipo</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px] subpixel-antialiased'>{row.original.role}</p>
            )
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const primitiveId = row.original.id;
            return (
                <div className='flex justify-end'>
                    <Button className='w-7 h-7 p-5 mr-4  bg-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:hover:bg-[#23CFCE]'>
                        <Link
                        to={`/users/edit/${row.original.id}`}>
                            <Pen className='text-black dark:text-white' strokeWidth={2} style={{ 'width': 23, 'height': 23 }} />
                        </Link>
                    </Button>
                </div>
            )
        },
    },
]

