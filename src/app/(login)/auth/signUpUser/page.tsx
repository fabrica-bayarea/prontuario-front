'use client';
import style from "./style.module.css";
import Image from "next/image";
import React, { useContext, useState } from 'react';
import {MultiStepForm} from "../../../../hooks/stepForm/multStepForm"
import UserForm from "../../../../components/formMultSteps/userForm";
import AddressForm from "@/components/formMultSteps/addressForm";
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";

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
};

const INITIAL_DATA: FormData = {
  nome: '',
  sobrenome:'',
  email:'',
  senha:'',
  cidade:'',
  cep:'',
  endereco:'',
  confirmaSenha:'',
  telefone: '',
  tipo: '',
  cpf: ''
}

export default function SignUpUser() {
  const { signUp } = useContext(AuthContext);
  const router = useRouter();

  const methods = useForm<FormData>();
  const { handleSubmit } = methods;

  const [data, setData] = useState(INITIAL_DATA)

  function atualizaCampos (fields: Partial<FormData> ){
    setData(prev =>{
      return {...prev, ...fields}
    })
  }

  const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next} = MultiStepForm([
    <UserForm key="userForm" {...data} atualizaCampos={atualizaCampos}/>,
    <AddressForm key="addreesForm" {...data} atualizaCampos={atualizaCampos}/>
  ])

  const onSubmit = async (formData: FormData) => {
    const dataToSend = {
      ...formData,
    };
    console.log(dataToSend); 
    if (currentStepIndex < steps.length - 1) {
      next();
    } else {
      try {
        await signUp(dataToSend);
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <div className={style.container}>
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
        <form onSubmit={handleSubmit(onSubmit)} className={style.envolve__formulario}>
          <div className={style.envolve__titulo__formulario}>
            <p className={style.texto__etapa}> Etapa {currentStepIndex +1}/{steps.length}</p>
            <h1>
              <strong>Cadastro</strong>
            </h1>
            <p>Preencha seus dados pessoais</p>
          </div>
          <>
            {step}
          </>
          <div className={style.envolve__button}>
          {!isFirstStep && <button onClick={back} className={style.buttonVoltar}><Image src = "/Icon_arrow.svg" alt = "arrow" width={16} height={16}/>
              Voltar
            </button>}
            <button type = "submit" className={style.buttonContinuar}>
              {isLastStep ? "Finalizar" : "Continuar"}
            </button>
            <a className ={style.buttonJaTemConta} href = "/auth/signin/usuario">
              Já tem uma conta?<strong> Entrar</strong>
            </a>
          </div>
        </form>
        </FormProvider>
      </div>
    </div>
  );
}
