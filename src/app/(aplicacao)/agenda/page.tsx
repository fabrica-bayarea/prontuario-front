import React from 'react';
import Image from 'next/image';

import styles from "./style.module.css";

export default function Agenda(){
  return (
      <div className={styles.container}>

        <section className={styles.sectionApresentacao}>
          <h1>
            Verifique seus atendimentos agendados do <br/>
            <strong>dia, semana e mês</strong>
          </h1>
          <p>Gerencie eficientemente seus compromissos <br /> e consultas agendadas</p>
        </section>

          <Image src="/Illustracao-agenda.svg" alt="Menina segurando caderno" width={400} height={400} />

      </div>
  );
};