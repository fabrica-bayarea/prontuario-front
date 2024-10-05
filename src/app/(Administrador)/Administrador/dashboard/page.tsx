"use client";

import style from "./page.module.css";
import React, { useState, useEffect, useContext } from "react";
import ModalAddProgram from "@/components/modalAddProgram/modalAddProgram";
import ModalDelete from "@/components/modalDelete/modalDelete";
import ModalEdit from "@/components/modalEditProgram/modalEditProgram";
import { AuthContext } from "@/contexts/AuthContext";
import TableProgramsAdmin from "@/components/Tables/Admin/TableProgramsAdmin/TableProgramsAdmin";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import ModalViewInfo from "@/components/modalView/modalView";

interface Programa {
  id: number;
  nome: string;
  descricao: string;
  curso: string;
  inicio: string;
  termino: string;
  horario: string;
  publicoAlvo: string;
}

export default function PagCurso() {
  const {user} = useContext(AuthContext);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProgram, setEditProgram] = useState<Programa | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Programa | null>(null);

  const openViewModal = (program: Programa) => {
    setSelectedProgram(program);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedProgram(null);
  };

  const [events, setEvents] = useState<Programa[]>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await api.get('/programas');
        setEvents(response.data);
      } catch (error) {
        console.error("Erro ao buscar programas:", error);
      }
    };

    fetchPrograms();
    setIsMounted(true);
  }, []);

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

  const handleSave = async (program: Omit<Programa, "id">) => {
    
    try {
      const response = await api.post('/programas', program)
      setEvents([
        ...events, response.data
      ]);
      closeAddModal();
      toast.success("Programa adicionado com sucesso!", {
        position: "bottom-right"
      });
    } catch (error) {
      console.log("Erro ao adicionar programa", error)
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteId !== null) {
      try {
        await api.delete(`/programas/${deleteId}`);
        setEvents(events.filter(programa => programa.id !== deleteId));
      } catch (error) {
        console.error("Erro ao excluir programa:", error);
      }
    }
    closeDeleteModal();
    toast.success("Programa excluído com sucesso!", {
      position: "bottom-right"
    });
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
    closeDeleteModal();
  };

  const handleEdit = async(program: Omit<Programa, "id">) => {
    if (editProgram) {
      try {
        const response = await api.put(`/programas/${editProgram.id}`, program);
        const data = response.data;
        
        setEvents(events.map(programa => {
          if (programa.id === data.id) {
            return data;
          }
          return programa;
        }));
        
        closeEditModal();

        toast.success("Programa editado!", {
          position: "bottom-right"
        });
      } catch (error) {
        console.error("Erro ao editar programa:", error);
      }
    }
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
            onView={openViewModal}
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

      <ModalViewInfo
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        programInfo={selectedProgram}
      />
    </div>
  );
}