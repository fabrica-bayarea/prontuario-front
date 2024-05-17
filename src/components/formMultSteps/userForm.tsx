"use client";
import style from "../../app/(login)/auth/signUpUser/style.module.css";
import { useFormContext } from 'react-hook-form';

type UserData = {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string; 
  confirmaSenha: string;
}

type UserFormProps = UserData & {
  atualizaCampos: (fields: Partial<UserData>) => void
}

export default function UserForm({nome, sobrenome, email, senha, confirmaSenha,atualizaCampos}: UserFormProps) {

  const { register, formState: { errors }, watch} = useFormContext();
  const watchSenha = watch("senha");

  return (
    <div className={style.formulario}>
      <div className={style.envolve__input__errors}>
        <input
          {...register("nome", { required: "Nome é obrigatório",
            pattern: {value:/^[A-Za-zÀ-ú\s]+$/, message: "Seu nome deve conter apenas letras"}
           })}
          value={nome}
          onChange={ e => atualizaCampos({nome: e.target.value})}
          className={style.formulario__input}
          type="text"
          placeholder="Nome"
        />
        {errors.nome && typeof errors.nome.message === 'string' && <p className={style.error}>{errors.nome.message}</p>}
      </div>
      
      <div className={style.envolve__input__errors}>
        <input
          {...register("sobrenome", { required: "Sobrenome é obrigatório",
            pattern: {value:/^[A-Za-zÀ-ú\s]+$/, message: "Seu sobrenome deve conter apenas letras"}
           })}
          value={sobrenome}
          onChange={ e => atualizaCampos({sobrenome: e.target.value})}
          className={style.formulario__input}
          type="text"
          placeholder="Sobrenome"
        />
        {errors.sobrenome && <p className={style.error}>{errors.sobrenome.message as string}</p>}
      </div>
      
      <div className={style.envolve__input__errors}>
        <input
          {...register("email", { required: "Email é obrigatório", pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Email inválido"}})}
          value={email}
          onChange={ e => atualizaCampos({email: e.target.value})}
          className={style.formulario__input}
          type="email"
          placeholder="Email"
        />
        {errors.email && <p className={style.error}>{errors.email.message as string}</p>}
      </div>

      <div className={style.envolve__input__errors}>
        <input
          {...register ("senha", {required: "Senha obrigatoria",
            minLength:{value: 8, message: "A senha deve conter pelo menos 8 caracteres"}
          })}
          value={senha}
          onChange={ e => atualizaCampos({senha: e.target.value})}
          className={style.formulario__input}
          type="password"
          placeholder="Senha"
        />
        {errors.senha && <p className={style.error}>{errors.senha.message as string}</p>}
      </div>
      
      <div className={style.envolve__input__errors}>
        <input
          {...register("confirmaSenha", {
          required: "Confirme sua senha",
          validate: value => value === watchSenha || "As senhas não coincidem" })}

          className={style.formulario__input}
          value={confirmaSenha}
          onChange={ e => atualizaCampos({confirmaSenha: e.target.value})}
          type="password"
          placeholder="Confirmar sua senha"
        />
        {errors.confirmaSenha && <p className={style.error}>{errors.confirmaSenha.message as string}</p>}
      </div>
    
    </div>
  );
}
