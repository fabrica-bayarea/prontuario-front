"use client";

import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { BiSave } from "react-icons/bi";
import Image from "next/image";
import ImgUsuario from "./img/ImgUsuario.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUpUsuario } from "@/controllers/signUpContoller";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// TODO: #24 Criar lógica para funcionamento correto do formulário com React Hook Form @Kievv
// TODO: #25 Criar contexto para salvar informações do usuário e envolver aplicação com contexto @Kievv

const devUrl = "http://localhost:3000/auth/signup/usuario";

const schema = yup.object().shape(
  {
    nome: yup
      .string()
      .required("O campo nome deve ser preenchido")
      .trim()
      .min(3, "O campo nome deve ter pelo menos 3 caracteres")
      .max(50, "O campo nome deve ter no máximo 50 caracteres"),
    email: yup
      .string()
      .required("O campo email deve ser preenchido")
      .matches(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i, "Email inválido"),
    telefone: yup
      .string()
      .nullable()
      .notRequired()
      .when("telefone", val => {
        if ((val.length = 0)) {
          return yup
            .string()
            .min(11, "Adicione o DDD da sua região. Ex: 61")
            .max(
              14,
              "O telefone deve ter até 14 caracteres. + Código do país e DDD",
            );
        } else {
          return yup.string().notRequired();
        }
      }),
    tipo: yup.string(),
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

export default function SingupUsuario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (form_data: any) => {
    const telefoneTratado =
      form_data.telefone === "" ? null : form_data.telefone;
    form_data = {
      nome: form_data.nome,
      email: form_data.email,
      telefone: telefoneTratado,
      tipo: form_data.tipo,
      senha: form_data.senha,
    };
    await signUpUsuario(devUrl, form_data)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <div>
          <Container>
            <Row>
              <Col className="mt-5">
                <Image
                  src={ImgUsuario}
                  alt="Picture of the author"
                  width={500}
                  height={500}
                />
                <Card.Text>
                  Preencha o formulário ao lado para cadastrar um novo usuário{" "}
                  <br />
                  administrador ou cadastrador no sistema de Prontuário de
                  Atendimento IESB.
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
                  <Form.Group className="mb-3">
                    <Form.Label>Tipo</Form.Label>
                    {/* @ts-ignore */}
                    <Form.Select name="tipo" {...register("tipo")}>
                      <option>CADASTRADOR</option>
                      <option>ADMINISTRADOR</option>
                    </Form.Select>
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
        </div>
      </div>
    </div>
  );
}
