import { Button, Table } from "react-bootstrap";
import { BiSearch, BiEdit, BiTrash } from "react-icons/bi";
// import "./style.css";

interface programaProps {
  programaId: number;
  nome: string;
  cursos: Array<object>;
  atendimentos: Array<object>;
}

function Formulario({ programaId, nome }: programaProps) {
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
              <Button variant="success" className="margin-botao">
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
    </div>
  );
}
export default Formulario;
