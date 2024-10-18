import { useState } from "react";
import style from "./style.module.css";
import Image from "next/image";
import HeaderTable from "@/components/HeaderTable/HeaderTable";

interface CourseAPI  {
  id: number;
  nome: string;
  descricao: string;
  coordenador: string;
  campus: string;
}

interface EventTableProps {
  events: CourseAPI [];
  onEdit: (program: CourseAPI  ) => void;
  onDelete: (id: number) => void;
  onView: (program: CourseAPI ) => void;
}

const TableCoursesAdmin: React.FC<EventTableProps> = ({ events, onEdit, onDelete, onView }) => {

  const [searchTerm, setSearchTerm] = useState<string>("");

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
              <th>Coordenador</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className={style.colummBody}>
            {filteredEvents.map(event => (
              <tr key={event.id}>
                <td className={style["name-column"]}>{event.nome}</td> 
                <td>{event.coordenador}</td>
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

export default TableCoursesAdmin;
