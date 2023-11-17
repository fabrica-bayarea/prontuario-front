"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { BiLogIn } from "react-icons/bi";
import "./style.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Image from "next/image";
import LogoIESB from "./img/LogoIESB.png";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "@/state/authContext";
import { useRouter } from "next/navigation";

const devUrl = "http://localhost:3000/auth/signin/usuario";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("O campo email deve ser preenchido")
    .matches(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i, "Email inválido"),
  senha: yup.string().required("O campo senha deve ser preenchido"),
});

export default function Login() {
  const [errorLogin, setErrorLogin] = useState<string>("");
  const { login, accessToken } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (form_data: any) => {
    try {
      await login(devUrl, form_data);
      console.log(accessToken);
      if (accessToken) {
        router.push("/");
      }
    } catch (error: any) {
      setErrorLogin(error);
    }
  };

  return (
    <div className="centralizar-div">
      <Image
        src={LogoIESB}
        alt="Logo IESB"
        width={150}
        height={150}
        className="centralizar-img"
      />
      <h3>Prontuário de Atendimento</h3>
      <p className="subtitulo">Página do Cadastrador de Atendimentos IESB</p>
      <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Insira seu e-mail"
            // @ts-ignore
            name="email"
            {...register("email")}
          />
          <p>{errors.email?.message}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Insira sua senha"
            // @ts-ignore
            name="senha"
            {...register("senha")}
          />
          <p>{errors.senha?.message}</p>
        </Form.Group>

        {errorLogin && <p>{errorLogin}</p>}

        <div className="d-grid gap-2">
          <Button variant="dark" size="sm" type="submit">
            Entrar
            <BiLogIn />
          </Button>
        </div>
      </Form>
    </div>
  );
}
