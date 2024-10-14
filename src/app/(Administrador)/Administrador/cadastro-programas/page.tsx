"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Curso {
  nome: string;
}

export default function Home() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    curso: "",
    inicio: "",
    termino: "",
    horario: "",
    publicoAlvo: "",
  })
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  if (!isMounted) return null;

  const handleAddCourse = (event: React.ChangeEvent<HTMLSelectElement>)=> {
    const selectedCourse = event.target.value;
    if (selectedCourse && !selectedCourses.includes(selectedCourse)) {
      setSelectedCourses([...selectedCourses, selectedCourse]);
    }
  };

  const handleRemoveCourse = (courseToRemove: any) => {
    setSelectedCourses(
      selectedCourses.filter((course) => course !== courseToRemove)
    );
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = {
        ...formData,
      inicio: new Date(formData.inicio).toISOString(),
      termino: new Date(formData.termino).toISOString(), 
      curso: selectedCourses[0], 
    };

    try {
      await api.post("/programas", data);
      toast.success("Programa cadastrado com sucesso!");
      router.push("/Administrador/dashboard");
    } catch (error:any) {
     if (error.response) {
        toast.error(
          "Erro ao cadastrar programa: " + error.response.data.message,
        );
      }
    }
  };

  return (
    <>
      <main className={styles.main}>
        <section className={styles.left}>
          <button onClick={()=> router.back()}>
            <Image
              src="/arrow-left.svg"
              alt="Botão de voltar"
              width={16}
              height={16}
            />
          </button>
          <h3>Prontuário</h3>
          <h1>
            Crie ou edite um novo <br /> <strong>Programa</strong>
          </h1>
          <Image
            className={styles.illustrationImage}
            src="/Illustração-cadastro-programas.svg"
            alt="Imagem de um homem com um caderno"
            width={500}
            height={500}
          />
        </section>

        <section className={styles.right}>
          <form className = {styles.ContainerForm} onSubmit={handleSubmit}>
            <h2>Informações do programa</h2>

            <div className={styles.ContainerInputs}>
              <label>Nome</label>
              <input
                type="text"
                id="name"
                name="nome"
                placeholder="Nome do Programa"
                value={formData.nome}
                onChange={handleInputChange}
                className={styles.inputsForm}
                required
              />
            </div>

            <div className={styles.ContainerInputsDate}>
              <div className={styles.inputsDateWrapper}>
                <label>Data de inicio</label>
                <input
                  type="date"
                  id="dataDeInicio"
                  name="inicio"
                  value={formData.inicio}
                  onChange={handleInputChange}
                  className={styles.inputsForm}
                  required
                />
              </div>

              <div className={styles.inputsDateWrapper}>
                <label>Data de termino</label>
                <input
                  type="date"
                  id="dataFinal"
                  name="termino"
                  value={formData.termino}
                  onChange={handleInputChange}
                  className={styles.inputsForm}
                  required
                  />
              </div>
            </div>

            <div className={styles.ContainerInputs}>
              <label>Publico Alvo</label>
              <input
                type="text"
                id="publicoAlvo"
                name="publicoAlvo"
                placeholder="Público alvo"
                value={formData.publicoAlvo}
                onChange={handleInputChange}
                className={styles.inputsForm}
                required
              />
            </div>
            
            <div className={styles.ContainerInputs}>
              <label>Horário do Programa</label>
              <select
                id="horario"
                name="horario"
                value={formData.horario}
                onChange={handleInputChange}
                className={styles.selectHours}
                required
              >
                <option defaultValue="" >Selecione o horário</option>
                <option value="10:00">10:00</option>
                <option value="14:00">14:00</option>
                <option value="16:00">16:00</option>
                <option value="18:00">18:00</option>
                <option value="20:00">20:00</option>
              </select>
            </div>
            
            <div className={styles.ContainerInputs}>
              <label>Descrição</label>
              <textarea
                id="informacoes"
                name="descricao"
                placeholder="Informações sobre o evento"
                required
                value={formData.descricao}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className={styles.ContainerInputs}>
              <label>Cursos relacionados</label>
              <select
                id="curso"
                name="curso"
                className={styles.selectCourses}
                required
                onChange={handleAddCourse}
              >
                <option defaultValue="">Cursos relacionados</option>

                {cursos.map(curso => (
                  <option key={curso.nome} value={curso.nome}>
                    {curso.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.containerCourses}>
              {selectedCourses.map((course, index) => (
                <span
                  key={index}
                className={styles.selectedCourses}
                >
                  {course}
                  <button className={styles.bntRemoveCourse} onClick={() => handleRemoveCourse(course)}>x</button>
                </span>
              ))}
            </div>

            <button type="submit" className={styles.btnSubmit}>
              Adicionar
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
