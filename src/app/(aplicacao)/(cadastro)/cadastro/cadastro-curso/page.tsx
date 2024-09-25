"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import ModalAddProgram from "@/components/modalsPagCurso/modalAddProgram";
import Programa from "@/components/modalsPagCurso/programa";
import ModalDelete from "@/components/modalsPagCurso/modalDelete";
import ModalEdit from "@/components/modalsPagCurso/modalEditProgram";
// import { toast } from "react-toastify";

interface Programa {
  id: number;
  nome: string;
  periodo: string;
  horario: string;
}

export default function PagCurso() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProgram, setEditProgram] = useState<Programa | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [programas, setProgramas] = useState([
    {
      id: 1,
      nome: "Programa 1",
      periodo: "12/04/2024",
      horario: "12:00",
    },

    {
      id: 2,
      nome: "Programa 2",
      periodo: "12/04/2024",
      horario: "12:00",
    },

    {
      id: 3,
      nome: "Programa 3",
      periodo: "12/04/2024",
      horario: "12:00",
    },
  ]);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openDeleteModal = (id: number) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  const openEditModal = (program: {
    id: number;
    nome: string;
    periodo: string;
    horario: string;
  }) => {
    setEditProgram(program);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditProgram(null);
  };

  const handleSave = (name: string, date: string, time: string) => {
    setProgramas([
      ...programas,
      {
        id: programas.length + 1,
        nome: name,
        periodo: date,
        horario: time,
      },
    ]);
    closeAddModal();

    // toast.success("Programa adicionado com sucesso!");
  };

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      setProgramas(programas.filter(programa => programa.id !== deleteId));
    }
    closeDeleteModal();

    // toast.success("Programa excluído com sucesso!");
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
    closeDeleteModal();
  };

  const handleEdit = (id: number, name: string, date: string, time: string) => {
    setProgramas(
      programas.map(programa =>
        programa.id === id
          ? { id, nome: name, periodo: date, horario: time }
          : programa,
      ),
    );
    closeEditModal();

    // toast.success("Programa editado com sucesso!");
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_left}>
          <h2>Prontuário</h2>
          <Image
            src="/Logo_Vetorizada.svg"
            alt="Coração"
            width={40}
            height={60}
          />
        </div>

        <div className={styles.header_right}>
          <h3>Programas</h3>
          <h3>Cursos</h3>
          <Image
            src="/Menu_user.svg"
            alt="Menu de usuário"
            width={40}
            height={60}
          />
        </div>
      </header>

      <section className={styles.section}>
        <div>
          <h1>
            Olá <span className={styles.red}>Admin</span>
          </h1>
          <p>Gerencie e cadastre novos programas</p>
          <button className={styles.btnAddProgram} onClick={openAddModal}>
            Adicionar novo Programa
          </button>
        </div>
      </section>

      <main className={styles.main}>
        <div className={styles.search}>
          <h1 className={styles.programsTitle}>Programas Sociais</h1>
          <input
            type="text"
            placeholder="Pesquise por programas"
            className={styles.searchInput}
          />
        </div>

        <div className={styles.eventInfo}>
          <p>Nome</p>
          <p>Período do evento</p>
          <p>Horário do evento</p>
          <p>Ações</p>
        </div>

        <ul className={styles.programsList}>
          {programas.map(programa => (
            <Programa
              key={programa.id}
              onDelete={() => openDeleteModal(programa.id)}
              onEdit={() => openEditModal(programa)}
              {...programa}
            />
          ))}
        </ul>
      </main>

      <ModalAddProgram
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onSubmit={handleSave}
      />
      <ModalDelete
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <ModalEdit
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={handleEdit}
        program={editProgram}
      />
    </>
  );
}
