"use client";

import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { BiSave } from "react-icons/bi";
import Image from "next/image";
import ImgBeneficiario from "./img/ImgBeneficiario.svg";
import { useForm } from "react-hook-form";
import { signUpBeneficiario } from "@/controllers/signUpContoller";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaArrowLeft } from "react-icons/fa";

const devUrl = "http://localhost:3000/auth/signup/beneficiario";

const schema = yup.object().shape(
  {
    nome: yup
      .string()
      .required("O campo nome deve ser preenchido")
      .trim()
      .min(3, "O campo nome deve ter pelo menos 3 caracteres")
      .max(50, "O campo nome deve ter no máximo 50 caracteres"),
    cpf: yup
      .string()
      .required("O campo CPF deve ser preenchido")
      .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "CPF inválido"),
    email: yup
      .string()
      .required("O campo email deve ser preenchido")
      .matches(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i, "Email inválido"),
    telefone: yup
      .string()
      .required()
      .min(11, "Adicione o DDD da sua região. Ex: 61")
      .max(14, "O telefone deve ter até 14 caracteres. + Código do país e DDD"),
    senha: yup
      .string()
      .required("O campo senha deve ser preenchido")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&\.,;'`:])[A-Za-z\d@$!%*#?&\.,;'`:]{8,}$/,
        "A senha deve conter no mínimo 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e um caracter especial",
      ),
  },
  [["telefone", "telefone"]],
);

export default function SingupBeneficiario() {
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
      nome: form_data.nome,
      cpf: form_data.cpf,
      email: form_data.email,
      telefone: form_data.telefone,
      tipo: "BENEFICIARIO",
      senha: form_data.senha,
    };

    console.log(form_data);
    await signUpBeneficiario(devUrl, form_data)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
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
            src={ImgBeneficiario}
            alt="Picture of the author"
            width={500}
            height={500}
          />
          <Card.Text>
            Preencha o formulário ao lado para cadastrar um novo beneficiário.
          </Card.Text>
        </Col>
        <Col className="mt-5">
          <h3>Formulário de Cadastro do Usuário</h3>
          <br />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu nome completo"
                // @ts-ignore
                name="nome"
                {...register("nome")}
              />
              <p style={{ color: "red" }}>{errors.nome?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="cpf">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu CPF"
                // @ts-ignore
                name="cpf"
                {...register("cpf")}
              />
              <p style={{ color: "red" }}>{errors.cpf?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                //@ts-ignore
                name="email"
                placeholder="Email@email.com"
                {...register("email")}
              />
              <p style={{ color: "red" }}>{errors.email?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="telefone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="phone"
                //@ts-ignore
                name="telefone"
                placeholder="(00) 99999-9999"
                {...register("telefone")}
              />
              <p style={{ color: "red" }}>{errors.telefone?.message}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="senha">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                //@ts-ignore
                name="senha"
                type="password"
                placeholder="Senha"
                {...register("senha")}
              />
              <p style={{ color: "red" }}>{errors.senha?.message}</p>
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
