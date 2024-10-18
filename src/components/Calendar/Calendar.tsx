"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css"

const events = [
  {
    id: 1,
    nome: "Projeto Observatório Social e Fiscal",
    inicio: "01/10/2024",
    horario: "15:00",
    descricao: "O Observatório Social e Fiscal é um projeto que visa monitorar a aplicação dos recursos públicos e fiscalizar a execução de políticas públicas.",
    publico_alvo: "Estudantes de Ciências Contábeis",
    termino: "10/10/2024",
  },
  {
    id: 2,
    nome: "Projeto Núcleo de Apoio Contábil",
    inicio: "14/10/2024",
    horario: "11:00",
    descricao: "O Núcleo de Apoio Contábil e Fiscal (NAF) é um projeto que visa oferecer serviços contábeis e fiscais gratuitos para pessoas físicas e jurídicas.",
    publico_alvo: "Estudantes de Ciências Contábeis",
    termino: "19/10/2024",
  },
  {
    id: 3,
    nome: "Projeto Ação Solidária Covid-19",
    inicio: "02/09/2024",
    horario: "12:00",
    descricao: "A Ação Solidária Covid-19 é um projeto que visa arrecadar alimentos e produtos de higiene para famílias em situação de vulnerabilidade social.",
    publico_alvo: "Estudantes de Administração",
    termino: "13/09/2024",
  },
];

const mapEventsToFullCalendarFormat = (events: any[]) => {
  return events.map((event) => {

    const [diaInicio, mesInicio, anoInicio] = event.inicio.split('/');
    const start = `${anoInicio}-${mesInicio}-${diaInicio}T${event.horario}:00`;

    const [diaTermino, mesTermino, anoTermino] = event.termino.split('/');
    const end = `${anoTermino}-${mesTermino}-${diaTermino}T${event.horario}:00`;

    return {
      id: event.id,
      title: event.nome,
      start: start,
      end: end,
      description: event.descricao,
    };
  });
};

const Calendar = () => {
  return (
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={'dayGridMonth'}
        headerToolbar={
          {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }
        }
        events={mapEventsToFullCalendarFormat(events)}
        themeSystem="standard"
      />
  );
};

export default Calendar;
