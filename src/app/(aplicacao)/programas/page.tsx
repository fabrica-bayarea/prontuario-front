"use client";
import Image from "next/image";
import style from "./style.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import EventTablePrograms from "@/components/Tables/TablePrograms/tablePrograms";
import { useRequireAuth } from "@/hooks/useRequireAuth/useRequireAuth";

interface Eventos {
  id: number;
  name: string;
  date: string;
  status: boolean;
}

const eventos : Eventos[] = [
  {
    id: 1,
    name: "Projeto Observatório Socila e Fiscal",
    date: "12/04/2024",
    status: true
  },
  {
    id: 2,
    name: "Projeto Núcleo de Apoio Contábil e Fiscal – NAF",
    date: "10/05/2024",
    status: false
  },
  {
    id: 3,
    name: "Projeto Ação Solidária Covid-19",
    date: "20/02/2024",
    status: true
  }
];

export default function Programas() {
  useRequireAuth();

  return (
    <>
      <div className={style.container}>
        <section className={style.sectionApresentacao}>
          <h1>
            Participe de nossos <br /><strong>programas sociais</strong>
          </h1>
          <p>Verifique nossos projetos, serviços e eventos gratuitos <br />voltados para o desenvolvimento social</p>
        </section>
        <Image
          src="/Illustracao_Programas.svg"
          alt="Logo"
          width={400}
          height={400}
        />
      </div>

      <div className={style.sectionSobreIesb}>
        <h1>Sobre o <strong>IESB em Ação</strong></h1>

        <p>O Programa abraça diversos serviços, projetos e ações gratuitas de extensão universitária, desenvolvendo pesquisas, rodas de conversa, prestação de serviços como orientação jurídica, comunicação comunitária, alfabetização de jovens e adultos, apoio pedagógico, atendimento psicológico e nutricional individual e comunitário, além de cursos e oficinas de curta duração voltadas para o desenvolvimento social, humano e econômico do público externo e interno atendido.
        </p>

        <p>O IESB em Ação atua associando o Ensino à Extensão e ao Voluntariado, agregando alunos, professores e comunidade, independentemente de período ou curso. Nosso principal objetivo é unir a teoria à prática em prol da construção de uma sociedade melhor.</p>
      </div>

      <section>
        <EventTablePrograms events={eventos} />
      </section>
    </>
  );
}
