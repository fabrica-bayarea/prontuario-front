import React, { useEffect } from "react";
import styles from "./modalDelete.module.css";

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalDelete = ({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
}: ModalDeleteProps) => {

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

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h1>Deseja excluir o programa ?</h1>
        <div className={styles.modalButtons}>
          <button onClick={onConfirm} className={styles.btnConfirm}>
            Confirmar
          </button>
          <button onClick={onCancel} className={styles.btnCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
