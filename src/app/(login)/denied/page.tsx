
import { Header } from "@/components/Header/Header";
import Image from "next/image";
import voltar from "../../../../public/Button-voltar.svg";
import styles from "./page.module.css";
export default function denied() {
  return (
    <>
      <Header />

      <section className={styles.central}>
        <div className={styles.meio}>
          <h1 className={styles.cryBaby}> Error 401 </h1>
          <h2 className={styles.msn}>Você não tem permissão para esta seção. Clique no botão voltar.</h2>
            <div className={styles.btnCentro}>
          <Image  className={styles.btn} src={voltar} alt="Botão de voltar" />
          </div>
        </div>
      </section>
    </>
  );
}
