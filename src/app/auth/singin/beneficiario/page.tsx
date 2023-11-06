"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Image, Col } from "react-bootstrap"
import './style.css'

export default function Login() {
  return (
    <div>
      <div className="centralizar">
        <Col>
          <Image src="img/logo-iesb.png" thumbnail />
          <h2>Printuario Eletrônico</h2>
        </Col>
        <Col xs={6}>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Nome do usuário</Form.Label>
              <Form.Control type="email" placeholder="E-mail ou CPF" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Insira a senha..." />
            </Form.Group>
            <Button variant="secondary" type="submit">
              Entrar
            </Button>
          </Form>
        </Col>
      </div>
    </div>
  )
}