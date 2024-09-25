"use client";
import TablesCourses from "@/components/Tables/TableCourses/tablesCourses";
import styles from "./styleCursos.module.css";
import Image from "next/image";

const eventos = [
  { id: 1, name: 'Ciência da Computação', status: true },
  { id: 2, name: 'Arquitetura e Urbanismo', status: false },
  { id: 3, name: 'Engenharia Civil', status: true },
  { id: 4, name: "Comunicação Social", status: false }
];

export default function Cursos() {
  return (
    <>
      <div className={styles.container}>
        <section className={styles.sectionApresentacao}>
          <h1>
            Cursos disponiveis para <br /><strong>agendamento</strong>
          </h1>
          <p>Selecione o curso para o agendamento. Em seguida,
          voçê irá ser redirecionado para o agendamento</p>
        </section>

        <Image
          src="/Illustracao_Agenda.svg"
          alt="Logo"
          width={400}
          height={400}
        />
      </div>
      
      <section>
        <TablesCourses events = {eventos}/>
      </section>
    </>
  );
}
