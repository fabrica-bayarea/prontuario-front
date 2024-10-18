import React, { useState, useEffect } from "react";
import styles from "./modalEditProgram.module.css";
import { api } from "@/services/api";

interface Curso {
  id: number;
  nome: string;
}

interface FormData {
  id?: number;
  nome: string;
  descricao: string;
  curso: string;
  publico_alvo: string;
}

interface FormPeriodo {
  data_inicio: string;
  data_fim: string;
  horario_inicio: string;
  horario_fim: string;
  dias_da_semana: string[];
}

interface ModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedProgram: FormData) => void;
  program: FormData | null;
}

const ModalEdit = ({ isOpen, onClose, onSubmit, program }: ModalEditProps) => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    descricao: "",
    curso: "",
    publico_alvo: "",
  });

  const [formPeriodo, setFormPeriodo] = useState<FormPeriodo>({
    data_inicio: "",
    data_fim: "",
    horario_inicio: "",
    horario_fim: "",
    dias_da_semana: [],
  })

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

    setFormPeriodo({
      ...formPeriodo,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updateProgram:  Omit<FormData, "id"> = {
      nome: formData.nome,
      descricao: formData.descricao,
      curso: formData.curso,
      publico_alvo: formData.publico_alvo
    };

    console.log("Dados enviados:", updateProgram);

    onSubmit(updateProgram);
 
     setFormData({
       nome: "",
       descricao: "",
       curso: "",
       publico_alvo: "",
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

          <label htmlFor="publicoAlvo">Público Alvo</label>
          <input
            type="text"
            id="publico_alvo"
            name="publico_alvo"
            value={formData.publico_alvo}
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
