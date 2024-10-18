"use client";

import style from "./page.module.css";
import React, { useState, useEffect, useContext } from "react";
import ModalDelete from "@/components/Modals/modalDelete/modalDelete";
import ModalEdit from "@/components/Modals/modalEditProgram/modalEditProgram";
import TableProgramsAdmin from "@/components/Tables/Admin/TableProgramsAdmin/TableProgramsAdmin";
import ModalViewInfo from "@/components/Modals/modalViewProgram/modalViewProgram";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";

interface Programa {
  id: number;
  nome: string;
  descricao: string;
  curso: string;
  publico_alvo: string;
}

export default function PagCurso() {
  const router = useRouter()
  const { nome } = parseCookies();
  const { user } = useContext(AuthContext);

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
        const response = await api.get("/programas");
        setEvents(response.data);
      } catch (error) {
        console.error("Erro ao buscar programas:", error);
      }
    };

    fetchPrograms();
    setIsMounted(true);
  }, []);

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
      position: "bottom-right",
    });
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
    closeDeleteModal();
  };

  const handleEdit = async (program: Omit<Programa, "id">) => {
    if (editProgram) {
      try {
        const response = await api.put(`/programas/${editProgram.id}`, program);
        const data = response.data;

        setEvents(
          events.map(programa => {
            if (programa.id === data.id) {
              return data;
            }
            return programa;
          }),
        );

        closeEditModal();

        toast.success("Programa editado!", {
          position: "bottom-right",
        });
      } catch (error) {
        console.error("Erro ao editar programa:", error);
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const hasShownToast = localStorage.getItem("toastShown");

    if (user && !hasShownToast) {
      toast.success("Bem-vindo!");
      localStorage.setItem("toastShown", "true");
    }
  }, [user]);

  if (!isMounted) return null;

  return (
    <div className={style.container}>
      <section className={style.section}>
        <div className={style.sectionApresentacao}>
          <h1>
            Olá <strong>{nome}</strong>
          </h1>
          <p>Gerencie e cadastre novos programas</p>
        </div>
        <button
          className={style.btnAddProgram}
          onClick={() => router.push("./cadastro-programas")}
        >
          Adicionar novo Programa
        </button>
      </section>

      {events.length > 0 ? (
        <section>
          <TableProgramsAdmin
            events={events}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
            onView={openViewModal}
          />
        </section>
      ) : (
        <section className = {style.sectionNoData}>
          <Image className={style.imageNoData}src="/box.svg" alt="Caixas" width={400} height={400} />
          <h2 className={style.titleNoData}>Cadastre um novo programa</h2>
        </section>
      )}

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
