import { useState } from "react";
import style from "./style.module.css";
import Image from "next/image";
import Modal from "@/components/Modal/modal";
import HeaderTable from "@/components/HeaderTable/HeaderTable";

interface Program {
  id: number;
  name: string;
  periodo: string;
  horario: string;
}

interface EventTableProps {
  events: Program[];
  onEdit: (program: Program ) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

const TableProgramsAdmin: React.FC<EventTableProps> = ({ events, onEdit, onDelete, onView }) => {
  const [subscribedEvents, setSubscribedEvents] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSubscribe = (eventId: number) => {
    if (!subscribedEvents.includes(eventId)) {
      setSubscribedEvents(prev => [...prev, eventId]);
    }
  };

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
                <td className={style["name-column"]}>{event.name}</td>
                <td>{event.periodo}</td>
                <td>{event.horario}</td>
                <td className={style["name-columnAncora"]}>
                    <div className ={style.containerActionsButton}>

                        <button className={style.actionButtonEdit}
                                onClick={() => onEdit({ id: event.id, name: event.name, periodo: event.periodo, horario: event.horario })}
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
