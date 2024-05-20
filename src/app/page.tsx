import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_left}>
          <h2>Prontuário</h2>
          <Image
            src="/Logo_Vetorizada.svg"
            alt="Coração"
            width={40}
            height={60}
          />
        </div>

        <div className={styles.header_right}>
          <h3>Programas</h3>
          <h3>Cursos</h3>
          <Image
            src="/Menu_user.svg"
            alt="Menu de usuário"
            width={40}
            height={60}
          />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.right}>
          <button>
            <Image
              src="/btn_voltar.svg"
              alt="Botão de voltar"
              width={38}
              height={38}
            />
          </button>
          <h3>Prontuário</h3>
          <h1>
            Crie ou edite um novo{" "}
            <span className={styles.redText} style={{ display: "block" }}>
              Programa
            </span>
          </h1>
          <Image
            src="/Illustração.svg"
            alt="Imagem de um homem com um caderno"
            width={500}
            height={500}
          />
        </div>

        <div className={styles.left}>
          <h2>Informações</h2>
          <form>
            <input type="text" id="name" name="name" placeholder="Nome" />

            <input
              type="text"
              id="periodo"
              name="periodo"
              placeholder="Período do evento"
            />

            <input
              type="text"
              id="publicoAlvo"
              name="publicoAlvo"
              placeholder="Público alvo"
            />

            <input
              type="text"
              id="horario"
              name="horario"
              placeholder="Horário"
            />

            <textarea
              id="informacoes"
              name="informacoes"
              placeholder="Informações sobre o evento"
            ></textarea>

            <select name="" id="">
              <option value="">Exemplo</option>
              <option value="">Exemplo</option>
              <option value="">Exemplo</option>
              <option value="">Exemplo</option>
            </select>

            <button type="submit">Adicionar</button>
          </form>
        </div>
      </main>
    </>
  );
}
