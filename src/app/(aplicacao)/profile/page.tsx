"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function pageAdminUser() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    cidade: "",
    cep: "",
    endereco: "",
  });

  useEffect(() => {
    if (user) {
      api
        .get("/profile")
        .then(response => {
          console.log("Response da API:", response.data);
          const { nome, sobrenome, email, telefone, cidade, cep, endereco } =
            response.data;

          setFormData(prevState => ({
            ...prevState,
            nome,
            sobrenome,
            email,
            telefone,
            cidade,
            cep,
            endereco,
          }));
        })
        .catch(error => {
          console.error("Erro ao buscar perfil:", error);
        });
    }
  }, [user]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      cidade: formData.cidade,
      cep: formData.cep,
      endereco: formData.endereco,
    };

    try {
      const response = await api.put("/profile", dataToSend);
      console.log("Response da API:", response);
      toast.success("Dados atualizados com sucesso!");
    } catch (error: any) {
      console.error("Erro completo:", error);

      if (error.response) {
        console.log("Error response data:", error.response.data);

        if (error.response.data && error.response.data.message) {
          const messages = error.response.data.message;
          if (Array.isArray(messages) && messages.length > 0) {
            toast.error(`Erro: ${messages[0]}`);
          } else {
            toast.error(
              "Erro ao atualizar os dados. Verifique as informações.",
            );
          }
        } else {
          toast.error("Erro ao atualizar os dados. Verifique as informações.");
        }
      } else {
        toast.error("Erro de conexão. Verifique sua internet.");
      }
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    try {
      toast.info(
        "Desativando sua conta, você  será redirecionado para a página de login...",
      );

      await api.patch("auth/disable-user");

      setTimeout(() => {
        router.push("/auth/signin/usuario");
      }, 3000);
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      toast.error("Erro ao deletar usuário, tente novamente.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.section_user}>
        <Image
          src="/btn_voltar.svg"
          alt="Imagem de um botão"
          width={38}
          height={38}
          className={styles.btnBack}
        />

        <div>
          <h1>Seu Perfil</h1>
          <p>Edite as informações sobre seu perfil</p>
        </div>
      </div>

      <section className={styles.user_form}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inlineGroup}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Nome
              </label>
              <input
                className={styles.input}
                type="text"
                id="name"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="sobrenome" className={styles.label}>
                Sobrenome
              </label>
              <input
                className={styles.input}
                type="text"
                id="sobrenome"
                name="sobrenome"
                placeholder="Sobrenome"
                value={formData.sobrenome}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              E-mail
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              name="email"
              placeholder="meuemail@mail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="telefone" className={styles.label}>
              Telefone
            </label>
            <InputMask
              mask="+55 (99) 99999-9999"
              className={styles.input}
              type="tel"
              id="telefone"
              name="telefone"
              placeholder="Seu telefone"
              value={formData.telefone}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="cep" className={styles.label}>
              CEP
            </label>
            <InputMask
              mask="99999-999"
              className={styles.input}
              type="text"
              id="cep"
              name="cep"
              placeholder="CEP"
              value={formData.cep}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inlineGroup}>
            <div className={styles.formGroup}>
              <label htmlFor="cidade" className={styles.label}>
                Cidade
              </label>
              <input
                className={styles.input}
                type="text"
                id="cidade"
                name="cidade"
                placeholder="Cidade"
                value={formData.cidade}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="endereco" className={styles.label}>
                Endereço
              </label>
              <input
                className={styles.input}
                type="text"
                id="endereco"
                name="endereco"
                placeholder="Endereço"
                value={formData.endereco}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            Salvar
          </button>
        </form>

        <section className={styles.sectionDeleteAccount}>
          <h2>Cuidado</h2>
          <div className={styles.warningSection}>
            <div className={styles.paragraphContainer}>
              <h2>Deletar Conta</h2>
              <p>Delete sua conta e informação do sistema</p>
            </div>

            <button
              type="button"
              onClick={openModal}
              className={styles.deleteButton}
            >
              Deletar Conta
            </button>
          </div>
        </section>
      </section>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Confirmação de Exclusão de Conta</h3>
            <p>
              Esta ação é irreversível e todos os seus dados serão removidos do
              nosso sistema.
            </p>
            <div className={styles.modalActions}>
              <button onClick={closeModal} className={styles.cancelButton}>
                não
              </button>
              <button onClick={confirmDelete} className={styles.confirmButton}>
                Sim
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
