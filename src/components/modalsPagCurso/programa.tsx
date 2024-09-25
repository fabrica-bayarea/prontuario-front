import React from "react";
import styles from "../../../src/app/(aplicacao)/(cadastro)/cadastro/cadastro-curso/page.module.css";

interface ProgramaProps {
  nome: string;
  periodo: string;
  horario: string;
  onDelete: () => void;
  onEdit: () => void;
}

const Programa = ({
  nome,
  periodo,
  horario,
  onDelete,
  onEdit,
}: ProgramaProps) => {
  return (
    <li>
      <div className={styles.programInfo}>
        <p className={styles.programName}>{nome}</p>
        <p className={styles.programPeriod}>{periodo}</p>
        <p className={styles.programTime}>{horario}</p>
        <div className={styles.divBtn}>
          <button className={styles.btnEdit} onClick={onEdit}></button>
          <button className={styles.btnDelete} onClick={onDelete}></button>
          <button className={styles.btnView}></button>
        </div>
      </div>
    </li>
  );
};

export default Programa;
