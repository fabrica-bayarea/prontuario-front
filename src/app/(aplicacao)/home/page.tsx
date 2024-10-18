"use client";
import Image from "next/image";
import style from "./style.module.css";
import EventTable from "@/components/Tables/tableSubscribe/table";
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "@/contexts/AuthContext";
import ModalViewInfo from "@/components/Modals/modalViewProgram/modalViewProgram";

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
    inicio: "01/10/2024",
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
    termino: "10/10/2024",
  },
  {
    id: 2,
    nome: "Projeto Núcleo de Apoio Contábil",
    inicio: "14/10/2024",
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
    termino: "19/10/2024",
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
    termino: "13/09/2024",
  },
];

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const router = useRouter();
  const {nome} = parseCookies();
  const {user} = useContext(AuthContext);

  const handleClick = () => {
    router.push("/programas");
  };

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };

  useEffect(() => {
    const hasShownToast = localStorage.getItem("toastShown");
  
    if (user && !hasShownToast) {
      toast.success("Bem-vindo!");
      localStorage.setItem("toastShown", "true");
    }
  }, [user]);

  return (
    <main className={style.container}>
      <ToastContainer />
      <section className={style.sectionApresentacao}>
        <div className={style.containerApresentacao}>
          <h1>
            Olá <strong> {nome} </strong>
          </h1>
          <p>Precisa marcar uma nova consulta em um de nossos programas?</p>
          <button
            onClick={handleClick}
            className={style.buttonConsulta}
            type="button"
          >
            Nova Consulta
          </button>
        </div>
        <Image
          src="/Illustração_home.svg"
          alt="Logo"
          width={400}
          height={400}
        />
      </section>

      <section className={style.sectionTable}>
      <EventTable
          events={events}
          onView={handleViewEvent}
      />
      </section>

      <ModalViewInfo
          isOpen={openModal}
          onClose={handleCloseModal}
          programInfo={selectedEvent} 
      />
    </main>
  );
}
