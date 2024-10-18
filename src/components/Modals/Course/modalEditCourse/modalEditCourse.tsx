import React, { useState, useEffect } from "react";
import styles from "./modalEditCourse.module.css";
import { api } from "@/services/api";

interface Curso {
  id: number;
  nome: string;
}

interface FormData {
  id?: number;
  nome: string;
  descricao: string;
  coordenador: string;
  campus: string;
}

interface ModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedProgram: FormData) => void;
  course: FormData | null;
}

const ModalEditCourse = ({ isOpen, onClose, onSubmit, course }: ModalEditProps) => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    descricao: "",
    coordenador: "",
    campus: ""
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
    if (course) {
      setFormData(course);
    }
  }, [course]);

  if (!isOpen || !course) return null;

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

    const updateProgram:  Omit<FormData, "id"> = {
      nome: formData.nome,
      descricao: formData.descricao,
      campus: formData.campus,
      coordenador: formData.coordenador
    };

    console.log("Dados enviados:", updateProgram);

    onSubmit(updateProgram);
 
     setFormData({
       nome: "",
       descricao: "",
       coordenador: "",
       campus: ""
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

          <label htmlFor="coordenador">Coordenador</label>
          <input
            type="text"
            id="coordenador"
            name="coordenador"
            value={formData.coordenador}
            onChange={handleChange}
            required
          />

          <label htmlFor="campus">Campus</label>
          <input
            type="text"
            id="campus"
            name="campus"
            value={formData.campus}
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

export default ModalEditCourse;
