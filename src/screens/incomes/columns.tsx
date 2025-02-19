import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { 
    Pen,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'


export type Product = {
    id: string
    name: string
    description: string
    category: string
}


export const columns = (setProduct: React.Dispatch<React.SetStateAction<Product[]>>): ColumnDef<Product>[] => [
    {
        accessorKey: 'name',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Produto</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px] font-semibold'>{row.original.name}</p>
            )
        }
    },
    {
        accessorKey: 'description',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Descrição</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px]'>{row.original.description}</p>
            )
        }
    },
    {
        accessorKey: 'category',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Categoria</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px] subpixel-antialiased'>{row.original.category}</p>
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
                        to={`/products/edit/${row.original.id}`}>
                            <Button className='w-7 h-7 p-5 mr-4  bg-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:hover:bg-[#23CFCE]'>
                                <Pen className='text-black dark:text-white' strokeWidth={2} style={{ 'width': 23, 'height': 23 }} />
                            </Button>
                        </Link>
                </div>
            )
        },
    },
]

