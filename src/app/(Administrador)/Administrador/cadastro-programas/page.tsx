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

interface FormData {
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

export default function CadastroProgramas() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    descricao: "",
    curso: "",
    publico_alvo: "",
  })

  const [formPeriodo, setFormPeriodo] = useState<FormPeriodo>({
    data_inicio: "",
    data_fim: "",
    horario_inicio: "",
    horario_fim: "",
    dias_da_semana: []
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

  const handleAddDays = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDay = event.target.value;
    if (selectedDay && !selectedDays.includes(selectedDay)) {
        const newSelectedDays = [...selectedDays, selectedDay];
        setSelectedDays(newSelectedDays);
        console.log(newSelectedDays);
        updateFormData(newSelectedDays); 
    }
  };

  const updateFormData = (updatedDays: string[]) => {
    setFormData((prevData) => ({
        ...prevData,
        dias_da_semana: updatedDays,
    }));
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

    setFormPeriodo({
      ...formPeriodo,
      [name]: value,
      dias_da_semana: selectedDays,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = {
        ...formData,
      };

      const dataPeriodo = {
        ...formPeriodo,
        nome_programa: formData.nome,
        data_inicio: new Date(formPeriodo.data_inicio).toISOString(),
        data_fim: new Date(formPeriodo.data_fim).toISOString(),
      }

    try {
      await api.post("/programas", data);
      toast.success("Programa e periodo do evento cadastrados com sucesso!");

      await api.post("/periodo-atendimentos", dataPeriodo);
      
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
                  id="data_inicio"
                  name="data_inicio"
                  value={formPeriodo.data_inicio}
                  onChange={handleInputChange}
                  className={styles.inputsForm}
                  required
                />
              </div>

              <div className={styles.inputsDateWrapper}>
                <label>Data de termino</label>
                <input
                  type="date"
                  id="data_fim"
                  name="data_fim"
                  value={formPeriodo.data_fim}
                  onChange={handleInputChange}
                  className={styles.inputsForm}
                  required
                  />
              </div>
            </div>

            <div className={styles.ContainerInputsDate}>
              <div className={styles.inputsDateWrapper}>
                <label>Horario de inicio</label>
                <input
                  type="time"
                  id="horario_inicio"
                  name="horario_inicio"
                  value={formPeriodo.horario_inicio}
                  onChange={handleInputChange}
                  className={styles.inputsForm}
                  required
                />
              </div>

              <div className={styles.inputsDateWrapper}>
                <label>Horario de termino</label>
                <input
                  type="time"
                  id="horario_fim"
                  name="horario_fim"
                  value={formPeriodo.horario_fim}
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
                name="publico_alvo"
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
                id="curso"
                name="curso"
                className={styles.selectDays}
                required
                onChange={handleInputChange}
                value={formData.curso}
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
                id="dias_da_semana"
                name="dias_da_semana"
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
