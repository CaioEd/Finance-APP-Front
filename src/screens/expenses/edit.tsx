import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

import { CalendarIcon, Trash } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { AppSidebar } from "@/components/app/app-sidebar";
import { ToggleTheme } from "@/components/toggleTheme";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

import ApiExpenses from "./service";

import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

import { ArrowBigDown } from "lucide-react";

import expenses from '../../data/expenses.json'

const FormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "O título é obrigatório" })
    .min(4, { message: "Mínimo 4 caracteres" }),
  value: z
    .string()
    .min(1, { message: "O valor é obrigatório" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "O valor deve ser um número positivo",
    }),
  category: z.string().min(1, { message: "Selecione a categoria" }),
});

export function EditExpense() {
  const id = useParams().id;
  const navigate = useNavigate();

  const [products, setProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date | null>(null);
  const [title, setTitle] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await ApiExpenses.Update({ id, data });
      if (response === 200) {
        navigate("/expenses");
      } else {
        toast.error("Error editing expense");
      }
    } catch (error) {
      console.log(error, "error");
    }
  }

  const deleteExpense = async () => {
    try {
      const response = await ApiExpenses.Delete({ id });
      if (response) {
        navigate("/expenses");
      } else {
        toast.error("Error deleting the expense");
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const getExpenseByID = async () => {
    try {
      const response = await ApiExpenses.GetExpenseByID({ id });
      if (response) {
        form.setValue("title", response.title);
        form.setValue("value", response.value);
        form.setValue("category", response.category);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExpenseByID();
  }, []);

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
                    <Link to="/expenses">Despesas</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Editando: {title}</BreadcrumbPage>
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
            <h1 className="mb-3 font-bold text-xl">Edite sua despesa aqui</h1>
            <ArrowBigDown className="text-[#FF0000] mb-2 ml-1" />
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
                          <FormLabel>Despesa</FormLabel>
                          <Input
                            type="text"
                            placeholder="Título da sua despesa"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor</FormLabel>
                          <Input
                            type="text"
                            placeholder="Valor da sua despesa"
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
                        <Select {...field} onValueChange={field.onChange} >
                          <SelectTrigger value="category" >
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            {expenses.map((category) => (
                              <SelectItem key={category.value} value={category.label}>{category.label}</SelectItem>
                            ))}
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
                    className="bg-black text-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:text-white dark:hover:bg-[#23CFCE] dark:hover:text-black"
                  >
                    Salvar Alterações
                  </Button>
                </div>
              </form>
            </Form>
            <Button
              onClick={deleteExpense}
              className="mt-4 bg-red-500 text-white"
            >
              <Trash />
              Deletar Despesa
            </Button>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
