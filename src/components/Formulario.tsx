import { Button, Table } from "react-bootstrap";
import { BiSearch, BiEdit, BiTrash } from "react-icons/bi";
import "./style.css";

function Formulario() {
  return (
    <div style={{ width: "60%" }}>
      <Table striped bordered hover variant="danger">
        <thead>
          <tr>
            <th>ID</th>
            <th>Curso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>Analise e Desenvolvimento de Sistemas</td>
            <td>
              <Button variant="success" className="margin-botao">
                <BiSearch /> Ver Programas
              </Button>
              <Button variant="secondary" className="margin-botao">
                {" "}
                <BiEdit /> Editar
              </Button>
              <Button variant="danger" className="margin-botao">
                {" "}
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
