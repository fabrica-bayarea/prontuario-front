"use client";

import FormularioCursos from "@/components/FormularioCursos";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../globals.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";
import { useAuth } from "@/state/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { listarCursos } from "@/controllers/cursosController";
import React from "react";

const devUrl = "http://localhost:3000/cursos";

export default function Cursos() {
  const { accessToken } = useAuth();
  const [cursos, setCursos] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const headerConfig = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  React.useEffect(() => {
    const listCursos = async () => {
      try {
        const res = await listarCursos(devUrl, headerConfig);
        setCursos([...res?.data]);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    listCursos();
  }, []);

  const renderCursos = (cursos: any) => {
    if (loading) {
      return <p>Carregando...</p>;
    }

    if (cursos.length > 0) {
      console.log(cursos);
      return cursos.map((curso: any) => (
        <FormularioCursos
          key={curso.id}
          cursoId={curso.id}
          nome={curso.nome}
          programas={curso.programas}
        />
      ));
    } else {
      return <h1>Nenhum curso cadastrado ainda</h1>;
    }
  };

  return (
    <Container className="centralizar-div">
      <Row className="mt-5 mb-5 fileira-cadastrar">
        <h2>Cursos Cadastrados</h2>
        <Row className="fileira-cadastrar botao-cadastrar">
          <Button
            className="mt-3"
            variant="success"
            onClick={() => router.push("/cadastro/curso")}
          >
            <BiAddToQueue /> Adicionar Curso
          </Button>
        </Row>
      </Row>
      <Row>
        <div className="margin-tabela">{renderCursos(cursos)}</div>
      </Row>
    </Container>
  );
}
