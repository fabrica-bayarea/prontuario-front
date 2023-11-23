"use client";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Row, Table } from "react-bootstrap";
import { BiSearch, BiEdit, BiTrash } from "react-icons/bi";
import { AcordionProgramas } from "./AcordionProgramas";
// import "./style.css";

interface cursoProps {
  cursoId: number;
  nome: string;
  programas: Array<object>;
}

function Formulario({ cursoId, nome, programas }: cursoProps) {
  const [show, setShow] = useState<boolean>();

  const handleShow = () => {
    setShow(!show);
  };
  const renderProgramas = (programas: any) => {
    if (programas.length === 0 && show === true) {
      return <p>Nenhum programa cadastrado</p>;
    } else if (programas.length > 0 && show === true) {
      console.log(programas);
      return programas.map((programa: { id: number; nome: string }) => (
        <AcordionProgramas
          key={programa.id}
          programaId={programa.id}
          nome={programa.nome}
          curso={nome}
          cursoId={cursoId}
        />
      ));
    }
  };

  return (
    <div style={{ width: "60%" }}>
      <Table striped bordered hover variant="danger">
        <thead>
          <tr>
            <th colSpan={1} style={{ width: "10%" }}>
              ID
            </th>
            <th colSpan={3} style={{ width: "30%" }}>
              Curso
            </th>
            <th colSpan={3} style={{ width: "60%" }}>
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={1}>{cursoId}</td>
            <td colSpan={3}>{nome}</td>
            <td colSpan={3} className="column-botao">
              <Button
                variant="success"
                className="margin-botao"
                onClick={handleShow}
              >
                <BiSearch /> Ver Programas
              </Button>
              <Button variant="secondary" className="margin-botao">
                <BiEdit /> Editar
              </Button>
              <Button variant="danger" className="margin-botao">
                <BiTrash /> Deletar
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <Row className="mt-4 mb-4">{renderProgramas(programas)}</Row>
    </div>
  );
}
export default Formulario;
