import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
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

import { ArrowBigUp } from "lucide-react";

import { AppSidebar } from "@/components/app/app-sidebar";
import { ToggleTheme } from "@/components/toggleTheme";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

import ApiIncomes from "./service";

import { useEffect, useState } from "react";

const FormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "O título é obrigatório" })
    .min(4, { message: "Mínimo 4 caracteres" }),
  value: z
    .string()
    .min(1, { message: "O valor é obrigatório" })
    .refine(val => !isNaN(Number(val)) && Number(val) > 0, { message: "O valor deve ser um número positivo" }),
  category: z.string().min(1, { message: "Selecione a categoria" }),
});

export function AddIncome() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await ApiIncomes.Insert(data);
      if (response) {
        toast.success("Receita adicionada com sucesso!");
        navigate("/incomes");
      } else {
        toast.error("Erro ao adicionar a receita");
      }
    } catch (error) {
      console.log(error, "error");
    }

    console.log(data);
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset className="pl-9">
        <header className="flex justify-between h-16 mt-3 ml-3 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
                    <Link to="/incomes">Receitas</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Adicionando Receitas</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          <div className="pr-8">
            <ToggleTheme />
          </div>
        </header>

        <div className="flex flex-1 flex-col  p-4 mt-1 mr-3 ml-3">
          <div className="flex items-center">
            <h1 className="mb-3 font-bold text-xl">Adicione receitas aqui</h1>
            <ArrowBigUp className="text-[#008000] mb-2 ml-1" />
          </div>

          <div className="col-span-2 bg-white shadow-sm p-10 rounded-md dark:bg-[#292929]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex items-center mt-5">
                  <div className="w-1/2 mr-8">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Receita</FormLabel>
                          <Input type="text" placeholder="Título" {...field} />
                          <span className="text-xs text-gray-500">
                            De um título a receita - EX: (Salário)
                          </span>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-1/2 mb-6">
                    <FormField
                      control={form.control}
                      name="value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor</FormLabel>
                          <Input
                            type="text"
                            placeholder="Valor da receita"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="w-1/3 mt-2 mb-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="opcao1">Opção 1</SelectItem>
                            <SelectItem value="opcao2">Opção 2</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-7">
                  <Button
                    type="submit"
                    className="bg-[#F2F2F2] hover:bg-[#23CFCE] text-black dark:bg-[#212121] dark:text-white dark:hover:bg-[#23CFCE] dark:hover:text-black"
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
