"use client";

import "bootstrap/dist/css/bootstrap.min.css";
// import "./styles.css";

import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { BiSave } from "react-icons/bi";
import Image from "next/image";
import ImgProgramas from "./img/ImgProgramas.svg";
import { useForm } from "react-hook-form";
import { signUpBeneficiario } from "@/controllers/signUpContoller";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "@/state/authContext";
import { criarPrograma } from "@/controllers/programasController";

const devUrl = "http://localhost:3000/programas";

const schema = yup.object().shape({
  nome: yup.string().required("O campo nome deve ser preenchido").trim(),
  curso: yup
    .string()
    .required("O campo curso deve ser preenchido")
    .trim()
    .min(3, "O campo deve conter no mínimo 3 caracteres"),
});

export default function CadastroPrograma() {
  const router = useRouter();
  const { accessToken } = useAuth();

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
    try {
      await criarPrograma(devUrl, form_data, headerConfig);
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="container-margin">
      <Row>
        <Col md={1} className="arrow-col">
          <div className="cursor-router" onClick={() => router.back()}>
            <FaArrowLeft size={40} />
            <p>Voltar</p>
          </div>
        </Col>
        <Col className="mt-5">
          <Image
            src={ImgProgramas}
            alt="Picture of the author"
            width={500}
            height={500}
          />
          <Card.Text>
            Preencha o formulário ao lado para cadastrar um novo programa
            social.
          </Card.Text>
        </Col>
        <Col className="mt-5">
          <h3>Formulário de Cadastro de Programas</h3>
          <br />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="data">
              <Form.Label>Nome do Programa</Form.Label>
              <Form.Control
                type="text"
                //@ts-ignore
                name="nome"
                placeholder="Digite o nome do programa"
                {...register("nome")}
              />
              <p style={{ color: "red" }}>{errors.nome?.message}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Curso">
              <Form.Label>Nome do Curso</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do curso"
                // @ts-ignore
                name="curso"
                {...register("curso")}
              />
              <p style={{ color: "red" }}>{errors.curso?.message}</p>
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
