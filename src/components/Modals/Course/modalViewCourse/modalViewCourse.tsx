import React, { useEffect } from "react";
import style from "./modalViewCourse.module.css";

interface ModalViewInfoProps {
    isOpen: boolean;
    onClose: () => void;
    courseInfo: {
      nome: string;
      descricao: string;
      campus: string;
      coordenador: string;
    } | null;
  }

const ModalViewCourse: React.FC<ModalViewInfoProps> = ({
  isOpen,
  onClose,
  courseInfo,
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
    
  if (!isOpen || !courseInfo) return null;

  return (
    <div className={style.overlay}>

      <div className={style.modal} onClick={e => e.stopPropagation()}>

        <section className={style.container}>
            <div className = {style.containerInfos}>
                <h1 className = {style.titulo}>Informações sobre o curso</h1>
                <p className={style.item}>
                  {courseInfo.descricao}
                </p>
            </div>

            <button onClick={onClose} className={style.closeButton}>
              X
            </button>

        </section>

        <div className = {style.conteudoSobre}>
            <h1 className = {style.tituloCursos}>Coordenador</h1>
            <p>{courseInfo.coordenador}</p>
        </div>

        <div className = {style.conteudoSobre}>
            <h2 className = {style.tituloPublico}>Campus</h2>
            <p className={style.item}>
                {courseInfo.campus}
            </p>
        </div>
      </div>
    </div>
  );
};

export default ModalViewCourse;