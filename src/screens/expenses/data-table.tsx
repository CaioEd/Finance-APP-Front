"use client";
import { useState } from "react";
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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";

import { Link } from "react-router-dom";
import { Pager } from "@/components/app/pagination";
import { Button } from "@/components/ui/button";

import { addDays, format, startOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}


export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [open, setOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 })

  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfCurrentWeek,
    to: addDays(startOfCurrentWeek, 6), // Define o intervalo de 7 dias (segunda a domingo)
  });

  const toggleRowExpansion = (rowId: number) => {
    setExpandedRows((prev) => {
      const newExpandedRows = new Set(prev);
      if (newExpandedRows.has(rowId)) {
        newExpandedRows.delete(rowId);
      } else {
        newExpandedRows.add(rowId);
      }
      return newExpandedRows;
    });
  };

  const [filteredData, setFilteredData] = useState<TData[]>([])

  const table = useReactTable({
    data: filteredData.length ? filteredData : data,
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
  });

  const getFilteredData = () => {
    if (date?.from && date?.to) {
      const formattedFrom = format(date.from, "dd-MM-yyyy");
      const formattedTo = format(date.to, "dd-MM-yyyy");

      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/registers/date?from_date=${formattedFrom}&to_date=${formattedTo}`
          );
          const result = await response.json();
          setFilteredData(result);
          console.log(result);
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };

      fetchData();
    }
  };

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
            <Link
              to="/registers/add"
              className="bg-[#F2F2F2] hover:bg-[#23CFCE] py-2.5 p-5 text-black rounded-lg transition-colors duration-400"
            >
              <span className="">Adicionar</span>
            </Link>
          </div>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              className={cn(
                "w-1/4 justify-start text-left font-normal text-black mb-5",
                !date && "text-muted-foreground"
              )}
              style={{ backgroundColor: "rgb(240, 240, 240)" }}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                    {format(date.to, "dd/MM/yyyy", { locale: ptBR })}
                  </>
                ) : (
                  format(date.from, "dd/MM/yyyy", { locale: ptBR })
                )
              ) : (
                <span>Escolha uma data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={ptBR}
            />
          </PopoverContent>
        </Popover>

        <Button onClick={getFilteredData} className="ml-2 mr-5">
          <Filter />
        </Button>

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
                  );
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Vazio
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pager table={table} />
    </>
  );
}
