import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BgImage from '../../assets/otp.svg';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ApiSignin from './service';
import { toast } from 'sonner';

export function SignIn() {
    const navigate = useNavigate();
    
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userName, setUserName] = useState('');

    // Função que carrega dados do localStorage
    const HandleUserData = () => {
        const storedUserRole = localStorage.getItem("userRole");
        const storedUserName = localStorage.getItem("userName");

        if (storedUserRole && storedUserName) {
            setUserRole(storedUserRole);
            setUserName(storedUserName);
        }
    };

    useEffect(() => {
        HandleUserData();  // Chama a função para carregar os dados ao iniciar o componente
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            'mobile': mobile,
            'password': password
        };

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
        <main className='flex h-screen w-full'>
            <div className='bg-[#F0F0F0] dark:bg-[#212121] w-full h-full flex items-center justify-center'>
                <img src={BgImage} alt="My SVG" className=' w-[50%] h-[50%]' />
            </div>

            <section className='flex bg-white max-w-3xl w-full dark:bg-[#212121]  justify-center items-center'>
                <Card className='w-[360px] dark:bg-[#292929]'>
                    <CardHeader />
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor='mobile' className='pb-1'>Celular</Label>
                                <Input
                                    placeholder='celular com prefixo' 
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                />
                            </div>

                            <div className='mt-7'>
                                <Label htmlFor='password' className='pb-1'>Sua senha</Label>
                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id='password' 
                                    type='password' 
                                    placeholder='digite a senha' 
                                />
                            </div>
                            <Button type='submit' className='mt-9 w-full dark:bg-[#212121] dark:hover:bg-[#23CFCE] text-white'>
                                Entrar
                            </Button>
                        </form>
                    </CardContent>
                </Card>        
            </section>
        </main>
    );
}
