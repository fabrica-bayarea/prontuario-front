import axios from "axios";

type beneficiarioDto = {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  tipo: string;
  senha: string;
};

type usuarioDto = {
  nome: string;
  email: string;
  telefone: string;
  tipo: string;
  senha: string;
};

const signUpBeneficiario = async (url: string, body: beneficiarioDto) => {
  await axios
    .post(url, body)
    .then((res) => console.log(res.data))
    .catch((error) => console.log(error.message));
};

const signUpUsuario = async (url: string, body: usuarioDto) => {
  await axios
    .post(url, body)
    .then((res) => console.log(res.data))
    .catch((error) => console.log(error.message));
};

export { signUpBeneficiario, signUpUsuario };
