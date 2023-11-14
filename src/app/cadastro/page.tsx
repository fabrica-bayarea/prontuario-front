import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Container, Col, Row } from "react-bootstrap";
import React from "react";
import IconesCadastro from "@/components/IconesCadastro";

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
          <IconesCadastro url={"img/curso.svg"} nome="Curso" />
          <IconesCadastro url={"img/usuario.svg"} nome="Usuário" />
          <IconesCadastro url={"img/beneficiario.svg"} nome="Beneficiário" />
          <IconesCadastro url={"img/atendimento.svg"} nome="Atendimento" />
          <IconesCadastro
            url={"img/programa-social.svg"}
            nome="Programa Social"
          />
        </div>
      </Row>
    </Container>
  );
}
