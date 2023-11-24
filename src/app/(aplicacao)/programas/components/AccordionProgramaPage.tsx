"use client";
import { Accordion } from "react-bootstrap";

interface programaProps {
  curso: string;
  cursoId: number;
}
//TODO: #44 Implementar listagem de Cursos associados a programas @Kievv

export function AccordionProgramaPage({ curso, cursoId }: programaProps) {
  return (
    <Accordion>
      <Accordion.Item eventKey={cursoId.toString()}>
        <Accordion.Header>
          ID: {cursoId} - {curso}
        </Accordion.Header>
        <Accordion.Body className="accordion-body">
          <h6 className="accordion-text-item">{curso}</h6> -{" "}
          <p className="accordion-text-item">ID: {cursoId}</p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
