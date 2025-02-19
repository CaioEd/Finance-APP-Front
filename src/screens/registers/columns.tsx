import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { 
    Pen,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'


export type Register = {
    id: string
    name: string
    quantity: string
    price: string
    total_spent: number
    register_date: string
}


export const columns = (setRegister: React.Dispatch<React.SetStateAction<Register[]>>): ColumnDef<Register>[] => [
    {
        accessorKey: 'name',
        header: () => {
            return (
                <p className='text-black text-center dark:text-white text-[12px] font-extrabold text-xs uppercase'>Nome do Produto</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black text-center dark:text-white text-[14.5px] font-semibold'>{row.original.name}</p>
            )
        }
    },
    {
        accessorKey: 'quantity',
        header: () => {
            return (
                <p className='text-black text-center dark:text-white text-[12px] font-extrabold text-xs uppercase'>Quantidade</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black text-center dark:text-white text-[14.5px] subpixel-antialiased'>{row.original.quantity}</p>
            )
        }
    },
    {
        accessorKey: 'price',
        header: () => {
            return (
                <p className='text-black text-center dark:text-white text-[12px] font-extrabold text-xs uppercase'>Preço</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black text-center dark:text-white text-[14.5px] font-semibold'>R$ {row.original.price}</p>
            )
        }
    },
    {
        accessorKey: 'total_spent',
        header: () => {
            return (
                <p className='text-black text-center dark:text-white text-[12px] font-extrabold text-xs uppercase'>Total Gasto</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black text-center dark:text-white text-[14.5px] font-semibold'>R$ {row.original.total_spent}</p>
            )
        }
    },
    {
        accessorKey: 'register_date',
        header: () => {
            return (
                <p className='text-black text-center dark:text-white text-[12px] font-extrabold text-xs uppercase'>Data</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black text-center dark:text-white text-[14.5px] font-semibold'>{row.original.register_date}</p>
            )
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const primitiveId = row.original.id;
            return (
                <div className='flex justify-end'>
                        <Link
                        to={`/registers/edit/${row.original.id}`}>
                            <Button className='w-7 h-7 p-5 mr-4  bg-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:hover:bg-[#23CFCE]'>
                                <Pen className='text-black dark:text-white' strokeWidth={2} style={{ 'width': 23, 'height': 23 }} />
                            </Button>
                        </Link>
                </div>
            )
        },
    },
]

