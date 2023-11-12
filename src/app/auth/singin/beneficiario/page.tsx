"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import "./style.css";
import { BiLogIn } from "react-icons/bi";
import { FaUserLock } from "react-icons/fa";
import Image from "next/image";
import LogoIESB from "./img/LogoIESB.png";

export default function LoginUsuario() {
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
      <Form className="mt-3">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" placeholder="Insira seu e-mail" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" placeholder="Insira sua senha" />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="dark" size="sm">
            Entrar
            <BiLogIn />
          </Button>
        </div>
      </Form>

      <div className="d-grid gap-2 mt-5">
        <Button
          variant="outline-light margin-botao"
          size="sm"
          href="/auth/singin/usuario"
        >
          {" "}
          Sou Cadastrador <FaUserLock />{" "}
        </Button>
      </div>
    </div>
  );
}
