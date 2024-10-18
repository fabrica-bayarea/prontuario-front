"use client";

import style from "./page.module.css";
import React, { useState, useEffect, useContext } from "react";
import ModalDelete from "@/components/Modals/modalDelete/modalDelete";
import TableCoursesAdmin from "@/components/Tables/Admin/TableCoursesAdmin/TableCoursesAdmin";
import ModalEditCourse from "@/components/Modals/Course/modalEditCourse/modalEditCourse";
import ModalViewCourse from "@/components/Modals/Course/modalViewCourse/modalViewCourse";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";

interface CourseAPI {
  id: number;
  nome: string;
  descricao: string;
  coordenador: string;
  campus: string;
}

export default function DashboardCourses() {
  const router = useRouter()
  const { user } = useContext(AuthContext);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCourse, setEditCourse] = useState<CourseAPI | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<CourseAPI | null>(null);

  const openViewModal = (program: CourseAPI) => {
    setSelectedProgram(program);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedProgram(null);
  };

  const [events, setEvents] = useState<CourseAPI[]>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await api.get("/cursos");
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

  const openEditModal = (program: CourseAPI) => {
    setEditCourse(program);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditCourse(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteId !== null) {
      try {
        await api.delete(`/cursos/${deleteId}`);
        setEvents(events.filter(curso => curso.id !== deleteId));
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

  const handleEdit = async (course: Omit<CourseAPI, "id">) => {
    if (editCourse) {
      try {
        const response = await api.put(`/cursos/${editCourse.id}`, course);
        const data = response.data;

        setEvents(
          events.map(curso => {
            if (curso.id === data.id) {
              return data;
            }
            return curso;
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
            Cadastre novos <strong>cursos</strong>
          </h1>
          <p>Gerencie e cadastre novos cursos</p>
        </div>
        <button
          className={style.btnAddProgram}
          onClick={() => router.push("./cadastro-curso")}
        >
          Adicionar novo Curso
        </button>
      </section>

      {events.length > 0 ? (
        <section>
          <TableCoursesAdmin
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
      <ModalEditCourse
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={handleEdit}
        course={editCourse}
      />

      <ModalViewCourse
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        courseInfo={selectedProgram}
      />
    </div>
  );
}
