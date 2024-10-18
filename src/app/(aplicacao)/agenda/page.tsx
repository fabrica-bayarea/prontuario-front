import React from 'react';
import Image from 'next/image';

import styles from "./style.module.css";
import Calendar from '@/components/Calendar/Calendar';

export default function Agenda(){
  return (
      <div className={styles.container}>

        <section className={styles.sectionApresentacao}>
          <div className={styles.containerApresentação}>
            <h1>
              Verifique seus atendimentos agendados do 
              <strong> dia, semana e mês</strong>
            </h1>
            <p>Gerencie eficientemente seus compromissos <br /> e consultas agendadas</p>
          </div>

          <Image 
            src="/Illustracao-agenda.svg" alt="Menina segurando caderno" width={400} 
            height={400}
           />

        </section>

        <section className={styles.sectionCalendar}>
          <Calendar />
        </section>
      </div>
  );
};