import axios from "axios";

export type beneficiarioDto = {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  tipo: string;
  senha: string;
};

export type usuarioDto = {
  nome: string;
  email: string;
  telefone?: string;
  tipo: string;
  senha: string;
};

const signUpBeneficiario = async (url: string, body: beneficiarioDto) => {
  await axios
    .post(url, body)
    .then((res) => console.log("Usuário cadastrado com sucesso", res.data))
    .catch((error) => console.log("Alguma coisa deu errado", error.message));
};

const signUpUsuario = async (url: string, body: usuarioDto) => {
  await axios
    .post(url, body)
    .then((res) => console.log(res))
    .catch(({ response }) => {
      console.log(response.message);
    });
};

export { signUpBeneficiario, signUpUsuario };
