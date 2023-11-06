"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import Menu from '@/components/Menu';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';


export default function SingupBeneficiario() {
    return (
        <div>
            <div>
                <Menu />
                <div>
                    <Container>
                        <Row>
                            <Col className='mt-5'>
                            <Image src="img/ImgBeneficiario.png" fluid />
                            </Col>
                            <Col className='mt-5'>
                                <h2>Formulário de Cadastro do Beneficiario</h2>
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
                                        <Form.Label>CPF</Form.Label>
                                        <Form.Control type="number" placeholder="000.000.000-00" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Tipo</Form.Label>
                                        <Form.Select>
                                            <option>Beneficiário</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="senha">
                                        <Form.Label>Senha</Form.Label>
                                        <Form.Control type="password" placeholder="Password" />
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