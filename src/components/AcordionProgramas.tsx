"use client";
import { Accordion } from "react-bootstrap";

interface programaProps {
  programaId: number;
  nome: string;
  curso: string;
  cursoId: number;
}

export function AcordionProgramas({
  programaId,
  nome,
  curso,
  cursoId,
}: programaProps) {
  return (
    <Accordion>
      <Accordion.Item eventKey={programaId.toString()}>
        <Accordion.Header>
          ID: {programaId} - {nome}
        </Accordion.Header>
        <Accordion.Body className="accordion-body">
          <h6 className="accordion-text-item">{curso}</h6> -{" "}
          <p className="accordion-text-item">ID: {cursoId}</p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
