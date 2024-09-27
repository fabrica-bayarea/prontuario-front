'use client'
import ButtonForm from "@/components/buttonForm/buttonForm";
import styles from "./style.module.css";
import Image from "next/image";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from "react-hook-form";

interface LoginFormInputs {
    email: string;
    senha: string;
}

export default function Sigin(){
    const { signIn } = useContext(AuthContext);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const [error, setError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => { 
        try {
            await signIn(data);
            router.push("/home");
        } catch (error: any) {
            setError(error.message);
        }
    };

    const SignUpPage = () => {
        router.push("/auth/signUpUser");
    };

    return (
        <div className = {styles.container}>

            <form onSubmit={handleSubmit(onSubmit)} className = {styles.modal__container__form}>
                <div className = {styles.modal__envolve__form}>
                <h1><strong>Login</strong></h1>
                    
                    <input
                    placeholder="Email"
                    type="email"
                    {...register("email", { required: "Email é obrigatório", pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Email inválido"}})}
                    />
                    {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                    
                    <input 
                    placeholder="Senha"
                    type="password"
                    {...register ("senha", {required: "Senha obrigatoria", minLength:{value: 8, message: "A senha deve conter pelo menos 8 caracteres"}
                  })}
                    />
                    {errors.senha && <p className={styles.error}>{errors.senha.message}</p>}
                    {error && <p className={styles.error}>{error}</p>}

                </div>

                <div className={styles.modal__envolve__buttons}>
                    <ButtonForm variant="flatButton" type = "submit">Entrar</ButtonForm>
                    <ButtonForm variant = "outline" type="button" onClick = {SignUpPage}>Cadastre-se</ButtonForm>
                </div>
            </form>

            <div className = {styles.modal__container}>
                <div className = {styles.envolve__conteudo__modal}>
                    <Image
                        src="/illustração_Recepção.svg"
                        alt="Illustração"
                        width={500}
                        height={500}
                        className={styles.image} />
                    <p>Crie agendamentos, gerencie suas consultas, e faça parte do <strong>IESB em Ação!</strong></p>
                </div>
            </div>
        </div>
    )
}