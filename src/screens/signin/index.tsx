import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BgImage from "../../assets/otp.svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { CircleDollarSign } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ApiSignin from "./service";

const FormSchema = z.object({
  email: z.string().email({ message: "Digite um email válido" }),
  password: z.string().min(1, { message: "Por favor digite a senha" }),
});

export function SignIn() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {

    try {
      const response = await ApiSignin.Login({ data });
      if (response) {
        
        // Salva o token no localStorage
        console.log("Login bem-sucedido");
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("username", response.username);
        localStorage.setItem("tokenExpiration", response.expires);

        toast.success("Login realizado com sucesso");
        navigate("/dashboard");
      } else {
        toast.error("Credenciais inválidas");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro durante o login. Tente novamente.");
    }
  }

  return (
    <main className="flex h-screen w-full">
      <div className="bg-[#F0F0F0] dark:bg-[#212121] w-full h-full flex items-center justify-center">
        <img src={BgImage} alt="My SVG" className="w-[50%] h-[50%]" />
      </div>

      <section className="flex bg-white max-w-3xl w-full dark:bg-[#212121] justify-center items-center flex-col">
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
                <Label htmlFor="email" className="pb-1">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="Digite seu email"
                  {...form.register("email")}
                />
              </div>

              <div className="mt-7">
                <Label htmlFor="password" className="pb-1">
                  Sua senha
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
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>

        <Link className="text-[#23CFCE] hover:brightness-110 mt-2" to="/signup">
          Não possui uma conta? Clique aqui para criar uma
        </Link>
      </section>
    </main>
  );
}
