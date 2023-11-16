"use client";

import Formulario from "@/components/Formulario";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Button } from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";

export default function Cursos() {
  return (
    <div>
      <h2 className="mt-3 mx-3">Cursos Cadastrados</h2>

      <Button className="mt-3 mx-3" variant="success">
        <BiAddToQueue /> Adicionar Curso
      </Button>
      <div className="margin-tabela">
        <Formulario />
      </div>
    </div>
  );
}
