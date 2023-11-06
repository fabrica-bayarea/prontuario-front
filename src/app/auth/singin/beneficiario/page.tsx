"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Image, Col } from "react-bootstrap"
import './style.css'

export default function Login() {
  return (
    <div className="centralizar-div">
      <h3>Prontuário de Atendimento</h3>
      <p className="subtitulo">Página do Cadastrador de Atendimentos IESB</p>
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
          <Button variant="dark" size="md">
            Entrar
          </Button>
        </div>
      </Form>
    </div>
  )
}