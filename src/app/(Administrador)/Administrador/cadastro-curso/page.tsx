"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CadastroCurso() {
  const router = useRouter();

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
          <form className = {styles.ContainerForm}>
            <h2>Informações do Curso</h2>

            <div className={styles.ContainerInputs}>
              <label>Nome</label>
              <input
                type="text"
                id="name"
                name="nome"
                placeholder="Nome do Curso"
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
                className={styles.inputsForm}
                required
              />
            </div>
            
            <div className={styles.ContainerInputs}>
              <label>Turno</label>
              <select
                id="turno"
                name="turno"
                className={styles.selectShift}
                required
              >
                <option defaultValue="" hidden>Selecione o turno do curso</option>
                <option value="Matutino">Matutino</option>
                <option value="Noturno">Noturno</option>
              </select>
            </div>
            
            <div className={styles.ContainerInputs}>
              <label>Descrição</label>
              <textarea
                id="informacoes"
                name="descricao"
                placeholder="Descrição sobre o curso"
                required
              ></textarea>
            </div>

            <div className={styles.ContainerInputs}>
              <label>Disponibilidade</label>
              <select
                id="status"
                name="status"
                className={styles.selectStatus}
                required
              >
                <option defaultValue="" hidden>Status</option>
                <option value="Disponivel">Disponivel</option>
                <option value="Indisponivel">Indisponivel</option>
              </select>
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