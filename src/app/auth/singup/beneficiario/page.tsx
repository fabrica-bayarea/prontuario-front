"use client"

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import Menu from '@/components/Menu';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { BiSave } from 'react-icons/bi';
import ImgBeneficiario from './img/ImgBeneficiario.svg'
import Image from 'next/image';

export default function SingupBeneficiario() {
    return (
        <div>
            <div>
                <Menu />
                <div>
                    <Container>
                        <Row>
                            <Col className='mt-5'>
                                <Image
                                    src={ImgBeneficiario}
                                    alt="Picture of the author"
                                    width={500}
                                    height={500}
                                />
                                <Card.Text>
                                    Preencha o formulário ao lado para cadastrar um novo beneficiário <br />
                                    no sistema de Prontuário de Atendimento IESB.
                                </Card.Text>
                            </Col>
                            <Col className='mt-5'>
                                <h3>Formulário de Cadastro do Beneficiario</h3>
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
                                    <Button variant="danger" type="submit"> <BiSave /> Salvar</Button>
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