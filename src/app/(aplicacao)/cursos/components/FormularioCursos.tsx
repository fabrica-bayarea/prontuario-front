"use client";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Row, Table } from "react-bootstrap";
import { BiSearch, BiEdit, BiTrash } from "react-icons/bi";
import { AccordionCursoPage } from "./AccordionCursoPage";
import { useAuth } from "@/state/authContext";
import { removerCurso } from "@/controllers/cursosController";
// import "./style.css";

interface cursoProps {
  cursoId: number;
  nome: string;
  programas: Array<object>;
}

function Formulario({ cursoId, nome, programas }: cursoProps) {
  const [show, setShow] = useState<boolean>();
  const [deleted, setDeleted] = useState<boolean>(false);
  const { accessToken } = useAuth();

  const deleteUrl = `${process.env.NEXT_PUBLIC_BASE_CURSO}/${cursoId}`;
  const deleteConfig = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const handleShow = () => {
    setShow(!show);
  };

  const handleDelete = async () => {
    try {
      await removerCurso(deleteUrl, deleteConfig);
      setDeleted(true);
    } catch (error) {
      throw error;
    }
  };

  if (deleted) {
    return <p>Parece que você deletou este curso</p>;
  }

  const renderProgramas = (programas: any) => {
    if (programas) {
      if (programas.length === 0 && show === true) {
        return <p>Nenhum programa cadastrado</p>;
      } else if (programas.length > 0 && show === true) {
        return programas.map((programa: { id: number; nome: string }) => (
          <AccordionCursoPage
            key={programa.id}
            programaId={programa.id}
            nome={programa.nome}
            curso={nome}
            cursoId={cursoId}
          />
        ));
      }
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
              <Button
                variant="danger"
                className="margin-botao"
                onClick={handleDelete}
              >
                <BiTrash /> Deletar
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      {programas !== undefined && (
        <Row className="mt-4 mb-4">{renderProgramas(programas)}</Row>
      )}
    </div>
  );
}

export default Formulario;
