"use client";

import Formulario from "@/components/Formulario";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";
import { useAuth } from "@/state/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Cursos() {
  const { accessToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push("/auth/signin/usuario");
    }
  }, [accessToken, router]);
  return (
    <Container>
      <Row className="mt-5 mb-5">
        <h2 className="mt-3 mx-3">Cursos Cadastrados</h2>
        <Col>
          <Button className="mt-3 mb-3" variant="success">
            <BiAddToQueue /> Adicionar Curso
          </Button>
        </Col>
      </Row>
      <div className="margin-tabela">
        <Formulario />
      </div>
    </Container>
  );
}
