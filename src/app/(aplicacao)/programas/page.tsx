"use client";
import Image from "next/image";
import style from "./style.module.css";
import EventTablePrograms from "@/components/Tables/TablePrograms/tablePrograms";
import { useRequireAuth } from "@/hooks/useRequireAuth/useRequireAuth";

interface Event {
  id: number;
  nome: string;
  descricao: string;
  cursos?: {
    id: number;
    nome: string;
    coordenador: string;
    turno: string;
  }[];
  inicio: string;
  termino: string;
  horario: string;
  publico_alvo: string;
}


const events: Event[] = [
  {
    id: 1,
    nome: "Projeto Observatório Social e Fiscal",
    inicio: "12/10/2024",
    horario: "15:00",
    cursos: [
      {
        id: 1,
        nome: "Ciências Contábeis",
        coordenador: "João Silva",
        turno: "Noturno",
      }
    ],
    descricao: "O Observatório Social e Fiscal é um projeto que visa monitorar a aplicação dos recursos públicos e fiscalizar a execução de políticas públicas.",
    publico_alvo: "Estudantes de Ciências Contábeis",
    termino: "30/10/2024",
  },
  {
    id: 2,
    nome: "Projeto Núcleo de Apoio Contábil",
    inicio: "10/09/2024",
    horario: "11:00",
    cursos: [
      {
        id: 1,
        nome: "Ciências Contábeis",
        coordenador: "João Silva",
        turno: "Noturno",
      }
    ],
    descricao: "O Núcleo de Apoio Contábil e Fiscal (NAF) é um projeto que visa oferecer serviços contábeis e fiscais gratuitos para pessoas físicas e jurídicas.",
    publico_alvo: "Estudantes de Ciências Contábeis",
    termino: "22/09/2024",
  },
  {
    id: 3,
    nome: "Projeto Ação Solidária Covid-19",
    inicio: "02/09/2024",
    horario: "12:00",
    cursos: [
      {
        id: 2,
        nome: "Administração",
        coordenador: "Maria",
        turno: "Matutino",
      }
    ],
    descricao: "A Ação Solidária Covid-19 é um projeto que visa arrecadar alimentos e produtos de higiene para famílias em situação de vulnerabilidade social.",
    publico_alvo: "Estudantes de Administração",
    termino: "13/09/2024"
  },
];

export default function Programas() {
  useRequireAuth();

  return (
    <main className={style.container}>
      <section className={style.sectionApresentacao}>
        <div className={style.containerApresentacao}>
          <h1>
            Participe de nossos <br /><strong>programas sociais</strong>
          </h1>
          <p>Verifique nossos projetos, serviços e eventos gratuitos <br />voltados para o desenvolvimento social</p>
        </div>
        <Image
          src="/Illustracao_Programas.svg"
          alt="Logo"
          width={400}
          height={400}
        />
      </section>

      <section className={style.sectionSobreIesb}>
          <h1>Sobre o <strong>IESB em Ação</strong></h1>
            <div className={style.containerSobreIesb}>
              <p>   O Programa abraça diversos serviços, projetos e ações gratuitas de extensão universitária, desenvolvendo pesquisas, rodas de conversa, prestação de serviços como orientação jurídica, comunicação comunitária, alfabetização de jovens e adultos, apoio pedagógico, atendimento psicológico e nutricional individual e comunitário, além de cursos e oficinas de curta duração voltadas para o desenvolvimento social, humano e econômico do público externo e interno atendido.
              </p>

              <p>   O IESB em Ação atua associando o Ensino à Extensão e ao Voluntariado, agregando alunos, professores e comunidade, independentemente de período ou curso. Nosso principal objetivo é unir a teoria à prática em prol da construção de uma sociedade melhor.</p>
          </div>
        </section>

      <section>
        <EventTablePrograms events={events} />
      </section>
    </main>
  );
}
