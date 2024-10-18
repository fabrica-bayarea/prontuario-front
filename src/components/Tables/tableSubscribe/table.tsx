import { useState } from "react";
import style from "./style.module.css";
import Image from "next/image";
import HeaderTable from "@/components/HeaderTable/HeaderTable";

interface Event  {
  id: number;
  nome: string;
  descricao: string;
  cursos?: {
    id: number;
    nome: string;
    coordenador: string;
    turno: string;
  }[];
  inicio: string; 
  termino: string;
  horario: string;
  publico_alvo: string;
}

interface EventTableProps {
  events: Event[];
  onView: (event: Event) => void;
}

const EventTable: React.FC<EventTableProps> = ({ events, onView}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredEvents = events.filter(event =>
    event.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={style.tableContainer}>
      <div className={style.envolveTable}>
        <HeaderTable
          titulo="Programas sociais inscritos"
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
                <td>{event.inicio + "-" + event.termino}</td>
                <td>{event.horario}</td>
                <td className={style["name-columnAncora"]}>
                <div className ={style.containerActionsButton}>
                  <button 
                    onClick ={()=> onView(event)} 
                    className ={style.actionButtonView}
                  >
                    <Image 
                      src="/IconEye.svg"
                      alt="Visualizar"
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

export default EventTable;
