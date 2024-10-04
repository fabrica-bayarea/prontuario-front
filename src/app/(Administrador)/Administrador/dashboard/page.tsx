"use client";

import style from "./page.module.css";
import React, { useState, useEffect, useContext } from "react";
import ModalAddProgram from "@/components/modalsPagCurso/modalAddProgram";
import ModalDelete from "@/components/modalsPagCurso/modalDelete";
import ModalEdit from "@/components/modalsPagCurso/modalEditProgram";
import { AuthContext } from "@/contexts/AuthContext";
import TableProgramsAdmin from "@/components/Tables/Admin/TableProgramsAdmin/TableProgramsAdmin";

interface Programa {
  id: number;
  name: string;
  periodo: string;
  horario: string;
}

export default function PagCurso() {
  const {user} = useContext(AuthContext);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProgram, setEditProgram] = useState<Programa | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const [events, setEvents] = useState<Programa[]>([
    {
      id: 1,
      name: "Projeto Observatório Socila e Fiscal",
      periodo: "12/04/2024 - 10/05/2025",
      horario: "11:00",
    },
    {
      id: 2,
      name: "Projeto Núcleo de Apoio Contábil e Fiscal",
      periodo: "10/05/2024 - 10/05/2025",
      horario: "11:00",
    },
    {
      id: 3,
      name: "Projeto Ação Solidária Covid-19",
      periodo: "20/02/2024  - 10/05/2025",
      horario: "11:00",
    }
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

  const openEditModal = (program: Programa) => {
    setEditProgram(program);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditProgram(null);
  };

  const handleSave = (name: string, date: string, time: string) => {
    setEvents([
      ...events,
      {
        id: events.length + 1,
        name: name,
        periodo: date,
        horario: time,
      },
    ]);
    closeAddModal();

    // toast.success("Programa adicionado com sucesso!");
  };

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      setEvents(events.filter(programa => programa.id !== deleteId));
    }
    closeDeleteModal();

    // toast.success("Programa excluído com sucesso!");
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
    closeDeleteModal();
  };

  const handleEdit = (id: number, name: string, date: string, time: string) => {
    setEvents(
      events.map(programa =>
        programa.id === id
          ? { id, name: name, periodo: date, horario: time }
          : programa,
      ),
    );
    closeEditModal();

    // toast.success("Programa editado com sucesso!");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className={style.container}>
      <section className={style.section}>
        <div className ={style.sectionApresentacao}>
          <h1>
            Olá <strong>{user?.tipo}</strong>
          </h1>
          <p>Gerencie e cadastre novos programas</p>
        </div>
        <button className={style.btnAddProgram} onClick={openAddModal}>
          Adicionar novo Programa
        </button>
      </section>

      <section>
          <TableProgramsAdmin 
            events={events}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
            onView={()=> {
              console.log("View");
            }}
          />
      </section>

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
    </div>
  );
}