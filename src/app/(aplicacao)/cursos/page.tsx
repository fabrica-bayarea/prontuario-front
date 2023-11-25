"use client";

import Formulario from "./components/FormularioCursos";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../globals.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";
import { useAuth } from "@/state/authContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  filtrarCursoPorNome,
  listarCursos,
} from "@/controllers/cursosController";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const cursoUrl = `${process.env.NEXT_PUBLIC_BASE_CURSO}`;
const cursoPorNomeURL = `${process.env.NEXT_PUBLIC_CURSO_PESQUISAR}`;

const schema = yup.object().shape({
  nome: yup
    .string()
    .trim()
    .required("Para pesquisar, é necessário preencher este campo")
    .min(3, "A pesquisa deve conter ao menos 3 caracteres"),
});

export default function Cursos() {
  const { accessToken } = useAuth();
  const [cursos, setCursos] = useState<any>([]);
  const [cursosNome, setCursosNome] = useState<any>([]);
  const [filter, setFilter] = useState<boolean>(false);
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
      const res = await filtrarCursoPorNome(
        cursoPorNomeURL,
        form_data.nome,
        headerConfigSearch,
      );
      if (res) {
        setFilter(true);
        setCursosNome([...res.data]);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleClickFilter = () => {
    setFilter(false);
  };

  React.useEffect(() => {
    const listCursos = async () => {
      try {
        const res = await listarCursos(cursoUrl, headerConfig);
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

    const cursosToRender = filter
      ? cursos.filter((curso: any) =>
          cursosNome.some((item: any) => item.id === curso.id),
        )
      : cursos;

    if (cursosToRender) {
      if (cursosToRender.length > 0) {
        return cursosToRender.map((curso: any) => (
          <Formulario
            key={curso.id}
            cursoId={curso.id}
            nome={curso.nome}
            programas={curso.programas || []}
          />
        ));
      } else {
        return <h1>Nenhum curso cadastrado ainda</h1>;
      }
    } else {
      return <h1>Nenhum curso cadastrado ainda</h1>;
    }
  };

  return (
    <Container className="centralizar-div-programas">
      <Row
        className="mt-5 mb-5 fileira-cadastrar"
        style={{ width: "60%", textAlign: "center" }}
      >
        <h2>Cursos Cadastrados</h2>
      </Row>
      <Row
        className="fileira-cadastrar botao-cadastrar"
        style={{ width: "100%" }}
      >
        <Col className="coluna-pesquisar">
          <Button
            className="mt-3"
            variant="success"
            onClick={() => router.push("/cadastro/curso")}
          >
            <BiAddToQueue /> Adicionar Curso
          </Button>
        </Col>
        {filter && (
          <Col className="coluna-pesquisar">
            <Button variant="danger" onClick={handleClickFilter}>
              Todos os cursos
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
              placeholder="Nome do Curso"
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
        <div className="margin-tabela">{renderCursos(cursos)}</div>
      </Row>
    </Container>
  );
}
