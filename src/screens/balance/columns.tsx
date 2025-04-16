import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';


export type Balance = {
    id: string
    month: string
    total_income: string
    total_expense: string
    total_balance: string
}

export const columns = (setBalance: React.Dispatch<React.SetStateAction<Balance[]>>): ColumnDef<Balance>[] => [
    {
            accessorKey: 'month',
            header: () => {
                // const rawDate = row.original.created_at;
                // const formattedDate = rawDate ? format(new Date(rawDate), 'dd/MM/yyyy', { locale: ptBR }) : 'Data inválida';
                return (
                    <p className='text-black text-center dark:text-white text-[12px] font-extrabold text-xs uppercase'>Mês/Ano</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className='text-black text-center dark:text-white text-[14.5px] font-semibold'>{row.original.month}</p>
                )
            }
        },
        {
            accessorKey: 'total_income',
            header: () => {
                return (
                    <p className='text-black text-center dark:text-white text-[12px] font-extrabold text-xs uppercase'>Receitas</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className='text-green-500 text-center text-[14.5px] subpixel-antialiased'>R$ {row.original.total_income}</p>
                )
            }
        },
        {
            accessorKey: 'total_expense',
            header: () => {
                return (
                    <p className='text-black text-center dark:text-white text-[12px] font-extrabold text-xs uppercase'>Despesas</p>
                )
            },
            cell: ({ row }) => {
                return (
                    <p className='text-red-500 text-center text-[14.5px] font-semibold'>R$ {row.original.total_expense}</p>
                )
            }
        },
        {
            accessorKey: 'total_balance',
            header: () => {
                return (
                    <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Saldo Total</p>
                );
            },
            cell: ({ row }) => {
        
                return (
                    <p className='text-black dark:text-white text-[14.5px] subpixel-antialiased'>R$ {row.original.total_balance}</p>
                );
            }
        },
]