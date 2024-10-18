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

export default function CadastroProgramas() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    curso: "",
    inicio: "",
    termino: "",
    horario: "",
    publico_alvo: "",
  })

  const [cursos, setCursos] = useState<Curso[]>([]);
  const [selectedDays , setSelectedDays] = useState<string[]>([]);
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

  const handleAddDays = (event: React.ChangeEvent<HTMLSelectElement>)=> {
    const selectedDay = event.target.value;
    if (selectedDay && !selectedDays.includes(selectedDay)) {
      setSelectedDays([...selectedDays, selectedDay]);
    }
  };

  const handleRemoveDay = (dayToRemove: any) => {
    setSelectedDays(
      selectedDays.filter((day) => day !== dayToRemove)
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
      curso: selectedDays[0], 
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
                id="publico_alvo"
                name="publico Alvo"
                placeholder="Público alvo"
                value={formData.publico_alvo}
                onChange={handleInputChange}
                className={styles.inputsForm}
                required
              />
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
                id="cursos"
                name="cursos relacionados"
                className={styles.selectDays}
                required
                onChange={handleInputChange}
              >
                <option defaultValue="" hidden>Selecione um curso</option>

                {cursos.map(curso => (
                  <option key={curso.nome} value={curso.nome}>
                    {curso.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.ContainerInputs}>
              <label>Dias da Semana</label>
              <select
                id="dias-da-semana"
                name="dias da semana"
                className={styles.selectDays}
                required
                onChange={handleAddDays}
              >
                <option defaultValue="" hidden>Selecione os dias</option>
                <option value="Segunda">Segunda</option>
                <option value="Terça">Terça</option>
                <option value="Quarta">Quarta</option>
                <option value="Quinta">Quinta</option>
                <option value="Sexta">Sexta</option>
                <option value="Sabado">Sabado</option>
              </select>
            </div>

            <div className={styles.containerDays}>
              {selectedDays.map((day, index) => (
                <span
                  key={index}
                  className={styles.selectedDays}
                >
                  {day}
                  <button className={styles.bntRemoveDay} onClick={() => handleRemoveDay(day)}>x</button>
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
