import React, { useState, useEffect } from "react";
import styles from "./modalEditProgram.module.css";

interface ModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: number, name: string, date: string, time: string) => void;
  program: {
    id: number;
    nome: string;
    periodo: string;
    horario: string;
  } | null;
}

const ModalEdit = ({ isOpen, onClose, onSubmit, program }: ModalEditProps) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (program) {
      setName(program.nome);
      setDate(program.periodo);
      setTime(program.horario);
    }
  }, [program]);

  if (!isOpen || !program) return null;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(program.id, name, date, time);
    setName("");
    setDate("");
    setTime("");
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          X
        </button>
        <h2>Editar Programa</h2>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
          <label htmlFor="date">Período do evento</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
            required
          />
          <label htmlFor="time">Horário do evento</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={handleTimeChange}
            required
          />
          <button type="submit" className={styles.btnSave}>
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalEdit;
