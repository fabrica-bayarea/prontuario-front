"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Head from "@/components/headerAllPages/Header";
import Image from "next/image";
import Teguetegozoios from "@/components/calendar/Calendar";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Head />
      <main className={styles.main}>
        <div className={styles.left}>
          <button>
            <Image
              src="/btn_voltar.svg"
              alt="Botão de voltar"
              width={38}
              height={38}
            />
          </button>
          <h3>Prontuário</h3>
          <h1>
            Crie ou edite um novo{" "}
            <span className={styles.redText} style={{ display: "block" }}>
              Programa
            </span>
          </h1>
          <Image
            src="/Illustração.svg"
            alt="Imagem de um homem com um caderno"
            width={500}
            height={500}
          />
        </div>

        <div className={styles.right}>
          <h2>Informações</h2>
          <form>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nome"
              className={styles.inputsForm}
              required
            />

            <Teguetegozoios />

            <input
              type="text"
              id="publicoAlvo"
              name="publicoAlvo"
              placeholder="Público alvo"
              className={styles.inputsForm}
              required
            />

            <select
              id="horario"
              name="horario"
              className={styles.selectHours}
              required
            >
              <option value="">Selecione o horário</option>
              <option value="10:00">10:00</option>
              <option value="14:00">14:00</option>
              <option value="16:00">16:00</option>
              <option value="18:00">18:00</option>
              <option value="20:00">20:00</option>
            </select>

            <textarea
              id="informacoes"
              name="informacoes"
              placeholder="Informações sobre o evento"
              required
            ></textarea>

            <button type="submit" className={styles.btnSubmit}>
              Adicionar
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
