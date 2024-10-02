import styles from "./page.module.css";
import Image from "next/image";
import ilustracao from "../../../../../../public/quadro.svg";
import botao from "../../../../../../public/Botão Voltar.svg";
import Head from "@/components/CadastroCompents/Header";


export default function Cadastro() {
  return (
    <>
      <Head />
      <main className={styles.main}>

        <div className={styles.left}>
            <button className={styles.but}>
              <Image src={botao} alt="botão" width={38} height={38}/>
            </button>
          

          <div className={styles.texto}>
            <span>Prontuário</span>
            <h2>Adicione ou edite um novo </h2>
            <span className={styles.curse}>Curso</span>
          </div>

          <Image
            src={ilustracao}
            alt="mexendo no quadro negro"
            width={400}
            height={400}
          />

        </div>

        <div className={styles.right}>

          <form action="get" className={styles.form}>
            <fieldset className={styles.field}>
              <h1>Informações</h1>
              <input 
                type="text"
                id="curso"
                name="curso"
                placeholder="Nome do curso"
              />

              <input
                type="text"
                id="coordenador"
                name="coordenador"
                placeholder="Coordenador do curso"
              />

              <input type="text"
               id="turno"
               name="turno"
               placeholder="Turno" />

              <textarea
                name="descricao"
                id="descricao"
                placeholder="Descrição sobre o curso"
              ></textarea>


            <select id="select" name="?" className={styles.option}>
              <option value="">Status</option>
              <option value="?">?</option>
              <option value="?">?</option>
              <option value="?">?</option>
              <option value="?">?</option>
              <option value="?">?</option>
            </select>

            <button className={styles.bs} type="submit" name="butonConfirm">Adicionar</button>
            </fieldset>
          </form>
        </div>
      </main>
    </>
  );
}
