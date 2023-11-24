import { removerPrograma } from "@/controllers/programasController";
import { useAuth } from "@/state/authContext";
import { useState } from "react";
import { Button, Row, Table } from "react-bootstrap";
import { BiSearch, BiEdit, BiTrash } from "react-icons/bi";
import { AccordionProgramaPage } from "./AccordionProgramaPage";
// import "./style.css";

interface programaProps {
  programaId: number;
  nome: string;
  cursos: Array<object>;
  atendimentos: Array<object>;
}

function Formulario({ programaId, nome, cursos }: programaProps) {
  const [show, setShow] = useState<boolean>();
  const [deleted, setDeleted] = useState<boolean>(false);
  const { accessToken } = useAuth();

  const deleteUrl = `${process.env.NEXT_PUBLIC_BASE_PROGRAMAS}/${programaId}`;
  const deleteConfig = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const handleDelete = async () => {
    try {
      await removerPrograma(deleteUrl, deleteConfig);
    } catch (error) {
      throw error;
    }
  };

  const handleShow = () => {
    setShow(!show);
  };
  if (deleted) {
    return <p>Parece que você deletou este Programa</p>;
  }

  const renderCursos = (cursos: any) => {
    if (cursos.length === 0 && show === true) {
      return <p>Nenhum curso cadastrado</p>;
    } else if (cursos.length > 0 && show === true) {
      console.log(cursos);
      return cursos.map((curso: { id: number; nome: string }) => (
        <AccordionProgramaPage
          key={curso.id}
          curso={curso.nome}
          cursoId={curso.id}
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
              Programa
            </th>
            <th colSpan={3} style={{ width: "60%" }}>
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={1}>{programaId}</td>
            <td colSpan={3}>{nome}</td>
            <td colSpan={3} className="column-botao-programas">
              <Button
                variant="success"
                className="margin-botao"
                onClick={handleShow}
              >
                <BiSearch /> Ver Cursos
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
      <Row className="mt-4 mb-4">{renderCursos(cursos)}</Row>
    </div>
  );
}
export default Formulario;
