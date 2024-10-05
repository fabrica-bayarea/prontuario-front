import { useState } from "react";
import style from "./style.module.css";
import Image from "next/image";
import Modal from "@/components/Modal/modal";
import HeaderTable from "@/components/HeaderTable/HeaderTable";

interface ProgramaAPI  {
  id: number;
  nome: string;
  horario: string;
  inicio: string; 
  termino: string;
  publicoAlvo: string;
  descricao: string;
  curso: string;
}

interface EventTableProps {
  events: ProgramaAPI [];
  onEdit: (program: ProgramaAPI  ) => void;
  onDelete: (id: number) => void;
  onView: (program: ProgramaAPI ) => void;
}

const TableProgramsAdmin: React.FC<EventTableProps> = ({ events, onEdit, onDelete, onView }) => {

  const [searchTerm, setSearchTerm] = useState<string>("");

    const formatPeriod = (inicio: string, termino: string) => {
        const startDate = new Date(inicio);
        const endDate = new Date(termino);
        return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    };

    const filteredEvents = events.filter(event =>{
        const name = event.nome || "";
        return name.toLowerCase().includes(searchTerm.toLowerCase());}
    );

  return (
    <div className={style.tableContainer}>
      <div className={style.envolveTable}>
        <HeaderTable
          titulo="Programas sociais cadastrados"
          placeholder="Pesquisar por nome"
          searchTerm={searchTerm}
          onSearchChange={(e)=>setSearchTerm(e.target.value)}
        />
        <table className={style.eventTable}>
          <thead>
            <tr className={style.colummTitulo}>
              <th>Nome</th>
              <th>Periodo do evento</th>
              <th>Horário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className={style.colummBody}>
            {filteredEvents.map(event => (
              <tr key={event.id}>
                <td className={style["name-column"]}>{event.nome}</td>
                <td>{formatPeriod(event.inicio, event.termino)}</td>
                <td>{event.horario}</td>
                <td className={style["name-columnAncora"]}>
                    <div className ={style.containerActionsButton}>

                        <button className={style.actionButtonEdit}
                                onClick={() => onEdit(event)}
                            >
                            <Image
                                src="/IconPencil.svg"
                                alt="Editar"
                                width={20}
                                height={20}
                            />
                        </button>

                        <button className={style.actionButtonDelete}
                                onClick={() => onDelete(event.id)}
                            >
                            <Image
                                src="/IconTrash.svg"
                                alt="Editar"
                                width={20}
                                height={20}
                            />
                        </button>

                        <button className={style.actionButtonView}
                               onClick={() => onView(event)}
                            >
                            <Image
                                src="/IconEye.svg"
                                alt="Editar"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableProgramsAdmin;
