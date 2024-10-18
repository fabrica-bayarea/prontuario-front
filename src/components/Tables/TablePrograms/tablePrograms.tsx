import React, { useState } from "react";
import styles from "./style.module.css";
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
}

const EventTablePrograms: React.FC<EventTableProps> = ({ events }) => {
  const [subscribedEvents, setSubscribedEvents] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredEvents = events.filter(event =>
    event.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSubscribe = (eventId: number) => {
    if (!subscribedEvents.includes(eventId)) {
      setSubscribedEvents(prev => [...prev, eventId]);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.envolveTable}>
        <HeaderTable 
          titulo="Programas Sociais Disponiveis"
          placeholder="Pesquise por Programas"
          searchTerm={searchTerm}
          onSearchChange={(e)=>setSearchTerm(e.target.value)}
        />
        <table className={styles.eventTable}>
          <thead>
            <tr className={styles.colummTitulo}>
              <th>Nome</th>
              <th>Periodo do evento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className={styles.colummBody}>
            {filteredEvents.map(event => (
              <tr key={event.id}>
                <td>{event.nome}</td>
                <td>{event.inicio + "-" + event.termino}</td>
                <td>
                  <button
                    className={`${styles.buttonSubscribe} ${
                      subscribedEvents.includes(event.id)
                        ? styles.subscribed
                        : ""
                    }`}
                    onClick={() => handleSubscribe(event.id)}
                  >
                    {subscribedEvents.includes(event.id)
                      ? "Já se inscreveu"
                      : "Inscreva-se"}
                    <Image
                      src="/Icon_pencil.svg"
                      alt="Subscribe Icon"
                      width={24}
                      height={24}
                      className={styles.subscribeIcon}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventTablePrograms;