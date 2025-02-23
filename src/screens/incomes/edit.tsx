import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

import ApiService from "./service";
import { title } from "process";

const FormSchema = z.object({
  title: z.string().min(4, { message: "Mínimo 4 caracteres" }),
  value: z.string().min(15, { message: "Mínimo 1 caracteres" }),
  category: z.string().min(6, { message: "Mínimo 5 caracteres" }),
});

export function EditIncome() {
  const id = useParams().id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await ApiService.Update({ id, data });
      if (response === 200) {
        navigate("/incomes");
      } else {
        toast.error("Error editing income");
      }
    } catch (error) {
      console.log(error, "error");
    }
  }

  const getIncome = async () => {
    try {
      const response = await ApiService.GetProductByID({ id });
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
    getIncome();
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
                    <Link to="/incomes">Incomes</Link>
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
            <h1 className="mb-3 font-bold text-xl">Edite sua receita aqui</h1>
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
                          <Input
                            type="text"
                            placeholder="Título da sua receita"
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
                            placeholder="Valor da sua receita"
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
                    className="bg-black text-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:text-white dark:hover:bg-[#23CFCE] dark:hover:text-black"
                  >
                    Salvar Alterações
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
