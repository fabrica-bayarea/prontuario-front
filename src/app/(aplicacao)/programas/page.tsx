"use client";

import Formulario from "./components/FormularioProgramas";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../globals.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";
import { useAuth } from "@/state/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  filtrarProgramaPorNome,
  listarProgramas,
} from "@/controllers/programasController";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const programasUrl = `${process.env.NEXT_PUBLIC_BASE_PROGRAMAS}`;
const programasPorNome = `${process.env.NEXT_PUBLIC_PROGRAMA_PESQUISAR}`;

const schema = yup.object().shape({
  nome: yup
    .string()
    .trim()
    .required("Para pesquisar, é necessário preencher este campo")
    .min(3, "A pesquisa deve conter ao menos 3 caracteres"),
});

export default function Programas() {
  const { accessToken } = useAuth();
  const [programas, setProgramas] = useState<any>([]);
  const [programasNome, setProgramasNome] = useState<any>([]);
  const [filter, setFilter] = useState<any>([false]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const headerConfig = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const headerConfigSearch = {
    token: `${accessToken}`,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (form_data: any) => {
    try {
      const res = await filtrarProgramaPorNome(
        programasPorNome,
        form_data.nome,
        headerConfigSearch,
      );
      if (res) {
        setFilter(true);
        setProgramasNome([...res.data]);
      }
    } catch (error) {
      throw error;
    }
  };

  const renderProgramasFiltrados = (programasFiltrados: any) => {
    if (loading) {
      return <p>Carregando...</p>;
    }

    if (programasFiltrados.length > 0) {
      return programasFiltrados.map((programa: any) => (
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

    if (programas) {
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
      }
      return <h1>Nenhum programa cadastrado ainda</h1>;
    }
  };

  return (
    <Container className="centralizar-div-programas">
      <Row
        className="mt-5 mb-5 fileira-cadastrar"
        style={{ width: "60%", textAlign: "center" }}
      >
        <h2>Programas Cadastrados</h2>
      </Row>
      <Row
        className="fileira-cadastrar botao-cadastrar"
        style={{ width: "100%" }}
      >
        <Col className="coluna-pesquisar">
          <Button
            className=""
            variant="success"
            onClick={() => router.push("/cadastro/programa")}
          >
            <BiAddToQueue /> Adicionar Programa
          </Button>
        </Col>
        {filter && (
          <Col className="coluna-pesquisar">
            <Button variant="danger" onClick={() => setFilter(false)}>
              Todos aos programas
            </Button>
          </Col>
        )}
        <Col className="coluna-pesquisar">
          <Form
            className="coluna-pesquisar-formulario"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Control
              type="text"
              placeholder="Nome do Programa"
              //@ts-ignore
              name="nome"
              {...register("nome")}
            />
            <Button variant="success" type="submit">
              Pesquisar
            </Button>
          </Form>
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <div className="margin-tabela" style={{ width: "100%" }}>
          {filter === true
            ? renderProgramasFiltrados(programasNome)
            : renderProgramas(programas)}
        </div>
      </Row>
    </Container>
  );
}
