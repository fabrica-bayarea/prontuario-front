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
  try {
    const res = await axios.post(url, body);
    console.log(res);
  } catch (err: any) {
    console.log(err?.response.data.message);
  }
};

const signUpUsuario = async (url: string, body: usuarioDto) => {
  try {
    const res = await axios.post(url, body);
    return res;
  } catch (err: any) {
    throw new Error(err?.response.data.message);
  }
};

export { signUpBeneficiario, signUpUsuario };
