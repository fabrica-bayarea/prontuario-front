import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Container, Col, Row } from "react-bootstrap";
import React from "react";
import IconesCadastro from "@/components/IconesCadastro";
import Link from "next/link";

export default function Cadastro() {
  return (
    <Container className="margin-top">
      <Row className="text-center">
        <h1>Olá, Usuário</h1>
        <div className="spacer"></div>
        <h3>O que deseja cadastrar hoje?</h3>
      </Row>
      <Row className="flex text-center icon-container">
        <div className="icon-row">
          <Link className="link-style" href={"/cadastro/auth/usuario"}>
            <IconesCadastro url={"img/usuario.svg"} nome="Usuário" />
          </Link>
          <Link className="link-style" href={"/cadastro/beneficiario"}>
            <IconesCadastro url={"img/beneficiario.svg"} nome="Beneficiário" />
          </Link>
          <Link className="link-style" href={"/cadastro/cursos"}>
            <IconesCadastro url={"img/curso.svg"} nome="Curso" />
          </Link>
          <Link className="link-style" href={"/cadastro/atendimento"}>
            <IconesCadastro url={"img/atendimento.svg"} nome="Atendimento" />
          </Link>
          <Link className="link-style" href={"/cadastro/atendimento"}>
            <IconesCadastro
              url={"img/programa-social.svg"}
              nome="Programa Social"
            />
          </Link>
        </div>
      </Row>
    </Container>
  );
}
