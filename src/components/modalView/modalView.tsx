import React, { useEffect } from "react";
import style from "./style.module.css";

interface ModalViewInfoProps {
    isOpen: boolean;
    onClose: () => void;
    programInfo: {
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
      publicoAlvo: string;
    } | null;
  }

const ModalViewInfo: React.FC<ModalViewInfoProps> = ({
  isOpen,
  onClose,
  programInfo,
}) => {

    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
        return () => {
          document.body.style.overflow = '';
        };
      }, [isOpen]);
    
  if (!isOpen || !programInfo) return null;

  return (
    <div className={style.overlay}>

      <div className={style.modal} onClick={e => e.stopPropagation()}>

        <section className={style.container}>
            <div className = {style.containerInfos}>
                <h1 className = {style.titulo}>Informações sobre o programa</h1>
                <p className={style.item}>
                  {programInfo.descricao}
                </p>
            </div>

            <button onClick={onClose} className={style.closeButton}>
              X
            </button>

        </section>

        <div className = {style.conteudoSobre}>
            <h1 className = {style.tituloCursos}>Cursos</h1>
            {programInfo.cursos && programInfo.cursos.length > 0
              ? programInfo.cursos.map((curso, index) => (
                  <ul className={style.item} key={curso.id}>
                    <li>
                        {curso.nome}
                    </li>
                    {programInfo.cursos && index < programInfo.cursos.length - 1 ? <hr /> : null}
                  </ul>
                ))
              : "Curso não especificado"}
        </div>

        <div className = {style.conteudoSobre}>
            <h2 className = {style.tituloPublico}>Público</h2>
            <p className={style.item}>
                {programInfo.publicoAlvo}
            </p>
        </div>
      </div>
    </div>
  );
};

export default ModalViewInfo;