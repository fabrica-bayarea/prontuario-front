"use client";

import { useAuth } from "@/state/authContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import { Container, Row } from "react-bootstrap";
import "../../globals.css";

export default function Home() {
  return (
    <Container className="container-text">
      <Row className="center-text espacamento">
        <h1>Bem-vindo ao Nosso Portal Acadêmico!</h1>
        <p>
          Descubra um ambiente educacional inovador, projetado para promover o
          sucesso acadêmico e a interação entre estudantes e professores.
        </p>
      </Row>
      <Row className="center-text espacamento">
        <h2>Atendimento Personalizado</h2>
        <p>
          Oferecemos um espaço exclusivo para comunicação direta entre você e
          nossos professores. Tire dúvidas, receba orientações acadêmicas e
          alcance seu potencial máximo.
        </p>
      </Row>
      <Row className="center-text espacamento">
        <h2>Conectando Pessoas e Oportunidades</h2>
        <p>
          Nosso portal simplifica a busca por cursos de faculdade e programas
          sociais, proporcionando uma experiência educacional enriquecedora e
          inclusiva.
        </p>
      </Row>
    </Container>
  );
}
