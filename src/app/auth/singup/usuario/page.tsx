"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import Menu from '@/components/Menu';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export default function SingupUsuario() {
    return (
        <div>
            <div>
                <Menu />
                <div>
                    <Container>
                        <Row>
                            <Col className='mt-5'>

                            </Col>
                            <Col className='mt-5'>
                                <h2>Formulário de Cadastro do Usuário</h2>
                                <br />
                                <Form>
                                    <Form.Group className="mb-3" controlId="nome">
                                        <Form.Label>Nome Completo</Form.Label>
                                        <Form.Control type="text" placeholder="Digite seu nome completo" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="Email">
                                        <Form.Label>E-mail</Form.Label>
                                        <Form.Control type="email" placeholder="Email@email.com" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="cpf">
                                        <Form.Label>Telefone</Form.Label>
                                        <Form.Control type="phone" placeholder="(00) 99999-9999" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Tipo</Form.Label>
                                        <Form.Select>
                                            <option>Cadastrador</option>
                                            <option>Administrador</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="senha">
                                        <Form.Label>Senha</Form.Label>
                                        <Form.Control type="password" placeholder="Senha" />
                                    </Form.Group>
                                    <Button variant="danger" type="submit">Salvar</Button>
                                    <Button variant="secondary" className='botao-cancelar'>Cancelar</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    )
}