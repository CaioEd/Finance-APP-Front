"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { AppSidebar } from "@/components/app/app-sidebar";
import { ToggleTheme } from "@/components/toggleTheme";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

import ApiRegister from "./service";
import ApiProduct from "../incomes/service";

import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

const FormSchema = z.object({
  name: z.string({ required_error: "Selecione o produto" }),
  register_date: z.string({ required_error: "Informe a data" }),
  quantity: z.number().min(1, { message: "Quantidade precisa ser ao menos 1" }),
  price: z.number().min(0, { message: "Preço não pode ser negativo" }),
});

export function AddRegister() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<string[]>([]);
  const [date, setDate] = useState<Date | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      register_date: "",
      quantity: 1,
      price: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedData = {
      ...data,
      quantity: Number(data.quantity), // ou parseFloat(data.quantity)
      price: Number(data.price), // ou parseFloat(data.price)
    };

    try {
      const response = await ApiRegister.Insert(formattedData);
      console.log("Payload enviado:", data);
      if (response) {
        toast.success("Registro adicionado com sucesso!");
        navigate("/registers");
      }
    } catch (error) {
      console.error("Erro ao adicionar registro:", error);
    }
  }

  const getProducts = async () => {
    try {
      const response = await ApiProduct.GetAllProducts();
      setProducts(
        response.map((product) => ({
          id: product.id,
          name: product.name,
        }))
      );
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <AppSidebar />
      <SidebarInset className="pl-9">
        <header className="flex justify-between h-16 mt-3 ml-3 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink>
                    <Link to="/dashboard">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink>
                    <Link to="/registers">Registros</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Adicionar</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="pr-8">
            <ToggleTheme />
          </div>
        </header>

        <div className="flex flex-2 flex-col p-4 mt-1 mr-3 ml-3">
          <div className="col-span-3 bg-white shadow-sm p-10 rounded-md dark:bg-[#292929]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex items-center">
                  <div className="w-1/2 mr-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Produto</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o produto" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {products.map((name) => (
                                <SelectItem key={name.id} value={name.name}>
                                  {name.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                                  "w-full flex justify-start",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date
                                  ? format(date, "dd-MM-yyyy", { locale: ptBR })
                                  : "Selecione uma data"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(selectedDate) => {
                                  setDate(selectedDate);
                                  field.onChange(
                                    format(selectedDate, "yyyy-MM-dd")
                                  );
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

                <div className="flex items-center">
                  <div className="w-1/2 mr-5">
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantidade</FormLabel>
                          <Input
                            type="number"
                            placeholder="Quantidade comprada"
                            {...field}
                            onChange={(e) => field.onChange(e.target.valueAsNumber)}  // convert to number
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-1/2 mr-5">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço</FormLabel>
                          <Input type="number" placeholder="Preço" 
                          {...field}
                          onChange={(e) => field.onChange(e.target.valueAsNumber)}  // convert to number 
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    className="bg-black text-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:hover:bg-[#23CFCE]"
                  >
                    Adicionar
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
