import Image from "next/image";
import styles from "./header.module.css";

export default function Head() {
  return (
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
  );
}
