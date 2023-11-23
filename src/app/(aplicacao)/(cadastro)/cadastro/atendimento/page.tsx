"use client";

import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { BiSave } from "react-icons/bi";
import Image from "next/image";
import ImgAtendimentos from "./img/ImgAtendimentos.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../../../globals.css";
import { FaArrowLeft } from "react-icons/fa";
import {
  atendimentoDto,
  criarAtendimento,
} from "@/controllers/atendimentosController";
import { useAuth } from "@/state/authContext";

const devUrl = "http://localhost:3000/atendimentos";

const schema = yup.object().shape({
  data: yup.date().required("O campo data deve ser preenchido"),
  cpfBeneficiario: yup
    .string()
    .required("O campo CPF do beneficiário deve ser preenchido")
    .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "CPF inválido"),
  nomePrograma: yup
    .string()
    .required("O campo nome programa deve ser preenchido")
    .trim()
    .min(3, "O campo deve conter no mínimo 3 caracteres")
    .max(50, "O campo deve ter no máximo 50 caracteres"),
});

export default function CreateAtendimento() {
  const { accessToken } = useAuth();
  const router = useRouter();

  const headerConfig = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (form_data: any) => {
    console.log("Chega aqui");
    form_data = {
      data: form_data.data,
      cpfBeneficiario: form_data.cpfBeneficiario.toLowerCase(),
      nomePrograma: form_data.nomePrograma.toLowerCase(),
    };
    try {
      await criarAtendimento(devUrl, form_data, headerConfig);
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="container-margin">
      <Row>
        <Col md={1} className="item-col">
          <div className="cursor-router" onClick={() => router.back()}>
            <FaArrowLeft size={40} />
            <p>Voltar</p>
          </div>
        </Col>
        <Col className="mt-5 item-col">
          <Image
            src={ImgAtendimentos}
            alt="Picture of the author"
            width={500}
            height={500}
          />
          <Card.Text>
            Preencha o formulário ao lado para cadastrar um novo atendimento.
          </Card.Text>
        </Col>
        <Col className="item-col-form">
          <h3>Formulário de Cadastro de Atendimento</h3>
          <br />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="data">
              <Form.Label>Data do atendimento</Form.Label>
              <Form.Control
                type="date"
                //@ts-ignore
                name="data"
                placeholder="20/07/1993"
                {...register("data")}
              />
              <p style={{ color: "red" }}>{errors.data?.message}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="cpfBeneficiario">
              <Form.Label>CPF do beneficiário</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o CPF do beneficiário"
                // @ts-ignore
                name="cpfBeneficiario"
                {...register("cpfBeneficiario")}
              />
              <p style={{ color: "red" }}>{errors.cpfBeneficiario?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="nomePrograma">
              <Form.Label>Nome do Programa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do programa"
                // @ts-ignore
                name="nomePrograma"
                {...register("nomePrograma")}
              />
              <p style={{ color: "red" }}>{errors.nomePrograma?.message}</p>
            </Form.Group>

            <Button variant="danger" type="submit">
              <BiSave /> Salvar
            </Button>
            <Button variant="secondary" className="botao-cancelar">
              Cancelar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
