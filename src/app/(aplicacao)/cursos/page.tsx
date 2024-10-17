"use client";
import TablesCourses from "@/components/Tables/TableCourses/tablesCourses";
import styles from "./styleCursos.module.css";
import Image from "next/image";
import { useRequireAuth } from "@/hooks/useRequireAuth/useRequireAuth";


const eventos = [
  { id: 1, name: 'Ciência da Computação', status: true },
  { id: 2, name: 'Arquitetura e Urbanismo', status: false },
  { id: 3, name: 'Engenharia Civil', status: true },
  { id: 4, name: "Comunicação Social", status: false }
];

export default function Cursos() {
  useRequireAuth();
  
  return (
    <main className={styles.container}>
      <section className={styles.sectionApresentacao}>
        <div className={styles.containerApresentacao}>
          <h1>
            Cursos disponiveis para <br /><strong>agendamento</strong>
          </h1>
          <p>Selecione o curso para o agendamento. Em seguida,
          voçê irá ser redirecionado para o agendamento</p>
        </div>

        <Image
          src="/Illustracao_Agenda.svg"
          alt="Logo"
          width={400}
          height={400}
        />
      </section>
      
      <section>
        <TablesCourses events = {eventos}/>
      </section>
    </main>
  );
}
