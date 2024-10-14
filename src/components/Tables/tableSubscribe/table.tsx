import { useState } from "react";
import style from "./style.module.css";
import Image from "next/image";
import Modal from "../../Modal/modal";
import HeaderTable from "@/components/HeaderTable/HeaderTable";

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
}

interface EventTableProps {
  events: Event[];
}

const EventTable: React.FC<EventTableProps> = ({ events }) => {
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
          titulo="Programas sociais inscritos"
          placeholder="Pesquisar por nome"
          searchTerm={searchTerm}
          onSearchChange={(e)=>setSearchTerm(e.target.value)}
        />
        <table className={style.eventTable}>
          <thead>
            <tr className={style.colummTitulo}>
              <th>Nome</th>
              <th>Data do Evento</th>
              <th>Horário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className={style.colummBody}>
            {filteredEvents.map(event => (
              <tr key={event.id}>
                <td className={style["name-column"]}>{event.name}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td className={style["name-columnAncora"]}>
                  <a onClick={() => setOpen(!open)}>Ver Detalhes</a>
                  <Modal isOpen={open} setOpen={setOpen}/>
                  <Image src="/arrow.svg" alt="Logo" width={12} height={12} />
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
