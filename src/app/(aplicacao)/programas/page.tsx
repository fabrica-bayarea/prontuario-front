"use client";

import Formulario from "./components/FormularioProgramas";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../globals.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";
import { useAuth } from "@/state/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { listarProgramas } from "@/controllers/programasController";
import React from "react";

const programasUrl = `${process.env.NEXT_PUBLIC_BASE_PROGRAMAS}`;

export default function Programas() {
  const { accessToken } = useAuth();
  const [programas, setProgramas] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const headerConfig = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  React.useEffect(() => {
    const listProgramas = async () => {
      try {
        const res = await listarProgramas(programasUrl, headerConfig);
        setProgramas([...res?.data]);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    listProgramas();
  }, []);

  const renderProgramas = (programas: any) => {
    if (loading) {
      return <p>Carregando...</p>;
    }

    if (programas.length > 0) {
      return programas.map((programa: any) => (
        <Formulario
          key={programa.id}
          programaId={programa.id}
          nome={programa.nome}
          cursos={programa.cursos}
          atendimentos={programa.atendimentos}
        />
      ));
    } else {
      return <h1>Nenhum programa cadastrado ainda</h1>;
    }
  };

  return (
    <Container className="centralizar-div">
      <Row className="mt-5 mb-5 fileira-cadastrar">
        <h2>Programas Cadastrados</h2>
        <Row className="fileira-cadastrar botao-cadastrar">
          <Button
            className="mt-3"
            variant="success"
            onClick={() => router.push("/cadastro/programa")}
          >
            <BiAddToQueue /> Adicionar Programa
          </Button>
        </Row>
      </Row>
      <Row>
        <div className="margin-tabela">{renderProgramas(programas)}</div>
      </Row>
    </Container>
  );
}
