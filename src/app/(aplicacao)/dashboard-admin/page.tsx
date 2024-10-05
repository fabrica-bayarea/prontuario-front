"use client";

import Head from "@/app/components/header/Header";
import Image from "next/image";
import btnVoltar from "../../../../public/btn_voltar.svg";
import styles from "./page.module.css";
import { useState } from "react";

export default function pageAdminUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    console.log("Conta deletada");
    setIsModalOpen(false);
  };

  return (
    <>
      <Head />

      <div className={styles.section_user}>
        <Image
          src={btnVoltar}
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
        <form className={styles.form}>
          <div className={styles.inlineGroup}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Nome
              </label>
              <input
                className={styles.input}
                type="text"
                id="name"
                name="name"
                placeholder="Nome"
                required
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
                required
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
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="telefone" className={styles.label}>
              Telefone
            </label>
            <input
              className={styles.input}
              type="tel"
              id="telefone"
              name="telefone"
              placeholder="Seu telefone"
              required
            />
          </div>

          <div className={styles.inlineGroup}>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Senha
              </label>
              <input
                className={styles.input}
                type="password"
                id="password"
                name="password"
                placeholder="**********"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirm_password" className={styles.label}>
                Repita a senha
              </label>
              <input
                className={styles.input}
                type="password"
                id="confirm_password"
                name="confirm_password"
                placeholder="**********"
                required
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
