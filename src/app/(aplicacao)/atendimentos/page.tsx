"use client";

import Formulario from "./components/FormularioAtendimentos";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../globals.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";
import { useAuth } from "@/state/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  filtarAtendimentoPorData,
  listarAtendimentos,
  removerAtendimento,
} from "@/controllers/atendimentosController";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const atendimentoUrl = `${process.env.NEXT_PUBLIC_BASE_ATENDIMENTOS}`;
const atendimentosPorDataURL = `${process.env.NEXT_PUBLIC_BASE_ATENDIMENTOS_BYDATE}`;

const schema = yup.object().shape({
  dataInicio: yup.date().required().typeError("Data inicial inválida"),
  dataFim: yup
    .date()
    .required()
    .typeError("Data final inválida")
    .when("dataInicio", (dataInicio, schema) => {
      return dataInicio
        ? schema.min(
            dataInicio,
            "A data final deve ser maior ou igual à data inicial",
          )
        : schema;
    }),
});

export default function Atendimentos() {
  const { accessToken } = useAuth();
  const [atendimentos, setAtendimentos] = useState<Array<object>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const headerConfig = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const filterConfig = {
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
    const form_data_tratada = {
      dataInicio: new Date(form_data.dataInicio).toISOString(),
      dataFim: new Date(form_data.dataFim).toISOString(),
    };

    try {
      await schema.validate(form_data, { abortEarly: false });

      const res = await filtarAtendimentoPorData(
        atendimentosPorDataURL,
        form_data_tratada,
        filterConfig,
      );
      console.log(res);
      setAtendimentos([...res?.data]);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    const listAtendimentos = async () => {
      try {
        const res = await listarAtendimentos(atendimentoUrl, headerConfig);

        setAtendimentos([...res?.data]);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    listAtendimentos();
  }, []);

  const renderAtendimentos = (atendimentos: any) => {
    if (loading) {
      return <p>Carregando...</p>;
    }

    if (atendimentos.length > 0) {
      return atendimentos.map((atendimento: any) => (
        <Formulario
          key={atendimento.atendimento.id}
          atendimentoId={atendimento.atendimento.id}
          data={atendimento.atendimento.data}
          programa={atendimento.atendimento.programa.nome}
          programaId={atendimento.atendimento.programa.id}
          beneficiarioId={atendimento.atendimento.beneficiario.id}
          beneficiario={atendimento.atendimento.beneficiario.nome}
          beneficiarioEmail={atendimento.atendimento.beneficiario.email}
          beneficiarioTelefone={atendimento.atendimento.beneficiario.telefone}
          beneficiarioCpf={atendimento.atendimento.beneficiario.cpf}
        />
      ));
    } else {
      return <h1>Nenhum atendimento cadastrado ainda</h1>;
    }
  };

  return (
    <Container className="centralizar-div">
      <Row className="mt-5 mb-5 fileira-cadastrar" style={{ width: "100%" }}>
        <h2>Seus Atendimentos Cadastrados</h2>
        <Row className="fileira-cadastrar ">
          <Col className="coluna-pesquisar">
            <Button
              className="mt-3"
              variant="success"
              onClick={() => router.push("/cadastro/atendimento")}
            >
              <BiAddToQueue /> Adicionar Atendimento
            </Button>
          </Col>
          <Col>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Row style={{ width: "70%" }}>
                <Form.Group className="" controlId="data">
                  <Form.Control
                    type="date"
                    //@ts-ignore
                    name="dataInicio"
                    placeholder="De:"
                    {...register("dataInicio")}
                  />
                  <p style={{ color: "red" }}>{errors.dataInicio?.message}</p>
                  <Form.Control
                    type="date"
                    //@ts-ignore
                    name="dataFim"
                    placeholder="De:"
                    {...register("dataFim")}
                  />
                  <p style={{ color: "red" }}>{errors.dataFim?.message}</p>
                </Form.Group>
              </Row>
              <Row style={{ width: "50%" }}>
                <Form.Group>
                  <Button
                    variant="success"
                    type="submit"
                    style={{ width: "100%" }}
                  >
                    Pesquisar
                  </Button>
                </Form.Group>
              </Row>
            </Form>
          </Col>
        </Row>
      </Row>
      <Row>
        <div className="margin-tabela">{renderAtendimentos(atendimentos)}</div>
      </Row>
    </Container>
  );
}
