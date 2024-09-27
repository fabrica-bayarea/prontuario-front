"use client";
import Image from "next/image";
import style from "./style.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import EventTable from "@/components/Tables/tableSubscribe/table";
import { useRouter } from 'next/navigation';
import { useRequireAuth } from "@/hooks/useRequireAuth/useRequireAuth";

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
}

const events: Event[] = [
  {
    id: 1,
    name: "Projeto Observatório Socila e Fiscal",
    date: "12/04/2024",
    time: "10:00",
  },
  {
    id: 2,
    name: "Projeto Núcleo de Apoio Contábil e Fiscal – NAF",
    date: "10/05/2024",
    time: "11:00",
  },
  {
    id: 3,
    name: "Projeto Ação Solidária Covid-19",
    date: "20/02/2024",
    time: "12:00",
  },
];

export default function Home() {
  const router = useRouter();

  useRequireAuth();

  const handleClick = () => {
    router.push("/programas");
  };

  return (
    <>
      <div className={style.container}>
        <section className={style.sectionApresentacao}>
          <h1>
            Olá <strong> Usuario </strong>
          </h1>
          <p>Precisa marcar uma nova consulta em um de nossos programas?</p>
          <button onClick={handleClick} className={style.buttonConsulta} type="button">
            Nova Consulta
          </button>
        </section>
        <Image
          src="/Illustração_home.svg"
          alt="Logo"
          width={400}
          height={400}
        />
      </div>
      <div className={style.sectionTitulo}>
        <h1>
          Verifique abaixo os ultimos programas sociais que você se Inscreveu
        </h1>
      </div>
      <section>
        <EventTable events={events} />
      </section>
    </>
  );
}
