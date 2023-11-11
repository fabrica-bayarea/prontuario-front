"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Image, Col } from "react-bootstrap"
import './style.css'

export default function LoginUsuario() {
  return (
    <div className="centralizar-div">
      <h3>Prontuário de Atendimento</h3>
      <Form className='mt-5'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" placeholder="Insira seu e-mail" />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" placeholder="Insira sua senha" />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button  variant="dark" size="md">
            Entrar
          </Button>
        </div>
      </Form>

      <div className="d-grid gap-2 mt-5">
        <Button variant="outline-light margin-botao" size="md"> Sou Cadastrador</Button>
      </div>
    </div>
  )
}