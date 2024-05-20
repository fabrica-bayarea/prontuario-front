import styles from "./page.module.css";
import Image from "next/image";

export default function pagCurso() {
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

      <section className={styles.section}>
        <div>
          <h1>
            Olá <span className={styles.red}>Admin</span>
          </h1>
          <p>Gerencie e cadastre novos programas</p>
          <button className={styles.btnAddProgram}>
            Adicionar novo Programa
          </button>
        </div>
      </section>

      <main className={styles.main}>
        <div className={styles.search}>
          <h1 className={styles.programsTitle}>Programas Sociais</h1>
          <input
            type="text"
            placeholder="Pesquise por programas"
            className={styles.searchInput}
          />
        </div>

        <div className={styles.eventInfo}>
          <p>Nome</p>
          <p>Período do evento</p>
          <p>Horário do evento</p>
          <p>Ações</p>
        </div>

        <ul className={styles.programsList}>
          <li>
            <div className={styles.programInfo}>
              <p className={styles.programName}>Nome do Programa 1</p>
              <p className={styles.programPeriod}>12/04/2024 - 12/04/2024</p>
              <p className={styles.programTime}>12:00</p>
              <div className={styles.divBtn}>
                <button className={styles.btnEdit}></button>
                <button className={styles.btnDelete}></button>
                <button className={styles.btnView}></button>
              </div>
            </div>
          </li>
        </ul>
      </main>
    </>
  );
}
