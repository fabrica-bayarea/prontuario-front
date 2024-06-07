import React, { useState } from "react";
import styles from "./modalAddProgram.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, date: string, time: string) => void;
}

const Modal = ({ isOpen, onClose, onSubmit }: ModalProps) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (!isOpen) return null;

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
    if (onSubmit) {
      onSubmit(name, date, time);
    }
    setName("");
    setDate("");
    setTime("");
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setName("");
    setDate("");
    setTime("");
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button onClick={handleClose} className={styles.closeButton}>
          X
        </button>
        <h2>Adicionar novo Programa</h2>
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

export default Modal;
