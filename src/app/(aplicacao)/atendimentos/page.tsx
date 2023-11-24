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
  listarAtendimentos,
  removerAtendimento,
} from "@/controllers/atendimentosController";
import React from "react";

const devUrl = "http://localhost:3000/atendimentos";

export default function Atendimentos() {
  const { accessToken } = useAuth();
  const [atendimentos, setAtendimentos] = useState<Array<object>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const headerConfig = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  React.useEffect(() => {
    const listAtendimentos = async () => {
      try {
        const res = await listarAtendimentos(devUrl, headerConfig);
        // console.log(res?.data);
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
      <Row className="mt-5 mb-5 fileira-cadastrar">
        <h2>Seus Atendimentos Cadastrados</h2>
        <Row className="fileira-cadastrar botao-cadastrar">
          <Button
            className="mt-3"
            variant="success"
            onClick={() => router.push("/cadastro/atendimento")}
          >
            <BiAddToQueue /> Adicionar Atendimento
          </Button>
        </Row>
      </Row>
      <Row>
        <div className="margin-tabela">{renderAtendimentos(atendimentos)}</div>
      </Row>
    </Container>
  );
}
