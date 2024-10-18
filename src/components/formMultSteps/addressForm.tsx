"use client";
import style from "../../app/(login)/auth/signUpUser/style.module.css";
import { useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';

type AddressData = {
  cidade: string;
  cep: string;
  endereco: string;
  telefone: string;
}

type AddresFormProps = AddressData & {
  atualizaCampos: (fields: Partial<AddressData>) => void
}

export default function AddressForm({cidade, cep, endereco, telefone, atualizaCampos}: AddresFormProps) {

  //BUSCA CEP
  const checkCEP = (e: { target: { value: string } }) => {
    const cep = e.target.value.replace(/\D/g, "");
    console.log(cep);

    try {
      if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            setValue("endereco", data.bairro);
            setValue("cidade", data.localidade);
            atualizaCampos({
              endereco: data.logradouro,
              cidade: data.localidade,
            });
          });
      }
    } catch (err) {
      console.log("Erro ao buscar CEP", err);
    }
  };

  const { register, formState: { errors }, setValue } = useFormContext<AddressData>();

  return (

    <div className={style.formulario}>
      <div className={style.envolve__input__errors}>
        <input
          {...register("cidade", {
            required: "Cidade é obrigatoria",
            pattern: {
              value: /^[A-Za-zÀ-ú\s]+$/,
              message: "Sua cidade deve conter apenas letras"
            }
          })}
          className={style.formulario__input}
          value={cidade}
          onChange={e => atualizaCampos({ cidade: e.target.value })}
          type="text"
          placeholder="Cidade"
        />
        {errors.cidade && <p className={style.error}>{errors.cidade.message}</p>}
      </div>

      <div className={style.envolve__input__errors}>
        <InputMask
          {...register("cep", {
            required: "CEP é obrigatório",
            pattern:{value: /^\d{5}-?\d{3}$/, message: "Seu CEP deve conter apenas números"}
          })}
          onBlur={checkCEP}
          mask="99999-999"
          className={style.formulario__input}
          value={cep}
          onChange={e => {
            const cepValue = e.target.value;
            setValue("cep", cepValue);
            atualizaCampos({ cep: cepValue });
          }}
          type="text"
          placeholder="CEP"
        />
        {errors.cep && <p className={style.error}>{errors.cep.message}</p>}
      </div>

      <div className={style.envolve__input__errors}>
        <input
          {...register("endereco", {
            pattern: {
              value: /^[A-Za-zÀ-ú0-9\s\.,-]+$/,
              message: "Endereço invalido"
            }
          })}
          className={style.formulario__input}
          value={endereco}
          onChange={ e => atualizaCampos({endereco: e.target.value})}
          type="text"
          placeholder="Endereço"
        />
        {errors.endereco && <p className={style.error}>{errors.endereco.message}</p>}
      </div>

      <div className={style.envolve__input__errors}>
        <InputMask
          {...register("telefone", {
            required:"Telefone é obrigatorio",
          })}
          mask="(99)99999-9999"
          className={style.formulario__input}
          value={telefone}
          onChange={ e => atualizaCampos({telefone: e.target.value})}
          type="text"
          placeholder="Telefone"
        />
        {errors.telefone && <p className={style.error}>{errors.telefone.message}</p>}
      </div>
    </div>
  );
}