"use client";
import { Accordion, Col, Row } from "react-bootstrap";

interface atendimentoProps {
  beneficiarioId: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
}
//TODO: #44 Implementar listagem de Cursos associados a programas @Kievv

export function AccordionAtendimentos({
  beneficiarioId,
  nome,
  email,
  telefone,
  cpf,
}: atendimentoProps) {
  return (
    <Accordion>
      <Accordion.Item eventKey={beneficiarioId.toString()}>
        <Accordion.Header>
          <Row style={{ width: "80%" }}>
            <Col>Beneficiário:</Col>
            <Col style={{ fontWeight: "bold" }}>{nome}</Col>
          </Row>
        </Accordion.Header>
        <Accordion.Body className="accordion-body">
          <p className="accordion-text-item">Telefone: {telefone}</p> -
          <p className="accordion-text-item">Email: {email}</p> -
          <p className="accordion-text-item">CPF: {cpf}</p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
