import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ApiSignin from "./service";
import { toast } from "sonner";

import { CircleDollarSign } from "lucide-react";

import { ToggleTheme } from "@/components/toggleTheme";

export function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      username: userName,
      email: email,
      password: password,
    };

    try {
      const response = await ApiSignin.Login({ data });

      if (response.token) {
        // SAVE TOKEN ON LOCALSTORAGE
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("name", response.user.role);
        localStorage.setItem("username", response.user.name);
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
      <div className="self-end p-5">
        <ToggleTheme />
      </div>
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
            <form onSubmit={handleSubmit}>

              <div>
                <Label htmlFor="name" className="pb-1">
                  Seu Nome
                </Label>
                <Input
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mt-5">
                <Label htmlFor="userName" className="pb-1">
                  Nome de usuário
                </Label>
                <Input
                  placeholder="Crie um nome de usuário"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
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
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-5">

                <Label htmlFor="password" className="pb-1">
                  Senha
                </Label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  placeholder="Crie uma senha"
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
