"use client";

import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../globals.css";

import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { BiSave } from "react-icons/bi";
import Image from "next/image";
import ImgCurso from "./img/ImgCurso.svg";
import { useForm } from "react-hook-form";
import { signUpBeneficiario } from "@/controllers/signUpContoller";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaArrowLeft } from "react-icons/fa";
import { criarCurso } from "@/controllers/cursosController";
import { useAuth } from "@/state/authContext";

const devUrl = "http://localhost:3000/cursos";

const schema = yup.object().shape(
  {
    nome: yup
      .string()
      .required("O campo nome deve ser preenchido")
      .trim()
      .min(3, "O campo nome deve ter pelo menos 3 caracteres")
      .max(50, "O campo nome deve ter no máximo 50 caracteres"),
  },
  [],
);

export default function CadastroCursos() {
  const { accessToken } = useAuth();
  const headerConfig = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (form_data: any) => {
    form_data = {
      nome: form_data.nome.toLowerCase(),
    };

    try {
      await criarCurso(devUrl, form_data, headerConfig);
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
        <Col className="item-col">
          <Image
            src={ImgCurso}
            alt="Picture of the author"
            width={500}
            height={500}
          />
          <Card.Text>
            Preencha o formulário ao lado para cadastrar um novo curso.
          </Card.Text>
        </Col>
        <Col className="item-col-form">
          <h3>Formulário de Cadastro de Cursos</h3>
          <br />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome do curso</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do curso"
                // @ts-ignore
                name="nome"
                {...register("nome")}
              />
              <p style={{ color: "red" }}>{errors.nome?.message}</p>
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
