import React, { useState, useEffect } from "react";
import styles from "./modalEditProgram.module.css";
import { api } from "@/services/api";

interface Curso {
  id: number;
  nome: string;
}

interface Program {
  id?: number;
  nome: string;
  descricao: string;
  curso: string;
  inicio: string;
  termino: string;
  horario: string;
  publicoAlvo: string;
}

interface ModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedProgram: Program) => void;
  program: Program | null;
}

const ModalEdit = ({ isOpen, onClose, onSubmit, program }: ModalEditProps) => {
  const [formData, setFormData] = useState<Program>({
    nome: "",
    descricao: "",
    curso: "",
    inicio: "",
    termino: "",
    publicoAlvo: "",
    horario: "",
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


  useEffect(() => {
    if (program) {
      setFormData(program);
    }
  }, [program]);

  if (!isOpen || !program) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updateProgram:  Omit<Program, "id"> = {
      nome: formData.nome,
      descricao: formData.descricao,
      curso: formData.curso,
      inicio: new Date(formData.inicio).toISOString().split("T")[0],
      termino: new Date(formData.termino).toISOString().split("T")[0],
      horario: formData.horario,
      publicoAlvo: formData.publicoAlvo
    };

    console.log("Dados enviados:", updateProgram);

    onSubmit(updateProgram);
 
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

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Editar Programa</h2>
          <button onClick={onClose} className={styles.closeButton}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />

          <label htmlFor="descricao">Descrição</label>
          <input
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

export default ModalEdit;
