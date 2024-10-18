"use client";

import { api } from "@/services/api";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CadastroCurso() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: "",
    campus: "",
    coordenador: "",

    descricao: "",
    disponibilidade: "",
  });

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
    };

    try {
      await api.post("/cursos", data);
      toast.success("Curso cadastrado com sucesso!");
      router.push("/Administrador/dashboard-cursos");
    } catch (error:any) {
     if (error.response) {
        toast.error(
          "Erro ao cadastrar curso: " + error.response.data.message,
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
            Crie ou edite um novo <br /> <strong>Curso</strong>
          </h1>
          <Image
            className={styles.illustrationImage}
            src="/quadro.svg"
            alt="Escrevendo no quadro negro"
            width={500}
            height={500}
          />
        </section>

        <section className={styles.right}>
          <form className = {styles.ContainerForm} onSubmit={handleSubmit}>
            <h2>Informações do Curso</h2>

            <div className={styles.ContainerInputs}>
              <label>Nome</label>
              <input
                type="text"
                id="name"
                name="nome"
                placeholder="Nome do Curso"
                value={formData.nome}
                onChange={handleInputChange}
                className={styles.inputsForm}
                required
              />
            </div>

            <div className={styles.ContainerInputs}>
              <label>Cordenador</label>
              <input
                type="text"
                id="coordenador"
                name="coordenador"
                placeholder="Cordenador do Curso"
                value={formData.coordenador}
                onChange={handleInputChange}
                className={styles.inputsForm}
                required
              />
            </div>
            
            <div className={styles.ContainerInputs}>
              <label>Campus</label>
              <select
                id="campus"
                name="campus"
                value={formData.campus}
                onChange={handleInputChange}
                className={styles.selectCampus}
                required
              >
                <option defaultValue="" hidden>Selecione o campus</option>
                <option value="Campos-Sul">Campus Sul</option>
                <option value="Campos-Oeste">Campus Oeste</option>
              </select>
            </div>
            
            <div className={styles.ContainerInputs}>
              <label>Descrição</label>
              <textarea
                id="informacoes"
                name="descricao"
                placeholder="Descrição sobre o curso"
                value={formData.descricao}
                onChange={handleInputChange}
                required
              ></textarea>
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