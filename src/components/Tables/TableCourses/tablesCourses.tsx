import { useState } from "react";
import styles from "./style.module.css";
import HeaderTable from "@/components/HeaderTable/HeaderTable";

interface Event {
  id: number;
  name: string;
  status: boolean;
}

interface EventSearchProps {
  events: Event[];
}

export default function TablesCourses({ events }: EventSearchProps) {   
    const [searchTerm, setsearchTerm] = useState<string>("");
    
    const filteredEvents = events.filter(
        event => event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className={styles.tableContainer}>

      <div className={styles.envolveTable}>

        <HeaderTable
            titulo="Cursos"
            placeholder="Pesquise por Cursos"
            searchTerm={searchTerm}
            onSearchChange={(e)=>setsearchTerm(e.target.value)}
        />

        <table className={styles.eventTable}>
          <thead>
            <tr className={styles.colummTitulo}>
              <th>Nome</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody className={styles.colummBody}>
            {filteredEvents.map(event => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>
                  {event.status ? (
                    <span className={styles.disponivel}>Disponível</span>
                  ) : (
                    <span className={styles.indisponivel}>Indisponível</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}
