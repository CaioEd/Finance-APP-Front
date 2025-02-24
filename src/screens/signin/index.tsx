import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BgImage from "../../assets/otp.svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ApiSignin from "./service";
import { toast } from "sonner";

import { CircleDollarSign } from "lucide-react";

export function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Função que carrega dados do localStorage
  // const HandleUserData = () => {
  //     const storedUserRole = localStorage.getItem("userRole");
  //     const storedUserName = localStorage.getItem("userName");

  //     if (storedUserRole && storedUserName) {
  //         setUserName(storedUserName);
  //     }
  // };

  // useEffect(() => {
  //     HandleUserData();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const data = {
    //     'mobile': mobile,
    //     'password': password
    // };

    try {
      const response = await ApiSignin.Login({ data });

      if (response.token) {
        // SAVE TOKEN ON LOCALSTORAGE
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("userRole", response.user.role);
        localStorage.setItem("userName", response.user.name);
        localStorage.setItem("tokenExpiration", response.expires);

        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (
    <main className="flex h-screen w-full">
      <div className="bg-[#F0F0F0] dark:bg-[#212121] w-full h-full flex items-center justify-center">
        <img src={BgImage} alt="My SVG" className=" w-[50%] h-[50%]" />
      </div>

      <section className="flex bg-white max-w-3xl w-full dark:bg-[#212121]  justify-center items-center flex-col">

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
                <Label htmlFor="email" className="pb-1">
                  Email
                </Label>
                <Input
                  placeholder="digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mt-7">
                <Label htmlFor="password" className="pb-1">
                  Sua senha
                </Label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  placeholder="digite sua senha"
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
          Não possui uma conta ? Clique aqui para criar uma
        </Link>
      </section>
    </main>
  );
}
