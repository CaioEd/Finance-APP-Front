"use client"
import { useState } from "react";

// React Table imports
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

// UI components imports
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Pager } from "@/components/app/pagination";

// Router import
import { Link } from "react-router-dom";


interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {

  	const [open, setOpen] = useState(false)

	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnFilters,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
    	getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
	})

	
	return (
		<>
			<div>
				<div className="flex justify-between items-center pb-4">
					<Input
						placeholder="Pesquisar por Nome ..."
						value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
						onChange={(event) =>
							table.getColumn("name")?.setFilterValue(event.target.value)
						}
						className="max-w-sm ml-2 mt-1 mb-2"
					/>
					
					<div className="flex items-center space-x-6">
						
						<Link to="/users/add" className="bg-[#F2F2F2] hover:bg-[#23CFCE] py-2.5 p-5 text-black rounded-lg transition-colors duration-400">
							<span className="">Adicionar </span> 
						</Link>
					</div>
      			</div>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
								<TableHead key={header.id}>
									{header.isPlaceholder
									? null
									: flexRender(
										header.column.columnDef.header,
										header.getContext()
										)}
								</TableHead>
								)
							})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
								))}
							</TableRow>
							))
						) : (
							<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								Vazio
							</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<Pager table={table} />
		</>
  )
}
