import React, { useEffect, useState } from "react";
import styles from "./modalAddProgram.module.css";
import { api } from "@/services/api";

interface Programa {
  id?: number;
  nome: string;
  descricao: string;
  curso: string;
  inicio: string;
  termino: string;
  horario: string;
  publicoAlvo: string;
}

interface Curso {
  id: number;
  nome: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (program: Omit<Programa, 'id'>) => Promise<void>;
}

const Modal = ({ isOpen, onClose, onSubmit }: ModalProps) => {
  const [formData, setFormData] = useState<Omit<Programa, 'id'>>({nome: "",
    descricao: "",
    curso: "",
    inicio: "",
    termino: "",
    horario: "",
    publicoAlvo: "",
  });

  const [cursos, setCursos] = useState<Curso[]>([]);
  
  useEffect(()=> {
    const fethCursos = async () => {
      try {
        const response = await api.get("/cursos");
        const data = response.data;
        setCursos(data);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    }

    fethCursos();
  }, []);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newProgram:  Omit<Programa, "id"> = {
      nome: formData.nome,
      descricao: formData.descricao,
      curso: formData.curso,
      inicio: new Date(formData.inicio).toISOString(),
      termino: new Date(formData.termino).toISOString(),
      horario: formData.horario,
      publicoAlvo: formData.publicoAlvo
    };

    console.log("Dados enviados:", newProgram);

   await onSubmit(newProgram);

    setFormData({
      nome: "",
      descricao: "",
      curso: "",
      inicio: "",
      termino: "",
      horario: "",
      publicoAlvo: "",
    });

    onClose();
  };

  const handleClose = () => {
    onClose();

    setFormData({
      nome: "",
      descricao: "",
      curso: "",
      inicio: "",
      termino: "",
      horario: "",
      publicoAlvo: "",
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <h2>Adicionar novo Programa</h2>
        <button onClick={handleClose} className={styles.closeButton}>
          X
        </button>
      </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>

          <label htmlFor="name">Nome</label>
          <input
            placeholder="Digite o nome do programa"
            type="text"
            id="name"
            name="nome" 
            value={formData.nome}
            onChange={handleChange}
            required
          />

          <label htmlFor="descricao">Descrição</label>
          <input
            placeholder="Digite a descrição do programa"
            type="text"
            id="descricao"
            name="descricao" 
            value={formData.descricao}
            onChange={handleChange}
            required
          />

          <label htmlFor="curso">Curso</label>
          <select
            id="curso"
            name="curso"
            value={formData.curso}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um curso</option>
            {cursos.map(curso => (
              <option key={curso.id} value={curso.nome}>
                {curso.nome}
              </option>
            ))}
          </select>

          <label htmlFor="inicio">Data de Início</label>
          <input
            type="date"
            id="inicio"
            name="inicio"
            value={formData.inicio}
            onChange={handleChange}
            required
          />

          <label htmlFor="termino">Data de Término</label>
          <input
            type="date"
            id="termino"
            name="termino"
            value={formData.termino}
            onChange={handleChange}
            required
          />

          <label htmlFor="horario">Horário</label>
          <input
            type="time"
            id="horario"
            name="horario"
            value={formData.horario}
            onChange={handleChange}
            required
          />

          <label htmlFor="publicoAlvo">Público Alvo</label>
          <input
            placeholder="Digite o público alvo do programa"
            type="text"
            id="publicoAlvo"
            name="publicoAlvo"
            value={formData.publicoAlvo}
            onChange={handleChange}
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
