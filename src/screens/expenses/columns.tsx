import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { 
    Pen,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';


export type Expenses = {
    id: string
    title: string
    value: string
    category: string
    created_at: string
}


export const columns = (setExpenses: React.Dispatch<React.SetStateAction<Expenses[]>>): ColumnDef<Expenses>[] => [
    {
        accessorKey: 'title',
        header: () => {
            return (
                <p className='text-black text-center dark:text-white text-[12px] font-extrabold text-xs uppercase'>Despesa</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black text-center dark:text-white text-[14.5px] font-semibold'>{row.original.title}</p>
            )
        }
    },
    {
        accessorKey: 'value',
        header: () => {
            return (
                <p className='text-black text-center dark:text-white text-[12px] font-extrabold text-xs uppercase'>Valor</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black text-center dark:text-white text-[14.5px] subpixel-antialiased'>R$ {row.original.value}</p>
            )
        }
    },
    {
        accessorKey: 'category',
        header: () => {
            return (
                <p className='text-black text-center dark:text-white text-[12px] font-extrabold text-xs uppercase'>Categoria</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black text-center dark:text-white text-[14.5px] font-semibold'>{row.original.category}</p>
            )
        }
    },
    {
        accessorKey: 'created_at',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Data de Criação</p>
            );
        },
        cell: ({ row }) => {
            const rawDate = row.original.created_at;
            const formattedDate = rawDate ? format(new Date(rawDate), 'dd/MM/yyyy', { locale: ptBR }) : 'Data inválida';
    
            return (
                <p className='text-black dark:text-white text-[14.5px] subpixel-antialiased'>{formattedDate}</p>
            );
        }
    },
    // {
    //     accessorKey: 'total_spent',
    //     header: () => {
    //         return (
    //             <p className='text-black text-center dark:text-white text-[12px] font-extrabold text-xs uppercase'>Total Gasto</p>
    //         )
    //     },
    //     cell: ({ row }) => {
    //         return (
    //             <p className='text-black text-center dark:text-white text-[14.5px] font-semibold'>R$ {row.original.total_spent}</p>
    //         )
    //     }
    // },
    {
        id: 'actions',
        cell: ({ row }) => {
            const primitiveId = row.original.id;
            return (
                <div className='flex justify-end'>
                        <Link
                        to={`/expenses/edit/${row.original.id}`}>
                            <Button className='w-7 h-7 p-5 mr-4  bg-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:hover:bg-[#23CFCE]'>
                                <Pen className='text-black dark:text-white' strokeWidth={2} style={{ 'width': 23, 'height': 23 }} />
                            </Button>
                        </Link>
                </div>
            )
        },
    },
]

