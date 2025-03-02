import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { CircleDollarSign } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ApiSignup from "./service";
import { min } from "date-fns";


const FormSchema = z.object({
  first_name: z.string().min(1, { message: "Digite um nome válido" }),
  username: z.string().min(1, { message: "Digite um nome de usuário válido" }),
  email: z.string().email({ message: "Digite um email válido" }),
  password: z.string().min(1, { message: "Por favor digite a senha" }),
});


export function SignUp() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {

    try {
      const response = await ApiSignup.Login({ data });

      if (response.token) {
        // SAVE TOKEN ON LOCALSTORAGE
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("username", response.username);
        localStorage.setItem("tokenExpiration", response.expires);

        toast.success("User created");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during registration.");
    }
  };

  return (
    <div className="flex bg-white w-full dark:bg-[#212121] justify-between items-center flex-col">

      <section className="mb-10">
        <h1 className="font-bold text-2xl mb-3 text-center">Crie sua conta</h1>

        <Card className="w-[360px] dark:bg-[#292929]">

          <CardHeader>
            <CircleDollarSign
              className="text-[#23CFCE]"
              style={{ width: "27px", height: "27px" }}
            />
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold ">Finance Hub</span>
            </div>
            <hr />
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="name" className="pb-1">
                  Seu Nome
                </Label>
                <Input
                  id="first_name"
                  placeholder="digite seu nome"
                  {...form.register("first_name")}
                />
              </div>

              <div className="mt-5">
                <Label htmlFor="userName" className="pb-1">
                  Nome de usuário
                </Label>
                <Input
                  id="username"
                  placeholder="crie um nome de usuário"
                  {...form.register("username")}
                />
                <span className="text-xs text-gray-500">
                  Exemplo: (username01)
                </span>
              </div>

              <div className="mt-5">
                <Label htmlFor="email" className="pb-1">
                  Seu Email
                </Label>
                <Input
                  id="email"
                  placeholder="Digite seu email"
                  {...form.register("email")}
                />
              </div>
              <div className="mt-5">

                <Label htmlFor="password" className="pb-1">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  {...form.register("password")}
                />
              </div>

              <Button
                type="submit"
                className="mt-9 w-full dark:bg-[#212121] dark:hover:bg-[#23CFCE] text-white"
              >
                Criar a conta
              </Button>
            </form>
          </CardContent>

        </Card>

        <Link className="text-[#23CFCE] hover:brightness-110" to="/">
          Já possui uma conta ? Clique aqui para fazer Login
        </Link>

      </section>
    </div>
  );
}
