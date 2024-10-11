"use client";

interface Curso {
  id: number;
  nome: string;
}

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { api } from "@/services/api";

export default function Home() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([
    "Curso de Marketing",
    "Curso de Programação",
  ]);
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

  const handleAddCourse = (event: { target: { value: any; }; }) => {
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

  return (
    <>
      <main className={styles.main}>

        <section className={styles.left}>
          <button>
            <Image
              src="/arrow-left.svg"
              alt="Botão de voltar"
              width={16}
              height={16}
            />
          </button>
          <h3>Prontuário</h3>
          <h1>
            Crie ou edite um novo <br/> <strong>Programa</strong>
          </h1>
          <Image
            src="/Illustração-cadastro-programas.svg"
            alt="Imagem de um homem com um caderno"
            width={500}
            height={500}
          />
        </section>

        <section className={styles.right}>
          <form>
          <h2>Informações</h2>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nome do Programa"
              className={styles.inputsForm}
              required
            />

            <input
              type="text"
              id="dataDeInicio"
              name="dataDeInicio"
              placeholder="Data de Início"
              className={styles.inputsForm}
              required
            />

            
            <input
              type="text"
              id="dataFinal"
              name="dataFinal"
              placeholder="Data Final"
              className={styles.inputsForm}
              required
            />

            <input
              type="text"
              id="publicoAlvo"
              name="publicoAlvo"
              placeholder="Público alvo"
              className={styles.inputsForm}
              required
            />

            <select
              id="horario"
              name="horario"
              className={styles.selectHours}
              required
            >
              <option value="">Selecione o horário</option>
              <option value="10:00">10:00</option>
              <option value="14:00">14:00</option>
              <option value="16:00">16:00</option>
              <option value="18:00">18:00</option>
              <option value="20:00">20:00</option>
            </select>

            <textarea
              id="informacoes"
              name="informacoes"
              placeholder="Informações sobre o evento"
              required
            ></textarea>


            <select
              id="curso"
              name="curso"
              className={styles.selectHours}
              required
              onChange={handleAddCourse}
            >
            <option value="">Cursos relacionados</option>

            {cursos.map(curso => (
              <option key={curso.id} value={curso.nome}>
                {curso.nome}
              </option>
            ))}
            </select>

            <div>
            {selectedCourses.map((course, index) => (
          <span
            key={index}
            style={{
              display: 'inline-block',
              margin: '5px',
              padding: '5px 10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#f0f0f0',
              position: 'relative',
            }}
          >
            {course}
            <button
              onClick={() => handleRemoveCourse(course)}
              style={{
                marginLeft: '10px',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                padding: '0 8px',
                cursor: 'pointer',
                position: 'absolute',
                top: '2px',
                right: '2px',
              }}
            >
              x
            </button>
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
