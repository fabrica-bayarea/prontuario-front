"use client";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Row, Table } from "react-bootstrap";
import { BiSearch, BiEdit, BiTrash } from "react-icons/bi";
import { AccordionAtendimentos } from "../../../../components/AccordionAtendimentos";
import { removerAtendimento } from "@/controllers/atendimentosController";
import { useAuth } from "@/state/authContext";
// import "./style.css";

interface atendimentoProps {
  atendimentoId: number;
  data: string;
  programa: string;
  programaId: number;
  beneficiarioId: number;
  beneficiario: string;
  beneficiarioEmail: string;
  beneficiarioTelefone: string;
  beneficiarioCpf: string;
}

function Formulario({
  atendimentoId,
  data,
  programa,
  programaId,
  beneficiarioId,
  beneficiario,
  beneficiarioEmail,
  beneficiarioTelefone,
  beneficiarioCpf,
}: atendimentoProps) {
  const [show, setShow] = useState<boolean>();
  const [deleted, setDeleted] = useState<boolean>(false);
  const { accessToken } = useAuth();

  const deleteConfig = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const deleteUrl = `${process.env.NEXT_PUBLIC_BASE_ATENDIMENTOS}/${atendimentoId}`;

  const handleShow = () => {
    setShow(!show);
  };

  const handleDelete = async () => {
    try {
      await removerAtendimento(deleteUrl, deleteConfig);
      setDeleted(true);
    } catch (error) {
      throw error;
    }
  };

  function formatarData(data: string) {
    const date = new Date(data);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  if (deleted) {
    return <p>Parece que você deletou este atendimento</p>;
  }

  const dataTratada = formatarData(data);

  return (
    <div style={{ width: "80%" }}>
      <Table
        striped
        bordered
        hover
        variant="danger"
        style={{ marginBottom: 0 }}
      >
        <thead>
          <tr>
            <th colSpan={1} style={{ width: "10%" }}>
              ID
            </th>
            <th colSpan={3} style={{ width: "35%" }}>
              Data
            </th>
            <th colSpan={3} style={{ width: "35%" }}>
              Programa
            </th>

            <th colSpan={3} style={{ width: "20%" }}>
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={1}>{atendimentoId}</td>
            <td colSpan={3}>{dataTratada}</td>
            <td colSpan={3}>
              ID: {programaId} - {programa}
            </td>
            <td colSpan={3} className="column-botao">
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
      <Row className="mb-4">
        <AccordionAtendimentos
          key={beneficiarioId}
          beneficiarioId={beneficiarioId}
          nome={beneficiario}
          email={beneficiarioEmail}
          telefone={beneficiarioTelefone}
          cpf={beneficiarioCpf}
        />
      </Row>
    </div>
  );
}
export default Formulario;
