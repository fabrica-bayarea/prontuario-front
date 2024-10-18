"use client";
import style from "./style.module.css";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { MultiStepForm } from "../../../../hooks/stepForm/multStepForm";
import UserForm from "../../../../components/formMultSteps/userForm";
import AddressForm from "@/components/formMultSteps/addressForm";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormData = {
  cpf: string;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  cidade: string;
  cep: string;
  endereco: string;
  confirmaSenha: string;
  telefone: string;
  tipo: string;
  nascimento: string;
  genero: string;
};

const INITIAL_DATA: FormData = {
  nome: "",
  sobrenome: "",
  email: "",
  senha: "",
  cidade: "",
  cep: "",
  endereco: "",
  confirmaSenha: "",
  telefone: "",
  tipo: "",
  cpf: "",
  nascimento: "",
  genero: "",
};

export default function SignUpUser() {
  const { signUp } = useContext(AuthContext);
  const router = useRouter();

  const methods = useForm<FormData>();
  const { handleSubmit } = methods;

  const [data, setData] = useState(INITIAL_DATA);

  function atualizaCampos(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields };
    });
  }

  const convertToISOWithTime = (dateStr: string): string => {
    if (!dateStr || !dateStr.match(/^\d{2}\/\d{2}\/\d{4}$/)) return dateStr;
    
    const [day, month, year] = dateStr.split('/');
    
    const date = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      17,
      0,
      0 
    );

    const isoDate = date.toISOString().slice(0, 19);
    return isoDate;
  };

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    MultiStepForm([
      <UserForm key="userForm" {...data} atualizaCampos={atualizaCampos} />,
      <AddressForm
        key="addreesForm"
        {...data}
        atualizaCampos={atualizaCampos}
      />,
    ]);

  const onSubmit = async (formData: FormData) => {
    const dataToSend = {
      ...formData,
      nascimento: convertToISOWithTime(formData.nascimento)
    };

    if (currentStepIndex < steps.length - 1) {
      next();
    } else {
      try {
        await signUp(dataToSend);
        toast.success("Cadastro realizado com sucesso!");

      } catch (error: any) {
        if (Array.isArray(error.response.data.message)) {
          error.response.data.message.forEach((msg: string) => {
            toast.error("Erro ao cadastrar usuário: " + msg);
            console.log(msg);
          });
        } else {
          toast.error(
            "Erro ao cadastrar usuário: " + error.response.data.message,
          );
          console.log(error.response.data.message);
        }
      }
    }
  };

  return (
    <div className={style.container}>
      <ToastContainer />
      <div className={style.modal__container}>
        <div className={style.envolve__titulo__cadastro}>
          <p className={style.modal__texto}>Prontuário</p>
          <h1 className={style.modal__titulo}>
            Crie sua conta de{" "}
            <strong>
              forma
              <br />
              facil
            </strong>
          </h1>
          <Image
            src="/ilustração.svg"
            alt="Illustração"
            width={500}
            height={500}
            className={style.image}
          />
        </div>
      </div>
      <div className={style.modal__container__form}>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={style.envolve__formulario}
          >
            <div className={style.envolve__titulo__formulario}>
              <p className={style.texto__etapa}>
                {" "}
                Etapa {currentStepIndex + 1}/{steps.length}
              </p>
              <h1>
                <strong>Cadastro</strong>
              </h1>
              <p>Preencha seus dados pessoais</p>
            </div>
            <>{step}</>
            <div className={style.envolve__button}>
              {!isFirstStep && (
                <button onClick={back} className={style.buttonVoltar}>
                  <Image
                    src="/Icon_arrow.svg"
                    alt="arrow"
                    width={16}
                    height={16}
                  />
                  Voltar
                </button>
              )}
              <button type="submit" className={style.buttonContinuar}>
                {isLastStep ? "Finalizar" : "Continuar"}
              </button>
              <a className={style.buttonJaTemConta} href="/auth/signin/usuario">
                Já tem uma conta?<strong> Entrar</strong>
              </a>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
